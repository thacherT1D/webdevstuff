## Objectives

- Explain what OAuth is.
- Explain why OAuth is important.
- Use OAuth.

## What's OAuth?

Before jumping straight into OAuth, let's refresh our memories on the definition of authentication versus authorization. **Authentication** is the process of confirming the identity of a user. When a user logs into a web application, that person is attempting to authenticate. On the other hand, **authorization** is the process of granting access to private information for an authenticated user. When a user successfully authenticates with an application, the server starts the authorization process by creating a token. Afterwards, the client includes the token, and not the user's password, in subsequent requests for private information on the server.

Understanding the different between the two is important because **OAuth** is an open standard for both authentication and authorization. With OAuth, a user can authenticate to your web application by using an account from another service like Google, Facebook, Microsoft, Twitter, etc. Once authenticated, the user grants your web application permission to access their private information on that service. The credential representing the user's permission is called an **authorization grant**. When your web application receives an authorization grant, it sends the authorization grant back to the service for verification. Once verified, the service issues your web application an **access token** which signifies the user is authenticated. Later, that access token can be used to access the private information if and when your web application wants.

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

An authorization grant is a credential representing the user's authorization to access their private information used by the client to obtain an access token. This specification defines four grant types -- authorization code, implicit, resource owner password credentials, and client credentials -- as well as an extensibility mechanism for defining additional types.

OAuth 2 provides several grant types for different use cases. The grant type we'll  be covering here is called **Authorization Code** which is designed for server-based web applications. The OAuth 2.0 authorization code grant flow is the following.

```text
   Chrome                       Your server app                     LinkedIn                         LinkedIn
(User Agent)                       (Client)                  (Authorization Server)              (Resource Server)
      │                                │                                │                                │
      │                                │                                │                                │
      ├────── GET /auth/linkedin ──────▶                                │                                │
      │                                │                                │                                │
      ◀─ ─ ─ 302 auth.linkedin.com ─ ─ ┤                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├────────────────────── GET auth.linkedin.com ────────────────────▶                                │
      │                                │                                │                                │
      ◀───────────────────────────── 200 OK ────────────────────────────┤                                │
      │                                │                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├───────────────────── POST auth.linkedin.com ────────────────────▶                                │
      │                                │                                ├─ Verify credentials ─┐         │
      │                                │                                ◀──────────────────────┘         │
      ◀ ─ ─ ─ ─ ─ ─ ─ ─ ─  302 /auth/linkedin/callback  ─ ─ ─ ─ ─ ─ ─ ─ ┤                                │
      │                                │                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├─ GET /auth/linkedin/callback ──▶                                │                                │
      │                                ├────────────────────── GET res.linkedin.com ─────────────────────▶
      │                                │                                │                                ├─── Verify grant  ──┐
      │                                │                                │                                ◀────────────────────┘
      │                                ◀──────────────────────────── 200 OK ─────────────────────────────┤
      ◀─────────── 200 OK ─────────────┤                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      │                                │                                │                                │
      ├────── GET /connections ────────▶                                │                                │
      │                                ├────────────────────── GET res.linkedin.com ────────────────────▶│
      │                                │                                │                                ├─── Verify token ───┐
      │                                │                                │                                ◀────────────────────┘
      │                                ◀──────────────────────────── 200 OK ─────────────────────────────┤
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

## How do you use OAuth?

```shell
mkdir oauth
```

```shell
cd oauth
```

```shell
npm init --yes
```

Visit the [LinkedIn Developers](https://www.linkedin.com/developer/apps) website and click the button to create a new application. Then, fill out the form with either the information below or with your own fictitious application information.

**NOTE:** Don't forget to agree to the LinkedIn API Terms of Use before submitting the form.

| Field                | Value                                         |
|----------------------|-----------------------------------------------|
| **Company Name**     | Team Rocket                                   |
| **Name**             | Blast Off                                     |
| **Description**      | Team rocket blasts off at the speed of light! |
| **Application Logo** | ![](https://goo.gl/MiYoKc)                    |
| **Website URL**      | https://twitter.com/teamrocket                |
| **Business Email**   | meowth@teamrocket.com                         |
| **Business Phone**   | 555-555-5555                                  |

On the next page, you'll see two authentication keys—client ID and client secret. Using NPM, install the `dotenv` package as a dependency.

```javascript
npm install --save dotenv
```

Create a `.env` file in your application's project directory.

```shell
touch .env
```

And copy the keys into your application's `.env` file.

```shell
LINKEDIN_CLIENT_ID=replace_me
LINKEDIN_CLIENT_SECRET=replace_me
```

Next, choose the following default application permissions. Remember, accessing a user's private information on LinkedIn from your application will require certain permissions granted by the user. The permissions system ensures that a user is made aware of what your application could possibly access or do on their behalf.

- `r_basicprofile`
- `r_emailaddress`

Then, add the following URL to your application's OAuth 2.0 authorized redirect URLs.

**NOTE:** Remember to click the Add button.

- `http://localhost:8000/auth/linkedin/callback`

