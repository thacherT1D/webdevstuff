## Objectives

- Explain what authentication is.
- Explain why is authentication important.
- Use bcrypt to authenticate a user.
- Explain what authorization is.
- Explain why authorization is important.
- Use a cookie session to authorize a user.

## What's authentication?

**Authentication** is the process of confirming the identity of a user. When a user logs into a web application, that person is attempting to authenticate. To confirm their identity, the user must provide unique personal identification, like a username or email address, and a password. If the information provided during login matches the information previously provided during registration, the user is authenticated.

However, it's not quite as simple as that. As you've seen, only hashed passwords are stored in the database during registration. To verify whether a login password is correct, it too must be run through the same cryptographic hash function as the registration password. Only if the two hashed passwords are equivalent is the user authenticated.

### Exercise

Turn to a neighbor and explain the user authentication process from the perspective of an HTTP server. It may help to draw a diagram of what's happening.

## Why is authentication important?

So a web application can show information—sometimes public, most of the time private—that's specific to each user.

[INSERT MORE CONTENT HERE]

## How do you use bcrypt to authenticate a user?

Previously, you used the `bcrypt.hash()` method to hash a password during user registration. For authentication, you'll use the `bcrypt.compare()` method to check whether or not a login plaintext password matches a registration hashed password.

Let's add authentication to the `trackify` project. To get started, navigate to the `trackify` project directory.

```shell
cd path/to/trackify
```

And checkout a new feature branch.

```shell
git checkout -b authentication
```

In the `seeds/2_users.js` file, add a hashed password to the user entity.

```javascript
'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        email: '2pac@shakur.com',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC'),
        hashed_password: '$2a$12$LaKBUi8mCFc/9LiCtvwcvuNIjgaq9LJuy/NO.m4P5.3FP8zA6t2Va'
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
```

And re-seed the database.

```shell
npm run knex seed:run
```

In the `server.js` file, add the necessary routing middleware.

```javascript
// ...

const session = require('routes/session');
const tracks = require('routes/tracks');
const users = require('routes/users');

app.use(session);
app.use(tracks);
app.use(users);

// ...
```

Create a new routes file for managing a session.

```shell
touch routes/session.js
```

In the `routes/session.js` file, type the following code.

```javascript
'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.post('/session', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !email.trim()) {
    return next(boom.create(400, 'Email must not be blank'));
  }

  if (!password || password.length < 8) {
    return next(boom.create(400, 'Password must not be blank'));
  }

  let user;

  knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad email or password');
      }

      user = camelizeKeys(row);

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      delete user.hashedPassword;

      res.send(user);
    })
    .catch(bcrypt.MISMATCH_ERROR, () => {
      throw boom.create(400, 'Bad email or password');
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
```

Run the following shell command.

```shell
http POST localhost:8000/session email='2pac@shakur.com' password=ambitionz
```

And you should see something like this.

```text
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 112
Content-Type: application/json; charset=utf-8
Date: Mon, 01 Aug 2016 23:53:35 GMT
ETag: W/"70-1qLFVreC078yebGK0TQomg"

{
    "createdAt": "2016-06-29T14:26:16.000Z",
    "email": "2pac@shakur.com",
    "id": 1,
    "updatedAt": "2016-06-29T14:26:16.000Z"
}
```

Once you get a successful response, commit your changes.

```shell
git add .
git commit -m 'Add POST /session middleware'
```

## What's authorization?

**Authorization** is the process of granting access to private resources. After a user is authenticated, that person will often want to access private information stored in a database. An authorization system uses access control rules to decide whether or not the authenticated user is approved to access that information.

When a user successfully logs in to an application, the server starts the authorization process by creating session using an HTTP cookie. An **HTTP cookie** is a small piece of data sent by a server to a client to hold stateful information about a user's session.

For example, if a user logged into the system with the following shell command.

```shell
http POST localhost:8000/session email='2pac@shakur.com' password=ambitionz
```

We want the server to send back the following response.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 112
Content-Type: application/json; charset=utf-8
Date: Tue, 02 Aug 2016 20:27:10 GMT
ETag: W/"70-1qLFVreC078yebGK0TQomg"
Set-Cookie: trackify=eyJ1c2VySWQiOjF9; path=/; httponly
Set-Cookie: trackify.sig=RQbOCG127mu32s5Tb1q2v3grBzs; path=/; httponly

