# Graphs

Graphs are a very common data structure in computer science. Graphs are common because it's very easy to describe a lot of real world problems in the language of Graph Theory. Maps, networks of friends, word problems, the game of chess, computers on the internet... all of these can be readily modeled as graphs. Because graphs are well studied, once a problem can be described in the language of graphs, we can apply powerful and well known algorithms to answer questions about the problem.

## Objectives

* Define and describe the relationships depicted in a Graph
* Use Graph Theory vocabulary, specifically define the following terms:
  * Node/vertex
  * Edge
  * Directed/Undirected
  * Weighted/Unweighted
* Use Graph Theory Notation, specifically use the following to describe a graph:
  * Ordered pairs
  * Set notation

## Linear Data Structures Recap

So far we've talked about ***linear data structures***:

* Array
* Linked List
* Stack
* Queue

In all these structures, data is arranged in a sequential manner. That is, items in these structures are strictly ordered, and exactly one item follows one other item. If we want to examine every item in one of these data structures we can do so in a "straight line", looking at each item in order.

## Non-linear Data Structures Recap

We've also talked about a ***non-linear data structure***:

* Tree

<img src="https://upload.wikimedia.org/wikipedia/commons/d/da/Binary_search_tree.svg" style="background: white !important" />

A tree is a hierarchical structure. It's easy to see that trees are __not__ linear. In order to examine every element in a tree, we have to travel down more than one path. Consider the example above -- to explore every node we have to go from 8 to 3 as well as from 8 to 10. If this were a linear data structure, we would never have a choice of paths.

Recall that trees have the following properties:

* A tree with N nodes has exactly (N-1) edges
* One edge for each parent/child relationship
* All nodes in a tree have a parent, **except** the root node
* All nodes must be reachable from the root
* There must be exactly one path from the root to a given node

## Graphs

This brings us to graphs. Very much like linked lists and trees, graphs are a collection of nodes. Nodes might represent any kind of information (people in a social network, computers on the internet, the position of pieces in a game of chess) and edges represent a connection between those two pieces of information (two people who are "friends", two computers connected by a network cable, moving a single chess piece to a new position).

Unlike linked lists and trees, there are no rules for how nodes can be connected. In linked lists, each node is connected to its "next" node (and "previous" node in a doubly linked list). In trees a node can __only__ be connected to it's children and it's parent. Not only that, but in trees there must be a single path from the root node to any other node. In graphs any node can be both:

* connected to any node including itself.
* connected any number of nodes, from 0 to `V` (the number of vertices in the graph)

The lack of restrictions makes graphs a flexible data-structure; it's easy to model many real world systems and problems as graphs. This flexibility also introduces complications when writing algorithms to solve graph problems; the lack of restrictions means there are a lot of possibilities to explore.

Here is an image of a graph:

<img height="175" src="http://i.imgur.com/8lvkfF9.png" style="background: white !important">

> A tree is a _type_ of graph with rules dictating the connection between nodes. A Linked List is a type of graph with __even more__ rules restricting the connections between nodes. This graph breaks all the rules for both lists and trees yet is a perfectly valid graph.

## Graph Vocabulary

In order to talk about graphs, we need to define a few key terms.

### Node/Vertex & Edge

* Just like trees, a graph is a collection of objects or entities we call **nodes**, these are also called **vertices**.
* These nodes are connected together with a set of **edges**.

In general, a __node__ or a __vertex__ represents some piece of data, and an edge represents an association between nodes.

### Directed and Undirected Graphs

Edges in graph can be either **undirected** or **directed**. In an __undirected graph__ every __edge__ can be traversed in both directions. In a __directed graph__ every edge can be traversed in only one direction. However, even in directed graphs it can be possible to travel in both directions; consider these two graphs:

<img src="http://www.cprogramming.com/tutorial/computersciencetheory/graph.jpg" style="background: white !important">

> **Undirected**: Connected vertices represent an unordered pair. No arrow. Direction is implied in both directions.

> **Directed**: Connected vertices represent an ordered pair. There is an arrow pointing from one vertex to another.

#### Small Undirected Graph

In this example all the edges are undirected (There are no arrows pointing in either direction).

This means connected vertices can be represented as an unordered pair. Order does not matter, and there is a relationship in both directions.

<img height="175" src="http://i.imgur.com/8lvkfF9.png" style="background: white !important">

#### Small Directed Graph

In this example all the edges are directed. The arrows are pointing in a specific direction, and that direction is the only direction you can travel. For example, in this image, we can go from node 1 to node 2, but not from node 2 to node 1.

<img height="175" src="http://i.imgur.com/aIgNHkF.png" style="background: white !important">

#### A Note About Direction

In a very pedantic sense, direction applies to __edges__ not to __graphs__. Even though this is not strictly required, typically entire graph is either **undirected** or **directed**.

Because it is uncommon to mix directed and undirected __edges__ in a single graph we will only study graphs in which all edges are either directed or undirected. This leaves us with two kinds of __graphs__:

* A graph with all _directed_ edges is called a directed graph or **digraph**
* A graph with all _undirected_ edges is called an **undirected graph**

## Weighted vs Unweighted

So far, we've only seen graphs where each __edge__ has the same __weight__. In such  __unweighted__ graphs, we are only interested in whether a connection between two nodes __exists or not__. In a weighted graph, we assign values to each edge, which typically represents the cost of traveling between two nodes.

Consider these graphs:

<img height="175" src="http://i.imgur.com/aIgNHkF.png" style="background: white !important"> <img height="175" src="http://i.imgur.com/MTZDefT.png" style="background: white !important">

In the graph on the left, the shortest path from node 1 to node 2 is length one (a single edge must be traveled). You can go directly from node 1 to node 2. You can also travel from 1 to 2 on a path with length 3. To do so travel the edges in this order: 1 -> 3 -> 4 -> 2.

In the graph on the right, the shortest path from node 1 to node 2 is still represented by the direct edge; this time the length of that path is 12, because the edge has a __weight__ of 12. The path from 1 -> 3 -> 4 -> 2 is length (-2 + 14 + 9) = 21. Note that instead of counting the number of edges, we sum the __edge weights__.

