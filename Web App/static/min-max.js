setInterval(myTimer, 1000);

let temp;

function myTimer() {
    fetch('/getData')
    .then(response => response.json())
    .then(data => document.getElementById("demo") = 2);
}