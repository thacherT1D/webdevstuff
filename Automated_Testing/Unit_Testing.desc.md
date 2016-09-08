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

**NOTE:** Both `chai` and `mocha` are third-party packages installed with `npm`. Chai is an assertion library while Mocha is a testing framework.

```javascript
'use strict';

const { assert } = require('chai');
const { test, suite } = require('mocha');
const sum = require('./sum');

suite('sum()', () => {  
  test('adds two positive numbers', () => {
    const actual = sum(1, 2);
    const expected = 3;

    assert.strictEqual(actual, expected);
  });
});
```

As you can see, the `test()` function is an automated test for a specific part of a program's use case. In the above example, that specific part is adding two positive numbers with the `sum()` function. Because a use case can often have many parts, automated tests are grouped together into a test suite using the `suite()` function. A **test suite** is a way to organize automated tests by grouping them by use case. In the above example, that use case is invoking the `sum()` function.

A `test()` function performs an automated test by making an assertion. An **assertion** is a statement that is expected to evaluate to `true`. In the above example, the `assert.strictEqual()` method is used to assert an actual return value of the `sum()` function is strictly equals `===` to an expected value. As a developer, it's up to you to determine the expected value of an automated test. Notice the first parameter of the `assert.strictEqual()` method is the actual value and the second parameter is the expected value. The order is important because it's used to show the results at the end of a test run.

If an assertion evaluates to `true`, the testing framework marks the automated test as "passing" and continues to the next `test()` function. If the assertion evaluates to `false`, an error is thrown. When an error is thrown, the testing framework catches it, marks the automated test as "failing", and continues to the next `test()` function. At the end of a test run, all the passing and failing tests are shown to the tester.

After running the above automated test with the `mocha` test runner in the shell.

```shell
mocha sum.test.js
```

You'd see the following result.

```shell
sum()
  ✓ adds two postive numbers


1 passing (9ms)
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
const { test, suite } = require('mocha');
const sum = require('./sum');

suite('sum()', () => {  
  test('adds two positive numbers', () => {
    const actual = sum(1, 2);
    const expected = 3;

    assert.strictEqual(actual, expected);
  });
});
```

After running the unit test with the `mocha` test runner in the shell.

```shell
mocha sum.test.js
```

You'd see the following result.

```shell
sum()
  1) adds two positive numbers


0 passing (11ms)
1 failing

1) sum() adds two positive numbers:

    AssertionError: expected 2 to equal 3
    + expected - actual

    -2
    +3

    at Function.assert.strictEqual (node_modules/chai/lib/chai/interface/assert.js:178:32)
    at Context.test (test/sum.test.js:12:12)
```

At this point, there's either a problem with the program under test or a problem with the test itself. As the developer, it's your job to determine which of the two programs to fix. In this case, what would you do?

### Exercise

Turn to your a neighbor and, in your own words, explain what an automated test is. In your discussion, it may be helpful to include the various goals of automated tests and their corresponding test type.

## Why are automated tests important?

While you've used automated tests for many of your assignments, you probably haven't written automated tests for any of your own projects. Automated tests can be helpful for projects because, as it gets bigger, keeping the entire codebase in your head gets harder. As a result, it's easy to accidentally slip bugs into your program. And fixing those bugs takes time away feature development. On a large project that doesn't use automated tests, it's common for your productivity to slow and possibly grind to a stop.

```text
              │
              │
              │   ▭ Without automated tests
              │
              │   ▬ With automated tests
              │
              │
Issues closed │▭▭▭▭▭▭▭▭
  per hour    │        ▭▭▭▭▭▭▭▭
              │                ▭▭▭▭▭▭▭▭
              │▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▭▭▭▭▭▭▭▭▬▬▬▬▬▬▬▬▬▬▬▬▬
              │                                ▭▭▭▭▭▭▭▭
              │                                        ▭▭▭▭▭
              │
              │
              │
              │
              └─────────────────────────────────────────────
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
1. Run the test to ensure it still passes.
1. Repeat.

```shell
npm init -y
```

```shell
npm install --save-dev mochi chai
```

```shell
"scripts": {
  "test": "mocha"
}
```

In the `test/product.test.js` file, type out the following code.

```javascript
'use strict';

const { assert } = require('chai');
const { test, suite } = require('mocha');
const product = require('../product');

