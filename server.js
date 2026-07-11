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
const MONDAY_API_URL = "https://api.monday.com/v2";
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID || "18421402809";

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

    if (url.pathname === "/api/monday/board" && request.method === "GET") {
      sendJson(response, 200, await getMondayBoard());
      return;
    }

    if (url.pathname === "/api/monday/users" && request.method === "GET") {
      sendJson(response, 200, await listMondayUsers());
      return;
    }

    if (url.pathname === "/api/monday/items" && request.method === "GET") {
      sendJson(response, 200, await listMondayItems());
      return;
    }

    if (url.pathname === "/api/monday/items" && request.method === "POST") {
      sendJson(response, 201, await createMondayItem(await readJsonBody(request)));
      return;
    }

    const mondayItemMatch = url.pathname.match(/^\/api\/monday\/items\/(\d+)$/);
    if (mondayItemMatch && request.method === "PATCH") {
      sendJson(response, 200, await updateMondayItem(mondayItemMatch[1], await readJsonBody(request)));
      return;
    }

    const mondayUpdateMatch = url.pathname.match(/^\/api\/monday\/items\/(\d+)\/updates$/);
    if (mondayUpdateMatch && request.method === "POST") {
      sendJson(response, 201, await addMondayUpdate(mondayUpdateMatch[1], await readJsonBody(request)));
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
  console.log(`Totall Hub CFO rodando em http://localhost:${PORT}`);
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

async function getMondayBoard() {
  const query = `query($ids:[ID!]) {
    boards(ids:$ids) {
      id
      name
      groups { id title }
      columns { id title type settings_str }
    }
  }`;
  const data = await mondayRequest(query, { ids: [MONDAY_BOARD_ID] });
  const board = data.boards?.[0];
  if (!board) {
    const error = new Error("Board do Monday nao encontrado.");
    error.statusCode = 404;
    throw error;
  }

  return {
    ...board,
    columns: board.columns.map((column) => ({
      ...column,
      settings: parseJson(column.settings_str, {}),
      settings_str: undefined,
    })),
    defaults: mondayDefaults(board),
  };
}

async function listMondayItems() {
  const query = `query($ids:[ID!]) {
    boards(ids:$ids) {
      id
      name
      groups { id title }
      columns { id title type settings_str }
      items_page(limit: 100) {
        items {
          id
          name
          group { id title }
          updated_at
          column_values {
            id
            text
            value
            type
            column { title }
          }
        }
      }
    }
  }`;
  const data = await mondayRequest(query, { ids: [MONDAY_BOARD_ID] });
  const board = data.boards?.[0];
  if (!board) return { board: null, items: [] };

  return {
    board: {
      id: board.id,
      name: board.name,
      groups: board.groups,
      columns: board.columns.map((column) => ({
        ...column,
        settings: parseJson(column.settings_str, {}),
        settings_str: undefined,
      })),
      defaults: mondayDefaults(board),
    },
    items: board.items_page.items.map(formatMondayItem),
  };
}

async function listMondayUsers() {
  const query = `query($ids:[ID!]) {
    boards(ids:$ids) {
      subscribers { id name email enabled }
    }
    users(limit: 100) { id name email enabled }
  }`;
  const data = await mondayRequest(query, { ids: [MONDAY_BOARD_ID] });
  const subscriberIds = new Set((data.boards?.[0]?.subscribers || []).map((user) => String(user.id)));
  const users = (data.users || [])
    .filter((user) => user.enabled !== false)
    .map((user) => ({
      id: String(user.id),
      name: user.name,
      email: user.email,
      isBoardSubscriber: subscriberIds.has(String(user.id)),
    }))
    .sort((a, b) => Number(b.isBoardSubscriber) - Number(a.isBoardSubscriber) || a.name.localeCompare(b.name, "pt-BR"));

  return { users };
}

async function createMondayItem(payload) {
  const board = await getMondayBoard();
  const defaults = board.defaults;
  const itemName = cleanText(payload.name, 180);
  if (!itemName) {
    const error = new Error("Informe um titulo para criar a demanda.");
    error.statusCode = 400;
    throw error;
  }
  if (!/^\d+$/.test(String(payload.responsibleId || ""))) {
    const error = new Error("Selecione o responsavel da demanda na coluna R.");
    error.statusCode = 400;
    throw error;
  }

  const columnValues = buildMondayColumnValues(payload);
  const mutation = `mutation($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON!) {
    create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
      id
      name
    }
  }`;
  const data = await mondayRequest(mutation, {
    boardId: MONDAY_BOARD_ID,
    groupId: payload.groupId || defaults.activeGroupId,
    itemName,
    columnValues: JSON.stringify(columnValues),
  });

  if (payload.note) {
    await addMondayUpdate(data.create_item.id, { body: payload.note });
  }

  return { ok: true, item: data.create_item };
}

async function updateMondayItem(itemId, payload) {
  const columnValues = buildMondayColumnValues(payload);
  if (Object.keys(columnValues).length) {
    const mutation = `mutation($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
      change_multiple_column_values(board_id: $boardId, item_id: $itemId, column_values: $columnValues) {
        id
      }
    }`;
    await mondayRequest(mutation, {
      boardId: MONDAY_BOARD_ID,
      itemId,
      columnValues: JSON.stringify(columnValues),
    });
  }

  if (payload.groupId) {
    const mutation = `mutation($itemId: ID!, $groupId: String!) {
      move_item_to_group(item_id: $itemId, group_id: $groupId) { id }
    }`;
    await mondayRequest(mutation, { itemId, groupId: payload.groupId });
  }

  if (payload.note) {
    await addMondayUpdate(itemId, { body: payload.note });
  }

  return { ok: true, itemId };
}

async function addMondayUpdate(itemId, payload) {
  const body = cleanText(payload.body || payload.note, 4000);
  if (!body) {
    const error = new Error("Escreva uma atualizacao antes de enviar.");
    error.statusCode = 400;
    throw error;
  }

  const mutation = `mutation($itemId: ID!, $body: String!) {
    create_update(item_id: $itemId, body: $body) { id body created_at }
  }`;
  const data = await mondayRequest(mutation, { itemId, body });
  return { ok: true, update: data.create_update };
}

function buildMondayColumnValues(payload) {
  const values = {};
  setStatusValue(values, "status", payload.status);
  setStatusValue(values, "color_mkt2c2q2", payload.type);
  setStatusValue(values, "label_mkmyvsg5", payload.tendency);
  setDateValue(values, "data_mkmxbvwx", payload.dueDate);
  setNumberValue(values, "dura__o_mkmxz7sk", payload.duration);
  setNumberValue(values, "n_meros_mkmxfyjm", payload.gravity);
  setNumberValue(values, "dup__of_g_mkmx8sc8", payload.urgency);
  setNumberValue(values, "dup__of_dup__of_g_mkmxjxm3", payload.trend);
  setNumberValue(values, "n_meros7__1", payload.projectBudget);
  setPeopleValue(values, "multiple_person_mkq0vh7d", payload.responsibleId);
  if (payload.timelineStart || payload.timelineEnd) {
    values.cronograma_mkmxw705 = {
      from: payload.timelineStart || payload.dueDate || null,
      to: payload.timelineEnd || payload.dueDate || payload.timelineStart || null,
    };
  }
  return values;
}

function setPeopleValue(values, columnId, personId) {
  const id = String(personId || "").trim();
  if (/^\d+$/.test(id)) {
    values[columnId] = { personsAndTeams: [{ id: Number(id), kind: "person" }] };
  }
}

function setStatusValue(values, columnId, label) {
  const safeLabel = cleanText(label, 80);
  if (safeLabel) values[columnId] = { label: safeLabel };
}

function setDateValue(values, columnId, date) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(date || ""))) {
    values[columnId] = { date };
  }
}

