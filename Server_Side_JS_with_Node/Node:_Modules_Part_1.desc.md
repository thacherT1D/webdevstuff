# Understanding Node Modules, Part 1

### Node Modules

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
var calculator = require('./calculator'); // imports the module.exports object from calculator.js

// After the above line has executed, calculator is a reference to the module.exports object, which we created in calculator.js

result = calculator.add(1, 2); // uses the function we added to exports in calculator.js
```

### Alternate Export Syntax

Because `module.exports` is just an object, we can use any object property assignment syntax to attach values to `module.exports`. Each of these versions of calculator.js are equivalent:

Version 1:

Exporting
```
module.exports = {
	add: function(a, b) {
		return a + b;
	}
}
```

Requiring
```
var operation = require('./add')
var total = operation.add(1,3);
```


Version 2:

```
module.exports.add = function(a, b) {
	return a + b;
}
```

Requiring
```
var operation = require('./add')
var total = operation.add(1,3);
```

Version 3:

```
module.exports = function(a, b) {
	return a + b;
}
```

Requiring
```
var operation = require('./add')
var total = operation(1,3);
```

### Kinds of Modules

There are 3 kinds of modules in the node.js ecosystem:

1. Core Modules
	* These are always built in to node.js. Anytime you run your code with the terminal command `$ node myCode.js` then you can require these modules by their name only
	* Abstract syntax: `var whatever = require('moduleName');`
	* Example modules: `'fs'`, `'http'`
	* Example syntax: `var http = require('http');`
  * [Documentation of Core Modules](https://nodejs.org/docs/latest-v5.x/api/)
2. File Modules
	*  These are built by you, in our example `calculator.js` is one such module.
	*  You must add the functions and data you want to the `module.exports` object in the file for the module to be properly exported (see the 3 versions of export syntax above).
	*  When you import file modules, you use the path to the file (without the .js filetype) instead of the module name.
	*  These require strings must start with one of `./`, `/`, or `../`:
		*  `var myModule = require('./filename');` for same directory as the file requiring the module.
		*  `var myModule = require('/filename');` for an absolute path (meaning relative to your computer's root directory)
		*  `var myModule = require('../filename');` for relative to the parent folder of the file requiring the module
3. Modules from node_modules
	* Any module installed using `$ npm install moduleName` is saved in a folder called `node_modules`
	* Such modules can be required much like the Core Modules, without the file path being made explicit.
	* Example Syntax: `var express = require('express');`
	* The above require statement won't work until after you've run `$ npm install express` in the directory of the file that requires express.


<iframe src="https://player.vimeo.com/video/142099942?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


### Exercise: Cleaning up Candy Crush

Move the store objects into their own separate file, and use the `module.exports` pattern to export the objects.

On the file where all your code now resides, use the `require()` pattern to import the store objects. Make sure that your code works as expected.
