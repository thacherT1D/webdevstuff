# An Introduction to Programming and JavaScript: Intro, Types, Values, Variables, Control Flow
Objectives:
Students will able to...

- 1 of 15:  describe what's a programming language
- 2 of 15:  share four reasons for learning JavaScript
- 3 of 15:  name the various primitive types in JavaScript
- 4 of 15:  use a REPL (read, evaluate, print, loop)
- 5 of 15:  values for each primitive type.
- 6 of 15:  use the `typeof` operator
- 7 of 15:  use `console.log()` to log values to a console
- 8 of 15:  create expressions with operators
- 9 of 15:  use comparison operators
- 10 if 15: use logical operators
- 11 of 15: explain two reasons why variables are useful
- 12 of 15: explain the concept of primitive types and immutability
- 13 of 15: create control structures with conditional statement
- 14 of 15: create control structurs with iterators
- 15 of 15: use native properties and method for `String` and `Number`

# 1 of 15: What's a Programming Language?
Let's start today's lesson with a question: What is a programming language?

A programming language is a language that is designed to communicate instructions to a machine. During the past several decades, many programming languages have been created--Java, C++, PhP, Python, Ruby, JavaScript, etc.--to help humans achieve this task. Each of these langauges were designed, furthermore, with specific purposes in mind.You've already have been introduced to one language, Bash, which is a shell and language, that enables you to write instructions about your file system to a local machine.

Another example, which you haven't been formally introduced, is Ruby, a server-side langauge. As the story goes, Yukihiro "Matz" Matsumoto ("Matz") created Ruby during the mid-1990s. He felt that programmers needed a program that was designed for programmer satisfcation. He wanted "to see Ruby help every programmer in the world to be productive, [..] to enjoy programming, and to be happy." Ruby's syntax, in turn, was designed to be human friendly--concise, human-like sentences.

At this moment, I hope we've established that many programming languages have been created with purpose. In this context, we may have introduced into your minds a question: if there are so many languages, then why are we teaching JavaScript? Why not some other language? This is an excellent question; moreover, I have an answer :).

## 2 of 15: Four Reasons for Teaching JavaScript
There are many reasons for teaching and learning JavaScript; however, most people find the following four reasons to be the most agreeable.

### i) JavaScript is the only language that can be used on every stack of a web-based application:
Learning each stack--client-side and server-side--with JavaScript decreases the amount of time involved with human context switching. A developer can focus less time, in other words, on the different implementation details of languages and more time on desired functionality. Considering the fundamental differences between a functional language (i.e., JavaScript) and a class-based language (e.g., Ruby), the ability to decrease context switching is invaluable for new developers.

### ii) JavaScript is the only dynamic language that web browsers natively support:
Modern web browsers extend a privileged status to JavaScript: native support. This means that a developer who knows JavaScript can open a web browser and immediately write code, test code, and debug code. All of this happens without any additional installation of software.

At least in the foreseeable future, Web browsers are unlikely to supplant their support of JavaScript with another language. In the world of web development, the longevity of a language is usually uncertain. We find solace in the fact that JavaScript will remain useful if you decide to learn it. The same claim cannot be made of other languages, regardless of their current popularity.

### iii) JavaScript is required for adding behavior to web-based applications:
JavaScript is the only language capable of adding behavior--responding to user-based events, such as clicking, typing, and scrolling--to web-based applications. Consider how many web-based applications include this type of behavior. You will then realize that I'm describing all modern web-based applications.

This undeniable truth is the reason why many popular languages and their corresponding web application frameworks automatically include JavaScript in their source code. Ruby on Rails, a very popular framework for building web-based applications, includes JavaScript in the form of a JavaScript library called jQuery.

### iv) Sustained Adoption
Large tech companies are constantly building popular technologies with JavaScript. Facebook used JavaScript to create React; Google used JavaScript to create Angular and Polymer; And Netflix used JavaScript to create Falcor.

