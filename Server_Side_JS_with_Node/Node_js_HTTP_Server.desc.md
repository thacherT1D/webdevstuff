## Objectives

- Explain what an HTTP server is.
- Explain why an HTTP server is useful.
- Explain what an HTTP request is.
- Explain what an HTTP response is.
- Create a Node.js HTTP server with the `http` module.
- Deploy a Node.js HTTP server to Heroku.

## What's an HTTP server?

Node.js is commonly used to build HTTP servers. An **HTTP server** is a program that runs in an infinite loop, accepting HTTP requests from a client and sending HTTP responses back to it. Inside those responses, HTTP servers often include data like HTML, CSS, JavaScript, and JSON among other formats. Throughout the second quarter of this program, you'll be building custom HTTP servers in Node.js that'll accept HTTP requests and send back HTTP responses containing JSON data.

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
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello world');
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
```

Now, save the `helloServer.js` file and run it with the `node` command.

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

In 1989, Tim Berners-Lee proposed a new project to his employer CERN. The goal of this project was to ease the exchange of information between scientists by using a hypertext system. In 1990, the project resulted in two programs—the world's first HTTP client and server.

Because exchanging information over HTTP is so effective, there are countless HTTP clients and servers in existence today. The most effective of these servers are able to handle [thousands of requests per second](https://www.techempower.com/benchmarks/), thus giving millions of people around the world the ability to access and exchange information every day. Without HTTP servers, the rapid and global exchange of information over the Internet would not exist.

## What's an HTTP Request?

The client (or user agent) sends a plain-text message called an **HTTP request** to a server on behalf of the user. Aside from web browsers, other common user agents include web crawlers, native apps, and mobile apps.

An HTTP request is composed of the following parts.

1. A method (or verb)
1. A path
1. An HTTP version
1. Key-value headers
1. And an optional body

Here's an example of what an HTTP request looks like.

```text
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

You'll learn about additional HTTP methods, like `PUT`, `PATCH`, and `DELETE`, when we encounter RESTful HTTP servers later in the course.

**QUESTION:** When does a web browser make `GET` requests? When does it make `POST` requests?

## What's an HTTP response?

When the server receives an HTTP request, its job is to process the request and sends a plain-text message, called an **HTTP response**, back to the client. In addition to Node.js, popular HTTP servers include Apache, Nginx, and Python's built-in `SimpleHTTPServer`.

An HTTP response is composed of the following parts.

1. An HTTP version
1. A status code
1. Key-value headers
1. And an optional body

Here's an example of what an HTTP response looks like.

```text
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

Here are a few websites that list the possible HTTP status codes and their meaning through cute photos of animals.

- [HTTP Status Cats](https://http.cat/)
- [HTTP Status Dogs](https://httpstatusdogs.com/)

And, of course, there's boring-old Wikipedia when you need the official, textual explanation.

- [Wikipedia - List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

**QUESTION:** The most common status codes are `200`, `302`, `304`, `404`, and `500`. Can you figure out why?

## How do you create a Node.js HTTP server with the `http` module?

Now that you've learned about HTTP requests and responses, let's play around with the `http` module in Node.js. Remember that party you're throwing? Well, imagine that your guests want to see the party's guest list over HTTP. You've got some smart friends!

To do that, you'll need to create a Node.js HTTP server to handle HTTP requests and send back HTTP responses. The HTTP requests will be commands that read the records in a database, which will be the same JSON-formatted `guests.json` file from before. Once the HTTP request is correctly handled, the HTTP server will send an appropriate HTTP response back.

To get started, return to the `party` project from yesterday and create a new `http` feature branch.

```shell
cd party
git branch http
git checkout http
```

**NOTE:** You can also use `git checkout -b http` to create a new branch and check it out in one step.

Next, create a `server.js` file.

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
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  var guests = ['Mary', 'Don'];
  var guestsJSON = JSON.stringify(guests);

  res.setHeader('Content-Type', 'application/json');
  res.end(guestsJSON);
});

server.listen(port, function() {
  console.log('Listening on port', port);
});
```

As you can see, a Node.js HTTP server is created with one callback. For each HTTP request that arrives, the callback is invoked with two arguments—`req` and `res`. The callback's first `req` argument will contain the incoming HTTP request as an `http.IncomingMessage` object. The callback's second `res` argument will contain an empty outgoing HTTP response as an `http.ServerResponse` object. The goal of the callback is to correctly fill in the `res` object based on the information in `req` object.

See the Node.js API documentation to learn what properties and methods are available for each object type.

- [`http.IncomingMessage` object](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_incomingmessage)
- [`http.ServerResponse` object](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_serverresponse)

Now, save the `server.js` file and run it with the `node` command.

```shell
node server.js
```

And you should see something like this.

