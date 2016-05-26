## Objectives

- Use the `arguments` and `this` keywords inside an invoked function.
- Use the `call` and `apply` methods to invoke a function.
- Describe the two types of scope.
- Explain variable hoisting.
- Use Immediately Invoked Functional Expressions (IIFEs) to introduce scope.
- Define the following:
  - Pure Function
  - First Class Function
  - Higher Order Function
- Use the `map`, `filter`, and `reduce` methods on arrays.
- Explain what is a closure.

## How do you use the `arguments` and `this` keywords inside an invoked function?

So far, we've only used the `this` keyword in an event listener. In JavaScript, every time a function is invoked, two special keywords are created that live in the scope of that function—`arguments` and `this`.

The `arguments` keyword is an array-like object that holds each argument passed into the function. The `arguments` keyword is array-like because it has a brackets `[]` operator, but doesn't have native array methods like `push` and `pop`.

```javascript
function logArguments(a, b, c) {
  console.log(arguments); // [1, 2, 3]
}

logArguments(1, 2, 3)
```

Additionally, the `this` keyword is set to the **execution context** on which the function was invoked. In other words, if a function is attached to a property of an object and later invoked, the `this` keyword inside the function will be set to the thing left of the dot `.` operator.

```javascript
var person = {
  name: 'Elie',
  sayHi: function() {
    console.log(`${this.name} says hi!`);
  }
};

person.sayHi(); // 'Elie says hi!'
```

In this example, the `this` keyword inside the `sayHi` method refers to the `person` object, or the thing left of the dot.

### Exercise

What happens to the `this` keyword inside a function that's not explicitly invoked with an execution context? Once you think you have the answer, try turning on strict mode with `use strict`.

```javascript
var name = 'Elie';

var sayHi = function() {
  console.log(`${this.name} says hi!`); // 'Elie says hi!'
}

sayHi();
```

## How do you use the `call` and `apply` methods to invoke a function?

When you first studied data types, you learned about the primitive types (i.e. booleans, numbers, strings, null, undefined, and symbols) and the reference types (i.e. objects and arrays). At first, functions seem like a built-in programming construct like `for` loops and `if` statements.

In reality, functions are another example of a reference type. That's why functions can be assigned to variables using a **function expression**. What makes a function different than the other types is the ability to invoke its executable code. The vast majority of the time, functions are invoked using the parentheses `()` operator, passing in an optional set of arguments.

```javascript
var add = function(a, b) {
  return a + b;
};

add(1, 2); // 3
```

But a function can also be invoked with the `call`, and `apply` methods. Both are very similar in purpose, but have a slightly different input.

The `call` method takes a `this` context as well as the arguments immediately after.

```javascript
add.call(null, 1, 2); // 3
```

While the `apply` method takes a `this` context as well as an array of arguments to the function.

```javascript
add.apply(null, [1, 2]); // 3
```

But when would these techniques be useful? Well, imagine a scenario where you have two objects that are nearly identical except for their `name` property.

```javascript
var person1 = {
  name: 'Elie',
  sayHi: function() {
    console.log(`${this.name} says hi!`);
  }
};

var person2 = {
  name: 'Janey',
  sayHi: function() {
    console.log(`${this.name} says hi!`);
  }
};
```

Looks like the definition of the `sayHi` method duplicated twice. Is it possible to borrow the `sayHi` method from `person1`, but instead of `this.name` referring to Elie, have it refer to Janey? It sure is, with the help of the `call` method!

```javascript
var person1 = {
  name: 'Elie',
  sayHi: function() {
    console.log(`${this.name} says hi!`);
  }
};

var person2 = {
  name: 'Janey'
}

person1.sayHi.call(person2);
```

## What are the two types of scope?

A **scope** is a list of variables and functions available for use on the current line of execution. There are two types of scope in ECMAScript 5.

1. Global scope
2. Function scope

Any variable or function defined in the global scope is available for use anywhere in the program. In the browser, the `window` global object refers to the global scope.

```javascript
var name = 'Mary';

console.log(window);
```

In addition, when a function is invoked, an isolated function scope is created just for that invocation.

```javascript
var a = 'outer';

function myFunction() {
	var b = 'inner';

  console.log(a); // outer
  console.log(b); // inner
}

myFunction();

console.log(a); // outer
console.log(b); // Uncaught ReferenceError: b is not defined
```

### Name Collisions

It's possible to have two variables named the same thing, but on different scopes. It's considered a bad habit to write code this way because it becomes very confusing, but it's good to know that the following is perfectly legal:

```javascript
var globalVariable = "The global version";

function test() {
    var globalVariable = "The impostor";
    console.log(globalVariable);
}

test();
console.log(globalVariable);
```

When we run this code, when we call the function `test` then "The impostor" is printed to our screen. When we `console.log(globalVariable);` then "the global version" was printed. Is this what you expected?  In JavaScript, the most local version of a variable is used naturally by the interpreter. What will happen when we run this code?

```javascript
var globalVariable = "The global version";

function test() {
    globalVariable = "The impostor";
    console.log(globalVariable);
}

test();
console.log(globalVariable);
```

This time, we overwrote the global variable from within our function and so printed "The impostor" twice.

### Declaring variables in a function

JavaScript has this "feature" called variable hoisting. When it reads a function, it first processes variable declarations (just the declarations, not assignments). It then runs the function. This means that variables can actually be assigned before they are actually declared (:facepalm:).

