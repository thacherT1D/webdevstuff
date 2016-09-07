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

Install a new dependency called `supertest`. `supertest` is an testing library that tests server APIs.

```sh
npm install --save-dev mocha chai supertest
```

Create a file called `testServer.js` in your `test` directory.

```javascript
'use strict';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const request = require('supertest');
const server = require('../server');

suite('binary routes', () => {
  test('GET /binary', (done) => {
    request(server)
      .get('/binary')
      .expect('Content-Type', /plain/)
      .expect(200, '', done);
  });

  test('POST /write', (done) => {
    request(server)
      .post('/write')
      .send({ text: 'Hello World' })
      .expect(200)
      .end((err, res) => {
        if (err) {
          throw err;
        }

        request(server)
          .get('/displayString')
          .expect('Content-Type', /plain/)
          .expect(200, 'Hello World', done);
      });
  });

  test('GET /clear', (done) => {
    request(server)
      .post('/write')
      .send({ text: 'Hello World' })
      .expect(200)
      .end((writeErr, res) => {
        if (writeErr) {
          throw writeErr;
        }

        request(server)
          .get('/clear')
          .expect(200)
          .end((clearErr, res) => {
            if (clearErr) {
              throw clearErr;
            }

            request(server)
              .get('/displayString')
              .expect('Content-Type', /plain/)
              .expect(200, '', done);
          });
      });
  });
});
```

```sh
npm install --save express body-parser morgan
```

Create a `server.js` file.

```javascript
'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('short'));
app.use(bodyParser.json());

const Binary = require('./Binary');

app.get('/binary', (req, res, next) => {
  const binary = new Binary();

  res.send(binary.toDecimal());
});

app.get('/binary/:num', (req, res, next) => {
  const binary = new Binary(req.params.num);

  res.send(binary.toDecimal());
});

app.use((req, res) => {
  res.sendStatus(404);
});

const port = process.env.PORT || 8000;

app.listen(port, () =>{
  console.log('Listening on port', port);
});

module.exports = app;
```

## Assignment

Write integration tests for the official `server3.js` solution of the [Pet Shop assignment]((https://github.com/gSchool/fs-pet-shop-solutions).

## Resources

- [Wikipedia - Black-box testing](https://en.wikipedia.org/wiki/Black-box_testing)
- [Wikipedia - Integration testing](https://en.wikipedia.org/wiki/Integration_testing)
