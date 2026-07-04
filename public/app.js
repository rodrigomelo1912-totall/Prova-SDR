"use strict";

const questions = [
  {
    id: 1,
    type: "closed",
    title: "Qual e o principal papel de um SDR dentro de uma operacao comercial?",
    options: [
      "Elaborar propostas e contratos",
      "Prospectar, conectar, investigar e qualificar oportunidades",
      "Negociar descontos e condicoes comerciais",
      "Realizar o pos-venda dos clientes",
    ],
    answer: 1,
  },
  {
    id: 2,
    type: "open",
    title: "Explique, com suas palavras, qual e a diferenca entre gerar uma reuniao e gerar uma reuniao qualificada.",
    guidance: "Procure sinais de criterio: fit, contexto, dor, decisor, momento e proximo passo claro.",
    rubric: [
      ["Diferencia volume de qualidade", ["qualificada", "qualidade", "relevante", "aderente"]],
      ["Considera fit ou perfil do cliente", ["fit", "perfil", "cliente ideal", "aderencia", "segmento"]],
      ["Investiga dor, desafio ou necessidade", ["dor", "desafio", "problema", "necessidade", "demanda"]],
      ["Valida decisor ou processo decisorio", ["decisor", "decisao", "autoridade", "responsavel", "quem decide"]],
      ["Define contexto e proximo passo", ["contexto", "momento", "proximo passo", "reuniao com pauta", "objetivo"]],
    ],
  },
  {
    id: 3,
    type: "closed",
    title:
      "Um lead demonstrou interesse no servico, mas o SDR identificou que ele nao participa da decisao e nao sabe quem e o responsavel pela contratacao. Qual e a melhor conduta?",
    options: [
      "Agendar imediatamente com o closer",
      "Descartar o lead",
      "Entender o processo decisorio e buscar envolver a pessoa responsavel",
      "Enviar uma proposta comercial",
    ],
    answer: 2,
  },
  {
    id: 4,
    type: "open",
    title:
      "Imagine que voce esta conversando com um empresario que diz: \"Ja temos uma empresa que cuida das nossas marcas.\" Como voce conduziria a conversa a partir dessa resposta?",
    guidance: "Boa resposta reconhece o cenario, aprofunda satisfacao, riscos, prazos, carteira e abertura para benchmark.",
    rubric: [
      ["Reconhece a situacao sem confronto", ["entendo", "otimo", "perfeito", "legal", "bom saber"]],
      ["Pergunta sobre satisfacao atual", ["satisfeito", "satisfacao", "experiencia", "atendimento", "como tem sido"]],
      ["Aprofunda riscos, prazos ou carteira", ["risco", "prazo", "vencimento", "registro", "carteira", "marca"]],
      ["Busca oportunidade de benchmark", ["comparar", "benchmark", "segunda opiniao", "avaliar", "diagnostico"]],
      ["Termina com pergunta consultiva", ["como", "qual", "quando", "posso", "?"]],
    ],
  },
  {
    id: 5,
    type: "closed",
    title: "Qual alternativa representa uma boa pergunta de descoberta?",
    options: [
      "Voce quer receber uma proposta?",
      "Podemos marcar uma reuniao amanha?",
      "Como voces administram atualmente esse processo e quais sao os principais desafios?",
      "Nosso servico e muito completo, posso apresentar?",
    ],
    answer: 2,
  },
  {
    id: 6,
    type: "open",
    title:
      "Voce recebeu uma lista com 50 empresas para prospectar. Explique como organizaria sua abordagem e sua rotina de contato durante a semana.",
    guidance: "Avalie priorizacao, pesquisa rapida, cadencia multicanal, blocos de foco e controle de follow-up.",
    rubric: [
      ["Prioriza ou segmenta a lista", ["priorizar", "segmentar", "ranking", "porte", "potencial", "perfil"]],
      ["Faz pesquisa antes do contato", ["pesquisa", "linkedin", "site", "marca", "noticia", "informacao"]],
      ["Usa cadencia estruturada", ["cadencia", "tentativas", "follow-up", "sequencia", "rotina"]],
      ["Combina canais de contato", ["telefone", "whatsapp", "email", "linkedin", "ligacao"]],
      ["Registra e controla no CRM", ["crm", "registrar", "controle", "historico", "status"]],
    ],
  },
  {
    id: 7,
    type: "closed",
    title: "Qual dessas informacoes e mais importante registrar no CRM apos uma conversa de qualificacao?",
    options: [
      "Apenas o telefone do lead",
      "Apenas se ele aceitou ou recusou a reuniao",
      "Contexto, dores identificadas, momento, decisores, objecoes e proximos passos",
      "Somente o numero de tentativas realizadas",
    ],
    answer: 2,
  },
  {
    id: 8,
    type: "open",
    title: "Na sua opiniao, quais informacoes minimas um SDR precisa descobrir antes de passar uma oportunidade para o closer?",
    guidance: "Inclui fit, dor, impacto, autoridade, prazo, urgencia, objecoes e expectativa da reuniao.",
    rubric: [
      ["Confirma fit da oportunidade", ["fit", "perfil", "segmento", "tamanho", "aderencia"]],
      ["Mapeia dor e impacto", ["dor", "impacto", "problema", "necessidade", "consequencia"]],
      ["Identifica decisor ou processo", ["decisor", "decisao", "autoridade", "responsavel", "processo"]],
      ["Entende momento, prazo ou urgencia", ["momento", "prazo", "urgencia", "prioridade", "quando"]],
      ["Registra objeções e proximos passos", ["objecao", "obstaculo", "proximo passo", "reuniao", "expectativa"]],
    ],
  },
  {
    id: 9,
    type: "closed",
    title: "Um prospect nao respondeu a primeira mensagem. Qual deve ser a atitude do SDR?",
    options: [
      "Encerrar imediatamente a oportunidade",
      "Fazer novas tentativas utilizando uma cadencia estruturada e diferentes abordagens",
      "Enviar uma proposta comercial sem conversar com ele",
      "Passar o contato diretamente para o closer",
    ],
    answer: 1,
  },
  {
    id: 10,
    type: "open",
    title:
      "Voce conseguiu falar com o proprietario de uma empresa. Ele diz: \"Tenho interesse, mas agora estou sem tempo. Me liga daqui a tres meses.\" Como voce responderia e quais informacoes tentaria descobrir antes de encerrar a conversa?",
    guidance: "Procure combinacao de respeito ao timing, micropergunta de diagnostico e agendamento de retorno com contexto.",
    rubric: [
      ["Respeita o timing do prospect", ["entendo", "sem problema", "respeito", "claro", "combinado"]],
      ["Investiga motivo ou prioridade", ["motivo", "prioridade", "por que", "o que muda", "acontecendo"]],
      ["Busca diagnostico antes de encerrar", ["pergunta", "entender", "diagnostico", "contexto", "desafio"]],
      ["Agenda retorno concreto", ["agendar", "marcar", "data", "retorno", "calendario", "tres meses"]],
      ["Mantem valor ou proximo passo leve", ["enviar", "material", "conteudo", "preparar", "ajudar"]],
    ],
  },
  {
    id: 11,
    type: "closed",
    title: "Qual indicador representa melhor a qualidade do trabalho de um SDR?",
    options: [
      "Quantidade de mensagens enviadas isoladamente",
      "Quantidade de ligacoes realizadas isoladamente",
      "Numero de oportunidades qualificadas que avancam no funil comercial",
      "Quantidade de contatos existentes no WhatsApp",
    ],
    answer: 2,
  },
  {
    id: 12,
    type: "open",
    title:
      "Explique o que significa personalizar uma prospeccao. De um exemplo de abordagem personalizada para uma empresa que voce pesquisou antes do contato.",
    guidance: "Boa resposta usa evidencia real da empresa e conecta essa evidencia a uma pergunta relevante.",
    rubric: [
      ["Define personalizacao com clareza", ["personalizar", "especifico", "contexto", "nao generico", "relevante"]],
      ["Usa pesquisa concreta da empresa", ["pesquisei", "site", "linkedin", "noticia", "mercado", "marca"]],
      ["Conecta pesquisa a hipotese de dor", ["dor", "hipotese", "desafio", "risco", "oportunidade"]],
      ["Evita apresentacao longa", ["breve", "objetivo", "curto", "sem apresentar", "sem vender"]],
      ["Termina com pergunta aberta", ["como", "qual", "quando", "faz sentido", "?"]],
    ],
  },
  {
    id: 13,
    type: "closed",
    title: "Durante uma ligacao, o prospect comeca a explicar um problema da empresa. O SDR deve:",
    options: [
      "Interromper para apresentar rapidamente o servico",
      "Escutar, aprofundar o problema e entender seu impacto",
      "Informar imediatamente o preco",
      "Transferir a ligacao sem contexto para o closer",
    ],
    answer: 1,
  },
  {
    id: 14,
    type: "open",
    title:
      "Um SDR agendou 30 reunioes no mes. Outro SDR agendou 18. O primeiro teve 8 reunioes realizadas e 2 oportunidades reais. O segundo teve 15 reunioes realizadas e 10 oportunidades reais. Quem teve o melhor desempenho? Justifique sua resposta.",
    guidance: "Resposta forte valoriza conversao, qualidade e oportunidades reais em vez de volume bruto.",
    rubric: [
      ["Identifica o segundo SDR como melhor", ["segundo", "18", "15", "10"]],
      ["Valoriza oportunidades reais", ["oportunidades reais", "oportunidade", "qualidade", "avancam"]],
      ["Compara conversao e nao so volume", ["conversao", "taxa", "percentual", "volume", "quantidade"]],
      ["Usa os numeros do caso", ["30", "18", "8", "2", "15", "10"]],
      ["Justifica com raciocinio de funil", ["funil", "realizadas", "qualificadas", "eficiencia", "desempenho"]],
    ],
  },
  {
    id: 15,
    type: "open",
    title:
      "Construa uma abordagem inicial de prospeccao para um potencial cliente da Totall. A mensagem deve demonstrar pesquisa minima, gerar curiosidade, evitar apresentacao longa e terminar com uma pergunta que incentive a continuidade.",
    guidance: "Avalie especificidade, clareza, brevidade, tom consultivo e pergunta final aberta.",
    rubric: [
      ["Demonstra pesquisa minima", ["vi que", "notei", "pesquisei", "site", "linkedin", "marca"]],
      ["Gera curiosidade", ["curiosidade", "percebi", "ponto", "oportunidade", "risco"]],
      ["Mantem mensagem breve", ["breve", "rapido", "objetivo", "curto"]],
      ["Usa tom consultivo", ["entender", "ajudar", "avaliar", "diagnostico", "conversar"]],
      ["Termina com pergunta de continuidade", ["podemos", "faz sentido", "como", "qual", "?"]],
    ],
  },
];

