## Objectives

- Explain what logging vs debugging is.
- Explain when you use logging vs debugging.
- Use Chrome's debugger to visualize your code.
- Debug a JavaScript program that throws an error.

## What's logging vs debugging?

There are many ways to find and resolve bugs in a computer program, but the two most common techniques are logging and debugging.

**Logging** is the act of recording events or computed values that occur within a program. In the simplest case, these records are displayed in the console or persisted to a log file. When your program uses the `console.log()` function, it's logging.

**Debugging** is the act of using a dedicated tool, called a debugger, to pause and step through a running program and inspect its behavior. A debugger is a powerful tool that helps developers visualize how a running program executes. For example, create an `lunch.html` file and add the following code to it.

```html
<script>
  var food = 'sandwich';

  alert("I'm having a " + food + " for lunch.");
</script>
```

And then step through the following instructions to see Chrome's [built-in debugger](https://developer.chrome.com/devtools/docs/javascript-debugging) in action.

1. Open the `lunch.html` file in Chrome.
1. Open the Chrome Developer Tools by pressing `Command + Option + I`.
1. Click on the Sources tab.
1. Select the `lunch.html` file from the file tree on the left.
1. Add a breakpoint to line 1 by clicking on the line number in the gutter.
1. Refresh the page the engage the debugger.

A **breakpoint** tells the JavaScript interpreter to pause a running JavaScript program at that line number. Once a program is paused, you can inspect the variables inside the program's scope at that moment in time. You can also step through the program and watch how the variables change when each line is executed.

**NOTE:** When paused, you can hover over a variable to see what it contains.

## When do you use logging vs debugging?

So far, you've probably used logging way more than debugging for your own programs. Logging is great tool for finding and fixing bugs in smaller programs. But once your programs become larger and more complex, you may want to reach for debugging as it'll help you visualize how scope changes over time.

## How do you use Chrome's debugger to visualize your code?

Inside the Chrome Developer Tools, the Sources tab has six clickable action icons that'll help you visualize scope changes.

| Action Icon | Description                                                    |
|-------------|----------------------------------------------------------------|
| Resume      | Resume execution until the next breakpoint.                    |
| Step over   | Execute the current line and then pause on next line.          |
| Step into   | Jump into the function about to be invoked.                    |
| Step out    | Execute the current function and pause where it was invoked.   |
| Breakpoints | Disable or enable all set breakpoints.                         |
| Exceptions  | Toggle engaging the debugger when the program throws an error. |

To the following popular JavaScript technical interview questions.

### The `reverse()` function

Write a function called `reverse` that accepts a string as an argument and returns a new string with all characters reversed. For example:

```javascript
reverse('abcdef'); // 'fedcba'
```

Start off by creating an `reverse.html` file with the following code template.

```html
<script>
  var reverse = function(input) {
    // Solution here
  };

  reverse('a');
</script>
```

Once the file is saved, open it inside a new tab in Chrome and toggle the Chrome Dev Tools by pressing the `Command + Shift + I` keys. Next, click the `Sources` panel and select the HTML file from the file tree on the left. You should see something like this.

![](https://i.imgur.com/xSIMANs.png)

### The `isPalindrome()` function

Write a function called `isPalindrome` that accepts a string as an argument and returns `true` if the string is a palindrome otherwise `false`. For example:

```javascript
isPalindrome('tacocat');  // true
isPalindrome('abcdef');   // false
```

Start off by creating an `is_palindrome.html` file with the following code template.

```html
<script>
  var isPalindrome = function(input) {
    // Solution here
  };

  isPalindrome('a');
</script>
```

### The `uniq()` function

Write a function called `uniq` that accepts an array as an argument and returns a new array with all duplicate elements removed. For example:

```javascript
uniq(['a', 'b', 'c', 'a']);  // ['a', 'b', 'c']
```

Start off by creating an `uniq.html` file with the following code template.

```html
<script>
  var uniq = function(input) {
    // Solution here
  };

  uniq(['a']);
</script>
```

### The Console

You are probably going to find yourself in this tab most often. In the console you can play around with JavaScript as well as any of the JS you have included on your page. You can also see AJAX calls on the page (right click to check Log XMLHttpRequests) as well as any errors your browser is reporting. The console along with the sources tab are your best spots for debugging JavaScript and learning to work with them will make your life much easier as you continue to learn JS.

If you want to learn some more about Chrome Dev Tools, check out this free tutorial on [CodeSchool](http://discover-devtools.codeschool.com/?locale=en)

## How do you debug a JavaScript program that throws an error?

The most important thing to start doing once is to **read the error**. This means looking at the type of the error, reading the error message, seeing what line the error is occurring on, and then taking a step back to think what the problem is. The more thinking you can do before jumping in and trying to fix things, the better off you will be.

Let's make sure we have a good idea of the kinds of errors we commonly encounter and why they happen. Understanding this fundamentally will make debugging faster and far less painful!

### `TypeError`

Creates an instance representing an error that occurs when a variable or parameter is not of a valid type. What does that mean? Well try running this code in the console `undefined()` and you will get a very common error `undefined is not a function` - this means that the built in type `undefined` can not be invoked. Try this code:

```js
var person;
person.sayHi // what does this display?
```

### `SyntaxError`

This one is pretty self explanatory, something is wrong with your syntax (make sure Array brackets, curly braces, quotes and parenthesis close!)

### `ReferenceError`

This happens when you try to access something that has not been declared. Type in the chrome console `testing` - what do you see?

### `RangeError`

When you have a recursive function (a function that calls itself) and you don't return or exit the function before too many other functions are called, the call stack will exceed and you will get a range error or a Stack Overflow!

You can learn more about JS error types [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

## Resources

- https://developer.chrome.com/devtools/docs/javascript-debugging
- http://discover-devtools.codeschool.com/
- http://commandlinefanatic.com/cgi-bin/showarticle.cgi?article=art035
- https://developer.chrome.com/devtools/docs/shortcuts
