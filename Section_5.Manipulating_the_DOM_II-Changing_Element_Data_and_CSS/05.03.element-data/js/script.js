$(function () {
    var gallery = $(".gallery");

    var images = [
        "images/laptop-mobile_small.jpg",
        "images/laptop-on-table_small.jpg",
        "images/people-office-group-team_small.jpg",
    ];

    gallery.data("availableImages", images);
    console.log(gallery.data("availableImages"));
    gallery.data("name", "The Awesome Gallery");
    console.log(gallery.data());
    gallery.removeData("name");
    console.log(gallery.data("name"));

    var firstParagraph = $("p:first");
    console.log(firstParagraph.data("mydata"));
});
