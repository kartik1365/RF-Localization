setInterval(myTimer, 1000);

function myTimer() {
    fetch('/getData')
        .then(response => response.json())
        .then(data => handleData(data))
}


function getEucledianDistance(pt1, pt2) {
    return Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
}

function getAPS_MinMax() {
    const centers = [[myData.x1, myData.y1], [myData.x2, myData.y2], [myData.x3, myData.y3]];
    const distances = [myData.d1, myData.d2, myData.d3];

    let P1 = [Math.max(x1 - d1, x2 - d2, x3 - d3), Math.max(y1 - d1, y2 - d2, y3 - d3)];
    let P2 = [Math.max(x1 - d1, x2 - d2, x3 - d3), Math.min(y1 + d1, y2 + d2, y3 + d3)];
    let P3 = [Math.min(x1 + d1, x2 + d2, x3 + d3), Math.min(y1 + d1, y2 + d2, y3 + d3)];
    let P4 = [Math.min(x1 + d1, x2 + d2, x3 + d3), Math.max(y1 - d1, y2 - d2, y3 - d3)];
    let W4, P = [P1, P2, P3, P4], weighted_sum_x = 0, weighted_sum_y = 0, total_sum = 0, C;

    for (let itr_refine = 0; itr_refine < 100; itr_refine++) {
        W4 = [];
        for (let j = 0; j < 4; j++) {
            v4 = 0;
            for (let i = 0; i < 3; i++) {
                v4 += Math.abs(Math.pow(getEucledianDistance(P[j], centers[i]), 2) - Math.pow(distances[i], 2));
            }
            W4.push(1 / v4);
        }

        weighted_sum_x = 0, weighted_sum_y = 0, total_sum = 0;

        for (let j = 0; j < 4; j++) {
            weighted_sum_x += W4[j] * P[j][0];
            weighted_sum_y += W4[j] * P[j][1];
            total_sum += W4[j];
        }
        C = [weighted_sum_x / total_sum, weighted_sum_y / total_sum];

        let min_ind = -1, min_dis = 1000000;
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 3; i++) {
                if (min_dis > Math.abs(distances[i] - getEucledianDistance(centers[i], P[j]))) {
                    min_dis = min(min_dis, Math.abs(distances[i] - getEucledianDistance(centers[i], P[j])));
                    min_ind = j;
                }
            }
        }

        let temp1, temp2;
        if (min_ind == 0) {
            temp1 = [(P[0][0] + P[1][0]) / 2, (P[0][1] + P[1][1]) / 2];
            temp2 = [(P[0][0] + P[3][0]) / 2, (P[0][1] + P[3][1]) / 2];
            P2 = temp1;
            P3 = C;
            P3 = temp2;

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
    }
    return C;
}

function handleData(myData) {
    if (myData.check === true) {
        let posAPSMinMax = getAPS_MinMax(myData);
    }
    else {
        document.getElementById().innerHTML = "Not enough values...Waiting...";
    }
}


