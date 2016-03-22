# Intro Videos

## Data Flow in Express!

<iframe src="https://player.vimeo.com/video/136796681?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Intro to Dynamic Web App Concepts

<iframe src="https://player.vimeo.com/video/136579022?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Static Websites vs Dynamic Websites

<iframe src="https://player.vimeo.com/video/136582439?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Need to review HTTP? Check out [this article.](http://code.tutsplus.com/tutorials/http-the-protocol-every-web-developer-must-know-part-1--net-31177)

# Intro to Express.js

Objectives:

- Start a simple express app and review `require`  
- Apply routing knowledge to serve dynamic content

##Express 

### What is it?

We have used Node a bit to run JavaScript outside the browser and we have even seen how to use Node to start a server. It's totally feasible to build an application using Node alone but some tasks, like starting a server, serving files, and many others are not trivial on their own. To make many of these tasks simpler, we use frameworks! The most commonly used framework with node.js is express.js. It is known as a 'minimalist' framework because it does not give us a TON of functionality out of the box (like rails for example).

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

Now inside of a views folder, we can create an index.ejs file and include:

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
