##Modules in JS - Sharing code across files

####What is a Module?

A module encapsulates related code into a single unit of code. When creating a module, this can be interpreted as moving all related functions into a file. Let’s illustrate this point with an example involving an application built with Node.js. Imagine that we created a file called greetings.js and it contains the following two functions:

```
// greetings.js
sayHelloInEnglish = function() {
  return "Hello";
};

sayHelloInSpanish = function() {
  return "Hola";
};
```

####Exporting a Module

The utility of greetings.js increases when its encapsulated code can be utilized in other files. So let’s refactor greetings.js to achieve this goal. To comprehend what is actually happening, we can follow a three-step process:

1) Imagine that this line of code exists as the first line of code in greetings.js:

```
// greetings.js
var exports = {};
module.exports = exports;
```

2) Assign any expression in greetings.js that we want to become available in other files to the exports object:

```
exports.sayHelloInEnglish = function() {
  return "HELLO";
};

exports.sayHelloInSpanish = function() {
  return "Hola";
};
```

In the code above, we could have replaced exports with module.exports and achieved the same result. If this seems confusing, remember that exports and module.exports reference the same object.

3) This is the current value of module.exports:

```
module.exports = {
  sayHelloInEnglish: function() {
    return "HELLO";
  },

  sayHelloInSpanish: function() {
    return "Hola";
  }
};
```

####Importing a Module

Let’s import the publicly available methods of greetings.js to a new file called main.js. This process can be described in three steps:

1) The keyword require is used in Node.js to import modules.

```
// main.js
var greetings = require("./greetings.js");
```

The above code is equivalent to this:

```
// main.js
var greetings = {
  sayHelloInEnglish: function() {
    return "HELLO";
  },

  sayHelloInSpanish: function() {
    return "Hola";
  }
};
```

3) We can now access the publicly available methods of greetings.js as a property of our greetings variable in main.js.

```
// main.js
var greetings = require("./greetings.js");

// "Hello"
greetings.sayHelloInEnglish();

// "Hola"
greetings.sayHelloInSpanish();

```
**Exercise:** Use [NPM](https://www.npmjs.com/) to install the [figlet](https://www.npmjs.com/package/figlet) library and use it to accomplish homework #10 from yesterday.

**Exercise:**

Given the following code:

```js
function Video(title, uploader, seconds) {
    this.title = title;
    this.uploader = uploader;
    this.seconds = seconds;
}

Video.prototype.watch = function() {
    console.log("You watched all " + this.seconds + " seconds of " + this.title);
};

function MusicVideo(title, uploader, seconds, artist) {
    Video.call(this, title, uploader, seconds);
    this.artist = artist;
}

MusicVideo.prototype = new Video();
MusicVideo.constructor = MusicVideo;

// A new method on this object
MusicVideo.prototype.rockOut = function() {
  console.log("You rocked out to " + this.artist + "!");
};

// Instantiating a new object
var musicVid = new MusicVideo("La Bamba", "Pamela", 250, "Ritchie Valens");
musicVid.rockOut();
```

Do the following:

* Comment out the MusicVideo code, as you'll be working on changing Video first.
* Change the Video constructor function to accept a single object literal argument instead of multiple arguments.
* Create a new Video object and call watch() on it.
* Make the arguments optional by giving them default values if they're not specified.
* Change the MusicVideo constructor function to also accept a single object literal argument instead of multiple arguments. Test it by calling it at least once.
* make sure that if the object literal is missing some values, that default values are used instead of undefined

#Homework

  * Read Chapter 10 in Eloquent JS
  * *A Month Names* exercise at the end of Ch 10
  * [Introduction to Testing](https://www.youtube.com/watch?v=HhwElTL-mdI)
  * [Testing JavaScript Using the Jasmine Framework](http://www.htmlgoodies.com/beyond/javascript/testing-javascript-using-the-jasmine-framework.html)
  * What is [TDD](https://en.wikipedia.org/wiki/Test-driven_development)?