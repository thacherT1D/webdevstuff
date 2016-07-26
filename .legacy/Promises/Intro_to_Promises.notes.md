#Resource

[Slides](https://docs.google.com/presentation/d/1ehfrCZ9hpc601dkfXUz7TzrDpSOn_VHuKflOumTasVI/edit?usp=sharing)

## Guiding Questions

* What are 3 ways to handle async behavior? What are the advantages and disadvantages of each?
    * Callback
        * Simple to understand
        * Rightward drift
        * Multiple requests simultaneous
    * Deferred
        * Built into jQuery
    * Promise
        * Better for chaining
    * (Calling things in the global scope)
    * (Generators)
* What is "callback hell"?
* What are the methods of promises?
    * .then
    * .catch
* How do you run multiple async requests at the same time?
    * Promise.all
* How do you "promisify" a function?
* Write a promise
* Chain two promises together
* Make a promise reject

## Push Questions

* How do you retry a promise that you rejected?
* How do you retain state from promise to promise?
* What is the second argument to .then?
* What happens if you catch a value and want to keep going?
* Can you chain catches? Thens?

## Exercises

* Doing an AJAX call with a promise chain
* Doing chained AJAX calls with promise chains
* Doing a file reads with a promise chain
* Using settimeout with a promise chain
* Promisifying something synchronous so you can add it to a chain

### I do

Promisify jQuery Ajax calls
Create new Promise

### We Do

Add new created promise to ajax calls

### They Do

Github repo
https://github.com/gSchool/promise-exercise