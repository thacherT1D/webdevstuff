# Higher-Order Functions (HOFs)

A **higher-order function** either

1. accepts a function as an argument OR
1. returns a function.

The concept of higher-order functions is rooted in mathematics, specifically [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

As you've probably seen, higher-order functions are very common in JavaScript, but are tricky to wrap your brain around at first. Just remember, in JavaScript, variables can contain a function in the same way they contain a number, string, or other datatype.

```javascript
function higherOrder() {
  return function() {
    console.log("I'm a returned function!");
  }
}

var returnedFunction = higherOrder();
returnedFunction(); // I'm a returned function!

// Similarly, you can invoke the returned function like this.
higherOrder()();
```

## Builtin Higher Order Functions

There are four common higher-order functions for arrays—`forEach`, `map`, `filter`, and `reduce`.

### `forEach`

The `forEach` method invokes a callback function for each element of an array.

```javascript
var arr = [1, 2, 3, 4];

arr.forEach(function(element) {
  console.log(element);
});
```

Which is very much similar to `for` loops.

```javascript
var arr = [1, 2, 3, 4];

for (var element of arr) {
  console.log(element);
};
```

See the [`Array.prototype.forEach` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) documentation on the Mozilla Developer Network.

### `map`

The `map` method invokes a callback function for each element of an array, but allows each element to be transformed and pushed to a new array. In other words, the `map` method:

- Creates a new array that's the same size as the original array.
- Applies a callback function to each element of the original array.
- Pushes the return value of the callback function into the new array.

```javascript
var arr = [1, 2, 3, 4];

var squares = arr.map(function(element) {
  return element * element;
});

console.log(squares); // [1, 4, 9, 16]
```

By comparison, how would you do this with a loop?

```javascript
var arr = [1, 2, 3, 4];

var squares = [];

for (var element of arr) {
  squares.push(element * element);
}

console.log(squares); // [1, 4, 9, 16]
```

This is really useful when grabbing information from an HTTP response and transforming the data in some way.

See the [`Array.prototype.map` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) documentation on the Mozilla Developer Network.

**EXERCISE:** How would you get the IMDB rating as a number from a search request?

### `filter`

After `map`, the `filter` method is probably the second most commonly used higher-order function. The `filter` method invokes a callback function for each element of an array, but allows each element to be filtered out of a new array. In other words, the `filter` method:

- Creates a new array that's no larger than the original array.
- Applies a callback function to each element of the original array.
- Pushes the element into the new array if the callback returns `true`.

The callback function passed to the `filter` method is called a **predicate**.

```javascript
var arr = [1, 2, 3, 4];

var odds = arr.filter(function(element) {
  return element % 2 !== 0;
});

console.log(odds); // [1, 3]
```

By comparison, how would you do this with a loop?

```javascript
var arr = [1, 2, 3, 4];

var odds = [];

for (var element of arr) {
  if (num % 2 !== 0) {
    odds.push(element);
  }
}

console.log(odds); // [1, 3]
```

See the [`Array.prototype.filter` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) documentation on the Mozilla Developer Network.

**EXERCISE:** How would you filter the movies in the search results from OMDB with an ratings that are kid-friendly (G or PG)?

### `reduce`

The `reduce` method has a lot to offer and can be thought of as a swiss army knife. The use of `reduce` is best described through a couple examples of similar problems. Let's look at two problems, summing all of the numbers in an array and multiplying all the numbers in an array.

```javascript
var arr = [1, 2, 3, 4];

var result = 0;

for (var num of arr) {
  result = result + num;
}

console.log(result); // 10
```

```javascript
var arr = [1, 2, 3, 4];

var result = 1;

for (var num of arr) {
  result = result * num;
}

console.log(result); // 24
```

Can you spot the differences? They are incredibly similar, but they differ by 2 pieces.

- The initial value of `result` is `0` for addition and `1` for multiplication.
- The operation is `+` for addition and `*` for multiplication.

The `reduce` method takes these differences as arguments that you can specify. Although you cannot pass an operator like `+` or `*`, you can pass in something that takes in two values and produces the sum or product. A function!

```javascript
var arr = [1, 2, 3, 4];

var sum = arr.reduce(function(result, element) {
  return result + element;
}, 0);

var product = arr.reduce(function(result, element) {
  return result * element;
}, 1);

console.log(sum);     // 10
console.log(product); // 24
```

**NOTE:** Notice the order of the parameters in the function passed into `reduce`. First, the running total is passed into the `result` parameter and  each element in the array is passed into the `element` parameter second.


See the [`Array.prototype.reduce` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) documentation on the Mozilla Developer Network.

**EXERCISE:** While our examples have been with numbers, this can work for many data types as well.

Write a function named `concatenate` that takes in one argument, `arr`, (array of strings) and returns the concatenation of all the strings in the array.

Then write a function named `flatten` that takes in one argument, `arr`, (array of arrays) and returns a new array that combines all of elements of each inner array. For example, given `[[1], [2, 3], [4]]`, then return `[1, 2, 3, 4]`.
