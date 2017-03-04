/* jshint esversion: 6 */

class AI {
  constructor() {
    this.depth = 0;
    this.bestMove = 0;
  }

  makeAIMove() {
    this.minimax();
    currentGame.makeMove(bestMove);
    // currentGame.makeMove(this.randomMove());
  }

  stateCopy() {
    let copy = [];
      currentGame.state.forEach(function(square, index) {
        copy.push(square.textContent);
      });
    return copy;
  }

  nextState(position) {
    let currentState = this.stateCopy();
    currentState[position] = currentGame.player();
    return currentState;
  }

  minimax() {
    if (currentGame.over()) {
      return this.score();
    }

    let availablePositions = currentGame.availableMoves();
    console.log(availablePositions);

    let nextStates = availablePositions.map(function(position) {
      console.log(currentGame.ai.nextState(position));
      return currentGame.ai.nextState(position);
    });

    // for(let state in nextStates) {

    // }
  }

  score() {
    if (currentGame.tie()) {
      return 0;
    } else if (currentGame.player() === "X") {
      return this.depth - 10;
    } else if (currentGame.player() === "O") {
      return 10 - this.depth;
    }
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











    // this.depth++;
    // let scores = [];
    // let moves = [];
    // let board = currentGame.availableMoves();

    // for (let move of board) {
    //   currentGame.makeMove(move);
    //   scores.push(minimax(depth));
    //   moves.push(move);
    //   unmakeMove(move);
    // }

    // let maxScore, maxScoreIndex, minScore, minScoreIndex;

    // if (currentGame.player() === 'O') {
    //   maxScore = Math.max.apply(Math, scores);
    //   maxScoreIndex = scores.indexOf(maxScore);
    //   bestMove = moves[maxScoreIndex];
    //   console.log(scores[maxScoreIndex]);
    //   console.log("computer move");
    //   return scores[maxScoreIndex];
    // } else {
    //   minScore = Math.min.apply(Math, scores);
    //   minScoreIndex = scores.indexOf(minScore);
    //   bestMove = moves[minScoreIndex];
    //   console.log(scores[minScoreIndex]);
    //   console.log("player move");
    //   return scores[minScoreIndex];
    // }