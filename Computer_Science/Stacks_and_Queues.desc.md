## Objectives

- Define what a stack is and how it differs from other data structures
- Define what a queue is and how it differs from other data structures
- Define LIFO and FIFO

## What is a stack?

A [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type) is a data structure which follows the LIFO (last-in-first-out) pattern for access. When both insertion and removal are restricted to always happen from the same end of a linked list, we call this a LIFO structure. When you think about a stack or LIFO, you could think about a stack of cups or a stack of dishes.

![http://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/2000px-Data_stack.svg.png](http://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Data_stack.svg/2000px-Data_stack.svg.png)

In this structure, we shouldn't be removing from the middle of the stack. Instead, we should remove from or add to the top of the stack. You could also think of this as an array which only has the `.push()` and `.pop()` methods (as opposed to `.shift()` or `.unshift()`).

### Examples of Stacks IRL

- The 'undo' command in a text editor can be modeled with a stack.
- A stack is an extremely useful and efficient data structure for solving algorithms like figuring out a palindrome.
- The [Call Stack](http://en.wikipedia.org/wiki/Call_stack)

### Exercise

Let's build a Stack! You'll want to start by creating a new class called `Stack`. The constructor function should have no parameters. Your stack should be able to:

* Store any type of data in an ordered fashion
* `.insert()` which will put the inserted data on top of the stack and return nothing
* `.remove()` which will remove the last item inserted into the stack and return that value
* `.peek()` which will return the top of the stack

After your stack is created, you should be able to run the following:

```js
var stack = new Stack()
stack.insert('a')
stack.insert('b')
stack.remove() // Node { value: 'b' }
stack.insert('c')
stack.peek() // Node { value: 'c' }
```

## What is a queue?

A [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type) is a data structure where insertion must happen from one end of the list and removal must happen from the other end. We call this a FIFO (first-in-first-out) structure. When you think about a queue or FIFO you can imagine standing in very British line (they call it a queue).

![http://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/2000px-Data_Queue.svg.png](http://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Data_Queue.svg/2000px-Data_Queue.svg.png)

In this structure, we also shouldn't be removing from the middle of the queue. You could think of this data structure as an array which only has the `.unshift()` and `.pop()` methods. Or, alternatively, only the `.push()` and `.shift()` methods.

### Examples of Queues IRL

- Print job scheduling.
- Batch processing; that is, for operations where various entities are stored and held to be processed later, the queue performs the function of a buffer.

### Exercise

Let's build a Queue! You'll want to start by creating a new class called `Queue`. The constructor function should have no parameters. Your queue should be able to:

* Store any type of data in an ordered fashion
* `.enqueue()` which will put the inserted data to the back of the queue
* `.dequeue()` which will remove the item at the front of the queue and return that value

After your queue is created, you should be able to run the following:

```js
var queue = new Queue()
queue.enqueue('a')
queue.enqueue('b')
queue.dequeue() // Node { value: 'a' }
queue.enqueue('c')
queue.enqueue('d')
queue.dequeue() // Node { value: 'b' }
```

### Exercise

[Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language) is one of the oldest high-level programming languages that uses parenthesis all over the place. [Clojure](https://en.wikipedia.org/wiki/Clojure) is a recent implementation of the Lisp programming language.

A defining characteristic of Lisp languages is that they have lots of parenthesis. For example, here's some Clojure:

```clojure
(if (> 3 2)
  (println "True!")
  (println "False!"))
```

When writing with Lisp languages, we need lots of help checking our parenthesis to make sure they match! Write a function called `parensCheck()` which, given a string that contains a number of parenthesis, returns `true` if all open parenthesis have a matching closing parenthesis.

For example:

```js
parensChecker('()') // true
parensChecker('((()))') // true
parensChecker('()()') // true
parensChecker(')') // false
parensChecker('(()') // false
parensChecker('(()(())') // false
```

To solve this problem, make sure to use the `Stack` data structure you created above!
