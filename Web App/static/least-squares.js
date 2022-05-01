setInterval(myTimer, 1000);

function myTimer() {
    fetch('/getData')
        .then(response => response.json())
        .then(data => handleData(data))
}

function getLeastSquares(myData) {
    x1 = myData.x1;
    y1 = myData.y1;
    x2 = myData.x2;
    y2 = myData.y2;
    x3 = myData.x3;
    y3 = myData.y3;
    d1 = myData.d1;
    d2 = myData.d2;
    d3 = myData.d3;

    const A = [
        [2 * (x3 - x1), 2 * (y3 - y1)],
        [2 * (x3 - x2), 2 * (y3 - y2)]
    ];
    
    const b = [
        [Math.pow(d1 - d3, 2) - Math.pow(x1 - x3, 2) - Math.pow(y1 - y3, 2)],
        [Math.pow(d2 - d3, 2) - Math.pow(x2 - x3, 2) - Math.pow(y2 - y3, 2)]
    ];

    const At = math.transpose(A);
    const A_At = math.multiply(At, A);
    const A_At_inv = math.inv(A_At);

    const ans = math.multiply(A_At_inv, At, b);
    
    return ans;
}

function handleData(myData) {
    if (myData.check === true) {
        let pos_leastSquares = getLeastSquares(myData);
    }
    else {
        document.getElementById().innerHTML = "Not enough values...Waiting...";
    }
}


