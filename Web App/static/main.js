import * as Trilateration from './trilateration.js';
// import * as MinMax from './min-max';
// import * as ExtendedMinMax from './E-min-max';
// import * as APSMinMax from './APS-min-max'
// import * as leastSquares from './least-squares';


setInterval(myTimer, 1000);

function myTimer() {
    fetch('/getData')
        .then(response => response.json())
        .then(data => handleData(data))
}

function handleData(myData) {
    if (myData.check === true) {

        let pos_trilateration = Trilateration.trilateration(myData);
        // let pos_minMax = MinMax.minMax(myData);
        // let pos_eMinMax = ExtendedMinMax.extendedMinMax(myData);
        // let pos_apsMinMax = APSMinMax.areaPartitionStrategyMinMax(myData);
        // let pos_leastSquares = leastSquares.leastSquares(myData); 
        console.log("hello");
        console.log(pos_trilateration);
        // document.getElementById("m1").innerHTML = pos_trilateration[0];
        //document.getElementById("m2").innerHTML = pos_trilateration[1];
        document.getElementById("m2").innerHTML = myData.d1;
        //document.getElementById("m2").innerHTML = pos_minMax;
        // document.getElementById("m3").innerHTML = pos_eMinMax;
        // document.getElementById("m4").innerHTML = pos_apsMinMax;
        // document.getElementById("m5").innerHTML = pos_leastSquares;
    }
    else {
        document.getElementById("m1").innerHTML = "Not enough values...Waiting...";
    }
}
