* Migration (we are going to merge this project with yetibox)
	* Bring in the sprites from yetibox
	* Water is in a foreground layer
	* Landscape generation (managed by tilo.js but give board helper functions like fills and sin wave fills)
	* Smart tile rendering (select curved variants on edges)

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