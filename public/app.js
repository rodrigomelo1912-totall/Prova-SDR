"use strict";

const state = {
  board: null,
  items: [],
  users: [],
  activeTab: "request",
};

const doneStatuses = new Set(["feito", "concluido", "concluida", "done"]);

document.addEventListener("DOMContentLoaded", () => {
  bindTabs();
  bindForms();
  loadInitialData();
});

function bindTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.activeTab = button.dataset.tab;
      document.querySelectorAll(".tab").forEach((tab) => tab.classList.toggle("is-active", tab === button));
      document.getElementById("requestPanel").classList.toggle("is-active", state.activeTab === "request");
      document.getElementById("reportsPanel").classList.toggle("is-active", state.activeTab === "reports");
      if (state.activeTab === "reports") renderReports();
    });
  });
}

function bindForms() {
  document.getElementById("quickForm").addEventListener("submit", handleCreateDemand);
  document.getElementById("refreshButton").addEventListener("click", loadMondayItems);
  document.getElementById("reportSearchInput").addEventListener("input", renderReports);
  document.getElementById("reportStatusFilter").addEventListener("change", renderReports);
}

async function loadInitialData() {
  await Promise.all([loadMondayUsers(), loadMondayItems()]);
}

async function loadMondayUsers() {
  try {
    const payload = await api("/api/monday/users");
    state.users = payload.users || [];
    renderUserSelect(document.getElementById("responsibleSelect"));
    if (state.activeTab === "reports") renderReports();
  } catch (error) {
    state.users = [];
    renderUserSelect(document.getElementById("responsibleSelect"), "", "Nao foi possivel carregar usuarios");
  }
}

async function loadMondayItems() {
  setConnectionStatus("Sincronizando com o Monday...");
  try {
    const payload = await api("/api/monday/items");
    state.board = payload.board;
    state.items = payload.items || [];
    setConnectionStatus(`${state.board?.name || "Board"} sincronizado`);
    renderReports();
  } catch (error) {
    setConnectionStatus(error.message);
    document.getElementById("reportGrid").innerHTML = `<div class="empty-state">${escapeHtml(error.message)}</div>`;
  }
}

