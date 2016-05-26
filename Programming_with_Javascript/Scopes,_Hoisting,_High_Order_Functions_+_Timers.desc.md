# Objectives

- Use the methods `call` and `apply` on functions.
- Describe the two types of scope.
- Explain variable hoisting.
- Use Immediately Invoked Functional Expressions (IIFEs) to introduce scope.
- Define the following:
  - First Class Function
  - Higher Order Function
- Use the `map`, `filter`, and `reduce` methods on arrays.
- Explain what is a closure.

# What are functions again?

When we first started talking about data types, we mentioned many primitive types (like strings, numbers, booleans, null, etc) and reference types (objects and arrays). Functions seem like this magical third type that we think of as a programming construct (like loops and if statements). In reality, functions is actually another example of a reference type. We can assign functions to variables using a functional expressions.

```javascript
var myFunction = function () {
  // Do some stuff
};
```

We also have passed a function to other functions (as a callback).

```javascript
button.addEventListener('click', function (event) {
  // Do some stuff
});
```

In these cases, functions behave *exactly* like any of the other types. What makes a function different is our ability to _invoke_ a function, which allows it to execute code.

## Other ways to invoke functions

We invoked functions most commonly using parentheses after the name of the function with a set of arguments.

```javascript
myFunctionName(arg1, arg2, arg3);
```

There are a couple more ways we can invoke a function using the methods `call`, and `apply`. Both are very similar in purpose but has a slightly different input.

- `apply` takes a `this` context as well as an array of arguments to the function. For example: `myFunctionName.apply(null, [arg1, arg2, arg3])`
- `call` takes a `this` context as well as the arguments immediately after. `myFunctionName.apply.call(null, arg1, arg2, arg3)`

### What is `this`?

So far, we have only used the varible `this` in our event listeners. In JavaScript, every time that a function is invoked, two special keywords are created (that live in the scope of that function). 

1. `arguments` - the keyword arguments is an array-like object (does not have native array methods like push/pop/forEach/map) which represents each argument passed to the function.

```js
    function logArgs(a,b,c) {
        return arguments;
    }

    logArgs(1,2,3) // returns [1,2,3]
```

2. `this` - the keyword `this` refers to the parent object in which the function has been called. What does that mean? Simply think whatever the execution context is of that function. Is it a function that is attached to an object? Is it a function that is attached to the `window`? Let's see some examples:

```js
    var person = {
        name: "Elie",
        sayHi: function() {
            return `${this.name} says hi!`
        }
    };

    // the keyword `this` has a parent object called `person`
    // so we are going to access the parent object's property of name
    person.sayHi(); // returns "Elie says hi!"

```

In this example, the keyword `this` refers to the `person` object (sometimes it's easier to just think, what is the function I am calling attached to?). Let's see what happens when we use the keyword `this` without explicitly defining a parent object.

```js
    function hello() {
        return this;
    }

    hello(); // what does this function return?
```

So what happens when we call a function without explicitly defining its parent object? It returns the window object! This actually makes a lot of sense, because everything that we define in the global scope (in the browser) is attached to the window object (we could invoke this function by using `window.hello()`)

### Changing the value of `this` using call or apply

So in these past examples we know with 100% certainty what the value of the keyword `this` is - so why would we ever want to change it? Well, in these examples we wouldn't, but what about something like this:

```js
     var person = {
        name: "Elie",
        sayHi: function() {
            return `${this.name} says hi!`
        }
    };

    var person2 = {
        name: "Janey",
        sayHi: function() {
            return `${this.name} says hi!`
        }
    }
```

There's a lot of duplication going on here! We just repeated the entire definition of sayHi allover again! So how can we borrow the sayHi function from person but instead of `this.name` referring to "Elie", we want it to refer to "Janey". Call/Apply to the rescue!


```js
     var person = {
        name: "Elie",
        sayHi: function() {
            return `${this.name} says hi!`
        }
    };

    var person2 = {
        name: "Janey",
    }

    // what if we want to borrow the sayHi method from person to be used on person?

    person.sayHi.call(person2);
```

# What is scope?

In the most simpliest of terms, scope is about variable accessibility. Depending on which scope a variable is defined, it may be accessible or inaccessible in another scope. The key to understanding scope with JavaScript is functions. A scope should be thought of as the list of variables and functions the program has access to at any given moment. Depending on the scope that the current line is being executed within, a different set of variables and functions could be available in that scope. 

There are two classes of scope in JavaScript: 

1. Global scope
2. Local scope, or "function scope"

Anything in "global scope" is always available, anywhere else in the program. Whenever your browser is running, there is a global variable called "window" in global scope.

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

## Name Collisions

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

## Declaring variables in a function

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

## When to use scope

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

### Immediately Invoked Functional Expressions (IIFEs)

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
	func();
}
```

Because functions are not executed immediately, they will output the number 5 multiple times. We need to maintain the value of `i` at the moment in each iteration of the loop. We can solve this with an IIFE.

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
	func();
}
```

