## Objectives

* Explain cryptographic password hashing
* Explain why password hashing is important
* Explain what a salt is
* Explain why using a salt is important
* Explain the process of user authentication
* Use bcrypt to hash and salt passwords
* Use bcrypt to authenticate a user

* Use server-side validation on user input from a form
* Create routes for authentication

## What is cryptographic password hashing?

**Password hashing** is a security process that takes a user-submitted password and encrypts it, producing an encoded string. Cryptographic hash functions are intended to be one-way functions, meaning it is supposed to be unfeasible to calculate the input based on an encoded string's output.

## Why is password hashing important?

User information is far more vulnerable if passwords are stored in plain-text when a database is compromised, so it's highly recommended to store them as encoded strings at a fixed length. Using defined encryption algorithms, hashing helps protect against hash tables, dictionary attacks, rainbow tables, and other types of brute-force attacks.

Some of the properties of a successful hashing function include:

* The process of hashing is quick and inexpensive for any input
* It is impractical for a hash to be the same for two different inputs
* It is impractical to calculate an input based on a hash
* Even small changes to an input will result in a completely new hash that is uncorrelated to a previous hash

## What is a salt?

Before a password is run through a hashing function, it is recommended to add another layer of protection with something called a salt. A **salt** is random data that is concatenated to input before it is hashed.

## Why is using a salt important?

Using a salt provides extra security since different random data is generated each time for each password. This prevents attackers from potentially using a table of precomputed hashes of common passwords to gain access.

## What is user authentication?

The process of **user authentication** starts when a user provides a password to be stored for future login. When a user attempts to login, their password is hashed and compared to the encoded string stored in the database. If they are equivalent, the user is who they claim and can successfully login.

### User Registration

1. User provides password on registration/signup
1. Plain-text password is concatenated with random generated salt
1. Plain-text password + salt is run through hashing function
1. Encoded string output (hash) is stored in database

### User Login

1. User enters password on login
1. Plain-text password is hashed
1. Encoded string is compared to hash from database
1. If match, user is authenticated

## How to use bcrypt

### `bcrypt.hash()`

For our password hashing, we will use an NPM package called bcrypt. There are a number of methods available from bcrypt. We'll be taking advantage of the `.hash()` method, which takes three arguments:

1. The first argument is the plain-text password to be hashed.
1. The second argument is the cost of processing the data (defaults to 10).
1. The final argument is a callback with two parameters:
  - `err` details any errors
  - `hash` is the encoded string that can be stored in the database.

```JavaScript
const bcrypt = require('bcrypt');
const plainTextPassword = 'password123';
const saltRounds = 10;

bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (err) {
    // Handle err
  }

  // Store hash in your password database
});
```

### `bcrypt.compare()`

To authenticate a user who is trying to login, bcrypt provides a function that compares the user's password with the hashed password stored on the database. The `.compare()` method also takes three arguments:

1. The first argument is the plain-text password from a user login attempt
1. The second parameter is the stored hash from the database
1. The final argument is a callback with two parameters:
  - `err` details any errors
  - `isMatch` is a boolean informing whether the plain-text password is equivalent to the hash

```JavaScript
bcrypt.compare(plainTextPassword, hash, (err, isMatch) => {
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
