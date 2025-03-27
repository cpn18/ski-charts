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
			// starting point
			[0,0,'black','black',99,1,20,20,15,55,15,55],

			[200, 80,'black','gray',50,50,20,20,15,55,15,55],

			[200, -80, 'gray', 'black', 1, 99,20,20,-15,55,-15,55],
		];
	}
}
