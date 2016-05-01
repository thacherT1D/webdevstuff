## Objectives

- Describe what JavaScript is.
- Describe what ECMAScript is.
- Explain why JavaScript is important.
- Name all primitive data types in JavaScript
- Define what a variable is
- Explain the difference between a value and an expression
- Explain the difference between `==` and `===` in JavaScript
- Implement simple control flow examples using `if` statements
- Explain what type conversion is
- Name all falsy values in JavaScript

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

Launch Atom so we can play with JavaScript's syntax.

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

For more information on comments, see the [Mozilla Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments).

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
true

// Seattle is cheap
false
```

See the [boolean type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type) and [`Boolean` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) on the Mozilla Developer Network for more information.

### Number

According to the ECMAScript standard, there's only one number type. And it represents both integer and floating-point (i.e. decimal) numbers between -(2⁵³ - 1) and 2⁵³ - 1).

```javascript
// integer numbers
-3
-2
-1
0
1
2
3

// floating-point (i.e. decimal) numbers
-42.42
-2.718
-0.25
.66666667
3.14
199.99
```

If you want to distinguish between integers and floats, there are a couple of ways to do this. The most modern approach, as of ES6, is to use the `Number.isInteger()` function.

```javascript
Number.isInteger(4)   // true
Number.isInteger(4.1) // false
Number.isInteger(4.0) // true
```

Additionally, the number type has three symbolic values: `Infinity`, `-Infinity`, and `NaN` (not-a-number). To determine if a number is finite or not-a-number, use the `Number.isFinite()` and `Number.isNaN()` functions respectively.

**TIP:** Both n's of `NaN` must be uppercase otherwise JavaScript will throw an error.

```javascript
Number.isFinite(100)        // true
Number.isFinite(Infinity)   // false
Number.isFinite(-Infinity)  // false

Number.isNaN(200) // false
Number.isNaN(NaN) // true
```

See the [number type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type) and [`Number` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) on the Mozilla Developer Network for more information.

### String

JavaScript's string type is used to represent textual data. To create a string, simply append and prepend a series of characters with either single or double quotation marks. Which quotations you use is a matter of style preference. Just make sure the both opening and closing quotations are the same otherwise JavaScript will throw an error.

```javascript
'Jane'
"John"
```

Each element in the string occupies a position in the String. The first element is at index 0, the next at index 1, and so on. The length of a String is the number of elements in it.

```javascript
'melissa'.length        // 6
'melissa'[0]            // 'm'
'melissa'.substr(1)     // 'elissa'
'melissa'.substr(1, 2)  // 'el'
```

There are a number of built-in methods associated with strings, some of which are new additions as of ES6.

```javascript
'matt'.toUpperCase() // 'MATT'
'MATT'.toLowerCase() // 'matt'

'Matt'.indexOf('a')   // 1
'Matt'.indexOf('at')  // 1
'Matt'.indexOf('ab')  // -1

'Matt'.indexOf('t')     // 2
'Matt'.lastIndexOf('t') // 3

// ES6
'Matt'.startsWith('Ma') // true
'Matt'.endsWith('q')    // false
'Matt'.includes('t')    // true
```

See the [string type](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type) and [`String` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) on the Mozilla Developer Network for more information.

### Variables

In JavaScript, variables lets you give a name to a value. Think of a variable as a bucket that you can store one thing inside of it. To create a new variable, use the `var` keyword followed by the name of the variable. A **keyword** is a word that has special meaning and is reserved by JavaScript.

```javascript
var person;
```

The word variable means 'can change' or 'can vary'. In JavaScript, the value inside a variable can vary over time. Additionally, a JavaScript variable can store many different types of values. However, if you put a new value in a variable, the old one goes away.

**TIP:** Remember, a variable only needs to be declared once using the `var` keyword.

```javascript
var name = 'Casey';
name = 'Francis';
name = 42;
```

Variable names in JavaScript can't contain spaces. The standard practice is to have variables start with a lowercase letter and capitalize each word except for the first one. This is called camel-case.

```javascript
var firstName = 'Paula';
```

Be careful with your variable names because it's easy to misspell them. Even if you just get the capitalization wrong, the JavaScript interpreter won't know what you mean.

```javascript
var lastName = 'Dean';
lastname // ReferenceError
```

Variable names also can't start with numbers. If needed, it's common to prepend numbers at the end of a variable name.

```javascript
var person1;
var person2;
```

Variables can also store the result of any expression.

```javascript
var result = 2 + 2;
var greeting = 'Hello' + ' Matt';
```

### Undefined

`undefined` represents a value that hasn't been defined. A variable that has not been assigned a value is of type `undefined`. A function returns `undefined` if a value was not returned which is the default.

```javascript
var x;
x; // undefined

