## Overview
This learning experience should prepare you to use middleware to provide fine-grained access control to clients, and organize your authentication and authorization code.

## Objectives

1. Describe what Express middleware is and how next() works.
1. Use application-level middleware to redirect all unauthenticated requests to all routes that appear "after" that middleware.
1. Use middleware sub-stacks to redirect all unauthorized requests to all routes that use that middleware.

### What is Express middleware and how does `next()` work?

Express middleware functions are callbacks that are defined by routes and have access to the request object (`req`), the response object (`res`), and sometimes the next middleware callback (`next()`).

Middleware functions can execute any JavaScript operation inside the callback function. They can:

- Read and modify the req and res objects.
- Read and write to a file or database.
- Send HTTP requests to other servers.
- and can execute any other javascript code.

However, it is notable that middleware **must** either end the request/response cycle (with, for example `res.send()`) or call the next middleware callback (with, for example `next()`). **If you fail to do this, your Express app will hang and not resolve.**

The `next()` function calls the next function in express with a matching route. Routes are matched in Express by matching:

1. The path
1. The method

```
In your own words, write down how Express middleware works and how next() is used in combination with Express.
```

Below are some examples of next() that you will also see in the video.

#### `next()`

```javascript
app.use((req, res, next) => {
  next();
})

app.use((req, res, next) => {
  res.send("here");
})

app.use((req, res, next) => {
  res.send("not here, why not?");
})

```

#### `next()` matches the mount path

```javascript
// will apply to 100% of all requests and will pass on with 'next()'
app.use((req, res, next) => {
  next();
});

// will only apply to requests to '/about' and will pass on with 'next()'
app.use("/about", (req, res, next) => {
  next();
});

// will only apply to requests to '/users' and will end with 'res.send()'
app.use("/users", (req, res) => {
  res.send("here");
});
```

```javascript
app.use('/about', (req, res, next) => {
  next()
})

app.use('/foo', (req, res, next) => {
  res.send("not here, why not?")
})

app.use('/about', (req, res, next) => {
  res.send("here");
});
```

#### next() matches the method

```javascript
// will apply to 100% of all requests
app.use((req, res, next) => {
  next();
});

// will only apply to POST requests to /about
app.post("/about", (req, res, next) => {
  res.send("here");
});

// will only apply to GET requests to /users
app.get("/users", (req, res, next) => {
  res.send("here");
});
```

```javascript
app.get('/about', (req, res, next) => {
  next();
});

app.post('/about', (req, res, next) => {
  res.send("not here, why not?");
});

app.get('/about', (req, res, next) => {
  res.send("here");
});
```
### Sub-stacks

Each instance of middleware is attached at a mount point. The mount point defines which routes the middleware is attached to:

```javascript
app.get('/home', (req, res, next) => {
  res.send("this middleware is mounted to GET requests to '/home'");
});
```

Each mount point contains one or more callback functions. When there is more than one callback function attached at a mount point, this is referred to as a sub-stack. Sub-stacks are called sequentially using the `next()` function. Here is an example of a sub-stack:

```javascript
app.get('/home', (req, res, next) => {
  next();
}, (req, res, next) => {
  res.send("this function gets called after the first callback");
});
```

**NOTE:*** If you call `next()` within a sub-stack it will pass into and call the next callback in the current mount point, however, you can access the next mount point path immediately by including the string 'route' inside your invocation of next. It looks like this:

```javascript
app.get('home', (req, res, next) => {
  next('route');
}, (req, res, next) =>{
  res.send("This callback won't be called as route passes out to the next mount path");
});

app.get('home', (req, res, next) => {
  res.send("next('route') passes the 2nd callback above and down into this callback");
});
```

_Any other argument passed to `next()` will be treated as an error. Misspelling 'route' will trigger an error, for example!_

Additionally, externally defined functions can be referenced as sub-stacks. These can provide optional functionality that can be folded into multiple mount points. Here is an example:

