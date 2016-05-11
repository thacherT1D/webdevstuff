# Intro to the DOM Part IV: Creation and Deletion

## Objectives

- Move an existing DOM element
- Create brand new DOM elements
- Manipulate DOM elements in-memory
- Remove elements from the DOM

## Intro

We've just been manipulating parts of individual nodes. What about manipulating a document as a whole by adding, moving, or deleting nodes?

## Node Manipulation Methods

For each of the following methods, we'll talk about it together and then do the followup exercises

- `document.createElement()`
- `.appendChild()`
- `.insertBefore()`

### __EXERCISE__

* Use javascript to create a nav menu with links for "Home", "Products", "Clients", "About Us", and "Blog".
* Create the links in a different order than they appear on the page, such as "Products", then "Home", then "Clients", then "Blog", then "About Us"

- `_node_.cloneNode()`

### __EXERCISE__

* Simplify the creation of the previous nav by cloning and modifying nodes

- `.removeChild()`
- `.replaceChild()`

### __EXERCISE__

* After creation of the nav, use setTimeout along with these methods to remove a link, wait a second, and then replace the next link with the one previous removed


- createTextNode vs innerHTML

innerHTML allows full chunks of html to be added as the contents of an element. `createTextNode` does some basic escaping to try to just have text inserted. This should not be used as a sanitizing technique! See [this post](http://benv.ca/2012/10/02/you-are-probably-misusing-DOM-text-methods/https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=4&ved=0ahUKEwi4pcOAvtHMAhWhyoMKHVDFA60QFggyMAM&url=http%3A%2F%2Fbenv.ca%2F2012%2F10%2F02%2Fyou-are-probably-misusing-DOM-text-methods%2F&usg=AFQjCNEbdg2efNNeQiXnL7r167Ynh3yGDw&sig2=FhPQz0Xdju9N2YP2BnzQ6A).


## Exercises

After this, work on the Intro to the Dom exercise and then the DOM Checkerboard exercise.
