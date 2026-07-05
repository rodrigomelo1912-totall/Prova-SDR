"use strict";

const http = require("node:http");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { DEFAULT_OWNER_EMAIL, emailConfigStatus, notifyResultOwner } = require("./api/email");

loadDotEnv(path.join(__dirname, ".env"));

const PORT = Number(process.env.PORT || 3000);
const PUBLIC_DIR = path.join(__dirname, "public");
const RESULTS_DIR = path.join(__dirname, "data", "submissions");
const OWNER_EMAIL = DEFAULT_OWNER_EMAIL;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (url.pathname === "/health") {
      sendJson(response, 200, {
        ok: true,
        service: "prova-sdr",
        checkedAt: new Date().toISOString(),
      });
      return;
    }

    if (url.pathname === "/api/email/status") {
      sendJson(response, 200, emailConfigStatus(process.env));
      return;
    }

    if (url.pathname === "/api/results" && request.method === "POST") {
      const submission = await receiveResultSubmission(request);
      sendJson(response, 200, submission);
      return;
    }

    const filePath = resolveStaticPath(url.pathname);
    if (!filePath) {
      sendText(response, 404, "Not found");
      return;
    }

    const ext = path.extname(filePath);
    response.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(response);
  } catch (error) {
    sendJson(response, error.statusCode || 500, {
      error: error.message,
      hint: "Confira a configuracao do servidor ou tente recarregar a prova online.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Prova online Totall rodando em http://localhost:${PORT}`);
});

function resolveStaticPath(urlPath) {
  const normalized = urlPath === "/" ? "/index.html" : urlPath;
  const filePath = path.normalize(path.join(PUBLIC_DIR, normalized));
  if (!filePath.startsWith(PUBLIC_DIR) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return null;
  }
  return filePath;
}

function sendJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, status, text) {
  response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  response.end(text);
}

async function receiveResultSubmission(request) {
  const payload = await readJsonBody(request);
  if (!payload?.candidate?.name) {
    const error = new Error("Informe o nome do candidato antes de finalizar.");
    error.statusCode = 400;
    throw error;
  }

  const recipient = process.env.RESULT_RECIPIENT_EMAIL || OWNER_EMAIL;
  const id = `sdr-${new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`;
  const submission = {
    id,
    receivedAt: new Date().toISOString(),
    recipient,
    source: "prova-online-sdr",
    ...payload,
    ownerEmail: recipient,
  };

  const aiEvaluation = await evaluateOpenAnswersWithAi(submission);
  if (aiEvaluation) {
    submission.exam.result.openEvaluation = aiEvaluation;
    for (const answer of submission.answers) {
      if (answer.type === "open") {
        answer.evaluation = aiEvaluation.items.find((item) => item.id === answer.id) || answer.evaluation || null;
      }
    }
    submission.exam.title = resultTitleFromRates(
      submission.exam.result.closedRate,
      submission.exam.result.openEvaluation.rate
    );
  }

  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const filePath = path.join(RESULTS_DIR, `${id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(submission, null, 2));

  const notification = await notifyResultOwner(submission);
  return {
    id,
    saved: true,
    recipient,
    result: submission.exam.result,
    notification,
  };
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 1024 * 1024) {
      const error = new Error("A prova ficou grande demais para envio. Reduza as respostas e tente novamente.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch (error) {
    const parseError = new Error("Nao foi possivel ler os dados da prova.");
    parseError.statusCode = 400;
    throw parseError;
  }
}

async function evaluateOpenAnswersWithAi(submission) {
  if (!process.env.OPENAI_API_KEY) return null;

  try {
    const openAnswers = submission.answers
      .filter((answer) => answer.type === "open")
      .map((answer) => ({
        id: answer.id,
        question: answer.title,
        answer: answer.answer,
      }));
    if (!openAnswers.length) return null;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5.5-mini",
        input: [
          {
            role: "system",
            content:
              "Voce e um avaliador senior de SDR da Totall Propriedade Intelectual. Avalie respostas abertas com criterio comercial, sem ser excessivamente generoso. De notas de 0 a 10 por questao. Considere recepcao de inbound, qualificacao, decisor, urgencia, contexto da marca, oportunidades em PI, demandas adjacentes, CRM, rotina, passagem de bastao e direcionamento ao closer. Responda apenas no JSON definido.",
          },
          {
            role: "user",
            content: JSON.stringify({
              exam: "Avaliacao de Calibracao SDR",
              candidate: submission.candidate.name,
              openAnswers,
            }),
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "sdr_open_answer_evaluation",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["items", "summary"],
              properties: {
                summary: {
                  type: "string",
                },
                items: {
                  type: "array",
                  items: {
                    type: "object",
                    additionalProperties: false,
                    required: ["id", "score", "strengths", "missing", "feedback"],
                    properties: {
                      id: { type: "number" },
                      score: { type: "number", minimum: 0, maximum: 10 },
                      strengths: {
                        type: "array",
                        items: { type: "string" },
                      },
                      missing: {
                        type: "array",
                        items: { type: "string" },
                      },
                      feedback: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    });

    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.error?.message || `OpenAI retornou HTTP ${response.status}`);
    }

    const text = extractResponseText(body);
    const parsed = JSON.parse(text);
    const items = parsed.items.map((item) => ({
      id: Number(item.id),
      score: Math.max(0, Math.min(10, Math.round(Number(item.score)))),
      total: 10,
      rate: Math.round((Math.max(0, Math.min(10, Number(item.score))) / 10) * 100),
      wordCount: wordCountForOpenAnswer(submission, Number(item.id)),
      strengths: item.strengths || [],
      missing: item.missing || [],
      feedback: item.feedback || "",
    }));
    const score = items.reduce((total, item) => total + item.score, 0);
    const total = items.length * 10;

    return {
      mode: "ai",
      provider: "openai",
      model: process.env.OPENAI_MODEL || "gpt-5.5-mini",
      score,
      total,
      rate: total ? Math.round((score / total) * 100) : 0,
      summary: parsed.summary || "",
      items,
    };
  } catch (error) {
    submission.aiEvaluationError = error.message;
    return null;
  }
}

function extractResponseText(response) {
  if (response.output_text) return response.output_text;
  for (const item of response.output || []) {
    for (const content of item.content || []) {
      if (content.text) return content.text;
      if (content.type === "output_text" && content.text) return content.text;
    }
  }
  throw new Error("A resposta da OpenAI nao trouxe texto JSON.");
}

function wordCountForOpenAnswer(submission, id) {
  const answer = submission.answers.find((item) => item.id === id);
  return String(answer?.answer || "").split(/\s+/).filter(Boolean).length;
}

function resultTitleFromRates(closedRate, openRate) {
  const combinedRate = Math.round((Number(closedRate || 0) + Number(openRate || 0)) / 2);
  if (combinedRate >= 85) return "Excelente calibracao SDR";
  if (combinedRate >= 70) return "Boa calibracao SDR";
  return "Revisao recomendada";
}

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}
