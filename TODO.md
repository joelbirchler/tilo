* Migration (we are going to merge this project with yetibox)
	* Smart tile rendering (select curved variants on edges, write this as apply-able to single tile or as a pass across full board)
	* Water is in a foreground layer

* Background image (tilt with screen)

* View/event-handling
	* Figure out UI
	* Tap to place block
	* Long-tap to destroy block (after 1 second or delay, not on mouseUp)

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