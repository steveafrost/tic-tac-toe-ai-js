class Game {
  constructor(type) {
    this.moves = 0;
    this.type = type;
  }

  addListeners() {
    for (let square of currentBoard) {
      square.addEventListener('click', makePlayerMove);
    }
  }

  currentState() {
    Array.from(document.getElementsByTagName('td'));
  }

}
