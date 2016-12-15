# Intro to Data Structures

## Objectives

* Explain what a data structure is
* Explain how a static array is stored in memory
* Explain how actions on a static array affect memory and performance
* Explain what a dynamic array is
* Explain how dynamic array actions affect memory and performance

## What is a data structure?

A [data structure](https://en.wikipedia.org/wiki/Data_structure) is a way to store and organize data in a computer, so that it can be used efficiently. The key word here is "efficiently". At the end of the day, we are only interested in data structures that are efficient (we will discuss how we measure efficiency later).

With the definition and objectives out of the way, let's think about a data structure we have used since the beginning of our coding journey -  an array! An array is a very simple data structure, but what does it do well? What does it not do well? Start [here](http://stackoverflow.com/questions/8423493/what-is-the-performance-of-objects-arrays-in-javascript-specifically-for-googl).

### Data Structures And Memory

Modern programming languages hide a lot of the complexity of dealing with a computer.  In languages like JavaScript and Ruby we never have to worry about how the computer stores information in memory (aka memory allocation), but it is important to know what is going on behind the scenes when you use it.

## How should you decide which data structure(s) to use?

Some questions you have to ask and decisions you have to make are:

- What information are we storing?
- What operations do you intend to do with that data? Insert? Delete? Get median? In each case, the speed and memory __costs of operations__ are important
- What is the potential memory usage?
- Does order matter?
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
* Hash Tables

The following lessons on data structures will focus mostly on the definition, application and value of data structures. The implementation of data structures will be left up to you!

### EXERCISE

Take 30 seconds to think about what a data structure is. Turn to your neighbor and take 2 minutes to exchange definitions of a data structure.

## What is a (static) array?

It turns out that JavaScript arrays are NOT the same as arrays in most other popular programming languages. Arrays in most other languages are __static arrays__ while arrays in JavaScript are __dynamic arrays__, which we'll learn about later in this lesson.

The classical definition of a (static) array is __a statically sized, contiguous, block of memory__. Both static and statically sized mean that __the array's size/length never changes__. The block of memory is divided into evenly sized buckets, each of which holds one item. When you create an array, you're really __reserving a block of memory__. Again, in a classical array, we request a block __of a specific size__. If we run out of space we have to __create a new__ (bigger) block of memory and copy all the values into this new memory location.

Here is what a static array looks like when it's stored in memory:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/551/cropped_array.jpg)

### EXERCISE

Draw a diagram that represents how the array `[1, 89, 22, 78, 44, 23, 30, 42]` is stored in memory

## How do actions on a static array affect memory and performance?

Because static arrays are ordered, they are relatively efficient for lookup and sorting operations. However, insertion and deletion operations are inefficient because of 1) the need to shift data within memory and 2) as the size of a static array cannot change, any insertion or deletion operation creates a new static array.

### Lookup

Looking up an element in a static array is lightning fast: it's an O(1) operation.

### Iteration over a static array's elements

The time that it takes for iteration over any array's elements is not consistent/constant across all array sizes/lengths. In fact, it is dependent on the size of the array. In particular, the time complexity of iteration over an array is O(n).

Practically speaking, let's look at an array of word strings where each word string is unique:

```js
var array1 = ['eggs', 'milk', 'butter'];
```

For `array1`, let's say that the time it would take to iterate through it would be 25 milliseconds. Based on that, let's look at the next array, `array2`.

```js
var array2 = ['butter', 'sugar', 'bread', 'milk', 'eggs', 'rice']
```

If we are iterating through `array2`, it should take 50 milliseconds, which is 2 times the iteration time for `array1`. Why? Because `array2` has twice as many elements as `array1`, it will take twice as long to get to lookup the last item in its array.

### Insertion at end of array

If you insert an item at the end of the array, it creates a new array with the old items and the new one. This is in case that there is not enough space for a series of memory blocks for the new length of the array (see image below).

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/553/array_insertion_at_end_resized.jpg)

