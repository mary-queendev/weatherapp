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
  let hour= currentTime.getHours();
  let minute= currentTime.getMinutes();
  if(hour < 12){
    time = `Last Updated: ${hour}:${minute} AM`
  } else{
    time = `Last Updated: ${hour}:${minute} PM`
  }
  weatherTime.innerHTML = time;
}

function showLocation(town) {
  let currentLocation = document.querySelector("#weather-city");
  let position = town.data.name;
  currentLocation.innerHTML = position;
  let temp = Math.round(town.data.main.temp);
  let celcius = document.querySelector("#celcius");
  celcius.innerHTML = `${temp}&degC`;
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

function presentLocation(position) {
  date();
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "d25a77b32eb1548451d57ab4cc8b0f2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocation);
}

let weatherCity = document.querySelector("#weather-city");
let inputCity = document.querySelector("#input-city");

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let celcius = document.querySelector("#celcius");

  weatherCity.innerHTML = response.data.name;
  celcius.innerHTML = `${temp}&degC`;
  document.querySelector("#desc").innerHTML = response.data.weather[0].description;
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
  return 
}



function changeCity(event) {
  event.preventDefault();
  date();
  let city = inputCity.value;
  let apiKey = "d25a77b32eb1548451d57ab4cc8b0f2c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

navigator.geolocation.getCurrentPosition(presentLocation);
let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("submit", changeCity);
