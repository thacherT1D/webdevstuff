## Objectives

- Explain the three types of scope.
- Use IIFEs to enclose scope.
- Explain what hoisting is.
- Explain what a higher-order function is.
- Use the `map`, `filter`, and `reduce` methods on arrays.
- Explain what a closure is.

## What are the three types of scope?

A **scope** is a list of variables and functions available for use on the current line of execution. There are three types of scope in JavaScript.

1. Global scope
2. Function scope
3. Block scope (new in ES6)

Any variable or function defined in the global scope is available for use anywhere in the program. In the browser, the `window` global object refers to the global scope. The `window` object is a collection of variables and functions related to the current `window` of your browser. In a modern browser, every tab has its own global scope and, as a result, its own `window` object.

```javascript
console.log(window.document); // An object with properties on the window's DOM
console.log(window.location); // An object with properties on the window's URL
console.log(window.screen);   // An object with properties on the window's screen

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

Block scope was introduced in ES6 with two new keywords: `let` and `const`. It is a more common type of scope in other programming languages allowing variables to be defined and used only within a block (designated with curly braces, `{}`).

The difference between `let` and `const` is that `const` does not allow reassignment of the variable whereas `let` does.

```javascript
var x = 0;
const y = 1;
let z = 2;

if (x < y) {
  var x = 3;
  let w = 4;
  let z = 5

  y = 6;          // TypeError
  console.log(z); // 5
}

console.log(w);   // ReferenceError
console.log(z);   // 2
```

- [`let` statement](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let)
- [`const` statement](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/const)

## How do you use IIFEs to enclose scope?

One of the ways to enclose scope is by creating an immediately invoked functional expression (**IIFE**). With IIFEs, code is wrapped in a function, creating a new scope, and then invoked immediately.

```javascript
(function() {
  // ALL CODE HERE
})();
```

Ever wondered why you've seen entire JavaScript files wrapped in an IIFE? By using an IIFE, variables are no longer declared in the global scope.

IIFEs can be invoked with arguments as well. Consider the following code. What do you think the final output will be?

```javascript
var arr = [];

for(var i = 0; i < 3; i++) {
  arr.push(function() {
    console.log(i);
  });
}

for(var func of arr) {
  func();
}
```

Because these callback functions are not executed immediately, they'll output the final value of `i` multiple times. To maintain each value of `i`, the `for` loop's body can be wrapped in an IIFE.

```javascript
var arr = [];

for(var i = 0; i < 3; i++) {
  (function(j) {
    arr.push(function() {
      console.log(j);
    });
  })(i);
}

for(var func of arr) {
  func();
}
```

By creating an IIFE with one parameter and invoking it with the value of `i`, the value of `i` is stored in the parameter `j`.

ES6 makes things much simpler with the capabilities of block scope.

```javascript
const arr = [];

for(let i = 0; i < 3; i++) {
  arr.push(function() {
    console.log(i);
  });
}

for(const func of arr) {
  func();
}
```

### Exercise

Write down in your own words the three different types of scope and how they work. When you are done, I'll cold call on a few of you for your answer.

## What's hoisting?

JavaScript has this "feature" called **hoisting**. When a function is invoked, the interpreter first adds variables declared with the `var` keyword to the current scope. Afterwards, the code is executed and values are eventually assigned to these variables. As a result, it's possible to write code that looks like assignment is happening before declaration even though it's not. :facepalm:

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

This is an example of what _not_ to do and there are a few reasons why it's important to know this. First, it's essential to understand why building a language in 10 days is a bad idea. More importantly, you can't make any assumptions that a JavaScript variable is global or will throw an `Unreferenced error` without first checking if it's declared somewhere inside a function. Remember, all declared variables start out as `undefined` even if it's hoisted from way down in the function body. For these reasons, we recommend declaring all variables at the top of a function, with the exception of variables used in `for` statements. ES6's `let` and `const` do not hoist to the top of a function since they are block scoped, which will be great in the future.

```javascript
var array = [1, 2, 3, 4];

for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
}

