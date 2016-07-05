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

Try testing out with different expected responses.

## What is Test Driven Development (TDD)?






## Discussion

All examples follow this three step process-

1. Place the mocha tests inside of `test/test.js`.
1. Add your code to test to `main.js`
1. Run your tests.

Test time!

### First Test: Hello World

Per tradition, let's start with a basic "Hello, World!"

#### Test

```javascript
describe("Hello World", function() {
  it("should say 'Hello, World!' when called");
});
```

**What's happening here?**

describe defines a test suite.
it defines a single test

A suite takes a string that describes what a particular suite is testing.

A test takes a string that describes the specific functionality being tested.

#### Test!

Run the test. If all went well, you should see:

```sh
$ mocha


  Hello World
    - says "Hello, World!" when ran


  0 passing (7ms)
  1 pending


```

Notice a few things:
- We have the test suite "Hello World", followed by a description.
- 0 passing tests, and 1 pending test.

In mocha, any test without a function will be marked as pending. Update the test so that it will run your code and check the output:

```javascript
describe("Hello World", function() {
  it("should say 'Hello, World!' when ran", function() {
    expect(code.helloWorld()).to.equal("Hello, World!");
  });
});
```

**What's happening here?**

 The test uses JavaScript to test the state of the code being tested via an expectation - test the *expected* state against the *actual* state (the output of the code being tested).

 We are using the BDD syntax to.equal More about BDD style [here](http://chaijs.com/api/bdd/);

 Now run the test:

 ```sh
 $ mocha


  Hello World
    1) says "Hello, World!" when ran


  0 passing (11ms)
  1 failing

  1) Hello World says "Hello, World!" when ran:
     TypeError: code.helloWorld is not a function
      at Context.<anonymous> (test/test.js:6:17)




 ```

Notice a few things:
- 1 failing test
- TypeError
- Line number (6)

The first line of our test is trying to access our code in `main.js`, but we haven't written any code yet! In fact, if you try console.logging the `code` variable, you should see that it's currently an empty object.

To resolve this error, we need to actually write some Javascript in our `main.js`. Moreover, that code needs to have a certain structure:

#### Function

```javascript
module.exports = {
  helloWorld
};
```

The object we assign to `module.exports` is what will be returned by the `require` function in our `test.js`. If you console log `code` again, you should now see a new error: `ReferenceError: helloWorld is not defined`. We've seen this type of error before! To fix it, let's declare `helloWorld` as a function:

```javascript
function helloWorld() {
}

module.exports = {
  helloWorld
};
```

If you `console.log(code)` again, you should see that it looks like this: `{ helloWorld: [Function: helloWorld] }`. The test itself still fails, but the error message is now different:

```js
AssertionError: expected undefined to equal 'Hello, World!'
```

In other words, the actual return value of our function is `undefined`, but the test expects the value to be `'Hello, World!'`. We told it to expect as much inside of our test, when we wrote `expect(code.helloWorld()).to.equal("Hello, World!");`.

The problem should be clear: we haven't actually written the code defining `helloWorld`! Let's write that code now:

```js
module.exports = {
  helloWorld: function () {
    return 'Hello, World!';
  }
}
```

```sh
$ mocha


  Hello World
    ✓ says "Hello, World!" when ran


  1 passing (8ms)


```

We now have a passing test! Will the test continue to pass if we `console.log` rather than `return`? Why or why not?

## Second Example: More Functions!

Let's try another example. Create a directory called `more-testing-examples`. CD into it and get things ready for testing. As before, you'll need to:

1. `cd` into your new directory
2. Initialize a new git repository
3. create a `test` directory
4. create a `test.js` file inside of your `test` directory
5. create a `main.js` file inside of `more-testing-examples`
6. run `npm init`
7. install chai: `npm install --save-dev chai`
8. add `node_modules` to your `.gitignore`
9. add this starter code to your `test.js`:

  ```javascript
  var code = require('../main');
  var expect = require('chai').expect;

  describe('', function() {
    it('');
  });
  ```

Now we're ready.

The goal here is to write tests for two functions. The first function, called `objectValues`, returns an array of all the values of an array. For example, `objectValues({hi: 4, boom: null, super: 'sweet'})` should return `[4, null, 'sweet']`.

The second, called `createObject`, takes two arrays and returns an object. Elements in the first array correspond to keys in the object, and elements in the second array correspond to values in the object. For example, `createObject(['hi','boom'],[4,null])` should return `{hi: 4, boom: null}`.

Before writing these functions, let's write some tests. When writing tests, here are some questions to keep in mind:

1. What should the functions return in some simple examples?
2. What should the functions return in some more complicated examples?
3. What are some edge cases we need to consider?

You may not be able to think of all the edge cases at the outset -- that's okay! The beauty of using tests is that once you catch an edge case you didn't previously consider, you can always add a test to catch that edge case. Then, when you modify your code to treat the edge case, you can be confident that any changes you make aren't breaking things that worked before (as long as the tests continue to pass).

Let's focus first on `objectValues`. Here are some simple cases we can test:

```javascript
var code = require('../main');
var expect = require('chai').expect;

describe("Object Values", function() {
  it("returns an array", function() {
    expect(code.objectValues({a: "b"})).to.be.an('array');
  });

  it("returns an array of the object's values", function() {
    expect(code.objectValues({
      key1: 'value1',
      key2: 0,
      key3: null,
      key4: undefined,
      key5: true
    })).to.deep.equal(['value1', 0, null, undefined, true]);
  });

  it("works with reference types", function() {
    expect(code.objectValues({
      foo: [1, 2, 3],
      bar: {nested: "object"}
    })).to.deep.equal([
      [1, 2, 3],
      {nested: "object"}
    ]);
  });
});
```

Note that our expect statements are a little different than before. We're able to test a lot of different things with this syntax. For a full list of what's available to you, [check the docs](http://chaijs.com/api/bdd/)!

In terms of edge cases, here are some questions to consider:

1. What should happen if you try to call `objectValues` with something that isn't an object?
2. What should happen if you try to call `objectValues` on an array?
3. What whould happen if you try to call `objectValues` on an empty object?

There aren't right or wrong answers here, it's just a question of how you want your function to behave.

Let's suppose we want our function to respond to these cases in the following ways: it should return `null` if you try to pass in a primitive data type. If you pass in an array, it should just return that array. And if you pass in an empty object, it should return that object.

The full set of tests might then look like this:

```javascript
var code = require('../main');
var expect = require('chai').expect;

describe("Object Values", function() {
  it("returns an array", function() {
    expect(code.objectValues({a: "b"})).to.be.an('array');
  });

  it("returns an array of the object's values", function() {
    expect(code.objectValues({
      key1: 'value1',
      key2: 0,
      key3: null,
      key4: undefined,
      key5: true
    })).to.deep.equal(['value1', 0, null, undefined, true]);
  });

  it("works with reference types", function() {
    expect(code.objectValues({
      foo: [1, 2, 3],
      bar: {nested: "object"}
    })).to.deep.equal([
      [1, 2, 3],
      {nested: "object"}
    ]);
  });

  it("returns null if given a string, boolean, undefined, null, or number", function() {
    ["hi",true,undefined,null,8].forEach(function(el) {
      expect(code.objectValues(el)).to.be.null;
    });
  });

  it("returns an array if given an array", function() {
    expect(code.objectValues([1,"hi",true])).to.deep.equal([1,"hi",true]);
  });

  it("returns an empty array if given an empty object", function() {
    expect(code.objectValues({})).to.deep.equal([]);
  });
});
```

**Exercise** Implement an `objectValues` function that makes the tests pass! Here's some starter code:

```javascript
function objectValues(obj) {
  // write your code here
}

module.exports = {
  objectValues
};

```

**Exercise** Once you get those tests to pass, write some tests for `createObject`, then write the function! Here's some starter code for you `test.js` file and your `main.js` file:

`test.js`

```javascript
var code = require('../main');
var expect = require('chai').expect;

describe("Object Values", function() {
  it("returns an array", function() {
    expect(code.objectValues({a: "b"})).to.be.an('array');
  });

  it("returns an array of the object's values", function() {
    expect(code.objectValues({
      key1: 'value1',
      key2: 0,
      key3: null,
      key4: undefined,
      key5: true
    })).to.deep.equal(['value1', 0, null, undefined, true]);
  });

  it("works with reference types", function() {
    expect(code.objectValues({
      foo: [1, 2, 3],
      bar: {nested: "object"}
    })).to.deep.equal([
      [1, 2, 3],
      {nested: "object"}
    ]);
  });

  it("returns null if given a string, boolean, undefined, null, or number", function() {
    ["hi",true,undefined,null,8].forEach(function(el) {
      expect(code.objectValues(el)).to.be.null;
    });
  });

  it("returns an array if given an array", function() {
    expect(code.objectValues([1,"hi",true])).to.deep.equal([1,"hi",true]);
  });

  it("returns an empty array if given an empty object", function() {
    expect(code.objectValues({})).to.deep.equal([]);
  });
});

describe("Create Object", function() {
  it("returns returns an object", function() {
  	// add code here  
  });

  // add a test for one or two simple cases

  // what are some edge cases? test for those too!
});
```

`main.js`

```javascript
function objectValues(obj) {
  // your code here
}

function createObject(arr1, arr2) {
  // your code here
}

module.exports = {
  objectValues,
  createObject
};
```

Protip: sick of seeing the tests for `objectValues` show up every time you run the tests? change the word `describe` in the line `describe('Object Values', function() {` to `xdescribe`, and all of those tests will be pending.

### Note on testing syntax

In our `main.js` file, we declared our functions up top, then exported them using `module.exports`. Another common pattern is to wrap everything in the `main` file in an object and export the entire thing. In this case, your `main.js` would look something like this:

```javascript
module.exports = {
  objectValues: function(obj) {
    // your code here
  },
  createObject: function(arr1, arr2) {
    // your code here
  }
};
```

This pattern may be slightly more confusing when you're just getting started, but it's good to know about because it is commonly used. But if you'd rather avoid it for now, that's fine.

Want some more practice writing tests? Here you go!

### Exercise: Leap Year

Create a new directory in your workspace called leapYear.
Follow the same steps as above to create the test.js, main.js, npm init and install chai.

Give the following tax system, what kind(s) of tests can we write?

1. every year whose number is perfectly divisible by four is a leap year.
1. except for years which are both divisible by 100 and not divisible by 400.
1. 1600 and 2000 are leap years, but the century years 1700, 1800, and 1900 are not.

### Exercise: Taxes

Create a new directory in your workspace called taxCalculator.
Follow the same steps as above to create the test.js, main.js, npm init and install chai.

Give the following tax system, what kind(s) of tests can we write?

1. The first $10 is taxed at 10%
1. The second $10 is taxed at 7%
1. The third $10 is taxed at 5%
1. Everything after that is taxed at 3%

#### Test

Here are a couple tests to get you started:

```javascript
var code = require('../main');
var expect = require('chai').expect;

describe('Tax Calculator', function(){

  it('should tax 10% on the first $10', function() {
    expect(code.calculate(1)).to.equal(0.1);
    expect(code.calculate(10)).to.equal(1);
  });

  it('should tax 7% on the second $10', function(){
    expect(code.calculate(15)).to.equal(1.35);
  });

});
```