***
Exercise: Everyone take a moment and write, in your own words, why we're learning JavaScript.
***

# 3 of 15: An introduction to values that are primitive types
Similar to all programming languages, JavaScript has its own syntax. At its core, this syntax is composed of statements, which are composed of expressions, which are composed of values--smallest meaningful unit of code. To gain an understanding--and eventually confidence--with JavaScript, we need to understand each of these components. Let's start with values.

JavaScript has two types of values: primitive types and reference types. During this lesson, will cover the former; during the afternoon lesson, we'll cover the latter.

### Primitive Types
- `Number`
- `String`
- `Boolean`
- `null`
- `undefined`

### Reference Types
- `Array`
- `Object`
- `Function` (Tuesday)

# 4 of 15: How to Use a REPL (read, evaluate, print, loop)
In order to create any of these JavaScript values, we need to use a program that can interpret them and other constructs of JavaScript. There are several options we can use, such as the console in Chrome's Developer Tools. For our goals, we're going to use something that's dedicated exclusively to interpreting our JavaScript: [repl.it](https://repl.it/languages/javascript), an online REPL (read, evaluate, print, loop).

# 5 of 15: Create Primitive Types
Okay, we're ready to create each of the primitive types:

- `Number`
- `String`
- `Boolean`
- `null`
- `undefined`

### `Number`
A value of type `Number` can be integers or floating points. To create an integer, all we have to do is just type the value in the left pane and then press the button labeled "execute."

```javascript
6
```

In the right pane, we see the output of `6`. We can repeat this process for creating a floating point number:

```javascript
3.14
```

### `String`
A value of `String` is enclosed inside of quotation marks.

```javascript
"I'm a string"
```

A string can be inside of double quotations or single quotations. For the sake of consistency, we're going to use double quotations.

### `Boolean`
A Boolean has one of only two values: `true` or `false`.

```javascript
true
```

Note that all letters are lowercase. JavaScript is a type-sensitive language, and there's a difference between typing `false` and `False`.

### `null`
To create a value of `null`, we type `null` with all lowercase characters:

```javascript
null
```

Developers often use this value as a placeholder for a future object. This may sound confusing, but you shouldn't concern yourself with this for now. I'll show you an appropriate moment to use it when we talk about objects this afternoon.

### `undefined`
 to create a value of type `undefined`, we type `undefined` with all lowercase characters:

```javascript
undefined
```

In JavaScript, `undefined` is assigned to variables that have been declared but not assigned a value. We'll learn more about this in a later section titled "Variables."

To display the data type of a value, we can use the `typeof` operator:

```javascript
typeof [value]
```

The word `typeof` is a unary operator, which means it has one operand. This operand can be any value. We should view some code snippets to make demonstrate how this works:


```javascript
typeof 23         // "number"
```

```javascript
typeof "hi"       // "string"
```

```javascript
typeof true       // "boolean"
```

```javascript
typeof null       // "object"
```

```javascript
typeof undefined  // "undefined"
```

# 7 of 15: Use `console.log([value])`
Up to this moment, we've been writing one line of code, and then we've executed that line. Notice what happens if we type two lines of code and execute it:

```javascript
typeof 23
typeof "hi"

// "string"
```

We'll receive output for just the last line of code. To change this default behavior and output both lines of code, we need to select one of three options:

1. Run one line of code at a time.
2. Wrap the first line of code inside of the parentheses of this code: `console.log(typeof 23)`
3. Wrap each line of code inside of the parens of their own console.log().

Here's the code for the third option:

```javascript
console.log(typeof 23);
console.log(typeof "hi");

// "number"
// "string"
```

The right pane of our REPL is considered a console. Anything that we place inside of `console.log()` will display inside of the console when executed. This is very different than outputing a value. When we enter week three, we'll talk more about consoles and use other strategies for logging values.
- Shortcut to open JS console & bring focus to console `Cmd + Opt + J`

