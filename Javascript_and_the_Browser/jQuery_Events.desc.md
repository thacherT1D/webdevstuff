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

With the **jQuery events** system, it's way easier to do the exact same thing.

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

Because the tends to be so common with web developers, jQuery has a shortcut for the exact same thing.

```javascript
$(function() {
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

- [jQuery API - .on()](http://api.jquery.com/on/)
- [jQuery API - Event Object](https://api.jquery.com/category/events/event-object/)

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

### The `keypress()`, `keydown()`, and `keyup()` functions

When a user presses a key _and_ a character is inserted into a focusable control, the `keypress` event will fire. The `keypress` event will fire repeatedly as long as the key is pressed down and a character is inserted. Keys like Escape, Shift, Control, and Alt can't be inserted into a control. To handle these key presses, you'll need to use the `keydown` event instead.

```javascript
$('input[type="text"]').on('keypress', function() {
  console.log('A key was pressed and inserted into a focusable control.');
});

$('input[type="text"]').on('keydown', function() {
  console.log('A key was pressed an possibly inserted into a focusable control.');
});
```

It's common to handle different key presses in different ways. For that, you'll need compare the value of `event.which` with an expected code. When the `keydown` and `keyup` events are fired, `event.which` contains a **key code** number which represents an actual key on the keyboard. When the `keypress` event is fired, `event.which` contains a **character code** number which represents the key's UTF-8 character.

Here's a table that explains the difference between a key code and a character code.

| Key    | Key code | Character code |
|--------|----------|----------------|
| a      | 65       | 97             |
| A      | 65       | 65             |
| Return | 13       | 13             |
| Escape | 27       | N/A            |

```javascript
$('input[type="text"]').on('keydown', function(event) {
  if (event.which === 27) {
    // Handle the Escape key press
  }
});
```

Here's a table to help you quickly remember which event does what.

| Event      | Trigger(s)                                  | `event.which`  |
|------------|---------------------------------------------|----------------|
| `keydown`  | When pressed down. Repeats while holding.   | Key code       |
| `keypress` | When inserted. Repeats while inserting.     | Character code |
| `keyup`    | When released up.                           | Key code       |

**NOTE:** The `keypress` event's behavior may differ across browsers as there's no official specification for it.

- [jQuery API - .keydown()](http://api.jquery.com/keydown/)
- [jQuery API - .keypress()](http://api.jquery.com/keypress/)
- [jQuery API - .keyup()](http://api.jquery.com/keyup/)

### The `submit()` function

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

### Event Object

#### event.target

The DOM element that initiated the event. The target property can refer to the element attached to a listener or a descendent of it.

#### event.currentElement

The *current* DOM element in the event bubbling phase, typically equal to `this` in a function.

#### event.stopPropagation

Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.

### Event Delegation

Event delegation is an important topic for DOM manipulation in general. Now that we've talked a bit about jQuery, let's explore how jQuery handles it.

Suppose you've got a button on the page that generates a `div` with a random Pokémon name. Click on the div, and it gets removed from the DOM. Let's imagine that to begin, you've got the button and a few sample divs. Your page might look something like the following (for simplicity, we've just put styling info in the head):

```html
<button id="add-pokemon">Add a random Pokémon!</button>

<section>
  <div class="pokemon">Pikachu</div>
  <!-- Append Pokémon here -->
</section>
```

And some JavaScript code like this.

```javascript
var names = ['Charizard', 'Bulbasaur', 'Onyx', 'Mewtwo', 'Chansey'];
var $section = $('section');

$('#add-pokemon').on('click', function() {
  var name = names[Math.floor(Math.random() * monsters.length)];
  var $div = $(`<div class="pokemon">${name}</div>`);
  $section.append($div);
});

$('.pokemon').on('click', function(event) {
  var $target = $(event.target);
  $target.remove();
  console.log(`Buh-bye, ${$target.text()}!`);
});
```

Try removing the `<div>` tag for Pikachu. If everything is wired up correctly, that should work as expected. Now, try adding a random Pokémon by clicking on the `<button>` tag. That should work too. But, what happens when you try to remove a `<div>` added by the `<button>`? Try clicking on one of the new `<div>` tags and that should not work.

The problem here is that when we added the event listener to `<div>` tags with the `pokemon` class, those listeners were only added to the `<div>` tags that were present when the page loaded. In other words, the JavaScript code to add the event listener only executes once—when the script loads.

There are a couple of ways we can fix this problem. We could add an event listener to each `$div` that's created. But a better way is to add the listener to the parent `<section>` tag and then delegate the event handler (e.g. the callback) to a more specific child using a selector.

In fact, the second parameter to the `.on()` method doesn't need to be the event handler. Instead, it can be a child selector to which you want to delegate the event handler.

For example, we could refactor our code to look like this.

```javascript
$('section').on('click', '.pokemon', function(event) {
  var $target = $(event.target);
  $target.remove();
  console.log(`Buh-bye, ${$target.text()}!`);
});
```

Note that unlike with vanilla javascript, in this case, even though we attached the event listener to the container, `this` inside of the callback refers to the specific div that was clicked. In this case, how do you think `event.target` and `this` compare?
I
