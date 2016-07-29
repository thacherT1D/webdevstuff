## Objectives

- Explain what user authentication is
- Explain why is user authentication important
- Use bcrypt to authenticate a user
- Explain what a cookie is
- Explain what a session is
- Add routes to authenticate a user
- Create express middleware to detect whether user is authenticated

## What's user authentication?

**User authentication** is the process of confirming the identity of a user. When a user logs into a web application, he or she is attempting to authenticate. To confirm his or her identity, unique personal identification, like a username or email address, and a password must be provided. If the information provided during login matches the information previously provided during registration, the user is authenticated.

However, it's not quite as simple as that. As you've seen, only hashed passwords are stored in the database during registration. To verify whether a login password is correct, it too must be run through the same cryptographic hash function as the registration password. Only if the two hashed passwords are equivalent is the user authenticated.

**Practice:**

Turn to a neighbor and explain the user authentication process from the perspective of an HTTP server. It may help to draw a diagram of what's happening.

## Why is user authentication important?

So a web application can show information—sometimes public, most of the time private—that's specific to each user.

## How do you use bcrypt to authenticate a user?

Previously, you used the `bcrypt.hash()` method to hash a password during user registration. Additionally, the `bcrypt.compare()` method checks whether or not a login plaintext password matches a registration hashed password.

Now let's create a route for logging in and use `bcrypt`. First we will create a branch for our session.

```shell
git checkout -b session
```

Once we are in the `session` branch let's create a `routes/session.js` module.

```javascript
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt-as-promised');

router.post('/session', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        const err = new Error('Unauthorized');

        err.status = 401;

        throw err;
      }

      return bcrypt.compare(req.body.password, user.hashed_password);
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      const err = new Error('Unauthorized');

      err.status = 401;

      throw err;
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
```

Before we can test our new endpoint, we need to add our router to the `server.js` file.

```javascript
'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const morgan = require('morgan');
const bodyParser = require('body-parser');

const artists = require('./routes/artists');
const tracks = require('./routes/tracks');
const users = require('./routes/users');
const session = require('./routes/session');

const app = express();

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());

app.use(artists);
app.use(tracks);
app.use(users);
app.use(session);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
```

We are now ready to test our server for authentication.

```shell
http POST localhost:8000/session email=neo@thematrix.com password=theone
```

Once you get a successful response, commit your changes.

```shell
git add .
git commit -m 'Add authentication endpoint'
```

## What is a cookie?

The process of **user authentication** starts when a user provides a password to be stored for future login. Instead of requiring authentication for each request the browser needs to make, the server sends a small piece of data to the browser called a **cookie** to hold onto authentication information.

Cookies are sent in the response header called `Set-Cookie`. This header informs the web browser to optionally store the cookie and send it back in future requests to the server (the user can disable cookies).

Example HTTP Response Header:
```
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: theme=light
Set-Cookie: sessionToken=abc123; Expires=Wed, 09 Jun 2021 10:18:14 GMT
```

Clients request contains a `Cookie` HTTP header.

Example HTTP Request Header:
```
GET / HTTP/1.1
Cookie: theme=light; sessionToken=abc123;
```

Express JS offers an easy way to set the cookie and clear a cookie in the response.

```javascript
res.cookie(name, value [, options]);
res.clearCookie(name[, options]);
```

