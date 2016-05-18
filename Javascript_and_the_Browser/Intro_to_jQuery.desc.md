## Objectives

* Download and include jQuery into an HTML document.
* Find an element by id, tag name, class name, and more advanced selectors using jQuery.
* Set an element’s text content and attributes using jQuery.
* Set an element's CSS styles using jQuery.
* Construct and add elements to the DOM using jQuery.
* Remove and elements from the DOM using jQuery.
* Traverse the DOM using jQuery.

> jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

[jQuery](http://jquery.com/) is a widely popular library for manipulating the DOM in a browser.

## What's wrong with vanilla JS?

Depending on who you ask, nothing! There's nothing you can do in jQuery that you _can't_ do in plain old vanilla JavaScript. And as Javascript evolves, some feel like the gap between vanilla JavaScript and the enhancements of jQuery is narrowing. 

But based on what you've seen so far, here are a few reasons you might like jQuery:

1. The syntax is shorter. This means you can write code expressing the same functionality more efficiently. Suppose we wanted to set an attribute to a `div` with an id of `foo`. In vanilla JavaScript, that code would look something like this:

	```javascript
	document.getElementById('foo').setAttribute('attribute', 'value');
	```
	
	In jQuery, the same functionality looks like this:

	```javascript
	$("#foo").attr('attribute', 'value');
	```
	
	This efficient interface also allows _chaining_ calls so that we can combine multiple lines of vanilla JavaScript into one line using jQuery.
	
2. Return values from functions like `document.getElementsByTagName` or `document.querySelectorAll` are NodeLists, which are array-like objects which lack much of the functionality that arrays have. Specifically, array methods like `forEach`, `map`, etc. don't exist on these.

	To address this issue, jQuery comes with an `$.each` method and a `$.map` method that lets us iterate over jQuery objects. The syntax is a bit different than with `forEach` and `map`, but we'll cross that bridge later.
	
3. Dealing with adding, removing, and toggling classes is a bit more streamlined in jQuery.

4. AJAX with jQuery is _way_ better than AJAX with vanilla JavaScript. (More on this next week.)

## Installation

You can [download](http://jquery.com/download/) and include jQuery with a `<script>` tag in your HTML.
There are also [many CDN's](http://jquery.com/download/#using-jquery-with-a-cdn) available you can link to so you do not have to download the file.

## Key Features

So why is jQuery so popular? What features does it offer that makes it so prevalent?

jQuery places 2 variables into the global scope for you to use: `$` and `jQuery`.
These two functions are identical. By convention you will see most people using `$`.

### DOM Selection

The first thing that is necessary to be effective with jQuery is [jQuery Selectors](http://api.jquery.com/Types/#Selector). Think back to functions like `getElementById()` and `getElementsByClassName()` and recall how these interact with the DOM and return nodes. jQuery has its own [selectors](http://api.jquery.com/category/selectors/) that behave in similar ways. While you may be thinking, _Don't we have `querySelector` and `querySelectorAll`?_ Keep in mind two things:

* jQuery was released before `querySelector` and `querySelectorAll` (I know right?!). It had its own engine built in to analyze the queries.
* jQuery has even more expressive selectors than `querySelector` and `querySelectorAll`.

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

## Dom Manipulation

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

#### .text()

[[jquery]](http://api.jquery.com/text/)

The `.text()` function to get and set the text content on the element.

#### .val()

[[jquery]](http://api.jquery.com/val/)

The `.val()` function to get and set the value on the element (usually used for an input's `value` property).

#### .html()

[[jquery]](http://api.jquery.com/html/)

The `.html()` function to get and set the html inside an element. This is useful when making a change inside an element that's composed of multiple elements.

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

#### .remove(), .detach()

[[jquery]](http://api.jquery.com/remove/)

The `.remove()` function removes a DOM element from the DOM.

[[jquery]](http://api.jquery.com/detach/)

The `.detach()` function is very similar to `.remove()`, but it returns the removed jQuery object that you can use later.

#### .clone()

[[jquery]](http://api.jquery.com/clone/)

The `.clone()` function makes a deep copy clone of the selected DOM Element.

#### .empty()

[[jquery]](http://api.jquery.com/empty/)

the `.empty()` method will clear out the contents of any DOM Element.

```js
$('div').empty() //clear out all divs
```

## Further reading

[jQuery docs](https://api.jquery.com/)

[You might not need jQuery](http://youmightnotneedjquery.com/)

In-class lab:

[jQuery Playground](https://github.com/gSchool/boxes-jQuery-playground)