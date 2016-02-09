# Events

## Objectives
By the end of this lesson you should be able to:

* Attach event handlers to DOM elements
* Modify the DOM in response to an event
* Use callbacks in methods like addEventListener
* Use callbacks in methods like `setTimeout` and `setInterval`

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

## Event Objects

There is a parameter on our event handler functions: the event object. The event object gives us lots of information about the event. For example, we can use the [mouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) object to determine which mouse button the user clicked with:

```js
var button = document.querySelector("button");
function handleMouse (event) {
    if (event.which == 1)
        console.log("Left button");
    else if (event.which == 2)
        console.log("Middle button");
    else if (event.which == 3)
        console.log("Right button");
}
button.addEventListener("mousedown", handleMouse);
```

## Working with Events

### `addEventListener()`

[[MDN]](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

The following code adds an event listener to the entire `window` object.  Try typing it into your console and then click anywhere on the webpage!

```js
addEventListener("click", function() {
    console.log("You clicked!");
});
```

Every single DOM element also has its own `addEventListener` method:

```js
var button = document.querySelector("button");
button.addEventListener("click", function(){
    alert("SOMEONE CLICKED THE BUTTON!!");
});
```

Now we've attached an event listener to a specific DOM node, a button on the page.  Now, we will see a `"SOMEONE CLICKED THE BUTTON!!"` alert when that particular button is pressed.

### `removeEventListener()`

[[MDN]](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)

You can also remove event listeners from DOM elements if you are no longer interested in the event.

```js
var button = document.querySelector("button");
button.removeEventListener("click");
```

What does the following code do?

```js
var button = document.querySelector("button");
function once() {
    console.log("Done.");
    button.removeEventListener("click", once);
}
button.addEventListener("click", once);
```

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
