## Objectives

- Explain what an HTTP server is.
- Describe the parts of a URL
- Identify the components of a request and response
- Create an HTTP server with Node's `http` module
- Identify the two parts of a route (method and path)
- Access the parts of a URL with the url module

## What's an HTTP server?

Before browsers, before JavaScript, and believe it or not, before HTML, the Internet was originally designed as a file server. When a user wanted a file, they would use a terminal to submit a request, which included the location of the file—IP address and name of desired file—on a remote computer.

The Internet that we now use is built on this foundation. The methods, however, have evolved. Instead of a terminal being the primary client, most users now use a web browser. The request for a resource, such as a file, is submitted as a URL in a web browser and forwarded to a web server. The URL `https://www.yahoo.com/index.html`, for instance, would search for a server with the host name of `www.yahoo.com` and a file named `/index.html` would be returned if found.

## The Syntax of a Uniform Resource Locator (URL)

All resource on the Internet is associated with a global identifer: a Uniform Resource Locator (URL). Each URL, furthmore, [conforms to a particular syntax](https://en.wikipedia.org/wiki/Uniform_Resource_Locator#Syntax)

Let's explore a description of the syntax from the perspective of [how Googlers talk about parts of a URL](https://www.mattcutts.com/blog/seo-glossary-url-definitions/).

## Underlying Parts of a URL

Some parts of a URL can be understood based on an initial read, such as a query string. However, further elaboration would help with two parts: hostname (with IP address) and protocol. The latter will be discussed during the next section; the former will be discussed now.

## IP Address

An IP address determines the location of a machine on a network. This an analogous to how a home can be found with an address. In regards to the Internet, an IP address takes the form of `XXX.XXX.XXX.XXX`, where each grouping of `XXX` (octet) is a value that is >= `0` && <= `255`. In other words, each octet can be one of 256 values.

### Domain Name System (DNS)

The [DNS](http://www.webopedia.com/TERM/D/DNS.html) maps domain names (e.g., `google.com`) to IP addresses (like `216.58.217.46`) for improved user experience--words are easier to remember. In very general terms, a DNS could be conceptualized as a large JavaScript object--keys are the domain names and values are the corresponding IP addresses.

## HTTP

The most important component of a web URL is arguably the protocol: A set of rules that define the communication between a client and a server. For websites, the protocol is often [HTTP](https://en.wikipedia.org/wiki/Hypertext). Many of you may have noticed this protocol being used when you visit your favorite websites. There's a lot to learn about HTTP, but we'll focus our attention on HTTP's use of a request and response model.

### HTTP Request

A client sends an HTTP request in many ways, including entering a URL in an address bar of a web browser, submitting a form, or clicking a hyperlink. When any of these three events occur, a browser submits a request with three components:

- request line (includes a method)
- headers
- body

### HTTP Response

In turn, a request will return a response with three components:

- response line (includes a [status code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes))
- headers
- body

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
var port = 5000;

var server = http.createServer(function(req, res) {
  var guests = ['Mary', 'Don'];
  var guestsJSON = JSON.stringify(guests);

  res.setHeader('Content-Type', 'application/json');
  res.end(guestsJSON);
});

server.listen(port, 'localhost', function() {
  console.log(`Listening on port ${port}`);
});
```

To run the `server.js` file, use the `node` and command the file name containing our code:

```shell
node server.js
```

```shell
http GET localhost:5000/
```

```shell
npm install -g nodemon
```

```shell
nodemon server.js
```

```shell
http GET localhost:5000/
```

```javascript
'use strict';

var http = require('http');
var port = 5000;

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

server.listen(port, 'localhost', function() {
  console.log(`Listening on port ${port}`);
});
```

```shell
http GET localhost:5000/
```

```shell
http GET localhost:5000/guests
```

```shell
echo '["Mary", "Don"]' > guests.json
```

```javascript
'use strict';

var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = 5000;

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
http GET localhost:5000/guests
```

```javascript
'use strict';

var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = 5000;

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
http GET localhost:5000/guests/0
```

```shell
http GET localhost:5000/guests/1
```

##  Describe the Benefit of Routes

At this moment, our HTTP server has one request handler that handles all incoming requests. Regardless of the URL associated with the request, every response from the server returns a string with the same content: "Hi, I'll take two packets of sugar."

Our web server would become more useful if we could return a response that would correspond to a particular request. We would benefit, in other words, from defining routes that handle specific requests. A route is composed of many things, such as an HTTP verb (e.g., `GET`), and an optional path (`/faq`).

## Access the components of a URL with the url module

The infrastructure of the Internet handles the routing of our request from our browser to our server. However, we still need to handle how a request is routed relative to a URL's path and query string. To help us access this information, we can require one of Node's core modules named [`url`](https://nodejs.org/api/url.html):

```javascript
'use strict';

var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = 5000;

var fs = require('fs');

var server = http.createServer(function(req, res) {
  var guestRegExp = /^\/guests\/(.*)$/;

  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(data);
    });
  }
  else if (req.method === 'GET' && guestRegExp.test(req.url)) {
    fs.readFile(guestsPath, 'utf8', function(err, data) {
      if (err) {
        throw err;
      }

      var matches = req.url.match(guestRegExp);
      var id = Number.parseInt(matches[1]);
      var guests = JSON.parse(data);

      if (id < 0 || id >= guests.length || Number.isNaN(id)) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not found');

        return;
      }

      var guestJSON = JSON.stringify(guests[id]);

      res.setHeader('Content-Type', 'application/json');
      res.end(guestJSON);
    });
  }
  else if (req.method === 'POST' && req.url === '/guests') {
    var bodyJSON = '';

    req.on('data', (chunk) => {
      bodyJSON += chunk.toString();
    });

    req.on('end', () => {
      // eslint-disable-next-line max-statements
      fs.readFile(guestsPath, 'utf8', function(readErr, data) {
        if (readErr) {
          throw readErr;
        }

        var body = JSON.parse(bodyJSON);
        var guests = JSON.parse(data);
        var guest = body.guest;

        if (!guest) {
          res.statusCode = 400;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Bad Request');

          return;
        }

        guests.push(guest);

        var guestJSON = JSON.stringify(guest);
        var guestsJSON = JSON.stringify(guests);

        fs.writeFile(guestsPath, guestsJSON, function(writeErr) {
          if (writeErr) {
            throw writeErr;
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(guestJSON);
        });
      });
    });
  }
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port);
});
```

If we submit a request to either `localhost:8080/special-message` or `localhost:8080/non-special-message`, we still receive our intended response.

## Assignment

- [Pet Shop - Node.js HTTP Server](https://github.com/gSchool/fs-pet-shop/blob/master/2_http.md)

## Resources

- [Youtube - How does the Internet work?](https://www.youtube.com/watch?v=e4S8zfLdLgQ)
- [The difference between the Web and Internet](http://www.webopedia.com/DidYouKnow/Internet/Web_vs_Internet.asp)
