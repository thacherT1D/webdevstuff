## What is user authentication?

The process of **user authentication** starts when a user provides a password to be stored for future login. When a user attempts to login, their password is hashed and compared to the encoded string stored in the database. If they are equivalent, the user is who they claim and can successfully login.

### User Login

1. User enters password on login
1. Plain-text password is hashed
1. Encoded string is compared to hash from database
1. If match, user is authenticated

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
