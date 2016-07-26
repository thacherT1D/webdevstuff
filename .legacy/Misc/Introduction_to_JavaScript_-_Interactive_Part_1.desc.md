# Intro to Programming fundamentals

![](http://voidcanvas.com/wp-content/uploads/2014/01/JavaScript-logo.png)


## Objectives - Be able to:

* Identify the primary Javascript data types and when to use each
* Navigate through the JS console
* Manipulate data types and create expressions in JS
* Get and evaluate input from a user
* Call a basic JS function

#### Use [repl.it](https://repl.it/) to run code

## Agenda
* History of Javascript
* Understand Data Types
  * Comments
  * Numbers
  * Strings
  * Values & Expressions
  * Objects everywhere - Arrays, Objects

## History of Javascript

* Not to be confused with Java
* Created in 10 days in May 1995 by [Brendan Eich](http://en.wikipedia.org/wiki/Brendan_Eich)
* It's an exciting time to learn Javascript! It's the language that enables web pages to respond to user interaction beyond the basic level.
* The language today is viewed quite differently than how it was 10 years ago

[The famous Douglas Crockford gives a thorough introduction of Javascript](https://www.youtube.com/watch?v=t7_5-XYrkqg)


## Why Should YOU Care About Javascript

Let's start today's lesson with a question: What is a programming language?

A programming language is a language that is designed to communicate instructions to a machine. During the past several decades, many programming languages have been created--Java, C++, PhP, Python, Ruby, JavaScript, etc.--to help humans achieve this task. Each of these langauges were designed, furthermore, with specific purposes in mind.You've already have been introduced to one language, Bash, which is a shell and language, that enables you to write instructions about your file system to a local machine.

Another example, which you haven't been formally introduced, is Ruby, a server-side langauge. As the story goes, Yukihiro "Matz" Matsumoto ("Matz") created Ruby during the mid-1990s. He felt that programmers needed a program that was designed for programmer satisfcation. He wanted "to see Ruby help every programmer in the world to be productive, [..] to enjoy programming, and to be happy." Ruby's syntax, in turn, was designed to be human friendly--concise, human-like sentences.

At this moment, I hope we've established that many programming languages have been created with purpose. In this context, we may have introduced into your minds a question: if there are so many languages, then why are we teaching JavaScript? Why not some other language? This is an excellent question; moreover, I have an answer :).

### Four Reasons for Teaching JavaScript
There many reasons for teaching and learning JavaScript; however, most people find the following four reasons to be the most agreeable.

#### 1. JavaScript is the only language that can be used on every stack of a web-based application:
Learning each stack--client-side and server-side--with JavaScript decreases the amount of time involved with human context switching. A developer can focus less time, in other words, on the different implementation details of languages and more time on desired functionality. Considering the fundamental differences between a functional language (i.e., JavaScript) and a class-based language (e.g., Ruby), the ability to decrease context switching is invaluable for new developers.

#### 2. JavaScript is the only dynamic language that web browsers natively support:
Modern web browsers extend a privileged status to JavaScript: native support. This means that a developer who knows JavaScript can open a web browser and immediately write code, test code, and debug code. All of this happens without any additional installation of software.

At least in the foreseeable future, Web browsers are unlikely to supplant their support of JavaScript with another language. In the world of web development, the longevity of a language is usually uncertain. We find solace in the fact that JavaScript will remain useful if you decide to learn it. The same claim cannot be made of other languages, regardless of their current popularity.

#### 3. JavaScript is required for adding behavior to web-based applications:
JavaScript is the only language capable of adding behavior--responding to user-based events, such as clicking, typing, and scrolling--to web-based applications. Consider how many web-based applications include this type of behavior. You will then realize that I'm describing all modern web-based applications.

This undeniable truth is the reason why many popular languages and their corresponding web application frameworks automatically include JavaScript in their source code. Ruby on Rails, a very popular framework for building web-based applications, includes JavaScript in the form of a JavaScript library called jQuery.

#### 4. Sustained Adoption
Large tech companies are constantly building popular technologies with JavaScript. Facebook used JavaScript to create React; Google used JavaScript to create Angular and Polymer; And Netflix used JavaScript to create Falcor.

### JS In the Wild

Javascript allows us to make our pages interactive and dynamic and awesome.   Here are some very common uses for JS on the front-end:

* [Simple Navigation Menu](http://codepen.io/markmurray/pen/efcjp)
* [Page Loading Effects](http://tympanus.net/codrops/2014/04/23/page-loading-effects/)
* [Parallax Scroll and Blur](http://codepen.io/sallar/pen/lobfp)

Some other more complex uses for JS:

* [Interactive Music Video](http://lights.helloenjoy.com/)
* [Jam With Chrome](http://www.jamwithchrome.com/)
* [Patatap](http://www.patatap.com/)
* [Arcade Fire Reflektor Music Video](http://www.chromeexperiments.com/detail/just-a-reflektor/?f=)

### An introduction to values that are primitive types

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

### How to Use a REPL (read, evaluate, print, loop)

In order to create any of these JavaScript values, we need to use a program that can interpret them and other constructs of JavaScript. There are several options we can use, such as the console in Chrome's Developer Tools. For our goals, we're going to use something that's dedicated exclusively to interpreting our JavaScript: [repl.it](https://repl.it/languages/javascript), an online REPL (read, evaluate, print, loop).


##Javascript Console
- Allows you to easily interface with your app to run JS commands and display log messages for help with debugging
- Shortcut to open JS console & bring focus to console
  - Mac: Cmd + Opt + J

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

setInterval(makeWider, 41.67)
```

Lastly, try this:

```
javascript:document.body.contentEditable='true'; document.designMode='on'; void 0
```

## Numbers

Numbers are one of the *types* of **values** we want to be able to interact and play with in JS.

* Integers

  ```
   ..., -1,0, 2, 3, 4, 5, ...
  ```
* Floats (or Decimal numbers)

  ```
   2.718, 3.14, .5, .25, etc
  ```

In JS, these are the same **type** of object, which it calls *Numbers*, so if you know floats and integers do not go looking for them.

## Strings

Strings are collections of letters and symbols known as **Characters**, and we use them to deal with words and text in Javascript. Strings are just another type of **value** in Javascript.

```
"John", "Jane"
```

## Boolean
A boolean represents logical values **true** or **false**

```
var catsAreGreat = true;
var dogsRule = false;
```

## Values and Expressions
Values are the simplest components in JavaScript. ```1``` is a value, ```true``` is a value, ```"hello"``` is a value, ```function() {}``` is a value.

Types of values like `Number` or `String` are not very useful without being able to form **Expressions** or **Combinations**.

Try your favorite number operators

```
  1 + 1
  => 2
  2 - 1
  => 1
```
You can also create expressions with strings using addition

```
  "Hello, " + "world!"
  => "Hello, world!"
```

This is called **String Concatentation.**


### Special Number Operators

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
```

## Variables

Having made some expressions it becomes evident we want to store these values.

To store values we use things called **variables**.

The word 'variable' means 'can change' and is used because variables can store many different types of values and can change their value many times.

```
var myNumber = 1;
// or also

var myString = "Greetings y'all!"
```

The main note to make here is that these variables should always have the `var` keyword and use `camelCase`

Variables can also store the result of any "expression".
For example:

```
var x = 2 + 2;
```
or

```
var name = 'Momo';
var greeting = 'Hello' + name;
```

##undefined & null

**undefined**: Represents a value that hasn't been defined

```
var notDefinedYet;
```

A variable that has not been assigned a value is of type undefined. A method or statement also returns undefined if the variable that is being evaluated does not have an assigned value. A function returns undefined if a value was not returned.

**null**: Represents an explicitly empty value

```
var dogsRule = null;
```

## Objects Everywhere

In Javascript we just discussed types of values we can use. These values are objects, which for now just means that in addition to storing some data you also get to use some helpful methods when you are working with them.


* If you want to turn a number into a string you can use a helpful method called `toString`.

```
(1).toString()
=> "1"
/**
 Why does the following not work?
*/
1.toString()
```

## Arrays

```
var friends = ['Moe', 'Larry', 'Curly'];
=> ['Moe', 'Larry', 'Curly']
```

Items in an array are stored in sequential order, and indexed starting at `0` and ending at `length - 1`.

```
// First friend
var firstFriend = friends[0];
 => 'Moe'
// Get the last friend
var lastFriend = friends[2]
=> 'Curly'
```

To check how many friends you have, you can use ```.length```
To add more friends, you can use ```.push```

### Other Convenient Methods

* Strings
  * `.split`, `.join`
* Arrays
  * `.pop`, `.unshift`, `.concat`, `.slice`, `.reverse`
  * 
__IMPORTANT:__ To invoke a function you must finish in with `()`
__EXAMPLE:__ "I am a String".split();

## Exercises

1.) Find the last name in the following array:

```
var friends = [
                'Moe',
                'Larry',
                'Curly',
                'Jane',
                'Emma',
                'Elizabeth',
                'Elinor',
                'Mary',
                'Darcy',
                'Grey',
                'Lydia',
                'Harriet'
              ];
```

Add your name to the end of the `friends` and add another name to beginning. Change the `Elizabeth` to `Liz`.

2.) Sort the list of `friends` above.

3.) There are a list of names in a string, below. How could we sort them? Hint: use string and array methods.

```
var friends = "Moe,Larry,Curly,Jane,Emma,Elizabeth,Elinor,Mary,Darcy,Grey,Lydia,Harriet";
```

4.) List all the `friends` above in reverse alphabetical order.

5.) We have two lists of friends below:

```
var myFriends = [
                  'Rickon',
                  'Meera',
                  'Hodor',
                  'Jojen',
                  'Osha',
                  'Rickard',
                  'Maester',
                  'Rodrik',
                  'Jory',
                  'Septa',
                  'Jon'
                ];

var yourFriends = [
                    'Bilbo',
                    'Boromir',
                    'Elrond',
                    'Faramir',
                    'Frodo',
                    'Gandalf',
                    'Legolas',
                    'Pippin'
                  ];
```

we need to combine them into one list and sort them.

7.) I have a list of favorite foods below. If `Popcorn` is my favorite food and `Potato chips` my second favorite, then how would you find the rank of another food. Try `Pho`.


```

var foods = [
              'Popcorn',
              'Potato chips',
              'Shrimp',
              'Chicken rice',
              'Poutine',
              'Tacos',
              'Toast',
              'French Toast',
              'Crab',
              'Pho',
              'Lasagna',
              'Brownie',
              'Lobster',
              'Donuts',
              'Ice cream',
              'Hamburger',
              'Sushi',
              'Chocolate',
              'Pizza'
            ];

```


8.) I made a mistake with my favorite foods. How can I find the index of `Donuts` and remove it? **(Hint: look up `splice`)**

9.) My friends want to know what my `5`th to `10`th favorite foods are.

10.) How would you create an array that efficiently stored the following information:

```
  'Moe' is 18
  'Larry' is 19
  'Curly' is 20
  'Jane' is 20
  'Emma' is 21
  'Elizabeth' is 18
  'Elinor' is 23
  'Mary' is 25
  'Darcy' is 24
  'Grey' is 18
  'Lydia' is 24
  'Harriet' is 18

```

## Objects

You can think of Objects like keys on a keyring. Each one is for a specific door and if you have nice labels on your keys you can open doors very fast.

```
//an object with a single key 'name' and single value
{name: "tom"}

```

So:
#### creating objects


```
var friend = {name: "john"}

```

#### accessing objects


```
friend["name"] OR
friend.name
```

### Exercise


1.) How would you represent the following using and object literal. Then update `john's` address to `1234 Park ln`.