x = 3;
x; // no longer undefined!
```

### Null

The value `null` represents the intentional absence of any value. Unlike `undefined`, it's not explicitly set by default to unassigned variables. If you want something to be `null`, you must make it so.

```javascript
var x = null;
```

Further reading:

- [What is the difference between null and undefined in JavaScript?](http://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript)
- [Why is typeof null "object"?](http://stackoverflow.com/questions/18808226/why-is-typeof-null-object)

### Symbol

Symbol is the newest primitive data type to be added to JavaScript. Talking about symbols is a bit advanced for the first day of JavaScript, especially since we haven't talked about objects yet. If want a sneak peak, see the [`Symbol` global object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) on the Mozilla Developer Network for more information.

### Values and Expressions

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

This is called **String Concatenation.**

Note that the meaning of `+` depends on what types of values you're working with. Be careful when you combine different meanings of `+` in the same expression: JavaScript will attempt to guess at your meaning, but won't always be correct. For example, try putting this into the console:

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

JavaScript can be a little cheap with the number of operations it allows you to do. For example, how is someone supposed to square a number or cube a number easily? Luckily there is a special `Math` object with some very useful methods.

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

## Comparisons

One way to get boolean values in JavaScript is by using _comparisons_. Comparisons are operators that allow us to compare two different values. For example, mathematical comparisons are comparisons:

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

The key understanding here is the difference between _assignment_ and _comparison_. The single equals sign in JavaScript is used for assignment, e.g. assigning a variable to some value. The double equals sign is used for comparison, i.e. to check whether two values are equal. You can't assign one value to another value, but you can always check whether two values are the same.

Related to the `==` comparison operator is the `===` comparison operator. `===` is a stronger operator, as it also checks whether the **type** of the values are the same, while the `==` operator will try perform some type conversion before comparing. As an exercise, try to predict what boolean each of the following expressions will evaluate to:

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

Note: You can always check something's type in JavaScript using the typeof operator! What's `typeof 4`? `typeof "what's up?"`?

## Conditionals

Conditionals control the flow of a program.  Conditionals decide which code statements gets run based on some input to the conditional.  An example from everyday life would be:

```
If you spend $100 or more, then you get 20% off, otherwise the purchase is full price
```
In the example above, the input to the conditional is the total amount of your purchase.

### If

The most basic control flow statement is the `if` statement.  Here is our example from above in code:

```
var total = 284; // Some value

if (total >= 100 ) {
   total = total * .8;
}

// More code to display the total to the user

console.log("Your total is: $" + total.toFixed(2));
```

Let's practice with some other if statements!

```
if (1 + 1 === 2) {
  console.log("Arithmetic is the best");
}

if (1 + 1 !== 2) {
  console.log("Math is broken.");
}
```
We can also combine these two statements using `if..else`:

```
if (1 + 1 === 2) {
  console.log("Arithmetic is the best");
} else {
  console.log("Math is broken");
}
```

(Note: Remember the parentheses!)

For each of these examples, try to determine what the console will log:

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

if (false) {
  console.log("A");
} else if (null) {
  console.log("B");
} else {
  console.log("C");
}
```

## Type Conversion

Sometimes, you may pass in a value of one type when JavaScript expects a value of a different type. In this case, rather than throwing an error, JavaScript will convert the value into one that has a type that makes sense.

For instance, suppose you type the following expression into your console: `1 + 'hi'`. For numbers, `+` means addition; for strings, it means concatenation. So how does JS deal with this ambiguity? It converts the number into a string, the concatenates.

This type of conversion also happens when you pass values into if statements. In a block of code like `if (x) {...}`, `x` is expected to be a Boolean. If it isn't, JavaScript will convert it into a Boolean.

Most values in JavaScript are truthy -- that is, they get converted into `true` should the need arise. In fact, there are only six falsy values in JavaScript: `false`, `null`, `undefined`, `0`, `''`, and `NaN`.

### Further Reading

Want to dig deeper? Read Chapters 1 and 2 in [Eloquent JavaScript](http://eloquentjavascript.net/) - we'll be covering some of Chapter 2 tomorrow, so if you don't finish it all, that's ok!

## Resources

- [Quick history of JavaScript by Douglas Crockford](https://www.youtube.com/watch?v=t7_5-XYrkqg)
- [Wikipedia: Ajax (programming)](https://en.wikipedia.org/wiki/Ajax_(programming)
- [Wikipedia: ECMAScript](https://en.wikipedia.org/wiki/ECMAScript)
- [Wikipedia: JavaScript](https://en.wikipedia.org/wiki/JavaScript)