function setNumberValue(values, columnId, number) {
  if (number === undefined || number === null || number === "") return;
  const parsed = Number(number);
  if (Number.isFinite(parsed)) values[columnId] = parsed;
}

async function mondayRequest(query, variables) {
  if (!process.env.MONDAY_API_TOKEN) {
    const error = new Error("Configure MONDAY_API_TOKEN no arquivo .env.");
    error.statusCode = 500;
    throw error;
  }

  const response = await fetch(MONDAY_API_URL, {
    method: "POST",
    headers: {
      Authorization: process.env.MONDAY_API_TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || body.errors) {
    const error = new Error(body.errors?.[0]?.message || body.error_message || `Monday retornou HTTP ${response.status}`);
    error.statusCode = response.ok ? 400 : response.status;
    error.details = body;
    throw error;
  }
  return body.data;
}

function formatMondayItem(item) {
  const values = Object.fromEntries(
    item.column_values.map((value) => [
      value.id,
      {
        id: value.id,
        title: value.column?.title || value.id,
        type: value.type,
        text: value.text || "",
        value: parseJson(value.value, null),
      },
    ])
  );

  return {
    id: item.id,
    name: item.name,
    group: item.group,
    updatedAt: item.updated_at,
    status: values.status?.text || "",
    type: values.color_mkt2c2q2?.text || "",
    dueDate: values.data_mkmxbvwx?.text || "",
    tendency: values.label_mkmyvsg5?.text || "",
    responsible: values.multiple_person_mkq0vh7d?.text || "",
    duration: values.dura__o_mkmxz7sk?.text || "",
    gravity: values.n_meros_mkmxfyjm?.text || "",
    urgency: values.dup__of_g_mkmx8sc8?.text || "",
    trend: values.dup__of_dup__of_g_mkmxjxm3?.text || "",
    gut: values.f_rmula_mkmxwr7q?.text || "",
    columns: values,
  };
}

function mondayDefaults(board) {
  const groups = board.groups || [];
  return {
    activeGroupId: groups.find((group) => normalizeText(group.title).includes("atividades"))?.id || groups[0]?.id || "topics",
    doneGroupId: groups.find((group) => normalizeText(group.title).includes("concluid"))?.id || "",
    standbyGroupId: groups.find((group) => normalizeText(group.title).includes("standby"))?.id || "",
  };
}

function cleanText(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function parseJson(value, fallback) {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch (error) {
    return fallback;
  }
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
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
