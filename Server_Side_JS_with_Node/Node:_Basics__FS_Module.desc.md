### Objectives

By the end of this lesson you should be able to:

- Upgrade Node.js to the latest version.
- Describe what Node.js is and why it's important.
- Run JavaScript code using the Node.js REPL.
- Run JavaScript code using the Node.js interpreter.
- Use the `fs` module to manage the file system.

### How do I upgrade Node.js?

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

### What is Node.js and why is it so important?

Node.js is a runtime system for executing JavaScript programs outside of a web browser. When a JavaScript program is run this way, it abandons all browser concepts such as managing a DOM tree with the `document` object. Instead, a JavaScript program that's run using Node.js is only concerned with server concepts like managing a computer's file system with the `fs` object or listening for HTTP requests with the `http` object.

Some of the [largest companies]['companies'] on the planet use Node.js for part of their technology stack. Their usage of Node.js varies from company to company and it's unlikely that any of one of them operates entirely in Node.js. Like everything else, Node.js has its [advantages](http://www.toptal.com/nodejs/why-the-hell-would-i-use-node-js) and [disadvantages](http://www.quora.com/What-are-the-disadvantages-of-using-Node-js).

Node.js is important because it's a server-side JavaScript **runtime system**. A runtime system is the environment for an executing program. JavaScript is an interpreted language which means that it's compiled to machine code as its executed. Languages like C, C++, Java, and many others are first put through a **compiler** that first turns their code into machine code and then sends those instructions to the CPU. An interpreted language, however, is compiled Just In Time (JIT) when the program is about to be run.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/54/stack.png)

### How do I run JavaScript code using the Node.js REPL?

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

```js
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

Although computers are able to rapidly execute instructions sent to the CPU, it is much slower to get information that is located somewhere like a hard disk or another computer. In particular with Node.js, the areas of interest are file and network I/O. File I/O will involve interacting with files on the computer's file system. Because Node.js is able to do these things asyncronously, it does not have to stop and wait for I/O to happen. Take a look at this [latency table]['latency'] to understand what kind of time it takes to do common I/O tasks that we currently take for granted.

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

### Assignment

[Pet Shop: Node Filesystem](https://github.com/gSchool/fs-pet-shop)

### Resources

- [Introduction to Node.js (video)](https://www.youtube.com/watch?v=pU9Q6oiQNd0)
- [V8 (JavaScript Engine)](https://en.wikipedia.org/wiki/V8_(JavaScript_engine)
- [Event Driven Programming](http://en.wikipedia.org/wiki/Event-driven_programming)  


['companies']: https://github.com/joyent/node/wiki/projects,-applications,-and-companies-using-node
['fs']: https://nodejs.org/api/fs.html
['latency']: http://www.eecs.berkeley.edu/~rcs/research/interactive_latency.html
