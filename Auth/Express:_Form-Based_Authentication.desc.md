This article covers most of the basic ideas you need to understand if you want users to be able to log in to your application. How often will you implement authentication from scratch in a job? Not often, at least as a junior developer.

So why do we teach it? Because it touches on a number of *hugely* important topics and challenges you to combine them with things you already know. We'll be touching on CRUD, validations, cryptographic hashing, cookies, and sessions -- all of which are critically important for understanding how modern web applications work.

* [Objectives](#objectives)
* [Cryptographic Hashing](#cryptographic-hashing)
* [Cookies](#cookies)
* [Sessions](#sessions)
* [Authentication Overview](#authentication-overview)

You will need to watch all of these videos in order to understand the concepts at play when we do authentication.


<hr style="margin: 5rem 0;"/>

## Objectives

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


<hr style="margin: 5rem 0;"/>

## Cryptographic Hashing

<iframe src="https://player.vimeo.com/video/141284905?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

How do we secure our user data? Knowing this basic information well will put you above most developers in terms of security knowledge (unfortunately). Pay close attention to the information in this video, or you might cause your new employer to [show up on this list](https://haveibeenpwned.com/PwnedWebsites).  

<br>
### Resources

- [Hashing Security](https://crackstation.net/hashing-security.htm)
- [How to Safely Store a Password](http://codahale.com/how-to-safely-store-a-password/)
- [Don't just use bcrypt](http://www.unlimitednovelty.com/2012/03/dont-use-bcrypt.html)
- [bcrypt is great but...](https://blog.agilebits.com/2015/03/30/bcrypt-is-great-but-is-password-cracking-infeasible/)
- [OWASP Homepage](https://www.owasp.org/index.php/Main_Page)


<hr style="margin: 5rem 0;"/>

## Cookies

<iframe src="https://player.vimeo.com/video/141304889?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


<hr style="margin: 5rem 0;"/>

## Sessions

<iframe src="https://player.vimeo.com/video/141306923?byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


<hr style="margin: 5rem 0;"/>

## Authentication Overview

<iframe src="https://player.vimeo.com/video/141225092?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

This video is a great overview of how authentication is done in express.js. This video uses a different persistence layer, but the logic remains the same no matter what persistence layer you use. [Take a look at this example](https://github.com/gSchool/form-auth-with-express-knex-pg-bcrypt) for one using a more familiar persistence layer.