````

John, Doe, 36, 1234 Park st.

````

2.) Using a combination of Objects and Array, how would you represent the following:


```
  Moe, Doe, 31, 1234 Park st.
  Larry, Doe, 36, 1234 Spark st.
  Curly, Doe, 36, 1239 Park st.
  Jane, Doe, 32, 1239 Spark st.
  Emma, Doe, 34, 1235 Spark st.
  Elizabeth, Doe, 36, 1234 Park st.
  Elinor, Doe, 35, 1230 Park st.
  Mary, Doe, 31, 1231 Park st.
  Darcy, Doe, 32, 1224 Park st.
  Grey, Doe, 34, 1214 Park st.
  Lydia, Doe, 30, 1294 Park st.
  Harriet, Doe, 32, 1324 Park st.

```

## Loose Typing
JS figures out the type based on value, and the type can change:

```
var x;
x = 2;
x = 'hi';
```

###TypeError vs ReferenceError
What is the difference between:

```
TypeError: ... is undefined
```
and

```
ReferenceError: ... is not defined
```

##Conditionals

####Comparison Operators

* AND `&&`, OR `||`
* `>`, `<`, `>=`, `<=`

### Exercise #1: The Marathon Runner

- Create a prompt that asks the user what their best marathon time was.
- If their time was between 4 to 5 hours, alert the user that their time was average.
- if the time was between 2 to 4 hours, alert the user that their time was excellent.
- If the time was greater than 5 hours, alert the user that they need to speed up!

