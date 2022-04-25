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
        plotData();
    }
    else 
    {
        //Display error
    }
}


