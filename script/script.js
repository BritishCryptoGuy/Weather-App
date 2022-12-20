// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//Variables including DOM
const apiKey = "c8e7c2ae87c3fed959762e4a7c9e6b01";
let currentDate = moment().format("DD/MM/YYYY");
let currentTime = moment().format("HH:mm:ss");
const mainSection = document.querySelector(".main-section");
const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const searchHistory = document.querySelector("#searchHistory");
const forecastContainer = document.querySelector(".forecastContainer");
const currentForecast = document.querySelector("#currentForecast");
const forecasts = document.querySelector(".forecasts");

function saveStorage(cityName) {
  // let cityArray=[];
  // if (localStorage.getItem("SearchHistory")){
  //  cityArray = JSON.parse(localStorage.getItem("SearchHistory"));
  //   console.log(cityName);
  // }
  // localStorage.setItem("SearchHistory", JSON.stringify(saveInput));
  // let storage = JSON.parse(localStorage.getItem("SearchHistory"));
}

//getForecast receives coordinates from previous fetch request. Then uses them to retrieve data required to insert forecast HTML
function getForecast(data) {
  console.log(data);
  forecasts.innerHTML = "";
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0]}&lon=${data[1]}&appid=${apiKey}&units=metric`
  )
    .then((data) => data.json())
    .then(function (info) {
      for (let i of info.list) {
        let dateTime = i.dt_txt;
        let date = dateTime.slice(0, 10).split("-").reverse().join("/");
        if (dateTime.includes("12:00:00")) {
          forecasts.insertAdjacentHTML(
            "beforeend",
            `<div class="forecastDay">
          <p>${date}</p>
          <img class="forecastIcon"src="http://openweathermap.org/img/wn/${
            i.weather[0].icon
          }@2x.png"></img>
          <p>Temp: ${i.main.temp}℃</p>
          <p>Wind: ${(i.wind.speed / 1.609).toFixed(2)} MPH</p>
          <p>Humidity: ${i.main.humidity}% </p>
        </div>`
          );
        }
      }
    });
}

//setCurrent function for setting HTML for the searched for cities current temps
function setCurrent(data) {
  currentForecast.innerHTML = "";
  forecastContainer.classList.add("show");
  forecastContainer.classList.remove("hidden");
  currentForecast.insertAdjacentHTML(
    "afterbegin",
    `<p id="cityName">${data.name} (${currentDate})<img class="forecastIcon"src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img></p>
  <p>Temp: <span id="curTemp">${data.main.temp}</span> ℃</p>
  <p>Wind: <span id="curWind">${data.wind.speed}</span> KPH</p>
  <p>Humidity: <span id="curHumidity">${data.main.humidity}</span>%</p>`
  );
}

//getCoords function. Fetch request made to get coords in order to be used for the forecast
function getCoords(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
  )
    .then((data) => data.json())
    .then(function (info) {
      mainSection.classList.remove("col-centre");
      saveStorage(info.name);
      let lat = info.coord.lat;
      let lon = info.coord.lon;
      setCurrent(info);
      return [lat, lon];
    })
    .then((data) => getForecast(data));
}
// getCoords();

//Event Listeners
searchInput.addEventListener("keydown", function (e) {
  if (e.key !== "Enter" || searchInput.value === "") {
    return;
  } else {
    let data = searchInput.value.trim();
    searchInput.value = "";
    searchInput.blur();
    getCoords(data);
  }
});
searchBtn.addEventListener("click", function () {
  if (searchInput.value === "") {
    return;
  } else {
    let data = searchInput.value.trim();
    searchInput.value = "";
    getCoords(data);
  }
});

/*
Data is put into search box. //
Data is trimmed//
data is used in fetch api in order to get city coords//
City name is added to local storage 
also this data is considered current and will be used for the current forecast//
then data is passed to get weather function.
get weather function fetch requests using the coords received. 
Gets data from api.
api data is then used to insertadjacent html into the forecasts
Only use the data that is for 12PM time// This should lead to five forecasts all at 12pm



*/
// Page load
// No search history or location or forecasts by default
// local Storage is accseesed for search history
