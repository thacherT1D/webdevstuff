# Intro to Algorithms

An [algorithm](https://en.wikipedia.org/wiki/Algorithm) is a well defined, step by step computational procedure for solving a problem.

Algorithms:

- have a goal ([deterministic](https://en.wikipedia.org/wiki/Deterministic_system)),
- terminate at some point in time,
- take an input, and
- produce output.

## Unit Objectives

In this unit we will:

- Define "Abstract Data Type" (ADT) and algorithm
- Discuss what Time Complexity and Space Complexity refer to and how they differ
- Describe Big O Notation and identify the complexity of any given function
- Describe what a pointer is
- Describe and implement recursive functions

Let's think about the idea of an "algorithm". Say you have a problem that you need to solve in your every day life. For instance, let's say you had a deck of cards that were shuffled. How would you approach collecting all of the suits together? Would your approach differ if you were ordering the cards by face value? What if you were ordering the cards by face value, and you always wanted the suits in the same order? Would you make several piles, and then sort the piles? Would you go through the deck many times, placing each card in it's proper place? If you were sorting groups of 5 cards instead of a whole deck, how might your approach change?

### Exercise
In everyday programming, we're often putting together simple algorithms to perform simple tasks. Consider the following:

- Ordering strings alphabetically
- Finding out if a number is a prime number
- Finding out if a number is a Harshad number
- Searching an array of users: `[{name, lastSeen}]` to find the top 5 most recently logged in users.
- Making a dictionary of users who share first names, and another of users who share last names
- Determining who won in a game of Tic Tac Toe

For as many of the above problems as you can, instead of _writing code_, try to describe how to solve these in plain english. Use step-by-step instructions to describe, and make yourself a visualization of the problem that you can test your step by step instructions on.

Now, for each set of instructions, find out the following:
- Identify the input of your problem
- Identify how to tell what the size of your input is (length of the array? Size of the number?)
- Given an input for your algorithm, determine the number of steps.
  - When you increase the size of the input by 1, how many more steps are added to the number of steps?
  - When you increase the size of the input by an order of magnitude, how many more steps are added?
- On a whiteboard, plot inputs to each algorithm given an input size of 10, 50, 100, 500, 1000, 10,000 on a graph, where the X axis is the input size and the Y axis is the number of steps.

After you have graphed these problems, move on to reading about [Big O Notation!](./02-big-o-notation.md)

# Big-O Notation

[Big-O notation](https://en.wikipedia.org/wiki/Big_O_notation) is how developers discuss the complexity of an algorithm as a way to understand how fast a program will run given it's input. Big-O notation deals with the **worst** case scenario for the algorithm.  In other words, if the program **may** run quickly, but there is a chance it could take a long time given some input, then the Big-O runtime will deal with the longer case.

To put it yet another way, Big-O runtime deals with [asymptotic approximations](https://en.wikipedia.org/wiki/Asymptotic_analysis) of the complexity of the algorithm (http://mathworld.wolfram.com/Asymptotic.html).  It tends to care much more about how complex a program is when the input size is very large because that is typically when the performance matters the most.

## Objectives

* Learn about big O and see some examples of algorithms and big O
* Explore runtimes for different functions in the Chrome console

Watch [this video on asymptotic complexity from CS50](https://www.youtube.com/watch?v=iOq5kSKqeR4).

## Big-O Definition

Here's the technical definition of big-O notation.

Suppose you have two mathematical functions, `f(x)` and `g(x)`. A function `f(x)` is said to be `O(g(x))` (pronounced 'Big O of g(x)') if there exists some positive constant `C` such that `|f(x)|` is less than or equal to  `C * |g(x)|` for `x` sufficiently large.

When we talk about time complexity and Big O in this class, `f(x)` will typically roughly correspond to the runtime of some javascript function (or, if you prefer, the number of operations that function needs to perform), while `g(x)` will roughly correspond to the size of that function's input. (You can also talk about Big O within the context of [space complexity](https://www.cs.northwestern.edu/academics/courses/311/html/space-complexity.html), but we'll save that for another time.)

> Don't worry if that's difficult to comprehend! We'll show plenty of examples below. The rigorous definition is a helpful point of reference, especially as you begin to familiarize yourself with the concept.

## Big-O Examples

The best way to get started with big-O notation is to start with some examples...

### [O(n) / Linear Time](https://en.wikipedia.org/wiki/Time_complexity#Linear_time)

```javascript
// O(n)

function square(arr) {
  return arr.map(function(el) {
    return el * el;
  });
}
```

The above example is [O(n](https://en.wikipedia.org/wiki/Time_complexity#Linear_time)) run time, which means given a input of size n (the length of the array is equal to n), the runtime of the application will be linear in relationship to the input size.  In other words, if every x * x operation takes some unit of time, we can expect n of those operations to take place.

Let's take a look at this even more concretely. The following function takes in two arguments: a callback and an array. It returns the time it takes your computer to execute the code in the callback.

```javascript
function testPerformance(callback, arr) {
  var t0 = performance.now();
  callback(arr);
  var t1 = performance.now();
  return t1 - t0;
}
```

NOTE: `performance` is not available in Node, so if you are using Node use https://nodejs.org/api/process.html#process_process_hrtime

**Exercise** Create an array of length 1,000,000, where each entry is the number 2. Then test the performance of `square` on this array, using `testPerformance`.

If you run `testPerformance` many times on the same arguments, you should see different outputs. As you saw in the CS50 video, the time it takes to run a certain block of code is highly variable not just across machines, but also for a given machine.

Even so, it can be helpful to plot several data points and look for trends.

**Exercise** Repeat the previous exercise for arrays of 2 million, 3 million, and so on up to 10 million. Then record the times you get in [this table](https://www.desmos.com/calculator/i64rd3xdsv), and you'll wind up with a nice little graph of your data. What sort of trend do you see?

**Bonus** If you want to decrease the variability in the times output by your performance test, what could you do?

Below is another example. In terms of big-O, what do you think the runtime of this function is?

```javascript
function squareAndDouble(arr) {
  var tempArr = arr.map(function(el) {
    return el * el;
  });
  return tempArr.map(function(el) {
    return 2 * el;
  });
}
```

**EXERCISE** Make an educated guess about the runtime of this function. Then do some performance testing and graph your results. Do you stand by your guess?

![](http://images-cdn.9gag.com/photo/a9LGndm_700b_v1.jpg)

In the above example the runtime is O(n + n) or O(2 * n). The runtime is O(2 * n) because the first `arr.map` iterates over all n elements in the array, and the second `tempArr.map` also iterates over all n elements in the array.  However, the runtime is actually O(n), because in big-O notation, constants are ignored.

### [O(1) / Constant Time](https://en.wikipedia.org/wiki/Time_complexity#Constant_time)

**RULE: Big-O notation ignores constants.**

```javascript
// O(1)

function print50nums() {
  for (var i = 0; i < 50; i++) {
    console.log(i);
  }
}
```

The runtime of the above example is not bound by a variable sized input.  Instead it is bound by the constant 50.  The runtime of the program is O(50), but since constants do not matter in big-O notation, we simplify it to O(1).

```javascript
// O(1)

function print500000nums() {
  for (var i = 0; i < 500000; i++) {
    console.log(i);
  }
}
```
The example above is still O(1) because 500,000 is still a constant number of iterations.

**EXERCISE** Do some performance tests and graph the results. What is the complexity?

```javascript
function addSomeNumbers(arr) {
  sum = 0;
  for (var i=0; i < Math.min(arr.length,1e7); i++) {
    sum += arr[i];
  }
  return sum;
}
```

This is O(1) because all operations in the program do not depend on input size. No matter how large the array, there's an upper bound on the number of operations that the function will perform.

### O(n^2) / Quadratic time

**EXERCISE** Again, do some performance tests and graph the results. What is the complexity?

```javascript
function sumValuesAndRemoveOdds(arr) {
  var i = 0;
  while (i < arr.length) {
    var sum = 0;
    var j = i;
    while (j < arr.length) {
      sum += arr[j];
      j += 1;
    }
    arr[i] = sum;
    i += 1;
  }

  var newArr = [];

  i = 0;

  while (i < arr.length) {
    if (arr[i] % 2 === 0) {
      newArr.push(arr[i]);
    }
    i += 1;
  }

  return newArr;
}
```

![](http://images.contentful.com/7h71s48744nc/3naPsJv6IE0KewGmqUOMUu/a00a2a2cbe0c580cfce1b502c1ebdc9f/a-beautiful-mind.jpg)

This is O(n\*n + n).  The first n*n (n^2) comes from the while loop that iterates over all of the elements in the array and has another while loop inside that also iterates over all elements in the array.  The second n comes from the final while loop that iterates over all elements and removes odds.  The expression can also be simplified further.  Any time there is addition in the big O notation, the worst case runtime is kept. All other values are dropped. In this case, the runtime would just be O(n^2).

**RULE: When big-O values are added, keep the worst case runtime, and drop all other additional values.**

## More Exercises

Visit the [Big-O Notation Practice Repo here](https://github.com/gSchool/big-o-practice)

**EXERCISE**

1. Check out [this graph](https://www.desmos.com/calculator/isubf6mydg) for data on the functions you've explored today, as well as some data on different algorithms we've seen or will encounter later on: bubble sort, binary search, naive Fibonacci, merge sort, and bogo sort. Take a look at the data and the trends. What's the complexity of each algorithm? Which algorithm is the most/least efficient? (Need a refresher on some of the math functions that appear? Scroll down!)

**EXERCISE:**

Reduce the following big-O expressions. If they can't be reduced, explain why.

1. O(5555593939) + O(n^2) + O(n * n * n)
2. O(93939283940) + O(8274920484) + O(12)
3. O(n * n)
4. O(3n + 2n + 5n + 9n)
5. O(n^3 + n) + O(2^n)
6. O(n * log(n) + log(n))
7. O(n^n)

Which is the faster big O runtime (Make sure to reduce both expressions first):

1. O(n + n^2 + 5) or O(3n + 70000000)
2. O(n * log(n)) or O(n^2)
3. O(n^n) or (n^50000)
4. O(1) or O(9999999999999)
5. O(n * n * 5 * n) or O(n^2)

**CHALLENGES:**

1. What is the complexity of each of the functions in [this graph](https://www.desmos.com/calculator/e6335rf6ao)?

2. Prove, using the definition of big-O, why constants don't matter in the notation (e.g. why O(2n) is the same as O(n)).

3. Prove that big-O notation is _transitive_. In other words, if `f(x)` is `O(g(x))`, and `g(x)` is `O(h(x))`, then `f(x)` is `O(h(x))`.

## Addendum

You've seen a few functions in this section, such as `log(x)` and `x!`, that may be bringing back some (hopefully fond!) memories of high school math classes. If you need a quick refresher on logs or factorials, read on.

### Logarithms

A very simple entry point for logarithms can be found in the book [How Not To Be Wrong](http://www.amazon.com/How-Not-Be-Wrong-Mathematical/dp/0143127535) by mathematician Jordan Ellenberg:

> It has come to my attention that hardly anybody knows what the logarithm is. Let me take a step towards fixing this. The logarithm of a positive number N, called _log N_, is the number of digits it has.

> Wait, really? That's it?

> No. That's not _really_ it. We can call the number of digits the "fake logarithm", or _flogarithm_. It's close enough to the real thing to give the general idea of what the logarithm means in a context like this one. The flogarithm (hence also the logarithm) is a very slowly growing function indeed: the flogarithm of a thousand is 4, the flogarithm of a million, a thousand times greater, is 7, and the flogarithm of a billion is still only 10.

Another way to think of logarithms (which may be more familiar to you from high school math) is as inverses to exponential functions. The base-10 logarithm, commonly written _log N_, is the inverse to the function 10<sup><em>x</em></sup>. Graphically, this helps to explain the shape of the log graph; it's just a reflection of an exponential graph. This relationship between logarithms and exponentials also explains the slow growth of the logarithm: as _x_ grows, exponential functions produce large changes in output for small changes in input, while logs require large changes in input for small changes in output.

But why use words to explain the relationship, when graphs will do the job even better? Check [this one](https://www.desmos.com/calculator/qa1sbhk6if) out.

If all else fails, just remember that a log is an exponent. The log base _b_ of some value _x_ (written log<sub><em>b</em></sub>(<em>x</em>)) is the exponent that satisfies the equality <em>b</em><sup>log<sub><em>b</em></sub>(<em>x</em>)</sup> = <em>x</em>. For example, log<sub>3</sub>(81) = 4, since 4 is the exponent in the equation 3<sup>4</sup> = 81.

Factorials are a little more straightforward. The factorial of a positive integer _n_ is just the product of all numbers from 1 to _n_: 1! = 1, 2! = 2, 3! = 6, 4! = 24, and so on. It's possible to extend the definition of this function so that it makes sense for all numbers, not just positive integers: see [here](https://www.desmos.com/calculator/kup5ttpbj9). As shown by the graph, the factorial function grows fast. Super fast. Faster, even, than an exponential function. This is why factorial complexity is even worse than exponential complexity.

# Resources

### Matt Garland

* [Matt Garland's YouTube channel](https://www.youtube.com/channel/UCXKj1IJVDEHHHDOt49FhOOA) focused on simple visualizations of various CS concepts.

* [Matt Garland explains Big O](https://www.youtube.com/watch?v=nMQyBh2FuaA)

### MIT Open Courseware

* [MIT's Overview of computational complexity](https://www.youtube.com/watch?v=moPtwq_cVH8)

* [MIT's Intro to Algorithms](https://www.youtube.com/watch?v=whjt_N9uYFI)

### My Code School

* [My Code School's channel of CS Concepts](https://www.youtube.com/channel/UClEEsT7DkdVO_fkrBw0OTrA)

* [My Code School's Intro to Asymptotic Notation](https://www.youtube.com/watch?v=OpebHLAf99Y)

### Carleton Moore

* [Carleton Moore's YouTube channel](https://www.youtube.com/channel/UCxVXiZ0KRSSIdxU6rqM_dfg)

* [Carleton Explains Big O](https://www.youtube.com/watch?v=chZNdhO6Ifw)

### UC Berkeley

* [Asymptotic Analysis](https://www.youtube.com/watch?v=V1xXmQkzkZI)

### Others

- http://bigocheatsheet.com/
- http://web.engr.illinois.edu/~jeffe/teaching/algorithms/

# Searching Algorithms

Before we examine new data-structures, we're going to look at some algorithms for a data-structure we know and love: the Array. First we're examining how to search through an array to find a specific value. Later in this unit, we'll look at ways to sort arrays.

## Linear Search

[Linear search](https://en.wikipedia.org/wiki/Linear_search) (or sequential) search is a method for finding a particular value in an array, that consists of checking every one of its elements, one at a time and in sequence, until the desired one is found. Linear search is the simplest search algorithm; it is a type of [brute-force search](https://en.wikipedia.org/wiki/Brute-force_search).

Linear search runs on average at [O(n)](https://en.wikipedia.org/wiki/Time_complexity#Linear_time).

In computer science, linear search or sequential search is a method for finding a particular value in a list that checks each element in sequence until the desired element is found or the list is exhausted.

https://en.wikipedia.org/wiki/Linear_search

## Binary Search

The key here is that we have an array of n element(s).

[Binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm) or half-interval search finds the position of a specified input value (the search "key") within an array sorted by key value.

For binary search, the array should be arranged in ascending or descending order. In each step, the algorithm compares the search key value with the key value of the middle element of the array. If the keys match, then a matching element has been found and its index, or position, is returned. Otherwise, if the search key is less than the middle element's key, then the algorithm repeats its action on the sub-array to the left of the middle element or, if the search key is greater, on the sub-array to the right. If the remaining array to be searched is empty, then the key cannot be found in the array and a special "not found" indication is returned.

Binary search runs on average at [O(log n)](https://en.wikipedia.org/wiki/Time_complexity#Logarithmic_time) -> THIS IS [FAST](http://stackoverflow.com/a/2307314/1799408)!

The binary search algorithm begins by comparing the target value to the value of the middle element of the sorted array. If the target value is equal to the middle element's value, then the position is returned and the search is finished. If the target value is less than the middle element's value, then the search continues on the lower half of the array; or if the target value is greater than the middle element's value, then the search continues on the upper half of the array. This process continues, eliminating half of the elements, and comparing the target value to the value of the middle element of the remaining elements - until the target value is either found (and its associated element position is returned), or until the entire array has been searched (and "not found" is returned).

https://en.wikipedia.org/wiki/Binary_search_algorithm

## Exercise

Make the `array-search/search-algorithms` tests pass in the exercises directory.

### Visualization

- [Visualization](https://www.cs.usfca.edu/~galles/visualization/DFS.html)
- http://www.sorting-algorithms.com/

https://raw.githubusercontent.com/gSchool/computer-science-curriculum/master/Unit-2/03-sorting-intro.md?token=AAEPOBHjbMLSvgQ9SKQAdUqJoeAPcsnXks5X8Vv-wA%3D%3D

# Sorting Algorithms, Part 2

## Objectives

* Implement a merge sort algorithm in Javascript
* Implement a quicksort algorithm in Javascript

## Introduction

In [Part 1](../Unit-2/04-sorting-intro.md), you learned about three relatively straightforward sorting algorithms: bubble sort, selection sort, and insertion sort. Compared to other sorting algorithms, these three are some of the most approachable and easy to reason about. However, if you're trying to sort an array with millions of values, these algorithms are also not terribly efficient: on average, all three of them are O(n<sup>2</sup>), where n represents the size of the array being sorted.

In this section, we'll learn about two other sorting algorithms: merge sort and quicksort. These two algorithms perform better on average as the size of the array grows, but they're also a bit more complicated. Let's talk about these algorithms conceptually and create some pseudo-code; you'll be asked to implement each of these algorithms at the end.

## Merge Sort

Merge sort works by decomposing the array into smaller chunks, which are then sorted and merged together. This process goes all the way down to arrays of size 1, which are super easy to sort!

Here's a step-by-step description of merge sort:

**Pseudo Code:**

1. If your array has a length less than 2, congratulations! It's already sorted.
2. Otherwise, cut your array in half, and consider the two sub-arrays separately.
3. Sort each of your smaller subarrays using merge sort.
4. Merge your two subarrays together, and return the merged array.

![merge sort](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/172/mergesort.gif)

Through this recursive process, you'll wind up with a sorted array!

In order to implement this function, it's useful to have a helper function that takes two sorted arrays and merges them together to create a new, larger sorted array. Here's some pseudo-code to get you started:

```js
function merge(arr1, arr2) {

	// 1. declare a new empty array, and pointers corresponding to indices in arr1 and arr2 (set them both to 0)
	// 2. if the first element in arr1 is less than the first element in arr2, push the first element in arr1 to the new array, and move the pointer for arr1 one spot to the right. Otherwise, do this for arr2.
	// 3. Repeat this process until you've gone through one of the arrays
	// return the new array, concatenated with whatever elements are remaining from the array that you haven't exhausted yet.

}
```

Once you've implemented this merge function, you can implement merge sort using the pseudo code outlined above.

**Time Complexity**

Determining the time complexity of merge sort requires some careful thought. From a high level, merge sort works by subdividing the original array into subarrays that are half as long, until the subarrays can't be divided any further and are therefore already sorted.

Then comes the merging. At each level (1-element arrays to 2-element arrays, 2-element arrays to 4-element arrays, and so on), there are O(n) operations that need to be performed. And how many levels are there? Well, the number of levels equals the number of times you can divide n by 2 before you get a quotient that's less than or equal to 1. But this is just log<sub>2</sub>(n). Therefore, the time complexity is log(n) copies of O(n), a.k.a. O(n log(n))!

![http://i.stack.imgur.com/rPhxO.png](http://i.stack.imgur.com/rPhxO.png)

Vieiwing the image above as a tree, its height is roughly equal to log<sub>2</sub>(n).

(For some more discussion on this, check out this [programmers stackexchange](http://programmers.stackexchange.com/questions/297160/why-is-mergesort-olog-n) The above image comes from that conversation).

**Space Complexity**

Because merge sort requires the use of a merge function which takes two arrays and creates a new array that's (roughly) twice as large, the space complexity of merge sort is O(n).

## Quicksort

Quicksort is probably the least straightforward of all the sorting algorithms we'll consider here. Like merge sort, the time complexity for quicksort is typically O(n log(n)) (though in the worst case, it can be O(n<sup>2</sup>)). However, when sorting an array in place using quicksort, the space complexity is better than merge sort: O(log(n)) rather than O(n).

Before diving into the algorithm, you would watch [this video from Computerphile](https://www.youtube.com/watch?v=XE4VP_8Y0BU), which does a great job of explaining how quicksort works.

Here's the gist of how quicksort works:

1. Take an element in the array and refer to it as the "pivot." For simplicity, we'll take the first element in the array to be the pivot. (As you'll see, this is a bad choice if the array is already sorted. It makes the algorithm a little easier to reason about though, so we'll take the tradeoff.)
2. Compare every other element to the pivot. If it's less than the pivot value, move it to the left of the pivot. If it's greater, move it to the right. Don't worry about where on the left or right you're putting these values; the only thing that matters is comparisons to the pivot.
3. Once you're done, the pivot will be in the right place, and you can then recursively repeat this process with the left and right halves of the array.

![quicksort](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/171/quicksort.gif)

(Note: for arrays with unique values, you can think of this process as generating a binary search tree. The root node is the first pivot, and every subsequent node is a subsequently chosen pivot.)

Before worrying about implementing a quicksort with the best possible space complexity, let's write a quicksort that just gets the job done with O(n) space complexity. Here's some pseudo code:

```js
function quickSort(arr) {
  /* 1. If the length of the array is less than 2, it is already sorted, so return it.
  2. Otherwise, create two empty arrays (one for the left and one for the right), and set the first value in arr equal to the pivot.
  3. Compare every element in the array to the pivot. If the element is less than the pivot, push it into the left array. Otherwise, push it into the right array.
  4. Recrusively call quickSort on the left array and the right array, then concatenate these arrays together with the pivot value in between them, and return this larger array. */
}
```

The downside with the above approach is that when we pass an array into `quickSort`, we're getting a new array back, which requires more memory. If space complexity is important (for example, if you're trying to sort an array with millions of elements), then it might be better to try to implement quicksort on an array _in place_.

This approach is a bit more complicated, and is typically done with the addition of a helper function called `partition`, which handles arranging the values in a given section of an array so that they are moved to the either side of a given pivot based on their values.

This will be easier to understand with some more pseudo code:

```js
// left and right indicate the left and rightmost indices in the sub-array that you're partitioning.

function partition(arr, left, right) {
  /* 1. Set the pivot value to be the value at the left index, and set a varaible called partitionIndex equal to left. The partitionIndex will help us keep track of where to perform our swaps so that we wind up with values correctly placed on either side of the pivot.
  2. For every index greater than left and less than right + 1, compare the array value to the pivot value.
  3. If the array value at the given index is less than the pivot value, increment the partition index and swap the array value with the value at the partition index.
  4. At the end, swap the pivot value with the value at the partition index (this ensures that the pivot ends up in between values less than it and values greater than it).
  5. Return the partition index. */
}

function quickSort(arr, left=0, right=arr.length - 1) {
  /* 1. If left is less than right, declare a variable called partitionIndex which is equal to the result of a call to partition, passing in arr, left, and right. After the call to partition, perform a quicksort to the two subarrays to the left and right of the partitionIndex.
  2. Return arr. */
}
```

Hopefully this should be enough to get you on your way to implementing quicksort with O(log(n)) space complexity. If you're still stuck, consult some of the references below.

## What about `Array.prototype.sort`?

As you may know, Javascript (along with most other languages) has a built-in sort method on arrays. This raises a question: what sorting method is being used under the hood?

Well, it depends. As of 2012, according to Nicholas C. Zakas (reference below):

> Quicksort is generally considered to be efficient and fast and so is used by V8 as the implementation for Array.prototype.sort() on arrays with more than 23 items. For less than 23 items, V8 uses insertion sort. Merge sort is a competitor of quicksort as it is also efficient and fast but has the added benefit of being stable. This is why Mozilla and Safari use it for their implementation of Array.prototype.sort().

# Exercises:

Complete the `sorting/sortingAlgorithmsSpecPart2.js` tests.

## Stretch Goal: Merge Sort, Quicksort

Try to implement two more advanced sorting algorithms: merge sort and quicksort.

For merge sort, you'll find it helpful to implement a `merge` function which takes two sorted arrays and merges them into one sorted array.

Your goal is to get the tests for `mergeSort`, `quickSort`, and `merge` to pass. Note: As in Part 1, don't use the same implementations for these searching algorithms!

## Resources:

* [Merge Sort in JavaScript](http://www.nczonline.net/blog/2012/10/02/computer-science-and-javascript-merge-sort/)
* [Merge Sort Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)
* [Quick Sort in JavaScript](http://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/)
* [Quicksort in Javascript](https://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Quicksort#JavaScript)
* [JS Front-end Interview Questions: Quicksort](http://khan4019.github.io/front-end-Interview-Questions/sort.html#quickSort
)
