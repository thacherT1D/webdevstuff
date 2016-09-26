## Objectives

- Create Nodes to hold data
- Implement linked lists using JavaScript
- Write and describe basic algorithms associated with manipulating linked lists
- (Advanced) Reverse a linked list in place iteratively and recursively

## What's *Really* Happening with our Arrays?

So far, the data structures we've created have essentially been wrappers for arrays. While they've added some additional functionality, they haven't actually provided any efficiency benefits because of how JavaScript natively implements arrays.

As we discussed earlier, the classical definition of an Array is a statically sized, contiguous, block of memory. The block of memory is divided into evenly sized buckets, each of which holds one item. When you create an array, you're really reserving a block of memory. In a classical array, we request a block of a specific size. If we run out of space we have to create a new (bigger) block of memory and copy all the values into this new memory location.

The JavaScript `Array` appears to hold an infinite amount of data simply by using the `push` method.  However, under the hood, there is a lot more going on.  When you first create an array, JavaScript allocates a certain amount of memory -- just like a classical array.

![](http://www.algolist.net/img/arrays/dynamic-array-ensure-capacity.png)

If you continue to push data, the allocated memory will eventually run out!  Once the memory runs out, JavaScript is still able to make the array larger, but the operation to make the array larger is [O(n)](https://en.wikipedia.org/wiki/Time_complexity#Linear_time).  The steps are as follows:

* Allocate more memory so we can fit the new item we want to push
* If the array used to be of size z, an implementation might allocate 2 * z sized memory to leave some room to grow
* For all n elements in the array, copy the values from the old memory to the new memory
* Add the new value we want to push to the end of the new array
* Update the size of the array
* Delete the old memory

This process is a convenience for programmers, but it also has performance implications. For example, since the algorithm above iterates over all items in the array (in the worst case), the runtime is O(n).

If the runtime of pushing is important to your program, we need a different way of storing data than the simple array.

## Using Nodes with our Data Structures

To contain our data, we can use what is called a Node structure. It'll look something like this:

```js
class Node {
  constructor (value) {
    this.value = value
  }
}

var node = new Node('$$$')
node.value // '$$$'
```

You may see `value` written as `val` or `data` elsewhere but the concept should be the same. Nodes are essentially buckets which hold on to information for us. This only becomes interesting once we begin to connect two or more nodes.

Start by redefining your class as follows:

```js
class Node {
  constructor (value) {
    this.value = value
    this.next = null
  }
}

var node1 = new Node('1st')
var node2 = new Node('2nd')
node1.next = node2
```

Here's what we did above:

1. Define the Node class with a property of `next`

1. Create two new nodes.

1. Link `node1` to `node2` through the `next` property.

Our two nodes are now connected. Try running the following code now that you have everything set up:

```js
console.log(node1.node2.value)
```

What value comes back? In your own words, think of how you'd describe the above concept. Then, turn and talk to a neighbor and compare how you'd describe what's happening.

## What is a Singly Linked List?

A singly linked list is stored in memory using nodes and references (or pointers) to other nodes. We think of these references as being linear. After all, Linked Lists are alternatives to Arrays. In the drawing below, we see this "linearity" of nodes.

![](http://www.cs.usfca.edu/~srollins/courses/cs112-f08/web/notes/linkedlists/ll2.gif)

> Each Square is a node. Each node a reference to the item which comes next.

Linked Lists typically have 2 very important pointers:

1. The head, a pointer to the first node in the list. Equivalent to `myArray[0]`.

2. The tail, a pointer to the last node. Equivalent to `myArray[myArray.length - 1]`.

A nice thing about the singly linked list is that inserting at the end of the list is always [O(1)](https://en.wikipedia.org/wiki/Time_complexity#Constant_time). Why is appending to a singly linked list O(1)? Because of the tail pointer, we always have constant access to the end of the list.

Whenever you need to add or remove an item from the end you follow 3 simple steps:

1. Give the current tail a next pointer to the new node.

1. Change the tail to point to the new node.

1. Give the new node a next pointer of `undefined` or `null`.

Let's create our linked list class:

```js
function SinglyLinkedList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}
```

Above, we created a new class called `SinglyLinkedList` with three properties: `head`, `tail`, and `length`. `head` and `tail` should both point toward some sort of Node. For example, if we wanted to manually insert a single Node we could do the following:

```js
var list = new SinglyLinkedList()
var head = new Node('head')
list.head = list.tail = head
list.length++
```

Above, we created a new list and a node called head. We then assign the head and tail to be the same (since there's only one node in our list, the beginning _is_ the end). Then, we increment the length by one.

We should now be able to do the following:

```js
list.head.value // 'head'
list.tail.value // 'head'
list.length // 1
```

All of these operations are O(1)!

### Exercise

You have all the basics of what you need to begin solving the problems for Singly Linked Lists in the Computer Science Curriculum. Start by working on `.push()`, `.pop()`, `.shift()`, and `.unshift()` and then try the rest.

## Doubly Linked Lists

What if you wanted to go to the second to last node in your list above? Currently, you would need to iterate through the entire list and check for when the you're at the second to last node. That's because Singly Linked Lists are unidirectional. A Doubly Linked List is one where we can traverse are data both backwards and forwards.

![https://www.cs.auckland.ac.nz/~jmor159/PLDS210/fig/dllist.gif](https://www.cs.auckland.ac.nz/~jmor159/PLDS210/fig/dllist.gif)

![](http://www.geeksforgeeks.org/wp-content/uploads/DLL3.jpg)

The main change in order to implement Doubly Linked Lists is simply to add a `.prev` property to the Node we use:

```js
class Node {
  constructor (value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}
```

We can now have Doubly Linked Lists! Keeping track of next and previous has some advantages.  For example, the `pop` method is now much easier. Since we have access to the element before, the operations is [O(1)](https://en.wikipedia.org/wiki/Time_complexity#Constant_time). Instead of O(n) with a singly linked list.

To see why this is true, think about push in singly linked lists. We grab the tail, and give it a brand new node as next. With doubly linked, we can pop with the same pattern.

1. Grab the tail node.

1. Use `tail.prev` to get the *second to last* node.

1. Point the *second to last node's* next to `undefined` or `null`, effectively breaking the chain to that node.

1. Point the tail to the second to last node.

After that process, nothing points at the original tail, so it is effectively gone!

### Exercise

Doubly Linked Lists have the same API as Singly Linked Lists. Now that you've implemented Singly Linked Lists, extend your implementations to be doubly linked. Use your implementation for Single Linked Lists as inspiration, but challenge yourself not to copy any code.

## Circular Linked Lists

A circular linked list is a list in which the tail element's `next` property is pointing to the `head` of the linked list, and the `prev` property of the `head` points to the `tail`. Can you think of a time you'd prefer to model things as a circularly linked list?

![circular linked list](https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Circularly-linked-list.svg/700px-Circularly-linked-list.svg.png)
