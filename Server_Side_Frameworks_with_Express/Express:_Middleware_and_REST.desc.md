# Express - Middleware

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

![middleware](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/65/middleware.png)

## How does Express middleware work?

First we'll build **application-level** middleware by hand. Then, we'll replace our hand-made middleware with third party middleware installed from npm.

To get started, create a new Express project.

```shell
cd path/to/projects
mkdir party
cd party
touch server.js
atom .
```

Next, type out the following code into the `server.js` file.

```js
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

```shell
nodemon server.js
```

In a new Terminal tab, send an HTTP request to your server.

```shell
http GET http://localhost:5000/guests
```

Look back into your first tab, you should see:

```
GET /guests 200 2 ms
```

This is the hand-made logging middleware you just built! Now let's replace it with `morgan`, a more powerful third-party middleware.

```shell
npm install morgan
```

Now refactor `server.js` with the following code.

```js
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

```shell
http GET http://localhost:5000/guests
```

You should see the following server log.

```
::1 - GET /guests HTTP/1.1 200 35 - 1.345 ms
```

This is the `morgan` middleware in action!

We will now add another middleware to parse the body of an HTTP POST request. Refactor your `server.js` file again.

```js
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

```shell
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

```shell
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

```shell
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

```shell
npm install body-parser
```

Refactor your `server.js` file with the following code.

```js
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

```shell
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

```shell
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

```shell
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

[Express - Using Middleware](http://expressjs.com/en/guide/using-middleware.html)
