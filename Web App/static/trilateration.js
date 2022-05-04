var PLOT_HEIGHT = 500, PLOT_WIDTH = 500;


function plotTrilateration(centers, distances, ans) {

    console.log("tricenter ", centers,"tridistance",  distances, "trianswer", ans )

    var c = document.getElementById("plotTrilateration");
    c.width = PLOT_WIDTH;
    c.height = PLOT_HEIGHT;

    var ctx = c.getContext("2d");
    ctx.transform(1, 0, 0, -1, c.width / 2, c.height / 2);

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';

    //Anchor-1
    ctx.beginPath();
    ctx.arc(100 * centers[0][0], 100 * centers[0][1], 100 * distances[0], 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fill();
    ctx.stroke();

    //Anchor-2
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.arc(100 * centers[1][0], 100 * centers[1][1], 100 * distances[1], 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //Anchor-3
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.arc(100 * centers[2][0], 100 * centers[2][1], 100 * distances[2], 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    //Estimated pose of object:
    ctx.beginPath();
    ctx.fillStyle = 'yellow'
    ctx.fillRect(100 * ans[0], 100 * ans[1], 5, 5);
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'yellow';
    ctx.stroke();
}

function getEucledianDistance(pt1, pt2) {
    return Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
}

function point_lies_on_circle(center, r, point) {
    let epsilon = 0.001;
    if (Math.abs(getEucledianDistance(point, center) - r) < epsilon)
        return true;
    return false
}

function trilateration(myData) {

    //First we define the data as:
    const centers = [[myData.x1, myData.y1], [myData.x2, myData.y2], [myData.x3, myData.y3]];
    const distances = [myData.d1, myData.d2, myData.d3];

    //Now we need to find the intersection point of all of the 3 circles 
    let intersection_points = [];

    //We will first find the intersection points of the first 2 circles 
    let theta = 0, x, y;
    while (theta < 2 * Math.PI) {
        x = centers[0][0] + distances[0] * Math.cos(theta)
        y = centers[0][1] + distances[0] * Math.sin(theta)
        if (point_lies_on_circle(centers[1], distances[1], [x, y]))
            intersection_points.push([x, y])

        theta += 2 * Math.PI / 10000;
    }
    var ans;
    //Now we need to check if any of the intersection_points lie on the 3rd circle 
    for (let i = 0; i < intersection_points.length; i++) {
        if (point_lies_on_circle(centers[2], distances[2], intersection_points[i]))
            ans = intersection_points[i];
    }

    console.log(`Trilateration = ${ans}`);
    plotTrilateration(centers, distances, ans);
    return ans;
}

export { trilateration, getEucledianDistance, point_lies_on_circle, plotTrilateration };