## Conditionals: always use Triple Equal "===" or "!=="
* Check to see if two values are identical with the "===" strict equality.

```
    console.log("Always use triple equal sign to test equality.")

    console.log(42 === 42);
    //=> true

    console.log(3 === "3");
    //=> false

    // Double equal operator gives the wrong result!!
    console.log(3 == "3");
    //=> true

    console.log(2 + 2 === 4);
    //=> true

    console.log("foo" !== "bar");
    //=> true

  ```
  ```
  console.log("if - else if - else:")
  // var state = "red";
  var state = "green";
  // var state = "blue";

  // "message" is an example of a JavaScript Object Literal.
  var message = {
                "failing": "Tests are failing.",
                "passing": "Tests are passing.",
                "refactor": "Time to refactor."
              }

  if (state === "red") {  
    console.log(message.failing);
  } else if (state === "green") {
    console.log(message.passing);
  } else { // Time to refactor.
    console.log(message.refactor);  
  }
  ```

## Exercise #2: The World Translator
  - Write code that will prompt a user to enter a language code (e.g. "es", "de", "en")
  - It should print out "Hello, World" for the given language, for at least 3 languages.  If the user enters nothing, it should default to printing in English.


## Tip Calculator Exercise Part 1

**Get Setup**


1. Create a standard HTML project with the following files / folders:
  * index.html
  * css
    * app.css
  * js
    * app.js
