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
		const blue_brush = {"type": "brush", "color": "blue", "height": 20}
		const green_brush = {"type": "brush", "color": "green", "height": 20}
		const arc = 60 
		const length = 240

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
			// hip angle
			// decoration offset
			// decoration data
	
			// define a starting point (note zero length)
			[0,0,'black','black',50,50,20,20,0,55,0,55,0,60,blue_brush],
			[0,0,'black','black',50,50,20,20,0,55,0,55,0,-60,blue_brush],

			[length/2,arc/2,'black','black',90,10,20,20,0,55,0,55,0,60,green_brush],
			[length,0,'black','black',50,50,20,20,0,55,0,55,0,0,null],
			[length,-arc,'black','black',10,90,20,20,0,55,0,55,0,-60,green_brush],
			[length,0,'black','black',50,50,20,20,0,55,0,55,0,0,null],
			[length,arc,'black','black',90,10,20,20,0,55,0,55,0,60,green_brush],
			[length,0,'black','black',50,50,20,20,0,55,0,55,0,0,null],
			[length,-arc,'black','black',10,90,20,20,0,55,0,55,0,-60,green_brush],
			[length,0,'black','black',50,50,20,20,0,55,0,55,0,0,null],
		];
	}
}
