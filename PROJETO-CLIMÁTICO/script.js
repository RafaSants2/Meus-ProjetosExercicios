const horario = document.getElementById("horario");

setInterval(() => {
  const agora = new Date();
  horario.textContent = agora.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
}, 1000);

document.querySelector('#buscador').addEventListener('submit', async (event) => {
  event.preventDefault();

  const cityName = document.querySelector("#search").value;

  if (!cityName) {
    return showAlert('É preciso digitar uma cidade...');
  }

  const apiKey = 'c3d448efea0a63c1be7f64b9dbcb5b83';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`;

  const results = await fetch(apiUrl);
  const json = await results.json();

  if (json.cod === 200) {
      showInfo({
        city: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempMx: json.main.temp_max,
        tempMin: json.main.temp_min,
        description: json.weather[0].description,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        humidity: json.main.humidity,
      });
  } else {
    showAlert('Não foi possivel localizar...')
  }
});

function showInfo(json){
  showAlert('')

  document.querySelector('#weather').classList.add('show');

  document.querySelector('#local').innerHTML = `${json.city}, ${json.country}`
  document.querySelector('#graus').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
  document.querySelector('#condicao').innerHTML = `${json.description}`
  document.querySelector('#temp_imagem').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
  document.querySelector('#temp_max').innerHTML = `${json.tempMx.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
  document.querySelector('#temp_min').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`
  document.querySelector('#humidity').innerHTML = `${json.humidity}%`
  document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`
}

function showAlert(msg) {
  document.querySelector('#alert').innerHTML = msg;
}