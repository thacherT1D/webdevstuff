# Big-O Notation

## Objectives

* Explain what is Big O Notation
* Review Big O Examples for the following:
  * Linear Time / O(n)
  * Constant Time / O(1)
  * Quadratic time / O(n^2)

## What is Big-O Notation?

In discussing how we measure algorithms in terms of time (ie the speed) and space (ie the memory footprint), we needed to define a method of measurement to measure the overall complexity of an algorithm. Nowadays, the most common measurement is Big-O notation. Big-O notation helps describe the relative efficiency as a function of the size of the input. Big-O notation deals with the **worst** case scenario for the algorithm. In other words, if the program **may** run quickly, but if there is a chance some input would make the algorithm run a longer amount of time, then the Big-O runtime will deal with the longer case.

Big-O notation identifies an overall class that an algorithm belongs to. Instead of measuring something incredibly detailed like the number of instructions run or the amount of memory each algorithm produces. Big-O notation identifies on a broader scale with what's called [asymptotic approximations](https://en.wikipedia.org/wiki/Asymptotic_analysis). We can illustrate this concept with a story. Imagine if you were given the following choices:

* Receive $100 each day.
* Receive a penny on the first day, whose value doubles each day. This means you receive 1 cent on the first day, 2 cents on the second day, 4 cents on the third day, 8 cents on the 4th day, and so on.

Those looking for instant gratification may look to the $100 on the first day, but if we are patient and are looking to make the most amount of money, the penny is overall the best bet. Let's see how that looks on a graph.

