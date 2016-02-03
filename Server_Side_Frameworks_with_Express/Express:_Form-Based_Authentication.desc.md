<div class="alert alert-info">
  We are currently transitioning this Learning Experience from Mongo to SQL.  Even though these reference Mongo, we recommend using SQL.
</div>

https://github.com/gSchool/authentication-in-express

How often will you implement authentication from scratch in a job?  Not often, at least as a junior developer.

So why do we teach it?  Because it touches on a number of hugely important topics and challenges you to combine them with things you already know.  Things you'll touch on while learning to implement form-based authentication are:

- CRUD (creating users)
- Validations (displaying error messages like "invalid email / password")
- Cryptographic hashing
- Cookies and sessions

## Video #1 - Authentication Overview

<iframe src="https://player.vimeo.com/video/141225092?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## Video #2 - Cryptographic Hashing

<iframe src="https://player.vimeo.com/video/141284905?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

- https://crackstation.net/hashing-security.htm
- http://codahale.com/how-to-safely-store-a-password/
- http://www.unlimitednovelty.com/2012/03/dont-use-bcrypt.html
- https://blog.agilebits.com/2015/03/30/bcrypt-is-great-but-is-password-cracking-infeasible/

## Video #3 - Cookies

<iframe src="https://player.vimeo.com/video/141304889?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

- https://en.wikipedia.org/wiki/HTTP_cookie
- https://www.npmjs.com/package/cookie

## Video #4 - Sessions

<iframe src="https://player.vimeo.com/video/141306923?byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Generating random strings in Node:

```
node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });"
```

- https://github.com/expressjs/cookie-session

*TODO*

- demo tying it all together
  - validations
  - partials
  - middleware
