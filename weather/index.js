const weatherText = document.getElementById("weatherText");
const temperature = document.getElementById("temperature");
const button = document.getElementById("button");
const cityInput = document.getElementById("city");
const temperatureIcon = document.getElementById("temperature-icon");
const place = document.getElementById("place");
let lat = "";
let long = "";

window.addEventListener("load", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
    let location = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&APPID=5fd02b3fd1f909bb6b40fcc834f81203`;
    console.log(location);
    getWeather(location);
  });
});

function getWeather(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showWeather(data);
    });
}

function showWeather(data) {
  console.log(data);
  const { temp } = data.main;
  const { name } = data;
  const { id, icon, main } = data.weather[0];

  weatherText.textContent = main;
  temperature.textContent = temp;
  temperatureIcon.textContent = name;
  place.textContent = icon;
}

const arr = [1, 34, 5, 45, 6, 6, 57, 432, 8868, 7, 87];

let newar = arr.map(arrMap);

function arrMap(elements) {
  return elements * 2;
}

console.log(newar + "fsafasf");

arr.forEach(arrFor);

function arrFor(elements) {
  return elements * 2;
}
console.log(arr + "fsafasf");

button.addEventListener("click", (e) => {
  // e.preventDefault();
  let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&APPID=5fd02b3fd1f909bb6b40fcc834f81203`;

  getWeather(cityApi);
});
