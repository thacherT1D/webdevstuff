# Recursion

## Objectives

By the end of this article you should be able to:

- Explain why recursion is useful.
- Be able to utilize recursion.

## Intro

[Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)) is a technique where a function can call itself.

Here is an example of a recursive function:

```javascript
console.log(recursive(10));

function recursive(n){
  if(n === 0){
    return 0;
  }
  return 1 + recursive(n - 1);
}
```

**Exercise:** What do you think the above example prints?

## Parts of a recursive function.

In order to write a recursive function we need to ensure our function has the following:

1. A Base Case(s)
1. Recursive step

Let's re-examine the example from earlier:

```javascript
function recursive(n){
  // Base case
  // If `n` equals 0, return a 0 and stop recursing.
  if(n === 0){
    return 0;
  }
  // Recursive step
  return 1 + recursive(n - 1);
}
```

**A base case is** a condition to stop recursing. It ensures we do not recurse forever. Just like when we loop, we generally have a condition to ensure we do not loop forever.

In the example above our base case would be:

```javascript
//If `n` equals 0, return a 0 and stop recursing.
if(n === 0){
  return 0;
}
```

**The recursive step is** where the function invokes itself.

Here the recursive step is:

```javascript
// Recursive step
return 1 + recursive(n - 1);
```

Essentially this line of code is saying, I would like to return 1 + the result of `recursive(n - 1)`;

**Exercise** Step through this code line by line on paper for function call `recursive(5)``.

Example:

```javascript
recursive(5);
recursive(n){
  //does 5 equal zero?
  //no, keep moving
  if(n === 0){
    return 0
  }
  //what is the result of recursive(5 - 1) (step through recursive step, ie does 4 equal zero?)
  return 1 + recursive(n - 1);
}
```


## Loops vs. Recursion

Everything that can be written recursively can be written using a loop and vice versa.

Here is the above example written using a loop:

```javascript
console.log(loop(10));

function loop(n){
  var total = 0;
  while(n--){
    total++;
  }
  return total;
}
```

If a loop can do everything recursion can why is this useful?

It is all about using the right tool for the right problem. Some problems are better solved in a recursive manner, and others are better solved using loops.

**Recursion is useful for** breaking a large problem into a tiny problem set. Often times large problems can be reduced to a tiny problem that can be repeated over an over.

Take this recursive function to remove all instances of character from a string:

```javascript
var word  = 'I am a monkey!';
console.log(removeChar(word, ' '));

function removeChar(str, targetChar){
  //base case
  if(str.length === 0){
    return '';
  }

  var currentChar = str.charAt(0);

  if(currentChar === targetChar){
    //recursive step
    return '' + removeChar(str.slice(1), targetChar);
  } else {
    //recursive step
    return currentChar + removeChar(str.slice(1), targetChar);
  }
}
```

This example breaks down the problem of reversing a tiny sub problem it repeats:

If the string is empty return an empty string.
Otherwise, if the first character of the string is the `targetChar` return removeChar without the current character.
Otherwise, return the current character and the result of removeChar without the current character.

**Exercise:** Define a recursive function that takes an argument `n` and prints the lyrics to 99 bottles of beer on the wall, starting with that number `n`.

**Recursion is useful when** working with abstract data types such as linked lists, trees and graphs. Recursive solutions to these problems seem very natural and elegant. While loops can provide a solution, some of these problems are difficult to elegantly express using a loop.

Recursion can be used to traverse tree structures. For example, take the following tree, where each letter represents a node in the tree:

```
      A
  ____|____
  |       |
  B       C
__|__   __|__
|   |   |   |
D   E   F   G
            |
            H
```

In this tree, we can say that-

* `A` is the "root" node
* `A` has two child nodes: `[B, C]`
* `B` has two child nodes: `[D, E]`
* `C` has two child nodes: `[F, G]`
* `G` has one child node:  `[H]`

Let's say you wanted to go over the entire tree and print the letters out... you could write (pseudo) code like this:

```
print the root node's letter
for each child node in the root node's children
  print the child node's letter (B, C)
  for each child in the child node's children
    print the granchild's letter (D,E,F,G)
    for each child in the grandchild's children
      print the letter (H)
```

You can see that this only works if the tree has 4 levels.  But what if it had 8 levels? Or 100?  Basically that code is doing the same thing, but from a different starting point:

1. Start with `A`, print `A`'s letter
1. Go over all of `A`'s children and repeat step 1, but start with `B`, then with `C`

We could write that in JavaScript like so:

```js
function printLetters(node) {
  console.log(node.name);
  node.children.forEach(function(childNode){
    printLetters(childNode)
  });
}
```

**Exercise:** Write a recursive function to reverse a string.

> Check out the [CMU Recursion Slides](http://www.cs.cmu.edu/~15110-f12/Unit05PtA-handout.pdf) for more.

## Creating a recursive solution

Outlined below are two useful approaches to designing a recursive solution to a problem.

### Approach #1 - Identify sub-problems

Often times recursive problems require you to split a big problem into smaller problems.  For example, let's say you were trying to write a recursive function that would find the first element of an array greater than a specific number.  The `for` loop would look like this:

```js
function firstGt(array, number) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] > number) {
      return array[i]
    }
  }
}
```

Here, you could split this into two sub-problems:

- Problem #1 is to take the first element of the array and see if it's bigger.  
- Problem #2 is to take the rest of the array (all _except_ the first element), and repeat Step #1.

```js
function firstGt(array, number) {
  if (array[0] > number) {
    return array[0]
  } else {
    return firstGt(array.slice(1), number)
  }
}
```

### Approach #2 - Start at the bottom

1. Pretend you are at the solution
  * For example:
    * This can be a node you are searching for
    * The end of a recursive data structure
1. How do you know you found the solution (what's your base case)
1. Now that you have you answer, how do you get this answer back to the top
1. Since you have solved the problem, assuming you are at the solution...
1. How do you get to the solution
  * Easier to think one step at a time
  * How do I go one step further
  * If you know how to get from one step to the next, and know when to stop...
1. $$$

> [Sparknotes on Recursion](http://www.sparknotes.com/cs/recursion/whatisrecursion/section1.rhtml)


**Exercise:** Define a recursive function that takes an argument n and returns the fibonacci value of that position. The fibonacci sequence is 0, 1, 1, 2, 3, 5, 8, 13, 21... So fib(5) should return 5 and fib(6) should return 8

## More Exercises



#### Stretch goals

> If you like, you can write an iterative solution to the problem first, then write the recursive solution.

1. Define a recursive function that returns true if a string is a palindrome and false otherwise.
1. Define a recursive function to calculate the factorial for a given number.
1. Convert Roman Numerals to Integers
1. [Recursion exercises](https://roman01la.github.io/recursion-exercises/)

## Recursion Write Up

* Why is recursion a useful technique for solving a big problem?
* What are the limitations of using recursive solutions?
* What types of problems are more suited for simple loops than recursion?
* What is meant by "recursive depth?"
* What is a "stack overflow" (the concept, not the website)? And why is that relevant to a recursive problem?
