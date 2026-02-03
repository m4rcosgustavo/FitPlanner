const form = document.getElementById("contatoForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const assunto = document.getElementById("assunto").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  // validação simples
  if (!nome || !email || !assunto || !mensagem) {
    msg.textContent = "Preencha todos os campos.";
    return;
  }

  // simulação de envio
  msg.textContent = "Mensagem enviada! (simulação)";
  form.reset();

  setTimeout(() => {
    msg.textContent = "";
  }, 2500);
});
