# Sorting Algorithms: The Quicksort

## Objectives

By the end of this article you should be able to:

- Implement a quicksort with O(n) space complexity.
- Implement a quicksort with O(log n) space complexity.

## Quicksort

Quicksort is probably the least straightforward of all the sorting algorithms we'll consider here. Like merge sort, the time complexity for quicksort is typically O(n log(n)) (though in the worst case, it can be O(n<sup>2</sup>)). However, when sorting an array in place using quicksort, the space complexity is better than merge sort: O(log(n)) rather than O(n).

Before diving into the algorithm, you would watch [this video from Computerphile](https://www.youtube.com/watch?v=XE4VP_8Y0BU), which does a great job of explaining how quicksort works.

Here's the gist of how quicksort works:

1. Take an element in the array and refer to it as the "pivot." For simplicity, we'll take the first element in the array to be the pivot. (As you'll see, this is a bad choice if the array is already sorted. It makes the algorithm a little easier to reason about though, so we'll take the tradeoff.)
2. Compare every other element to the pivot. If it's less than the pivot value, move it to the left of the pivot. If it's greater, move it to the right. Don't worry about where on the left or right you're putting these values; the only thing that matters is comparisons to the pivot.
3. Once you're done, the pivot will be in the right place, and you can then recursively repeat this process with the left and right halves of the array.

![quicksort](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/171/quicksort.gif)

(Note: for arrays with unique values, you can think of this process as generating a binary search tree. The root node is the first pivot, and every subsequent node is a subsequently chosen pivot.)

Before worrying about implementing a quicksort with the best possible space complexity, let's write a quicksort that just gets the job done with O(n) space complexity. Here's some pseudo code:


```javascript
function quickSort(arr) {
  // If the length of the array is less than 2, it is already sorted, so return it.
  // Otherwise, create two empty arrays (one for the left and one for the right)
  // Create a variable named pivot, set to the first value in array.
  // Compare every element in the array to the pivot.
  // - If the element is less than the pivot, push it into the left array.
  // - Otherwise, push it into the right array.
  // Recursively call quickSort on the left array and the right array
  // Concatenate the resulting arrays together with the pivot value in between them, and return this larger array.
}
```

**Exercise:** [In the file, `Exercises/src/sorting/sortingAlgorithmsSpecPart2.js`,](https://github.com/gSchool/computer-science-curriculum) implement a Quicksort as described above and ensure it passes the provided tests.

**Tip:** To run the tests:
- Navigate to `computer-science-curriculum/Exercises`.
- Run `npm install`
- Run the tests with `npm test tests/sorting/sorting/sortingAlgorithmsSpecPart2.js`

The downside with the above approach is that when we pass an array into `quickSort`, we're getting a new array back, which requires more memory. If space complexity is important (for example, if you're trying to sort an array with millions of elements), then it might be better to try to implement quicksort on an array _in place_.

This approach is a bit more complicated, and is typically done with the addition of a helper function called `partition`, which handles arranging the values in a given section of an array so that they are moved to the either side of a given pivot based on their values.

This will be easier to understand with some more pseudo code:

```javascript
// left and right indicate the left and rightmost indices in the sub-array that you're partitioning.

'use strict';

function partition(arr, left, right) {
  // create a variable named pivotValue and assign it a value of arr[right]
  // create a variable named partitionIndex and assign it a vlue of left
  // starting at left, for every element less than right:
  // - if the current element is less than or equal to the pivotValue
  // - swap the current element with the element at partitionIndex
  // - increment partitionIndex
  // swap the element at right with the element at the partitionIndex
  // return the partition index
}

function quickSort(arr, left, right) {
  // if left is undefined left = 0;
  // if right is undefined right = arr.length - 1
  //if left is less than right
  // - create a variable called partitionIndex equal to the result of partition(arr, left, right)
  // - recurse for all values left of the partition index
  // -recurse for all values right of the partition index
}
```

**Exercise:** [In the file, `Exercises/src/sorting/sortingAlgorithmsSpecPart2.js`,](https://github.com/gSchool/computer-science-curriculum) implement another quicksort, this time use a partition to ensure optimal space complexity and ensure it passes the same test.

**Tip:** To run the tests:
- Navigate to `computer-science-curriculum/Exercises`.
- Run `npm install`
- Run the tests with `npm test tests/sorting/sorting/sortingAlgorithmsSpecPart2.js`

Hopefully this should be enough to get you on your way to implementing quicksort with O(log(n)) space complexity. If you're still stuck, consult some of the references below.

## Bonus Exercise:

Starting and left and right is very convenient, but sometimes

## What about `Array.prototype.sort`?

As you may know, Javascript (along with most other languages) has a built-in sort method on arrays. This raises a question: what sorting method is being used under the hood?

Well, it depends. As of 2012, according to Nicholas C. Zakas (reference below):

> Quicksort is generally considered to be efficient and fast and so is used by V8 as the implementation for Array.prototype.sort() on arrays with more than 23 items. For less than 23 items, V8 uses insertion sort. Merge sort is a competitor of quicksort as it is also efficient and fast but has the added benefit of being stable. This is why Mozilla and Safari use it for their implementation of Array.prototype.sort().


## Resources:

* [Quick Sort in JavaScript](http://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/)
* [Quicksort in Javascript](https://en.wikibooks.org/wiki/Algorithm_Implementation/Sorting/Quicksort#JavaScript)
* [JS Front-end Interview Questions: Quicksort](http://khan4019.github.io/front-end-Interview-Questions/sort.html#quickSort)