1. Wire up the `js/app.js` and `css/app.css` files
  - add a simple `console.log` in the js file to verify that it's included correctly
  - add a simple style change, like a background color on `body`, to verify that it's referenced correctly
1. In git, commit, push

---

**User can see a properly styled form**

Write your HTML according to the wireframe below.  Make sure to include:

- A centered heading
- A centered input field with the correct placeholder
- A button

![](http://s27.postimg.org/8yj7md4df/tip_calculator.png)


Questions:

- The wireframes appear to have a comic-sans font.  Do you need to match that font?
- The wireframes capitalize the first letter in "Tip" and "Calculator".  Do you need to match that exactly?  Why or why not?

Self-assess:

- Check your work visually.  Does it match the wireframe?
- Is your HTML valid according to https://validator.w3.org/nu/ ?
  - Use the "text input" option and paste your HTML
  - If not, fix any errors and revalidate
- Are you using inline styles or style elements to center the fields?  
  - If so, move any `style` attributes or `center` tags to the linked css file
- When you click in the amount field and start typing, does the initial text disappear?
  - If not, you may have used `value` instead of `placeholder`, as indicated by the wireframe

Create a checkpoint:

It's easier to be brave and take risks when you've saved a recent copy of your work.  Now's a good time to do a quick git add / commit / push.  Your pull request will update automatically.

Hi-five!  One down...

---

**User can see the correct tip amount when they enter just a number (without a $)**

Write javascript to satisfy the following user story:

    When a user enters a whole number (1, 4, 65 etc...)
    And clicks "Calculate Tip"
    Then they should see the 20% tip amount appear beneath the text field

![](http://s9.postimg.org/4v0ivnvlb/tip_calculator_filled_in.png)

All of your code will go inside the `addEventListener` for the button.

Check your work:

- Did you use any `onclick` attributes in HTML?
  - If so, move those to `addEventListener` in `app.js`
- When you first load the page, do you see any errors in the console?
  - If so, fix them
- Enter amounts like `33` and `45` and `17`.  Do you see more or less than 2 decimals?
  - If so, make sure that you always display all tip amounts to 2 decimals, as the wireframe has specified
- Does the `$` appear correctly in the output?
  - If not, go back and look over the wireframe above and make your output match

Commit:

You've just done some awesome work.  In git, commit and push to save your work.

__Congrats! You've just written your first app!__

---

#### Research Javascript conventions

* When do you use camelCase?  
* What about snake_case?  
* Semicolons?  
* Double vs. single quotes?
