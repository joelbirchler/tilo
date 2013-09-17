require('./extended-lodash.js');

var tilo = {
  spritesheet: require('./spritesheet.js').spritesheet,
  board: require('./board.js').board
};
window.tilo = tilo;

var boards = {
  fore: new tilo.board(14, 10, document.getElementById('canvas-fore').getContext('2d')),
  mid: new tilo.board(14, 10, document.getElementById('canvas-mid').getContext('2d'))
};

// generate landscape
boards.mid.wave(
    Math.ceil(Math.random() * boards.mid.height()/1.5), 
    Math.random() * boards.mid.height(), 
    'earth'
  );

// random stones
_.times(Math.floor(Math.random() * 5), function(i) {
  boards.mid.platform(
    Math.floor(Math.random() * boards.mid.width()), 
    Math.floor(Math.random() * boards.mid.height()), 
    Math.ceil(Math.random() * i), 
    'stone'
  );
});

// water

boards.fore.fill(0, boards.fore.bottom() - Math.round(Math.random() * 4), boards.fore.right(), boards.fore.bottom(), 'water')


// get started
var sheet = new tilo.spritesheet(require('../images/kenney-70.json'));
sheet.load(function() {
  boards.mid.draw(this);
  boards.fore.draw(this);
});