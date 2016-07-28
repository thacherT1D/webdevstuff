# An Introduction to Functions with JavaScript

Today, we're going to explore the fascinating world of functions. This world may bewilder or intimidate some of you. Find solace in the fact that functions are nothing more than a way of re-using code. This realization will help you to eventually embrace the usage of functions and, dare I say, excitement for them. At the end of today's lessons, I hope that you guys are able to add functions to your coding tool-belt.

## Objectives

Students will be able to...

- 1 of 7: describe the concept of a function in one sentence
- 2 of 7: explain the syntax of a function
- 3 of 7: create a function
- 4 of 7: invoke a function
- 5 of 7: use the keyword `return`
- 6 of 7: add behavior with parameters and arguments
- 7 of 7: use the keyword `arguments`

### 1 of 7: What's a Function?

Let's start with our first objective: What's a function? In one sentence, we can say that a function is a sequence of instructions that achieve a specific task. I've always found definitions to be more meaningful when they are tied to the world around us. So let's pause for a moment and think of real-world examples that fit our definition....

When I think about functions in the real world, I often consider a recipe (e.g., making pumpkin pie) or a manual (e.g. assembling a coffee table from IKEA).

At this point, I hope that many of us can embrace our shared definition of a function--they are a sequence of instructions that achieve a specific task.

### 2 of 7: The Syntax of a Function

The way we create functions in the real world is different from how we create functions in JavaScript. In the real world, a recipe has a series of bullet points with instructions. In order to create functions in JavaScript, we need to use a particular syntax:

```javascript
function [[name]] ( [[parameters]] ) {
  [[body (i.e., statements, expressions, values)]]
}
```

There are four parts to the above code example:

1. Keyword `function`
1. Name for that function
1. Parameters - a comma separated list enclosed in parenthesis
1. Instructions - a variable number of optional instructions enclosed in curly braces

### 3 of 7:  Function Creation

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

Now some of you may be confused. You may have have imagined reading `"Hello, World!"` to be logged to our console--not the definition of the function. If I'm describing you, then you've got great intuition. When working with functions, there are two steps: creating and invoking. What you imagined reading (`"Hello, World!"`) happens during the invocation step of a function.

### 4 of 7: Function Invocation

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

### 5 of 7: The keyword `return`

Some of you may noticed that when we invoked `greet()`, the console logged the value `undefined`. This design points to an important part of how functions are designed. Every function returns a value. If you do not specify a return, then it will return `undefined`.

So logging is similar to a chef following a recipe and shouting when he executes one of the steps of the recipe; moreover, a chef yelling each step isn’t the same as a chef creating our meal and then returning a meal to us. Imagine you order a dish and its made; but no one ever returns it to you.

If you want to add instructions on what a function should return, you'll need to use the keyword `return`:

```javascript
function greet() {
  console.log("Hello, World!");
  return "You told me to return.";
}

greet()
// "Hello, World!"
// "You told me to return."
```

Awesome, you just used the keyword `return`. Take note that `return` has special behavior associated with it. The most notable is that once a function executes a `return` statement, all code succeeding it in a function never gets executed. In other words, be careful where and when you use `return`:

```javascript
function greet() {
  return "You'll never reach the console.log() message.";
  console.log("Hello, World!");
}

greet();
// "You'll never reach the console.log() message."
```

```js
function twoReturns() {
  return "I'm the only return that gets executed";
  return "You told me to return.";
  console.log("Hello, World!");
}

twoReturns()
// "I'm the only return that gets executed";
```

### 6 of 7: Parameters and Arguments

So far, we've learned how to re-use code with the aid of functions. We can define a function once, and then invoke it many times. However, during each invocation, we execute the same code with the same static values--the output never changes.

This outcome is analogous to a website that greets every user whom logs into a site with the the following greeting: "Hello, user." How generic; how static! The value of that greeting would be infinitely better if every user could be greeted with their name--"Hello, Danny." To add this behavior to our code, we can include parameters and arguments to our functions.

#### Parameters

When we define a function, we can create variables that are local to a function and assigned during invocation. These specific variables are called parameters:

```javascript
function greet(name) {
  return "Hello, " + name;
}
```

Let's view what happens when we now invoke `greet`:

```javascript
function greet(name) {
  return "Hello, " + name;
}

greet();
// "Hello, undefined"
```

