"use strict";
// selecting element
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
// selecting button element
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// selecting player
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

// starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

var scores = [0, 0];
var currentScore = 0;
var activePlayer = 0;
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
// 1.user roll dice
btnRoll.addEventListener("click", function () {
  // generating the dice
  var dice = Math.floor(Math.random() * 6 + 1);
  console.log(dice);

  // 2. display the roll
  diceEl.classList.remove("hidden");
  diceEl.src = `./img/dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});
// player press hold score
btnHold.addEventListener("click", function () {
  // 1. add current score to total score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // 2. check score >= 100
  if (scores[activePlayer] >= 100) {
    // if yes => player win
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    diceEl.classList.add("hidden");
    btnHold.classList.add("hidden");
    btnRoll.classList.add("hidden");
  } else {
    // if no => switch player
    switchPlayer();
  }
});

btnNew.addEventListener("click", function () {
  //set all score = 0
  scores = [0, 0];
  currentScore = 0;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  activePlayer =0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  btnHold.classList.remove("hidden");
  btnRoll.classList.remove("hidden");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
});
