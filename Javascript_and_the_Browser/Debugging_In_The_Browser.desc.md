## Debugging Using the Sources Tab

So far we've been debugging issues using `console.log` and while that is a fine place to start, once our programs become larger and more complex, we need better tools to diagnose and fix our errors!

### Understanding JavaScript Errors

Before we take a look at the `sources` tab, let's make sure we have a good idea of what kind of errors we commonly encounter and why they happen. Understanding this fundamentally will make debugging faster and far less painful!

### Common JavaScript Errors

`TypeError` - 

`SyntaxError` - this one is pretty self explanitory, something is wrong with your syntax (make sure Array brackets, curly braces, quotes and parenthasis close!)

`ReferenceError`

`RangeError`

A big part of becoming a developer is not only learning how to code, but learning how to use valuable tools to help you build faster and more efficiently.

## Chrome Developer Tools (Elements, Console, Network, Resources)

In short, Chrome Developer Tools are freaking sweet. Here is a brief walkthrough of some of the most useful features of the Developer Tools that you will be using with almost every single thing you build in WDI.

### The Elements Tab

This tab is extremely useful for looking at the DOM, and seeing your CSS styling. You can also use it to make changes to your HTML and CSS in real time, which is awesome when you are designing your pages.

### The Network Tab

This tab is an excellent resource for seeing if HTML, CSS, Fonts, JavaScript and other goodies on your page have loaded. You can also use this tab to see responses from a server (SUPER useful when we start doing back-end development and AJAX) and file paths which will help you debug issues of content not being loaded. You can also view how long these files take to load to help when focusing on page load performance.

### The Sources Tab

In this tab you can view the JavaScript your page is loading and make any changes to it. You can also add break points to stop the code and jump into any part of the code to see what your variables and any other data looks like. We will cover this more when we focus on JavaScript in the browser, but know this is one of the best resources for debugging your JS.

### The Resources Tab

In this tab you can view all of the information that has loaded on a page (images, scripts, stylesheets etc) as well as information about cookies, sessions and local storage (all things we will cover later in the course)

### The Console

You are probably going to find yourself in this tab most often. In the console you can play around with JavaScript as well as any of the JS you have included on your page. You can also see AJAX calls on the page (right click to check Log XMLHttpRequests) as well as any errors your browser is reporting. The console along with the sources tab are your best spots for debugging JavaScript and learning to work with them will make your life much easier as you continue to learn JS. 

If you want to learn some more about Chrome Dev Tools, check out this free tutorial on [CodeSchool](http://discover-devtools.codeschool.com/?locale=en)

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