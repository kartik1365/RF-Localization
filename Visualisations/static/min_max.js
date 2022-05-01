class Rectangle {

	constructor(xmin, ymin, xmax, ymax){
		this.xmin = xmin
		this.ymin = ymin
		this.xmax = xmax
		this.ymax = ymax
	}
	
	print_coords(){
		console.log("Left bottom is: ", this.xmin, ", ", this.ymin);
		console.log("Right top is: ", this.xmax, ", ", this.ymax);
	}

}

function euclidean_distance(x1, y1, x2, y2){

	return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

}

function get_intersection(r1, r2){

	x1 = Math.max(r1.xmin, r2.xmin);
	y1 = Math.max(r1.ymin, r2.ymin);
	x2 = Math.min(r1.xmax, r2.xmax);
	y2 = Math.min(r1.ymax, r2.ymax);

	console.assert(x1 <= x2);
	console.assert(y1 <= y2);

	let rect = new Rectangle(x1, y1, x2, y2);
	return rect;

}

function min_max_calc(myData){

	let centers = [[myData.x1, myData.y1], [myData.x2, myData.y2], [myData.x3, myData.y3]];
    let distances = [myData.d1, myData.d2, myData.d3];
	
	let rectangles = []

	let len1 = centers.length;
	let len2 = distances.length;
	console.assert(len1 == len2);
	for(let i = 0; i < len1; i++){
		center = centers[i];
		distance = distances[i];
		let r = new Rectangle(center[0] - distance, center[1] - distance, center[0] + distance, center[1] + distance)
		rectangles.push(r)

	}

	r1 = get_intersection(rectangles[0], rectangles[1]);
	r_final = get_intersection(rectangles[2], r1);
	r_final.print_coords();

}

function handleData(){

	let x = 0.5
	let y = 0.5
	console.log("My dummy point is ", x, ", ", y);

	let myData = {
		x1: 0,
		y1: 0,
		x2: 1,
		y2: 0,
		x3: 0.5,
		y3: 1
	}
	myData.d1 = euclidean_distance(myData.x1, myData.y1, x, y)
	myData.d2 = euclidean_distance(myData.x2, myData.y2, x, y)
	myData.d3 = euclidean_distance(myData.x3, myData.y3, x, y)
	console.log(myData)
	result_rect = min_max_calc(myData)

}

console.log("Javascript was called");
handleData()
