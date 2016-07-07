## Objectives

- Explain what server-side validation is.
- Explain why server-side validation is important.
- Validate user input sent to an Express server.

## What's server-side validation?

**Server-side validation** is the process of a server using a defined set of rules to ensure input from a client is correct, meaningful, and secure. The rules to validate on a server can be as strict or lenient as the developer prefers, but remember to NEVER TRUST THE CLIENT.

### Exercise

Turn to a neighbor and explain what server-side validation is. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## Why is server-side validation important?

Server-side validation can protect against malicious users who attempt to submit dangerous input to the server. It is very dangerous to trust your UI. Not only can users abuse your UI, but they may not be using your UI at all, or even a browser. What if the user manually edits the URL, or runs their own Javascript, or tweaks their HTTP requests with another tool? What if they send custom HTTP requests from `curl` or from a script, for example? Clients can send HTTP requests by whatever means they wish, and you should respond correctly. That includes validation.

### Exercise

In your own words, write down why server-side validation is important. Focus on the different scenarios server-side validation protects against. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

Turn to your neighbor and explain what the `express-validation` package is. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## How do you validate user input sent to an Express server?

The [`express-validation` library](https://github.com/andrewkeig/express-validation) provides Express middleware that validates the user input found in the following possible locations of an HTTP request.

- `req.body`
- `req.params`
- `req.query`
- `req.header`
- `req.cookies`

It does so with the help of the [`joi` library](https://github.com/hapijs/joi), which provides a system for defining a schema to ensure the properties of the above objects contain valid data. If any user input in these objects fail to validate against a `joi` schema, `express-validation` will immediately send an HTTP response, with human-friendly the error messages, back to the client.

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

Explore the [`joi` Documentation](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md#validatevalue-schema-options-callback) and add more rules for validating the email address and password. (min, max, regex, trim, email, required, etc.)

```JavaScript
'use strict';

module.exports.post = {
  body: {
    email: Joi.string()
      .email()
      .min(3)
      .max(63)
      .label('Email')
      .trim()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .label('Password')
      .trim()
      .required()
  }
};
```

Now that the validation logic is setup, in the `users.js` routes file, require `express-validation` and the `schema` module you just created. Add the following middleware to validate on specific routes.

```JavaScript
const ev = require('express-validation');
const validations = require('../validations/users');

router.post('/users', ev(validations.post), (req, res, next) => {
  // Route handler logic
});
```

In the `server.js` file, require `express-validation` and alter the error handler to display the validation error(s)

```JavaScript
const ev = require('express-validation');

app.use((err, _req, res, _next) => {
  if (err instanceof ev.ValidationError) {
    return res.status(err.status).json(err);
  }

  console.error(err);
  res.sendStatus(500);
});
```

## Assignment

- [Trackify Validations](https://github.com/ryansobol/trackify/blob/express_validations/1_User_Input_Validation.md)

## Resources

- [Client-side vs Server-side Validation](http://stackoverflow.com/questions/162159/javascript-client-side-vs-server-side-validation)
