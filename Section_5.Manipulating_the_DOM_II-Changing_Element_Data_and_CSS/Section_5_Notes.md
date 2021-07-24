# Section 5: Manipulating the DOM II – Changing Element Data and CSS

## Changing the CSS Properties of Elements

```js
$(function () {
  // To retrieve or set the value of a CSS property, you can use css().
  // This works similar to attr() and prop(): pass one argument to read
  // or two arguments to set a new value.

  // For instance, you can achieve the same as with hide() like this:
  $("p:first").css("display", "none");

  // Let's read the width property of .red-box:
  var redBox = $(".red-box");
  console.log(redBox.css("width")); // 80px
  // To get the width or height without unit, you can use width() and height():
  console.log(redBox.width()); // 80

  // You can change any CSS property in this simple way.
  redBox.css("background-color", "#AA5500");
  $("p").css("font-size", "20px");

  // You can even change the value of a property relative to its previous value
  redBox.css("width", "+=20px");
  redBox.css("height", "-=20px");

  // Also, you can retrieve multiple values by passing an array as the argument
  var properties = $("p").css(["font-size", "line-height", "color"]);
  // The result is an object containing all values
  console.log(properties);
  console.log(properties["font-size"]); // 20px

  // In line with jQuery's other function, you can also use a callback function
  // instead of passing in a new value directly.
  // This example also demonstrates that jQuery automatically uses the correct
  // vendor prefix for the CSS property depending on the browser, which is
  // -moz-user-select in this case.
  // You can see that in the Developer Tools (F12 in browser) in the Inspector tab.
  redBox.css("user-select", function () {
    // [some logic here...]
    return "none";
  });
});
```

## Adding or Removing CSS Classes

```js
$(function () {
  // Additional CSS classes can be added to an element via addClass()

  // For instance, add the class .fancy-link to all anchor tags.
  // Note that you *do not* add a dot in front of the class name here.
  $("a").addClass("fancy-link");

  // You can also add multiple classes at once.
  $("p:first").addClass("large emphasize");

  // To attach a class based on the index of the element in your selected
  // set of elements, you can use a callback function.
  $("li li").addClass(function (index) {
    // This adds classes .item-0, .item-1, ... to the list's sub-items.
    $(this).addClass("item-" + index);
  });

  // You can even use two parameters for the callback function, the index
  // and the current class of the element.
  $("div").addClass(function (index, currentClasses) {
    console.log(currentClasses); // String containing all classes

    // Add .red-box if the current classes contain "dummy"
    if (currentClasses.indexOf("dummy") !== -1) {
      return "red-box";
    }
  });

  // You can again chain these calls to switch one class for another.
  $(".green-box").removeClass("green-box").addClass("blue-box");

  // To quickly toggle one particular CSS class, use toggleClass().
  $("li li:first").toggleClass("emphasize");
});
```

## Changing the Data of an Element

```js
$(function () {
  // jQuery allows you to attach arbitrary data to any element, represented as
  // HTML attributes prefixed with "data-", e.g. "data-images".
  // Here, we'll attach data about all available images to the gallery itself.

  // Select the <img> inside the gallery to manipulate it later
  var gallery = $(".gallery");

  // Initialize an array of all images for the gallery
  var images = [
    "images/laptop-mobile_small.jpg",
    "images/laptop-on-table_small.jpg",
    "images/people-office-group-team_small.jpg",
  ];

  // To attach data, use the data() function and pass in two arguments: first,
  // the key for the data, and second the actual data/value.
  gallery.data("availableImages", images);
  // To retrieve the data, again use just one argument: the key.
  console.log(gallery.data("availableImages")); // Array[...]

  gallery.data("name", "The Amazing Gallery");
  console.log(gallery.data("name")); // The Amazing Gallery

  // Remove data just as easily using removeData().
  gallery.removeData("name");
  console.log(gallery.data("name")); // undefined

  // If you attach data directly in HTML via an attribute prefixed with "data-",
  // you can read that automatically from jQuery.
  var data = $("p:first").data("mydata");
  console.log(data); // Data coming from HTML attribute
});
```

## Retrieving and Changing the Content of an Element

```js
$(function () {
  // 1) Pure text content: text()

  // To read or change the textual content of an element, you use text().
  var p = $("p:first");
  console.log(p.text()); // Lorem ipsum...

  p.text("Now it's a very short paragraph.");
  console.log(p.text()); // Now it's a very short paragraph.

  // 2) HTML content: html()

  // In contrast to text(), html() allows you to retrieve the content of an
  // element including the HTML code of its content/children.
  var p2 = $("p").eq(1); // Second <p> tag
  console.log(p2.text()); // Lorem ipsum...
  console.log(p2.html()); // <span>Lorem</span> ipsum ...

  // Similarly, you can set the HTML content of an element with html()
  // whereas text() would escape the HTML code to make it show as text.
  $("li ul").eq(0).text("<li>Not an item</li>");
  $("li ul").eq(1).html("<li>Correct item</li>");

  // You can use this in a way that appends content to an element.
  p2.text(p2.text() + " This is an additional sentence.");
  p2.html(
    p2.html() + " <span class='emphasize'>And another emphasized one.</span>"
  );
});
```
