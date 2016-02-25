#Recursion!

#### re·cur·sive -riˈkərsiv
adjective
*See definition of recursive*

### Recursion is HARD

This is a challenging topic to wrap your head around, it's very likely that you'll leave this lecture completely confused. That's OK, we introduce recursion early because it'll come up here and there throughout the course, and it's important for interviewing. By introducing it early, we give you more opportunities to think about it and use it.

This is going to be one of the hardest topics we've covered yet, so focus on playing and don't worry if it doesn't click.

[CMU Recursion Slides](http://www.cs.cmu.edu/~15110-f12/Unit05PtA-handout.pdf)

### Designing a recursive solution

All we need are:

1. A base case(s)
2. Recursive step

For recursion we need both a base case and a recursive step.  The recursive step ensures that we progress.  The base case ensures that our recursion eventually exits.  Also we usually want to pass some data/information around, we do this with function returns. 

### The Quick start to Recursion

1. Pretend you are at the solution
	* This can be a node you are searching for
	* The end of a recursive data structure (i.e. leaves)
	* etc.
2. How do you know you found the solution (what's your base case)
3. Now that you have you answer, how do you get this answer back to the top
4. Since you have solved the problem, assuming you are at the solution... 
5. How do you get to the solution
	* Easier to think one step at a time
	* How do I go one step further
	* If you know how to get from one step to the next, and know when to stop...
6. $$$

[Sparknotes on Recursion](http://www.sparknotes.com/cs/recursion/whatisrecursion/section1.rhtml)


**Factorial Iterative**

```
function factorialIterative(n) {
  var result = n;
  while(n > 1) {
    n -= 1;
    result *= n;
  }
  return result;
}
```

**Factorial Recursive**

```
function factorialRecursive(n){
  if(n === 0){
    return 1;
  }
  return(n * factorialRecursive(n-1))
}
```

###Recursive Problem Set

Attempt to write an iterative AND recursive solution to each problem:

* Define a function `countdown` that takes a number, and counts down from that number, logging each value between that and 0.

* Define a function `sumOfRange` that takes a number x and returns the sum of all digits between 0 and x.

* Define a function called  `power` which take two arguments: a number and an exponent to raise that number to.  For example:

```
console.log(power(2, 3));
//=> 8

console.log(power(4, 2));
//=> 16
```

* Define a function `fib` that takes an argument n and returns the fibonacci value of that position. The fibonacci sequence is  1, 1, 2, 3, 5, 8, 13, 21... So fib(5) should return 5 and fib(6) should return 8.

* Define a recursive function that returns true if a string is a palindrome and false otherwise.

#### Questions to think about?

* Why is recursion a useful technique for solving a big problem?
* What are the limitations of using recursive solutions?
* What types of problems are more suited for simple loops than recursion?
* What is meant by "recursive depth?"
* What is a "stack overflow" (the concept, not the website)?
* Why is that relevant to a recursive problem?


https://github.com/gSchool/js-hof-filter-map-reduce
