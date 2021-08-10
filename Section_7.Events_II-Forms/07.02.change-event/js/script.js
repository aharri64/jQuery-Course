$(function () {
    $("#checkbox").change(function() {
        var isChecked = $(this).is(":checked"); //  alternative = .prop("checked")
        if (isChecked) {
            $(this).add("label[for='checkbox']").css("box-shadow", "0 0 4px #181");
        } else {
            $(this).add("label[for='checkbox']").css("box-shadow", "0 0 4px #811");
        }
    });
    $("#selection").change(function () {
        var chosen = $(this).find(":selected").text();
        alert(chosen);
    });
});
