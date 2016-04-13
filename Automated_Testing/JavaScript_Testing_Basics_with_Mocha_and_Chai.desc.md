# Testing with Mocha - a primer

Let's learn to test code with [Mocha](https://mochajs.org/), Mocha is a feature-rich JavaScript test runner.

## Overview

### Why should you care?

*Something that is untested is broken.*

If your codebase is untested then it is **very** difficult to add new features as-

- You don't know if that feature will work or not, and
- The new feature could break your existing codebase.

Automated tests help minimize these issues, allowing you to safely update your codebase and sleep at night. Unfortunately, many developers don't understand the importance of testing until their application breaks and she is up all night trying to fix things.

Read more [here](http://stackoverflow.com/questions/67299/is-unit-testing-worth-the-effort).

### Objectives

- Discuss the benefits of testing. How does it help developers do their job more effectively?
- Describe TDD and BDD
- Write tests for existing code.
- Write tests and code using a red / green / refactor workflow.

# Software Testing

## Why do we do testing?

![testing](http://i.giphy.com/13HgwGsXF0aiGY.gif)

**Proper testing in software development is not just about helping put out fires.**

### What is Test-driven Development(TDD)?

	The Test-driven development flow involves:
	
	Write the test
	Watch it fail
	Write some code
	Watch it pass
	Refactor your code
	Repeat!
	
### What is Behavioral Driven Development(BDD)?

BDD is TDD done correctly.  It means testing that the product follows behavioral specifications, and not testing low level functions that may or may not affect the overall product.

You may encounter these terms on the job:

 **Unit tests -**  Low level tests to check functionality of classes, methods, or functions.  So far we have been running unit tests on small examples using ***Jasmine*** or ***Mocha***. Unit tests run fast!  This is our primary focus today!

 **Acceptance/Feature tests -** High level tests conducted to make sure all requirements are met. These tests are generally run against a browser (either an actual browser, or an emulated browser). Acceptance tests are slow, and tend to be fairly brittle!
 
**Integration / functional / service-level testing -** Testing between unit and acceptance tests. In most cases this will involve testing RESTful APIs.

![testing pyramid](http://blog.codeclimate.com/images/posts/rails-testing-pyramid.png)
(source:http://blog.codeclimate.com/images/posts/rails-testing-pyramid.png)

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

Initialize npm in the `test-basics` directory.

  ```sh
  $ npm init -y
  ```

Install the [chai](http://chaijs.com/guide/) expectation library locally:

  ```sh
  $ npm install --save-dev chai
  ```
  
__aside__: What does `--save-dev` do? What's different about this vs. using `--save`?

Add node_modules to the .gitignore file:

  ```sh
  $ echo 'node_modules' >> .gitignore
  ```

Try running the tests with the `mocha` command. You should see:

  ```sh
  $ mocha


  0 passing (3ms)


  ```

Add a test file called `test.js` to the `test/` directory and add the following code:

  ```javascript
  const code = require('../main');
  const expect = require('chai').expect;

  describe('', () => {
    it('');
  });
  ```

Finally, add a `main.js` file to the root directory.

  ```sh
  $ touch main.js
  ```

With the setup complete, we can now start writing some tests!

## Discussion

All examples follow this three step process-

1. Place the mocha tests inside of `test/test.js`.
1. Add your code to test to `main.js`
1. Run your tests.

Test time!

### First Test: Hello World

Per tradition, let's start with a basic "Hello, World!"

#### Function - main.js
```javascript
module.exports = {
  helloWorld: () => {
  }
}
```

#### Test - test/test.js
```javascript
describe("Hello World", () => {
  it("should say 'Hello, World!' when ran");
});
```

**What's happening here?**

`describe` defines a test suite. This will help clarify which tests are being run in the output of our test runner.
`it` defines a single test, and should read like english.

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
describe("Hello World", () => {
  it("should say 'Hello, World!' when ran", () => {
    expect(code.helloWorld()).to.equal('Hello, World!');
  });
});
```
**What's happening here?**

 The test uses JavaScript to test the state of the code being tested via an expectation - test the *expected* state against the *actual* state (the output of the code being tested).

 We are using the BDD syntax `to.equal` More about BDD style [here](http://chaijs.com/api/bdd/);

 Now run the test:

 ```sh
 $ mocha


  Hello World
    1) says "Hello, World!" when ran


  0 passing (11ms)
  1 failing

  1) Hello World says "Hello, World!" when ran:
     AssertionError: expected undefined to equal 'Hello, World!'
      at Context.<anonymous> (test/test.js:6:34)




 ```

Notice a few things:
- 1 failing test
- AssertionError
- Line number (6)

Update the helloWorld function in main.js to return 'Hello, World!' and then run the test.

```js
module.exports = {
  helloWorld: () => {
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

# How to Run Tests

When practicing TDD, there are a few rules you should abide by. Three, actually. And you can remember them like this:

### Red, Green, Refactor

__1. RED__
* _Always_ watch a test fail first - otherwise, how do you know you wrote a working test?

__2. GREEN__
* Write the code to make the test pass

__3. REFACTOR__
* Ask yourself if you can do it better? Cleaner? If so, refactor the code and run your tests again to ensure you didn't break anything.

This is what __TDD__ means. _Test Driven Development_. It means, that the code you write in your app is all in service of passing a written test. This helps us to only write the code we need, and helps us to stay out of the "rat hole" that can sometimes derail our focus. It ensures that all of your code is tested, and that you're only writing code that's testable.

## Exercise: Leap Years

Create a new directory in your workspace called leapYear.
Follow the same steps as above to create the test.js, main.js, npm init and install chai.

Given the following rules for leap years what kind(s) of tests can we write?

1. every year whose number is perfectly divisible by four is a leap year.
1. except for years which are both divisible by 100 and not divisible by 400.
1. 1600 and 2000 are leap years, but the century years 1700, 1800, and 1900 are not.

### Exercise: Taxes

Create a new directory in your workspace called taxCalculator.
Follow the same steps as above to create the test.js, main.js, npm init and install chai.

Given the following tax system, what kind(s) of tests can we write?

1. The first $10 is taxed at 10%
1. The second $10 is taxed at 7%
1. The third $10 is taxed at 5%
1. Everything after that is taxed at 3%

#### Test

Here are a couple tests to get you started:

```javascript
const code = require('../main');
const expect = require('chai').expect;

describe('Tax Calculator', () => {
  it('should tax 10% on the first $10', () => {
    expect(code.calculate(1)).to.equal(0.1);
    expect(code.calculate(10)).to.equal(1);
  });

  it('should tax 7% on the second $10', () => {
    expect(code.calculate(15)).to.equal(1.35);
  });
});
```
