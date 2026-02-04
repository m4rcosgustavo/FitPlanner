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

const form = document.getElementById("treinoForm");
const msg = document.getElementById("msg");

function getTreinos() {
  const dados = localStorage.getItem(getTreinosKey());
  if (!dados) return [];
  return JSON.parse(dados);
}

function saveTreinos(lista) {
  localStorage.setItem(getTreinosKey(), JSON.stringify(lista));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nomeTreino = document.getElementById("nomeTreino").value.trim();
  const exercicio = document.getElementById("exercicio").value.trim();
  const series = Number(document.getElementById("series").value);
  const reps = Number(document.getElementById("reps").value);
  const cargaValor = document.getElementById("carga").value.trim();
  const carga = cargaValor === "" ? 0 : Number(cargaValor);

  if (!nomeTreino || !exercicio) {
    msg.textContent = "Preencha nome do treino e exercício.";
    return;
  }
  if (!Number.isFinite(series) || series < 1) {
    msg.textContent = "Séries deve ser maior que 0.";
    return;
  }
  if (!Number.isFinite(reps) || reps < 1) {
    msg.textContent = "Repetições deve ser maior que 0.";
    return;
  }
  if (!Number.isFinite(carga) || carga < 0) {
    msg.textContent = "Carga inválida.";
    return;
  }

  const novoTreino = {
    id: Date.now(),
    nomeTreino,
    exercicio,
    series,
    reps,
    carga
  };

  const treinos = getTreinos();
  treinos.push(novoTreino);
  saveTreinos(treinos);

  msg.textContent = "Treino salvo com sucesso!";
  form.reset();

  setTimeout(() => (msg.textContent = ""), 2000);
});
