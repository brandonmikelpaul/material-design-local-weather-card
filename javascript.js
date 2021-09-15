/* Begin HTTP Request to FCC weather API */
function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
};
/* End HTTP Request */

/* Begin Geolocation Weather Function */
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    var startLat = startPos.coords.latitude;
    var startLon = startPos.coords.longitude;
    var weatherUrl = 'https://weather-proxy.freecodecamp.rocks/api/current?lat=' + startLat + '&lon=' + startLon;
    var weatherObj = JSON.parse(httpGet(weatherUrl));
    document.getElementById('location').innerHTML = `${weatherObj.name}, ${weatherObj.sys.country}`;
    document.getElementById('temperature-celsius').innerHTML = `${Math.round(weatherObj.main.temp_min)} - ${Math.round(weatherObj.main.temp_max)} °C`;
    document.getElementById('temperature-fahrenheit').innerHTML = `${Math.round((weatherObj.main.temp_min)*(9/5)+32)} - ${Math.round((weatherObj.main.temp_max)*(9/5)+32)} °F`;
    document.getElementById('weather').innerHTML = weatherObj.weather[0].main;
    document.getElementById(weatherObj.weather[0].main.toLowerCase()).classList.toggle("hidden");
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
/* End Geolocation Weather Function */

/* Begin fahrenheit/celsius button functionality */

// Get the button, and when user clicks on it, execute corresponding function
document.getElementById("button-celsius").onclick = function() {
  showCelsius()
};
document.getElementById("button-fahrenheit").onclick = function() {
  showFahrenheit()
};

// showFahrenheit and showCelsius adds and removes the .hidden class to the list item, depending on which one should be shown.

// Celsius is shown by default.
function showCelsius() {
  document.getElementById("temperature-celsius").classList.remove("hidden");
  document.getElementById("temperature-fahrenheit").classList.add("hidden");
}

function showFahrenheit() {
  document.getElementById("temperature-fahrenheit").classList.remove("hidden");
  document.getElementById("temperature-celsius").classList.add("hidden");
}
/* End button functionality */
