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

for (space of currentBoard) {
  space.addEventListener('click', makeMove);
}

function currentToken() {
  return moveCounter % 2 === 0 ? "X" : "O";
}

function checkWin() {
  winningCombos.forEach(function(combo, index) {
    space1 = currentBoard[combo[0]].textContent;
    space2 = currentBoard[combo[1]].textContent;
    space3 = currentBoard[combo[2]].textContent;

    if (space1 === "X" && space2 === "X" && space3 === "X") {
      winner(space1);
    } else if (space1 === "O" && space2 === "O" && space3 === "O") {
      winner(space1);
    };
  });
};

function makeMove() {
  if (this.textContent != " ") {
    alert("You cannot move there. Please pick a different spot");
  } else {
    this.textContent = currentToken();
    moveCounter++;
  }
  checkWin();
}

function resetGame() {
  moveCounter = 0;
  alertBanner.innerHTML = "";
  for (space of currentBoard) {
    space.textContent = " ";
  };
}

function winner(token) {
  alertBanner.innerHTML = `Winner: ${token}`;
}