Hmmmm... Not quite what we wanted. We'll need arguments to assign values to our parameters.

#### Arguments

To dynamically assign a value to `name`, we need to pass a value to `greet()` during invocation. An argument is passed by putting a variable or value in an invocation's parenthesis. The position of this argument will correspond with the position of the parameter. We'll write some example code to make this process clearer:

```javascript
function greet(name) {
  return "Hello, " + name;
}

greet("Homer");
// "Hello, Homer"
```

`"Homer"` is the first argument passed when invoking `greet()`. During invocation, `"Homer"` is assigned to the first parameter of `greet()`, `name`.

### 7 of 7: The keyword `arguments`

Awesome, there's going to be situations where we may want to quickly access information about the arguments being passed in during invocation. Some information may be reading the number of arguments; or we may want to have the ability to accept a variable number of arguments. In both of these situations, we want to utilize a keyword that exists only inside of functions: `arguments`. This keyword exhibits the following behavior:

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

# Conclusion

During this lesson, we've learned and wielded the immense power of functions. We can now re-use code whenever we want. We can also pass dynamic values, which is incredibly cool. Keep practicing what we've learned. Your journey to mastering JavaScript depends on your understanding of functions.


# Function Exercises
- Write a function that accepts two parameters and always returns a message saying the first argument is cooler.

```javascript
function whoIsCooler(me, you) {
  // your code here...
}
whoIsCooler(‘Mel’, ‘Jill’);
// ‘Mel is cooler!’

```

- Write a function that takes 1 single parameter and calls another function to determine if the number is even or odd. If even, it doubles and returns the number, if odd, it triples and returns the number.

```javascript
function numberMagic(num){
  if ( evenNumber(num) ) {
    // do something
  } else if ( oddNumber(num) ) {
    // do something
  }
}
function evenNumber (...) {
  // your code
}
function oddNumber (...) {
  // your code
}
numberMagic(2);
// 4

numberMagic(3);
// 9
numberMagic(‘a’);
// ‘That’s not a number!’

numberMagic(8);
// 16

numberMagic(9)
// 27
```



- Write a function that has no parameters but will return the meaning of life if invoked with the magic number of 42 => “Code like a champion!”. Otherwise it will return a random message like: “It’s a mystery...”, “Life is but a dream”, “I like cookies and milk”.

```javascript
function lifesMeaning(){
 // your code here
}
lifesMeaning();
// “It’s a mystery…”

lifesMeaning(‘tell me’);
// “Life is but a dream”

lifesMeaning(42);
// “Code like a champion!”

```

- Write a function without parameters that sums up all numbers and ignores everything else. It should convert number strings to numbers. So ‘9’ should be converted to 9. If no numbers are passed, it should return ‘Nothing to sum here…’. If the sum is 21, it should always return ‘blackjack’.

```javascript
function sumMagic() {
  // your code here
}
sumMagic(‘a’, 1, 5);
// 6

sumMagic(‘a’, ‘c’);
// ‘Nothing to sum here…’

sumMagic(1, 3, 9);
// 13

sumMagic(‘5’, 5, ‘apple’, 11);
// ‘blackjack’

```
- DJ Khaled what are the keys to success? Write a function that says “Another one!” waits for 1 second and says “Another one!”.
On the (N)th time it logs “I’m DJ Khaled!” and exits execution.

```javascript
function whatIsTheKeyToSuccess(n) {
 // your code here
}
whatIsTheKeyToSuccess(4);
// “Another one!”
// “Another one!”
// “Another one!”
// “I’m DJ Khaled!”
```
- function whoIsTaller takes 2 parameters and always returns ‘a’ is taller than ‘b’. However if ‘Beyonce” is a parameter, she will always be taller.

Also if a third argument is passed, this person will always be the tallest, even if Beyonce is an argument.

```javascript
function whoIsTaller(a, b) {
 // your code here
}
whoIsTaller(‘Beyonce’, ‘Bruno Mars’);
// ‘Beyonce’

whoIsTaller(‘Joe’, ‘Beyonce’, ‘Sally’);
// ‘Sally’

whoIsTaller(‘Joe’, ‘Beyonce’);
// ‘Joe’’
```

## Resources

https://github.com/mjhea0/javascript-functions
