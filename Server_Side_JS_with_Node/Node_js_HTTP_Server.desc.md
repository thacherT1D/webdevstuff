## Objectives

- Explain what an HTTP server is.
- Explain why an HTTP server is useful.
- Explain what an HTTP request is.
- Explain what an HTTP response is.
- Describe the parts of a URL
- Identify the components of a request and response
- Create an HTTP server with Node's `http` module
- Identify the two parts of a route (method and path)
- Access the parts of a URL with the url module

## What's an HTTP server?

Before browsers, before JavaScript, and believe it or not, before HTML, the Internet was originally designed as a file server. When a user wanted a file, they would use a terminal to submit a request, which included the location of the file—IP address and name of desired file—on a remote computer.

Create a `helloServer.js` file on the Desktop.

```shell
touch ~/Desktop/helloServer.js
```

Open the `helloServer.js` file in your text editor.

```shell
atom ~/Desktop/helloServer.js
```

And type in the following code.

```javascript
'use strict';

var http = require('http');
var port = 8000;

var server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world');
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
```

Now, save the `helloServer.js` file and run it with Node.js.

```shell
node ~/Desktop/helloServer.js
```

In a new Terminal tab, send an HTTP request to the server.

```shell
http GET localhost:8000/
```

And you should see something like this.

![](https://i.imgur.com/UKpsNwY.png)

## Why is an HTTP server useful?

The Internet that we now use is built on this foundation. The methods, however, have evolved. Instead of a terminal being the primary client, most users now use a web browser. The request for a resource, such as a file, is submitted as a URL in a web browser and forwarded to a web server. The URL `https://www.yahoo.com/index.html`, for instance, would search for a server with the host name of `www.yahoo.com` and a file named `/index.html` would be returned if found.

## What's an HTTP Request?

The client (or user agent) sends a plain-text message called an **HTTP request** to a server on behalf of the user. Aside from web browsers, other common user agents include web crawlers, native apps, and mobile apps.

An HTTP request is composed of the following parts.

1. A method (or verb)
1. A path
1. An HTTP version
1. Key-value pairs called **headers**
1. And an optional body

Here's an example of what an HTTP request looks like.

```
GET / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: localhost:8000
User-Agent: HTTPie/0.9.3
```

**QUESTION:** Looking at the above message, can you identify the parts of an HTTP request?

While an HTTP request can only contain one method, there are several different methods that a client can choose from. Each method instructs a server on how to process the request. Without the use of Ajax, web browsers are only capable of sending HTTP requests with the following methods.

| Method | Description                                                 |
|--------|-------------------------------------------------------------|
| `GET`  | Used retrieve a resource, like an HTML file, from a server. |
| `POST` | Used send information, like user input, to a server.        |

**QUESTION:** When does a web browser make `GET` requests? When does it make `POST` requests?

## What's an HTTP response?

The server receives an HTTP request, attempts to process it, and sends a plain-text message called an **HTTP response** back to the client. Popular web servers include Apache, Nginx, Node.js, and Python's built-in `SimpleHTTPServer`.

An HTTP response is composed of the following parts.

1. An HTTP version
1. A status code
1. Key-value headers
1. And an optional body

Here's an example of what an HTTP response looks like.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 11
Content-Type: text/plain
Date: Mon, 13 Jun 2016 04:28:36 GMT

Hello world
```

**QUESTION:** Looking at the above message, can you identify the parts of an HTTP response?

While an HTTP response can only contain one status code, there are many different codes that a server can choose from. Each status code explains to the client how the server interpreted the request. Status codes are three-digit numbers that are grouped into the following categories.

| Status Code Group | Description                                             |
|-------------------|---------------------------------------------------------|
| `1XX`             | Request accepted, ready for the next one.               |
| `2XX`             | Request accepted, the server's work is complete.        |
| `3XX`             | Request accepted, but additional client work is needed. |
| `4XX`             | Request accepted, but there was an error on the client. |
| `5XX`             | Request accepted, but there was an error on the server. |

- [HTTP Status Cats](https://http.cat/)
- [HTTP Status Dogs](https://httpstatusdogs.com/)
- [Wikipedia - List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

**QUESTION:** The most common status codes are `200`, `302`, `304`, `404`, and `500`. Can you figure out why?

## How do you create an HTTP server with Node.js?

To get started, return to the `party` project from yesterday and create a new branch.

```shell
cd party
git checkout -b node_server
```

Create a `server.js` file.

```shell
touch server.js
```

Open the `party` project in your text editor.

```shell
atom .
```

And type in the following code to the `server.js` file.

```javascript
'use strict';

var http = require('http');
var port = 8000;

var server = http.createServer(function(req, res) {
  var guests = ['Mary', 'Don'];
  var guestsJSON = JSON.stringify(guests);

  res.setHeader('Content-Type', 'application/json');
  res.end(guestsJSON);
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
```

To run the `server.js` file, use the `node` and command the file name containing our code:

```shell
node server.js
```

```shell
http GET localhost:8000/
```

```shell
npm install -g nodemon
```

```shell
nodemon server.js
```

```shell
http GET localhost:8000/
```

At this moment, our HTTP server has one request handler that handles all incoming requests. Regardless of the URL associated with the request, every response from the server returns a string with the same content: "Hi, I'll take two packets of sugar."

Our web server would become more useful if we could return a response that would correspond to a particular request. We would benefit, in other words, from defining routes that handle specific requests. A route is composed of many things, such as an HTTP verb (e.g., `GET`), and an optional path (`/faq`).

The infrastructure of the Internet handles the routing of our request from our browser to our server. However, we still need to handle how a request is routed relative to a URL's path and query string. To help us access this information, we can require one of Node's core modules named [`url`](https://nodejs.org/api/url.html) API.

```javascript
'use strict';

var http = require('http');
var port = 8000;

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    var guests = ['Mary', 'Don'];
    var guestsJSON = JSON.stringify(guests);

    res.setHeader('Content-Type', 'application/json');
    res.end(guestsJSON);
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
```

```shell
http GET localhost:8000/
```

```shell
http GET localhost:8000/guests
```

```shell
echo '["Mary", "Don"]' > guests.json
```

```javascript
'use strict';

var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = 8000;

var fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
```

```shell
http GET localhost:8000/guests
```

```javascript
'use strict';

var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = 8000;

var fs = require('fs');

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  }
  else if (req.method === 'GET' && req.url === '/guests/0') {
    fs.readFile(guestsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }

      var guests = JSON.parse(data);
      var guestJSON = JSON.stringify(guests[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(guestJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/guests/1') {
    fs.readFile(guestsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }

      var guests = JSON.parse(data);
      var guestJSON = JSON.stringify(guests[1]);

      res.setHeader('Content-Type', 'application/json');
      res.end(guestJSON);
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
```

```shell
http GET localhost:8000/guests/0
```

```shell
http GET localhost:8000/guests/1
```

## Assignment

- [Pet Shop - Node.js HTTP Server](https://github.com/gSchool/fs-pet-shop/blob/master/2_http.md)

## Resources

- [Youtube - How does the Internet work?](https://www.youtube.com/watch?v=e4S8zfLdLgQ)
- [The difference between the Web and Internet](http://www.webopedia.com/DidYouKnow/Internet/Web_vs_Internet.asp)
