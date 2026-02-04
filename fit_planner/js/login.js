// ===== Se já estiver logado, manda direto pro progresso =====
if (localStorage.getItem("fitplanner_logado") === "true") {
  window.location.href = "./progresso.html";
}

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!email || !senha) {
    msg.textContent = "Preencha email e senha.";
    return;
  }

  // Pega o usuário salvo pelo cadastro
  const usuarioSalvo = localStorage.getItem("fitplanner_usuario");

  if (!usuarioSalvo) {
    msg.textContent = "Nenhuma conta cadastrada. Vá em 'Cadastrar'.";
    return;
  }

  const usuario = JSON.parse(usuarioSalvo);

  // Validação simples
  if (email !== usuario.email || senha !== usuario.senha) {
    msg.textContent = "Email ou senha incorretos.";
    return;
  }

  // Login OK
  localStorage.setItem("fitplanner_logado", "true");
  localStorage.setItem("fitplanner_email", email);

  msg.textContent = "Login feito! Indo para o Progresso...";

  setTimeout(() => {
    window.location.href = "./progresso.html";
  }, 700);
});
