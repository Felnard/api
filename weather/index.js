import { plus, showWeather } from "./export.js";

const button = document.getElementById("button");
const cityInput = document.getElementById("city");
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

button.addEventListener("click", (e) => {
  let cityApi = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&APPID=5fd02b3fd1f909bb6b40fcc834f81203`;

  getWeather(cityApi);
});

console.log(plus(23, 41));
