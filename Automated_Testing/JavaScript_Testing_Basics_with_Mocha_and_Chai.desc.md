## Objectives

- Explain the benefits of testing.
- Describe the different types of tests.
- Write tests using Mocha and Chai and additional testing libraries including
  - Nock
  - Supertest
- Explain what is Test Driven Development
- Practice Test Driven Development by writing tests then writing code.

## Benefits of testing

Up to this point, we have not written tests for our projects, but we have run tests on our code through our exercises. As projects get bigger, the cognitive load needed to understand all aspects becomes too cumbersome to manage all the components' logic. Testing steps in to help out.

Testing your code has many strengths:

- Testing identifies bugs in our code.
- Testing continues to test to ensure no new bugs get introduced (called a regression).
- It overall takes _less_ to write correct code when testing. Specifically, testing reduce the cost of change in your code.
- Tests enforce better code design to be testable.
- They provide better documentation on code.
- Testing reduces fear.

## Types of tests

There are multiple goals we have in testing our code. As a result, there are multiple types of tests that we create to accomplish these goals. We will work on three main types of tests.

### Unit tests

The most common type of tests amongst software developers are *unit tests*. Unit tests are tests that isolate a specific pieces of code. These are particularly helpful during development because when a unit test fails, we can isolate the area of code that where the bug is.

Because we test functions and functions can be composed of other functions that we would test, it is our responsibility to isolate the code by creating *stubs* of other functions, that is, creating functions that return the expected output.

Unit tests is a type of *white box testing* that is writing tests with knowledge of the internal workings of code we are testing.

### Functional tests

Broader in scope, *functional tests* make no attempt to understand the inner workings of a function (also called *black box testing*). Here, functional tests are meant to test the overall functionality of a function or module. They can overlap with unit tests, but oftentimes, functional tests work on larger pieces of code.

The advantages of these tests is easy: if the tests pass, your software works as expected. The main disadvantage is that a failure in a test does not clearly identify where in the code the bug is.

### Integration tests

When projects get bigger and including multiple APIs across different projects, *integration tests* are put in place to test the functionality on the broadest scale, checking the contract of the API for a piece of the system.

Integration tests offer similar advantages and disadvantages of functional tests except on a grander scale. A successful set of tests indicate overall success of the system. A failure does not describe the location clearly in the entire system.

### Other types of tests

While the three above types are the ones we are focusing on, there are many aspects of software that we test, they include:

