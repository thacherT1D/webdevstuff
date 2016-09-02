# Sorting Algorithms: The Quicksort

## Objectives

By the end of this article you should be able to:

- Implement a Merge Sort.
- Understand the time and space complexity of Merge Sort

## Introduction

In [Part 1](../Unit-2/04-sorting-intro.md), you learned about three relatively straightforward sorting algorithms: bubble sort, selection sort, and insertion sort. Compared to other sorting algorithms, these three are some of the most approachable and easy to reason about. However, if you're trying to sort an array with millions of values, these algorithms are also not terribly efficient: on average, all three of them are O(n<sup>2</sup>), where n represents the size of the array being sorted.

In this section, we'll learn about two other sorting algorithms: Merge Sort and Quick Sort. These two algorithms perform better on average as the size of the array grows, but they're also a bit more complicated. Let's talk about these algorithms conceptually and create some pseudo-code; you'll be asked to implement each of these algorithms at the end.

## Merge Sort

Merge sort works by decomposing the array into smaller chunks, which are then sorted and merged together. This process goes all the way down to arrays of size 1, which are super easy to sort!

![merge sort](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/172/mergesort.gif)

Here's a step-by-step description of merge sort:

```javascript
function mergeSort(arr){
  // 1. If your array has a length less than 2, congratulations! It's already sorted.
  // 1. Otherwise, cut your array in half, and consider the two sub-arrays separately.
  // 1. Sort each of your smaller subarrays using merge sort.
  // 1. Merge your two subarrays together, and return the merged array.
}
```

Through this recursive process, you'll wind up with a sorted array!

In order to implement this function, it's useful to have a helper function that takes two sorted arrays and merges them together to create a new, larger sorted array. Here's some pseudo-code to get you started:

```javascript
function merge(arr1, arr2) {
  // 1. declare a new empty array, and pointers corresponding to indices in arr1 and arr2 (set them both to 0)
  // 2. if the first element in arr1 is less than the first element in arr2, push the first element in arr1 to the new array, and move the pointer for arr1 one spot to the right. Otherwise, do this for arr2.
  // 3. Repeat this process until you've gone through one of the arrays
  // return the new array, concatenated with whatever elements are remaining from the array that you haven't exhausted yet.
}
```

**Exercise:** Implement the `mergeSort` and `merge` functions provided above.


**Time Complexity**

Determining the time complexity of merge sort requires some careful thought. From a high level, merge sort works by subdividing the original array into subarrays that are half as long, until the subarrays can't be divided any further and are therefore already sorted.

Then comes the merging. At each level (1-element arrays to 2-element arrays, 2-element arrays to 4-element arrays, and so on), there are O(n) operations that need to be performed. And how many levels are there? Well, the number of levels equals the number of times you can divide n by 2 before you get a quotient that's less than or equal to 1. But this is just log<sub>2</sub>(n). Therefore, the time complexity is log(n) copies of O(n), a.k.a. O(n log(n))!

![http://i.stack.imgur.com/rPhxO.png](http://i.stack.imgur.com/rPhxO.png)

Viewing the image above as a tree, its height is roughly equal to log<sub>2</sub>(n).

(For some more discussion on this, check out this [programmers stackexchange](http://programmers.stackexchange.com/questions/297160/why-is-mergesort-olog-n) The above image comes from that conversation).

**Space Complexity**

Because merge sort requires the use of a merge function which takes two arrays and creates a new array that's (roughly) twice as large, the space complexity of merge sort is O(n).

## Resources:

- [Merge Sort in JavaScript](http://www.nczonline.net/blog/2012/10/02/computer-science-and-javascript-merge-sort/)
- [Merge Sort Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)
