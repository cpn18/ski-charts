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
		var skiPivot = 55;         // skier's pivot point

		// Path is required!
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
	
			// define a starting point (note zero length)
			[0,0,'black','black',50,50,20,20,0,skiPivot,0,skiPivot],

			// straight run, even pressure
			[100,0,'black','black',50,50,20,20,0,skiPivot,0,skiPivot],

			// straight run, but skis end pivoted 45 degrees
			[100,0,'black','black',50,50,20,20,45,skiPivot,45,skiPivot],

			// short turn, pressure on outside ski, skier turns 45 degrees
			[50,45,'black','black',90,10,20,20,45,skiPivot,45,skiPivot],
];
	}
}
