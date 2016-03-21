### Middleware

[What is middleware?](http://expressjs.com/guide/using-middleware.html)

<img src="http://media.developeriq.in/images/nodeexpress_2_9_2015_1.png">

### Adding Assets

Let's install our first middleware. With our Express application we want to be able to serve assets **javascripts**, **stylesheets**, and **images**. By convention we generally put all these into a `public/` directory in our project.

`app.use(express.static(__dirname + "/public"))`

Now we can make subfolders in our `public` folder for our assets.

[Why use dirname?](http://stackoverflow.com/questions/16727045/node-js-express-js-relative-paths-dot-or-dirname-or-without-any-prefix)

Also, note that we've used two different methods on `app` in our js file: `app.set` and `app.use`. The former is often used to set Express application settings; the latter is used to explicitly call different pieces of middleware. You can check out the [Express documentation]() for more on the difference between the two. 

```
mkdir public/javascripts
mkdir public/stylesheets
mkdir public/images

touch public/stylesheets/app.css
```

Inside of our `app.css` we can add some style for the body of our app.

```
body {
  background-color: red;
  color: white;
}
```


Then we just add a `link` tag in our `view` files. 

Note that without using `express.static`, your static files won't be found! If you're curious, check out the Network tab in Chrome to see what happens when you include `express.static` vs. when you don't.

[How does static file serving really work?](http://stackoverflow.com/questions/18900990/express-js-node-js-how-does-static-file-serving-really-work)

### PUPPIES!

https://github.com/gSchool/express_intro_exercise

### Body-Parser

Let's install our next middleware. It's called `body-parser` and it will parse the body of a request being sent to us by the browser when a form is submitted.

As we've seen, the way to capture form values using a `GET` request is through `req.query`

`npm install --save body-parser`

Aside: Why do we use the `--save` flag? To see what this flag does, let's check out some documentation. Type `npm help install` into the console.

Next, we need to integrate it into the application. 

```
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
```

The `app.use` statement is telling our application to literally use the `body-parser` library before it moves onto route the request.

Now that we have the above setup we can create a `post` route to use the `body` params submitted by the form.

Order matters! What happens if you put your `app.use` statement after your routing logic?

### MORE PUPPIES!

Refactor your puppies app so that new puppies are created with a `POST` request, not a `GET` request. 

### Method Override

Unfortunately, HTML forms by default will only allow us to GET and POST. What happens when we want to update or delete? In order to do that, we first need to introduce two new HTTP verbs and describe how the `method-override` middleware works.

`PUT` - used for modifying a resource

`DELETE` - used for removing a resouce

In order to use `PUT` and `DELETE` we need to first install method override using `npm install --save method-override` and include these lines in our `app.js`

```
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
```

If we want to use a put request, we now specify it as a part of the query string in our forms:

```
<form action="/books/<%= book.id%>?_method=put" method="POST">
```

We still need to make sure we are using a method of POST in the form, and in our app.js we will need to use `app.put` or `app.delete` to ensure the correct routes are targeted. We do this since HTML forms don't accept `PUT` or `DELETE` methods by default.
