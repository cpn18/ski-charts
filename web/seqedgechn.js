// This is Javascript
turnClass = class {
        constructor() {
                this.max_width = 8 // Pixels

                this.center_width = 1 // Pixels
                this.center_color = 'black'

                this.ski_color = 'purple' // Rossi 3G
                this.ski_length = 100 // Pixels
                this.ski_width = 1 // Pixels
                this.ski_mod = 20 // Pixels, how often to draw

                this.initial_position = [200, 0]
        }

        // Generate and return the path
        getPath() {
		// starting point
		var start = [
			[0,0,'black','black',90,10,20,20,0,55,0,55],
			[2*81,81,'black','black',90,10,20,20,5,55,0,55]
		];

		var left_footer = [
			// left-footer top
			[54, -27,'black','black',50,50,20,20,0,55,-20,55],

			// left-footer into the fall line (specify 90/10 at the fall line)
			[54, -27, 'black', 'black',10,90,20,20,0,55,0,55],
			[54, -27, 'black', 'black',10,90,20,20,0,55,0,55],

			// out of the fall line
			[2*27, -27, 'black', 'black',10,90,20,20,0,55,0,55],

			// end of the turn
			[2*54, -54, 'black', 'black',10,90,20,20,0,55,0,55],
		];

		return start.concat(left_footer);
	}
}