* Performance testing - testing the limits of software for speed and scalability purposes.
* A/B testing - testing the overall customer satisfaction of a change based on some criteria of success.
* Compatibility testing - testing software on various types of "clients" (think mobile phones, browsers, OS's).

And many more.

## Using Mocha and Chai

Create a new directory called "test-basics". `cd` into it, and then create a subdirectory called test:

```sh
$ mkdir test-basics
$ cd test-basics
$ git init
$ mkdir test
```

Initialize a new git repo, and then initialize npm package file. The defaults are fine for the package file except for `test command`, specify `mocha`.

```sh
$ npm init
```

![NPM Init Shell](http://i.imgur.com/BJgxd9c.png)

Install [Mocha](https://mochajs.org/) locally via NPM:

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

Try running the tests with the `npm test` command. You should see:

```sh
$ npm test


0 passing (3ms)
```

Let's create a function to test. In this case, let's implement an `index.js` file in our project directory.

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
  return `${word1}, ${word2}${oxfordComma ? ',' : ''} and ${word3}.`;
};

module.exports = { toSentence };
```

Add a test file called `test.js` to the `test/` directory and add the following code:

```javascript
'use strict';

const assert = require('chai').assert;
const {suite, test} = require('mocha');

suite('NAME OF SUITE', () => {
  test('NAME OF TEST', (done) => {

  });
});
```

Each test handles a specific aspect of functionality of a particular function. Mocha groups all of these functions into a suite. This helps in understanding the overall functionality and then identify the specific aspect to look at.

Each test leverages Chai, an assertion library. In essence, it's the code that performs the actual check of the test. An assertion is a statement that is always expected to evaluate to `true`. If the statement evaluates to `false`, and error is thrown. If an error is thrown, the testing library (Mocha) catches it, immediately finishes the test, marking it a failure, and continues to the next test. If the test finishes with no errors thrown, the test is considered successful.

Assertions can be used in actual code to maintain expectations, but we often see them in tests. Chai offers many methods in performing our checks. For equality checks, it has the `strictEqual` method which equates to the `===` operator in JavaScript.

**NOTE:** The first parameter is always the actual result. This is the part that your code generates. The second parameter is what you expect your code to produce. This is important for messaging in the test suite.

```javascript
assert.strictEqual(actual, expected[, message]);
```

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

For objects and arrays, `strictEqual` will not test the content inside the object or array. It will only test the reference. Chai offers a different method, `deepEqual` to handle this check.

See the [Chai assert documentation](http://chaijs.com/api/assert/) for all the types of checks you can make.

### Asynchronous testing

Testing asynchronous functions is more difficult because each test needs to inform Mocha when the test is completed. Each test function allows you to specify a `done` parameter. If the parameter is not specified, it will wait until the function completes.

As an example, let's test a request library. Let's install `request-promise`.

```sh
$ npm install --save request-promise
```

With that, we can create a function called `getMovies` to use the request library.

```javascript
const request = require('request-promise');

// Define a function named getMovies that takes in one argument
//   query (string)
// It returns a promise that searches the OMDB database for that query.
const getMovies = function (query) {
  return request.get(`http://www.omdbapi.com/?s=${query}`)
    .then((body) => {
      return JSON.parse(body);
    });
};

module.exports = { toSentence, getMovies };
```

Next write the test. Let's create a new file called `movies.js` in the `test` directory.

```sh
$ touch movies.js
$ atom movies.js
```

Create the following suite:
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
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg",
                  "Title": "Jurassic Park",
                  "Type": "movie",
                  "Year": "1993",
                  "imdbID": "tt0107290"
              },
              {
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMTYxNjY1NjE2OV5BMl5BanBnXkFtZTYwNzE0MDc4._V1_SX300.jpg",
                  "Title": "The Lost World: Jurassic Park",
                  "Type": "movie",
                  "Year": "1997",
                  "imdbID": "tt0119567"
              },
              {
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMjA2NzAyMDgyM15BMl5BanBnXkFtZTYwOTQ5Mjg5._V1_SX300.jpg",
                  "Title": "Jurassic Park III",
                  "Type": "movie",
                  "Year": "2001",
                  "imdbID": "tt0163025"
              },
              {
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ1NDc4MjczMl5BMl5BanBnXkFtZTYwNzY0MzY2._V1_SX300.jpg",
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
      })
  });
});
```

The test is not complete until the `done` argument is called. If the `done` argument is called with an error, the test has failed.

### Removing variability

It's important that our tests always return the same result. This includes times where the test suite loses access to the internet, changes in data/APIs, etc. With that in mind, let's find a way to stub out our request using Nock.

```sh
$ npm install --save-dev nock
```

The Nock library intercepts requests and produces expected responses.

```javascript
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
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg",
                "Title": "Jurassic Park",
                "Type": "movie",
                "Year": "1993",
                "imdbID": "tt0107290"
            },
            {
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTYxNjY1NjE2OV5BMl5BanBnXkFtZTYwNzE0MDc4._V1_SX300.jpg",
                "Title": "The Lost World: Jurassic Park",
                "Type": "movie",
                "Year": "1997",
                "imdbID": "tt0119567"
            },
            {
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMjA2NzAyMDgyM15BMl5BanBnXkFtZTYwOTQ5Mjg5._V1_SX300.jpg",
                "Title": "Jurassic Park III",
                "Type": "movie",
                "Year": "2001",
                "imdbID": "tt0163025"
            },
            {
                "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ1NDc4MjczMl5BMl5BanBnXkFtZTYwNzY0MzY2._V1_SX300.jpg",
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
      }`);

    getMovies('Jurassic Park')
      .then((results) => {
        assert.deepEqual(results, {
          "Response": "True",
          "Search": [
              {
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg",
                  "Title": "Jurassic Park",
                  "Type": "movie",
                  "Year": "1993",
                  "imdbID": "tt0107290"
              },
              {
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMTYxNjY1NjE2OV5BMl5BanBnXkFtZTYwNzE0MDc4._V1_SX300.jpg",
                  "Title": "The Lost World: Jurassic Park",
                  "Type": "movie",
                  "Year": "1997",
                  "imdbID": "tt0119567"
              },
              {
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMjA2NzAyMDgyM15BMl5BanBnXkFtZTYwOTQ5Mjg5._V1_SX300.jpg",
                  "Title": "Jurassic Park III",
                  "Type": "movie",
                  "Year": "2001",
                  "imdbID": "tt0163025"
              },
              {
                  "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ1NDc4MjczMl5BMl5BanBnXkFtZTYwNzY0MzY2._V1_SX300.jpg",
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
        aNock.done();
        done();
      })
      .catch((err) => {
        done(err);
      })
  });
});
```

Try testing out with different expected responses. Refer to the [Nock's documentation](https://github.com/node-nock/nock) for more types of requests you can intercept.

## What is Test Driven Development (TDD)?

Up until now, we have focused on developing software with very little structure or process. This can be loosely termed as *development driven development*. This means that we developed code for the sake of developing code. Another process of development is called *test driven development*. It's described in 5 steps.

1. Add a test.
1. Run all tests to ensure new test fails.
1. Write the code.
1. Run tests.
1. Refactor code

and repeat.

## TDD Example: An Editor

As an example, let's work on building an editor. Here's the following requirements:

> We would like to provide a module that represents an editor. This editor has three methods: `toString`, `write`, and `clear`. The `toString` method does not take any parameters and produces a string which is everything that has been written. The `write` method, takes in a string and does nothing. It writes to an editor. The `clear` method will empty everything that has been written by the editor.

Let's write a tests for the `write` and the `toString` method. Create a new project named `editor`.

```sh
$ mkdir editor
$ cd editor
$ mkdir test
$ npm init
$ npm install --save-dev mocha
$ npm install --save-dev chai
```

In the `test` directory, create a file `editor.js`. In here, we will initialize the tests for `write` and `toString`.

```javascript
'use strict';

const assert = require('chai').assert;
const {suite, test} = require('mocha');

const editor = require('../editor');

suite('editor module', () => {
  afterEach(() => {
    editor.clear();
  });

  test('initial editor produces empty string', () => {
    assert.strictEqual(editor.toString(), '');
  });

  test('write method adds to editor', () => {
    editor.write('Hello World');
    assert.strictEqual(editor.toString(), 'Hello World');

    editor.write('Hello World Again');
    assert.strictEqual(editor.toString(), 'Hello WorldHello World Again');
  });

  test('clear method clears the editor', () => {
    editor.write('Hello World');
    editor.clear();
    assert.strictEqual(editor.toString(), '');
  });
});
```

Given these requirements, and the tests provided, we might implement the editor module in `editor.js` as follows:

```javascript
'use strict';

let string = '';

const clear = function(str) {
  string = '';
};

const write = function(str) {
  string += str;
};

const toString = function() {
  return string;
};

module.exports = { write, toString, clear };
```

You submit this to your manager who is satisfied with the results. A day later, the manager comes back and says that the software needs an `undo` functionality. Every time, a write call occurs, the `undo` functionality would remove that write. This means that `toString` will not produce the write that was undo-ed. If there is no more actions to undo, throw an error. By TDD process, we first write the test for `undo`.

```javascript
  test('undo a write', () => {
    editor.write('Hello World');
    assert.strictEqual(editor.toString(), 'Hello World');
    editor.write('Hello World Again');
    assert.strictEqual(editor.toString(), 'Hello WorldHello World Again');
    editor.undo();
    assert.strictEqual(editor.toString(), 'Hello World');
    editor.undo();
    assert.strictEqual(editor.toString(), '');
    assert.throws(() => editor.undo());
  });
```

With this in mind, we can now refactor our editor module.

```javascript
'use strict';

let strings = [];

const clear = function(str) {
  strings = [];
};

const write = function(str) {
  strings.push(str);
};

const toString = function() {
  return strings.reduce((written, str) => written + str, '');
};

const undo = function() {
  if (strings.length) {
    strings.pop();
  }
  else {
    throw new Error('Cannot undo any more.');
  }
};

module.exports = { write, toString, clear, undo };
```

You submit this to your manager, and you survive another day. A day later, the manager comes back and says that everyone loves `undo` functionality, but now people now need a `redo` operation. If an `undo` is called, a `redo` would reapply the write. If there is no more actions to redo, throw an error. Let's write a test for redo.

```javascript
  test('redo a write', () => {
    assert.throws(() => editor.redo());
    editor.write('Hello World');
    assert.strictEqual(editor.toString(), 'Hello World');
    editor.undo();
    assert.strictEqual(editor.toString(), '');
    editor.redo();
    assert.strictEqual(editor.toString(), 'Hello World');
    assert.throws(() => editor.redo());
  });
```

Run the tests and make sure the tests fails. Write the code for the test.

```javascript
'use strict';

let strings = [];
let redoStrings = [];

const clear = function(str) {
  strings = [];
  redoStrings = [];
};

const write = function(str) {
  strings.push(str);
};

const toString = function() {
  return strings.reduce((written, str) => written + str, '');
};

const undo = function() {
  if (strings.length) {
    const str = strings.pop();
    redoStrings.push(str);
  }
  else {
    throw new Error('Cannot undo any more.');
  }
};

const redo = function() {
  if (redoStrings.length) {
    const str = redoStrings.pop();
    strings.push(str);
  }
  else {
    throw new Error('Cannot redo any more.');
  }
};

module.exports = { write, toString, clear, undo, redo };
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
    fs.writeFile(path, toString(), (err) => {
      if (err) {
        return reject(err);
      }

      resolve();
    });
  });
};

module.exports = { write, toString, clear, undo, redo, save };
```

*NOTE:* You are able to mock the filesystem calls using [mock-fs](https://www.npmjs.com/package/mock-fs).
