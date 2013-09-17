require('./extended-lodash.js');

var tilo = {
  context: document.getElementById('canvas').getContext('2d'),
  spritesheet: require('./spritesheet.js').spritesheet,
  board: require('./board.js').board
};
window.tilo = tilo;

var board = new tilo.board(14, 10);

// generate landscape
board
  .fill(0, board.bottom() - Math.round(Math.random() * 4), board.right(), board.bottom(), 'water')
  .wave(
    Math.ceil(Math.random() * board.height()/1.5), 
    Math.random() * board.height(), 
    'earth'
  );

// random stones
_.times(Math.floor(Math.random() * 5), function(i) {
  board.platform(
    Math.floor(Math.random() * board.width()), 
    Math.floor(Math.random() * board.height()), 
    Math.ceil(Math.random() * i), 
    'stone'
  );
});

// get started
var sheet = new tilo.spritesheet(require('../images/kenney-70.json'));
sheet.load(function() {
  board.draw(this);
});