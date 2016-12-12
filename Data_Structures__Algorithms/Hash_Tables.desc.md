# Objectives

* Explain what a hash table is.
* Implement hash tables in JavaScript using an object.
* Explain how a hash table is stored in memory.
* Identify the time and space complexity for operations on a hash table.
* Implement a variety of problems involving hash tables.

<hr>

## What is a Hash Table?

A hash table is a data structure that maps a set of keys to a set of values.
JavaScript Objects are probably the most familar example of this idea of mapping keys to values.

Hash table is probably the most common name, but it often called by many different names including:

- Hash
- Hash Map
- Map
- Table
- Dictionary
- Associative Array

Many languages have a preference for which one they use, like Hash in Ruby or Dictionary in C#.
So when you start working more with other languages just know that nameing for these data structurs may be different,
but under the hood you are working with the same thing.

### JavaScripts' Hash Table aka Map.

JavaScript itself has an implementation of a hash table, but like others just use a different name; Map.

So what's the different between Objects and Map?

- Objects are created with a prototype that has a whole host of default properties and methods not needed for a hash table.
- Maps too have a host of default properties and methods, but ones specific to hash tables - i.e. `size`, `clear`, `delete`

- Object keys are Strings and Symbols
- Map keys can be any value, including functions, objects, and primitive.

- You can get the size of a Map easily with the size property, while the size of an Object must be determined manually

It's good to know Map is out there,
but for the most part just using POJOs (Plain Old JavaScript Objects) as a hash table is fine and what we will be doing.
Take these factors into consideration if you're curious about when you should use a Map over a POJO.

- Keys are not usually known until run time.
- Keys need to be looked up dynamically.
- All values have the same type and can be used interchangeably.
- You need keys that aren't strings.
- You are regularly adding, removing, checking the existence of key-value pairs - or other built in Map actions.
- The number of key-value pairs is changing regularly.
- You want to be able to iterate over the hash table.

<hr>

## Implement hash tables in JavaScript using an object.

Are you ready for this...???

```
var hashTable = {};
hashTable["bob"] = "wiley";
hashTable["leo"] = "marvin";
```

<details>
  <summary>That's it?</summary>
  ![zomg](http://gph.is/1Kqqghq)
</details>

Checkout the MDN docs for Map in the Resources list below to see its implemention.

<hr>

## How Hash Tables Works

### How Hash Tables are Stored in Memory

A hash table is an array coupled with a hashing function.
You may recall that, provided with an index, lookup for a value in an array is constant, O(1).
Hash tables take advantage of that.
Though using numbers as keys to represent data is not very developer friendly.
We want to be able to use strings, symbols, objects, whatever, in addition to numbers.
This is where a hashing function comes in handy.

### Hashing Function

The implmentation details for these functions can get complex and varey widely among all the languages and libraries that implement them,
but we're going to talk about what is generally going on under the hood.

The input for the hashing function will be a key and the output some hashed value.

If you recall from Q2 how you always got back the same value for a given string when used in a hashing function for passwords,
you will always get back the same value for a given key when used in the hash table's hashing function.
The difference being the format in which the output value is provided.
For hash tables the format will likely be some hexadecimal value as memory address are generally in hexadecimal form,
usually starting with `0x`.
The hash table's hashing function will also know the particular contiguous block of memory that has been alocated to your hash table (array),
and only spit out a hexadecimal value in that range.

Whenever you are trying to *lookup* or *set* a key-value pair on a hashtable you are providing that key to the hashing function.

### Collisions

Since the hashed value for a key is dependent on the value of the key there is no way to enforce that they be sequential.
If you were to reserve a contiguous section of memory from 1-10,
and hash 3 keys to it you might end up with items in blocks 2, 7 and 8.

But what if you had 15 items?
You wouldn't want to dynamically size the hash table, as you would just be reserving blocks of memory that just sit empty.
Instead hash tables sacrifice a tiny amount of speed in favor of conserving memory.
They do this by allowing *collisions*, or assigning multiple key-value pairs to the same location in memory.

When a collision occures there are a couple ways to go about handling it, Liner Probing or Chaining.

#### Liner Probing

With liner probing, when a collision occures the key-value pair will be assigned the next available block of slot in the hash table.
While this solution works, it creates less than optimum scenarios where data can *cluster* together on a hash table,
making for O(n) assignment and lookup times.

#### Chaining

Another option is chaining where the hash table will implement a Linked List for indices where a collision occurs.
Linked Lists also operate on at an O(n) assignment and lookup speed, but don't have the side effect of causing "clustering".
They also generally result in fewer iterations to find the desired data as it is inserted in a more distributed fashion.

<hr>

## Identify the time and space complexity for operations on a hash table.

A hash table has impressive performance characteristics:

- Insertion: O(1) - Constant Time
- Deletion: O(1) - Constant Time
- Accessing a Value (with a Key): O(1) - Constant Time
- Accessing a Value (without key): O(n) - Proportional to number of items
- Space Complexity: O(n) - Proportional to number of items

<hr>

## Implement a variety of problems involving hash tables.

Use a hash table to solve the following code challenges:

1. Write a function, `isAnagram` that takes a single argument of type string and
   returns `true` if the string is an anagram and `false` if it is not.
1. Implement a function to find the first character in a string which only appears once. For example: It returns 'b' when the input is "abaccdeff".
1. Write a function that's given an array of words representing a dictionary and a string that represents a sentence. It will return true, if spellcheck would be satisfied. Assume that all forms of a word are included in the dictionary (walk, walking, walks)

<hr>

#### 📚 Resources
[How Hash Tables Work 🎥](https://www.youtube.com/watch?v=MfhjkfocRR0)
[How Hash Tables Work 2 🎥](https://www.youtube.com/watch?v=h2d9b_nEzoA)
[JS Map - 📖](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
