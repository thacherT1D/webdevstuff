## Objectives

- Explain what authentication is.
- Explain why is authentication important.
- Use bcrypt to authenticate a user.
- Explain what authorization is.
- Explain what a JSON Web Token (JWT) is.
- Explain why a JSON Web Token (JWT) is important.
- Use a JWT to authorize a user.

## What's authentication?

**Authentication** is the process of confirming the identity of a user. When a user logs into a web application, that person is attempting to authenticate. To confirm their identity, the user must provide unique personal identification, like a username or email address, and a password. If the information provided during login matches the information previously provided during registration, the user is authenticated.

```text
                                ┌──────── Node.js ─────────┐                                
                                │     Express              │                                
                                │     Knex                 │                                
┌──── Chrome ───┐               │                          │               ┌─── Postgres ──┐
│               │── login req -▶│                          │─── SELECT ───▶│               │
│               │   JSON        │   ┌──Authentication──┐   │    user       │               │
│               │               │   │                  │   │               │               │
│               │               │   │                  ▽   │               │               │
│               │               │   │     bcrypt       │   │               │               │
│               │◀── response ──│   △                  │   │◀── response ──│               │
│               │    auth token │   │                  │   │    user       │               │
│               │               │   └──────────────────┘   │               │               │
└───────────────┘               │                          │               └───────────────┘
                                │                          │                                
                                └──────────────────────────┘                                
```

However, it's not quite as simple as that. As you've seen, only hashed passwords are stored in the database during registration. To verify whether a login password is correct, it too must be run through the same cryptographic hash function as the registration password. Only if the two hashed passwords are equivalent is the user authenticated.

### Exercise

Turn to a neighbor and explain the authentication process. It may help to draw a diagram of what's happening between the client and server.

## Why is authentication important?

The Internet by definition is an open and public network. To connect to it, one must need a computer-like device as well as a connection through an Internet Service Provider. Originally as a method to share information, the Internet expanded to handle multiple kinds of interactions. As the Internet evolved, websites needed the ability to share private information with individual users like credit card information, social security numbers, etc.

Privacy has then become a major issue with the Internet that remains a debate today. Keep in mind that we are only talking about one type of authentication, password based authentication. There are many others that are getting popular, including biometric (fingerprints, eye scans, etc.), 2 factor authentication, and more.

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

const token = require('./routes/token');
const tracks = require('./routes/tracks');
const users = require('./routes/users');

app.use(token);
app.use(tracks);
app.use(users);

// ...
```

Create a new routes file for managing a token.

```shell
touch routes/token.js
```

In the `routes/token.js` file, type the following code.

```javascript
'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.post('/token', (req, res, next) => {
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
http POST localhost:8000/token email='2pac@shakur.com' password=ambitionz
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
git commit -m 'Add POST /token middleware'
```

Once you are done, merge in your branch.

```shell
git checkout master
git merge authentication
git branch -d authentication
```

## What's authorization?

**Authorization** is the process of granting access to private information for an authenticated user. When a user successfully authenticates with an application, the server starts the authorization process by creating a token. A **token** is a unique identifier that represents an ongoing dialogue between a client and a server.

```text
                                ┌──────── Node.js ─────────┐                                
                                │     Express              │                                
                                │     Knex                 │                                
┌──── Chrome ───┐               │                          │               ┌─── Postgres ──┐
│               │── login req -▶│                          │─── SELECT ───▶│               │
│               │   JSON        │   ┌──Authentication──┐   │    user       │               │
│               │               │   │                  │   │               │               │
│               │               │   │                  ▽   │               │               │
│               │               │   │     bcrypt       │   │               │               │
│               │◀── response ──│   △                  │   │◀── row ───────│               │
│               │    auth token │   │                  │   │    user       │               │
│               │               │   └──────────────────┘   │               │               │
│               │               │                          │               │               │
│               │── auth req --▶│ ┌Authorization┐          │─── SELECT ───▶│               │
│               │   auth token  │ △             ▽          │               │               │
│               │               │ └─────────────┘          │◀── rows ──────│               │
│               │◀── response ──│                          │               │               │
│               │               │                          │               │               │
└───────────────┘               │                          │               └───────────────┘
                                │                          │                                
                                └──────────────────────────┘                                