See the documentation for [setting cookies](http://expressjs.com/en/4x/api.html#res.cookie) and [clearing cookies](http://expressjs.com/en/4x/api.html#res.clearCookie).

We can use cookies as a way to inform the client that the user is logged in.

```javascript
router.post('/session', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      return bcrypt.compare(req.body.password, user.hashed_password);
    })
    .then(() => {
      res.cookie('loggedIn', true);
      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      const err = new Error('Unauthorized');

      err.status = 401;

      throw err;
    })
    .catch((err) => {
      next(err);
    });
});
```

Check through a request that the server specifies the client to set a cookie.

```shell
http POST localhost:8000/session email=neo@thematrix.com password=theone
```

### Logout

Logging a user our can be as easy as deleting a cookie.

```javascript
router.delete('/session', (req, res, next) => {
  res.clearCookie('loggedIn');
  res.sendStatus(200);
});
```

```shell
http DELETE localhost:8000/session
```

Once done, commit your changes.

```shell
git add .
git commit -m 'Store users login state as a cookie'
```

### `cookie-parser` middleware

Parsing the `Cookie` HTTP header can be an annoying task. Luckily, there's a piece of middleware that can parse the cookies for you named `cookie-parser`.

```shell
npm install --save cookie-parser
```

```javascript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/hello', function(req, res, next) {
  console.log(req.cookies); // object
  if (req.cookies.loggedIn) {
    // user is logged in
  }
});
```

While we can store user information in a cookie, it's not the most secure way to have the client have access to user information. For this, we rely on sessions.

## What is a session?

Broadly speaking, a session refers to an ongoing dialogue between two system. In the case of Express, the systems are the client and the server. When a client makes a request to the server, the server creates a session token to identify the client. The server can then use that session token throughout the ongoing dialogue to keep track of who the client is.

We can store the session anywhere, but it is commonly stored in a cookie. Since anybody can create a cookie and falsify information, like a session token, the server needs a way to ensure the token is authentic and not fraudulent. The following steps occur:

1. The server encodes a session into base64.
1. The server sends the session encoding to the client via a cookie. It also sends a signature generated using the session encoding and a secret key.
1. The client makes subsequent requests with a session encoding and signature.
1. The server verifies the session by generating a signature of the session sent with its secret key and compares it with the signature sent.
1. If the signatures match, the server can be confident the session has not been modified.

### `cookie-session` middleware

`cookie-session` is a piece of middleware that is useful for storing, reading and signing sessions and storing them in a cookie. the library modifies the req object providing the following properties:

* `req.session` represents the session stored in the cookie.
* `req.sessionOptions` represents the settings of the session.

These properties provide a way to set cookies and send them to the client and a way to sign cookies and verify their authenticity.

```shell
npm install --save cookie-session
```

Now let's use cookie-session in the server.

```javascript
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'trackify',
  secret: 'some_secret_key'
  // other cookie attributes like maxAge, expires, domain can be set here
}));
```

Once we have the `cookie-session` module included. We can use it in our `routes/session.js`

```javascript
router.post('/session', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      return bcrypt.compare(req.body.password, user.hashed_password);
    })
    .then(() => {
      req.session.user = user;
      res.cookie('loggedIn', true);
      res.sendStatus(200);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      const err = new Error('Unauthorized');

      err.status = 401;

      throw err;
    })
    .catch((err) => {
      next(err);
    });
});
```

### Logging a user out

Logging a user out is as easy as destroying the request session. This clears the session cookies so that the user cannot be authenticated.

```javascript
router.delete('/session', (req, res) => {
  req.session = null;
  res.clearCookie('loggedIn');
  res.sendStatus(200);
});
```

Test drive your authentication API now.

```shell
http POST localhost:8000/session email=neo@thematrix.com password=theone
```

```shell
http DELETE localhost:8000/session
```

*Note:* The cookie is marked as `HttpOnly`, which means that the cookie can only be set over HTTP and HTTPS. It also means you cannot access cookies in JavaScript on the browser using `document.cookie`. If there is any user information, you'd like the client to use, another cookie that's accessible needs to be set.

Once the authentication API is working properly, commit your changes.

```shell
git add .
git commit -m 'Add session storage for authentication'
```

Install the `dotenv` package as a local development dependency.

```shell
npm install --save-dev dotenv
```

Ignore the `.env` file from the repository.

```shell
echo '.env' >> .gitignore
```

Generate a secret key that'll be used to sign session information on non-production environments.

```shell
bash -c 'echo "SESSION_SECRET="$(openssl rand -hex 64)' > .env
```

In `server.js`, add the following code to require and config the `dotenv` package on non-production environments.

```javascript
'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// ...
```

Update the cookie session secret to use the secret key in the `SESSION_SECRET` environment variable.

```javascript
app.use(cookieSession({
  name: 'trackify',
  secret: process.env.SESSION_SECRET
}));

// ...
```

## Detecting whether user is authenticated

Our API will eventually need to allow users to interact with our resources. For example, users may want to follow artists or create their own playlists with tracks. In these cases, it is important that we can ensure that a user can only change their own playlist. Let's start implementing the ability for a user to follow an artist. Since we have a many to many relationship, we need to create the relationship table.

```shell
npm run knex migrate:make users_artists
```

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users_artists', (table) => {
    table.increments();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('artist_id')
      .notNullable()
      .references('id')
      .inTable('artists')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_artists');
};
```

In order to allow a user to follow an artist, we need to ensure the user is logged in and obtain its user id. We do this by checking the session. For this, we can build guard clauses to check if the proper user is allowed to make the changes.

```javascript
// User follows an artist.
router.post('/users/artists/:artistId', (req, res, next) => {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  const userId = req.session.user.id;
  const artistId = Number.parseInt(req.params.artistId);

  knex('users_artists')
    .insert({
      user_id: userId,
      artist_id: artistId
    }, '*')
  .then((results) => {
    res.send(results[0]);
  })
  .catch((err) => {
    next(err);
  });
});
```

Since there will be a lot of user actions, this guard clause is a common guard clause to use and also forget. We can create a piece of middleware and apply it to specific routes.

```javascript
const checkAuth = function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }

  next();
}

// User follows an artist.
app.post('/users/artists/:artistId', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;
  const artistId = Number.parseInt(req.params.artistId);

  knex('users_artists')
    .insert({
      user_id: userId,
      artist_id: artistId
    }, '*');
  })
  .then((results) => {
    res.send(results[0]);
  })
  .catch((err) => {
    next(err);
  });
});
```
```javascript
// All artists that the user follows.
router.get('/users/artists', checkAuth, (req, res, next) => {
  const userId = req.session.user.id;

  knex('artists')
    .innerJoin('users_artists', 'users_artists.artist_id', 'artists.id')
    .where('users_artists.user_id', userId)
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    });
});
```
```shell
git add .
git commit -m 'Add routes for a users following artists'
```
```shell
git checkout master
git merge session
```

## Assignment

- [Galvanize Bookshelf - User authentication](https://github.com/gSchool/galvanize-bookshelf/blob/master/4_user_authentication.md)

## Resources

- [Express - Production Best Practices: Security - Use cookies securely](http://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)
