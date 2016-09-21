# Debugging Node.js Applications

## Objectives

By the end of the lesson, you will be able to:

- Explain the advantages of using debugging tools versus logging
- Use Chrome Dev Tools and the Node.js `--inspect` flag to debug Node apps

## Why should I use a debugger?

In many situations, a full debugging suite is probably overkill for simple or localized errors. However, as applications get larger and more complex, feature-rich debugging tools start to make a whole lot of sense.

Imagine that you've just gotten a new job, and are tasked with familiarizing yourself with the code base. It's tens of thousands of lines of code, with multiple tiers of interaction going on. In this situation, it can be difficult to even know where to start throwing your `console.log` statements. This is where debuggers demonstrate their value.

This isn't the only reason you may want to use a debugger, but it's one of the most common. As an added bonus, if you use a debugger you no longer need to worry about removing `console.log` statements all over your project.

## What is a debugger?

In the general sense, a debugger is a program that we use in order to inspect how our application is executing, as it is executing. Most debuggers will support:

<dl>
    <dt>Breakpoints</dt>
    <dd>A breakpoint is essentially a flagged line in your source code. When execution reaches this line, the debugger will pause program execution and state.</dd>
    <dt>Variable watching</dt>
    <dd>Set certain variables to watch. These are usually then displayed in a panel in the GUI, and their values update appropiately as the program executes.</dd>
    <dt>Step-by-step execution</dt>
    <dd>Once a program has been paused, you can move forward through each step of the program one by one.</dd>
</dl>

## Debugging with Chrome Developer Tools

### Starting the Debugger

There are a bunch of different debugging tools in the Node ecosystem, and today we're going to look at how we can use the Chrome Developer Tools to inspect a Node application.

The first thing you have to do is run your Node app with the `--inspect` flag. This starts our application with debugging active, and gives us a URL we can paste into Chrome.

```sh
node --inspect path-to-entry.js
```

Without any breakpoints set, this isn't going to do anything for us. Yes, the debugger is running, but we haven't told it to stop the program for inspection anywhere, so it will just continue to execute like normal. Let's tell it to pause (called breaking when you're debugging) on the first line of the program by passing the `--debug-brk` flag:

```sh
node --inspect --debug-brk path-to-entry.js
```

In your own projects, it may be useful to create a new `npm` script in your `package.json` for this:

```json
...
"scripts": {
    "start": "node ./src/server/server",
    "test": "./node_modules/mocha/bin/_mocha",
    "start-debug": "node --inspect --debug-brk ./src/server/server"
},
...
```

To use it:

```sh
npm run start-debug
```

### Basic Usage

