let game = document.querySelector(".game"),
  result = document.querySelector(".result"),
  btnGame = document.querySelector(".new-game"),
  fields = document.querySelectorAll(".field"),
  step = false,
  count = 0,
  circle = `<svg class="circle">
                <circle r="45" cx="58" cy="58" stroke ="blue" 
                stroke-width ="10" fill="none" stroke-linecap="round" />
            </svg>`,
  cross = `<svg class="cross">
                <line class="first" x1="15" y1="15" x2 = "100" y2="100"
                stroke="red" stroke-width ="10"  stroke-linecap="round"/>
                <line class="second" x1="100" y1="15" x2="15" y2="100" 
                stroke="red" stroke-width="10" stroke-linecap="round" />
            </svg>`;

function stepCross(target) {
  target.innerHTML = cross;
  target.classList.add("x");
  let crossAudio = new Audio("sound/cross.mp3");
  crossAudio.play();
  count++;

  console.log("ход крестики ", step);
  step = !step;
}

function stepCircle(target) {
  target.innerHTML = circle;
  target.classList.add("o");
  let circleAudio = new Audio("sound/circle.mp3");
  circleAudio.play();
  count++;

  console.log("ход нолики ", step);
  step = !step;
}

function init(e) {
  if (e.target.classList.contains("field")) {
    if (!step) {
      stepCross(e.target);
    } else {
      stepCircle(e.target);
    }
  }
  winner();
}

function newGame() {
  step = false;
  count = 0;
  result.innerText = "";

  game.removeEventListener("mousedown", handleMouseDown);
  game.removeEventListener("mouseup", handleMouseUp);

  fields.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("x", "o", "active");
  });

  game.addEventListener("mousedown", handleMouseDown);
  game.addEventListener("mouseup", handleMouseUp);
  result.classList.remove("show");
}

function handleMouseDown(e) {
  if (!e.target.classList.contains("x") && !e.target.classList.contains("o")) {
    currentTarget = e.target;
  }
}

function handleMouseUp(e) {
  if (currentTarget === e.target) {
    init(e);
  }
  currentTarget = null;
}

function winner() {
  let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Проверяем наличие победителя
  for (let i = 0; i < combinations.length; i++) {
    let winAudio = new Audio("sound/win.mp3");

    if (
      fields[combinations[i][0]].classList.contains("x") &&
      fields[combinations[i][1]].classList.contains("x") &&
      fields[combinations[i][2]].classList.contains("x")
    ) {
      setTimeout(() => {
        fields[combinations[i][0]].classList.add("active");
        fields[combinations[i][1]].classList.add("active");
        fields[combinations[i][2]].classList.add("active");
        result.innerText = "Winner X";
        winAudio.play();
      }, 1500);
      result.classList.add("show");
      game.removeEventListener("mousedown", handleMouseDown);
      game.removeEventListener("mouseup", handleMouseUp);
      return; // Завершаем функцию, так как X выиграл
    }

    if (
      fields[combinations[i][0]].classList.contains("o") &&
      fields[combinations[i][1]].classList.contains("o") &&
      fields[combinations[i][2]].classList.contains("o")
    ) {
      setTimeout(() => {
        fields[combinations[i][0]].classList.add("active");
        fields[combinations[i][1]].classList.add("active");
        fields[combinations[i][2]].classList.add("active");
        result.innerText = "Winner O";
        winAudio.play();
      }, 1500);
      result.classList.add("show");
      game.removeEventListener("mousedown", handleMouseDown);
      game.removeEventListener("mouseup", handleMouseUp);
      return; // Завершаем функцию, так как O выиграл
    }
  }

  // Проверка на ничью после проверки победителей
  if (count === 9) {
    result.classList.add("show");
    result.innerText = "Draw";
    game.removeEventListener("mousedown", handleMouseDown);
    game.removeEventListener("mouseup", handleMouseUp);
  }
}

btnGame.addEventListener("click", newGame);
game.addEventListener("mousedown", handleMouseDown);
game.addEventListener("mouseup", handleMouseUp);
