# Events

## Objectives
By the end of this lesson you should be able to:

* Attach event handlers to DOM elements
* Modify the DOM in response to an event
* Use callbacks in methods like addEventListener
* Explain the difference between `this` and `event.target` in event listeners
* Explain the difference between `window.onload` and `DOMContentLoaded`, and use these to add event listeners

## Introduction

Events are one of the most important underlying concepts in modern Javascript. Events add interactivity to a webpage and let us do all sorts of fun stuff!

Events are all over the place before we even write a line of code.  We can use the following code in the Chrome Dev Tools to see events as they happen:

```js
monitorEvents(window)
```

## Types

Some common event types in your browser:

* click
* keypress
* focus
* blur
* [lots more](https://developer.mozilla.org/en-US/docs/Web/Events)

## Event Listeners

In order to explore event listeners, we need some HTML! To kick things off, do the following:

1. Create a new HTML file, and inside of the HTML add a button.
2. Create a new JS file, and link it to your HTML.

### `addEventListener()`

[[MDN]](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

The following code adds an event listener to the entire `window` object.  Try typing it into your js file and then click anywhere on the webpage!

```js
addEventListener("click", function() {
    alert("You clicked on the page!");
});
```

Every single DOM element also has its own `addEventListener` method:

```js
var button = document.querySelector("button");
button.addEventListener("click", function(){
    alert("SOMEONE CLICKED THE BUTTON!!");
});
```

Now we've attached an event listener to a specific DOM node, a button on the page.  Now, we will see a `"SOMEONE CLICKED THE BUTTON!!"` alert when that particular button is pressed. The function passed into the event listener is an example of a callback; in this particular case, it's also referred to as an **event handler**.

### `removeEventListener()`

[[MDN]](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

You can also remove event listeners from DOM elements if you are no longer interested in the event. Let's return to our example from the previous section. After adding the event listener to the button, maybe you realize that alert messages are terrible, and decide to remove it. It may be tempting to write something like this in the JS console:

```js
var button = document.querySelector("button");
button.removeEventListener("click");
```

However, if you copy and paste this code you'll see that it has no effect. The reason for this is that `removeEventListener`, like `addEventListener`, requires two arguments: the type of event, and the callback function to execute.

Therefore, when you're adding a callback function that you might need to remove later, you need to be sure that the function isn't anonymous. You need to give it a name.

Try rewriting your `addEventListener` as follows:

```js
var button = document.querySelector("button");

function clickAlert() {
	alert("SOMEONE CLICKED THE BUTTON!!");
}

button.addEventListener("click", clickAlert);
```

Now you should be able to remove the event listener in the console with the following code:

```
button.removeEventListener("click", clickAlert);
```

**Exercise** What does the following code do?

```js
var button = document.querySelector("button");

function once() {
    console.log("Done.");
    button.removeEventListener("click", once);
}

button.addEventListener("click", once);
```

## Event Object

There is a parameter that we can pass into our event handler functions: the event object. The event object gives us lots of information about the event. For example, we can use it to log some text to the console whenever a user clicks on an HTML element:

```js
function logText(event) {
  console.log(event.target.innerText);
}
window.addEventListener("click", logText);
```

Let's take a closer look at the `event` object, and on `event.target` in particular. Inside of your JS file, add an event listener that console logs the event object AND the event.target when you click on the button.

Once you get this working, you'll see that the `event` object has a lot of details about the click event that was fired: where was the cursor? What time was the event fired? Was the shift key held down? And so on. Meanwhile, `event.target` points to the DOM element that was (in this case) clicked. This can be helpful if you want to modify the DOM based on user interaction. 

**Exercise**: Create a variable called `clickCount` in your `js` file, and set it equal to 0. Modify your event listener so that every time you click on the button, the clickCount increments, and the button text changes to show the user how many times the button has been clicked.

### `event.target` vs. `this`

Let's return to our simple HTML page from before, and add an event listener that calls the `logText` button on a button click:

```js
var button = document.querySelector("button");
function logText(event) {
  console.log(event.target.innerText);
}
button.addEventListener("click", logText);
```

We can rewrite this code so that it doesn't reference the `event` object. We can use `this` instead!

```js
var button = document.querySelector("button");
function logText() {
  console.log(this.innerText);
}
button.addEventListener("click", logText);
```

So what's the difference between `this` and `event.target`, then? To answer this question, let's modify our HTML a bit. Wrap your button in a `div` like this:

```html
<div>
  <p>I'm a p tag!</p>	
  <button>I'm a button!</button>
</div>
```

Let's now add the event listener to that parent `div`. Update your javascript so that it looks like this:

```js
var div = document.querySelector("div");
function logText() {
  console.log(this.innerText);
}
div.addEventListener("click", logText);
```

Refresh the page. You should see that no matter where you click -- on the `div`, on the `p` tag, or on the `button`, the same text gets logged to the console: all of the text inside of the `div`.

Now let's change our `logText` function back so that it references the `event` object again:

```js
var div = document.querySelector("div");
function logText(event) {
  console.log(event.target.innerText);
}
div.addEventListener("click", logText);
```

In this case, the text that's logged to the console depends on where you click. If you click on the `p` tag, you should see "I'm a p tag!" in the console. If you click on the `button`, you should see "I'm a button!" in the console. And if you click anywhere else in the `div`, you should see both exclamations logged to the console.

The example demonstrates the difference between `this` and `event.target` in the event handler. `this` refers to the DOM element that the listener was attached to. Put another way, whenever you write `foo.addEventListener('click', someFunction)` the context of `this` inside of `someFunction` will refer to `foo`. On the other hand, `event.target` will refer to the element that caused the event to fire. For example, when you click on the button, `event.target` will refer to the button, even if the listener is not attached to the button.

When the element that fires the event is the same as the element that has the lsitener on it, you should see that `this` and `event.target` are the same. But there are times when you'll want to add the event listener to an element that won't necessarily be the same as the element (or elements) that will be firing the event. Let's take a look at an example of this now.

### Attaching Listeners to Multiple Elements

Let's suppose we want to add a click listener to every `<p>` on a page. We can't simply use `querySelectorAll` and then set an `addEventListener` on that.

```
<div id="container">
  <p>Hello</p>
  <p>Bye</p>
  <p>Hello again!</p>
</div>
```

```js
//THIS DOES NOT WORK
var paragraphs = document.querySelectorAll("p");
paragraphs.addEventListener("click", function(){
 console.log("Woof!")
})
```

One option: we can set a listener on every individual element:

```js
var paragraphs = document.querySelectorAll('p');
function eventHandler (event) {
  console.log('p clicked!');
}
for (var i=0; i<paragraphs.length; i++) {
  paragraphs[i].addEventListener('click', eventHandler)
}
```

Another option: we can use event bubbling and attach a single event listener to the parent:

```js
var container = document.getElementById('container');
function eventHandler (event) {
  console.log('p clicked!');
}
container.addEventListener('click', eventHandler)
```

### `window.onload` and `DOMContentReady`

## Event Propogation

[[JavaScript.info]](http://javascript.info/tutorial/bubbling-and-capturing)
[[quirksmode]](http://www.quirksmode.org/js/events_order.html)
[[MDN]](https://developer.mozilla.org/en-US/docs/XUL_Event_Propagation)

When an event happens. It captures down the DOM tree from `<html>` to the element where the event happened. And then bubbles back up the DOM tree until it gets back to `<html>`. Along each element it passes, it fires the event.

These 2 phases are collectively known as event propogation.

There is a third Boolean parameter of `addEventListener` that specifies if you want the handler to fire on capture or bubble. It defaults to `false`, which is bubble. But if you set it to `true`, it will fire on capture.

### Event Capturing

When an event happens. It first fires a capture event on `<html>` and makes its way down the DOM tree to the element where the event actually happened.

```html
<html>
  <body>
    <div>
      <button>Click Me!</button>
    </div>
  </body>
</html>
```

Let's say you click on the `<button>`. This is how the capture event will be ordered: `<html>` -> `<body>` -> `<div>` -> `<button>`

The capture event will fire on each one of these elements.

```
               | |
---------------| |-----------------
| parent       | |                |
|   -----------| |-----------     |
|   |target    \ /          |     |
|   -------------------------     |
|                                 |
-----------------------------------
```

### Event Bubbling

After the capture event has gotten all the way down to the target element where the event happened, it is time for the bubble phase. The bubble phase starts at the target element, and then makes its way back up through its parents until `<html>`.

```html
<html>
  <body>
    <div>
      <button>Click Me!</button>
    </div>
  </body>
</html>
```

Let's say you click on the `<button>`. This is how the bubble event will be ordered: `<button>` -> `<div>` -> `<body>` -> `<html>`

The bubble event will fire on each one of these elements.

```
               / \
---------------| |-----------------
| parent       | |                |
|   -----------| |-----------     |
|   |target    | |          |     |
|   -------------------------     |
|                                 |
-----------------------------------
```
