/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/
document.getElementById("");

function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}
function shuffle(array) {
  var m = array.length,
    t,
    i;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
class Game {
  constructor(playersGuess = null, pastGuesses = []) {
    (this.playersGuess = playersGuess), (this.pastGuesses = pastGuesses);
    this.winningNumber = generateWinningNumber();
  }

  difference = () => Math.abs(this.playersGuess - this.winningNumber);

  isLower = () => {
    if (this.winningNumber > this.playersGuess) {
      return true;
    }
    return false;
  };
}
Game.prototype.playersGuessSubmission = function (num) {
  console.log(num);
  console.log(typeof num);
  if (isNaN(num) || num < 1 || num > 100) {
    // document.querySelector("#msg").innerHTML = "That is an invalid guess.";
    throw "That is an invalid guess.";
  } else {
    this.playersGuess = num;
  }
  return this.checkGuess();
};

let feedbackText = "";
Game.prototype.checkGuess = function () {
  if (this.playersGuess === this.winningNumber) {
    feedbackText = "You Win!";
  } else {
    if (this.pastGuesses.includes(this.playersGuess))
      feedbackText = "You have already guessed that number.";
    else {
      this.pastGuesses.push(this.playersGuess);
      if (this.pastGuesses.length >= 5) {
        feedbackText = "You Lose.";
      } else if (this.difference() < 10) {
        feedbackText = "You're burning up!";
      } else if (this.difference() < 25) {
        feedbackText = "You're lukewarm.";
      } else if (this.difference() < 50) {
        feedbackText = "You're a bit chilly.";
      } else {
        feedbackText = "You're ice cold!";
      }
    }
  }

  document.querySelector("#feedback").innerHTML = feedbackText;
  document.querySelector(
    `#guess-list li:nth-child(${this.pastGuesses.length})`
  ).innerHTML = `<input class="guess" type="number" placeholder="-" value = "${this.playersGuess}" >`;
  return feedbackText;
};

function newGame() {
  return new Game();
}
// const reset = document.querySelector("#reset");
// console.log(reset);
// reset.addEventListener("click", function () {
//   console.log("im clicked");
//   newGame();
// });

Game.prototype.provideHint = function () {
  let array = [
    generateWinningNumber(),
    generateWinningNumber(),
    this.winningNumber,
  ];
  return shuffle(array);
};

function playGame() {
  const game = newGame();
  const button = document.querySelector("#button");
  console.log(button);
  button.addEventListener("click", function () {
    const playersGuess = +document.querySelector("#inputbox").value;
    console.log(playersGuess);
    document.querySelector("input").value = "";
    try {
      game.playersGuessSubmission(playersGuess);
    } catch (e) {
      alert(e);
    }
  });
}
playGame();
