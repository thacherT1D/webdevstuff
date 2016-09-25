# Intro to Data Structures

A [data structure](https://en.wikipedia.org/wiki/Data_structure) is a way to store and organize data in a computer, so that it can be used efficiently. The key word here is "efficiently". At the end of the day, we are only interested in data structures that are efficient (we will discuss how we measure efficiency later).

## Objectives

* Learn the concepts behind data structures and algorithms
* Understand how to implement a particular data structure (or algorithm) in the language of your choice
* Understand more about how computers work and what goes on behind the scenes, especially with memory

> Get excited as this is a really cool part of computer science!

With the definition and objectives out of the way, let's think about a data structure we have used since the beginning of our coding journey -  an array? An array is a very simple data structure, but what does it do well? What does it not do well? Start [here](http://stackoverflow.com/questions/8423493/what-is-the-performance-of-objects-arrays-in-javascript-specifically-for-googl).

## How should you decide which DS to use?

Some questions you have to ask and decisions you have to make are:

- What needs to be stored?
- What are the cost of operations?
- What is the potential memory usage?
- What is the ease of implementation (not always the best question...)?

## Common data structures
* Arrays
* Linked Lists
  * Singly Linked List
  * Doubly Linked List
* Stacks
* Queues
* Trees
* Graphs

Once again, the most important takeaway you can get from these lessons is an understanding of just __what__ these data structures are. This is called [Abstract Data Type](https://en.wikipedia.org/wiki/Abstract_data_type) (ADT). When learning about a data structure, the more important thing to remember is that you want to strive to gain an understanding of just __WHAT__ it is before you even think about how to implement one.

The following lessons on data structures will focus mostly on the definition, application and value. The implementation will be left up to you!

## Bonus: When to use what data structure

#### Flow Chart

![](http://i.stack.imgur.com/HNMy4.png)

# Stacks and Queues

Stacks and Queues are specializations of lists. That is, they are lists with a __restricted API__. The restrictions are on the *order in which elements can enter and exit* the list. Enforcing this ordering gives programmers the ability to __make assumptions__ about the data they are processing, which can be very powerful.

## Objectives

* Define a __stack__
  * Define __LIFO__
  * Define __push__
  * Define __pop__
  * Understand why it's true that you've already implemented a stack if you've completed the Linked Lists exercises.
  * Use a stack to solve the __matching parenthesis__ problem.
* Define a __queue__
  * Define __FIFO__
  * Define __enqueue__
  * Define __dequeue__
  * Implement a __queue__

## Stacks

[Stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type). A stack is a data-structure which follows the LIFO (last-in-first-out) pattern for access. When both insertion and removal are __restricted__ to __always happen__ from the __same end__ of a linked list, we call this a LIFO  structure.

![http://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/2000px-Data_stack.svg.png](http://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/2000px-Data_stack.svg.png)

You can think of a stack simply as some items stacked on top of each other just like these cups!

![http://files.mom.me/photos/2012/05/22/6-3681-stacked_cups-1337654706.jpg](http://files.mom.me/photos/2012/05/22/6-3681-stacked_cups-1337654706.jpg)

Another way to think about it: a Linked List which can only __insert__ using `push` and can only __remove__ using `pop` is a stack.

### Examples

Where do we see stacks in the real world?

- How about the [call stack](http://en.wikipedia.org/wiki/Call_stack)?
- The 'undo' command in a text editor can be modeled with a stack.
- We use stacks to help in the implementation of more complex data structures and algorithms
- A stack is an extremely useful and efficient data structure for solving algorithms like figuring out a palindrome.
- Typical application areas include compilers, operating systems, handling of program memory (nested function calls)

## Queues

[Queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type) - A Queue is a data structure where insertion __must happen__ from one end of the list and removal must happen from the other end. We call this a FIFO (first-in-first-out) structure.

This is the opposite order from a __stack__.

![http://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/2000px-Data_Queue.svg.png](http://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/2000px-Data_Queue.svg.png)

Queue operations - (all [O(1) / Constant Time](https://en.wikipedia.org/wiki/Time_complexity#Constant_time)):
- insertion: __enqueue__
- deletion: __dequeue__
- front/peek: find the head element (just return the element at front)
- isEmpty: check if empty
- IsFull: if there is a limited size

If you use __push__ as __enqueue__ then __dequeue__ must use __shift__. If you use __unshift__ as __enqueue__ then you must use __pop__ as __dequeue__. It doesn't matter which you choose, so long as __enqueue__ and __dequeue__ always operate on __opposite ends__ of the Linked List.

Enqueue To | Enqueue Method | Dequeue From | Dequeue Method
------- | ---- | ---- | ----
back | [`Array.push`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) | front | [`Array.shift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
front | [`Array.unshift`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift) | back | [`Array.pop`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

![http://goodmenproject.com/wp-content/uploads/2012/09/Screen-Shot-2012-09-15-at-9.16.04-AM.png](http://goodmenproject.com/wp-content/uploads/2012/09/Screen-Shot-2012-09-15-at-9.16.04-AM.png)

> This is a queue of people.

### Examples

Where do we use queues?

- Batch processing: For operations where various entities are stored and held to be processed later, the queue performs the function of a buffer.
- Typical application areas include print job scheduling, operating systems (process scheduling).

And remember, the regular Array structure in Javascript can be used as both a Stack (first in, last out) and can as a Queue (first in, first out) depending on the calls you make. __However__ using the Array this way, you lose the big O benefits of __constant time insertion/removal__ due to the underlying mechanics of the `Array` type in Javascript.

## Exercises

1. Your solution to Linked Lists should behave as a stack already. Use it as a stack to complete `Exercises/src/linked-list/parens_checker` to practice *using a stack*.

1. Use your linked list implementation to create an implementation of a queue.  Complete `Exercises/src/linked-list/queue.js` so it passes the tests in `Exercises/test/linked-list/queue.test.js`. You'll need to decide which functions to use as __enqueue__ and __dequeue__, but you should not have to rewrite much code.

# Hash Tables

A hash table is a data structure that maps a set of keys to a set of values. A hash table is often called by many different names including:

* Hash Table
* Hash
* Hash map
* Map
* Table
* Dictionary

In JavaScript, the closest data structure to a hash table is the object. In the following example notice how an object maps keys to values:

```js
myObj = {};
myObj['key'] = 'value';
myObj[1] = 'another value';
myObj['1'] // returns the string 'another value'
test = {}
test[myObj] = 'the last value';
test['[object Object]'] // returns the string 'the last value'
```

The example above also illustrates why an object in javascript is not quite a hash table.  All keys of an object are turned into a string. This means that complex objects cannot be used as keys in another object.

## How Hash Tables Work Internally

Now that we understand how to use a hash table, let's understand how it works internally.  Once you understand how the hash table works, it is much easier to understand the big O performance characteristics of a hash table.

__Array Access Is Constant Time__

First, recall that an array has constant time access because all items in the array are stored contiguously in memory.  Looking up any one item is simply a mathematical operation that uses the start of the array's memory address and adds the index to find the memory address of the index that is desired.

__Imagine An Infinitely Long Array__

![](http://s14.postimg.org/ho496a4k1/infinite_Array.png)

If an infinitely long array existed, and we have numbers as keys, we could just use this infinitely long array as our hash table. In the example above:

```js
arr[1] = "value 1";
arr[5001] = "value 2";
```

Any time we have a new key that we would like to add, we simply assign a value to an index in the array.

__What is the problem with an infinite array implementation?__

It is extremely wasteful because we have to create a very large array to hold all possible keys.  A better way to solve the problem would be to map the set of keys into a smaller space.

### Hash Function: Maps a Set of Keys to a Smaller Space

A hash function is a function that maps keys into a smaller space.  This way, a hash table can take any key as input, and the hash function is responsible for mapping it into a smaller array.  A basic hash function looks like the following

```js
hash_key = (key * LARGE_PRIME) % smaller_array_size
```

The function takes an arbitrary key, multiplies it times a large number to give it some entropy, and then mods the result by the size of a finite array (the max size of the new space).

For example, if the smaller array has a length of 59, and the large prime number we choose is 122611, then our hash function is:

```js
hash_key = (key * 122611) % 59
```

Let's map the two keys from the infinite array example:

```js
key = 1, hash_key = (1 * 122611) % 59 = 9
key = 5001, hash_key = (5001 * 122611) % 59 = 51
```

Notice that the hash key that is generated is always in the range 0 to 58 in this case.  The range is within the bounds of the array of size 59 that we have created to store the values for our hash.

Now we have a function that maps a seemingly infinite set of keys to a finite set of keys between 0 and 58.

### Hash Collisions

A collision occurs in the hash table when two keys map to the same index.  The hash table has to have some policy for handling these issues so that a previously hashed key with the same index does not get written over.  One policy to fix the problem is __chaining__.

__Chaining__

Chaining is a way to resolve collisions in a hash table. Instead of starting with an empty array, each array element contains a data structure to store collisions.  A common data structure to use is a linked list, but others can be used such as a binary search tree or even another hash table.  Whenever an element is inserted, both the key and the value are inserted into the data structure at that index.

In the below image, the table is categorizing the values by the last name.

When there's a collision (e.g. two last names which start with the same letter), an _additional entry_ in the existing data structure is added that keeps track of the order. In the below example, Wilson follows Williams alphabetically. When we attempt to find Wilson, we will go to where __"W"__ is categorized and run through the list until we reach the end or find the entry.

![](http://www.algolist.net/img/hash-table-chaining.png)

For an example, take a look [at this description of chaining](http://www.algolist.net/Data_structures/Hash_table/Chaining).

__Linear Probing__

Another category of solving collision problems is probing.  Linear probing is one such scheme.  Rather than solve a collision with an extra data structure, the scheme tries to put the key and value in a different spot in the array.  With linear probing, if there is a collision at index i, the algorithm tries to put the key and value at index i + 1, then index i + 2, etc. Until it finds an open slot.  To find out if a key is in the hash, the algorithm must hash to an index.  If the key and value exists at that index, then it is found.  If the key and value do not exist at that index, then continue looking linearly through the array until the key and value are found, or an empty space is found in the array.  If there is an empty space, you know the key and value are not in the array.

In the example below, John Smith and Sandra Dee have collided at 873. In order to resolve this, Sandra Dee is added right next to John Smith. In the event we're trying to find Sandra Dee (at 873), we'd go to that index and see that she is not there. We'd then continue until we found the next empty space (i.e. she's not there) or we'd find her.

![](https://upload.wikimedia.org/wikipedia/commons/9/90/HASHTB12.svg)

For a further description, [the article on Wikipedia](https://en.wikipedia.org/wiki/Linear_probing) is helpful.

## Big O Runtime of Hash Tables

A hash table has impressive performance characteristics:

* __Inserting__: O(1)
* __Removing__: O(1)
* __Accessing a Value Using a Key__: O(1)
* __Finding A Value (without key)__: O(n)
* __Space Complexity__: O(n)
