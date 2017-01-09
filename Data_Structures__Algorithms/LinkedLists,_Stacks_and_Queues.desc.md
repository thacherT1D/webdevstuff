Stacks and Queues are specializations of lists. That is, they are lists with a __restricted API__. The restrictions are on the *order in which elements can enter and exit* the list. Enforcing this ordering gives programmers the ability to __make assumptions__ about the data they are processing, which can be very powerful.

## Objectives

* Define a __stack__
  * Define __LIFO__
  * Define __push__
  * Define __pop__
* Define a __queue__
  * Define __FIFO__
  * Define __enqueue__
  * Define __dequeue__

## Stacks

<a href="https://en.wikipedia.org/wiki/Stack_(abstract_data_type)">Stack</a>. A stack is a data-structure which follows the LIFO (last-in-first-out) pattern for access. When both insertion and removal are __restricted__ to __always happen__ from the __same end__ of a linked list, we call this a LIFO  structure.

![http://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/2000px-Data_stack.svg.png](http://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/2000px-Data_stack.svg.png)

You can think of a stack simply as some items stacked on top of each other just like these cups!

![http://files.mom.me/photos/2012/05/22/6-3681-stacked_cups-1337654706.jpg](http://files.mom.me/photos/2012/05/22/6-3681-stacked_cups-1337654706.jpg)

Another way to think about it: a Linked List which can only __insert__ using `push` and can only __remove__ using `pop` is a stack.

### Examples

Where do we see stacks in the real world?

- The 'undo' command in a text editor can be modeled with a stack.
- We use stacks to help in the implementation of more complex data structures and algorithms
- A stack is an extremely useful and efficient data structure for solving algorithms like figuring out a palindrome.
- Typical application areas include compilers, operating systems, handling of program memory (nested function calls)

## Queues

<a href="https://en.wikipedia.org/wiki/Queue_(abstract_data_type)">Queue</a> - A Queue is a data structure where insertion __must happen__ from one end of the list and removal must happen from the other end. We call this a FIFO (first-in-first-out) structure.

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
