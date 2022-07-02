const day7 = document.getElementById("7");
const day14 = document.getElementById("14");
const day30 = document.getElementById("30");
const day90 = document.getElementById("90");
const day180 = document.getElementById("180");
const year1 = document.getElementById("year");
const all = document.getElementById("all");
const search = document.querySelector(".searchButton");
const input = document.getElementById("inputSearch");
// const deathChart = document.getElementById("myChart");
const container = document.querySelector(".container");

// GLOBAL VARIABLE FOR ALL DATA
let historyData = [];
// SESSOIN STORAGE
let searchLocal = sessionStorage.getItem("searchKey");
getSearch(searchLocal);

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
  console.log(api);
  by10(respData.response);
}

// PINAPABABA BY DAY
function by10(data) {
  //   console.log(data + "fsadf");
  for (let i = 0; i < data.length; i += 15) {
    historyData.push(data[i]);
  }
  console.log(historyData);
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

search.addEventListener("click", (e) => {
  e.preventDefault();
  removeAndAdd();
  //   createChart
  // createElement();
  historyData = [];
  getSearch(input.value);
});

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

function createElement() {}
