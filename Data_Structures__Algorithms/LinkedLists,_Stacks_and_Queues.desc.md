# Recursion

## Background

[Recursion](https://en.wikipedia.org/wiki/Recursion_(computer_science)) is a technique where a method can call itself. Recursion can be used to traverse tree structures. For example, take the following tree, where each letter represents a node in the tree:

```
      A
  ____|____
  |       |
  B       C
__|__   __|__
|   |   |   |
D   E   F   G
            |
            H
```

In this tree, we can say that-

* `A` is the "root" node
* `A` has two child nodes: `[B, C]`
* `B` has two child nodes: `[D, E]`
* `C` has two child nodes: `[F, G]`
* `G` has one child node:  `[H]`

Let's say you wanted to go over the entire tree and print the letters out... you could write (pseudo) code like this:

```
print the root node's letter
for each child node in the root node's children
  print the child node's letter (B, C)
  for each child in the child node's children
    print the granchild's letter (D,E,F,G)
    for each child in the grandchild's children
      print the letter (H)
```

You can see that this only works if the tree has 4 levels.  But what if it had 8 levels? Or 100?  Basically that code is doing the same thing, but from a different starting point:

1. Start with `A`, print `A`'s letter
1. Go over all of `A`'s children and repeat step 1, but start with `B`, then with `C`

We could write that in JavaScript like so:

```js
function printLetters(node) {
  console.log(node.name);
  node.children.forEach(function(childNode){
    printLetters(childNode);
  });
}
```

Make sense?

> Check out the [CMU Recursion Slides](http://www.cs.cmu.edu/~15110-f12/Unit05PtA-handout.pdf) for more.

## Quick Start

For recursion we need:

1. A base case(s)
1. Recursive step

The recursive step ensures that we progress.  The base case ensures that our recursion eventually exits, preventing an infinite loop.  Also we usually want to pass some data/information around - we do this with function returns.

### Approach #1 - Start at the bottom

1. Pretend you are at the solution
  * For example:
    * This can be a node you are searching for
    * The end of a recursive data structure
1. How do you know you found the solution (what's your base case)
1. Now that you have you answer, how do you get this answer back to the top
1. Since you have solved the problem, assuming you are at the solution...
1. How do you get to the solution
  * Easier to think one step at a time
  * How do I go one step further
  * If you know how to get from one step to the next, and know when to stop...
1. $$$

> [Sparknotes on Recursion](http://www.sparknotes.com/cs/recursion/whatisrecursion/section1.rhtml)

### Approach #2 - Identify sub-problems

Often times recursive problems require you to split a big problem into smaller problems.  For example, let's say you were trying to write a recursive function that would find the first element of an array greater than a specific number.  The `for` loop would look like this:

```js
function firstGt(array, number) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] > number) {
      return array[i];
    }
  }
}
```

Here, you could split this into two sub-problems:

- Problem #1 is to take the first element of the array and see if it's bigger.  
- Problem #2 is to take the rest of the array (all _except_ the first element), and repeat Step #1.

```js
function firstGt(array, number) {
  if (array[0] > number) {
    return array[0];
  } else {
    return firstGt(array.slice(1), number);
  }
}
```

## Recursive Problem Set

First, practice a bit with the following challenges:

1. Define a recursive function that takes an argument n and prints the lyrics to 99 bottles of beer on the wall, starting with that number `n`
1. Define a recursive function that takes an argument n and returns the fibonacci value of that position. The fibonacci sequence is 0, 1, 1, 2, 3, 5, 8, 13, 21... So fib(5) should return 5 and fib(6) should return 8.
1. Define a recursive function that returns true if a string is a palindrome and false otherwise.
1.  Get the JSON data from this Reddit post using an http request: `http://www.reddit.com/r/aww/comments/zzg3k/my_local_humane_society_posts_pictures_of_new/.json`.  Write code to print out the text of each comment in your terminal.  Write code that counts the number of comments, as well.

Then make all of the tests pass in [Exercises/src/recursion/recursive-iteration.js](../Exercises/src/recursion/recursive-iteration.js).

> If you like, you can write an iterative solution to the problem first, then write the recursive solution.

For further practice you can also do:

[https://github.com/gSchool/js-hof-filter-map-reduce](https://github.com/gSchool/js-hof-filter-map-reduce)

#### Stretch goals

1. Convert Roman Numerals to Integers
1. [Recursion exercises](https://roman01la.github.io/recursion-exercises/)

## Recursion Write Up

* Why is recursion a useful technique for solving a big problem?
* What are the limitations of using recursive solutions?
* What types of problems are more suited for simple loops than recursion?
* What is meant by "recursive depth?"
* What is a "stack overflow" (the concept, not the website)? And why is that relevant to a recursive problem?

# Trees

Trees are a common data structure in programming which are __hierarchical__ as opposed to __linear__. Trees are used to model all sorts of things, many of which you've interacted with already such as *filesystems* and the *HTML DOM* in web browsers.

Trees also have powerful specializations, such as Binary Search Trees, which are used to search ordered data; and Tries which are commonly used to encode dictionaries and spell checking algorithms.

## Objectives

* Describe Trees using specific vocabulary.
* Implement a Tree in JavaScript
* Implement some basic tree algorithms, specifically:
  * Depth First Search
  * Breadth First Search

## Linear vs Hierarchical Data Structures

So far the data structures we have seen are __linear__ and/or __sequential__ data structures that have a single starting point, and a single ending point. These linear structures follow a single __path__ from start to end. This single path contains all the elements in the data structure. Linear data structures include arrays, linked lists, queues, and stacks.

[Trees](https://en.wikipedia.org/wiki/Tree_(data_structure)) are a data structure used to show hierarchical data. Like Linked Lists, these are modeled as a set of __nodes__ and __references__. Unlike Linked Lists, a node in a tree may have any number of __next references__, which we call __children__. All trees have a single starting point, called the __root node__ and nodes that have no children are called __leaf nodes__.

A Family Tree is a close analogy to trees in the computer science sense. In a family tree a __a parent node__ represents __both__ the mother and father. A leaf node would be a person without children in the biological sense of the word.

When thinking about trees, visualize them with the root at the top. Consider this tree:

![Binary Tree](http://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/tree1.bmp)

> `8` here is the __root node__. The __root node__ has two __children__ `5` and `4`. This tree has four __leaf nodes__ `9`, `1`, `2`, and `3`, all of which have no children.

## Properties of Trees

In order for a set of __nodes__ and __children__ to be considered a __tree__ it must satisfy some  properties:

* Every node must have exactly __one__ parent,
* Except for the root node which cannot have a parent.

This means that in a Tree there is always a __single path__ from the __root node__ to any other node in the tree.

## Vocabulary

Trees have a lot of __domain specific language__, you may see these terms used:

- Root - node at the top of the tree.
- Parent - node above a node.
- Child - node below a node.
- Link - connection from a node to another node.
- Edge - another term for a __Link__.
- Grandparent - parent of parent.
- Grandchild - child of child.
- Sibling - children of same parent.
- Leaf Node - node that does not have a child.
- Internal Node - node that has a child.
- Ancestor/Descendent - the child or child of a child at any depth.
- Height/Max Depth - Number of edges in longest path from X to a leaf.
- Depth - length of the path from root to node X or number of edges in path from root to node X.

## Practice

For each of these facts, write a paragraph which proves it:

* The __height__ of a tree is equal to the longest path from root to leaf.
* In a tree with N nodes, there will always be N-1 edges.
* There is always a __single path__ from the __root node__ to any other node in the tree.

## Exercise

Open the `Exercises/src/trees` folder for the exercises. To run the tests, use the command `mocha ../test/trees/[testFile]`, make the tests pass for each of these exercies:

- `Node` - Check this file first
- `objectToNode` - Practice creating trees from JSON
- `arrayToNode` - Practice creating trees from arrays

# Searching Trees

## Objectives

## Depth First Search for a Tree (DFS)

One of the most common ways of searching through a tree is using [Depth First Search](https://en.wikipedia.org/wiki/Depth-first_search) (DFS).

Here is an example of DFS Pre-order for a tree:

![http://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif](http://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif)

#### Pre-order vs In-order vs Post-order

Here is some potential step by step pseudo code for implementing DFS Pre-order (with a return value of an array of all the nodes - this can also be done with a callback for additional functionality)

1. Create an array called `data` to store our results
2. Create a variable called `current` and set it equal to the root
3. Define a function called `search` that takes in a node as a parameter. Inside of the function-
    - push into your `data` array the parameter passed into the function
    - if there is a node to the left, call the `search` function again passing in the node to the left
    - if there is a node to the right, call the `search` function again passing in the node to the right
4. Call the `search` function passing in the value of `current`
4. Return the array

For DFS, there are actually three ways to perform the operation! As we see in the gif above, these are called Pre-order, In-order and Post-order. To see the differences between these three, you can read more [here](https://en.wikipedia.org/wiki/Tree_traversal#Depth-first) and [here](// http://datastructuresnotes.blogspot.com/2009/02/binary-tree-traversal-preorder-inorder.html
)

### Breadth First Search for a Tree (BFS)

[Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) (BFS) is a strategy for searching in a tree in level order. BFS begins at a root node and inspects all the neighboring nodes. Then for each of those neighbor nodes in turn, it inspects their neighbor nodes which were unvisited, and so on. This is commonly implemented with a queue.

Here is an example of BFS in a tree:

![http://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif](http://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif)

Here is some potential step by step pseudo code for implementing BFS (with a return value of an array of all the nodes - this can also be done with a callback for additional functionality)

1. Create an array called `data` to store our results
2. Create a variable called `node` and set its value to be the root
3. Add this variable to your queue
4. Loop through your queue (as long as there is something in it)-
    - remove the first item in your queue (remember it is a FIFO structure)
    - push into the `data` array the value what has been dequeued
    - if there is a node to the left, add that node to the queue
    - if there is a node to the right, add that node to the queue
5. Return the array of data

> Check it out [here](http://visualgo.net/bst.html)!

### BFS or DFS?

Which is better? From [Stack Overflow](http://stackoverflow.com/questions/3332947/when-is-it-practical-to-use-dfs-vs-bfs):

> That heavily depends on the structure of the search tree and the number and location of solutions (aka searched-for items). If you know a solution is not far from the root of the tree, a breadth first search (BFS) might be better. If the tree is very deep and solutions are rare, depth first search (DFS) might take an extremely long time, but BFS could be faster. If the tree is very wide, a BFS might need too much memory, so it might be completely impractical. If solutions are frequent but located deep in the tree, BFS could be impractical. If the search tree is very deep you will need to restrict the search depth for depth first search (DFS), anyway (for example with iterative deepening).

### Exercise - Implement DFS
Open the `Exercises/src/trees` folder and run when you run `mocha ../test/trees`, make all the following tests pass:

- `depthFirst` - Traverse a tree using Pre-Order Depth First Search
- This is NOT `Exercises/src/trees/binary-trees/depth_first_search.js` which you should do after reading about special trees.

# Constraining Trees & Special Trees

Trees are a fairly general and flexible data structure. Trees can also have specializations. Trees are given __constraints__ (rules) on how they can behave and these constraints allow us to make powerful assumptions about our data.

## Objectives

* Define binary tree.
* Define binary search tree.
* Define trie.

### Binary Tree

Specializations of trees usually give constraints to nodes and their children. One common constraint is setting a limit on the __number of children__ each node can have. For example, a __binary tree__ is a type of tree where each node can have at maximum 2 children.

[binary tree](https://en.wikipedia.org/wiki/Binary_tree).

![Binary Tree](http://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/tree1.bmp)
> A tree in which each node can have at most 2 children is called a binary tree.

#### Binary Search Trees

In addition to setting limits on __children__ some trees give the __children__ an order. A binary search tree is one example:

![Binary Search Tree](https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg)

> __Try to figure it out__: based on the image, what is special about a binary search tree?

A [binary search tree](https://en.wikipedia.org/wiki/Binary_search_tree) is a special type of binary tree which maintains a __sorted ordering of nodes__. In a __binary search tree__ every node satisfy the following constraints:

* The tree is a __binary tree__.
* Node's can have __left__ and/or __right__ children.
* A left child represents a smaller value than its parent.
* A right child represents a larger value its parent.

This constraint gives the tree a __sorted ordering__. This ordering gives us a nice structure for a very fast search we've already seen, called __binary search__.

To perform binary search in a binary search tree we start at the __root__ node and:

* If the node is the number we're searching for, we did it.
* If we are looking for a smaller number, we follow the left path.
* If we are looking for a larger number, we follow the right path.
* Repeat this process recursively until we are at a __leaf node__ or find the value we are searching for.

#### Practice - Write and Reflect

Answer these questions:

* How does this differ from doing binary search in a sorted Array?
* Binary search is __not__ strictly `O(log(n))` when using a binary search tree, knowing this:
  * Describe a valid binary search tree which would cause the algorithm have an `O(n)` time complexity.
  * Describe an additional constraint on the binary search tree which causes binary search algorithm to always have an `O(log(n))` time complexity.

Using at the binary search tree above:

* Redraw it on a white-board or paper.
* Identify all the numbers in the tree, and write them down in __sorted order__ from lowest to highest.
* Now __label each node__ with it's __position in the ordered list__.
* Can you identify a __pattern__ in the graph to describe how this tree encodes the order?

#### Practice - Implement

Make the `binary_tree.test.js` tests pass.  This assignment will require you to implement a binary tree with the following methods.

- `insertIteratively`: inserts a node in the proper location using iteration
- `insertRecursively`: inserts a node in the proper location using recursion
- `containsIteratively`: checks to see if the tree contains a node iteratively
- `containsRecursively`: checks to see if the tree contains a node recursively
- `findLowest`: finds the lowest value in the tree
- `findHighest`: finds the lowest value in the tree
- `breadthFirstSearch`: traverses through the tree and returns an array of all of the values using Breadth First Search (from left to right) - you can read more about it [here](https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first)
- `DFSPreOrder`: traverses through the tree and returns an array of all of the values using Depth First Search Pre-order - you can read more [here](https://en.wikipedia.org/wiki/Tree_traversal#Depth-first)
- `DFSInOrder`: traverses through the tree and returns an array of all of the values using Depth First Search In-order - you can read more [here](https://en.wikipedia.org/wiki/Tree_traversal#Depth-first)
- `DFSPostOrder`: traverses through the tree and returns an array of all of the values using Depth First Search Post-order - you can read more [here](https://en.wikipedia.org/wiki/Tree_traversal#Depth-first)
- `size `: calculates how many nodes are in the tree (do this without adding a size property to your tree! Use a traversal method to calculate this!)
- `bfs-dfs` : Make all of these tests pass
- `remove`: removes a node from a binary tree. Remember that this method must take into account if the node has any children and if the node is a leaf. [Here](https://www.youtube.com/watch?v=3TOl3Fv4394) is a great video that explains this process.

#### Stretch Goals

- https://github.com/gSchool/maze-solvability
- https://github.com/gSchool/text-tree-parser
- https://github.com/gSchool/csv-to-tree

### Tries

In some Trees, nodes are given meaning by the  __path__ to them from the __root node__. In such trees any __single node__ only encodes one part of the meaning; the data from all the nodes in the __path__ must be combined to extract the complete message.

A __Trie__ is such a tree. In a Trie each __node__ encodes a single letter and each each __path__ represents a word. Because it's true that there is a __single path__ to any one node, it's fair to say that an individual __node__ represents a word, although it only encodes a single letter. Consider this example:

![Trie](http://www.cse.unsw.edu.au/~z5078476/shared/comp1927/html/Pics/tries/trie-example.png)

> A trie which represents several words: aces, ape, apes, app, apply, ear, earl, early, earth, east are all present

A __trie__ is an ordered tree data structure that is used to store strings. It can also be called a digital tree, radix tree, or prefix tree (as they can be searched by prefixes).

A trie is a special tree used for alphabetizing strings. The root represents an empty string, and as you traverse down the tree, each node adds a letter to the word. Each __internal__ (non-leaf) node is said to represent a __prefix__. Each node's prefix tells us what kind of words will follow as children.

![](https://upload.wikimedia.org/wikipedia/commons/b/be/Trie_example.svg)

>As we head to the left, words beginning with a lowercase "t" are displayed. At this point our prefix is "t".  
>
>Consider where you'd place the following words and what the paths to them would be: _Aruba, arguable, initialize, innards, isle, tail, tenant, top._

## Practice -- BONUS

Implement `Exercises/src/trees/tries/trie.js` until it passes the test suite in `Exercises/test/trees/tries/trie.test.js`!

### Bonus Trees

There are __many__ more kinds of trees. Consider researching these trees on your own!

####  AVL Tree

AVL (or height-balanced) binary search tree is any node-based binary search tree that automatically keeps its height (maximal number of levels below the root) small in the face of arbitrary item insertions and deletions

#### B Tree

B-tree is a tree data structure that keeps data sorted and allows searches, sequential access, insertions, and deletions in logarithmic time. Unlike a binary tree, a node in the B-tree can have much more than two children (Comer 1979, p. 123). Unlike self-balancing binary search trees, the B-tree is optimized for systems that read and write large blocks of data. It is commonly used in databases and filesystems to make lookup of data faster.

## Resources

[http://visualgo.net/bst.html](http://visualgo.net/bst.html)

To run the tests for binary trees: run ```mocha test/trees``` from the Exercises folder of the CS curriculum.