```

As you can see, authorization starts when the server creates a token and sends it to the client. Afterwards, the client includes the token in subsequent requests for private information on the server. Using the token, the server authorizes the client to determine whether or not it can access the information.

The token can by stored in many places, but it's commonly stored in an HTTP cookie. An **HTTP cookie** is a small piece of data sent by a server to a client to hold stateful information like a session token.

For example, imagine that a client attempts to authenticate a user.

```shell
http POST localhost:8000/token email='2pac@shakur.com' password=ambitionz
```

Assuming authentication is successful, the server starts the authorization process by sending a token in its response.

```text
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 112
Content-Type: application/json; charset=utf-8
Date: Tue, 02 Aug 2016 21:53:00 GMT
ETag: W/"70-1qLFVreC078yebGK0TQomg"
Set-Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ3NTczMzkwMiwiZXhwIjoxNDc1NzQ0NzAyfQ.UxLljlMgRlcmVFQ3BJ3km7rwmxbnZZOkOqbPRCK0kU4; Path=/; Expires=Thu, 06 Oct 2016 08:53:24 GMT; HttpOnly

{
    "createdAt": "2016-06-29T14:26:16.000Z",
    "email": "2pac@shakur.com",
    "id": 1,
    "updatedAt": "2016-06-29T14:26:16.000Z"
}
```

As you can see, a cookie is sent from the server to the client using the `Set-Cookie` header. You'll see how the token is generated by the server and how a token is secured.

The `Set-Cookie` header informs the client to optionally store the cookies in its own client-side database and to send them back to the server in future requests. All modern browsers operate like this unless its user disables cookies. However, by default, every HTTPie request is completely independent of any previous ones.

Back to the previous example, if an authorized client sent the following request to a server.

```shell
http -v GET localhost:8000/playlists 'Cookie:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ3NTczMzkwMiwiZXhwIjoxNDc1NzQ0NzAyfQ.UxLljlMgRlcmVFQ3BJ3km7rwmxbnZZOkOqbPRCK0kU4;'
```

The HTTP request and response might look something like this.

```text
GET /playlists HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Cookie: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ3NTczMzkwMiwiZXhwIjoxNDc1NzQ0NzAyfQ.UxLljlMgRlcmVFQ3BJ3km7rwmxbnZZOkOqbPRCK0kU4;
Host: localhost:8000
User-Agent: HTTPie/0.9.4



HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 180
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Aug 2016 00:57:37 GMT
ETag: W/"b4-LmlrS0rY4sUAN7daTFQADQ"

