## Objectives

- Use the `arguments` and `this` keywords inside an invoked function.
- Use the `call` and `apply` methods to invoke a function.
- Explain the three types of scope.
- Explain what hoisting is.
- Use Immediately Invoked Functional Expressions (IIFEs) to introduce scope.
- Define the following:
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

A **scope** is a list of variables and functions available for use on the current line of execution. There are three types of scope in JavaScript.

1. Global scope
2. Function scope
3. Block scope (new in ES6)

Any variable or function defined in the global scope is available for use anywhere in the program. In the browser, the `window` global object refers to the global scope. The `window` object is a collection of variables and functions related to the current `window` of your browser. In a modern browser, every tab has its own global scope and, as a result, its own `window` object.

```javascript
console.log(window.location); // The host of whatever website you're on.
console.log(window.document); // Reference to the HTML document
console.log(window.screen);   // Information about the browser's screen size

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

It's possible to have two variables named the same thing, but on different scopes. It's considered a bad habit to write code this way because it becomes very confusing, but it's good to know that the following is perfectly legal.

```javascript
var a = 'outer';

function myFunction() {
  var a = 'inner';
  console.log(a); // inner
}

myFunction();

console.log(a); // outer
```

Is this what you expected? In JavaScript, the most local version of a variable is accessed by the interpreter first.

To learn about block scope, see the following articles on the Mozilla Developer Network.

- [`let` statement](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let)
- [`const` statement](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const)

### Exercise

What will happen when this code is run?

```javascript
var a = 'outer';

function myFunction() {
  a = 'inner';
  console.log(a); // ???
}

myFunction();

console.log(a); // ???
```

## What's hoisting?

JavaScript has this "feature" called **hoisting**. When a function is invoked, the interpreter first processes variable declarations. Just the declarations, not the assignments. Afterwards, the function's body is executed. As a result, it's possible to write code that assigns a value to a variable before it's declared. :facepalm:

```javascript
function myFunction() {
	console.log(num);

	num = 2;

  console.log(num);

  var num = 1;

  console.log(num);
}

myFunction();
```

There are a few reasons why it's important to know this. First, it's essential to understand why building a language in 10 days is a bad idea. More importantly, you can't make any assumptions that a JavaScript variable is global or will throw an `Unreferenced error` without first checking if its declared somewhere inside a function. Remember, all declared variables start out as `undefined` even if its hoisted from way down in the function body. For these reasons, we recommend declaring all variables at the top of a function, with the exception of variables used in `for` loops.

Until you absolutely need to share data across may different functions, then we recommend that you declare variables as local as possible. Since variables in the global scope can be changed from anywhere, it's hard to reason about how these variables change as the program executes overtime.

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

## Conclusion

Functions in JavaScript are __very powerful__ and in many ways they are more usable than functions in other languages. That said, many of these topics are complex, and confusing. This high level tour of functions is meant to give you an overview of just what's possible in JavaScript. As we continue towards making real applications, we'll be finding uses for all of these different function styles. For now, make sure you're comfortable with the notion of declaring and calling functions.

## Exercise

[Function Tests](https://github.com/gSchool/function-tests)

## Resources

- [http://ryanguill.com/functional/higher-order-functions/2016/05/18/higher-order-functions.html](http://ryanguill.com/functional/higher-order-functions/2016/05/18/higher-order-functions.html)
- [http://reactivex.io/learnrx/](http://reactivex.io/learnrx/)
