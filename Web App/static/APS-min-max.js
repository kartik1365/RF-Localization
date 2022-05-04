var PLOT_HEIGHT = 500, PLOT_WIDTH = 500;

function plotAPSMinMax(centers, distances, ans) {

    console.log("apscenter ", centers, "apsdistance", distances, "apsanswer", ans)


    var c = document.getElementById("plotAPSMinMax");
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
}

function getEucledianDistance(pt1, pt2) {
    return Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
}

function areaPartitionStrategyMinMax(myData) {
    const centers = [[myData.x1, myData.y1], [myData.x2, myData.y2], [myData.x3, myData.y3]];
    const distances = [myData.d1, myData.d2, myData.d3];

    let P1 = [Math.max(centers[0][0] - distances[0], centers[1][0] - distances[1], centers[2][0] - distances[2]), Math.max(centers[0][1] - distances[0], centers[1][1] - distances[1], centers[2][1] - distances[2])];
    let P2 = [Math.max(centers[0][0] - distances[0], centers[1][0] - distances[1], centers[2][0] - distances[2]), Math.min(centers[0][1] + distances[0], centers[1][1] + distances[1], centers[2][1] + distances[2])];
    let P3 = [Math.min(centers[0][0] + distances[0], centers[1][0] + distances[1], centers[2][0] + distances[2]), Math.min(centers[0][1] + distances[0], centers[1][1] + distances[1], centers[2][1] + distances[2])];
    let P4 = [Math.min(centers[0][0] + distances[0], centers[1][0] + distances[1], centers[2][0] + distances[2]), Math.max(centers[0][1] - distances[0], centers[1][1] - distances[1], centers[2][1] - distances[2])];
    let P = [P1, P2, P3, P4];

    for (let itr_refine = 0; itr_refine < 10; itr_refine++) {

        let min_ind = -1, min_dis = 1000000;
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 3; i++) {
                if (min_dis > Math.abs(distances[i] - getEucledianDistance(centers[i], P[j]))) {
                    min_dis = Math.abs(distances[i] - getEucledianDistance(centers[i], P[j]));
                    min_ind = j;
                }
            }
        }

        let temp1, temp2, C = [(P[0][0] + P[1][0] + P[2][0] + P[3][0]) / 4, (P[0][1] + P[1][1] + P[2][1] + P[3][1]) / 4];
        if (min_ind == 0) {
            temp1 = [(P[0][0] + P[1][0]) / 2, (P[0][1] + P[1][1]) / 2];
            temp2 = [(P[0][0] + P[3][0]) / 2, (P[0][1] + P[3][1]) / 2];
            P2 = temp1;
            P3 = C;
            P4 = temp2;

        } else if (min_ind == 1) {
            temp1 = [(P[1][0] + P[0][0]) / 2, (P[1][1] + P[0][1]) / 2];
            temp2 = [(P[1][0] + P[2][0]) / 2, (P[1][1] + P[2][1]) / 2];
            P1 = temp1;
            P3 = temp2;
            P4 = C;
        }
        else if (min_ind == 2) {
            temp1 = [(P[2][0] + P[1][0]) / 2, (P[2][1] + P[1][1]) / 2];
            temp2 = [(P[2][0] + P[3][0]) / 2, (P[2][1] + P[3][1]) / 2];
            P1 = C;
            P2 = temp1;
            P4 = temp2;
        } else {
            temp1 = [(P[3][0] + P[0][0]) / 2, (P[3][1] + P[0][1]) / 2];
            temp2 = [(P[3][0] + P[2][0]) / 2, (P[3][1] + P[2][1]) / 2];
            P1 = temp1;
            P2 = C;
            P3 = temp2;
        }
        P = [P1, P2, P3, P4];
    }

    let v4, W4 = [], weighted_sum_x = 0, weighted_sum_y = 0, total_sum = 0, ans;

    for (let j = 0; j < 4; j++) {
        v4 = 0;
        for (let i = 0; i < 3; i++) {
            v4 += Math.abs(Math.pow(getEucledianDistance(P[j], centers[i]), 2) - Math.pow(distances[i], 2));
        }
        v4 = Math.max(0.000001, v4);
        W4.push(1 / v4);
    }
    console.log(W4);
    for (let j = 0; j < 4; j++) {
        weighted_sum_x += W4[j] * P[j][0];
        weighted_sum_y += W4[j] * P[j][1];
        total_sum += W4[j];
    }

    ans = [weighted_sum_x / total_sum, weighted_sum_y / total_sum];
    console.log(`APS-min-max = ${ans}`);
    plotAPSMinMax(centers, distances, ans);
    return ans;
}

export { areaPartitionStrategyMinMax, getEucledianDistance };