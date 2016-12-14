$(function () {

    getData();


});

function getData() {
    $.ajax({
        url: "/final-project/javascript/about.json",
        success: function (data) {
            console.log(data);
            $("#about").html(data['About']);
            $("#welcome").html(data['About']['Welcome']);

        
        }
    });
}

function useData(data) {

    console.log(data);

    $("welcome").html(data['About']['Welcome']);

};
