let todayDate = new Date();
let today = document.querySelector("#day");
let date = document.querySelector("#date");
let time = document.querySelector("#time");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednsday",
  "Thursday",
  "Friday",
  "saturday",
];

today.innerHTML = days[todayDate.getDay()];
date.innerHTML = ` ${
  todayDate.getMonth() + 1
}/${todayDate.getDate()}/${todayDate.getFullYear()}`;
let Minutes = todayDate.getMinutes();
if (Minutes < 10) {
  Minutes = `0${Minutes}`;
}
time.innerHTML = `${todayDate.getHours()}:${Minutes}`;

function showWeather(response) {
  console.log(response);
  document.querySelector(
    "#city-name"
  ).innerHTML = ` ${response.city}, ${response.country}`;
  document.querySelector("#temp-numb").innerHTML = Math.round(
    response.temperature.current
  );
  //   document.querySelector("#max-temp").innerHTML = Math.round(
  // response.data.main.temp_max
  //   );
  //   document.querySelector("#min-temp").innerHTML = Math.round(
  // response.data.main.temp_min
  //   );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.temperature.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(response.wind.speed);
  //   document.querySelector("#weather-description").innerHTML =
  // response.data.weather[0].description;
}

function getApi(cityName) {
  let apiKey = "1bc06e4a65c718f0ab0b2fa3co98tde4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handelSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  cityName.toLowerCase();
  if (cityName.length == 0) {
    alert("Please type a city's name");
  }

  getApi(cityName);
}
function handelCurrentLocation(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "bd5b4461863eddaa6ced0a0a67989e0a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation() {
  navigator.geolocation.getCurrentPosition(handelCurrentLocation);
}

let citySearch = document.querySelector("#try-cities");
citySearch.addEventListener("submit", handelSubmit);

getApi("Tehran");

/*let button = document.querySelector("#button");
button.addEventListener("click", currentLocation);*/
