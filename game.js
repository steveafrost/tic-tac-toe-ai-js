/* jshint esversion: 6 */

class Game {
  constructor(type) {
    this.alertBanner = document.getElementById('alertBanner');
    this.moves = 0;
    this.type = type;
    this.state = Array.from(document.getElementsByTagName('td'));
    this.winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // horizontal
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // vertical
      [0, 4, 8],
      [2, 4, 6] // diagonal
    ];

    console.log('game started with type:', this.type);
  }

  addListeners() {
    debugger
    for (let square of this.state) {
      square.addEventListener('click', makePlayerMove);
    }
  }

  availableMoves() {
    let availableMoves = [];
      this.state.forEach(function(square, index) {
        if (square.textContent === " ") {
          availableMoves.push(index);
        }
      });
    return availableMoves;
  }

  currentPlayer() {
    return moves % 2 === 0 ? "X" : "O";
  }

  makeMove(index) {
    currentBoard[index].textContent = currentPlayer();
    moves++;
  }

  makeComputerMove() {
    // minimax(0);
    // makeMove(computerChoice);
    randomMove();
    if (gameOver()) {
      gameFinished();
    }
  }

  makePlayerMove() {
    console.log("playermove");
    if (this.textContent != " ") {
      alert("You cannot move there. Please pick a different spot");
    } else {
      makeMove(parseInt(this.dataset.id));
    }
    if (gameOver()) {
      gameFinished();
    } else if (this.type == 'computer') {
      makeComputerMove();
    }
  }

  randomMove() {
    randomSpace = Math.floor(Math.random() * (9 - 0));
    if (this.state[randomSpace].textContent !== " ") {
      return randomMove();
    } else {
      return randomSpace;
    }
  }

  finished() {
    if (gameTie()) {
      alertBanner.innerHTML = 'Tie Game';
    } else {
      moves--;
      alertBanner.innerHTML = `Winner: ${currentPlayer()}`;
    }
    removeListeners();
  }

  full() {
    return !this.state.some(function(square) {
      return square.textContent === " ";
    });
  }

  over() {
    return won() || tie();
  }

  tie() {
    return !won() && full();
  }

  won() {
    let win = false;
    for (let combo of winningCombos) {
      let space1 = currentBoard[combo[0]].textContent;
      let space2 = currentBoard[combo[1]].textContent;
      let space3 = currentBoard[combo[2]].textContent;

      if (space1 === "X" && space2 === "X" && space3 === "X") {
        win = true;
      } else if (space1 === "O" && space2 === "O" && space3 === "O") {
        win = true;
      }
    }
    return win;
  }
}
