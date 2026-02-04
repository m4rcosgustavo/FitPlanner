// ===== BLOQUEIO (precisa estar logado) =====
if (localStorage.getItem("fitplanner_logado") !== "true") {
  window.location.href = "./login.html";
}

// ===== Util: chave de treinos por usuário =====
function getEmailLogado() {
  return (localStorage.getItem("fitplanner_email") || "").trim().toLowerCase();
}

function getTreinosKey() {
  const email = getEmailLogado();
  return `fitplanner_treinos__${email || "anon"}`;
}

// ===== Botão Sair no menu (app) =====
(function () {
  const nav = document.querySelector(".nav");
  if (!nav) return;
  if (nav.querySelector("#btnSair")) return;

  const btn = document.createElement("a");
  btn.id = "btnSair";
  btn.href = "#";
  btn.className = "nav-link";
  btn.textContent = "Sair";

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("fitplanner_logado");
    localStorage.removeItem("fitplanner_email");
    window.location.href = "../index.html";
  });

  nav.appendChild(btn);
})();

const listaEl = document.getElementById("lista");
const msgEl = document.getElementById("msg");

const qtdTreinosEl = document.getElementById("qtdTreinos");
const volumeTotalEl = document.getElementById("volumeTotal");

// editar
const editForm = document.getElementById("editForm");
const editId = document.getElementById("editId");
const editNomeTreino = document.getElementById("editNomeTreino");
const editExercicio = document.getElementById("editExercicio");
const editSeries = document.getElementById("editSeries");
const editReps = document.getElementById("editReps");
const editCarga = document.getElementById("editCarga");
const editMsg = document.getElementById("editMsg");
const cancelBtn = document.getElementById("cancelBtn");

function getTreinos() {
  const dados = localStorage.getItem(getTreinosKey());
  if (!dados) return [];
  return JSON.parse(dados);
}

function saveTreinos(lista) {
  localStorage.setItem(getTreinosKey(), JSON.stringify(lista));
}

function calcVolume(t) {
  return t.series * t.reps * (t.carga || 0);
}

function atualizarResumo(treinos) {
  qtdTreinosEl.textContent = treinos.length;

  let total = 0;
  for (let i = 0; i < treinos.length; i++) {
    total += calcVolume(treinos[i]);
  }
  volumeTotalEl.textContent = total;
}

function render() {
  const treinos = getTreinos();
  atualizarResumo(treinos);

  listaEl.innerHTML = "";

  if (treinos.length === 0) {
    msgEl.textContent = "Nenhum treino cadastrado ainda.";
    return;
  }

  msgEl.textContent = "";

  treinos.forEach((t) => {
    const item = document.createElement("div");
    item.className = "item";

    const volume = calcVolume(t);

    item.innerHTML = `
      <div class="item-top">
        <div>
          <p class="item-title">${t.nomeTreino}</p>
          <p class="item-sub">
            <b>Exercício:</b> ${t.exercicio} •
            <b>Séries:</b> ${t.series} •
            <b>Reps:</b> ${t.reps} •
            <b>Carga:</b> ${t.carga}kg
          </p>
          <span class="badge">Volume: ${volume}</span>
        </div>

        <div class="item-actions">
          <button class="btn-mini btn-edit" data-edit="${t.id}">Editar</button>
          <button class="btn-mini btn-del" data-del="${t.id}">Remover</button>
        </div>
      </div>
    `;

    listaEl.appendChild(item);
  });
}

// remover
listaEl.addEventListener("click", (e) => {
  const delId = e.target.getAttribute("data-del");
  if (!delId) return;

  const treinos = getTreinos();
  const novaLista = treinos.filter((t) => String(t.id) !== String(delId));
  saveTreinos(novaLista);

  msgEl.textContent = "Treino removido!";
  setTimeout(() => (msgEl.textContent = ""), 1500);

  render();
});

// preencher edição
listaEl.addEventListener("click", (e) => {
  const edit = e.target.getAttribute("data-edit");
  if (!edit) return;

  const treinos = getTreinos();
  const treino = treinos.find((t) => String(t.id) === String(edit));
  if (!treino) return;

  editId.value = treino.id;
  editNomeTreino.value = treino.nomeTreino;
  editExercicio.value = treino.exercicio;
  editSeries.value = treino.series;
  editReps.value = treino.reps;
  editCarga.value = treino.carga;

  editMsg.textContent = "Editando treino... (não esqueça de salvar)";
});

// salvar edição
editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = editId.value;
  if (!id) {
    editMsg.textContent = "Clique em 'Editar' em algum treino primeiro.";
    return;
  }

  const nomeTreino = editNomeTreino.value.trim();
  const exercicio = editExercicio.value.trim();
  const series = Number(editSeries.value);
  const reps = Number(editReps.value);
  const carga = Number(editCarga.value);

  if (!nomeTreino || !exercicio) {
    editMsg.textContent = "Preencha nome do treino e exercício.";
    return;
  }
  if (!Number.isFinite(series) || series < 1) {
    editMsg.textContent = "Séries deve ser maior que 0.";
    return;
  }
  if (!Number.isFinite(reps) || reps < 1) {
    editMsg.textContent = "Repetições deve ser maior que 0.";
    return;
  }
  if (!Number.isFinite(carga) || carga < 0) {
    editMsg.textContent = "Carga inválida.";
    return;
  }

  const treinos = getTreinos();
  const idx = treinos.findIndex((t) => String(t.id) === String(id));

  if (idx === -1) {
    editMsg.textContent = "Treino não encontrado.";
    return;
  }

  treinos[idx] = {
    id: treinos[idx].id,
    nomeTreino,
    exercicio,
    series,
    reps,
    carga
  };

  saveTreinos(treinos);

  editMsg.textContent = "Edição salva!";
  setTimeout(() => (editMsg.textContent = ""), 1500);

  editId.value = "";
  editForm.reset();

  render();
});

// cancelar edição
cancelBtn.addEventListener("click", () => {
  editId.value = "";
  editForm.reset();
  editMsg.textContent = "Edição cancelada.";
  setTimeout(() => (editMsg.textContent = ""), 1200);
});

render();
