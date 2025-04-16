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
		var start = [[0,45, "grey", "grey", 50, 50, 20, 20]]
		var left_init = [100, -30, "grey", "red", 20, 80, 5, 35]
		var right_init = flip(left_init)
		var left_shape = [100, -30, "grey", "blue", 10, 90, 5, 35]
		var right_shape = flip(left_shape)
		var left_control = [100, -30, "grey", "green", 80, 20, 20, 20]
		var right_control = flip(left_control)

		return start.concat(
			[left_init]).concat(
			[left_shape]).concat(
			[left_control]).concat(
			[right_init]).concat(
			[right_shape]).concat(
			[right_control])
	}
}