[
    {
        "artist": "The Beatles",
        "createdAt": "2016-06-26T14:26:16.000Z",
        "id": 1,
        "likes": 28808736,
        "title": "Here Comes the Sun",
        "trackId": 1,
        "updatedAt": "2016-06-26T14:26:16.000Z",
        "userId": 1
    }
]
```

As you can see, a `Cookie` header, containing the token, is sent by the client to the server. Prior to processing the request, the server verifies the token's validity. If valid, the client is authorized to access the information at the `GET /playlists` route.

### Exercise

Turn to a neighbor and explain the authorization process. It may help to draw a diagram of what's happening between the client and server.

## What is a JSON Web Token (JWT)?

The token generated by the server conforms to a standard known as the *JSON Web Token or JWT* (pronounced jot). A JWT is a method of communicating the authentication state through an open standard. The standard dictates that a JWT is a string that is divided into 3 parts, each separated by a period.

* Header
* Payload
* Signature

```
HHHHHHHHHH.PPPPPPPPPPPPPPPPPPPPPPPPPPPPP.SSSSSSSSSSSSSSSSSSSSSSSS
```

### Header

The header provides a description of how the token is structured. It describes the type of token (a JWT) as well as the type of algorithm that was used to sign the token.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

The JSON is then Base64 encoded to produce the first part of the token. **Base64** is an encoding scheme that translates a UTF-8 string to binary and then back to a UTF-8 string with only the following characters.

| Characters | Count |
|------------|-------|
| `A`–`Z`    |    26 |
| `a`–`z`    |    26 |
| `0`–`9`    |    10 |
| `+`        |     1 |
| `/`        |     1 |

**NOTE:** Depending on the input string, the intermediate binary representation may have extra zeros at the end. These zeros are converted to an equals `=` sign in the final Base64 string.

```text
┌──── header info ────┐            ┌──── header JSON ────┐              ┌──── header token ────────────────────┐
│                     │            │                     │              │                                      │
│   {                 │            │  {                  │              │                                      │
│     alg: 'HS256',   │            │    "alg": "HS256",  │              │                                      │
│     typ: 'JWT'      │─── JSON ──▶│    "typ": "JWT"     │─── base64 ──▶│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9 │
│   }                 │  stringify │  }                  │    encode    │                                      │
│                     │            │                     │              │                                      │
│                     │            │                     │              │                                      │
└─────────────────────┘            └─────────────────────┘              └──────────────────────────────────────┘
```

### Payload

The second part of a JWT is called the *payload*. The payload contains information about the user codified into the token. It is an object where its keys are called *claims*. There are three types of claims:

* Reserved claims - These are claims that have special meaning as defined by the standard. They are recommended but not mandatory. Some examples include:
  * `iss` - the issuer of the token
  * `exp` - the expiration of the token
  * `sub` - subject
  * `aud` - audience
* Public claims - These are claims that the general public has agreed to use. A [set of public claims](http://www.iana.org/assignments/jwt/jwt.xhtml) are defined in the IANA JSON Web Token Registry
* Private claims - These are custom claims defined by you as agreed on in your system.

Here's an example payload:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

Like the header, the JSON is also Base64 url encoded.

### Signature

In addition to being created by the server, a cookie can be created directly on the client. Therefore, since anybody can create a token, the server needs a way to ensure the token is authentic and not fraudulent.

The signature takes into account the header and the payload. It is then signed with a secret key (something that should **NEVER** be exposed to the public). The common signing is done with an algorithm called HMAC SHA256. SHA256 is a cryptographic hash function and HMAC means that the hash includes a secret key.

To be more explicit, the signature does the following:

```text
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  SECRET_KEY)
```

A good secret key is random sequence of 64 bytes which can be generated by a pseudo-random generator like the following shell command.

```shell
openssl rand -hex 64
```

How does this make JWTs secure? It is possible to decode a JWT's header and payload, but with a signature, a JWT cannot be modified and sent to the server. This is because if the JWT is modified, its signature would need to be updated as well. The server _only_ knows how to sign the token because it knows the secret key thereby not allowing any modified JWTs to successfully authorize. Here's the steps taken by the client and the server for authorization.

1. The server sends the JWT to the client via a cookie.
1. The client makes subsequent requests with a JWT.
1. The server verifies the JWT by generating a signature from the header and payload in the JWT using its secret key and compares it with the signature provided.
1. If the signatures match, the server can be confident the token has not been modified.

### Exercise

Turn to a neighbor and explain what is a JWT. After a few minutes, your instructor will cold call on the class ask what you discussed.

## Why is a JWT important?

* It's compact. The size of the token is relatively small in size due to the encoding.
* It's self contained. The JWT can contain information about the user that can be sent to any service within its payload.
* It's cryptographically signed. This allows the JWT to maintain its integrity and not allow outside users tamper with the data.

### Exercise

Write down in your own words why a JWT is important. After 30 seconds, your instructor will cold call on the class ask what you discussed.

## How do you create a JWT?

Let's start for making a new branch in git.

```shell
git checkout -b jwt
```

In order to create a JWT, we can use a library called `jsonwebtoken`. To install it, use npm.

```shell
npm install --save jsonwebtoken
```

Next, we need to store our secret key that will be used to generate the JWT. We never want to store our secret key. For development and testing, we store our secret in a special file called `.env`. We can create that from the command line.

```shell
bash -c 'echo "JWT_SECRET="$(openssl rand -hex 64)' > .env
```

We do not want to include the `.env` file into our repository, so we add the file to our `.gitignore`.

```shell
echo '.env' >> .gitignore
```

Verify that your `.env` file is not staged to be committed in git.

```shell
git status
```

To load the `.env` file, we use a special library called `dotenv`. Using it will placed all variables into the process's *environment variables* (ie in `process.env`).

```shell
npm install --save-dev dotenv
```

In `server.js`, add the following code to require and config the `dotenv` package on non-production environments.

```javascript
'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// ...
```

To create the JWT, modify your authentication route in `routes/token.js`.

```javascript
'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const express = require('express');
const jwt = require('jsonwebtoken');    // New Code
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.post('/token', (req, res, next) => {
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

      /* New Code */
      const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3); // 3 hours
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '3h'
      });

      res.cookie('token', token, {
        httpOnly: true,
        expires: expiry,
        secure: router.get('env') === 'production'
      });
      /* End New Code */

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

