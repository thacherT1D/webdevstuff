# Objectives

* Explain how user authentication works.
* Explain what a cookie is.
* Explain what a session is.
* Add routes to authenticate a user
* Create express middleware to detect whether user is authenticated.

# How does user authentication work?

When a user is logging in, they provide an identifier (e.g. username, email, employee number, etc.) as well as their password. Since passwords are stored in as a hash, more work needs to be done to check whether the password is valid. When a user attempts to login, their password is hashed with their particular salt and compared to the encoded string stored in the database. If they are equivalent, the user is who they claim and can successfully login.

In short,

1. User enters password on login
1. Plain-text password is hashed
1. Encoded string is compared to hash from database
1. If match, user is authenticated

## Using `bcrypt`

In the previous lesson, we learned how to use `bcrypt` to hash a password. In hashing the password, `bcrypt` generates a salt and includes that in the final encoded string. `bcrypt` also allows the ability to check if a user's password is equivalent to the hash with the `compare()` method. It takes three arguments:

1. The plain-text password from a user login attempt
1. The stored hash from the database
1. A callback with two parameters:
  - `err` details any errors
  - `isMatch` is a boolean informing whether the plain-text password is equivalent to the hash

```javascript
const bcrypt = require('bcrypt');

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

# What is a cookie?

The process of **user authentication** starts when a user provides a password to be stored for future login. Instead of requiring authentication for each request the browser needs to make, the server sends a small piece of data to the browser called a **cookie** to hold onto authentication information.


# What is a session?

### `bcrypt.compare()`

To authenticate a user who is trying to login, bcrypt provides a function that compares the user's password with the hashed password stored on the database. The `.compare()` method takes three arguments:

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
