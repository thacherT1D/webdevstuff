## Objectives

- Describe what JavaScript is.
- Describe what ECMAScript is.
- Explain why JavaScript is important.
- Name all primitive data types in JavaScript.
- Explain what a variable is.
- Explain the difference between a value and an expression
- Explain the difference between `=`, `==`, and `===` in JavaScript.
- Explain simple control flow examples using `if` statements.
- Explain what type conversion is.
- Name all the "falsy" values in JavaScript.

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
| 1       |	June 1997	                             |
| 2       |	June 1998                              |
| 3       |	December 1999                          |
| 4	      | Abandoned due to political differences |
| 5       |	December 2009                          |
| 5.1	    | June 2011                              |
| 6	      | June 2015                              |
| 7	      | Work in progress	                     |

To see what kind of support your browser has of the ECMAScript standard, check out this [compatibility table](http://kangax.github.io/compat-table/es6/). Which browser has the best support? Which browser has the worst support?

### Exercise

Turn to a partner and describe what ECMAScript is in your own words.

## Why is JavaScript important?

JavaScript allows web developers to make web pages interactive, dynamic, and awesome. Here are some really cool examples of JavaScript in the wild.

- [Password Strength Meter](http://codepen.io/pankajparashar/details/bFhyf/)
- [Fullscreen Overlay Effects](http://tympanus.net/Development/FullscreenOverlayStyles/index3.html)
- [Page Loading Effects](http://tympanus.net/Development/PageLoadingEffects/index2.html)
- [Image Grid Effects](http://tympanus.net/Development/ImageGridEffects/index2.html)
- [Animated Map Path for Interactive Storytelling](http://tympanus.net/Development/StorytellingMap/)

### Exercise

What are some websites you frequently use? Revisit them and try to figure out which parts are using JavaScript. Once you have a few examples, show a partner and explain why JavaScript is important for these websites.

## How do you write JavaScript?

Most of this will be a review of the precourse, so we'll be going over this fairly quickly. However, go ahead and launch Atom so you can play with JavaScript's syntax.

### Comments

Comments are used to add hints, notes, suggestions, or warnings to JavaScript code. This can make it easier to read and understand. They can also be used to disable code to prevent it from being executed which can be a valuable debugging tool. JavaScript has two ways of creating comments in code.

The first way is with the `//` style. This makes all text following it on the same line into a comment.

```javascript
// This is a one line JavaScript comment
```

The second way is the `/* */` style, which is more flexible. For example, you can use it on a single line.

```javascript
/* This is a one line JavaScript comment */
```

Or you can use it to make multiple line comments.

```javascript
/* This comment spans multiple lines. Notice
   that we don't need to end the comment on the first line. */
```

Most of the time, you'll use the `//` style because Atom can toggle a line to be commented or not using the `Command` + `/` keyboard shortcut. Go ahead, try it out!

See the [comments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments) documentation on the Mozilla Developer Network for more information.

### Data types

The latest ECMAScript standard defines seven data types:

- Six data types that are primitives:
  - Boolean
  - Number
  - String
  - Undefined
  - Null
  - Symbol (new in ECMAScript 6)
- and Object

A **primitive** is data that is not an object, has no methods, and cannot be changed.

See [data types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Data_types) and [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive) on the Mozilla Developer Network for more information.

### Boolean

Boolean represents a logical entity and can have two values: `true` and `false`.

```javascript
// San Francisco is expensive
true;

// Seattle is cheap
false;
```

See the [boolean type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) and [`Boolean` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) on the Mozilla Developer Network for more information.

### Number

According to the ECMAScript standard, there's only one number type. And it represents both integer and floating-point (i.e. decimal) numbers between -(2⁵³ - 1) and 2⁵³ - 1).

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
Number.isInteger(4.0);   // true
```

Additionally, the number type has three symbolic values: `Infinity`, `-Infinity`, and `NaN` (not-a-number). To determine if a number is finite or not-a-number, use the `Number.isFinite()` and `Number.isNaN()` functions respectively.

**TIP:** Both n's of `NaN` must be uppercase otherwise JavaScript will throw an error.

```javascript
Number.isFinite(100);       // true
Number.isFinite(Infinity);  // false
Number.isFinite(-Infinity); // false

Number.isNaN(200);  // false
Number.isNaN(NaN);  // true
```

See the [number type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) and [`Number` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) on the Mozilla Developer Network for more information.

### String

JavaScript's string type is used to represent textual data. To create a string, simply append and prepend a series of characters with either single or double quotation marks. Which quotations you use is a matter of style preference. Just make sure that both opening and closing quotations are the same otherwise JavaScript will throw an error.

```javascript
'Jane';
"John";
```

Each character in the string occupies a position in the String. The first character is at index 0, the next at index 1, and so on. The length of a String is the number of characters in it.

```javascript
'melissa'.length;       // 6
'melissa'[0];           // 'm'
'melissa'.substr(1);    // 'elissa'
'melissa'.substr(2, 2); // 'li'
```

There are a number of built-in methods associated with strings, some of which are new additions as of ES6.

```javascript
'matt'.toUpperCase(); // 'MATT'
'MATT'.toLowerCase(); // 'matt'

'Matt'.indexOf('a');  // 1
'Matt'.indexOf('at'); // 1
'Matt'.indexOf('ab'); // -1

'Matt'.indexOf('t');      // 2
'Matt'.lastIndexOf('t');  // 3

// ES6
'Matt'.startsWith('Ma');  // true
'Matt'.endsWith('q');     // false
'Matt'.includes('t');     // true
```

See the [string type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) and [`String` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) on the Mozilla Developer Network for more information.

### Variables

In JavaScript, variables lets you give a name to a value. Think of a variable as a bucket that can store one thing inside of it. To create a new variable, use the `var` keyword followed by the name of the variable.

```javascript
var person;
```

A **keyword** is a word that has special meaning and is [reserved by the ECMAScript standard](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Keywords).

The word variable means 'can change' or 'can vary'. In JavaScript, the value inside a variable can vary over time. Additionally, a JavaScript variable can store many different types of values. However, if you put a new value in a variable, the old one goes away.

**TIP:** Remember, a variable only needs to be declared once using the `var` keyword.

```javascript
var name = 'Casey';
name = 'Francis';
name = 42;
```

Variable names in JavaScript can't contain spaces. The standard practice is to have variables start with a lowercase letter and capitalize each subsequent word. This is called camelcase.

```javascript
var firstName = 'Paula';
```

Be careful with your variable names because it's easy to misspell them. Even if you just get the capitalization wrong, the JavaScript interpreter won't know what you mean.

```javascript
var lastName = 'Dean';
lastname; // ReferenceError
```

Variable names also can't start with numbers. If needed, it's common to prepend numbers at the end of a variable name.

```javascript
var person1;
var person2;
```

Variables can also store the result of any expression.

```javascript
var result = 2 + 2;
```

### Undefined

`undefined` represents a value that hasn't been defined. A variable that has not been assigned a value is of type `undefined`. A function returns `undefined` if a value is not returned, which is the default.

```javascript
var x;
x; // undefined

x = 3;
x; // no longer undefined
```

See the [`undefined` global property](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) on the Mozilla Developer Network for more information.

### Null

The value `null` represents the intentional absence of any value. Unlike `undefined`, it's not explicitly set by default to unassigned variables. If you want something to be `null`, you must make it so.

```javascript
var x = null;
```

See the [`null` value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null) on the Mozilla Developer Network for more information.

Further reading:

- [What is the difference between null and undefined in JavaScript?](http://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript)
- [Why is typeof null "object"?](http://stackoverflow.com/questions/18808226/why-is-typeof-null-object)

### Symbol

Symbol is the newest primitive data type to be added to JavaScript. Talking about symbols is a bit advanced for the first day of JavaScript, especially since we haven't talked about objects yet. If want a sneak peak, see the [`Symbol` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) on the Mozilla Developer Network for more information.

### Arithmetic operators

JavaScript lets you perform basic arithmetic operations like addition, subtraction, multiplication, and division using the `+`, `-`, `*`, and `/` operators respectively. The arithmetic rules and order of operations apply as expected.

```javascript
1 + 1;  // 2
4 - 8;  // -4
3 * 4;  // 12
5 / 2;  // 2.5
```

In JavaScript, the `%` operator finds the remainder after division of one number by another.

```javascript
4 % 2;  // 0
4 % 3;  // 1
10 % 7; // 3
12 % 3; // 0
```

**Question:** How can you use the `%` operator to check whether or not an integer is even or odd?

The `+` operator can also be used for **string concatenation**.

```javascript
'Hello ' + 'world!';  // 'Hello world!'
```

Notice that the meaning of the `+` operator depends on the data types of the operands. Be careful when you combine different meanings of `+` in the same expression. JavaScript will attempt to guess the meaning, but won't always be correct.

```javascript
'The sum of ' + 5 + ' and ' + 7 + ' is ' + 5 + 7
```

See the [arithmetic operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators) on the Mozilla Developer Network for more information.

### Number methods

To convert a string to a number, use the following parsing methods.

```javascript
Number.parseInt('42');        // 42
Number.parseFloat('3.14');    // 3.14
Number.parseInt('forty two'); // NaN
```

See the [`Number` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) on the Mozilla Developer Network for more information.

### Math methods

JavaScript has a `Math` global object that has properties and methods for mathematical constants and functions.

```javascript
// pi
Math.PI;  // 3.141592653589793

// 2⁴
Math.pow(2, 4); // 16

// √4
Math.sqrt(4); // 2

// Round down to an integer
Math.floor(3.14); // 3
Math.floor(3.99); // 3

// Round up to an integer
Math.ceil(5.10);  // 6
Math.ceil(5.99);  // 6

// Round to the nearest integer
Math.round(7.25); // 7
Math.round(7.99); // 8
```

You can also use the `Math` object to generate random numbers.

```javascript
// Generate a random number from 0 up to but not including 1
Math.random();  // .229375290430

// Generate a random number from 0 up to but not including 10
Math.random() * 10; // 7.133676137309521
```

See the [`Math` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) on the Mozilla Developer Network for more information.

### Logical operators

Logical operators `&&` (and), `||` (or) and `!` (not) are typically used with boolean (logical) values. When they are, they return a boolean value.

```javascript
true && true;   // true
true && false;  // false
false && true;  // false
false && false; // false

true || true;   // true
true || false;  // true
false || true;  // true
false || false; // false

!true;          // false
!false;         // true
```

As logical expressions are evaluated left to right, they are tested for possible "short-circuit" evaluation using the following rules.

```javascript
false && (anything);  // Short-circuit evaluated to false
true || (anything);   // Short-circuit evaluated to true
```

See the [logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators) on the Mozilla Developer Network for more information.

### Relational operators

Relational operators `>` (greater than), `>=` (greater than or equal to), `<` (less than), and `<=` (less than or equal to) are used to compare the values of two numbers.

```javascript
7 > 7;  // false
7 >= 7; // true
4 < 4;  // false
4 <= 4; // true
```

Relational operators are used to compare the values of two strings as well.

```javascript
'a' > 'a';  // false
'a' >= 'a'; // true

'a' > 'b';  // false
'a' >= 'b'; // false

'b' > 'a';  // true
'b' >= 'a'; // true
```

See the [relational operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Relational_operators) on the Mozilla Developer Network for more information.

### Equality operators

The triple equals `===` operator compares two values to see if they're exactly the same or "strictly equal" to one another. The operator returns `true` if the values are equal and are the same type.

```javascript
4 === 3   // false
3 === 3   // true
3 === '3' // false
```

Conversely, the `!==` operator returns `true` if the values are not equal and/or are not the same type.

```javascript
4 !== 3   // true
3 !== 3   // false
3 !== '3' // true
```

Be careful not to confuse the `===` operator with the single equal `=` operator. The `===` operator asks "Are these two values strictly equal?" while the `=` operator means "Assign the value on the right to the variable on the left." In short, the `===` operator is used for **comparison** and the `=` operator is used for **assignment**.

Remember, when you use the `=` operator, a variable name _must_ be on the left and the value you want to assign to that variable _must_ be on the right. On the other hand, since the `===` operator compares two values to see if they're strictly equal, it doesn't matter which value is on which side.

Related to the `===` and `!==` operators are the `==` and `!=` operators respectively. The double equals `==` operator compares two values to see if they're equal-ish or "loosely equal" to one another. The operator returns `true` if the values are equal even if they're not the same type.

```javascript
4 == 3    // false
3 == 3    // true
3 == '3'  // true
```

Conversely, the `!=` operator returns `true` if the values are not equal even if they're not the same type.

```javascript
4 != 3    // true
3 != 3    // false
3 != '3'  // false
```

At first it might seem much easier to use the `==` operator instead of the `===` operator. However, the `==` operator in JavaScript often produces some unexpected results.

```javascript
true == 1       // true
true == 'true'  // false
```

When JavaScript compares two values with the `==` operator, it first converts them to the same type. In the first example, it converts the boolean `true` into the number `1` which is why `true == 1` is true. In the second example, it converts the boolean `true` into the number `1` _and_ the string `'true'` into the number `NaN` which is why `true == 'true'` is false.

Because of [this and other strangeness](https://dorey.github.io/JavaScript-Equality-Table/), it's probably safest to just stick with `===` for now.

See the [equality operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality_operators) on the Mozilla Developer Network for more information.

### Conditionals

Conditionals control the flow of a program.  Conditionals decide which code statements gets run based on some input to the conditional.  An example from everyday life would be:

> If you spend $100 or more, then you get 20% off, otherwise the purchase is full price

In the example above, the input to the conditional is the total amount of your purchase.

### If statements

The most basic control flow statement is the `if` statement.  Here is our example from above in code:

```javascript
var total = 284;

if (total >= 100) {
  total = total * .8;
}

// Display the total to the user
console.log('Your total is: $' + total.toFixed(2));
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

We can also combine these two statements using `if..else`:

```javascript
if (1 + 1 === 2) {
  console.log('Arithmetic is the best');
} else {
  console.log('Math is broken');
}
```

**Note:** Remember the parentheses!

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

if (7 % 2 === 0 || !Number.isInteger(7.3)) {
  console.log('E');
} else {
  console.log('F');
}
```

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

### Further Reading

Want to dig deeper? Read chapters 1 and 2 in [Eloquent JavaScript](http://eloquentjavascript.net/). A word of caution though: this book is great but not very beginner friendly.

## Resources

- [Quick history of JavaScript by Douglas Crockford](https://www.youtube.com/watch?v=t7_5-XYrkqg)
- [Wikipedia: Ajax (programming)](https://en.wikipedia.org/wiki/Ajax_(programming)
- [Wikipedia: ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)
- [Wikipedia: JavaScript](https://en.wikipedia.org/wiki/JavaScript)
