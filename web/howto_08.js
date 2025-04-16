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
		var start = [[0,45, "grey", "grey", 90, 10]]
		var left_init = [120, -90, "grey", "red", 10, 90]
		var right_init = flip(left_init)

		return start.concat(
			[left_init]).concat(
			[right_init])
	}
}
