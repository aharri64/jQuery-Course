# Section 6: Events I ‒ Handling Mouse Events & Keyboard Events

## What are Events and Event Handlers?

## Adding Click Handlers

```js
$(function () {
  // Click handler can be attached by passing a callback function to the click()
  // function. Whatever code you write into the callback function is then
  // executed whenever the user clicks the element.
  // You can add a parameter to the callback to retrieve additional info about
  // the event. Accordingly, we call the parameter "event".
  $("#btn-click").click(function (event) {
    console.log(event);
    alert("Thanks for clicking me!");
  });

  // As always in jQuery, inside the callback, you can refer to the element
  // as $(this).
  $(".red-box").click(function () {
    var currentOpacity = $(this).css("opacity");
    $(this).fadeTo(500, currentOpacity - 0.2);
  });

  // You can even simulate click events on the element by calling click()
  // without any arguments.
  $(".red-box").click();
});
```

## Adding Hover Handlers

```js
$(function () {
  // Hover handlers are defined the same way as click handlers but using hover().
  // Hover events fire as soon as the cursor enters *or* leaves the element.
  $("#button").hover(function (event) {
    console.log(event);
    alert("You hovered me!");
  });

  // And you can again refer to the element as $(this) from within the callback.
  $(".green-box").hover(function () {
    $(this).text("Hovered!");
  });
});
```

## AddingMouseEnter & MouseLeave Handlers

```js
// While hover() with one callback function triggers both when entering and
// leaving the element with the cursor, mouseenter() and mouseleave() allow
// you to attach different event handlers for both.
$(".blue-box").mouseenter(function () {
  $(this).stop().fadeTo(500, 0.5);
});

$(".blue-box").mouseleave(function () {
  $(this).stop().fadeTo(500, 1);
});

// However, you can achieve the same with hover() as well. For this, you must
// pass in two callback functions: first the one for mouseenter, then the one
// for mouseleave.
// So the following does the same as  the above, but for the red box:
$(".red-box").hover(
  function () {
    $(this).stop().fadeTo(500, 0.5);
  },
  function () {
    $(this).stop().fadeTo(500, 1);
  }
);
```

## Adding the Same Handler for Multiple Events

```js
// You can attach the same handler (callback function) for multiple events
// using jQuery's on() function.
// For instance, the following logs to the console whenever you click anywhere
// on the page or press any key while the page/browser is focused.
$("html").on("click keydown", function () {
  console.log("Mouse was clicked or key was pressed.");
});

// Let's use this to add a gallery that switches to the next image on click.
var images = [
  "images/laptop-mobile_small.jpg",
  "images/laptop-on-table_small.jpg",
  "images/people-office-group-team_small.jpg",
];

// The following is the same as in the image slideshow code, except we now
// use a click event instead of setTimeout().
var i = 0;
$(".gallery")
  .find("img")
  .on("click", function () {
    i = (i + 1) % images.length;
    $(this).fadeOut(function () {
      $(this).attr("src", images[i]).fadeIn();
    });
  });
```

## Modularizing Event Handlers (No More Inline Functions)

```js
$(function () {
  // You can modularize your code into smaller functions by defining the
  // callback function explicitly instead of passing it in.

  // Directly passing in callback as before. We call this callback an *anonymous
  // function* because it doesn't have a name.
  $("html").on("click keydown", function () {
    console.log("Mouse was clicked or key was pressed.");
  });

  // Using named function as a callback (this function is defined at the end of
  // this file).
  $("html").on("click keydown", logEvent);

  // Let's use this to add a gallery that switches to the next image on click.
  var images = [
    "images/laptop-mobile_small.jpg",
    "images/laptop-on-table_small.jpg",
    "images/people-office-group-team_small.jpg",
  ];

  // For this function, it makes more sense to modularize it because the
  // callback is more complex.
  // To do this, we store the gallery image in a variable so that we can use it
  // in the switchToNextImage() function instead of $(this). Using $(this)
  // would still work but would make the function harder to read and understand.
  var i = 0;
  var galleryImage = $(".gallery").find("img");
  galleryImage.on("click", switchToNextImage);

  // In contrast to logEvent(), this is a nested function (it's nested into our
  // main jQuery function). This way, we can access galleryImage.
  function switchToNextImage() {
    i = (i + 1) % images.length;
    galleryImage.fadeOut(function () {
      galleryImage.attr("src", images[i]).fadeIn();
    });
  }
});

// Normal, named function
function logEvent() {
  console.log("Mouse was clicked or key was pressed.");
}
```

