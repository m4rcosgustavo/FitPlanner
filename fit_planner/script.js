// ================================
// FitPlanner - script.js (Landing)
// ================================

(function () {
  const logado = localStorage.getItem("fitplanner_logado") === "true";
  const email = (localStorage.getItem("fitplanner_email") || "").trim();

  // ===== Elementos =====
  const btnApp = document.getElementById("btnApp");
  const btnLogin = document.getElementById("btnLogin");
  const btnCadastrar = document.getElementById("btnCadastrar");
  const btnSairLanding = document.getElementById("btnSairLanding");
  const helloUser = document.getElementById("helloUser");

  // ===== App inteligente + texto =====
  if (btnApp) {
    btnApp.href = logado ? "html/progresso.html" : "html/login.html";
    btnApp.textContent = logado ? "Entrar no App" : "App";
  }

  // ===== Mostrar/ocultar elementos de conta =====
  if (logado) {
    if (btnLogin) btnLogin.style.display = "none";
    if (btnCadastrar) btnCadastrar.style.display = "none";
    if (btnSairLanding) btnSairLanding.style.display = "inline-block";

    if (helloUser) {
      helloUser.style.display = "inline-block";
      helloUser.textContent = email ? `Olá, ${email}` : "Olá!";
    }
  } else {
    if (btnLogin) btnLogin.style.display = "inline-block";
    if (btnCadastrar) btnCadastrar.style.display = "inline-block";
    if (btnSairLanding) btnSairLanding.style.display = "none";

    if (helloUser) {
      helloUser.style.display = "none";
      helloUser.textContent = "";
    }
  }

  // ===== Logout (Landing) =====
  if (btnSairLanding) {
    btnSairLanding.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("fitplanner_logado");
      localStorage.removeItem("fitplanner_email");
      window.location.href = "index.html";
    });
  }

  // ===== Burger menu (mobile) =====
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");

  if (burger && nav) {
    const fecharMenu = () => {
      nav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    };

    burger.addEventListener("click", () => {
      const aberto = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) fecharMenu();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") fecharMenu();
    });
  }

  // ===== Formulário de contato (simulação) =====
  const form = document.getElementById("contactFormLanding");
  const hint = document.getElementById("formHint");

  if (form && hint) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      hint.textContent = "Mensagem enviada! (simulação)";
      form.reset();

      setTimeout(() => {
        hint.textContent = "";
      }, 2500);
    });
  }
})();
