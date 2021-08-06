$(function () {
    $("#button").hover(function(){
       alert("button was hovered"); 
    });

    $(".green-box").hover(function(){
        $(this).text("I was hovered")
    })
});
