/* jshint esversion: 6 */

class AI {
  constructor() {
    this.depth = 0;
    this.bestMove = 0;
  }

  makeAIMove() {
    this.minimax(currentGame.boardState());
    currentGame.makeMove(this.bestMove);
    // currentGame.makeMove(this.randomMove());
  }

  stateCopy(state) {
    let copy = [];
      state.forEach(function(square, index) {
        copy.push(index);
      });
    return copy;
  }

  nextState(position, state) {
    // let currentState = this.stateCopy(state);
    state[position] = currentGame.player();
    currentGame.moves++;
    return state;
  }

  minimax(state) {
    if (currentGame.over(state)) {

      console.log("HIT GAME OVER");
      return this.score(state);
    }

    let scores = [];
    let moves = [];
    let availablePositions = currentGame.availableMoves(state);

    let nextStates = availablePositions.map(function(position) {
      console.log(currentAI.nextState(position,state));
      return currentAI.nextState(position, state);
      // let next = currentAI.nextState(position);
      // currentAI.minimax(next);
    });

    for(let singleState of nextStates) {
      // return console.log(singleState);
      return currentAI.minimax(singleState);

      // score computed in here
      // put score in collection of scores
    }
    console.log("scores: " + scores);
  }

  score(state) {
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
    if (currentGame.board[randomSpace].textContent !== " ") {
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