# Testing with Mocha - a primer

### Objectives

- Discuss the benefits of testing. How does it help developers do their jobs more effectively?
- Write tests for existing code.
- Write code to pass a given set of tests.
- Write tests and code using a red / green / refactor workflow.
- Describe TDD and BDD.

### Key terms

- Mocha
- Chai
- Test
- Suite
- Expectation

Let's learn to test code with [Mocha](https://mochajs.org/), Mocha is a feature-rich JavaScript test framework.

## Overview

### Why should you care?

*Something that is untested is broken.*

If your codebase is untested then it is **very** difficult to add new features, because

- You don't know if that feature will work or not, and
- The new feature could break your existing codebase.

Automated tests help minimize these issues, allowing you to safely update your codebase and sleep at night. Unfortunately, many developers don't understand the importance of testing until their application breaks and she is up all night trying to fix things.

Read more [here](http://stackoverflow.com/questions/67299/is-unit-testing-worth-the-effort).


# Software Testing

## Why do we do testing?

![testing](http://i.giphy.com/13HgwGsXF0aiGY.gif)

**Proper testing in software development is not just about helping put out fires.**

### What is Test-driven Development(TDD)?

When practicing TDD, there are a few rules you should abide by. Three, actually. And you can remember them like this:

### Red, Green, Refactor

__1. RED__
* _Always_ watch a test fail first - otherwise, how do you know you wrote a working test?

__2. GREEN__
* Write the code to make the test pass

__3. REFACTOR__
* Ask yourself if you can do it better? Cleaner? If so, refactor the code and run your tests again to ensure you didn't break anything.

This is what __TDD__ means. _Test Driven Development_. It means, that the code you write in your app is all in service of passing a written test. This helps us to only write the code we need, and helps us to stay out of the "rat hole" that can sometimes derail our focus. It ensures that all of your code is tested, and that you're only writing code that's testable.
	
### What is Behavioral Driven Development(BDD)?

It means testing that the product follows behavioral specifications, and not testing low level functions that may or may not affect the overall product. The tests should read like english descriptions of what's being tested. We'll see some examples of this shortly.

You may encounter these terms on the job:

 **Unit tests -**  Low level tests to check functionality of classes, methods, or functions.  So far we have been running unit tests on small examples using ***Jasmine*** or ***RSpec***. Unit tests run fast!  This is our primary focus today!

 **Acceptance/Feature tests -** High level tests conducted to make sure all requirements are met.  In Rails we will use the testing tools ***RSpec*** and ***Capybara*** to run acceptance tests.  Acceptance tests run slow!

**Integration / functional / service-level testing -** Testing between unit and acceptance tests.  In most cases this will involve testing RESTful APIs.  Don't worry about this one too much right now!

**User Story -** Plain English description of what the user does and why.

> User stories follow formats such as:
> As a **[role]** I want **[feature]** so that **[benefit]**
> As an **admin** I want to be able to **modify everyone's profile** so that I can **ensure consistency**

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

  describe('', function() {
    it('');
  });
  ```

If you run `mocha` again, you should see an error. What does the error message say?

To resolve your error, add a `main.js` file to the root directory. Now when you run `mocha`, things should be working again. What was the problem?

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
  helloWorld: function () {
  }
}
```

#### Test - test/test.js
```javascript
describe("Hello World", function() {
  it("should say 'Hello, World!' when ran");
});
```

**What's happening here?**

`describe` defines a test suite. A test suite is a series of tests against a single feature or function.
`it` defines a single test, and should read like english. Each `it` should describe one requirement for the function `it` is `describing`.

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
      at Context.<anonymous> (test/test.js:6:36)




 ```

Notice a few things:
- 1 failing test
- TypeError
- Line number (6)

The first line of our test is trying to access our code in `main.js`, but we haven't written any code yet! In fact, if you try console.logging the `code` variable, you should see that it's currently an empty object.

To resolve this error, we need to actually write some Javascript in our `main.js`. Moreover, that code needs to have a certain structure:

#### Function - main.js

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

Give the following tax system, what kind(s) of tests can we write?

1. The first $10 is taxed at 10%
1. The second $10 is taxed at 7%
1. The third $10 is taxed at 5%
1. Everything after that is taxed at 3%

#### Test

Here are a couple tests to get you started:

```javascript
const code = require('../main');
const expect = require('chai').expect;

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
## Integration Testing

Let's walk through the first test in this repository: https://github.com/gSchool/testing-express-with-supertest together, and then you will all work through the remainder of the exercise on your own.

## Resources

- Mocha - https://mochajs.org/
- Chai - http://chaijs.com/
- BDD - https://dannorth.net/introducing-bdd/
- Test first in Express - http://www.ultrasaurus.com/2014/08/test-first-express/
