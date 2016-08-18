We have used Node a bit to run JavaScript outside the browser and we have even seen how to use Node to start a server. It's totally feasible to build an application using Node alone but some tasks, like starting a server, serving files, and many others are not trivial on their own. To make many of these tasks simpler, we use frameworks!

The most commonly used framework with node.js is express.js. It is known as a _minimalist and unopinionated_ framework. To understand what that means, consider CSS Frameworks. A framework like [Bootstrap](http://getbootstrap.com) is highly opinionated and maximalist -- you get tons of tools to use but have to use them as intended. Compare that with a much lighter framework like [Skeleton](http://getskeleton.com/) which includes fewer components but the same basic grid structure.

* [Getting Started](#getting-started)
* [Routing](#routing)
* [Status Codes](#status-codes)
* [URL Parameters](#url-parameters)
* [Query Parameters](#query-parameters)

During this article you will be asked to create a simple server with express which responds to a variety of paths.

<hr style="margin: 5rem 0;"/>

## Getting Started

Let's start with a simple **Express** application. Go into your Unit 2 directory and then:

```
mkdir intro-to-express
cd intro-to-express
touch app.js
npm init
git init
echo "node_modules" > .gitignore
git add .
git commit -m "Initial commit."
```

Now you can install the packages you need running

```
npm install --save express
```

We're going to be building as simple web server that will respond to different types of requests. We're going to start very slow so you can understand what express is. **Spoiler Alert:** express will feel very magical because of all the built in functionality but at its base is just plain ol' JavaScript!

Begin by putting the following code inside of your `app.js`. Once it's there, run the file with the node interpreter and answer the following question: What type of thing are we importing when we require the express module?

```javascript
var express = require('express');

console.log(express);
console.log(typeof express);
```

At the end of the day, express is just a function! So, what can we do with functions? Invoke them! Try replacing your current code with the following:

```javascript
var express = require('express');
var app = express();

console.log(app);
console.log(typeof app);
console.log(app.constructor.name);
```

What type of thing is `app`? What OOP word would we use to describe it?

It can be overwhelming to look at all the various properties and methods attached to a single instance of the EventEmitter. The purpose of frameworks, at least to start, is not to memorize all the various components of it. Instead, focus on learning first what we _need to know_ to accomplish the task at hand.

Now that we have a better idea of what's going on under the hood, let's start a simple server with express. Express instances have a method called `.listen`. This should be famililiar from our work with the plain `http` module that comes with node.

The `.listen` method takes multiple arguments. The first is the port you want to begin listening on. Add the following to your existing code and then run your file with node. You'll notice you're not getting your prompt back... that's because you're now listening on that port!

```javascript
app.listen(3000);
```

_Remember that you can stop your server by pressing Ctrl + C. In order for the server to see those changes, you need to go into the terminal, kill your server, and restart it again. We'll introduce a tool to make these easier soon!_

Take a moment to find the `.listen` method in the [API Docs](https://expressjs.com/en/4x/api.html) for express. Typically, you'll simply see a single additional argument which is a callback function. That callback function will be invoked when the server is started.

Try adding the following callback to your file, like so:

```javascript
app.listen(3000, function () {
  console.log('Starting a server on http://localhost:3000');
});
```

You should see your message print to the terminal screen. Try going to the above address (or whatever port you put in). What's the message that comes back to you?

Before moving on to the next section, take a few minutes to comment your code in as much detail as possible.

<hr style="margin: 5rem 0;"/>

## Routing

The error you got in the last section would've been something like `Cannot GET /`. That error is telling us that the server has not been configured to listen for a GET request at the root path (that is, `/`). Let's configure our server to do just that!

The `.get` method allows us to give it a path and one or more callbacks to run whenever we make a GET request to that path. The most basic functionality will look like so:

```javascript
app.get('/', function (request, response, next) {
  response.send('Hello World');
});
```

First, add this code to your file and re-run your server. Then, try and once again go to the URL. You should see "Hello World" on the screen! What you've done here is create a new **route**.

Let's break down each part of what is happening in the above method invocation.

1. `.get` is a method on the instance returned from invoking express. It will be listening for a GET method. _It's important to note that we're not making a GET request here, we are listening for one._

1. The "/" is the route we'll be hitting. This can be any path but it must start with a forward slash.

1. The callback function that is the second argument comes with the three parameters. The **request** object contains information and methods about the incoming request. The **response** object contains information and methods you can use to respond back to the client. **next** is a special function that we'll get to in just a bit!

1. The response is an object with methods attached to it. One of those is the `.send` message which will respond back to the client in the simplest way possible. You can only respond to the client once inside of this callback function. Try adding another `response.send` and you'll get an error in your terminal.

There are many ways to use the request and response objects which we'll learn about next!

<br>
### Adding More Routes

In your `app.js`, add the following second route below your first route:

```javascript
app.get("/new", function(req, res) {
  res.send("Congratulations on creating a new route!");
});
```

Save your file, restart your server, and head over to `localhost:3000/new`. What do you see?

As you can imagine, when you're developing even a relatively small application, remembering to restart your server after every change to your server code can be a total pain. Fortunately, there's a better way...

<br>
### Nodemon

[Nodemon](https://www.npmjs.com/package/nodemon) is a package you can install that will monitor your application for changes. When it detects changes, it will automatically restart your server.

There are a few ways we can use nodemon. We'll be avoiding installing nodemon globally (although you may want to do that at a later date). First, let's install nodemon as a dev dependency.

```
npm install --save-dev nodemon@1.10.0
```

_Note that we're installing a specific version of nodemon. At the time of this writing, the latest version is broken._

Open your `package.json` and take a look at the "dev-dependencies" section. You should see nodemon there!

Now we're going to add a new script to our `package.json` that will run our server while in development mode. Remove the key "test" and its associated value. Then, add to it so your "scripts" key points toward the following object:

```json
"scripts": {
  "dev": "./node_modules/.bin/nodemon app.js"
},
```

The "scripts" key points toward an object of scripts we can run with the `npm run` command. When we run `npm run dev` it will look into our node_modules folder at the path listed and run our app.js file with the nodemon package we just installed.

That's it! Try making a change in app.js and you should see that change without restarting the server manually!

<br>
### Exercise

Create a new file called `groceries.js` and copy the following into it.

```javascript
module.exports.vegetables = [
  "Carrots",
  "Cucumber",
  "Peas"
];
```

In your `app.js`, add the following at the top of your file.

```javascript
var groceries = require('./groceries');
```

Now, add a new GET route to your `app.js` with the path `/vegetables`. It should return all the vegetables joined together by a comma. Remember the tools we have available! `app.get`, `response.send`, and everything you'd normally have in JavaScript!

<br>
## Status Codes

You can also set the status code manually if you choose. Using the code
from above, add a new route like the one below. We will
use a wild card operator. This route _must be placed after_ all your
other routes.

```js
app.get('/*', function (req, res) {
  res.status(404).send('Nope! Nothing here.');
});
```

Here we are setting up a route to catch all routes not yet defined and returning a status code of 404 which signifies NOT FOUND. Instead of refreshing your page, try running the following command in your terminal with HTTPie.

```
http http://localhost:3000/nothinghere
```

You should see the status code in the headers. Moving forward, let's move away from the browser and instead use the terminal to test out our routes.

<br>
## URL Parameters

What if we want to create an app that can dynamically say hello to anyone?

* Using **url parameters**, add a dynamic route to the application. This is indicated by `:` and the variable name you want to use. We'll use `:name` for the example below:

```javascript
app.get('/hello/:name', function (req, res) {
  console.log(req.params);
  res.send('Hello, ' + req.params.name + '!');
});
```

Now make a request against the route like so:

```
http http://localhost:3000/hello/friend
```

You should receive the string "Hello, friend!" in your response (or, whatever name you put) to your request. If you look at the terminal tab where your server is running with nodemon, you should see the following line towards the bottom of the output:

```
{ name: 'friend' }
```

Here we are seeing the first introduction to parameters that the application can identify. In the following route `:name` is considered a route parameter. We can access all params access the params property on the request object: `req.params`.

<br>
### Exercise

Replace that route with a new one that hangs off of the `/vegetables` route. This route will take a single parameter, `:id` and return the vegetable at that index. For example:

```
http http://localhost:3000/vegetables/1
>> "Cucumber"
```

```
http http://localhost:3000/vegetables/14
>> "No vegetable found."
```

<br>
## Query Parameters

Generally, you don't want to cram everything into a route. Just imagine when there are multiple parameters in route. Maybe we don't care about getting the order of the parameters correct. To solve this problem, we can use **query parameters** with each request.

Let's see query params in action. Go to [https://google.com/search?q=puppies](https://google.com/search?q=puppies)

* `?` denotes the beginning of the query parameters
* `=` indicates an assignment; anything to the left is the key, while the right represents the value
* `&` allows for the input of multiple parameters, separating each key / value pair

Let's add our first route to practice query params.

```javascript
app.get('/hi', function (req, res) {
  var name = req.query.name;
  res.send('Hello, ' + name + '!');
});
```

Now try making a request to that route with a query parameter, like so:

```
http http://localhost:3000/hi?name=friend
```

You should receive "Hello, friend!" from the above request.

<br>
### Exercise

Let's add the ability to search through all of our vegetables by name. We're going to add to the `/vegetables` route and, if there is a query param with a key of 'search', we'll _filter_ through our vegetables and only return those where the search string is contained in the vegetable name. This search should be case insensitive. For example:

```
http http://localhost:3000/vegetables?search=c
>> ["Carrots", "Cucumbers"]

http http://localhost:3000/vegetables?search=cu
>> ["Cucumbers"]

http http://localhost:3000/vegetables?search=a
>> ["Carrots", "Peas"]
```