Go to [Google](http://www.google.com) and try pasting the following code into your console:

```
var logo = document.getElementById('hplogo');
logo.onclick = function () { this.src = "http://cdn.howtogeek.com/wp-content/uploads/2010/10/DANCING_BABY.gif"}
```
And then try this:

```
function makeWider() {
  var logo = document.getElementById('hplogo');
  logo.width += 5;
}

setInterval(makeWider, 41.67);
```

# 8 of 15: Create expressions with operators
On their own, values don't extend much usefulness to us. We can change this fact with the inclusion of operators, such as the addition, subtraction, multiplication, division, and remainder symbols. When we use operators, we are no longer dealing with just values, but we're also dealing with expressions: "A fragment of code that can resolve to a value is called an expression." In the following example, we have three values:

```javascript
2 + 4
```

The value `2`, the value `4`, and the expression `2 + 4`, which resolves to the value `6`. If you're wondering what's the difference between a value and an expression, I often consider a value to be something that's already resolved; an expression has to be resolved.

Okay, let's create a quick example using each of the most common binary operators.

```javascript
2 + 2 // 4
2 - 2 // 0
2 * 2 // 4
2 / 2 // 1
2 % 2 // 0
```

There are many more operators included with JavaScript, we can find (a comprehensive list of operators on Mozilla)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators].

