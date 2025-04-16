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
		var start = [[0,0]]
		var straight_run = [10,0,"green","red]"]
		var traverse = [50,0,"grey","grey",50,50]
		var left_foot = [200,-90,"red","green",10,90]
		var right_foot = flip(left_foot)
		var half_right = scale(right_foot, 0.5, 0.5)

		return start.concat(
			[straight_run]).concat(
			[half_right]).concat(
			[traverse]).concat(
			[left_foot]).concat(
			[traverse]).concat(
			[right_foot])
	}
}
