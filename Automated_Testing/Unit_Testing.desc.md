## Objectives

- Explain the benefits of testing.
- Describe the different types of tests.
- Write tests using Mocha and Chai.
- Explain what is Test Driven Development.
- Practice Test Driven Development by writing tests then writing code.
- Reflect on and discuss the benefits of Test Driven Development.

## Benefits of testing

Up to this point, we have not written tests for our projects, but the instruction staff have created tests for you to run through exercises. As projects get bigger, the cognitive load needed to understand your project becomes too cumbersome to manage all the logic. Testing helps us out out here.

Testing your code has many strengths:

* Testing identifies bugs in our code.
* Testing continues to test to ensure no new bugs get introduced (called a regression).
* Tests enforce better code design to be testable.
* They provide better documentation on code.
* Testing reduces fear.
* It overall takes _less_ to write correct code when testing. Specifically, testing reduce the cost of change in your code.

## Types of tests

There are multiple goals we have in testing our code. As a result, there are multiple types of tests that we create to accomplish these goals. We will work on two main types of tests.

### Unit tests

The most common type of tests amongst software developers are *unit tests*. Unit tests are tests that isolate specific pieces of code. These are particularly helpful during development because when a unit test fails, we can isolate the area of code that where the bug is.

Because we test functions and functions can be composed of other functions that we would test, it is our responsibility to isolate the code by creating *stubs* of other functions, that is, creating functions that return an expected output.

Unit tests is a type of *white box testing* that is writing tests with knowledge of the internal workings of code we are testing.

### Integration tests

Broader in scope, *integration tests* make no attempt to understand the inner workings of a function (also called *black box testing*). Here, integration tests are meant to test the overall functionality of a function, module, or API. They can overlap with unit tests, but oftentimes, integration tests work on larger pieces of code.

The advantages of these tests is easy: if the tests pass, your software works as expected. The main disadvantage is that a failure in a test does not clearly identify where in the code the bug is.

### Other types of tests

While the three above types are the ones we are focusing on, there are many aspects of software that we test, they include:

* Performance testing - testing the limits of software for speed and scalability purposes.
* Compatibility testing - testing software on various types of "clients" (think mobile phones, browsers, OS's).

And many more.

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

## Bonus

Write tests using `supertest` for your pet shop assignment. [https://github.com/gSchool/fs-pet-shop](https://github.com/gSchool/fs-pet-shop)

## Resources

- [Chai](http://chaijs.com/)
- [Mocha](https://mochajs.org/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Testing Node.js with Mocha and Chai](http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.V4QAd5MrKRt)

## Videos

### JavaScript Testing Basics

<iframe src="https://player.vimeo.com/video/141373137?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Anatomy of a Test

<iframe src="https://player.vimeo.com/video/141371553?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Red-Green-Refactor

<iframe src="https://player.vimeo.com/video/141372837?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
