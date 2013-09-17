;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  'image': 'images/kenney-70.png',
  'px': 70,
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

    'water-': [1, 4],
    'water-n': [2, 4]
  }
}
},{}],2:[function(require,module,exports){
exports.board = function(width, height) {
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
        map[y][x] && spritesheet.draw(map[y][x], that.caps(x, y), x, y);
        map[y][x] && console.log(x, y, that.caps(x,y));
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
  
  this.load = function(callback) {
    image = new Image();
    image.src = imageSrc;
    image.onload = function() { 
      callback.call(that);
    }
    
    return that;
  }
  
  this.draw = function(spriteName, spriteCaps, tileX, tileY) {
    var dims = map[spriteName + '-' + spriteCaps] || map[spriteName + '-'];
    if (dims) {
      tilo.context.drawImage(image, dims[0] * px, dims[1] * px, px, px, (tileX * px), (tileY * px), px, px);
    }
    return that;
  }
}
},{}],5:[function(require,module,exports){
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
},{"../images/kenney-70.json":1,"./board.js":2,"./extended-lodash.js":3,"./spritesheet.js":4}]},{},[5])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvam9lbC9zb3VyY2UvdGlsby9pbWFnZXMva2VubmV5LTcwLmpzb24iLCIvVXNlcnMvam9lbC9zb3VyY2UvdGlsby9zcmMvYm9hcmQuanMiLCIvVXNlcnMvam9lbC9zb3VyY2UvdGlsby9zcmMvZXh0ZW5kZWQtbG9kYXNoLmpzIiwiL1VzZXJzL2pvZWwvc291cmNlL3RpbG8vc3JjL3Nwcml0ZXNoZWV0LmpzIiwiL1VzZXJzL2pvZWwvc291cmNlL3RpbG8vc3JjL3RpbG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHM9e1xuICAnaW1hZ2UnOiAnaW1hZ2VzL2tlbm5leS03MC5wbmcnLFxuICAncHgnOiA3MCxcbiAgJ21hcCc6IHtcbiAgICAnc3RvbmUtbmVzdyc6IFswLCAwXSxcbiAgICAnc3RvbmUtbnN3JzogWzEsIDBdLFxuICAgICdzdG9uZS1uJzogWzIsIDBdLCAnc3RvbmUtbnMnOiBbMiwgMF0sXG4gICAgJ3N0b25lLW5lcyc6IFszLCAwXSxcbiAgICAnc3RvbmUtbncnOiBbMSwgMV0sXG4gICAgJ3N0b25lLSc6IFsyLCAxXSxcbiAgICAnc3RvbmUtbmUnOiBbMywgMV0sXG5cbiAgICAnZWFydGgtbmVzdyc6IFswLCAyXSxcbiAgICAnZWFydGgtbnN3JzogWzEsIDJdLFxuICAgICdlYXJ0aC1uJzogWzIsIDJdLCAnZWFydGgtbnMnOiBbMiwgMl0sXG4gICAgJ2VhcnRoLW5lcyc6IFszLCAyXSxcbiAgICAnZWFydGgtbncnOiBbMSwgM10sXG4gICAgJ2VhcnRoLSc6IFsyLCAzXSxcbiAgICAnZWFydGgtbmUnOiBbMywgM10sXG5cbiAgICAnd2F0ZXItJzogWzEsIDRdLFxuICAgICd3YXRlci1uJzogWzIsIDRdXG4gIH1cbn0iLCJleHBvcnRzLmJvYXJkID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCkge1xuICB2YXIgeCwgeSwgbWFwID0gW10sIHRoYXQgPSB0aGlzO1xuXG4gIHRoaXMud2lkdGggPSBfLnZhbHVlRnVuYyh3aWR0aCk7XG4gIHRoaXMuaGVpZ2h0ID0gXy52YWx1ZUZ1bmMoaGVpZ2h0KTtcbiAgdGhpcy5yaWdodCA9IF8udmFsdWVGdW5jKHdpZHRoIC0gMSk7XG4gIHRoaXMuYm90dG9tID0gXy52YWx1ZUZ1bmMoaGVpZ2h0IC0gMSk7XG5cblxuICBfLnRpbWVzKGhlaWdodCwgZnVuY3Rpb24oeSkgeyBtYXBbeV0gPSBbXTsgfSk7XG5cbiAgdGhpcy5jYXBzID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciBzID0gJyc7XG5cbiAgICBpZiAoeSA9PSAwIHx8ICFtYXBbeSAtIDFdW3hdKSB7IHMgKz0gJ24nOyB9XG4gICAgaWYgKHggPCB0aGF0LnJpZ2h0KCkgJiYgIW1hcFt5XVt4ICsgMV0pIHsgcyArPSAnZSc7IH1cbiAgICBpZiAoeSA8IHRoYXQuYm90dG9tKCkgJiYgIW1hcFt5ICsgMV1beF0pIHsgcyArPSAncyc7IH1cbiAgICBpZiAoeCA+IDAgJiYgIW1hcFt5XVt4IC0gMV0pIHsgcyArPSAndyc7IH1cblxuICAgIHJldHVybiBzO1xuICB9O1xuICBcbiAgdGhpcy5kcmF3ID0gZnVuY3Rpb24oc3ByaXRlc2hlZXQpIHtcbiAgICBmb3IgKHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgIG1hcFt5XVt4XSAmJiBzcHJpdGVzaGVldC5kcmF3KG1hcFt5XVt4XSwgdGhhdC5jYXBzKHgsIHkpLCB4LCB5KTtcbiAgICAgICAgbWFwW3ldW3hdICYmIGNvbnNvbGUubG9nKHgsIHksIHRoYXQuY2Fwcyh4LHkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbiAgfTtcblxuICB0aGlzLnBsYWNlID0gZnVuY3Rpb24oeCwgeSwgdGlsZVR5cGUpIHtcbiAgICByZXR1cm4gdGhhdC5maWxsKHgsIHksIHgsIHksIHRpbGVUeXBlKTtcbiAgfTtcblxuICB0aGlzLnBsYXRmb3JtID0gZnVuY3Rpb24oeCwgeSwgY291bnQsIHRpbGVUeXBlKSB7XG4gICAgcmV0dXJuIHRoYXQuZmlsbCh4LCB5LCB4ICsgY291bnQsIHksIHRpbGVUeXBlKTtcbiAgfTtcblxuICB0aGlzLmZpbGwgPSBmdW5jdGlvbih4MSwgeTEsIHgyLCB5MiwgdGlsZVR5cGUpIHtcbiAgICBmb3IgKHZhciB5ID0geTE7IHkgPD0geTI7IHkrKykge1xuICAgICAgZm9yICh2YXIgeCA9IHgxOyB4IDw9IHgyOyB4KyspIHtcbiAgICAgICAgbWFwW3ldW3hdID0gdGlsZVR5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICByZXR1cm4gdGhhdDtcbiAgfTtcblxuICB0aGlzLndhdmUgPSBmdW5jdGlvbihhbXBsaXR1ZGUsIG9mZnNldCwgdGlsZVR5cGUpIHtcbiAgICBzdHJldGNoID0gTWF0aC5yYW5kb20oKSAqIDAuNlxuICAgIF8udGltZXModGhhdC53aWR0aCgpLCBmdW5jdGlvbih4KSB7XG4gICAgICB0aGF0LmZpbGwoeCwgTWF0aC5mbG9vcih0aGF0LmJvdHRvbSgpICsgKE1hdGguc2luKHggKiBzdHJldGNoICsgb2Zmc2V0KSAqIGFtcGxpdHVkZSkpLCB4LCB0aGF0LmJvdHRvbSgpLCB0aWxlVHlwZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhhdDtcbiAgfVxufSIsIl8ubWl4aW4oe1xuXHQndmFsdWVGdW5jJzogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiB2YWx1ZTsgfTtcblx0fVxufSk7IiwiZXhwb3J0cy5zcHJpdGVzaGVldCA9IGZ1bmN0aW9uKGltYWdlU3JjT3JPYmplY3QsIG1hcCwgcHgpIHtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuICAgIGltYWdlU3JjLFxuICAgIGltYWdlO1xuICAgIFxuICBpZiAoXy5pc1N0cmluZyhpbWFnZVNyY09yT2JqZWN0KSkge1xuICAgIGltYWdlU3JjID0gaW1hZ2VTcmNPck9iamVjdDtcbiAgfSBlbHNlIHtcbiAgICBpbWFnZVNyYyA9IGltYWdlU3JjT3JPYmplY3QuaW1hZ2U7XG4gICAgbWFwID0gaW1hZ2VTcmNPck9iamVjdC5tYXA7XG4gICAgcHggPSBpbWFnZVNyY09yT2JqZWN0LnB4O1xuICB9XG4gIFxuICB0aGlzLmxvYWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gaW1hZ2VTcmM7XG4gICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7IFxuICAgICAgY2FsbGJhY2suY2FsbCh0aGF0KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRoYXQ7XG4gIH1cbiAgXG4gIHRoaXMuZHJhdyA9IGZ1bmN0aW9uKHNwcml0ZU5hbWUsIHNwcml0ZUNhcHMsIHRpbGVYLCB0aWxlWSkge1xuICAgIHZhciBkaW1zID0gbWFwW3Nwcml0ZU5hbWUgKyAnLScgKyBzcHJpdGVDYXBzXSB8fCBtYXBbc3ByaXRlTmFtZSArICctJ107XG4gICAgaWYgKGRpbXMpIHtcbiAgICAgIHRpbG8uY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIGRpbXNbMF0gKiBweCwgZGltc1sxXSAqIHB4LCBweCwgcHgsICh0aWxlWCAqIHB4KSwgKHRpbGVZICogcHgpLCBweCwgcHgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhhdDtcbiAgfVxufSIsInJlcXVpcmUoJy4vZXh0ZW5kZWQtbG9kYXNoLmpzJyk7XG5cbnZhciB0aWxvID0ge1xuICBjb250ZXh0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJykuZ2V0Q29udGV4dCgnMmQnKSxcbiAgc3ByaXRlc2hlZXQ6IHJlcXVpcmUoJy4vc3ByaXRlc2hlZXQuanMnKS5zcHJpdGVzaGVldCxcbiAgYm9hcmQ6IHJlcXVpcmUoJy4vYm9hcmQuanMnKS5ib2FyZFxufTtcbndpbmRvdy50aWxvID0gdGlsbztcblxudmFyIGJvYXJkID0gbmV3IHRpbG8uYm9hcmQoMTQsIDEwKTtcblxuLy8gZ2VuZXJhdGUgbGFuZHNjYXBlXG5ib2FyZFxuICAuZmlsbCgwLCBib2FyZC5ib3R0b20oKSAtIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDQpLCBib2FyZC5yaWdodCgpLCBib2FyZC5ib3R0b20oKSwgJ3dhdGVyJylcbiAgLndhdmUoXG4gICAgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBib2FyZC5oZWlnaHQoKS8xLjUpLCBcbiAgICBNYXRoLnJhbmRvbSgpICogYm9hcmQuaGVpZ2h0KCksIFxuICAgICdlYXJ0aCdcbiAgKTtcblxuLy8gcmFuZG9tIHN0b25lc1xuXy50aW1lcyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSwgZnVuY3Rpb24oaSkge1xuICBib2FyZC5wbGF0Zm9ybShcbiAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib2FyZC53aWR0aCgpKSwgXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmQuaGVpZ2h0KCkpLCBcbiAgICBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIGkpLCBcbiAgICAnc3RvbmUnXG4gICk7XG59KTtcblxuLy8gZ2V0IHN0YXJ0ZWRcbnZhciBzaGVldCA9IG5ldyB0aWxvLnNwcml0ZXNoZWV0KHJlcXVpcmUoJy4uL2ltYWdlcy9rZW5uZXktNzAuanNvbicpKTtcbnNoZWV0LmxvYWQoZnVuY3Rpb24oKSB7XG4gIGJvYXJkLmRyYXcodGhpcyk7XG59KTsiXX0=
;