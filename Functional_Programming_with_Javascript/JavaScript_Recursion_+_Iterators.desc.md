#Recursion

####re·cur·sive -riˈkərsiv
adjective
*See definition of recursive*

[CMU Recursion Slides](http://www.cs.cmu.edu/~15110-f12/Unit05PtA-handout.pdf)

### ALWAYS remember... TRUST THE RECURSION!

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
        result *= n
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

* Define a function that takes an argument n and returns the lyrics to 99 bottles of beer on the wall, starting with that number `n`.  For example, `singSong(99)` would print out the lyrics to 99 Bottles of Beer on the Wall.

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


# Functional Programming in JavaScript

> Start here - [Higher-order functions](https://www.youtube.com/watch?v=BMUiFMZr7vk)

## Abstraction

Which is easier to read?

> Put 1 cup of dried peas per person into a container. Add water until the peas are well covered. Leave the peas in water for at least 12 hours. Take the peas out of the water and put them in a cooking pan. Add 4 cups of water per person. Cover the pan and keep the peas simmering for two hours. Take half an onion per person. Cut it into pieces with a knife. Add it to the peas. Take a stalk of celery per person. Cut it into pieces with a knife. Add it to the peas. Take a carrot per person. Cut it into pieces. With a knife! Add it to the peas. Cook for 10 more minutes.

vs.

> Per person: 1 cup dried split peas, half a chopped onion, a stalk of celery, and a carrot.
>
> Soak peas for 12 hours. Simmer for 2 hours in 4 cups of water (per person). Chop and add vegetables. Cook for 10 more minutes.


**It has to become second nature, for a programmer, to notice when a concept is begging to be abstracted into a new word.**

## Functional vs Procedural Approaches

Functional programming manipulates values, while procedural executes commands.

### Example

```javascript
// *** procedural approach *** //
var numbers = [1, 2, 3, 4, 5];
for (var i = 0; i < numbers.length; i++) {
  numbers[i] = numbers[i] * 10;
}
console.log('Procedural', numbers.join(', '));

// *** functional approach *** //
var numbers = [1, 2, 3, 4, 5];
var numberTimesTen = function(numArray) {
  var outputNumbers = [];
  for (var i = 0; i < numArray.length; i++) {
    outputNumbers.push(numArray[i] * 10);
  }
  return outputNumbers;
};
console.log('Functional', numberTimesTen(numbers).join(', '));
```

## Array Traversal

We've been doing a lot of array traversal, and so far it's looked something like this:

```javascript
var array = [1, 2, 3];

for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
}
```

Apart from being a bit of an eyesore, this provides a lot of space for potential mistakes.

So we could start by abstracting this code into a new function called `printEach`

```javascript
function printEach(array) {
  for (var i = 0; i < array.length; i++)
    console.log(array[i]);
}
```

So now we have a function that will loop through the array and `console.log()` each element. This works, but it's not extremely useful. It would be better if we could traverse an array and do something with each element - e.g., alert it, double it, uppercase it, etc.

This concept of doing something to every element in an array is a really fundamental idea that we can abstract out into a more general `each` function:

```javascript
function each(array, callback) {
  for (var i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}
```

Now, let's use our each function to do something to all the elements in an array:

```javascript
var names = ["Rusty", "Momo", "Wyatt"]

//to alert each name
each(names, alert)

```
**Question:** Why don't we add the parentheses after `alert` or `console.log`?

## Anonymous Functions

We don't always have to pass a predefined function to our `each()` function. Instead, We can use an anonymous function as an argument as well:

```javascript
var numbers = [3, 7, 22, 39];

each(numbers, function(num){
  console.log(num * 100)
});
```

**Question** Why would we do this?

### The Real ForEach

It turns out that JS now comes with a built in `forEach()` function. Here's how we use it to sum the items in an array:

```javascript
var total = 0;
var numbers = [2,5,3,4];

numbers.forEach(function(num){
  total += num;
});

console.log(total)

```

**Exercise** Use `forEach` to find the minimum value in an array

## Higher Order Functions

Higher Order Functions are functions that either

- take other function(s) as arguments
- return other function(s)

`forEach` is an example of a higher order function.

Here's another example of a higher order function: 

```javascript
function greaterThan(n) {
  return function(m) { return m > n; };
}
var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
```

### Map

Goal: Given an array of numbers, return an array where each number is multiplied by two.

```javascript
var numbers = [2, 12, 3, 17, 233, 21];

// Traditional For Loop

var doubleNumbers = []

for (var i = 0; i < numbers.length; i++) {
  doubleNumbers.push(numbers[i] * 2);
};
console.log(doubleNumbers)

// Map callback function

var doubleDown = function(number, index){
 // index is an optional argument
 // console.log('Index : ', index)
 return number * 2
}

console.log(doubleDown(4));
var doubleNumbers = numbers.map(doubleDown);
```

### Filter

Goal: Given an array of objects, where each object cantains a car make and whether or not it is made in the United States, return an array of objects containing only cars manufactured in the United States.

```javascript
var cars = [
 {
   make: 'Ford',
   madeInUnitedStates: true
 },
 {
   make: 'GM',
   madeInUnitedStates: true
 },
 {
   make: 'Honda',
   madeInUnitedStates: false
 }
]

// Traditional For Loop

var domesticCars = []

for (var i = 0; i < cars.length; i++) {
 if (cars[i].madeInUnitedStates){
   domesticCars.push(cars[i])
 }
};

// Filter callback function

var domesticManufacturer = function(car) {
  return car.madeInUnitedStates
}

var domesiticCars = cars.filter(domesticManufacturer);
```

Since `map` and `filter` both return arrays, they can be chained together to combine functionality. Building on our previous example:

```javascript
var singleCar = function(car){
  return car.make
}

console.log(cars.filter(domesticManufacturer).map(singleCar)[0]) // Ford
```

### Reduce

Reduce is the most confusing of the iterators we'll consider here, but it's also the post powerful. Reduce takes 2 arguments (optional additional) in its callback:

1. Running Total of the reduction
2. Current element in the array

It also takes an argument after the callback, which indicates what the running total should start from.

```javascript
var allNumbers = [2, 12, 3, 17, 233, 21];

// add the numbers to the running total
var total = function(runningTotal, currentNumber) {
 return runningTotal + currentNumber
}

// remove numbers less than 10
var removeLessThanTen = function(number) {
  return number > 10
}

console.log('Filter: ', allNumbers.filter(removeLessThanTen))
console.log(allNumbers.filter(removeLessThanTen).reduce(total, 0));
```

Note that reduce can return any data type, even an object! Check out this example:

```javascripts
var string = "awesomesauce";

// Let's use reduce to return an object of character counts
var obj = string.split("").reduce(function(prev,cur) {
  prev[cur] = ++prev[cur] || 1;
  return prev
},{});

obj // {a: 2, c: 1, e: 3, m: 1, o: 1, s: 2, u: 1, w: 1}
```

### When To Use forEach, map, filter, or reduce?

One of the first questions you'll be asking yourself a lot when you first learn about these iterators is when you should be using each one. Here are some helpful guiding principles:

If you're trying to transform each element in an array, and want to obtain an array of the same length, **use map**.

If you're trying to get a sub-array of the original array, **use filter**.

If you want to execute some code for each element in an array (say, run a test or render some HTML), but don't care about any return values, **use forEach**.

If you want to do something more sophisticated, think about chaining iterators or **using reduce**.

### Bonus iterators!

There are a couple of other iterators that we haven't considered here, but that you may find useful. For future reference, here are some links:

[every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

[some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

Tonight's assignment:

https://github.com/gSchool/js-hof-filter-map-reduce

Bonus assignment:

https://github.com/gSchool-staging/movie-iterator-lab