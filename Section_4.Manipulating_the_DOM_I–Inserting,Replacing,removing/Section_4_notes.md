# Section 4: Manipulating the DOM I – Inserting, Replacing and Removing Elements

## What is the DOM?

## Adding New Elements to the DOM

```js
$(function () {
  // 1) Appending elements to existing elements.
  // -> This adds elements as the last children of a given element

  // Append a new list item to the end of the first sub list
  $("ul ul:first").append("<li>New sub item</li>");

  // Other way to achieve the same effect
  $("<li>Another new sub item</li>").appendTo("ul ul:first");

  // 2) Prepending elements to existing elements.
  // -> This adds elements as the first children of a given element

  // Prepend a new list item to the start of the first sub list
  $("ul ul:first").prepend("<li>First sub item</li>");

  // Other way to achieve the same effect
  $("<li>Very first sub item</li>").prependTo("ul ul:first");

  // 3) Adding elements as siblings of existing elements

  // Add a new elements after an existing one (as next sibling)
  $(".red-box").after("<div class='red-box'>New Red</div>");

  // Add a new elements before an existing one (as previous sibling)
  $(".blue-box").before("<div class='blue-box'>New Blue</div>");

  // You can also use a callback function to construct more complex
  // elements to add to the DOM
  $(".green-box").after(function () {
    // Maybe more complex string of new element(s)
    return "<div class='green-box'>New Green</div>";
  });

  // 4) Add existing elements to other existing elements
  // -> This will move the added element, so the original vanishes

  // For instance, add the #list after the first paragraph (removes it from its
  // original position).
  // In case it's added to multiple elements, jQuery must clone the added element.
  $("p:first").after($("#list"));
});
```

## Replacing Elements and Content

```js
$(function () {
  // Replace each selected item with another one.
  // For instance, replace all <p> tags with another one.
  $("p:first").replaceWith("<p>I've been replaced.</p>");

  // Again, to construct more complex elements, you may want
  // to do that in a callback function:
  $("p:last").replaceWith(function () {
    return "<p>Complex new paragraph...</p>";
  });

  // Also, you can again replace an element with another existing
  // element which will remove it from its original position.
  $(".red-box").replaceWith($(".blue-box"));

  // You can also replace multiple items at the same time.
  $("li:first, li:last").replaceWith("<li>First or last list item</li>");
});
```

## Removing Elements and Content

```js
$(function () {
  // You can remove an existing element simply with remove().
  // For instance, the first main item:
  $("li:first").remove();

  // If you want to reuse/re-display the element later, you should
  // use detach(). This also keeps all attached event handlers alive.
  // First, this removes the element from the DOM:
  var detached = $("p:first").detach();
  // Next, this will re-attach the element to the DOM (at another position):
  $("#list").after(detached);

  // To remove all elements *inside* a given elements, you can use empty().
  // The element itself remains in the DOM, so in this case the <form>.
  $("form").empty();
});
```

## Manipulating Attributes and Properties

```js
$(function () {
  // 1) Attributes with attr()

  // To read the current value of an attribute, use attr() with only
  // one argument: the name of the attribute you want to read.
  var link = $("#link");
  // Retrieve the value of the href attribute of the <a> tag
  // This is logged into the console. To see it, press F12 in Firefox/Chrome
  // to open the Developer Tools and click on the Console tab.
  console.log(link.attr("href"));
  // Log the value of the title attribute
  console.log(link.attr("title"));

  // To set the value of an attribute, you call the attr() function with two
  // arguments: first, the name of the attribute you want to change, and second
  // the new value:
  link.attr("href", "http://petersommerhoff.com");

  // 2) Properties with prop()

  // To read the *current* value of a checkbox for instance, you must use the
  // prop() function:
  var radioButton = $("input[type=radio]:first");
  console.log(radioButton.prop("checked")); // false
  console.log(radioButton.attr("checked")); // undefined

  // 3) Values with val()
  // -> Read or set the value attribute of input elements

  // To retrieve the value of an input element, simply call val()
  var email = $("input[type=email]").val();
  console.log(email); // i@mine.me
  var number = $("input[type=range]").val();
  console.log(number); // 3

  // To set a new value, pass the new value as an argument to val():
  $("input[type=text]").val("Peter Sommerhoff");
  $("input[type=range]").val(9);

  // If you have multiple elements selected, using val() will implicitly
  // always call first() beforehand, so only change the first input element:
  var value = $("input").val();
  console.log(value); // Peter Sommerhoff
});
```

## Coding Activity: Creating an Image Slideshow

```js
$(function () {
  // Select the <img> inside the gallery to manipulate it later
  var galleryImage = $(".gallery").find("img").first();

  // Initialize an array of all images for the gallery
  var images = [
    "images/laptop-mobile_small.jpg",
    "images/laptop-on-table_small.jpg",
    "images/people-office-group-team_small.jpg",
  ];

  // Now, we want to cycle through all images we have and show one after the
  // other in our gallery. For this, we create a variable i: the index of the
  // image we want to currently show.
  var i = 0;

  // setInterval will call whatever code is inside the callback function every
  // 2 seconds. This way, we can change the shown image every 2 seconds.
  setInterval(function () {
    // First, we update the index i to the next image.
    // However, we cannot simply do i = i+1 because that would quickly result in
    // indexes i = 3, 4, 5 etc which are invalid for our array.
    // So we constrain the sequence to the range 0..2 by using modulo 3 (i % 3).
    i = (i + 1) % images.length; // i = 1, 2, 0, 1, 2, 0, ...

    // Now, we just have to change the src attribute of the <img> to the next
    // image we want to show.
    // To achieve a smooth transition, we'll actually first fadeOut the old,
    // then update the src attribute behind the scenes, and then fade it back in.
    galleryImage.fadeOut(function () {
      // Inside the callback, "this" refers to the galleryImage
      $(this).attr("src", images[i]);
      $(this).fadeIn();
    });

    // Log current image path for debugging
    console.log(galleryImage.attr("src"));
  }, 2000);
});
```
