//Display current time and date
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
  "Dec",
];
let month = months[now.getMonth()];

let date = now.getDate();
let year = now.getFullYear();

let hours = now.getHours();
let minutes = now.getMinutes();
let amPM = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? "0" + minutes : minutes;

function currentDate() {
  let nowDate = document.querySelector(".date");
  nowDate.innerHTML = `${day}, ${date} ${month} | ${hours}:${minutes}${amPM}`;
}

currentDate();

//Display user input city
function displayWeather(response) {
  let displayCity = document.querySelector(".city");
  displayCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector(".temperature");
  tempDisplay.innerHTML = `${temperature}°C`;
  let description = document.querySelector(".cw-text");
  description.innerHTML = response.data.weather[0].description;
  console.log(response);
  let lowTemp = Math.round(response.data.main.temp_min);
  let lowTemperature = document.querySelector(".cw-low");
  lowTemperature.innerHTML = `${lowTemp}°C`;
  let highTemp = Math.round(response.data.main.temp_max);
  let highTemperature = document.querySelector(".cw-high");
  highTemperature.innerHTML = `${highTemp}°C`;
  document.querySelector(".precip").innerHTML = response.data.main.humidity;
  document.querySelector(".wind").innerHTML = response.data.wind.speed;
}

function userSearch(event) {
  event.preventDefault();
  let apiKey = "7e7b47dc873e07bb66aa8220960dcb79";
  let city = document.querySelector(".citybar").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

let userCity = document.querySelector(".citysearch");
userCity.addEventListener("submit", userSearch);

function currentPosition(position) {
  let apiKey = "7e7b47dc873e07bb66aa8220960dcb79";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function clickCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let userCurrentButton = document.querySelector(".current-city-button");
userCurrentButton.addEventListener("click", clickCurrentPosition);
