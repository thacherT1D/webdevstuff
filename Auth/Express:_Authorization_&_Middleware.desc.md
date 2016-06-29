### Entry Ticket
In order to get this most out of this Learning Experience, you'll need to be comfortable with the following:

* [Express](http://expressjs.com/en/4x/api.html)
* [express.Router()](http://expressjs.com/en/4x/api.html#router)
* [Express Middleware](http://expressjs.com/en/4x/api.html#app.use)
* [response.render()](http://expressjs.com/en/4x/api.html#res.render)
* [response.redirect()](http://expressjs.com/en/4x/api.html#res.redirect)
* [dotenv](https://www.npmjs.com/package/dotenv)

### Objectives

* Describe difference between authentication and authorization
* Explain key ideas about how Cookies work
* Describe how cookies are transferred
* Read and write cookies in express
* Authenticate a user using information from a form
* Use best practices to secure your user's data from attackers
* Describe common attacks targeted at insecure web applications
* Validate input from a form on the server
* Use sessions to keep a user authenticated
* Keep private keys and other secure data in your `.env` file



### Key Terms

**Authentication**

**Authorization**

**Cryptographic Hashing**

**Cookies**

**Session**


### Overview
This learning experience covers most of the basic ideas you need to understand if you want users to be able to log in to your application.

How often will you implement authentication from scratch in a job?  Not often, at least as a junior developer.

So why do we teach it?  Because it touches on a number of *hugely* important topics and challenges you to combine them with things you already know.  Things you'll touch on while learning to implement form-based authentication are:

- CRUD (creating users)
- Validations (displaying error messages like "invalid email / password")
- Cryptographic hashing
- Cookies and sessions

You will need to watch all of these videos in order to understand the concepts at play when we do authentication.

## Video #1 - Authentication Overview

<iframe src="https://player.vimeo.com/video/141225092?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

This video is a great overview of how authentication is done in express.js. This video uses a different persistence layer, but the logic remains the same no matter what persistence layer you use. [Take a look at this example](https://github.com/gSchool/form-auth-with-express-knex-pg-bcrypt) for one using a more familiar persistence layer.

#### Resources

- [Form Authentication with Express, Knex, pg and Bcrypt](https://github.com/gSchool/form-auth-with-express-knex-pg-bcrypt)

## Video #2 - Cryptographic Hashing

<iframe src="https://player.vimeo.com/video/141284905?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

How do we secure our user data? Knowing this basic information well will put you above most developers in terms of security knowledge (unfortunately). Pay close attention to the information in this video, or you might cause your new employer to [show up on this list](https://haveibeenpwned.com/PwnedWebsites).  

#### Resources

- https://crackstation.net/hashing-security.htm
- http://codahale.com/how-to-safely-store-a-password/
- http://www.unlimitednovelty.com/2012/03/dont-use-bcrypt.html
- https://blog.agilebits.com/2015/03/30/bcrypt-is-great-but-is-password-cracking-infeasible/
- https://www.owasp.org/index.php/Main_Page

## Video #3 - Cookies

<iframe src="https://player.vimeo.com/video/141304889?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Let's practice what we just learned. **Do this, because we're going to build on it after the next video**.

Create a new directory, and generate an express app with `express cookieExample`. Then `git init` in that folder, of course. Add `node_modules` to your `.gitignore`, and then `npm install`. Then, commit all files.  

The express generator installs the `cookie-parser` module for you already, and you can find it being added to your app on **line 22**.  

In your `./routes/index.js` file, we're going to set a cookie, and then read that cookie.

```javascript
router.get('/', function(req,res,next){
	res.cookie('views',parseInt(req.cookies.views || 0) + 1);

	res.render('index', { title: 'Express', views: (req.cookies.views || 0)});
});

```

Then, go to your `./views/index` and add the `views` variable to your template.

***Jade***
```
p You have been to this page #{views} times.
```

***EJS***
```
<p>You have been to this page <%=views%> times.</p>
```

Now, using the instructions in the video above, **do the following**:

- Using `res.clearCookie()`, create a route, and link on the homepage, that clears that cookie, then redirects the user back to the homepage.

- Upgrade your cookies to be more secure, by ensuring they are *signed*, *secure*, and *http only*.


#### Resources

- https://en.wikipedia.org/wiki/HTTP_cookie
- https://www.npmjs.com/package/cookie


## Video #4 - Sessions

<iframe src="https://player.vimeo.com/video/141306923?byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Now we're going to use the techniques described in the above video to use sessions instead of cookies.

Open up the project we generated after the Cookies video.

First, `npm install cookie-session`. Then require it in your `app.js` file.

* Put the `cookieSession` middleware in your app.
* Configure the `cookieSession` middleware by giving it a `name` key, and adding some keys to the `keys` array.
* Change all references to `req.cookies` or `res.setCookie()` to use the `req.session` object instead.
* Get your keys from your `.env` file, instead of comitting them to your code.


#### Resources

Generating random strings in Node:

```
node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });"
```

- [Cookie Sessions](https://github.com/expressjs/cookie-session)

## Examples

[Form-based Authentication with `pg` and `knex`](https://github.com/gSchool/form-auth-with-express-knex-pg-bcrypt/)


## Assignment
This assignment should take you about 2 hours to complete.  

[Express Authentication with Forms](https://github.com/gSchool/authentication-in-express)

## Reflect

### Self-Assessment

How’d you do? Go back to the "Objectives" section. Go through each one and ask yourself:

- Have I completed this objective?
- What concrete evidence do I have that I've completed the objective?

Rate yourself 1 through 4 for each objective in terms of competence (4 being the highest). If you rate yourself a 2 or below, please notify an instructor for additional help.

Go to the "Key Terms" section.  For each term, ask yourself:

- What is my explanation for this term?

If you haven't completed an objective, or you can't define a term, take a few minutes to try to fill in any gaps.

### Entry Ticket
In order to get the most out of this Learning Experience, you'll need to be comfortable with the following:

* [Cookies](https://coursework.galvanize.com/curriculums/6/learning_experiences/21)
* [Express](http://expressjs.com/en/4x/api.html)
* [express.Router()](http://expressjs.com/en/4x/api.html#router)

### Objectives

* Use application-level middleware to redirect all unauthenticated requests to all routes that appear "after" that middleware
* Use middleware sub-stacks to redirect all unauthorized requests to all routes that use that middleware
* Describe what Express middleware is and how next() works
* Draw a middleware chain when given an express app (including both application-level and route-level middleware)

### Key Terms

**Authentication**  
This refers to the process by which a server identifies a client
**Authorization**  
This refers to the process by which a server decides what a client can access

### Overview
This learning experience should prepare you to provide fine-grained access control to clients, and organize your authentication and authorization code.

Watch the 3 videos below and complete the following repo:

https://github.com/gSchool/express-middleware-practice

## Overview of Authorization

<iframe src="https://player.vimeo.com/video/137020748?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Examples from the video:

With Mongo:

```javascript
router.get('/articles/:id/edit', function(req, res, next){
	Article.find({_id: req.params.id}).then(function (article) {
		if (req.session.userId === article.creatorId) {
		res.render('edit', {article: article})
		} else {
			res.redirect('/signin')
		}
	})
});
```

With Knex/Postgres:

```javascript
router.get('/articles/:id/edit', function(req, res, next){
	knex('articles').where({id:req.params.id}).then(function (article) {
		if (req.session.userId === article.creatorId) {
		res.render('edit', {article: article})
		} else {
			res.redirect('/signin')
		}
	})
});
```

### Further Reading
[Express Middleware](http://expressjs.com/en/guide/using-middleware.html) - Helpful if you find yourself asking, "what is middleware?"

## Middleware Theory

<iframe src="https://player.vimeo.com/video/137023216?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

#### Examples from the video:

#### Mount Paths

```javascript
// will apply to 100% of all requests
app.use(function f1(req, res, next) {
	next()
})

// will only apply to requests to /about
app.use("/about", function f2(req, res, next) {
	res.send("here")
})

// will only apply to requests to /users
app.use("/users", function f3(req, res, next) {
	res.send("here")
})

```

#### HTTP Verbs (methods)

```javascript
// will apply to 100% of all requests
app.use(function f1(req, res, next) {
	next()
})

// will only apply to POST requests to /about
app.post("/about", function f2(req, res, next) {
	res.send("here")
})

// will only apply to GET requests to /users
app.get("/users", function f3(req, res, next) {
	res.send("here")
})

```

#### next()

```javascript
app.use(function f1(req, res, next) {
	next()
})

app.use(function f2(req, res, next) {
	res.send("here")
})

app.use(function f3(req, res, next) {
	res.send("not here")
})

```

#### next() matches mount path

```javascript
app.use('/about', function f1(req, res, next) {
	next()
})

app.use('/foo', function f2(req, res, next) {
	res.send("not here")
})

app.use('/about', function f3(req, res, next) {
	res.send("here")
})

```

#### next() matches method

```javascript
app.get('/about', function f1(req, res, next) {
	next()
})

app.post('/about', function f2(req, res, next) {
	res.send("not here")
})

app.get('/about', function f3(req, res, next) {
	res.send("here")
})

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


## Middleware for Authentication / Authorization

<iframe src="https://player.vimeo.com/video/137031433" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Assignments
* [Express Middlware Practice](https://github.com/gSchool/express-middleware-practice)

## Resources

* http://alexperry.io/javascript/2015/08/06/what-is-express-middleware.html
