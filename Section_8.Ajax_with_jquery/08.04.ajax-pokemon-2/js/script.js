// https://github.com/public-apis/public-apis
// https://pokeapi.co/
// https://pipedream.com/apps/swapi

$(function () {
    var pokeApiUrl = "https://pokeapi.co/api/v2/generation/1/";
    var pokemonByName = "https://pokeapi.co/api/v2/pokemon/";

    $.getJSON(pokeApiUrl).done(function(data) {
        console.log(data);
        $.each(data.pokemon_species, function(index, pokemon) {
            var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
            var link = $("<a>").attr("id", pokemon.name).attr("href", "#").append($("<strong>").text(name));
            var par = $("<p>").html("Pokemon species no. " + (index+1) + " is ").append(link);
            
            link.click(function(event) {
                $.getJSON(pokemonByName + pokemon.name).done(function(details) {
                    console.log(details);
                    var pokemonDiv = $("#pokemon-details")
                    pokemonDiv.empty();
                    pokemonDiv.append("<h2>" + name + "</h2>");
                    pokemonDiv.append("<img src='" + details.sprites.front_default + "'>");
                    pokemonDiv.append("<img src='" + details.sprites.back_default + "'>");
                    pokemonDiv.append("<img src='" + details.sprites.front_shiny + "'>");
                    pokemonDiv.append("<img src='" + details.sprites.back_shiny + "'>");
                    
                });
                event.preventdefault();
            });
            
            par.appendTo("#pokedex");
        });
    }).fail(function() {
        console.log("Request to Pokeapi failed.");
    }).always(function() {
        console.log("Pokemon is awesome!")
    });
});
