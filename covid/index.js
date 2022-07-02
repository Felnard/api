const search = document.getElementById("search");
const input = document.getElementById("input");
const canvasChart = document.getElementById("myChart");
const flagContainer = document.querySelector(".randomTop");

let countries = [];
function stats() {
  const optionss = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b44df58ad8msh8e6c88e9ba5f9d1p19459ejsn85e6d9f486d4",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  fetch("https://covid-193.p.rapidapi.com/statistics", optionss)
    .then((response) => response.json())
    .then((response) => {
      console.log(response.response);
      countries = response.response;
      getFlag();
      showChart(
        response.response[Math.floor(Math.random() * response.response.length)]
      );
    })
    .catch((err) => console.error(err));
}

stats();

// CHART JS
function showChart(data) {
  const cases = data.cases.new ? data.cases.new.slice("1") : 0;
  const { active, critical = 0, total, recovered } = data.cases;
  const { continent, country, population, day } = data;

  var xValues = [` Active Case`, "Critical", "New", "Recovered", "Total Cases"];
  var yValues = [active, critical, Number(cases), recovered, total];
  console.log(active, critical, Number(cases), recovered, total);
  var barColors = ["#0ac542", "#000", "#f9dc5cff", "#2b5797", "#ed254eff"];
  var colors = "#ffffff";
  var barChart = new Chart(canvasChart, {
    type: "bar",
    data: {
      labels: xValues,

      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        color: colors,
        text: `${country}, ${continent}: ${day}`,
      },
    },
  });
}

// SEARCH EVENTLISTENER

search.addEventListener("click", () => {
  sessionStorage.setItem("searchKey", input.value);
  window.location = "search.html";
});

// function randomFlag() {

// }

function getFlag() {
  flagContainer.innerHTML = "";

  for (let i = 0; i < 8; i++) {
    let flag = countries[Math.floor(Math.random() * countries.length)].country;

    let api = `https://countryflagsapi.com/png/${flag.replaceAll("-", " ")}`;
    const countriesEl = document.createElement("div");
    countriesEl.classList.add("countries");
    countriesEl.innerHTML = `<img src="${api}" alt="">
    <p class='countryName'>${flag}</p>
    <p>Population:${countries[i].population}</p>`;
    console.log(api.status);
    flagContainer.appendChild(countriesEl);
  }
}
