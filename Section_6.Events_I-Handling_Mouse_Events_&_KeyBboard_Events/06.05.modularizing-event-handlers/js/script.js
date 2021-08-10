$(function () {
    // function logEvent() {
    //     console.log("Mouse was clicked or key was pressed")
    // }

    // $("html").on("click keydown" logEvent);
    galleryImage = $(".gallery").find("img")
    var images = [
        "images/laptop-mobile_small.jpg",
        "images/laptop-on-table_small.jpg",
        "images/people-office-group-team_small.jpg",
    ];

    var i = 0;

    galleryImage.on("click", switchImage);

    function switchImage() {
        i= (i + 1) % images.length;
        $(galleryImage).fadeOut(function() {
            $(galleryImage).attr("src", images[i]).fadeIn();
        });
    }
});

