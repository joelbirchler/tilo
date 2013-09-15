var tilo = {
  context: document.getElementById('canvas').getContext('2d'),
  spritesheet: require('./spritesheet.js').spritesheet,
  board: require('./board.js').board
};
window.tilo = tilo;

var board = new tilo.board([
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    ["earth-alone", "stone-alone", "earth-alone", "stone-alone", "earth-alone", "stone-alone", "earth-alone", "stone-alone", "earth-alone", "stone-alone", "earth-alone", "stone-alone", "earth-alone", "stone-alone"]
  ],
  14,
  10
  );
  
var sheet = new tilo.spritesheet(require('../images/kenney-70.json'));
sheet.load(function() {
  board.draw(this);
});

// TODO: walking sprite
// - burp it out onto the page
// - figure out your main loop
// - arrow keys move
// - collisions
// - animate the walk
//
// TODO: pushable blocks
// TODO: block in the water
// TODO: block pattern matching -- sun moon sun moon / ABCD
// TODO: lever toggles
// TODO: buttons (use blocks to keep down)