## Introduction to JavaScript

GOAL: what is the value of this expression: `!(typeof(9) === typeof(9.5) && (99 == "99" || !true))`

### History of Javascript

* Not to be confused with Java, but it is the baby child of Java syntax & Scheme principles
* Created in 10 days in May 1995 by [Brendan Eich](http://en.wikipedia.org/wiki/Brendan_Eich)
* It's an exciting time to learn Javascript! It's the language that enables web pages to respond to user interaction beyond the basic level.
* The language today is viewed quite differently than how it was 10 years ago

[The famous Douglas Crockford gives a thorough introduction of Javascript](https://www.youtube.com/watch?v=t7_5-XYrkqg)

### Why Should YOU Care About Javascript
* Can use the same language on the front-end and the backend with Node.js
* JS serves as a platform to host other languages as well, e.g. CoffeeScript or ClojureScript
* Many popular libraries built with JS - jQuery, Underscore.js, Sugar

Javascript allows us to make our pages interactive and dynamic and awesome.   Here are some very common uses for JS on the front-end:

* [Password Strength Meter](http://codepen.io/oscarekholm/pen/zicjg)
* [Simple Navigation Menu](http://codepen.io/markmurray/pen/efcjp)
* [Overlay Effects](http://tympanus.net/codrops/2014/02/06/fullscreen-overlay-effects/)
* [Page Loading Effects](http://tympanus.net/codrops/2014/04/23/page-loading-effects/)
* [Image Carousel](http://codepen.io/ApplePieNIceCream/pen/DkxIj)
* [Parallax Scroll and Blur](http://codepen.io/sallar/pen/lobfp)

Some other more complex uses for JS:

* [Interactive Music Video](http://lights.helloenjoy.com/)
* [Jam With Chrome](http://www.jamwithchrome.com/)
* [Patatap](http://www.patatap.com/)
* [Arcade Fire Reflektor Music Video](http://www.chromeexperiments.com/detail/just-a-reflektor/?f=)
* [Walmart Website](http://www.walmart.com/)

###Javascript Console
- Allows you to easily interface with your app to run JS commands and display log messages for help with debugging
- Shortcut to open JS console & bring focus to console
  - Mac: Cmd + Opt + J
  - Linux: Ctrl + Shift + J
- Use Tab for autocompletion!

Go to [Google](http://www.google.com) and try pasting the following code into your console:

```
var logo = document.getElementById('hplogo');
logo.onclick = function () { this.src = "https://media.giphy.com/media/TxjAakMUtgPN6/giphy.gif"; this.srcset=""; this.height="204"; }
```
And then try this:

```
function makeWider() { 
  var logo = document.getElementById('hplogo'); 
  logo.width += 5; 
}

setInterval(makeWider, 41.67)
```

Lastly, try this:

```
javascript:document.body.contentEditable='true'; document.designMode='on'; void 0
```

### Comments

Comments come in two forms 

  * line comments
  
   ```
   // descriptive stuff
   ```
  * multiline comments
  
  ```
  /*
    These 
    are
    comments on
    many lines
  */
  
  ```

## JS Primitive Data Types:

What's a primitive data type? For now, you can think of a primitive data type as anything in Javascript that is not an object (we'll get to objects in just a bit).

There are six primitive data types in Javascript: string, number, boolean, null, undefined, and (as of ES2015) symbol. In particular, array is not a primitive data type. We'll discuss each of these types briefly below. Oh, also, array is not a primitive data type. And while we're on the subject, do you know what is NOT a primitive data type? That's right, array!

Exercise: Give an example of something that is not a primitive data type. (Hint: Say array.)

References:

- [Primitive](https://developer.mozilla.org/en-US/docs/Glossary/Primitive)
- [JavaScript data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

### Number

Numbers are, well, numbers. They come in two flavors:

* Integers

  ```
   ..., -1,0, 2, 3, 4, 5, ... 
  ```
* Floats (or Decimal numbers)

  ```
   2.718, 3.14, .5, .25, etc
  ```

In JS, both integers and floats have the same data type: number. You can confirm this using the 'typeof' operator. If you want to distinguish between integers and floats, there are a couple of ways to do this. The most modern approach, as of ES2015, is to use the `Number.isInteger()` function.

Examples:

```
Number.isInteger(4) // should return 'true'
Number.isInteger(4.1) // should return 'false'
Number.isInteger(4.0) // should return ???
```

### String

Strings are collections of letters and symbols known as **Characters**, and we use them to deal with words and text in Javascript. 

```
"John", "Jane"
```

There are a number of built-in properties and methods associated with strings:

```
var name = "Matt";
name[0]; // Returns "M"
name.length; // Returns 4
name.toUpperCase(); // Returns "MATT"
name.toLowerCase(); // Returns "matt"
```

ES2015 provides some new methods as well!

```
name.startsWith("Ma"); // true
name.endsWith("Q"); // false
name.includes("t"); // true
```

###  Boolean
A boolean represents logical values **true** or **false**

```
var catsAreGreat = true;
var dogsRule = false;
```

### Undefined

If you declare a variable but don't assign it a value, by default its value will be the primitive `undefined`.

```
var x;
x; // undefined
x = 3; 
x; // no longer undefined!
```

### Null

Null indicates the absence of value, but unlike undefined, it does not get set by default when to unassigned variables. If you want something to be null, you must make it so:

```
var x = null;
```

Further reading:

- [What is the difference between null and undefined in JavaScript?](http://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript)
- [Why is typeof null “object”?](http://stackoverflow.com/questions/18808226/why-is-typeof-null-object)

### Symbol

The last primitive data type is also the newest addition to Javascript, and is called symbol. Talking about symbols is a bit advanced for day 1 of Javascript (especially when we haven't talked about objects yet). When you're ready to learn more about them, [check out the docs!](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

## Values and Expressions
Values are the simplest components in JavaScript. ```1``` is a value, ```true``` is a value, ```"hello"``` is a value, ```function() {}``` is a value.

Types of values like `Number` or `String` are not very useful without being able to form **Expressions** or **Combinations**.

Some common expressions you'll encounter are _mathematical expressions_, using common mathematical operations. Try these on for size:

```
  1 + 1
  => 2
  2 - 1
  => 1
  3 * 4
  => 12
  4 / 2
  => 2
```
You can also create expressions with strings using addition

```
  "Hello, " + "world!"
  => "Hello, world!"
```

This is called **String Concatentation.**

Note that the meaning of `+` depends on what types of values you're working with. Be careful when you combine different meanings of `+` in the same expression: Javascript will attempt to guess at your meaning, but won't always be correct. For example, try putting this into the console:

```
"The sum of " + 5 + " and " + 7 + " is " + 5 + 7
```

Lastly, you can also form expressions with Booleans. Three operations you'll be using quite often are `&&` (and), `||` (or) and `!` (not).

```
var bool1 = true;
var bool2 = false;

bool1 || bool2
=> true

bool1 && bool2
=> false

!bool1
=> false
```

### Special Number Operators

Addition, subtraction, multiplication and division are probably relatively familiar to you. There's a fifth operation which may be less familiar: the **mod** operator, written using the `%` character.

Let's explore the mod operator. Can you guess what it's doing?
```
  4 % 2
  => 0
  5 % 3
  => 2
  10 % 7
  => 3
  12 % 3
  => 0
```

How can you use `%` to check whether or not a whole number is odd?

Javascript can be a little cheap with the number of operations it allows you to do. For example, how is someone supposed to square a number or cube a number easily? Luckily there is a special `Math` object with some very useful methods.

* Taking a number to some `power`? Then just use `Math.pow`

```
// 3^2 becomes
Math.pow(3,2)
=> 9
// 2^4 becomes
Math.pow(2,4)
=> 16
```
* Taking a square root

```
// √(4) becomes
Math.sqrt(4)
=> 2
```
* Need a `random` number? Then use `Math.random`.

```
// The following only returns a random decimal
Math.random()
=> .229375290430
/** 
  The following will return a 
  random number between 0 and 10
*/
Math.random()*10
```

* Since Numbers can be **Floats** or **Integers** we often want to get rid of remaining decimal places, which can be done using `Math.floor`.

```
// Remove the decimal
Math.floor(3.14)
=> 3
Math.floor(3.9999)
=> 3
Number.isInteger(Math.floor(2.5))
=> true
```

### Variables

Having expressions is cool. Storing the values of expressions is even cooler.

To store values we use things called **variables**. 

The word 'variable' means 'can change' or 'can **vary**' and is used because variables can store many different types of values and can change their value many times. 

```
var myNumber = 1;
// or also

var myString = "Greetings y'all!"
```

The main point here is that these variables should always have the `var` keyword and use `camelCase`

Variables can also store the result of any "expression".
For example:

```
var x = 2 + 2;
```
or

```
var name = 'Matt';
var compliment = name + ' is my favorite instructor';
```

## JS Type: undefined 

**undefined**: Represents a value that hasn't been defined

```
var notDefinedYet;
```

A variable that has not been assigned a value is of type undefined. A method or statement also returns undefined if the variable that is being evaluated does not have an assigned value. A function returns undefined if a value was not returned.

**null**: Represents an explicitly empty value

```
var dogsRule = null;
```

## Comparisons

One way to get boolean values in Javascript is by using _comparisons_. Comparisons are operators that allow us to compare two different values. For example, mathematical comparisons are comparisons:

```
5 > 7
=> false
1 + 1 == 2
=> true
7 * 8 > 5 * 9
=> true
1 > 100 || true
=> true
4 != 5
=> true
```

## What's the deal with `=`, `==`, and `===`?

Notice that in the above example, we typed `1 + 1 == 2`, and note `1 + 1 = 2`. In fact, if you type `1 + 1 = 2` into the console, you'll get an error. So what gives?

The key understanding here is the difference between _assignment_ and _comparison_. The single equals sign in Javascript is used for assignment, e.g. assigning a variable to some value. The double equals sign is used for comparison, i.e. to check whether two values are equal. You can't assign one value to another value, but you can always check whether two values are the same.

Related to the `==` comparison operator is the `===` comparison operator. `===` is a stronger operator, as it also checks whether the **type** of the values are the same, while the `==` operator will try to _coerce_ the values into being the same type before comparing. As an exercise, try to predict what boolean each of the following expressions will evaluate to:

```
"3" == 3
=> ???
"3" === 3
=> ???
false == "false"
=> ???
false == 0
=> ???
false === 0
=> ???
```

As a general best-practice, it's better to err on the side of the stronger comparison operator.

Note: You can always check something's type in Javascript using the typeof function! (More on functions later). What's `typeof(4)`? `typeof("what's up?")`?

### Conditionals

Conditionals control the flow of a program.  Conditionals decide which code statements gets run based on some input to the conditional.  An example from everyday life would be:

```
If you spend $100 or more, then you get 20% off, otherwise the purchase is full price
```
In the example above, the input to the conditional is the total amount of your purchase.

### If

The most basic control flow statement is the `if` statement.  Here is our example from above in code:

```
var total = 284; // Some value

if ( total >= 100 ) {
   total = total * .8;
}

// More code to display the total to the user

console.log("Your total is: $" + total.toFixed(2));
```

Let's practice with some other if statements!

```
if (1 + 1 == 2) {
  console.log("Arithmetic is the best");
}

if (1 + 1 != 2) {
  console.log("Math is broken.");
}
```
We can also combine these two statements using `if..else`:

```
if (1 + 1 == 2) {
  console.log("Arithmetic is the best");
} else {
  console.log("Math is broken");
}
```

(Note: Remember the parentheses!)

For each of these examples, try to determine whether the console will output "A" or "B":

```
if (2 > 1) {
  console.log("A");
} else {
  console.log("B");
}

if (2 > 1 && 3 > 5) {
  console.log("A");
} else {
  console.log("B");
}

if (typeof(9) === "string" || !(7 % 4 === 3)) {
  console.log("A");
} else {
  console.log("B");
}

if (1 == "1" && (typeof(typeof(9)) === "string" || Number.isInteger(7.3))) {
  console.log("A");
} else {
  console.log("B");
}
```

### Functions

Very broadly, a _function_ in Javascript is a chunk of code we want to reuse that performs some action or return some value. For example, since I need constant affirmation, here's a function I might call ALL THE TIME:

```
var greatJobMatt = function() {
  console.log("You're doing great, Matt!");
} 
```

I can then call this function by typing `greatJobMatt();`. 

We could create other functions with similar functionality:

```
var greatJobElie = function() {
  console.log("You're doing great, Elie!");
}

var greatJobZubair = function() {
  console.log("You're doing great, Zubair!");
}
```

This code works perfectly well, but it isn't very DRY. The questions we should be asking are: 

  1. Did we repeat ourselves in our code?
  2. Can we make our program simpler?
  3. Can we make our program easier to maintain?

![](http://codyburleson.com/wp-content/uploads/2014/11/dontrepeatyourself_motivator_2.jpg)

### Functions with arguments

Let's clean up all our code from above by consolidating our three functions into a single function:

```
var greatJob = function(name) {
  console.log("You're doing great, " + name + "!");
}

// Try out these commands!

greatJob("Matt");
greatJob("Elie");
greatJob("Zubair");

```

What if we use `return` instead of `console.log`?

We can pass multiple arguments into our functions, too! Let's generalize a step further:

```
var feedback = function(quality, name) {
  console.log("You're doing " + quality + ", " + name + "!"); 
}

feedback("terribly","Matt");
feedback("so-so","Elie");
feedback("super good","Zubair");
```

Note: string concatenation in Javascript can be kind of a pain, and it's super easy to make mistakes: `console.log("Hi," + " how " + " are " + "you" "?");`. In ES6, concatenation can be done slightly differently:

```
var feedback = function(quality, name) {
  console.log(`You're doing ${quality}, ${name}!`); 
}
```

Lastly, if you don't know someone's name, you can always **prompt** them for it:

```
var feedback = function(quality) {
  var name = prompt("What's your name?");
  console.log(`You're doing ${quality}, ${name}!`); 
}
```

Note that in ES6, it's possible to write simple functions even more succinctly with **arrow functions**

```
var feedback = (quality, name) => "You're doing " + quality +", " + name + "!";
var double = (x) => 2*x;
```

### Functions and Conditionals

Now let's combine functions with a little bit of _flow control_.

#### Exercise

Let's write a program that prompts for a users name, then says hello to the user. The program should have a special hello prompt if the user enters your name.  Here is an example input and output:

```
> Please enter your name: Chris

Hello Chris.  What are you doing here?

> Please enter your name: Matt

Hello Meticulous Matt!! Hope you're having an AWESOME day!
```

### Multiple If Statements

A program can have multiple if statements when we have multiple control flow needs.  For example, we could have a special greeting for multiple names:

```
var name = prompt("Please enter your name:");

if (name === "Matt") {
   console.log("Hi Matt! Good to see you again!");
}

if (name === "Elie") {
   console.log("Hi Elie! You're looking good!");
}

if (name !== "Matt" && name !== "Elie") {
   console.log("Hello " + name + ".  What are you doing here?");
}
``` 

Using our store discount example.  How would we express 25% off for a purchase of $300 or more and 20% off for a purchase of $100 or more?

### If, else

The multiple if statement code we've written so far can get a little confusing.  It is really more suited for an if else control flow statement.  If else statements work together.  Here is the basic flow and syntax:

```
if ( /*some expression */) {

    // If the expression is true, run this code

} else {

    // If the expression was false, run this code instead.

}
```

We can string together if else statements like this:

```
if ( /*some expression */) {
    // run this code
} else if ( /* some other expression */ ) {
    // run this code only if the first expression is false and this expression is true
} else {
    // run this code if the first two expressions were false
}
```

Rewrite your code from before to use the if/else if control flow. This is an example of **refactoring**.

### Booleans and Comparison Review

Let's take a minute to review booleans and comparisons.  What does the following expression evaluate to?

```
var bankAccount = 7000; // I'm rich in most cities other than SF
var RENT = 3000;
var CAR_INSURANCE = 250;
var COMCAST = 115; // Way too expensive
var CAR_PAYMENT = 120;
var NEW_PET_COST = 3000; // An extravegent pet
var funSpending = prompt("How much fun money are you going to spend? ");
var areYouFinanciallyWise = prompt("Are you financially wise? ");

if (areYouFinanciallyWise === "no") {
    areYouFinanciallyWise = false;
} else {
    areYouFinanciallyWise = true;
}

if ((bankAccount > RENT + CAR_INSURANCE + CAR_PAYMENT + COMCAST + funSpending) || !areYouFinanciallyWise) {
     console.log("Buy yourself something nice. You're worth it.");
} else {
     console.log("You probably should save your money.");
}
```

### Homework

1. [Basic JS](https://github.com/gSchool/basic-js)
2. Read Chapters 1 and 2 in [Eloquent Javascript](http://eloquentjavascript.net/) - we'll be covering some of Chapter 2 tomorrow, so if you don't finish it all, that's ok!
