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

		var start = [
			// define a starting point (note zero length)
			[0,0,'black','black',50,50,20,20,0,55,0,55],
		];

		var straight_run = [
			// straight run, even pressure
			[100,0,'black','black',50,50,20,20,0,55,0,55],
		];

		var half_left_crab = [
			[0,0,'black','black',0,100,20,30,0,55,0,55],
			[50,-50,'black','black',50,50,30,10,0,55,0,55],
		];

		var left_crab = [
			[0,0,'black','black',0,100,10,30,0,55,0,55],
			[100,-100,'black','black',50,50,30,10,0,55,0,55],
		];

		var right_crab = [
			[0,0,'black','black',100,0,30,10,0,55,0,55],
			[100,100,'black','black',50,50,10,30,0,55,0,55],
		];

		return start.concat(straight_run).concat(half_left_crab).concat(right_crab).concat(left_crab);
	}
}
