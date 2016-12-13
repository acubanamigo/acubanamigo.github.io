$(function () {

    getData();


});

function getData() {
    $.ajax({
        url: "/final-project/javascript/contactus.json",
        success: function (data) {
            console.log(data);
            $("#contactus").html(data['Contact Us']);

            $("#name").html(data['Contact Us']['Name']);

            $("#city").html(data['Contact Us']['City']);

            $("#state").html(data['Contact Us']['State']);

            $("#email").html(data['Contact Us']['Email']);
        }
    });
}

function useData(data) {

    console.log(data);

    $("name").html(data['Contact Us']['Name']);

    $("#city").html(data['Contact Us']['City']);

    $("#state").html(data['Contact Us']['State']);

    $("email").html(data['Contact Us']['Email']);


};

    