[Exercise: Create an expression using each of the operators we've used above.]

What you'll find amazing--and untrue in many other languages--is the ability to mix data types with the binary operators we just used. Try multiplying a string with a number. What are we going to see?

```javascript
"Fab" + 5 // "Fab5"
```

# 9 of 15: Comparison operators
JavaScript commons with several comparison operators. Some of them may be familiar to you, such as `<`, `<=`, `>`, and `>=`. Others may be new to you, such as `==`, `!=`, `===`, and `!==`. We'll explore the latter set of operators.

We can compare values using the double equality operator or the triple equality operator. To gain a sense of the difference, let's first write some code to view outputs; then let's explain what's happening.

```javascript
4 == 4                 // true
"laptop" == "laptop"   // true
true == true           // true
undefined == undefined // true
null == null           // true
```

When comparing values, the double equality operator will return a `Boolean value of `true` if both operands are equivalent in value. These results may appear to be obvious to you, but you'll find bewilderment with the following output:

```javascript
4 == "4"         // ?
"muscle" == true // ?
"" == " "        // ?
0 == null        // ?
```

This is a good moment to mention that all values have an associated value of `true` or `false`. Often, developers refer to this as a value being `truthy` or `falsy`. There are many values that are considered `truthy`, but only a few that are considered `falsey`. For this reason, just remember that the following values are `falsy` (and everything else is `true`):

- `null`
- `undefined`
- `0`
- `""`
- ``false`
- `NaN` (A result of trying to use arithmetic operators with non-numbers.)

Applying this knowledge, we can determine the return value of the above comparisons:

```javascript
4 == "4"         // true
"muscle" == true // true
"" == " "        // false
0 == null        // true
```

To make comparisons and consider equivalent data types, we need to use the triple equality operator. Try it now:

```javascript
4 === "4"         // false
"muscle" === true // false
"" === " "        // false
0 === null        // false
```

The `!=` and `!==` comparison operators follows the rules outlined above. But they return the opposite `Boolean` value. Observe:

```javascript
4 == 4         // true
4 == "4"       // true

4 != 4         // false
4 != "4"       // false

4     === "4"      // false
"mop" === true     // false

4     !== "4"      // true
"mop" !== true     // true
```

# 10 of 15: Logical Operators
There are three kinds of logical operators: `&&`, `||`, and `!`. The last logical operator--the logical NOT operator--was used in the previous section to negate a value's associated `Boolean` value. The other two operators are known as the logical AND and the logical OR operator. You'll notice the use of these operators throughout your careers as developers, so you should gain a familiarity with them as soon as possible. We're going to use the examples from Mozilla to help us understand them:


### `&&`
```javascript
true  && true;     // t && t returns true
true  && false;    // t && f returns false
false && true;     // f && t returns false
false && (3 == 4); // f && f returns false
"Cat" && "Dog";    // t && t returns Dog
false && "Cat";    // f && t returns false
"Cat" && false;    // t && f returns false
```

The logical `&&` operator returns either the first `falsy` value it executes or the last `truthy` value it executes.

### `||`
```javascript
true  || true;     // t || t returns true
false || true;     // f || t returns true
true  || false;    // t || f returns true
false || (3 == 4); // f || f returns false
"Cat" || "Dog";    // t || t returns Cat
false || "Cat";    // f || t returns Cat
"Cat" || false;    // t || f returns Cat
```

The logical `&&` operator returns either the first `truthy` value it executes or the last falsy` value it executes.

### `!`
```javascript
!true;  // !t returns false
!false; // !f returns true
!"Cat"; // !t returns false
```

The logical NOT operator returns the opposite `Boolean` value of the expression.

# 11 of 15: Variables
Up to this moment, we've experimented with different values of primitive types and operators. I want to draw your attention to a pattern you may have observed: We have created values, resolved or unresolved, that are never saved. We can't, in other words, re-use those values.

What if one line of code contains a value that represents my friend's telephone number. Without saving it, I don't have the ability to directly re-access that telephone number. To make this point clear, this is similar to me using a calculator to derive to a number and then never saving that number. The only way I can retrieve that number is going through the entire calculation process, again.

***
Exercise: Think of your own example where it might be useful to save information.
***

Great, so we all can imagine situations where we want to save values. To do this in JavaScript, we want to use a `var` statement. Here's the syntax:

```javascript
var name = value;
```

The above syntax is considered a statement because it has to be terminated with a semicolon. Inside of this statement, you should notice two values (`name`, `value`), one expression (`var name = value;`), and one statement  (`var name = value;`). Funky, right?

***
Exercise: Take a couple of minutes and create a list of 10 keywords. These are words you cannot use as a name of a variable.
***

Let's review the syntax for the `var` statement. Similar to the `typeof` operator, `var` is considered a keyword--a word that has a special meaning in JavaScript. We can't use it to name our variables.

At present, we know that names of variables cannot be a keyword. What other restrictions are associated with naming variables? For the names to be a valid identifier (name), the following rules apply:

- the name must begin with a `$`, `_` , or alphabet character.
- after the first character, any of the above plus numeric characters.

After we decide on a name, we use an equality operator to assign the variable a value:

```javascript
var month = "July";
```

The value is placed as the right operand of the equality operator. What's interesting is that a variable can be assigned another variable, which resolves to a value. This may sound confusing, so let's work with the following example:

```javascript
var a = 1;
var b = a;
```

What's the value of `a`? What's the value of `b`?

Now let's consider the following lines of code:

```javascript
var a = 1;
var b = a;
a = 3;
```

What's the value of `a`? What's the value of `b`?

# 12 of 15: Primitive Types are Immutable
This is a great moment for us to describe the concept of a primitive type, which is an immutable value. In other words, once a primitive type is assigned to a variable, that variable has its own copy of that value. This statement is probably bewildering, so let's expand on it with another example:

```javascript
var a = "Tom";
var b = a;
a = "Jerry";
```

Since `a` is set to a primitive type and `b` is also set to a primitive type, `a` and `b` receives their own version of `"Tom".` When `a` is set to another primitive type of `"Jerry"`, this change doesn't impact `b`'s own copy of `"Tom"`.

Okay, let's circle back to variables and ask ourselves why variables are important: First, they allow use to store values in memory. Second, they allow us to associate semantically meaningful information to values. The latter is especially benenficial to humans. If we name a variable, salary, age, or number of cars, for instance, we can immediate discern the meaning of the value and, potentially, its data type.

In regards to naming, it's one of the hardest things to do in programming. Fortunately, there's naming conventions and I'll share them with you during this week when it becomes relevant. Let's leverage our knowledge of variables and create the following code:

***
Exercise: Create variables with the names `greet` and `name`; then find a way to use these variables to log the following string: `"Hello, Homer"`
###

# 13 of 15: Control structures with conditional statements
I want to draw your attention to another observation you may have noticed: The code we write is always executed from the first line to the last line. What if we want only some of the lines to be executed depending on a condition? What if we want to determine how much tax we pay based on our salary. We need a way to set a variable to the correct tax bracket based on the condition of our annual salary.

What we are describing is the usage of control structures with conditional statements. In JavaScript, we have several. Let's explore the following:

- `if`
- `if/else`
- `if/else if/else`
- `switch`

### `if`
An `if` statement has three parts to its syntax: 1) the keyword `if`, 2) parentheses that contain a condition, and 3) curly braces that contain values, expressions, or statements. All of the code inside of the curly braces get executed if the condition contained in parentheses resolves to a `truthy` value.

Here's an example of an `if` statement that will resolve to a `truthy` value:

```javascript
if ( 10 > 5) {
  console.log("I was executed.");
}

if (10 < 5) {
  console.log("I wasn't executed. You won't see this message log.");
}

console.log("I always get executed.");
```

### `if/else`
The `if/else` statement extends the functionality of the `if` statement. If the condition of an `if` statement resolves to a `falsy` value, then the code within the curly braces of an `else` statement is exected.

Notice in the following code examples that the `else` staement does not have a conditional associated with it. Indirectly, it's using the `if`statement's conditional:

```javascript
if ( 10 > 5) {
  console.log("I was executed.");
} else {
  console.log("I wasn't executed.");
}

if (false) {
  console.log("I never get executed.");
} else {
  console.log("I always get executed.");
}
```

### `if/else if/else`
The `if/else if/else` statement has three separate statements: `if`, `else if`, and `else`.  The `else if` has the same syntax as the `if` statement; moreover, it must be used after an `if` statement but before an `else` statement.

Let's write an example:

```javascript
if ( 5 > 10) {
  console.log("I wasn't executed.");
} else if (12 > 10) {
  console.log("I was executed.");
} else {
  console.log("I wasn't executed.");
}

if ( true) {
  console.log("I'm always executed.");
} else if (12 > 10) {
  console.log("I never get executed.");
} else {
  console.log("I never get executed.");
}
```

### `switch`
When we have too many conditions and `else if` statements in our code, it can quickly become verbose and somewhat unwieldy. This is a good moment for using the `switch` statement. The syntax  of a `switch` statement can become confusing on first galnce, so let's work with an awesome diagram found on [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch):

```javascript
switch (expression) {
  case value1:
    //Statements executed when the result of expression matches value1
    [break;]
  case value2:
    //Statements executed when the result of expression matches value2
    [break;]
  ...
  case valueN:
    //Statements executed when the result of expression matches valueN
    [break;]
  default:
    //Statements executed when none of the values match the value of the expression
    [break;]
}

```
In the above syntax, the words `switch`, `case`, and `break` are keywords. The `expression` inside of parentheses of `switch` is compared with the values--from top to bottom--adjacent to the keyword `case`. The comparison being performed is `===`. The first comparison that evaluates to `true` executes the statements inside of the `case` statement. If we want to end any further comparisons, we include the keyword `break`.

Here's an example from [Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) with code:

```javascript
var foo = 0;
switch (foo) {
  case -1:
    console.log('negative 1');
    break;
  case 0: // foo is 0 so criteria met here so this block will run
    console.log(0);
    // NOTE: the forgotten break would have been here
  case 1: // no break statement in 'case 0:' so this case will run as well
    console.log(1);
    break; // it encounters this break so will not continue into 'case 2:'
  case 2:
    console.log(2);
    break;
  default:
    console.log('default');
}
```

In the above example, the expression `foo` matches the `case` statement of `0`. So we log the value of `0`. But there's no `break` after the log. So the `switch `statement continues to execute code found in succeeding `case` statements until we reach a `break` statement. So this is the output for the above `switch` statement:

```javascript
0
1
```

```
Exercise: Use an `if/else if/else` statement to rite code for a simplified version of FizzBuzz: If a number is divisible by `3`, log the word `Fizz`; if a number is divisible by `5`, log the word `Buzz`, and if a number is divisible by both `3` and `5`, log the word `FizzBuzz`. If a number is not divisible by any of those numbers, log the non-divisible number. Repeat this process with a `switch` statement.
```

# 14 of 15: Control structures with iterators
Conditional statements are used to determine which lines of code to execute. Iterators determine how many times certain lines of code are executed. When using JavaScript, you'll find yourself frequently using two iterators:

- `for` loop
- `while` loop.

### `for` loop
A `for` loop executes lines of code while a condition evaluates to `true`. Here's the syntax:

```javascript
for([declare variables]; [conditional]; [increment]) {
  // all code between the curly braces get executed while the [conditional] evaluates to true;
}
```

The syntax is concise, but it does not reveal the order of execution it follows:

1. [declare variables]
2. [conditional]
3. If [conditional] resolved to true, execute all code inside of the curly braces. Use [increment] as the last statement.
4. repeat steps 2 and 3 until step 2 resolves to a `falsy` value.

Let's translate all of this information into code:

```javascript
// 1
// 2
// 3
// ...
// 10
for(var i = 1; i <= 10; i = i + 1;) {
  console.log(i);
}
```

***
Exercise: Modify the above `for` loop to print all integers from 10 to 1.]
***

### `while` loop
Similar to a `for` loop, a `while` loop executes all code inside of its curly braces while its [conditional] resolves to a `truthy` value. The difference between both loops is syntax:

```javascript
// Version 1 of syntax
[declare variables]
while ([conditional]) {
  // code to execute
  // [incrementer]
}

// Version 2 of syntax
[declare variable]
while ( [decrementer]) {
  // code to execute
}
```

A `while` loop has some flexibility in its design. Above, the first `while` loop resembles the same workflow a `for` loop. The second `while` loop combines the [conditional] and a [decrementer]; this latter design works if the decrementer will eventually resolve to a `falsy` value, such as `0`.

Let's view a code example for both designs:

```javascript
var i = 1;
while (i <= 10) {
  // code to execute
  i = i + 1;
}

var i = 10;
while ( i = i - 1) {
  // code to execute
}
```

***
Exercise: Use a `while` loop to print every number from 10 to 100 in increments of 10.
***

***
Exercise: Use a `while` loop to print every number from 100 to 10 in decrements of 10.
***


# 15 of 15: Native properties and methods
The last topic we'll explore in this lesson are native properties and methods--functionality available to different data types. For primitive types, this functionality is extended to only two type:

- `String`
- `Number`

### `String`
Strings come with many [properties and methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). In this section, we'll review just two of the more popular ones. The first is property named `length`, which returns the number of characters in a string:

```javascript
var city = "Chicago";

city.length;  // 7
```

The second is a method named `toLowerCase()`, which converts all uppercase characters into lowercase characters:

```javascript
var city = "Chicago";

city.toLowerCase(); // "chicago"
```

### `Number`
Numbers come with many [properties and methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), too. In this section, we'll review just two of the more popular ones. The first is method named `toString()`, which converts a number to a string; the scond is a method named `parseInt()`, which converts a string into a number.

```javascript
var age = 104;

age.toString(); // "104"
```

The first is method named `parseInt()`, which converts a string to a number:

```javascript
var age = "104";

Number.parseInt(age); // 104
```

# Conclusion
In this lesson, we learned about the concept of a programming language. We also learned why JavaScript is taught to students of this course. Through a lot of practice, we've gained some familiarity with the syntax of JavaScript--values, expressions, statements, conditionals, and iterators. Combined, these topics extend to you the major components of this language. Be proud of yourself, we've covered a lot.
