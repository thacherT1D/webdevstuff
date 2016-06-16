## Objectives

- Explain what a Node.js module is.
- Split existing code into two modules.
- Export and require a function.
- Export and require an object.
- Explain what the three kinds of modules are.
- Explain what the Express router is.

## What's a Node.js module?

As far as the Node.js is concerned, you could write all of your JavaScript code in one file. But to humans, it's really hard to manage thousands of lines of code in a single file. For example, imagine you wanted to reuse a piece of code in another project, but it was buried on line 25,436 of some file. Your only recourse would be to copy that code and paste it into the other project's file. Modules are an elegant solution to this problem.

In Node.js, a **module** is just a file that contains JavaScript code. And the module system in Node.js allows you to take pieces of code, split them out into separate files, and easily reuse them in different places. For example, imagine you have a `main.js` module and an `arithmetic.js` module. In this example, the `main.js` module will require some functionality from the `arithmetic.js` module.

```javascript
'use strict';

var add = require('./arithmetic');
var result = add(1, 2);

console.log(result);
```

And the `arithmetic.js` module will export some functionality back to the `main.js` module.

**NOTE:** In Node.js, `module` is a global variable with a `exports` property that references an empty object by default.

```javascript
'use strict';

module.exports = function(a, b) {
	return a + b;
};
```

The function that's exported effectively replaces the `require()` function. Another way to think of this is that the `add` variable is assigned the value of the `module.exports` object.

### Exercise

Turn to a partner and, in your own words, explain what a Node.js module is. Explain to each other how the `module.exports` object works and how the `require()` function works.

## How do you split existing code into two modules?

Here are the steps to split existing code into two modules.

1. Identify which piece of code to export.
1. Create a new module.
1. Move that code to the new module.
1. Assign that code to the `module.exports` object.
1. Require the new module in the original module using the `require()` function.

Modules can export any value such as a function, an object, a string, a number, a boolean—anything.

### Export a function

To export a function, you simply assign the function to the `module.exports` object. This is exactly what you did in the first example.

Because the `require()` function just returns a value, and the `arithmetic.js` module exports a function, you could immediately invoke that function in the `main.js` module like this.

**NOTE:** Sometimes this is handy and sometimes this makes the code hard to read.

```javascript
'use strict';

var result = require('./arithmetic')(1, 2);

console.log(result);
```

### Export an object

To export an object, you simply assign the object to the `module.exports` object. Here's an updated `arithmetic.js` module that exports an object that contains an `add()` method.

```javascript
'use strict';

module.exports = {
	add: function(a, b) {
		return a + b;
	}
};
```

When requiring the module, you assign the required object to a variable and then access its properties. Here's an updated `main.js` module that requires the above `arithmetic.js` module.

```javascript
'use strict';

var arithmetic = require('./arithmetic');
var result = arithmetic.add(1, 2);

console.log(result);
```

Here, the `arithmetic` variable references the entire object that's being exported. And so the `add()` method references the function that's part of the object being exported.

When you're exporting objects, there are three ways you can go about it. The first way is to assign a new object to the `module.exports` property.

```javascript
'use strict';

// version 1
module.exports = {
	add: function(a, b) {
		return a + b;
	}
};
```

Because `module.exports` is an object by default, the second way is to assign a value directly to one of its properties.

```javascript
'use strict';

// version 2
module.exports.add = function(a, b) {
	return a + b;
};
```

And because `exports` as a shorthand for `module.exports`, the third way is to assign a value directly to one of its properties.

**NOTE:** In Node.js, `export` is a global variable that references the `module.export` object by default.

```javascript
'use strict';

// version 3
exports.add = function(a, b) {
	return a + b;
};
```

Each of the above versions of `arithmetic.js` are equivalent.

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

These are modules that you've created on your own, such as the `arithmetic.js` module. When creating a file module, you add values to the `module.exports` object. When you using a file module, you require it into another module by its path to the file module, minus the `.js` extension. These require strings must start with `/`, `./`, or `../` to indicate where on the filesystem Node.js can find that file.

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

## What's the Express router?

## How do you use the Express router?

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, '../guests.json');

var express = require('express');
var router = express.Router();

router.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

router.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, newGuestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(newGuestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

router.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

router.put('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests[id] = guest;

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

router.delete('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(readErr.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    var guest = guests.splice(id, 1)[0];
    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

module.exports = router;
```

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

var guests = require('./routes/guests');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.use(guests);

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

## Resources

### Node.js Modules Part 1

<iframe src="https://player.vimeo.com/video/142099942?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Node.js Modules Part 2

<iframe src="https://player.vimeo.com/video/142102383?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
