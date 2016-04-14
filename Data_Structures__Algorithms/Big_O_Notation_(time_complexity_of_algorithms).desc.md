# Big O

#### What You Should Get Out of This

* Be able to talk about Big O in interviews
* Understand there are classes of Big O and identify them

#### What is it?

"Big O" notation is a way of describing how long an algorithm will take to run **relative to its input**.

Vocab you should know:

- Time complexity
- Aymptotic Complexity 
    - The term asymptotic means approaching a value or curve arbitrarily closely (i.e., as some sort of limit is taken) - http://mathworld.wolfram.com/Asymptotic.html

Big O (`O()`) is a mathematical notation to describe the worst case complexity of a function.

If I'm running an algorithm over `n` items. How long will it take? How much space in memory will it consume?

**Examples:**

* `O(100)`
* `O(n+1)`
* `O(n^2+n)`
* `O(20*logn)`

Let's run some numbers.

### Common Big O Levels

# <img height=400 src="http://bigocheatsheet.com/img/big-o-complexity.png">

* Why don't we care about things like
  * `O(n+1)`
  * `O(n^2 + n)`?

### Data Structure Algorithms and Big O

* `O(1)`, `O(logn)`, `O(n)`
  * Access time for most data structures
* `O(logn)`, `O(n)`
  * Search time for most data structures
* `O(n)`
  * Space for most data structures
* `O(n logn)`, `O(n^2)`
  * Time of most sort algorithms

*[Big O Cheatsheet](http://bigocheatsheet.com/)*

# <img height=400 src="http://bigocheatsheet.com/img/big-o-complexity.png">

* Where does each data structure algorithm type live on this graph? [graph](https://www.desmos.com/calculator/qb1bhagbpa)
* Let's run some numbers again by assuming we are accessing, searching, or sorting

## Review

* Be able to talk about Big O in interviews
* Understand there are classes of Big O and identify them

Resources:

- https://github.com/gSchool/computer-science-curriculum/blob/master/Unit-2/02-big-o-notation.md
- http://bigocheatsheet.com/
- http://web.engr.illinois.edu/~jeffe/teaching/algorithms/

# [Big O Exercise](https://github.com/gSchool/computer-science-curriculum/blob/master/Unit-1/02-big-o-notation.md)