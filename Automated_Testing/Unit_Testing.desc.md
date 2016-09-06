## Objectives

- Explain what an automated test is.
- Explain why automated tests are important.
- Explain what test-driven development is.
- Explain why test-driven development is important.
- Use test-driven development to write unit tests.

## What's an automated test?

An **automated test** is software that compares the actual outcome of a separate program with an expected outcome. As the name implies, an automated test automates the repetitive but necessary task of testing a program. The alternative to an automated test is a manual test, which is easy to do but hard to repeat every time the code changes.

To see an example of an automated test, take the following `sum.js` program.

```javascript
'use strict';

const sum = function(a, b) {
  return a + b;
};

module.exports = sum;
```

The following `sum.test.js` program is one possible automated test for the above program. Note how the automated test is separate from the program being tested.

```javascript
'use strict';

const { assert } = require('chai');
const mocha = require('mocha');
const sum = require('./sum');

it('adds two numbers', () => {
  const actual = sum(1, 2);
  const expected = 3;

  assert.strictEqual(actual, expected);
});
```

After running the above automated test with the `mocha` test runner in the shell.

```shell
mocha sum.test.js
```

You'd see the following result.

```shell
  ✓ adds two numbers

  1 passing (8ms)
```

There are many goals you may want to achieve with an automated test. Here's a table of the most common goals and the type of automated test used to ensure the goal is met.

| Goal                                                            | Type             |
|-----------------------------------------------------------------|------------------|
| Ensure one part of a use case works as a developer expects      | Unit test        |
| Ensure multiple parts of a use case work as a developer expects | Integration test |
| Ensure an entire use case works as a developer expects          | End-to-end test  |
| Ensure an entire use case works as a user expects               | Acceptance test  |

The narrowest type of automated test is a **unit test**. A unit test refers to a test that verifies the functionality of one specific section of code, usually at the function or class level. Unit tests are particularly helpful during development because when one fails, you can isolate the failure to a specific area of the program.

For example, imagine the `sum.js` project was changed to this.

```javascript
'use strict';

const sum = function(a, b) {
  return a * b;
};

module.exports = sum;
```

The original automated test in the `sum.test.js` program is, in fact, a unit test.

```javascript
'use strict';

const { assert } = require('chai');
const mocha = require('mocha');
const sum = require('./sum');

it('adds two numbers', () => {
  const actual = sum(1, 2);
  const expected = 3;

  assert.strictEqual(actual, expected);
});
```

After running the unit test with the `mocha` test runner in the shell.

```shell
mocha sum.test.js
```

You'd see the following result.

```shell
  1) adds two numbers

  0 passing (11ms)
  1 failing

  1)  adds two numbers:

      AssertionError: expected 2 to equal 3
      + expected - actual

      -2
      +3

      at Function.assert.strictEqual (node_modules/chai/lib/chai/interface/assert.js:178:32)
      at Context.it (sum.test.js:11:10)
```

At this point, there's either a problem with the program under test or a problem with the test itself. As the developer, it's your job to determine which of the two programs to fix. In this case, what would you do?

### Exercise

Turn to your a neighbor and, in your own words, explain what an automated test is. In your discussion, it may be helpful to include the various goals of automated tests and their corresponding test type.

## Why are automated tests important?

While you've used automated tests for many of your assignments, you probably haven't written automated tests for any of your own projects. Automated tests can be helpful for projects because, as it gets bigger, keeping the entire codebase in your head gets harder. As a result, it's easy to accidentally slip bugs into your program. And fixing those bugs takes time away feature development. On a large project that doesn't use automated tests, it's common for your productivity to slow and possibly grind to a stop.

```text
              │                                 ▣
              │                               ▣       ▰▰
              │                             ▣    ▰▰▰▰▰
              │                           ▣ ▰▰▰▰▰
              │                       ▰▰▣▰▰▰
              │                    ▰▰▰▣
              │                 ▰▰▰ ▣
Issues closed │               ▰▰  ▣
  per hour    │             ▰▰  ▣
              │           ▰▰  ▣
              │         ▰▰  ▣
              │       ▰▰  ▣
              │     ▰▰  ▣     ▰ Without automated tests
              │    ▰  ▣
              │   ▰ ▣         ▣ With automated tests
              │  ▰▣
              │ ▣
              └─────────────────────────────────────────
                           Project size
```

Using automated tests, you can reduce the number of bugs in your projects by:

- Identifying a bug before it's deployed to production.
- Ensuring bugs that were deployed to production aren't reintroduced.

Additionally, writing code that adheres to an automated test can help you write better code. Code that's written to be easy to test is often easy to change. And code that's easy to change allows you to be more productive.

### Exercise

Turn to your a neighbor and, in your own words, explain why automated tests are important. If you can, provide an example from your experience where a bug caused your productivity to significantly decrease. Talk about the type of automated test that may have helped prevent that bug from cropping up in the first place.

## What's test-driven development?

Up until now, we've focused on developing software without automated tests. This can be loosely termed as **development-driven development**. This means that we developed code for the sake of developing code. Another process of development is called **test-driven development** and can be described as follows.

Given a requirement:

1. Add a test.
1. Run the test to ensure it fails.
1. Write the code to make the test pass.
1. Run the test to ensure it passes.
1. Refactor the code to be more maintainable or performant.
1. Repeat.

```shell
npm init -y
```

```shell
npm install --save-dev mochi chai
```

```shell

```

```javascript
'use strict';

const { assert } = require('chai');
const mocha = require('mocha');
const product = require('./product');

it('multiplies two numbers', () => {
  const actual = product(4, 5);
  const expected = 20;

  assert.strictEqual(actual, expected);
});
```

```javascript
'use strict';

const product = function(a, b) {
  return a * b;
};

module.exports = product;
```

```shell
npm install mocha chai
```

```shell
```

## Why is test-driven development important?

Test-driven development process has many benefits.

* When faced with a large and daunting piece of work ahead writing the tests will get you moving quickly.
* You are forced to have tests, which have the benefits described above.
* Your tests give you confidence that you've done enough for now and can stop tweaking and move on to the next thing.
* Tests help you really understand the design of the code you are working on. Instead of writing code to do something, you are starting by outlining all the conditions you are subjecting the code to and what outputs you'd expect from that.
* Overall, speed of development increases.

## How do you use test-driven development to write unit tests?

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
