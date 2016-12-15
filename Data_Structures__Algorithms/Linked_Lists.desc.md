# Linked Lists

A [linked list](https://en.wikipedia.org/wiki/Linked_list) is a data structure that helps keep an ordered list of data.  The linked list can be thought of as similar to other ordered data structures like arrays.  The key difference is how an array is stored verses a linked list, which can lead to different advantages and disadvantages.

## Objectives

By the end of this lesson you should be able to:

* Explain what is a linked list.
* Explain how a linked list is stored in memory.
* Implement linked lists using JavaScript
* Identify the time and space complexity for operations on a linked list.
* Implement a variety of problems involving linked lists.

## What is a linked list?

A linked at its core is simply a sequence of **nodes**. A node has two pieces of information:

* The value that is being stored. It could be anything like a number, a string, or something more complex.
* A reference to the next node. This allows the computer to identify the next node in the sequence.

Think of the linked list as a set of clues to getting to the end. You start with the first clue, which helps you gain information and leads you to the next clue, which leads you to the next clue, and so on.

Let's look at a diagram for a sample linked list of integers.

```
4 -> 2 -> 6 -> 1 -> .
```

We can describe the linked list as follows:

1. The first node (often called the **head** of a linked list) has a value of 4, and contains a reference to the next node.
1. The next node has a value of 2, and contains a reference to the next node.
1. The next node has the value of 6 and contains a reference to the next node.
1. The next node has the value of 1 does not reference anything. Since it is the last node, it is often called the **tail** of the linked list.

## How is a linked list stored in memory?

To have access to a linked list, one must have a reference to the location in memory for the first node (the head). We call that reference a *pointer*. From there, you can read the value at that node, but then you receive the reference to the next node, which is some other location in memory.

![](http://www.cs.usfca.edu/~srollins/courses/cs112-f07/web/notes/linkedlists/ll2.gif)

Recall that for arrays, each element is stored next to each other in memory. This makes it incredibly fast to read items in the array in order, and to access items at any part in the array.

Linked Lists operate differently, since the nodes can be stored in different parts of memory, reading items in a linked list involves jumping around from node to node in memory, which is relatively slow. More problematic is that accessing an item everywhere in the list is impossible, because there is no possible way to calculate the location of a particular node in memory. We will demonstrate that with an exercise.

What are the advantages of linked lists then? Insertions into a list are fast. With arrays, there is a process where if we overflow the space for the array, it needs to be copied to a new location. This is a linear operation or O(n). With a linked list, adding an item is simply creating a node, with a reference to the next node. There is no copying needed. With this in mind, different problems can benefit from linked lists on this construct.

## How do you implement a linked list in JavaScript?

JavaScript does not have a built-in linked list like it does for arrays. With this in mind, we can construct our own linked list implementation. Let's build a data definition for a linked list. For now, we will assume that the linked list will contain integers, but this can be expanded to any data type.

```javascript
// A Linked List (of Integers) is one of the following:
//   - null
//   - a Node, which is an object of the following format:
//     {
//       value: Integer,
//       next: Linked List
//     }
```

A Linked List is an example of a **recursive** data definition, that is, the data definition references itself. This can lead to some really clean solutions using a recursion.

Let's build same example as above. The simplest linked list is an empty linked list. We use `null` to represent an empty linked list.

```javascript
null
```

Adding a node to it is simply adding a Node object. We are starting with the tail of the list. This is because we add a node to the front of the linked list. In the example, the tail value is 1.

```javascript
{
  value: 1,
  next: null
}
```

We can then add another Node with the next node in the list before the tail, 6.

```javascript
{
  value: 6,
  next: {
    value: 1,
    next: null
  }
}
```

We are inserting a node to the front of the linked list. Based on the implementation of a pure **singly** linked list (that is, a linked list where each node can only point to the next node), nodes that are inserted last, are the first ones we can access. The common term for this is Last In First Out or LIFO.

## What are the common operations one can do with a linked list?

We can apply the same operations with a linked list like we do an array.

* Lookup (by index)- O(n)
* Insert - in front O(1), - in back O(n)
* Delete - By Index O(n), first node O(1)

### Singly Linked List

A singly linked list is stored in memory using __nodes__ and __references or pointers__ to other nodes. We think of these references as being __linear__, after all Linked Lists are alternatives to Arrays. In the drawing below, we see this "linearity" of __nodes__.

![](http://www.cs.usfca.edu/~srollins/courses/cs112-f07/web/notes/linkedlists/ll2.gif)

> Each Square is a node. Each node a reference to the item which comes next.

It looks like the nodes in our list are all in a line. In memory, the list is scattered all over the place. Recall that we do not have control over how Objects are stored in __The Heap__.

The first object could be at a very high memory address and the second object could be at a very low memory address.  The only thing that keeps the list together is the __next__ pointers.  The next pointers are references to where the next element in the linked list list is located.

Linked Lists typically have 2 very important pointers:

1. The __head__, a pointer to the __first__ node in the list. Equivalent to `myArray[0]`.
2. The __tail__, a pointer to the __last__ node. Equivalent to `myArray[myArray.length - 1]`.

A nice thing about the singly linked list is that inserting at the end of the list is always [O(1)](https://en.wikipedia.org/wiki/Time_complexity#Constant_time).  Why is appending to a singly linked list O(1)? Because of the tail pointer, we always have constant access to the end of the list.  

Whenever you need to add or remove an item from the end you follow 3 simple steps:

1. Give the current tail a __next__ pointer to the new node.
1. Change the tail to point to the new node.
1. Give the new node a __next__ pointer of `undefined` or `null`.

### Doubly Linked Lists

A [doubly linked list](https://en.wikipedia.org/wiki/Doubly_linked_list) is a list where each node has two pointers - a next pointer and a previous pointer.  Take a look at these two visualizations of doubly linked lists:

![https://www.cs.auckland.ac.nz/~jmor159/PLDS210/fig/dllist.gif](https://www.cs.auckland.ac.nz/~jmor159/PLDS210/fig/dllist.gif)

![](http://www.geeksforgeeks.org/wp-content/uploads/DLL3.jpg)

> Notice that in a doubly linked list `head.previous` and `tail.next` should both always be `undefined` or `null`.

Keeping track of next and previous has some advantages.  For example, the `pop` method is now much easier.  Since we have access to the element before, the operations is [O(1)](https://en.wikipedia.org/wiki/Time_complexity#Constant_time).  Instead of O(n) with a singly linked list.

To see why this is true, think about __push__ in singly linked lists. We grab the tail, and give it a brand new node as __next__. With doubly linked, we can __pop__ with the same pattern.

1. Grab the __tail__ node.
1. Use __tail.previous__ to get the *second to last* node.
1. Point the *second to last node's* __next__ to `undefined` or `null`, effectively breaking the chain to that node.
1. Point the __tail__ to the second to last node.

After that process, nothing points at the __original tail__, so it will eventually be garbage collected.

Here is an implementation of the push method for a doubly linked list (assuming a constructor function for Nodes):

```javascript
DoublyLinkedList.prototype.push = function(value) {
  var newNode = new Node(val);
  if (!this.head) {
    this.head = newNode;
    this.tail = this.head;
  } else {
    this.tail.next = newNode;
    newNode.prev = this.tail;
    this.tail = newNode;
  }
  this.length++;

  return this;
};
```

And here is an implementation of the pop method:

```javascript

DoublyLinkedList.prototype.pop = function() {
  if (!this.head) return undefined;

  // special case where the length of the list is 1
  // so the head and tail need to be set to null
  if (this.length === 1) {
    var returnValue = this.tail.value;
    this.length = 0;
    this.head = this.tail = null;
    return returnValue;
  }

  var oldTail = this.tail;
  this.tail = oldTail.previous;
  this.tail.next = null;
  oldTail.previous = null;
  var returnValue = oldTail.value;

  this.length--;

  return returnValue;
}
```

Notice that both `push` and `pop` are now constant time operations.

#### Fun Aside: Circular Linked Lists

A circular linked list is a list in which the tail element's `next` property is pointing to the `head` of the linked list, and the `previous` property of the `head` points to the `tail`. Can you think of a time you'd prefer to model things as a circularly linked list?

![circular linked list](https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Circularly-linked-list.svg/700px-Circularly-linked-list.svg.png)

# EXERCISES

[CS Exercises](https://github.com/gSchool/cs-exercises) - See Linked Lists

### Part 2 - Doubly Linked Lists

Doubly Linked Lists have the same API as Singly Linked Lists. Now that you've implemented Singly Linked Lists, extend your implementations to be doubly linked. Once again, there is a reference implementation in this repo called `doubly_linked_list_solution.js`. Use it for inspiration, but challenge yourself not to copy any code.

### Part 3 - Bonus Problems With Doubly Linked Lists

Red Green Refactor the following:

1. Write a reverse function that reverses the list in one pass.
1. Write a function to return the most frequent value in the linked list.
1. Write a function called rotate that takes 2 parameters.  The first is how many locations the list should rotate.  The second is true if the list should rotate forward and false if it should rotate backwards.  For example, if the list is 1,2,3,4,5,6,7 and `rotate(3,true)` is called, the list would become 5,6,7,1,2,3,4.  If `rotate(1,false)` is called on the same list, the new list would be 2,3,4,5,6,7,1.
1. Write a function that sorts the list (you can start with bubble sort, but try something more complicated like merge sort or quick sort).
1. Make another class that uses the `DoublyLinkedList` class.  The class should be a `SortedLinkList`.  The `SortedLinkList` will always maintain a sorted order for you.  For example, if the list contains 4,8,11,22,55 and `insert(13)` is called, the new list will be 4,8,11,13,22,55.  Since this is now a `SortedLinkList`, the following methods aren't needed: `push`, `pop`, `shift`, `unshift`.  Also, `set`, should be replaced with `insert`, which does not take an index.  Insert takes a value, only.
