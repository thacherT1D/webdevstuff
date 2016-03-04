# Introduction to jQuery

> jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

[jQuery](http://jquery.com/) is a widely popular library for manipulating the DOM in a browser.

```js
var $divs = $('div');
$divs.css('background-color', 'red');
$divs.click(function() {
  $(this).toggleClass('active');
});
```

## What's wrong with vanilla JS?

Depending on who you ask, nothing! There's nothing you can do in jQuery that you _can't_ do in plain old vanilla Javascript. And as Javascript evolves, some feel like the gap between vanilla Javascript and the enhancements of jQuery is narrowing. 

But based on what you've seen so far, here are a few reasons you might like jQuery:

1. The syntax is shorter. This means you can write code expressing the same functionality more efficiently. Suppose we wanted to add a click listener to a `div` with an id of `foo`. In vanilla javascript, that code would look something like this:

	```javascript
	document.getElementById('foo').addEventListener('click', callback);
	```
	
	In jQuery, the same functionality looks like this:

	```javascript
	$("#foo").on('click', callback);
	```
	
2. As you may have noticed, even though the return values from functions like `document.getElementsByTagName` or `document.querySelectorAll` look like arrays, they are actually array-like objects which lack much of the functionality that arrays have. Specifically, array methods like `forEach`, `map`, etc. don't exist on these array-like objects.

	To address this issue, jQuery comes with an `$.each` method and a `$.map` method that lets us iterate over jQuery objects. The syntax is a bit different than with `forEach` and `map`, but we'll cross that bridge later.
	
3. Dealing with adding, removing, and toggling classes is a bit more streamlined in jQuery.

4. AJAX with jQuery is way better than AJAX with vanilla Javascript. (More on this later this week.)	

## Installation

You can [download](http://jquery.com/download/) and include jQuery with a `<script>` tag in your HTML.
There are also [many CDN's](http://jquery.com/download/#using-jquery-with-a-cdn) available you can link to so you do not have to download the file.

## Key Features

So why is jQuery so popular? What features does it offer that makes it so prevalent?

jQuery places 2 variables into the global scope for you to use: `$` and `jQuery`.
These two functions are identical. By convention you will see most people using `$`.

### DOM Selection

The first thing that is necessary to be effective with jQuery is [jQuery Selectors](http://api.jquery.com/Types/#Selector). Think back to functions like `getElementById()` and `getElementsByClassName()` and recall how these interact with the DOM and return nodes. jQuery has its own [selectors](http://api.jquery.com/category/selectors/) that behave in similar ways.

One of the nice things about jQuery selectors is you select DOM elements the same way you write CSS selectors. We can select nodes in the DOM with ID's with the following syntax:

```js
var $box = $('#box')
```

This assumes there is an ID of box somewhere on the page. It will _return_  a [jQuery object](http://api.jquery.com/Types/#jQuery). This jQuery object is different than the node that gets returned with `getElementById` in that a jQuery object has other jQuery methods on it.

Selecting nodes in the DOM by class:

```js
var $boxes = $('.box')
```

There are [tons more](http://api.jquery.com/category/selectors/) selectors you can use and chain to find exactly the nodes you need.

### DOM Creation

[[jquery]](https://api.jquery.com/jQuery/#jQuery-html-ownerDocument)

Creating DOM Elements with jQuery is super easy! Just insert a tag into the `$` function. It should be able to handle any valid HTML string.

```js
var myDiv = $('<div class="active">');
```

### Events

One of the powerful features of jQuery is how easy it becomes to manage events handlers on DOM Elements.

#### .on()

[[jquery]](http://api.jquery.com/on/)

The `.on()` function makes adding event listeners a breeze. It is the most similar of the event functions to `addEventListener`.

```js
// console.log "<p> clicked!" when you click a <p>
$('p').on('click', function () {
    console.log('<p> clicked!')
})
```

All events are bound to the element that was targeted. This means that `this` inside of all your event handlers will be the DOM Element the event is triggering on. To turn that into a jQuery object you can perform `$(this)`.

There are also many [shortcut event methods](http://api.jquery.com/category/events/) in jQuery such as click, keydown, hover, etc.

#### .ready()

[[jquery]](http://api.jquery.com/ready/)


If you include your `<script>` tags in the `<head>` tag, you will not have access to the `<body>` tag because it hasn't been parsed by the browser yet. One way around it is to wait for a `load` event. And of course, jQuery provides a `.ready()` shorthand method to do this:

```js
//Wait for the document to be loaded before trying to modify the <body>
$( document ).ready(function() {
    // Handler for .ready() called only when the document is done loading.
});
```

#### .click()

[[jquery]](http://api.jquery.com/click/)

The `click` handler is a shortcut for `$().on('click', handler)`.

```js
// Toggle the 'active' class on <p> tags when clicked.
$('p').click(function () {
    $(this).toggleClass('active');
})
```

#### .hover()

[[jquery]](http://api.jquery.com/hover/)

.hover() is a shorthand method for binding both the events `mouseenter` and `mouseleave`

```js
// Make all <p> have a class of 'active' when hovering with the mouse
$('p').hover(function () {
    $(this).addClass('active')
}, function () {
    $(this).removeClass('active')
});
```

### Dom Manipulation

Modifying a DOM Element can be difficult at times using native functions. jQuery offers a [plethora of methods](http://api.jquery.com/category/manipulation/) to make modifying the DOM super simple.

#### .toggleClass()

[[jquery]](http://api.jquery.com/toggleClass/)

Say you have a DOM Element with the `className` `"box active red big"`. How would you detect and remove the class active from the middle of the string if it exists and add it if it doesn't exist? Fortunately with jQuery you can just use `.toggleClass()` to do that for you.

```js
$('#myButton').click(function () {
    $(this).toggleClass('active')
})
```

#### .attr()

[[jquery]](http://api.jquery.com/attr/)

Use `.attr()` to change a DOMElement's attribute:

```js
console.log($('img').attr('title')) // print out the first img's title
$('img').attr('title', 'image hover text for the win!'); // set the title text on all images
```

#### .css()

[[jquery]](http://api.jquery.com/css/)

Use `.css()` to change the style attribute of a DOMElement:

```js
var color = $('div').css('background-color'); //get the first div background-color
$('div').css('background-color', 'red'); //set all div's background colors
```

#### .prop()

[[jquery]](http://api.jquery.com/prop/)

Use `.prop()` to change a property of a DOMElement:

```js
var isChecked = $('input[type="checkbox"]').prop('checked');
$('input[type="checkbox"]').prop('checked', true);
```

#### .prepend() .append() .insertBefore() .insertAfter() .before() .after()

All of these methods are used for inserting a DOM Element into the DOM at various spots.

[`.prepend()`](http://api.jquery.com/prepend/) and [`.append()`](http://api.jquery.com/append/) insert as the first and last child of the target element.

[`.insertBefore()`](http://api.jquery.com/insertBefore/) and [`.insertAfter()`](http://api.jquery.com/insertAfter/) insert before or after as siblings of the target element.

[`.before()`](http://api.jquery.com/before/) and [`.after()`](http://api.jquery.com/after/) are the same as `.insertBefore()` and `.insertAfter()`.

#### .remove()

[[jquery]](http://api.jquery.com/remove/)

The `.remove()` function removes a DOM element from the DOM.

#### .clone()

[[jquery]](http://api.jquery.com/clone/)

The `.clone()` function makes a deep copy clone of the selected DOM Element.

#### .empty()

[[jquery]](http://api.jquery.com/empty/)

the `.empty()` method will clear out the contents of any DOM Element.

```js
$('div').empty() //clear out all divs
```