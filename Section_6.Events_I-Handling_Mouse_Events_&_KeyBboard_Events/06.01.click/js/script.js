$(function () {
    $("#btn-click").click(function(event) {
        console.log(event);
        alert("Ten years will be added to your life");
    });

    $(".red-box").click(function(){
        $(this).fadeTo(500, 0.5)
    })
    $(".red-box").click()
});
