let timeFrame = "weekly"
let data = {}

const populateDOM = () => {

    document.querySelectorAll('.time-frame').forEach(function(timeElement) {
        if (timeElement.getAttribute('id') === timeFrame + "-time") {
            timeElement.classList.add("time-selected");
        } else {
            timeElement.classList.remove("time-selected");
        }
    });

    data.forEach((item) => {
        document.querySelectorAll('.activity-hours').forEach(function(timeElement) {
            if (timeElement.dataset.category === item.title) {
                timeElement.innerHTML = item["timeframes"][timeFrame].current + "hrs"
            }
        });

        document.querySelectorAll('.time-period').forEach(function(timeElement) {
            if (timeElement.dataset.category === item.title) {
                if (timeFrame === "daily") {
                    timeElement.innerHTML = "Yesterday - " + item["timeframes"][timeFrame].current + "hrs"
                } else if (timeFrame === "weekly") {
                    timeElement.innerHTML = "Last Week - " + item["timeframes"][timeFrame].current + "hrs"
                } else if (timeFrame === "monthly") {
                    timeElement.innerHTML = "Last Month - " + item["timeframes"][timeFrame].current + "hrs"
                }
            }
        });
    });
}

fetch('data.json').then((response) => {
    if(!response.ok) return console.log('Oops! Something went wrong.');
  
    return response.json();
  }).then((receivedData) => {
    
    data = receivedData;

    populateDOM();

    const dailyButton = document.querySelector('#daily-time');

    dailyButton.addEventListener('click', () => {
        console.log("Daily Button Clicked");
        if (timeFrame !== "daily") {
            timeFrame = "daily";
            populateDOM();
        }
    })

    const weeklyButton = document.querySelector('#weekly-time');

    weeklyButton.addEventListener('click', () => {
        console.log("Weekly Button Clicked");
        if (timeFrame !== "weekly") {
            timeFrame = "weekly";
            populateDOM();
        }
    })

    const monthlyButton = document.querySelector('#monthly-time');

    monthlyButton.addEventListener('click', () => {
        console.log("Monthly Button Clicked");
        if (timeFrame !== "monthly") {
            timeFrame = "monthly";
            populateDOM();
        }
    })
});