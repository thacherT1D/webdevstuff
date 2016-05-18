# jQuery Events

> One of the most powerful features of jQuery is how easy it becomes to manage events handlers on DOM Elements. Although there are some cases where vanilla JS could be more performant, the benefits of using jQuery's built in event handlers make development much faster and produces code that works on a variety of browsers.

*Remove if Ken covers this* - It's also used in over 70% of the top 1 million sites (by traffic). See [jQuery Usage Stats](http://trends.builtwith.com/javascript/jQuery)

## Document Loading

#### .ready()

[[jQuery]](http://api.jquery.com/ready/)


If you include your `<script>` tags in the `<head>` tag, you will not have access to the `<body>` tag because it hasn't been parsed by the browser yet. One way around it is to wait for a `load` event. And of course, jQuery provides a `.ready()` shorthand method to do this:

```js
// Wait for the document to be loaded before trying to modify the <body>
$( document ).ready(function() {
  // Handler for .ready() called only when the document is done loading.
});
```

## jQuery Event Handlers

#### .on()

[[jQuery]](http://api.jquery.com/on/)

The `.on()` function makes adding event listeners a breeze. It is the most similar of the event functions to `addEventListener`.

```js
// console.log "<p> clicked!" when you click a <p>
$('p').on('click', function () {
  console.log('<p> clicked!')
})
```

All events are bound to the element that was targeted. This means that `this` inside of all your event handlers will be the DOM Element the event is triggering on. To turn that into a jQuery object you can perform `$(this)`.

#### .off()

[[jQuery]](http://api.jquery.com/off)

While the `.on()` function can add listeners, I bet you can guess what `.off()` does. Similar to `removeEventListener` in vanilla JS, the `.off()` function makes removing listeners simple as well.

```js
// console.log "I like turtles." when you click a <button>
var turtleMessage = function() {
  console.log('I like turtles.');
};
$('button').on('click', turtleMessage);

// remove listener
$('button').off('click', turtleMessage);
```

You must pass in the same event and callback function in order to remove a specific listener from an element.

Unlike `removeEventListener,` the `.off()` function allows us to remove all listeners on an element by not passing in any arguments when invoked.

```js
// console.log the event type when it fires
var logText = function(event) {
  console.log(event.type);
};
$('div').on('mouseenter', logText);
$('div').on('mouseleave', logText);
$('div').on('click', logText); 

// remove all listeners
$('div').off();
```

## Mouse and Keyboard Event Shortcuts

> Instead of using `.on()` to create all event listeners, jQuery provides many shortcut event methods that have a shorter syntax and can be more meaningful than what is already implied with the word "on" - See [[jQuery Events]](http://api.jquery.com/category/events/) 

#### .click()

[[jQuery]](http://api.jquery.com/click/)

The `click` handler is a shortcut for `$().on('click', handler)`.

```js
// Toggle the 'active' class on <p> tags when clicked.
$('p').click(function () {
    $(this).toggleClass('active');
})
```

#### .hover()

[[jQuery]](http://api.jquery.com/hover/)

.hover() is a shorthand method for binding both the events `mouseenter` and `mouseleave`

```js
// Make all <p> have a class of 'active' when hovering with the mouse
$('p').hover(function () {
    $(this).addClass('active')
}, function () {
    $(this).removeClass('active')
});
```

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

```js
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