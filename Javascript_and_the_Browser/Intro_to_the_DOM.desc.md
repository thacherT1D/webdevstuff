# JavaScript and the DOM

## Objectives

By the end of this lesson you should be able to:

- Describe what the DOM is and JavaScript’s role in manipulating the DOM
- Alter DOM properties after initial page load
- Find an element by id, tag name, class name, and more advanced CSS selectors
- Set an element’s text content.
- Construct and add elements to the DOM
- Remove elements from the dom
- Detach and reattach DOM elements

## What is the DOM?

The Document Object Model (DOM) is a cross-platform convention for representing and interacting with HTML. Originally, Netscape Navigator and Internet Explorer competed for the browser and invented their own version of a DOM. It was then standardized by the W3C about one year after ECMAScript 1.0 was released. JavaScript has a way of accessing the DOM. This allows us to combine HTML and JavaScript together and create dynamic web pages.

DOM operations form the basis of all client-side javascript, and all frameworks including jQuery and Angular ultimately just boil down to these calls. Knowing what the DOM is and how to use it is an essential skill for web developers, and many of the in-class assignments will include these DOM operations.

### Fun Fact: Browser Wars

The two main competitors during the early browsers were Netscape Navigator and Internet Explorer. Since then more browsers have entered the market compete on some level. Here is a map highlighting countries and their most popular browser.