By creating an IIFE with one parameter and invoking it with the value of `i`, we are placing a copy of it (as an argument into a new function scope. This scope maintains the value as `i` keeps iterating.

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

The `forEach` method ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)) allows us to apply a function on each element of an array.

```javascript
var arr = ['a', 'b', 'c', 'd'];
arr.forEach(function(element) {
	console.log(element);
});
```

Its behavior is very much similar to a `for` and `for of`  loop.

```javascript
var arr = ['a', 'b', 'c', 'd'];
for (element of arr) {
	console.log(element);
};
```

## `map`

The `map` method ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)) is very powerful as it simply transforms an array using a function. In particular, it does the following:

* Creates a new array of the same size as the original array.
* Applies a function on each element of the original array.
* Places the returned value of the function in its corresponding place in the new array.

```javascript
var arr = [1, 2, 3, 4];
var squares = arr.map(function(num) {
  return num * num;
});

console.log(squares); // 1,4,9,16
```

By comparison, how would we do this with a loop?

```javascript
var arr = [1, 2, 3, 4];
var squares = [];
for (num of arr) {
	squares.push(num * num);
}

console.log(squares); // 1,4,9,16
```

This is really useful when grabbing information from your API responses and changing it in some way.

**Exercise** How would we get the IMDB rating as a number from a search request?

## `filter`

After `map`, `filter` (MDN) is probably the second most commonly used higher order function. It allows us to filter out items in our array by some test (a function!). It will always return a new array. Each element gets tested with that function (often called a _predicate_). If the predicate returns true, the item remains in the set. Otherwise, it will not be included.

```javascript
var arr = [1, 2, 3, 4];
var onlyOdds = arr.filter(function(num) {
  return num % 2 !== 0;
});

console.log(onlyOdds); // 1,3
```

By comparison, how would we do this with a loop?

```javascript
var arr = [1, 2, 3, 4];
var onlyOdds = [];
for (num of arr) {
	if (num % 2 !== 0) {
		onlyOdds.push(num);
	}
}

console.log(onlyOdds); // 1,3
```

**Exercise** How would we filter the movies in the search results from OMDB with an ratings that are kid-friendly (G or PG)?

## `reduce`

The `reduce` method ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)) has a lot to offer and can be thought of as a swiss army knife. The use of `reduce` is best described through a couple examples of similar problems. Let's look at two problems, summing all of the numbers in an array and multiplying all the numbers in an array.

```javascript
// Add all the numbers in an array. If the array is empty, the sum is 0.
var arr = [1, 2, 3, 4];
var result = 0;
for (num of arr) {
  result = result + num;
}

console.log(result);   // 10
```

```javascript
// Multiply all the numbers in an array. If the array is empty, the product is 1.
var arr = [1, 2, 3, 4];
var result = 1;
for (num of arr) {
  result = result * num;
}

console.log(result); // 24
```

Can you spot the differences? They are incredibly similar, but they differ by 2 pieces:

* The initial value of `result` (`0` for sum, `1` for product)
* The operation (`+` for sum, `*` for product)

`reduce` makes these differences parameters that you can specify. Although you cannot pass an operator like `+` or `*`, you can pass in something that takes in two values and produces the sum or product (A FUNCTION!).

```javascript
var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(result, num) {
  return result + sum;
}, 0);
var product = arr.reduce(function(result, num) {
  return result * sum;
}, 1);

console.log(sum);      // 10
console.log(product);  // 24
```

There are many situations when you are coding of keeping that running total (or `result`) and performing some operation. This may be a great place to use the reduce method.  

**NOTE** Notice the order of the parameters in the function passed into `reduce`. We pass in the running total `result` first and then the item in the array we are currently working with.

While our examples have been with numbers, this can work for many data types as well.

**Exercise** Write a function named `concatenate` that takes in one argument, arr, (an array of strings) and returns the concatenation of all the strings in the array.

**Exercise** Write a function named `flatten` that takes in one argument, arr, (an array of arrays). Return a new array that combines all of elements of each inner array. For example, given `[[1], [2, 3], [4]]`, then return `[1, 2, 3, 4]`.

Looking for even more `reduce` fun? You can write the `map` method, and the `filter` method using `reduce`! Try it out!

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

- [http://ryanguill.com/functional/higher-order-functions/2016/05/18/higher-order-functions.html](http://ryanguill.com/functional/higher-order-functions/2016/05/18/higher-order-functions.html)
- [http://reactivex.io/learnrx/](http://reactivex.io/learnrx/)

# Exercise

[https://github.com/gSchool/function-tests](https://github.com/gSchool/function-tests)