for (var element of iterable) {
  console.log(element);
}
```

Until you absolutely need to share data across may different functions, then we recommend that you declare variables as local as possible. Since variables in the global scope can be changed from anywhere, it's hard to reason about how these variables change over time as the program executes.

### Exercise

Turn and talk to your neighbor and explain what is hoisting in your own words. When you are done, I'll cold call on a few of you for your answer.

## What's a higher-order function?

A **higher-order function** either accepts a function as an argument or returns a function. The concept of higher-order functions is rooted in mathematics, specifically [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

As you've probably seen, higher-order functions are very common in JavaScript, but are tricky to wrap your brain around at first. Just remember, in JavaScript, variables can contain a function in the same way they contain a number, string, or other datatype.

```javascript
function higherOrder() {
  return function() {
    console.log("I'm a returned function!");
  }
}

var returnedFunction = higherOrder();
returnedFunction(); // I'm a returned function!

// Similarly, you can invoke the returned function like this.
higherOrder()();
```

There are four common higher-order functions for arrays—`forEach`, `map`, `filter`, and `reduce`.

### `forEach`

The `forEach` method invokes a callback function for each element of an array. It does not return anything.

```javascript
var arr = [1, 2, 3, 4];

arr.forEach(function(element) {
  console.log(element);
});
```

Which is very much similar to `for` loops.

```javascript
var arr = [1, 2, 3, 4];

for (var element of arr) {
  console.log(element);
};
```

See the [`Array.prototype.forEach` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) documentation on the Mozilla Developer Network.

### `map`

The `map` method is a very elegant way to transform items in an array into something different through invoking a callback function on each element of an array. In other words, the `map` method:

- Creates a new array that's the same size as the original array.
- Applies a callback function to each element of the original array.
- Pushes the return value of the callback function into the new array.

```javascript
var arr = [1, 2, 3, 4];

var squares = arr.map(function(element, index, array) {
  return element * element;
});

console.log(squares); // [1, 4, 9, 16]
```

By comparison, how would you do this with a loop?

```javascript
var arr = [1, 2, 3, 4];

var squares = [];

for (var element of arr) {
  squares.push(element * element);
}

console.log(squares); // [1, 4, 9, 16]
```

This is really useful when grabbing information from an HTTP response and transforming the data in some way.

See the [`Array.prototype.map` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) documentation on the Mozilla Developer Network.

### Exercise

Turn and talk to your neighbor and explain the difference between `forEach` and `map`. When you are done, I'll cold call on a few of you for your answer.

### Exercise

Look at the following JSON of a search query returned by the OMDB API.

```javascript
[
  {
    "Title": "Jurassic Park",
    "Year": "1993",
    "imdbID": "tt0107290",
    "Type": "movie",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg"
  },
  {
    "Title": "Jurassic World",
    "Year": "2015",
    "imdbID": "tt0369610",
    "Type": "movie",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ5MTE0MTk3Nl5BMl5BanBnXkFtZTgwMjczMzk2NTE@._V1_SX300.jpg"
  },
  {
    "Title": "The Lost World: Jurassic Park",
    "Year": "1997",
    "imdbID": "tt0119567",
    "Type": "movie",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg"
  },
  {
    "Title": "Jurassic Park III",
    "Year": "2001",
    "imdbID": "tt0163025",
    "Type": "movie",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjA2NzAyMDgyM15BMl5BanBnXkFtZTYwOTQ5Mjg5._V1_SX300.jpg"
  }
]
```

Assuming you have parsed the above JSON and have assigned it to the variable `results`. Write a function using `map` to retrieve the IMDB rating for each movie into an array?

### `filter`

After `map`, the `filter` method is probably the second most commonly used higher-order function. The `filter` method produces a new array with only items that satisfy a test. That test is codified as a function that takes in an item and returns a boolean, `true` to include the item in the outputted array, and `false` if not. In other words, the `filter` method:

- Creates a new array that's no larger than the original array.
- Applies a callback function to each element of the original array.
- Pushes the element into the new array if the callback returns `true`.

The callback function passed to the `filter` method is often called a **predicate**.

```javascript
var arr = [1, 2, 3, 4];

var odds = arr.filter(function(element, index, array) {
  return element % 2 !== 0;
});

console.log(odds); // [1, 3]
```

By comparison, how would you do this with a loop?

```javascript
var arr = [1, 2, 3, 4];

