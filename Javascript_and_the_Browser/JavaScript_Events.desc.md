# Objectives

* Describe what an event listener is
* Attach event handlers to DOM elements
* Describe what the event handler's event object is
* Use callbacks in methods like addEventListener
* Explain the difference between `this` and `event.target` in event listeners
* Explain why is the `DOMContentLoaded` event is important
* Modify the DOM in response to an event

<hr>

## Events

Events are one of the most important underlying concepts in modern Javascript. Events add interactivity to a webpage and let us do all sorts of fun stuff!

Events are all over the place before we even write a line of code.  We can use the following code in the Chrome Dev Tools to see events as they happen:

```javascript
monitorEvents(window)
```

Some common event types in your browser:

* click
* keypress
* focus
* blur
* [lots more](https://developer.mozilla.org/en-US/docs/Web/Events)

<hr>

## Event Listeners

### Adding Event Listners

The `addEventListener()` method is a built-in Javascript function used to attach some functionality to an *EventTarget*. There are several types of *EventTargets*, but for today we're only going to look at `window` and html elements.

We'll start off with the following code that adds an event listener to the `window` object. Drop this in your web console to test out:

```javascript
window.addEventListener("click", function() {
  alert("You clicked on the page!");
});
```

Spin up a basic web page so that you can code along and explore event listeners further. We'll need to do some basic setup to kick things off:

1. Create a new HTML file.
1. Inside the HTML file add a button.
1. Create a new JS file.
1. Link your JS file to your HTML.

Your index.html should look like this:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Events!</title>
</head>
<body>
  <button>Clicky McClick Face</button>
  <script src="app.js"></script>
</body>
</html>
```
You'll notice we have our script file in an odd place. Don't worry about
that for now. We'll be addressing that a little be later in the lesson.

Inside our app.js add the following code:

```javascript
var button = document.querySelector("button");

button.addEventListener("click", function(){
  alert("SOMEONE CLICKED THE BUTTON!!");
});
```

Here we've attached an event listener to a specific DOM node, a button on the page.  Now, we will see a `"SOMEONE CLICKED THE BUTTON!!"` alert when that particular button is pressed. The function passed into the event listener is an example of a callback; in this particular case, it's also referred to as an **event handler**.

### Removing Event Listners

You can also remove event listeners from DOM elements with `removeEventListener()`. Let's return to our example from the previous section. After adding the event listener to the button, maybe you realize that alert messages are terrible, and decide to remove it. It may be tempting to write something like this in the JS console:

```javascript
var button = document.querySelector("button");

button.removeEventListener("click");
```

However, if you copy and paste this code you'll see that it has no effect. The reason for this is that `removeEventListener`, like `addEventListener`, requires two arguments: the type of event, and the callback function to execute.

Therefore, when you're adding a callback function that you might need to remove later, you need to be sure that the function isn't anonymous. You need to give it a name.

Try rewriting your `addEventListener` as follows:

```javascript
var button = document.querySelector("button");

var clickAlert = function() {
	alert("SOMEONE CLICKED THE BUTTON!!");
}

button.addEventListener("click", clickAlert);
```

Now you should be able to remove the event listener in the console with the following code:

```javascript
button.removeEventListener("click", clickAlert);
```
Try clicking your button... What happens?

<br>

#### 💪 Exercise

Modify the event listener on your button to log out to the console "Lost to the ether". The button should only log this message once. If you click the button a second time nothing should be logged.

<hr>

## The Event Handler's Event Object

There is a parameter that we can pass into our event handler functions: the event object. The event object gives us lots of information about the event. For example, we can use it to log some text to the console whenever a user clicks on an HTML element:

```javascript
var logText = function(event) {
  console.log(event.target.textContent);
}

window.addEventListener("click", logText);
```

Let's take a closer look at the `event` object, and its `target` property in particular. Inside of your JS file, add an event listener that console logs the `event` object AND the `event.target` when you click on the button.

```js
var button = document.querySelector('button');

var clickyButton = function(event) {
  console.log(event);
  console.log(event.target);
}

button.addEventListener('click', clickyButton);
```

Once you get this working, you'll see that the `event` object has a lot of details about the click event that was fired: where was the cursor? What time was the event fired? Was the shift key held down? And so on. Meanwhile, `event.target` points to the DOM element that was (in this case) clicked. This can be helpful if you want to modify the DOM based on user interaction.

<br>

#### 💪 Exercise

 Create a variable called `clickCount` in your `js` file, and set it equal to 0. Modify your event listener so that every time you click on the button, the clickCount increments, and the button text changes to show the user how many times the button has been clicked.

<hr>

## Target Vs. This

Let's return to our simple HTML page from before, and add an event listener that calls the `logText` function on a button click:

```javascript
var button = document.querySelector("button");

var logText = function(event) {
  console.log(event.target.textContent);
}

button.addEventListener("click", logText);
```

We can rewrite this code so that it doesn't reference `event.target` but uses `this` instead!

```javascript
var button = document.querySelector("button");

var logText = function() {
  console.log(this.textContent);
}

button.addEventListener("click", logText);
```

So what's the difference between `this` and `event.target`? To answer this question, let's modify our HTML a bit. Wrap your button in a `div` like this:

```html
<div>
  <p>I'm a p tag!</p>
  <button>I'm a button!</button>
</div>
```

Let's now add the event listener to that parent `div`. Update your javascript so that it looks like this:

```javascript
var div = document.querySelector("div");

var logText = function() {
  console.log(this.textContent);
}

div.addEventListener("click", logText);
```

Refresh the page. You should see that no matter where you click -- on the `div`, on the `p` tag, or on the `button`, the same text gets logged to the console: all of the text inside of the `div`.

Now let's change our `logText` function back so that it references the `event` object again:

```javascript
var div = document.querySelector("div");

var logText = function(event) {
  console.log(event.target.textContent);
}

div.addEventListener("click", logText);
```

In this case, the text that's logged to the console depends on where you click. If you click on the `p` tag, you should see "I'm a p tag!" in the console. If you click on the `button`, you should see "I'm a button!" in the console. And if you click anywhere else in the `div`, you should see both exclamations logged to the console.

The example demonstrates the difference between `this` and `event.target` in the event handler. `this` refers to the DOM element that the listener is attached to. Put another way, whenever you write `foo.addEventListener('click', someFunction)` the context of `this` inside of `someFunction` will refer to `foo`. On the other hand, `event.target` will refer to the element that caused the event to fire. For example, when you click on the button, `event.target` will refer to the button, even if the listener is not attached to the button.

When the element that fires the event is the same as the element that has the listener on it, you should see that `this` and `event.target` are the same. But there are times when you'll want to add the event listener to an element that won't necessarily be the same as the element (or elements) that will be firing the event. Let's take a look at an example of this now.

<hr>

## Triggering Listeners for Multiple Elements

### Attaching to Multiple Elements

Let's suppose we want to add a click listener to every `<p>` on a page. We can't simply use `querySelectorAll` and then set an `addEventListener` on that. (What type of error do you think you'll get?)

```html
<div id="container">
  <p>Hello</p>
  <p>Bye</p>
  <p>Hello again!</p>
</div>
```

```javascript
//THIS DOES NOT WORK
var paragraphs = document.querySelectorAll("p");

paragraphs.addEventListener("click", function() {
 console.log("Woof!");
});
```

One option: we can set a listener on every individual element:

```javascript
var paragraphs = document.querySelectorAll('p');

var eventHandler = function() {
  console.log("Woof!");
}
for (var i = 0; i < paragraphs.length; i++) {
  paragraphs[i].addEventListener('click', eventHandler);
}
```

If you inspect one of these elements in the Elements tab and look under Event Listeners, you'll see that each one of these elements has a copy of `eventHandler` attached to it, as expected. This is fine for this simple little example, but if you have hundreds of DOM elements with their own copy of the same function, that isn't very efficient.

### Attaching to Parent Element

Another option: we can use *event bubbling* (more on this later) and attach a single event listener to the parent:

```javascript
var container = document.getElementById('container');

var eventHandler = function() {
  console.log('Woof!');
}
container.addEventListener('click', eventHandler);
```

In this case all p tags share one copy of `eventHandler` which they get from their parent container.

<hr>

## DOMContentLoaded Event

When you're using Javascript to manipulate the DOM, you need to be sure that what you're trying to manipulate is available to you. To see what this means we're going to revisit that weirdly placed script tag we have sitting in the bottom of our `<body>` element and put it back in the `<head>` where it blongs:

In your index.html:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Events!</title>
  <script src="app.js"></script>
</head>
<body>
  <img src="https://media.giphy.com/media/qANK09622WD5u/giphy.gif" alt="">
</body>
</html>
```

In your app.js:

```javascript
var img = document.querySelector('img');

var imgLog = function() {
  console.log("You moused over Mega Man!");
}

img.addEventListener('mouseover', imgLog);
```

Without loading the page, you should be able to guess at what this code should do: when you mouse over the image, a message should get logged to the console.

However, when you load the HTML, you should find that no message is getting logged. What's the deal???

The deal is that the script is loading before the DOM has finished loading. Not convinced? Throw a debugger in the first line and take a look at the `document` -- you'll see that the `body` hasn't loaded yet! Because of this, there's no `img` tag to grab with javascript, and so your `img` variable will be `null`.

When manipulating the DOM, it's important that your javascript code not load until the DOM is *ready*. There are a couple of ways to do this. The most common way is to use the `DOMContentLoaded` event:

```javascript
var imgLog = function() {
  console.log("You moused over Mega Man!");
}

document.addEventListener("DOMContentLoaded", function() {
  var img = document.querySelector('img');
  img.addEventListener('mouseover', imgLog);
});
```

This event wont fire until the document has been loaded and parsed. This happens before all assets (e.g. images, videos, stylesheets, etc.) have completely loaded. In other words, `DOMContentLoaded` gets fired before the window finishes loading.

You may also come across `window.onload` It is another option to be aware of. It works slightly different than `DOMContentLoaded` but accomplishes the same goal.

Note: putting your script tags at the bottom of the page can help resolve some of these issues, but it's still probably a good idea to wrap any DOM-manipulating functionality inside of an event listener to `DOMContentLoaded`.

<br>

#### 💪 Exercise

With your script tag in the `<head>` of your html, get an event to properly fire using both `DOMContentLoaded` and `window.onload`

<hr>

## Event Propagation

Before finishing up, let's take a look at one more example. Let's return to our earlier example with a single `button`. In our Javascript file, let's add two event listeners:

```javascript
var bodyClicky = function() {
  alert("YOU CLICKED ON THE BODY!!!!");
}

var buttonClicky = function() {
  alert("YOU'RE REALLY PUSHING MY BUTTONS!!!!!");
}

document.addEventListener("DOMContentLoaded", function() {
  var body = document.querySelector('body');
  var button = document.querySelector('button');

  body.addEventListener('click', bodyClicky);
  button.addEventListener('click', buttonClicky);
});
```

Click on the button. You'll see that the button message is alerted, followed by the body message. Why is this the order, rather than the other way around? The answer has to do with _event propagation_.

When an event happens. It goes through a _capture_ phase **down** the DOM tree from `<html>` to the element where the event was triggered. Then, it _bubbles_ back **up** the DOM tree until it gets back to `<html>`. Along each element it passes, it fires the event; a *click* event in our case.

These 2 phases -- event capturing and event bubbling -- are collectively known as event propagation.

There is a third Boolean parameter of `addEventListener` that specifies if you want the handler to fire on capture or bubble. It defaults to `false`, which is bubble. But if you set it to `true`, it will fire on capture.

<br>

#### 💪 Exercise

Modify our javascript so that our handlers fire on the capture phase.

<hr>

### Event Capturing

Let's break down what exactly is happening from the exercise above. When an event happens, it first fires a capture event on `<html>` and makes its way down the DOM tree to the element where the event actually happened.

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

By setting the third parameter to `true` we are telling the browser to fire those event listeners during the capture phase. Our solution the the exercise above would look something like this:


```javascript
var bodyClicky = function() {
  alert("YOU CLICKED ON THE BODY!!!!");
}

var buttonClicky = function() {
  alert("YOU'RE REALLY PUSHING MY BUTTONS!!!!!");
}

document.addEventListener("DOMContentLoaded", function() {
  var body = document.querySelector('body');
  var button = document.querySelector('button');

  body.addEventListener('click', bodyClicky, true);
  button.addEventListener('click', buttonClicky, true);
});
```

You should now see that the alert messages pop up in the opposite order!

<hr>

### 📖 Homework

[Stoplight Exercise](https://github.com/gSchool/stoplight-event-exercise)

<br>

#### 📚 Resources

* [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
* [JavaScript.info](http://javascript.info/tutorial/bubbling-and-capturing)
* [`DOMContentLoaded` vs. `window.onload`](http://web.archive.org/web/20150405114023/http://ie.microsoft.com/testdrive/HTML5/DOMContentLoaded/Default.html)
