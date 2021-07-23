$(function () {
    // $("ul ul:first").append("<li>I'm gonna be the last sub item"</li>); 
    // $("<li>I'm gonna be the last item</li>").appendTo($("ul ul:first"))
    // $("ul ul").prepend("<li>I'm gonna be the first sub item</li>"); 
    // $("<li>I'm gonna be the first item</li>").prependTo("ul ul:first")
    // $("<h3>Amir Harrison</h3>").prependTo("#content");
    
    $(".blue-box").before("<div class='blue-box'>Blue Friend</div>");
    $(".red-box").after("<div class='red-box'>Another Red</div>");
    $(".green-box").after("<div class='green-box'>Another Green</div>");

    // $(".blue-box").before(function() {
        // return "<div class='blue-box'>Blue Box 2</div>";
    // });

    // $(".blue-box").before($(".red-box"));

    $("p").after($("#list"));
});

