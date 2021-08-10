# Section 7: Events II ‒ Forms

## The Focus & Blur Events

```js
$(function () {
  // Select inputs
  var inputFields = $("input:text, input:password, textarea");

  // Add grey box shadow when focusing any input using focus().
  inputFields.focus(function () {
    $(this).css("box-shadow", "0 0 4px #666");
  });

  // Conversely, remove box shadow from other inputs when unfocusing them
  // using blur().
  inputFields.blur(function () {
    $(this).css("box-shadow", "none");
  });

  // Add green or red background to name field, depending on whether the input
  // fulfills the validation criteria (here simply at least 3 characters)
  $("#name").blur(function () {
    var text = $(this).val();
    if (text.trim().length < 3) {
      $(this).css("box-shadow", "0 0 4px #811");
    } else {
      $(this).css("box-shadow", "0 0 4px #181");
    }
  });
});
```

## Using the Change Event

```js
$(function () {
  // The change event is used for input elements such as checkboxes, radio
  // button and select tags. They fire whenever the selection changes.

  // Add green indicator when checkbox is checked and red one otherwise.
  $("#checkbox").change(function () {
    var isChecked = $(this).is(":checked"); // or .prop("checked")

    if (isChecked) {
      // Add the checkbox' label to the selection and highlight both in green.
      $(this).add("label[for='checkbox']").css("box-shadow", "0 0 4px #181");
    } else {
      $(this).add("label[for='checkbox']").css("box-shadow", "0 0 4px #811");
    }
  });

  // Another common use case is to read the selected option from a <select>
  // element when a new option is selected.
  $("#selection").change(function () {
    var chosen = $(this).find(":selected").text();
    alert(chosen);
  });
});
```

## Handling the Submit Event

```js
$(function () {
  // You can intercept form submission via the submit event.
  // jQuery provides the submit() for this. A common use case is to perform
  // client-side form validation to avoid submitting a form with invalid data.

  // For instance, let's check if the user wrote a message in the textarea.
  $("#form").submit(function (event) {
    var textarea = $("#message");
    if (textarea.val().trim() === "") {
      // No message, add red highlighting to indicate error
      textarea.css("box-shadow", "0 0 4px #811");

      // The default event now would be to submit the form. The browser will do
      // this automatically when clicking a submit button. We prevent this using
      // preventDefault(). This way, the form will not be submitted.
      event.preventDefault();
    } else {
      // Nothing to do, let the form be submitted.
    }
  });
});
```

## Coding Activity: Complete Form Validation on Submit

```js
$(function () {
  // When the submit event comes in, we first validate all form fields
  // and abort submission if one of them is invalid. Also, we highlight all
  // invalid fields so that the user knows what to fix.
  $("#form").submit(function (event) {
    // First, read out all entered values.
    var name = $("#name").val();
    var password = $("#password").val();
    var message = $("#message").val();
    var checked = $("#checkbox").is(":checked");

    // Then we use our validation functions (defined below) to check each input.
    validateNameField(name, event);
    validatePasswordField(password, event);
    validateMessageField(message, event);
    validateCheckboxField(checked, event);
  });

  // In the following, we define helper functions that each validate
  // one of the inputs. These will be used further down by our validation
  // functions.

  function isValidName(name) {
    return name.trim().length >= 2;
  }

  function isValidPassword(password) {
    return password.length >= 6 && /.*[0-9].*/.test(password);
  }

  function isValidMessage(message) {
    return message.trim() !== "";
  }

  // Next, we define the actual validation functions which use the helpers from
  // above. These validation functions add a hint for the user for each invalid
  // input and prevent the form from submitting if the input is invalid.

  // First, show a hint if the name is not valid or remove the hint if it's
  // now valid.
  function validateNameField(name, event) {
    if (!isValidName(name)) {
      $("#name-feedback").text("Please enter at least two characters");
      event.preventDefault();
    } else {
      $("#name-feedback").text("");
    }
  }

  // Do the same for the other inputs.
  function validatePasswordField(password, event) {
    if (!isValidPassword(password)) {
      $("#password-feedback").text(
        "The password should have at least 6 characters and contain a number"
      );
      event.preventDefault();
    } else {
      $("#password-feedback").text("");
    }
  }

  function validateMessageField(message, event) {
    if (!isValidMessage(message)) {
      $("#message-feedback").text("Please enter a message.");
      event.preventDefault();
    } else {
      $("#message-feedback").text("");
    }
  }

  function validateCheckboxField(isChecked, event) {
    if (!isChecked) {
      $("#checkbox-feedback").text("Please agree to this.");
      event.preventDefault();
    } else {
      $("#checkbox-feedback").text("");
    }
  }
});
```

