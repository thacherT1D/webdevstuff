# Mentally Evaluating Code

**Standard**: "Write, mentally evaluate, and store the result of JS expressions"

**Objectives**:

By the end of this article, you should be able to correctly break down the exact steps that happen with common looping structures.

**Why do this?**

Expert developers can interpret code in their heads in much the same way computers would interpret code (albeit much, much slower :).  They can see a block of code and see which variables are assigned to which values at each point in the iteration, and what objects in memory might look like.

This ability is important when dealing with complex pieces of code that other people have written, or even code that you wrote and have forgotten about.  It's especially important when looking at a test suite to try to figure out what a method or function should be doing.

Quick mental evaluation is also important during technical interviews, when you have a whiteboard but no actual interpreter to run your code.

## Overview

Let's say you write code like this:

```js
let a = 1
let b = a
a = 2
console.log(b);
```

The _interpreter_ runs the following:

```
set `a` equal to `1`
set `b` equal to `1`
set `a` equal to 2
```

## Exercises

Do _not_ use a computer to run the code examples below!  Use this as an opportunity to develop a theory that matches the facts you are given.

### Case #1

When you run the code below, it incorrectly prints `35` but the correct answer is 45.  Without using a computer to run the code, find and fix the bug.

```js
// the sum of these elements is 45
var t = [1,2,3,4,5,6,7,8,9]
var p = 0

for (let i = 0; i < t.length; i++) {
  p += t.pop()
}

console.log(p);
```

Write a detailed set of instructions about what the `for` loop is doing that includes:

- When it's setting the initial variable `i`
- When it's evaluating the conditional
- When it's incrementing `i`
- What each variable contains at each iteration

### Case #2

Why does this work?  The code below properly outputs `45`.

```js
var elements = [1,2,3,4,5,6,7,8,9]
var sum = 0

for (var i = elements.length; i--;) {
  sum += elements[i]
}

console.log(sum);
```

Remember that `elements.length` will return a number that's one higher than the highest index in the array.  So how does this work?  Why doesn't it keep going forever?

Write out, in detail, what the `for` loop is doing, when it's evaluating the conditional etc...

### Make predictions based on your understanding

Based on your models above, what would this program print?

```js
var elements = [1,2]
var sum = 0

for (var i = 0; i < elements.length; i++) {
  sum += elements[i]
}

console.log(i);
```

Look carefully at the code example.  Once you've made your prediction, run your code and make sure your mental representation of how `for` loops work is correct.

### Case #3

The first element in the `sums` array is `Nan`?  Why?

```js
var elements = [1,2,3,4,5,6,7,8,9]
var sums = []

for (var i = elements.length; i--;) {
  sums.push(elements[i] + elements[i+1])
}

console.log(sums);
```

### Case #4

This code incorrectly prints `3` instead of `6`.  Why?  What _exactly_ is happening?

```js
let sum = 0

const head = {val: 1, next: {val: 2, next: {val: 3}}}
let current = head

while(current.next) {
  sum += current.val
  current = current.next;
}

console.log(sum);
```

Write out the instructions the computer is carrying out in detail, like you did with the `for` loop.

Then fix the code in the simplest way you can think of.

### Case #5

When this code is run, it throws an error:

```js
let sum = 0

const head = {val: 1, next: {val: 2, next: {val: 3}}}
let current = head

do {
  current = current.next;
  sum += current.val
} while (current)

console.log(sum);
```

The error is:

```
  sum += current.val
                ^

TypeError: Cannot read property 'val' of undefined
```

What is going wrong, and how would you fix it?

### Case #6

What would you see if you ran this code snippet?

```js
const input = [
  [1,2,3],
  [4,5,6],
]

let columnSums = []
for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    columnSums[j] = columnSums[j] || 0
    columnSums[j] += input[j][i]
  }
}

console.log(columnSums);
```

Draw a combination memory diagram and table of values in the iteration and figure out the result.

### Case #7

What does the following code do?  Reverse-engineer it, and figure out what kind of data would need to go in:

```js
function mysteryFunction(f, q) {
  var z = [];
  var x = f.indexOf(q);
  while (x != -1) {
    z.push(x);
    x = f.indexOf(q, x + 1);
  }
  return z;
}
```

If this were in a function, what would you name it?

HINT: assume that you are using standard JS objects - there's no trick here :)

### Case #8

When you run this code, the first element of the array that's printed is `undefined`.  Why?  How could you fix it?

```js
const v = [1,2,3,4,5,6,7,8,9]

for (let b = 0, e = v.length; b < v.length / 2; b++, e--) {
  let tmp = v[b]
  v[b] = v[e]
  v[e] = tmp
}

console.log(v);
```

If this were in a function, what would you name it?
