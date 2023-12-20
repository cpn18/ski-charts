// This is Javascript

var s_p = 55;         // skier's pivot point

// Path is required!
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
	
	// define a starting point (note zero length)
	[0,0,'black','black',50,50,20,20,0,s_p,0,s_p],

	// straight run, even pressure
	[100,0,'black','black',50,50,20,20,0,s_p,0,s_p],

	// straight run, but skis end pivoted 45 degrees
	[100,0,'black','black',50,50,20,20,45,s_p,45,s_p],

	// short turn, pressure on outside ski, skier turns 45 degrees
	[50,45,'black','black',90,10,20,20,45,s_p,45,s_p],
];
