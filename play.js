/* jshint esversion: 6 */

const newGame = function newGame(type) {
  currentGame = new Game(type);
  if (type === 'computer') {
    currentAI = new AI();
  }
};