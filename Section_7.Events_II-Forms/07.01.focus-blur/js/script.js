$(function () {
  var inputFields = $("input:text, input:password, textarea");
  // inputFields.focus(function() {
  //   $(this).css("box-shadow", "0 0 14px #666");
  // });
  
  // inputFields.blur(function() {
  //   $(this).css("box-shadow", "none");
  // });

  $("#name").blur(function () {
    var text = $(this).val();
    if (text.trim().length < 3) {
      $(this).css("box-shadow", "0 0 14px #911");
    } else {
      $(this).css("box-shadow", "0 0 14px #191");
    }
  });
});
