# Hoisting

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

This is an example of what _not_ to do and there are a few reasons why it's important to know this. First, it's essential to understand why building a language in 10 days is a bad idea. More importantly, you can't make any assumptions that a JavaScript variable is global or will throw an `Unreferenced error` without first checking if it's declared somewhere inside a function. Remember, all declared variables start out as `undefined` even if it's hoisted from way down in the function body. For these reasons, we recommend declaring all variables at the top of a function, with the exception of variables used in `for` statements.

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

```js
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

```js
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
