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
  let time = currentTime.toLocaleTimeString();
  weatherTime.innerHTML = time;
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let celcius = document.querySelector("#celcius");
  celcius.innerHTML = `${temp}&degC`;
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
}

let weatherCity = document.querySelector("#weather-city");
let inputCity = document.querySelector("#input-city");

function changeCity(event) {
  event.preventDefault();
  date();
  let city = inputCity.value;
  weatherCity.innerHTML = city;
  let apiKey = "d25a77b32eb1548451d57ab4cc8b0f2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function location(town) {
  let currentLocation = document.querySelector("#weather-city");
  let position = town.data.name;
  currentLocation.innerHTML = position;
  let temp = Math.round(town.data.main.temp);
  let celcius = document.querySelector("#celcius");
  celcius.innerHTML = `${temp}&degC`;
  document.querySelector("#desc").innerHTML = town.data.weather[0].main;
}

function presentLocation(position) {
  date();
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "d25a77b32eb1548451d57ab4cc8b0f2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(location);
}

navigator.geolocation.getCurrentPosition(presentLocation);
let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("submit", changeCity);
