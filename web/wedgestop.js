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
		return [
			// define a starting point (note zero length)
			[0,0,'black','black',50,50,20,20,0,55,0,55],

			// straight run, even pressure
			[400,0,'black','black',50,50,20,20,15,50,-15,50],
		];
	}
}
