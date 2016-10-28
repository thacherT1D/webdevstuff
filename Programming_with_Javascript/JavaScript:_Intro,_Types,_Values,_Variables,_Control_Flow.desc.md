## Objectives

- Describe what JavaScript is.
- Describe what ECMAScript is.
- Explain why JavaScript is important.
- Name all primitive data types in JavaScript.
- Explain what a variable is.
- Explain the difference between `=`, `==`, and `===` in JavaScript.
- Explain what type conversion is.
- Name all the "falsy" values in JavaScript.
- Explain the difference between a value, an expression, and a statement.
- Conditionals
- Explain what a function is.
- Write a function that takes parameters.
- Write a function that returns a value.

## What's JavaScript?

**JavaScript** is a high-level, dynamic, untyped, and interpreted programming language that's primarily used to change how a website looks and behaves when a user interacts with it. For this reason, JavaScript is an essential technology for web developers and, therefore, the central focus of our in-person training.

JavaScript was developed at the Netscape Communication Corporation by Brendan Eich in 10 days and was first released in May 1995. Despite the name, JavaScript is essentially unrelated to Java, a programming language created by James Gosling of Sun Microsystems. JavaScript was originally named "LiveScript" but was renamed in a co-marketing deal between Netscape and Sun. In exchange for the "Java" trademark, Netscape bundled Sun's Java runtime within their then-dominant browser Netscape Navigator. In actuality, the two languages are about as similar as "car" and "carpet".

Since the mid 90s, JavaScript has become one of the most popular programming languages on the Web. Initially, however, many professional programmers criticized the language because its target audience consisted of web masters and other "amateurs". The advent of something called Ajax, which became a standard in 2006, returned JavaScript to the spotlight and brought it more professional programming attention. The result has been a proliferation of comprehensive frameworks and libraries, improved JavaScript programming practices, and increased usage of JavaScript outside of web browsers as seen by server-side platforms like Node.js.

### Exercise

Turn to a partner and describe what JavaScript is in your own words.

## What's ECMAScript?

**ECMAScript** is a standardized specification of JavaScript. Because of the widespread success of JavaScript as a client-side scripting language, Microsoft developed a compatible dialect of the language naming it JScript to avoid trademark issues. JScript added new date methods to alleviate the Y2K bug and was included in Internet Explorer 3.0 which was released in August 1996.

In response, Netscape delivered JavaScript to Ecma International for standardization. Work on standardization began in November 1996 and the first edition of ECMAScript was adopted in June 1997. Several editions of the language standard have been published since then. The name ECMAScript was a compromise between the organizations involved in the standardization process, especially Netscape and Microsoft whose disputes dominated the early standards sessions. Brendan Eich once commented that "ECMAScript was always an unwanted trade name that sounds like a skin disease."

There are six editions of ECMAScript published. Work on version 6 of the standard, codenamed "Harmony", was finalized in June 2015. You'll commonly see version 6 called both ES6 and ES2015 for short.

| Edition |	Date published                         |
|---------|----------------------------------------|
| 1       | June 1997                              |
| 2       | June 1998                              |
| 3       | December 1999                          |
| 4       | Abandoned due to political differences |
| 5       | December 2009                          |
| 5.1     | June 2011                              |
| 6       | June 2015                              |
| 7       | June 2016                              |
| 8       | Work in progress                       |

