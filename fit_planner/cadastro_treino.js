const form = document.getElementById("treinoForm");
const msg = document.getElementById("msg");

function getTreinos() {
  const dados = localStorage.getItem("fitplanner_treinos");
  if (!dados) return [];
  return JSON.parse(dados);
}

function saveTreinos(lista) {
  localStorage.setItem("fitplanner_treinos", JSON.stringify(lista));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nomeTreino = document.getElementById("nomeTreino").value.trim();
  const exercicio = document.getElementById("exercicio").value.trim();
  const series = Number(document.getElementById("series").value);
  const reps = Number(document.getElementById("reps").value);
  const cargaValor = document.getElementById("carga").value.trim();

  // carga é opcional
  const carga = cargaValor === "" ? 0 : Number(cargaValor);

  // validação simples
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
    id: Date.now(),        // id simples
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

  setTimeout(() => {
    msg.textContent = "";
  }, 2000);
});
