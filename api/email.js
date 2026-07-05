"use strict";

const DEFAULT_OWNER_EMAIL = "rodrigo.melo@totallpi.co";

function emailConfigStatus(env = process.env) {
  const outlook = {
    provider: "microsoft-graph",
    ready: Boolean(
      env.MS_GRAPH_TENANT_ID &&
        env.MS_GRAPH_CLIENT_ID &&
        env.MS_GRAPH_CLIENT_SECRET &&
        env.MS_GRAPH_SENDER
    ),
    required: ["MS_GRAPH_TENANT_ID", "MS_GRAPH_CLIENT_ID", "MS_GRAPH_CLIENT_SECRET", "MS_GRAPH_SENDER"],
    sender: env.MS_GRAPH_SENDER || "",
  };

  const resend = {
    provider: "resend",
    ready: Boolean(env.RESEND_API_KEY),
    required: ["RESEND_API_KEY"],
    sender: env.RESULT_FROM_EMAIL || "",
  };

  const webhook = {
    provider: "webhook",
    ready: Boolean(env.RESULT_WEBHOOK_URL),
    required: ["RESULT_WEBHOOK_URL"],
  };

  const activeProvider = outlook.ready ? "microsoft-graph" : resend.ready ? "resend" : webhook.ready ? "webhook" : "local";

  return {
    activeProvider,
    recipient: env.RESULT_RECIPIENT_EMAIL || DEFAULT_OWNER_EMAIL,
    providers: {
      outlook,
      resend,
      webhook,
    },
  };
}

async function notifyResultOwner(submission, env = process.env) {
  try {
    const status = emailConfigStatus(env);
    if (status.providers.outlook.ready) {
      return await sendWithMicrosoftGraph(submission, env);
    }

    if (status.providers.resend.ready) {
      return await sendWithResend(submission, env);
    }

    if (status.providers.webhook.ready) {
      return await sendToWebhook(submission, env);
    }

    return {
      sent: false,
      channel: "local",
      message:
        "Resultado salvo localmente. Configure Microsoft Graph, RESEND_API_KEY ou RESULT_WEBHOOK_URL para envio externo automatico.",
    };
  } catch (error) {
    return {
      sent: false,
      channel: "error",
      message: error.message,
    };
  }
}

async function sendWithMicrosoftGraph(submission, env = process.env) {
  const token = await getMicrosoftGraphToken(env);
  const sender = encodeURIComponent(env.MS_GRAPH_SENDER);
  const response = await fetch(`https://graph.microsoft.com/v1.0/users/${sender}/sendMail`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: {
        subject: `Resultado da avaliacao SDR - ${submission.candidate.name}`,
        body: {
          contentType: "Text",
          content: buildOwnerEmailText(submission),
        },
        toRecipients: [
          {
            emailAddress: {
              address: submission.recipient,
            },
          },
        ],
      },
      saveToSentItems: true,
    }),
  });

  if (response.status !== 202) {
    const body = await response.text();
    throw new Error(`Microsoft Graph retornou HTTP ${response.status}: ${body || "sem corpo"}`);
  }

  return {
    sent: true,
    channel: "microsoft-graph",
    message: "Email automatico enviado pelo Microsoft Exchange.",
  };
}

async function getMicrosoftGraphToken(env = process.env) {
  const params = new URLSearchParams({
    client_id: env.MS_GRAPH_CLIENT_ID,
    client_secret: env.MS_GRAPH_CLIENT_SECRET,
    scope: "https://graph.microsoft.com/.default",
    grant_type: "client_credentials",
  });

  const response = await fetch(`https://login.microsoftonline.com/${env.MS_GRAPH_TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  const body = await response.json().catch(() => ({}));

  if (!response.ok || !body.access_token) {
    throw new Error(body.error_description || body.error || "Falha ao obter token Microsoft Graph.");
  }

  return body.access_token;
}

async function sendWithResend(submission, env = process.env) {
  const from = env.RESULT_FROM_EMAIL || "Totall Avaliacao SDR <onboarding@resend.dev>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [submission.recipient],
      subject: `Resultado da avaliacao SDR - ${submission.candidate.name}`,
      text: buildOwnerEmailText(submission),
    }),
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || "Falha no envio pelo Resend.");
  }

  return {
    sent: true,
    channel: "resend",
    message: "Email automatico enviado.",
    providerId: body.id,
  };
}

async function sendToWebhook(submission, env = process.env) {
  const response = await fetch(env.RESULT_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error(`Webhook retornou HTTP ${response.status}.`);
  }

  return {
    sent: true,
    channel: "webhook",
    message: "Webhook automatico acionado.",
  };
}

function buildOwnerEmailText(submission) {
  const result = submission.exam.result;
  const answers = submission.answers
    .map((answer) => {
      const value =
        answer.type === "closed" || answer.type === "diagnostic"
          ? `${answer.selectedLabel}) ${answer.selectedText}${answer.answer ? ` | ${answer.answer}` : ""}`
          : answer.answer;
      const evaluation = answer.evaluation
        ? `\n   Avaliacao aberta: ${answer.evaluation.score}/${answer.evaluation.total} - ${openEvaluationFeedback(answer.evaluation)}`
        : "";
      return `${answer.id}. ${value}${evaluation}`;
    })
    .join("\n\n");

  return [
    "Avaliacao de Calibracao SDR - Totall",
    "",
    `Protocolo: ${submission.id}`,
    `Recebido em: ${submission.receivedAt}`,
    `Candidato: ${submission.candidate.name}`,
    `Email do candidato: ${submission.candidate.email || "Nao informado"}`,
    `Data da prova: ${submission.exam.date || "Nao informada"}`,
    `Avaliador: ${submission.exam.reviewer || "Nao informado"}`,
    "",
    `Resultado: ${submission.exam.title}`,
    `Questoes fechadas: ${result.correctClosed}/${result.closedTotal} (${result.closedRate}%)`,
    `Abertas preenchidas: ${result.completedOpen}/${result.openTotal}`,
    result.openEvaluation
      ? `Avaliacao abertas: ${result.openEvaluation.score}/${result.openEvaluation.total} (${result.openEvaluation.rate}%)`
      : "",
    "",
    "Respostas:",
    answers,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function openEvaluationFeedback(item) {
  if (item.rate >= 80) return `Resposta forte. Cobre: ${(item.strengths || []).join(", ")}.`;
  if (item.rate >= 50) return `Resposta razoavel. Reforcar: ${(item.missing || []).slice(0, 2).join(", ")}.`;
  return `Resposta fraca ou generica. Faltou: ${(item.missing || []).slice(0, 3).join(", ")}.`;
}

module.exports = {
  DEFAULT_OWNER_EMAIL,
  buildOwnerEmailText,
  emailConfigStatus,
  notifyResultOwner,
};
