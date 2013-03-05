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