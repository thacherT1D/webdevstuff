# Intro - Basics

> The Promise object is used for deferred and asynchronous computations. A Promise represents an operation that hasn't completed yet, but is expected in the future.

> [Mozilla - Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Promises, at their most basic level, allow us to chain functions together. While we typically want to use Promises to block asynchronicity, we can just chain functions together to build up a context. It's a bit easier to understand what's happening with Promises if we do this, so let's try building some really simple Promise examples to understand the syntax and generally how they work.

First, let's learn how to instantiate a new Promise:

```javascript
new Promise(executor);
new Promise((resolve, reject) => {
  // code that includes a 'resolve' and a 'reject'
});
```

As mentioned in the Mozilla Docs, promises come with an `executor` function which have two arguments:

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

* * *

##### Before moving on to the next section, answer the following:

1. What type of object is the output? What's the inner value?
1. If you change myNum, the promise doesn't change. Why is that?

# Intro - `.then()`

In the previous step, you should have gotten the following:

```javascript
var myNum = 10;
var promise = new Promise((resolve, reject) => {
  if (myNum % 2 === 0) {
    resolve('even');
  } else {
    reject('odd');
  }
});

promise
```

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

* * *

##### Before moving on to the next section, answer the following:

1. Change the above function so that it responds with the number if it is even and responds with `false` if it is not.
1. Chain `.then()` onto the promise you're creating with `evenPromise()` and pass in a function that `console.log()`s out the result. You can get the `reject()` case to run by adding a second anonymous function as an argument!
1. Take a look at the `example.spec.js` file inside of the `spec/` folder. Remove the 'x' from the first test related to `simplePromise`. Create that functionality in the accompanying `src/example.js` file and get the test to pass!
  * If you're having trouble getting the `resolve()` test to pass, re-read above and look at how the test is formatted inside of `spec/example.spec.js`.

# Intro - `.catch()`

In order to get the first test inside of `spec/example.spec.js` to pass, you may have created a function like this one:

```javascript
function simplePromise(bool) {
  return new Promise((resolve, reject) => {
    bool ? resolve('OK') : reject('BAD');
  }).then(function (result) {
    return result;
  });
};
```

However, if we wanted to get the first _two_ tests to pass, we could do the following:

```javascript
function simplePromise(bool) {
  return new Promise((resolve, reject) => {
    bool ? resolve('OK') : reject('BAD');
  }).then(result => {
    return result;
  }, result => {
    return result;
  });
};
```

In this example, `.then()` comes with two functions -- the first one gets called if `resolve()` is called while the second gets called if `reject()` gets called. Without having a `.then()`, the resolve path will pass its test but the reject path will not. This because we need something between to catch the reject path and return its value.

If we were to include the code from the test, the full Promise would look like this:

```javascript
return new Promise((resolve, reject) => {
  bool ? resolve('OK') : reject('BAD');
}).then(result => {
  return result;
}, result => {
  return result;
}).then(result => {
  // expect(result).toEqual('OK');
});
```

We are chaining onto our Promise!

* * *

##### Before moving on to the next section, answer the following:

1. Refactor the above code with `.catch()` -- check out [the docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) for more information on how it works.

# Intro - Visualizing

After the last step, you should have gotten something like the following:

```javascript
function simplePromise(bool) {
  return new Promise((resolve, reject) => {
    bool ? resolve('OK') : reject('BAD');
  }).catch(result => {
    return result;
  });
};
```

Remember, the test has its own `.then()` statement that evaluates the result. In the case of a resolve, the Promise chain will skip the `.catch()` in `simplePromise()` and go straight to the test's `.then()` statement. In the case of a reject, the Promise chain will go to the `.catch()` first, and then go to the `.then()` inside of the test.

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

* * *

##### Before moving on to the next section, answer the following:

1. Refresh the page and take a look at the Basic example on the front-page. Slowly walk your way through the chain using the ◀ and ▶ tools.
  * Why does the one `.then()` statement fail?
1. Try adding more `.then()` and `.catch()` statements until you feel comfortable understanding how each method is working.

# Intro - Chaining & Errors

Now that we better understand how Promises chain together, let's work through our own example. Go to your `spec/example.spec.js` file and remove the 'x' from the remaining tests. Let's get all of these to pass!

We're going to create four new functions:

* __add10Promise__: This function should take a single argument (a number) and return a Promise that returns that argument + 10. If it's given no number, the argument should default to 0.
* __reject__: This function should take a single argument (a number) and return a Promise that only rejects. It should reject with the same number it was given.
* __sum50__: This function will take no arguments but will return a chain of Promises using the above `add10Promise()` function.

* * *

##### Before moving on to the next section, answer the following:

1. Get all of the tests to pass inside of `src/example.spec.js`. 
1. Inside of the `sum50` function, add a `.then(reject)` to the middle of the chain and re-run the tests.
  * If you get an `Error: Timeout` issue, that's likely because there's no `.catch()` case. Add one so that you still return a number.
  * If you receive an error like this, great job! `Failures ... Expected 30 to equal 50.` Keep the `.then(reject)` call where it is and still get the test to pass by adding more to the chain.

# Intro - Bluebird

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

Try commenting out the require statement for Bluebird and re-running the file. That `Unhandled rejection` will disappear. A nice feature of Bluebird is that it surfaces these errors to you; ES6 Promises won't do that.

* * *

##### Before moving on to the next section, answer the following:

1. What are some other promise libraries? Find at least 3.
1. You can handle the above thrown error with a `.catch()`; implement this on the above example so that the error logs the following message:
  
  ```
  Error during the promise chain: Boom!
  ```
1. Check out [Promise.method](http://bluebirdjs.com/docs/api/promise.method.html).
  * Rewrite `simplePromise()` using `Promise.method`.

# Intro - Review

In this first part of the lesson we've learned about basic Promise syntax with ES6, the `.then()` and `.catch()` functions, chaining, and about how Promises can create branches of functions. We also implemented the Bluebird library to take our Promises to the next level. 

We've only skimmed the surface of what is great about Promises. If you feel ready, the super effective [Pokemon API](http://pokeapi.co/) section can give you a greater challenge. For now, take a look at the following resources and exercises to make sure you understand the basics of Promises!

* * *

##### Extra Resources

* [Introduction to ES6 Promises](http://jamesknelson.com/grokking-es6-promises-the-four-functions-you-need-to-avoid-callback-hell/)
* [Promises - In Wicked Detail](http://www.mattgreer.org/articles/promises-in-wicked-detail/)
* [Promises/A+ Standard](https://promisesaplus.com/)
* [We have a problem with promises](http://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html)

* * *

##### Before moving on to the next section, guess the values of the following.

If you'd like to check your work, including the functions you've written in a node repl and include the following function:

```javascript
function log (num) { console.log(num) };
```

__Problem 1__
```javascript
add10Promise().
  then(reject).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(log);
```

__Problem 2__
```javascript
add10Promise().
  then(add10Promise).
  then(reject).
  then(add10Promise).
  then(reject).
  then(add10Promise).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(add10Promise).
  then(add10Promise).
  then(log);
```

__Problem 3__
```javascript
add10Promise(50).
  then(reject).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(add10Promise).
  then(reject).
  catch(function (num) {
   return num;
  }).
  then(add10Promise).
  then(add10Promise).
  then(log);
```

__Problem 4__
```javascript
reject().
  then(add10Promise).
  then(reject).
  then(add10Promise).
  then(reject).
  then(add10Promise).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(add10Promise).
  then(add10Promise).
  then(log);
```

__Problem 5__
```javascript
add10Promise(50).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(reject).
  catch(function (num) {
   return num;
  }).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(reject).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(add10Promise).
  catch(function (num) {
   return num;
  }).
  then(add10Promise).
  then(add10Promise).
  then(log);
```
