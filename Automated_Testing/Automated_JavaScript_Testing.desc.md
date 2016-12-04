## Objectives

* Explain the benefits of testing.
* Describe the different types of tests.
* Write tests using Mocha and Chai.
* Explain what is Test Driven Development.
* Practice Test Driven Development by writing tests then writing code.
* Reflect on and discuss the benefits of Test Driven Development.

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

**Exercise** Turn and talk to your neighbor and talk about the following:
* Provide an example in your projects where you had a regression (ie a piece of code that works but later stopped working).
* Provide an example in your projects where you wish you had a unit test.
* Provide an example in your projects where you wish you had an integration test.
* Discuss your opinions on the benefits of creating tests.

## Using Mocha and Chai

Create a new directory called "test-basics", initialize "test-basics" as a new git repo, `cd` into "test-basics", and then create a subdirectory called test:

```sh
$ mkdir test-basics
$ cd test-basics
$ git init
$ mkdir test
```

Then initialize an npm package file. Do NOT use `npm init -y`. Run `npm init` and step through the options, the defaults are fine for the package file except for `test command`, specify `mocha`.

![NPM Init Shell](http://i.imgur.com/BJgxd9c.png)

Next, install [Mocha](https://mochajs.org/) locally via NPM:

```sh
$ npm install --save-dev mocha
```

Install the [chai](http://chaijs.com/guide/) expectation library locally:

```sh
$ npm install --save-dev chai
```

Be sure to add node_modules to the .gitignore file:

```sh
$ echo node_modules >> .gitignore
```

To verify, here's what your `package.json` file should look like. Pay attention to the test script and your development dependencies.

```json
{
  "name": "test-basics",
  "version": "0.1.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "mocha"
  },
  "author": "Ken McGrady",
  "license": "MIT",
  "devDependencies": {
    "chai": "^3.5.0",
    "mocha": "^2.5.3"
  }
}
```
Add a test file called `test.js` to the `test/` directory.

Try running the tests with the `npm test` command. You should see:

```sh
$ npm test


0 passing (3ms)
```

Let's create a function to test. Create an `index.js` file in the "test-basics" directory.

```sh
$ touch index.js
$ atom index.js
```
Add the following to your `index.js` file.

```javascript
// Define a function named toSentence that takes four arguments
//    word1 (string)
//    word2 (string)
//    word3 (string)
//    oxfordComma (boolean)
//
// If oxfordComma is true,
//    Return a string in the format "word1, word2, and word3."
// If oxfordComma is false,
//    Return a string in the format "word1, word2 and word3."
const toSentence = function (word1, word2, word3, oxfordComma) {
  if (oxfordComma) {
    return `${word1}, ${word2}, and ${word3}.`;
  }
  else {
    return `${word1}, ${word2} and ${word3}.`;
  }
};

module.exports = { toSentence };
```

This is the format we will use to write tests in our `test.js` file:

```javascript
'use strict';

const assert = require('chai').assert;
const {suite, test} = require('mocha');

suite('NAME OF SUITE', () => {
  test('NAME OF TEST', (done) => {

  });
});
```

Each test handles a specific aspect of functionality for a particular function. Mocha groups all of these tests into a **suite**. This helps in understanding the overall functionality and then identify the specific aspect to look at.

Each test leverages Chai, an assertion library. In essence, it's the code that performs the actual check of the test. An **assertion** is a statement that is always expected to evaluate to `true`. If the statement evaluates to `false`, an error is thrown. If an error is thrown, the testing library (Mocha) catches it, immediately finishes the test, marking it a failure, and continues to the next test. If the test finishes with no errors thrown, the test is considered successful.

Assertions can be used in actual code to maintain expectations, but we often see them in tests. Chai offers many methods in performing our checks. For equality checks, it has the `strictEqual` method which equates to the `===` operator in JavaScript.

**NOTE:** The first parameter is always the _actual_ result. This is the part that your code generates. The second parameter is what you expect your code to produce. This is important for messaging in the test suite.

```javascript
assert.strictEqual(actual, expected[, message]);
```

Let's create a test for our `toSentence` function. Add the following code to your `test.js` file:

```javascript
'use strict';

const assert = require('chai').assert;
const {suite, test} = require('mocha');

const {toSentence} = require('../index');

suite('toSentence function', () => {
  test('converts to a sentence without oxford comma specified', () => {
    assert.strictEqual(toSentence('', '', '', false), ',  and .');
    assert.strictEqual(toSentence('Huey', 'Dewey', 'Louie', false), 'Huey, Dewey and Louie.');
  });

  test('converts to a sentence with oxford comma specified', () => {
    assert.strictEqual(toSentence('', '', '', true), ', , and .');
    assert.strictEqual(toSentence('Huey', 'Dewey', 'Louie', true), 'Huey, Dewey, and Louie.');
  });
});
```
Run the `npm test` command to check your tests.

For objects and arrays, `strictEqual` will not test the content inside the object or array. It will only test the reference. Chai offers a different method, `deepEqual` to handle this check.

See the [Chai assert documentation](http://chaijs.com/api/assert/) for all the types of checks you can make.

### Asynchronous testing

Testing asynchronous functions is more difficult because each test needs to inform Mocha when the test is completed. Each test function allows you to specify a `done` parameter. If the parameter is not specified, it will wait until the function completes.

As an example, let's test a request library. Let's install `request-promise`.

```sh
$ npm install --save request-promise
```

With that, in our `index.js` file, we can create a function called `getMovies` to use the `request-promise` library.

```javascript
const request = require('request-promise');

// Define a function named getMovies that takes in one argument
//   query (string)
// It returns a promise that searches the OMDB database for that query.
// If successful, it will produce the parsed JSON.
const getMovies = function (query) {
  return request.get(`http://www.omdbapi.com/?s=${query}`)
    .then((body) => {
      return JSON.parse(body);
    })
    .catch((err) => {
      return err;
    });
};

module.exports = { toSentence, getMovies };
```

Next let's write the test. Let's create a new file called `movies.js` in the `test` directory.

```sh
$ touch test/movies.js
$ atom test/movies.js
```

Add the following suite to the `movies.js` test file:
```javascript
'use strict';

const assert = require('chai').assert;
const {suite, test} = require('mocha');

const {getMovies} = require('../index');

suite('getMovies function', () => {
  test('obtains a valid set of movies', (done) => {
    getMovies('Jurassic Park')
      .then((results) => {
        assert.deepEqual(results, {
          "Response": "True",
          "Search": [
            {
            "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg",
                "Title": "Jurassic Park",
                "Type": "movie",
                "Year": "1993",
                "imdbID": "tt0107290"
            },
            {
                "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg",
                "Title": "The Lost World: Jurassic Park",
                "Type": "movie",
                "Year": "1997",
                "imdbID": "tt0119567"
            },
            {
                "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZTU1ZWU4ZjUtZDMwYS00MmU4LWI3Y2UtZWVjMWIzODMyOWQ4XkEyXkFqcGdeQXVyNTM2NTY4NzU@._V1_SX300.jpg",
                "Title": "Jurassic Park III",
                "Type": "movie",
                "Year": "2001",
                "imdbID": "tt0163025"
            },
            {
                "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1NDc4MjczMl5BMl5BanBnXkFtZTYwNzY0MzY2._V1_SX300.jpg",
                "Title": "The Making of 'Jurassic Park'",
                "Type": "movie",
                "Year": "1995",
                "imdbID": "tt0256908"
            },
              {
                  "Poster": "N/A",
                  "Title": "Beyond Jurassic Park",
                  "Type": "movie",
                  "Year": "2001",
                  "imdbID": "tt0321431"
              },
              {
                  "Poster": "N/A",
                  "Title": "Jurassic Park",
                  "Type": "game",
                  "Year": "1993",
                  "imdbID": "tt0478182"
              },
              {
                  "Poster": "N/A",
                  "Title": "Jurassic Park: Operation Genesis",
                  "Type": "game",
                  "Year": "2003",
                  "imdbID": "tt0389060"
              },
              {
                  "Poster": "N/A",
                  "Title": "Jurassic Park: The Game",
                  "Type": "game",
                  "Year": "2011",
                  "imdbID": "tt1988671"
              },
              {
                  "Poster": "N/A",
                  "Title": "The Lost World: Jurassic Park",
                  "Type": "game",
                  "Year": "1997",
                  "imdbID": "tt0292073"
              },
              {
                  "Poster": "N/A",
                  "Title": "The Lost World: Jurassic Park - Chaos Island",
                  "Type": "game",
                  "Year": "1997",
                  "imdbID": "tt1306984"
              }
          ],
          "totalResults": "61"
        });
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
```

The test is not complete until the `done` argument is called. If the `done` argument is called with an error, the test has failed.

Run the `npm test` command to check your tests.

### Removing variability

It's important that our tests always return the same result. This includes times where the test suite loses access to the internet, changes in data/APIs, etc. With that in mind, let's find a way to stub out our request using Nock.

```sh
$ npm install --save-dev nock
```

The Nock library intercepts requests and produces expected responses.


Next let's write the movies test, but using nock. Let's create a new file called `movies_nock.js` in the `test` directory.

```sh
$ touch test/movies_nock.js
$ atom test/movies_nock.js
```

Add the following to the `movies_nock.js` test file:

```javascript
'use strict';

const assert = require('chai').assert;
const {suite, test} = require('mocha');

const {getMovies} = require('../index');

const nock = require('nock');

suite('getMovies function', () => {
  test('obtains a valid set of movies', (done) => {
    const aNock = nock('http://www.omdbapi.com')
      .get('/')
      .query({
        s: 'Jurassic Park'
      })
      .reply(200, `{
        "Response": "True",
        "Search": [
          {
            "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg",
                "Title": "Jurassic Park",
                "Type": "movie",
                "Year": "1993",
                "imdbID": "tt0107290"
            },
            {
                "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg",
                "Title": "The Lost World: Jurassic Park",
                "Type": "movie",
                "Year": "1997",
                "imdbID": "tt0119567"
            },
            {
                "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BZTU1ZWU4ZjUtZDMwYS00MmU4LWI3Y2UtZWVjMWIzODMyOWQ4XkEyXkFqcGdeQXVyNTM2NTY4NzU@._V1_SX300.jpg",
                "Title": "Jurassic Park III",
                "Type": "movie",
                "Year": "2001",
                "imdbID": "tt0163025"
            },
            {
                "Poster": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1NDc4MjczMl5BMl5BanBnXkFtZTYwNzY0MzY2._V1_SX300.jpg",
                "Title": "The Making of 'Jurassic Park'",
                "Type": "movie",
                "Year": "1995",
                "imdbID": "tt0256908"
            },
            {
                "Poster": "N/A",
                "Title": "Beyond Jurassic Park",
                "Type": "movie",
                "Year": "2001",
                "imdbID": "tt0321431"
            },
            {
                "Poster": "N/A",
                "Title": "Jurassic Park",
                "Type": "game",
                "Year": "1993",
                "imdbID": "tt0478182"
            },
            {
                "Poster": "N/A",
                "Title": "Jurassic Park: Operation Genesis",
                "Type": "game",
                "Year": "2003",
                "imdbID": "tt0389060"
            },
            {
                "Poster": "N/A",
                "Title": "Jurassic Park: The Game",
                "Type": "game",
                "Year": "2011",
                "imdbID": "tt1988671"
            },
            {
                "Poster": "N/A",
                "Title": "The Lost World: Jurassic Park",
                "Type": "game",
                "Year": "1997",
                "imdbID": "tt0292073"
            },
            {
                "Poster": "N/A",
                "Title": "The Lost World: Jurassic Park - Chaos Island",
                "Type": "game",
                "Year": "1997",
                "imdbID": "tt1306984"
            }
        ],
        "totalResults": "62"
      }`);

    getMovies('Jurassic Park')
      .then((results) => {
        aNock.done();
        done();
      })
      .catch((err) => {
        done(err);
      })
  });
});
```
Run the `npm test` command to check your tests.

Try testing out with different expected responses. Refer to the [Nock's documentation](https://github.com/node-nock/nock) for more types of requests you can intercept.

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

In the `test` directory, create a file `editor.js`.

```sh
$ touch test/editor.js
$ atom test/editor.js
```

In here, we will initialize the tests for `write` and `displayString` -- add the following code to your `test/editor.js` file:

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

Given these requirements, and the tests provided, we can now implement the editor module. In the `test-basics` main directory, create a file `editor.js`.

```sh
$ touch editor.js
$ atom editor.js
```

Add the following code into `editor.js` as follows:

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

Run the `npm test` command to check your tests.


You submit this to your manager who is satisfied with the results. A day later, the manager comes back and says that the software needs an `undo` functionality. Every time, a write call occurs, the `undo` functionality would remove that write. This means that `displayString` will not produce the write that was undo-ed. If there is no more actions to undo, throw an error. By TDD process, we first write the test for `undo`.

Add the following code to your `test/editor.js` file.

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

With this in mind, we can now refactor our `editor.js` module with the following code:

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

Run the `npm test` command to check your tests.

You submit this to your manager, and you survive another day. A day later, the manager comes back and says that everyone loves `undo` functionality, but now customers now need a `redo` operation. If an `undo` is called, a `redo` would reapply the write. If there is no more actions to redo, throw an error. Let's write a test for redo in your `test/editor.js` file.

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
Run the `npm test` command and make sure the tests fails.

Without scrolling down... write the code for the test in your `editor.js` file.

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
Run the `npm test` command to check your tests.

Your manager is happy with the solution and gives you a bonus. The next day, customers provide feedback begging for the ability to save the content, and your manager creates a requirement for a `save` method that takes in one argument, which is the path to save the content. The method should return a promise.

Add the following code your `test/editor.js` file:

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

Add the following code your `editor.js` file:

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

Run the `npm test` command to check your tests.

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

## Videos

### JavaScript Testing Basics

<iframe src="https://player.vimeo.com/video/141373137?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Anatomy of a Test

<iframe src="https://player.vimeo.com/video/141371553?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Red-Green-Refactor

<iframe src="https://player.vimeo.com/video/141372837?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Testing Asynchronous Code

<iframe src="https://player.vimeo.com/video/141374358?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