![Chrome Dev Tools](http://i.imgur.com/UYwAZ8C.jpg)

The above is a view of the Sources tab in Chrome Dev Tools. This is where you'll spend most of your time. In the middle is the source code itself, on the left you have a directory tree (this is collapsed in the picture), and on the right we've got a whole bunch of panels and buttons. The panels' functions are fairly self-evident, but those buttons are obscure and unlabeled. That's frustrating, but you can ignore them once you've gotten comfortable with the hotkeys. From left to right:

Action | Hotkey | Function Key
--- | --- | ---
Pause/Continue | <kbd>⌘</kbd> + <kbd>\\</kbd> | <kbd>F8</kbd>
Step Over | <kbd>⌘</kbd> + <kbd>'</kbd> | <kbd>F10</kbd>
Step In | <kbd>⌘</kbd> + <kbd>;</kbd> | <kbd>F11</kbd>
Step Out | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>;</kbd> | <kbd>Shift</kbd> + <kbd>F11</kbd>
Disable all breakpoints | N/A | <kbd>⌘</kbd> + <kbd>F8</kbd>
Pause on exceptions | N/A

"Pause/Continue", "Disable all breakpoints", and "Pause on exceptions" are obvious, but the difference between the kinds of steps are important to understand.

<dl>
    <dt>Step Over</dt>
    <dd>You'll probably use this the most often. "Step Over" just means "move to the next step of the program". For lines that involve a function call, "Step Over" evaluates the call as a unit and will show you the return value from the function when you hover over it.</dd>
    <dt>Step Into</dt>
    <dd>Works similarly to "Step Over" in most ways, except for when the current line involves a function call. Rather than evaluating the function as a whole unit, "Step Into" will move the execution point inside the scope of the called function. Now you can step through each line within the function. At the end of the function, the execution point will return to where the function was called.</dd>
    <dt>Step Out</dt>
    <dd>Unsurprisingly, this action complements "Step Into". If you've stepped into a function, but want to return to the parent context you use "Step Out". It will execute the remaining lines of the function, and return the execution point to where the function was called.</dd>
</dl>

#### Exercise

Let's get comfortable with stepping through a program, watching it flow, and inspecting a variable.

1. Make a directory for your work for the lesson, and create a new JavaScript file.
1. In your file, paste in the following code:

   ```js
   let words = ['look', 'at', 'me', 'add', 'my', 'elements', 'to', 'result'];
   let result = '';

   for (let i = 0; i < words.length; i++) {
     result += words[i] + ' ';
   }

   console.log(result);
   ```

1. Run the file with debugging active.

   ```sh
   node --inspect --debug-brk your-filename.js
   ```

1. You'll get some output in the console that looks something like this:

   ```sh
   Debugger listening on port 9229.
   Warning: This is an experimental feature and could change at any time.
   To start debugging, open the following URL in Chrome:
       chrome-devtools://devtools/remote/serve_file/@521e5b7e2b7cc66b4006a8a54cb9c4e57494a5ef/inspector.html?experiments=true&v8only=true&ws=localhost:9229/node
   ```

1. Paste the URL there that starts with `chrome-devtools` into Chrome. You should have a view of the Chrome Dev Tools with your file loaded and paused on the first line.
1. Add the `result` variable to the "Watch" panel.
    1. Click the `+` icon.
    1. Type in the variable name (`result`) and hit <kbd>Enter</kbd>.
1. Step through the program with "Step Over" until it finishes and watch the value of `result` change.
1. **Bonus**: Rewrite the snippet to use `Array.reduce` instead of the loop. How does the behavior of the debugger change when you try to step through the program? How can you mimic the behavior seen with the `for` loop?

## Debugging an ExpressJS application

Now that we know what the buttons do, let's look at how we can use the debugger to inspect an Express app. Before diving right into a full app, let's look at a simpler one first:

```js
const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  if (Object.keys(req.query).length) {
    res.json({
      message: "Here's your query.",
      query: req.query
    });
  }
  else {
    res.json({ message: 'No querystring.' });
  }
});

app.listen(3000);
```

This little Express app just listens on `localhost:3000/` for a `GET` request. If there's a querystring attached to the request, it sends back the first response, and if there isn't it sends back the second one. Run the app with the `--inspect` flag, and open up the debugger:

```sh
node --inspect --debug-brk 02-first-express.js
```

Set a breakpoint on the `if` line and then let the application run by hitting <kbd>⌘</kbd>+<kbd>\\</kbd>, or the Resume button. Now, use `httpie` to make GET requests to the base URL. Try it with both a querystring appended to the URL and without. The easiest way to work with querystrings in `httpie` is to use the `==` syntax, rather than using `?`, `=`, and `&` like you would in the browser:

```sh
http localhost:3000/ look==at my==querystring
```

In the browser would look like:

```plain
http://localhost:3000/?look=at&my=querystring
```

If you don't use the `==` syntax, then you need to make sure that you escape the `&` character each time you make your request, or the shell will truncate your querystring after the first `name=value` pair. The `&` has special meaning to the shell, so if you don't escape it, the URL will not be parsed correctly. A request with the ampersand escaped would look like:

```sh
http localhost:3000/?look=at\&my=querystring
```

When you've gotten comfortable stepping through this little app, take a closer look at the Scope section of the right side panel. In here, you can see the variables available to different levels of scope. Under Local, you'll see both `req` and `res`. These are the `IncomingMessage` and `ServerResponse` objects that Express gives us. Now you can look at all of their properties in the debugger, and their values represent the value at execution time.

#### Exercise

Use [this repo](https://github.com/benhassara/books-bugs) to get some more practice. Clone the repo, checkout the `bug-1` branch, and then fix the bugs until all the user stories are fulfilled.
