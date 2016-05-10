# Intro to the DOM Part III: Manipulation

## Objectives

## Manipulating the DOM

## Exercises

## Resources

- [The Basics of Javascript DOM Manipluation](http://callmenick.com/post/basics-javascript-dom-manipulation)



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
