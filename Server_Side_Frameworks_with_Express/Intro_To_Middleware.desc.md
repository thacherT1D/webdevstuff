An Express application is essentially a series of middleware function calls. Express middleware is a callback function that has access to the request object (`req`), the response object (`res`), and sometimes the next middleware callback (`next`).

Middleware functions **can** execute any JavaScript operation inside the callback function. However, middleware **must** either end the request/response cycle with `res.send()` or call the next middleware callback with `next()`.

* [The Middleware Flow](#the-middleware-flow)
* [Getting Started](#getting-started)
* [Logging with Custom Middleware](#logging-with-custom-middleware)
* [Body Parsing with Custom Middleware](#body-parsing-with-custom-middleware)

By adding middleware to our applications, we are able to make our code more functional and modular.

<hr style="margin: 5rem 0;"/>

## The Middleware Flow

Express middleware allows an application's shared code to be organized into in a series of middleware callbacks. These callbacks can be reused in a flexible way.

![middleware](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/66/middleware-1.png)

<hr style="margin: 5rem 0;"/>

## Getting Started

Let's start by creating a simple **Express** application. Go into your Unit 2 directory and then:

```bash
mkdir intro-to-middleware
cd intro-to-middleware
touch app.js
npm init
git init
echo "node_modules" > .gitignore
git add .
git commit -m "Initial commit."
```

Now you can install the packages you need running

```bash
npm install --save express nodemon
```

Finally, do the following:

1. Add a new script called "dev" that runs your `app.js` file with nodemon.

1. Add the following to your `app.js` file:

  ```js
  var express = require('express');
  var app = express();

  // your code will go here...

  app.listen(3000);
  ```

Our very basic setup is now complete!

<br>
### Exercise

We're going to build an API that allows us to act like bouncers to a very exclusive party. We'll need three routes: one that gets us all the guests currently at the party, another that allows us to let in a new person, and another that lets us kick rowdy guests.

To complete this, do the following:

1. Add the following line to your `app.js`:

  ```js
  var guests = [
    { preferredName: 'Sergey', lastName: 'Brin', company: 'Google', vip: true },
    { preferredName: 'Larry', lastName: 'Page', company: 'Google', vip: true },
  ];
  ```

1. Add a GET route at '/guests' that returns a status code of 200 and the full list of guests.

1. Add a POST route at '/invite' that takes information from the body of the request and adds it into the guests array. It should return a 201 status code and nothing else.

1. Add a DELETE route at '/kick/:company' that removes anyone from that company (case insensitive). It should return a 200 OK status and an array of all the removed guests. (Don't worry, we'll add more specificity so we can kick certain individuals soon!)

The following commands should work:

```bash
http GET http://localhost:3000/guests
http POST http://localhost:3000/guests preferredName="Mark" lastName="Zuckerberg" company="Facebook" vip="true"
http DELETE http://localhost:3000/guests/google
```

Make sure after adding a new guest you can GET the guests again and the new guest is included. What do you notice about the vip value? If you kick out guests from a company that isn't at the party, what happens?

<hr style="margin: 5rem 0;"/>

## Logging with Custom Middleware

We're going to start by building **Application Level** middleware. This means we'll be writing functions that will apply to every single one of our routes. This can be useful to do if we want some functionality to apply across the board to our APIs.

Let's begin by adding some helpful logging to our application. Right now, whenever we make requests it's completely hidden in our terminal -- we have no log on who is coming in and who's leaving the party.

Try adding the following code above all of your routes:

```js
app.use(function (req, res, next) {
  var start = new Date();
  next();
  var end = new Date();
  console.log(req.method, req.url, end - start, 'ms');
});
```

Try hitting one of your routes now and go back and look at the terminal tab where your server is running. You're now logging all of your requests!

Let's walk through each step of what is happening:

1. `.use` is a method attached to our express application.

1. It can take [two more more arguments](http://expressjs.com/en/api.html#app.use) but, when just given a callback function, it takes a request, response, and next just like our routes.

1. We set up a start time by creating a new Date object which defaults to the current time.

1. We then immediately call `next()` which fires the next function in the chain. In the case of our GET request, this function first gets called after which we then call the callback inside our GET route.

1. After the following function is called, we log the end time and then log certain information to our console.

Try moving the `app.use` statement below your first route. What happens when you hit that route now?

<br>
### Exercise

Let's step up our logging game a notch. There's a fun npm package called [colors](https://www.npmjs.com/package/colors) which allows us to log out text in all kinds of different colors. Install this package, require it at the top of your file, and then do the following:

1. If it's a GET request, the text that gets printed to the terminal should be **green**.

1. If it's a POST request, the text that gets printed to the terminal should be **cyan**.

1. If it's a DELETE request, the text that gets printed to the terminal should be **red**.

1. If the requests takes longer than 10ms, **underline** the text.

<br>
### Replacing with Morgan

We now have a good idea of how to build our own logging system. We'd probably want to add a ton more features to this to make it more robust. Instead, let's use the [morgan](https://www.npmjs.com/package/morgan) package which allows us to do everything we've done above and more!

_I would remove the above code and/or add a comment with a link to this article. This can serve as a good example of complex, application level middleware that you may want to reference!_

Let's first install morgan:

```bash
npm install --save morgan
```

Now you'll just need to add the following above all your routes:

```js
app.use(require('morgan')('tiny'));
```

Restart your server and watch as some logging comes through. Then take a few minutes to annotate what is happening on that single line.

<hr style="margin: 5rem 0;"/>

## Body Parsing with Custom Middleware

Getting the body out of our requests is pretty cumbersome currently. Each time we have to add multiple lines of code just to get the data out. Let's fix that by moving that code into its own Application Level Middleware.

Below where we just added morgan, add the following function:

```javascript
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
```

Take a few minutes to read through the above code to understand what's happening. If there is a POST body, how can we access it in our routes?

<br>
### Exercise

Refactor your current POST request to use this middleware function. There should be no `req.on`s inside your POST route now!

<br>
### Replacing with body-parser

This common need has been put into a package as well! Let's install [body-parser](https://www.npmjs.com/package/body-parser) and put it to use.

```bash
npm install --save body-parser
```

Then, with your other applicaiton level middleware:

```javascript
app.use(require('body-parser').json());
```

Take a moment to read the above line and understand what it's doing. What do you think `.json()` is doing?

<hr style="margin: 5rem 0;"/>

## Route Specific Middleware

What if we want to add middleware for just a specific route? Express makes it very easy to do that as well. Let's begin by first solving a problem we have with our code right now and then we'll extract it into middleware.

<br>
### Exercise

Remember the problem we had earlier where if we invite a new guest their VIP status is set as a string instead of a boolean? This is an instance where we need to clean up our data a bit before we actually add it to our ~~database~~ data structure. We also probably shouldn't allow for people to simply add whatever they want. For example, try the following:

```bash
http POST http://localhost:3000/invite species="horse" name="BoJack" age=52
```

That's... not great. Now any washed up TV star can come into our exclusive party. Furthermore, we can't actually kick them out if they don't have a company associated with them!

To fix this, add the following to your POST route:

1. Check that the request body has only the following fields: preferredName, lastName, vip, and company. If any of those fields are not present in the body, respond with a status code of 422 and nothing else.

1. For the vip field in particular, change the associated value to an appropriate boolean.

<br>
### Adding UUIDs via Middleware

Now that your guests are being validated as they come in, we're ready to extract some of that code to middleware. You've probably noticed that your POST route is already getting quite bloated and we've only done a few checks!

Let's start by adding UUIDs to our guests. [Universal Unique Identifiers](https://en.wikipedia.org/wiki/Universally_unique_identifier) are unique IDs that long strings of numbers and letters. While it is possible that they would randomly generate a collision, it is highly unlikely.

Let's first install the [node-uuid](https://www.npmjs.com/package/node-uuid) package to generate a UUID.

```bash
npm install --save node-uuid
```

Next, let's add the following function somewhere at the top of your file. This function will take our `req.body` if there is one and simply add a new key called id to it and generate a random UUID.

```js
var uuid = require('node-uuid');

function addUUID (req, res, next) {
  if ( req.body ) {
    req.body.id = uuid.v1();
  }

  next();
};
```

Take a minute to add random IDs to the guests you have when you first start your server using only the uuid package.

Go to your POST route and simply change the following inside of the `app.get` method:

```js
app.post('/invite', addUUID, function (req, res, next) {
  // your code
});
```

We've added our `addUUID` function as middleware to just this route! All of our application level middleware will first be run and then the chain of middleware on the `/invite` route will fire. Try inviting a new guest and then viewing the guests again. You should see the ID automatically added!

<br>
### Exercise

You now have all the tools to create your own middleware for a specific route. To finish this lesson, make sure you've done the following:

1. First, begin by updating the `/kick` route to look for an :id instead of a :company. Since there should only be one guest per ID, make sure to return an object instead of an array!

1. Extract all the code that is validating your body into a separate function and add it as middleware to your POST route.

1. Move your initial guests into a separate file called `data.js`. Require that file in your `app.js` and use it as needed.

1. Move your middleware functions into a separate file called `middleware.js`. Require that file in your `app.js` and use it as needed.

<hr style="margin: 5rem 0;"/>

## Resources

[Express - Using Middleware](http://expressjs.com/en/guide/using-middleware.html)

<br>
### Stretch Goals

Want to add more? Try the following:

1. Add a required field in the POST body called 'password'. Set a password on your server and if the password doesn't match, the guest can't come in!

1. Add the ability to add a 'vip' query parameter to the GET route. If the query parameter is present (no matter the value), only show the vip guests at the party.

1. Instead of adding invited guests directly to the guest list, add them to a separate data structure called `invited`. Add a new GET route called `/waiting-approval` that returns this list. Then, add a new POST route called `/approve/:id` where the ID matches someone in the invited list. If they are approved, they then can go into the guest list.
