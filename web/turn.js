// This is Javascript

var d_of_c = 90 / 6;  // Complete turn = 6 segments
var l_of_a = 50;      // Each arc is 50 pixels
var s_p = 55;         // skier's pivot point

// Path is required
path = [
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
	[0,0,'black','black',90,10,20,20,15,s_p,15,s_p],

	// out of the fall line
	[l_of_a, d_of_c,'blue','gray',90,10,20,20,15,s_p,15,s_p],

	// bottom of the turn
	[2*l_of_a-20,2*d_of_c,'red','gray',40,60,20,20,0,s_p,0,s_p],

	// top of the turn	
	[2*l_of_a+20, -2*d_of_c, 'gray','green', 10, 90,20,20,-15,s_p,-15,s_p],

	// into the fall line (specify 90/10 at the fall line)
	[l_of_a, -1*d_of_c, 'gray', 'blue', 10, 90,20,20,-15,s_p,-15,s_p],

	// out of the fall line
	[l_of_a, -1*d_of_c, 'gray', 'blue', 10, 90,20,20,-15,s_p,-15,s_p],

	// end of the turn
	[2*l_of_a-20, -2*d_of_c, 'gray', 'red', 60, 40,20,20,0,s_p,0,s_p],
];
