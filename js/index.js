var location_data = "http://ip-api.com/json";

function getLat(coords, commaInd) {
  var latitude = coords.substring(0, commaInd);
  return latitude;
}

function getLon(coords, commaInd) {
  var longitude = coords.substring(commaInd + 1);
  return longitude;
}

function getCommaPos(coords) {
  var commaPos = 0;
  while (coords[commaPos] !== ",") {
    commaPos++;
  }
  return commaPos;
}

$.getJSON(location_data, function(json) {
  var city = json.city;
  var country = json.country;
  var regionName = json.regionName;
  var lat = json.lat;
  var lon = json.lon;
  console.log(lat);
  console.log(lon);

  var api = "http://api.openweathermap.org/data/2.5/weather?"
  var appid = "appid=b25d08c92b96e29e064a0022300c81ec";
  lat = "lat=" + lat + "&";
  lon = "lon=" + lon + "&";
  weather_data = api + lat + lon + appid;

  $("#location").html(city + ", " + regionName + ", " + country);

  $.getJSON(weather_data, function(json) {
    var tempInCelsius = Math.round(json.main.temp - 273.15);
    var tempInFah = Math.round(tempInCelsius * 9 / 5 + 32);
    var weatherType = json.weather[0].main;
    var icon = "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";

    $("#temperature").html(tempInCelsius);
    $("#weather_type").html(weatherType);
    $("#weather_icon").attr("src", icon);
  });

});

$("#link").on("click", function() {
  var temp = $("#temperature").text();
  var unit = $("#link").text();
  if (unit === "°C") {
    temp = Math.round(temp * 9 / 5 + 32);
    $("#link").html("°F");
    $("#temperature").html(temp);
  } else {
    temp = Math.round((temp - 32) * 5 / 9);
    $("#link").html("°C");
    $("#temperature").html(temp);
  }
});