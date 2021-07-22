// $(function () {
//   $(".red-box").fadeTo(1000, 0, function () {
//     alert("The callback is finished")
//   })
$(function () {
  $(".red-box").fadeTo(1000, 0, function () {
    $(".green-box").fadeTo(1000, 0, function () {
      $(".blue-box").fadeTo(1000, 0);
    });
  });
  $("p").fadeOut(1000);
  $("p").delay(500).fadeIn(1000)
});
