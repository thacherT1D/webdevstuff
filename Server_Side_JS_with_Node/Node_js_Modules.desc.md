## Objectives

- Explain what Node.js modules are.
- Describe how the `module.exports` object works.
- Describe how the `require()` function works.
- Export and require a function.
- Export and require an object.

## What are Node.js modules?

As far as the Node.js is concerned, you could write all of your JavaScript code in one file. But to humans, it's a totally different story. Imagine that you wanted to reuse a piece of code in another project, but it was buried on line 25,436 of some file. Your only recourse would be to copy that code and paste it to another file. Modules are an elegant solution to this problem.

In Node.js, a **module** is a file. Modules allow you to take pieces of code, split them out into different files, and easily package and reuse them. For example, imagine you have a `printer.js` module and a `calculator.js` module. In this example, the `printer.js` module will require some functionality from the `calculator.js` module.

```javascript
'use strict';

var add = require('./calculator');
var result = add(1, 2);

console.log(result);
```

And the `calculator.js` module will export the functionality back to the `printer.js` module.

```javascript
'use strict';

module.exports = function(a, b) {
	return a + b;
};
```

The function that's exported effectively replaces the `require` expression. Another way to thinks of this would be, the `add` variable is assigned the value of the `module.exports` object.

## How do you extract a module from existing code?

If you wanted to extract a module from existing code, here are the steps.

1. Identify which piece of code to export.
1. Create a new module.
1. Move that code to the new module.
1. Assign that code to the `module.exports` object.
1. Require the new module using the `require()` function.

Modules can export any value, such as a function, a object, a string, a number, a boolean—anything.

### Exporting a function

To export a function, you simply assign the function to the `module.exports` object. This is exactly what you did in the previous example.

Because the `require()` function that just returns a value, and the `calculator.js` module exports a function, you can immediately invoke that function in the `printer.js` module like this.

```javascript
'use strict';

var result = require('./calculator')(1, 2);

console.log(result);
```

### Exporting an object

Exporting an object is very similar. You simply assign the object to the `module.exports` object. Here's an updated `calculator.js` module that exports an object.

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

Because `module.exports` is an object by default, you can assign a value directly to an object property.

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

These are the built-in modules in Node.js like `fs`, `http`, and `path`. You require these modules by their name only.

```javascript
var fs = require('fs');
var http = require('http');
var path = require('path');
```

### File modules

These are modules that you've created on your own, such as the `calculator.js` module. When creating a file module, you add values to the `module.exports` object. When you using a file module, you require it into another module by its path to the file module, minus the `.js` extension. These require strings must start with `/`, `./`, or `../` to indicate where on the filesystem Node.js can find that file.

```javascript
var myModule1 = require('/myModule1');   // absolute directory on the computer
var myModule2 = require('./myModule2');  // same directory of the current module
var myModule3 = require('../myModule3'); // parent directory of the current module
```

### NPM modules

These are modules from NPM that are installed via the `npm install` command. To see where NPM modules are installed, run the following commands.

```shell
npm -g root
npm root
```

NPM modules are required into a module without an explicit path, much like the core modules.

```javascript
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
```

Remember, the above require statements won't work until after you've installed these NPM modules with `npm install`.

## Assignment

- [Module Caching Example](https://github.com/gSchool/module-caching-example)

## Resources

### Node.js Modules Part 1

<iframe src="https://player.vimeo.com/video/142099942?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Node.js Modules Part 2

<iframe src="https://player.vimeo.com/video/142102383?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