```javascript
function myFunction() {
	console.log(amILocal);
	amILocal = 'maybe';
	// Any code here
	var amILocal = 'oh wait...yes I am.';
}
```

What does this mean? There are a few reasons why it's important to know this.

* It's important and understand why a programming language (in this case JavaScript) sucks.
* We cannot make an assumption that a variable is global without checking for variable declarations inside the function. (For this reason, many professionals recommend declaring all variables at the top of the function).
* We cannot expect an error to be thrown on an unreferenced variable. The variable will be `undefined` if it is declared below.

### ES6 to the rescue.

ES6 has provided a better mechanism for declaring variables and scope called `let`. The [documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) on MDN explains the differences.

### When to use scope

A rule of thumb is that every variable should be as local as possible. Unless you absolutely need to share some piece of information across may different functions, then you should use a local variable. Here are two good reasons:

1. Global Scope things can be changed anytime, anywhere, by any code. This makes reasoning about (and debugging changes in) such variables difficult.
2. "Garbage Collection" is what allows JavaScript to clean up the memory it's using. Variables in global scope cannot be "garbage collected". This means that global scope can pollute your memory with things that are no longer being used, which may cause your program to crash if too much information gets stored.

That said, there are good examples of things that belong on global scope. Take the 'window' object in any browser for example. Window is a collection of functions and variables related to the current 'window' of your browser. In a modern browser, every tab has it's own "global scope" and as a result, it's own `window` object.

Open your developer console and try the following:

```
window.location.hostname // This prints the host of whatever website you're on.
window.document          // This is a reference to the HTML document in JavaScript
window.screen            // This is a bunch of information about the screen size of our browser
```

This information makes sense for any Javascript program running to have access to. You may want to know the screen size, or something about the HTML from any point in your JavaScript code.

## Immediately Invoked Functional Expressions (IIFEs)

One of the ways we can introduce scope is by creating an **Immediately Invoked Functional Expression** (IIFE). With IIFEs, we are wrapping code in a function, creating a new scope, and invoking that function immediately when created.

Ever wondered why you have seen entire files wrapped in an IIFE?

```javascript
(function () {
	// ...All Code Here...
})();
```

By wrapping the entire file in an IIFE, we are removing every variable declared from the global scope.

We can use IIFEs with arguments as well. Consider the following code. What do you think the final output will be?

```javascript
var arr = [];
for(var i = 0; i < 5; i++) {
	arr.push(function() {
	  console.log(i);
	});
}
for(func of arr) {
	arr();
}
```

We can solve this with an IIFE.

```javascript
var arr = [];
for(var i = 0; i < 5; i++) {
	(function (j) {
		arr.push(function() {
		  console.log(j);
		});
	})(i);
}
for(func of arr) {
	arr();
}
```

# Higher Order Functions

Higher-order functions describe functions that meet one of two criteria:

1. A function that returns a function
2. A function that accepts a function as an argument

The concept of "High Order Functions" has it's roots in mathematics (specifcally [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus)). These types functions are very common in JavaScript, but are often a tricky concept when first approached. The crucial lesson is that in JavaScript, variables can contain a function. Functions are just like Number, String, or other datatypes in this way. Try using this simple high order function which returns a function:

```
function returnAFunction() {
	return function(){
		console.log("I'm an inner function!");
	}
}

var returnedFunction = returnAFunction();
returnedFunction();

// Similarly, you can do
returnAFunction()();
```

There are four major functions that get often used are `forEach`, `map`, `filter`, and `reduce`.

## `forEach`

## `map`

## `filter`

## `reduce`

# The magic of closures

Closures are a feature of high order functions. To understand closures, lets revist our previous example of a high order function, but make one modification:

```javascript
function returnAFunction() {
	var closedOver = "This information is closed over";

	return function(){
		console.log(closedOver);
	}
}

var returnedFunction = returnAFunction();
returnedFunction();

// Similarly, you can do
returnAFunction()();

// This however, breaks
console.log(closedOver);
```

This is called a __closure__ because the function that is returned (`returnedFunction`) also contains information that was in its scope. When the function was created at the `return` statement, the variable `closedOver` had a value. That value is said to be "closed over" because the inner function retains a reference to it. Lets look at another example of a closure:

```javascript
function closeMe() {
  var count = 0;

	return function() {
	   return count++;
	}
}

var counter = closeMe();
var secondCounter = closeMe();

console.log(counter());                 // ?
console.log(counter());                 // ?
console.log(counter());                 // ?
console.log(counter());                 // ?
console.log("=========");
console.log(secondCounter());           // ?
console.log(secondCounter());           // ?
console.log(secondCounter());           // ?
console.log(secondCounter());           // ?
```
Our Output is:

```
0
1
2
3
=========
0
1
2
3
```

As we can see, __each__ of the returned functions have closed over their own environment. The returned functions each have a unique scope that was closed over. The `var count` inside of `secondCounter` is not the same `var count` inside of `counter`.

# Conclusion

Functions in JavaScript are __very powerful__ and in many ways they are more usable than functions in other languages. That said, many of these topics are complex, and confusing. This high level tour of functions is meant to give you an overview of just what's possible in JavaScript. As we continue towards making real applications, we'll be finding uses for all of these different function styles. For now, make sure you're comfortable with the notion of declaring and calling functions.

# Resources

- [http://reactivex.io/learnrx/](http://reactivex.io/learnrx/)

# Exercise

[https://github.com/gSchool/function-tests](https://github.com/gSchool/function-tests)