```shell
http POST localhost:8000/token email='2pac@shakur.com' password=ambitionz
```

*Note:* The cookie is marked as `HttpOnly`, which means that the cookie can only be sent over HTTP and HTTPS. It also means you cannot access cookies in JavaScript on the browser using `document.cookie`. If there is any user information, you'd like the client to use, another cookie that's accessible needs to be set.

### Logout

Logging a user out is as easy as destroying the token cookie. This clears the session cookies so that the user cannot be authenticated.

```javascript
router.delete('/token', (req, res, next) => {
  res.clearCookie('token');
  res.send(true);
});
```

And run the following shell command.

```shell
http DELETE localhost:8000/token
```

And you should see something like this.

```text
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 2
Content-Type: text/plain; charset=utf-8
Date: Thu, 06 Oct 2016 06:15:11 GMT
ETag: W/"2-4KoCHiHd29bYzs7HHpz1ZA"
Set-Cookie: token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT

OK
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
  return knex('playlists').del()
    .then(() => {
      return knex('playlists').insert([{
        id: 1,
        track_id: 1,
        user_id: 1,
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

In order for a user to view their playlists, you'll need to ensure a user is logged in and obtain its user id. We do this by verifying the token. For this, we can build guard clauses to check if the proper user is allowed to make the changes. Since there will be a lot of user actions, this guard clause is a common guard clause to use and also forget. We can create a piece of middleware and apply it to specific routes.

Reading from the Cookie Headers can be quite convoluted, so we can install a package that provides middleware that parses the Cookie headers into an object. The package is called `cookie-parser`.

```shell
npm install --save cookie-parser
```

In your `server.js` file, add the cookie-parser middleware.

```javascript
const cookieParser = require('cookie-parser');
// ...

app.use(cookieParser());
// ...
```

Now, in your `routes/playlists.js` file, type in the following:

```javascript
'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.token = decoded;
    // You can now access the payload via req.token.userId
    next();
  });
};

router.get('/playlists', authorize, (req, res, next) => {
  const { userId } = req.token;

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

module.exports = router;
```

You can test out your service, by sending a token to the `GET /playlists` route.

```shell
http -v GET localhost:8000/playlists 'Cookie:token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ3NTczMzkwMiwiZXhwIjoxNDc1NzQ0NzAyfQ.UxLljlMgRlcmVFQ3BJ3km7rwmxbnZZOkOqbPRCK0kU4;'
```

And should see the following response.

```text
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 180
Content-Type: application/json; charset=utf-8
Date: Wed, 03 Aug 2016 00:57:37 GMT
ETag: W/"b4-LmlrS0rY4sUAN7daTFQADQ"

[
    {
        "artist": "The Beatles",
        "createdAt": "2016-06-26T14:26:16.000Z",
        "id": 1,
        "likes": 28808736,
        "title": "Here Comes the Sun",
        "trackId": 1,
        "updatedAt": "2016-06-26T14:26:16.000Z",
        "userId": 1
    }
]
```

Once you have succeeded, add and commit your changes.

```shell
git add .
git commit -m 'Add routes for a users following artists'
```

Once committed, merge in your changes.

```shell
git checkout master
git merge jwt
git branch -d jwt
```

## Assignment

- [Galvanize Bookshelf - Authentication and Authorization](https://github.com/gSchool/galvanize-bookshelf/blob/master/4_authentication_authorization.md)

## Resources

- [Express - Production Best Practices: Security - Use cookies securely](http://expressjs.com/en/advanced/best-practice-security.html#use-cookies-securely)
- [Wikipedia - Authentication](https://en.wikipedia.org/wiki/Authentication)
- [Wikipedia - Authorization](https://en.wikipedia.org/wiki/Authorization)
- [Wikipedia - Base64](https://en.wikipedia.org/wiki/Base64)
- [Wikipedia - HTTP cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
- [wikipedia - SHA-1](https://en.wikipedia.org/wiki/SHA-1)
- [Where to Store your JWTs – Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
- Identity as a Service that uses JWTs [Stormpath](https://www.stormpath.com) and [Auth0](https://www.auth0.com)
