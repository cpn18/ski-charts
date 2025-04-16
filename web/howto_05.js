// This is Javascript
// Minimum required values and functions
turnClass = class {
	constructor() {
		this.center_width = 1 // Pixels
		this.center_color = 'black'

		this.max_width = 8 // Pixels

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
			// heading (+ right footer, - left footer)
			// right color
			// left color
			// right pressure
			// left pressure
			// starting point (note zero length)
			[0, 0],
			// straight run, even pressure
			[10, 0, "green", "red"],
			// right footed turn
			[100, 45,,, 90, 10],
			// traverse
			[50, 0, "grey", "grey", 50, 50],
			// left footed turn
			[200, -90, "red", "green", 10, 90],
		];
	}
}
