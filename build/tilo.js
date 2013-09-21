;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=module.exports={
  'image': 'images/kenney-64.png',
  'px': 64,
  'map': {
    'stone-nesw': [0, 0],
    'stone-nsw': [1, 0],
    'stone-n': [2, 0], 'stone-ns': [2, 0],
    'stone-nes': [3, 0],
    'stone-nw': [1, 1],
    'stone-': [2, 1],
    'stone-ne': [3, 1],

    'earth-nesw': [0, 2],
    'earth-nsw': [1, 2],
    'earth-n': [2, 2], 'earth-ns': [2, 2],
    'earth-nes': [3, 2],
    'earth-nw': [1, 3],
    'earth-': [2, 3],
    'earth-ne': [3, 3],

    'wood-nesw': [0, 1], 'wood-': [0, 1],

    'water-': [1, 4],
    'water-n': [2, 4]
  }
}
},{}],2:[function(require,module,exports){
exports.board = function(width, height, canvasContext) {
  var x, y, map = [], that = this;

  this.width = _.valueFunc(width);
  this.height = _.valueFunc(height);
  this.right = _.valueFunc(width - 1);
  this.bottom = _.valueFunc(height - 1);

  _.times(height, function(y) { map[y] = []; });

  this.caps = function(x, y) {
    var s = '';

    if (y == 0 || !map[y - 1][x]) { s += 'n'; }
    if (x < that.right() && !map[y][x + 1]) { s += 'e'; }
    if (y < that.bottom() && !map[y + 1][x]) { s += 's'; }
    if (x > 0 && !map[y][x - 1]) { s += 'w'; }

    return s;
  };
  
  this.draw = function(spritesheet) {
    for (y = 0; y < height; y++) {
      for (x = 0; x < width; x++) {
        map[y][x] && spritesheet.draw(map[y][x], that.caps(x, y), x, y, canvasContext);
      }
    }

    return that;
  };

  this.place = function(x, y, tileType) {
    return that.fill(x, y, x, y, tileType);
  };

  this.platform = function(x, y, count, tileType) {
    return that.fill(x, y, x + count, y, tileType);
  };

  this.fill = function(x1, y1, x2, y2, tileType) {
    for (var y = y1; y <= y2; y++) {
      for (var x = x1; x <= x2; x++) {
        map[y][x] = tileType;
      }
    }

   return that;
  };

  this.wave = function(amplitude, offset, tileType) {
    stretch = Math.random() * 0.6
    _.times(that.width(), function(x) {
      that.fill(x, Math.floor(that.bottom() + (Math.sin(x * stretch + offset) * amplitude)), x, that.bottom(), tileType);
    });

    return that;
  }
}
},{}],3:[function(require,module,exports){
_.mixin({
	'valueFunc': function(value) {
		return function() { return value; };
	}
});
},{}],4:[function(require,module,exports){
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

  this.px = function() {
    return px;
  };
  
  this.load = function(callback) {
    image = new Image();
    image.src = imageSrc;
    image.onload = function() { 
      callback.call(that);
    }
    
    return that;
  }
  
  this.draw = function(spriteName, spriteCaps, tileX, tileY, context) {
    var dims = map[spriteName + '-' + spriteCaps] || map[spriteName + '-'];
    if (dims) {
      context.drawImage(image, dims[0] * px, dims[1] * px, px, px, (tileX * px), (tileY * px), px, px);
    }
    return that;
  }
}
},{}],5:[function(require,module,exports){
require('./extended-lodash.js');

var tilo = {
  spritesheet: require('./spritesheet.js').spritesheet,
  board: require('./board.js').board,
  tray: require('./tray.js').tray
};
window.tilo = tilo;

var boards = {
  fore: new tilo.board(16, 10, document.getElementById('canvas-fore').getContext('2d')),
  mid: new tilo.board(16, 10, document.getElementById('canvas-mid').getContext('2d'))
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
Math.floor(Math.random() * 2) || 
  boards.fore.fill(0, boards.fore.bottom() - Math.round(Math.random() * 4), boards.fore.right(), boards.fore.bottom(), 'water')

// tray
var tray = new tilo.tray(1024, 128, document.getElementById('canvas-tray').getContext('2d'));
tray.add(['earth', 'stone', 'wood']);

// get started
var sheet = new tilo.spritesheet(require('../images/kenney-64.json'));
sheet.load(function() {
  boards.mid.draw(this);
  boards.fore.draw(this);
  tray.draw(this);
});
},{"../images/kenney-64.json":1,"./board.js":2,"./extended-lodash.js":3,"./spritesheet.js":4,"./tray.js":6}],6:[function(require,module,exports){
exports.tray = function(width, height, canvasContext) {
	var items = [], selectedIndex = 0, that = this;

	this.add = function(tileType) {
		_.contains(items, tileType) || (items = items.concat(tileType));
	};

	this.remove = function(tileType) {
		_.pull(items, tileType);
		return that;
	};

	this.select = function(tileTypeOrIndex) {
		if (_.isNumber(tileTypeOrIndex)) { return items[tileTypeOrIndex]; }
		selectedIndex = _.indexOf(items, tileTypeOrIndex);
	};

	this.selected = function() {
		return _items[selectedIndex];
	};

	this.draw = function(spritesheet) {
		var px = spritesheet.px();

		// highlight selected item
		var gradX = px/2 + ((1 + selectedIndex * 2) * px);
		var grad = canvasContext.createRadialGradient(gradX, px, 0, gradX, px, px);
  		grad.addColorStop(0, 'rgba(1, 255, 255, 1)');
  		grad.addColorStop(1, 'rgba(1, 159, 98, 0)');
  		canvasContext.fillStyle = grad;
  		canvasContext.fillRect(0, 0, width, height);

		_.each(items, function(item, index) {
			spritesheet.draw(item, 'nesw', 1 + index * 2, 0.5, canvasContext);
		});

	    return that;
	};
};
},{}]},{},[5])
;