## Objectives

* Explain what a cryptographic hash function is.
* Explain why a cryptographic hash function is important.
* Explain what a salt is.
* Explain why using a salt is important.
* Explain the process of user registration.
* Use Knex migrations to create a users table.
* Use an HTML form to gather user information.
* Add custom routes for user registration.
* Use bcrypt to hash and salt passwords.

## What's cryptographic hash function?

A **cryptographic hash functions** is a mathematical algorithm that converts a string of arbitrary length to a string of fixed length. Given the same input string, a cryptographic hash function always produces the same output string.

```text
┌─────────────┐        ┌───────────────┐       ┌─────────────────────┐
│             │        │               │       │ 6e9c 620d cd31 6bf2 │
│     Fox     │        │ Cryptographic │       │ 9a37 bf6d 0be3 d685 │
│             │───────▶│ hash function │──────▶│ acfd 18be a7e6 d5a2 │
│             │        │               │       │ a697 1045 3961 0491 │
└─────────────┘        └───  sha256  ──┘       └─────────────────────┘

┌─────────────┐        ┌───────────────┐       ┌─────────────────────┐
│             │        │               │       │ ddad 2ab3 b2a8 f269 │
│     Fax     │        │ Cryptographic │       │ a001 bb26 a075 4a6b │
│             │───────▶│ hash function │──────▶│ 49ed f7ab 7ddb c953 │
│             │        │               │       │ 12fa 89c8 e19a b03e │
└─────────────┘        └───  sha256  ──┘       └─────────────────────┘

┌─────────────┐        ┌───────────────┐       ┌─────────────────────┐
│             │        │               │       │ 46b7 ffe0 588c ec9b │
│    Haxor    │        │ Cryptographic │       │ 80de a058 a448 a063 │
│             │───────▶│ hash function │──────▶│ 9be9 451e 99ea 89f6 │
│             │        │               │       │ 3899 67e1 bcfc 3672 │
└─────────────┘        └───  sha256  ──┘       └─────────────────────┘
```

A cryptographic hash function is designed to be one-way function. In other words, it should be unfeasible to calculate the input string based on the output string. The only way to recreate the input string using it's output string is to try a large number of possible inputs to see if they produce a match.

**NOTE:** There is no encryption involved in a cryptographic hash function because encryption is a two-way process. When you encrypt a string, you expect to reverse the process and get the original string back out again.

The input string is often called the message, and the output string is often called the message digest or simply the digest. The ideal cryptographic hash function has four main properties.

1. It's quick to compute the digest for any given message.
1. It's infeasible to generate a message from its digest, except by trying all possible messages.
1. A small change to a message should change the digest so extensively that the new digest appears uncorrelated with the old digest.
1. It's infeasible to find two different messages with the same digest.

