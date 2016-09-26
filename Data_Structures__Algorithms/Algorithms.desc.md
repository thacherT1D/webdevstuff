## Objectives

* Explain what is an algorithm
* Explain how algorithms are measured
* Explain what is Big O Notation
* Identify Big O Notation of several algorithms
* Describe algorithms for sorting including the following algorithms:
  * Selection Sort
  * Bubble Sort
  * Insertion Sort
* Identify Big O Notation of the following sorting algorithms:
  * Selection Sort
  * Bubble Sort
  * Insertion Sort
* Describe algorithms for searching including the following algorithms:
  * Linear Search
  * Binary Search
* Identify Big O Notation of the following searching algorithms:
  * Linear Search
  * Binary Search

## What is an Algorithm?

An [algorithm](https://en.wikipedia.org/wiki/Algorithm) is a well defined, step by step computational procedure for solving a problem.

Algorithms:

- have a goal ([deterministic](https://en.wikipedia.org/wiki/Deterministic_system)),
- terminate at some point in time,
- take an input, and
- produce output.

Let's think about the idea of an "algorithm". Say you have a problem that you need to solve in your every day life. For instance, let's say you had a deck of cards that were shuffled. How would you approach collecting all of the suits together? Would your approach differ if you were ordering the cards by face value? What if you were ordering the cards by face value, and you always wanted the suits in the same order? Would you make several piles, and then sort the piles? Would you go through the deck many times, placing each card in it's proper place? If you were sorting groups of 5 cards instead of a whole deck, how might your approach change?

### Exercise

In everyday programming, we're often putting together simple algorithms to perform simple tasks. Consider the following:

- Searching for the definition of a word in the dictionary.
- Finding out if a number is a prime number
- Ordering strings alphabetically
- Searching an array of users: `[{name, lastSeen}]` to find the top 5 most recently logged in users.
- Determining if there is a winner in a game of Tic Tac Toe

For as many of the above problems as you can, instead of _writing code_, try to describe how to solve these in plain english. Use step-by-step instructions to describe, and make yourself a visualization of the problem that you can test your step by step instructions on.

Now, for each set of instructions, find out the following:
- Identify the input of your problem
- Identify the constraints of your input (structure of the array? range of the number?)
- Given an input for your algorithm, determine the number of steps.
  - When you increase the size of the input by 1, how many more steps are added to the number of steps?
  - When you increase the size of the input by an order of magnitude, how many more steps are added?

## How do we measure algorithms?

We always have said that there are many ways to solve a problem with programming, but the question that one asks is, "Which solution is better?" With that, we need to build methods of measuring the effectiveness of an algorithm. An algorithm's effectiveness can be defined by three criteria:

* Its correctness (ie the output is exactly what is expected given an input)
* Its speed (ie how much time it takes to execute the algorithm)
* Its memory footprint (ie how much space in memory it takes to execute the algorithm)

### Correctness

The correctness of an algorithm is a difficult one to determine. Formally, this would require a mathematical proof that defines that given certain inputs, expected outputs would be produced. In fact, there's a whole research field on building systems that can _prove_ the correctness of an algorithm.

Instead of a proof, programmers use the next best tool: testing. Testing cannot determine completely that all inputs produce expected outputs, but it helps identify the cases that make us more confident in believing the algorithm is correct.

After proving and testing, programmers rely on reasoning in the brain that their algorithm works as expected.

### Speed

The speed of an algorithm is one that has an substantial impact on its effectiveness. Algorithms that can be solved in milliseconds vs hours can mean a lot in certain scenarios.

However, an algorithm given one input can execute substantially slower on an old computer than on the latest computer. For this, we need to use a measurement that explains the relative efficiency of an algorithm rather than an absolute number of operations the algorithm uses.

### Memory Footprint

Algorithms need to create information (through declaring new variables, arrays, or data structures) that help the algorithm reach its solution. While the memory of a computer is increasing rapidly, there is still a finite amount of memory in a computer that we need to work within the bounds of.

Like a speed measurement, different computers offer different amounts of memory. With this in mind, we will need another measurement that will define the relative amount of space the algorithm will create.

## What is Big-O Notation?

[Big-O notation](https://en.wikipedia.org/wiki/Big_O_notation) is a method of describing the complexity of an algorithm in terms of time (ie the speed) and space (ie the memory footprint). Big-O notation helps describe the relative efficiency as a function of the size of the input. Big-O notation deals with the **worst** case scenario for the algorithm.  In other words, if the program **may** run quickly, but there is a chance it could take a long time given some input, then the Big-O runtime will deal with the longer case.

To put it yet another way, Big-O runtime deals with [asymptotic approximations](https://en.wikipedia.org/wiki/Asymptotic_analysis) of the complexity of the algorithm.  It tends to care much more about how complex a program is when the input size is very large because that is typically when the performance matters the most.

Watch [this video on asymptotic complexity from CS50](https://www.youtube.com/watch?v=iOq5kSKqeR4).

## Big-O Definition

Here's the technical definition of big-O notation.

Suppose you have two mathematical functions, `f(x)` and `g(x)`. A function `f(x)` is said to be `O(g(x))` (pronounced 'Big O of g(x)') if there exists some positive constant `C` such that `|f(x)|` is less than or equal to  `C * |g(x)|` for `x` sufficiently large.

When we talk about time complexity and Big O in this class, `f(x)` will typically roughly correspond to the runtime of some javascript function (or, if you prefer, the number of operations that function needs to perform), while `g(x)` will roughly correspond to the size of that function's input.

> Don't worry if that's difficult to comprehend! We'll show plenty of examples below. The rigorous definition is a helpful point of reference, especially as you begin to familiarize yourself with the concept.

## Big-O Examples

The best way to get started with big-O notation is to start with some examples.

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

# Sorting Algorithms

When you're dealing with data, sorting is a very common task. While [sorting algorithms](https://en.wikipedia.org/wiki/Sorting_algorithm) are well-understood, they also make great fodder for interview questions, so it's essential that you understand, implement, and talk about some simple sorting algorithms.

## Sorting Efficiency

There are several ways to sort data, some faster than others. Consider for example this horribly slow sorting algorithm, called [Bogosort](https://en.wikipedia.org/wiki/Bogosort):

1. Randomly shuffle the list.
2. Check if it is sorted.
  * If the list is not sorted, repeat steps 1 and 2.
  * If the list is sorted return the sorted list.

It's easy to understand that creating random permutations of the list is not an efficient way to sort data. When we talk about sorting data, we typically perform two major operations: __comparisons__ and __swaps__. We use comparisons to find where data is out-of-order, and we use swaps to get the data closer to being in order. Algorithms compete for efficiency by trying to minimize the number of swaps and comparisons that must be done before our data is completely sorted.

> Note: Because swapping is part of all these sorting algorithms it may be helpful to implement a function called `swap` which takes in an array and two indices, and swaps the values in the array at those two indices.

## The Intuitive Algorithms

Below you will see three common sorting algorithms (__bubble sort, selection sort, and insertion sort__) and some links to see them in action. These algorithms are presented before __quick sort__ and __merge sort__ because they are more intuitive.  

One of the best ways to learn these algorithms is to try to perform them yourself. Use sticky notes, pen and paper, cups, colored blocks, or whatever you find best and try to recreate these sorting scenarios. Not only will this help you tremendously in your understanding of the algorithm, but it is __essential__ to have a fundamental knowledge before trying to implement them in a programing language.

### Bubble Sort

Of the algorithms we'll be presenting, [Bubble Sort](https://en.wikipedia.org/wiki/Bubble_sort) is the sorting algorithm with the worst complexity. The algorithm works by running through the array from left to right and swapping any two values it finds such that `array[i] > array[i+1]`. Each time you run this process, *at least* one element ends up in its sorted position.

##### Pseudo code

1. For each element in the list, look at the element to the right.
2. If the value on the left is greater than the value on the right, swap the two values.
3. Keep swapping until you're at the end of the array. Then move onto the next element in the array and repeat.

Bubble sort can be implemented using nested loops or recursion.

![bubble sort](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/175/bubblesort.gif)

> We know for sure that after 1 pass the rightmost element is sorted correctly, after 2 passes the right 2 elements are sorted correctly, and so on.

#### Complexity

Bubble sort is NOT an efficient algorithm. Its worst case performance is O(n<sup>2</sup>) ([quadratic time](https://en.wikipedia.org/wiki/Time_complexity)), because you have to make n iterations through a list checking all n elements each pass. This runtime means that as the number of elements sorted increase, the runtime increases quadratically. But if efficiency isn't a major concern or if you are sorting a small number of elements, bubble sort is a great way to start thinking about sorting.

### Selection Sort

[Selection sort](https://en.wikipedia.org/wiki/Selection_sort) is very similar to bubble sort. The difference is that instead of comparing each array item to its neighbor, the goal is to locate the *smallest* remaining value and drop it into the correct place in the array. This algorithm breaks the array into two sections, the __sorted__ and __unsorted__ sections. At the start of the algorithm, the whole array is the __unsorted__ section.

The basic algorithm looks like this:

#### Pseudo code

1. Pick the item at the left-most point in the __unsorted section__. Call this the __current minimum__.
1. Compare this current minimum to each item in the unsorted section.
  * If any item in the unsorted section is smaller than the  current minimum, set that item as the current minimum.
  * When you've reached the end of the __unsorted section__ the __current minimum__ must be the absolute minimum value in the unsorted section.
1. Swap the __absolute minimum__ to the left-most index in the __unsorted section__. This item is now the __right most__ member of the __sorted section__.

![selection sort](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/174/selectionsort.gif)

> The __sorted section__ is colored gold, the __current minimum__ is colored red, the __unsorted section__ is colored light blue.

>Practice with [this interactive card game](https://www.khanacademy.org/computing/computer-science/algorithms/sorting-algorithms/a/sorting)

#### Complexity

Since selection sort is so similar to bubble sort, you can probably guess what the complexity of this sorting algorithm is. Once you've gotten your tests to pass in the exercise below, try to analyze your code to determine the complexity a little more rigorously.

__Specifically, prove that this claim is true or false__: Although bubble sort and selection sort are both `O(n^2)`, bubble sort will __always__ perform more total operations (swaps + comparisons).

### Insertion Sort

[Insertion sort](https://en.wikipedia.org/wiki/Insertion_sort) works by taking your array and incrementally sorting the values on the left hand side. Similar to selection sort, this algorithm makes  distinction between a __sorted section__ and an __unsorted section__. Unlike selection sort, insertion sort grabs the __next unsorted item__ (as opposed to the smallest unsorted item) and places it into the correct place in the __sorted section__. Selection sort always places an item in the right-most position of the sorted section, insertion sort will search for the __right__ index within the __sorted section__.

#### Pseudo code

1. Select the left-most item in the __unsorted section__, call this the __current item__.
2. Select the right-most index of the __sorted section__ and call this element __current sorted item__.
  * Compare the __current item__ to the __current sorted item__
  * If __current item__ is less than the value of __current sorted item__, swap the two.
  * Now update __current sorted item__ to be the item to the left of __current item's__ new position.
  * Repeat this process until __current item__ is greater than or equal to the __current sorted item__. Now __current item__ is part of the __sorted section__.
3. Repeat until the __unsorted section__ is empty.

![insertion sort](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/173/insertionsort.gif)

> __current item__ turns gets pulled off the image to the bottom of the screen. __current sorted item__ is colored green. The __sorted section__ is colored gold, and the __unsorted section__ is colored light blue.

Note that after step 1, the first two elements will be sorted. After step 2, the first three elements will be sorted. After repeating step 2 once, the first four elements will be sorted, and so on. After each step in the process, the sorted portion of the area increases in size by 1, until the entire array is sorted.

#### Complexity

If the array is already sorted, insertion sort is relatively fast at [O(n)](https://en.wikipedia.org/wiki/Time_complexity#Linear_time). But in general, the complexity here is [O(n<sup>2</sup>)](https://en.wikipedia.org/wiki/Time_complexity). Can you convince yourself why this is the case after you've implemented insertion sort on your own?

## Picking a Sorting Algorithm

With all of the sorting algorithms to choose from – and we've only named a few – which one is **best**? Well, it depends. This largely depends on the type of data we're sorting, how large the input is, and how much performance and speed matter to us.

> If you'd like to dig into sorting algorithms even more, consider watching [15 Sorting Algorithms in 6 Minutes](https://www.youtube.com/watch?v=kPRA0W1kECg) to see how some of them compare visually.

### Bonus question

Most programming languages have a sorting mechanism built in. What sorting algorithm does your language of choice use?

# Exercises:

Once you're comfortable with the general idea of sorting algorithms, the best way to solidify your understanding is to write one out in code.

# Implementing Sorting Algorithms in Javascript

Complete the `sorting/sortingAlgorithmsSpecPart1.js` tests.

## Part 1: Bubble Sort, Selection Sort, Insertion Sort

Try to implement bubble sort, selection sort, and insertion sort (if you need a refresher on these algorithms, check out the [computer science curriculum](https://github.com/gSchool/computer-science-curriculum/blob/master/Unit-2/04-sorting-intro.md)).

For each of these algorithms, you'll also find it helpful to implement a `swap` function which swaps to values in an array.

Your goal is to get the tests for `bubbleSort`, `selectionSort`, `insertionSort`, and `swap` to pass. Note: The tests for the three searching algorithms are the same, but don't use the same implementation for each! The goal of this exercise is for you to be able to implement the different algorithms, even though they have the same effect on the arrays in the tests.

### Helpful Resources

* [https://study.cs50.net](https://study.cs50.net)
* [http://www.sorting-algorithms.com/](http://www.sorting-algorithms.com/)
* [Bubble Sort in JavaScript](http://www.nczonline.net/blog/2009/05/26/computer-science-in-javascript-bubble-sort/)
* [Selection Sort in JavaScript](http://www.nczonline.net/blog/2009/09/08/computer-science-in-javascript-selection-sort/)
* [Insertion Sort in JavaScript](http://www.nczonline.net/blog/2012/09/17/computer-science-in-javascript-insertion-sort/)
* [Visual Sorting](http://visualgo.net/sorting)

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