![Browser Map](https://upload.wikimedia.org/wikipedia/commons/b/ba/Browser_Market_Map_June_2015.svg)

Source: StatCounter https://en.wikipedia.org/wiki/Browser_wars June 2015

## Recall that HTML is a Tree

Recall in our Introduction to HTML article that HTML can be thought of as a tree structure. Each element has a _parent_, it sometimes has _siblings_ and it also may have _children_.

![HTML Tree](http://www.webstepbook.com/supplements/slides/images/dom_tree.gif)

**Exercise** Look at the code below. Can you give examples of parent-child relationships and sibling relationships?

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript and the DOM - a primer</title>
  </head>
  <body>

    <section>

      <h1>Just a header</h1>

      <p id="main">Just a paragraph...</p>

      <ul>
        <li class="odd">item 1</li>
        <li class="even">item 2</li>
        <li class="odd">item 3</li>
        <li class="even">item 4</li>
        <li class="odd">item 5</li>
      </ul>

      <button id="main-button">Just a button</button>

    </section>

    <script type="text/javascript" src="main.js"></script>

  </body>
</html>
```

## Setup

1. Create a new local project directory called "js-dom-basics".
1. Add a local git repository.
1. Add an *index.html* file.
1. Finally, add/commit to your local git repo

Let's start with a simple HTML boilerplate.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript and the DOM</title>
  </head>
  <body>
  </body>
</html>
```

## `document` object

Open up the inspector by pressing Command + Option + I. In the console, type in the following.

`document`

The document is the root access point to all of the HTML. It even includes the DocType. You can access the root `<html>` node by calling `document.documentElement` or `document.childNodes[1]`.

**Exercise** What type is `document`?

## Node Interface

The document and each HTML element (tag) inherits a Node interface. The MDN provides a [comprehensive overview](https://developer.mozilla.org/en-US/docs/Web/API/Node) of what you can do with a node. We'll touch on a few instances here.

### `childNodes`

You can access a node in the `childNodes` property. It is an array-like object. This means that you can access its elements by index and use the provided `length` property, but you do not have any built in Array functions.

**Exercise** Can you remember of another array-like object we talked about?

It's _**important to note**_ that the these properties are _live_. This means that _changes in the DOM affect the array_.

#### More Children

There are multiple shortcuts in accessing children.

* `firstChild`
* `lastChild`

### `parentNode` vs `parentElement`

You can access your parent by using the `parentNode` property. `parentNode` and `parentElement` almost always return the same thing as almost all nodes are also elements. There's one notable exception.

```javascript
document.documentElement.parentNode     // Document
document.documentElement.parentElement  // null
```

The parent node can be `null` for a couple reasons:

* You are in the root document node.
* The node you are looking at has not been added to the document and is the topmost node.

### Siblings

Within a Node, you can access its siblings. Siblings share the same parent node.

* `nextSibling`
* `previousSibling`

### Node Name/Tag Name

You can access the node name using `nodeName`. For HTML elements, this is the tag name (a, p, h1, div, etc.). HTML elements can also access the tag name with `tagName`. The tag name will be in upper case form.

### Text Content

You can retrieve the text content between the opening and closing tag using the `textContent` property.

#### Comparison to `innerText`

You may often see code using the `innerText` property. `innerText` takes into account the layout which leads to poor performance and it is not a standard.  We would recommending not using `innerText` unless specifically needed.

### Attributes

You can access an HTML tag's attributes with [`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) and [`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) functions. You can also read from the [`attributes`](https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes) property.

## DOM Querying and Traversal

When we talk about "DOM Manipulation", what we're really talking about is 4 things:

* Finding existing DOM Nodes
* Creating new DOM Nodes
* Changing DOM Nodes that we've found or created
* Moving or Adding DOM Nodes on the DOM Tree

## Finding Existing DOM Nodes

### `getElementbyID`

Add the following code to your JavaScript file:

```javascript
var firstParagraph = document.getElementById('main');
console.log(firstParagraph);
```

Open the JavaScript console in Chrome. **What do you see?**

```javascript
<p id="main">Just a paragraph...</p>
```

**What does this give us?**

Since we are assigning the [DOM node](https://developer.mozilla.org/en-US/docs/Web/API/Node) - `<p id="main">Just a paragraph...</p>` - to a variable, we now have a reference to it. With the node in hand, we can now access its content (tags, attributes, text content), manipulate/change any part of it (attributes, text content, etc.), move it, or remove it altogether. JavaScript gives us this power!

Any node within the [document](https://developer.mozilla.org/en-US/docs/Web/API/Document), the root node, can be accessed via JavaScript.

Without an `id` attribute, we need to use a different [method](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName)...

## `getElementsByTagName`

The [`getElementsByTagName()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName) method returns a collection/array of nodes. These collections are "live", which means that if you add a new HTML element to the collection, it will also be added to the DOM.

Add the following code to your JavaScript file:

```javascript
var allUnorderedLists = document.getElementsByTagName('ul');
console.log(allUnorderedLists);

var firstUnorderedList = allUnorderedLists[0];
console.log(firstUnorderedList);
```

Again, open your JS console. **What do you see?**

```javascript
[ul]
ul
```

The first example outputs the *entire* collection while the second example outputs the *first* (and only) element in the collection.

**Can you guess what the following code will do?**

```javascript
allListItems = document.getElementsByTagName('li');
```

Test it out. Assign it to a variable called `allListItems`, and then log the variable to the console. If all went well, you should see a collection that contains *all* `li`s.

Finally, let's loop through the collection, outputting each *individual* element to the console:

```javascript
for (var i = 0; i < allListItems.length; i++) {
  console.log(allListItems[i]);
}
```

### `getElementsByClassName`

The [`getElementsByClassName()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) returns an array-like object of all child elements which have all of the given class names. When called on the document object, the complete document is searched, including the root node. You may also call getElementsByClassName() on any element; it will return only elements which are descendants of the specified root element with the given class names.

Add the following code to your JavaScript file:

```javascript
var evenElements = document.getElementsByClassName('even');
console.log(evenElements)

var oddElements = document.getElementsByClassName('odd');
console.log(oddElements)

var firstEvenElement = evenElements[0];
console.log(firstEvenElement)

var firstOddElement = oddElements[0];
console.log(firstOddElement)
```

Again, open your JS console. **What do you see?**

```javascript
[li.even, li.even]

[li.odd, li.odd, li.odd]

<li class=​"even">​item 2​</li>​

<li class=​"odd">​item 1​</li>​
```

The first two examples output the *entire* collections while the second two examples output the *first* element in the collection.

Similar to `getElementsByTagName`, the collection returned from `getElementsByClassName` can be iterated over.

### `querySelector`

The [`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
) Returns the first element within the document that matches the specified group of selectors. The argument you pass into `querySelector` should be a valid CSS query.

Add the following code to your JavaScript file:

```javascript
var main = document.querySelector('#main');
console.log(main);
```
Open your JS console. **What do you see?**

```javascript
<p id="main">Just a paragraph...</p>
```

```javascript
var firstOddElement = document.querySelector('.odd');
console.log(firstOddElement);
```
Open your JS console. **What do you see?**

```javascript
<li class="odd">item 1</li>
```

### `querySelectorAll`

The [`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) Returns a list of the elements within the document that match the specified group of selectors. The object returned is a NodeList.

Add the following code to your JavaScript file:

```javascript
var oddAndEvenElements = document.querySelectorAll('.odd, .even');
console.log(oddAndEvenElements);
```
Open your JS console. **What do you see?**

```javascript
[<li class=​"odd">​item 1​</li>​, <li class=​"even">​item 2​</li>​, <li class=​"odd">​item 3​</li>​, <li class=​"even">​item 4​</li>​, <li class=​"odd">​item 5​</li>​]
```

Both `querySelector` and `querySelectorAll` accept selectors which can be [very specific and powerful](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector#ExamplePowerful).

## Modifying DOM Nodes

Now that we know how to find DOM Nodes, we need to know how to actually do something to them. We actually have complete power over the entire HTML document- we can change anything we want! We can modify the CSS properties of every element individually, or we can assign them classes or IDs using Javascript. We can also alter the contents of the elements.

### Altering the Content
Let's look at this snippet of code, using the array of nodes we found before- **what do you think it does?**

```javascript
for (var i = 0; i < allListItems.length; i++) {
  console.log(allListItems[i].textContent);
}
```

**What will this do?**


```javascript
for (var i = 0; i < allListItems.length; i++) {
  console.log(allListItems[i].textContent = i);
}
console.log(allListItems);
```

Test it out!

## Manipulation

Moving on from accessing nodes and traversing the DOM, let's look at manipulating elements. First off, each node can be manipulated via its properties/HTML attributes.

Add the following code to the *main.js* file:

```javascript
document.getElementById('main').style.backgroundColor = "goldenrod";
```

**What happened when you refreshed the page?**

> Notice how we used a CSS property name in camelCase (`backgroundColor`), rather than in dash-case (`background-color`), so that they are accessible within the JavaScript file.

Play around with some other style properties to manipulate the DOM. For example, change the background color of each of the list items.

**Don't know what to manipulate?**

With the JavaScript Console open, follow these steps:

1. Again, target the node with an id of `main` - `var propertyTest = document.getElementById('main')`
1. Then type `propertyTest.style.`, and as soon as you type the dot (`.`) at the end, a drop down list will appear, showing you the available properties based on the `style` property:

1. Choose something applicable to that specific HTML tag and add a new style. Simple, right?
1. Practice!

## Creating new Elements

#### `createElement`

[`createElement()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) does just as the name suggests - it creates an [element node](http://www.w3schools.com/jsref/prop_node_nodetype.asp).

Let's add another list element to the unordered list:

1. Create the element

  ```javascript
  var li = document.createElement('li');
  console.log(li);
  ```

  You should now have a `<li></li>` tag.

1. Add text to the `li` element

  ```javascript
  li.textContent = "another list item";
  console.log(li);
  ```

  The new element should now have text - `<li>another list item</li>`

1. Add child element to the list

  ```javascript
  firstUnorderedList.appendChild(li);
  console.log(firstUnorderedList);
  ```

  The list should now look like:

  ```html
  0
  1
  2
  3
  4
  another list item
  ```

**What if you wanted to prepend the element?**

```javascript
var anotherListElement = document.createElement('li');
anotherListElement.innerText = "prepend";
firstUnorderedList.insertBefore(anotherListElement, firstUnorderedList.firstChild);
console.log(allListItems);
```

Make sense? Prepend another element. Try removing an element with `removeChild()`. Once done, show an instructor.

## Practice

See [https://github.com/gSchool/js-dom-tests](https://github.com/gSchool/js-dom-tests).


## Further Reading

- [The Basics of JavaScript DOM Manipulation](http://callmenick.com/post/basics-javascript-dom-manipulation)