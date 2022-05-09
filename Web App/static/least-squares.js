// import { Chart } from './node_modules/chart.js/dist/chart.js';

function leastSquares(myData) {

    let x1 = myData.x1;
    let y1 = myData.y1;
    let x2 = myData.x2;
    let y2 = myData.y2;
    let x3 = myData.x3;
    let y3 = myData.y3;
    let d1 = myData.d1;
    let d2 = myData.d2;
    let d3 = myData.d3;

// console.log("Distances are ", d1, " ", d2, " ", d3)
    let A = [
    	[x3 - x1, y3 - y1],
    	[x3 - x2, y3 - y2]
    ]
    // console.log("A is ", A)
    A = math.multiply(A, 2)
    // console.log("A is ", A)
    let b = [
    	(d1*d1 - d3*d3) - (x1*x1 -	x3*x3) - (y1*y1 - y3*y3),
    	(d2*d2 - d3*d3) - (x2*x2 -	x3*x3) - (y2*y2 - y3*y3)
    ]
    
    // console.log("b is ", b)
    
    let At = math.transpose(A)
    let A_sq = math.multiply(At, A)
    // console.log("A square is, ",A_sq)
    let A_sq_inv = math.inv(A_sq)
    // console.log("A square inverse is, ",A_sq_inv)
    // console.log("Checking if inverse, ",math.multiply(A_sq, A_sq_inv))
    let temp = math.multiply(A_sq_inv, At)
    let t = math.multiply(temp, b)
    
    console.log(`Least Squares = ${t}`)
    return t;
    
}

export { leastSquares };

