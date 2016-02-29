# Testing with Mocha - a primer

### Objectives

- Discuss the benefits of testing. How does it help developers do their jobs more effectively?
- Write tests for existing code.
- Write code to pass a given set of tests.
- Write tests, then write code that passes those tests.

### Key terms

- Mocha
- Chai
- Test
- Suite
- Expectation

Let's learn to test code with [Mocha](https://mochajs.org/), Mocha is a feature-rich JavaScript test framework.

1. [Overview](#overview)
1. [Setup](#setup)
1. [Discussion](#discussion)
1. [Reflect](#reflect)

## Overview

### Why should you care?

*Something that is untested is broken.*

If your codebase is untested then it is **very** difficult to add new features, because

- You don't know if that feature will work or not, and
- The new feature could break your existing codebase.

Automated tests help minimize these issues, allowing you to safely update your codebase and sleep at night. Unfortunately, many developers don't understand the importance of testing until their application breaks and s/he is up all night trying to fix things.

Read more [here](http://stackoverflow.com/questions/67299/is-unit-testing-worth-the-effort).

## Setup

> Always refer to the [Mocha Docs](https://mochajs.org/) for help.

Install Mocha globally via NPM:

  ```sh
  $ npm install -g mocha
  ```

Create a new directory called "test-basics". CD into it, and then create a subdirectory called test:

  ```sh
  $ mkdir test-basics
  $ cd test-basics
  $ mkdir test
  ```

Initialize a new git repo, and then initialize npm (press return multiple times to confirm the defaults).

  ```sh
  $ npm init
  ```

Install the [chai](http://chaijs.com/guide/) expectation library locally:

  ```sh
  $ npm install --save-dev chai
  ```

Add node_modules to the .gitignore file:

  ```sh
  $ echo node_modules >> .gitignore
  ```

Try running the tests with the `mocha` command. You should see:

  ```sh
  $ mocha


  0 passing (3ms)


  ```

Add a test file called `test.js` to the `test/` directory and add the following code:

  ```javascript
  var code = require('../main');
  var expect = require('chai').expect;

  describe('', function() {
    it('');
  });
  ```

If you run `mocha` again, you should see an error. What does the error message say?

To resolve your error, add a `main.js` file to the root directory. Now when you run `mocha`, things should be working again. What was the problem?

With the setup complete, we can now start writing some tests!

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
  helloWorld: function () {
  }
};
```

The object we assign to `module.exports` is what will be returned by the `require` function in our `test.js`. If you console log `code` again, you should see that it looks like this: `{ helloWorld: [Function] }`. The test itself still fails, but the error message is now different:

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
8. add `node_modules` to your `gitignore`
9. add this starter code to your `test.js`:

  ```javascript
  var code = require('../main');
  var expect = require('chai').expect;

  describe('', function() {
    it('');
  });
  ```

Now we're ready.

The goal here is to write tests for two functions. The first, called `createObject`, takes two arrays and returns an object. Elements in the first array correspond to keys in the object, and elements in the second array correspond to values in the object. For example, `createObject(['hi','boom'],[4,null])` should return `{hi: 4, boom: null}`.

The second function, called `objectValues`, should return an array of all the values of an array. For example, `objectValues({hi: 4, boom: null, super: 'sweet'})` should return `[4, null, 'sweet']`.

Before writing these functions, let's write some tests. When writing tests, here are some questions to keep in mind:

1. What should the functions return in some simple examples?
2. What should the functions return in some more complicated examples?
3. What are some edge cases we need to consider?

You may not be able to think of all the edge cases at the outset -- that's okay! The beauty of using tests is that once you catch an edge case you didn't previously consider, you can always add a test to catch that edge case. Then, when you modify your code to treat the edge case, you can be confident that any changes you make aren't breaking things that worked before (as long as the tests continue to pass).

Let's focus first on `createObject`. Here are some simple cases we can test:

```javascript
var code = require('../main');
var expect = require('chai').expect;

describe("Create Object", function() {
  it("returns returns an object", function() {
    expect(code.createObject(['a'], ['b'])).to.be.an('object');
  });

  it("returns returns an object with keys from the first array and values from the second", function() {
    expect(code.createObject(['hi', 'boom'], [4, null]))
      .to.deep.equal({hi: 4, boom: null});
    expect(code.createObject(['need', 'more', 'cowbell'], [undefined, 10, '10']))
      .to.deep.equal({need: undefined, more: 10, cowbell: 10});
  });
});
```

In terms of edge cases, here are some questions to consider:

1. What should happen if you try to call `createObject` with the wrong number of arguments?
2. What should happen if you try to call `createObject` with arrays of different lengths?
3. What should happen if you try to call `createObject` with arguments that aren't arrays?
4. What should happen if you try to call `createObject` with arrays of different lengths?

There aren't right or wrong answers here, it's just a question of how you want your function to behave.

Let's suppose we want our function to respond to these edge cases in the following ways:

1. If you call `createObject` with fewer than two arguments, it should return `null`. If you call it with more than two arguments, it should ignore the extra arguments.
2. 

## Exercise

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

### Further Reading

[Optional slides here](https://docs.google.com/presentation/d/1E1Lskrk6hfJHzkBNwRmySg2X0m8nmKKTQN4w4tupYww/edit?usp=sharing)