{
    "createdAt": "2016-06-29T14:26:16.000Z",
    "email": "2pac@shakur.com",
    "id": 1,
    "updatedAt": "2016-06-29T14:26:16.000Z"
}
```

As you can see, two cookies are sent from the server to the client using the `Set-Cookie` header. This header tells the client to optionally store the cookies in its own database and to send them back to the server in future requests to the server. All modern browsers operate like this unless the user can disable cookies in their browser.




Instead of requiring the user to authenticate for each request

Clients request contains a `Cookie` HTTP header.

Example HTTP Request Header:
```
GET / HTTP/1.1
Cookie: theme=light; sessionToken=abc123;
```

Broadly speaking, a **session** refers to an ongoing dialogue between two system. In the case of Express, the systems are the client and the server. When a client makes a request to the server, the server creates a session token to identify the client. The server can then use that session token throughout the ongoing dialogue to keep track of who the client is.

We can store the session anywhere, but it is commonly stored in a cookie. Since anybody can create a cookie and falsify information, like a session token, the server needs a way to ensure the token is authentic and not fraudulent. The following steps occur:

1. The server encodes a session into base64.
1. The server sends the session encoding to the client via a cookie. It also sends a signature generated using the session encoding and a secret key.
1. The client makes subsequent requests with a session encoding and signature.
1. The server verifies the session by generating a signature of the session sent with its secret key and compares it with the signature sent.
1. If the signatures match, the server can be confident the session has not been modified.

## How do you use a cookie session to authorize a user?

The `cookie-session` is a piece of middleware that is useful for storing, reading and signing sessions and storing them in a cookie. the library modifies the req object providing the following properties:

* `req.session` represents the session stored in the cookie.
* `req.sessionOptions` represents the settings of the session.

*Note:* The cookie is marked as `HttpOnly`, which means that the cookie can only be set over HTTP and HTTPS. It also means you cannot access cookies in JavaScript on the browser using `document.cookie`. If there is any user information, you'd like the client to use, another cookie that's accessible needs to be set.

These properties provide a way to set cookies and send them to the client and a way to sign cookies and verify their authenticity.

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

In the `routes/users.js` file, add the following line of code to the `POST /session` middleware.

```javascript
// ...

.then(() => {
  delete user.hashedPassword;

  req.session.userId = user.id;

  res.send(user);
})

// ...
```

And run the following shell command.

```shell
http POST localhost:8000/session email='2pac@shakur.com' password=ambitionz
```

And you should see something like this.

```text
SOMETHING
```

In the `routes/users.js` file, add the following line of code to the `POST /users` middleware.

```javascript
// ...

.then((rows) => {
  const user = camelizeKeys(rows[0]);

  delete user.hashedPassword;

  req.session.userId = user.id;

  res.send(user);
})

// ...
```

And run the following shell command.

```shell
http POST localhost:8000/session email='2pac@shakur.com' password=ambitionz
```

And you should see something like this.

```text
SOMETHING
```

### Logout

Logging a user out is as easy as destroying the request session. This clears the session cookies so that the user cannot be authenticated.

```javascript
router.delete('/session', (req, res, next) => {
  req.session = null;

  res.sendStatus(200);
});
```

And run the following shell command.

```shell
http DELETE localhost:8000/session
```

And you should see something like this.

```text
SOMETHING
```

Once done, commit your changes.

```shell
git add .
git commit -m 'Store users login state as a cookie'
```

## Detecting whether user is authenticated

Our API will eventually need to allow users to interact with our resources. For example, users may want to follow artists or create their own playlists with tracks. In these cases, it is important that we can ensure that a user can only change their own playlist. Let's start implementing the ability for a user to follow an artist. Since we have a many to many relationship, we need to create the relationship table.

```shell
npm run knex migrate:make playlists
```

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('playlists', (table) => {
    table.increments();
    table.integer('track_id')
      .notNullable()
      .references('id')
      .inTable('tracks')
      .onDelete('CASCADE')
      .index();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('playlists');
};
```

Create a new seed file for `playlists`.

```shell
npm run knex seed:make 3_playlists
```

In the `seeds/3_playlist.js` file, type the following code.

```javascript
'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('playlists').insert([{
        id: 1,
        user_id: 1,
        track_id: 1,
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('playlists_id_seq', (SELECT MAX(id) FROM playlists));"
      );
    });
};
```

In order for a user to view their playlists, you'll need to ensure a user is logged in and obtain its user id. We do this by checking the session. For this, we can build guard clauses to check if the proper user is allowed to make the changes. Since there will be a lot of user actions, this guard clause is a common guard clause to use and also forget. We can create a piece of middleware and apply it to specific routes.

```javascript
'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  if (!req.session.userId) {
    return next(boom.create(401, 'Unauthorized'));
  }

  next();
};

router.get('/playlists', authorize, (req, res, next) => {
  const { userId } = req.session;

  knex('playlists')
    .innerJoin('tracks', 'tracks.id', 'playlists.track_id')
    .where('playlists.user_id', userId)
    .orderBy('tracks.title', 'ASC')
    .then((rows) => {
      const playlists = camelizeKeys(rows);

      res.send(playlists);
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

- [Galvanize Bookshelf - Authentication and Authorization](https://github.com/gSchool/galvanize-bookshelf/blob/master/4_authentication_authorization.md)

## Resources

- [Express - Production Best Practices: Security - Use cookies securely](http://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)
- [Wikipedia - Authentication](https://en.wikipedia.org/wiki/Authentication)
- [Wikipedia - Authorization](https://en.wikipedia.org/wiki/Authorization)
- [Wikipedia - HTTP cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
