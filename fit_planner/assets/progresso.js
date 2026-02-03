const qtdTreinosEl = document.getElementById("qtdTreinos");
const volumeTotalEl = document.getElementById("volumeTotal");
const maiorVolumeEl = document.getElementById("maiorVolume");
const mediaVolumeEl = document.getElementById("mediaVolume");

const totalSeriesEl = document.getElementById("totalSeries");
const totalRepsEl = document.getElementById("totalReps");

const topExerciciosEl = document.getElementById("topExercicios");
const msgEl = document.getElementById("msg");

function getTreinos() {
  const dados = localStorage.getItem("fitplanner_treinos");
  if (!dados) return [];
  return JSON.parse(dados);
}

function calcVolume(t) {
  return t.series * t.reps * (t.carga || 0);
}

function montarTopExercicios(treinos) {
  // conta quantas vezes cada exercício aparece
  const contagem = {}; // { "supino": 3, "agachamento": 2 }

  treinos.forEach((t) => {
    const nome = (t.exercicio || "").trim().toLowerCase();
    if (!nome) return;

    if (!contagem[nome]) contagem[nome] = 0;
    contagem[nome] += 1;
  });

  // transforma em lista e ordena
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

  // quantidade
  qtdTreinosEl.textContent = treinos.length;

  // volume total + maior volume + média + séries/reps totais
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

  // top exercícios
  const top3 = montarTopExercicios(treinos);

  topExerciciosEl.innerHTML = "";

  if (top3.length === 0) {
    topExerciciosEl.innerHTML = `<p style="color:#fff;font-size:11px;text-align:center;margin:0;">Sem exercícios suficientes.</p>`;
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
