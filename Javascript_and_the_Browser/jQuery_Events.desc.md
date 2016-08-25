# Objectives

* Explain what jQuery events are
* Explain why jQuery events are useful
* Demonstrate how to setup a webpage for jQuery events
* Demonstrate how to add & delete jQuery event listeners
* Use jQuery events to respond to basic jQuery events
* Explain and use jQuery event delegation

<hr>

## What are jQuery events?

A few days ago, we learned how to use JavaScript to respond to user interaction like `click` events. For example:

```js
var paragraphs = document.querySelectorAll('p');

for (var i = 0; i < paragraphs.length; i++) {
  paragraphs[i].addEventListener('click', function() {
    console.log('A paragraph was clicked!');
  });
}
```

Using **jQuery events**, it's way easier to do the exact same thing - with way less code.

```js
$('p').on('click', function() {
  console.log('<p> clicked!');
});
```

## Why are jQuery events useful?

At first glance, it appears that jQuery's `on()` function is just than syntactic sugar for the DOM API's `addEventListener()` function. However, as we have seen in other parts of jQuery, the jQuery event system smooths over annoying and inconsistent cross-browser behavior. For example, the `focus` and `blur` events, as specified by the [World Wide Web Consortium](https://en.wikipedia.org/wiki/World_Wide_Web_Consortium) (W3C), don't bubble. However, jQuery fixes this by defining cross-browser events named `focusin` and `focusout` that do. Only when you go back to handling events with vanilla JavaScript is it clear just how much work jQuery does under the hood to create a super pleasurable experience for web developers.

#### 💪 Lesson Setup

Please create a blank `main.js` file and new `index.html` file like:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
    <script src="main.js"></script>
    <title>Turtle - a sad tale of turtle love</title>
  </head>
  <body>
    <section>
      <h1>Turtle - a sad tale of turtle love</h1>
      <p id="main">I really, really super love turtles.</p>
      <p>But Mom, why can't I have a turtle?</p>
      <p>Jiminy Crickets, Mom! I'm 35 and half, going on 36, and I want a frickin' turtle right this very instant or I'm going to have a breakdown. And regardless of what you say, "Johny Quest" is the best TV show ever - like in the in the history of ever - much, much better than "Ant Farm." And I am going to name my turtle "Hadji" or "Bandit" or maybe even "Race Bannon."</p>
      <button id="turtle-button">Make a Turtle Appear</button>
    </section>
  </body>
</html>
```

<hr>

## How do you setup a web page to respond to jQuery events?

Using vanilla JS when a page includes a `<script>` tag in its `<head>` tag, the corresponding JavaScript file won't have access to the `<body>` tag or any of its children. If the script file must be loaded in the `<head>`, the workaround is to listen for a `DOMContentLoaded` event before trying to access the DOM.

As you might expect, jQuery has the same problem yet a better solution that the 'DOMContentLoaded' event: the `ready()` function.

### The `ready()` function

jQuery provides a `.ready()` function that makes loading it up really convenient. And this syntax is pretty readable:

```js
$(document).ready(function() {
  $('#last').text('Turtle love!');
});
```

As most jQuery folks like to be obtuse and murky (this is programming after all) they created a shorter, way less clear way of expressing `.ready()` And to keep jQuery developers employed, and to save precious keystroked, most serious jQuery devs use the following shorthand:

```js
$(function() {
  $('#last').text('Turtle love!');
});
```

<hr>

## Add and Delete jQuery event listeners
Adding and deleting jQuery event listeners is easy using the `on()` function and the `off()` function.

### The `on()` function

Just like the `addEventListener()` function, jQuery's `.on()`takes an event handler callback that's invoked when the matching event is fired on the target DOM element. Yet, the `.on()` function makes adding event listeners a breeze. The callback can optionally specify an `event` parameter to accept a reference to the corresponding `event` object.

```javascript
$('#turtle-button').on('click', function(event) {
  var $target = $(event.target);
  $target.attr('disabled', true);
});
```

Using the `on()` function binds a callback to a target DOM element. This means the value of the `this` variable inside the callback is the targeted DOM element.

```javascript
$('#turtle-button').on('click', function() {
  var $this = $(this);
  $this.attr('disabled', true);
});
```

In this scenario, `event.target` and `this` are functionally equivalent - essentially the same thing - this is a great way to think of `this`.


### The `off()` function

Now that you've seen that the `on()` function adds an event listener, can you can guess what the `off()` function does? Yep, it removes an event listener just like the DOM API's `removeEventListener()` function.

```html
<button id="turtle-console-button-on">Log an important message</button>

```

```javascript
var logMessage = function() {
  console.log('Oh turtles, I love thee.');
};

$('#turtle-console-button-on').on('click', logMessage);

$('#turtle-console-button-on').off('click', logMessage);
```

Like the `removeEventListener()` function, the `off()` function must be given the same event type and callback function to remove it's respective listener from a target DOM element.

Unlike the `removeEventListener()` function, the `off()` function removes all listeners from a target DOM element when given no arguments at all.

```javascript
var logEventType = function(event) {
  console.log(event.type);
};

$('#last').on('click', logEventType);
$('#last').on('mouseenter', logEventType);
$('#last').on('mouseleave', logEventType);

$('#last').off();
```

<hr>

## Basic jQuery events
jQuery provides convenient functions for high level event types which are more powerful and flexible vanilla JS including `click`, `hover`, `keydown`, `keyup`, and `keypress`.

#### 💪 Lesson Setup
Kindly make a new file `turtle.css` and add the following styles:

```CSS
.turtle-color {
  color: chartreuse;
}

.turtles-like-underlines {
  text-decoration: underline;
}
```

and add this snippet to your `index.html`:

```html
<section>
  <input type="text" name="" id="turtle-text">
</section>
```

### The `click()` function

The `click()` function is a convenient shortcut for adding an `click` event listener using the `on()`. Instead of writing this:

```javascript
$('#last').on('click', function() {
  $(this).toggleClass('turtle-color');
});
```

You can write it like this:

```javascript
$('#last').click(function() {
  $(this).toggleClass('turtle-color');
});
```

### The `hover()` function

The `hover()` function is a convenient shorthand for binding both the `mouseenter` and `mouseleave` events.

So instead of writing this:

```javascript
var $last = $('#last');

$last.mouseenter(function() {
  $(this).addClass('turtles-like-underlines')
});

$last.mouseleave(function() {
  $(this).removeClass('turtles-like-underlines')
});
```

You can write this:

```javascript
$('#last').hover(function() {
  $(this).addClass('turtles-like-underlines')
}, function() {
  $(this).removeClass('turtles-like-underlines')
});
```

### The `keypress()`, `keydown()`, and `keyup()` functions

When a user presses a key _and_ a character is inserted into a focusable control, the `keypress` event will fire. The `keypress` event will fire repeatedly as long as the key is pressed down and a character is inserted. Keys like Escape, Shift, Control, and Alt can't be inserted into a control. To handle these key presses, you'll need to use the `keydown` event instead.

```javascript
$('#turtle-text').keypress(function() {
  console.log('A key was pressed and inserted into a focusable control.');
});

$('#turtle-text').keydown(function() {
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
$('#turtle-text').keydown(function(event) {
  console.log('A key was pressed an possibly inserted into a focusable control.');
  if (event.which === 27) {
    console.log("Turtle escape sequence activate!")
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

### The `submit()` function

The `submit` event is fired when a user attempts to submit a `<form>` tag. Forms can be submitted in the following ways.

- Click a `<button type="submit">` tag
- Click an `<input type="submit">` tag
- Press `Enter` in a textfield like a `<input type="text">` tag

Here's an example of an HTML search form.

```html
<section>
  <form id="search-form">
    <input type="text" name="keywords">
    <button type="submit">Search</button>
  </form>
</section>
```

With the corresponding JavaScript code.

```javascript
$('#search-form').submit(function() {
  console.log('Searching...');
});
```

## Event Object
The `event` object is browser "normalized" version of the JS event object implemented by each browser. Unlike the good ole days of yesteryear these days the differences are way smaller, yet you still have to be familiar with the jQuery version... because that is what jQuery uses.

### `event.target`

The DOM element that initiated the event. The target property can refer to the element attached to a listener or a descendent of it. Mostly the same as vanilla JS.

### `event.currentTarget`

The current DOM element in the event bubbling phase, typically equal to `this` in a function. Mostly the same as vanilla JS.

### `event.stopPropagation()`

Prevents the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event. Mostly the same as vanilla JS.

### `event.preventDefault()`

If this method is called, the default action of the event will not be triggered. For example, clicked anchor tags and submitted forms will not take the browser to a new URL. Mostly the same as vanilla JS.

### `event.originalEvent`

Here is where it gets interesting. To access many "non-normalized" event properties you have to use `event.originalEvent`, making some, less common things, hard to do with jQuery. This sort of "make common things are easier, less common things are harder" is a common library pattern.

## Event Delegation

Event delegation is an important topic for DOM manipulation in general. Now that we've talked a bit about jQuery, let's explore how jQuery handles it.

Suppose you've got a button on the page that generates a `div` with a random Pokémon name. Click on the div, and it gets removed from the DOM. Let's imagine that to begin, you've got the button and a few sample divs. Your page might look something like the following:

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
var $section = $('#pokemon-section');

$('#add-pokemon').on('click', function() {
  var name = names[Math.floor(Math.random() * names.length)];
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

**NOTE:** Try using `this` instead of `event.target` and see if there's any difference.

<hr>

### 📖 Homework
[Galvanize jQuery Calculator](https://github.com/gSchool/jquery-calculator)

#### 📚 Resources
* [jQuery Docs](http://api.jquery.com)
* [jQuery API - .ready()](http://api.jquery.com/ready/)
- [jQuery API - .on()](http://api.jquery.com/on/)
- [jQuery API - Event Object](https://api.jquery.com/category/events/event-object/)
[jQuery API - .off()](http://api.jquery.com/off)
[jQuery API - .click()](http://api.jquery.com/click/)
[jQuery API - .hover()](http://api.jquery.com/hover/)
[jQuery API - .submit()](http://api.jquery.com/submit/)
- [jQuery API - .keydown()](http://api.jquery.com/keydown/)
- [jQuery API - .keypress()](http://api.jquery.com/keypress/)
- [jQuery API - .keyup()](http://api.jquery.com/keyup/)
