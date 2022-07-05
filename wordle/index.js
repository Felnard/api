const word = document.querySelector(".word");
const boxes = document.querySelectorAll(".boxes");
const tryAgain = document.querySelector("button");
// for the boxes arary of divs for displaying the letters
let counter = 0;

let guess = [];
let rand = "";
// for the boxes arary of divs for displaying the colors
let boxesCount = 0;

randomWord();

async function randomWord() {
  const api = "https://random-word-api.herokuapp.com/word?length=5";

  const resp = await fetch(api);
  const respData = await resp.json();

  splits(respData[0]);
}

// EVENT LISTENER WHEN TYPING
document.addEventListener("keydown", (key) => {
  console.log(key.key);
  if (key.key == "Enter" && guess.length > 4) {
    enter(rand, guess);
  }
  if (key.key == "Backspace" && guess.length >= 0 && counter > boxesCount) {
    counter--;
    guess.pop();
    boxes[counter].innerHTML = "";
    boxes[counter].style.border = "2px solid rgb(165, 163, 163)";
  }
  if ("abcdefghijklmnopqrstuvwxyz".includes(key.key) && guess.length < 5) {
    boxes[counter].style.border = "2px solid rgb(98, 96, 96)";
    boxes[counter].innerHTML = key.key;
    guess.push(key.key);
    counter++;
  }
});
// MAKE THE STRING TO ARRAY
function splits(word) {
  console.log(word);
  rand = word.split("");
}

//CHECK WHEN ENTER
function enter(fromApi, fromUser) {
  // WON
  if (fromApi.join() == fromUser.join()) {
    for (let i = 0; i < fromApi.length; i++) {
      boxes[boxesCount].classList.add("turn");
      boxes[boxesCount].style.backgroundColor = "green";
      boxesCount++;
    }
    alert("You Won");
    tryAgain.style.display = "block";
    return;
  }
  //   COLORS THE BOXES
  for (let i = 0; i < fromApi.length; i++) {
    if (fromApi[i] == fromUser[i]) {
      boxes[boxesCount].style.backgroundColor = "green";
    } else if (fromApi.includes(fromUser[i])) {
      boxes[boxesCount].style.backgroundColor = "yellow";
    } else {
      boxes[boxesCount].style.backgroundColor = "gray";
    }
    boxes[boxesCount].style.border = "2px solid transparent";
    boxesCount++;
  }
  if (boxesCount == boxes.length) {
    word.innerHTML = `The random word is "${rand.join("")}"`;
    alert("You lose");
    tryAgain.style.display = "block";
  }
  guess = [];
}

// TRY AGAIN BUTTON
tryAgain.addEventListener("click", () => {
  randomWord();
  reset();
});

// RESET WHEN LOSE
function reset() {
  boxes.forEach((box) => {
    box.innerHTML = "";
    box.style.backgroundColor = "transparent";
    box.style.border = "2px solid rgb(165, 163, 163)";
  });
  guess = [];
  boxesCount = 0;
  counter = 0;

  tryAgain.style.display = "none";
  word.innerHTML = "";
}