async function handleCreateDemand(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const button = form.querySelector("button[type='submit']");
  const status = document.getElementById("quickStatus");
  const payload = Object.fromEntries(new FormData(form).entries());

  button.disabled = true;
  status.textContent = "Criando no Monday...";

  try {
    await api("/api/monday/items", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    form.reset();
    form.type.value = "Atividade";
    form.status.value = "Em progresso";
    form.responsibleId.value = "";
    status.textContent = "Demanda criada em ATIVIDADES.";
    await loadMondayItems();
  } catch (error) {
    status.textContent = error.message;
  } finally {
    button.disabled = false;
  }
}

function renderReports() {
  const items = filteredReportItems();
  renderReportCards(items);
  renderReportTable(items);
}

function filteredReportItems() {
  const query = normalize(document.getElementById("reportSearchInput").value);
  const selectedStatus = document.getElementById("reportStatusFilter").value;
  return state.items
    .filter((item) => !selectedStatus || item.status === selectedStatus)
    .filter((item) => {
      if (!query) return true;
      return normalize([item.name, item.status, item.type, item.group?.title, item.responsible].join(" ")).includes(query);
    })
    .sort(sortByPriority);
}

function renderReportCards(items) {
  const active = items.filter((item) => !isDone(item));
  const done = items.filter(isDone);
  const late = active.filter(isLate);
  const byStatus = countBy(items, (item) => item.status || "Sem status");
  const byResponsible = countBy(items, (item) => item.responsible || "Sem responsavel");

  document.getElementById("reportGrid").innerHTML = `
    ${metricCard("Total filtrado", items.length, "Demandas dentro dos filtros atuais")}
    ${metricCard("Em andamento", active.length, "Itens ainda nao concluidos")}
    ${metricCard("Concluidas", done.length, "Itens marcados como feito ou em concluidos")}
    ${metricCard("Atrasadas", late.length, "Itens em aberto com prazo vencido", late.length ? "danger" : "")}
    ${distributionCard("Por status", byStatus)}
    ${distributionCard("Por responsavel", byResponsible)}
  `;
}

function renderReportTable(items) {
  const body = document.getElementById("reportTableBody");
  if (!items.length) {
    body.innerHTML = `<tr><td colspan="5">Nenhuma demanda encontrada para o filtro atual.</td></tr>`;
    return;
  }

  body.innerHTML = items
    .map(
      (item) => `
        <tr>
          <td>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.type || "Sem tipo")}</span>
          </td>
          <td>${statusPill(item)}</td>
          <td>${escapeHtml(item.responsible || "Sem responsavel")}</td>
          <td>${escapeHtml(item.dueDate || "Sem prazo")}</td>
          <td>${escapeHtml(item.group?.title || "Sem grupo")}</td>
        </tr>
      `
    )
    .join("");
}

function metricCard(title, value, caption, tone = "") {
  return `
    <article class="report-card ${tone}">
      <span>${escapeHtml(title)}</span>
      <strong>${value}</strong>
      <p>${escapeHtml(caption)}</p>
    </article>
  `;
}

function distributionCard(title, entries) {
  const rows = Object.entries(entries).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "pt-BR"));
  const max = Math.max(...rows.map((entry) => entry[1]), 1);
  return `
    <article class="report-card distribution">
      <span>${escapeHtml(title)}</span>
      <div class="distribution-list">
        ${
          rows.length
            ? rows
                .map(
                  ([label, value]) => `
                    <div class="distribution-row">
                      <div>
                        <strong>${escapeHtml(label)}</strong>
                        <span>${value}</span>
                      </div>
                      <div class="bar"><i style="width: ${(value / max) * 100}%"></i></div>
                    </div>
                  `
                )
                .join("")
            : "<p>Nenhum dado para exibir.</p>"
        }
      </div>
    </article>
  `;
}

function statusPill(item) {
  const late = isLate(item);
  return `<span class="table-pill ${late ? "danger" : ""}">${escapeHtml(late ? `${item.status || "Sem status"} / Atrasada` : item.status || "Sem status")}</span>`;
}

function countBy(items, getKey) {
  return items.reduce((acc, item) => {
    const key = getKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function renderUserSelect(select, selectedId = "", fallbackLabel = "Selecione o responsavel") {
  select.innerHTML = userOptions(selectedId, fallbackLabel);
}

function userOptions(selectedId = "", fallbackLabel = "Selecione o responsavel") {
  const options = [`<option value="">${escapeHtml(fallbackLabel)}</option>`];
  for (const user of state.users) {
    options.push(
      `<option value="${escapeHtml(user.id)}" ${String(user.id) === String(selectedId) ? "selected" : ""}>${escapeHtml(
        user.name
      )}</option>`
    );
  }
  return options.join("");
}

function responsibleId(item) {
  const persons = item.columns?.multiple_person_mkq0vh7d?.value?.personsAndTeams || [];
  const person = persons.find((entry) => entry.kind === "person") || persons[0];
  return person?.id ? String(person.id) : "";
}

function sortByPriority(a, b) {
  if (isLate(a) !== isLate(b)) return isLate(a) ? -1 : 1;
  return (Number(b.gut || 0) || 0) - (Number(a.gut || 0) || 0);
}

function isDone(item) {
  return doneStatuses.has(normalize(item.status)) || normalize(item.group?.title).includes("concluid");
}

function isLate(item) {
  if (!item.dueDate || isDone(item)) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${item.dueDate}T00:00:00`);
  return due < today;
}

function dateValue(item) {
  return /^\d{4}-\d{2}-\d{2}$/.test(item.dueDate) ? item.dueDate : "";
}

async function api(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Erro HTTP ${response.status}`);
  return body;
}

function setConnectionStatus(message) {
  document.getElementById("connectionStatus").textContent = message;
}

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
