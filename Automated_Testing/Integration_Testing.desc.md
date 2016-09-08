## Objectives

- Explain what an integration test is.
- Explain why integration tests are important.
- Use test-driven development to write integration tests.

## What's an integration test?

An **integration test** is meant to verify functional, performance, and reliability requirements placed on the major use cases of a program. It does this by ensuring the multiple parts of a use case work together as a developer expects. Often an integration test verifies the functionality of a module even though its submodules have already been individually unit tested.

Here's an example of an integration test for a fictitious HTTP server.

```javascript
'use strict';

const greeter = function() {
  return 'Hello world';
};

module.exports = greeter;
```

```javascript
'use strict';

const express = require('express');
const greeter = require('./greeter');
const app = express();

app.get('/greet', (req, res) => {
  res.send(greeter());
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = app;
```

```javascript
'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../server');
const supertest = require('supertest');

suite('greet routes', () => {
  test('GET /greet', (done) => {
    supertest(app)
      .get('/greet')
      .expect(200, 'Hello world');
      .expect('Content-Type', /plain/)
      .end(done);
  });

  test('POST /greet', (done) => {
    supertest(app)
      .post('/greet')
      .expect(404, 'Not found')
      .expect('Content-Type', /plain/)
      .end(done);
  });
});
```

In an integration test, both the success and error use cases are simulated using black-box testing. **Black-box testing** is a testing method that verifies a program works without peering into a module's inner structures. Instead, information is passed into the module via its inputs and assertions are made on the information passed out of the module.

### Exercise

Turn to your a neighbor and, in your own words, explain what an integration test is. In your discussion, it may be helpful to discuss the goals of an integration test and how it achieves it's goal with black-box testing.

## Why are integration tests important?

[Discuss the advantages and disadvantages of integration tests]

## How do you use test-driven development to write integration tests?

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

const { suite, test } = require('mocha');
const app = require('../server');
const supertest = require('supertest');

suite('binary routes', () => {
  test('GET /binary', (done) => {
    supertest(app)
      .get('/binary')
      .expect(200, '0')
      .expect('Content-Type', /json/)
      .end(done);
  });
});
```

```shell
npm install --save express
```

Create a `server.js` file.

```javascript
'use strict';

const Binary = require('./Binary');
const express = require('express');
const app = express();

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
npm -s test
```

```text
binary routes
  ✓ GET /binary (38ms)


1 passing (48ms)
```

```javascript
'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../server');
const supertest = require('supertest');

suite('binary routes', () => {
  test('GET /binary', (done) => {
    supertest(app)
      .get('/binary')
      .expect(200, '0')
      .expect('Content-Type', /json/)
      .end(done);
  });

  test('GET /binary/0', (done) => {
    supertest(app)
      .get('/binary/0')
      .expect(200, '0')
      .expect('Content-Type', /json/)
      .end(done);
  });
});
```

```shell
npm -s test
```

```text
Binary
  ✓ converts to zero decimal by default
  ✓ converts to zero decimal
  ✓ converts to one decimal
  ✓ converts to two decimal
  ✓ converts to 42 decimal

binary routes
  ✓ GET /binary (40ms)
  1) GET /binary/0


6 passing (68ms)
1 failing

1) binary routes GET /binary/0:
   Error: expected 200 "OK", got 404 "Not Found"
    at Test._assertStatus (node_modules/supertest/lib/test.js:250:12)
    at Test._assertFunction (node_modules/supertest/lib/test.js:265:11)
    at Test.assert (node_modules/supertest/lib/test.js:153:18)
    at Server.assert (node_modules/supertest/lib/test.js:131:12)
    at emitCloseNT (net.js:1549:8)
    at _combinedTickCallback (internal/process/next_tick.js:71:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)
```

```javascript
'use strict';

const Binary = require('./Binary');
const express = require('express');
const app = express();

app.get('/binary', (req, res, next) => {
  const binary = new Binary();

  res.json(binary.toDecimal());
});

app.get('/binary/:value', (req, res, next) => {
  const binary = new Binary(req.params.value);

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
npm -s test
```

```text
binary routes
  ✓ GET /binary
  ✓ GET /binary/0


2 passing (53ms)
```

```javascript
'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const app = require('../server');
const supertest = require('supertest');

suite('binary routes', () => {
  test('GET /binary', (done) => {
    supertest(app)
      .get('/binary')
      .expect(200, '0')
      .expect('Content-Type', /json/)
      .end(done);
  });

  test('GET /binary/0', (done) => {
    supertest(app)
      .get('/binary/0')
      .expect(200, '0')
      .expect('Content-Type', /json/)
      .end(done);
  });

  test('GET /binary/101010', (done) => {
    supertest(app)
      .get('/binary/101010')
      .expect(200, '42')
      .expect('Content-Type', /json/)
      .end(done);
  });
});
```

```shell
npm -s test
```

```text
binary routes
  ✓ GET /binary
  ✓ GET /binary/0
  ✓ GET /binary/101010


3 passing (53ms)
```

## Assignment

Write integration tests for the official `server3.js` solution of the [Pet Shop assignment]((https://github.com/gSchool/fs-pet-shop-solutions).

## Resources

- [GitHub - SuperTest](https://github.com/visionmedia/supertest)
- [Wikipedia - Black-box testing](https://en.wikipedia.org/wiki/Black-box_testing)
- [Wikipedia - Integration testing](https://en.wikipedia.org/wiki/Integration_testing)
