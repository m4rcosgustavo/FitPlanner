const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

// abre/fecha menu no celular
burger.addEventListener("click", () => {
  nav.classList.toggle("nav-open");

  const aberto = nav.classList.contains("nav-open");
  burger.setAttribute("aria-expanded", aberto ? "true" : "false");
});

// fecha o menu quando clicar em algum link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("nav-open");
    burger.setAttribute("aria-expanded", "false");
  });
});

// form (só simulação)
const form = document.querySelector(".contact");
const hint = document.getElementById("formHint");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  hint.textContent = "Mensagem enviada! (simulação)";
  form.reset();

  setTimeout(() => {
    hint.textContent = "";
  }, 2500);
});
