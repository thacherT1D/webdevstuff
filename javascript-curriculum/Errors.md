# Errors

[Lesson](https://github.com/gSchool/error-handling-lesson)

# Error Handling In JavaScript

This article is about Errors in JavaScript. Specifically, this article is designed to help you understand:

* When __Errors__ are __thrown__.
* Why JavaScript needs __Errors__.
* The purpose and syntax of __try/catch__ blocks.
* How to create your own custom __Errors__.

## Errors

Occasionally a computer program encounters an impossible situation. This typically happens when a programmer makes an "unreasonable" request. Here's an example:

```js
var arr = new Array(-1);
```

The parameter for the Array constructor is supposed to be the size of the array; that line of code is asking for an array that can hold -1 items. This is clearly an unreasonable request. If we run this code in the console, we get a message like this:

`RangeError: Invalid array length`

The Array constructor is telling us that -1 is not an acceptable value for array size. This [`RangeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) was thrown because we asked the computer to do something that doesn't make sense. Instead of continuing, JavaScript tells us that we have asked for the impossible by __throwing__ a RangeError.

### Impossible Requests

Hopefully the above is enough to illustrate that some requests simply cannot be serviced. When programmers make an impossible request of the computer, we say that an __error is thrown__.

Lets examine two other code samples which __throw__ errors:

```js
var invalidObject = {
    x = 3;
}
```

This code, when run, throws: `SyntaxError: Unexpected token =`. This is perhaps the most fundamental error you can make in any programming language. We've written a statement that our JavaScript interpreter __doesn't understand__. It violates the rules of the lanuage (object literals use `:` not `=` for property assignment). When the interpreter gets to this line a [`SyntaxError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SyntaxError) is thrown because the line in question cannot be understood by our JavaScript engine.

Here is another example:

```js
console.log(nonExistent);
```

This time, we see `ReferenceError: nonExistent is not defined`. Here, we have asked the computer to print the value of `nonExistent` to our terminal, but a variable named `nonExistent` doesn't appear anywhere in the program. `nonExistent` is not in a local scope or in the global scope. After searching through the namespace for `nonExistent` JavaScript gives up and tells us we can only print things which exist in the form of a [`ReferenceError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ReferenceError).

Modern computers and programming languages, powerful as they are, have limitations. These limitations often come to us in the form of Errors.

## Try / Catch / Finally

In JavaScript (and many other programming languages) the default behavior is to terminate the program entierly when an error is thrown. Many times this makes sense. For example, perhaps we're not finished with our program yet. In this case an Error is thrown when we run our code, we realize we've made a mistake, fix it and repeat the procecss.

Other times, terminating the entire process is a bit too extreme. Imagine for example, a user submits an invalid email address to our webserver, for example "iAintPayin". Our webserver attempts to send an email but an error is thrown because an email can't be sent to a name without a domain (@gmail.com, for example). Should the whole webserver really crash?

A more reasonable option would be to ignore the fake email address and continue with business as usual. To facilitate this kind of behavior, we use a `try/catch` block. Consider the following:

```js
try {
    var arr = new Array[-1]; // Throws RangeError
}
catch(err) {
    console.log(err); // This IS the RangeError
}

console.log("But this time, my program stays alive!");
```

When we try to create an impossible Array, the `RangeError` is still thrown, but this time it is __caught__ because it was thrown inside of the __try block__. When we catch an error, we're saying "I know it's possible for something to go wrong - but I want to continue anyway."

Sometimes we'll write special code that helps us recover from an error. Other times we'll simply log that an error occured, and continue on as usual. We can also add a `finally` statement to any try/catch block:


```js
try {
    var arr = new Array[-1]; // Throws RangeError
}
catch(err) {
    console.log(err); // This IS the RangeError
}
finally {
    return arr;
}

console.log("My program returns before this because of finally!");
```

The statements inside of the `finally` block will __always__ run. If the statements in `try` complete without throwing an error, then the `finally` block executes directly after the last statment in the `try` block. If an Error is thrown during the `try` block, the `catch` block triggers as usual, then the finally block executes following the last statement in the `catch` block.

## Custom Errors

Creating a custom error is a fantastic way to communicate with other programmers who might be use our code. Take a look at this example:

```js
function sum() {
    var sum = 0;
    for(var i in arguments) {
        var curNum = arguments[i];

        if(typeof curNum !== 'number') {
            throw new TypeError("Cannot compute sum for value: " +
                curNum + ". It's data-type should be number but was: " +
                typeof curNum);
        }

        sum += curNum;
    }

    return sum;
}

sum(1, 2, 3, 4, 5, 6, "grape");
```

Try running this code in a terminal. The result:

```
TypeError: Cannot compute sum for value: grape.
It's data-type should be number but was: string
```

In this example, when we passed in the string `"grape"` to a function which expected only numbers an error was thrown. It's very easy to understand why - we sent a string to a function expecting a number. Not only that, but the error message tells us the unexpected value was `"grape"`.

If this is your first time digging into Errors, there might be two new concepts:

`new TypeError()` and the `throw` keyword.

Errors are like any other constructor in JavaScript, we can envoke them with the `new` keyword. The constructor accepts a message for our Error, and the Error object is created. JavaScript uses inheritence to get special properties of the error, like the stack trace.

The `throw` keyword is used to trigger the error. Like `return`, `throw` halts the current function's execution immediately. Unlike `return` though, `throw` propogates up the call stack until it is `caught` or it reaches the very top of the call stack, at which point the program would halt completely.