suite('product', () => {
  test('multiples two positive numbers', () => {
    const actual = product(4, 5);
    const expected = 20;

    assert.strictEqual(actual, expected);
  });  
})
```

```shell
npm test
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
npm test
```

## Why is test-driven development important?

Test-driven development process has many benefits.

* When faced with a large and daunting piece of work ahead writing the tests will get you moving quickly.
* You are forced to have tests, which have the benefits described above.
* Your tests give you confidence that you've done enough for now and can stop tweaking and move on to the next thing.
* Tests help you really understand the design of the code you are working on. Instead of writing code to do something, you are starting by outlining all the conditions you are subjecting the code to and what outputs you'd expect from that.
* Overall, speed of development increases.

## How do you use test-driven development to write unit tests?

| Decimal | Binary |
|---------|--------|
|       0 |      0 |
|       1 |      1 |
|       2 |     10 |
|       3 |     11 |
|       4 |    100 |
|       5 |    101 |
|       6 |    110 |
|       7 |    111 |
|       8 |   1000 |

```javascript
'use strict';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const Binary = require('../Binary');

suite('Binary', () => {
  test('converts to zero decimal by default', () => {
    const binary = new Binary();
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });
});
```

```javascript
'use strict';

class Binary {
  toDecimal() {
    return 0;
  }
}

module.exports = Binary;
```

```javascript
'use strict';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const Binary = require('../Binary');

suite('Binary', () => {
  test('converts to zero decimal by default', () => {
    const binary = new Binary();
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to zero decimal', () => {
    const binary = new Binary('0');
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });
});
```

```javascript
'use strict';

class Binary {
  constructor(value) {
    this.value = value;
  }

  toDecimal() {
    return 0;
  }
}

module.exports = Binary;
```

```javascript
'use strict';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const Binary = require('../Binary');

suite('Binary', () => {
  test('converts to zero decimal by default', () => {
    const binary = new Binary();
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to zero decimal', () => {
    const binary = new Binary('0');
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to one decimal', () => {
    const binary = new Binary('1');
    const actual = binary.toDecimal();
    const expected = 1;

    assert.strictEqual(actual, expected);
  });
});
```

With this in mind, we can now refactor our editor module.

```javascript
'use strict';

class Binary {
  constructor(value = '0') {
    this.value = value;
  }

  toDecimal() {
    if (this.value === '0') {
      return 0;
    }
    else if (this.value === '1') {
      return 1;
    }
  }
}

module.exports = Binary;
```

```javascript
'use strict';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const Binary = require('../Binary');

suite('Binary', () => {
  test('converts to zero decimal by default', () => {
    const binary = new Binary();
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to zero decimal', () => {
    const binary = new Binary('0');
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to one decimal', () => {
    const binary = new Binary('1');
    const actual = binary.toDecimal();
    const expected = 1;

    assert.strictEqual(actual, expected);
  });

  test('converts to two decimal', () => {
    const binary = new Binary('10');
    const actual = binary.toDecimal();
    const expected = 2;

    assert.strictEqual(actual, expected);
  });
});
```

Run the tests and make sure the tests fails. Write the code for the test.

```javascript
'use strict';

class Binary {
  constructor(value = '0') {
    this.value = value;
  }

  toDecimal() {
    return Number.parseInt(this.value, 2)
  }
}

module.exports = Binary;
```

```javascript
'use strict';

const { assert } = require('chai');
const { suite, test } = require('mocha');
const Binary = require('../Binary');

suite('Binary', () => {
  test('converts to zero decimal by default', () => {
    const binary = new Binary();
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to zero decimal', () => {
    const binary = new Binary('0');
    const actual = binary.toDecimal();
    const expected = 0;

    assert.strictEqual(actual, expected);
  });

  test('converts to one decimal', () => {
    const binary = new Binary('1');
    const actual = binary.toDecimal();
    const expected = 1;

    assert.strictEqual(actual, expected);
  });

  test('converts to two decimal', () => {
    const binary = new Binary('10');
    const actual = binary.toDecimal();
    const expected = 2;

    assert.strictEqual(actual, expected);
  });

  test('converts to 42 decimal', () => {
    const binary = new Binary('101010');
    const actual = binary.toDecimal();
    const expected = 42;

    assert.strictEqual(actual, expected);
  });
});
```

## Assignment

- [JavaScript Test Coverage](https://github.com/gSchool/javascript-test-coverage)

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
