var PLOT_HEIGHT = 500, PLOT_WIDTH = 500;

class Rectangle {

	constructor(xmin, ymin, xmax, ymax) {
		this.xmin = xmin
		this.ymin = ymin
		this.xmax = xmax
		this.ymax = ymax
	}

	print_coords() {
		console.log("Left bottom is: ", this.xmin, ", ", this.ymin);
		console.log("Right top is: ", this.xmax, ", ", this.ymax);
	}

}

function plotMinMax(centers, distances, ans) {

	console.log("mmcenter ", centers, "mmdistance", distances, "mmanswer", ans)
	var c = document.getElementById("plotMinMax");
	c.width = PLOT_WIDTH;
	c.height = PLOT_HEIGHT;

	var ctx = c.getContext("2d");
	ctx.transform(1, 0, 0, -1, c.width / 2, c.height / 2);

	// anchor 1
	ctx.beginPath();
	// side = distances[]
	ctx.rect(100 * (centers[0][0] - distances[0]), 100 * (centers[0][1] - distances[0]), 200 * distances[0], 200 * distances[0]);
	// x , y , width , height 
	ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
	ctx.fill();
	ctx.stroke();

	// anchor 2
	ctx.beginPath();
	// side = distances[]
	ctx.rect(100 * (centers[1][0] - distances[1]), 100 * (centers[1][1] - distances[1]), 200 * distances[1], 200 * distances[1]);
	// x , y , width , height 
	ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
	ctx.fill();
	ctx.stroke();

	// anchor 3
	ctx.beginPath();
	// side = distances[]
	ctx.rect(100 * (centers[2][0] - distances[2]), 100 * (centers[2][1] - distances[2]), 200 * distances[2], 200 * distances[2]);
	// x , y , width , height 
	ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
	ctx.fill();
	ctx.stroke();

	//actual point 
	ctx.beginPath();
	ctx.fillStyle = 'blue'
	ctx.fillRect(100 * ans[0], 100 * ans[1], 5, 5);
	ctx.lineWidth = 10;
	ctx.strokeStyle = 'blue';
	ctx.stroke();
	//
}

function get_intersection(r1, r2) {

	let x1 = Math.max(r1.xmin, r2.xmin);
	let y1 = Math.max(r1.ymin, r2.ymin);
	let x2 = Math.min(r1.xmax, r2.xmax);
	let y2 = Math.min(r1.ymax, r2.ymax);

	console.assert(x1 <= x2);
	console.assert(y1 <= y2);

	let rect = new Rectangle(x1, y1, x2, y2);
	return rect;

}

function minMax(myData) {

	let centers = [[myData.x1, myData.y1], [myData.x2, myData.y2], [myData.x3, myData.y3]];
	let distances = [myData.d1, myData.d2, myData.d3];

	// let rectangles = []

	// let len1 = centers.length;
	// let len2 = distances.length;
	// console.assert(len1 == len2);
	// for (let i = 0; i < len1; i++) {
	// 	let center = centers[i];
	// 	let distance = distances[i];
	// 	let r = new Rectangle(center[0] - distance, center[1] - distance, center[0] + distance, center[1] + distance)
	// 	rectangles.push(r)
	// }
	
	// let r1 = get_intersection(rectangles[0], rectangles[1]);
	// let r_final = get_intersection(rectangles[2], r1);
	// //r_final.print_coords();

	// let ans = [0, 0]
	// ans[0] = (r_final.xmin + r_final.xmax / 2);
	// ans[1] = (r_final.ymin + r_final.ymax / 2);

	const P1 = [Math.max(centers[0][0] - distances[0], centers[1][0] - distances[1], centers[2][0] - distances[2]), Math.max(centers[0][1] - distances[0], centers[1][1] - distances[1], centers[2][1] - distances[2])];
    const P2 = [Math.max(centers[0][0] - distances[0], centers[1][0] - distances[1], centers[2][0] - distances[2]), Math.min(centers[0][1] + distances[0], centers[1][1] + distances[1], centers[2][1] + distances[2])];
    const P3 = [Math.min(centers[0][0] + distances[0], centers[1][0] + distances[1], centers[2][0] + distances[2]), Math.min(centers[0][1] + distances[0], centers[1][1] + distances[1], centers[2][1] + distances[2])];
    const P4 = [Math.min(centers[0][0] + distances[0], centers[1][0] + distances[1], centers[2][0] + distances[2]), Math.max(centers[0][1] - distances[0], centers[1][1] - distances[1], centers[2][1] - distances[2])];
    let P = [P1, P2, P3, P4];

	let x = 0, y = 0;
	for(let i = 0; i < 4; i++)
	{
		x += P[i][0];
		y += P[i][1]
	}

	let ans = [x/4, y/4];
	console.log(`Min-max = ${ans}`);
	plotMinMax(centers, distances, ans);
	return ans;
}

export { minMax, get_intersection, plotMinMax, Rectangle };

