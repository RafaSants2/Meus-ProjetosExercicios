const horario = document.getElementById("horario");
const grausC = document.getElementById("graus");

setInterval(() => {
  const agora = new Date();
  horario.textContent = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}, 1000);

setInterval(() => {
}, 3600000)