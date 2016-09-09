# Trees

Trees are a common data structure in programming which are hierarchical as opposed to linear. Trees are used to model all sorts of things, many of which you've interacted with already such as filesystems and the HTML DOM in web browsers.

Trees also have powerful specializations, such as Binary Search Trees, which are used to search ordered data; and Tries which are commonly used to encode dictionaries and spell checking algorithms.

## Objectives
* Describe Trees using specific vocabulary.
* Define a binary tree.
* Define and implement binary search tree.
* Define and implement a general Tree in JavaScript
* Implement some basic tree algorithms, specifically:
  * Depth First Search
  * Breadth First Search


## Exercise Repository
- [Tree Exercises](https://github.com/gSchool/computer-science-tree-exercises)


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

## Introduction
We are going to get started with a special case of trees, the binary search tree. The reason we are commencing with a special case, rather than the general solutions, is because it offers constraints that will help us think about the properties of a tree in a clearer manner. After learning about binary trees, we will look at searching through the trees, as well as looking at a general form for trees.


## Binary Trees

Specializations of trees usually give constraints to nodes and their children. One common constraint is setting a limit on the __number of children__ each node can have. For example, a [__binary tree__](https://en.wikipedia.org/wiki/Binary_tree) is a type of tree where each node can have at maximum 2 children.

![Binary Tree](http://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/tree1.bmp)
> A tree in which each node can have at most 2 children is called a binary tree.


## Binary Search Trees

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

### Practice - Discuss and Reflect

Draw examples of the following facts about trees:

* The __height__ of a tree is equal to the longest path from root to leaf.
* In a tree with N nodes, there will always be N-1 edges.
* There is always a __single path__ from the __root node__ to any other node in the tree.

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

### Implementation details
A Binary tree is made of two parts:
- A node, which holds the data, the left child, and right child.
- The tree, which holds the root of the nodes, and holds all the methods to interact with it

### Exercise 1
- Make the tests in `test/binary_search_tree.test.js` pass.
- Create a test for the `remove` method that has been provided.


## Searching Trees

### Depth First Search

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

For DFS, there are actually three ways to perform the operation! As we see in the gif above, these are called Pre-order, In-order and Post-order. To see the differences between these three, you can read more [here](https://en.wikipedia.org/wiki/Tree_traversal#Depth-first) and [here]( http://datastructuresnotes.blogspot.com/2009/02/binary-tree-traversal-preorder-inorder.html
)

### Breath First Search

Breadth-first search](https://en.wikipedia.org/wiki/Breadth-first_search) (BFS) is a strategy for searching in a tree in level order. BFS begins at a root node and inspects all the neighboring nodes. Then for each of those neighbor nodes in turn, it inspects their neighbor nodes which were unvisited, and so on. This is commonly implemented with a queue.

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

## BFS or DFS?

Which is better? From [Stack Overflow](http://stackoverflow.com/questions/3332947/when-is-it-practical-to-use-dfs-vs-bfs):

> That heavily depends on the structure of the search tree and the number and location of solutions (aka searched-for items). If you know a solution is not far from the root of the tree, a breadth first search (BFS) might be better. If the tree is very deep and solutions are rare, depth first search (DFS) might take an extremely long time, but BFS could be faster. If the tree is very wide, a BFS might need too much memory, so it might be completely impractical. If solutions are frequent but located deep in the tree, BFS could be impractical. If the search tree is very deep you will need to restrict the search depth for depth first search (DFS), anyway (for example with iterative deepening).

### Exercise 2
- Make the tests in `test/breadth_first_search.js` pass.
- Make the tests in `test/depth_first_search.js` pass.



## General Trees

Binary trees are a subset of General trees, nodes in general trees can store as many children as needed to model the data. A filesystem and a DOM tree is an example of a tree data structure.

### Implementation details

There are two differences between a binary tree implementation and a general tree implementation.
- Instead of being restricted to two children, a general tree can have as many children as necessary. The child nodes are stored in an array.
- Instead of placing the new node based on the data, as in a binary search tree. When inserting a node in a general tree, you need to specify the data to store and the parent to add it under.



### Exercise 2
- Make the tests in `test/tree.test.js` pass.
- Implement `findBSF()` first.


### Exercise 3 - Employee CSV Tree Parser

Your job is to use the .csv file in the `data` directory to construct a tree of employee hierarchy. The result should be a string, indented appropriately to show the hierarchy.

Store your solution in the `src` folder.

#### Examples

Employee       | Manager
-------------- | ----------
Al Dente       |
Anne Teak      | Al Dente
Barb Dwyer     | Al Dente
Bill Ding      | Barb Dwyer
Chris Cross    | Barb Dwyer
Jay Walker     |
Joy Rider      |
Kenny Penny    | Joy Rider
Les Moore      | Kenny Penny
Lou Pole       | Joy Rider
M. Balmer      | Lou Pole
Sonny Day      | Lou Pole
Tim Burr       | Sonny Day


For the given set of data above, your final result should look like the following:


```
Al Dente
  Anne Teak
  Barb Dwyer
    Bill Ding
    Chris Cross
Jay Walker
Joy Rider
  Kenny Penny
    Les Moore
  Lou Pole
    M. Balmer
    Sonny Day
      Tim Burr
```
