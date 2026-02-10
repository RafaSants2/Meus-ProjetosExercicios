const horario = document.getElementById("horario");

setInterval(() => {
  const agora = new Date();
  horario.textContent = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}, 1000);