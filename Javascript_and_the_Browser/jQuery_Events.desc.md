## Objectives

- Explain what jQuery events are.
- Explain why jQuery events are useful.
- Use jQuery events to respond to user interaction.

## What are jQuery events?

A few days ago, we learned how to use JavaScript to respond to user interaction like `click` events.

```javascript
var paragraphs = document.querySelectorAll('p');

for (var i = 0; i < paragraphs.length; i++) {
  paragraphs[i].addEventListener('click', function() {
    console.log('A paragraph was clicked!');
  });
}
```

With the **jQuery events** system, it's way easier to do the exact same thing. jQuery's `.on()` function makes adding event listeners to DOM elements a breeze.

```javascript
$('p').on('click', function() {
  console.log('<p> clicked!');
});
```

## Why are jQuery events useful?

At first glance, it appears that jQuery's `on()` function is no more than syntactic sugar for the `addEventListener()` function. However, like many parts of jQuery, it's event system smooths over inconsistent cross-browser behavior. Only until you go back to handling events with vanilla JavaScript is it clear just how much work jQuery does under the hood to create the pleasurable experience for web developers. For example, the `focus` and `blur` events, as specified by the [World Wide Web Consortium](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) (W3C), don't bubble. However, jQuery fixes this by defining cross-browser events named `focusin` and `focusout` that do.

## How do you use jQuery events to respond to user interaction?

### The `ready()` function

When a page includes a `<script>` tag in its `<head>` tag, the corresponding JavaScript file won't have access to the `<body>` tag or any of its children. If the script file must be loaded in the `<head>`, the workaround is to listen for a `DOMContentLoaded` event before trying to access the DOM. Of course, jQuery provides a `.ready()` function to do just this.

```javascript
$(document).ready(function() {
  $('p').text('Hello world');
});
```