var odds = [];

for (var element of arr) {
  if (num % 2 !== 0) {
    odds.push(element);
  }
}

console.log(odds); // [1, 3]
```

See the [`Array.prototype.filter` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) documentation on the Mozilla Developer Network.

### Exercise

Assuming you have parsed the same JSON and have assigned it to the variable `results`. Write a function using `filter` to retrieve all movies that have were released before the year 2000?

### `reduce`

The `reduce` method has a lot to offer and can be thought of as a swiss army knife. On a high level, `reduce` provides the ability to take an array of items and consolidate it down to one value. In order to do so, it keeps track of a "running total", and updates that running total for each item in the array.

The use of `reduce` is best described through a couple examples of similar problems. Let's look at two problems, summing all of the numbers in an array and multiplying all the numbers in an array.

```javascript
var arr = [1, 2, 3, 4];

var result = 0;

for (var element of arr) {
  result = result + element;
}

console.log(result); // 10
```

```javascript
var arr = [1, 2, 3, 4];

var result = 1;

for (var element of arr) {
  result = result * element;
}

console.log(result); // 24
```

Can you spot the differences? They are incredibly similar, but they differ by 2 pieces.

- The initial value of `result` is `0` for addition and `1` for multiplication.
- The operation is `+` for addition and `*` for multiplication.

The `reduce` method takes these differences as arguments that you can specify. Although you cannot pass an operator like `+` or `*`, you can pass in something that takes in two values and produces the sum or product. A function!

```javascript
var arr = [1, 2, 3, 4];

var sum = arr.reduce(function(result, element, index, array) {
  return result + element;
}, 0);

var product = arr.reduce(function(result, element, index, array) {
  return result * element;
}, 1);

console.log(sum);     // 10
console.log(product); // 24
```

**NOTE:** Notice the order of the parameters in the function passed into `reduce`. First, the running total is passed into the `result` parameter and  each element in the array is passed into the `element` parameter second.


See the [`Array.prototype.reduce` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) documentation on the Mozilla Developer Network.

### Exercise

While all of our examples have reduced down to numbers, `reduce` can produce any data type.

Write a function named `concatenate` that takes in one argument, `arr`, (array of strings) and returns the concatenation of all the strings in the array.

### Exercise

Then write a function named `flatten` that takes in one argument, `arr`, (array of arrays) and returns a new array that combines all of elements of each inner array. For example, given `[[1], [2, 3], [4]]`, then return `[1, 2, 3, 4]`.

## What is a closure?

A **closure** is a function that has access to the scope where it was created. Take a look at the following example.

```javascript
function createClosure() {
  var count = 0;

  return function() {
    count += 1;
    return count;
  }
}
```

When `createClosure` is called, It will do the following:

1. Initialize the `count` variable within its function scope to 0.
1. Return a function that when called, increments the `count` variable and returns it.

The returned function has access to the `count` variable even though the `createClosure` function has already finished executing. Even more so, when `createClosure` is called, a new internal `count` variable is created.

```
var closure1 = createClosure();
var closure2 = createClosure();

console.log('Closure 1');
console.log(closure1());  // 1
console.log(closure1());  // 2
console.log(closure1());  // 3

console.log('Closure 2');
console.log(closure2());  // 1
console.log(closure2());  // 2
console.log(closure2());  // 3
```

### Exercise

Turn and talk to your neighbor to discuss what is a closure. Use the following example to highlight the closure.

```javascript
function greeter(myName) {
  return function (yourName) {
    return `Hello ${yourName}. My name is ${myName}.`
  }
}

var kenGreeter = greeter('Ken');
kenGreeter('Ryan');               // ???
```

When you are done, I'll cold call on a few of you for your answer.

## Assignment

[Function Tests](https://github.com/gSchool/function-tests)

## Resources

- [Functional Programming in Javascript](http://reactivex.io/learnrx/)
- [Map, Reduce and other Higher Order Functions by Ryan Guill](http://ryanguill.com/functional/higher-order-functions/2016/05/18/higher-order-functions.html)
- [Youtube - JavaScript Scope Chains and Closures](https://www.youtube.com/watch?v=zRZNb4GDOPI&t=422)
