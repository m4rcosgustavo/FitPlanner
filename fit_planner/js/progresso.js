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

const qtdTreinosEl = document.getElementById("qtdTreinos");
const volumeTotalEl = document.getElementById("volumeTotal");
const maiorVolumeEl = document.getElementById("maiorVolume");
const mediaVolumeEl = document.getElementById("mediaVolume");

const totalSeriesEl = document.getElementById("totalSeries");
const totalRepsEl = document.getElementById("totalReps");

const topExerciciosEl = document.getElementById("topExercicios");
const msgEl = document.getElementById("msg");

function getTreinos() {
  const dados = localStorage.getItem(getTreinosKey());
  if (!dados) return [];
  return JSON.parse(dados);
}

function calcVolume(t) {
  return t.series * t.reps * (t.carga || 0);
}

function montarTopExercicios(treinos) {
  const contagem = {};

  treinos.forEach((t) => {
    const nome = (t.exercicio || "").trim().toLowerCase();
    if (!nome) return;

    if (!contagem[nome]) contagem[nome] = 0;
    contagem[nome] += 1;
  });

  const lista = Object.keys(contagem).map((nome) => {
    return { nome, qtd: contagem[nome] };
  });

  lista.sort((a, b) => b.qtd - a.qtd);

  return lista.slice(0, 3);
}

function render() {
  const treinos = getTreinos();

  if (treinos.length === 0) {
    qtdTreinosEl.textContent = 0;
    volumeTotalEl.textContent = 0;
    maiorVolumeEl.textContent = 0;
    mediaVolumeEl.textContent = 0;
    totalSeriesEl.textContent = 0;
    totalRepsEl.textContent = 0;
    topExerciciosEl.innerHTML = "";
    msgEl.textContent = "Cadastre treinos para ver seu progresso.";
    return;
  }

  msgEl.textContent = "";
  qtdTreinosEl.textContent = treinos.length;

  let volumeTotal = 0;
  let maior = 0;
  let somaSeries = 0;
  let somaReps = 0;

  for (let i = 0; i < treinos.length; i++) {
    const v = calcVolume(treinos[i]);
    volumeTotal += v;
    if (v > maior) maior = v;

    somaSeries += treinos[i].series;
    somaReps += treinos[i].reps;
  }

  const media = Math.round(volumeTotal / treinos.length);

  volumeTotalEl.textContent = volumeTotal;
  maiorVolumeEl.textContent = maior;
  mediaVolumeEl.textContent = media;

  totalSeriesEl.textContent = somaSeries;
  totalRepsEl.textContent = somaReps;

  const top3 = montarTopExercicios(treinos);

  topExerciciosEl.innerHTML = "";
  if (top3.length === 0) {
    topExerciciosEl.innerHTML =
      `<p style="color:#fff;font-size:11px;text-align:center;margin:0;">Sem exercícios suficientes.</p>`;
    return;
  }

  top3.forEach((item) => {
    const div = document.createElement("div");
    div.className = "top-item";
    div.innerHTML = `
      <p class="top-name">${item.nome}</p>
      <p class="top-count">${item.qtd}x</p>
    `;
    topExerciciosEl.appendChild(div);
  });
}

render();
