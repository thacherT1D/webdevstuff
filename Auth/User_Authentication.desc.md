## Objectives

- Explain what user authentication is.
- Explain why is user authentication important.
- Use bcrypt to authenticate a user
- Explain what a cookie is
- Explain what a session is
- Add routes to authenticate a user
- Create express middleware to detect whether user is authenticated

## What's user authentication?

**User authentication** is the process of confirming the identity of a user. When a user logs into a web application, he or she is attempting to authenticate. To confirm his or her identity, unique personal identification, like a username or email address, and a password must be provided. If the information provided during login matches the information previously provided during registration, the user is authenticated.

However, it's not quite as simple as that. As you've seen, only hashed passwords are stored in the database during registration. To verify whether a login password is correct, it too mush be run through the same cryptographic hash function as the registration password. Only if the two hashed passwords are equivalent is the user authenticated.

### Exercise

Turn to a neighbor and explain the user authentication process from the perspective of an HTTP server. It may help to draw a diagram of what's happening.

## Why is user authentication important?

So a web application can show information—sometimes public, most of the time private—that's specific to each user.

## How do you use bcrypt to authenticate a user?

Previously, you used the `bcrypt.hash()` method to hash a password during user registration. Additionally, the `bcrypt.compare()` method checks whether or not a login plaintext password matches a registration hashed password.

Here's how the `bcrypt.compare()` method works.

```javascript
bcrypt.compare(password, hashed_password, (err, isMatch) => {
  if (err) {
    // Handle err
  }

  if (isMatch) {
    // User authenticated
  } else {
    // Incorrect password
  }
});
```

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
const bcrypt = require('bcrypt');

router.post('/session', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      const hashed_password = user.hashed_password;

      bcrypt.compare(req.body.password, hashed_password, (err, isMatch) => {
        if (err) {
          return next(err);
        }

        if (!isMatch) {
          return res.sendStatus(401);
        }

        res.sendStatus(200);
      });
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

Express JS offers an easy way to set the cookie and clear a cookie in the response.

```javascript
res.cookie(name, value [, options]);
res.clearCookie(name[, options]);
```

See the documentation for [setting cookies](http://expressjs.com/en/4x/api.html#res.cookie) and [clearing cookies](http://expressjs.com/en/4x/api.html#res.clearCookie).

Clients request contains a `Cookie` HTTP header.

Example HTTP Request Header:
```
GET / HTTP/1.1
Cookie: theme=light; sessionToken=abc123;
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
  // ...
});
```

## What is a session?

Broadly speaking, a session refers to an ongoing dialogue between two system. In the case of Express, the systems are the client and the server. When a client makes a request to the server, the server creates a session token to identify the client. The server can then use that session token throughout the ongoing dialogue to keep track of who the client is.

We can store the session anywhere, but it is commonly stored in a cookie. Since anybody can create a cookie and falsify information, like a session token, the server needs a way to ensure the token is authentic and not fraudulent. A session token can be signed cryptographically using secret keys to ensure the data has not been tampered with or falsified. The server then sends the session token along with the signature. The client responds with the session token and signature. The server verifies signature by resigning the session token with it's secret key. If the signatures match the server can be confident the session has not been modified.

### `cookie-session` middleware

`cookie-session` is a piece of middleware that is useful for storing, reading and signing sessions and storing them in a cookie. the library modifies the req object providing the following properties:

* req.session represents the session stored in the cookie.
* req.sessionOptions represents the settings of the session.

These properties provide a way to set cookies and send them to the client and a way to sign cookies and verify their authenticity.

```shell
npm install --save cookie-session
```

```javascript
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session', //name of cookie to set
  // other cookie attributes like maxAge, expires, domain can be set here
  keys: ['some_secure_key']
}));

// ...
```

```javascript
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');

router.post('/session', (req, res, next) => {
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        return res.sendStatus(401);
      }

      const hashed_password = user.hashed_password;

      bcrypt.compare(req.body.password, hashed_password, (err, isMatch) => {
        if (err) {
          return next(err);
        }

        if (!isMatch) {
          return res.sendStatus(401);
        }

        req.session.user = user;

        res.sendStatus(200);
      });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
```

*Note:* The cookie is marked as `HttpOnly`, which means that the cookie can only be set over HTTP and HTTPS. It also means you cannot access cookies in JavaScript on the browser using `document.cookie`. If there is any user information, you'd like the client to use, another cookie that's accessible needs to be set.

## Detecting whether user is authenticated

Our API will eventually need to allow users to interact with our resources. For example, users may want to follow artists or create their own playlists with tracks. In these cases, it is important that we can ensure that a user can only change their own playlist. For this, we can build guard clauses to check if the proper user is allowed to make the changes.

```javascript
// User follows an artist.
app.post('/users/:userId/artists/:artistId', (req, res, next) => {
  const userId = Number.parseInt(req.params.userId);

  if (!req.session.user || req.session.user.id !== userId) {
    return res.sendStatus(401);
  }

  // Database work
});
```

Since there will be a lot of user actions, this guard clause is a common guard clause to use and also forget. We can create a piece of middleware and apply it to specific routes.

```javascript
const checkAuth = function(req, res, next) {
  const userId = Number.parseInt(req.params.userId);

  if (!req.session.user || req.session.user.id !== userId) {
    return res.sendStatus(401);
  }

  next();
}

// User follows an artist.
app.post('/users/:userId/artists/:artistId', checkAuth, (req, res, next) => {
  // Database work
});
```

## Logging a user out

Logging a user out is as easy as destroying the request session. This clears the session cookies so that the user cannot be authenticated.

```javascript
router.delete('/session', (req, res) => {
  req.session = null;
  res.sendStatus(200);
});
```
