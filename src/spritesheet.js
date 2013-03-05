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
      tilo.context.drawImage(image, dims[0], dims[1], dims[2], dims[3], (tileX * px), (tileY * px) - (dims[3] - px), dims[2], dims[3]);
    }
    return that;
  }
}