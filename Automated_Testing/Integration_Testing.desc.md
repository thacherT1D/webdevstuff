## Objectives

- Explain what an integration test is.
- Explain why integration tests are important.
- Use test-driven development to write integration tests.

## What's an integration test?

An **integration test** is meant to test the combination of individual software modules as a group. Often an integration test takes modules that have been unit tested, groups them in larger aggregates, applies tests defined in an integration test plan to those aggregates, and delivers as its output the integrated system ready for system testing.

The purpose of an integration test is to verify functional, performance, and reliability requirements placed on major use cases. Both the success and error use cases are simulated using black-box testing. **Black-box testing** is a testing method that examines the functionality of a program without peering into its internal structures or workings. Instead, appropriate parameter and data inputs are passed in and data outputs are examined.

## Why are integration tests important?

The advantages of these tests is easy: if the tests pass, your software works as expected. The main disadvantage is that a failure in a test does not clearly identify where in the code the bug is.

## How do you use test-driven development to write integration tests?

Let's convert our editor to a server with similar methods. Install express and the common middleware.

Install a new dependency called `supertest`, a testing library that tests HTTP servers.

```shell
cd path/to/binary
```

```shell
npm install --save-dev supertest
```

In the `test/server.test.js` file, type the following code.

```javascript
'use strict';

process.env.NODE_ENV = 'test';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');

suite('binary routes', () => {
  test('GET /binary', (done) => {
    request(server)
      .get('/binary')
      .expect('Content-Type', /json/)
      .expect(200, '0', done);
  });
});
```

```shell
npm install --save express morgan
```

Create a `server.js` file.

```javascript
'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

const Binary = require('./Binary');

app.get('/binary', (req, res, next) => {
  const binary = new Binary();

  res.json(binary.toDecimal());
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
```

```shell
npm test
```

```text
> binary@0.1.0 test /Users/ryansobol/Desktop/binary
> mocha



  binary routes
    ✓ GET /binary (38ms)


  1 passing (48ms)
```

## Assignment

Write integration tests for the official `server3.js` solution of the [Pet Shop assignment]((https://github.com/gSchool/fs-pet-shop-solutions).

## Resources

- [Wikipedia - Black-box testing](https://en.wikipedia.org/wiki/Black-box_testing)
- [Wikipedia - Integration testing](https://en.wikipedia.org/wiki/Integration_testing)
