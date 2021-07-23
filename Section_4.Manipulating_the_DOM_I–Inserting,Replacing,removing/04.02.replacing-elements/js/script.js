$(function () {
//   $("li").replaceWith("<li>replaced</li>")
//   $("li").replaceWith(function() {
//     return "<li>Replaced with function</li>";
//   });
    var firstListItem = $("li:first");
    $("p").replaceWith(firstListItem);

    var greenBox = "<div class='green-box'>Green Box Replacement</div>"
    // $(".red-box, .blue-box").replaceWith(greenBox);

    $(greenBox).replaceAll(".red-box, .blue-box")
});
