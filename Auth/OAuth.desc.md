## Objectives

- Explain what OAuth is.
- Explain why OAuth is important.
- Use OAuth to authenticate users.

## What's OAuth?

Before jumping straight into OAuth, let's refresh our memories on the definition of authentication versus authorization. **Authentication** is the process of confirming the identity of a user. When a user logs into a web application, that person is attempting to authenticate. On the other hand, **authorization** is the process of granting access to private information for an authenticated user. When a user successfully authenticates with an application, the server starts the authorization process by creating a token. Afterwards, the client includes the token, and not the user's password, in subsequent requests for private information on the server.

Understanding the different between the two is important because **OAuth** is an open standard for both authentication and authorization. With OAuth, a user can authenticate to your web application using an account from another service like Google, Facebook, Microsoft, Twitter, etc. Once authenticated, the user grants your web application permission to access their private information on that service. The credential representing the user's permission is called an **authorization grant**. When your web application receives an authorization grant, it verifies that grant with the service. If the grant is verified to be legitamate, the service issues your web application an **access token** which can be used to access the private information if and when your web application wants.

```text
+--------+                               +---------------+
|        |------ Authorization Request ->|   Resource    |
|        |                               |     Owner     |
|        |<------ Authorization Grant ---|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |------- Authorization Grant -->| Authorization |
| Client |                               |     Server    |
|        |<--------- Access Token -------|               |
|        |                               +---------------+
|        |
|        |                               +---------------+
|        |---------- Access Token ------>|    Resource   |
|        |                               |     Server    |
|        |<------- Protected Resource ---|               |
+--------+                               +---------------+
```

An authorization grant is a credential representing the user's authorization to access their private infomration used by the client to obtain an access token. This specification defines four grant types -- authorization code, implicit, resource owner password credentials, and client credentials -- as well as an extensibility mechanism for defining additional types.

OAuth 2 provides several "grant types" for different use cases. The grant types defined are:


| Grant type           | Use case                                    |
|----------------------|---------------------------------------------|
| Authorization Code   | For server-based web applications           |
| Implicit             | For browser-based or mobile apps            |
| Password Credentials | For logging in with a username and password |
| Client credentials   | For application access                      |


The OAuth 2.0 flow is:

