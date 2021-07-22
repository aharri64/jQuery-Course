# Section 2: Effects – Animations

## Fading In Elements (and Fading Them Out Again)

```js
$(function () {
  // Fade out element over 2000ms
  $(".red-box").fadeOut(2000);

  // Fade back in over 1000ms
  $(".red-box").fadeIn(1000);

  // Fade element to specific opacity (here 50%)
  $(".blue-box").fadeTo(1000, 0.5);

  // Note that the blue box animation starts right away, whereas the second
  // red box animation waits until the first animation finished.
  // This is because each element has its own animation queue which is
  // executed one after the other. So while the red box is still "busy" with
  // its first animation, the second animation waits in the queue.

  // Fade element in or out, depending on current status
  $(".blue-box").fadeToggle();
  $(".blue-box").fadeToggle();

  // Notice that fadeToggle fades back to the blue box's previous opacity,
  // thus only back to 50% opacity.
});
```

## A Pitfall With fadeIn/fadeOut vs. fadeTo

```js
$(function () {
  // Fade out element over 2000ms
  $(".red-box").fadeOut(2000);

  // Try to use fadeTo
  $(".red-box").fadeTo(1000, 1.0);

  // This doesn't work because fadeOut() will set display: none and fadeTo
  // doesn't modify the display property. Thus, it's not able to make it
  // reappear.

  // Back to original state
  $(".red-box").fadeIn(100);

  // To keep red box in the layout, use only fadeTo
  $(".red-box").fadeTo(2000, 0);

  // Can now make it re-appear in the way we tried above
  $(".red-box").fadeTo(1000, 1.0);
});
```

## Showing And Hiding Elements

```js
$(function () {
  // Hide an element
  $(".red-box").hide();

  // Show it again
  $(".red-box").show();

  // Just toggle visibility depending on whether element is shown or hidden
  $(".red-box").toggle(); // hides

  // Up until this point, you can't even see what happens in the browser
  // because it happens in a matter of milliseconds.

  // Use show/hide as animations (not very commonly used)
  $(".green-box").hide(1000);
  $(".green-box").show(1000);
});
```

## Sliding Elements Up And Down

```js
$(function () {
  // Slide element up to hide (over 2s)
  $(".blue-box").slideUp(2000);

  // Slide back down to show element
  $(".blue-box").slideDown(2000);

  // Toggle sliding up/down depending on current state
  $(".blue-box").slideToggle(1000);
  $(".blue-box").slideToggle(1000);
});
```

## Moving Elements

```js
$(function () {
  // Custom animation to move element by gradually increasing margin to 200px
  $(".green-box").animate({
    "margin-left": "+=200px",
  });

  // Reset
  $(".green-box").animate({
    "margin-left": "0px",
  });

  // Move element by gradually increasing margin BY 200px (using +=)
  // (no matter what it was before)
  $(".green-box").animate({
    "margin-left": "+=200px",
  });

  // Define animation duration (here 2s)
  // Default duration is 300ms
  $(".green-box").animate(
    {
      "margin-left": "-=200px",
    },
    2000
  );

  // Define animation progression function
  // Linear updates the margin-left linearly
  $(".green-box").animate(
    {
      "margin-left": "+=200px",
    },
    2000,
    "linear"
  );
});
```

## Get Creative: Custom Animations!

```js
$(function () {
  // Animate various CSS properties of the blue box
  $(".blue-box").animate(
    {
      marginLeft: "200px",
      opacity: "0",
      height: "50px",
      width: "50px",
      marginTop: "25px",
    },
    1000
  );

  // Animate font size of all paragraphs
  $("p").animate(
    {
      "font-size": "20px",
    },
    1000
  );
});
```

## Delaying and Chaining Animations

```js
$(function () {
  // Fade out red box immediately to 50% opacity (over 1 second)
  $(".red-box").fadeTo(1000, 0.5);

  // Wait 1 second, then fade out green box to 50% opacity (over 1 second)
  // This already using function chaining to call .fadeTo() directly on the
  // return value of .delay()
  $(".green-box").delay(1000).fadeTo(1000, 0.5);

  // Chaining even more function calls to create animation
  $(".blue-box")
    .delay(2000)
    .fadeTo(1000, 0.5)
    .fadeTo(1000, 1.0)
    .delay(1000)
    .fadeOut();
});
```

## Timing Animations Using Callback Functions

```js
$(function () {
  // Fade out red box over 100 second
  $(".red-box").fadeTo(1000, 0, function () {
    // This callback function is executed once outer animation finishes.
    // So the green box starts fading out once the red box finished fading out.
    $(".green-box").fadeTo(1000, 0, function () {
      // Similarly, any code inside this function will start executing only once
      // the green box finishes fading out (after 2 seconds)
      $(".blue-box").fadeTo(1000, 0);
    });
  });
});
```

## Coding Activity: Creating a Signup Lightbox!

```js
$(function () {
  // Fade in lightbox after half a second
  $(".lightbox").delay(500).fadeIn(1000);
});
```
