## Objectives

* Explain why you might use jQuery over Javascript.
* Download and include jQuery into an HTML document.
* Find elements by id, tag name, class name, and more advanced selectors using jQuery.
* Set an element’s text content and attributes using jQuery.
* Set an element's CSS styles using jQuery.
* Construct and add elements to the DOM using jQuery.
* Remove and elements from the DOM using jQuery.
* Traverse the DOM using jQuery.

<hr>

> jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers. With a combination of versatility and extensibility, jQuery has changed the way that millions of people write JavaScript.

[jQuery](http://jquery.com/) is a widely popular library that provides you and API for manipulating the DOM in a browser.

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

2. Return values from functions like `document.getElementsByTagName` or `document.querySelectorAll` are NodeLists, which are *array-like* **objects** which lack much of the functionality that arrays have. Specifically, array methods like `forEach`, `map`, etc. don't exist on these.

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

## Finding elements in the DOM

The first thing that is necessary to be effective with jQuery is to be able to find elements in the DOM. jQuery provides a plethora of selectors to make that task possible.

> A selector is used in jQuery to select DOM elements from a DOM document. That document is, in most cases, the DOM document present in all browsers, but can also be an XML document received via Ajax.

Think back to functions like `getElementById()` and `getElementsByClassName()` and recall how these interact with the DOM and return nodes. jQuery has its own selectors that behave in similar ways. Let's visit there docs and scan through some of these:
* [jQuery Selectors](http://api.jquery.com/category/selectors/)

While you may be thinking, _Don't we have `querySelector` and `querySelectorAll`?_ Keep in mind two things:

* jQuery was released before `querySelector` and `querySelectorAll` (I know right?!). It had its own engine built in to analyze the queries.
* jQuery has even more expressive selectors than `querySelector` and `querySelectorAll`.

One of the nice things about jQuery selectors is you select DOM elements the same way you write CSS selectors.

#### Find by ID

```js
var $box = $('#box');
```

#### Find by Class

Selecting nodes in the DOM by class:

```js
var $boxes = $('.box');
```

#### Find by Attribute

```js
var x = $('div[hidden]');
```

There are [tons more](http://api.jquery.com/category/selectors/) selectors you can use and chain to find exactly the nodes you need.

<br>
#### 💪 Exercise

Head over to [jQuery's website](http://api.jquery.com/category/selectors/) (you know they have jQuery loaded on it 💰). Use the browser console to interact with the DOM.

* What gets returned when you target the ID `container` using jQuery? How about using vanilla JS?
* What gets returned when you target the class `menu-top-container` using jQuery? How about using vanilla JS?

### The jQuery Object

> When creating new elements (or selecting existing ones), jQuery returns the elements in a collection. Many developers new to jQuery assume that this collection is an array. It has a zero-indexed sequence of DOM elements, some familiar array functions, and a .length property, after all. Actually, the jQuery object is more complicated than that.

This jQuery object is different than the node that gets returned with `getElementById` in that a jQuery object has other jQuery methods defined on it. You probably noticed that when using `getElementsByClassName` that you also got back what looked like a JS array. It however is not. What you got back there was an HTMLCollection and will *not* share the same methods available to you as with JS array.

This jQuery object is what allows you to chain methods.


## [DOM Creation](https://api.jquery.com/jQuery/#jQuery-html-ownerDocument)

Creating DOM Elements with jQuery is super easy! Just insert a tag into the `$` function. It should be able to handle any valid HTML string.

```js
var myDiv = $('<div class="active">');
```

<hr>

## Attributes/CSS/Display

Modifying a DOM Element can be difficult at times using native functions. jQuery offers a [plethora of methods](http://api.jquery.com/category/manipulation/) to make modifying the DOM super simple.

### [.toggleClass()](http://api.jquery.com/toggleClass/)

Say you have a DOM Element with the `className` `"box active red big"`. How would you detect and remove the class active from the middle of the string if it exists and add it if it doesn't exist? Fortunately with jQuery you can just use `.toggleClass()` to do that for you.

```js
$('#myButton').click(function () {
  $(this).toggleClass('active')
})
```

### [.attr()](http://api.jquery.com/attr/)

Use `.attr()` to change a DOMElement's attribute:

```js
console.log($('img').attr('title')) // print out the first img's title
$('img').attr('title', 'image hover text for the win!'); // set the title text on all images
```

### [.text()](http://api.jquery.com/text/)

The `.text()` function to get and set the text content on the element.

### [.val()](http://api.jquery.com/val/)

The `.val()` function to get and set the value on the element (usually used for an input's `value` property).

### [.html()](http://api.jquery.com/html/)

The `.html()` function to get and set the html inside an element. This is useful when making a change inside an element that's composed of multiple elements.

### [.css()](http://api.jquery.com/css/)

Use `.css()` to change the style attribute of a DOMElement:

```js
var color = $('div').css('background-color'); //get the first div background-color
$('div').css('background-color', 'red'); //set all div's background colors
```

### [.prop()](http://api.jquery.com/prop/)

Use `.prop()` to change a property of a DOMElement:

```js
var isChecked = $('input[type="checkbox"]').prop('checked');
$('input[type="checkbox"]').prop('checked', true);
```

### [.height()](http://api.jquery.com/height/), [.innerHeight()](http://api.jquery.com/innerHeight/), [.outerHeight()](http://api.jquery.com/outerHeight/http://api.jquery.com/height/)

Use `.height()` to get the height of the content area.

Use `.innerHeight()` to get the height of the content area including the padding.

Use `.outerHeight()` to get the height of the content area including the padding and border (the margin is optional).

### [.width()](http://api.jquery.com/width/), [.innerWidth()](http://api.jquery.com/innerWidth/), [.outerWidth()](http://api.jquery.com/outerWidth/)

Use `.width()` to get the height of the content area.

Use `.innerWidth()` to get the height of the content area including the padding.

Use `.outerWidth()` to get the height of the content area including the padding and border (the margin is optional).

### [.offset()](http://api.jquery.com/offset/)

Use `.offset()` to get the `left` and `top` coordinates (in pixels) of an element in relation to the _document_.

### [.position()](http://api.jquery.com/position/)

Use `.position()` to get the `left` and `top` coordinates (in pixels) of an element in relation to the _offset parent_, that is, the parent that is closest positioned element (that is with a `position` CSS property equal to `relative`, `absolute`, or `fixed`).

### [.offsetParent()](http://api.jquery.com/offsetParent/)

Use `.offsetParent()` to get the offset parent of an element. This is useful in identifying the element for which `position()` is based off of.

### [.scrollTop()](http://api.jquery.com/scrollTop/), [.scrollLeft()](http://api.jquery.com/scrollLeft/)

Use `scrollTop()` to get the number of pixels we have scrolled from the top.

Similarly, `scrollLeft()` produces the number of pixels we have scrolled from the left.

<br>
<hr>

## DOM Manipulation

### .prepend() .append() .insertBefore() .insertAfter() .before() .after()

All of these methods are used for inserting a DOM Element into the DOM at various spots.

[`.prepend()`](http://api.jquery.com/prepend/) and [`.append()`](http://api.jquery.com/append/) insert as the first and last child of the target element.

[`.insertBefore()`](http://api.jquery.com/insertBefore/) and [`.insertAfter()`](http://api.jquery.com/insertAfter/) insert before or after as siblings of the target element.

[`.before()`](http://api.jquery.com/before/) and [`.after()`](http://api.jquery.com/after/) are the same as `.insertBefore()` and `.insertAfter()`.

### [.remove()](http://api.jquery.com/remove/), [.detach()](http://api.jquery.com/detach/)

The `.remove()` function removes a DOM element from the DOM.

The `.detach()` function is very similar to `.remove()`, but it returns the removed jQuery object that you can use later.

### [.clone()](http://api.jquery.com/clone/)

The `.clone()` function makes a deep copy clone of the selected DOM Element.

### [.empty()](http://api.jquery.com/empty/)

the `.empty()` method will clear out the contents of any DOM Element.

```js
$('div').empty() //clear out all divs
```

### [.replaceAll()](http://api.jquery.com/replaceAll/), [.replaceWith()](http://api.jquery.com/replaceWith/)

Use `replaceAll` to replace all the target elements _with_ a source element.

Use `replaceWith` to replace a source element _with_ a target element.

<br>
<hr>

## DOM Traversing

### [.get()](http://api.jquery.com/get/)

Use `.get()` with an index to get an item out of the jQuery collection that is the native DOM element.

### [.eq()](http://api.jquery.com/eq/)

Use `.eq()` with an index to get an item out of the jQuery collection that is a jQuery object.

### [.parent()](http://api.jquery.com/parent/), [.parents()](http://api.jquery.com/parents/)

Use `.parent()` to get the parent element.

Use `.parents()` to get all the parents element to a particular element.

### [.children()](http://api.jquery.com/children/)

Use `.children()` to get the children of an element. It goes only one level deep.

### [.first()](http://api.jquery.com/first/), [.last()](http://api.jquery.com/last/)

Use `.first()` to get the first child.

Use `.last()` to get the first child.

### [.find()](http://api.jquery.com/find/)

Use `.find()` to search through the children of an element. It goes all the way into the tree.

### [.next()](http://api.jquery.com/next/), [.nextAll()](http://api.jquery.com/nextAll/), [.prev()](http://api.jquery.com/prev/), [.prevAll()](http://api.jquery.com/prevAll/), [.siblings()](http://api.jquery.com/siblings/)

Use `next()` to get the next sibling.

Use `nextAll()` to get all the siblings after the element.

Use `prev()` to get the previous sibling.

Use `prevAll()` to get all the siblings before the element.

Use `siblings()` to get all the siblings of an element.

### [.has()](http://api.jquery.com/has/)

Use `.has()` to filter the set by a selector.

### [.is()](http://api.jquery.com/is/)

Use `.is()` to check if the matched set matches a specific selector.

### [.not()](http://api.jquery.com/not/)

Use `.not()` to remove items from the set of match elements by a selector or function.

### [.filter()](http://api.jquery.com/filter/)

Use `.filter()` to only include items from the set of match elements by a selector or function.

### [.closest()](http://api.jquery.com/closest/)

Use `.closest()` to get the closest element by checking itself and all of its ancestors.

## Other awesome Methods

### [.show()](http://api.jquery.com/show/), [.hide()](http://api.jquery.com/hide/), [.toggle()](http://api.jquery.com/toggle/)

### [.animate()](http://api.jquery.com/animate/)

### [.fadeIn()](http://api.jquery.com/fadeIn/), [.fadeOut()](http://api.jquery.com/fadeOut/)

### [.slideDown()](http://api.jquery.com/slideDown/), [.slideUp()](http://api.jquery.com/slideUp/)

<br>
<hr>

### 📖 Homework

[Javascript DOM Manipulation](https://github.com/gSchool/js-dom-tests)

#### 📚 Resources

* [jQuery docs](https://api.jquery.com/)
* [jQuery CheatSheet](https://oscarotero.com/jquery/)
* [jQuery Selectors](http://api.jquery.com/Types/#Selector)
* [jQuery object](http://api.jquery.com/Types/#jQuery)
* [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection)
* [You might not need jQuery](http://youmightnotneedjquery.com/)
* [jQuery Playground](https://github.com/gSchool/boxes-jQuery-playground)
