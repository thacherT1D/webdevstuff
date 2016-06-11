## Objectives

- Describe what Node.js is.
- Explain why Node.js is important.
- Upgrade Node.js to the latest version.
- Run JavaScript code using the Node.js REPL.
- Run JavaScript code using the Node.js interpreter.
- Describe what I/O is.
- Use the `fs` module to manage the file system.

## What's Node.js?

A **runtime system** is the environment that enables a program to be executed. When JavaScript was released in 1995, its only runtime system was inside a web browser. That all changed in 2009 when Ryan Dahl created **Node.js**, a runtime system for executing JavaScript programs outside a web browser. By using Node.js, developers can write JavaScript programs that run directly on an operating system like Linux, Mac OS X, and Windows.

When a JavaScript program runs inside a web browser, it's only concerned with browser related tasks. As you've seen, JavaScript programs written for the browser have access to the following functions.

- `document.querySelector()`
- `document.createElement()`
- `element.addEventListener()`
- `element.appendChild()`
- `element.removeChild()`

However, when a JavaScript program runs outside a web browser with Node.js, it's not concerned with browser related tasks at all and has no access to the above functions. JavaScript programs written for Node.js are only concerned with operating system tasks and, instead, have access to the following functions.

- `fs.readFile()`
- `fs.writeFile()`
- `path.join()`
- `http.createServer()`
- `server.listen()`

In Node.js, most built-in functions are organized into modules. A **module** is a collection of functions that can be imported into a file using the `require()` function. For example, the `fs` module is one of the most popular modules because it allows JavaScript programs the ability to access and modify the filesystem.

Create a `readPaths.js` file somewhere and type in the following code.

**NOTE:** There's no need to wrap the code in an IIFE as each file has its own scope when executed by Node.js.

```javascript
'use strict';

var fs = require('fs');

fs.readFile('/etc/paths', function(err, data) {
  if (err) {
    throw err;
  }

  console.log(data);
});
```

Then, run the file with the Node.js runtime system.

```shell
node readPaths.js
```

The program only needs to require one module—the `fs` module—to import the filesystem functionality. And because the `readPaths.js` file is executed in its own scope, this functionality lives inside the local `fs` variable and doesn't pollute the global scope.

### Exercise

In your own words, think about what Node.js means to you and write it down.

## Why is Node.js so important?

Node.js is commonly used to build HTTP servers. An **HTTP server** is a program that runs in an infinite loop, accepting HTTP requests from a client and sending HTTP responses back to it. Inside those responses, HTTP servers often include data like HTML, CSS, JavaScript, and JSON amongst other formats. Throughout the second quarter of this program, you'll be building custom HTTP servers in Node.js that'll accept HTTP requests and send back HTTP responses with JSON data.

Because of this capability, Node.js is similar to other runtime systems that execute HTTP servers written in languages like Go, Haskel, Java, Lisp, Perl, PHP, Python, and Ruby just to name a few. One of the advantages Node.js has over these other runtimes is that it allows front-end web developers to leverage their fluency in JavaScript to build back-end web applications.

This is a big reason why smart companies of all sizes are interested in hiring JavaScript developers. Because of the hiring gap, companies are incentivized to keep developers engaged with the company for as long as possible. If a JavaScript developer gets bored and starts looking for new challenges, Node.js allows him or her to switch roles at the company and focus on the opposite side of the HTTP divide.

Usage of Node.js varies from company to company and it's unlikely that any company operates solely on Node.js. Just like everything, Node.js has its [advantages](http://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js) and [disadvantages](http://www.quora.com/What-are-the-disadvantages-of-using-Node-js) which you can read about on your own.

### Exercise

Think back to your Q1 project. If you were designing your own custom JSON API for it, what would the response look like? Take a few moments to write it down.

## How do you upgrade Node.js?

Before you start building your own HTTP server with Node.js, let's ensure you're laptop is using the latest version of Node.js.

```shell
brew update
brew outdated
brew upgrade node
brew cleanup
```

You can check the version of Node.js by running the following command.

```shell
node -v
```

## How do you run JavaScript code using the Node.js REPL?

Now that your laptop has the latest version of Node.js, let's learn about the various ways it can execute JavaScript code. Conveniently, Node.js comes with a built-in **REPL** which is short for read, evaluate, print, and loop. The Node.js REPL gives you a prompt where you can type JavaScript code. In order to execute it in the Node.js runtime, just press the `Enter` key and the results will be immediately displayed in the Terminal.

