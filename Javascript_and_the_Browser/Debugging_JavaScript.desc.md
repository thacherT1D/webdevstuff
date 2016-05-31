## Objectives

- Explain what logging vs debugging is.
- Explain when you use logging vs debugging.
- Use Chrome's built-in debugger to visualize your code.

## What's logging vs debugging?

There are many ways to find and resolve bugs in a computer program, but the two most common techniques are logging and debugging.

**Logging** is the act of keeping records of the events or computed values that occur within a program. In the simplest case, these records are displayed in the console or persisted to a log file. When your program uses the `console.log()` function, it's logging.

**Debugging** is the act of using a dedicated tool, called a debugger, to stop a running program and inspect its behavior. A debugger is a powerful tool that helps developers visualize how a running program executes within a runtime system.

For example:

## When do you use logging vs debugging?

So far, you've probably used logging way more than debugging for your own programs. Logging is great tool for finding and fix bugs in smaller programs. But once your programs become larger and more complex, you may want to reach for debugging as it'll help you find and fix bugs faster in sophisticated logic.

## How do you use Chrome's built-in debugger to visualize your code?

In this lesson, we'll be using Chrome and its [built-in debugger](https://developer.chrome.com/devtools/docs/javascript-debugging) to create and debug solutions to the following popular JavaScript technical interview questions.

### The `reverse()` function

Write a function called `reverse` that accepts a string as an argument and returns a new string with all characters reversed. For example:

```js
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

```js
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

```js
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


### The Sources Tab

In this tab you can view the JavaScript your page is loading and make any changes to it. You can also add break points to stop the code and jump into any part of the code to see what your variables and any other data looks like. We will cover this more when we focus on JavaScript in the browser, but know this is one of the best resources for debugging your JS.

### The Resources Tab

In this tab you can view all of the information that has loaded on a page (images, scripts, stylesheets etc) as well as information about cookies, sessions and local storage (all things we will cover later in the course)

### The Console

You are probably going to find yourself in this tab most often. In the console you can play around with JavaScript as well as any of the JS you have included on your page. You can also see AJAX calls on the page (right click to check Log XMLHttpRequests) as well as any errors your browser is reporting. The console along with the sources tab are your best spots for debugging JavaScript and learning to work with them will make your life much easier as you continue to learn JS.

If you want to learn some more about Chrome Dev Tools, check out this free tutorial on [CodeSchool](http://discover-devtools.codeschool.com/?locale=en)

### Understanding JavaScript Errors

Before we take a look at the `sources` tab, let's make sure we have a good idea of what kind of errors we commonly encounter and why they happen. Understanding this fundamentally will make debugging faster and far less painful!

### Common JavaScript Errors

`TypeError` - Creates an instance representing an error that occurs when a variable or parameter is not of a valid type. What does that mean? Well try running this code in the console `undefined()` and you will get a very common error `undefined is not a function` - this means that the built in type `undefined` can not be invoked. Try this code:

```js
var person;
person.sayHi // what does this display?
```

`SyntaxError` - this one is pretty self explanitory, something is wrong with your syntax (make sure Array brackets, curly braces, quotes and parenthasis close!)

`ReferenceError` - this happens when you try to access something that has not been declared. Type in the chrome console `testing` - what do you see?

`RangeError` - when you have a recursive function (a function that calls itself) and you don't return or exit the function before too many other functions are called, the call stack will exceed and you will get a range error or a Stack Overflow!

## Debugging JS + More Essential JS Concepts

As programmers we are all going to make mistakes. If you want some inspiration/understanding (or nostalgia) you can learn more here - https://www.youtube.com/watch?v=dQ7tIfWD_FM.

The most important thing to start doing once we make mistakes is to **READ THE ERROR**. This means looking at the type of the error (is it a RangeError? TypeError? ReferenceError?), reading the error message, seeing what line the error is occurring on and then taking a step back to think what the problem is. The more thinking you can do before jumping in and trying to fix things, the better off you will be - especially when you first start programming.

You can learn more about JS error types [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

### How do we debug?

There are many ways of debugging our code, the simplest ones involve trying to figure out what things are by placing `console.log`s throughout the code. While this can be effective for smaller pieces of code - this becomes incredibly challenging when there are multiple files with hundreds if not thousands of lines.

The tool that we are going to be using, which is one of the most commonly used professional debugging tools is the `sources` tab, which is part of the `chrome` developer tools. Let's head over to the sources tab in the developer tools (open with `command + option + j`). Inside the sources tab, we have 6 icons that help us debug our code and see what's going on. From the left to the right:

1. Pause/Resume - resume execution of the entire page until the next breakpoint (if there is)
2. Step over - run highlighted line and then step over to the next line of code
3. Step into - go down into whatever function is being called
4. Step out - return from the current function and go to its caller
5. Deactivate all breakpoints - remove all breakpoints in the code
6. Pause on exceptions

When you have paused the code, you can hover over variables and see their values and inherited properties and methods.

http://discover-devtools.codeschool.com/

https://developer.chrome.com/devtools/docs/javascript-debugging

#### Additional Reading

More about the sources tab - http://commandlinefanatic.com/cgi-bin/showarticle.cgi?article=art035
Keyboard shortcuts for the developer tools, check this out - https://developer.chrome.com/devtools/docs/shortcuts
