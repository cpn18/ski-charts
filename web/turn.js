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

		var degreeOfCurve = 90 / 6;  // Complete turn = 6 segments
		var arcLength = 50;      // Each arc is 50 pixels
		var pivotPoint = 55;         // skier's pivot point

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

			// starting point
			[0,0,'black','black',90,10,20,20,15,pivotPoint,15,pivotPoint],

			// out of the fall line
			[arcLength, degreeOfCurve,'blue','gray',90,10,20,20,15,pivotPoint,15,pivotPoint],

			// bottom of the turn
			[2*arcLength-20,2*degreeOfCurve,'red','gray',40,60,20,20,0,pivotPoint,0,pivotPoint],

			// top of the turn
			[2*arcLength+20, -2*degreeOfCurve, 'gray','green', 10, 90,20,20,-15,pivotPoint,-15,pivotPoint],

			// into the fall line (specify 90/10 at the fall line)
			[arcLength, -1*degreeOfCurve, 'gray', 'blue', 10, 90,20,20,-15,pivotPoint,-15,pivotPoint],

			// out of the fall line
			[arcLength, -1*degreeOfCurve, 'gray', 'blue', 10, 90,20,20,-15,pivotPoint,-15,pivotPoint],

			// end of the turn
			[2*arcLength-20, -2*degreeOfCurve, 'gray', 'red', 60, 40,20,20,0,pivotPoint,0,pivotPoint],
		];
	}
}
