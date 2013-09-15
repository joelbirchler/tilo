;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  'image': 'images/kenney-70.png',
  'px': 70,
  'map': {

    'stone-alone': [0, 0],
    'stone-ledge-left': [1, 0],
    'stone-top': [2, 0],
    'stone-ledge-right': [3, 0],
    'stone-top-left': [1, 1],
    'stone-fill': [2, 1],
    'stone-top-right': [3, 1],

    'earth-alone': [0, 2],
    'earth-ledge-left': [1, 2],
    'earth-top': [2, 2],
    'earth-ledge-right': [3, 2],
    'earth-top-left': [1, 3],
    'earth-fill': [2, 3],
    'earth-top-right': [3, 3],

    'water-fill': [1, 4],
    'water-top': [2, 4]
  }
}
},{}],2:[function(require,module,exports){
exports.board = function(map, width, height) {
  var x, y;
  
  this.draw = function(spritesheet) {
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        spritesheet.draw(map[y][x], x, y);
      }
    }
  }
}
},{}],3:[function(require,module,exports){
exports.spritesheet = function(imageSrcOrObject, map, px) {
  var that = this,
    imageSrc,
    image;
    
  if (_.isString(imageSrcOrObject)) {
    imageSrc = imageSrcOrObject;
  } else {
    imageSrc = imageSrcOrObject.image;
    map = imageSrcOrObject.map;
    px = imageSrcOrObject.px;
  }
  
  this.load = function(callback) {
    image = new Image();
    image.src = imageSrc;
    image.onload = function() { 
      callback.call(that);
    }
    
    return that;
  }
  
  this.draw = function(spriteName, tileX, tileY) {
    var dims = map[spriteName];
    if (dims) {
      tilo.context.drawImage(image, dims[0] * px, dims[1] * px, px, px, (tileX * px), (tileY * px), px, px);
    }
    return that;
  }
}
},{}],4:[function(require,module,exports){
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
},{"../images/kenney-70.json":1,"./board.js":2,"./spritesheet.js":3}]},{},[4])
;