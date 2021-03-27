
function formatDays (timestamp) {
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let now = new Date(timestamp);
  let day = days [now.getDay()];
  return `${day}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}


function displayWeatherCondition(response) {
  let dateAndTime = document.querySelector("#date");
  dateAndTime.innerHTML = formatDate(response.data.dt * 1000);
  let weatherNowIcon = document.querySelector("#weatherNowIcon");
  weatherNowIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  )
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".weather-now p").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#rain").innerHTML = response.data.main.humidity;

  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );

  console.log(response);
  getDailyForecast(response.data.coord.lat, response.data.coord.lon);

  }


function displayForecast(response){
  let forecastHours = document.querySelector("#hours-forecast");
  forecastHours.innerHTML = null;
  let forecast = null;
  console.log(forecast);
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
        forecastHours.innerHTML += `        
          <div class="row row-cols-3">                                    
              <div class="col text-end">
                 ${formatHours(forecast.dt * 1000)}
              </div>
              <div class="col text-end">
              ${Math.round(forecast.main.temp)}°C
               </div>
              <div class="col text-start" id="hour-icon">
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="SunCloudSnow" width="50px" />
              </div>
            </div>         
      `;  
    }
  }

  function showForecastDays(response){
    document.querySelector("#next-days").innerHTML = null;
    let forecastDays = null;

    for (let index = 1; index < 6; index++) {
    forecastDays = response.data.daily[index];
    document.querySelector("#next-days").innerHTML += 
  `<div class="card" id="forecast-days">
      <div class="card-body text-center">
        <p class="card-text">${formatDays(forecastDays.dt * 1000)}</p>
          <img src="https://openweathermap.org/img/wn/${forecastDays.weather[0].icon}@2x.png" alt="SunCloudSnow" width="80px" id="current-weather-icon" />
        <p class="card-text" id="degrees">${Math.round(forecastDays.temp.min)}°C /${Math.round(forecastDays.temp.max)}°C</p>
      </div>
  </div>`
}
}

  function getDailyForecast(latitude, longitude) {
    let apiKey = "09b98a8b6fbfa8f93e206c9bfb83f786";
    apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showForecastDays);
    
}



function searchCity(city) {
  let units = "metric";
  let apiKey = "09b98a8b6fbfa8f93e206c9bfb83f786";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios
  .get(apiUrl)
  .then(displayWeatherCondition)
  .catch(function (error) {
      alert(`Unfortunately, we couldn't find a city named ${city}.`);
    });
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  if (city.length === 0) {
    alert ("Please enter a city");
  } else {
    searchCity(city);
  }
} 

function buildCityApiUrl(city) {
  let apiKey = "09b98a8b6fbfa8f93e206c9bfb83f786";
  return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
}

function searchLocation(position) {
  let apiKey = "09b98a8b6fbfa8f93e206c9bfb83f786";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
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

