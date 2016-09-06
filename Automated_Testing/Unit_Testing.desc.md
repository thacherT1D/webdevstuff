## Objectives

- Explain what test automation is.
- Explain why test automation is important.
- Explain what Test Driven Development is.
- Explain why Test Driven Development is important.
- Use Test Driven Development to unit test software with Mocha and Chai.

## What is test automation?

**Test automation** is software that executes a test and compares the actual outcome of a separate program with an expected outcome. Test automation automates the repetitive but necessary testing process that's already in place when you build software. For example, take the following `sum.js` program.

```js
'use strict';

const sum = function(a, b) {
  return a + b;
};

module.exports = sum;
```

Now, one possible automated test for this program could be the following `sum.test.js` test program.

**NOTE:** An automated test program is separate from the program being tested.

```js
'use strict';

const { assert } = require('chai');
const mocha = require('mocha');
const sum = require('./sum');

it('sums two numbers', () => {
  const actual = sum(1, 2);
  const expected = 3;

  assert.strictEqual(actual, expected);
});
```

```shell
mocha sum.test.js
```

```shell
  ✓ sums two numbers

  1 passing (8ms)
```

There are multiple goals when using test automation. As a result, there are multiple types of tests that you can create to accomplish these goals.

- Unit tests
- Integration tests
- End-to-end tests
- Acceptance tests
- Performance testing
- Compatibility testing

The most common type is a **unit test**. A unit test refers to a test that verifies the functionality of a specific section of code, usually at the function or class level. Unit tests are particularly helpful during development because when one fails, you can isolate the failure to a specific area of in the program.

### Exercise

Turn to your a neighbor and, in your own words, explain what test automation is.

## Why is test automation important?

Up to this point, we have not written tests for our projects, but the instruction staff have created tests for you to run through exercises. As projects get bigger, the cognitive load needed to understand your project becomes too cumbersome to manage all the logic. Testing helps us out out here.

Testing your code has many strengths:

* Testing identifies bugs in our code.
* Testing continues to test to ensure no new bugs get introduced (called a regression).
* Tests enforce better code design to be testable.
* They provide better documentation on code.
* Testing reduces fear.
* It overall takes _less_ to write correct code when testing. Specifically, testing reduce the cost of change in your code.

### Exercise

Turn and talk to your neighbor and talk about the following:

* Provide an example in your projects where you had a regression (ie a piece of code that works but later stopped working).
* Provide an example in your projects where you wish you had a unit test.
* Provide an example in your projects where you wish you had an integration test.
* Discuss your opinions on the benefits of creating tests.

## What is Test Driven Development (TDD)?

Up until now, we have focused on developing software with very little structure or process. This can be loosely termed as *development driven development*. This means that we developed code for the sake of developing code. Another process of development is called *test driven development*. It's described in 4 steps.

Given a requirement,

1. Add a test.
1. Run all tests to ensure new test fails.
1. Write the code. Refactor if needed.
1. Run tests.

and repeat.

## TDD Example: An Editor

As an example, let's work on building an editor. Let's say your manager has come in with the following requirements:

> We would like to provide a module that represents an editor. This editor has three functions: `displayString`, `write`, and `clear`. The `displayString` function does not take any parameters and produces a string which is everything that has been written to the editor. The `write` method, takes in a string and returns nothing. It writes to the editor as a side effect. The `clear` method will empty everything that has been written to the editor.

Let's write a tests for the `write` and the `displayString` method.

In the `test` directory, create a file `editor.js`. In here, we will initialize the tests for `write` and `displayString`.

```javascript
'use strict';

const assert = require('chai').assert;
const {suite, test} = require('mocha');

const editor = require('../editor');

suite('editor module', () => {
  beforeEach(() => {
    editor.clear();
  });

  test('initial editor produces empty string', () => {
    assert.strictEqual(editor.displayString(), '');
  });

  test('write method adds to editor', () => {
    editor.write('Hello World');
    assert.strictEqual(editor.displayString(), 'Hello World');

    editor.write('Hello World Again');
    assert.strictEqual(editor.displayString(), 'Hello WorldHello World Again');
  });

  test('clear method clears the editor', () => {
    editor.write('Hello World');
    editor.clear();
    assert.strictEqual(editor.displayString(), '');
  });
});
```

Mocha offers the ability to run code before and after each suite is run (using `before` and `after` respectively) as well as before and after each test (using `beforeEach` and `afterEach` respectively). In this case, we want to initialize the editor state before we run each test.

Given these requirements, and the tests provided, we might implement the editor module in `editor.js` as follows:

```javascript
'use strict';

let text = '';

const clear = function(str) {
  text = '';
};

const write = function(str) {
  text += str;
};

const displayString = function() {
  return text;
};

module.exports = { write, displayString, clear };
```

