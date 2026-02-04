const form = document.getElementById("cadastroForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmar = document.getElementById("confirmar").value.trim();

  // validações simples
  if (!nome || !email || !senha || !confirmar) {
    msg.textContent = "Preencha todos os campos.";
    return;
  }

  if (senha.length < 4) {
    msg.textContent = "A senha deve ter pelo menos 4 caracteres.";
    return;
  }

  if (senha !== confirmar) {
    msg.textContent = "As senhas não são iguais.";
    return;
  }

  // salva no localStorage (simulação de cadastro)
  const usuario = { nome, email, senha };
  localStorage.setItem("fitplanner_usuario", JSON.stringify(usuario));

  msg.textContent = "Cadastro feito! Agora faça login.";

  setTimeout(() => {
    window.location.href = "./login.html";
  }, 1000);
});
