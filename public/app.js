"use strict";

const sections = [
  {
    id: 1,
    title: "Recepcao e qualificacao de leads",
    shortTitle: "Bloco 1",
    description: "Leitura inicial do inbound, urgencia, decisao, contexto e primeiras perguntas de qualificacao.",
    questions: [
      {
        id: 1,
        type: "closed",
        title: 'Um lead chega pelo formulario dizendo: "Quero registrar minha marca. Qual o valor?" Qual deve ser a primeira leitura do SDR?',
        options: [
          "E um lead quente e deve ser enviado imediatamente ao closer.",
          "E uma oportunidade clara de marca, bastando informar o preco.",
          "Existe intencao inicial, mas ainda e necessario entender contexto, urgencia, situacao da marca, perfil da empresa e processo de decisao.",
          "E um lead pouco qualificado porque perguntou preco antes de explicar o problema.",
        ],
        answer: 2,
      },
      {
        id: 2,
        type: "closed",
        title:
          "Um lead inbound respondeu rapido, demonstrou simpatia e aceitou reuniao. Porem, o SDR nao sabe se ele e decisor, se a marca ja esta em uso, se ha urgencia ou se existe orcamento. Qual alternativa e mais correta?",
        options: [
          "A reuniao deve ser passada ao closer porque o lead aceitou conversar.",
          "O SDR deve barrar a reuniao ate descobrir todos os detalhes possiveis.",
          "O SDR deve confirmar elementos minimos de qualificacao antes da passagem, sem transformar a conversa em interrogatorio.",
          "O closer deve fazer toda a qualificacao, pois o papel do SDR e apenas agendar.",
        ],
        answer: 2,
      },
      {
        id: 3,
        type: "closed",
        title: 'O lead diz: "Estou so pesquisando por enquanto." Qual pergunta e mais madura?',
        options: [
          "Entao posso te retornar daqui a alguns meses?",
          "Voce ja tem alguma previsao de quando pretende registrar?",
          "O que motivou essa pesquisa agora?",
          "Se eu te passar uma condicao especial, voce avanca?",
        ],
        answer: 2,
      },
      {
        id: 4,
        type: "closed",
        title: "Um lead quer registrar uma marca, mas informa que ainda nao abriu CNPJ. Qual conduta e mais adequada?",
        options: [
          "Desqualificar o lead, pois sem CNPJ nao existe oportunidade.",
          "Explicar que so e possivel registrar marca com CNPJ.",
          "Entender o estagio do projeto, uso da marca, previsao de formalizacao, segmento e intencao comercial antes de direcionar.",
          "Passar diretamente para o closer, pois toda duvida juridica deve ir para especialista.",
        ],
        answer: 2,
      },
      {
        id: 5,
        type: "closed",
        title: 'Um lead diz: "Preciso registrar minha marca com urgencia porque recebi uma notificacao." Qual e a melhor conduta?',
        options: [
          "Tratar como oportunidade urgente, coletar informacoes essenciais e direcionar com prioridade ao especialista/closer adequado.",
          "Informar o valor do registro e tentar fechar rapidamente.",
          "Explicar que notificacao nao tem relacao direta com registro de marca.",
          "Pedir que ele envie tudo por e-mail e aguarde retorno.",
        ],
        answer: 0,
      },
      {
        id: 6,
        type: "open",
        title: 'Um lead chega dizendo: "Quero registrar minha marca." Liste as informacoes minimas que voce precisa descobrir antes de direcionar esse lead ao closer.',
        guidance: "Busque sinais de marca, uso, titularidade, segmento, urgencia, decisor, contexto e proximo passo.",
        rubric: [
          ["Marca e uso atual", ["marca", "uso", "utiliza", "nome", "produto", "servico"]],
          ["Titularidade e empresa", ["cnpj", "cpf", "titular", "empresa", "socio", "proprietario"]],
          ["Segmento e atividade", ["segmento", "atividade", "mercado", "ramo", "atua"]],
          ["Urgencia, risco ou prazo", ["urgencia", "prazo", "notificacao", "risco", "concorrente"]],
          ["Decisor e proximo passo", ["decisor", "responsavel", "decisao", "reuniao", "proximo passo"]],
        ],
      },
      {
        id: 7,
        type: "open",
        title:
          "Monte uma abordagem inicial para recepcionar um lead inbound que pediu informacoes sobre registro de marca. A abordagem deve acolher o interesse, demonstrar profissionalismo e abrir espaco para qualificacao.",
        guidance: "Boa resposta acolhe, contextualiza, pergunta de forma consultiva e evita despejar preco sem diagnostico.",
        rubric: [
          ["Acolhe o interesse", ["obrigado", "perfeito", "entendo", "legal", "claro"]],
          ["Demonstra profissionalismo", ["avaliar", "entender", "orientar", "especialista", "seguranca"]],
          ["Abre qualificacao", ["perguntas", "entender", "contexto", "marca", "empresa"]],
          ["Investiga urgencia ou situacao", ["urgencia", "prazo", "ja usa", "notificacao", "registro"]],
          ["Conduz proximo passo", ["posso", "vamos", "reuniao", "direcionar", "proximo passo"]],
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Leitura de oportunidades em PI e direcionamento",
    shortTitle: "Bloco 2",
    description: "Identificacao de oportunidades em marca, software, design, expansao internacional e demandas adjacentes.",
    questions: [
      {
        id: 8,
        type: "closed",
        title: 'O lead diz: "Minha marca ja esta registrada, mas estao usando um nome muito parecido." Qual e a melhor reacao do SDR?',
        options: [
          "Encerrar, pois se a marca ja esta registrada nao ha novo servico.",
          "Oferecer imediatamente um novo registro.",
          "Investigar o caso, entender uso, segmento, evidencias, impacto e direcionar para analise especializada.",
          "Garantir que o registro impede automaticamente o terceiro de usar marca parecida.",
        ],
        answer: 2,
      },
      {
        id: 9,
        type: "closed",
        title: "O lead pergunta sobre marca, mas durante a conversa diz que desenvolveu um aplicativo proprio. Qual conduta e mais adequada?",
        options: [
          "Ignorar, pois o lead veio por marca.",
          "Tentar vender registro de software imediatamente.",
          "Registrar a informacao, fazer perguntas basicas sobre titularidade e relevancia do ativo, e avaliar direcionamento complementar.",
          "Encaminhar diretamente para software sem qualificar a demanda de marca.",
        ],
        answer: 2,
      },
      {
        id: 10,
        type: "closed",
        title: "Um lead diz: \"Estamos lancando uma nova embalagem e queremos proteger.\" Qual pergunta inicial e melhor?",
        options: [
          "Voce quer registrar a marca da embalagem?",
          "Essa embalagem tem um nome?",
          "Quando falam em proteger a embalagem, voces se referem ao nome, ao visual/design, ao produto em si ou ao conjunto da estrategia?",
          "Voces sabem que embalagem nao pode ser patenteada?",
        ],
        answer: 2,
      },
      {
        id: 11,
        type: "closed",
        title: "O lead informa que pretende vender para fora do Brasil. Qual resposta demonstra melhor leitura comercial?",
        options: [
          "Entao voces precisam registrar a marca internacionalmente.",
          "Para quais paises, em qual prazo, com quais marcas/produtos e em que estagio esta essa expansao?",
          "O registro no Brasil ja protege parcialmente la fora.",
          "Isso deve ser tratado apenas depois que venderem no exterior.",
        ],
        answer: 1,
      },
      {
        id: 12,
        type: "closed",
        title:
          "Durante uma conversa sobre marca, o lead comenta que esta montando uma sociedade com outro socio e quer evitar problemas futuros. Qual deve ser a postura do SDR?",
        options: [
          "Explicar como dividir quotas e responsabilidades.",
          "Ignorar porque nao e PI.",
          "Investigar brevemente o contexto, registrar a demanda adjacente e direcionar para a area/especialista adequado.",
          "Voltar imediatamente ao roteiro de registro de marca.",
        ],
        answer: 2,
      },
      {
        id: 13,
        type: "open",
        title:
          "Um lead procura a Totall para registrar uma marca, mas durante a qualificacao voce identifica possiveis temas de software, contrato com fornecedor e expansao internacional. Como voce organizaria essa oportunidade para nao perder o foco principal e, ao mesmo tempo, nao deixar oportunidades importantes passarem?",
        guidance: "Resposta forte prioriza a demanda central, registra oportunidades adjacentes e direciona com contexto.",
        rubric: [
          ["Mantem foco principal em marca", ["marca", "principal", "prioridade", "foco", "demanda central"]],
          ["Registra temas adjacentes", ["software", "contrato", "internacional", "adjacente", "registrar"]],
          ["Qualifica cada frente", ["perguntar", "entender", "contexto", "titularidade", "paises"]],
          ["Organiza passagem clara", ["crm", "briefing", "registro", "historico", "resumo"]],
          ["Direciona especialista adequado", ["especialista", "closer", "area", "encaminhar", "direcionar"]],
        ],
      },
      {
        id: 14,
        type: "open",
        title:
          'O lead diz: "Ja tenho uma empresa que cuida das minhas marcas." Escreva cinco perguntas que voce faria para entender se existe oportunidade real, sem criticar o fornecedor atual e sem forcar uma venda.',
        guidance: "Avalie postura consultiva, respeito ao fornecedor atual, carteira, satisfacao, riscos, prazos e abertura para benchmark.",
        rubric: [
          ["Respeita fornecedor atual", ["entendo", "sem criticar", "atual", "fornecedor", "experiencia"]],
          ["Investiga satisfacao", ["satisfeito", "satisfacao", "atendimento", "experiencia", "como tem sido"]],
          ["Mapeia carteira e prazos", ["carteira", "vencimento", "renovacao", "processos", "marcas"]],
          ["Aprofunda riscos ou lacunas", ["risco", "problema", "dificuldade", "pendencia", "concorrente"]],
          ["Abre benchmark sem pressao", ["benchmark", "segunda opiniao", "comparar", "diagnostico", "avaliar"]],
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Organizacao, CRM e passagem para closer",
    shortTitle: "Bloco 3",
    description: "Priorizacao de rotina, qualidade de CRM, briefing para closer e autodiagnostico do SDR.",
    questions: [
      {
        id: 15,
        type: "closed",
        title: "Qual briefing e mais util para o closer?",
        options: [
          "Lead interessado em marca. Quer reuniao.",
          "Lead pediu preco. Parece bom.",
          "Empresa X quer registrar marca Y, ja usa ha 2 anos, atua em alimentos, recebeu alerta de concorrente parecido, decisor e o socio Joao, urgencia alta, reuniao marcada para avaliar estrategia.",
          "Lead veio pelo site e pediu contato.",
        ],
        answer: 2,
      },
      {
        id: 16,
        type: "closed",
        title: "Um lead pediu retorno em 30 dias porque esta aguardando definicao interna. Qual registro no CRM e mais correto?",
        options: [
          "Retornar depois.",
          "Sem interesse agora.",
          "Registrar motivo do prazo, quem decide, o que falta acontecer, data exata de retorno e proxima acao.",
          "Deixar aberto sem tarefa para acompanhar quando possivel.",
        ],
        answer: 2,
      },
      {
        id: 17,
        type: "closed",
        title: "O SDR recebe muitos leads no dia. Qual ordem tende a ser mais criteriosa?",
        options: [
          "Responder primeiro quem parece mais simpatico.",
          "Atender por ordem aleatoria, desde que todos sejam respondidos no dia.",
          "Priorizar SLA de inbound, urgencia, potencial, retornos prometidos e reunioes proximas.",
          "Priorizar apenas leads que pedem preco.",
        ],
        answer: 2,
      },
      {
        id: 18,
        type: "closed",
        title:
          "Uma reuniao foi marcada, mas o SDR nao registrou dor, contexto, decisor, urgencia nem origem do lead. Qual e o principal risco?",
        options: [
          "O closer pode mesmo assim conduzir normalmente.",
          "A reuniao perde contexto, o lead repete informacoes e a chance de conversao pode cair.",
          "Nao ha risco se a reuniao estiver na agenda.",
          "O problema e apenas administrativo.",
        ],
        answer: 1,
      },
      {
        id: 19,
        type: "closed",
        title: "O SDR esta com muitas oportunidades abertas, mas varias sem proxima acao. Qual diagnostico e mais adequado?",
        options: [
          "Pipeline cheio e sempre positivo.",
          "O SDR esta prospectando bem.",
          "Ha risco de pipeline artificial; oportunidade sem proxima acao definida precisa ser avancada, reciclada ou encerrada.",
          "O closer deve resolver isso depois.",
        ],
        answer: 2,
      },
      {
        id: 20,
        type: "open",
        title:
          "Voce recebeu hoje: 8 leads inbound novos; 3 retornos prometidos; 2 reunioes para confirmar; 5 leads antigos sem proxima acao; 1 lead urgente envolvendo possivel conflito de marca. Como voce organizaria sua rotina ate o fim do dia?",
        guidance: "Procure priorizacao por urgencia/SLA, compromissos, confirmacoes, CRM e limpeza de pipeline.",
        rubric: [
          ["Prioriza conflito urgente", ["urgente", "conflito", "prioridade", "notificacao", "risco"]],
          ["Respeita SLA de inbound", ["inbound", "sla", "rapido", "novos leads", "responder"]],
          ["Cumpre retornos prometidos", ["retornos", "prometidos", "combinado", "prazo", "follow up"]],
          ["Confirma reunioes", ["confirmar", "reunioes", "agenda", "closer", "contexto"]],
          ["Organiza CRM e proximas acoes", ["crm", "proxima acao", "pipeline", "registrar", "encerrar"]],
        ],
      },
      {
        id: 21,
        type: "open",
        title:
          "Crie um modelo de passagem de bastao ideal para o closer. Inclua quais informacoes obrigatorias o SDR deve registrar antes de marcar ou transferir uma reuniao.",
        guidance: "Boa resposta vira um briefing utilizavel: contexto, empresa, marca, dor, impacto, decisor, urgencia, origem e proximo passo.",
        rubric: [
          ["Identifica empresa, contato e marca", ["empresa", "contato", "marca", "lead", "origem"]],
          ["Resume contexto e dor", ["contexto", "dor", "problema", "necessidade", "motivo"]],
          ["Inclui decisor e processo", ["decisor", "responsavel", "processo", "autoridade", "socio"]],
          ["Indica urgencia, impacto e prazo", ["urgencia", "impacto", "prazo", "risco", "prioridade"]],
          ["Define proximo passo e observacoes", ["proximo passo", "reuniao", "agenda", "observacoes", "crm"]],
        ],
      },
      {
        id: 22,
        type: "diagnostic",
        title: "Questao final - autodiagnostico: em qual etapa voce acredita que mais precisa evoluir hoje?",
        options: [
          "Recepcao rapida do lead",
          "Qualificacao",
          "Perguntas de descoberta",
          "Identificacao de oportunidades em PI",
          "Identificacao de demandas adjacentes",
          "Registro no CRM",
          "Organizacao de rotina",
          "Passagem de bastao para closer",
        ],
        guidance: "Explique brevemente o motivo da sua escolha.",
      },
    ],
  },
];

const questions = sections.flatMap((section) => section.questions.map((question) => ({ ...question, sectionId: section.id })));
const state = {
  currentSection: 0,
  completedSections: new Set(),
  values: {},
  submitted: false,
  submission: null,
};

const letterLabels = ["a", "b", "c", "d", "e", "f", "g", "h"];
const ownerEmail = "rodrigo.melo@totallpi.co";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("examDate").valueAsDate = new Date();
  renderSectionNavigation();
  renderQuestions();
  bindEvents();
  updateProgress();
});

function bindEvents() {
  document.getElementById("examForm").addEventListener("input", () => {
    saveCurrentSectionValues();
    state.completedSections.delete(currentSection().id);
    updateProgress();
  });
  document.getElementById("candidateForm").addEventListener("input", updateProgress);
  document.getElementById("examForm").addEventListener("submit", handleSubmit);
  document.getElementById("clearButton").addEventListener("click", clearExam);
  document.getElementById("copyButton").addEventListener("click", copyResult);
  document.getElementById("emailButton").addEventListener("click", sendCandidateCopyEmail);
  document.getElementById("printButton").addEventListener("click", () => window.print());
  document.getElementById("previousSectionButton").addEventListener("click", goToPreviousSection);
  document.getElementById("sectionActionButton").addEventListener("click", handleSectionAction);
}

function renderSectionNavigation() {
  document.getElementById("sectionTabs").innerHTML = sections
    .map(
      (section, index) => `
        <button
          type="button"
          class="section-tab"
          data-section-index="${index}"
          aria-current="${index === state.currentSection ? "step" : "false"}"
        >
          <span>${section.shortTitle}</span>
          <strong>${escapeHtml(section.title)}</strong>
        </button>
      `
    )
    .join("");

  document.querySelectorAll(".section-tab").forEach((button) => {
    button.addEventListener("click", () => {
      const target = Number(button.dataset.sectionIndex);
      if (canOpenSection(target)) {
        state.currentSection = target;
        renderQuestions();
        updateProgress();
      } else {
        setFinishStatus("Finalize todas as respostas do bloco atual antes de avancar.");
      }
    });
  });
}

function renderQuestions() {
  const section = currentSection();
  document.getElementById("sectionEyebrow").textContent = section.shortTitle;
  document.getElementById("sectionTitle").textContent = section.title;
  document.getElementById("sectionDescription").textContent = section.description;
  document.getElementById("questions").innerHTML = section.questions.map(renderQuestion).join("");
  updateSectionControls();
}

function renderQuestion(question) {
  const eyebrow =
    question.type === "closed" ? "Multipla escolha" : question.type === "diagnostic" ? "Autodiagnostico" : "Resposta aberta";
  const body = question.type === "closed" ? renderOptions(question) : question.type === "diagnostic" ? renderDiagnostic(question) : renderOpen(question);

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

function renderOptions(question) {
  return `<div class="options">${question.options
    .map(
      (option, index) => `
        <label class="option">
          <input type="radio" name="q${question.id}" value="${index}" ${getAnswerValue(question.id) === String(index) ? "checked" : ""} required />
          <span>${letterLabels[index]}) ${escapeHtml(option)}</span>
        </label>
      `
    )
    .join("")}</div>`;
}

function renderOpen(question) {
  return `<textarea name="q${question.id}" rows="6" minlength="20" required placeholder="Digite a resposta do candidato...">${escapeHtml(
    getAnswerValue(question.id)
  )}</textarea>
    <p class="guidance">${escapeHtml(question.guidance)}</p>`;
}

function renderDiagnostic(question) {
  return `
    <div class="options diagnostic-options">
      ${question.options
        .map(
          (option, index) => `
            <label class="option">
              <input type="radio" name="q${question.id}" value="${index}" ${getAnswerValue(question.id) === String(index) ? "checked" : ""} required />
              <span>${letterLabels[index]}) ${escapeHtml(option)}</span>
            </label>
          `
        )
        .join("")}
    </div>
    <textarea name="q${question.id}_explain" rows="4" minlength="12" required placeholder="Explique brevemente...">${escapeHtml(
      getAnswerValue(`${question.id}_explain`)
    )}</textarea>
    <p class="guidance">${escapeHtml(question.guidance)}</p>
  `;
}

function handleSectionAction() {
  saveCurrentSectionValues();
  setFinishStatus("");
  if (!document.getElementById("candidateForm").reportValidity()) return;

  const section = currentSection();
  if (!validateCurrentSection()) {
    setFinishStatus("Responda todas as perguntas deste bloco antes de continuar.");
    return;
  }

  state.completedSections.add(section.id);
  if (isLastSection()) {
    document.getElementById("examForm").requestSubmit();
    return;
  }

  state.currentSection += 1;
  renderQuestions();
  updateProgress();
  document.getElementById("sectionTitle").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function handleSubmit(event) {
  event.preventDefault();
  saveCurrentSectionValues();

  if (!document.getElementById("candidateForm").reportValidity()) return;
  if (!validateCurrentSection()) {
    setFinishStatus("Responda todas as perguntas do ultimo bloco antes de finalizar.");
    return;
  }

  state.completedSections.add(currentSection().id);
  const result = calculateResult();
  const submitButton = document.getElementById("sectionActionButton");
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
    updateSectionControls();
  }
}

function calculateResult() {
  const closed = questions.filter((question) => question.type === "closed");
  const open = questions.filter((question) => question.type === "open");
  const correctClosed = closed.filter((question) => Number(getAnswerValue(question.id)) === question.answer).length;
  const completedOpen = open.filter((question) => String(getAnswerValue(question.id) || "").trim().length >= 20).length;
  const diagnosticCompleted = questions.filter((question) => question.type === "diagnostic" && isAnswered(question)).length;
  const openEvaluation = evaluateOpenAnswers();
  const closedRate = Math.round((correctClosed / closed.length) * 100);

  return {
    correctClosed,
    closedTotal: closed.length,
    completedOpen,
    openTotal: open.length,
    diagnosticCompleted,
    diagnosticTotal: questions.filter((question) => question.type === "diagnostic").length,
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
  const title = resultTitleFromRate(combinedRate);
  const feedback =
    combinedRate >= 85
      ? "O conjunto de respostas indica boa leitura de inbound, qualificacao, oportunidades em PI e passagem para closer."
      : combinedRate >= 70
        ? "O resultado automatico e positivo, mas vale revisar os pontos fracos das respostas abertas antes da decisao final."
        : "O candidato precisa demonstrar mais dominio em qualificacao, leitura de oportunidade, rotina de CRM e direcionamento ao closer.";

  document.getElementById("resultTitle").textContent = title;
  document.getElementById("resultFeedback").textContent = feedback;
  renderOpenEvaluation(result.openEvaluation);
  renderSubmissionStatus(submission);
}

function evaluateOpenAnswers() {
  const items = questions
    .filter((question) => question.type === "open")
    .map((question) => evaluateOpenQuestion(question, String(getAnswerValue(question.id) || "")));
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
    : `${currentSection().shortTitle}: ${sectionAnsweredCount(currentSection())}/${currentSection().questions.length} respostas preenchidas.`;

  document.querySelectorAll(".section-tab").forEach((button, index) => {
    const section = sections[index];
    button.setAttribute("aria-current", index === state.currentSection ? "step" : "false");
    button.classList.toggle("is-active", index === state.currentSection);
    button.classList.toggle("is-complete", state.completedSections.has(section.id));
    button.disabled = !canOpenSection(index);
  });
  updateSectionControls();
}

function isAnswered(question) {
  const fieldName = `q${question.id}`;
  if (question.type === "closed") {
    return Boolean(document.querySelector(`input[name="${fieldName}"]:checked`)) || getAnswerValue(question.id) !== "";
  }
  if (question.type === "diagnostic") {
    const selected = Boolean(document.querySelector(`input[name="${fieldName}"]:checked`)) || getAnswerValue(question.id) !== "";
    const explanation =
      document.querySelector(`textarea[name="${fieldName}_explain"]`)?.value.trim() || getAnswerValue(`${question.id}_explain`);
    return selected && explanation.length >= 12;
  }
  const value = document.querySelector(`textarea[name="${fieldName}"]`)?.value.trim() || getAnswerValue(question.id);
  return value.length >= 20;
}

function validateCurrentSection() {
  const invalidQuestion = currentSection().questions.find((question) => !isAnswered(question));
  if (!invalidQuestion) return true;
  const field = document.querySelector(`[name="q${invalidQuestion.id}"]`);
  field?.reportValidity();
  document.getElementById(`question-${invalidQuestion.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
}

function sectionAnsweredCount(section) {
  return section.questions.filter((question) => isAnswered(question)).length;
}

function canOpenSection(targetIndex) {
  if (targetIndex <= state.currentSection) return true;
  return sections.slice(0, targetIndex).every((section) => state.completedSections.has(section.id));
}

function updateSectionControls() {
  const previousButton = document.getElementById("previousSectionButton");
  const actionButton = document.getElementById("sectionActionButton");
  previousButton.disabled = state.currentSection === 0 || state.submitted;
  actionButton.textContent = isLastSection() ? "Finalizar prova" : "Finalizar bloco e avancar";
  actionButton.hidden = state.submitted;
}

function goToPreviousSection() {
  saveCurrentSectionValues();
  if (state.currentSection === 0 || state.submitted) return;
  state.currentSection -= 1;
  renderQuestions();
  updateProgress();
  document.getElementById("sectionTitle").scrollIntoView({ behavior: "smooth", block: "start" });
}

function currentSection() {
  return sections[state.currentSection];
}

function saveCurrentSectionValues() {
  currentSection().questions.forEach((question) => {
    const fieldName = `q${question.id}`;
    const selected = document.querySelector(`input[name="${fieldName}"]:checked`);
    const text = document.querySelector(`textarea[name="${fieldName}"]`);
    if (selected) state.values[fieldName] = selected.value;
    if (text) state.values[fieldName] = text.value;

    if (question.type === "diagnostic") {
      const explanation = document.querySelector(`textarea[name="${fieldName}_explain"]`);
      if (explanation) state.values[`${fieldName}_explain`] = explanation.value;
    }
  });
}

function getAnswerValue(questionId) {
  return state.values[`q${questionId}`] || "";
}

function isLastSection() {
  return state.currentSection === sections.length - 1;
}

function clearExam() {
  document.getElementById("examForm").reset();
  document.getElementById("candidateForm").reset();
  document.getElementById("examDate").valueAsDate = new Date();
  document.getElementById("resultCard").hidden = true;
  state.currentSection = 0;
  state.completedSections.clear();
  state.values = {};
  state.submitted = false;
  state.submission = null;
  setFinishStatus("");
  setEmailStatus("Envio automatico", "Ao finalizar, o resultado e enviado para Rodrigo e fica registrado no servidor.");
  renderQuestions();
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
  saveCurrentSectionValues();
  const result = calculateResult();
  const candidate = document.getElementById("candidateName").value.trim() || "Nao informado";
  const email = document.getElementById("resultEmail").value.trim() || "Nao informado";
  const date = document.getElementById("examDate").value || "Nao informada";
  const reviewer = document.getElementById("reviewerName").value.trim() || "Nao informado";
  const answers = questions.map((question) => `${question.id}. ${answerText(question)}`).join("\n");

  return [
    "Avaliacao de Calibracao SDR - Totall",
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
  saveCurrentSectionValues();
  const candidate = document.getElementById("candidateName").value.trim();
  const candidateEmail = document.getElementById("resultEmail").value.trim();
  const date = document.getElementById("examDate").value;
  const reviewer = document.getElementById("reviewerName").value.trim();
  const combinedRate = Math.round((result.closedRate + result.openEvaluation.rate) / 2);

  return {
    ownerEmail,
    candidate: {
      name: candidate,
      email: candidateEmail,
    },
    exam: {
      date,
      reviewer,
      title: resultTitleFromRate(combinedRate),
      result,
      sections: sections.map((section) => ({
        id: section.id,
        title: section.title,
        answered: sectionAnsweredCount(section),
        total: section.questions.length,
      })),
    },
    answers: questions.map((question) => {
      const value = getAnswerValue(question.id);
      const explanation = getAnswerValue(`${question.id}_explain`);
      return {
        id: question.id,
        sectionId: question.sectionId,
        type: question.type,
        title: question.title,
        selectedIndex: question.type === "closed" || question.type === "diagnostic" ? Number(value) : null,
        selectedLabel: question.type === "closed" || question.type === "diagnostic" ? letterLabels[Number(value)] || null : null,
        selectedText:
          question.type === "closed" || question.type === "diagnostic" ? question.options[Number(value)] || "" : "",
        correct: question.type === "closed" ? Number(value) === question.answer : null,
        answer: question.type === "open" ? String(value || "").trim() : question.type === "diagnostic" ? String(explanation || "").trim() : "",
        evaluation:
          question.type === "open"
            ? result.openEvaluation.items.find((item) => item.id === question.id) || null
            : null,
      };
    }),
  };
}

function answerText(question) {
  const value = getAnswerValue(question.id);
  if (question.type === "closed") {
    return `${letterLabels[Number(value)] || "-"} - ${question.options[Number(value)] || "Sem resposta"}`;
  }
  if (question.type === "diagnostic") {
    return `${letterLabels[Number(value)] || "-"} - ${question.options[Number(value)] || "Sem resposta"} | ${String(
      getAnswerValue(`${question.id}_explain`) || "Sem explicacao"
    ).trim()}`;
  }
  return String(value || "Sem resposta").trim();
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
  saveCurrentSectionValues();
  const result = calculateResult();
  const candidate = document.getElementById("candidateName").value.trim() || "Nao informado";
  const email = document.getElementById("resultEmail").value.trim() || "Nao informado";
  const date = document.getElementById("examDate").value || "Nao informada";
  const reviewer = document.getElementById("reviewerName").value.trim() || "Nao informado";
  const title = document.getElementById("resultTitle").textContent || "Resultado";
  const feedback = document.getElementById("resultFeedback").textContent || "";

  return [
    "Avaliacao de Calibracao SDR - Totall",
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

function resultTitleFromRate(rate) {
  if (rate >= 85) return "Excelente calibracao SDR";
  if (rate >= 70) return "Boa calibracao SDR";
  return "Revisao recomendada";
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
