# HTTP and Node.js

Please skim through this entire document first. Specific instructions for what to do (and in which order) appear further down.

## Setting the stage

- Clear the stage (close all other terminal tabs, chrome tabs, email etc...).
- Internalize the what and why section (Rationale).
- The goal here is learning to learn, so it is all about the process. There is no rush. Take risks and have fun! Do not be afraid to make mistakes and try new things.
- When you have a hypothesis, come up with a coding experiment that valides or invalidates your theory. If it is sufficiently interesting please keep a copy of it to share with classmates as an exercise.

### Rationale (What and Why):

Previously, Node.js has been used as a mechanism for interacting with the filesystem with Node.js' `fs` module. Before beginning this lesson, make sure you can identify at least 2 reasons why `fs` is an important module in the Node.js ecosystem.

Node.js is famously used as a platform for building web application, specifically with the Express framework. Although understanding the Express framework is important for being a successful JavaScript developer, it is also important to understand better what Node.js is providing before jumping in to Express. The goal is always to understand and experience the problem before attempting the solution (Polyà's method).

In addition to gaining deeper exposure to web topics, experiencing and working with HTTP as a set of strings should hopefully make the previously established toolkit of how to handle strings feel like time well spent.

### Objectives:

By the end of this lesson you should be able to:

- Identify the parts of a url 
- Explain the basic purpose of the parts of a url (at a high level)
- Describe URL encoding
- Define "Protocol"
- Explain what HTTP is
- Describe that HTTP requests are not encrypted
- Explain that HTTP requests are strings sent across a network
- Describe what a path is and how one would extract it from the request string
- Describe how to send query parameters in a URL (?foo=bar&baz=foo)
- Describe how to send url-encoded parameters in the request body
- Describe that HTTP responses are strings sent across a network
- List and explain common HTTP status codes
- Explain the role that DNS plays
- Define and describe DNS and IP address
- Start a simple server using the `http` module
- Use the `http` module to interact with the Web using the HTTP protocol

### Key terms:

- HTTP
- Network
- URL
- DNS
- IP address
- Query string parameters

## Activities

Begin by reading this [concise explanation of the anatomy of a URL](https://www.mattcutts.com/blog/seo-glossary-url-definitions/) and answer the following questions:

  1. What is a URL?
  1. Construct the URL for reaching out to port `2065` on the domain `foobarski.xyz` using the `ftp` protocol.

The corresponding responses are:

  1. A URL is a Uniform Resource Locator. Like any definition, it should be memorized.
  1. `ftp://foobarski.xyz:2065`

Diving in a bit deeper, the main sections of interest for now are:

  1. domain name - e.g. `google.com`, `galvanize.com` - this is the highest level concept in the URL.
  1. protocol - HTTP for now, later HTTPS. This is simply the set of rules around how communication may occur. That is, communication over FTP behaves differently than HTTP.
  1. port - in a development environment servers are generally not run on port 80 like web servers are.
  1. path - the part after the slash, `/finance` in `https://www.google.com/finance`, provides the path to the resource, this is analogous to a filepath on the filesystem.
  1. parameters - also called query string parameters, after the `?` in `https://www.google.com/finance?q=MSFT` in this case the key/value pair of parameters are `{q: 'MSFT'}` (if parsed into a JavaScript Object).

URLs are the identifiers for the global locations of HTTP resources on the _world wide web_. If you are unsure of the differences between the internet and the world wide web, [this](http://www.webopedia.com/DidYouKnow/Internet/Web_vs_Internet.asp) is a quick, concise explanation .

But what is HTTP? The _Hypertext Transfer Protocol_, or HTTP, defines a protocol, or set of rules around how communication may occur, to transfer hypertext. Read Introduction paragraph and sections "Types and uses of hypertext", "History", "Implementations" in [Hypertext](https://en.wikipedia.org/wiki/Hypertext). Answer the following questions:

  1. Who is Tim Berners-Lee?
  1. What is hypertext and why is it important?
  1. Is hypertext a new concept (new meaning in the last 30 years)?

The corresponding answers are provided here:

  1. [Tim Berners-Lee](http://i.guim.co.uk/img/static/sys-images/Technology/Pix/pictures/2012/10/9/1349788648537/tbl-460.png?w=620&q=85&auto=format&sharp=10&s=630f0146cc833c820ed33318f9058610) is the creator of the World Wide Web, the project was started while he was a scientist at CERN. Did Tim Berners-Lee create the internet? No.
  1. Hypertext is text displayed on the screen of a device (for our purposes a computer) which can link to other pieces of text. Hypertext is an important concept because it is the concept behind the world wide web. Recall that the internet provides support for the communication of computers which are attached to it, we can refer to this as machines that are networked. The world wide web utilizes a network of computers to communicate via the HTTP protocol. This allows computers, or _nodes_, to communicate hypertext documents with eachother.
  1. Not at all. Like many other computer science concept, hypertext was first toyed around with in the 1940s on paper. In the 1960s when technology had evolved sufficiently to meet the ability of theory, many advances were made, including the introduction of the first word processor. So a word processor is really just an example of hypertext system.

But that is just a high-level of what HTTP is. Later in this Learning Experience you will go through an exercise that gets into the nitty gritty of what HTTP boils down to: strings being sent across a network. Whether is it the hypermedia document itself or the routing of location (URL), everything will rely on strings. Can you think of any reason why communication of this sort, a.k.a. involving strings, may have security implications?

In music a popular pattern is known as [call and response (watch this at normal speed)](https://www.youtube.com/watch?v=pxg4AP1MKDk). It appears in all different types of music from folk to blues to tribal and religious music from around the world. But how is this possibly related to HTTP? HTTP works off of an analogous model known as _request_ and _response_.

In the most simplified view of a networked application, your machine, `localhost`, will serve as the server and your browser as the client (you can think of this as the entity who makes requests of the server for [hypermedia](http://www.rc.au.net/papers/www-0595/wwwhype2.html)). Here is the _very rough_ chain of events (with some major simplifications) for a program that is running locally:

  1. Open browser, visit `localhost:8000`. Another way to say this is use a client, in this case a browser, to make an HTTP request to `localhost:8000`.
  1. Machine is smart enough to know that `localhost` does not involve the internet, so relays to port `8000` of itself
  1. Web server running on port `8000` of machine receives the request and processes it
  1. Web server, based on the procesing of the request, _responds_ with hypertext or hypermedia
  1. Browser (client) receives hypermedia and renders it

Later in this Learning Experience you will build a simple HTTP server using Node.js. Unfortunately the model for the general world wide web is not as simple. There are a few concepts to understand upfront that are useful:

  1. An _IP address_ determines the location of a machine on the network. An analogy for this is that people can find you by going to your home address, this is no different, but machines are much more precise with location. IP addresses take the form of `XXX.XXX.XXX.XXX` where each grouping of `XXX`, or _octet_, is a value that is greater than or equal to `0` and less than or equal to `255`, so each grouping of `XXX` can be one of 256 values. 
  1. The _Domain Name System_, or _DNS_ is a mapping of domain names (like `google.com`) to IP addresses (like `216.58.217.46`). In a simplified view of this, it can be thought of like a giant JavaScript object whose keys are the domain names and whose values are the corresponding IP addresses. One of the most popular DNS providers is Google.

Before moving on, work through the following two questions:

  1. How many different IP addresses are there (do not worry about computing the value)?
  1. What is DNS?

The corresponding answers are:

  1. Too many to count, *_just kidding_*! `256<sup>4</sup>`
  1. DNS is the Domain Name System, the service maps domain names to IP addresses.

You need to know what DNS is and how it factors in to the bigger picture, this is a diagram of how the web works with DNS included:

![DNS Diagram](http://ods.org/images/dns_diagram.jpg)

Here is an alternative view of the same concept:

![DNS Diagram 2](http://50.17.207.32/wp-content/uploads/2012/09/DNS_basics3.png)

Compare and contrast the model that uses DNS with the model for the server running locally, make sure you can identify which parts use the network connection.

The following, sequenced exercises should help make the request/response paradigm more evident by using Node.js in a web context and make some of the details of HTTP more concrete.

## Routing in Node

While the infrastructure of the internet handles the routing of requests to our server at the DNS / IP / HOST level, we still have to handle how we route requests relative to the URL's port, path, and parameters. Lets look at some practical examples of __routing__ in a node webserver. The following is a *very* simple webserver. It listens for any url on port 8000, then sends that information back to whoever requested it. Save the following in a file called server.js, then run it with node:

`$ node server.js`


```
var http = require('http');

var handleRequest = function (request, response) {
	console.log(request.url);
	response.end(request.url);
};

var server = http.createServer(handleRequest);

server.listen(8000);
```

Perhaps the most crucial detail is that `request.url` in node's http module is simply the __path__ and __parameters__ not the complete protocol+host+port+path. So, lets say we wanted to send a special message to our users if they went to the path `/special-message` on our webserver:

```
var http = require('http');

var handleRequest = function (request, response) {
	if(request.url === '/special-message') {
		response.end("ISN'T THIS SPECIAL?!");
	}
	else {
		response.end(request.url);	
	}
};

var server = http.createServer(handleRequest);

server.listen(8000);
```

This is all well and good, but adding an if statement for each individual route doesn't scale as well as some other techniques. As our webservers grow in complexity, the number of routes we have to server will grow in kind. Here is a simple pattern for using a JSON object to handle routing. Using this pattern we can have our routes in their own file, and use `require` to add them to our server.

routes.js:

```
module.exports = {
	'/special-message': function(request, response) {
		response.end("ISN'T THIS SPECIAL");
	},

	'/random-number': function(request, response) {
		response.end("" + Math.random() * 100);
	}
}
```

server.js

```
var http = require('http');
var routes = require('./routes');

var handleRequest = function (request, response) {
	if(routes[request.url] === undefined) {
		response.end("404, no such route");
		return
	}

	routes[request.url](request, response);
};

var server = http.createServer(handleRequest);

server.listen(8000);
```

Now, if we go to `localhost:8000/special-message` we get a special message. If we go to `localhost:8000/random-number` we'll get a random number between 0 and 100. If we go to any other url, we'll get `404, no such route`.

Now, you have all the ammunition you need to tackle these two excercises:

### First Exercise: Building a simple HTTP server

* In the spirit of building understand, before using any frameworks, an understand of HTTP will be developed by [building a HTTP server](https://github.com/gSchool/node-http-server-intro).

### Second Exercise: Parsing Query Strings

* This [exercise](https://github.com/gSchool/node-query-string-parsing) focuses on how HTTP uses Strings to communicate information between the client (browser) and server.
