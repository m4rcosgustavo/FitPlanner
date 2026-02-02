// Menu mobile simples (abre/fecha e rola para seção)
const burger = document.querySelector(".nav__burger");
const nav = document.querySelector(".nav");

function openMobileMenu() {
  nav.style.display = "flex";
  nav.style.flexDirection = "column";
  nav.style.position = "absolute";
  nav.style.top = "56px";
  nav.style.right = "20px";
  nav.style.background = "#111";
  nav.style.padding = "12px";
  nav.style.borderRadius = "12px";
  nav.style.boxShadow = "0 18px 40px rgba(0,0,0,.35)";
  nav.style.gap = "8px";
}

function closeMobileMenu() {
  nav.removeAttribute("style");
}

if (burger) {
  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));

    if (!expanded) openMobileMenu();
    else closeMobileMenu();
  });
}

document.addEventListener("click", (e) => {
  if (!burger || !nav) return;
  const isInside = nav.contains(e.target) || burger.contains(e.target);
  const expanded = burger.getAttribute("aria-expanded") === "true";
  if (expanded && !isInside) {
    burger.setAttribute("aria-expanded", "false");
    closeMobileMenu();
  }
});

// Link ativo conforme scroll
const links = [...document.querySelectorAll(".nav__link")];
const sections = links
  .map(a => document.querySelector(a.getAttribute("href")))
  .filter(Boolean);

function setActiveLink() {
  const y = window.scrollY + 120;
  let current = sections[0]?.id;

  sections.forEach(sec => {
    if (sec.offsetTop <= y) current = sec.id;
  });

  links.forEach(a => {
    const href = a.getAttribute("href").replace("#", "");
    a.classList.toggle("is-active", href === current);
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

// Form fake (só feedback visual)
const form = document.querySelector(".contact");
const hint = document.getElementById("formHint");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (hint) hint.textContent = "Mensagem enviada! (simulação)";

    form.reset();
    setTimeout(() => {
      if (hint) hint.textContent = "";
    }, 2500);
  });
}
