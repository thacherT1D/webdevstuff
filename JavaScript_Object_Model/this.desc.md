# `this`

## Objective

By the end of the lesson, students should be able to give a concise explanation of what `this` is in JavaScript, as well as construct examples to illustrate the varying contexts for `this`.

## Guiding Questions

_What questions should students be able to answer by the end of the lesson?_

  * Provide an example that `console.log`s the value of `this` and return the global execution context (runtime).
  * When a method is executed, what is the value of `this`?
  * In the context of a constructor, what is `this`?
  * Explain how `this` is being used in the context of the following code snippet:

  ```js
  var obj = {
    track: null,
    play: function(track) {
      this.nowPlaying = track;
    },
    stop: function() {
      this.nowPlaying = null;
    }
  }
  ```
  * How would you explain `this` to a fellow JavaScript beginner?

## Lesson Activities

### What is `this` used for?

Used all the time, basically. Used for referencing elements via jQuery, used for referencing the parent object a function is contained, used for accessing window if you're feeling adventurous!

Used to generate lots of bugs in your code. `this` referencing the wrong thing will cause problems for you more than almost anything else.

`this` is always going to reference your current code execution context, unless it's been overridden.

What contexts?

#### Context #1

The simplest binding for the value of this is the binding to the object representing the global execution context. When a function is declared on its own and then executed, the binding is to the global value for this. But it might be a better starting point to look at those global values. To better see the global value for this, the consoles for Chrome and Node.js are helpful.

What does this look like in Node? What's `this` in a node shell?

What happens here in a node shell:

```js
function setFoo (fooVal) {
  this.foo = fooVal;
}

setFoo("bar");
```

How about in Chrome?

#### Context #2

The next way in which the value of `this` is determined is in the context of a method on an object.

```
var myBankAccount = {
  accountHolder: 'Instructor 1',
  checkingBalance : 100,
  savingsBalance : 200
};
```

**Exercise:** Let's add a method to this object that adds money to the checking account.

How do we invoke this method?

#### Context 3

So far, every object used has been declared explicitly like `var myObj = {some: 'object'}`, but what about when you want to create lots of objects that have a similar _blueprint_? One mechanism for creating a blueprint by which new objects can be made is a _constructor_. The language around the concept is that we want a function that allows us to _construct_ new objects from it. That is, when we call the function, the returned value should be a JavaScript object.

Let's say we have a few houses:

```
var firstHouse = {
  color: 'red',
  windows: false
};

var secondHouse = {
  color: 'blue',
  windows: true
};

var thirdHouse = {
  color: 'yellow',
  windows: true
};

...
```

How do we add a function to paint the houses? Let's add that to each of these houses.

A better approach would be if there was a "factory" to create each new house with and have that factory contain the attributes or _properties_ of each house, as well as the _behaviors_ associated with that house (simply `paintHouse` for now). In JavaScript the "factory" is called a _constructor_.

Let's create a constructor:

```
function House(color, windows) {
  this.color = color;
  this.windows = windows;
}
```

Creating a new house is simple, but requires the use of a special keyword; `new`. Tying it back to the earlier example the three houses now come to life by using the constructor:

```
var firstHouse = new House('red', false);
var secondHouse = new House('blue', true);
var thirdHouse = new House('yellow', true);
```

Suppose now that the `paintHouse` functionality needed to be added back in. One approach would be to add `paintHouse` to the constructor so that all instances of the `House` constructor will have access to that behavior. Display the following and ask the question placed in the comments (potentially pointing at the code):

```
function House(color, windows) {
  this.color = color;
  this.windows = windows;
  this.paintHouse = function (newColor) {
    // in here, what is the value of `this`
  }
}
```

#### Context 4

The final approach for determining the value of `this` is by setting the value of `this` explicitly. JavaScript functions may themselves have methods (since Functions in JavaScript are a special case of objects). 

Let's take a look at: [MDN `Function.prototype.apply()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) before we pick this back up.

One benefit of `apply` is that its second argument is an array of arguments, there is a lot of alliteration here so remembering "apply for arrays" can be helpful as other methods on functions come into the mix.

```
var chessMatch = {
  challenger: 'Gary Kasparov',
  opposition: 'Bobby Fischer'
};

function nukeTheOpposition() {
  this.opposition = null;
}

nukeTheOpposition.apply(chessMatch, []);
console.log(chessMatch);
```

**Exercise:** How can we use apply to pass an array to a function that otherwise doesn't accept one?:

```
console.log(Math.max(6,8,10,12));
var numberArray = [6, 8, 10, 12];
console.log(Math.max(numberArray));
```


#### Bugs in the land of `this`

What is going on here?!

```
var myBankAccount = {
  checkingBalance: 100,
  makePurchases: function(purchases) {
    purchases.forEach(function(purchase) {
      this.checkingBalance -= purchase;
    });
  }
}

console.log(myBankAccount.checkingBalance);
myBankAccount.makePurchases([5, 10, 15]);
console.log(myBankAccount.checkingBalance);
```

## Assessment
  * What is `this` in JavaScript?
  * Provide a code example that uses `this` in the context of a method which refers to its own properties.
  * Provide a code example that uses `this` in the context of a constructor to set initial values for an instance.

**Exercise:** *A Vector Type* in chapter 6 of eloquent JS. 

## Additional Resources

_Where can you go to learn more?_

  * [Understanding the “this” keyword in JavaScript](http://toddmotto.com/understanding-the-this-keyword-in-javascript/)
  * [StackOverflow "What does 'this' mean?"](http://stackoverflow.com/questions/4195970/what-does-this-mean)
  * ["What is 'This' in JavaScript?"](http://stantona.github.io/blog/2013/01/02/what-is-this-in-javascript/)