You submit this to your manager who is satisfied with the results. A day later, the manager comes back and says that the software needs an `undo` functionality. Every time, a write call occurs, the `undo` functionality would remove that write. This means that `displayString` will not produce the write that was undo-ed. If there is no more actions to undo, throw an error. By TDD process, we first write the test for `undo`.

```javascript
  test('undo a write', () => {
    editor.write('Hello World');
    assert.strictEqual(editor.displayString(), 'Hello World');
    editor.write('Hello World Again');
    assert.strictEqual(editor.displayString(), 'Hello WorldHello World Again');
    editor.undo();
    assert.strictEqual(editor.displayString(), 'Hello World');
    editor.undo();
    assert.strictEqual(editor.displayString(), '');
    assert.throws(() => editor.undo());
  });
```

With this in mind, we can now refactor our editor module.

```javascript
'use strict';

let texts = [];

const clear = function(str) {
  texts = [];
};

const write = function(str) {
  texts.push(str);
};

const displayString = function() {
  return texts.reduce((written, str) => written + str, '');
};

const undo = function() {
  if (texts.length) {
    texts.pop();
  }
  else {
    throw new Error('Cannot undo any more.');
  }
};

module.exports = { write, displayString, clear, undo };
```

You submit this to your manager, and you survive another day. A day later, the manager comes back and says that everyone loves `undo` functionality, but now customers now need a `redo` operation. If an `undo` is called, a `redo` would reapply the write. If there is no more actions to redo, throw an error. Let's write a test for redo.

```javascript
  test('redo a write', () => {
    assert.throws(() => editor.redo());
    editor.write('Hello World');
    assert.strictEqual(editor.displayString(), 'Hello World');
    editor.undo();
    assert.strictEqual(editor.displayString(), '');
    editor.redo();
    assert.strictEqual(editor.displayString(), 'Hello World');
    assert.throws(() => editor.redo());
  });
```

Run the tests and make sure the tests fails. Write the code for the test.

```javascript
'use strict';

let texts = [];
let redoTexts = [];

const clear = function(str) {
  texts = [];
  redoTexts = [];
};

const write = function(str) {
  texts.push(str);
};

const displayString = function() {
  return texts.reduce((written, str) => written + str, '');
};

const undo = function() {
  if (texts.length) {
    const str = texts.pop();
    redoTexts.push(str);
  }
  else {
    throw new Error('Cannot undo any more.');
  }
};

const redo = function() {
  if (redoTexts.length) {
    const str = redoTexts.pop();
    texts.push(str);
  }
  else {
    throw new Error('Cannot redo any more.');
  }
};

module.exports = { write, displayString, clear, undo, redo };
```

Your manager is happy with the solution and gives you a bonus. The next day, customers provide feedback begging for the ability to save the content, and your manager creates a requirement for a `save` method that takes in one argument, which is the path to save the content. The method should return a promise.

```javascript
const fs = require('fs');

// ...

  test('save a file', (done) => {
    editor.write('Hello World');
    editor.save('./test.txt')
      .then(() => {
        fs.readFile('./test.txt', 'utf8', (err, text) => {
          if (err) {
            return done(err);
          }

          assert.strictEqual(text, 'Hello World');
          done();
        });
      })
      .catch((err) => {
        done(err);
      });
  });
```

```javascript
const fs = require('fs');

// ...

const save = function(path) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, displayString(), (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

module.exports = { write, displayString, clear, undo, redo, save };
```

**NOTE:** You are able to mock the filesystem calls using [mock-fs](https://www.npmjs.com/package/mock-fs).

**Exercise:** Turn and talk to your neighbor and reflect on the advantages and disadvantages of Test Driven Development.

## Benefits of Test Driven Development

Test Driven Development process has many benefits.

* When faced with a large and daunting piece of work ahead writing the tests will get you moving quickly.
* You are forced to have tests, which have the benefits described above.
* Your tests give you confidence that you've done enough for now and can stop tweaking and move on to the next thing.
* Tests help you really understand the design of the code you are working on. Instead of writing code to do something, you are starting by outlining all the conditions you are subjecting the code to and what outputs you'd expect from that.
* Overall, speed of development increases.

## Assignment

[https://github.com/gSchool/javascript-test-coverage](https://github.com/gSchool/javascript-test-coverage)

## Resources

- [Chai](http://chaijs.com/)
- [Mocha](https://mochajs.org/)
- [Testing Node.js with Mocha and Chai](http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.V4QAd5MrKRt)

## Videos

### JavaScript Testing Basics

<iframe src="https://player.vimeo.com/video/141373137?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Anatomy of a Test

<iframe src="https://player.vimeo.com/video/141371553?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Red-Green-Refactor

<iframe src="https://player.vimeo.com/video/141372837?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
