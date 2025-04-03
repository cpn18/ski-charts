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

		var degreeOfCurve = 80 / 6;  // Complete turn = 6 segments
		var arcLength = 30;      // Each arc is 50 pixels
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
			[0,0,'black','black',50,50,20,20,0,pivotPoint,0,pivotPoint],

			// out of the fall line
			[3*arcLength, 3*degreeOfCurve,'black','gray',90,10,20,20,0,pivotPoint,0,pivotPoint],
			// bottom of the turn
			[3*arcLength, 3*degreeOfCurve,'red','gray',90,10,20,20,0,pivotPoint,0,pivotPoint],
			// traverse
			[3*arcLength, 0,'black','gray',50,50,20,20,0,pivotPoint,0,pivotPoint],

			// top of the turn
			[3*arcLength, -3*degreeOfCurve,'gray','black',50,50,20,20,0,pivotPoint,0,pivotPoint],
			[3*arcLength, -3*degreeOfCurve,'gray','black',50,50,20,20,0,pivotPoint,0,pivotPoint],
			// out of the fall line
			[3*arcLength, -3*degreeOfCurve,'grey','black',10,90,20,20,0,pivotPoint,0,pivotPoint],
			// bottom of the turn
			[3*arcLength, -3*degreeOfCurve,'grey','red',10,90,20,20,0,pivotPoint,0,pivotPoint],
			// traverse
			[3*arcLength, 0,'grey','black',50,50,20,20,0,pivotPoint,0,pivotPoint],
			// top of the turn
			[3*arcLength, 3*degreeOfCurve,'black','grey',50,50,20,20,0,pivotPoint,0,pivotPoint],
			[3*arcLength, 3*degreeOfCurve,'black','grey',50,50,20,20,0,pivotPoint,0,pivotPoint],
		];
	}
}
