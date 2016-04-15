# Trees

So far the data structures we have seen are linear and/or sequential data structures that have a logical start and end. These include arrays, linked lists, queues, and stacks. Trees are  used to show hierarchical data (e.g. an organizational tree, a family tree). When you think about trees, visualize them as going upside down with the root at top.

In a tree, a collection of entities called nodes are linked together to simulate a hierarchy. It is a non linear data structure and the top most node in the tree is called the root. Nodes can contain any type of data and may contain a link or reference to other nodes which can be called its children

Some tree vocabulary:

- Root - node at the top of the tree
- Parent - node above a node
- Child - nodes below a node
- Grandparent - parent of parent
- Grandchild - child of child
- Sibling - children of same parent
- Leaf - node that does not have a child
- Internal - node that has a child
- Cousin/Uncle - you get the hint…..
- Ancestor/Descendent - same kind of idea….
- Height - Number of edges in longest path from X to a leaf
- Depth - length of the path from root to node X or number of edges in path from root to node X

Some tree facts:

- Height of a tree = longest path of root to leaf
- Link - connection from a node to another node
- In a tree with N nodes, there will always be N-1 edges.



### So where do we see trees in the real world?

Everywhere! Including:

- The file system on your disk is hierarchical data
- Organizing data for quick search insertion deletion, (BST is O(log n))
- Storing dictionary for spellchecking - Trie
- You can see some more [here](http://stackoverflow.com/questions/577659/real-world-examples-of-tree-structures)

# Binary Tree

* A tree in which each node has at most 2 children

![binary](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/binaryTree.bmp)

## Binary Search Tree (BST)

![binary](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/pix03.bmp)

Provides an efficient way of sorting, searching and retrieving.
**Based on these two differences - what do you think a binary search tree is?**

A special type of binary tree which maintains a sorted ordering of nodes. A binary search tree maintains the property that for any node, the child to its left is a smaller value and the child to its right is a larger value than itself.  The binary search tree sorted ordering gives us a nice structure for very fast search.  Specifically, if we are looking for a value X and there are N nodes, we only have to look at log(N) numbers of nodes on average.

![binary](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/binaryTree.bmp)

![binary](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/pix03.bmp)

Provides an efficient way of sorting, searching and retrieving.

A BST is a binary tree where nodes are ordered in the following way:

* Each node contains one key (also known as data)
* The keys in the left subtree are less then the key in its parent node, in short L < P;
* The keys in the right subtree are greater the key in its parent node, in short P < R;
* Duplicate keys are not allowed.

## BST Insertion

We start at the root and recursively go down the tree searching for a location in a BST to insert a new node. If the element to be inserted is already in the tree, we are done (we do not insert duplicates).

![insert](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/insert.bmp)

## Insertion Complexity

* O(log n)

## BST Search

* Searching in a BST always starts at the root.
* We compare a data stored at the root with the key we are searching for (let us call it as toSearch).
* If the node does not contain the key we proceed either to the left or right child depending upon comparison. If the result of comparison is negative we go to the left child, otherwise - to the right child. The recursive structure of a BST yields a recursive algorithm.

## Search Complexity

Since a binary search tree with n nodes has a minimum of O(log n) levels, it takes at least O(log n) comparisons to find a particular node. Unfortunately, a binary search tree can degenerate to a linked list, reducing the search time to O(n).

## BST Delete

* If the node to be deleted is a leaf node, just delete it
* If a node to be deleted has only one child the procedure of deletion is identical to deleting a node from a linked list - we just bypass that node being deleted

![delete](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/del01.bmp)


## BST Delete

* If a node to be deleted has 2 children, we split a tree into two subtrees
* Then replace the node being deleted with the largest node in the left subtree and then delete that largest node.
* By symmetry, the node being deleted can be swapped with the smallest node in the right subtree.

![tree](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/del02.bmp)

* Delete	O(log n)

Draw a binary search tree by inserting the following numbers from left to right

11, 6, 8, 19, 4, 10, 5, 17, 43, 49, 31

![tree](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/insertEx.bmp)

What does the tree look like after removing 11?

2 Answers:

![answer](https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/deletionEx.bmp)

# Review


What is the recursive definition of a tree?

## Is this a tree?

![wat](https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Directed_graph_with_branching_SVG.svg/153px-Directed_graph_with_branching_SVG.svg.png)

Draw a binary search tree by inserting the following numbers from left to right

22, 3, 44, 5, 16, 8, 99, 24, 33

# Exercise

[In Java](https://github.com/gSchool/computer-science-exercises/blob/master/src/main/java/BinarySearchTree.java)