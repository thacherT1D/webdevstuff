## Objectives

- Explain what server-side validation is.
- Explain why server-side validation is important.
- Validate user input sent to an Express server.

## What's server-side validation?

**Server-side validation** is the process of a HTTP server using a defined set of rules to ensure user input from a client is correct, meaningful, and secure. The rules to validate on a server can be as strict or lenient as the developer prefers, but remember to **never** trust user input sent from the client.

Here's an example of server-side validation for a user registration route handler.

```javascript
'use strict';

const express = require('express');
const app = express.Router();

router.post('/users', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || email.trim() === '') {
    const err = new Error('Email must not be blank');
    err.status = 400;

    return next(err);
  }

  if (!password || password.trim() === '') {
    const err = new Error('Password must not be blank');
    err.status = 400;

    return next(err);
  }

  // ...
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

// ...
```

### Exercise

Turn to a neighbor and explain what server-side validation is. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## Why is server-side validation important?

In addition to catching simple mistakes, like missing information, server-side validation can protect your application, and it's users, against those who would send malicious input to the server. It's very dangerous to assume that your application's user interface will protect the server from malicious user input. Remember, an HTTP request can be sent from many locations, not just the ones you're application provides via its UI.

When creating route handlers, always ask yourself, "What if an HTTP request was sent..."

- From the browser's URL bar?
- From the browser's console?
- From another program like HTTPie?

A user can send HTTP requests by whatever means he or she wishes. And it's the job of a web developer to ensure one bad apple doesn't spoil the bunch.

### Exercise

In your own words, write down why server-side validation is important. Focus on the different scenarios server-side validation protects against. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

Turn to your neighbor and explain what the `express-validation` package is. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## How do you validate user input sent to an Express server?

The [`express-validation` library](https://github.com/andrewkeig/express-validation) provides Express middleware to validate any user input found in the following locations of an HTTP request.

- `req.body`
- `req.params`
- `req.query`
- `req.header`
- `req.cookies`

It does so with the help of the [`joi` library](https://github.com/hapijs/joi), which provides a system for defining a schema to ensure the properties of the above objects contain valid information. If any user input found in these objects fail to validate against a `joi` schema, `express-validation` will immediately pass an error object, filled with human-friendly the error messages, to the `next` error handling middleware in the stack.

To start off, change into the `trackify` directory project.

```shell
cd trackify
```

Install the `express-validation` and `joi` NPM packages.

```shell
npm install --save express-validation joi
```

Make a new directory to store validation schemas.

```shell
mkdir validations
```

Create a file called `validations/users.js`.

```shell
touch validations/users.js
```

In this file, add the following validation logic that'll be used for the `POST /users` middleware.

```JavaScript
'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string(),
    password: Joi.string()
  }
};
```

Explore the follow validation rules and add more rules as you see fit.

- [`any.example(value)`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#anyexamplevalue)
- [`any.label(name)`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#anylabelname)
- [`any.optional()`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#anyoptional)
- [`any.required()`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#anyrequired)
- [`string.email([options])`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#stringemailoptions)
- [`string.length(limit, [encoding])`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#stringlengthlimit-encoding)
- [`string.max(limit, [encoding])`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#stringmaxlimit-encoding)
- [`string.min(limit, [encoding])`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#stringminlimit-encoding)
- [`string.regex(pattern, [name])`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#stringregexpattern-name)
- [`string.trim()`](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#stringtrim)


```JavaScript
'use strict';

module.exports.post = {
  body: {
    email: Joi.string()
      .label('Email')
      .required()
      .email()
      .trim()

    password: Joi.string()
      .label('Password')
      .required()
      .trim()
      .min(8)
  }
};
```

Now that the validation schema is defined, add the following code to the `routes/users.js` file.

```JavaScript
const ev = require('express-validation');
const validations = require('../validations/users');

// ...

router.post('/users', ev(validations.post), (req, res, next) => {
  // Route handler logic
});
```

In the `server.js` file, add the following code to display the any validation error that occur.

```JavaScript
const ev = require('express-validation');

// ...

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send(err);
  }

  console.error(err);
  res.sendStatus(500);
});
```

## Assignment

- [Trackify Validations](https://github.com/ryansobol/trackify/blob/express_validations/1_User_Input_Validation.md)

## Resources

- [Client-side vs Server-side Validation](http://stackoverflow.com/questions/162159/javascript-client-side-vs-server-side-validation)
