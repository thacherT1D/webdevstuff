<div class="alert alert-info">
  We are currently transitioning this Learning Experience from Mongo to SQL/Knex.  Even though some videos reference Mongo, we recommend using SQL/Knex.
</div>

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
* Describe how cookies are transfered
* Read and write cookies in express
* Authenticate a user using information from a form
* Use best practices to secure your user's data from attackers
* Describe common attacks targeted at insecure webapps
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
