$(function () {
    $(".gallery").css("display", "none"); //hide()

    var redBox = $(".red-box");
    console.log(redBox.css("width"));
    console.log(redBox.width());

    redBox.css("background-color", "#AA7700")
    $("p").css("font-size", "18px");
    redBox.css("width", "+=20px");

    var properties = $("p").css(["font-size", "line-height", "color"]);
    console.log(properties)
    console.log(properties["font-size"])

    redBox.css("user-select", "none");
    redBox.css("user-select", function() {
        return "none";
    }); //you can also use a function
});
