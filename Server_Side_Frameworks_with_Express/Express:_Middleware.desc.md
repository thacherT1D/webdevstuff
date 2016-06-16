#Express: Middleware

##Objectives:

- Describe what middleware is and its role in Express
- List the three parameters that every piece of middleware is passed
- List two examples of middleware
- Use Body Parser to handle POST requests


##[What is middleware?](http://expressjs.com/guide/using-middleware.html)
> "Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.""

<img src="http://media.developeriq.in/images/nodeexpress_2_9_2015_1.png">

##Setting up
[Express Middleware](https://github.com/micah-eberhard/middleware_exercise)
- Fork and Clone the repository for Express Middleware. Once you have your own copy, follow along and install these modules throughout the rest of the current article as necessary when completing the exercises.


### Adding Assets

Let's install our first middleware. With our Express application we want to be able to serve assets **javascripts**, **stylesheets**, and **images** etc... By convention we generally put all these into a `public/` directory in our project.

`app.use(express.static(__dirname + "/public"))`

Now we can make files and folders in our `public` folder for assets.

[Why use dirname?](http://stackoverflow.com/questions/16727045/node-js-express-js-relative-paths-dot-or-dirname-or-without-any-prefix)

Also, note that we've used two different methods on `app` in our js file: `app.set` and `app.use`. The former is often used to set Express application settings; the latter is used to explicitly call different pieces of middleware. You can check out the [Express documentation](http://expressjs.com/) for more on the difference between the two.

Note that without using `express.static`, your static files won't be found! If you're curious, check out the Network tab in Chrome to see what happens when you include `express.static` vs. when you don't.

[How does static file serving really work?](http://stackoverflow.com/questions/18900990/express-js-node-js-how-does-static-file-serving-really-work)

### Body-Parser

[docs](https://www.npmjs.com/package/body-parser)
Let's install our next middleware. It's called `body-parser` and it will parse the body of a request being sent to us by the browser when a form is submitted.

As we've seen, the way to capture form values using a `GET` request is through `req.query`

`npm install --save body-parser`

Next, we need to integrate it into the application.

```
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
```

The `app.use` statement is telling our application to literally use the `body-parser` library before it moves on to route the request.

Now that we have the above setup we can create a `post` route to use the `body` params submitted by the form.

Order matters! What happens if you put your `app.use` statement after your routing logic?

## Exercises

[Express Middleware](https://github.com/micah-eberhard/middleware_exercise)

Reading (Optional): [Resource Naming](http://www.restapitutorial.com/lessons/restfulresourcenaming.html)
