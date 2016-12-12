function getData(){
$.ajax({
        url: "/javascript/contactus.json",
        success: function(data){ useData(data);}

    });
}

function useData(data){
    
    console.log(data);
    $("#city").html(data)['city']);
    $("#state").html(data)['state']);
    $("#email").html(data)['email']);
}


                
            

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
