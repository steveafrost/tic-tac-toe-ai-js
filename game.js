const winningCombos = [
                        [0,1,2], [3,4,5], [6,7,8], // horizontal
                        [0,3,6], [1,4,7], [2,5,8], // vertical
                        [0,4,8], [2,4,6]           // diagonal
                      ]

let currentBoard = Array.from(document.getElementsByTagName('td'));
let alertBanner = document.getElementById('alertBanner');
let moveCounter = 0;
let computer = false;
let playerTurn = false;


function addListeners() {
  for (square of currentBoard) {
    square.addEventListener('click', playerMove);
  }
}


function availableMoves() {
  let availableMoves = [];

  currentBoard.forEach(function(square, index) {
    if (square.textContent == " ") {
      availableMoves.push(index);
    };
  });

  return availableMoves;
}


function currentToken() {
  return moveCounter % 2 === 0 ? "X" : "O";
}


function computerMove() {
  currentBoard[randomMove()].textContent = currentToken();
  moveCounter++;
  if (gameOver()) {
    gameFinished();
  };
}


function fullBoard() {
  return !currentBoard.some(function(square) { return square.textContent === " "})
}


function gameFinished() {
  if (gameTie()) {
    alertBanner.innerHTML = 'Tie Game';
  } else {
    moveCounter--
    alertBanner.innerHTML = `Winner: ${currentToken()}`;
  }
  removeListeners();
}


function gameOver() {
  return winningCombo() || fullBoard();
}


function gameTie() {
  return !winningCombo() && fullBoard();
}


function randomMove() {
  randomSpace = Math.floor(Math.random() * (9 - 0));
  console.log(randomSpace)
  if (currentBoard[randomSpace].textContent !== " ") {
    return randomMove();
  } else {
    return randomSpace;
  }
}


function minimax(depth) {
  if(gameOver) {
    return evaluateMoves(depth)
  }

  depth++
  let scores = [];
  let moves = [];
  let availableMoves = availableMoves();

  // for(let move of availableMoves) {

  // }
}


function playerMove() {
  if (this.textContent != " ") {
    alert("You cannot move there. Please pick a different spot");
  } else {
    this.textContent = currentToken();
    moveCounter++;
    playerTurn = false
  }
  if (gameOver()) {
    gameFinished();
  } else if (computer) {
    computerMove();
  };
}


function removeListeners() {
  for (square of currentBoard) {
    square.removeEventListener('click', playerMove);
  }
}


function startGame(gameType) {
  moveCounter = 0;
  alertBanner.innerHTML = "";
  for (square of currentBoard) {
    square.textContent = " ";
  };
  addListeners();
  if (gameType === '1') {
    computer = true;
  }
}


function winningCombo() {
  for(let combo of winningCombos) {
    let space1 = currentBoard[combo[0]].textContent;
    let space2 = currentBoard[combo[1]].textContent;
    let space3 = currentBoard[combo[2]].textContent;

    if (space1 === "X" && space2 === "X" && space3 === "X") {
      return true;
    } else if (space1 === "O" && space2 === "O" && space3 === "O") {
      return true;
    };
  };
};