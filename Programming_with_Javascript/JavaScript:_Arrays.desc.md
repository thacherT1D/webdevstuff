# Programming and JavaScript: Arrays

***

## Objectives

By the end of this lesson you will be able:

- Explain when using an array is useful.
- Store items in an array.
- Retrieve items from an array.
- Use common array methods.

***

## What is an Array?

An array is a special type of object that used to store items in sequential order. They can store any type, from numbers to strings to objects to functions. An item stored in an array is known as an element.

**You Do:**

- Write down your answer: do you think an array can store other arrays and why?

An array can be created using square brackets, `[]`, this is known as an `array literal`.

Elements in an array are separated by commas, `,`.

```javascript
[] //an empty array literal
[13, 6, 9, 12, 15] //an array literal that holds the numbers 3, 6, 9, 12, 15
['Hello', 'I\'m', 'an', 'array'] //an array literal that holds the strings 'Hello', 'I\'m', 'an', 'array' and the number 5
['Foo', 5, true, null, 'baz'] //an array literal that holds multiple data types
[[0, 1, 2], ['three', 'four', 'five']] //an array literal that holds 2 arrays
```

By itself, an array literal doesn't do much. Let's store one in a variable:

```javascript
var emptyArray = []; //assign variable emptyArray the array literal []
```

**You Do:**

- In your browser console:
  - create an array containing the first 12 characters of the alphabet and assign it to a variable named `alpha`.
  - log the value of `alpha`


Arrays are very useful for dealing with items that need to maintain a specific order.

Every item in an array has an index, this is a number describing the position an item is located in an array.

Arrays store values by a zero-based index, which means the index starts at 0 instead of 1.

```javascipt
var myArry = ['foo', 'bar', 'fizz', 'buzz'];
```

- `foo` is stored at index `0`
- `bar` is stored at index `1`
- `fizz` is stored at index `2`
- `buzz` is stored at index `3`

![Image of an array](https://docs.oracle.com/javase/tutorial/figures/java/objects-tenElementArray.gif)


**You Do:**

- What is the element at index 5 in the following array: `['hello','javascript','i','am','an','array']`


An index can be used to access items in an array:

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];

var someVar = myArry[0];
console.log( someVar ); //foo

console.log( myArry[0] ); //foo
console.log( myArry[1] ); //bar
console.log( myArry[2] ); //fizz
console.log( myArry[3] ); //buzz

console.log( myArry[4] ); //undefined
```

Notice what happens when we try to access `myArry[4]`, there is no item at index 4 so we access the value `undefined`.

Likewise, we can set, update and add values using an index:

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];

// change the value at index 3 from fizz to zazz
console.log( myArry[3] ); //fizz
myArry[3] = 'zazz';
console.log(myArry[3]); //zazz

// add an item to the array at index 4
console.log( myArry[4] ); //undefined
myArry[4] = 'fuzz';
console.log( myArry[4] ); //fuzz
```

**You Do:**

- In your browser console:
  - Create an array with at least 10 elements and assign it to a variable.
  - Log the element at index 5 of the array.
  - Update the element at index 5 to be equal to the element at index 2.
  - Log the element at index 5 of the array.


Remember, arrays are a specific type of objects and behave as such:

**You Do:**

- In your browser console execute the following:
  - `typeof {}`
  - `typeof []`
- What are the results?
- Think about this question for a second: how can we tell the difference between an array and an object?
- In your browser console execute the following:
  - `Array.isArray([])`
- Now answer the question: how can we tell the difference between an array and an object?

***

## When to Use an Array

Arrays are useful for when data is a list of things.

> Example: a list of blogPost objects.

Arrays are useful when data needs to be in a given order.

> Example: a list of comment objects in order of the date they were created.

Arrays are useful for when data doesn't need to be named.

> Example: an array filled with category strings: `['javascript', 'node', 'react', 'coding', 'programming']`.


***

## Array Methods and Properties

- [Array MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/array)

Arrays come with a lot of useful functions that can be used to get things done quickly and in a readable manner.

***

#### `length`

- [length MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length)

The `length` property lets us know how many elements are in an array:

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];
myArry.length; // 4
```

***

#### `push(elem)`

- [push MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

The `push` function adds an element to the end of an array.

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];
myArry.push('zazz');

myArry; // ['foo', 'bar', 'fizz', 'buzz', 'zazz'];
```

***

#### `pop()`

- [pop MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

The `pop` function removes and returns an element from the end of an array.

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];
var elem = myArry.pop();

elem;   // buzz
myArry; // ['foo', 'bar', 'fizz']
```

***

#### `unshift(elem)`

- [unshift MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

The `unshift` function adds an element to the start of an array.

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];
myArry.unshift('zazz');

myArry; // ['zazz', 'foo', 'bar', 'fizz', 'buzz']
```

***

#### `shift()`

- [shift MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

The `shift` function removes and returns an element from the start of an array.

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];
var elem = myArry.shift();

elem;   // foo
myArry; // ['bar', 'fizz', 'buzz']
```

***

#### `indexOf(elem)`

- [indexOf MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexof)

The `indexOf` function searches an array for the element and returns the index of the element. If the element exists more than once, it returns the index of the first instance. If the element doesn't exist it returns `-1`.

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz', 'buzz', 'buzz'];

myArry.indexOf('bar'); // 1

myArry.indexOf('buzz') // 3

myArry.indexOf('zazz') // -1
```

***

#### `slice(startIndex, endIndex)`

- [slice MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

The `slice` function returns a new array containing a range of elements from the original array. The new array starts and includes the element at the startIndex. The new array ends at, but does not include, the element at the endIndex.

`slice` also supports using negative values for indices. For those curious, check out the documentation to find out what this does.

```javascript
var myArry = ['foo', 'bar', 'fizz', 'buzz'];
var newArry = myArry.slice(1, 3);

newArry; // ['bar', 'fiz']
```

***

## Review:

In Javascript, **arrays** are:

- Arrays are list-like **objects**.
- Arrays are used to **store items**. Where an item can be *anything*: a number, a string, an object, a function or even another array.
- Arrays **are ordered**. Items stay in the order they are put in the array.
- Arrays **are zero-indexed**. The first item in the array is at index `0` instead of `1`.

Arrays are useful for:

- Arrays are useful for when data is a list of things.
- Arrays are useful when data needs to be in a given order.
- Arrays are useful for when data doesn't need to be named.

## Resources

- [Arrayzing: JS Array Cheatsheet](https://gist.github.com/mjhea0/7c34346e4a5dac4f1e42)
- [Array MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
