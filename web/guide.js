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
		// starting point
		var start = [
			[0,45,'grey','grey',60,40,20,20,0,55,0,55],
			[50,0,'red','grey',60,40,20,20,0,55,0,55],
			[50,0,'grey','blue',40,60,20,20,0,55,0,55]
		];

		var left_footer = [
			// left-footer top
			[100, -30,'grey','blue',20,80,20,20,0,55,0,55],

			// left-footer into the fall line (specify 90/10 at the fall line)
			[50, -15, 'gray', 'black',10,90,20,20,0,55,0,55],

			// out of the fall line
			[50, -15, 'gray', 'black',20,80,20,20,0,55,0,55],

			// end of the turn
			[100, -30, 'gray', 'red',40,60,20,20,0,55,0,55],
			[50,0,'grey','red',40,60,20,20,0,55,0,55],
		];

		// Path is required
		return start.concat(left_footer);
	}
}
