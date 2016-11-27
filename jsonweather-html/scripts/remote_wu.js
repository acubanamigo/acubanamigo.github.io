// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
    url: "https://api.wunderground.com/api/2e44794c0c8e3b62/geolookup/conditions/q/" + lat + "," + long + ".json", 
        dataType: "jsonp",
        success: function (data)
        {
            
                var location = data.location.city + ', ' + data.location.state;
            
                // Rounding the temp to the nearest integer
                var temp = Math.round(data.current_observation.temp_f);
            
                // Summar of the current conditions
                var summary = data.current_observation.weather;
                var zipCode = data['location']['zip'];
                var feelsLike = data.current_observation.feelslike_f;
                var windDir = data.current_observation.wind_dir;
                $("#cityDisplay").text(location);
                $("title").text(location + " |  Weather Home");
                $("#currentTemp").text(temp + "°F");
                $("#summary").text(summary);
                $("#add1").text("Feels Like: " + feelsLike + "°F");
                $("#add2").text("Wind Direction: " + windDir);
                $("#add3").text("Zip Code: " + zipCode);
             
                $("#cover").fadeOut(250);
        
        }
          });

         } 

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
