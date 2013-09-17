* Background image (tilt with screen)

* View/event-handling
	* Figure out UI
	* Tap to place block
	* Long-tap to destroy block (after 1 second or delay, not on mouseUp)

* Replace yetibox project

* Yeti (2 tiles high)
	* Unlike blocks, these are positioned by pixel not tile
	* Should bounce/fall when device is shaken


{
  onTick: function() {}, // every turn
  onBumped: function() {}, // is hit
  onBump: function() {}, // hits
  onFall: function() {},
  onClick: function() {}
}