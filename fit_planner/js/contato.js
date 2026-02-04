// ===== BLOQUEIO (precisa estar logado) =====
if (localStorage.getItem("fitplanner_logado") !== "true") {
  window.location.href = "./login.html";
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

const form = document.getElementById("contatoForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const assunto = document.getElementById("assunto").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !assunto || !mensagem) {
    msg.textContent = "Preencha todos os campos.";
    return;
  }

  msg.textContent = "Mensagem enviada! (simulação)";
  form.reset();

  setTimeout(() => {
    msg.textContent = "";
  }, 2500);
});
