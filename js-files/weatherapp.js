function formatDate(now) {
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = weekDays[now.getDay()];
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let year = now.getFullYear();

  return `${day}, ${date}/${month}/${year}`;
}

function date() {
  let currentTime = new Date();
  let weatherTime = document.querySelector("#weather-time");
  let weatherDate = document.querySelector("#weather-date");
  weatherDate.innerHTML = formatDate(currentTime);
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  if (minute < 10) {
    `0${minute}`;
  }
  if (hour < 12) {
    time = `Last Updated: ${hour}:${minute} AM`;
  } else {
    time = `Last Updated: ${hour}:${minute} PM`;
  }
  weatherTime.innerHTML = time;
}

function showPresentLocation(town) {
  let currentLocation = document.querySelector("#weather-city");
  let position = town.data.name;
  currentLocation.innerHTML = position;
  let temp = Math.round(town.data.main.temp);
  let celcius = document.querySelector("#celcius");
  celcius.innerHTML = `${temp}`;
  document.querySelector("#desc").innerHTML = town.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = town.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    town.data.wind.speed
  );
  let iconElement = document.querySelector("#weather-symbol");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${town.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", town.data.weather[0].description);
}

function getPresentLocation(position) {
  date();
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showPresentLocation);
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}
function showForecast(response) {
  let forecastDays = response.data.daily;
  let forecast = document.querySelector("#weather-forecast");
  let forecastData = `<div class="row">`;

  forecastDays.forEach(function (future, index) {
    if (index < 6) {
      forecastData =
        forecastData +
        `
  <div class="col-2 cols">
  <span class="forecast-date">${formatForecastDay(future.dt)}</span>
  <div class="forecast-symbol"><img src= "http://openweathermap.org/img/wn/${
    future.weather[0].icon
  }@2x.png"/></div>
  <div class="forecast-date">max ${Math.round(future.temp.max)}&deg;C</div>
  <div class="forecast-date">min ${Math.round(future.temp.min)}&deg;C</div>
  </div>
  
  `;
    }
  });
  forecastData = forecastData + `</div>`;
  forecast.innerHTML = forecastData;
}

function getForecast(coordinates) {
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
}

let weatherCity = document.querySelector("#weather-city");
let inputCity = document.querySelector("#input-city");

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let celcius = document.querySelector("#celcius");
  weatherCity.innerHTML = response.data.name;
  celcius.innerHTML = `${temp}`;
  document.querySelector("#desc").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#weather-symbol");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function changeCity(event) {
  event.preventDefault();
  date();
  let city = inputCity.value;
  let apiKey = "62bc298785543e137bc6756e514eb1c3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let celcius = document.querySelector("#celcius");
  let fahrenheitTemp = document.querySelector("#fahrenheit");
  fahrenheit = Math.round((celcius.innerHTML * 9) / 5 + 32);
  fahrenheitTemp.innerHTML = `${fahrenheit}&degF`;
}

function showHere() {
  navigator.geolocation.getCurrentPosition(getPresentLocation);
}

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", showHere);

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("submit", changeCity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);

function loadPageWeather() {
  date();
  let weatherCity = document.querySelector("#weather-city");
  weatherCity = weatherCity.innerHTML;

  let apiKey = "d25a77b32eb1548451d57ab4cc8b0f2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
loadPageWeather();
