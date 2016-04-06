## Overview
This learning experience should prepare you to use middleware to provide fine-grained access control to clients, and organize your authentication and authorization code.

## Objectives

1. Describe what Express middleware is and how next() works.
1. Use application-level middleware to redirect all unauthenticated requests to all routes that appear "after" that middleware.
1. Use middleware sub-stacks to redirect all unauthorized requests to all routes that use that middleware.
1. Draw a middleware chain when given an express app (including both application-level and route-level middleware).


### Key Terms

**Authentication** (Who is the client)

- This refers to the process by which a server identifies a client. This happens through logging in.

**Authorization** (What can the client access)

- This refers to the process by which a server decides what a client can access. This controls who can see what.

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

**NOTE:*** When using `next()` you can change the mount path by including the new path inside your invocation of next. It looks like this:

```javascript
app.get('home', (req, res, next) => {
	next('index');
});
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

Each instance of middleware is referred to as a mount point. Here is an example of a mount point:

```javascript
app.get('/home', (req, res, next) => {
	res.send("app.get is a mount point");
});
```
Each mount point contains one or more callback functions. When there is more than one callback function inside of a mount point, this is referred to as a sub-stack. Sub-stacks are called sequentially using the `next()` function. Here is an example of a sub-stack:

```javascript
app.get('/home', (req, res, next) => {
  next();
},
(req, res, next) => {
	res.send("this function gets called after the first callback");
});
```
Additionally, externally defined functions can be referenced as sub-stacks. These can provide optional functionality that can be folded into multiple mount points. Here is an example:

```javascript
var idChecker = (req, res, next) => {
  if (req.body.id === '0') {
    res.render('index');
  } else {
    next();
  }
}
app.get('/:id/home', idChecker, (req, res, next) => {
  res.send("this function gets called after idChecker if req.body.id is not 0");
});

app.get('/:id/profile', idChecker, (req, res, next) => {
  res.send("this function gets called after idChecker if req.body.id is not 0");
});
```


#### Routes are middleware

```javascript
// in app.js
app.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});

// Similar to...

// in routes/index.js
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});
```

```javascript
// in routes/index.js
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Express' });
});
module.exports = router;

// -------------------------------

// in app.js
var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);

```

**`GET /about`**  
```javascript
router.use(function f1 (req, res, next) {
	next()
});

router.get('/about', function f2 (req, res, next) {
	res.send('here')
});

router.use('/about', function f3 (req, res, next) {
	res.send('over')
});

router.get('/other', function f4 (req, res, next) {
	res.send('not here')
});

```

**`GET /other`**  
```javascript
router.use(function f1 (req, res, next) {
	next()
});

router.get('/about', function f2 (req, res, next) {
	res.send('skips')
});

router.use('/about', function f3 (req, res, next) {
	res.send('here')
});

router.get('/other', function f4 (req, res, next) {
	res.send('not here')
});

```

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
