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

To get started, fork/clone the [Form Based Authentication](https://github.com/gSchool/form-based-authentication) repo.


## Video #1 - Cryptographic Hashing

<iframe src="https://player.vimeo.com/video/141284905?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

How do we secure our user data? Knowing this basic information well will put you above most developers in terms of security knowledge (unfortunately). Pay close attention to the information in this video, or you might cause your new employer to [show up on this list](https://haveibeenpwned.com/PwnedWebsites).  

Follow instructions on the [Form-Based Authentication](https://github.com/gSchool/form-based-authentication) repo for the encryption routes. 


#### Resources

- https://crackstation.net/hashing-security.htm
- http://codahale.com/how-to-safely-store-a-password/
- http://www.unlimitednovelty.com/2012/03/dont-use-bcrypt.html
- https://blog.agilebits.com/2015/03/30/bcrypt-is-great-but-is-password-cracking-infeasible/
- https://www.owasp.org/index.php/Main_Page


## Video #2 - Cookies

<iframe src="https://player.vimeo.com/video/141304889?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Follow instructions on the [Form-Based Authentication](https://github.com/gSchool/form-based-authentication) repo for the cookies routes. 


#### Resources

- https://en.wikipedia.org/wiki/HTTP_cookie


## Video #3 - Sessions

<iframe src="https://player.vimeo.com/video/141306923?byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Follow instructions on the [Form-Based Authentication](https://github.com/gSchool/form-based-authentication) repo for the sessions routes.


#### Resources

Generating random strings in Node:

```
node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });"
```

- [Cookie Sessions](https://github.com/expressjs/cookie-session)


## Video #4 - Authentication Overview

<iframe src="https://player.vimeo.com/video/141225092?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

This video is a great overview of how authentication is done in express.js. This video uses a different persistence layer, but the logic remains the same no matter what persistence layer you use. [Take a look at this example](https://github.com/gSchool/form-auth-with-express-knex-pg-bcrypt) for one using a more familiar persistence layer.

Follow instructions on the [Form-Based Authentication](https://github.com/gSchool/form-based-authentication) repo for the auth routes. 

#### Resources

- [Form Authentication with Express, Knex, pg and Bcrypt](https://github.com/gSchool/form-auth-with-express-knex-pg-bcrypt)


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
