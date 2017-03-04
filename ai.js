/* jshint esversion: 6 */

class AI {
  constructor() {
    this.depth = 0;
    this.bestMove = 0;
  }

  makeAIMove() {
    this.minimax(currentGame.state);
    currentGame.makeMove(this.bestMove);
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

  minimax(state) {
    if (currentGame.over(state)) {
      console.log("HIT GAME OVER");
      return this.score(state);
    }

    let availablePositions = currentGame.availableMoves(state);

    let nextStates = availablePositions.map(function(position) {
      console.log(currentAI.nextState(position));
      return currentAI.nextState(position);
      // let next = currentAI.nextState(position);
      // currentAI.minimax(next);
    });

    for(let singleState of nextStates) {
      let nextScore = currentAI.minimax(singleState);
      console.log(nextScore);

      // score computed in here
      // put score in collection of scores
    }
  }

  score(state) {
    debugger
    if (currentGame.tie(state)) {
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