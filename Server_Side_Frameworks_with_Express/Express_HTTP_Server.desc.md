## Objectives

- Explain what an Express HTTP server is.
- Explain why an Express HTTP servers is useful.
- Create an HTTP server with the `express` module.
- Explain what Express middleware is.
- Explain why Express middleware is useful.
- Use Express middleware to log the request/response cycle.
- Use Express middleware to parse a request body.

## What's an Express HTTP server?

**Express** is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

We have used Node.js a bit to run JavaScript outside the browser and we have even seen how to use Node to start a server. It's totally feasible to build an application using Node alone but some tasks, like starting a server, serving files, and many others are not trivial on their own. To make many of these tasks simpler, we use frameworks! The most commonly used framework with node.js is express.js. It is known as a 'minimalist' framework because it does not give us a TON of functionality out of the box (like rails for example).

```shell
mkdir helloExpress
cd helloExpress
```

```shell
npm init
```

```shell
npm install -s express
```

Create a `server.js` file on the Desktop.

```shell
touch server.js
```

Open the `server.js` file in your text editor.

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

Now, save the `server.js` file and run it with the `node` command.

```shell
nodemon server.js
```

In a new Terminal tab, send an HTTP request to the server.

```shell
http GET localhost:8000/
```

## Why is an HTTP server useful?

## How do you create an HTTP server with the `express` module?

Now that you've learned about Express HTTP servers, let's play around with the `express` modules. Remember that party you're throwing? Well, imagine that your guests want to see the party's guest list over HTTP. You've got some smart friends!

To do that, you'll need to create a Node.js HTTP server to handle HTTP requests and send back HTTP responses. The HTTP requests will be commands that read the records in a database, which will be the same JSON-formatted `guests.json` file from before. Once the HTTP request is correctly handled, the HTTP server will send an appropriate HTTP response back.

To get started, return to the `party` project from yesterday and create a new `http` feature branch.

```shell
cd party
git checkout -b express
```

```shell
mv server.js serverHTTP.js
```

Next, create a `serverExpress.js` file.

```shell
touch serverExpress.js
```

Open the `party` project in your text editor.

```shell
atom .
```

