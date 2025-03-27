// This is Javascript
turnClass = class {
        constructor() {
                this.max_width = 8 // Pixels

                this.center_width = 1 // Pixels
                this.center_color = 'black'

                this.ski_color = 'red'
                this.ski_length = 100 // Pixels
                this.ski_width = 2 // Pixels
                this.ski_mod = 50 // Pixels, how often to draw

                this.initial_position = [200, 0]
        }

        // Generate and return the path
        getPath() {

		// This example shows a heel push, where the skis' pivot
		// point has been moved toward the front of the ski

		// starting point
		var start = [
			[0,45,'black','black',50,50,20,20,0,55,0,55]
		];

		var left_footer = [
			// left-footer top
			// Pivot point is now at 25% of the ski length!
			[100, -30,'grey','black',20,80,20,20,-10,25,-10,25],

			// left-footer into the fall line (specify 90/10 at the fall line)
			[50, -15, 'gray', 'black',10,90,20,20,-10,25,-10,25],

			// out of the fall line
			[50, -15, 'gray', 'black',20,80,20,20,-10,25,-10,25],

			// end of the turn
			[100, -30, 'gray', 'black',50,50,20,20,0,55,0,55],
		];

		// Path is required
		return start.concat(left_footer);
	}
}