![](http://i.imgur.com/xoaBsw1.png)

In a separate Terminal tab, send the following HTTP request to the server.

```shell
http GET localhost:8000/
```

And you should see something like this.

![](https://i.imgur.com/CbkIni2.png)

Next, add and commit the latest changes to the `party` project's `http` branch.

```shell
git add .
git commit -m 'Add the basic HTTP server'
```

Right now, your HTTP server handles every HTTP request the same way, regardless of the request's method or path. It would be much more useful if your HTTP server could send back different HTTP responses based on the information inside the HTTP requests.

Let's fix that by refactoring the `server.js` file with the following code.

```javascript
'use strict';

var http = require('http');
var port = process.env.PORT || 8000;

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
  console.log('Listening on port', port);
});
```

Now, save the `server.js` file, terminate the existing server with `Ctrl + C`, and run it again with the `node` command.

```shell
node server.js
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

Next, add and commit the latest changes to the `party` project's `http` branch.

```shell
git add .
git commit -m 'Refactor HTTP server to send different responses'
```

Manually restarting a Node.js HTTP server gets old fast. Plus, it's easy to forgot to do it every time you refactor your code. To speed up your development workflow, let's use a command-line utility, called [Nodemon](http://nodemon.io/), that'll run your server with Node.js and automatically restart it when the code changes.

To get started, use use NPM to install the `nodemon` package globally.

```shell
npm install -g nodemon
```

Terminate the existing server with `Ctrl + C`, but this time run it with the `nodemon` command.

```shell
nodemon server.js
```

And you should see something like this.

![](http://i.imgur.com/NWN2Jdg.png)

Send the following HTTP request to the server to verify everything works the same.

```shell
http GET localhost:8000/guests
```

Right now, your HTTP server sends a hardcoded guest list in the HTTP response. It would be much more useful if your HTTP server could send guest list that's read from the JSON-formatted `guests.json` file.

Let's fix that by refactoring the `server.js` file with the following code.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
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

Next, add and commit the latest changes to the `party` project's `http` branch.

```shell
git add .
git commit -m 'Send all guest records from the database'
```

Right now, your HTTP server can only send back all the records from the database. It would be much more useful if your HTTP server could send back individual records as well.

Let's fix that by refactoring the `server.js` file with the following code.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var http = require('http');
var port = process.env.PORT || 8000;

var server = http.createServer(function(req, res) {
  if (req.method === 'GET' && req.url === '/guests') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      res.setHeader('Content-Type', 'application/json');
      res.end(guestsJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/guests/0') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      var guests = JSON.parse(guestsJSON);
      var guestJSON = JSON.stringify(guests[0]);

      res.setHeader('Content-Type', 'application/json');
      res.end(guestJSON);
    });
  }
  else if (req.method === 'GET' && req.url === '/guests/1') {
    fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
      if (err) {
        console.error(err.stack);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        return res.end('Internal Server Error');
      }

      var guests = JSON.parse(guestsJSON);
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

Next, add and commit the latest changes to the `party` project's `http` branch.

```shell
git add .
git commit -m 'Send individual guest records from the database'
```

To merge, the commits from the `http` branch to the `master` branch, run the following commands.

```shell
git checkout master
git merge http
```

With the commits merged in, it's safe to delete the `http` branch.

```shell
git br -d http
```

## How do you deploy a Node.js HTTP server to Heroku?

**Heroku** is a cloud platform that lets you deploy, monitor, and scale HTTP servers. Getting HTTP servers onto the Internet easily and being able to iterate on them quickly can make or break a product. Heroku focuses on providing an excellent developer experience around managing HTTP servers on a production environment. That way, developers can focus on writing server-side applications without having to build and maintain the production environment themselves.

To get started, create a new `heroku` feature branch.

```shell
git checkout -b heroku
```

Then, configure NPM to use your name and email address when creating a `package.json` file.

**NOTE:** Replace `YOUR NAME` and `YOUR EMAIL ADDRESS` with your real name and public email address.

```shell
npm config set init-author-name 'YOUR NAME'
npm config set init-author-email 'YOUR EMAIL ADDRESS'
```

Next, create a `package.json` file for your project using NPM. This lets Heroku know that this project uses Node.js.

```shell
npm init
```

Then, in the `package.json` file, specify the version of Node.js for Heroku to use in production. It's a good idea to use the same version as your development environment. To find out what version is on your development environment, run the `node -v` command.

```text
"engines": {
  "node": "YOUR DEV ENV NODE VERSION"
}
```

After you complete the short wizard, create a `Procfile` for your project. This lets Heroku know how to start your HTTP server.

```
echo 'web: node server.js' > Procfile
```

To see how Heroku will run your HTTP server, you can install the `foreman` package using NPM.

```shell
npm install -g foreman
```

Then use the `nf` command to start the HTTP server using by running the command inside the `Procfile`.

```shell
nf start
```

Finally, commit these changes to your repository

```shell
git add .
git commit -m 'Prepare for deployment to Heroku'
```

To merge, the commits from the `heroku` branch to the `master` branch, run the following commands.

```shell
git checkout master
git merge heroku
```

With the commits merged in, it's safe to delete the `heroku` branch.

```shell
git br -d heroku
```

After you've signed up for [Heroku](https://signup.heroku.com/), install the `heroku` package with Homebrew.

```shell
brew install heroku
```

Then use the `heroku` command to login to your account.

```shell
heroku login
```

After logging in, you can use the `heroku` command the create an empty application on Heroku.

**NOTE:** Replace `USERNAME` with your GitHub username.

```shell
heroku apps:create USERNAME-party
```

This will automatically create a new remote called `heroku`.

```shell
git remote -v
```

Now, you can deploy your server by pushing the `master` branch to the `heroku` remote.

```shell
git push heroku master
```

Finally, you can send a request to the server running on the production environment.

**NOTE:** Replace `USERNAME` with your GitHub username.

```shell
http GET USERNAME-party.herokuapp.com/guests
```

## Assignment

- [Pet Shop - Node.js HTTP Server](https://github.com/gSchool/fs-pet-shop/blob/master/2_http.md)

## Resources

- [Heroku Dev Center- Deploy from GitHub](https://devcenter.heroku.com/articles/github-integration)
- [Heroku Dev Center - Getting Started with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
- [Node.js API Documentation - `http.IncomingMessage`](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_incomingmessage)
- [Node.js API Documentation - `http.ServerResponse`](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_class_http_serverresponse)
- [Webopedia - The Difference Between the Internet and World Wide Web](http://www.webopedia.com/DidYouKnow/Internet/Web_vs_Internet.asp)
- [Youtube - How does the Internet work?](https://www.youtube.com/watch?v=e4S8zfLdLgQ)

<iframe src="https://player.vimeo.com/video/136579022?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
