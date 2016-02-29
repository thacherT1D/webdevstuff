# Introduction to jQuery

An **application programming interface**, or API, is the contract that programs utilize in order to successfully invoke an operation. For a JavaScript function, the API is the function's name, parameter types, and return types. For example, take this JavaScript function invocation.

```js
parseInt('3.14');  // 3
```

Here, the contract states that by invoking the `parseInt()` function with a string like `'3.14'`, the function promises to return that string as a number in integer form which is `3`. As a user of the `parseInt` API, you don't care about how the function is implemented. You only care about how to invoke it, what input to give it, and what output it returns.

A **library** is a collection of related APIs. Using a library allows you to be more productive as a developer because it provides interfaces to functionality that you don't have to implement yourself. For example, recall the built-in `Math` JavaScript object.

```js
Math.floor(5.9);  // 5
Math.ceil(5.1);   // 6
Math.round(5.5);  // 6
```

The `Math` object is a built-in library. And without it, you'd have to write your own mathematical functions. As a language, JavaScript has a number of built-in libraries like `Date`, `Math`, and `Number`. You've also seen that browsers provide additional built-in libraries to the JavaScript runtime system. For example, consider the `document` object.

```js
document.getElementById('lion');
document.getElementsByClassName('tigers');
document.querySelectors('#bears');
```

The `document` object is a library of APIs that programs can use to access the current page's DOM. However, the implementation of some browser APIs varies across browser vendors and versions. Also, there's a lot of common DOM manipulation use cases that are awkward to accomplish with the built-in browser APIs. Because of these issues, John Resig released jQuery as a 3rd party library in 2006.

[jQuery](http://jquery.com/) is a fast, small, and feature-rich JavaScript 3rd party library. It makes things like DOM traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

#### Stats as of November 3, 2015

* Downloaded on npm [34,838](https://www.npmjs.com/package/jquery) times a day
* [36,513](https://github.com/jquery/jquery/stargazers) stargazers on GitHub
* [66.8%](http://w3techs.com/technologies/details/js-jquery/all/all) of websites using it

#### An example

```html
<ul id="todoList">
  <li>Buy eggs</li>
</ul>

<button id="addTodo">Buy Milk</button>
```

```js
var button = document.querySelector('#addTodo');

button.addEventListener('click', function() {
  var ul = document.querySelector('#todoList');
  var li = document.createElement('li');

  li.textContent = button.textContent;

  ul.appendChild(li);
});
```

#### jQuery

```js
var $button = $('button.addTodo');

$button.on('click', function() {
  var $ul = $('ul.todoList');
  var $li = $('<li>');

  $li.text($button.text());

  $ul.append($li);
});
```

## Installation

You can [download](http://jquery.com/download/) and include jQuery with a `<script>` tag in your HTML.
There are also [many CDN's](http://jquery.com/download/#using-jquery-with-a-cdn) available you can link to so you do not have to download the file.

You can tell when jQuery is loaded correctly if `console.log($.fn.jquery)` prints out the jQuery version correctly.

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