Finally, click the update button on the bottom of the page. You can safely ignore any textfields for OAuth 1.0a. Once the update is successful, install the following dependencies.

```shell
npm install --save express morgan knex pg
```

Create a `server.js` file with the following code.

```javascript
'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

app.use(morgan('dev'));

const

app.listen(8000);
```

```shell
npm install --save passport passport-linkedin cookie-parser jsonwebtoken
```

```shell
createdb oauth_dev
```

```shell
touch knexfile.js
```

```javascript
'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/oauth_dev'
  }
};
```

```shell
npm run knex migrate:make users
```

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

```shell
npm run -s knex migrate:latest
```

```shell
touch knex.js
```

```javascript
'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
```

Next, create a routes file called `routes/auth.js` and import it in `app.js`.

```javascript
'use strict';

const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/',
  successRedirect: '/'
}));

// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
```

Now, add the following lines to `app.js` (in the appropriate places- see [this example](https://github.com/jaredhanson/passport-linkedin/blob/master/examples/login/app.js) for more details):

```javascript
'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();

app.disable('x-powered-by');

// const cookieSession = require('cookie-session');
//
// app.use(cookieSession({
//   name: 'session',
//   keys: [process.env['SECRET_KEY']]
// }));

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  //later this will be where you selectively send to the browser an identifier for your user, like their primary key from the database, or their ID from linkedin
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  //here is where you will go to the database and get the user each time from it's id, after you set up your db
  done(null, obj);
});

const { Strategy } = require('passport-linkedin');

const options = {
  consumerKey: process.env['LINKEDIN_CLIENT_ID'],
  consumerSecret: process.env['LINKEDIN_CLIENT_SECRET'],
  callbackURL: 'http://localhost:3000/auth/linkedin/callback'
};

const strategy = new Strategy(options, (token, tokenSecret, profile, done) => {
  // To keep the example simple, the user's LinkedIn profile is returned to
  // represent the logged-in user.  In a typical application, you would want
  // to associate the LinkedIn account with a user record in your database,
  // and return that user instead (so perform a knex query here later.)

  // User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
  //   return done(err, user);
  // });

  return done(null, profile);
})

passport.use(strategy);

const auth = require('./routes/auth');

app.use('/auth', auth);

app.listen(8000);
```

## Resources

- [Passport - documentation](http://passportjs.org/docs)  
- [GitHub - passport-linkedin](https://github.com/jaredhanson/passport-linkedin)  
- [Linkedin Passport Example](https://github.com/jaredhanson/passport-linkedin/blob/master/examples/login/app.js)  
- [LinkedIn Developer Network - Authenticating with OAuth 2.0](https://developer.linkedin.com/docs/oauth2)
- [IETF - The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
- [Wikipedia - OAuth](https://en.wikipedia.org/wiki/OAuth)
- [Aaron Parecki - OAuth 2 Simplified](https://aaronparecki.com/2012/07/29/2/oauth2-simplified)

## Assignment:

Read and complete the following exercise:  
[Express + Passport + Linkedin](https://github.com/gSchool/express-passport-linkedin)  

**Note:** The above exercise uses handlebars, but you may use the templating language of your choice. Make sure you understand what each command does before you copy and paste.
