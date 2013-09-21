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