const state = {
  submitted: false,
  submission: null,
};

const letterLabels = ["a", "b", "c", "d"];
const ownerEmail = "rodrigo.melo@totallpi.co";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("examDate").valueAsDate = new Date();
  renderQuestions();
  bindEvents();
  updateProgress();
});

function bindEvents() {
  document.getElementById("examForm").addEventListener("input", updateProgress);
  document.getElementById("candidateForm").addEventListener("input", updateProgress);
  document.getElementById("examForm").addEventListener("submit", handleSubmit);
  document.getElementById("clearButton").addEventListener("click", clearExam);
  document.getElementById("copyButton").addEventListener("click", copyResult);
  document.getElementById("emailButton").addEventListener("click", sendCandidateCopyEmail);
  document.getElementById("printButton").addEventListener("click", () => window.print());
}

function renderQuestions() {
  document.getElementById("questions").innerHTML = questions.map(renderQuestion).join("");
}

function renderQuestion(question) {
  const eyebrow = question.type === "closed" ? "Pergunta fechada" : "Pergunta aberta";
  const body =
    question.type === "closed"
      ? `<div class="options">${question.options
          .map(
            (option, index) => `
              <label class="option">
                <input type="radio" name="q${question.id}" value="${index}" required />
                <span>${letterLabels[index]}) ${escapeHtml(option)}</span>
              </label>
            `
          )
          .join("")}</div>`
      : `<textarea name="q${question.id}" rows="6" minlength="20" required placeholder="Digite a resposta do candidato..."></textarea>
         <p class="guidance">${escapeHtml(question.guidance)}</p>`;

  return `
    <article class="question-card" id="question-${question.id}">
      <div class="question-head">
        <span>${String(question.id).padStart(2, "0")}</span>
        <p class="eyebrow">${eyebrow}</p>
      </div>
      <h2>${escapeHtml(question.title)}</h2>
      ${body}
    </article>
  `;
}

