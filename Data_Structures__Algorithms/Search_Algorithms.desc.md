# Searching Algorithms

## Objectives

* Describe the 3 common search algorithms as well as identify their time-complexity:
  * Linear Search on an Unordered Array
  * Linear Search on an Ordered Array
  * Binary Search

## What are the common search algorithms?

In working with arrays, we have come to experience a common problem we need to solve, searching for an element in an array. We will be discussing three algorithms that can accomplish this task.

### Linear Search on an Unordered Array

[Linear search](https://en.wikipedia.org/wiki/Linear_search) (or sequential) search is a method for finding a particular value in an array, that consists of checking every one of its elements, one at a time and in sequence, until the desired one is found. Linear search is the simplest search algorithm; it is a type of [brute-force search](https://en.wikipedia.org/wiki/Brute-force_search).

Linear Search is the only algorithm that can be used when given an array that is unordered (ie unsorted). The algorithm is written below in pseudocode.

```
linear_search(arr, target):
  for each index i in arr
    if arr[i] = target
      return i

  return -1
```

With its name, linear search runs at [O(n)](https://en.wikipedia.org/wiki/Time_complexity#Linear_time). This is because in the worst case scenario, the entire array is checked, which creates a linear relationship between the size of the array and the amount of time it takes.

### Linear Search on an Ordered Array

Supposed I adjusted problem and said we need to find an element in an array that is already ordered (ie sorted). This allows us to make assumptions that if we are searching and we are finding values less than the value we are looking for, we can terminate.

The algorithm (written in pseudocode) for searching for an array _e_ in the array _arr_ is as follows:

```
ordered_linear_search(arr, target):
  for each index i in arr
    if arr[i] = target
      return i

    if arr[i] < target
      return -1

  return -1
```

Even though we can terminate earlier in certain cases, the worst case scenario involves iterating through the entire array. Therefore the complexity is linear as well or O(n).

## Binary Search

The most efficient way to search an array that is already sorted is [Binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm).

The binary search algorithm begins by comparing the target value to the value of the middle element of the sorted array. If the target value is equal to the middle element's value, then the position is returned and the search is finished. If the target value is less than the middle element's value, then the search continues on the lower half of the array; or if the target value is greater than the middle element's value, then the search continues on the upper half of the array. This process continues, eliminating half of the elements, and comparing the target value to the value of the middle element of the remaining elements - until the target value is either found (and its associated element position is returned), or until the entire array has been searched (and "not found" is returned).

The algorithm is as follows (in pseudocode):

```
binary_search(arr, target):
   lo = 1, hi = arr.length
   while lo <= hi:
      mid = floor(lo + (hi - lo) / 2)
      if A[mid] == target:
         return mid            
      else if A[mid] < target:
         lo = mid + 1
      else:
         hi = mid - 1

   return -1
```

In binary search, one comparison allows us to throw out half of the potential candidates in the array (this is due to the ordered property). We apply these comparisons multiple times, halving the array each time. The produces the opposite effect of multiplying by 2 each time. The complexity of the algorithm is therefore logarithmic or O(log n).

## Exercise

[CS Exercises](https://github.com/gSchool/cs-exercises)

Make the `algorithms/search_algorithms` tests pass.

## Challenges

1. Will Binary Search return the index of the first appearance of an element in an array? If yes, explain why. If not, provide an example that proves it does not.

2. We have a new algorithm for searching in an ordered array called _chunk search_. With this algorithm, we divide the array into chunks of the same size. We then compare the first element in each chunk to the value we are searching for. If the first element is less than our search value, we then perform a linear search on the previous chunk. This is similar to how we look at a dictionary (the book, not the Internet). We look at the words at the top of our page to see if our word is on the page then scan the page for that word.

* What is the ideal chunk size given an array of size _n_?
* What is the complexity of this algorithm?
