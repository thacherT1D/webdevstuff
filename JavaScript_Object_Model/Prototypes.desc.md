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

## Part 1: Comprehension
### 1 of 6: A Non-Code-Related Example with Customer-Support
The benefits of prototypes can be demonstrated with customer-support specialists. Imagine that a specialist has three things: an ID, email address, and a troubleshooting library. When a customer contacts a specialists, the specialists receives a question and then finds an answer in their library.

Now imagine that there are 100 specialists. Pause a moment and observe the following: a specialist's ID and email address must be unique; however, the library doesn't. In other words, we 100 of the same library. This is an inefficient due to the amount of duplication. To exacerbate this problem, whenever we modify the library, we have to update each copy!

Our specialist would be served better if there were just one library that could be accessed and updated. What we are describing is the use of a prototype!

***
#### Exercise:
In the context of object-oriented programming, what's a customer support specialist, an identification number, email address, and a library? How do these things translate to objects?
***

### 2 of 6: A Code-Related Example with JavaScript Objects
JavaScript use prototypes to remove duplication of code. Many of you have experienced the benefit of this design. Let's demonstrate it with an example:

```javascript
var obj = {};

// ...TypeError: undefined is not a function
obj.speak();
```

Invoking `speak()` outputs an error, which states that the method is `undefined`.Now, let's try to access a method named `constructor()`, which we haven't defined:

```javascript
// Object {}
obj.constructor()
```

Notice that invoking `constructor()` did not output an error! In other words, it is defined somewhere and being accessed--prototype, cough!

***
#### Exercise:
Create a list of other properties or methods that are accessed via a prototype.
***

### 3 of 6: Three Benefits of Prototypes
At this moment, we've used a non-code and code related example of prototypes. Both highlight these benefits:

- Re-use of Code
- Consistency of Code
- Real-Time Updating of Code

***
#### Exercise:
Find a pair and discover a real-world example of prototypes.
***

# Part 2: Implementation
Every object in JavaScript can access methods and properties from a [prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#Inheritance), which is an object. Our interaction with a prototype changes based on the how an object is created.

### 4 of 6: Implementing with an Object Literal (`{}`)
Let's create two instances of an object with object literals.

```javascript
var minionOne = {};
var minionTwo = {};
```

Minions can talk and love bananas. Lets create a function named `sayBanana()`:

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

### 5 of 6: Implementing with Object's Create Method (`Object.create()`)
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

### 6 of 6: Implementing with a Constructor (`[[Constructor]].prototype`)
Using `Object.create()` is reptitive. The better approach is using a constructor.

```JavaScript
function Minion() {
}

var minionOne = new Minion();
var minionTwo = new Minion();
```

Since this is another way of creating an object, we must use a different approach for modifying the prototype of these objects. We need to use a constructor's property named `prototype`:

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

# Conclusion
Constructors and prototypes provide us a mechanism for writing code that's promotes re-usability, consistency, and real-time updating of code.

# Additional Resources
- [Object Graphs](http://howtonode.org/object-graphs)
- [Object Playground](http://www.objectplayground.com/)
