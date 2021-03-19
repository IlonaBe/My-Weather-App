let now = new Date();

let dateAndTime = document.querySelector(".card-text");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

dateAndTime.innerHTML = `${day} ${date}. ${month}, ${hours}:${minutes}`;

function displayWeatherCondition(response) {
  let weatherNowIcon = document.querySelector("#weatherNowIcon");
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".weather-now p").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#rain").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  weatherNowIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  
  console.log(response);
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "09b98a8b6fbfa8f93e206c9bfb83f786";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "09b98a8b6fbfa8f93e206c9bfb83f786";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}


function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Oslo");