To hash your own message with the [sha256 cryptographic hash function](https://en.wikipedia.org/wiki/SHA-2), run the following shell commend.

```shell
echo 'YOUR MESSAGE HERE' | openssl dgst -sha256
```

### Exercise

Turn to a neighbor and explain what a cryptographic hash function is in your own words. Once you're satisfied, talk about when you might use one.

## Why is password hashing important?

If user-submitted passwords are stored inside a database unhashed, that information is compromised when the database is stolen. The means whoever has access to that data can use try the user's login credentials on other sites. And since so many people use the same password for every site, chances are good the malicious person can now log into your users' banks and online stores. That's why it's necessary to store hashed passwords in your application's database.

Using defined algorithms, hashing helps protect against hash tables, dictionary attacks, rainbow tables, and other types of brute-force attacks.

Password hashing also provides an extra layer of security between developer and end user. When passwords are stored as cryptographic hashes, the developer never has access to a user's plain-text password.

### Exercise

In your own words, write down why cryptographic password hashing is important. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## What is a salt?

Before a password is run through a hashing function, it is recommended to add another layer of protection with something called a salt. A **salt** is a random data string that is concatenated to input before it's hashed.

## Why is using a salt important?

Using a salt provides extra security since different random data is generated each time for each password. This prevents attackers from potentially using a table of precomputed hashes of common passwords to gain access.

### Exercise

Turn to your neighbor and discuss what a salt is and how it adds another layer of security before hashing a password. We'll regroup and I'll pick students at random to share what you talked about.

## What is the user registration process?

1. User submits form with various data required to register
1. Database is queried to see if unique information already exists, such as email
1. If not, plain-text password is concatenated with random generated salt
1. Plain-text password + salt is then run through hashing function, which returns an encoded string at a fixed length (hash)
1. Hash is inserted along with user information into database

## Create migrations for users table

To start off with, change into your `trackify` directory and make a new branch called `registration`.

```shell
cd PATH_TO/trackify
git checkout -b registration
```

Open the project directory with atom if you haven't already, and create the migration file to define the schema for the users table.

```shell
atom .
npm run knex migrate:make users
```

Inside the newly created `TIMESTAMP_users.js` migration file, add the following:

```JavaScript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable().defaultTo('');
    table.string('password').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

Add and commit your work.

```shell
git add .
git commit -m "create migration file for users table"
```

## Use an HTML form to gather user information

Install and save the `path` module as a dependency. Make a new directory called `public`.

```shell
npm install --save path
mkdir public
```

Require `path` and add the following Express middleware to `server.js` to serve static files from the `public` directory.

```JavaScript
const path = require('path');

app.use(express.static(path.join('public')));
```

Create an HTML file to gather user information required to register.

```shell
touch public/registration.html
```

Use the following HTML form as a rough template.

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>User Registration</title>
  </head>

  <body>
    <form method="post" action="/users">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" name="password" id="password">
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </body>
</html>
```

Add and commit your work.

```shell
git add .
git commit -m "use html form to gather user registration data"
```

## Add user registration route

Create a new file for the users routes and open it with Atom.

```shell
touch routes/users.js
atom routes/users.js
```

In the `server.js` file, add the necessary routing middleware for the `/users` endpoint:

```JavaScript
const usersRoutes = require('routes/users');

app.use('/users', usersRoutes);
```

After requiring the necessary dependencies for an Express router and Knex, add a `POST` route to the `'/'` path in the `users.js` file. Save the incoming data from `req.body` as constants for email and password.

```JavaScript
'use strict';

const express = require('express');
const router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('../knexfile')[environment];
const knex = require('knex')(knexConfig);

router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Check if email already exists in database
});
```

Add and commit your work.

```shell
git add .
git commit -m "add register user route"
```

In the route handler, before hashing the password or inserting data, query the database to see if the email already exists.

```JavaScript
router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  knex('users').where('email', email)
    .then((data) => {
      if (data.length) {
        let err = new Error('Email already exists');
        err.status = 409;
        return next(err);
      }

      // Hash and salt password
    })
    .catch((err) => {
      return next(err);
    });
});
```

Add and commit your work.

```shell
git add .
git commit -m "add unique email check"
```

## How to use bcrypt

For our password hashing, we will use an NPM package called bcrypt. To start off with, install and save bcrypt:

```shell
npm install --save bcrypt
```

### Technique 1 (Generate salt and hash on separate function calls)

```JavaScript
const bcrypt = require('bcrypt');
const plainTextPassword = 'password123';
const saltRounds = 10;

bcrypt.genSalt(saltRounds, (saltErr, salt) => {
  if (saltErr) {
    // Handle saltErr
  }

  bcrypt.hash(plainTextPassword, salt, (hashErr, hash) => {
    if (hashErr) {
      // Handle hashErr
    }

    // Store hash in your password database
  });
});
```

### Technique 2 (Auto-gen a salt and hash)

- The first argument is the plain-text password to be hashed.
- The second argument is the cost of processing the data (defaults to 10).
- The final argument is a callback with two parameters:
  - `err` details any errors
  - `hash` is the encoded string that can be stored in the database.

```JavaScript
bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (err) {
    // Handle err
  }

  // Store hash in your password database
});
```

Use the `bcrypt.hash()` method to generate a salt and hash the password.

```JavaScript
router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  knex('users').where('email', email)
    .then((data) => {
      if (data.length) {
        let err = new Error('Email already exists');
        err.status = 409;
        return next(err);
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return next(err);
        }

        // Store hash in your password database
      });
    })
    .catch((err) => {
      return next(err);
    });
});
```

Add and commit your work.

```shell
git add .
git commit -m "use bcrypt to hash password"
```

Finally, use Knex to insert the email and hashed password into the users table.

```JavaScript
router.post('/', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  knex('users').where('email', email)
    .then((data) => {
      if (data.length) {
        let err = new Error('Email already exists');
        err.status = 409;
        return next(err);
      }

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return next(err);
        }

        knex('users').returning('*')
          .insert({
            email: email,
            password: hash
          })
          .then((users) => {
            res.status(200).send(users[0]);
          })
          .catch((err) => {
            return next(err);
          });
      });
    })
    .catch((err) => {
      return next(err);
    });
});
```

Add and commit your work, and push to the registration branch. Then, checkout the master branch, and merge registration into master. Delete the registration branch if you'd like.

```shell
git add .
git commit -m "use knex to insert user data with hash into db"
git push origin registration
git checkout master
git merge registration
git branch -d registration
```

## Videos

<iframe width="560" height="315" src="https://www.youtube.com/embed/pVinBTaNtnM" frameborder="0" allowfullscreen></iframe>
