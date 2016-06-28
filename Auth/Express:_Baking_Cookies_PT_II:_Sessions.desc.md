# Baking Cookies Part II: Sessions

## Objectives

By the end of this lesson you will be able to:

- Describe the purpose and function of a session.
- Store a session in a cookie.
- Clear a session from a cookie.
- Use environment variables to store session key.

***

## Sessions

Broadly speaking, a session refers to an ongoing dialogue between two system. In the case of Express, the systems are the client and the server.

When a client makes a request to the server, the server creates a session to identify the client. The server can then use that session throughout the ongoing dialogue to keep track of who the client is.

Essentially, a session is a piece of data which can provide:

- a way to identify the client.
- ensure the client is not falsifying information.

A session can be stored:

- in databases like `mongo` or `postgres`.
- in memory data stores like `redis` or straight up node.
- in a `cookie` or a `JWT`.
- in many other forms.

A session can be cryptographically signed using secret keys to ensure the data has not been tampered with or falsified.

***

## Sessions in Express

[Cookie-Session](https://github.com/expressjs/cookie-session) is a piece of middleware that provides:

- A way to set cookies and send them to the client.
- A way to sign cookies and verify their authenticity.

**You Do:**

Watch the following video, as you do consider the following questions:

<iframe src="https://player.vimeo.com/video/141306923?byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Using Cookie-Session

Set up the `cookie-session` middleware:

```javascript
var cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session' //name of cookie to set
  // other cookie attributes like maxAge, expires,  domain can be set here
  keys: ['some_secure_key']
}));
```

Cookie session modifies the `req` object:

- `req.session` represents the session stored in the cookie.
- `req.sessionOptions` represents the settings of the session.


To read a session value:

```javascript
app.get('/', function(req,res){

  // get a value from the session and print it
  console.log('Some stored session value', req.session.someValue);

  res.end();
});
```

To set a session value:

```javascript
app.get('/', function(req,res){

  // set a session value
  req.session.otherValue = 'foo';

  res.end();
});
```

To delete a session:

```javascript
app.get('/', function(req, res){

  // delete the session
  req.session = null;

  res.end();
});
```

### Generating secure keys and using dotenv to load them.

In the example above, we hard coded the key `some_secure_key`. We don't want to hard code our key because:

- it is hard to change.
- anyone who has access to the source code has access to the key.

In addition, `some_secure_key` could be easily brute forced by an attacker.

In a production environment you don't want anybody to know your keys. Otherwise, someone can use the keys to sign their own sessions. This is very bad because the malicious user can then falsify data and galavant around as an admin or someone else.

Let's create some secure keys:

**You Do:**

Generate at and save at least 3 keys using the following command:

```bash
node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });"
```

Since hard coding the keys is poor practice, an environment variable should be used for the keys

**You Do**

Create a `.env` file to store the keys:

```bash
KEY_ONE=somevalue
KEY_TWO=somevalue
KEY_THREE=somevalue
```

**You Do**

1. Update your project to make use of `dotenv` to load the `.env` file.
1. Replace the hard coded keys with the environment variable keys.

```javascript
//loads all key value pairs from .env file into shell as environment variables
require('dotenv').configure();

var express = require('express');
var cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session'
  // use environment variables to store secure information
  keys: [process.env.KEY_ONE, process.env.KEY_TWO, process.env.KEY_THREE]
}));
```

***

## Exercise

[Github Repo]()

***

## Resources

- [Github: Cookie-Session](https://github.com/expressjs/cookie-session)
- [Wikipedia: HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
- [Github: dotenv](https://github.com/motdotla/dotenv)
