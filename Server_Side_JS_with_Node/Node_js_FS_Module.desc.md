## Objectives

- Describe what Node.js is
- Explain why Node.js is important.
- Upgrade Node.js to the latest version.
- Run JavaScript code using the Node.js REPL.
- Run JavaScript code using the Node.js interpreter.
- Use the `fs` module to manage the file system.

## What's Node.js?

A **runtime system** is the environment for an executing program. When JavaScript was released in 1995, its only runtime system was the web browser. That all changed in 2009, when Ryan Dahl created **Node.js**, a runtime system for executing JavaScript programs outside a web browser. By using Node.js, developers can write JavaScript programs that run directly on an operating system like Linux, Mac OS X, and Windows.

When a JavaScript program runs using Node.js, it abandons all browser concerns like the following.

- `document.querySelector()`
- `document.createElement()`
- `element.addEventListener()`
- `element.appendChild()`
- `element.removeChild()`

Instead, Node.js programs are only concerned with operating system tasks using functions like the following.

- `fs.readFile()`
- `fs.writeFile()`
- `path.join()`
- `http.createServer()`
- `server.listen()`

Some of the [largest companies]['companies'] on the planet use Node.js as part of their technology stack. Their usage of Node.js varies from company to company and it's unlikely that any of one of them operates entirely in Node.js. Just like everything, Node.js has its [advantages](http://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js) and [disadvantages](http://www.quora.com/What-are-the-disadvantages-of-using-Node-js).

### Exercise

In your own words, think about what Node.js means to you and write it down.

## Why is Node.js so important?

Node.js is commonly used to build HTTP servers. An **HTTP server** is a program that runs in an infinite loop, accepting HTTP requests from a client and sending HTTP responses back to it. Inside those responses, Node.js HTTP servers often include HTML, CSS, JavaScript, JSON, and other data formats.

**EXERCISE:** Think back to your Q1 project. If you could've designed your own custom web API, what would've the JSON response looked like? Take a moment to write it down.

Because of this capability, Node.js is similar to other runtime systems that execute Go, Java, PHP, Python, or Ruby programs. One of the advantages Node.js has over these other runtimes is that it allows front-end web developers to leverage their fluency in JavaScript to build back-end web applications. This is also a big reason why smart companies are interested in hiring JavaScript developers. If an developer gets bored and starts looking for new challenges, they can switch their role and focus on the opposite side of the HTTP divide.

## How do you upgrade Node.js?

Before getting started, take a moment to ensure you're laptop is using the latest version of Node.js.

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

One powerful feature of Node.js is the **REPL** which is short for read, evaluate, print, and loop. In the Node.js REPL, JavaScript code you enter will be executed in the Node.js runtime and then any results will be displayed in the Terminal.

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

### How do I run JavaScript code using the Node.js intepreter?

Now, create a new `hello.js` file.

```shell
touch ~/Desktop/hello.js
```

Open the file in your text editor

```shell
atom ~/Desktop/hello.js
```

And write the following code.

```javascript
console.log('Hello world');
```

Now save the file and run it with the `node` command.

```shell
node ~/Desktop/hello.js
```

This is how we execute files with the `node` runtime. You can delete this file with the `rm` command.

```shell
rm ~/Desktop/hello.js
```

### How do I manage the file system with Node.js?

The purpose of this lesson is to create exposure to the [file system module]['fs'] (`fs`). The `fs` module is a built-in API for reading and writing information to and from files. This is often called File Input/Output or **File I/O** for short.

The biggest difference between Node.js and these languages is that most functions in these languages block until completion. In other words, expressions execute only after previous expression has completed. However, functions in Node.js are designed to be non-blocking. In other words, commands execute in parallel and use callbacks to signal completion or failure.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/54/stack.png)

Although computers are able to rapidly execute instructions sent to the CPU, it is much slower to get information that is located somewhere like a hard disk or another computer. In particular with Node.js, the areas of interest are file and network I/O. File I/O will involve interacting with files on the computer's file system. Because Node.js is able to do these things asynchronously, it does not have to stop and wait for I/O to happen. Take a look at this [latency table]['latency'] to understand what kind of time it takes to do common I/O tasks that we currently take for granted.

#### Challenge

Can you think of any examples of file I/O operations that developers perform on a regular basis?

#### Exercise

Start by setting up a new project.

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
