const api = "https://api.github.com/users/";

const username = document.getElementById("username");
const form = document.getElementById("form");
const container = document.getElementById("container");

async function getUser(userInput) {
  const resp = await fetch(api + userInput);
  const respData = await resp.json();

  createUserCard(respData);
  getRepos(api + userInput + "/repos");
}

async function getRepos(repos) {
  const resp = await fetch(repos);
  const respData = await resp.json();

  showRepos(respData);
}

function createUserCard(user) {
  console.log(user.url);
  const mainHTML = `
  <div class="container">
   <img src="${user.avatar_url}" alt="" />

    <div class="info">
    <div class="text">
        <ul>
        <li>
            <h1>${user.login}</h1>
        </li>
        
        </ul>
        <p>
        ${
          user.bio
            ? user.bio
            : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores explicabo ut deserunt consequatur cumque quasi vitae dicta provident"
        }
        </p>
    </div>
    <div class="numbers">
        <ul>
        <li class="following">${user.following}<b>Following</b></li>
        <li class="followers">${user.followers}<b>Followers</b></li>
        <li class="repos">${user.public_repos}<b>Repos</b></li>
        </ul>
    </div>
    <div id ='repos'> </div>
    </div>
    </div>`;

  container.innerHTML = mainHTML;
}

function showRepos(repos) {
  const repoHolder = document.getElementById("repos");

  repos.slice(0, 9).forEach((repo) => {
    const liEl = document.createElement("a");
    liEl.classList.add("repo");

    liEl.target = "_blank";
    liEl.innerText = repo.name;
    liEl.href = repo.html_url;

    repoHolder.appendChild(liEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let holder = username.value;
  console.log(holder);
  getUser(holder);
});
