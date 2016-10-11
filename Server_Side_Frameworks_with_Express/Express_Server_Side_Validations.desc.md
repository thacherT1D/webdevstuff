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
const app = express();

app.post('/users', (req, res, next) => {
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

Server-side validation sits in between database-side validations and client-side validations, but for all practical purposes the terms server-side and database-side are used interchangeably to describe the validation occurs after client-side validation, before data is accepted into your back-end systems. If you think about client-side validations as the warnings that pop up as a user fills out a form, server-side/database-side validations are what protects your data from malicious intruders and breaches.

In addition to catching simple mistakes, like missing information, server-side validation can protect your application, and its users, against those who would send malicious input to the server. It's very dangerous to assume that your application's user interface will protect the server from malicious user input. Remember, an HTTP request can be sent from many locations, not just the ones your application provides via its UI.

When creating route handlers, always ask yourself, "What if an HTTP request was sent..."

- From the browser's URL bar?
- From the browser's console?
- From another program like HTTPie?

A user can send HTTP requests by whatever means he or she wishes. And it's the job of a web developer to ensure one bad apple doesn't spoil the bunch.

### Exercise

In your own words, write down why server-side validation is important. Focus on the different scenarios server-side validation protects against. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## How do you validate user input sent to an Express server?

The [`express-validation` library](https://github.com/andrewkeig/express-validation) provides Express middleware to validate any user input found in the following locations of an HTTP request.

- `req.body`
- `req.query`
- `req.params`
- `req.header`
- `req.cookies`

**NOTE:** For most HTTP requests, you'll only need to validate user input found in `req.body` and `req.query`.

It does so with the help of the [`joi` library](https://github.com/hapijs/joi), which provides a system for defining a schema to ensure the properties of the above objects contain valid information. If any user input found in these objects fail to validate against a `joi` schema, `express-validation` will immediately pass an error object, filled with human-friendly error messages, to the `next` error handling middleware in the stack.

## Validate Trackify Users

To start off, change into the `trackify` directory project.

```shell
cd trackify
```

```shell
git checkout -b validations
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

In the validations/users.js file, add the following validation logic that'll be used for the `POST /users` middleware.

```JavaScript
'use strict';

const joi = require('joi');

module.exports.post = {
  body: {
    email: Joi.string(),
    password: Joi.string()
  }
};
```

Explore the follow validation rules and add more rules as you see fit.

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
      .trim(),

    password: Joi.string()
      .label('Password')
      .required()
      .trim()
      .min(8)
  }
};
```

Now that the validation schema is defined, add the following code to the top of the `routes/users.js` file.

```JavaScript
const ev = require('express-validation');
const validations = require('../validations/users');

```

For the POST request, we are going to update the post request we have to match the one below. Adding the ```ev(validations.post)``` and removing our specific boom errors.

```JavaScript
router.post('/users', ev(validations.post), (req, res, next) => {

  const { email, password } = req.body;

  /// remaining bcrypt code

});
```

In the `server.js` file, add the second if statement from the following code into your existing error hander to display the any validation error that occur.

```JavaScript
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  if(err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.statusText)
  }

  console.error(err.stack);
  res.sendStatus(500);
});
```
## Test your validations
```shell
cd trackify
```

```shell
npm start
```
In a separate terminal window, try a GET request to determine your app is up and working:

```shell
HTTP GET :8000/tracks
```

Next, try to POST a user correctly:

```shell
HTTP POST :8000/users email=yogi@bear.com password=picnicbaskets
```
Response:
```shell
{
    "createdAt": "2016-10-10T23:49:50.000Z",
    "email": "yogi@bear.com",
    "id": 3,
    "updatedAt": "2016-10-10T23:49:50.000Z"
}
```

Next, try to POST a user with an incorrect password:

```shell
HTTP POST :8000/users email=yogi@bear.com password=picnic
```
Response:
```shell
  Bad Request
```
That's not a very helpful error... in the server.js file lets add a line to tell us more specifically what our error is:

```JavaScript
app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(JSON.stringify(err, null, 2));

  if(err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.statusText)
  }
  console.error(err.stack);
  res.sendStatus(500);
});
```

Let's try to POST a user with an incorrect password again:

```shell
HTTP POST :8000/users email=yogi@bear.com password=picnic
```
Looking at our server, we will see a more specific error:
```shell
{
  "status": 400,
  "statusText": "Bad Request",
  "errors": [
    {
      "field": "password",
      "location": "body",
      "messages": [
        "\"Password\" length must be at least 8 characters long"
      ],
      "types": [
        "string.min"
      ]
    }
  ]
}
POST /users 400 2.611 ms - 11
```

And then try to POST a user with an incorrect email:

```shell
HTTP POST :8000/users email=yogi password=picnicbaskets
```
This time our error will look like this:
```shell
{
  "status": 400,
  "statusText": "Bad Request",
  "errors": [
    {
      "field": "email",
      "location": "body",
      "messages": [
        "\"Email\" must be a valid email"
      ],
      "types": [
        "string.email"
      ]
    }
  ]
}
POST /users 400 1.594 ms - 11
```

SUCCESS!

## Validate Trackify Tracks

Create a file called `validations/tracks.js`.

```shell
touch validations/tracks.js
```

In the validations/tracks.js file, add the following validation logic that'll be used for the `POST /tracks` middleware.

```JavaScript
'use strict';

const joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string(),
    artist: Joi.string(),
    likes: Joi.number()
  }
};
```
Going back to the [joi API Reference docs](https://github.com/hapijs/joi/blob/v9.0.0-9/API.md) add additional rules that would suit the tracks data.

```JavaScript
'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    title: Joi.string()
      .label('Title')
      .required()
      .trim(),

    artist: Joi.string()
      .label('Artist')
      .required()
      .trim(),

    likes: Joi.number()
      .integer()
      .min(0)
      .label('Likes')
      .required()
  }
};
```

Now that the validation schema is defined, add the following code to the top of the `routes/tracks.js` file.

```JavaScript
const ev = require('express-validation');
const validations = require('../validations/tracks');

For the POST request, again we are going to update it to match the one below. Adding the ```ev(validations.post)``` and removing our specific boom errors.

router.post('/tracks', ev(validations.post), (req, res, next) => {
  const { title, artist, likes } = req.body;
  const insertTrack = { title, artist, likes };

  ///remaining code

});
```
In a separate terminal window, try a GET request to determine your app is up and working:

```shell
HTTP GET :8000/tracks
```

Next, try to POST a user correctly:
HTTP POST :8000/tracks title="No Bears Allowed" artist="Ranger Smith" likes:=9
Response:
```shell
{
    "artist": "Ranger Smith",
    "createdAt": "2016-10-11T01:00:39.020Z",
    "id": 8,
    "likes": 9,
    "title": "No Bears Allowed",
    "updatedAt": "2016-10-11T01:00:39.020Z"
}
```

Next, try to POST a user without a title:

```shell
HTTP POST :8000/tracks title= artist="Boo-Boo Bear" likes:=35
```
Response:
```shell
  Bad Request
```
The more detailed error that we added shows us:
```shell
{
  "status": 400,
  "statusText": "Bad Request",
  "errors": [
    {
      "field": "title",
      "location": "body",
      "messages": [
        "\"Title\" is not allowed to be empty"
      ],
      "types": [
        "any.empty"
      ]
    }
  ]
}
POST /tracks 400 5.376 ms - 11
```


## Assignment

- [Server-side Validations for Galvanize Bookshelf](https://gist.github.com/ryansobol/7d02bc09fddec3621b463803460dd2b4)

## Resources

- [Client-side vs Server-side Validation](http://stackoverflow.com/questions/162159/javascript-client-side-vs-server-side-validation)
