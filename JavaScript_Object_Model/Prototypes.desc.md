# Prototypes
When learning how to code and, especially, learning about object-oriented programming with JavaScript, you will inevitably learn about the concept of prototypes.

## Objectives
students will be able to...

(Part 1: Comprehension)
<ol start="1">
  <li>provide a non-code-related example of prototypes</li>
  <li>provide a code-related example of prototypes</li>
  <li>describe three benefits of prototypes</li>
</ol>

(Part 2: Implementation)
<ol start="4">
  <li>access a prototype with an object literal</li>
  <li>access a prototype with `Object.create(obj)`</li>
  <li>access a prototype with a constructor</li>
</ol>

## Comprehension
### A Non-Code-Related Example
Let's demonstrate the benefits of prototypes through an absurd example.

Imagine that a librarian has two things: a name and a library. When a customer asks a librarian for a book, the librarian goes and finds the book in their library.

Now imagine there are 100 librarians. The collection of books in each of their libraries are the same, the only thing that differs are the librarian's names. You can imagine each librarian having their own library with the exact same copies of books as all other librarians. Probably not the most efficient use of city space. To exacerbate the problem, whenever a new book comes out some poor guy has to run around and add a copy of it to each of the 100 libraries around town!

Our city would be served better if there were just one library that all the librarians shared. What we are describing is the idea of a prototype!

***
#### Exercise:
In the context of object-oriented programming, write some code that would represent the idea of a librarian with a name and a library.
***

# Implementation
Every object in JavaScript can access methods and properties from a [prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Inheritance), which is an object. Our interaction with a prototype changes based on the how an object is created.

### Implementing with an Object Literal (`{}`)
Let's create two instances of an object with object literals.

```javascript
var minionOne = {};
var minionTwo = {};
```

```js
// ...TypeError: undefined is not a function
minionOne.speak()
```

Invoking `speak()` outputs an error, which states that the method is `undefined`.Now, let's try to access a method named `constructor()`, which we haven't defined:

```javascript
// Object {}
minionOne.constructor()
```

Notice that invoking `constructor()` did not output an error! In other words, it is defined somewhere and being accessed--prototype, cough!

***
#### Exercise:
Create a list of other properties or methods that are accessed via a prototype.
***

Minions can talk and love bananas. Lets create a method named `sayBanana` on our minions:

```javascript
minionOne = {
  sayBanana: function() {
    return "banana";
  }
};

minionTwo = {
  sayBanana: function() {
    return "banana";
  }
};

// "banana"
minionOne.sayBanana();

// "banana"
minionTwo.sayBanana();
```

Since the implementation of `sayBanana()` is identical for both minions, this is a moment where we would want to use a prototype.

An object literal's prototype, however, is very restrictive and automatically points to `Object.prototype`. In this context, we have to add `sayBanana()` to `Object.prototype`. This will cause untended consequences.

```javascript
Object.prototype.sayBanana = function() {
  return "banana";
};

// "banana"
minionOne.sayBanana();

// "banana"
minionTwo.sayBanana();

var gollum = {};

// "banana"
gollum.sayBanana();
```

***
#### Exercise:
Draw an in-memory diagram of the following snippet:

```javascript
var minionOne = {};
var minionTwo = {};
var gollum    = {};
var arr       = [];

Object.prototype.sayBanana = function() {
  return "banana";
};
```
***


### Implementing with a Constructor (`[[Constructor]].prototype`)

```JavaScript
function Minion() {
}

var minionOne = new Minion();
var minionTwo = new Minion();
```

The constructor pattern is another way of creating an object. Here we must use a different approach for modifying the prototype of these objects. We need to use a constructor's property named `prototype`:

```javascript
Minion.prototype.sayBanana = function() {
  return "banana";
};

// "banana"
minionOne.sayBanana();

// "banana"
minionTwo.sayBanana();
```

All minions now access `sayBanana()`; moreover, our code is semantically meaningful. We aren't creating just objects; we are creating minions.

***
#### Exercise:
Draw an in-memory diagram for the following snippet:

```javascript
function Minion() {
}

Minion.prototype.sayBanana = function() {
  return "banana";
};

var minionOne = new Minion();
var minionTwo = new Minion();
```
***


### Implementing with Object's Create Method (`Object.create()`)
We can use [`Object.create(obj)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) to limit the access to `sayBanana()`.

```javascript
var prototypeObject = {
  sayBanana: function() {
    return "banana";
  }
};

var minionOne = Object.create(prototypeObject);
var minionTwo = Object.create(prototypeObject);
```
Now only `minionOne` and `minionTwo` can access `sayBanana()`. Notice the following: Since `prototypeObject` is an object literal, its prototype points to `Object.prototype`!

***

#### Exercise:
Draw an in-memory diagram for the following snippet:

```javascript
var prototypeObject = {
  sayBanana: function() {
    return "banana";
  }
};

var minionOne = Object.create(prototypeObject);
var minionTwo = Object.create(prototypeObject);
var gollum = {};
```
***

### Three Benefits of Prototypes
At this moment, we've used a non-code and code related example of prototypes. Both highlight these benefits:

- Re-use of Code
- Consistency of Code
- Real-Time Updating of Code

***
#### Exercise:
Find a pair and discover a real-world example of prototypes.
***

# Conclusion
Constructors and prototypes provide us a mechanism for writing code that's promotes re-usability, consistency, and real-time updating of code.

# Additional Resources
- [Object Graphs](http://howtonode.org/object-graphs)
- [Object Playground](http://www.objectplayground.com/)
