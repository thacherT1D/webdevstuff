#Functional Programming and Lodash


##Objectives:

- Define "side effects" in reference to functions
- Define mutable and immutable data. Discuss pros/cons.
- Use a functional library to simplify data manipulation
- Create higher order functions for data manipulation
- Create functions that return promises


##Video!

[Video - Functional Programming](https://www.youtube.com/watch?v=BMUiFMZr7vk)



## Functional vs Procedural Approaches

Functional programming manipulates values, while procedural executes commands.

### Example

```javascript
// *** procedural approach *** //
var numbers = [1, 2, 3, 4, 5];
for (var i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 10;
}
console.log('Procedural', numbers.join(', '));

// *** functional approach *** //
var numbers = [1, 2, 3, 4, 5];
var numberTimesTen = function(numArray) {
  var outputNumbers = [];
  for (var i = 0; i < numArray.length; i++) {
    outputNumbers.push(numArray[i] * 10);
  }
  return outputNumbers;
};
console.log('Functional', numberTimesTen(numbers).join(', '));
```

### Array Traversal

We've been doing a lot of array traversal, and so far it's looked something like this:

```javascript
var array = [1, 2, 3];

for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

Apart from being a bit of an eyesore, this provides a lot of space for potential mistakes.

So we could start by abstracting this code into a new function called `printEach`

```javascript
function printEach(array) {
  for (var i = 0; i < array.length; i++)
    console.log(array[i]);
}
```

So now we have a function that will loop through the array and `console.log()` each element. This works, but it's not extremely useful. It would be better if we could traverse an array and do something with each element - e.g., alert it, double it, uppercase it, etc.

This concept of doing something to every element in an array is a really fundamental idea that we can abstract out into a more general `each` function:

```javascript
function each(array, action) {
  for (var i = 0; i < array.length; i++)
    action(array[i]);
}
```

Now, let's use our each function to do something to all the elements in an array:

```javascript
var names = ["Rusty", "Momo", "Wyatt"]

//to alert each name
each(names, alert)

//to console.log each name
each(names, console.log)

```
**Question:** Why don't we add the parentheses after `alert` or `console.log`?


##Side effects

> Define "side effects" in reference to functions

- In functional code, the output value of a function depends only on the arguments that are input to the function, so calling a function f twice with the same value for an argument x will produce the same result f(x) each time. Eliminating side effects, i.e. changes in state that do not depend on the function inputs, can make it much easier to understand and predict the behavior of a program, which is one of the key motivations for the development of functional programming.

- Side effects are a fancy way of saying that running a certain function or expression creates some sort of noticeable, or observable change in the outside world (Relative to the function or expression). In functional programming, your goal is to write completely contained functions which don't change, or rely on any kind of state outside of themselves (except the input parameter(s)). This will allow you to clearly understand what a function does, and because of that clarity, allow you to use it at any time without having to worry about it changing some other portion of your program.

- A function with side effects is said to be idempotent, if, when called with the same argument twice, the second call returns the same value and has no side effects which can distinguish it from the first call.


##Mutability

> Define mutable and immutable data. Discuss pros/cons.

- If you have the ability to 'mutate' - or change an item, it is mutable.

- Immutable is the inability to change, or mutate an item.

- This is important to keep in mind with functional programming, because if you're relying on something to be static, and it changes, it can throw off your entire program.


##Libraries

- There are many libraries that make many useful functions available through functional design. You're welcome to check these out at some point, but we'll be using lodash in the below exercise.

- [Lodash](https://lodash.com/)

- [Underscore](http://underscorejs.org/)

- [Ramda](http://ramdajs.com/0.21.0/index.html)

- [Functional.js](http://functionaljs.com/)

- http://benmccormick.org/2014/11/12/underscore-vs-lodash/
- http://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore


##Tips:

- Write LOTS of functions! Functions can build upon and use other functions.

##Exercise:

- https://github.com/gSchool/lodash
