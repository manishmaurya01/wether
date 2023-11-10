let data; // Declare data variable at a higher scope

const city = document.querySelector('.search input');
const add = document.querySelector('.full-add');
const temp = document.querySelector('.temp-num');
const detail = document.querySelector('.wether-detail');

fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lunawada?unitGroup=metric&key=BURMBLKEWA4YD8LSJBM3XAL6Z&contentType=json')
  .then(response => response.json())
  .then((responseData) => {
    data = responseData; // Store the data at a higher scope
    loaddata(data);
    console.log(data);
  });

city.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    load();
  }
});


function load() {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.value}?unitGroup=metric&key=BURMBLKEWA4YD8LSJBM3XAL6Z&contentType=json`)
    .then(response => response.json())
    .then((responseData) => {
      data = responseData; // Update the data variable with the new data
      loaddata(data);
      console.log(data);
    });
}

function loaddata(data) {
  if (data.currentConditions.cloudcover < 10) {
    document.querySelector('.temp-icon img').src = "clear.png";
  } else {
    document.querySelector('.temp-icon img').src = "some.png";
  }
  add.innerHTML = data.resolvedAddress;
  let con = document.querySelector('.other-con-wrapper');
  con.innerHTML = (`<p class="conditions">condition: ${data.currentConditions.conditions}</p>
        <p class="humidity">humidity: ${data.currentConditions.humidity}</p>
        <p class="visibility">visibility: ${data.currentConditions.visibility}</p>
        <p class="snow">snow: ${data.currentConditions.snow}</p>
        <p class="sunrise:">sunrise: ${data.currentConditions.sunrise}</p>
        <p class="sunset">sunset: ${data.currentConditions.sunset}</p>
        <p class="cloudcover">cloudcover: ${data.currentConditions.cloudcover}</p>
        <p class="windspeed">windspeed: ${data.currentConditions.windspeed}</p>
       `);

  detail.innerHTML = data.description;
  temp.innerHTML = data.currentConditions.temp + "&#8451;";
  days(data);
}


function days(data) {
  let day = document.querySelector('.days');
  day.innerHTML = '';

  for (let i = 0; i < data.days.length; i++) {
    let datetime = data.days[i].datetime;
    let temp = data.days[i].temp;
    let cloudcover = data.days[i].cloudcover;

    let box = document.createElement('section');
    box.classList.add('days-box');
    box.classList.add(`db${[i + 1]}`);

    let datetimeDiv = document.createElement('div');
    datetimeDiv.classList.add('day-num');
    datetimeDiv.textContent = datetime;

    let tempDiv = document.createElement('div');
    tempDiv.classList.add('day-temp');
    tempDiv.innerHTML = temp + '&#8451;';

    box.appendChild(datetimeDiv);
    box.appendChild(tempDiv);

    if (cloudcover < 10) {
      tempDiv.classList.add('d1');
    } else {
      tempDiv.classList.add('d2');
    }

    day.appendChild(box);

    // Add an event listener to each box to open the popup
    box.addEventListener('click', () => {
      popup(i);
    });
  }
}

function popup(index) {
  let selectedDay = data.days[index];

  if (document.querySelector('.popup').style.display === 'none' || document.querySelector('.popup').style.display === '') {
    document.querySelector('.popup').style.display = 'block';
    show(selectedDay);
  } else {
    document.querySelector('.popup').style.display = 'none';
  }
}

function show(selectedDay) {
  let dy = document.querySelector('.info');
  document.querySelector('.date-time h1').innerHTML = selectedDay.datetime

  dy.innerHTML = `
    <div class="left-info">
   
    <p class="condition p1">condition: ${selectedDay.conditions}</p>
      <p class="humidity p2">humidity: ${selectedDay.humidity}</p>
      <p class="visibility p3">visibility: ${selectedDay.visibility}</p>
      <p class="snow p4">snow: ${selectedDay.snow}</p>
      <p class="sunrise p5">sunrise: ${selectedDay.sunrise}</p>
      <p class="sunset p6">sunset: ${selectedDay.sunset}</p>
      <p class="cloudcover p7">cloudcover: ${selectedDay.cloudcover}</p>
      <p class="windspeed p8">windspeed: ${selectedDay.windspeed}</p>
      <p class="temp p1">temp: ${selectedDay.temp + "&#8451;"}</p>
      </div>
    <div class="right-info">
      <p class="description p1">description: ${selectedDay.description}</p>
      <p class="solarenergy p1">solarenergy: ${selectedDay.solarenergy}</p>
      <p class="tempmin p1">min-temprature: ${selectedDay.tempmin}</p>
      <p class="max-temprature p1">winddir: ${selectedDay.winddir}</p>
      <p class="max-temprature p1">solarenergy: ${selectedDay.solarenergy}</p>
      </div>
      `
}

function reset() {
  document.querySelector('.popup').style.display = "none"
}




