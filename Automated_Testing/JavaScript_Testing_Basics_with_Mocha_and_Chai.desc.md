# Testing with Mocha - a primer

### Objectives

- Discuss the benefits of testing. How does it help developers do their job more effectively?
- Write code to pass a given set of tests.
- Write tests and code that passes those tests.
- Describe and employ the tdd red / green / refactor cycle for unit tests / anatomy of a test

[Slides here](https://docs.google.com/presentation/d/1E1Lskrk6hfJHzkBNwRmySg2X0m8nmKKTQN4w4tupYww/edit?usp=sharing)

Let's learn to test code with [Mocha](https://mochajs.org/), Mocha is a feature-rich JavaScript test framework.

1. [Overview](#overview)
1. [Setup](#setup)
1. [Discussion](#discussion)
1. [Reflect](#reflect)

## Overview

### Why should you care?

*Something that is untested is broken.*

If your codebase is untested then it is **very** difficult to refactor or add new features as:

- You don't know if all features will work or not
- All edge cases for that feature can be difficult to remember
- The new feature could break your existing codebase.

Automated tests help minimize these issues, allowing you to safely update your codebase and sleep at night. Unfortunately, many developers don't understand the importance of testing until their application breaks and s/he is up all night trying to fix things.

Read more [here](http://stackoverflow.com/questions/67299/is-unit-testing-worth-the-effort).

### Key terms

- Mocha
- Chai
- Test
- Suite
- Expectation

## Setup

> Always refer to the [Mocha Docs](https://mochajs.org/) for help.

Install Mocha globally via NPM:

  ```sh
  $ npm install -g mocha
  ```

Create a new directory called "test-basics". CD into it and initialize a repository:

  ```sh
  $ mkdir test-basics
  $ cd test-basics
  $ git init
  ```

Initialize npm (press return multiple times to confirm the defaults).

  ```sh
  $ npm init
  ```

Install the [chai](http://chaijs.com/guide/) expectation library locally:

  ```sh
  $ npm install --save-dev chai
  ```

Add node_modules to the .gitignore file:

  ```sh
  $ echo 'node_modules' >> .gitignore
  ```

Try running the tests with the `mocha` command. You should see:

  ```sh
  $ mocha


  0 passing (3ms)


  ```

Add a test file called `test.js` within a `test/` directory and add the following test setup code:

  ```javascript
  var code = require('../main');
  var expect = require('chai').expect;

  describe('', function() {
    it('');
  });
  ```

Finally, add a `main.js` file to the root directory to add our code.

With the setup complete, we can now start writing some tests!

## Discussion

All examples follow this process:

1. Run your tests (Are you in a good state?)
1. Place the mocha tests inside of `test/test.js`.
1. Run your tests (Red)
1. Add your code to test to `main.js`
1. Run your tests (Green)

Test time!

### First Test: Hello World

Per tradition, let's start with a basic "Hello, World!"

#### Test (in `test/test.js`)

```javascript
describe("Hello World", function() {
  it("should say 'Hello, World!' when ran");
});
```

#### Function (in `main.js`)

```javascript
module.exports = {
  helloWorld: function () {
  }
}
```

**What's happening here?**

`describe` defines a test suite.
`it` defines a single test

A suite takes a string that describes what a particular suite is testing.

A test takes a string that describes the function

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

In mocha, any test without a function will be marked as pending. Update to test to run your code and check the output:

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
     AssertionError: expected undefined to equal 'Hello, World!'
      at Context.<anonymous> (test/test.js:6:36)




 ```

Notice a few things:
- 1 failing test
- AssertionError
- Line number (6)

Update the `helloWorld` function in main.js to return 'Hello, World!' and then run the test.

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

We now have a passing test!

### Exercise: Leap Year

Create a new directory in your workspace called leapYear.
Follow the same steps as above to create the test.js, main.js, npm init and install chai.

Give the following leap year rules, what kind(s) of tests can we write?

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
