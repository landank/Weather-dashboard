let date = new Date().toLocaleDateString();
var dateEl = document.getElementById("date");
var inputEl = document.getElementById("searchInput");
var cityNameEl = document.getElementById("currentCityTitle");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var uvIndexEl = document.getElementById("uvIndex") ;

var historyList = JSON.parse(localStorage.getItem('history')) || [];

var cityCard = function(cityName, time, temp, wind, humidity, uv, icon) {
  var cityHeader = cityName + " (" + time + ")" ;
  temp = "Temp: " + temp + "F";
  wind = "Wind: " + wind + " MPH";
  humidity = "Humidity: " + humidity + " %";
  $("#cityHeader").text(cityHeader);
  $("#temp").text(temp);
  $("#wind").text(wind);
  $("#humidity").text(humidity);
  $("#uvIndex").text("UV Index: ");
  $("#uvNumber").text(Math.abs(uv));
  if (uv < 2) {
    $("#uvNumber").attr("class", "favorable");
  } else if (uv < 5) {
    $("#uvNumber").attr("class", "moderate");
  } else {
    $("#uvNumber").attr("class", "severe");
  }
  $("#weather-icon").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
}

var getWeatherData = function () {
  var city = inputEl.value;
  var unit = '&units=imperial'
  var apiKey = '&appid=cf67b2fd561f8fab4549afd45a981cd8'
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city + unit + apiKey
  )
    .then((response) => response.json())
    .then((data) => {
      var nameValue = data.name;
      var tempValue = data.main.temp;
      var windValue = data.wind.speed;
      var Humidity = data.main.humidity;
      // var descValue = data.weather[0].description;

      cityNameEl.innerText = nameValue + " " + date;
      tempEl.innerText = "Temp: " + tempValue + "°F";
      windEl.innerText = "Wind: " + windValue + "MPH";
      humidityEl.innerText = "Humidity: " + Humidity + "%";
      inputEl.value = "";

      // add to history
      var historyEl = document.getElementById("history");
      const pastSearch = document.createElement("button");
      pastSearch.innerText = data.name;
      pastSearch.classList.add("historyItem");
      historyEl.appendChild(pastSearch);

      historyList.push(data.name)
      localStorage.setItem('history', JSON.stringify(historyList));
      
      
      for(i=0; i < historyList.length; i++) {
        const pastSearches = document.createElement('button');
        pastSearches.innerText = [i];
        pastSearches.classList.add('history');
        historyEl.appendChild(pastSearches);

      }

      console.log(historyList)
    })


};