This added dimension makes our graphs even more flexible.

## Cyclic vs Acyclic

For directed graphs, we can distinguish between __cyclic__ and __acyclic__ graphs. A graph is said to be cyclic if you can get from any one node, back to that same node. Consider the following graph, is it cyclic or acyclic?

<img height="175" src="http://i.imgur.com/aIgNHkF.png" style="background: white !important">

This graph is acyclic, you cannot travel from any one node, back to itself. You can make this graph cyclic by reversing the direction of the edge from  node 1 to node 2. If that edge goes from node 2 to node 1 instead, then you can travel from `1` -> `3` -> `4` -> `2` -> `1`, creating a __cycle__.

By their nature, undirected graphs all have cycles, because you can simple travel along one edge, then follow it back to the original node. A tree is an example of an acyclic graph when you think of the edges as being directed from parent to child.

__Directed Acyclic Graphs__, sometimes called DAGs, have special properties that can be explioted to make some task more efficient.

## Connected vs Disconnected

The final classification of graphs we're introducing is connected vs disconnected graphs. A __connected__ graph is a graph where you cannot divide the nodes into two sub-graphs which have no paths between them. A __disconnected__ graph is a graph made out of two or more sub-graphs which do not have any paths between the sub-graphs. Here is a disconnected graph:

<img height="175" src="http://i.imgur.com/XiVi0vk.png" style="background: white !important">

> This graph is disconnected, there are two sub-graphs which have no paths between them.

The roads in England and The United States can be modeled with a disconnected graph. There are roads in England and there are roads in the USA, but there is no way to drive your car on a road from England to the USA.

## Practice, Describe These Graphs!

<img src="http://upload.wikimedia.org/wikipedia/commons/a/a0/CPT-Graphs-directed-weighted-ex2.svg" style="background: white;" />

Is this graph...

* Directed/Undirected
* Weighted/Unweighted
* Cyclic/Acyclic
* Connected/Disconnected

---

<img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Directed_acyclic_graph.svg" style="background: white;" />

Is this graph...

* Directed/Undirected
* Weighted/Unweighted
* Cyclic/Acyclic
* Connected/Disconnected

## More Practice

Draw a graph on a whiteboard or paper!

* Make sure it is directed, cyclic, connected, and weighted.
* Add or remove edges to make this graph acyclic.
* Add or remove more edges to make it disconnected.

## Graph Theory Notation

In academic writing, especially from mathematics departments, there are established mathematical notations for discussing graphs. Knowing this notation can help you read information about graphs from more varied sources, including academic papers, wikipedia, and more.

#### Representing a Graph

>A graph `G` is a set `V` of vertices and a set `E` of edges. The edges might be a set of ordered, or unordered pairs depending on if the graph is directed or undirected.

`G = (V, E)`

This means, `G` (our graph), is entirely represented by all __vertices__ `V` and all __edges__ `E`. In this case `(V, E)` is called an "ordered pair".

#### Ordered Pairs

> a pair of mathematical objects, in which the order **matters**.

`(V, E)`

Because order matters, `V` is the first object in the pair, and `E` is the second object in the pair. Ordered pairs are typically written with parenthesis to group the two objects. The following is true about __ordered pairs__:

`(a, b) != (b, a)`

`if a != b`

Meaning, as long as `a` and `b` don't represent the same object, then the ordered pair `(a, b)` is not the same as the ordered pair `(b, a)`. We also use this notation to keep track of edges in a directed graph. If we have two nodes `n1` and `n2`, a directed edge from `n1` to `n2` can be written as `(n1, n2)`.

#### Unordered pairs

> a pair of mathematical objects in which order __does not matter__

Unordered pairs are typically written with curly braces. When referring to a group of unordered mathematical objects which are larger than size 2, we use the term __set__:

An "unordered pair": `{a, b} == {b, a}`  
A set: `{a, b, c, d, e} == {d, b, a, c, e}`

We can use set notation to represent the nodes in a graph, and unordered pairs to represent edges in the graph.

## Practice Using These Terms and Notation

#### Draw This Graph

The following notation represents a graph with 3 nodes and 3 edges. Can you draw a representation of this graph?

`G = (V, E)`  
`V = {a, b, c}`  
`E = {{a, b}, {b, c}, {a, c}}`

#### Write this Graph

Consider this graph:

<img height="175" src="http://i.imgur.com/8lvkfF9.png" style="background: white !important">

* Redraw it on paper or a whiteboard.
* What kind of graph is this?
* Label the vertices in the graph from v1 to v6 in your drawing.
  * In __set notation__, list all the vertices.
* Label each __edge__ using an __unordered pair__ of the nodes that it connects.
>For example `{v1, v2}` is an edge that connects the two vertices `v1` and `v2`. It means we can go from `v1` to `v2` and from `v2` to `v1`

#### Write this Graph As Well

Consider this directed graph, which has similar nodes and edges to our previous graph, but where all the __edges__ are __directed__.

<img height="175" src="http://i.imgur.com/aIgNHkF.png" style="background: white !important">

* Redraw it on paper or a whiteboard.
* What kind of graph is this?
* Label the vertices in the graph from v1 to v6 in your drawing.
  * In __set notation__, list all the vertices.
* Label each __edge__ using an __ordered pair__ of the nodes that it connects.
>For example `(v1, v2)` is an edge that connects the two vertices `v1` and `v2`, specifically it means we can travel from `v1` to `v2`, and tells us nothing about whether or not we can travel from `v2` to `v1`.

# Additional Resources