You can try it out by launching your Terminal app and running the `node` command without any arguments.

```shell
node
```

You should see a greater than `>` symbol appear. This is the prompt symbol for the Node.js REPL.

![](https://i.imgur.com/LLdtQUl.png)

Type in `1 + 2`, press the `Enter` key, and verify Node.js can do basic arithmetic.

![](https://i.imgur.com/2unMiSC.png)

To leave this the Node.js REPL, run the `.exit` command.

```shell
.exit
```

The Node.JS REPL is a handy way to play around with JavaScript before you commit your ideas to a file. It's similar to the browser console only you don't have access to any browser concepts like a `window` object, a `document` object, or any other browser APIs.

### Exercise

How can you tell when your Terminal is running the Node.js REPL? How can you tell when it's running your default shell?

### How do you run JavaScript code using the Node.js interpreter?

Additionally, the Node.js interpreter can run JavaScript code that lives in a file. An **interpreter** is a program that translates source code that lives in a file into executable code and then immediately runs it. Most of the time, you'll be interacting with the Node.js runtime using its interpreter.

First, create a new `addition.js` file.

```shell
touch ~/Desktop/addition.js
```

Open the file in your text editor

```shell
atom ~/Desktop/addition.js
```

And write the following code.

```javascript
console.log(1 + 2);
```

Now save the file and run it with the Node.js interpreter using the same `node` command. By specifying a file path, the `node` command will start the interpreter.

```shell
node ~/Desktop/addition.js
```

When you're ready, you can delete this file with the `rm` command.

```shell
rm ~/Desktop/addition.js
```

### Exercise

What happens if you try to execute the expression `1 + 2` without the `console.log()` function using the Node.js interpreter?

## What's I/O?

Input/Output (**I/O**) is the communication between a program and the outside world, possibly with a human or another program. Inputs are the data received by the program and outputs are the data sent from it. When performing I/O, the program is receiving and/or sending data to and from an I/O device.

When a program communicates with a human, some possible input devices include:

- Keyboards
- Mice
- Trackpads
- Gamepads
- Touch screens
- Microphones

And some possible output devices include things like:

- Screens
- Speakers
- Printers
- Haptic motors

I/O devices can also include things like:

- Files
- Signals
- Pipes
- Sockets

The biggest difference between Node.js and these languages is that most functions in these languages block until completion. In other words, expressions execute only after previous expression has completed. However, functions in Node.js are designed to be non-blocking. In other words, commands execute in parallel and use callbacks to signal completion or failure.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/54/stack.png)

Although computers are able to rapidly execute instructions sent to the CPU, it is much slower to get information that is located somewhere like a hard disk or another computer. In particular with Node.js, the areas of interest are file and network I/O. File I/O will involve interacting with files on the computer's file system. Because Node.js is able to do these things asynchronously, it does not have to stop and wait for I/O to happen. Take a look at this [latency table]['latency'] to understand what kind of time it takes to do common I/O tasks that we currently take for granted.

### Exercise

Can you think of any other input or output devices that you use on a daily basis?

## How do you manage the file system with Node.js?

Now that you've played around with the two ways to execute JavaScript code in Node.js, let's play around with the [file system module]['fs'] (`fs`). The `fs` module is a built-in Node.js API for reading and writing information to and from files. Start by setting up a new project.

```shell
mkdir party
cd party
echo '[]' >> guests.json
touch guests.js
atom .
```

Add the following code to the `guests.js` file.

```javascript
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

```javascript
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

```javascript
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

### Assignment

[Pet Shop: Node Filesystem](https://github.com/gSchool/fs-pet-shop)

### Resources

- [Introduction to Node.js (video)](https://www.youtube.com/watch?v=pU9Q6oiQNd0)
- [V8 (JavaScript Engine)](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)
- [Event Driven Programming](http://en.wikipedia.org/wiki/Event-driven_programming)  


['companies']: https://github.com/joyent/node/wiki/projects,-applications,-and-companies-using-node
['fs']: https://nodejs.org/api/fs.html
['latency']: http://www.eecs.berkeley.edu/~rcs/research/interactive_latency.html
