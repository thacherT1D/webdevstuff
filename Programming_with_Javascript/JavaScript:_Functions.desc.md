# An Introduction to Functions with JavaScript

Today, we're going to explore the fascinating world of functions. This world may bewilder or intimidate some of you. Find solace in the fact that functions are nothing more than a way of re-using code. This realization will help you to eventually embrace the usage of functions and, dare I say, excitement for them. At the end of today's lessons, I hope that you guys are able to add functions to your coding tool-belt.

## Objectives

* Explain what a function is conceptually
* Write a function that takes parameters
* Write a function that returns a value
* Describe variable scope in javascript and how it relates to functions

### What is a Function?

In one sentence, we can say that a function is a sequence of instructions that achieve a specific task. I've always found definitions to be more meaningful when they are tied to the world around us. So let's pause for a moment and think of real-world examples that fit our definition....

When I think about functions in the real world, I often consider a recipe (e.g., making pumpkin pie) or a manual (e.g. assembling a coffee table from IKEA).

At this point, I hope that many of us can embrace our shared definition of a function--they are a sequence of instructions that achieve a specific task.

__EXERCISE__: What are some other examples of functions you enounter in daily life?

### Example Function

Below is an example of a very simple function:

```javascript
function hello(name, age) {
  console.log("Hello, " + name + ". You are " + age + " years old".);
}
```

There are four parts to the above code example:

1. Keyword `function`
1. Name for that function
1. Parameters - a comma separated list enclosed in parenthesis
1. Instructions - a variable number of optional instructions enclosed in curly braces

### Creating and Invoking Functions

We've now established the syntax of a function. Let's apply this knowledge to create a function named `greet()`, which will log to the console the string "Hello, World!":

```javascript
function greet() {
  console.log("Hello, World!");
}
```

Awesome, you guys just created a function. If we want to see the value of our function, we just type in the name of the function to our REPL (read, evaluate, print, loop):

```javascript
function greet() {
  console.log("Hello, World!");
}

greet
// function greet() {
//  console.log("Hello, World!");
// }
// undefined
```

Similar to the real world, functions consist of two processes: first, creation of the instructions; second, execution of the instructions.

To this point, we've just created a recipe for `greet`, we haven't actually told anyone or anything to execute the instructions in our function.

To execute the code inside our curly braces, we need to use an operator of `()` next to the name of our function:

```javascript
function greet() {
  console.log("Hello, World!");
}

greet();
// "Hello, World!"
// undefined

greet();
// "Hello, World!"
// undefined

greet();
// "Hello, World!"
// undefined
```

That's it! Now we can re-use the instructions of `greet` whenever we want. Above, we just invoked it 3 times. :)

__EXERCISE__: Write a function called `yell` that prints out a phrase 10 times in a row.  On the 10th iteration, the phrase should be in all caps and have an extra exlimation point at the end.  Example output is below:

```javascript
yell(); // You must implement this function
// my phrase
// my phrase
// my phrase
// my phrase
// my phrase
// my phrase
// my phrase
// my phrase
// my phrase
// my phrase
// MY PHRASE!
```

### Functions With Parameters

So far we have created functions that do the same exact thing every time.  Often times, we want a function to change behavior based on a set of inputs.  Function parameters allow us to create functions with input.

The function example we saw earlier has two parameters:

```javascript
function hello(name, age) {
  console.log("Hello, " + name + ". You are " + age + " years old".);
}
```

The parameters are `name` and `age`.  They are variables that are defined in the function


__EXERCISE__: Create a function that takes name of a month as a parameter.  Print out every day in that month.  Assume leap years don't exist.

```javascript
daysInMonth("February");
// February 1
// February 2
.
.
.
// February 27
// February 28
```

### The keyword `return`

We have now seen functions that take a set of inputs as parameters.  It is also often desireable to return an value from the function.  Our function examples have all been printing to the console, but in many cases we want the function to return a value for us.  For example:

```javascript
var total = sum(5, 20);
```

In the example above, sum is a function that takes 2 parameters.  The values are summed in the function and the result will be returned and saved in the variable `total`.

The implementation of sum looks like this:

```javascript
function sum(num1, num2) {
	return num1 + num2;
}
```

Let's make another method that returns a greeting for a name.  If the name is `Tim`, return: "Hello Tim!  Your favorite color is blue."  If the name is anything other than Tim, return Hello name.

```javascript
function getGreeting(name) {
	if (name === "Tim") {
		return "Hello Tim!  Your favorite color is blue.";
	}

	return "Hello " + name;
}
``` 

__EXERCISE__

* What is output to the console with the following function invocation?

```javascript
getGreeting("Elie");
```
* With the following function invocation, which return statement is executed (the first, the second, or both)?

```javascript
getGreeting("Tim");
```

* Write a function called average that takes an array of numbers as a parameter and returns the average of the array of numbers.

```javascript
average([2,4,6]) // Returns 4
```

* Write a function called `calculate` that takes 3 arguments: `num1`, `num2`, and a string representing addition or multiplication (`'+'` or `'*'`).  Have that function decide which math operation to perform, then call another function for the appropriate operation.  For example, `calculate(4, 5, '*');` should call another function internally that looks like this `multiply(4, 5)` and returns the value `20`.

### The keyword `arguments`

The arguments keyword gives you an array like object of parameters to a function:

* the keyword `arguments` exist only inside of a function
* the keyword `arguments` is array-like, which means it has some functionality of an array, such as `length`, but not others.

Let's use `arguments` in a function and see what we can and cannot do:

```javascript
function args() {
  return arguments.length;
}

args(1,2,3);
// 3
```

Notice that the correct number of arguments is being logged to the console. We achieved this functionality with the `length` property being used on `arguments`. Since we have the ability to use dot notation with `arguments`, that's an insightful indicator that `arguments` is actually an object.

Now watch what happens when we try to use another method such as `pop()` that is very common to arrays:

```javascript
function args() {
  console.log(arguments.pop();
}

args(1,2,3);
// ...arguments.pop is not a function...
```

Using the `pop()` method doesn't work, and this observation confirms our assumption that `arguments` doesn't have access to all methods of an array. So what methods or properties does it have? Let's use console.log to see! As we'll soon notice, `arguments` is an object where each argument being passed, from left to right, is assigned a numeric key starting from the integer `0`. `arguments` also has a `length` property, as we learned in an earlier example.

## Scope In Javascript

Variable scope is a term that describes the duration for which a variable exists in javascript.  In javascript variables are scoped to functions.  In other words, when a variable is defined with the keyword `var`, it exists for the life span of that function:

```javascript
function scopeExample() {
	var num1 = 5;
	var num2 = 6;
	num3 = 7;

	console.log(num1, num2, num3, num4, "-> num1, num2, num3 and num4 are defined from inside scopeExample");
}

num4 = 12345;
console.log(num4, "-> Only num4 is defined at this point");  // num1, num2, and num3 do not exist
scopeExample();

console.log(num3, num4, "-> Only num3 and num4 exist now");
```

__EXERCISE__

* When should you use the `var` keyword to declare variables?
* What does the following code console log?

```javascript
var test = 10;
function scopeChallenge() {
  console.log(test);
  var test = 99;
}

scopeChallenge();
```
