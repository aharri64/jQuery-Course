$(function () {
    $("#form").submit(function(event) {
        var textarea = $("#message")
        if (textarea.val().trim() == '') {
            textarea.css("box-shadow", "0 0 24px #811");
            event.preventDefault();
        } else {
            //form will be submitted
        }
    });
});
