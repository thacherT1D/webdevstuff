### Case #1

Because we're popping (altering the array), the length goes down one on every iteration.

```
set i to 0
check if i (0) is less than t.length (9) -> true
remove 9 from t and add to p.  t.length is now 8.  p is now 9

increment i.  i is now 1
check if i (1) is less than t.length (8) -> true
remove 8 from t and add to p.  t.length is now 7.  p is now 17

increment i.  i is now 2
check if i (2) is less than t.length (7) -> true
remove 7 from t and add to p.  t.length is now 6.  p is now 24

increment i.  i is now 3
check if i (3) is less than t.length (6) -> true
remove 6 from t and add to p.  t.length is now 5.  p is now 30

increment i.  i is now 4
check if i (4) is less than t.length (5) -> true
remove 5 from t and add to p.  t.length is now 4.  p is now 35

increment i.  i is now 5
check if i (5) is less than t.length (4) -> false
exit the loop and print p
```

So the length of the array goes down as i goes up until they overlap.

Solution 1:

```js
var length = t.length
for (let i = 0; i < length; i++) {
  p += t.pop()
}
```

Solution 2:

```js
for (let i = 0; i < t.length; i++) {
  p += t[t.length - 1 - i]
}
```


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