* Read more about graphs from the [Data Science curriculum](https://github.com/gSchool/graphs), which is all in Python!
* [My Code School: Introduction to Graphs](https://www.youtube.com/watch?v=gXgEDyodOJU)
* [Khan Academy: Describing Graphs](https://www.khanacademy.org/computing/computer-science/algorithms/graph-representation/a/describing-graphs)
* [Computer Algorithms: Graphs and their Representation](http://www.stoimen.com/blog/2012/08/31/computer-algorithms-graphs-and-their-representation/)
* [Algorithms 4th Edition](http://algs4.cs.princeton.edu/41graph/)

# Modeling The Real World With Graphs

Like anything in programming, Graph Theory is not particularly useful unless we can use it to solve real problems. This article will present several examples of real world problems which can be modeled using Graph Theory.

## Objectives

* Describe real world situations in the language of Graph Theory.

## A Helpful Process

Graphs are used so commonly because it's easy to model the relationships of things in the real world using graphs. In order to model a problem in the real world as a Graph Theory problem, we need to do 3 things:

1. Decide what a __node__ represents.
2. Decide what an __edge__ represents.
  * Should our edges be directed or undirected?
3. Describe the problem we want to solve in terms of __nodes__ and __edges__.

Lets consider a very real example.

## A Social Network

Social networks are a way of thinking about the connections between people. Lets say we want to use Graph Theory to make recommendations to people about who they should meet.

The first step is deciding what a __node__ represents. In our case each node represents a person. Now that we know what a __node__ represents, we have to decide what it means for two nodes to be connected. For now, lets say that an __edge__ represents friendship between two people. We chose an undirected graph, because a friendship is a mutual relationship (in most cases 😃). We also decided to use unweighted edges, this implies that friendship is boolean: either people are friends or not.

This is a graph representing a group of people, and friendship between them:

![](https://s3.amazonaws.com/ka-cs-algorithms/social_network.png)

> Emily has 5 friends, Frank just has 2...  

> Bonus question: If you were to weight the edges in this graph, what could the weight represent?

### Suggesting Friends

After deciding what __nodes__ and __edges__ represent, we need to decide how to describe our __problem__ in terms of these nodes and edges. First lets form a hypothesis about __people__ then translate that to nodes and edges.

A hypothesis: people are more likely to be friends with people their current friends already know. Think about how to say this in terms of __nodes__ and __edges__. What about the edges between nodes tells us if Audrey's friend already knows someone else in our graph?

One way to express this in graph theory terms would be: nodes with shortest paths between them of length 2 represent the "friend of a friend" relationship. If there was a shortest path 1, then the two nodes would already be friends. A shortest path length 3 is a "friend of a friend of a friend".  Look at how Audrey and Frank are connected:

![](https://s3.amazonaws.com/ka-cs-algorithms/social_network_shortestpath.png)

Frank and Audrey are separated by 3 degrees. Audrey knows Bill; Bill knows Emily; and Emily knows Frank. Maybe Audrey and Emily should be friends, and it's more of a stretch... but maybe Audrey and Frank should be friends as well!

Now we've found the beginnings of an __algorithm__. We could suggest as friends anyone who has a shortest path of length 2 or 3 to the __node__ in question.

Using this rule, when we ask the question "Should Audrey and Frank be friends," in terms of graph theory, we're asking, "Whats the length of the shortest path between Audrey and Frank? Is it less than 2 or 3?".

We might also decide that friendship suggestion requires __more than one__ path between any two people. For example, Emily shares two second degree connections with Gayle -- Emily is friends with Cathy and Bill both of whom are friends with Gayle. Perhaps this is the start of a better __algorithm__...

> Bonus question: We asked about weights on this graph before... What if the edge weight represented __closeness__ of the relationship between two people. How would that impact the two algorithms we suggested?

### Apply Known Algorithms

Once a system is modeled as a graph, a lot of problems can be solved by applying standard algorithms in graph theory. For example, when suggesting friends we realized that the "shortest path" between two nodes was valuable information. Lucky for us there are _many_ known algorithms for computing the shortest path between two nodes, including one you already know: Breadth First Search.

Perhaps our friendship recommendation engine should suggest friends for any two nodes which have a shortest path between them of length 2 (Suggest Emily as a friend for Audrey). Perhaps we should suggest friends if the shortest path is length 3 (Suggest Frank as a friend for Audrey).

Regardless of where we draw the line (2 or 3 degrees to Audrey), clearly the length of the shortest path says something about the strength of the connection between two people. This is fantastic because we can use known algorithms to solve our problem.

In this way programmers have to be creative about modeling the problem, then get to stand on the shoulders of giants to actually *solve* the problem. For example, look at this detailed wikipedia article about all the different ways to tackle the __shortest path__ problem.

[Wikipedia: Shortest Path Problem](https://en.wikipedia.org/wiki/Shortest_path_problem)

Lets look at two more examples of a real world problem, modeled in Graph Theory.

## Interlinked Web Pages

The Internet is a straight-forward option for the application of graph theory.

<img src="http://i.imgur.com/vBOLar6.png" style="height:175px"/>

* A web page with a unique address (URL) is a __node__ in the graph.
* A __directed edge__ represents one web page linking to another.
* This graph is directed, because the relationship between web pages is not mutual.
* If page A links to page B, then it is not always true that page B will have a link to page A.

#### Interlinked Web Pages: Graph Theory

* Web crawlers: follow all links on a page, and store this information.
* Search engines then use this data to provide quick and accurate results against queries.
  * Information like "How many inbound edges does this node have" and "What is the shortest path between two web-pages" provides powerful evidence of relevance and authority for a web-page.
* In graph theory, web crawling would be an example of **graph traversal**, the act of visiting all nodes in a graph
* Like __shortest path__, the problem of __graph traversal__ is well known, and there are good algorithms to solve this problem which you do not have invent from scratch.

## City Network

Maps of real physical locations is another common use of Graph Theory, consider this "map" of cities connected by railroads.

![](https://s3.amazonaws.com/ka-cs-algorithms/undirected_road_map.png)

* Nodes in this graph represent cities.
* Edges represent railroads between cities.
* In this case, the weight is the distance (in miles) between cities along the railroad.
* This graph is undirected, because railroads can be used in either direction.

### Shortest Path Again

In this case, our shortest path is fairly literal. What is the fewest number of miles I can travel by rail from NYC to Reading?

There are several paths we can take, lets examine two which have the same number of cities:
 * New York -> New Haven -> Providence -> Canton -> Weston -> Reading : 255
 * New York -> New Haven -> Hartford -> Sturbridge -> Weston -> Reading : 233

If we were to simply count the number of edges, these two paths  appear to be the same, but if we account for weights (distance), the second path is shorter. If we want __the fewest number of stopovers__ we could ignore the edge weight, but if we're interested in __the fewest number of miles traveled__ we would have to consider the edge weight.

#### Graphs are used to solve a huge swath of problems

We dug into three examples of applied graph theory, but there are so many more:

* Accessible Data Storage (Binary Tree)
* Trees (DOM, XML, etc.)
* Flow Control
* Abstract Syntax Trees (Lexing, JS, etc.)
* Neural Network
etc.

## Practice!

It's possible to use a graph to represent a __game of chess__. Can you think of how you would do that? Answer these questions:

* What does a Node represent?
* What does an Edge represent?
  * Should the edges be weighted?
  * Should edges be directed?
* Is the graph cyclic or acyclic?
* Is the graph connected or disconnected?

# Representing Graphs in Memory

Graphs are an abstract concept. In order to actually write programs using graphs, we have to represent these graphs within the constructs available to us in a programming language like JavaScript or Python.

Unlike the mathematical notation we learned previously, these __concrete__ representations can be used directly by computers. We will present three such concrete representations.

## Objectives

* Define and use the following to represent graphs:
  * Adjacency Matrix
  * Adjacency List
  * Edge List

## Interactive Learning

Visualgo gives us a wonderful tool for drawing graphs and viewing several different ways to represent the graph. Check it out, try and figure out what the three formats presented there represent.

[Visualgo graph tool](http://visualgo.net/graphds)

## Adjacency Matrix

An adjacency matrix is a square matrix (or a square grid if you prefer). Each row represents a node, each column represents a node. The value in `matrix[row][col]` represents the edge between the row node and the column node. Typically a nested array is used to represent the matrix.

### Adjacency Matrix: Undirected, Unweighted Graph

<img src="http://i.imgur.com/yjiu6g3.png" style="height: 300px;background: white;" />

In this image, a 0 represents no connection between two nodes and a 1 represents a connection. Notice that this matrix is symmetrical along the diagonal from top-left to bottom-right. This is because the graph is not directed. If we go from 2 to 1 we can always go from 1 to 2, therefore `matrix[1][2] === matrix[2][1]`. This **must** be true, otherwise the graph could not be undirected.

Instead of 0, some adjacency matrices might represent no connection with `null` or `undefined`.

### Adjacency Matrix: Directed, unweighted.

<img src="http://i.imgur.com/UNrHEtS.png" style="height: 300px;background: white;" />

In this example, going from 1 to 2 is represented at `matrix[1][2]` (the top row, the second column) and has a value of 1. The reverse, going from 2 to 1 is represented at `matrix[2][1]` (the second row, the first column) and has a value of -1. This is an unweighted graph, so -1 isn't a cost -- it's a way to represent the fact that there IS an edge between these nodes, but that it can't be traveled in the 2 to 1 direction.

Some adjacency matrices might not encode that information, choosing to leave `matrix[2][1] === 0` would not be wrong. You cannot travel from node 2 to node 1. What's the advantage and disadvantage of using `-1`?

### Adjacency Matrix: Weighted Directed

<img src="http://i.imgur.com/SIKGgHb.png" style="height: 300px;background: white;" />

In a weighted graph, we store the edge weight instead of 0 or 1. This graph does highlight one danger of the choice to store negative weights to mean that an edge goes the other direction.

To see this weakness, consider the values at `matrix[2][1]` and `matrix[2][4]`. Both have a value of `-1`, but if you look at the picture of the graph its clear that you __can__ go from 2 to 4, but you cannot go from 2 to 1.

Can you think of a way to encode the relationship between `2` and `1` without creating this ambiguity?

#### Practice

Go back to this [Visualgo](http://visualgo.net/graphds) graph. Try each of these steps, but before you do each one try to __predict__  how the __adjacency matrix__ will change with each step.

1. Click the screen 3 times to add 3 nodes.
2. Click a node and drag to another node to create an edge.
  * Make at least 3 new edges.
3. Now, at the top click on the `D/W` to switch to a __directed weighted__ graph and repeat steps 1 and 2.
  * Do this for U/W and D/U as well.
  * How does Visalgo deal with the `-1` ambiguity we pointed out in the matrix above?

## Adjacency List

An adjacency list is a list of lists, or a collection of lists. Each node is given a list of nodes it has an edge to.

### Adjacency List: Unweighted Directed

<img src="http://i.imgur.com/0ro7KHC.png" style="height: 300px;background: white;" />

For each node in the graph, we have a list of it's edges. In JavaScript this graph could be represented with an Object or an Array. Consider these:

Object:
```js
var graphLookup = {
  1: [2,3],
  2: [4],
  3: [4],
  4: [5],
  5: [6],
  6: []
}
```

Array:
```js
var graphList = [
  undefined,
  [2,3],
  [4],
  [4],
  [5],
  [6],
  []
]
```

The only real noteworthy difference is that in the Array version we explicitly set the value at `graphList[0]` to `undefined`. This is because there is no node with a label `0`.

If we want to encode weighted graphs using Adjacency Lists we must use a complex data type, like JSON. For example:

```js
var graphList = [
  [{node: 2, weight: 5}, {node: 3, weight: 14}],
  [{node: 4, weight: 3}]
  // and so on...
]
```

#### Practice

Go back to this [Visualgo](http://visualgo.net/graphds) graph. Try each of these steps, but before you do each one try to __predict__  how the __adjacency list__ will change with each step.

1. Click the screen 3 times to add 3 nodes.
2. Click a node and drag to another node to create an edge.
  * Make at least 3 new edges.
3. Now, at the top click on the `D/W` to switch to a __directed weighted__ graph and repeat steps 1 and 2.
  * Do this for U/W and D/U as well.
  * How does Visalgo deal with the `-1` ambiguity we pointed out in the matrix above?

## Edge Lists

Edge Lists are a way to represent graphs by keeping track of only the edges. In this representation, the list of nodes is *implied* rather than made explicit. Consider our example from before:  

<img height="175" src="http://i.imgur.com/aIgNHkF.png" style="background: white !important">

An edge list for this graph would look like this:

```js
var edgeList = [
  [1,2],
  [1,3],
  [3,4],
  [4,2],
  [4,5],
  [5,6]
]
```

One drawback of edge lists is that it can be very difficult to determine all the nodes. In fact, if you have a graph where a single node has no inbound or outbound nodes, the edge list cannot be used to appropriately encode that information!

If we wish to encode weight data, once again we'd use something like JSON as we did for adjacency lists.

#### Practice

Go back to this [Visualgo](http://visualgo.net/graphds) graph. Try each of these steps, but before you do each one try to __predict__  how the __edge list__ will change with each step.

1. Click the screen 3 times to add 3 nodes.
2. Click a node and drag to another node to create an edge.
  * Make at least 3 new edges.
3. Now, at the top click on the `D/W` to switch to a __directed weighted__ graph and repeat steps 1 and 2.
  * Do this for U/W and D/U as well.
  * How does Visalgo deal with the `-1` ambiguity we pointed out in the matrix above?

## Pointers

The final way we'll present for representing graphs is one you're familiar with already. Representing nodes as Objects and giving each Node a list of edges. This is how we've been representing Trees and Linked Lists, which you now know are simply restricted graphs.

```js
function Node(cityName) {
  this.nodeValue = nodeValue;
  this.edges = [];
}
```

Using this method we can represent the graph as a list of nodes. Once we've added all of the Nodes to an array then this representation is fundamentally an adjacency list. However, for connected graphs it can be possible to use a single __source__ node to represent the graph. we've seen this style of representation for trees using the __root__ node.

#### Practice!

Represent the following graph in JavaScript to using each representation:
* adjacency matrix,
* adjacency list,
* edge list.

![graphdata](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/191/graph-data-01-01.png)

## Complexity of Representations

There are tradeoffs made when deciding how to represent a graph. Using one representation or the other may improve the overall speed of a program using graphs. Lets examine a few common operations for graphs, and their time complexity. We'll also discuss about the __total size complexity__ for representing graphs in different ways.

The basic operations of a graph are:

* Adding an edge
* Deleting an edge
* Answering the question "is there an edge between i and j"
* Finding the successors of a given vertex

Depending on the representation, these operations have different complexities.

## Wait, What's n?

Because graphs have 2 fundamental components, we usually write Big O notation using V (for the number of vertices) and E (for the number of edges).

### Complexity: Adjacency Matrix

* Total Size -- `O(V^2)`
  * Its a square matrix with a row and column for each vertex.
* Adding an edge – `O(1)`
  * Access the edge we want to create with the index values: `matrix[i][j] = 1`
* Deleting an edge – `O(1)`
  * Access the edge we want to create with the index values: `matrix[i][j] = 0`
* Answering the question "is there an edge between i and j" – `O(1)`
  Access the edge we want to create with the index values: `matrix[i][j] = 0`
* Finding the successors of a given vertex – `O(V)`
  * Grab the row representing the vertex, it has `V` entries, one for each possible edge.

Using an adjacency matrix makes most operations very fast, but if you have a lot of vertices it takes quite a lot of space. These are particularly effective when the graph is __dense__ (meaning most nodes are connected to __lots__ of other nodes). If every vertex is connected to every other vertex, other representations will also take `V^2` space.

For __sparse__ graphs - graphs where there are not very many edges - an adjacency matrix is probably not the most efficient option.

### Complexity: Adjacency List

* Total Size -- `O(V+E)`
  * Every vertex gets a list of its own.
  * The maximum size of the inner arrays is the number of edges there are.
  * If there are more of one or the other, the total size is bounded by the bigger of `V` or `E`
* Adding an edge – `O(V)`
  * Constant lookup for the vertex, then in order to not insert duplicates, you must iterate over the list of edges.
* Deleting an edge – `O(V)`
  * Same as adding
* Answering the question "is there an edge between i and j" – `O(V)`
  * Same as adding and deleting
* Finding the successors of a given vertex – `O(V)`
  * same as adding/deleting/finding a single edge.

The reason these are all bounded by the size of V is that in a vertex which has an edge to every other vertex, you would always be traversing a list of size V.

Although all these operations are `O(V)`, it's often the case that the number of outbound edges per vertex is significantly less than `V`. This is an especially effective representation for __sparse__ graphs. It can also be effective when the number of vertices is low, regardless of the __density__ of the graph.

## Complexity: Edge Lists

* Total Size -- `O(E)`
  * vertices aren't directly represented.
  * The exact size of the list is number of edges there are in the graph.
* Adding an edge – `O(E)`
  * In order to not insert duplicates, you must iterate over the list of edges.
* Deleting an edge – `O(E)`
  * In order to find the edge, you must search the whole list.
* Answering the question "is there an edge between i and j" – `O(E)`
  * Same as adding and deleting
* Finding the successors of a given vertex – `O(E)`
  * Only once you've iterated over the whole list can you be sure you've found all the pairs involving a specific node.

Edge lists are a good choice when you have a __sparse__ graph. They shine when there are a huge number of vertices and a relatively small number of edges.

## Practice!

There *are* good reasons to use each of these representations. Try to answer the following questions in your own words. Feel free to use google and other resources to answer these questions.

1. When would an Adjacency Matrix be a good choice for your graph? What features of a graph would signal that you should use an Adjacency Matrix?
1. When would an Adjacency List be a good choice for your graph? What features of a graph would signal that you should use an Adjacency List?
1. When would an Edge List be a good choice for your graph? What features of a graph would signal that you should use an Edge List?

# Searching Graphs

We're going to examine 4 searching algorithms:

* Breadth First Search
* Depth First Search
* Dijkstras Algorithm (also called Uniform Cost Search)
* A* Search

These are 4 different approaches to searching for information on a graph. Two algorithms, BFS and DFS, have been presented before in terms of trees. We have to make small changes in order to deal with __cycles__, which trees do not have.

## Objectives

* Describe and implement the following search algorithms:
  * Breadth First Search
  * Depth First Search

## Breadth-First Search

Breadth-First Search (BFS) is an extremely important algorithm to have in our toolbelt. On unweighted graphs we can use BFS to find the shortest path between any two vertices. Indeed we can use it to track the __minimum distance__ every __vertex__ is from a given __source vertex__.

At it's heart, BFS is a simple process:

1. Create an empty __queue__.
2. __Enqueue__ the __source vertex__ into the queue.
3. While the queue is __not empty__
  1. __Dequeue__ the top vertex from the queue. Call that vertex the __current vertex__.
  2. Test the __current vertex__ to see if it's the __goal vertex__ (and return if it is).
  3. __Enqueue__ all of the neighboring vertices from __current vertex__.

The process of __dequeuing__, __testing__, and __enqueuing__ the __current vertex__'s neighbors is called __visiting__ a vertex.

process involves adding the children of a starting vertex to a __queue__, visiting them, and adding *their* children to the queue. until every vertex is visited.

Consider this example:

![BFS1](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/193/bfs-1-01.png)

> When we visit the source vertex (`0`), we add it's children `1` and `2` to the queue.

Now, we __visit__ the first __vertex__ in our queue. The queue is sometimes called __the frontier__ or __the fringe__.

![BFS2](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/192/bfs-2-01.png)

> In this image we are __visiting__ node `2`, it's children 6, 7, and 3 enter the queue.

### Practice!

Assuming the node you're searching for us node `8`, get a white board and continue to work through the example in the image. Visit each node and update the queue as you go. What's the shortest path from `0` to `8` that BFS finds?

### Explored Set

Did you notice that although `0` and `1` are both neighbors of `2`, both did not reenter the queue when we visited `2`? Abstractly speaking, BFS never "revisits" nodes, because if we're finding a vertex for a second time, we have __previously found__ the shortest path to that vertex.

In practice, this requires programmers to keep track of an __explored vertex set__. Rather than preventing duplicates from entering the queue, we ignore any node we've already added to the __explored__ list.

Consider this updated process for BFS, the new steps 2 and 5 inside our while loop account for this exploration:

1. Create an empty __queue__.
2. __Enqueue__ the __source vertex__ into the queue.
3. While the queue is __not empty__
  1. __Dequeue__ the top vertex from the queue. Call that vertex the __current vertex__.
  2. Test the __current vertex__ to see if it's already been __explored__, if it has `continue` without performing steps 3-5.
  3. Test the __current vertex__ to see if it's the __goal vertex__ (and return if it is).
  4. __Enqueue__ all of the neighboring vertices from __current vertex__.
  5. Add the __current vertex__ to the __explored__ set.

### Sample Code

Here is some JavaScript that could implement BFS. (Note that we are making assumptions about a `Queue` data structure, and assuming that we're using an __adjacency list__ similar to how we have represented Trees):

```js
// We assume a number of these nodes have been created
// already.
function Node(value, neighbors) {
  this.neighbors = neighbors; // this is an array
  this.value = value;
}

function bfs(sourceNode, destinationNode) {
  let frontier = new Queue();
  let explored = new Set();

  let queueObj = {
    node: sourceNode,
    path = []
  };

  frontier.enqueue(queueObj);

  // Search until we're out of nodes
  while(frontier.size() > 0) {
    let currentQueueObj = frontier.dequeue();
    let curNode = currentQueueObj.node;
    let curPath = currentQueueObj.path;

    // Found a solution, return the path.
    if(curNode === destinationNode) {
      return curPath;
    }
    else if(explored.has(curNode)) {
      continue;
    }

    for(let i = 0; i < curNode.neighbors.length i++) {
      let newNode = curNode.neighbors[i];
      let newPath = curPath.slice();
      newPath.push(curNode);

      // We use this format so we can track the path
      let newQueueObj = {
        node: newNode,
        path: newPath
      }

      // If the new node isn't a solution, add it to the queue and search more.
      frontier.enqueue(newQueueObj);
    }

    explored.add(curNode);
  }

  // No solution.
  return null;
}
```

> Remember this sample code is just a starting place, you'll have to change this code to fit the implementation details of your graph!

## Depth First Search

DFS is a sister algorithm to BFS. The concept and implementation are both *very* similar.

Conceptually:

* In BFS we explore nodes in the order that we find them.
* In DFS we always explore the most recently found node.

Implementation:

* In BFS the __frontier__ is a __queue__.
* In DFS the __frontier__ is a __stack__.

This small change does introduce one crucial difference between the algorithms: breadth first search will always find the shortest path between two nodes on unweighted graphs. Depth first search is not guaranteed to find the shortest path between two nodes.

So our process now looks like this:

1. Create an empty __stack__.
2. __Push__ the __source vertex__ into the stack.
3. While the stack is __not empty__
  1. __Pop__ the top vertex from the stack. Call that vertex the __current vertex__.
  2. Test the __current vertex__ to see if it's already been __explored__, if it has `continue` without performing steps 3-5.
  3. Test the __current vertex__ to see if it's the __goal vertex__ (and return if it is).
  4. __Push__ all of the neighboring vertices from __current vertex__.
  5. Add the __current vertex__ to the __explored__ set.

### Sample Code

Assuming the `Node` constructor from the BFS example is available:

```js
function dfs(sourceNode, destinationNode) {
  // in JS Arrays have push and pop, which behave as we expect a stack to behave.
  let frontier = [];  
  let explored = new Set();

  let queueObj = {
    node: sourceNode,
    path = []
  };

  frontier.push(sourceNode);

  // Search until we're out of nodes
  while(frontier.length > 0) {
    let currentQueueObj = frontier.pop();
    let curNode = currentQueueObj.node;
    let curPath = currentQueueObj.path;

    // Found a solution, return the path.
    if(curNode === destinationNode) {
      return curPath;
    }
    else if(explored.has(curNode)) {
      continue;
    }

    for(let i = 0; i < curNode.neighbors.length i++) {
      let newNode = curNode.neighbors[i];
      let newPath = curPath.slice();
      newPath.push(curNode);

      // We use this format so we can track the path
      let newQueueObj = {
        node: newNode,
        path: newPath
      }

      // If the new node isn't a solution, add it to the queue and search more.
      frontier.push(newQueueObj);
    }

    explored.add(curNode);
  }

  // No solution.
  return null;
}
```

### Practice!

Remember this image from before? Assume we're still starting at `0` and searching for `8`. If we were to use DFS instead of BFS, there are 2 paths from `0` to `8` that might be followed depending on how we break ties when __visiting__ nodes; if we put `7` in the stack first, we'll follow the path including `3`; if we put `3` in the stack first, we'll follow the path involving `7`. In the same vein, we might never explore `1` or `6`.

Simulate a run of DFS on a whiteboard. Follow the path to `8` that includes `3`. Keep track of the stack and explored set.

![DFS1](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/193/bfs-1-01.png)

# Exercise

Now, use what you know to implement some graph theory in JavaScript!

### Graphs in JavaScript

Run the tests in `test/graph` and make them pass.

You'll be updating `Excercises/src/graph/graph.js` to:

- Calculate the size of the graph
- Calculate the number of edges in the graph
- Calculate the total weight of all nodes in the graph
- Given a value, find all neighbors of the node with the given value
- Given two values, find a path between them (array of nodes)
- Find all nodes in the graph that have no edges connecting them

# Advanced Searching Algorithms

BFS and DFS are great algorithms, but DFS rarely finds the shortest path, and BFS only finds the shortest path on unweighted graphs. In this section we introduce an algorithm that finds the shortest path for any graph which doesn't have negative edge weights: Dijkstra's Algorithm. We also introduce an algorithm used for searching __very large__ graphs, for instances where we need to cleverly avoid searching paths that are unlikely to yield a solution: A* (pronounced A-Star)

## Objectives

* Describe and implement the following search algorithms:
  * Dijkstra's Algorithm
  * A* Search

## Dijkstra's Algorithm / Uniform Cost Search

BFS is a lovely algorithm, it is sure to find the __shortest path__ on unweighted graphs. When the graph has weighted edges though, the assumption that being the fewest number of edges away from the __source node__ implies the shortest path becomes false, and BFS starts to break. Consider this graph:

![Dijkstras](https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR9z6rVSzjfx_oyJy-YhE-7JlABzxTq3IqBLHJKP57UqlWN3udd)

> Look at the paths between node `3` and node `5`. The path with the __fewest number of edges__ is to go directly there, with a __cost__  of 34. The __shortest path__ though, is to go through node `2`, for a __cost__ of 14 + 4 = 18.

Edsger Dijkstra is a famous computer scientist. He invented an algorithm for finding the shortest path between two vertices on a weighted graph, and named it after himself (though some people call this algorithm Uniform Cost Search). Once again, the process of searching is __very similar__ to BFS and DFS. Instead of processing nodes in the order that we find them(BFS), or always processing the node we most recently found(DFS), we process in order of __lowest minimum distance from the source first__. This means, when picking which node to __visit__ next we have to account for the path we took to __find that node in the first place__ as well as the __edge weight__ to get there.

In implementation we use a data structure called a __priority queue__ instead of a stack or a queue. This data structure is similar to a queue, but instead of processing nodes in a __FIFO__ ordering, we have to provide a __priority__ whenever we __enqueue__. When we __dequeue__ our __priority queue__ returns the entry with the best __priority__.

For unweighted graphs (or graphs where all weights are the same value) Dijkstra's algorithm and BFS have identical behavior. Here is the process for Dijkstra's Algorithm:

1. Create an empty __priority queue__.
2. __Enqueue__ the __source vertex__ into the queue with a __priority__ of 0.
3. While the priority queue is __not empty__
  1. __Dequeue__ the top vertex from the queue. We are call that vertex the __current vertex__, and we also get that node's __priority__, we'll call that __current priority__.
  2. Test the __current vertex__ to see if it's already been __explored__, if it has `continue` without performing steps 3-5.
  3. Test the __current vertex__ to see if it's the __goal vertex__ (and return if it is).
  4. __Enqueue__ all of the neighboring vertices from __current vertex__ with a priority of __current priority__ plus __the weight of the edge to the neighbor__.
  5. Add the __current vertex__ to the __explored__ set.

### Sample Code

```js
// Now we need a class for Edges, to keep track of weight
function Edge(node, weight) {
  this.node = node;
  this.weight = weight;
}

function Node(value, neighbors) {
  this.neighbors = neighbors; // this is an array of Edges now, not Nodes.
  this.value = value;
}

function dijkstraSearch(sourceNode, destinationNode) {
  let frontier = new PriorityQueue(); // We're assuming such a class exists.
  let explored = new Set();

  let queueObj = {
    node: sourceNode,
    cost: 0,
    path = []
  };

  frontier.enqueue(queueObj, queueObj.cost);

  // Search until we're out of nodes
  while(frontier.size() > 0) {
    let currentQueueObj = frontier.dequeue();
    let curNode = currentQueueObj.node;
    let curPath = currentQueueObj.path;
    let curCost = currentQueueObj.cost;

    // Found a solution, return the path.
    if(curNode === destinationNode) {
      return curPath;
    }
    else if(explored.has(curNode)) {
      continue;
    }

    for(let i = 0; i < curNode.neighbors.length i++) {
      let newEdge = curNode.neighbors[i];
      let newPath = curPath.slice();
      newPath.push(curNode);

      // We use this format so we can track the path
      let newQueueObj = {
        node: newEdge.node,
        path: newPath
        cost: newEdge.cost + curCost;
      }

      // If the new node isn't a solution, add it to the queue and search more.
      frontier.enqueue(newQueueObj, newQueueObj.cost);
    }

    explored.add(curNode);
  }

  // No solution.
  return null;
}
```

## A* (A-Star) Search

__A*__ is an extension of Dijkstra's algorithm, typically used in situations where exploring large portions of the graph is unreasonable to do; for example, in extremely large graphs. It's also used when we can make an educated guess about which direction to search for our destination node. Consider this animation of Dijkstra's Algorithm / BFS (because this is an unweighted graph, they behave identically):

![BFS/Dijkstras](https://upload.wikimedia.org/wikipedia/commons/2/23/Dijkstras_progress_animation.gif)

> The green dot is our goal, notice how BFS just expands it's boundary slowly until it eventually reaches the goal. Look at how many locations were explored that clearly do not get us closer to the goal...

On large graphs, all of this wasted time exploring *bad* nodes can lead to a very slow search. __A*__ addresses this issue by applying a __heuristic__. A __heuristic__ is a guess, or an estimate, of how far any given node is from the destination node. We use this heuristic to change the __cost__ value for our __priority queue__.

In the example above we are on a grid, lets assume we know the __location on the grid__ of our destination, but know nothing about the walls. We can use this information to compute a commonly used heuristic called the __Manhattan Distance__. The __Manhattan Distance__ between any two points on a grid is the sum of the number of rows and columns two nodes are off by. For example, if we have two grid locations `(1, 3)` and `(5, 10)` the __Manhattan Distance__ between these nodes is `4 + 7 = 11` because we need to go four rows to get from `1` to `5`, and 7 columns to get from `3` to `10`. If Bob was at location `(1, 3)` and Tammy was at location `(5, 10)` on Manhattan Island, Bob might say, "I am 11 blocks away."

This animation is an example of A* search, using __Manhattan Distance__ as a heuristic:

![A*](https://upload.wikimedia.org/wikipedia/commons/5/5d/Astar_progress_animation.gif)

> Once again the green dot is the goal. Notice how much more whitespace there is when A* finishes, compared to Dijkstra's!

The change from Dijkstra's is minimal -- instead of `cost` as the priority in the priority queue, we use `cost + heuristic`. Here is the complete process for A*:

1. Create an empty __priority queue__.
2. __Enqueue__ the __source vertex__ into the queue with a __priority__ of 0.
3. While the priority queue is __not empty__
  1. __Dequeue__ the top vertex from the queue. We are call that vertex the __current vertex__, and we also get that node's __priority__, we'll call that __current priority__.
  2. Test the __current vertex__ to see if it's already been __explored__, if it has `continue` without performing steps 3-5.
  3. Test the __current vertex__ to see if it's the __goal vertex__ (and return if it is).
  4. Loop over all of the neighboring vertices from __current vertex__:
    1. Compute the __heuristic value__ for the neighbor
    2. __Enqueue__ the neighbor with a priority of __current priority__ plus __the heuristic__ plus __the weight of the edge to the neighbor__.
  5. Add the __current vertex__ to the __explored__ set.

## Sample Code

```js
// Now we need a class for Edges, to keep track of weight
function Edge(node, weight) {
  this.node = node;
  this.weight = weight;
}

function Node(value, neighbors) {
  this.neighbors = neighbors; // this is an array of Edges now, not Nodes.
  this.value = value;
}

function dijkstraSearch(sourceNode, destinationNode) {
  let frontier = new PriorityQueue(); // We're assuming such a class exists.
  let explored = new Set();

  let queueObj = {
    node: sourceNode,
    cost: 0,
    path = []
  };

  frontier.enqueue(queueObj, queueObj.cost);

  // Search until we're out of nodes
  while(frontier.size() > 0) {
    let currentQueueObj = frontier.dequeue();
    let curNode = currentQueueObj.node;
    let curPath = currentQueueObj.path;
    let curCost = currentQueueObj.cost;

    // Found a solution, return the path.
    if(curNode === destinationNode) {
      return curPath;
    }
    else if(explored.has(curNode)) {
      continue;
    }

    for(let i = 0; i < curNode.neighbors.length i++) {
      let newEdge = curNode.neighbors[i];
      let newPath = curPath.slice();
      newPath.push(curNode);

      // compute heuristic could return the Manhattan Distance or some other heuristic value!
      let heuristicValue = computeHeuristic(newEdge.node);

      // We use this format so we can track the path
      let newQueueObj = {
        node: newEdge.node,
        path: newPath
        cost: newEdge.cost + curCost; // NOTE: No heuristic here -- thats correct
      }

      // We only use the heuristic as the value for the priority queue, not the 'cost'.
      frontier.enqueue(newQueueObj, newQueueObj.cost + heuristic);
    }

    explored.add(curNode);
  }

  // No solution.
  return null;
}
```

## Heuristic Admissibility and Suboptimal Search

For `A*` to always return the shortest path between two nodes, the heuristic we use must be __admissible__. This means that the heuristic must be an __exact or under estimate__ of the actual cost of the path from our node to the goal. For grids, the Manhattan Distance always satisfies this condition. Imagine an empty grid with no walls, the shortest path between any two points in this graph __is__ the manhattan distance. Now, if you were to add walls to our grid, you couldn't make the path __shorter__ by adding walls. Now we know that the real path on a grid with walls will cost __at least__ the Manhattan Distance - and most likely it will cost more.

Sometimes, `A*` is intentionally used with an __inadmissible heuristic__. We do this when we don't need an absolutely perfect solution. Sometimes we can get powerful speed-ups and only be off by a small total cost of the path found. Consider this version of A* which uses an inadmissible heuristic:

![Suboptimal](https://upload.wikimedia.org/wikipedia/commons/8/85/Weighted_A_star_with_eps_5.gif)

> There is significantly more whitespace at the end of this search -- but the path we find is not the absolutely shortest one. Often in the real world "good enough" is better than "perfect" if it takes half as long...

## Resources
[Algorithm Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html)