[$100 vs Penny](https://www.desmos.com/calculator/kq8qpsmms7)

If you look on the graph, you can see the horizontal line across the screen that shows the $100 each day. The penny with its ability to double, skyrockets in value each day. By the 14th day, the penny is now making more than $100 each day. It makes the most sense (in terms of making money) to go with option 2.

How does this apply to algorithms? Oftentimes, we are actually hoping to reduce the complexity in terms of time and space. Let's invert the question. Say instead you received the amount of money each day, you actually are _losing_ that amount of money each day. To be clear, you have two choices:

* Lose $100 each day.
* Lose a penny on the first day, whose value doubles each day. This means you lose 1 cent on the first day, 2 cents on the second day, 4 cents on the third day, 8 cents on the 4th day, and so on.

Suddenly, the $100 seems really appealing. While the debt may be consistent, it certainly does not increase to a crippling form. We define algorithms into different classes in the same manner and choose the one that will minimize time and space (in most cases).

When evaluating the Big-O Notation, we look the inputs to the algorithm and how they can change in size. This is because the overall amount of time or memory an algorithm takes is correlated to the size of the input.

If you are interested in reading more about Big-O notation include its mathematical definition, we recommend checking out the [Wikipedia rticle](https://en.wikipedia.org/wiki/Big_O_notation).

### Exercise

Supposed I gave you the following choices:

* Lose $20 a day.
* Lose $1 the first day, $2 the second day, $3 the third day, and so on.
* Lose a penny on the first day, whose value doubles each day. This means you lose 1 cent on the first day, 2 cents on the second day, 4 cents on the third day, 8 cents on the 4th day, and so on.

Assuming we are minimizing the amount of money we'd like to lose (unless you are a big spender), which of the following choice would you make in the following scenarios.

* You lose money each day infinitely.
* You lose money for only 8 days.
* You lose money for 15 days.
* You lose money for 50 days.

Use the graph below to look at each choice.

[Money Big-O Exercise](https://www.desmos.com/calculator/o6qzvm6rvc)

## How do you evaluate the complexity of an algorithm?

Oftentimes we can look at an algorithm to identify the Big-O Notation, but it is not always the case. The best way to identify the complexity is to evaluate how often an line of code is executed. We'll look at a variety of examples.

### Example: Iterating over an array

In the following example we are attempting to solve the problem.

> Write a function that takes in an array of numbers and produces an array of numbers where each number is doubled the number in the original array.

Iterating over an array is straightforward, and we can come to the following solution:

```javascript
function double(arr) {
  const newArray = new Array(arr.length);   // Initialize the array to the same size

  for (let i = 0; i < arr.length; i++) {
    newArray[i] = arr[i] * 2;
  }

  return newArray;
}
```

The first line of code is important to ensure that the array is initialized to the same size (the overall storage of arrays will be covered when we discuss data structures).

Let's look at a few examples.

```
double([])                   // []
double([1])                  // [2]
double([1, 2, 3])            // [2, 4, 6]
double([1, 2, 3, 4, 5, 6])   // [2, 4, 6, 8, 10, 12]
```

Big-O notation requires understanding the input and how its size may change. In this case, the input is an array, and the length of the array changes. In this case, we evaluate the algorithm with how the length of the array changes.

To be detailed, we are going to evaluate the number of instructions each line accomplishes. We will use the variable _n_ to represent the size of the array.

```javascript
function double(arr) {
  const newArray = new Array(arr.length);   // n instructions

  for (let i = 0; i < arr.length; i++) {    // 2 instructions
    newArray[i] = arr[i] * 2;               // 1 instruction
  }

  return newArray;                          // 1 instruction
}
```

Let's break it down:

```javascript
const newArray = new Array(arr.length);
```

In this case we need to create memory for an array of the same size. Since there are _n_ items in the first array, there will be _n_ items in the second array.

```javascript
for (let i = 0; i < arr.length; i++) {
  // ...
}
```

The `for` loop runs 2 instructions each time, the first time, it initializes the variable, `i`, to 0. It also checks that `i` is less than the array length. On subsequent iterations, `i` is incremented, and the same check is handled, yielding 2 instructions on each loop.

```javascript
newArray[i] = arr[i] * 2;
```

Even though, this line is in the `for` loop, the cost of executing each line is one instruction.

Let's get fine grained write down a comparison of the size of the input to the number of times the instructions get executed.

| Size of Array | Number of instructions executed |
| ------------- | ------------------------------- |
| Description   | Array Intialization + loop initialization + items in array * instructions in loop + return statement           |
| 0             | 0 + 2 + 0 * 3 + 1 = 3           |
| 1             | 1 + 2 + 1 * 3 + 1 = 7           |
| 2             | 2 + 2 + 2 * 3 + 1 = 11          |
| 3             | 3 + 2 + 3 * 3 + 1 = 15          |
| 4             | 4 + 2 + 4 * 3 + 1 = 19          |
| 5             | 5 + 2 + 5 * 3 + 1 = 23          |
| 6             | 6 + 2 + 6 * 3 + 1 = 27          |
| n             | n + 2 + n * 3 + 1 = 4n + 3      |

[Visualize on a graph](https://www.desmos.com/calculator/jm6couknoj)

The above example produces a line on the graph, which means it is linear or [O(n) run time](https://en.wikipedia.org/wiki/Time_complexity#Linear_time). Overall that means given a input of size _n_, the runtime of the application will be linear in relationship to the input size. In Big-O notation, we ignore all constants and non-dominant parts. In this case even though the number of instructions executed is 4n+3, the 4 and the 3 are dropped as they are irrelevant overall.

**NOTE** We could use the array's built-in `map` method to implement `double` like so:

```javascript
function double(arr) {
  return arr.map((element) => element * 2);
}
```

The algorithm is still linear or O(n). This is because the `map` method is a linear operation on arrays. While loops do a good job of indicating the "linearity" of runtime, remember that built-in operations can affect them as well.

Let's take a look at this in practice. The following function takes in two arguments: a callback and an array. It returns the time it takes your computer to execute the code in the callback.

```javascript
function testPerformance(callback, arr) {
  var t0 = performance.now();
  callback(arr);
  var t1 = performance.now();
  return t1 - t0;
}
```

To test this using the Chrome developer tools add the above functions to the console, and then run the testPerformance function.

NOTE: `performance` is not available in Node, so if you are using Node use https://nodejs.org/api/process.html#process_process_hrtime

**Exercise** Create an array of length 1,000,000, where each entry is the number 2. Then test the performance of `double` on this array, using `testPerformance`.

Setting up the array and testing the performance on the new array in the console it will look like this:

![](http://i.imgur.com/7ToaDBR.png)

If you run `testPerformance` many times on the same arguments, you should see different outputs. The time it takes to run a certain block of code is highly variable not just across machines, but also for a given machine. Even so, it can be helpful to plot several data points and look for trends.

**Exercise** Repeat the previous exercise for arrays of 2 million, 3 million, and so on up to 10 million. Then record the times you get in [this table](https://www.desmos.com/calculator/i64rd3xdsv), and you'll wind up with a nice little graph of your data. What sort of trend do you see?

**Bonus** If you want to decrease the variability in the times output by your performance test, what could you do?

Below is another example. In terms of big-O, what do you think the runtime of this function is?

```javascript
function squareAndDouble(arr) {
  const tempArr = arr.map((el) => {
    return el * el;
  });

  return tempArr.map((el) => {
    return 2 * el;
  });
}
```

**EXERCISE** Make an educated guess about the runtime of this function. Then do some performance testing and graph your results. Do you stand by your guess?

![](http://images-cdn.9gag.com/photo/a9LGndm_700b_v1.jpg)

In the above example the runtime is O(n + n) or O(2 * n). The runtime is O(2 * n) because the first `arr.map` iterates over all n elements in the array, and the second `tempArr.map` also iterates over all n elements in the array.  However, the runtime is actually still O(n), because in big-O notation, constants are ignored.

### [O(1) / Constant Time](https://en.wikipedia.org/wiki/Time_complexity#Constant_time)

```javascript
// O(1)

function print50nums() {
  for (let i = 0; i < 50; i++) {
    console.log(i);
  }
}
```

The runtime of the above example is not bound by a variable sized input.  Instead it is bound by the constant 50.  The runtime of the program is O(50), but since constants do not matter in big-O notation, we simplify it to O(1).

```javascript
// O(1)

function print500000nums() {
  for (let i = 0; i < 500000; i++) {
    console.log(i);
  }
}
```
The example above is still O(1) because 500,000 is still a constant number of iterations.

**EXERCISE** Do some performance tests and graph the results. What is the complexity?

```javascript
function addSomeNumbers(arr) {
  sum = 0;

  for (let i=0; i < Math.min(arr.length, 1e7); i++) {
    sum += arr[i];
  }

  return sum;
}
```

This is O(1) because all operations in the program do not depend on input size. No matter how large the array, there's an upper bound on the number of operations that the function will perform.

### O(n^2) / Quadratic time

**EXERCISE** Again, do some performance tests and graph the results. What is the complexity?

```javascript
// Sums the values of each index to the end.
// Example:
//   sumValues [] -> []
//   sumValues [1, 2] -> [3, 2]
//   sumValues [1, 2, 3] -> [6, 5, 3]
function sumValues(arr) {
  let i = 0;
  let newArr = new Array(arr.length);

  while (i < arr.length) {
    let sum = 0;
    let j = i;

    while (j < arr.length) {
      sum += arr[j];
      j += 1;
    }

    newArr[i] = sum;
    i += 1;
  }

  return newArr;
}
```

![](http://images.contentful.com/7h71s48744nc/3naPsJv6IE0KewGmqUOMUu/a00a2a2cbe0c580cfce1b502c1ebdc9f/a-beautiful-mind.jpg)

This is O(n*n + n).  The first n*n (n^2) comes from the while loop that iterates over all of the elements in the array and has another while loop inside that also iterates over all elements in the array.  The second n comes from the initialization of the new array.  The expression can also be simplified further.  Any time there is addition in the big O notation, the worst case runtime is kept. All other values are dropped. In this case, the runtime would just be O(n^2).

**RULE: When big-O values are added, keep the worst case runtime, and drop all other additional values.**

## More Exercises

Visit the [Big-O Notation Practice Repo here](https://github.com/gSchool/big-o-practice)

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
- [Khan Academy's Asymptotic Notation unit](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation)
