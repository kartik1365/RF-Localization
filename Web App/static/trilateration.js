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
    let centers = [[myData.x1, myData.y1], [myData.x2, myData.y2], [myData.x3, myData.y3]];
    let distances = [myData.d1, myData.d2, myData.d3];

    //Now we need to find the intersection point of all of the 3 circles 
    let intersection_points = [];

    //We will first find the intersection points of the first 2 circles 
    var theta = 0;
    while(theta < 2*Math.PI) 
    {
        x = centers[0][0] + distances[0] * Math.cos(theta)
        y = centers[0][1] + distances[0] * Math.sin(theta)
        if (point_lies_on_circle(centers[1], distances[1], [x, y]))
            intersection_points.push([x, y])
        
        theta += 2*Math.PI/10000;
    }
    var ans;
    //Now we need to check if any of the intersection_points lie on the 3rd circle 
    for(let i = 0; i < intersection_points.length; i++)
    {
        if(point_lies_on_circle(centers[2], distances[2], intersection_points[i]))
            ans = intersection_points[i];
    }

    return ans;
}

export {trilateration, getEucledianDistance, point_lies_on_circle};