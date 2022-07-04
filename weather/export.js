const temperatureIcon = document.getElementById("temperature-icon");
const place = document.getElementById("place");
const weatherText = document.getElementById("weatherText");
const temperature = document.getElementById("temperature");

export function plus(a, b) {
  return a + b;
}

export function showWeather(data) {
  console.log(data);
  const { temp } = data.main;
  const { name } = data;
  const { id, icon, main } = data.weather[0];

  weatherText.textContent = main;
  temperature.textContent = temp;
  temperatureIcon.textContent = name;
  place.textContent = icon;
}
