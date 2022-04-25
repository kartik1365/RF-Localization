setInterval(myTimer, 1000);

function myTimer() 
{
    fetch('/getData')
    .then(response => response.json())
    .then(data => handleData(data))
}

function handleData(myData)
{
    if(myData.check === true)
    {
        document.getElementById().innerHTML = myData.d1;
        // getTrilateration(myData);
    }
    else 
    {
        document.getElementById().innerHTML = "Not enough values...Waiting...";
    }
}


