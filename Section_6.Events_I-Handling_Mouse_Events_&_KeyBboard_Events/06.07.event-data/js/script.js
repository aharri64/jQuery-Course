$(function () {
    $("#button").click({
        user: "Amir",
        domain: "amirharrison.com"
    }, function(event) {
        greetUser(event.data);
    })

    function greetUser(userdata) {
        username = userdata.user || "Anonymous";
        domain = userdata.domain || "example.com";

        alert("Welcome back " + username + " from " + domain + "!");
    }
});
