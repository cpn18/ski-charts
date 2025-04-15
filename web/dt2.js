/*
 * Ski Turn Curve Generator V2  (c)2023 Jonathan Miner
 *  https://github.com/cpn18/ski-charts
 */

// https://stackoverflow.com/questions/14521108/dynamically-load-js-inside-js
var loadJS = function(url, implementationCode, location) {
	//url is URL of external file, implementationCode is the code
	//to be called from the file, location is the location to 
	//insert the <script> element

	var scriptTag = document.createElement('script');

	scriptTag.src = url;
	scriptTag.onload = implementationCode;
	scriptTag.onreadystatechange = implementationCode;

	location.appendChild(scriptTag);

	scriptTag.onerror = function() {
		alert("Error loading " + this.src);
	}
};

function handle_click()
{
	if (! document.getElementById('overlay').checked)
	{
		handle_clear();
	}
	var filename = document.getElementById('file').value;
	
	myTurns = null
	loadJS(filename, plot, document.body);
}

function handle_clear()
{
	canvas = document.querySelector('#canvas');
	ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// https://www.javascripttutorial.net/web-apis/javascript-draw-line/
function draw_line(coords, length, bearing, color, width)
{
	bearing *= Math.PI / 180.0;
	dy = length * Math.cos(bearing);
	dx = length * Math.sin(bearing);
	end = [coords[0] + dx, coords[1] + dy];
	if (width > 0)
	{
		const canvas = document.querySelector('#canvas');
		const ctx = canvas.getContext('2d');
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(coords[0], coords[1]);
		ctx.lineTo(end[0], end[1]);
		ctx.stroke();
	}
	return end;
}

function draw_steer(coord, heading, angle, pivot)
{
	// draw angle of a steered ski
	if (Math.abs(angle) >= 1) {
		// front
		front_length = ski_length*pivot/100.0;
	   	draw_line(coord, front_length, heading+angle, ski_color, ski_width);
		// back
	   	draw_line(coord, ski_length-front_length, heading+angle-180, ski_color, ski_width);
	} else if (max_width == 0) {
	   	draw_line(coord, 1, heading+angle, ski_color, ski_width);
	   	draw_line(coord, 1, heading+angle-180, ski_color, ski_width);
	}
}

function draw_hips(coord, heading, angle) {
	if (document.getElementById('hipangle').checked) {
		draw_line(coord, 20, heading+angle+90, 'black', 1);
		draw_line(coord, 20, heading+angle-90, 'black', 1);
	}
}

function draw_track(cstart, cend, offset, bearing, color, width)
{
	// draw the ski track based on offset from centerline
	bearing *= Math.PI / 180.0;
	dy = offset * Math.cos(bearing);
	dx = offset * Math.sin(bearing);
	start = [cstart[0] + dx, cstart[1] + dy];
	end = [cend[0] + dx, cend[1] + dy];
	if (width > 0) {
		const canvas = document.querySelector('#canvas');
		const ctx = canvas.getContext('2d');
		ctx.strokeStyle = color;
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.moveTo(start[0], start[1]);
		ctx.lineTo(end[0], end[1]);
		ctx.stroke();
	}
	return end;
}

function flip(vector) {
	output = [
		vector[0], // length
		-vector[1], // heading

		vector[3], // colors
		vector[2],

		vector[5], // pressure
		vector[4],

		vector[7], // stance
		vector[6],

		-vector[10], // pivot
		vector[11],
		-vector[8],
		vector[9],

		-vector[12] // hip angle
	]
	return output
}

function scale(vector, length, arc) {
	return [
		vector[0] * length,
		vector[1] * arc,
		vector[2],
		vector[3],
		vector[4],
		vector[5],
		vector[6],
		vector[7],
		vector[8],
		vector[9],
		vector[10],
		vector[11],
		vector[12]
	]
}

function get_element(array, index, value) {
	if (array.length > index) {
		if (array[index] == undefined) {
			return value
		}
		return array[index]
	}
	return value
}

function get_number(array, index, value) {
	if (array.length > index) {
		if (array[index] == undefined || isNaN(array[index]) ) {
			return value
		}
		return array[index]
	}
	return value
}

function gradient(start_value, end_value, percent) {
	return start_value + percent*(end_value-start_value)
}

function plot() {
	myTurns = new turnClass()

	initial_position = myTurns.initial_position
	path = myTurns.getPath()
	max_width = myTurns.max_width
	center_width = myTurns.center_width
	center_color = myTurns.center_color
	ski_color = myTurns.ski_color
	ski_length = myTurns.ski_length
	ski_width = myTurns.ski_width
	ski_mod = myTurns.ski_mod

	if (! document.getElementById('centerline').checked) {
		center_width = 0;
	}

	if (! document.getElementById('pressure').checked) {
		max_width = 0;
	}

	// Initial Setting
	position = initial_position;
	total_line = 0;
	// How much to draw at once
	line_length = 1;

	// defaults
	heading = get_number(path[0], 1, 0)
	last_right_color = get_element(path[0],2,'black')
	last_left_color = get_element(path[0],3,'black')
	last_right_pressure = get_number(path[0],4,50)
	last_left_pressure = get_number(path[0],5,50)
	last_right_stance = get_number(path[0],6,20)
	last_left_stance = get_number(path[0],7,20)
	last_right_angle = get_number(path[0],8,0)
	last_right_pivot = get_number(path[0],9,55)
	last_left_angle = get_number(path[0],10,0)
	last_left_pivot = get_number(path[0],11,55)
	last_hip_angle = get_number(path[0],12,0)

	// arrays to save point data
	right_points = [];
	left_points = [];
	center_points = [];

	// Loop through the path
	for (const vector of path) {
		length = get_number(vector,0,0)
		degrees = get_number(vector,1,0)
		right_color = get_element(vector,2,last_right_color)
		left_color = get_element(vector,3,last_left_color)
		right_pressure = get_number(vector,4,last_right_pressure)
		left_pressure = get_number(vector,5,last_left_pressure)
		right_stance = get_number(vector,6,last_right_stance)
		left_stance = get_number(vector,7,last_left_stance)
		right_angle = get_number(vector,8,last_right_angle)
		right_pivot = get_number(vector,9,last_right_pivot)
		left_angle = get_number(vector,10,last_left_angle)
		left_pivot = get_number(vector,11,last_left_pivot)
		hip_angle = get_number(vector,12,last_hip_angle)

		for (i = 0; i < length; i += line_length) {
			// calculate intermediate positions
			percent = i/length
			this_right_pressure = gradient(last_right_pressure,right_pressure,percent)
			this_left_pressure = gradient(last_left_pressure,left_pressure,percent)
			this_right_stance = gradient(last_right_stance,right_stance,percent)
			this_left_stance = gradient(last_left_stance,left_stance,percent)

			// calculate heading change
			heading += line_length*(degrees/length);

			// new COM
			new_position = draw_line(position, line_length, heading, center_color, center_width);
			// new BOS
			right_pos = draw_track(position, new_position, this_right_stance, heading-90, right_color, max_width*this_right_pressure/100.0);
			left_pos = draw_track(position, new_position, this_left_stance, heading+90, left_color, max_width*this_left_pressure/100.0);

			// save some positions for later
			if (total_line % ski_mod == 0) {
				center_points.push([
					new_position,
					heading,
					gradient(last_hip_angle,hip_angle,percent)
				]);
				right_points.push([
					right_pos,
					heading,
					gradient(last_right_angle,right_angle,percent),
					gradient(last_right_pivot,right_pivot,percent)
				]);
				left_points.push([
					left_pos,
					heading,
					gradient(last_left_angle,left_angle,percent),
					gradient(last_left_pivot,left_pivot,percent)
				]);
			}

			position = new_position;
			total_line += line_length;
		}

		// Save current values
		last_right_color = right_color;
		last_left_color = left_color;
		last_right_pressure = right_pressure;
		last_left_pressure = left_pressure;
		last_right_stance = right_stance;
		last_left_stance = left_stance;
		last_right_angle = right_angle;
		last_right_pivot = right_pivot;
		last_left_angle = left_angle;
		last_left_pivot = left_pivot;
		last_hip_angle = hip_angle;
	}

	// It's later... draw the ski positions
	if (document.getElementById('skiangle').checked) {
		for (var i=0; i < right_points.length; i++) {
			draw_steer(right_points[i][0], right_points[i][1], right_points[i][2], right_points[i][3]);
			draw_steer(left_points[i][0], left_points[i][1], left_points[i][2], left_points[i][3]);
			draw_hips(center_points[i][0], center_points[i][1], center_points[i][2]);
		}
	}
}
