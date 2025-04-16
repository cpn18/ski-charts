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
			// starting point (note zero length)
			[0, 0],
			// straight run
			[200, 0, "green", "red"],
		];
	}
}
