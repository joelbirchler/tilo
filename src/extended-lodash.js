_.mixin({
	'valueFunc': function(value) {
		return function() { return value; };
	}
});