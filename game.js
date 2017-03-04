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

    //clear board && add listeners
    for(let square of this.state) {
      square.textContent = " ";
      square.addEventListener('click', this.makePlayerMove);
    }
  }

  availableMoves(state) {
    let availableMoves = [];
      state.forEach(function(square, index) {
        if (square.textContent === " ") {
          availableMoves.push(index);
        }
      });
    return availableMoves;
  }

  finished() {
    if (this.tie(this.state)) {
      this.alertBanner.innerHTML = 'Tie Game';
    } else {
      this.alertBanner.innerHTML = `Winner: ${this.player()}`;
    }
    this.removeListeners();
  }

  full(state) {
    // return !state.some(function(square) {
    //   return square.textContent === " ";
    // });

    return !state.includes(" ");
  }

  makeMove(index) {
    this.state[index].textContent = this.player();
    if (this.over(currentGame.state)) {
      return this.finished();
    }
    this.moves++;
  }

  makePlayerMove() {
    console.log("playermove");
    if (this.textContent != " ") {
      alert("You cannot move there. Please pick a different spot");
    } else {
      currentGame.makeMove(parseInt(this.dataset.id));
    }
    if (!currentGame.over(currentGame.state) && currentGame.type === 'computer') {
      currentAI.makeAIMove();
    }
  }

  over(state) {
    return this.won(state) || this.tie(state);
  }

  player() {
    return this.moves % 2 === 0 ? "X" : "O";
  }

  removeListeners() {
    for (let square of this.state) {
      square.removeEventListener('click', this.makePlayerMove);
    }
  }

  tie(state) {
    return !this.won(state) && this.full(state);
  }

  won(state) {
    let win = false;
    for (let combo of this.winningCombos) {
      let space1 = state[combo[0]].textContent;
      let space2 = state[combo[1]].textContent;
      let space3 = state[combo[2]].textContent;

      if (space1 === "X" && space2 === "X" && space3 === "X") {
        win = true;
      } else if (space1 === "O" && space2 === "O" && space3 === "O") {
        win = true;
      }
    }
    return win;
  }
}