async function handleSubmit(event) {
  event.preventDefault();

  if (!document.getElementById("candidateForm").reportValidity()) return;
  if (!document.getElementById("examForm").reportValidity()) return;

  const result = calculateResult();
  const submitButton = event.submitter || document.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "Finalizando...";
  setFinishStatus("Finalizando e registrando o resultado para Rodrigo...");
  setEmailStatus("Enviando para Rodrigo", "Aguarde. O resultado sera liberado apos o registro da prova.");

  try {
    const submission = await submitResultToOwner(result);
    state.submitted = true;
    state.submission = submission;
    renderResult(submission.result || result, submission);
    updateProgress();
    setFinishStatus("");
    document.getElementById("resultCard").scrollIntoView({ behavior: "smooth", block: "center" });
  } catch (error) {
    setFinishStatus(error.message);
    setEmailStatus("Nao foi possivel finalizar", error.message);
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Finalizar prova";
  }
}

function calculateResult() {
  const form = new FormData(document.getElementById("examForm"));
  const closed = questions.filter((question) => question.type === "closed");
  const open = questions.filter((question) => question.type === "open");
  const correctClosed = closed.filter((question) => Number(form.get(`q${question.id}`)) === question.answer).length;
  const completedOpen = open.filter((question) => String(form.get(`q${question.id}`) || "").trim().length >= 20).length;
  const openEvaluation = evaluateOpenAnswers(form);
  const closedRate = Math.round((correctClosed / closed.length) * 100);

  return {
    correctClosed,
    closedTotal: closed.length,
    completedOpen,
    openTotal: open.length,
    closedRate,
    openEvaluation,
  };
}

