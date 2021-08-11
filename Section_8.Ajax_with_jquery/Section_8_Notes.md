# Section 8: Ajax with jQuery

## What is Ajax

This request is asynchronous
![What is Ajax](/whatisajax.png)

#### Kinds of requests for ajax

```js
// $.get(), $.post(), $.ajax(), $.getJSON()
```

## Fetching a Server File with jQuery

```js
$(function () {
  // You can load files from the server (or local file system in this case) with
  // jQuery using its load() function.
  $("#code").load("js/script.js");

  // You can also handle different responses, for instance if an error occurred.
  $("#code").load("idontexist.php", function (response, status) {
    console.log(response); // empty (normally contains the fetched contents)
    console.log(status); // error

    if (status === "error") {
      alert("Could not find idontexist.php");
    }
  });
});
```

## Retrieving Flickr Images Through the Flickr API (+Understanding JSON)

```js
$(function () {
  // There are many APIs online that you can fetch data from. Many of these
  // return data in JSON or XML format. Here, we use the Flickr API to retrieve
  // image data as JSON (JavaScript Object Notation).

  // First, store the URL of the API.
  // The ?jsoncallback parameter is necessary to avoid cross-origin errors in
  // modern browsers (you're not generally allowed to fetch data from remote sites).
  var flickrApiUrl =
    "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  // Next, we use jQuery's getJSON() function to access to API and retrieve data.
  $.getJSON(flickrApiUrl, {
    tags: "sun, beach",
    tagmode: "any",
    format: "json",
  })
    .done(function (data) {
      // Inside done(), you can work with the retrieved data.
      console.log(data);

      // Let's use jQuery $.each() function to create an <img> tag for each image .
      $.each(data.items, function (index, item) {
        console.log(item); // Helpful to see what data you can access

        // Create new image and add to gallery.
        $("<img>").attr("src", item.media.m).appendTo("#flickr");

        // Stop after 5 images.
        if (index == 4) {
          return false;
        }
      });
    })
    .fail(function (response) {
      // Inside fail(), you can handle error cases.
      console.log(response);
      alert("AJAX call failed.");
    });
});
```

## Coding Activity: Retrieving Pokémon Data from The PokéAPI (Or Star Wars)

```js
$(function () {
  // As another example of AJAX calls in jQuery, we access the PokéAPI to build
  // a Pokédex.

  var pokeapi = "https://pokeapi.co/api/v2/generation/1";

  $.getJSON(pokeapi)
    .done(function (data) {
      console.log(data); // Explore available data in the Developer Tools Console
      $.each(data.pokemon_species, function (index, pokemon) {
        var name = capitalize(pokemon.name);
        var paragraph = $("<p>").html(
          "Pokémon species no. " + (index + 1) + " is " + name
        );
        paragraph.appendTo("#pokedex");
      });
    })
    .fail(function () {
      // Handle error case
      console.log("Call to PokéAPI failed.");
    })
    .always(function () {
      // Will always be executed (in either case).
      console.log("Pokémon is awesome.");
    });
});

// Capitalizes a given string.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```

## Coding Activity: Improving the Pokédex

```js
$(function () {
  // Let's further improve the Pokédex while diving deeper into AJAX with jQuery.
  var pokeapi = "https://pokeapi.co/api/v2/generation/1";
  var pokemonByName = "https://pokeapi.co/api/v2/pokemon/";

  $.getJSON(pokeapi)
    .done(function (data) {
      console.log(data); // Explore available data in the Developer Tools Console
      $.each(data.pokemon_species, function (index, pokemon) {
        var name = capitalize(pokemon.name);

        // Add an additional link to show image of the Pokémon.
        var boldName = $("<strong>").text(name);
        var link = $("<a>")
          .attr("id", pokemon.name)
          .attr("href", "#")
          .append(boldName);

        var paragraph = $("<p>")
          .html("Pokémon species no. " + (index + 1) + " is ")
          .append(link);
        paragraph.appendTo("#pokedex");

        // Add handler to the link to fetch and display image.
        // The helper function showPokemon is defined below.
        link.click(function () {
          showPokemon(pokemon.name); // API needs the non-capitalized name
        });
      });
    })
    .fail(function () {
      // Handle error case
      console.log("Call to PokéAPI failed.");
    })
    .always(function () {
      // Will always be executed (in either case).
      console.log("Pokémon is awesome.");
    });

  // Only select this element once and store in variable.
  var detailsDiv = $("#pokemon-details");

  function showPokemon(name) {
    $.getJSON(pokemonByName + name)
      .done(function (details) {
        console.log(details); // To explore data in browser

        // Show selected Pokémon in the details div.
        var image = $("<img>").attr("src", details.sprites.front_default);
        detailsDiv
          .empty()
          .append("<h2>" + capitalize(name) + "</h2>")
          .append(image);
      })
      .fail(function (error) {
        console.log("Could not retrieve details for " + name);
      });
  }
});

// Capitalizes a given string.
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
```
