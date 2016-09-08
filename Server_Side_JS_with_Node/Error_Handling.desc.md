# Javsacript Error Handling

## Objectives

By the end of this lesson you should:

- Be able to throw and handle errors in Javascript.
- Be able to handle errors using callbacks and promises.
- Understand what a runtime error is.
- Understand what a developer error is.

# Introduction

Errors happen. No matter how great of code you write, how many validations you run input through, how many bugs you fix errors will happen.

It is important to be able to handle them *gracefully*; that is to say no matter what errors occur your program still continues as designed.

First we will discuss how to write code which handles errors in Javascript. Next we will discuss how to respond to errors and what action should be taken while handling them.

## Javascript

Javascript has built in functionality for handling errors.

Work through the following exercise on Github, it will cover the basics of built in Javascript error handling. Ensure you genuinely ponder and answer the questions provided. During the exercise you may find it useful to reference the resources below, to assist in answering the questions.

**Exercise:**

- [Error Handling](https://github.com/gSchool/error-handling-lesson)

**Resources:**

- [MDN: throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
- [MDN: try... catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [MDN: Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Node

In Node, it is standard practice to pass an error to the callback function as the first argument. This way, the developer has the choice how to handle the error.

Let's take a look at the example below:

```javascript
fs.readFile(path, 'utf8', function (err, data) {

});
```

Notice how the first parameter of the callback function is `err`. Never ignore this parameter, always ensure you handle errors with care.

```javascript
fs.readFile(path, 'utf8', function (err, data) {

  if(err){
    // handle error
  }

  // do stuff

});
```

It is important to note that `try... catch` **cannot enclose** any errors thrown in an asynchronous callback.

Bad example:

```javascript
try {
  fs.readFile(path, 'utf8', function (err, data) {

    if(err){
      throw err;
    }

    // do stuff

  });
} catch (err){
  console.error('Something went wrong', err);
};
```

This is because the `throw` takes place **after** the `catch`, when the asynchronous response is received. The resource below goes into great depth on how to handle errors in Node, including using `EventEmitters` to handle errors.


**Resources:**

- [Node API: Errors](https://nodejs.org/api/errors.html)

## Express

**Exercise:** Briefly read over this article on Express error handling. It is essential that when something goes wrong on your server you still send a response to the client. Pay specific attention to how `next` is used.

**Resources:**

- [Express Error Handling Guide](http://expressjs.com/en/guide/error-handling.html)

## Promises

We've been over promises so much that I won't dive too in depth on handling errors; just ensure you always handle them. This can be pretty straight forward if you are intentional about using promises properly. **Never nest your promises**. Instead, chain them. That way the error can be handled in a single place.


```javascript
Users().get(inputUser)
.then(function(user){
  return hashCompare(user, inputPass);
})
.then(function(correctPass){
  return new Promise(function(reject, resolve){
    if(!correctPass){
      reject(new IncorrectPasswordError('You\'re a great big phoney, phoney'));
    }else {
      resolve(user);
    }
  });
})
.then(function(user){
  return authenticateUser(user);
})
.catch(function(err){
  //handle gracefully
});
```

Since nothing is nested, not only do you benefit from readability but you can handle all errors in a single place.


**Resources:**

- [MDN: Promise Catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

## How to respond to errors.

Now that we have covered how to handle errors using code, let's discuss how you should respond to errors and what actions you should take.

**Exercise:** Read the following article by Joyent on error handling in javascript. Consider *and answer* the following questions as you read:

- What is the difference between runtime errors(operational) and developer errors(programmer)?
- What are some ways which you might want to handle a runtime error?
- What are some ways which you might want to handle a developer error?

**Resources:**

- [Joyent: Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)


## Exercise

Complete `Activity 1` and `Activity 2` as described in the following error handling exercise. Skip the `EventEmitter` exercise, instead set it as a stretch goal.

- [Error Handling in Node / Express Exercise](https://github.com/gSchool/promise-challenges/tree/master/07-error-handling-in-node-express)

## Resources

- [MDN: throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw)
- [MDN: try... catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [MDN: Error](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
- [Node API: Errors](https://nodejs.org/api/errors.html)
- [Express Error Handling Guide](http://expressjs.com/en/guide/error-handling.html)
- [MDN: Promise Catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)
- [Joyent: Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)
