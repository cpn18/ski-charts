// This is Javascript
//
// This example illustrates how the ski arcs can be drawn
// on both sides of the COM
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
		var lengthOfArc = 50;      // Each arc is 50 pixels
		var skiPivot = 55;         // skier's pivot point

		// Path is required
		return [
			// starting point
			[0,0,'gray','gray',90,10,50,-10,15,skiPivot,15,skiPivot],

			// out of the fall line
			[lengthOfArc, degreeOfCurve,'gray','gray',90,10,45,-5,15,skiPivot,15,skiPivot],

			// bottom of the turn
			[2*lengthOfArc-20,2*degreeOfCurve,'gray','gray',40,60,20,20,0,skiPivot,0,skiPivot],

			// top of the turn	
			[2*lengthOfArc+20, -2*degreeOfCurve, 'gray','gray', 10, 90, -5,45,-15,skiPivot,-15,skiPivot],

			// into the fall line (specify 90/10 at the fall line)
			[lengthOfArc, -1*degreeOfCurve, 'gray', 'gray', 10, 90,-10,50,-15,skiPivot,-15,skiPivot],

			// out of the fall line
			[lengthOfArc, -1*degreeOfCurve, 'gray', 'gray', 10, 90, -5, 45,-15,skiPivot,-15,skiPivot],

			// end of the turn
			[2*lengthOfArc-20, -2*degreeOfCurve, 'gray', 'gray', 60, 40,20,20,0,skiPivot,0,skiPivot],
		];
	}
}
