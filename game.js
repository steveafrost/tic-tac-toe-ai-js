const startingBoard = [" "," "," "," "," "," "," "," "," "];
const winningCombos = [
                        [0,1,2], [3,4,5], [6,7,8], // horizontal
                        [0,3,6], [1,4,7], [2,5,8], // vertical
                        [0,4,8], [2,4,6]           // diagonal
                      ]

let currentBoard = document.getElementsByTagName('td');
let winnerBanner = document.getElementById('winner');
let moveCounter = 0;
let gameOver = false;
let computer = false;
let playerTurn = false;

function addListeners() {
  for (square of currentBoard) {
    square.addEventListener('click', playerMove);
  }
}

function currentToken() {
  return moveCounter % 2 === 0 ? "X" : "O";
}

function checkWin() {
  winningCombos.forEach(function(combo, index) {
    let space1 = currentBoard[combo[0]].textContent;
    let space2 = currentBoard[combo[1]].textContent;
    let space3 = currentBoard[combo[2]].textContent;

    if (space1 === "X" && space2 === "X" && space3 === "X") {
      winner(space1);
    } else if (space1 === "O" && space2 === "O" && space3 === "O") {
      winner(space1);
    };
  });
};

function computerMove() {
  let randomMove = Math.floor(Math.random() * (9 - 1) + 1);
  currentBoard[randomMove].textContent = currentToken();
  checkWin();
}

function playerMove() {
  if (this.textContent != " ") {
    alert("You cannot move there. Please pick a different spot");
  } else {
    this.textContent = currentToken();
    moveCounter++;
    playerTurn = false
  }
  checkWin();
  if (computer) {
    computerMove();
  }
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
  if (gameType = '2p') {
    computer = true;
    computerMove();
  }
}

function winner(token) {
  alertBanner.innerHTML = `Winner: ${token}`;
  removeListeners();
}