Because copying the array requires iterating over the array, insertion is an O(n) operation.

### Insertion in front or middle of array

If you insert an item in the middle of the array (or at the front of it), you have to shift all of the items that need to come after the new item. Also, the new size of the array may mean that it can no long be in the current memory location. (see image below)

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/554/array_middle_insertion.jpg)

Again, insertion is an O(n) operation.

### Deletion

Similarly to insertion, deletion entails creating a new array using the remaining elements of the old one.

Because copying the array requires iterating over the array, deletion is an O(n) operation.

### EXERCISE

Complete the [static array exercise from this repo](https://github.com/gSchool/cs-exercises/blob/master/arrays/static_array.js) so that it passes its tests.

## What is a dynamic array?

A __dynamic array__ is the kind of array that we have come to know (and love?) in JavaScript: it's an array that can grow and shrink in length/size without any further programming necessary.

The JavaScript `Array` appears to hold an infinite amount of data simply by using the `push` method.  However, under the hood, there is a lot more going on.  When you first create an array, JavaScript allocates a certain amount of memory -- just like a classical array.

If you continue to push data, the allocated memory will eventually run out! Once allocated memory runs out, steps are as follows:

* Allocate more memory so we can fit the new item we want to push.
* If the array used to be of size z, an implementation might allocate 2 * z sized memory to leave some room to grow.
* For all n elements in the array, copy the values from the old memory to the new memory.
* Add the new value we want to push to the end of the new array.
* Update the size of the array.
* Delete the old memory

### EXERCISE

Turn to your neighbor and take 2 minutes to discuss the differences between a dynamic array and a static one

## How do actions on a dynamic array affect memory and performance?

### Insertion at end of array

While there is available memory allocated, any `push` method before the array has been filled at its initial size would be of a O(1) runtime. With some math involved, the runtime averages out to O(1). The reason behind this is a bit out of the scope for this lesson, but is covered in [another article](https://en.wikipedia.org/wiki/Amortized_analysis#Dynamic_Array)

Once the memory runs out, JavaScript is still able to make the array larger, but the operation to make the array larger is [O(n)](https://en.wikipedia.org/wiki/Time_complexity#Linear_time). This process is a convenience for programmers, but it also has performance implications. For example, since the algorithm above iterates over all items in the array (in the worst case), the runtime is O(n).

### Insertion at front or middle of array

`push` only describes insertion at the end of a dynamic array. What about insertion of elements in the middle of the array or the beginning of it? In each case, the heft of moving elements from memory position *i* to memory position *i+1* is going to result in a O(n) runtime. And why do other elements need to be moved when an element is inserted into the beginning or middle of an array? It's so that there is a space for the new element. If we just inserted the element (e.g. `array[i] = 'some value'`), we would replace another element that we do not want change.

### Deletion

The `pop` operation of a dynamic array would be an O(1) operation: it would essentially entail setting the last element in the array to `undefined`. However, deletion of elements that are at the beginning or in the middle of the array would require shifting elements to different memory positions. The reason why is that we do not want to have empty memory positions in the middle or at the beginning of the array!

### Iteration over a dynamic array's elements

Like a static array, a dynamic array employs a linear search of a time complexity of O(n) for iteration over its elements.

### Lookup

Like a static array, looking up an element in a dynamic array is an O(1) operation.

### EXERCISE

Take 2 minutes to write a paragraph that describes how changing a dynamic array's index values affects memory and performance. Take 2 minutes to write another paragraph that describes how increasing a dynamic array's size affects memory and performance

## ASSIGNMENT

Complete the [dynamic array exercise from this repo](https://github.com/gSchool/cs-exercises/blob/master/arrays/dynamic_array.js) so that it passes its tests.

Totally optional Bonus Challenge:

Given a starting point of an array of length 8, determine how many times the array would have to be doubled to accommodate 500 items? What about 5000?
