var return;





//right under console.log(data); write v inside getJson which is in .keyUp()
//returned = data;


//onClick function
//var jsonCity
//console.log(jsonCIty); V

// in .on()

//index = $(this).index("a");
//getData(returned.RESULTS[index].lat, returned.RESULTS[index].lon)


$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); // test for JSON received
    // Begin building output
    returned = data;  
    
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="https://www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup

// Get weather data from wunderground.com
function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "http://api.wunderground.com/api/2e44794c0c8e3b62/geolookup/conditions/q/"
    + input + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
    }
  });
}


 // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }