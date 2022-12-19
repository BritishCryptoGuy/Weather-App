// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Variables including DOM
const apiKey = "c8e7c2ae87c3fed959762e4a7c9e6b01";
let currentDate = moment().format("DD/MM/YYYY");
let currentTime = moment().format("HH:mm:ss");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchHistory = document.querySelector("#searchHistory");
const forecastContainer = document.querySelector("#forecastContainer");
const forecasts = document.querySelector(".forecasts");
let city = "london";

function getWeather(data) {
  console.log(data);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0]}&lon=${data[1]}&appid=${apiKey}&units=metric`
  )
    .then((data) => data.json())
    .then((info) => console.log(info.list));
}

//getCoords function. Fetch request made to get coords in order to be used for the forecast
function getCoords() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  )
    .then((data) => data.json())
    .then(function (info) {
      let lat = info.coord.lat;
      let lon = info.coord.lon;
      console.log(`
    ----Current conditions----
    Temperature: ${info.main.temp} C°
    Wind: ${info.wind.speed} M/S
    Humidity: ${info.main.humidity} %
    Lat: ${lat}
    Lon: ${lon}
    `);
      return [lat, lon];
    })
    .then((data) => getWeather(data));
}
getCoords();
