# Recursion

Please skim through this entire document first. Specific instructions for what to do (and in which order) appear further down.

## Setting the stage

- Clear the stage (close all other terminal tabs, chrome tabs, email etc...).
- Internalize the what and why section (Rationale).
- The goal here is learning to learn, so it is all about the process. There is no rush. Take risks and have fun! Do not be afraid to make mistakes and try new things.
- When you have a hypothesis, come up with a coding experiment that valides or invalidates your theory. If it is sufficiently interesting please keep a copy of it to share with classmates as an exercise.

### Rationale (What and Why)

[Recursion](https://en.wikipedia.org/wiki/Recursion) is a powerful technique in programming. In particular, recursion, on a high level, is the successive solving of sub problems until a known, or _base_, case has been reached.

Having a strong grasp of [recursion](http://atmarksharp.com/post_images/recursionImage.jpeg) will also strengthen your understanding of iteration and allow for exploring structures that are trees (like the DOM) for example.

Usage aside, recursive functions are considered elegant by some programmers, that is, a recursive function just has a certain appeal to it.

### Key terms:

- Recursion
- Base case

## Activities

A pure function is a function which has no side effects. Quick check for understanding; does a `console.log` statement result in a side effect? It does! In fact, `console.log` causes its inputs to be displayed on the screen which is a side effect of its execution. Another example is a function that, when invoked, causes data to be persisted to a database or sent to a third party, etc.

Often times functional programmers (as opposed to object oriented programmers) prefer recursion which is stateless to iteration that uses state. The accepted answer on this [stackoverflow post](http://programmers.stackexchange.com/questions/149167/are-functional-languages-better-at-recursion) is great for understanding this.

A classic example of recursion is used for computing the [factorial](https://en.wikipedia.org/wiki/Factorial) of a non-negative [integer](https://en.wikipedia.org/wiki/Integer). The factorial, in mathematics, takes the form of `n! = n*(n-1)*(n-2)...*1` where `n >= 0` and `n` is an integer. In the case of the factorial the base case is a known mathematical identity which states that `0! = 1`.

Another way to think about the base case is that when the function we write to compute the factorial is written, it should return `1` when given `0`. What is the easiest way to write a function that returns `1` when given `0`? Try writing a function named `factorial` with this behavior before reading on.

The solution for the simplest `factorial` function that returns `1` when given `0` looks like:

  ```javascript
  function factorial(n) {
    if (n == 0) return 1;
  }
  ```

Starting with an example of `n = 5` we know from earlier that `n! = 5! = 5 * 4 * 3 * 2 * 1 = 5 * 4! = n * ((n-1)!)`, but really another way to think about this is that `5! = 5 * 4!`. Another way to think about `4!` is that `4! = 4 * 3!`. What is `3!`? `3*2!` and the chain continues on and on. Take 3-5 minutes and try to inject that level of functionality into the method. Start with `n = 1`, then try `n = 2` to better understand what is going on.

Hopefully you came to roughly this solution:

  ```javascript
  function factorial(n) {
    if (n == 0) return 1;

    return n * factorial(n-1);
  }
  ```

In the code sample above, you can see a basic outline for the pattern of recursion. The base case is handled by a condition checking that `n == 0` in which case the rest of the code should not be executed. This is similar to a precondition or guard clause, that is, if the base case is hit, there is no need to continue, instead `return` the appropriate value. The next important piece is the _recursive step_, this is where all of the action happens. In this case, we saw above that more generally, `n! = n * (n-1)!`, the code here mimics that.

Realistically, computing the factorial for large `n` with a loop would be significantly more performant, so this is mostly an exercise in understanding what recursion is. Certain languages, when a recursive function is written a certain way known as [tail call](https://en.wikipedia.org/wiki/Tail_call), optimize recursive functions to have the same performance as a loop would. If you are looking for a challenge or are just generally interested, use a JavaScript benchmarking library like [benchmark.js](http://benchmarkjs.com/) to explore the performance differences between the iterative approach and the recursive approach as `n` gets large. Why do you think such a performance difference exists?

As mentioned earlier, recursion is often used as a mechanism for iteration. Consider the task of writing a function `all` which returns `true` if every element of the provided `array` argument meets the `condition` provided as an argument which is a function.

The iterative approach might look like:

  ```javascript
  function all(array, condition) {
    var result = true;

    for (var i = 0; i < array.length; i++) {
      if (!condition(array[i])) {
        result = false;
        break;
      }
    }

    return result;
  }
  ```

Spend 5-10 minutes trying to figure out what the recursive solution for this problem looks like. Definitely use Pólya's method when approaching this problem. What is the base case?

Here is a solution:

  ```javascript
  function all(array, condition) {
    if (array.length == 0) return true;

    return condition(array[0]) && all(array.slice(1), condition);
  }
  ```

Of importance to note in this solution is that `all` never modifies the argument `array`. Instead, it uses `slice` to create a copy.

Finally, review the [CMU Recursion Slides](http://www.cs.cmu.edu/~15110-f12/Unit05PtA-handout.pdf) and [Sparknotes on Recursion](http://www.sparknotes.com/cs/recursion/whatisrecursion/section1.rhtml).

### First Exercise

[Recursion in JS](https://github.com/gSchool/recursion-js) with trees.