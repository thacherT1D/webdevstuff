## Objectives

- Explain what Express is.
- Explain why Express is useful.
- Create an HTTP server with the `express` module.
- Explain what Express middleware is.
- Explain why Express middleware is useful.
- Use Express middleware to log the request/response cycle.
- Use Express middleware to parse a request body.

## What's Express?

When you're looking to build a small Node.js HTTP server with only a few routes handlers, nothing is simpler or faster than the `http` module. But as you've seen, it takes quite a bit of code to build even a modest server. When you're looking to build a large server with many route handlers, then it's a good idea to reach for a tool like Express.

**Express** is a framework, built in top of the `http` module, that provides a minimal, flexible, and performant set of features that are fundamental to server-side web application development. A **server-side web application** is the class of programs that run on the backend, routing incoming HTTP requests to route handlers, and sending back HTTP responses that usually contain dynamic content from a database.

When you think of a database-driven, server-side application, think of products like GitHub. When an user logs into GitHub, he or she will see their own personal timeline on the [landing page](https://github.com/). Or when a user visits a repository, he or she will either see the [repository](https://github.com/expressjs/express) if they have permission or a 404 page if they don't. In order to accomplish this, a product like GitHub uses a server-side web application to handle each incoming request and respond with dynamic content depending on who made the request. In fact, GitHub uses a fleet of server-side web applications, all running simultaneously, to handle the volume of traffic that it receives every day.

In this course, you'll learn how to develop large database-driven, server-side web applications like GitHub. But first, let's learn how Express works. To get started, create a new `hello_express` project.

```shell
mkdir hello_express
cd hello_express
```

Then, create a `server.js` file.

```shell
touch server.js
```

Next, use NPM to initialize a `package.json` file.

```shell
npm init
```

Then, use NPM to install the `express` module locally and save it as dependency in the `package.json` file.

```shell
npm install --save express
```

Next, open the `server.js` file in your text editor.

```shell
atom server.js
```

And type in the following code.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.use(function(req, res) {
  res.send('Hello World');
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Save the `server.js` file and run it with the `nodemon` command.

```shell
nodemon server.js
```

In a separate Terminal tab, send an HTTP request to the server.

```shell
http GET localhost:8000/
```

And you should see something like this.

![](https://i.imgur.com/OuxwwyS.png)

### Exercise

Turn to a partner and share your thoughts about the similarities and differences you noticed about using the `express` module versus the `http` module. Afterwards, come up with a definitely of Express in your own words.

## Why is Express useful?

There are many server-side web application frameworks for Node.js that you can download with NPM. For example, Express, hapi, koa.js, Nodal, Sails.js, and Meteor just to name a few. With over 6 million downloads per month, Express is the one of the most popular frameworks because it's fast, unopinionated, and minimalist. Additionally, Express has [good documentation](http://expressjs.com/en/4x/api.html), has a large community of plugins, and is used by both large and small companies.

## How do you create an HTTP server with the `express` module?

Now that you've learned a little bit about Express and web applications, let's convert the guest list Node.js HTTP server you built with the `http` module into an Express HTTP server using the `express` module.

To get started, return to the `party` project from yesterday and create a new `express` feature branch.

```shell
cd party
git checkout -b express
```

Next, create a `serverExpress.js` file.

```shell
touch serverExpress.js
```

Then, use NPM to install the `express` module locally and save it as dependency in the `package.json` file.

```shell
npm install --save express
```

Then, open the `party` project in your text editor.

```shell
atom .
```

And type in the following code to the `serverExpress.js` file.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.use(function(req, res) {
  var guests = ['Mary', 'Don'];
  res.send(guests);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Save the `serverExpress.js` file and run it with the `nodemon` command.

```shell
nodemon serverExpress.js
```

And you should see something like this.

![](https://i.imgur.com/m7dVeU8.png)

In a separate Terminal tab, send the following HTTP request to the server.

```shell
http GET localhost:8000/
```

And you should see something like this.

![](https://i.imgur.com/Y6TeBbO.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Add an Express HTTP server'
```

Right now, your Express server handles every request the same way, regardless of the request's method or path. It would be much more useful if your server could send back different responses based on the information inside the requests.

Let's fix that by refactoring the `serverExpress.js` file with the following code.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/guests', function(req, res) {
  var guests = ['Mary', 'Don'];
  res.send(guests);
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Save the `serverExpress.js` file and send the following HTTP request to the server.

```shell
http GET localhost:8000/
```

And you should see something like this.

![](https://i.imgur.com/88z1b6W.png)

In a separate Terminal tab, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/1BHV6c7.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Refactor Express server to send different responses'
```

Right now, your Express server sends a hardcoded guest list in the response. It would be much more useful if your Express server could send guest list that's read from the JSON-formatted `guests.json` file.

Let's fix that by refactoring the `serverExpress.js` file with the following code.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Now, save the `serverExpress.js` file and add the following data to the `guests.json` file.

```shell
echo '["Mary", "Don"]' > guests.json
```

Send the following HTTP request to the server.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/IgYJzHW.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Send all guest records from the database'
```

Right now, your Express server can only send back all the records from the database. It would be much more useful if your Express server could send back individual records as well.

Let's fix that by refactoring the `serverExpress.js` file with the following code.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, data8000
    if (err) {
      throw err;
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(data);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(guests[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Now, save the `serverExpress.js` file and send the following HTTP request to the server.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/IgYJzHW.png)

Now, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests/0
```

And you should see something like this.

![](https://i.imgur.com/BAUNQqV.png)

Next, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests/1
```

And you should see something like this.

![](https://i.imgur.com/HY5rw6x.png)

Next, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests/3
```

And you should see something like this.

![](https://i.imgur.com/eGXNGd6.png)

Next, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests/-1
```

And you should see something like this.

![](https://i.imgur.com/sRxSQtW.png)

Finally, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests/abracadabra
```

And you should see something like this.

![](https://i.imgur.com/xHGcjJa.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Send individual guest records from the database'
```

To merge, the commits from the `express` branch to the `master` branch, run the following commands.

```shell
git checkout master
git merge express
```

With the commits merged in, it's safe to delete the `express` branch.

```shell
git br -d express
```

## What's Express middleware?

An Express application is essentially a series of middleware function calls. Express middleware is a callback function that has access to the request object (`req`), the response object (`res`), and sometimes the next middleware callback (`next`).

Middleware functions can execute any JavaScript operation inside the callback function.

- Read and modify the `req` and `res` objects.
- Read and write to a file or database.
- Send HTTP requests to other servers.

However, middleware _must_ either end the request/response cycle with a function like `res.send()` or call the next middleware callback with `next()`.

## Why is Express middleware useful?

Express middleware allows an application's code to be organized into in a series of middleware callbacks. These callbacks can be reused in a flexible way.

![middleware](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/66/middleware-1.png)

## How does Express middleware work?

First we'll build **application level** middleware by hand. Then, we'll replace our hand-made middleware with third party middleware installed from npm.

To get started, create a new `middleware` branch.

```shell
git checkout -b middleware
```

Next, type out the following code into the `serverExpress.js` file.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.use(function(req, res, next) {
  var start = new Date();
  next();
  var end = new Date();
  console.log(req.method, req.url, res.statusCode, end - start, 'ms');
});

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(data);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(guests[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

In a separate Terminal tab, send an HTTP request to your server.

```shell
http GET http://localhost:8000/guests
```

Look back into the tab running the Express server, you should see the following.

![](https://i.imgur.com/xHGcjJa.png)

This is the hand-made logging middleware you just built! Now let's replace it with `morgan`, a more powerful third-party middleware.

**NOTE:** Before you install `morgan`, make sure your shell's working directory is the `party` directory.

```shell
npm install --save morgan
```

Now refactor `serverExpresss.js` with the following code.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

var morgan = require('morgan');
app.use(morgan('short'));

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(data);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(guests[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Now send another HTTP request to your server.

```shell
http GET http://localhost:8000/guests
```

You should see the following server log.

![](https://i.imgur.com/m8cmiGI.png)

This is the `morgan` middleware in action!

We will now add another middleware to parse the body of an HTTP POST request. Refactor your `server.js` file again.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

var morgan = require('morgan');
app.use(morgan('short'));

app.use(function(req, res, next) {
  var body = '';

  req.on('data', function(chunk) {
    body += chunk.toString();
  });

  req.on('end', function() {
    if (body !== '') {
      req.body = JSON.parse(body);
    }

    next();
  });
});

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      return next(readErr);
    }

    var guests = JSON.parse(data);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var guestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
      if (writeErr) {
        return next(writeErr);
      }

      res.send(guest);
    });
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(data);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(guests[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Now you will send another HTTP GET request to your server.

```shell
http GET http://localhost:8000/guests
```

You should see a similar HTTP response.

![](https://i.imgur.com/TxC5tYS.png)

Next, send an HTTP POST request, with a JSON body, to your server.

```shell
http POST http://localhost:8000/guests name=Kate
```

You should see a similar HTTP response.

![](https://i.imgur.com/4G1cu7K.png)

Finally, check to see if your guest list has been modified.

```shell
http GET http://localhost:8000/guests
```

You should see a similar HTTP response.

![](https://i.imgur.com/ySdlgI9.png)

This is the hand-built body parsing middleware. Now we'll convert this to use the `body-parser` third-party middleware.

**NOTE:** Before you install `body-parser`, make sure your shell's working directory is the `party` directory.

```shell
npm install --save body-parser
```

Refactor your `serverExpress.js` file with the following code.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      return next(readErr);
    }

    var guests = JSON.parse(data);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var guestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
      if (writeErr) {
        return next(writeErr);
      }

      res.send(guest);
    });
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(data);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.send(guests[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Now you will send another HTTP GET request to your server.

```shell
http GET http://localhost:8000/guests
```

You should see a similar HTTP response.

![](https://i.imgur.com/ySdlgI9.png)

Next, send an HTTP POST request, with a JSON body, to your server.

```shell
http POST http://localhost:8000/guests name=Teagan
```

You should see a similar HTTP response.

![](https://i.imgur.com/mRXnhQu.png)

Finally, check to see if your guest list has been modified.

```shell
http GET http://localhost:8000/guests
```

You should see a similar HTTP response.

![](https://i.imgur.com/00buBZP.png)

This is the `body-parser` middleware in action!

## Resources

- [Envato - HTTP: The Protocol Every Web Developer Must Know - Part 1](http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177)
- [Express - Request](http://expressjs.com/en/4x/api.html#req)
- [Express - Response](http://expressjs.com/en/4x/api.html#res)
- [Express - Using Middleware](http://expressjs.com/en/guide/using-middleware.html)
