## Objectives

- Explain what Node.js modules are.
- Describe how the `module.exports` property works.
- Describe how the `require()` function works.
- Export and require a function.
- Export and require an object.

## What are Node.js modules?

<iframe src="https://player.vimeo.com/video/142099942?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

As far as the Node.js is concerned, you could write all of your JavaScript code in one file. But to humans, it's a totally different story. Imagine that you wanted to reuse a piece of code, but it was buried on line 25,436 of some file. Your only recourse would be to copy that code to some file. But modules solve this problem.

In Node.js, a **module** is a file. Modules allow you to take pieces of code, split them out into different files, and easily package them and reuse them. At it's core, the Node.js module system requires more than one file. For example, imagine you have a `printer.js` module and a `calculator.js` module. In this example, the `printer.js` module will require some functionality from the `calculator.js` module.

```javascript
'use strict';

var calculate = require('./calculator');
var result = calculate(1, 2);

console.log(result);
```

And the `calculator.js` module will export the functionality back to the `printer.js` module.

```javascript
'use strict';

module.exports = function(a, b) {
	return a + b;
};
```

The function that's exported effectively replaces the `require` expression. Another way to thinks of this would be, the `calculate` variable is assigned the value of the `module.exports` property.

## How do you extract a module from existing code?

If you wanted to extract a module from existing code, here are the steps.

1. Identify which piece of code to export.
1. Create a new module.
1. Move that code to the new module.
1. Assign that code to the `module.exports` property.
1. Require the new module using the `require()` function.

Modules can export any value, such as a function, a object, a string, a number, a boolean—anything.

### Exporting a function

To export a function, you simply assign the function to the `module.exports` property. This is exactly what you did in the previous example.

Because the `require()` function that just returns a value, and the `calculator.js` module exports a function, you can immediately invoke that function in the `printer.js` module like this.

```javascript
'use strict';

var result = require('./calculator')(1, 2);

console.log(result);
```

### Exporting an object

Exporting an object is very similar. You simply assign the object to the `module.exports` property. Here's an updated `calculator.js` module that exports an object.

```javascript
'use strict';

module.exports = {
	add: function(a, b) {
		return a + b;
	}
};
```

When requiring the module, you assign the required object to a variable and then access its properties. Here's an updated `printer.js` module that requires the above `calculator.js` module.

```javascript
'use strict';

var calculator = require('./calculator');
var result = calculator.add(1, 2);

console.log(result);
```

Here, the `calculator` variable references the entire object that's being exported. And so the `add()` method, references the function that's part of the object being exported.

When you're exporting objects, there are three ways you can go about it. Each of the following versions of `calculator.js` are equivalent.

```javascript
'use strict';

// version 1
module.exports = {
	add: function(a, b) {
		return a + b;
	}
};
```

Because `module.exports` is an object by default, you can assign a value directly to a property.

```javascript
'use strict';

// version 2
module.exports.add = function(a, b) {
	return a + b;
};
```

And because `exports` as a shorthand for `module.exports`, you can use the following syntax.

```javascript
'use strict';

// version 3
exports.add = function(a, b) {
	return a + b;
};
```

## What are the three kinds of modules?

There are three kinds of modules in the Node.js.

### Core modules

* These are always built in to node.js. Anytime you run your code with the terminal command `$ node myCode.js` then you can require these modules by their name only
* Abstract syntax: `var whatever = require('moduleName');`
* Example modules: `'fs'`, `'http'`
* Example syntax: `var http = require('http');`

### File modules

*  These are built by you, in our example `calculator.js` is one such module.
*  You must add the functions and data you want to the `module.exports` object in the file for the module to be properly exported (see the 3 versions of export syntax above).
*  When you import file modules, you use the path to the file (without the .js filetype) instead of the module name.
*  These require strings must start with one of `./`, `/`, or `../`:
	*  `var myModule = require('./filename');` for same directory as the file requireing the module.
	*  `var myModule = require('/filename');` for an absolute path (meaning relative to your computer's root directory)
	*  `var myModule = require('../filename');` for relative to the parent folder of the file requiring the module

### NPM modules

* Any module installed using `$ npm install moduleName` is saved in a folder called `node_modules`
* Such modules can be required much like the Core Modules, without the filepath being made explicit.
* Example Syntax: `var express = require('express');`
* The above require statement won't work until after you've run `$ npm install express` in the directory of the file that requires express.

## What's the memory model of modules?

Dig deep into the memory model of modules.

<iframe src="https://player.vimeo.com/video/142102383?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

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
var module = {};
module.exports = {};
var exports = module.exports;
```

Remember, objects are reference types, so the local variable exports is a pointer to the object in memory. The object was created one line above, so now module.exports and exports are the same variable. Now, say we want to change the value of module.exports, that code might look like:

```
var module = {};
module.exports = {};
var exports = module.exports;

module.exports = 42; // Module is a reference type, so this changes the object in memory that module points to
```

Alternately we might do:

```
var module = {};
module.exports = {};
var exports = module.exports;

exports = 42;
```

This time, we're changing the value of the local variable directly, instead of changing object in memory __that module points to__. This time module.exports is still an empty object, and the local variable exports is the value 42.

### Issues with Memory / Module Caching

In programming, caching rougly means 'saving a computed value for future use'. In node.js, the first time a module is required during any given run of a script, that module is cached. For example, lets say we have two files that both require the same node module called `someFile.js`:

someFile.js:

```
module.exports.ms = 500;
```

myFile.js:

```
var result = require('./someFile');

// result now points to an object in memory with a single property ms which is 500 (for now)
console.log(result.ms); // logs 500

require('./alternate-file');

// Now, even though we did not use result = require('./alternate-file'); the value of result.ms
// has been changed, due to node.js and module caching.

console.log(result.ms);
```

alternate-file.js:

```
var resultTwo = require('./someFile');

// resultTwo points to the same object that result (in myFile.js) points to.

resultTwo.ms = "foo" // Now, even for results in myFile.js, the value of ms is "foo"
```

## Assignment

- [Module Caching Example](https://github.com/gSchool/module-caching-example)
