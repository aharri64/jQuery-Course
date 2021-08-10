$(function () {
    // keypress() EVIL!
    $("html").keydown(function(event) {
        console.log(event.which)
    });

    var ARROW_RIGHT = 39;
    var ARROW_LEFT = 37;
    var ARROW_DOWN = 40;
    var ARROW_UP = 38;
    $("html").keydown(function(event) {
        if (event.which == ARROW_RIGHT) {
            $(".blue-box").stop().animate({
                marginLeft: "+=10px"
            }, 50);
        }
    });

    $("html").keydown(function(event) {
        if (event.which == ARROW_LEFT) {
            $(".blue-box").stop().animate({
                marginLeft: "-=10px"
            }, 50);
        }
    });

    $("html").keydown(function(event) {
        if (event.which == ARROW_UP) {
            $(".blue-box").stop().animate({
                marginTop: "-=10px"
            }, 50);
        }
    });

    $("html").keydown(function(event) {
        if (event.which == ARROW_DOWN) {
            $(".blue-box").stop().animate({
                marginTop: "+=10px"
            }, 50);
        }
    });
});