function renderResult(result, submission) {
  const resultCard = document.getElementById("resultCard");
  resultCard.hidden = false;
  document.getElementById("closedScore").textContent = `${result.correctClosed}/${result.closedTotal}`;
  document.getElementById("closedRate").textContent = `${result.closedRate}%`;
  document.getElementById("openCompletion").textContent = `${result.completedOpen}/${result.openTotal}`;
  document.getElementById("openScore").textContent = `${result.openEvaluation.rate}%`;

  const combinedRate = Math.round((result.closedRate + result.openEvaluation.rate) / 2);
  const title = combinedRate >= 85 ? "Excelente criterio tecnico" : combinedRate >= 70 ? "Bom desempenho" : "Revisao recomendada";
  const feedback =
    combinedRate >= 85
      ? "O conjunto de respostas indica boa leitura do papel de SDR, com criterios de qualificacao e raciocinio comercial consistentes."
      : combinedRate >= 70
        ? "O resultado automatico e positivo, mas vale revisar os pontos fracos das respostas abertas antes da decisao final."
        : "O candidato precisa demonstrar mais dominio em qualificacao, descoberta e criterios de passagem para o closer.";

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultFeedback").textContent = feedback;
  renderOpenEvaluation(result.openEvaluation);
  renderSubmissionStatus(submission);
}

function evaluateOpenAnswers(form) {
  const items = questions
    .filter((question) => question.type === "open")
    .map((question) => evaluateOpenQuestion(question, String(form.get(`q${question.id}`) || "")));
  const score = items.reduce((total, item) => total + item.score, 0);
  const total = items.reduce((sum, item) => sum + item.total, 0);

  return {
    score,
    total,
    rate: total ? Math.round((score / total) * 100) : 0,
    items,
  };
}

function evaluateOpenQuestion(question, answer) {
  const normalized = normalizeText(answer);
  const wordCount = normalized.split(/\s+/).filter(Boolean).length;
  const matched = (question.rubric || []).filter((criterion) =>
    criterion[1].some((term) => normalized.includes(normalizeText(term)))
  );
  let score = matched.length * 2;

  if (wordCount < 12) score = 0;
  else if (wordCount < 25) score = Math.min(score, 4);

  return {
    id: question.id,
    score,
    total: (question.rubric || []).length * 2,
    rate: question.rubric?.length ? Math.round((score / ((question.rubric || []).length * 2)) * 100) : 0,
    wordCount,
    strengths: matched.map((criterion) => criterion[0]),
    missing: (question.rubric || [])
      .filter((criterion) => !matched.includes(criterion))
      .map((criterion) => criterion[0]),
  };
}

