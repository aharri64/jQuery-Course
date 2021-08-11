$(function () {
    // $.load()
    $("#code").load("js/script.js");

    $("#code").load("js/script.js", function(response, status) {
        if (status == "error") {
            alert("Could not find file")
        }
        console.log(response);
    });
});
