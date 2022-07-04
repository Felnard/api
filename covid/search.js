const day7 = document.getElementById("7");
const day14 = document.getElementById("14");
const day30 = document.getElementById("30");
const day90 = document.getElementById("90");
const day180 = document.getElementById("180");
const year1 = document.getElementById("year");
const all = document.getElementById("all");

const search = document.querySelector(".searchButton");
const flagContainer = document.querySelector(".flagContainer");
const input = document.getElementById("inputSearch");

const container = document.querySelector(".container");
// BARCHART
// const barChart = document.getElementById("barChart");
const barContainer = document.querySelector(".barContainer");
// GLOBAL VARIABLE FOR ALL DATA
let historyData = [];
// SESSOIN STORAGE
let searchLocal = sessionStorage.getItem("searchKey");

getSearch(searchLocal);

// API SEARCH

async function getSearch(searchInput) {
  console.log(searchInput);
  let api = `https://covid-193.p.rapidapi.com/history?country=${searchInput}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b44df58ad8msh8e6c88e9ba5f9d1p19459ejsn85e6d9f486d4",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  const resp = await fetch(api, options);
  const respData = await resp.json();
  // console.log(api);
  by10(respData.response);
}

// PINAPABABA BY DAY /DIVIDE BY 15
function by10(data) {
  //   console.log(data + "fsadf");
  for (let i = 0; i < data.length; i += 15) {
    historyData.push(data[i]);
  }
  console.log(historyData);
  getFlag(historyData[0]);
  showBarChart(historyData);
  drawChart(historyData.slice(0, 7));
}

// EVENT LISTENER FOR BUTTONS
day7.addEventListener("click", () => {
  removeAndAdd();
  drawChart(historyData.slice(0, 7));
});
day14.addEventListener("click", () => {
  removeAndAdd();
  drawChart(historyData.slice(0, 14));
});
day30.addEventListener("click", () => {
  removeAndAdd();
  drawChart(historyData.slice(0, 30));
});
day90.addEventListener("click", () => {
  removeAndAdd();
  drawChart(historyData.slice(0, 90));
});
day180.addEventListener("click", () => {
  removeAndAdd();
  drawChart(historyData.slice(0, 180));
});
year1.addEventListener("click", () => {
  removeAndAdd();
  drawChart(historyData.slice(0, 360));
});
all.addEventListener("click", () => {
  removeAndAdd();
  drawChart(historyData.slice(0, historyData.length));
});

// DRAWCHART

function drawChart(data) {
  // YVALUES DATA
  var yValues = [];
  for (let i = 0; i < data.length; i++) {
    let death = data[i].deaths.new ? data[i].deaths.new : "+0";
    yValues.push(Number(death.slice("1")));
  }
  // XVALUES DATES
  var xValues = [];
  for (let j = 0; j < data.length; j++) {
    xValues.push(j);
  }
  //   CHART
  const charty = new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: xValues,
      datasets: [
        {
          fill: false,
          lineTension: 0,
          backgroundColor: "rgba(255,0,0,1)",
          borderColor: "rgba(255,0,0,.4)",
          data: yValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        yAxes: [{ ticks: { min: 0, max: Math.max(...yValues) + 100 } }],
      },
    },
  });
}

// SEARCH

search.addEventListener("click", (e) => {
  e.preventDefault();
  removeAndAdd();
  removeBars();
  historyData = [];
  getSearch(input.value);
});

// CREATE BAR CHART
function showBarChart(dataObject) {
  // console.log(dataObject[0]);
  const data = dataObject[0];
  const newCases = dataObject[0].cases.new;

  const { active, critical = 0, total, recovered } = data.cases;
  const { continent, country, population, day } = data;

  var xValues = [` Active Case`, "Critical", "New", "Recovered", "Total Cases"];
  var yValues = [active, critical, Number(newCases), recovered, total];
  console.log(active, critical, Number(newCases), recovered, total);
  var barColors = ["#0ac542", "#000", "#f9dc5cff", "#2b5797", "#ed254eff"];
  var colors = "#ffffff";

  var chart = new Chart(document.getElementById("barChart"), {
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
// REMOVE AND ADD LINE CHART DIV
function removeAndAdd() {
  const main = document.querySelector(".deaths");
  main.remove();
  const division = document.createElement("main");
  division.setAttribute("class", "deaths");
  const canvas = document.createElement("canvas");
  canvas.setAttribute("id", "myChart");

  division.appendChild(canvas);
  container.appendChild(division);
}

// REMOVE AND ADD BAR CHART DIV
function removeBars() {
  const barmain = document.querySelector(".bar");
  barmain.remove();
  const bardivision = document.createElement("main");
  bardivision.setAttribute("class", "bar");
  const barcanvas = document.createElement("canvas");
  barcanvas.setAttribute("id", "barChart");

  bardivision.appendChild(barcanvas);
  barContainer.appendChild(bardivision);
}

function getFlag(flag) {
  console.log(flag);
  flagContainer.innerHTML = "";
  let api = `https://countryflagsapi.com/png/${flag.country}`;
  const countriesEl = document.createElement("div");
  countriesEl.classList.add("countries");
  countriesEl.innerHTML = `<img src="${api}" alt="">
    <h2 class='countryName'>${flag.country}</h2>
    <p>Population:${flag.population}</p>`;

  flagContainer.appendChild(countriesEl);
}
