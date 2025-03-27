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

		// Path is required!
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
		
		var start = [
			// define a starting point (note zero length)
			[0,0,'black','black',50,50,20,20,0,55,0,55],
		];

		var straight_run = [
			// straight run, even pressure
			[100,0,'black','black',50,50,20,20,0,55,0,55],
		];

		var left_crab = [
			[0,0,'black','black',100,0,20,40,0,55,-1,55],
			[100,0,'black','black',50,50,20,20,0,55,-1,55],
		];

		var right_crab = [
			[0,0,'black','black',0,100,40,20,1,55,0,55],
			[100,0,'black','black',50,50,20,20,1,55,0,55],
		];

		return start.concat(straight_run).concat(left_crab).concat(right_crab);
	}
}