```javascript
var idChecker = (req, res, next) => {
  if (req.params.id === '0') {
    res.render('index');
  } else {
    next();
  }
}

app.get('/:id/home', idChecker, (req, res, next) => {
  res.send("this function gets called after idChecker if req.params.id is not 0");
});

app.get('/:id/profile', idChecker, (req, res, next) => {
  res.send("this function gets called after idChecker if req.params.id is not 0");
});
```

```
Discuss what sub-stacks are and when they might be useful with your neighbor.
```

### Auth vs Auth

Authorization and authentication serve very different functions, but they can be confused easily because of the similarity of their names and the fact that both deal with, and are central to, security design.

**Authentication** (Who are you)
- This refers to the process by which a server identifies a client.

**Authorization** (What can you access)
- This refers to the process by which a server decides what a client can access.

Today, we are focusing on authorization.

### Application-level & sub-stack middleware as authorization

Because of the way that Express manages ordering callbacks it is common to see authorization managed in 2 ways, on the router or as a sub-stack in a specific mount point.

In order to show these 2 patterns, please fork and clone this repo:
[Express-Middleware-Auth](https://github.com/gSchool/express-middleware-auth)
From the project directory you will need to run:

```bash
npm install
createdb form-based-auth
knex migrate:latest
knex seed:run
nodemon
```

This should create a functional form-based authentication app that we can set up authorization for.

Our 3 seeded users emails are `user1@test.com`, `user2@test.com`, and `user3@test.com`. The associated passwords are simply `user1`, `user2`, and `user3`, respectively. Feel free to create your own user if you prefer.

#### **Pattern 1: Application- and router-level authorizations**

Let's begin by building a router-level authorization. This will ensure that all routes inside the specific router have been authorized. In this case we will only allow signed in users to see the regularStuff page. Insert the following code into the `routes/stuff.js` file below the `const router = express.Router();` but above all the mount points:

```javascript
router.use((req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
});
```

You should find that with this in place, any user can access the stuff routes (`/:id/regularStuff` and `/:id/specialStuff`) if they are signed in.

#### **Pattern 2: Sub-stack authorization**

Now lets use another pattern to limit the `/:id/specialStuff` route so only the specifically signed in user can see their specialStuff page. Insert the following code into your `routes/stuff.js` file:

```javascript
function myAccountRequired(req, res, next) {
  if (req.session.user.id.toString() === req.params.id) {
    next();
  } else {
    res.redirect('/');
  }
}
```

Then update your `specialStuff` mount point to include the `myAccountRequired` callback as the first callback:

```javascript
router.get('/:id/specialStuff', myAccountRequired, (req, res, next) => {
  res.render('users/specialStuff');
});
```

Now you should find that the signed in user has authorized access only to their specific 'specialStuff' page, while any signed in user is authorized to access any users's regularStuff page. This is the power of authorization and allows developers to provide very specific access.

### Final note: Cookies

Our assignment will require us to use cookies with the `cookieParser()` module. This module will need to be required in, and included in order to access it's funcitonality. To set a cookie you can include `res.cookie('someKey', [someValue])` into a request. To remove a cookie you can include `res.clearCookie('someKey')` in a request. Finally, once you have set a cookie, you can access the value of that cookie using `req.cookies.someKey`.

Watch the 3 videos below and complete the assignment below:

### Overview of Authorization

<iframe src="https://player.vimeo.com/video/137020748?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Middleware Theory

<iframe src="https://player.vimeo.com/video/137023216?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Middleware for Authentication / Authorization

<iframe src="https://player.vimeo.com/video/137031433" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Assignment
* [Express Middleware Practice](https://github.com/gSchool/express-middleware-practice)

#### Additional Resources

* [Express Middleware](http://expressjs.com/en/guide/using-middleware.html) - Helpful if you find yourself asking, "what is middleware?"

* http://alexperry.io/javascript/2015/08/06/what-is-express-middleware.html
