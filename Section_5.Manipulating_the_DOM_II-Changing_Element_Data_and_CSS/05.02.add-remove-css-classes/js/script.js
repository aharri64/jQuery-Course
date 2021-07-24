$(function () {
    $("a").addClass("fancy-link");
    $("p:first").addClass("first large emphasize"); //multiple

    $("li li").addClass(function(index) {
        $(this).addClass("item-" + index);
    })

    $("div").addClass(function(index, currentClass) {
        if (currentClass === "dummy") {
            return "red-box";
        }
    })

    // $(".red-box").removeClass();
    // $(".red-box").removeClass().addClass("blue-box");
    $(".dummy").addClass("green-box");
});
