// This is Javascript
// Minimum required values and functions
turnClass = class {
	constructor() {
		this.max_width = 8 // Pixels

		this.center_width = 1 // Pixels
		this.center_color = 'black'

		this.ski_color = 'purple' // Rossi 3G
		this.ski_length = 100 // Pixels
		this.ski_width = 1 // Pixels
		this.ski_mod = 30 // Pixels, how often to draw

		this.initial_position = [200, 0]
	}

	// Generate and return the path
	getPath() {
		return [
			// length
			// heading (positive = right footer, negative = left footer),
			// right color
			// left color
			// right pressure
			// left pressure
			// right stance
			// left stance
			// right ski pivot angle 
			// right ski pivot point (0-100)
			// left ski pivot angle
			// left ski pivot point (0-100)
	
			// define a starting point (note zero length)
			[0,0,'black','black',50,50,20,20,0,55,0,55],

			// straight run, even pressure
			[400,0,'black','black',50,50,20,20,0,55,0,55],
		];
	}
}
