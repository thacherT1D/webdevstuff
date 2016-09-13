## Understand Node Modules

**Part 1**

<iframe src="https://player.vimeo.com/video/142099942?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

**Part 2**

Dig deep into the memory model of modules.

<iframe src="https://player.vimeo.com/video/142102383?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

# Textual Recap and Reference

## What You Learned in Part 1

### Modules

In the node.js ecosystem, we use 'modules' to organize pieces of code into files, and then reuse those pieces of code without copying and pasting the code.

As your applications grow in complexity, this ability to 'require' a module becomes necessary. Without modules 100% of the code we wrote would have to live in one file. Imagine digging through literally thousands of lines of code to find the function you need to use.

### How it Works

There are two key concepts from the video: `module.exports`, and `require()`. These two new concepts are specific to node and work in harmony with each other to allow the sharing and reuse of modules. Imagine you have two files in the same directory - calculator.js and printer.js - and they have code as follows:

calculator.js:

```
module.exports = {
	add: function(a, b) {
		return a + b;
	}
}
```

printer.js:

```
const calculator = require('./calculator'); // imports the module.exports object from calculator.js

// After the above line has executed, calculator is a reference to the module.exports object, which we created in calculator.js

result = calculator.add(1, 2); // uses the function we added to exports in calculator.js
```

### Alternate Export Syntax

Because `module.exports` is just an object, we can use any object property assignment syntax to attach values to `module.exports`. Each of these versions of calculator.js are equivalent:

Version 1:

```
module.exports = {
	add: function(a, b) {
		return a + b;
	}
}
```

Version 2:

```
module.exports.add = function(a, b) {
	return a + b;
}
```

Version 3 (possible because node uses the variable `exports` as a short-hand for `module.exports`):

```
exports.add = function(a, b) {
	return a + b;
}
```

### Kinds of Modules

There are 3 kinds of modules in the node.js ecosystem:

1. Core Modules
	* These are always built in to node.js. Anytime you run your code with the terminal command `$ node myCode.js` then you can require these modules by their name only
	* Abstract syntax: `const whatever = require('moduleName');`
	* Example modules: `'fs'`, `'http'`
	* Example syntax: `const http = require('http');`
2. File Modules
	*  These are built by you, in our example `calculator.js` is one such module.
	*  You must add the functions and data you want to the `module.exports` object in the file for the module to be properly exported (see the 3 versions of export syntax above).
	*  When you import file modules, you use the path to the file (without the .js filetype) instead of the module name.
	*  These require strings must start with one of `./`, `/`, or `../`:
		*  `const myModule = require('./filename');` for same directory as the file requireing the module.
		*  `const myModule = require('/filename');` for an absolute path (meaning relative to your computer's root directory)
		*  `const myModule = require('../filename');` for relative to the parent folder of the file requiring the module
3. Modules from node_modules
	* Any module installed using `$ npm install moduleName` is saved in a folder called `node_modules`
	* Such modules can be required much like the Core Modules, without the filepath being made explicit.
	* Example Syntax: `const express = require('express');`
	* The above require statement won't work until after you've run `$ npm install express` in the directory of the file that requires express.

## What You Learned in Part 2

### Issues with memory / exports Shorthand

Even though we learned that `exports` is a short hand for `module.exports` in the last video, we learned in this video that `exports = 42;` will not work, but `module.exports = 42` will work.  This is because the __value__ of the __exports property__ of the __module object__ is wha's __returned__ from require.

Consider these two versions of a very short file, printer.js:

```
module.exports = 42;
```

vs

```
exports = 42;
```

Because of the way node.js works, the local variable `exports` begins as a reference to an object on the variable `module`. This snippet of code would create such a situation:

```
const module = {};
module.exports = {};
const exports = module.exports;
```

Remember, objects are reference types, so the local variable exports is a pointer to the object in memory. The object was created one line above, so now module.exports and exports are the same variable. Now, say we want to change the value of module.exports, that code might look like:

```
const module = {};
module.exports = {};
const exports = module.exports;

module.exports = 42; // Module is a reference type, so this changes the object in memory that module points to
```

Alternately we might do:

```
const module = {};
module.exports = {};
const exports = module.exports;

exports = 42;
```

This time, we're changing the value of the local variable directly, instead of changing object in memory __that module points to__. This time module.exports is still an empty object, and the local variable exports is the value 42.

### Issues with Memory / Module Caching

In programming caching means rougly 'saving a computed value for future use'. In node.js the first time a module is required during any given run of a script, that module is cached. For example, lets say we have two files that both require the same node module called `someFile.js`.

someFile.js:

```
module.exports.ms = 500;
```

myFile.js:

```
const result = require('./someFile');

// result now points to an object in memory with a single property ms which is 500 (for now)
console.log(result.ms); // logs 500

require('./alternate-file');

// Now, even though we did not use result = require('./alternate-file'); the value of result.ms
// has been changed, due to node.js and module caching.

console.log(result.ms);
```

alternate-file.js:

```
const resultTwo = require('./someFile');

// resultTwo points to the same object that result (in myFile.js) points to.

resultTwo.ms = "foo" // Now, even for results in myFile.js, the value of ms is "foo"
```

Give it a try -- [https://github.com/gSchool/module-caching-example](https://github.com/gSchool/module-caching-example)
