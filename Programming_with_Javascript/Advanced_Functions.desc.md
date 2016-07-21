# Secret Life of Functions

In Javascript, there are a number of keywords that allow functions to be even more useful than we've seen. Some of these we may've seen before, like `arguments`, but others are harder to discover, and some cause confusion amongst even experienced programmers. Having a thorough understanding of these can help you write more flexible, better code, and understand even advanced Javascript code.

## Objectives

- Use the `arguments` keyword to work with undefined function arguments
- Explain how `this` is different in Javascript versus most languages, such as Java
- List and describe the four contexts of `this`
- Mentally evaluate statements containing `this`
- Use call, apply, or bind to set the meaning of `this`

# Arguments

You may remember the `arguments` keyword that we've talked about briefly before. As a recap, `arguments` is an array-like object that's available within the scope of a function which respresents all the arguments passed to the function. Let's break that down.

It's array-like because it has many similarities to an array (zero indexed, has a length propery) but isn't a native array object (doesn't have push, pop, forEach, etc methods). It's only accessible (and only makes sense) within the body of a function (hence within the scope). And it will include all arguments passed to the function, whether or not there are associated parameters in the function definition.

```javascript
function logArguments() {
  return arguments;
}

console.log(logArguments("cat", "dog", "squirrel")); // returns {0:"cat", 1:"dog", 2:"squirrel"}
```

This is extremely useful any time we want to work on an indeterminate amount of arguments being individually passed in.

**EXERCISE** Use the arguments keyword to write an addition function that adds all the arguments passed to it

It's worth pointing out that you could write a similar function that takes an array of values as a parameter, but you may not always have control of how a function is called.

Arguments should only be used when there's a variable or indefinite number of arguments being expected, it shouldn't be used in place of declared, named parameters.

# Function Properties

A couple of other properties that all functions have are `name` and `length`. Name is simply a string of a named function's name. Length is the number of declared parameters in the function. So in the following example

```javascript
function combine(a, b) {
  return a + b;
}
combine.name // returns "combine"
combine.length // returns 2
```

# this

Similarly to `arguments`, `this` is a keyword that is used within functions for advanced concepts. Unlike arguments, it isn't restricted to functions and is more powerful, used more often, and can represent a variety of things. This uncertainty is often what causes developers to be confused by, misuse, or avoid it altogether in Javascript.

In many languages, such as Java, `this` always represents the current object being operated in. In the following code, invoking the getName function would always return "Franz".

```java
public class Teacher {
  private string name="Franz";

  public void getName() {
    System.out.println(this.name);
  }
}
```

However, in the synonymous block of Javascript, the same isn't true.

```javascript
var teacher = {
  name: 'Franz',

  getName: function() {
    console.log(this.name);
  }
}
```

Here the `getName` method could output 'Franz' when invoked, but it could also return a number of other values.

```javascript
teacher.getName(); // ouputs 'Franz'

var viewName = teacher.getName;
var name = 'Frances';
viewName(); // outpus 'Frances'

var otherTeacher = {
  name: 'Frank',
  getName: teacher.getName
}
otherTeacher.getName() // outputs 'Frank'

teacher.getName.call({name: 'Philip'}); // outputs 'Philip'
```

In Javascript, we have to look at when a function is called to know what `this` is going to represent. More succinctly, the context is set by the call-site. There are four contexts that `this` could refer to.

### Default / Global Context

This first context is referred to as the default or global context. If strict mode is not on and `this` is used in a function that is called by itself, `this` will represent the global context.

```javascript
function updateVal(input) {
  this.val = input;
}

updateVal('hi');

console.log(val); // outputs 'hi'
```

If strict mode is on, the value of this remains whatever it previously was or is undefined:

```javascript
"use strict";
function updateVal(input) {
  this.val = input;
}

updateVal('hi'); // throws an error because `this` is undefined
```

Needless to say, this context isn't used very often. Global variables aren't a good thing which is why strict mode prevents `this` from being used in this manner.

### Implicit Context

Implicit context is the most common context and usually what people expect. In this context, `this` refers to whatever object is referenced when calling a method.

```javascript
function getName() {
  return this.name;
}

var student = {
  name: 'Bob',
  getName: getName
}
student.getName(); // here `this` refers to `student` and outputs "Bob"

var book = {
  getName: getName
}
book.name = "You Don't Know JS"
book.getName(); // here `this` refers to `book` and outputs "You Don't Know JS"

student.books = [book];
student.books[0].getName(); // here `this` refers to the first item in the array, which is `book` so it ouputs "You Don't Know JS"

var cohort = {
  name: 'g142',
  teacher: {
    name: 'Wallace',
    getName: getName
  }
}
cohort.teacher.getName(); // `this` refers to teacher and outputs "wallace"
```

### Explicit Context

With explicit context, we use another function to specify what `this` should refer to in a function; these are call, apply, or bind. Every function has access to these methods and can use them for slightly differnt scenarios. Each of this takes a first argument that is what `this` will be set to. If we continue with the `getNamed` function from before, we can do the following:

```javascript
function getName() {
  returns this.name;
}

getName.call({name: 'Rene'}); // outputs Rene

var student = {
  name: 'Roberta'
};
getName.apply(student); // outputs Roberta

var otherStudent = {
  name: 'Rodrigo'
}
var cohort = {
  name: 'g142',
  teacher: {
    name: 'Wallace',
    getName: getName
  }
}
cohort.teacher.getName.call(otherStudent); // outputs 'Rodrigo'

var getterNamer = getName.bind({name: "Roland"}); // returns a function where `this` is bound to the specified context
getterNamer(); // always outputs "Roland"
```

The difference between call and apply is how they can be used to pass additional parameters to the original function - call takes an indeterminate number of arguments that will be passed through, whereas apply expects a second argument that is an array containing arguments to pass through:

```javascript
function maths(a, b){
  return eval(a + this.operation + b); // eval used for demo purposes only. do not try this at home.
}

var add = {
  operation: "+",
  output: "sum"
}
var multiply = {
  operation: "*",
  output: "product"
}

maths.call(add, 1, 2); // returns 3
maths.apply(multiply, [2, 3]); // returns 6
```

Call, apply, and bind are also commonly used in hackish ways to do common tasks such as

- converting an array-like argument into a true array

```javascript
function convertArgs() {
  return Array.prototype.slice.call(arguments); // slice is called as if on the arguments array without a starting or ending point specifiec, so it returns an array of the entire contents
}
convertArgs(1,2,3); // returns [1,2,3]
```

- finding the maximum value for multiple numbers

```javascript
Math.max.apply(this,[1,2,3,4,5]); // returns 5
```

- binding expected values in asynchronous code. (Necessary because the actual call-site for the function outputting the greeting is within the innards of Javascript is probably not want you want.)

```javascript
var teacher = {
  greeting: "Howdy y'all",
  sayHi: function(){
      setTimeout(function(){
          console.log(this.greeting)
      }.bind(this),1000)
  }
};
teacher.sayHi();
```

### Constructor Context

Finally, the last context is when a function is called in conjunction with the `new` keyword. In this manner, `this` refers to an object that will be returned by the function.

```javascript
function Person(inputName) {
  this.name = inputName;
  this.getName = function() {
    return this.name;
  }
}

var myPerson = new Person('Rosaline'); // here is the contrusctor context in action. `this` is referring to `myPerson`
myPerson.getName(); // returns 'Rosaline' because of implicit context is being used
```

Don't worry if all the details of this example aren't immediately clear, we'll get into much more practice with contstructors tomorrow.

## Determining Context

To determine the context coming into play, just watch for some of the special keywords. Is `new` being used, then it's probably a constructor. Do you see `call`, `apply`, or `bind`? Then you've got the explicit context. Neither of those but there is a valid call-site (the function is being called as a property of something else), then it's implicit. None of the above? It's the default context.

**EXERCISE** Context Swap Rotation

# Resources

- [You Don't Know JS - 'this'](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch2.md)
