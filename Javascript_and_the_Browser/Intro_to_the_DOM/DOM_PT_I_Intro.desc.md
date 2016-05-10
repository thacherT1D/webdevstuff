# Intro to the DOM Part I: Introduction

## Objectives

***

By the end of this article you should be able to:

- Explain the relationship between the DOM and HMTL.
- Explain what the DOM is.
- What is the document.
- Explore and interact with the DOM using browser dev tools.


## An Introduction to the DOM


### What is the DOM

***

Every web browser has something called the `DOM`, where DOM is an acronym for `Document Object Model`.

The DOM is an `API`, where API is an acronym for `Application Programming Interface`. Simply put, an API is a way for programs to interact with each-other.

That's a lot of technical jargon, so let's just illustrate what an API is with an example.

Let's say I wrote a program named `fs` in the language C++. The program could read and write files to a computer's filesystem. I also wrote an API that allowed other programs to tell `fs` to read and write files.

You are writing a program in Javascript for a client, and need it to read user settings from a file.  Your Javascript code could use my `fs` API to tell my program to read and write files.

```javascript
// use the fs API to tell the fs program to read settings.json
var userSettings = fs.readFile('/path/to/settings.json');
```

My `fs` API provided your program the ability to interact with the filesystem. It provided:

- a way to read files from the filesystem.
- a way to write files to the filesystem.


Similarly, the browser's DOM API provides other programs the ability to interact with the **document**. It provides:

- a way to represent a document as an object.
- a way to interact with a document.


### What is a Document

***

So what is a document anyway?

The most commonly used document is a web page.

A document can be represented (modeled) in a number of ways:

- A document can be textually represented via HTML (how the developer sees a web page).
- A document can be visually represented via the browser window (how the user sees a web page).
- A document can be digitally represented via the DOM (how the program sees a webpage).

>Note: a web page doesn't just have to be HTML, it may also be:
- XML
- SVG

### How the DOM models the document

***

The DOM models (represents) the document as an object.

Objects are nice because programs can interact with them easily. It would be hard if we had to interact with the document by having our programs read the HTML or use computer vision to interact with the browser window.

This isn't just any object, it is a special data structure known as a **tree**.

The data structure gets its name because it can be visually represented to look like a real world tree: a tree has a trunk, the trunk has branches, each branch can have more branches.

The data structure tree has a **root node** (trunk), the root node has **nodes** (branches), a node (branch) can have other nodes (branches).

The file system is a tree. The root directory `/` is the root node (trunk). It contains several other directories, each of these is a node (branch). Each of those directories contain other directories (nodes). Just like a directory:

- A node contained in another node is known as the **child node**.
- A node that contains another node is known as the **parent node**.

Let's walk through this HTML document:

```html
<html>
  <head>
    <title>Some Title</title>
  </head>

  <body>

    <h1>Some Header</h1>

    <div>
      <p>text inside p inside div</p>
    </div>

  </body>
</html>
```

The document could be modeled as a tree:

