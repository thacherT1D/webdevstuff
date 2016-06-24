## Objectives

- Explain what a promise is.

## What's a promise?

> The Promise object is used for deferred and asynchronous computations. A Promise represents an operation that hasn't completed yet, but is expected in the future.

> [Mozilla - Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promises, at their most basic level, allow us to chain functions together. While we typically want to use Promises to block asynchronicity, we can just chain functions together to build up a context. It's a bit easier to understand what's happening with Promises if we write some code, so let's try building some really simple Promise examples to understand the syntax and generally how they work.

First, let's learn how to instantiate a new Promise:

```javascript
new Promise(executor);
new Promise((resolve, reject) => {
  // code calls 'resolve' and sometimes 'reject'
});
```

As mentioned in the Mozilla Docs, promises are instantiated with an `executor` function which has two arguments:

> Function object with two arguments resolve and reject. The first argument fulfills the promise, the second argument rejects it. We can call these functions once our operation is completed.

These two arguments are functions which tell the promise how it should branch and allow you to return different values. For example, let's have a promise simply check to see if a number is odd or not. Open up a node repl and paste in the following code.

```javascript
var myNum = 10;
var promise = new Promise((resolve, reject) => {
  if (myNum % 2 === 0) {
    resolve('even');
  } else {
    reject('odd');
  }
});

promise;
```

## `.then()`

While the calculation happened correctly, the result is still a Promise. In order to return the value, we'll need to call `.then()` with the appropriate arguments. First though, let's create a function that will allow for us to dynamically set the variable we'll be checking for odd and even.

```javascript
var evenPromise = num => {
  return new Promise((resolve, reject) => {
    if (num % 2 === 0) {
      resolve('even');
    } else {
      reject('odd');
    }
  });
};

evenPromise(10);
evenPromise(13);
```

While we can now dynamically change the number being evaluated, it's still wrapped in a Promise. In order to log the real result, take a look at [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) on the `.then()` function.

### Exercise

1. Change the above function so that it responds with the number if it is even and responds with `false` if it is not.
1. Chain `.then()` onto the promise you're creating with `evenPromise()` and pass in a function that `console.log()`s out the result. You can get the `reject()` case to run by adding a second anonymous function as an argument!
1. Clone [this repository](https://github.com/ctide/promises-es6), and take a look at the `example.spec.js` file inside of the `spec/` folder. Remove the 'x' from the first test related to `simplePromise`. Create that functionality in the accompanying `src/example.js` file and get the test to pass!
  * If you're having trouble getting the `resolve()` test to pass, re-read above and look at how the test is formatted inside of `spec/example.spec.js`.
1. Once your `resolve()` test is passing, make the `reject()` test pass.
1. Now, let's make the `add10Promise()` tests pass. This function should take a single argument (a number) and return a Promise that returns that argument + 10. If it's given no number, the argument should default to 0.

In order to get the first test inside of `spec/example.spec.js` to pass, you may have created a function like this one:

```javascript
module.exports = {
  simplePromise: bool => {
    return new Promise((resolve, reject) => {
      if (bool) {
        resolve('OK');
      } else {
        reject('BAD');
      }
    });
  }
}
```

## `.catch()`

In addition to `.then()`, we can also use `.catch()` to catch any rejections. Let's fire up a node console and paste in our simple promise code and play around with how this works:

```javascript
function simplePromise(bool) {
  return new Promise((resolve, reject) => {
    if (bool) {
      resolve('OK');
    } else {
      reject('BAD');
    }
  });
}

> simplePromise(false).catch(resp => console.log(resp); });
Promise { <pending> }
> BAD
> simplePromise(true).then(resp => console.log(resp); });
Promise { <pending> }
> OK
> simplePromise(true).catch(resp => console.log(resp); });
Promise { <pending> }
```

`.catch()`, as you see here, can be used to `catch` the value of any rejections in the chain of promises. This is a longer form version of just passing a second argument to `.then()`:

```javascript
> simplePromise(false).then(resp => {
  console.log(`resolved: ${resp}`);
}, resp => {
  console.log(`rejected: ${resp}`);
});
Promise { <pending> }
> rejected: BAD
```

This allows you to handle both resolved and rejected states for a given promise in the same `.then()` call.

## Visualizing

To visualize this process, check out this Promises visualizer, [Promisees](http://bevacqua.github.io/promisees/). Copy the following code into the editor:

```javascript
new Promise((resolve, reject) => {
  // resolve('OK');
  // reject('BAD');
}).catch(result => {
  return result;
}).then(result => {
  console.log(result);
});
```

In the editor, you should see each part of the Promise.

First, try un-commenting `reject('BAD')`. You should see that the initial Promise was rejected and both the `.catch()` and `.then()` were fulfilled. Now, switch it so that only the resolve statement runs. You should see the `.catch()` part of the chain disappear completely! You can also use the ◀ and ▶ tools on the right-hand side to slowly walk your way through the Promise chain.

### Exercise

1. Refresh the page and take a look at the Basic example on the front-page. Slowly walk your way through the chain using the ◀ and ▶ tools.
  * Why does the one `.then()` statement fail?
1. Try adding more `.then()` and `.catch()` statements until you feel comfortable understanding how each method is working.

## Chaining & Errors

Now that we better understand how Promises chain together, let's work through our own example. Go to your `spec/example.spec.js` file and remove the 'x' from the remaining tests. Let's get all of these to pass!

First, let's talk about how to build __sum50__. This function is going to take no arguments and keep chaining together calls to our `add10Promise()` to eventually get to the number 50.

This can look something like this:

```javascript
  sum50: val => {
    return module.exports.add10Promise(0).then(val => {
      return module.exports.add10Promise(val)
    }).then(val => {
      return module.exports.add10Promise(val)
    }).then(val => {
      return module.exports.add10Promise(val)
    }).then(val => {
      return module.exports.add10Promise(val)
    });
  }
```

Why does this work? What's happening here?

This is one of the best perks of promises. You can avoid going down the rabbit hole of callbacks, and plus you can handle rejection in one place instead of dealing with it over and over in each nested callback.

Let's add another function, the `reject()` function. It should just reject with whatever value it's given. The tests should show you how that function should operate.

### Exercise

1. Inside of the `sum50` function, add a `.then(reject)` to the middle of the chain and re-run the tests.
  * If you get an `Error: Timeout` issue, that's likely because there's no `.catch()` case. Add one so that you still return a number.
  * If you receive an error like this, great job! `Failures ... Expected 30 to equal 50.` Keep the `.then(reject)` call where it is and still get the test to pass by adding more to the chain.

## `Promise.all()`

One incredibly powerful tool in the promises toolkit is [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all). This is a great way to run a handful of asynchronous calls, and wait til they are all finished before you continue execution of your code. An example of where you'd use this is when you need to make multiple API calls to fetch data, and you want to ensure that they all finish before you process the data.

`Promise.all()` accepts an array of promises as it's argument, and once they've all resolved, it will resolve itself with an array of the responses.

To illustrate this point, we've setup a really simple API server that will return some Spotify data (using the Spotify API directly will hit API limits really quickly, so that's why we're doing it this way.)

Pull down this node client here: https://github.com/gSchool/promise-all and let's use this to show the power of `Promise.all()`.

## Bluebird

Having Promises natively supported is great! But more often than not you'll be working with a library to implement Promises. Libraries come with a ton of additional functions and features and are likely faster than ES6's Promises. We're going to use the [Bluebird](http://bluebirdjs.com/docs/why-bluebird.html) Promise library which works just like ES6's Promises. In fact, using it will be a simple copy and paste job!

Go to your `src/example.js` file and add the following line to the top of your file:

```javascript
var Promise = require('bluebird');
```

We're replacing the native Promise with Bluebird's Promise. Try running your tests now; everything should still pass!

How do you know we're doing anything different though? Try adding the following to the bottom of your `example.js`:

```javascript
new Promise((resolve, reject) => {
  console.log('A promise.');
  throw 'Boom!';
});
```

Then run the file (e.g. `node src/example.js`) and take a look at the result. If you've required Bluebird, you should see something like:

```
A promise.
Unhandled rejection Boom!
```

Try commenting out the require statement for Bluebird and re-running the file. That `Unhandled rejection` will disappear. A nice feature of Bluebird is that it surfaces these errors to you; ES6 Promises won't do that. This will save you an unbelievable amount of time, since one of the more frustrating parts of promises is that it will swallow errors if you haven't attached `.catch()` handlers to everything.

### Exercise

1. You can handle the above thrown error with a `.catch()`; implement this on the above example so that the error logs the following message:

  ```
  Error during the promise chain: Boom!
  ```
1. Check out [Promise.method](http://bluebirdjs.com/docs/api/promise.method.html).
  * Rewrite `simplePromise()` using `Promise.method`. Throwing an exception from a `Promise.method` will work very similarly to rejecting, it's another nice part of utilising Promise wrappers. You don't have to worry about code you call throwing errors, because it will automatically get wrapped up as a rejection.

## Review

In this first part of the lesson we've learned about basic Promise syntax with ES6, the `.then()` and `.catch()` functions, chaining, and about how Promises can create branches of functions. We also implemented the Bluebird library to take our Promises to the next level.

We've only skimmed the surface of what is great about Promises. If you feel ready, the super effective [Pokemon API](http://pokeapi.co/) section can give you a greater challenge. For now, take a look at the following resources and exercises to make sure you understand the basics of Promises!

## Assignment

https://github.com/gSchool/promise-challenges/tree/master/01-knex-associations

## Resources

* [Introduction to ES6 Promises](http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/)
* [Promises - In Wicked Detail](http://www.mattgreer.org/articles/promises-in-wicked-detail/)
* [Promises/A+ Standard](https://promisesaplus.com/)
* [We have a problem with promises](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

## Videos

### Nested / Chained Promises

**ERRATA:** There's an error at 3:55. The bottom function box should read "f2".

<iframe src="https://player.vimeo.com/video/136801594?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### `Promise.all`

<iframe src="https://player.vimeo.com/video/136900546?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
