// This is Javascript
turnClass = class {
        constructor() {
                this.max_width = 8 // Pixels

                this.center_width = 1 // Pixels
                this.center_color = 'grey'

                this.ski_color = 'purple' // Rossi 3G
                this.ski_length = 100 // Pixels
                this.ski_width = 1 // Pixels
                this.ski_mod = 20 // Pixels, how often to draw

                this.initial_position = [200, 0]
        }

        // Generate and return the path
        getPath() {
		var lengthOfArc = 180;
		var degreeOfCurve = 70;

		// starting point
		var start = [
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
	
			[0,0,'black','black',90,10,0,40,0,55,0,55],
			[lengthOfArc,degreeOfCurve,'black','black',50,50,20,20,0,55,0,55]
		];

		var left_footer = [
			// left-footer into the fall line (specify 90/10 at the fall line)
			[lengthOfArc, -degreeOfCurve, 'black', 'black',10,90,0,40,0,55,0,55],

			// out of the fall line
			[lengthOfArc, -degreeOfCurve, 'black', 'black',50,50,20,20,0,55,0,55],
		];

		// Path is required
		return start.concat(left_footer);
	}
}
