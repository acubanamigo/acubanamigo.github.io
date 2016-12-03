var returned;

$('#query').keyup(function(){
  // All code will be inside of this block
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("http://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
    console.log(data);
    returned = data;

    // Begin building output
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="http://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON



  // Intercept the menu link clicks
  $("#searchResults").on("click", "a", function(evt) {
    evt.preventDefault();

    // With the text value get the needed value from the weather.json file
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    index = $(this).index("a");
    console.log(index);
    console.log(returned);
    getData(returned.RESULTS[index].lat, returned.RESULTS[index].lon);

}); // end keyup
});

function getData(lat, long) {
  $.ajax({
    url : 'https://api.wunderground.com/api/2e44794c0c8e3b62/geolookup/conditions/forecast/q/' + lat + ',' + long + '.json',
    dataType : "jsonp",
    success : function(data){
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp = Math.round(data.current_observation.temp_f);
      var high = Math.round(data.forecast.simpleforecast.forecastday[0].high.fahrenheit);
      var low = Math.round(data.forecast.simpleforecast.forecastday[0].low.fahrenheit);
      var summary = data.current_observation.weather;
      var feelsLike = data.current_observation.feelslike_f;
      var windspeed = data.current_observation.wind_mph;
      var visibility = data.current_observation.visibility_mi;
      $('#h1').text(location);
      $('title').text(location + ' | Weather Home');
      $('#currenttemp').text(temp + "°F");
      $('#high').text(high + "°F");
      $('#low').text(low + "°F");
      $('#summary').text(summary);
      $('#feelslike').text("Feels Like: " + feelsLike + "°F");
      $('#windspeed').text("Windspeed: " + windspeed + " mph");
      $('#visibility').text("Visibility: " + visibility + " mi");
    }
  });
}

// A function for changing a string to TitleCase
function toTitleCase(str) {
  return str.replace(/\w+/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                                            });
};