[jQuery API - .ready()](http://api.jquery.com/ready/)

### The `on()` function

As we've seen, the `.on()` function makes adding event listeners a breeze. Just like the `addEventListener()` function, it takes an event handler callback that's invoked when the matching event is fired on the target DOM element. The callback can optionally specify an `event` parameter to accept a reference to the corresponding `Event` object.

```javascript
$('button').on('click', function(event) {
  var $target = $(event.target);

  $target.attr('disabled', true);
});
```

Using the `on()` function binds an event handler callback to a target DOM element. This means the value of the `this` variable inside inside a callback is the DOM element target.

```javascript
$('button').on('click', function() {
  var $this = $(this);

  $this.attr('disabled', true);
});
```

[jQuery API - .on()](http://api.jquery.com/on/)
[jQuery API - Event Object](https://api.jquery.com/category/events/event-object/)

### The `off()` function

Since you know the `on()` function adds event listeners, I bet you can guess what the `off()` function does. Spoiler alert, think `removeEventListener()` function from vanilla JavaScript.

```javascript
var turtleMessage = function() {
  console.log('I like turtles.');
};

$('button').on('click', turtleMessage);

$('button').off('click', turtleMessage);
```

Like the `removeEventListener()` function, the `off()` function must be given the same event type and callback function to remove it's respective listener from the DOM element.

Unlike the `removeEventListener()` function, the `off()` function removes all listeners from an element when given no arguments at all.

```javascript
var logEventType = function(event) {
  console.log(event.type);
};

$('div').on('mouseenter', logEventType);
$('div').on('mouseleave', logEventType);
$('div').on('click', logEventType);

$('div').off();
```

[jQuery API - .off()](http://api.jquery.com/off)

### The `click()` function

The `click()` function is a convenient shortcut for adding an `click` event listener. Instead of writing this.

```javascript
$('p').on('click', function() {
  $(this).toggleClass('active');
});
```

You can write it like this.

```javascript
$('p').click(function() {
  $(this).toggleClass('active');
});
```

[jQuery API - .click()](http://api.jquery.com/click/)

### The `hover()` function

The `hover()` function is a convenient shorthand for binding both the `mouseenter` and `mouseleave` events.

So instead of writing this.

```javascript
var $p = $('p');

$p.on('mouseenter', function() {
  $(this).addClass('active')
});

$p.on('mouseleave', function() {
  $(this).removeClass('active')
});
```

You can write this.

```javascript
$('p').hover(function() {
  $(this).addClass('active')
}, function() {
  $(this).removeClass('active')
});
```

[jQuery API - .hover()](http://api.jquery.com/hover/)

#### .keypress() or .keydown() - What's the Difference?

[[jQuery]](http://api.jquery.com/keypress/)

- .keydown() is shorthand for `$().on('keydown', handler);`

- .keypress() is shorthand for `$().on('keypress', handler);`

The `keydown` event is fired when the browser registers any keyboard input. The `keypress` event fires in a very similar manner, but does not fire when any of the modifier or non-printing keys are pressed (`shift`, `option`, `command`, etc.)


##### Typing "a"

- `keydown` fires
- *then* `keypress` fires

##### Typing "A"

- `keydown` fires for shift
- `keydown` fires for a
- *then* `keypress` fires for A

Basically, `keypress` will fire separate events when you type lowercase `a` and uppercase `A`, and `keydown` is fired for each key that is pressed, when you type "a" *and* "shift" *and* "a" again.

> **GOTCHA:** the `keypress` event's behavior may differ across browsers - no official specification

## Form Events

Like the shortcuts for `mouse` and `keyboard` events, jQuery also provides a number of shortcut methods that can listen for HTML form events.

#### .submit()

Shorthand for `$('form').on('submit', handler);`

The `submit` event is fired when a user attempts to submit a form and can only be attached to form elements. Forms can be submitted by clicking an `<input type="submit">`,`<button type="submit">`, or by pressing `Enter`

An example of the base HTML of a simple form:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Form Submission</title>
</head>
<body>
  <form id="searchForm">
    <input type="text">
    <input type="submit" value="Google Search">
  </form>

  <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

What the `app.js` file could look like using `.submit()`:

```javascript
$('#searchForm').submit(function() {
  console.log('Search Google now...');
});
```

There are also shortcuts for `.blur()`, `.focus()`, and `.select()` as well. Can you guess the syntax and events for each of these methods?

> **QUESTION:** Since these methods are all shorthand for `$().on(event, handler)`, how do you think you can remove any of these listeners?

## Event Object

#### event.target

The DOM element that initiated the event. The target property can refer to the element attached to a listener or a descendent of it.

#### event.currentElement

The *current* DOM element in the event bubbling phase, typically equal to `this` in a function.

#### event.stopPropagation

Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

## Event Delegation

Event delegation is an important topic for DOM manipulation in general. Now that we've talked a bit about jQuery, let's explore how jQuery handles it.

Suppose you want to build the following: you've got a button on the page that generates a div with a random color. Click on the div, and it gets removed from the DOM. Let's imagine that to begin, you've got the button and a few sample divs. Your page might look something like the following (for simplicity, we've just put styling info in the head):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Delegation Example</title>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <style>

    .btn {
      margin: 20px 0;
    }

    .random {
      width: 150px;
      height: 150px;
      background-color: #4898CE;
      display: inline-block;
      margin: 3px;
    }

    .random:hover {
      cursor: pointer;
      background-color: #DA4141;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <button id="add-div" class="btn btn-default btn-block">Add a div!</button>
      </div>
    </div>
    <div class="row">
      <div id="div-area" class="col-md-12">
        <div class="random"></div>
        <div class="random"></div>
        <div class="random"></div>
        <div class="random"></div>
      </div>
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

Since we're loading `jQuery` at the bottom, let's put it to good use! Here's how our `script.js` might look:

```javascript
$(function() {
  var $addDiv = $("#add-div");
  var $divArea = $("#div-area");
  var $random = $(".random");

  $addDiv.on('click', function() {
    var $newDiv = $("<div class='random'></div>");
    $divArea.append($newDiv);
  });

  $random.on('click', function() {
    $(this).remove();
    console.log("Buh-bye!");
  });
});
```

Before moving forward, make sure you understand what each line is doing. Once you feel like you've got a solid understanding, open the page and try removing some divs.

Looks good, right? Everything should be working as expected.

Now try adding a div by clicking on the button. That should work too.

BUT... what happens when you try to remove a div that you added with the button? Click on a newly added button, and you should see that nothing happens.

The problem here is that when we added the event listener to divs with the `random` class, those listeners were only added to the divs that were present _when the page loaded_. The code

```javascript
$random.on('click', function() {
  $(this).remove();
  console.log("Buh-bye!");
});
```

only executes once, when the script loads. It doesn't load again when we add a new div with the class of `random`.

There are a couple of ways we can fix this problem. We could add a copy of the event listener to `$newDiv` each time we create it, but that isn't very DRY. A better approach is to add the listener to the parent, and then delegate the event handler (e.g. the callback) to more specific child selectors.

In fact, the second parameter to the `.on` method doesn't need to be the event handler; instead, it can be a child selector to which you want to delegate the event handler.

In this example, we could refactor our code to look like this:

```javascript
$(function() {
  var $addDiv = $("#add-div");
  var $divArea = $("#div-area");
  var $container = $(".container");

  $addDiv.on('click', function() {
    var $newDiv = $("<div class='random'></div>");
    $divArea.append($newDiv);
  });

  $container.on('click', '.random', function() {
    $(this).remove();
    console.log("Buh-bye!");
  });
});
```

Note that unlike with vanilla javascript, in this case, even though we attached the event listener to the container, `this` inside of the callback refers to the specific div that was clicked. In this case, how do you think `event.target` and `this` compare?
I
