/* jshint esversion: 6 */

function evaluateMoves(depth) {
  if (gameTie()) {
    return 0;
  } else if (currentToken() === "X") {
    return depth - 10;
  } else if (currentToken() === "O") {
    return 10 - depth;
  }
}

function minimax(depth) {
  console.log(`the depth is ${depth}`);
  if (gameOver()) {
    return evaluateMoves(depth);
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

const newGame = function newGame(type) {
  currentGame = new Game(type);
};