## Delegated Events

```js
$(function () {
  // The event handlers you've used so far are only attached to those elements
  // that exist at the time the code is executed. Thus, they won't work for
  // dynamically attached elements:
  $("p").click(function () {
    $(this).slideUp();
  });
  $("#list").before("<p>This is a dynamically added paragraph</p>");

  // To solve this, you can use delegated events. Here, you attach the handler
  // to a parent element that will always exist on the page. When the event
  // comes in, the parent then delegates the event to all defined children.
  // For this, you must use the on() function, and pass in which children should
  // handle the event. For instance, all <li> tags inside #content:
  $("#content").on("click", "li li", function () {
    $(this).slideUp();
  });

  $("#list ul").append("<li>Dynamically added new item!</li>");
});
```

## Passing Additional Data to Events

```js
$(function () {
  // For all the event handlers you've learned, you can pass in an additional
  // first argument to attach extra data to the event object. This extra data
  // is passed as a JavaScript object, which is encompassed by curly braces:
  $("#button").click(
    {
      user: "Peter",
      domain: "http://petersommerhoff.com",
    },
    function (event) {
      console.log(event.data); // event.data carries the extra data: user and domain

      // Here, we call our function greetUser() and pass in the event data as
      // its argument.
      greetUser(event.data);
    }
  );

  // The function greetUser() accepts one parameter with user data (this will
  // be event.data) so that we can access it inside the function.
  function greetUser(userdata) {
    // Uses the user from the event data, or "Anonymous" if none is defined.
    username = userdata.user || "Anonymous";
    domain = userdata.domain || "example.com";

    alert("Welcome back " + username + " from " + domain + "!");
  }
});
```

## Coding Activity: Creating an Image Gallery with Lightbox Preview

```js
$(function () {
  // These are now multiple images.
  var galleryItems = $(".gallery").find("img");

  // Normally, you would do this in CSS.
  galleryItems.css("width", "30%").css("opacity", "0.7");

  // Fade images in/out when hovering/leaving.
  galleryItems.mouseenter(function () {
    $(this).stop().fadeTo(500, 1);
  });

  galleryItems.mouseleave(function () {
    $(this).stop().fadeTo(500, 0.7);
  });

  // Preview image in lightbox when clicked.
  galleryItems.click(function () {
    // Read image src of clicked image.
    var source = $(this).attr("src");

    // Generate new <img> tag to add to the lightbox.
    var newImage = $("<img>").attr("src", source).css("width", "100%");

    // Prepare and show lightbox preview.
    $(".lightbox").empty().append(newImage).fadeIn(1000);
  });

  // Exit lightbox preview when clicking it anywhere.
  $(".lightbox").click(function () {
    $(this).stop().fadeOut();
  });
});
```

## Handling KeyDown & KeyUp Events

```js
$(function () {
  // To handle key presses, use keydown().
  // Usually, you'll attach this to the <html> tag so that the event is handled
  // whenever a key is pressed on the page.
  $("html").keydown(function (event) {
    // You normally want to use the event argument here to do something based
    // on which key was pressed. This information is stored in event.which.
    console.log(event.which);
  });

  // Looking at the log of event.which, we can see that the arrow right key
  // corresponds to 39. So let's store this info to make the code readable:
  var ARROW_RIGHT = 39;

  // Now let's move the blue box when the user presses the arrow right key.
  $("html").keydown(function (event) {
    if (event.which === ARROW_RIGHT) {
      $(".blue-box").stop().animate(
        {
          marginLeft: "+=10px",
        },
        50
      );
    }
  });
});
```
