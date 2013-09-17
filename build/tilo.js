;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=module.exports={
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
},{"../images/kenney-70.json":1,"./board.js":2,"./extended-lodash.js":3,"./spritesheet.js":4}]},{},[5])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvam9lbC9zb3VyY2UvdGlsby9pbWFnZXMva2VubmV5LTcwLmpzb24iLCIvVXNlcnMvam9lbC9zb3VyY2UvdGlsby9zcmMvYm9hcmQuanMiLCIvVXNlcnMvam9lbC9zb3VyY2UvdGlsby9zcmMvZXh0ZW5kZWQtbG9kYXNoLmpzIiwiL1VzZXJzL2pvZWwvc291cmNlL3RpbG8vc3JjL3Nwcml0ZXNoZWV0LmpzIiwiL1VzZXJzL2pvZWwvc291cmNlL3RpbG8vc3JjL3RpbG8uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cz1tb2R1bGUuZXhwb3J0cz17XG4gICdpbWFnZSc6ICdpbWFnZXMva2VubmV5LTcwLnBuZycsXG4gICdweCc6IDcwLFxuICAnbWFwJzoge1xuICAgICdzdG9uZS1uZXN3JzogWzAsIDBdLFxuICAgICdzdG9uZS1uc3cnOiBbMSwgMF0sXG4gICAgJ3N0b25lLW4nOiBbMiwgMF0sICdzdG9uZS1ucyc6IFsyLCAwXSxcbiAgICAnc3RvbmUtbmVzJzogWzMsIDBdLFxuICAgICdzdG9uZS1udyc6IFsxLCAxXSxcbiAgICAnc3RvbmUtJzogWzIsIDFdLFxuICAgICdzdG9uZS1uZSc6IFszLCAxXSxcblxuICAgICdlYXJ0aC1uZXN3JzogWzAsIDJdLFxuICAgICdlYXJ0aC1uc3cnOiBbMSwgMl0sXG4gICAgJ2VhcnRoLW4nOiBbMiwgMl0sICdlYXJ0aC1ucyc6IFsyLCAyXSxcbiAgICAnZWFydGgtbmVzJzogWzMsIDJdLFxuICAgICdlYXJ0aC1udyc6IFsxLCAzXSxcbiAgICAnZWFydGgtJzogWzIsIDNdLFxuICAgICdlYXJ0aC1uZSc6IFszLCAzXSxcblxuICAgICd3YXRlci0nOiBbMSwgNF0sXG4gICAgJ3dhdGVyLW4nOiBbMiwgNF1cbiAgfVxufSIsImV4cG9ydHMuYm9hcmQgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0LCBjYW52YXNDb250ZXh0KSB7XG4gIHZhciB4LCB5LCBtYXAgPSBbXSwgdGhhdCA9IHRoaXM7XG5cbiAgdGhpcy53aWR0aCA9IF8udmFsdWVGdW5jKHdpZHRoKTtcbiAgdGhpcy5oZWlnaHQgPSBfLnZhbHVlRnVuYyhoZWlnaHQpO1xuICB0aGlzLnJpZ2h0ID0gXy52YWx1ZUZ1bmMod2lkdGggLSAxKTtcbiAgdGhpcy5ib3R0b20gPSBfLnZhbHVlRnVuYyhoZWlnaHQgLSAxKTtcblxuICBfLnRpbWVzKGhlaWdodCwgZnVuY3Rpb24oeSkgeyBtYXBbeV0gPSBbXTsgfSk7XG5cbiAgdGhpcy5jYXBzID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciBzID0gJyc7XG5cbiAgICBpZiAoeSA9PSAwIHx8ICFtYXBbeSAtIDFdW3hdKSB7IHMgKz0gJ24nOyB9XG4gICAgaWYgKHggPCB0aGF0LnJpZ2h0KCkgJiYgIW1hcFt5XVt4ICsgMV0pIHsgcyArPSAnZSc7IH1cbiAgICBpZiAoeSA8IHRoYXQuYm90dG9tKCkgJiYgIW1hcFt5ICsgMV1beF0pIHsgcyArPSAncyc7IH1cbiAgICBpZiAoeCA+IDAgJiYgIW1hcFt5XVt4IC0gMV0pIHsgcyArPSAndyc7IH1cblxuICAgIHJldHVybiBzO1xuICB9O1xuICBcbiAgdGhpcy5kcmF3ID0gZnVuY3Rpb24oc3ByaXRlc2hlZXQpIHtcbiAgICBmb3IgKHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgIGZvciAoeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICAgIG1hcFt5XVt4XSAmJiBzcHJpdGVzaGVldC5kcmF3KG1hcFt5XVt4XSwgdGhhdC5jYXBzKHgsIHkpLCB4LCB5LCBjYW52YXNDb250ZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhhdDtcbiAgfTtcblxuICB0aGlzLnBsYWNlID0gZnVuY3Rpb24oeCwgeSwgdGlsZVR5cGUpIHtcbiAgICByZXR1cm4gdGhhdC5maWxsKHgsIHksIHgsIHksIHRpbGVUeXBlKTtcbiAgfTtcblxuICB0aGlzLnBsYXRmb3JtID0gZnVuY3Rpb24oeCwgeSwgY291bnQsIHRpbGVUeXBlKSB7XG4gICAgcmV0dXJuIHRoYXQuZmlsbCh4LCB5LCB4ICsgY291bnQsIHksIHRpbGVUeXBlKTtcbiAgfTtcblxuICB0aGlzLmZpbGwgPSBmdW5jdGlvbih4MSwgeTEsIHgyLCB5MiwgdGlsZVR5cGUpIHtcbiAgICBmb3IgKHZhciB5ID0geTE7IHkgPD0geTI7IHkrKykge1xuICAgICAgZm9yICh2YXIgeCA9IHgxOyB4IDw9IHgyOyB4KyspIHtcbiAgICAgICAgbWFwW3ldW3hdID0gdGlsZVR5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICByZXR1cm4gdGhhdDtcbiAgfTtcblxuICB0aGlzLndhdmUgPSBmdW5jdGlvbihhbXBsaXR1ZGUsIG9mZnNldCwgdGlsZVR5cGUpIHtcbiAgICBzdHJldGNoID0gTWF0aC5yYW5kb20oKSAqIDAuNlxuICAgIF8udGltZXModGhhdC53aWR0aCgpLCBmdW5jdGlvbih4KSB7XG4gICAgICB0aGF0LmZpbGwoeCwgTWF0aC5mbG9vcih0aGF0LmJvdHRvbSgpICsgKE1hdGguc2luKHggKiBzdHJldGNoICsgb2Zmc2V0KSAqIGFtcGxpdHVkZSkpLCB4LCB0aGF0LmJvdHRvbSgpLCB0aWxlVHlwZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhhdDtcbiAgfVxufSIsIl8ubWl4aW4oe1xuXHQndmFsdWVGdW5jJzogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiB2YWx1ZTsgfTtcblx0fVxufSk7IiwiZXhwb3J0cy5zcHJpdGVzaGVldCA9IGZ1bmN0aW9uKGltYWdlU3JjT3JPYmplY3QsIG1hcCwgcHgpIHtcbiAgdmFyIHRoYXQgPSB0aGlzLFxuICAgIGltYWdlU3JjLFxuICAgIGltYWdlO1xuICAgIFxuICBpZiAoXy5pc1N0cmluZyhpbWFnZVNyY09yT2JqZWN0KSkge1xuICAgIGltYWdlU3JjID0gaW1hZ2VTcmNPck9iamVjdDtcbiAgfSBlbHNlIHtcbiAgICBpbWFnZVNyYyA9IGltYWdlU3JjT3JPYmplY3QuaW1hZ2U7XG4gICAgbWFwID0gaW1hZ2VTcmNPck9iamVjdC5tYXA7XG4gICAgcHggPSBpbWFnZVNyY09yT2JqZWN0LnB4O1xuICB9XG4gIFxuICB0aGlzLmxvYWQgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gaW1hZ2VTcmM7XG4gICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7IFxuICAgICAgY2FsbGJhY2suY2FsbCh0aGF0KTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHRoYXQ7XG4gIH1cbiAgXG4gIHRoaXMuZHJhdyA9IGZ1bmN0aW9uKHNwcml0ZU5hbWUsIHNwcml0ZUNhcHMsIHRpbGVYLCB0aWxlWSwgY29udGV4dCkge1xuICAgIHZhciBkaW1zID0gbWFwW3Nwcml0ZU5hbWUgKyAnLScgKyBzcHJpdGVDYXBzXSB8fCBtYXBbc3ByaXRlTmFtZSArICctJ107XG4gICAgaWYgKGRpbXMpIHtcbiAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCBkaW1zWzBdICogcHgsIGRpbXNbMV0gKiBweCwgcHgsIHB4LCAodGlsZVggKiBweCksICh0aWxlWSAqIHB4KSwgcHgsIHB4KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoYXQ7XG4gIH1cbn0iLCJyZXF1aXJlKCcuL2V4dGVuZGVkLWxvZGFzaC5qcycpO1xuXG52YXIgdGlsbyA9IHtcbiAgc3ByaXRlc2hlZXQ6IHJlcXVpcmUoJy4vc3ByaXRlc2hlZXQuanMnKS5zcHJpdGVzaGVldCxcbiAgYm9hcmQ6IHJlcXVpcmUoJy4vYm9hcmQuanMnKS5ib2FyZFxufTtcbndpbmRvdy50aWxvID0gdGlsbztcblxudmFyIGJvYXJkcyA9IHtcbiAgZm9yZTogbmV3IHRpbG8uYm9hcmQoMTQsIDEwLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzLWZvcmUnKS5nZXRDb250ZXh0KCcyZCcpKSxcbiAgbWlkOiBuZXcgdGlsby5ib2FyZCgxNCwgMTAsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMtbWlkJykuZ2V0Q29udGV4dCgnMmQnKSlcbn07XG5cbi8vIGdlbmVyYXRlIGxhbmRzY2FwZVxuYm9hcmRzLm1pZC53YXZlKFxuICAgIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogYm9hcmRzLm1pZC5oZWlnaHQoKS8xLjUpLCBcbiAgICBNYXRoLnJhbmRvbSgpICogYm9hcmRzLm1pZC5oZWlnaHQoKSwgXG4gICAgJ2VhcnRoJ1xuICApO1xuXG4vLyByYW5kb20gc3RvbmVzXG5fLnRpbWVzKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpLCBmdW5jdGlvbihpKSB7XG4gIGJvYXJkcy5taWQucGxhdGZvcm0oXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmRzLm1pZC53aWR0aCgpKSwgXG4gICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm9hcmRzLm1pZC5oZWlnaHQoKSksIFxuICAgIE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogaSksIFxuICAgICdzdG9uZSdcbiAgKTtcbn0pO1xuXG4vLyB3YXRlclxuXG5ib2FyZHMuZm9yZS5maWxsKDAsIGJvYXJkcy5mb3JlLmJvdHRvbSgpIC0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogNCksIGJvYXJkcy5mb3JlLnJpZ2h0KCksIGJvYXJkcy5mb3JlLmJvdHRvbSgpLCAnd2F0ZXInKVxuXG5cbi8vIGdldCBzdGFydGVkXG52YXIgc2hlZXQgPSBuZXcgdGlsby5zcHJpdGVzaGVldChyZXF1aXJlKCcuLi9pbWFnZXMva2VubmV5LTcwLmpzb24nKSk7XG5zaGVldC5sb2FkKGZ1bmN0aW9uKCkge1xuICBib2FyZHMubWlkLmRyYXcodGhpcyk7XG4gIGJvYXJkcy5mb3JlLmRyYXcodGhpcyk7XG59KTsiXX0=
;