## Objectives

- Explain the three types of scope.
- Explain what hoisting is.
- Use do IIFEs to introduce scope.
- Explain what a higher order function is.
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

This is an example of what _not_ to do. There are a few reasons why it's important to know this. First, it's essential to understand why building a language in 10 days is a bad idea. More importantly, you can't make any assumptions that a JavaScript variable is global or will throw an `Unreferenced error` without first checking if its declared somewhere inside a function. Remember, all declared variables start out as `undefined` even if its hoisted from way down in the function body. For these reasons, we recommend declaring all variables at the top of a function, with the exception of variables used in `for` statements.

```javascript
var array = [1, 2, 3, 4];

for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
}

for (var element of iterable) {
  console.log(element);
}
```

Until you absolutely need to share data across may different functions, then we recommend that you declare variables as local as possible. Since variables in the global scope can be changed from anywhere, it's hard to reason about how these variables change as the program executes overtime.

## How do IIFEs to introduce scope?

One of the ways we can introduce scope is by creating an immediately invoked functional expression (**IIFE**). With IIFEs, code is wrapped in a function, creating a new scope, and then invoked immediately.

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

## Higher Order Functions

A **higher order function** either accepts a function as an argument or returns a function. The concept of higher order functions is rooted in mathematics, specifically [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

As you've probably seen, higher order functions are very common in JavaScript, but are tricky to wrap your brain around at first. Just remember, in JavaScript, variables can contain a function in the same way they contain a number, string, or other datatype.

```javascript
function returnAFunction() {
  return function() {
    console.log("I'm a returned function!");
  }
}

var returnedFunction = returnAFunction();
returnedFunction(); //I'm a returned function!

// Similarly, you can invoke the returned function like this.
returnAFunction()();
```

There are four common higher order functions for arrays—`forEach`, `map`, `filter`, and `reduce`.

## `forEach`

The `forEach` method invokes a callback function for each element of an array.

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

## `map`

The `map` method invokes a callback function for each element of an array, but allows each element to be transformed and pushed to a new array. In other words, the `map` method:

- Creates a new array that's the same size as the original array.
- Applies a callback function to each element of the original array.
- Pushes the return value of the callback function into the new array.

```javascript
var arr = [1, 2, 3, 4];

var squares = arr.map(function(element) {
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

**EXERCISE:** How would you get the IMDB rating as a number from a search request?

## `filter`

After `map`, the `filter` method is probably the second most commonly used higher order function. The `filter` method invokes a callback function for each element of an array, but allows each element to be filtered out of a new array. In other words, the `filter` method:

- Creates a new array that's no larger than the original array.
- Applies a callback function to each element of the original array.
- Pushes the element into the new array if the callback returns `true`.

The callback function passed to the `filter` method is called a **predicate**.

```javascript
var arr = [1, 2, 3, 4];

var odds = arr.filter(function(element) {
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

**EXERCISE:** How would you filter the movies in the search results from OMDB with an ratings that are kid-friendly (G or PG)?

## `reduce`

The `reduce` method has a lot to offer and can be thought of as a swiss army knife. The use of `reduce` is best described through a couple examples of similar problems. Let's look at two problems, summing all of the numbers in an array and multiplying all the numbers in an array.

```javascript
var arr = [1, 2, 3, 4];

var result = 0;

for (var num of arr) {
  result = result + num;
}

console.log(result); // 10
```

```javascript
var arr = [1, 2, 3, 4];

var result = 1;

for (var num of arr) {
  result = result + num;
}

console.log(result); // 24
```

Can you spot the differences? They are incredibly similar, but they differ by 2 pieces.

- The initial value of `result` is `0` for addition and `1` for multiplication.
- The operation is `+` for addition and `*` for multiplication.

The `reduce` method takes these differences as arguments that you can specify. Although you cannot pass an operator like `+` or `*`, you can pass in something that takes in two values and produces the sum or product. A function!

```javascript
var arr = [1, 2, 3, 4];

var sum = arr.reduce(function(result, element) {
  return result + element;
}, 0);

var product = arr.reduce(function(result, element) {
  return result * element;
}, 1);

console.log(sum);     // 10
console.log(product); // 24
```

**NOTE:** Notice the order of the parameters in the function passed into `reduce`. First, the running total is passed into the `result` parameter and  each element in the array is passed into the `element` parameter second.


See the [`Array.prototype.reduce` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) documentation on the Mozilla Developer Network.

While our examples have been with numbers, this can work for many data types as well.

### Exercise

Write a function named `concatenate` that takes in one argument, `arr`, (array of strings) and returns the concatenation of all the strings in the array.

Then write a function named `flatten` that takes in one argument, `arr`, (array of arrays) and returns a new array that combines all of elements of each inner array. For example, given `[[1], [2, 3], [4]]`, then return `[1, 2, 3, 4]`.

## What's a closure?

A **closure** is a function that encloses the scope that exists when its created. To understand closures, lets revisit the original example of a high order function, but make one modification.

```javascript
function returnAFunction() {
  var closedOver = "This information is closed over";

  return function() {
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

The returned function contains `closedOver` variable that was declared in its scope. When the function was created at the `return` statement, the variable `closedOver` had a value. That value is said to be "closed over" because the inner function retains a reference to it. Lets look at another example of a closure:

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
