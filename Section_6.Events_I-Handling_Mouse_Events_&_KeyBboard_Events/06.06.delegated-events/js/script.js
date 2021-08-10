$(function () {
    // $("p").click(function() {
    //     $(this).slideUp();
    // });
    // $("#content").append("<p>This is a dynamically added paragraph.</p>");

    // Delegated Events
    $("#content").on("click", "p", function() {
        $(this).slideUp();
    });
    $("#content").append("<p>This is a dynamically added paragraph.</p>");

    $("body").on("mouseenter", "li", function() {
        $(this).css("color", "pink");
    })
    $("body").on("mouseleave", "li", function() {
        $(this).css("color", "black");
    })
});

