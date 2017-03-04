/* jshint esversion: 6 */

// const winningCombos = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8], // horizontal
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8], // vertical
//   [0, 4, 8],
//   [2, 4, 6] // diagonal
// ];

// let currentBoard = Array.from(document.getElementsByTagName('td'));
// let currentState = availableMoves();
// let alertBanner = document.getElementById('alertBanner');
// let moveCounter = 0;
// let computer = false; //replaced with this.type
// let playerTurn = false;
// let computerMove;

// function addListeners() {
//   for (let square of currentBoard) {
//     square.addEventListener('click', makePlayerMove);
//   }
// }

// function availableMoves() {
//   let availableMoves = [];

//   currentBoard.forEach(function(square, index) {
//     if (square.textContent === " ") {
//       availableMoves.push(index);
//     }
//   });

//   return availableMoves;
// }

// function currentToken() {
//   return moveCounter % 2 === 0 ? "X" : "O";
// }

function evaluateMoves(depth) {
  if (gameTie()) {
    return 0;
  } else if (currentToken() === "X") {
    return depth - 10;
  } else if (currentToken() === "O") {
    return 10 - depth;
  }
}

// function fullBoard() {
//   return !currentBoard.some(function(square) {
//     return square.textContent === " ";
//   });
// }

// function gameFinished() {
//   if (gameTie()) {
//     alertBanner.innerHTML = 'Tie Game';
//   } else {
//     moveCounter--;
//     alertBanner.innerHTML = `Winner: ${currentToken()}`;
//   }
//   removeListeners();
// }

// function gameOver() {
//   return winningCombo() || gameTie();
// }

// function gameTie() {
//   return !winningCombo() && fullBoard();
// }

// function makeMove(index) {
//   currentBoard[index].textContent = currentToken();
//   moveCounter++;
// }

// function unmakeMove(index) {
//   currentBoard[index].textContent = " ";
// }

// function makeComputerMove() {
//   minimax(0);
//   makeMove(computerChoice);
//   if (gameOver()) {
//     gameFinished();
//   }
// }

// function makePlayerMove() {
//   if (this.textContent != " ") {
//     alert("You cannot move there. Please pick a different spot");
//   } else {
//     makeMove(parseInt(this.dataset.id));
//   }
//   if (gameOver()) {
//     gameFinished();
//   } else if (computer) {
//     makeComputerMove();
//   }
// }

function minimax(depth) {
  console.log(`the depth is ${depth}`);
  if (gameOver()) {
    return evaluateMoves(depth);
  }

  depth++;
  let scores = [];
  let moves = [];
  let board = availableMoves();

  for (let move of board) {
    makeMove(move);
    scores.push(minimax(depth));
    moves.push(move);
    unmakeMove(move);
  }

  let maxScore, maxScoreIndex, minScore, minScoreIndex;

  if (currentToken() === 'O') {
    maxScore = Math.max.apply(Math, scores);
    maxScoreIndex = scores.indexOf(maxScore);
    computerChoice = moves[maxScoreIndex];
    console.log(scores[maxScoreIndex]);
    console.log("computer move");
    return scores[maxScoreIndex];
  } else {
    minScore = Math.min.apply(Math, scores);
    minScoreIndex = scores.indexOf(minScore);
    computerChoice = moves[minScoreIndex];
    console.log(scores[minScoreIndex]);
    console.log("player move");
    return scores[minScoreIndex];
  }
}

// function removeListeners() {
//   for (let square of currentBoard) {
//     square.removeEventListener('click', makePlayerMove);
//   }
// }

// function startGame(type) {
  // moveCounter = 0;
  // alertBanner.innerHTML = "";
  // for (let square of currentBoard) {
  //   square.textContent = " ";
  // }
  // addListeners();
  // if (type === '1') {
  //   computer = true;
  // }
// }

// function winningCombo() {
//   let boardWon = false;
//   for (let combo of winningCombos) {
//     let space1 = currentBoard[combo[0]].textContent;
//     let space2 = currentBoard[combo[1]].textContent;
//     let space3 = currentBoard[combo[2]].textContent;

//     if (space1 === "X" && space2 === "X" && space3 === "X") {
//       boardWon = true;
//     } else if (space1 === "O" && space2 === "O" && space3 === "O") {
//       boardWon = true;
//     }
//   }
//   return boardWon;
// }

// function randomMove() {
//   randomSpace = Math.floor(Math.random() * (9 - 0));
//   if (currentBoard[randomSpace].textContent !== " ") {
//     return randomMove();
//   } else {
//     return randomSpace;
//   }
// }

const newGame = function newGame(type) {
  currentGame = new Game(type);
  currentGame.addListeners();
}