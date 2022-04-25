setInterval(myTimer, 1000);

function myTimer() {
    fetch('/getData')
    .then(response => response.json())
    .then(data => document.getElementById("demo").innerHTML = 22222);
}