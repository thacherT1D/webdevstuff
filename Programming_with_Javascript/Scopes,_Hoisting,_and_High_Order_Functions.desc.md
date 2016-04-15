# Scopes, Hoisting, and Higher-Order Functions
In this lesson, we're going to expand our understanding functions.

## Objectives
Students will be able to...

- 1 of 6: describe the concept of scopes
- 2 of 6: know how to create a new scope
- 3 of 6: explain hoisting
- 4 of 6: name the two types of high-order functions
- 5 of 6: describe and create a closure
- 6 of 6: describe and create a callback

### 1 of 6: What's Scope
In the most simpliest of terms, scope is about variable accessibility. Depending on which scope a variable is defined, it may be accessible or inaccessible in another scope. The key to understanding scope with JavaScript is functions. A scope should be thought of as the list of variables and functions the program has access to at any given moment. Depending on the scope that the current line is being executed within, a different set of variables and functions could be available in that scope. 

There are two classes of scope in JavaScript: 

1. Global scope
2. Local scope, or "function scope"

Anything in "global scope" is always available, anywhere else in the program. Whenever your browser is running, there is a global variable called "window" in global scope. 
  

### 2 of 6: Creating Scope
A global exists outside the context of any function, and therefore is accessable from every function. A local scope, in turn, is created *inside* of each function. Let's view an example with both: 

```javascript
var globalScope = "I'm outside of any function and can be accessed in any scope";

function localScope() {
	var localScope = "I'm inside of a function, so I'm in a local scope."
  console.log("This is a local scope, but I can still access globalScope");

  // This works here inside of local
  console.log(globalScope); 
}

// Works here as well
console.log(globalScope);

// Uncaught ReferenceError: localScope is not defined
localScope
```

#### When Do We Use These?

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


#### Name Collisions

It's possible to have two variables named the same thing, but on different scopes. It's considered a bad habit to write code this way because it becomes very confusing, but it's good to know that the following is perfectly legal:

```
var globalVariable = "The global version";

function test() {
    var globalVariable = "The impostor";
    console.log(globalVariable);
}

test();
console.log(globalVariable);
```

When we run this code, when we call the function `test` then "The impostor" is printed to our screen. When we `console.log(globalVariable);` then "the global version" was printed. Is this what you expected?  In JavaScript, the most local version of a variable is used naturally by the interpreter. What will happen when we run this code?

```
var globalVariable = "The global version";

function test() {
    globalVariable = "The impostor";
    console.log(globalVariable);
}

test();
console.log(globalVariable);
```

This time, we overwrote the global variable from within our function and so printed "The impostor" twice. 


### 3 of 6: What's Hoisting
Regardless of where variables are defined, they are always hoisted to the top of their scope. This is often described as a two step process: declaration and assignment. Lets look at a simple block of code, and examine how "hoisting" changes the code. 

```javascript
console.log(myFirstFunction);
myFirstFunction();

console.log(mySecondFunction);
console.log(myFirstVariable);

function myFirstFunction() {
	console.log("firstFunction");
}

console.log("some filler statement");

var mySecondFunction = function() {
	console.log("secondFunction");
}

mySecondFunction();

var myFirstVariable = "50";

console.log(myFirstVariable);
console.log(unknownVariable);
```
Our console looks like this:

```
[Function: myFirstFunction]
firstFunction
undefined
undefined
some filler statement
secondFunction
50
/Users/Tyler/Desktop/tmp.js:22
console.log(unknownVariable);
            ^

ReferenceError: unknownVariable is not defined
```

We were able to call `myFirstFunction` before it's function definition, but `mySecondFunction` was undefined at the same moment. If we tried to call `mySecondFucntion` instead of using `console.log` it would throw an error. 

Not only that, but we were allowed to reference `myFirstVariable` before it's definition and it's value was undefined. The log statement after it's creation printed `50`! Finally, the `unknownVariable` threw an error even though `myFirstVariable` did not do the same thing prior to it's creation. 

This is because of "Hoisting". When JavaScript enters a new scope, it preprocesses that scope in two stages. 

#### Function Hoisting

First, function declarations are hoisted to the very top of the file. Function declarations are any statement that starts with the keyword function. `function myFirstFunction(){}` is such a declaration, but `var mySecondFunction = function(){}` is __not__. The second statement starts with the keyword `var`. When functions declarations are hoisted, their definition is __also__ hoisted. This is in contrast to the second phrase of hoisting.

#### Variable Hoisting

After all the function declarations are hoisted, the variable __declaration__ but not definition is hoisted. This means that any statement starting with the keyword `var` is at least partially hoisted. For example the statement `var myVariable;` is hoisted in it's entierty, but the statement `var myVaraible = 50` is shortened to `var myVariable;` then hoisted. The value assignment statement changes to `myVariable = 50` and stays where it is. Lets look at the previous code __after__ hoisting has happened:

```
// HOISTING SECTION ONE: Function Declarations pulled all the way up
function myFirstFunction() {
	console.log("firstFunction");
}

// HOISTING SECTION TWO: Variable Declarations pulled below section one
var mySecondFunction;
var myFirstVariable

// Now the rest of the code, post transform
console.log(myFirstFunction);
myFirstFunction();

console.log(mySecondFunction);
console.log(myFirstVariable);
console.log("some filler statement");

mySecondFunction = function() {
	console.log("secondFunction");
}

mySecondFunction();

myFirstVariable = "50";
console.log(myFirstVariable);
console.log(unknownVariable);
```

Note that running this code produces identical output to the code above -- that's because as far as JS is concenred, it IS the same code. Further note that all the `var` keywords have been removed from final section of the code. The declarations have been hoisted and so we do not need to declare them a second time.

The most important thing you could learn about hoisting, is that there is a significant difference between the following to statements:

```
function myFirstFunction() {};
var secondFucntion = function(){};
```

The first is a function which will be put onto global scope. The second is a variable whose value has been assigned to a function.

### 4 of 6: Two types of high-order functions
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

### 5 of 6: Closures

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

### 6 of 6: Callback Functions

The most common usage of a high order function in JavaScript is a pattern called a "callback" function. A callback function in JavaScript is any function that is passed in as a parameter to another function and is called at the end of that function. This is in contrast our previous high order functions, which returned functions. Instead of returning a function, we call a function that is passed in.

Here is an example of code that uses the "callback" pattern.

```
function highOrderFunction(someNumber, callbackFunction) {
	someNumber += 10;
	callbackFunction(someNumber);
};

var printHello = function(){
	console.log('Hello');
};

var printANumber = function(input) {
	console.log("printing a number");
	console.log(input);
};

var someNumber = 10;
highOrderFunction(someNumber, printHello);
highOrderFunction(someNumber, printANumber);
```

This code is perfectly legal, and prints:

```
Hello
printing a number
20
```

In this example, `printANumber` and `printHello` both act as "callback functions". On the last two lines, we call `highOrderFunction`, and each time the second parameter is a variable whose value is a function. The last line of `highOrderFunction` invokes these "callback" functions. Callbacks are tricky, but incredibly common in JavaScript. Take a minute and create a couple of functions that use callbacks!


# Conclusion

Functions in JavaScript are __very powerful__ and in many ways they are more usable than functions in other languages. That said, many of these topics are complex, and confusing. This high level tour of functions is meant to give you an overview of just what's possible in JavaScript. As we continue towards making real applications, we'll be finding uses for all of these different function styles. For now, make sure you're comfortable with the notion of declaring and calling functions.

## Resources

- http://reactivex.io/learnrx/
