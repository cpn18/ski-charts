// This is Javascript
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
		// RF
		var rightfoot =	[
			[75,45,'black','black',90,10,20,20,5,55,5,55],
			[75,45,'black','black',50,50,20,20,5,55,5,55],
		]
		// LF
		var leftfoot = [
			[75,-45,'black','black',10,90,20,20,-5,55,-5,55],
			[75,-45,'black','black',50,50,20,20,-5,55,-5,55],
		]

		// Path is required!
		var start = [
			// define a starting point (note zero length)
			[0,0,'black','black',60,40,20,20,0,55,0,55],

		];

		return start.concat(rightfoot).concat(leftfoot).concat(rightfoot);
	}
}
