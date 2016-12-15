# Intro to Algorithms

## Objectives

* Explain what is an algorithm
* Explain why algorithms are useful
* Write an algorithm for an everyday actions
* Explain how algorithms are measured

## What is an Algorithm?

An [algorithm](https://en.wikipedia.org/wiki/Algorithm) is a well defined, step by step computational procedure for solving a problem.

Algorithms:

* have a goal (ie they are [deterministic](https://en.wikipedia.org/wiki/Deterministic_system)),
* terminate at some point in time,
* take an input, and
* produce output.

## Why are algorithms useful?

Algorithms are the directions that we design to tell a computer to solve a problem, modeling each step needed to reach the end goal.

Let's think about the idea of an "algorithm". Say you have a problem that you need to solve in your every day life, like telling a friend how to take a taxi from the airport to your house.

Taxi Algorithm:

1. Go to the taxi stand at airport
1. Get in a taxi
1. Give the driver the address
1. Driver drives to destination
1. Leave taxi

In this algorithm, we can identify the definition of an algorithm:

* The goal is to get to our address. We will achieve that goal once we arrive at the address.
* The algorithm will "terminate" once we are at our goal, that is, arriving at our destination and leaving the taxi.
* The inputs are the driver, the car, and you.
* The outputs are changing your location from the airport to your destination.

### Exercise: Write an algorithm for everyday actions.

In everyday programming, we're often putting together simple algorithms to perform simple tasks. Consider the following:

- Searching for the definition of a word in the dictionary.
- Finding out if a number is a prime number (a number is prime if its factor are only 1 and itself. e.g. 2, 3, 5, 7, 11, ...)
- Determining if there is a winner in a game of Tic Tac Toe

For as many of the problems as you can, ***instead of writing code***, try to describe how to solve these in plain english. Use step-by-step instructions to describe, and make yourself a visualization of the problem that you can test your step by step instructions on.

Now, for each set of instructions, find out the following:
- Identify the input and output of your problem
- Identify any constraints of your input (what assumptions can be made? for example, we can assume the dictionary of words are ordered alphabetically)
- Identify the steps to the problem.

### Exercise: Choose your own adventure.

Pick a simple action from your daily life and write an algorithm for it. Need an idea? Make a Peanut Butter and Jelly Sandwich.

## How algorithms are measured?

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

## Fun fact

There are an infinite number of algorithms in the world, but it has been proven that not every problem can be solved with a computer algorithm.
