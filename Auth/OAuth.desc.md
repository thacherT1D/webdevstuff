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
- https://apigee.com/console/linkedin

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

In your shell, create a database as well as install depdencies needed for our scripts.

```shell
createdb oauth_dev
npm install --save knex pg nodemon
```

Update the `package.json` with a script so that we can run `npm start` as well as `knex`.

```javascript
...
  "scripts": {
    "start": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "knex": "knex"
  }
...
```

Add the following files for setting up database and knex configuration.

`knexfile.js`

```javascript
'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/oauth_dev'
  }
};
```

`knex.js`

```javascript
'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
```

Create a migration file for your users.

```shell
npm run knex migrate:make users
```

Inside your users migration file.

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('first_name').notNullable().defaultTo('');
    table.string('last_name').notNullable().defaultTo('');
    table.string('email').notNullable();
    table.string('linkedin_id').unique().notNullable();
    table.string('linkedin_token').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

Now that our database table migrations have been created, let's run the latest migration.

```shell
npm run knex migrate:latest
```

We will ignore seeds for now. Let's install some of the usual dependencies for our application.

```shell
npm install --save express humps jsonwebtoken morgan nodemon passport passport-oauth2 request request-promise
```

We will be using JWTs, so we will need to create a JWT_SECRET.

```shell
bash -c 'echo JWT_SECRET=$(openssl rand -hex 64) >> .env'
```

We're ready to start our server. Let's build our `server.js` file.

```javascript
'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const passport = require('passport');

const app = express();

app.disable('x-powered-by');

app.use(passport.initialize());
app.use(express.static('public'));

const auth = require('./routes/auth');

app.use('/auth', auth);

app.listen(8000);
```

The only difference from how we usually implement servers is requiring the `passport` module. The passport module provides easy implementation to multiple types of authentication. You'll see its use more in detail in the `auth` routes. For now, all we need to do is initialize the passport module as a piece of middleware.

Let's create a `public` folder with the following `index.html` page.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>OAuth</title>
  </head>
  <body>
    <a href="/auth/linkedin">Login</a>
  </body>
</html>
```

Now, let's build the routes for authentication. In `routes/auth.js`,

```javascript
'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const { camelizeKeys, decamelizeKeys } = require('humps');
const request = require('request-promise')

const router = express.Router();

const strategy = new OAuth2Strategy({
  authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
  scope: ['r_basicprofile', 'r_emailaddress'],
  tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
  clientID: process.env.LINKEDIN_CLIENT_ID,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/linkedin/callback'
}, (accessToken, refreshToken, profile, done) => {
  let liProfile = null;

  request({
    url: 'https://api.linkedin.com/v1/people/~:(id,first-name,last-name,email-address)?format=json',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
  .then((linkedInProfile) => {
    liProfile = JSON.parse(linkedInProfile)

    return knex('users')
      .where('linkedin_id', liProfile.id)
      .first();
  })
  .then((user) => {
    if (user) {
      return user;
    }

    return knex('users')
      .insert(decamelizeKeys({
        firstName: liProfile.firstName,
        lastName: liProfile.lastName,
        email: liProfile.emailAddress,
        linkedinId: liProfile.id,
        linkedinToken: accessToken,
      }), '*');
    })
    .then((user) => {
      done(null, camelizeKeys(user));
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(strategy);

router.get('/linkedin', passport.authenticate('oauth2', { session: false }));

router.get('/linkedin/callback', passport.authenticate('oauth2', {
  session: false,
  failureRedirect: '/'
}), (req, res) => {
  console.log(req.user);
  const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3); // 3 hours
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: '3h'
  });

  res.cookie('token', token, {
    httpOnly: true,
    expires: expiry,
    secure: router.get('env') === 'production'
  });

  // Successful authentication, redirect home.
  res.redirect('/');
});

module.exports = router;
```

Let's take a look at this line-by-line. We do our require in our modules like we usually do. In particular interest, we require a module called `passport-oauth2`. Passport allows the ability to create a "strategy" that describes specific implementation of authentication. Passport has many strategies, LinkedIn included. We chose to work with the general OAuth 2 strategy as it can apply to many other services that do not have a strategy.

After requiring the strategy, we need to initialize it. For the OAuth2 strategy, we initialize it with two arguments, a configuration and a callback. The configuration contains information that the OAuth server provides, for example, the authorization URL, callback URL, and token URL. You can find these values in the documentation for the API you like. LinkedIn provides a [documentation page](https://developer.linkedin.com/docs/oauth2) specific to OAuth. The strategy also requires the client ID and client secret. Those are given to you when creating an application, and are stored in the `.env` file. Lastly, we include a scope in our configuration. This determines what permissions we need from our provider. Again, these values (stored in an array) are specific to the provider.

The second argument is the callback. The callback has a big job, which is to handle the success of the OAuth request. The callback has 4 parameters the access token (the token we use to make requests to our provider), the refresh token (optional), the user profile (which is always an empty object unless a specific strategy is used), and a callback, which we have labeled `done`.

This callback has a lot of responsibility. Specifically it has to manage whether we currently have the user stored in our database and insert it when necessary.

[Final OAuth Example](https://github.com/kmcgrady/oauth-example)

## Resources

- [Passport - documentation](http://passportjs.org/docs)  
- [LinkedIn Developer Network - Authenticating with OAuth 2.0](https://developer.linkedin.com/docs/oauth2)
- [IETF - The OAuth 2.0 Authorization Framework](https://tools.ietf.org/html/rfc6749)
- [Wikipedia - OAuth](https://en.wikipedia.org/wiki/OAuth)
- [Aaron Parecki - OAuth 2 Simplified](https://aaronparecki.com/2012/07/29/2/oauth2-simplified)
