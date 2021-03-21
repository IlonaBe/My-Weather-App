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




function displayWeatherCondition(response) {
  let dateAndTime = document.querySelector("#date");
  dateAndTime.innerHTML = formatDate(response.data.dt * 1000);
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
                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="SunCloudSnow" width="40px" />
              </div>
            </div>
         
      `;  
    }
  }




function searchCity(city) {
  let units = "metric";
  let apiKey = "09b98a8b6fbfa8f93e206c9bfb83f786";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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
