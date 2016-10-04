# Asymptotic Notation

This is a brief intro to computational complexity and asymptotic notation. It may not cover some items in depth enough, in which case please refer to the resource materials below.

We previously discussed asymptotic notation in terms of Big O in the [Galvanize CS Curriculum](https://github.com/gSchool/computer-science-curriculum/blob/master/Unit-2/02-big-o-notation.md).

## Objectives

- Understand what computational complexity is.
- Understand why asymptotic notation is used to describe computational complexity.
- Be able to find the Big O for a given algorithm.

## Computational Complexity

As a programmer, it is important to not only write code which solves a given problem but also which solves it in an efficient manner. Generally, efficiency is concerned with the **computational complexity** of a program.

<table>
<tr>
<th>Complexity</th><th>Description</th>
</tr>
<tr>
<td>Time Complexity</td><td>Describes the number of operations it takes to run an algorithm for `n` inputs.</td>
</tr>
<tr>
<td>Space Complexity</td><td>Describes the amount memory it takes to run an algorithm for `n` inputs.</td>
</tr>
</table>

Why don't we just measure how many seconds it takes to run an algorithm, or how many bytes of memory are used?

Simply put, it takes different computers different amounts of time to run an algorithm. A computer from the 90's, a personal computer and a super computer will all take varying amounts of time to run the same algorithm. Other factors such as what language or compiler was used will change the amount of time or memory involved. In the end, *the actual amount of time/memory it takes to run an algorithm is arbitrary.*

We use asymptotic notation, instead of run times, to measure the complexity of an algorithm because the number of operations it will take to run an algorithm is constant. No matter what language, compiler or computer is utilized, it will always take the same amount of operations.

## Asymptotic Notations

**Asymptotic notation** is used to describe the computational complexity of an algorithm for `n` number of inputs.

There are four notations generally used to describe the complexity of an algorithm, we will briefly discuss three of them.

<table>
<tr><th>Notation</th><th>Description</th></tr>
<tr><td>Big Θ (Theta)</td><td>Describes the tight bound, that is the intersection of Big O and Big Ω.</td></tr>
<tr><td>Big O</td><td>Describes the upper bound, that is the **worst case**.</td></tr>
<tr><td>Big Ω (Omega)</td><td>Describes the lower bound, that is the **best case**.</td></tr>
</table>

**Big O** describes the upper bound or **worst case** it takes to run an algorithm, that is to say the most operations it takes for an algorithm to complete.

```
The complexity grows at most this much, but it could grow more slowly.
```

**Big Ω** which describes the lower bound or **best case** it takes to run an algorithm, that is to say the least amount of operations for an algorithm to complete.

```
The complexity grows at least this much, but it could grow more quickly.
```

**Big Θ** describes the tight bound, that is both the lower and upper bounds (worst and best cases.)

```
Once n grows large enough, the complexity grows at most this much and at least this much.
```

## Common Complexities

Commonly used terminology for the complexity of algorithms from the book *Discrete Mathematics and Its Applications*:

<table>
<tr>
<th>Complexity</th><th>Terminology</th>
</tr>
<tr>
<td>O(1)</td><td>Constant complexity</td>
</tr>
<tr>
<td>O(log n)</td><td>Logarithmic complexity</td>
</tr>
<tr>
<td>O(n)</td><td>Linear complexity</td>
</tr>
<tr>
<td>O(n log n)</td><td>n log n complexity</td>
</tr>
<tr>
<td>O(nᵇ)</td><td>Polynomial complexity</td>
</tr>
<tr>
<td>O(bⁿ) where b > 1</td><td>Exponential complexity</td>
</tr>
<tr>
<td>O(n!)</td><td>Factorial complexity</td>
</tr>
</table>

It may help to visualize these growth rates, [here they are charted.](https://cathyatseneca.gitbooks.io/data-structures-and-algorithms/content/analysis/growth.html)

## Calculating Big O

1. Identify the number of operations.
1. Remove everything except the highest term.
1. Remove constants.

### Example One

Calculate `O` for the following:

```java
for (int i = 0; i < myArray.length; i++) {
    for (int j = 0; j < myArray.length; j++) {
        myArray[i][j] += 1;
    }
}
```

Step One: Identify the number of operations.

```java
// n is the amount of inputs for a given function, in this case `myArray.length`.
// every operation within this loop will occur n amount of times.
for (int i = 0; i < myArray.length; i++) {
    // every operation within this loop will occur n amount of times.
    for (int j = 0; j < myArray.length; j++) {
        // operation
        myArray[i][j] += 1;
    }
}
```

- Outer loop = `O(n)` operations.
  - Inner loop = `O(n)` operations.

The inner loop happens outer loop amount of times because it is inside the outer loop, so we need to multiply:

```
O(n) * O(n) = O(n²)
```

Step Two: Remove everything except the highest term.

```
 O(n²)
```

`n² is the only term. We do not need to remove anything;

```
 O(n²)
```

Step Three: Remove constants.

We don't have any constants so we have found our result!

 ```
 O(n²)
 ```

### Example Two

Calculate Big O for the following:

```javascript
for(var i = 0; i < someArray.length; i++){
  for(var j = 0; j < someArray.length; j++){
    result += j;
  }
}

for(var k = 0; k < someArray.length; k++){
  result += k;
}

for(var l = 0; l < someArray.length; l++){
  result += l;
}

for(var m = 0; m < someArray.length; m++){
  result += m;
}

for(var o = 0; o < someArray.length; o++){
  for(var p = 0; p < someArray.length; p++){
    result += p;
  }
}
```

Step One: Identify the number of operations.

```javascript
// n is the amount of inputs for a given function, in this case `someArray.length`.
// every operation within this loop will occur n amount of times.
for(var i = 0; i < someArray.length; i++){
  // every operation within this loop will occur n amount of times.
  for(var j = 0; j < someArray.length; j++){
    result += j;
  }
}
// every operation within this loop will occur n amount of times.
for(var k = 0; k < someArray.length; k++){
  result += k;
}
// every operation within this loop will occur n amount of times.
for(var l = 0; l < someArray.length; l++){
  result += l;
}
// every operation within this loop will occur n amount of times.
for(var m = 0; m < someArray.length; m++){
  result += m;
}
// every operation within this loop will occur n amount of times.
for(var o = 0; o < someArray.length; o++){
  // every operation within this loop will occur n amount of times.
  for(var p = 0; p < someArray.length; p++){
    result += p;
  }
}
```

- i loop = `O(n)` operations.
  - k loop = `O(n)` operations.
- k loop = `O(n)` operations.
- l loop = `O(n)` operations.
- m loop = `O(n)` operations.
- o loop = `O(n)` operations.
  - p loop = `O(n)` operations.

We multiply loops inside of other loops, because they must take place outer loop amount of times.

We add loops that are next to each other, because they don't influence each other's number of operations.

```
O(n) * O(n) + O(n) + O(n) + O(n) + O(n) * O(n)

Lets make it more readable:

O( n * n + n * n + n + n + n)

Add:

O( n * n + n * n + 3n)


Multiply:

O(n² + n² + 3n)

Add:

O(2n² + 3n)
```

**Step Two:** Remove everything except the highest term.

We now have:

```
O(2n² + 3n)
```

Lets find our highest term, and remove the rest:

```
2n² > 3n
```

So we have:

```
O(2n²)
```

**Step Three:** Remove constants.

```
O(2n²)
```

2 is a constants, let's rip it out and get our final result:

```
O(n²)
```

## Exercises

Complete the following exercises, show your work.

### Exercise One

Calculate Big O for the following:

```javascript
function f(n){
    if(n <= 1){
        return n;
    }

    return f(n - 1) + f(n - 2);
}
```

### Exercise Two

Calculate Big O for the following:

```java
public static void sort(int[] num) {
 int j;
 int key;
 int i;

 for (j = 1; j < num.length; j++) {
  key = num[j];
  for (i = j - 1;
   (i >= 0) && (num[i] < key); i--) {
   num[i + 1] = num[i];
  }
  num[i + 1] = key;
 }
}
```

### Exercise Three

Calculate Big O for the following:

```javascript
function f(n){

    if(n === 0){
        return 1;
    }

    return n * f(n - 1);
}
```

### Exercise 4

1. Write a function to solve the following problem.
1. Calculate the Big O for your function.

```
List all the permutations for a given array.

Example: All permutations for the array [1, 2, 3]:

[
[1, 2, 3],
[1, 3, 2],
[2, 1, 3],
[2, 3, 1],
[3, 1, 2],
[3, 2, 1]
]
```

## Resources

- [Galvanize CS Curriculum: Big O](https://github.com/gSchool/computer-science-curriculum/blob/master/Unit-2/02-big-o-notation.md)
- [Khan Academy: Asymptotic Notation](https://www.khanacademy.org/computing/computer-science/algorithms/asymptotic-notation/a/asymptotic-notation)
- [Wikipedia: Big O Notation](https://en.wikipedia.org/wiki/Big_O_notation)
- [Interview Cake: Big O Notation](https://www.interviewcake.com/article/java/big-o-notation-time-and-space-complexity)
- [Calculating Big O](https://justin.abrah.ms/computer-science/how-to-calculate-big-o.html)
- [Data Structures and Algorithms: Big-O, Little-O, Theta, Omega](https://cathyatseneca.gitbooks.io/data-structures-and-algorithms/content/analysis/notations.html)
- [Stack Overflow: What exactly does big Θ notation represent](http://stackoverflow.com/questions/10376740/what-exactly-does-big-%D3%A8-notation-represent)
- [Stack Exchange: Is this a Proper “Rule” for Identifying the “Big O” Notation of an Algorithm?](http://programmers.stackexchange.com/questions/194433/is-this-a-proper-rule-for-identifying-the-big-o-notation-of-an-algorithm)
- [Big O Cheat Sheet](http://bigocheatsheet.com/)
