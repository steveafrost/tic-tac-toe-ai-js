/* jshint esversion: 6 */

class AI {
  constructor() {

  }

  score(depth) {
    if (gameTie()) {
      return 0;
    } else if (currentToken() === "X") {
      return depth - 10;
    } else if (currentToken() === "O") {
      return 10 - depth;
    }
  }

  minimax(depth) {
    console.log(`the depth is ${depth}`);
    if (gameOver()) {
      return score(depth);
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

  makeAIMove() {
    // minimax(0);
    // makeMove(computerChoice);
    currentGame.makeMove(this.randomMove());
  }

  randomMove() {
    const randomSpace = Math.floor(Math.random() * (9 - 0));
    if (currentGame.state[randomSpace].textContent !== " ") {
      return this.randomMove();
    } else {
      return randomSpace;
    }
  }
}
