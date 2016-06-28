## Objectives

* Explain cryptographic password hashing
* Explain why password hashing is important
* Explain what a salt is
* Explain why using a salt is important
* Explain the process of user registration
* Use bcrypt to hash and salt passwords

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

### What is the user registration process?

1. User submits form with various information required to register
1. Plain-text password is concatenated with random generated salt
1. Plain-text password + salt is run through hashing function
1. Encoded string output (hash) is stored in password column in database

## How to use bcrypt

For our password hashing, we will use an NPM package called bcrypt. To start off with, install and save bcrypt with NPM.

```
npm install --save bcrypt
```

### Technique 1 (Generate salt and hash on separate function calls)

```JavaScript
const bcrypt = require('bcrypt');
const plainTextPassword = 'password123';
const saltRounds = 10;

bcrypt.genSalt(saltRounds, (err, salt) => {
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
