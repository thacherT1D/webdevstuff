## Objectives

- Explain the three types of scope.
- Explain what hoisting is.
- Explain what a higher-order function is.
- Use the `map`, `filter`, and `reduce` methods on arrays.
- Explain what a closure is.
- Use IIFEs to enclose scope.

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

### Shadowing

It's possible to have two variables named the same thing, but on different scopes which is called *shadowing*. It's considered a bad habit to write code this way because it becomes very confusing, but it's good to know that the following is perfectly legal.

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

## Assignment

[Function Tests](https://github.com/gSchool/function-tests)

## Further Practice

https://github.com/gSchool/javascript_timers_callbacks_exercise

## Resources

- [Functional Programming in Javascript](http://reactivex.io/learnrx/)
- [Map, Reduce and other Higher Order Functions by Ryan Guill](http://ryanguill.com/functional/higher-order-functions/2016/05/18/higher-order-functions.html)
- [Youtube - JavaScript Scope Chains and Closures](https://www.youtube.com/watch?v=zRZNb4GDOPI&t=422)
- [exercise-js-scope-hoisting-closure-higherorder](https://github.com/gSchool/exercise-js-scope-hoisting-closure-higherorder)
* [Everything You Wanted to Know About JavaScript scope](http://toddmotto.com/everything-you-wanted-to-know-about-javascript-scope/)
* [StackOverflow Question on Scope](http://stackoverflow.com/questions/500431/what-is-the-scope-of-variables-in-javascript)
- [JSConf : What the heck is the event loop anyway?](https://www.youtube.com/watch?v=8aGhZQkoFbQ)

<iframe src="https://player.vimeo.com/video/134061121" width="500" height="313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Slides

* [Slides](https://docs.google.com/presentation/d/1XG1_3ci29884sKYfZJBxmq3I20uLoJT9cpeIU1y6qgI/edit?usp=sharing)

## Guiding questions (Students answers these to themselves, and then talk about them in groups):

1. What is the concept of scope? What does it affect?
1. How do you create a new scope in JavaScript?
1. What is var hoisting in JavaScript?
1. What are the 2 qualities of higher-order functions?
1. What is a closure?
1. What is a callback function?
