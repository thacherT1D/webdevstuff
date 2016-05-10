# Intro to the DOM Part II: Traversal
s
## Objectives

By the end of this lesson you should be able to:
- Query the




## Traversing the DOM


## Exercises

## Resources



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
