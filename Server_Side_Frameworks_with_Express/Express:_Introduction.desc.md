## Intro Workshop

**Entry ticket** is completion of node-related LE's before this one.  Make sure you do not start Express if you are still struggling with file system things / `module.exports`

## Data Flow in Express!

<iframe src="https://player.vimeo.com/video/136796681?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


## Intro to Dynamic Web App Concepts

<iframe src="https://player.vimeo.com/video/136579022?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Static Websites vs Dynamic Websites

<iframe src="https://player.vimeo.com/video/136582439?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


### EXERCISES:

This is a repo of Express application exercises.

https://github.com/gSchool/express-introduction

# Intro to Express.js

## Objectives:

- Describe in detail what the request/response cycle is
- Explain the different parts of a URL
- Start a simple express app and review require
- Be able to load pages

## Express

We have used node a bit to run Javascript outside the browser and we have even seen how to use Node to start a server. It's totally feasible to build an application using Node alone, but some tasks like starting a server, serving files and many others are not trivial on their own. To make many of these tasks simpler, we use frameworks! The most commonly used framework with node.js is express.js. It is known as a 'minimalist' framework because it does not give us a TON of functionality out of the box (like rails for example).

## Getting Started

Let's start with a simple Express application.

Make a new project, with an `index.js` file:

```javascript
mkdir learn_express
cd learn_express
touch index.js
npm init
git init
echo "node_modules" > .gitignore
git add -A
git commit -m "initial commit"
```

Use NPM to install express:

```bash
npm install --save express
```

Let's now write some code:

```javascript
// requirements
var express = require('express');
var app = express();

// a "GET" request to "/" will run the function below
app.get("/", function (req, res) {
  // send back the response: 'Hello World'
  res.send("Hello World");
});

// start the server
app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
});
```

And launch our server:

```bash
nodemon index.js
```

## Routing

Building an application will require us to have a firm grasp of something we call routing. Each route is a combination of:

- Request Type
- Path.

Let's build these into our application:

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

## URL Parameters

What if we want to create an app that can dynamically say hello to anyone?

Using url parameters add a dynamic route to the application, indicated by: and the variable name you want to use, we'll use :name for the example below.

```javascript
app.get("/hello/:name", function (req, res) {
  res.send( "Hello, " + req.params.name );
});
```

Here we are seeing the first introduction to parameters that the application can identify. In the following route :name is consider a route parameter. We can access it using req.params.name.
Query Parameters

Generally, you don't want to cram everything into a route. Just imagine when there are multiple parameters in route. Maybe we don't care about getting the order of the parameters correct. To solve this problem, we use query parameters with each request.

Let's see query params in action. Go to [https://google.com/search?q=puppies](https://google.com/search?q=puppies)

- `?` denotes the beginning of the query parameters
- `=` indicates an assignment; anything to the left is the key, while the right represents the value
- `&` allows for the input of multiple parameters, separating each

Let's add our first route to practice query params.

```javascript
app.get("/hi", function (req, res) {
  var name = req.query.name;
  res.send("Hello, " + name);
});
```

Reset your server and go to localhost:3000/hi?name=elie. Note that we define parameters in the url after a ?.
Sending dynamic files

Sometimes there are static HTML files you want to send as a response. There are ways to send files using Express including res.sendFile, but if we want to send dynamic content, we will need to use something different.

Right now we have been using res.send to display information to our user, but if we want to render a dynamic page we will use res.render. Not only will we use this method, we will render templates using an engine called ejs. This requires us to run `npm install --save ejs` as well as including the line `app.set("view engine", "ejs")` inside of our `index.js`

```javascript
var express = require('express'),
app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  // use res.render
  res.render('index', {name: "Elie"});
});
```

Now inside of a views folder, we can create an `index.ejs` file and include

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    Hello, <%= name %>!
  </body>
</html>
```

## Express Calculator Exercise

Create a simple calculator app using Express.

- When a user visits `/add/9/3`, it should display 12
- When a user visits `/sub/9/3`, it should display 6
- When a user visits `/mult/9/3`, it should display 27
- When a user visits `/div/9/3`, it should display 3

#### Stretch Gaols

- Refactor your code to use a single route, rather than 4 separate routes.
- Add support to handle decimals.
- Style the page. Figure out how to add a stylesheet to an express app.