function renderOpenEvaluation(openEvaluation) {
  const label = openEvaluation.mode === "ai" ? "IA" : "rubrica automatica";
  document.getElementById("openEvaluation").innerHTML = `
    <h3>Avaliacao das respostas abertas (${label})</h3>
    <div class="open-evaluation-grid">
      ${openEvaluation.items
        .map(
          (item) => `
            <div class="open-evaluation-item">
              <div>
                <strong>Questao ${item.id}</strong>
                <span>${item.score}/${item.total} pontos</span>
              </div>
              <p>${escapeHtml(openEvaluationFeedback(item))}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function openEvaluationFeedback(item) {
  if (item.feedback) return item.feedback;
  if (item.rate >= 80) return `Resposta forte. Cobre: ${item.strengths.join(", ")}.`;
  if (item.rate >= 50) return `Resposta razoavel. Reforcar: ${item.missing.slice(0, 2).join(", ")}.`;
  return `Resposta fraca ou generica. Faltou: ${item.missing.slice(0, 3).join(", ")}.`;
}

function updateProgress() {
  const answered = questions.filter((question) => isAnswered(question)).length;
  const percent = Math.round((answered / questions.length) * 100);
  document.getElementById("answeredCount").textContent = `${answered}/${questions.length}`;
  document.getElementById("progressBar").style.width = `${percent}%`;
  document.getElementById("progressLabel").textContent = state.submitted
    ? "Prova finalizada. Confira o resumo automatico e revise as respostas abertas."
    : percent === 100
      ? "Todas as questoes foram preenchidas. Voce ja pode finalizar."
      : `${percent}% da prova preenchida.`;
}

function isAnswered(question) {
  const fieldName = `q${question.id}`;
  if (question.type === "closed") {
    return Boolean(document.querySelector(`input[name="${fieldName}"]:checked`));
  }
  const value = document.querySelector(`textarea[name="${fieldName}"]`).value.trim();
  return value.length >= 20;
}

function clearExam() {
  document.getElementById("examForm").reset();
  document.getElementById("candidateForm").reset();
  document.getElementById("examDate").valueAsDate = new Date();
  document.getElementById("resultCard").hidden = true;
  state.submitted = false;
  state.submission = null;
  setFinishStatus("");
  setEmailStatus("Envio automatico", "Ao finalizar, o resultado e enviado para Rodrigo e fica registrado no servidor.");
  updateProgress();
  document.getElementById("candidateName").focus();
}

async function copyResult() {
  const payload = buildResultText();
  try {
    await navigator.clipboard.writeText(payload);
    flashButton("copyButton", "Copiado");
  } catch (error) {
    flashButton("copyButton", "Nao copiado");
  }
}

function buildResultText() {
  const form = new FormData(document.getElementById("examForm"));
  const result = calculateResult();
  const candidate = document.getElementById("candidateName").value.trim() || "Nao informado";
  const email = document.getElementById("resultEmail").value.trim() || "Nao informado";
  const date = document.getElementById("examDate").value || "Nao informada";
  const reviewer = document.getElementById("reviewerName").value.trim() || "Nao informado";
  const answers = questions
    .map((question) => {
      const value = form.get(`q${question.id}`);
      const answer =
        question.type === "closed"
          ? `${letterLabels[Number(value)] || "-"} - ${question.options[Number(value)] || "Sem resposta"}`
          : String(value || "Sem resposta").trim();
      return `${question.id}. ${answer}`;
    })
    .join("\n");

  return [
    "Prova de Conhecimentos SDR - Totall",
    `Candidato: ${candidate}`,
    `Email: ${email}`,
    `Data: ${date}`,
    `Avaliador: ${reviewer}`,
    `Fechadas: ${result.correctClosed}/${result.closedTotal} (${result.closedRate}%)`,
    `Abertas preenchidas: ${result.completedOpen}/${result.openTotal}`,
    `Avaliacao abertas: ${result.openEvaluation.score}/${result.openEvaluation.total} (${result.openEvaluation.rate}%)`,
    "",
    "Resumo das abertas:",
    ...result.openEvaluation.items.map(
      (item) => `Questao ${item.id}: ${item.score}/${item.total} - ${openEvaluationFeedback(item)}`
    ),
    "",
    answers,
  ].join("\n");
}

async function submitResultToOwner(result) {
  const response = await fetch("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildSubmissionPayload(result)),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || "Falha ao registrar a prova. Tente finalizar novamente.");
  }
  return payload;
}

function buildSubmissionPayload(result) {
  const form = new FormData(document.getElementById("examForm"));
  const candidate = document.getElementById("candidateName").value.trim();
  const candidateEmail = document.getElementById("resultEmail").value.trim();
  const date = document.getElementById("examDate").value;
  const reviewer = document.getElementById("reviewerName").value.trim();
  const combinedRate = Math.round((result.closedRate + result.openEvaluation.rate) / 2);
  const title = combinedRate >= 85 ? "Excelente criterio tecnico" : combinedRate >= 70 ? "Bom desempenho" : "Revisao recomendada";

  return {
    ownerEmail,
    candidate: {
      name: candidate,
      email: candidateEmail,
    },
    exam: {
      date,
      reviewer,
      title,
      result,
    },
    answers: questions.map((question) => {
      const value = form.get(`q${question.id}`);
      return {
        id: question.id,
        type: question.type,
        title: question.title,
        selectedIndex: question.type === "closed" ? Number(value) : null,
        selectedLabel: question.type === "closed" ? letterLabels[Number(value)] || null : null,
        selectedText: question.type === "closed" ? question.options[Number(value)] || "" : "",
        correct: question.type === "closed" ? Number(value) === question.answer : null,
        answer: question.type === "open" ? String(value || "").trim() : "",
        evaluation:
          question.type === "open"
            ? result.openEvaluation.items.find((item) => item.id === question.id) || null
            : null,
      };
    }),
  };
}

function renderSubmissionStatus(submission) {
  if (submission?.notification?.sent) {
    setEmailStatus("Resultado enviado para Rodrigo", `Destino: ${submission.recipient || ownerEmail}. Protocolo ${submission.id}.`);
    return;
  }

  if (submission?.saved) {
    setEmailStatus(
      "Resultado registrado para Rodrigo",
      `Protocolo ${submission.id}. Para disparo automatico por Exchange, configure Microsoft Graph no servidor.`
    );
    return;
  }

  setEmailStatus("Resultado calculado", "Nao recebemos confirmacao do servidor.");
}

function sendCandidateCopyEmail() {
  if (!state.submitted) {
    setEmailStatus("Finalize a prova", "A copia por email fica disponivel depois que o resultado for liberado.");
    flashButton("emailButton", "Finalize primeiro");
    return;
  }

  const recipient = document.getElementById("resultEmail").value.trim();
  if (!recipient) {
    setEmailStatus("Informe o email do candidato", "Preencha o campo de copia no inicio da prova para preparar esse email.");
    flashButton("emailButton", "Sem email");
    return;
  }

  const candidate = document.getElementById("candidateName").value.trim() || "candidato";
  const subject = `Resultado da prova SDR - ${candidate}`;
  const body = buildEmailText();
  const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailto;
  setEmailStatus("Copia por email aberta", "Revise o conteudo no aplicativo de email e clique em enviar.");
  flashButton("emailButton", "Email aberto");
}

function buildEmailText() {
  const result = calculateResult();
  const candidate = document.getElementById("candidateName").value.trim() || "Nao informado";
  const email = document.getElementById("resultEmail").value.trim() || "Nao informado";
  const date = document.getElementById("examDate").value || "Nao informada";
  const reviewer = document.getElementById("reviewerName").value.trim() || "Nao informado";
  const title = document.getElementById("resultTitle").textContent || "Resultado";
  const feedback = document.getElementById("resultFeedback").textContent || "";

  return [
    "Prova de Conhecimentos SDR - Totall",
    "",
    `Candidato: ${candidate}`,
    `Email: ${email}`,
    `Data: ${date}`,
    `Avaliador: ${reviewer}`,
    "",
    `Resultado: ${title}`,
    `Questoes fechadas: ${result.correctClosed}/${result.closedTotal} (${result.closedRate}%)`,
    `Abertas preenchidas: ${result.completedOpen}/${result.openTotal}`,
    `Avaliacao abertas: ${result.openEvaluation.score}/${result.openEvaluation.total} (${result.openEvaluation.rate}%)`,
    "",
    feedback,
    "",
    "Observacao: as respostas completas ficam disponiveis no botao Copiar resultado ou na impressao da prova.",
  ].join("\n");
}

function setEmailStatus(title, message) {
  const status = document.getElementById("emailStatus");
  status.querySelector("strong").textContent = title;
  status.querySelector("span").textContent = message;
}

function setFinishStatus(message) {
  document.getElementById("finishStatus").textContent = message;
}

function flashButton(id, label) {
  const button = document.getElementById(id);
  const original = button.textContent;
  button.textContent = label;
  setTimeout(() => {
    button.textContent = original;
  }, 1400);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s?]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
