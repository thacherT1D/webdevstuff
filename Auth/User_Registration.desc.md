## Objectives

- Explain what a cryptographic hash function is.
- Explain why a cryptographic hash function is important.
- Explain what bcrypt is.
- Register a user with a hashed password.

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

A cryptographic hash function is designed to be a one-way function. In other words, it should be unfeasible to calculate the input string based on the output string. The only way to recreate the input string using it's output string is to try a large number of possible inputs to see if they produce a match.

**NOTE:** There is no encryption involved in a cryptographic hash function because encryption is a two-way process. When you encrypt a string, you expect to reverse the process and get the original string back out again.

The input string is often called the message, and the output string is often called the message digest or simply the digest. The ideal cryptographic hash function has four main properties.

1. It's quick to compute the digest for any given message.
1. It's infeasible to generate a message from its digest, except by trying all possible messages.
1. A small change to a message should change the digest so extensively that the new digest appears uncorrelated with the old digest.
1. It's infeasible to find two different messages with the same digest.

One such cryptographic hash function is called [sha256](https://en.wikipedia.org/wiki/SHA-2). To hash a message with sha256, run the following shell commend.

```shell
echo 'Fox' | shasum -a 256
```

If you hash the digest from above, you won't get the original message back. Instead, you'll get a different digest.

```shell
echo '6e9c620dcd316bf29a37bf6d0be3d685acfd18bea7e6d5a2a697104539610491' | shasum -a 256
```

### Exercise

Turn to a neighbor and explain what a cryptographic hash function is in your own words. Once you're satisfied, talk about when you might use one.

## Why is a cryptographic hash function important?

As you've seen, a malicious user can leverage SQL injection attacks to access the rows of a database table without much effort. A common target of these attacks is a `users` table which often contains passwords. If user-submitted passwords are stored in a table without being hashed, your and possibly other web applications are now compromised as users tend to have the same password. That's why it's necessary to store hashed passwords in your application's database.

Using defined algorithms, hashing helps protect against hash tables, dictionary attacks, rainbow tables, and other types of brute-force attacks.

Password hashing also provides an extra layer of security between developer and end user. When passwords are stored as cryptographic hashes, the developer never has access to a user's plain-text password.

### Exercise

In your own words, write down why cryptographic password hashing is important. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## What's bcrypt?

[Coda Hale - How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/)

When hashing an input string, bcrypt will go through `2^rounds` iterations when generating a digest. On a 2GHz core machine, you can roughly expect the following performance when using the `bcrypt` NPM module.

| rounds | performance    |
|--------|----------------|
| 8      | ~40 hashes/sec |
| 9      | ~20 hashes/sec |
| 10     | ~10 hashes/sec |
| 11     | ~5  hashes/sec |
| 12     | 2-3 hashes/sec |
| 13     | ~1 hash/sec    |
| 14     | ~1.5 hash/sec  |
| 15     | ~3 hash/sec    |
| 25     | ~1 hash/hour   |
| 31     | 2-3 hash/days  |

Before a password is run through a hashing function, it is recommended to add another layer of protection with something called a salt. A **salt** is a random data string that is concatenated to input before it's hashed.

Using a salt provides extra security since different random data is generated each time for each password. This prevents attackers from potentially using a table of precomputed hashes of common passwords to gain access.

### Exercise

Turn to your neighbor and explain what bcrypt is. In your conversation, include some of the advantages bcrypt has over other cryptographic hash functions. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## How do you register a user with a hashed password?

Here's a high-level overview of the user registration process.

1. A user sends identification information to an HTTP server which includes a unique account name and a plaintext password.
1. On the server, the password is concatenated with a randomly generated salt.
1. Then, a cryptographic hash function takes the password + salt message and returns a digest.
1. The digest is inserted into the database along side the user's other information.
1. The server informs the client that registration was a success.

To start off with, change into your `trackify` directory and make a new branch called `registration`.

```shell
cd trackify
git checkout -b registration
```

Open the project directory with atom if you haven't already, and create the migration file to define the schema for the users table.

```shell
npm run knex migrate:make users
atom .
```

Inside the new migration file, add the following:

```JavaScript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
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
git commit -m "Create users migration"
```

## Add user registration route

Create a new file for the users routes and open it with Atom.

```shell
touch routes/users.js
```

In the `server.js` file, add the necessary routing middleware for the `/users` endpoint:

```JavaScript
const users = require('routes/users');

app.use(users);
```

Add the following code to the `routes/users.js` module.

```JavaScript
'use strict';

const express = require('express');
const router = express.Router();

router.post('/users', (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;
```

Then run the following shell command.

```shell
http POST localhost:8000/users
```

Add and commit your work.

```shell
git add .
git commit -m "Add POST /user route"
```

For our password hashing, we will use an NPM package called bcrypt. To start off with, install and save bcrypt:

```shell
npm install --save bcrypt
```

Use the `bcrypt.hash()` method to generate a salt and hash the password.

```JavaScript
'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashed_password) => {
    if (err) {
      return next(err);
    }

    console.log(hashed_password);
    res.sendStatus(200);
  });
});

module.exports = router;
```

Then run the following shell command.

```shell
http POST localhost:8000/users email=neo@thematrix.com password=theone
```

Add and commit your work.

```shell
git add .
git commit -m "Use bcrypt to hash password"
```

Finally, use Knex to insert the email and hashed password into the users table.

```JavaScript
'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('../knex');

router.post('/users', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashed_password) => {
    if (err) {
      return next(err);
    }

    knex('users')
      .insert({
        email: req.body.email,
        hashed_password: hashed_password
      }, '*')
      .then((users) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        next(err);
      });
  });
});

module.exports = router;
```

```shell
http POST localhost:8000/users email=neo@thematrix.com password=theone
```

Add and commit your work, and push to the registration branch. Then, checkout the master branch, and merge registration into master. Delete the registration branch if you'd like.

```shell
git add .
git commit -m "Add user registration"
git push origin registration
git checkout master
git merge registration
git branch -d registration
```

## Exercise

- [Galvanize Bookshelf - User registration](https://github.com/gSchool/galvanize-bookshelf/blob/master/3_user_registration.md)

## Resources

- [Coda Hale - How To Safely Store A Password](https://codahale.com/how-to-safely-store-a-password/)
- [Stack Overflow - What column type/length should I use for storing a Bcrypt hashed password in a Database?](http://stackoverflow.com/a/5882472)
- [Wikipedia - Cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function)
- [Salted Password Hashing - Doing it Right](https://crackstation.net/hashing-security.htm)

## Videos

### Ethical Hacking Tutorials - 32 - Cryptographic Hash function

<iframe width="560" height="315" src="https://www.youtube.com/embed/pVinBTaNtnM" frameborder="0" allowfullscreen></iframe>
