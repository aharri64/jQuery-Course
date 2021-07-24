$(function () {
    // text(), html()
    var firstParagraph = $("p:first");
    console.log(firstParagraph.text());
    console.log(firstParagraph.html());

    // firstParagraph.text("<string>Hello</strong> World");
    // firstParagraph.html("<strong>Hello</strong> World");

    firstParagraph.html(firstParagraph.html() + " added on the end")

});
