// Created by MOHSOWA
"use strict";

// Player 1
let player_1_score = 0;
let player_1_totalScore = 0;
const displayScore_1 = document.querySelector("#score--0");
const displaycurrent_1 = document.querySelector("#current--0");
const ActivePlayer_1 = document.querySelector(".player--0");

// Player 2
let player_2_score = 0;
let player_2_totalScore = 0;
const displayScore_2 = document.querySelector("#score--1");
const displaycurrent_2 = document.querySelector("#current--1");
const ActivePlayer_2 = document.querySelector(".player--1");

// main Player
let main_player = 1;

let game_finish = false;

// dice
const dise = document.querySelector(".dice");

//// main function
const ressit_score = function () {
  game_finish = false;
  player_1_score = 0;
  player_1_totalScore = 0;
  displayScore_1.textContent = player_1_score;
  displaycurrent_1.textContent = 0;

  player_2_score = 0;
  player_2_totalScore = 0;
  displayScore_2.textContent = player_2_score;
  displaycurrent_2.textContent = 0;

  dise.classList.add("hidden");

  main_player = 1;
  if (ActivePlayer_1.classList.contains("player--winner")) {
    ActivePlayer_1.classList.remove("player--winner");
  } else if (ActivePlayer_2.classList.contains("player--winner")) {
    ActivePlayer_2.classList.remove("player--winner");
  } else if (ActivePlayer_2.classList.contains("player--active")) {
    ActivePlayer_2.classList.remove("player--active");
  } else if (!ActivePlayer_1.classList.contains("player--active")) {
    ActivePlayer_1.classList.add("player--active");
  }
};
ressit_score();

const dice_roll = function () {
  if (!game_finish) {
    const dice_roll_number = Number(Math.trunc(Math.random() * 6) + 1); // random number between 1-6
    dise.src = `dice-${dice_roll_number}.png`; // change image source
    dise.classList.remove("hidden"); // show image

    if (dice_roll_number === 1) {
      // switch player
      swith_Player();
    } else {
      // add dice to the cureent
      if (main_player === 1) {
        // Player 1
        player_1_totalScore += dice_roll_number;
        displaycurrent_1.textContent = player_1_totalScore;
      } else {
        // Player 2
        player_2_totalScore += dice_roll_number;
        displaycurrent_2.textContent = player_2_totalScore;
      }
    }
  }
};

const swith_Player = function () {
  player_1_score = player_2_score = 0;
  displaycurrent_1.textContent = displaycurrent_2.textContent = 0;
  if (main_player === 1) {
    main_player = 2;
    ActivePlayer_1.classList.remove("player--active");
    ActivePlayer_2.classList.add("player--active");
  } else {
    main_player = 1;
    ActivePlayer_2.classList.remove("player--active");
    ActivePlayer_1.classList.add("player--active");
  }
};

const hold = function () {
  if (!game_finish) {
    if (main_player === 1) {
      player_1_score += player_1_totalScore;
      displayScore_1.textContent = player_1_score;
    } else {
      player_2_score += player_2_totalScore;
      displayScore_2.textContent = player_2_score;
    }
    win_player();
    swith_Player();
    player_1_totalScore = player_2_totalScore = 0;
  }
};

// win in game
const win_player = function () {
  if ((player_1_score >= 100) & (main_player === 1)) {
    console.log("player 1 win");
    ActivePlayer_1.classList.remove("player--active");
    ActivePlayer_1.classList.add("player--winner");
    game_finish = true;
  } else if ((player_2_score >= 100) & (main_player === 2)) {
    console.log("player 2 win");
    ActivePlayer_2.classList.remove("player--active");
    ActivePlayer_2.classList.add("player--winner");
    game_finish = true;
  }
};

// New Game btn
const new_game = document.querySelector(".btn--new");
new_game.addEventListener("click", function () {
  ressit_score();
});

// Role Dice
const rolling_btn = document.querySelector(".btn--roll");
rolling_btn.addEventListener("click", dice_roll);

// Hold btn
const hold_score = document.querySelector(".btn--hold");
hold_score.addEventListener("click", hold);