![A tree of the html above](http://courses.cs.washington.edu/courses/cse190m/07sp/lectures/slides/images/dom.png)

Lets walk through it how the HTML maps to the tree:

1. The `<html></html>` tag becomes the root node.
1. It has 2 child nodes: `<head></head>`, `<body></body`
1. The `<head></head>` node has a child node: `<title></title>`.
1. The `<body></body>` node has 2 child nodes: `<h1></h1>`, `<div></div>`.
1. The `<div></div>` node has a child node: `<p></p>`.


## Review

***

>The DOM is a fully object-oriented representation of the web page, and it can be modified with a scripting language such as JavaScript.

The DOM (Document Object Model) is an API that provides programs with:

- a model of the document as a tree.
- a way for programs to interact with the document.

A document is a web page.


### Interact using Dev Tools / Exercise

***

**You Do:**

1. In Chrome, press `CTRL` + `ALT` + `I` to open up your dev tools.
1. Navigate to the `console` tab of the dev tools.
1. Type `document` in the console.
1. Right click on `#document` and click view in elements panel.
1. On the right select the `properties` tab, this will list all the properties of the `document` object.
1. Click the `#document` to drop down the `document` node's properties.
1. Find the property`childNodes` and expand the `html` node.
1. Find the property `childNodes` and expand the `body` node.
1. List three of the properties you find here.

**You Do:**

1. In Chrome, right click on this text.
1. Click `inspect`.
1. On the right select the `properties` tab, this will list all the properties.
1. Open up the `ol` dropdown.
1. Look through the properties to find the child node.
1. Look through the properties to find the parent node.


***

## Resources

***

- [MDN: Introduction to the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
- [MDN: DOM Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [MDN: Document API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Document)(The `document` object)


# Old lesson


[slides here](https://docs.google.com/a/galvanize.com/presentation/d/1dW_VJ9HgqKfDKekYIhNZewaC_bNHe2iSEvLiSkzwpFs/edit?usp=sharing)

Let's look at the basics of using *vanilla* JavaScript to manipulate the DOM...

### Why should you care?

DOM operations form the basis of all client-side javascript, and all frameworks including jQuery and Angular ultimately just boil down to these calls. Knowing what the DOM is and how to use it is an essential skill for web developers, and many of the in-class assignments will include these DOM operations.

### Objectives

By the end of this lesson you should be able to:

- describe javascript’s role in manipulating the DOM
- explain that HTML attributes are default (initial) values for DOM properties
- explain that DOM properties can be altered after initial page load
- explain that the DOM provides a way for programs to change the structure, style, and content on a page dynamically
- explain the difference between a text node and an element
- find an element by id, tagname, classname, and more advanced CSS selectors
- set an element’s innerHTML and text
- construct and add simple elements to the DOM
- remove elements from the dom
- detach and reattach DOM elements
- access properties of DOM elements such as text, html, value

### Key terms

1. DOM Querying
1. DOM Manipulation

## Setup

1. Create a new local project directory called "js-dom-basics".
1. Add a local git repository.
1. Create a remote repository on Github.
1. Add a *main.js* file.
1. Add a simple `console.log("sanity check!")` in *main.js* to verify that it's included correctly. **How do you test this?**
1. Finally, add/commit to your local git repo, and then push your changes to Github.

## Discussion

Look over the *index.html* file before starting...

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

## DOM Querying and Traversal

When we talk about "DOM Manipulation", what we're really talking about is 4 things:

* Finding existing DOM Nodes
* Creating new DOM Nodes
* Changing DOM Nodes that we've found or created
* Moving or Adding DOM Nodes on the DOM Tree

### Finding Existing DOM Nodes

## `getElementbyID`

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

Since we are assigning the [DOM node](https://developer.mozilla.org/en-US/docs/Web/API/Node) - `<p id="main">Just a paragraph...</p>` - to a variable, we now have a reference to it. With the node in hand, we can now access its content (tags, attributes, inner text - **what are these?**), manipulate/change any part of it (attributes, inner text, etc.), move it, or remove it altogether. JavaScript gives us this power!

Any node within the [document](https://developer.mozilla.org/en-US/docs/Web/API/Document), the root node, can be accessed via JavaScript. **What if we wanted to target (or access) the list?**

Without an `id` attribute, we need to use a different [method](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName)...

## `getElementsByTagName`

The [`getElementsByTagName()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByTagName) method returns a collection/array of nodes. These collections are "live", which means that if you add a new HTML element to the collection, it will also be added to the DOM. You can treat the collection just like you would a normal JavaScript array.

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

## `getElementsByClassName`

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

## `querySelector`

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

## `querySelectorAll`

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

## Traversing the DOM

In the last section, you were introduced to DOM traversal, which is simply the action of traveling up and down through the DOM in order to target a specific Node.

Read about traversing the DOM [here](http://javascript.info/tutorial/traversing-dom). Once done, make sure you understand, conceptually, what the following properties do:

1. `childNodes` - targets all child nodes, returning a collection
1. `firstChild` - targets the first child node
1. `lastChild` - targets the last child node
1. `parentNode` - targets the parent node from the current node
1. `nextSibling` - targets the next node at the same level as the current node
1. `previousSibling` - targets the previous node at the same level as the current node

Now, go back and experiment with each first in the console before you update the *main.js* file.

## Modifying DOM Nodes

Now that we know how to find DOM Nodes, we need to know how to actually do something to them. We actually have complete power over the entire HTML document- we can change anything we want! We can modify the CSS properties of every element individually, or we can assign them classes or IDs using Javascript. We can also alter the contents of the elements.

### Altering the Content
Let's look at this snippet of code, using the array of nodes we found before- **what do you think it does?**

```javascript
for (var i = 0; i < allListItems.length; i++) {
  console.log(allListItems[i].innerText);
}
```

**What will this do?**


```javascript
for (var i = 0; i < allListItems.length; i++) {
  console.log(allListItems[i].innerText = i);
}
console.log(allListItems);
```

Test it out!

## `innerText` vs `innerHTML`

Research this on your own. **How would you construct the Google query to find a solution quickly?**

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
  li.innerText = "another list item";
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

### Practice
 - Create a new html5 document that sources a javascript file for the project.
 - Within in the javascript file, create an object listing at least five animals and the sound they make.
 - Use DOM creation methods to create a table to list the animals. Each animal name and sound should be in its own table cell.

## Further Reading

- [The Basics of JavaScript DOM Manipulation](http://callmenick.com/post/basics-javascript-dom-manipulation)
