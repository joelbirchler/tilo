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