To see what kind of support your browser has of the ECMAScript standard, check out this [compatibility table](http://kangax.github.io/compat-table/es6/).

**QUESTION:** Which browser has the best support? Which browser has the worst support?

### Exercise

Turn to a partner and describe what ECMAScript is in your own words.

## Why is JavaScript important?

JavaScript allows web developers to make web pages interactive, dynamic, and awesome. Here are some really cool examples of JavaScript in the wild.

- [Password Strength Meter](http://codepen.io/pankajparashar/details/bFhyf/)
- [Fullscreen Overlay Effect](http://codepen.io/taniarascia/full/yYrXRG/)
- [Page Loading Effect](http://codepen.io/v_trefil/full/oxmdqw/)
- [Image Grid Effect](http://codepen.io/osublake/full/RNLdpz/)
- [3D Grid Effect](http://codepen.io/marciopuga/full/dozyLm/)

### Exercise

What are some websites you frequently use? Revisit them and try to figure out which parts are using JavaScript. Once you've selected a favorite, show it to a partner and explain why JavaScript is important on this website.

## How do you write JavaScript?

Most of this will be a review of the precourse, so we'll be going over this fairly quickly. However, we're going to open Atom and play with JavaScript's syntax.

To start, navigate to your `week01` folder and create a `jsBasics.html` file.

```shell
touch jsBasics.html
```

Now open the newly created file in Atom.

```shell
atom jsBasics.html
```

Add an opening and closing `<script>` tag to the HTML file and add a `console.log()` statement.

```html
<script>
  console.log('Test');
</script>
```

Open this file in Chrome.

```shell
open jsBasics.html
```

To see the result of the script, open the Chrome DevTools using the keyboard shortcut Command + Option + J.

### Comments

Comments are used to add hints, notes, suggestions, or warnings to JavaScript code. This can make it easier to read and understand code. They can also be used to disable code, preventing it from being executed, which is a valuable debugging tool. JavaScript has two ways of creating comments in code.

The first way is with the double forward slash `//` style. This turns the following text on the same line into a comment.

```javascript
// This is a one line JavaScript comment
```

The second way is with the forward slash star `/* */` style, which is more flexible. For example, you can use it on a single line.

```javascript
/* This is a one line JavaScript comment */
```

Or you can use it to make a multi-line comments.

```javascript
/* This comment spans multiple lines. Notice
   that we don't need to end the comment on the first line. */
```

Most of the time, you'll use the `//` style because Atom can toggle whether or not a line is commented out using the `Command` + `/` keyboard shortcut. Go ahead, try it out!

See the [comments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments) documentation on the Mozilla Developer Network for more information.

### Data types

The latest ECMAScript standard defines seven data types:

- Six data types that are primitives:
  - Boolean
  - Number
  - String
  - Undefined
  - Null
  - Symbol
- and Object

A **primitive** is data that's immutable. In other words, data that can't be changed.

For example, the number `42` in JavaScript is a primitive. That means the value can never be anything other than `42`. Adding `1` to it doesn't change its value, but instead, results in the number `43`, a completely new and equally unchangeable number. This may sound a bit confusing and obvious, but it'll make more sense when you learn about changeable data called objects.

See [data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) and [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) on the Mozilla Developer Network for more information.

### Boolean

Boolean represents a logical entity and can have two values—`true` and `false`.

```javascript
// San Francisco is expensive
true;

// Seattle is cheap
false;
```

See the [boolean type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) and [`Boolean` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) on the Mozilla Developer Network for more information.

### Number

In the ECMAScript standard, there's only one number type. And it represents both integer and floating-point (i.e. decimal) numbers between -(2<sup>5</sup><sup>3</sup> - 1) and 2<sup>5</sup><sup>3</sup> - 1.

```javascript
// integer numbers
-3;
-2;
-1;
0;
1;
2;
3;

// floating-point (i.e. decimal) numbers
-42.42;
-2.718;
-0.25;
.66666667;
3.14;
199.99;
```

If you want to distinguish between integers and floats, there are a couple of ways to do this. The most modern approach, as of ES6, is to use the `Number.isInteger()` function.

```javascript
Number.isInteger(4);    // true
Number.isInteger(4.1);  // false
Number.isInteger(4.0);  // true
```

Additionally, the number type has three symbolic values: `Infinity`, `-Infinity`, and `NaN` (not-a-number). To determine if a number is finite or not-a-number, use the `Number.isFinite()` and `Number.isNaN()` functions respectively.

**TIP:** Both n's of `NaN` must be uppercase otherwise JavaScript will throw an error.

```javascript
Number.isFinite(100);       // true
Number.isFinite(Infinity);  // false
Number.isFinite(-Infinity); // false

Number.isNaN(200);      // false
Number.isNaN('string'); // false
Number.isNaN(NaN);      // true
```

See the [number type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) and [`Number` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) on the Mozilla Developer Network for more information.

### String

JavaScript's string type is used to represent textual data. To create a string, simply append and prepend a series of characters with either single or double quotation marks. Which quotations you use is a matter of style, however, our preference in this course will be to use single quotes for a JavaScript string unless its text contains a single quote.

```javascript
'Jane loves JavaScript';
"John's dog ate his homework";
```

Each character in the string occupies a position in the string. The first character is at index `0`, the next at index `1`, and so on. The `length` of a string is the number of characters in it.

```javascript
'melissa'.length;       // 6
'melissa'[0];           // 'm'
'melissa'.substr(1);    // 'elissa'
'melissa'.substr(2, 2); // 'li'
```

There are a number of built-in methods associated with strings.

```javascript
'matt'.toUpperCase(); // 'MATT'
'MATT'.toLowerCase(); // 'matt'

'Matt'.indexOf('a');  // 1
'Matt'.indexOf('at'); // 1
'Matt'.indexOf('ab'); // -1

'Matt'.indexOf('t');      // 2
'Matt'.lastIndexOf('t');  // 3

'Matt'.startsWith('Ma');  // true
'Matt'.endsWith('q');     // false
'Matt'.includes('t');     // true
```

See the [string type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) and [`String` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) on the Mozilla Developer Network for more information.

### Variables

In JavaScript, variables allow you to give a name to a value. Think of a variable as a bucket that can store one thing inside of it.

To declare (i.e. create) a new variable, use the `let` keyword followed by an identifying name. Once declared, a variable can be assigned a value.

**NOTE:** A **keyword** is a word that has special meaning and is [reserved by the ECMAScript standard](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords).

```javascript
let person = 'Jane';
```

In the past, you may have declared variables using the `var` keyword. The `let` keyword is new in ES6. Using `let` is very similar to using `var`, but has some slight advantages which we'll talk about later. In this course, we want you to prefer using `let` over `var`.

A variable has the ability to have its value reassigned. After all, the word variable means 'can change' or 'can vary'. However, if you put a new value in a variable, the old one goes away.

**TIP:** Once it's declared, you don't need to use the `let` keyword again.

```javascript
let person = 'Jane';
person = 'John';
```

A variable can also be declared without assigning it a value. The value of an unassigned variable is `undefined`, which we'll talk about later.

```javascript
let day;  // the value of day is undefined

day = 'Monday';
day = 'Tuesday';
```

Additionally, a JavaScript variable can store many different types of values.

```javascript
let name = 'Casey';
name = true;
name = 42;
```

Variable names in JavaScript can't contain spaces. The standard practice is to have variables start with a lowercase letter and capitalize each subsequent word. This is called **camelcase**.

```javascript
let firstName = 'Paula';
```

Be careful with your variable names because it's easy to misspell them. Even if you just get the capitalization wrong, the JavaScript interpreter won't know what you mean and throw a `ReferenceError`.

```javascript
let lastName = 'Dean';
lastname;  // ReferenceError
```

Variable names also can't start with numbers. If needed, it's common to append numbers at the end of a variable name.

```javascript
let person1;
let person2;
```

Variables can also store the result of any expression.

```javascript
let result = 5 * 8;
```

**QUESTION:** Given the above code, what is the value inside the result variable?

### Constants

Similarly, the `const` keyword is used to declare a constant. Think of a constant as a bucket that must be assigned a value when declared and cannot have its value reassigned later.

```javascript
const name = 'Casey';
```

If you tried to declare a constant without assigning it a value, JavaScript will throw a `SyntaxError`.

```javascript
const name;  // SyntaxError: Missing initializer in const declaration
```

If you tried to reassign a constant with a new value, JavaScript will throw a `TypeError`.

```javascript
const name = 'Chad';
name = 'Francis';  // TypeError: Assignment to constant variable
```

It's totally fine to always use `let` in your code. However, many professional programmers reach for `const` first, to get the extra syntax checks, and change their code to `let` on a case-by-case basis.

### Undefined

`undefined` represents a value that has not been defined. If a variable is declared without being assigned a value, its value is automatically set to `undefined`.

```javascript
let x;
x;  // the value of x is undefined

x = 40;
x;  // the value of x is no longer undefined
```

**QUESTION:** Given the above code, what's the new value of `x`?

See the [`undefined` global property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) on the Mozilla Developer Network for more information.

### Null

The value `null` represents the intentional absence of any value. Unlike `undefined`, it's not explicitly set by default to unassigned variables. If you want something to be `null`, you must make it so.

```javascript
let x = null;
```

See the [`null` value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) on the Mozilla Developer Network for more information.

Further reading:

- [What is the difference between null and undefined in JavaScript?](http://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript)
- [Why is typeof null "object"?](http://stackoverflow.com/questions/18808226/why-is-typeof-null-object)

### Symbol

Symbol is the newest primitive data type to be added to JavaScript. Talking about symbols is a bit advanced for the first day of JavaScript, especially since we haven't talked about objects yet. If you want a sneak peak, see the [`Symbol` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) on the Mozilla Developer Network for more information.

### Arithmetic operators

JavaScript lets you perform basic arithmetic operations like addition, subtraction, multiplication, and division using the `+`, `-`, `*`, and `/` operators respectively. The arithmetic rules and order of operations apply as expected.

```javascript
1 + 1;  // 2
4 - 8;  // -4
3 * 4;  // 12
5 / 2;  // 2.5
```

In JavaScript, the remainder operator (`%`) finds the remainder after division of one number by another.

```javascript
4 % 2;  // 0
4 % 3;  // 1
10 % 7; // 3
12 % 3; // 0
```

**QUESTION:** How can you use the `%` operator to check whether or not an integer is even or odd?

The `+` operator can also be used for **string concatenation**.

```javascript
'Hello ' + 'world!';  // 'Hello world!'
```

Notice that the meaning of the `+` operator depends on the data types of the operands. Be careful when you combine different meanings of `+` in the same expression because JavaScript adheres to arithmetic's **order of operations**.

```javascript
'The sum of ' + 5 + ' and ' + 7 + ' is ' + 5 + 7;
```

**QUESTION:** How might you fix the above expression so it evaluates correctly?

See the [arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators) on the Mozilla Developer Network for more information.

### The Number global object

Using the following methods in the `Number` global object, you can convert a string to a number.

```javascript
Number.parseInt('42');         // 42
Number.parseFloat('3.14');     // 3.14
Number.parseInt('forty two');  // NaN
```

See the [`Number` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) on the Mozilla Developer Network for more information.

### The Math global object

JavaScript also has a `Math` global object that has properties and methods for mathematical constants and functions.

```javascript
// pi
Math.PI; // 3.141592653589793

// 2⁴
Math.pow(2, 4);  // 16

// √4
Math.sqrt(4);  // 2

// Round down to an integer
Math.floor(3.14);  // 3
Math.floor(3.99);  // 3

// Round up to an integer
Math.ceil(5.10);  // 6
Math.ceil(5.99);  // 6

// Round to the nearest integer
Math.round(7.25);  // 7
Math.round(7.5);   // 8
Math.round(7.99);  // 8
```

You can also use the `Math` object to generate random numbers.

```javascript
// Generate a random number from 0 up to but not including 1
Math.random();  // .229375290430

// Generate a random number from 0 up to but not including 10
Math.random() * 10;  // 7.133676137309521

// Generate a random number from 1 up to but not including 11
Math.random() * 10 + 1;  // 3.390042587649077

// Generate a random number from 1 and 10
Math.floor(Math.random() * 10 + 1);  // 8
```

See the [`Math` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) on the Mozilla Developer Network for more information.

### Logical operators

Logical operators `&&` (and), `||` (or) and `!` (not) are typically used with boolean values. When they're used, they return a boolean value.

```javascript
true && true;    // true
true && false;   // false
false && true;   // false
false && false;  // false

true || true;    // true
true || false;   // true
false || true;   // true
false || false;  // false

!true;           // false
!false;          // true
```

As logical expressions are evaluated left to right, they are tested for possible "short-circuit" evaluation using the following rules.

```javascript
false && anything;  // Short-circuit evaluated to false
true || anything;   // Short-circuit evaluated to true
```

See the [logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) on the Mozilla Developer Network for more information.

### Relational operators

Relational operators `>` (greater than), `>=` (greater than or equal to), `<` (less than), and `<=` (less than or equal to) are used to compare the values of two numbers.

```javascript
7 < 7;   // false
7 <= 7;  // true
```

Relational operators are used to compare the values of two strings as well.

```javascript
'a' > 'a';   // false
'a' >= 'a';  // true

'a' > 'b';   // false
'a' >= 'b';  // false

'b' > 'a';   // true
'b' >= 'a';  // true
```

See the [relational operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Relational_operators) on the Mozilla Developer Network for more information.

### Equality operators

The triple equals `===` operator compares two values to see if they're strictly equal (i.e. exactly the same) to one another. The operator evaluates to `true` if the values are equal and are the same type.

```javascript
4 === 3;    // false
3 === 3;    // true
3 === '3';  // false
```

Conversely, the `!==` operator evaluates to `true` if the values are not equal and/or are not the same type.

```javascript
4 !== 3;    // true
3 !== 3;    // false
3 !== '3';  // true
```

Be careful not to confuse the `===` operator with the single equal `=` operator. The `===` operator asks "Are these two values strictly equal?" while the `=` operator means "Assign the value on the right to the variable on the left." In short, the `===` operator is used for **comparison** and the `=` operator is used for **assignment**.

Remember, when you use the `=` operator, a variable name _must_ be on the left and the value you want to assign to that variable _must_ be on the right. On the other hand, since the `===` operator compares two values to see if they're strictly equal, it doesn't matter which value is on which side.

Related to the `===` and `!==` operators are the `==` and `!=` operators respectively. The double equals `==` operator compares two values to see if they're loosely equal (i.e. equal-ish) to one another. The operator evaluates to `true` if the values are equal even if they're not the same type.

```javascript
4 == 3;    // false
3 == 3;    // true
3 == '3';  // true
```

Conversely, the `!=` operator evaluates to `true` if the values are not equal even if they're not the same type.

```javascript
4 != 3;    // true
3 != 3;    // false
3 != '3';  // false
```

At first it might seem much easier to use the `==` operator instead of the `===` operator. However, the `==` operator in JavaScript often produces some unexpected results.

```javascript
true == 1;       // true
true == 'true';  // false
```

When JavaScript compares two values with the `==` operator, it first converts them to the same type. In the first example, it converts the boolean `true` into the number `1` which is why `true == 1` is true. In the second example, it converts the boolean `true` into the number `1` _and_ the string `'true'` into the number `NaN` which is why `true == 'true'` is false. Because of [this and other strangeness](https://dorey.github.io/JavaScript-Equality-Table/), always use `===`.

See the [equality operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality_operators) on the Mozilla Developer Network for more information.

### Exercise

For each of the following expressions, make a prediction about its value and check to see if you're right by running it in the browser.

```javascript
1 == 1
1 === '1'
1 == 'zero'
1 != '000'
0 !== ''
0 !== 'refrigerator'
```

Turn to a neighbor and discuss which expressions surprised you. Also, discuss the difference between the `===`, `==`, and `=` operators in your own words.

### Values, Expressions, and Statements

So far, we've used the terms value and expression a bunch. Let's take a second to define what each one means. In JavaScript, an individual piece of information is referred to as a **value**.

```javascript
3
'Hello'
false
undefined
```

And an **expression** is any valid code that evaluates to a value.

```javascript
9 - 3  // evaluates to the value 6
```

Roughly, a **statement** performs an action. The first statement we'll look at is an `if` statement.

### If statements

An `if` statement controls the flow of a program. It decides which code gets run based on a condition. An example from everyday life would be, "If you spend $100 or more, then you get 20% off the price, otherwise you must pay the full price."

Here is how you would represent the above statement in code.

```javascript
const price = 284;

let total;

if (price >= 100) {
  total = price * 0.8;
}
else {
  total = price;
}
```

Let's practice with some other if statements!

```javascript
if (1 + 1 === 2) {
  console.log('Arithmetic is the best');
}

if (1 + 1 !== 2) {
  console.log('Math is broken.');
}
```

We can also combine these two statements using `if...else`:

```javascript
if (1 + 1 === 2) {
  console.log('Arithmetic is the best');
} else {
  console.log('Math is broken');
}
```

**NOTE:** Remember the parentheses!

For each of these examples, try to determine what the console will log:

```javascript
if (2 > 1) {
  console.log('A');
} else {
  console.log('B');
}

if (2 > 1 && 5 <= 3) {
  console.log('C');
} else {
  console.log('D');
}

if (7 % 2 === 0 || Number.isInteger(3.4)) {
  console.log('E');
} else if (6 <= Math.floor(5.8)) {
  console.log('F');
} else {
  console.log('G');
}
```

See the [operator precedence](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence) documentation on the Mozilla Developer Network for more information.

### Type Conversion

Sometimes, your code uses a value of one type when JavaScript expects a value of a different type. In this case, rather than throwing an error, JavaScript will convert the value into a type that makes sense.

For example, suppose you type the expression `1 + 'hi'`. For numbers, the `+` operator means addition; but for strings, it means concatenation. So how does JavaScript deal with this ambiguity? It converts the number into a string and then concatenates.

This **type conversion** also happens when you pass values into `if` statements. In a block of code like `if (x) {...}`, the `x` variable is expected to be a boolean. But if it's not, JavaScript will convert it to a boolean. Most values in JavaScript are "truthy". That is, they get converted into `true` should the need arise. In fact, there are only six "falsy" values in JavaScript.

1. `false`
1. `null`
1. `undefined`
1. `0`
1. `''`
1. `NaN`

See the [falsey](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) and [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) documentation on the Mozilla Developer Network for more information.

You can always check something's type in JavaScript using the `typeof` operator.

```javascript
typeof true // 'boolean'
typeof 42   // 'number'
typeof 'hi' // 'string'
```

See the [typeof operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) on the Mozilla Developer Network for more information.

### Exercise

Turn to your neighbor and list the six types of falsy values in JavaScript.

## What is a Function?

In one sentence, we can say that a function is a sequence of instructions that achieve a specific task. A recipe (e.g., making pumpkin pie) or a manual (e.g. assembling a coffee table from IKEA) are great analogies for functions.

The key aspect of functions is their ability to be run over and over again and combined to make new processes and workflows. Functions truly are the building blocks for ALL applications.

### Exercise

What are some other examples of functions you encounter in daily life?

## Example Function

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
1. Instructions - a number of optional instructions enclosed in curly braces; also called the "body" of the function.

## Creating and Invoking Functions

We've now established the syntax of a function. Let's apply this knowledge to create a function named `greet()`, which will log to the console the string "Hello, World!":

```javascript
function greet() {
  console.log('Hello, World!');
}
```

Awesome, you just created a function. If we want to see the value of our function, we just type the name of the function into `console.log()` statement:

```javascript
function greet() {
  console.log('Hello, World!');
}

console.log(greet);
// function greet() {
//  console.log("Hello, World!");
// }
```

Similar to the real world, functions consist of two processes: first, creation of the instructions; second, execution of the instructions.

To this point, we've just created a recipe for `greet`, we haven't actually told anyone or anything to execute the instructions in our function.

To execute the code inside our curly braces, we need to use the parentheses `()` operator next to the name of our function:

```javascript
function greet() {
  console.log('Hello, World!');
}

console.log(greet());
console.log(greet());
console.log(greet());

// "Hello, World!"
// undefined
// "Hello, World!"'
// undefined
// "Hello, World!"
// undefined
```

That's it! Now we can re-use the instructions of `greet` whenever we want. Above, we just invoked it 3 times. :)

### Exercise

Write a function called `yell` that prints out a phrase 5 times in a row. On the 5th iteration, the phrase should be in all caps and have an extra exclamation point at the end. Example output is below:

```javascript
yell(); // You must implement this function
// my phrase
// my phrase
// my phrase
// my phrase
// MY PHRASE!
```

## Functions With Parameters

So far we have created functions that do the same exact thing every time. Often times, we want a function to change behavior based on a set of inputs. Function parameters allow us to create functions with input.

The function example we saw earlier has two parameters:

```javascript
function hello(name, age) {
  console.log('Hello, ' + name + '. You are ' + age + ' years old'.);
}
```

The parameters are `name` and `age`. They are variables that are used in the function.

**NOTE:** A **parameter** is a variable in a function definition. When a function is called, the data you pass in are referred to as **arguments**.

```javascript
function hello(name, age) {       // parameters
  console.log('Hello, ' + name + '. You are ' + age + ' years old'.);
}

hello('Susan', 27);  // arguments
```

### Exercise 1

Create a function call `capWord` that prints out a word and then prints out the capitalized word.

```javascript
capWord('awesome'); // You must implement this function
// awesome
// Awesome
```

### Bonus

Modify your function so that it also prints out the word with both the first and last letters capitalized.

```javascript
capWord('awesome'); // You must implement this function
// awesome
// Awesome
// AwesomE
```

## The keyword `return`

We have now seen functions that take a set of inputs as parameters. It is also often desirable to return a value from the function. Our function examples have all been printing to the console, but in many cases we want the function to return a value for us. For example:

```javascript
const total = sum(5, 20);
```

In the example above, sum is a function that takes two parameters. The values are summed in the function and the result will be returned and saved in the variable `total`.

The implementation of sum looks like this:

```javascript
function sum(num1, num2) {
	return num1 + num2;
}
```

Now let's write a function called `calculate` that takes three arguments: `num1`, `num2`, and a string representing addition or subtraction (`'+'` or `'-'`).  The function should decide which math operation to perform, then call either a `sum` or `subtract` function for the appropriate operation. For example, `calculate(4, 5, '+');` should call the `sum` function, which looks like this `sum(4, 5)` and returns the value `9`.

```javascript
function sum(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function calculate(num1, num2, operator) {
	if (operator === '+') {
		return sum(num1, num2);
	}

	return subtract(num1, num2);
}
```

### Exercise

- What is the output to the console with the following function invocation?

```javascript
console.log(calculate(10, 5, '+'));
```

- With the following function invocation, which return statement is executed (the first, the second, or both)?

```javascript
console.log(calculate(20, 6, '-'));
```

- Modify the `calculate` function so that it can also perform multiplication and division if a use passes in `*` or `/` as the third argument.

### Further Reading

Want to dig deeper? Read chapters 1 and 2 in [Eloquent JavaScript](http://eloquentjavascript.net/). A word of caution though: this book is great but not very beginner friendly.

## Assessment

https://github.com/gSchool/wd-javascript-fundamentals

## Resources

- [Mozilla Developer Network - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Quick history of JavaScript by Douglas Crockford](https://www.youtube.com/watch?v=t7_5-XYrkqg)
- [Wikipedia: Ajax (programming)](https://en.wikipedia.org/wiki/Ajax_(programming)
- [Wikipedia: ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)
- [Wikipedia: JavaScript](https://en.wikipedia.org/wiki/JavaScript)
