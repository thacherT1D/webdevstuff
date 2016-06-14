## Objectives

- Explain what Express.js is.
- Start a simple express app and review `require`  
- Add multiple routes to an express.js app
- Set status code on responses
- Read URL parameters in express
- Read query string parameters in express
- Send dymanic files using ejs as a templating engine

### What's Express.js?

We have used Node.js a bit to run JavaScript outside the browser and we have even seen how to use Node to start a server. It's totally feasible to build an application using Node alone but some tasks, like starting a server, serving files, and many others are not trivial on their own. To make many of these tasks simpler, we use frameworks! The most commonly used framework with node.js is express.js. It is known as a 'minimalist' framework because it does not give us a TON of functionality out of the box (like rails for example).

### Getting Started

Let's start with a simple **Express** application.

* Make a directory and `app.js`  

```
mkdir learn_express
cd learn_express
touch app.js
npm init
git init
echo "node_modules" > .gitignore
git add .
git commit -m "initial commit"
```

Now you can install the packages you need running

```
npm install --save express
```

Now we need write some code for our simple application. Here's some sample starter code:

```javascript
// requirements
var express = require('express');
var app = express();

// a "GET" request to "/" will run the function below
app.get("/", function(req, res) {
  // send back the response: 'Hello World'
  res.send("Hello World");
});

// start the server
app.listen(3000, function() {
  console.log("Starting a server on localhost:3000");
});
```

Next, you can start the server using the following command:

`node app.js`

### Let's add a second route!

In your `app.js`, add the following second route below your first route:

```javascript
app.get("/new", function(req, res) {
  res.send("Congratulations on creating a new route!");
});
```

Save your file and head over to `localhost:3000/new`. What do you see?

Well, what you DON'T see is any sort of congratulatory message. The problem is that once the server starts, it doesn't know when changes have been made to `app.js`. In order for the server to see those changes, you need to go into the terminal, kill your server, and restart it again.

As you can imagine, when you're developing even a relatively small application, remembering to restart your server after every change to your server code can be a total pain. Fortunately, there's a better way...

### Let's keep that server running with nodemon!

Anywhere in the terminal, run `npm install -g nodemon` and then type in `nodemon` instead of `node app.js` to start your server and keep it alive!

## Routing

Building an application will require us to have a firm grasp of something we call **routing**.  Each **route** is a combination of a **Request Type** and **Path**.

Let's build these into our application:

`app.js`

```javascript
var express = require('express');
var app = express();

var vegetables = [
  "Carrots",
  "Cucumber",
  "Peas"
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/vegetables", function (req, res) {
  //send all the veggies  
  res.send(vegetables.join(", "));
});

app.listen(3000, function () {
  console.log("Go to localhost:3000/");
});
```

## Status Codes

You can also set the status code manually if you choose. Using the code
from above, add a new route after your `'/vegetables'` route.  We will
use a wild card operator. This route must be placed _after_ all your
other routes.

```js
//truncated code from above...

app.get("/vegetables", function (req, res) {
  //send all the veggies
  res.send(vegetables.join(", "));
});

// Our new route utilizing a wild card
app.get('/*', function (req, res) {
  res.status(404).send('Nope! Nothing here.');
});

app.listen(3000, function () {
  console.log("Go to localhost:3000/");
});
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

## Query Parameters

Generally, you don't want to cram everything into a route. Just imagine when there are multiple parameters in route. Maybe we don't care about getting the order of the parameters correct. To solve this problem, we can use **query parameters** with each request.

Let's see query params in action. Go to [https://google.com/search?q=puppies](https://google.com/search?q=puppies)

* `?` denotes the beginning of the query parameters
* `=` indicates an assignment; anything to the left is the key, while the right represents the value
* `&` allows for the input of multiple parameters, separating each key / value pair

Let's add our first route to practice query params.

```javascript
app.get("/hi", function (req, res) {
  var name = req.query.name;
  res.send("Hello, " + name);
});
```

Reset your server and go to [localhost:3000/hi?name=elie](localhost:3000/hi?name=elie). Note that we define parameters in the url after a `?`.

## Sending dynamic files

Sometimes there are static HTML files you want to send as a response. There are ways to send files using Express including `res.sendFile`, but if we want to send dynamic content, we will need to use something different.

Right now we have been using res.send to display information to our user, but if we want to render a dynamic page we will use `res.render`. Not only will we use this method, we will render templates using an engine called `ejs`. This requires us to run `npm install --save ejs` as well as including the line `app.set("view engine", "ejs")` inside of our `app.js`

```javascript
var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  // use res.render
  res.render('index', {name: "Elie"});
});

```

Now create a views folder, and inside of it create an index.ejs file and include:

```html
<!DOCTYPE HTML>

<html>
  <head>
  </head>
  <body>
    Hello, <%= name %>!
  </body>
</html>
```

# In-class Assignment

[Express Calculator](https://github.com/gSchool/express-introduction/tree/master/01-calculator)


## Objectives

- Describe what Express middleware is.
- Explain to another student why middleware is important.
- Use Express middleware to log the request/response cycle.
- Use Express middleware to parse a request body.

## What is Express middleware?

An Express application is essentially a series of middleware function calls. Express middleware is a callback function that has access to the request object (`req`), the response object (`res`), and sometimes the next middleware callback (`next`).

Middleware functions **can** execute any JavaScript operation inside the callback function.

- Read and modify the `req` and `res` objects.
- Read and write to a file or database.
- Send HTTP requests to other servers.

However, middleware **must** either end the request/response cycle with `res.send()` or call the next middleware callback with `next()`.

## Why is Express middleware important?

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
