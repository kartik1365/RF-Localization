var PLOT_HEIGHT = 500, PLOT_WIDTH = 500;

function plotExtendedMinMax(centers, distances, ans) {
    var c = document.getElementById("plotExtendedMinMax");
    c.width = PLOT_WIDTH;
    c.height = PLOT_HEIGHT;

    var ctx = c.getContext("2d");
    ctx.transform(1, 0, 0, -1, c.width / 2, c.height / 2);

	//
	
	//
}

function getEucledianDistance(pt1, pt2) {
    return Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
}


function getManhattanDistance(pt1, pt2) {
    return Math.abs(pt1[0] - pt2[0]) + Math.abs(pt1[1] - pt2[1]);
}


function extendedMinMax(myData) {

    const centers = [[myData.x1, myData.y1], [myData.x2, myData.y2], [myData.x3, myData.y3]];
    const distances = [myData.d1, myData.d2, myData.d3];

    const P1 = [Math.max(centers[0][0] - distances[0], centers[1][0] - distances[1], centers[2][0] - distances[2]), Math.max(centers[0][1] - distances[0], centers[1][1] - distances[1], centers[2][1] - distances[2])];
    const P2 = [Math.max(centers[0][0] - distances[0], centers[1][0] - distances[1], centers[2][0] - distances[2]), Math.min(centers[0][1] + distances[0], centers[1][1] + distances[1], centers[2][1] + distances[2])];
    const P3 = [Math.min(centers[0][0] + distances[0], centers[1][0] + distances[1], centers[2][0] + distances[2]), Math.min(centers[0][1] + distances[0], centers[1][1] + distances[1], centers[2][1] + distances[2])];
    const P4 = [Math.min(centers[0][0] + distances[0], centers[1][0] + distances[1], centers[2][0] + distances[2]), Math.max(centers[0][1] - distances[0], centers[1][1] - distances[1], centers[2][1] - distances[2])];
    const P = [P1, P2, P3, P4]

    let v1, v2, v3, v4, v5, v6;
    let W1 = [], W2 = [], W3 = [], W4 = [], W5 = [], W6 = [];

    for (let j = 0; j < 4; j++) {
        v1 = 0; v2 = 0; v3 = 0; v4 = 0; v5 = 0; v6 = 0;
        for (let i = 0; i < 3; i++) {

            v1 += Math.abs(getEucledianDistance(P[j], centers[i]) - distances[i]);
            v2 += Math.pow((getEucledianDistance(P[j], centers[i]) - distances[i]), 2);
            v3 += Math.abs(getManhattanDistance(P[j], centers[i]) - distances[i]);
            v4 += Math.abs(Math.pow(getEucledianDistance(P[j], centers[i]), 2) - Math.pow(distances[i], 2));
            v5 += Math.pow(getManhattanDistance(P[j], centers[i]) - distances[i], 2);
            v6 += Math.abs(Math.pow(getManhattanDistance(P[j], centers[i]), 2) - Math.pow(distances[i], 2));
        }
        W1.push(1 / v1);
        W2.push(1 / v2);
        W3.push(1 / v3);
        W4.push(1 / v4);
        W5.push(1 / v5);
        W6.push(1 / v6);
    }

    let W = [W1, W2, W3, W4, W5, W6], ans = [];

    for (let a = 0; a < 6; a++) {
        let weighted_sum_x = 0, weighted_sum_y = 0, total_sum = 0;
        for (let j = 0; j < 4; j++) {
            weighted_sum_x += W[a][j] * P[j][0];
            weighted_sum_y += W[a][j] * P[j][1];
            total_sum += W[a][j];
        }
        ans.push([weighted_sum_x / total_sum, weighted_sum_y / total_sum]);
    }
    console.log(`E-min-max = ${ans}`);
    plotExtendedMinMax(centers, distances, ans);
    return ans;
}

export {extendedMinMax, getEucledianDistance, getManhattanDistance, plotExtendedMinMax};