## Coding Activity: Fast Feedback Form

```js
$(function () {
  // When the submit event comes in, we first validate all form fields
  // and abort submission if one of them is invalid. Also, we highlight all
  // invalid fields so that the user knows what to fix.
  $("#form").submit(function (event) {
    // First, read out all entered values.
    var name = $("#name").val();
    var password = $("#password").val();
    var message = $("#message").val();
    var checked = $("#checkbox").is(":checked");

    // Then we use our validation functions (defined below) to check each input.
    validateNameField(name, event);
    validatePasswordField(password, event);
    validateMessageField(message, event);
    validateCheckboxField(checked, event);
  });

  // == NEW PART ==
  // In addition to the previous form validation code, we now provide faster
  // feedback to the user, namely when moving to the next input element.
  enableFastFeedback($("#form"));

  function enableFastFeedback(formElement) {
    var nameInput = formElement.find("#name");
    var passwordInput = formElement.find("#password");
    var messageInput = formElement.find("#message");
    var checkboxInput = formElement.find("#checkbox");

    nameInput.blur(function () {
      var name = $(this).val();
      highlight($(this), isValidName(name));
    });

    passwordInput.blur(function () {
      var password = $(this).val();
      highlight($(this), isValidPassword(password));
    });

    messageInput.blur(function () {
      var message = $(this).val();
      highlight($(this), isValidMessage(message));
    });

    checkboxInput.change(function () {
      var isChecked = $(this).is(":checked");
      highlight($(this), isChecked);
    });
  }

  function highlight(element, isValid) {
    var color = "#811"; // red
    if (isValid) {
      color = "#181"; // green
    }

    element.css("box-shadow", "0 0 4px " + color);
  }

  // In the following, we define helper functions that each validate
  // one of the inputs. These will be used further down by our validation
  // functions.

  function isValidName(name) {
    return name.trim().length >= 2;
  }

  function isValidPassword(password) {
    return password.length >= 6 && /.*[0-9].*/.test(password);
  }

  function isValidMessage(message) {
    return message.trim() !== "";
  }

  // Next, we define the actual validation functions which use the helpers from
  // above. These validation functions add a hint for the user for each invalid
  // input and prevent the form from submitting if the input is invalid.

  // First, show a hint if the name is not valid or remove the hint if it's
  // now valid.
  function validateNameField(name, event) {
    if (!isValidName(name)) {
      $("#name-feedback").text("Please enter at least two characters");
      event.preventDefault();
    } else {
      $("#name-feedback").text("");
    }
  }

  // Do the same for the other inputs.
  function validatePasswordField(password, event) {
    if (!isValidPassword(password)) {
      $("#password-feedback").text(
        "The password should have at least 6 characters and contain a number"
      );
      event.preventDefault();
    } else {
      $("#password-feedback").text("");
    }
  }

  function validateMessageField(message, event) {
    if (!isValidMessage(message)) {
      $("#message-feedback").text("Please enter a message.");
      event.preventDefault();
    } else {
      $("#message-feedback").text("");
    }
  }

  function validateCheckboxField(isChecked, event) {
    if (!isChecked) {
      $("#checkbox-feedback").text("Please agree to this.");
      event.preventDefault();
    } else {
      $("#checkbox-feedback").text("");
    }
  }
});
```
