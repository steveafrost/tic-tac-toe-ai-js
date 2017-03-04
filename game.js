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

    //clear board && add listeners
    for(let square of this.state) {
      square.textContent = " ";
      square.addEventListener('click', this.makePlayerMove);
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
    return this.moves % 2 === 0 ? "X" : "O";
  }

  makeMove(index) {
    this.state[index].textContent = this.currentPlayer();
    if (this.over()) {
      return this.finished();
    }
    this.moves++;
  }

  makeComputerMove() {
    // minimax(0);
    // makeMove(computerChoice);
    this.makeMove(this.randomMove());
  }

  makePlayerMove() {
    console.log("playermove");
    if (this.textContent != " ") {
      alert("You cannot move there. Please pick a different spot");
    } else {
      currentGame.makeMove(parseInt(this.dataset.id));
    }
    if (!currentGame.over() && currentGame.type === 'computer') {
      currentGame.makeComputerMove();
    }
  }

  randomMove() {
    const randomSpace = Math.floor(Math.random() * (9 - 0));
    if (this.state[randomSpace].textContent !== " ") {
      return this.randomMove();
    } else {
      return randomSpace;
    }
  }

  removeListeners() {
    for (let square of this.state) {
      square.removeEventListener('click', this.makePlayerMove);
    }
  }

  finished() {
    if (this.tie()) {
      this.alertBanner.innerHTML = 'Tie Game';
    } else {
      this.alertBanner.innerHTML = `Winner: ${this.currentPlayer()}`;
    }
    this.removeListeners();
  }

  full() {
    return !this.state.some(function(square) {
      return square.textContent === " ";
    });
  }

  over() {
    return this.won() || this.tie();
  }

  tie() {
    return !this.won() && this.full();
  }

  won() {
    let win = false;
    for (let combo of this.winningCombos) {
      let space1 = this.state[combo[0]].textContent;
      let space2 = this.state[combo[1]].textContent;
      let space3 = this.state[combo[2]].textContent;

      if (space1 === "X" && space2 === "X" && space3 === "X") {
        win = true;
      } else if (space1 === "O" && space2 === "O" && space3 === "O") {
        win = true;
      }
    }
    return win;
  }
}
