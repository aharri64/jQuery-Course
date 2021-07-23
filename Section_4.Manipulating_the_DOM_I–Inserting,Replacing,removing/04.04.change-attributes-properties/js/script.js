$(function () {
    // attr(), prop(), val()
    // var specialLink = $('#special-link');
    // console.log(specialLink.attr("href")); 
    // console.log(specialLink.attr("title")); 

    // specialLink.attr("href", "http://amirharrison.com")

    // var checkbox = $("input:checkbox");
    // console.log(checkbox.prop("checked"));
    // console.log(checkbox.attr("checked"));

    var textInput = $("input:text");
    console.log(textInput.val());

    var rangeInput = $("input[type='range']");
    console.log(rangeInput.val());
});