And type in the following code to the `serverExpress.js` file.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.use(function(req, res) {
  var guests = ['Mary', 'Don'];
  res.send(guests);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Building an application will require us to have a firm grasp of something we call routes. When it comes to HTTP servers, a **route** is a combination of a method and path.

As you can see, a Node.js HTTP server is created with one callback. For each HTTP request that arrives, the callback is invoked with two arguments—`req` and `res`. The callback's first `req` argument will contain the incoming HTTP request as an `http.IncomingMessage` object. The callback's second `res` argument will contain an empty outgoing HTTP response as an `http.ServerResponse` object. The goal of the callback is to correctly fill in the `res` object based on the information in `req` object.

See the Node.js API documentation to learn what properties and methods are available for each object type.

- [`http.IncomingMessage` object](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_incomingmessage)
- [`http.ServerResponse` object](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_serverresponse)

Now, save the `serverExpress.js` file and run it with the `nodemon` command.

```shell
nodemon serverExpress.js
```

And you should see something like this.

![]()

In a separate Terminal tab, send the following HTTP request to the server.

```shell
http GET localhost:8000/
```

And you should see something like this.

![](https://i.imgur.com/CbkIni2.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Add an Express HTTP server'
```

Right now, your HTTP server handles every HTTP request the same way, regardless of the request's method or path. It would be much more useful if your HTTP server could send back different HTTP responses based on the information inside the HTTP requests.

Let's fix that by refactoring the `serverExpress.js` file with the following code.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

app.get('/', function(req, res) {
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

You can also set the status code manually if you choose. Using the code
from above, add a new route after your `'/vegetables'` route.  We will
use a wild card operator. This route must be placed _after_ all your
other routes.

Now, save the `serverExpress.js` file, terminate the existing server with `Ctrl + C`, and run it again with the `node` command.

```shell
nodemon serverExpress.js
```

And you should see something like this.

![](http://i.imgur.com/xoaBsw1.png)

In a separate Terminal tab, send the following HTTP request to the server.

```shell
http GET localhost:8000/
```

And you should see something like this.

![](https://i.imgur.com/DZShb9I.png)

In a separate Terminal tab, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/MM0aAYD.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Refactor Express server to send different responses'
```

Right now, your HTTP server sends a hardcoded guest list in the HTTP response. It would be much more useful if your HTTP server could send guest list that's read from the JSON-formatted `guests.json` file.

Let's fix that by refactoring the `serverExpress.js` file with the following code.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');
var fs = require('fs');

app.get('/', function(req, res) {
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

Now, save the `server.js` file and add the following data to the `guests.json` file.

```shell
echo '["Mary", "Don"]' > guests.json
```

Send the following HTTP request to the server.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/MM0aAYD.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Send all guest records from the database'
```

Right now, your HTTP server can only send back all the records from the database. It would be much more useful if your HTTP server could send back individual records as well.

Let's fix that by refactoring the `serverExpress.js` file with the following code.

```javascript
'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');
var fs = require('fs');

app.get('/', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      throw err;
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', (err, data) => {
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

Now, save the `server.js` file and send the following HTTP request to the server.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/MM0aAYD.png)

Now, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests/0
```

And you should see something like this.

![](https://i.imgur.com/loK2cj9.png)

Finally, send the following HTTP request to the server.

```shell
http GET localhost:8000/guests/1
```

And you should see something like this.

![](https://i.imgur.com/omCorko.png)

Next, add and commit the latest changes to the `party` project's `express` branch.

```shell
git add .
git commit -m 'Send individual guest records from the database'
```

To merge, the commits from the `express` branch to the `master` branch, run the following commands.

```shell
git checkout master
git merge http
```

With the commits merged in, it's safe to delete the `express` branch.

```shell
git br -d http
```

## URL Parameters

What if we want to create an app that can dynamically say hello to anyone?

* Using **url parameters**, add a dynamic route to the application. This is indicated by `:` and the variable name you want to use. We'll use `:name` for the example below:

```javascript
app.get("/hello/:name", function (req, res) {
  res.send( "Hello, " + req.params.name );
});
```

Here we are seeing the first introduction to parameters that the application can identify. In the following route `:name` is considered a route parameter. We can access it using `req.params.name`.

## What's Express middleware?

An Express application is essentially a series of middleware function calls. Express middleware is a callback function that has access to the request object (`req`), the response object (`res`), and sometimes the next middleware callback (`next`).

Middleware functions **can** execute any JavaScript operation inside the callback function.

- Read and modify the `req` and `res` objects.
- Read and write to a file or database.
- Send HTTP requests to other servers.

However, middleware **must** either end the request/response cycle with `res.send()` or call the next middleware callback with `next()`.

## Why is Express middleware useful?

Express middleware allows an application's shared code to be organized into in a series of middleware callbacks. These callbacks can be reused in a flexible way.

![middleware](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/66/middleware-1.png)

## How does Express middleware work?

First we'll build **application-level** middleware by hand. Then, we'll replace our hand-made middleware with third party middleware installed from npm.

To get started, create a new Express project.

```bash
cd path/to/projects
mkdir party
cd party
npm install express
touch server.js
atom .
```

Next, type out the following code into the `server.js` file.

```javascript
'use strict';

var express = require('express');
var app = express();

var guests = [{ name: 'Teagan' }];

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

app.use(function(req, res, next) {
  var start = new Date();
  next();
  var end = new Date();
  console.log(req.method, req.url, res.statusCode, end - start, 'ms');
});

app.get('/guests', function(req, res) {
  res.send(guests);
});

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
```

Then start your Express server.

```bash
nodemon server.js
```

In a new Terminal tab, send an HTTP request to your server.

```bash
http GET http://localhost:5000/guests
```

Look back into your first tab, you should see:

```
GET /guests 200 2 ms
```

This is the hand-made logging middleware you just built! Now let's replace it with `morgan`, a more powerful third-party middleware.

**NOTE:** Before you install `morgan`, make sure your shell's working directory is the `party` directory.

```bash
npm install morgan
```

Now refactor `server.js` with the following code.

```javascript
'use strict';

var express = require('express');
var app = express();

var guests = [{ name: 'Teagan' }];

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

var morgan = require('morgan');
app.use(morgan('short'));

app.get('/guests', function(req, res) {
  res.send(guests);
});

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
```

Now send another HTTP request to your server.

```bash
http GET http://localhost:5000/guests
```

You should see the following server log.

```
::1 - GET /guests HTTP/1.1 200 35 - 1.345 ms
```

This is the `morgan` middleware in action!

We will now add another middleware to parse the body of an HTTP POST request. Refactor your `server.js` file again.

```javascript
'use strict';

var express = require('express');
var app = express();

var guests = [{ name: 'Teagan' }];

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

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
  res.send(guests);
});

app.post('/guests', function(req, res){
  guests.push(req.body);
  res.send(req.body);
});

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
```

Now you will send another HTTP GET request to your server.

```bash
http GET http://localhost:5000/guests
```

You should see a similar HTTP response.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 19
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Mar 2016 18:40:10 GMT
ETag: W/"13-eZMtvf4MUiEAJpKhww5ZlQ"

[
    {
        "name": "Teagan"
    }
]
```

Next, send an HTTP POST request, with a JSON body, to your server.

```bash
http POST http://localhost:5000/guests name=Kate
```

You should see a similar HTTP response.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Mar 2016 18:48:07 GMT
ETag: W/"f-Dm6LF8ZOGzVq0Yw/A4JWYw"

{
    "name": "Kate"
}
```

Finally, check to see if your guest list has been modified.

```bash
http GET http://localhost:5000/guests
```

You should see a similar HTTP response.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 35
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Mar 2016 18:48:40 GMT
ETag: W/"23-BlGLuHg6XvB4VmZU6+bV3A"

[
    {
        "name": "Teagan"
    },
    {
        "name": "Kate"
    }
]
```

This is the hand-built body parsing middleware. Now we'll convert this to use the `body-parser` third-party middleware.

**NOTE:** Before you install `body-parser`, make sure your shell's working directory is the `party` directory.

```bash
npm install body-parser
```

Refactor your `server.js` file with the following code.

```javascript
'use strict';

var express = require('express');
var app = express();

var guests = [{ name: 'Teagan' }];

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/guests', function(req, res) {
  res.send(guests);
});

app.post('/guests', function(req, res){
  guests.push(req.body);
  res.send(req.body);
});

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
```



Now you will send another HTTP GET request to your server.

```bash
http GET http://localhost:5000/guests
```

You should see a similar HTTP response.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 19
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Mar 2016 18:40:10 GMT
ETag: W/"13-eZMtvf4MUiEAJpKhww5ZlQ"

[
    {
        "name": "Teagan"
    }
]
```

Next, send an HTTP POST request, with a JSON body, to your server.

```bash
http POST http://localhost:5000/guests name=Kate
```

You should see a similar HTTP response.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Mar 2016 18:48:07 GMT
ETag: W/"f-Dm6LF8ZOGzVq0Yw/A4JWYw"

{
    "name": "Kate"
}
```

Finally, check to see if your guest list has been modified.

```bash
http GET http://localhost:5000/guests
```

You should see a similar HTTP response.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 35
Content-Type: application/json; charset=utf-8
Date: Wed, 23 Mar 2016 18:48:40 GMT
ETag: W/"23-BlGLuHg6XvB4VmZU6+bV3A"

[
    {
        "name": "Teagan"
    },
    {
        "name": "Kate"
    }
]
```

This is the `body-parser` middleware in action!

## Resources

[Envato - HTTP: The Protocol Every Web Developer Must Know - Part 1](http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177)
[Express - Using Middleware](http://expressjs.com/en/guide/using-middleware.html)
