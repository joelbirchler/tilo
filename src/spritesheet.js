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