![](http://41.media.tumblr.com/dc0ed4febc896d5d0589fc2940e52a42/tumblr_mp08klMuDm1qax653o1_1280.jpg)

```text
   Chrome                       Your server app                     LinkedIn                         LinkedIn
(User Agent)                       (Client)                  (Authorization Server)              (Resource Server)
      │                                │                                │                                │
      │                                │                                │                                │
      ├────────── GET /auth ───────────▶                                │                                │
      │                                │                                │                                │
      ◀─────────── 200 OK ─────────────┤                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├────── GET /auth/linkedin ──────▶                                │                                │
      │                                │                                │                                │
      ◀─ ─ ─ 302 auth.linkedin.com ─ ─ ┤                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├────────────────────── GET auth.linkedin.com ────────────────────▶                                │
      │                                │                                │                                │
      ◀───────────────────────────── 200 OK ────────────────────────────┤                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├───────────────────── POST auth.linkedin.com ────────────────────▶                                │
      │                                │                                │                                │
      │                                │                                ├ Verify credentials ┐           │
      │                                │                                │                    │           │
      │                                │                                ◀────────────────────┘           │
      │                                │                                │                                │
      ◀ ─ ─ ─ ─ ─ ─ ─ ─ ─  302 /auth/linkedin/callback  ─ ─ ─ ─ ─ ─ ─ ─ ┤                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├─ GET /auth/linkedin/callback ──▶                                │                                │
      │                                │                                │                                │
      │                                ├────────────────────── GET res.linkedin.com ─────────────────────▶
      │                                │                                │                                │
      │                                │                                ◀───── GET auth.linkedin.com ────┤
      │                                │                                │                                │
      │                                │                                ├──────────── 200 OK ────────────▶
      │                                │                                │                                │
      │                                ◀──────────────────────────── 200 OK ─────────────────────────────┤
      │                                │                                │                                │
      ◀─────────── 200 OK ─────────────┤                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ▼                                ▼                                ▼                                ▼
```

Designed specifically to work with HTTP, OAuth issues an access token to a web application from authorization server with the approval of the user. The web application then uses the access token to access the private information hosted by the resource server.

Resources:

- https://developer.linkedin.com/docs/oauth2
- https://github.com/auth0/passport-linkedin-oauth2
- http://passportjs.org/docs
- http://passportjs.org/docs/configure#configure
- https://apigee.com/console/linkedin
- http://docs.mongodb.org/manual/reference/method/db.collection.update/#db.collection.update

## Why is OAuth important?

- How does Google / Facebook / LinkedIn etc... communicate with your _local_ web app during development?  Isn't that private (aka not published on the internet)??
- What part of your existing authentication / authorization flows does this replace?
- Why would you want to authenticate with Google / Facebook instead of storing the emails / passwords yourself?

### Walkthrough - Start a new Express app

Create a new express app:  
`express --ejs --git linkedInLogin`  

Install your dependencies:
`cd linkedInLogin`  
`npm install`  
`npm install --save knex`  
`npm install --save passport`  
`npm install --save passport-linkedin`  
`npm install --save cookie-session`  
`npm install --save dotenv`  

Now initialize your app:  
`knex init`  
`git init`  
`git add .`  
`git commit -am"initial commit"`  

Next, make a `db` directory and a `knex.js` file  
`mkdir db`  
`touch db/knex.js`  

Now, add your config to `knex.js` and commit:  

**knex.js**

```javascript
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
```

`git add db`  
`git commit -am"added db config"`  

Go to LinkedIn, then setup a new [oAuth Application](https://www.linkedin.com/developer/apps).
Most items in that form don't matter- the logo, application name, and description will be shown to the user who is trying to login to your app when you request access to their account. You'll also need to provide a logo for your app that is the same pixel length and width. The email, url, and website don't require you to know them or have them set up beforehand, just put something there because you can always change it later.

Once you have the client ID and client secret, you can store it in your .env file like so:

```shell
LINKEDIN_API_KEY='your client ID goes here'
LINKEDIN_SECRET_KEY='your client secret goes here'
```

Also, on the linkedin app config page, you'll see a field marked **Authorized Redirect URLs:**. Set it to "http://localhost:3000/auth/linkedin/callback".

### Implementing Passport

Next, create a routes file called `auth.js` and import it in `app.js`.

#### auth.js
```javascript
var express = require('express');
var router = express.Router();

router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
});

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;

```

Now, add the following lines to `app.js` (in the appropriate places- see [this example](https://github.com/jaredhanson/passport-linkedin/blob/master/examples/login/app.js) for more details):

#### app.js
```javascript
var passport = require('passport');
var cookieSession = require('cookie-session');
var LinkedInStrategy = require('passport-linkedin').Strategy;

require('dotenv').load();

//get auth.js module
var auth = require('./routes/auth');

//add to middleware area, after bodyparser, before routes
app.use(cookieSession({
  name: 'session',
  keys: [process.env['SECRET_KEY']]
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, obj);
});

passport.use(new LinkedInStrategy({
    consumerKey: process.env['LINKEDIN_API_KEY'],
    consumerSecret: process.env['LINKEDIN_SECRET_KEY'],
    callbackURL: "http://localhost:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile'],
  },
  function(token, tokenSecret, profile, done) {

      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead (so perform a knex query here later.)
      return done(null, profile);
}));

//mount auth.js middleware
app.use('/auth', auth);

```

## Resources

[Passport](http://passportjs.org/docs)  
[passport-linkedin](https://github.com/jaredhanson/passport-linkedin)  
[Linkedin Passport Example](https://github.com/jaredhanson/passport-linkedin/blob/master/examples/login/app.js)  

## Assignment:
Read and complete the following exercise:  
[Express + Passport + Linkedin](https://github.com/gSchool/express-passport-linkedin)  

**Note:** The above exercise uses handlebars, but you may use the templating language of your choice. Make sure you understand what each command does before you copy and paste.
