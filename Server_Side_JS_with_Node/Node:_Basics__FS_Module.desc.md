### Objectives

By the end of this lesson you should be able to:

- Describe what Node.js is and why it's important.
- Describe what NPM is and why it's important.
- Run a JavaScript file using Node.js.
- Use the `fs` module to interact with the filesystem.
- Draw a diagram of Node's event loop.

#### How do I upgrade Node.js?

Before getting started, take a moment to ensure you're laptop is using the latest version of Node.js.

```shell
brew update
brew outdated
brew upgrade node
```

### What is Node.js and why is it so important?

Node.js is a runtime system for executing JavaScript from outside a web browser. When a JavaScript program this way, it abandons browser concepts like a `window` object to access or a DOM tree to manage. Instead, a JavaScript program run with Node.js is only concerned with server concepts like managing a computer's filesystem and accessing it's network.

Some of the [largest companies]['companies'] on the planet use Node.js for part of their technology stack. Their usage of Node.js varies widely from company to company and it's unlikely that any of one of them operates entirely in Node.js. Like everything else, Node.js has [advantages](http://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js) and [disadvantages](http://www.quora.com/What-are-the-disadvantages-of-using-Node-js).

Node.js is important because it is a JavaScript server-side **runtime system**. A [runtime system](https://en.wikipedia.org/wiki/Runtime_system) is the code that is dynamically executed during program operation. Javascript is an interpreted languaged, which means that it isn't compiled prior to running. C++, Objective-C and many other languages not based on C are put through a "compiler" that turns them into instructions that can be directly sent to the processor to be executed. An interpreted language is not compiled before it runs, but is instead compiled Just In Time (often abbreviated JIT) when the actual code is about to be run.

One of the biggest changes that the V8 runtime introduces is in it's JIT compiler. It dynamically compiles and optimizes Javascript as it runs, and re-optimizes it according to the state of the program as the program runs. [Read the wikipedia entry on V8](https://en.wikipedia.org/wiki/V8_(JavaScript_engine).

#### Challenge

Explain what it means to say that [V8](https://developers.google.com/v8/?hl=en) provides the runtime environment for JavaScript on the server. What is the runtime in Chrome? In Firefox?

### What is the Node.js REPL?

One powerful feature of Node.js is the **REPL** which is short for read, evaluate, print, and loop. In the Node.js REPL, JavaScript code you enter will be executed in the Node.js runtime and their any results will be displayed in the Terminal.

You can try it out by launching your Terminal app and running the `node` command without any arguments.

```shell
node
```

You should see a `>` prompt appear.

```shell
>
```

You can now run any valid JavaScript and it will be executed by the Node.js runtime. It's similar to the browser console you've used in the past, only you don't have access to any browser concepts like the `window` object, the `document` object, or any other browser APIs.

```shell
> 1 + 2
3
>
```

To leave this the Node.js REPL, run the `.exit` command.

```shell
.exit
```

Now, create a new javascript file in a new folder in your projects or `src` directory. Call it `script.js`.  

```shell
touch ~/Desktop/script.js
```

Open the file in your text editor

```shell
atom ~/Desktop/script.js
```

And write the following code.

```js
console.log('Hello world');
```

Now save the file and run it with the `node` command.

```shell
node ~/Desktop/script.js
```

This is how we execute files with the `node` runtime. You can delete this file with the `rm` command.

```shell
rm ~/Desktop/script.js
```

### What is NPM and why is it important?

What is [npm](https://en.wikipedia.org/wiki/Npm_(software))?
`npm` is a package manager for Node.js and JavaScript. _Packages_, or _libraries_, are bits of code that are available for reuse.

One of the best features of Node.js is that it is _lightweight_; that is, Node itself provides minimal functionality. Most things are done with _modules_. NPM packages are an example of [Modules](https://en.wikipedia.org/wiki/Modular_programming), which is a concept we see across many languages and frameworks.

An important consequence of the Node.js module system is that there is not a single _global scope_, in fact, each file defines its own scope, and then modules are _composed_ together into other modules.

### Using our first module: `fs`

The purpose of this lesson is to create exposure to `fs`, the filesystem module. `fs` is useful because files are a great medium for storing information, like the contents of webpages or flat data.

Why is file parsing important though? If you think about it, if you can use JavaScript to "read" the contents of files (stream of characters), then you could write a programming language with JavaScript. Or, perhaps, you can take weather data from the last 30 years, parse it into JavaScript objects, and run an analysis on it. The options are endless, but all require having the rights skills/tools to do the job.

##### What is I/O?

Although computers are able to rapidly execute instructions sent to the (CPU), it is much slower to get information that is located somewhere like a hard disk, or another computer. Getting data from somewhere other than memomry is known as _I/O_, or, input/output. In particular with Node.js, the areas of interest are file and network I/O. File I/O will involve interacting with files on the computer's _filesystem_. Because Node.js is able to do these things _asyncronously_, it does not have to stop and wait for I/O to happen. [Take a look at this table](http://www.eecs.berkeley.edu/~rcs/research/interactive_latency.html) to understand what kind of time it takes to do common I/O tasks that we currently take for granted.

Can you think of an example of file I/O that you do on a regular basis? If you said `mv`, `cp`, `rm`, `touch` or any other unix command that creates/reads/modifies/deletes, etc. a file, then you are correct.

## Exercise

Start by setting up a new project.

```shell
mkdir party
cd party
echo '[]' >> guests.json
touch guests.js
atom .
```

Add the following code to the `guests.js` file.

```js
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

fs.readFile(guestsPath, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  var guests = JSON.parse(data);

  console.log(guests);
});
```

Then run the program using the `node` command.

```shell
$ node guests.js
[]
```

Now refactor the `guests.js` file to handle the `read` subcommand.

```js
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(data);

    console.log(guests);
  });
}
else {
  console.error(`Usage: ${node} ${file} read`);
  process.exit(1);
}
```

Then run the program using the `node` command, both with and without the `read` subcommand.

```shell
$ node guests.js
Usage: node guests.js read

$ node guests.js read
[]
```

Now refactor the `guests.js` file to also handle the `create` subcommand.

```js
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(data);

    console.log(guests);
  });
}
else if (cmd === 'create') {
  fs.readFile(guestsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }

    var guests = JSON.parse(data);
    var guest = process.argv[3];

    if (!guest) {
      console.error(`Usage: ${node} ${file} ${cmd} GUEST`);
      process.exit(1);
    }

    guests.push(guest);

    var guestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
      if (writeErr) {
        throw writeErr;
      }

      console.log(guest);
    });
  });
}
else {
  console.error(`Usage: ${node} ${file} [read | create]`);
  process.exit(1);
}
```

Then run the program using the `node` command, both with and without the `create` subcommand.

```shell
$ node guests.js
Usage: node guests.js [read | create]

$ node guests.js create
Usage: node guests.js create GUEST

$ node guests.js create Mary
Mary

$ node guests.js read
[ 'Mary' ]

$ node guests.js create Don
Don

$ node guests.js read
[ 'Mary', 'Don' ]
```

## Assignment

[Pet Shop: Node Filesystem](https://github.com/gSchool/fs-pet-shop)

## Resources

[Introduction to Node.js (video)](https://www.youtube.com/watch?v=pU9Q6oiQNd0)  
[V8 (JavaScript Engine)](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)
[Event Driven Programming](http://en.wikipedia.org/wiki/Event-driven_programming)  


['companies']: https://github.com/joyent/node/wiki/projects,-applications,-and-companies-using-node
