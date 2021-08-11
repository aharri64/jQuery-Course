// https://github.com/public-apis/public-apis
// https://pokeapi.co/
// https://pipedream.com/apps/swapi

$(function () {
    var pokeApiUrl = "https://pokeapi.co/api/v2/generation/1/";

    $.getJSON(pokeApiUrl).done(function(data) {
        console.log(data);
        $.each(data.pokemon_species, function(index, pokemon) {
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            var par = $("<p>").html("Pokemon species no. " + (index+1) + " is " + name);
            par.appendTo("#pokedex");
        });
    }).fail(function() {
        console.log("Request to Pokeapi failed.");
    }).always(function() {
        console.log("Pokemon is awesome!")
    });
});
