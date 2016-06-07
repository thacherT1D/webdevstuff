# Introduction and Setup

## Materials

Ensure that you have:

- [Node.js Installed](https://nodejs.org/en/)

## Objectives

By the end of this lesson you should be able to:

- Discuss the history of node.
- Explain how Node provides a JS runtime outside of the browser using the V8 engine.
- Discuss what NPM is and what it is used for.
- Run a javascript file with node.
- Use `fs` to parse files and understand more about file I/O.
- Use the File System Module (`fs`) to interact with the filesystem.
- Explain how the event loop plays a key role in the way Node.js works.

## Key terms:

- Runtime
- V8
- Event loop
- File I/O

## What is Node.js

Node.js is a powerful server-side platform for executing JavaScript. In particular, its largest advantage over the "plain old" JavaScript language is that it provides access to the filesystem and network. Another way to think about this, is that Node.js is just another environment that can run JavaScript code (the Chrome Web Console is another example). The key distinction with Node.js is that it is not the browser (client), there is no DOM nor `window`; those are browser concepts. Node.js is on the other side of the coin; the server. This concept will be further explored when using Node.js in the context of the web, for now knowing this basic conceptualization is sufficient.

Some of the largest [companies on the planet use Node.js](https://github.com/joyent/node/wiki/projects,-applications,-and-companies-using-node) including eBay, Joyent, Klout, LinkedIn, Microsoft, and PayPal use Node.js for some part of their stack. Depending on the firm, usage may vary widely, but it is highly unlikely that any of these companies operate entirely (or even majority) in Node.js. Node.js is like anything else though, and has its [disadvantages](http://www.quora.com/What-are-the-disadvantages-of-using-Node-js) and [advantages](http://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js).

Node.js is important because it is a JavaScript _runtime_ for the server. A [runtime](https://en.wikipedia.org/wiki/Runtime_system) is the code that is dynamically executed during program operation. Javascript is an interpreted language, which means that it isn't compiled prior to running. C++, Objective-C and many other languages not based on C are put through a "compiler" that turns them into instructions that can be directly sent to the processor to be executed. An interpreted language is not compiled before it runs, but is instead compiled Just In Time (often abbreviated JIT) when the actual code is about to be run.

One of the biggest changes that the V8 runtime introduces is in it's JIT compiler. It dynamically compiles and optimizes Javascript as it runs, and re-optimizes it according to the state of the program as the program runs. [Read the wikipedia entry on V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)).

- _Challenge_: Explain what it means to say that [V8](https://developers.google.com/v8/?hl=en) provides the runtime environment for JavaScript on the server.
- What is the runtime in Chrome? In Firefox?

One powerful feature of Node.js is the _REPL_; Read, Eval, Print, Loop. This is the `node` console, commands may be entered to be evaluated and their results will be shown (if they emit any).

### Try it - REPL

**Open your terminal**, and type `node`, and hit enter. You should see a `>` appear, and it is in this mode you can enter any valid javascript and it will interpret it. It's similar to the console you're used to from the browser, only we don't have access to `document` or any other browser APIs.

Now, `touch` a new javascript file in a new folder in your projects or `src` directory. Call it `script.js`.<br>
`touch ~/src/node/examples/script.js` (you can use your own folder structure if you like)

Open that file in your IDE, and put the following code in:

```javascript
console.log("Hello World");
```

Now `cd` into that folder and run that file with `node script.js`. This is how we execute files with the `node` runtime.

## NPM

What is [npm](https://en.wikipedia.org/wiki/Npm_(software))? `npm` is a package manager for Node.js and JavaScript. _Packages_, or _libraries_, are bits of code that are available for reuse.

One of the best features of Node.js is that it is _lightweight_; that is, Node itself provides minimal functionality. Most things are done with _modules_. NPM packages are an example of [Modules](https://en.wikipedia.org/wiki/Modular_programming), which is a concept we see across many languages and frameworks.

An important consequence of the Node.js module system is that there is not a single _global scope_, in fact, each file defines its own scope, and then modules are _composed_ together into other modules.

## Using our first module: `fs`

The purpose of this lesson is to create exposure to `fs`, the filesystem module. `fs` is useful because files are a great medium for storing information, like the contents of webpages or flat data.

Why is file parsing important though? If you think about it, if you can use JavaScript to "read" the contents of files (stream of characters), then you could write a programming language with JavaScript. Or, perhaps, you can take weather data from the last 30 years, parse it into JavaScript objects, and run an analysis on it. The options are endless, but all require having the rights skills/tools to do the job.

### What is I/O?

Although computers are able to rapidly execute instructions sent to the (CPU), it is much slower to get information that is located somewhere like a hard disk, or another computer. Getting data from somewhere other than memomry is known as _I/O_, or, input/output. In particular with Node.js, the areas of interest are file and network I/O. File I/O will involve interacting with files on the computer's _filesystem_. Because Node.js is able to do these things _asyncronously_, it does not have to stop and wait for I/O to happen. [Take a look at this table](http://www.eecs.berkeley.edu/~rcs/research/interactive_latency.html) to understand what kind of time it takes to do common I/O tasks that we currently take for granted.

Can you think of an example of file I/O that you do on a regular basis? If you said `mv`, `cp`, `rm`, `touch` or any other unix command that creates/reads/modifies/deletes, etc. a file, then you are correct.

# Exercises

[Logfile parsing exercise](https://github.com/gSchool/js-node-log-file-parsing)<br>
[Writing your own interpreter (Optional, Advanced)](https://github.com/gSchool/node-async-text-parsing-0)

# Assignment

[Command Line To Do](https://github.com/gSchool/node-fs-todo-cli-example)

# Resources

[Introduction to Node.js (video)](https://www.youtube.com/watch?v=pU9Q6oiQNd0)<br>
[V8(JavaScript Engine)](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)) [Event Driven Programming](http://en.wikipedia.org/wiki/Event-driven_programming)
