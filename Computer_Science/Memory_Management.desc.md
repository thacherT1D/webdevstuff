# Intro to Memory

### Objectives

* Define and describe the purpose of:
  - Heap
  - Stack
  - Threads
  - Garbage Collection

### What is Memory?
Memory refers to the "working space" a program has available to it to store values and do calculations on those values. When we store strings, arrays, numbers, or objects- these items are kept in a computer's *memory*. There are 4 major memory storage levels- in this article we are concerned with the first two.

1. **Internal Memory**  
This covers stuff like Processor Registers- the individual places that our processor stores small amounts of information in order to do calculations on them. It also covers things like the L0-L4 Caches, which are where larger pieces of information are stored in order to be broken down and operated upon. You can't load an entire array of a few thousand numbers into this kind of storage, it would be broken down and processed in pieces. We're abstracted away from dealing with this by our operating system, but in some lower-level languages (such as COBOL) we have some access to this kind of memory.  
2. **Main Memory**  
Main Memory is the level of abstraction most programmers spend time thinking about. This refers to **RAM** (Random Access Memory) which is sometimes called Volatile Memory because it does not retain the information stored when it's not powered. When your program runs, the variables and files it reads and data it's working with is stored in RAM. RAM is where the **Heap** lives.
3. **Online Mass Storage**  
Today, this might sound like we're referring to a service like Dropbox. In reality, we're actually talking about "removable media", such as hard disks. We're talking about stuff that the processor does not have direct access to because it's not built into the actual main logic board of the computer. Because Hard Disk Drives (**HDDs**) are connected to the main logic board by a cable, they're called Auxiliary Memory. This is a throwback to the days when most programs didn't require more than the working memory of the computer to run. Hard Disks are *Non-Volatile*, so they can keep the data stored on them even when they are not powered.
4. **Offline Bulk Storage**  
This actually does refer to services like Dropbox, but it also refers to databases hosted on another computer, or to a backup service. This kind of storage is not meant to be frequently read or written to, but is only accessed a few times in the course of running the program. You might be thinking, "but I access my database many times when I'm running a webserver", but you access your database several orders of magnitude fewer times than you access locally scoped variables and files from the hard drive. When we refer to something as "offline", what we mean is "we must leave our immediate physical location to access it".


##  Memory Management

JavaScript, Python, Ruby and PHP are all very high level languages. When we say "high level", what we mean is that many things that are manually managed in other languages have been abstracted, and so are handled for you. It's best to understand how these abstractions work, so that you understand what is automatically happening.

One of the biggest things that higher level languages (like JavaScript, Python or Ruby) abstract away is Memory Management. With a language like C or C++, you must manually _allocate_ and _deallocate_ memory as you use it. Memory Allocation really just means that you reserve some space in memory, telling the operating system to reserve that space for your program. Inside of the program, your program has to decide how much space to allocate for any given type of information, because a string is usually much larger than a number. All of these considerations go into managing memory, but in higher level languages these concerns are handled automatically, such as in the following javascript code:

```javascript
var num = 123;
```
In the above JavaScript code, memory is allocated for a number.  But you do not have to write any extra code to make sure that memory exists; this is handled for you.  Additionally, when that memory is no longer needed, it will be automatically removed from your computer.  This process is known as __garbage collection__.

## Garbage Collection

In computer science, garbage collection (GC) is a form of automatic memory management. The garbage collector attempts to reclaim memory occupied by objects that are no longer in use by the program. Garbage collection was invented by John McCarthy around 1959.

Garbage collection is often portrayed as the opposite of manual memory management, which requires the programmer to specify which objects to deallocate and return to the memory system. However, many systems use a combination of approaches, including other techniques such as [stack allocation](https://en.wikipedia.org/wiki/Stack-based_memory_allocation),  [region inference](https://en.wikipedia.org/wiki/Region-based_memory_management) or [automatic reference counting](https://en.wikipedia.org/wiki/Automatic_Reference_Counting). Like other memory management techniques, garbage collection may take a significant proportion of total processing time in a program and can thus have significant influence on performance.

Garbage Collection works by looking through memory for objects that are "reachable" through all of the current stack frames. Local variables in the current execution context, parent contexts, global variables like `window` or `global` and anything allocated in the global stack frame. Anything in memory that doesn't have a way for you to refer back to it (such as through a variable, or in a property, or as a parameter) gets deallocated, and then that memory space can be used by other programs. This process runs approximately every 16ms, and it takes up some of the time and processing resources that your program would normally be using to execute statements.

### Optional Exercise:
[Read this article on JavaScript Memory Profiling](https://developers.google.com/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis). Take a look at your Q1 and Q2 projects and see if you can see any major memory leaks with this tool.

* Using the Memory Profiler, try to find at least one memory leak.
* Write up where the memory leak is occurring, and give an example that can be replicated
* File it as an issue on your Q1 or Q2 project

Note that filing a memory leak issue on your own project shows that you're able to find memory leaks, even if you can't fix them yet. If you're able to fix it, turn the find and the fix into a blog post. This shows very deep knowledge of how JavaScript works, and will really impress potential employers!

#### More on Garbage Collection

- [Garbage Collection in Node.js](https://strongloop.com/strongblog/node-js-performance-garbage-collection/)

- [How does memory management work in JavaScript?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management).  

- [Here's a great video on performance in Javascript, that dives into memory management (advanced).](https://www.youtube.com/watch?v=VhpdsjBUS3g)

## Threads

In computer science, a thread of execution is the smallest sequence of programmed instructions that can be managed independently by a scheduler (typically as part of an operating system). The implementation of threads and processes differs from one operating system to another, but in most cases, a thread is a component of a process. Multiple threads can exist within the same process and share resources such as memory, while different processes do not share these resources - this is known as [multi-threading](https://en.wikipedia.org/wiki/Multithreading_%28computer_architecture%29).

Languages like JavaScript, Python and Ruby don't start off as multithreaded processes, but there are libraries and frameworks to help support that. Objective-C and Swift rely heavily on multithreading for performance reasons.

> If you want to learn more about this, check out this [video](https://www.youtube.com/watch?v=3YD66bHehhQ&list=PLhQjrBD2T380dhmG9KMjsOQogweyjEeVQ&index=48).

## Stack & Heap

Two of the most essential concepts in memory management are the __Stack__ and the __Heap__.

### Stack

The [stack](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)) is the memory set aside as scratch space for a thread of execution.

For example, when a function is called, a block is reserved on the top of the stack for local variables and some bookkeeping data. When that function returns, the block becomes unused and can be used the next time a function is called. The stack is always reserved in a LIFO (last in first out) order; the most recently reserved block is always the next block to be freed. This makes it really simple to keep track of the stack; freeing a block from the stack is nothing more than adjusting one pointer.

### Heap

The [heap](https://en.wikipedia.org/wiki/Heap_(data_structure)) is memory set aside for dynamic allocation. Unlike the stack, there's no enforced pattern to the allocation and deallocation of blocks from the heap; you can allocate a block at any time and free it at any time. This makes it much more complex to keep track of which parts of the heap are allocated or free at any given time; there are many custom heap allocators available to tune heap performance for different usage patterns.

![stack and heap](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/116/stacknheap.png)

> Read [more](http://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap) on StackOverflow.
>
> Read about [whether Javascript allocates memory in the heap or the stack for your variable](http://stackoverflow.com/questions/5326300/garbage-collection-with-node-js/5328761#5328761)


## Pause and Reflect

In your own words, write down the following:

1. What are the 4 levels of memory? Where are they located?

2. If I declare a variable, such as `var x = 5;`, where is that stored? What about `var arr = [3,5,6,73,56];`?

3. If I connect to a database on another computer, what level of memory is that?

4. When does the garbage collector run?

5. What kinds of objects get deallocated by the garbage collector?


## Writing Time!
Consider completing the exercise in the Garbage Collection example above. Using the [JavaScript Memory Profiler](https://developer.chrome.com/devtools/docs/javascript-memory-profiling) is something that more advanced developers use to ensure their applications are performing and aren't leaking memory. It's a process you might get to take part in, and showing you're able to will be an asset in getting hired. Take the time to reflect and write on this critical concept, and try to explain it to yourself as you were before you knew about Garbage Collection.

# Memory Diagrams

## Objectives

By the end of this lesson you should be able to:

- represent "static" objects, arrays, functions and variables in diagrams
- draw a diagram of the _result_ of calling a function
- explain the difference between mutable values and immutable values

## Set the stage

As you get into more complex JavaScript concepts, it's helpful to have a working mental model of how objects in the heap (in RAM) relate to each other.  Once you learn these diagrams, you can use them to help understand new concepts in JavaScript - such as OOP, Angular scopes, prototypal inheritance, and more.

> NOTE!  This is not the type of thing you would do on a job.  These diagrams are for learning purposes only, and once you internalize them, you should no longer need to draw out code.

You'll want a whiteboard or other erasable drawing surface with plenty of space.

No need to fork / clone this.

## Mechanics

### Objects

To start, whenever you see an object, draw it as a _table_ of key / value pairs.

For values, follow these rules:

- Embed immutable values (strings, numbers, booleans) in the table for brevity
- Draw mutable values (objects, and hence arrays, functions etc...) _outside_ the table and just point to them.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/178/ram-diagrams.001.png)

> **Question:** Are mutable values really stored "inside" objects in real life in the heap?

> **Answer:** The answer doesn't really matter.  The main point here is to come up with a "working" mental model of how things look in memory that you can use as a basis to understand other more complex concepts, and this simple notation accomplishes that.

### Arrays

In JavaScript, arrays are just objects with specialized behavior.  Don't believe me?  Run this code:

```javascript
typeof [1,2,3]
```

Which means that representing an array is very simple:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/176/ram-diagrams.002.png)

> **Question:** What about things like `length`?  Shouldn't we include that?

> **Answer:** We're going for a quick notation that can help you deepen your understanding of JavaScript, so no need to add extra complexity to the diagrams.

### Functions

In JavaScript, functions are also special kinds of objects.  They can have properties and prototypes just like any other object.

So like arrays, you can easily represent functions like tables.  In this case, you probably want to label the function as `fn` so it's clear that it's a function, and not a regular object.  If you want to make notes about the contents of the function, add the `body` across the bottom:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/181/ram-diagrams.006.png)

### Variables / Scope

Let's say you have a program that looks like this:

```javascript
var a = "hello"
var b = new Date()
```

What you are doing here is establishing a relationship between two things:

- the _identifiers_ (variable names) - like `a` and `b`

and

- the _values_ - like `"hello"`.

Sound familiar?  Yup - this looks just like an object!

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/177/ram-diagrams.003.png)

But since variables aren't _quite_ as simple as objects, and you can't reference the scope directly, you'll probably want to label that one as "scope" to not be confused.  Same rules apply for objects:

- embed immutable values
- point to mutable values

> **Question:** Whoa... wait a minute.  Scope is pretty hard.  You have your scope, and parent scopes, and `this`... and scope changes whenever you are in a function.  This seems too simplistic and potentially harmful.

> **Answer:** Yes - with all of these representations, there's a risk of oversimplifying in some cases. In general, as you are learning, you'll likely only care about a single scope at a time (like, diagramming the result of a function, or the code inside a function with a few variables...).  Again - these are _not_ accurate representations of how things are _actually_ stored in the JavaScript interpreters - they are a close representation, a learning tool, and a way to help you make sense of the world - at the point where they make it worse, stop using them :)

> As you get into closures and scope chains, this representation will scale nicely.  So yes - scope is a complex subject, but these simple diagrams can take you pretty far.


### Prototypes

Prototypes are an interesting concept.  While there are some ways you can interact with an object's prototype, prototypes are not properties, and you can't manipulate prototypes like you can a property.

So draw a dark line at the bottom to represent prototypes, and an arrow to point to the object's prototype.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/179/ram-diagrams.004.png)

### Putting it all together


![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/377/memory-diagram-example.png)

## Summary

With these basic drawing tools, you should be able to represent even fairly complex, self-referential data structures, and be able to start to _see_ in your head how object references work.

Now you are ready for some [exercises](./03-memory-diagrams-exercises.md)!

# Memory Diagram Practice

### Simple Examples

\#1 - Draw each of the following:

```js
{
  id: 1,
  admin: true,
  roles: ['admin', 'tester'],
  name: function(){ return 'Sue' }
}
```

\#2 - Draw the following, including the scope table:

```js
var a = function () { }
var b = function doWork() { }
```

\#3 - Draw the following:

```js
{
  value: "a",
  next: {
    value: "linked",
    next: {
      value: "list",
      next: null
    }
  }
}
```

### Results of running code

Draw the top-level scope table, and all referenced values after the following code has run:

> HINT!  Your scope table should have 2 entries

```js
var result = index([1,1,2,4,5,5,5])

function index(input) {
  var obj = {}
  for (var i = 0; i < input.length; i++) {
    if (!obj[input[i]]) {
      obj[input[i]] = 0
    }
    obj[input[i]] += 1
  }
  return obj
}
```

## Edge cases

Draw the following, including the scope table:

```js
var first = "Will"
var last = "Will"
var person = {first: first, last: last}
```

Since strings are immutable, you don't really need to _know_ whether it's the same string or not - it won't change the way you program.  For all intents and purposes, the values of the `person` object won't stay in sync with the `first` / `last` variables, because strings are immutable.

# Binary, ASCII, and UTF-8

Let's learn to count, and write like computers!

Computers only use the numbers zero and one. Everything that you see or hear on the computer, every interaction, string, click, scroll and computation is stored using just those two numbers! The zero and one, as it turns out, map very well to true and false, to on and off, to electrical current and no electrical current.

## Objectives
* Define Bits and Bytes
* Convert Decimal to Binary and Hexadecimal Numbers
* Describe UTF-8 and ASCII, including the differences between the two

Since the bits 1 and 0 aren't that useful, they are more often used in 8-bit chunks called bytes.  To see a bunch of random bytes, run this in node:

```js
const crypto = require('crypto')
let bytes = crypto.randomBytes(16)

for (var i = 0; i < bytes.byteLength; i++) {
  let binaryRepresentation = bytes[i].toString(2)
  console.log("0".repeat(8 - binaryRepresentation.length) + binaryRepresentation);
}
```

Numeric values can be represented in any base, though we are most familiar with decimal (using digits 0-9 to represent numbers). Binary represents numeric values with only zero and one.  

If you remember back to grade school a number like `116` was taught as follows:

<table>
  <tr>
    <td>Position</td>
    <td>ten thousands</td>
    <td>thousands</td>
    <td>hundreds</td>
    <td>tens</td>
    <td>ones</td>
  </tr>
  <tr>
    <td>Value</td>
    <td></td>
    <td></td>
    <td>1</td>
    <td>1</td>
    <td>6</td>
  </tr>
</table>

Well, what they didn't explain to you at the time is that this is teaching you decimal representations of numbers. The binary representation of this number looks like this:

<table>
  <tr>
    <td>Position</td>
    <td>one twenty-eights</td>
    <td>sixty-fours</td>
    <td>thirty-twos</td>
    <td>sixteens</td>
    <td>eights</td>
    <td>fours</td>
    <td>twos</td>
    <td>ones</td>
  </tr>
  <tr>
    <td>Value</td>
    <td></td>
    <td>1</td>
    <td>1</td>
    <td>1</td>
    <td>0</td>
    <td>1</td>
    <td>0</td>
    <td>0</td>
  </tr>
</table>

This shows that each "place" in binary represents exactly twice as much value as the preceding place. In decimal each place represents ten times as much value as the preceding place.

#### A small binary example:
The binary value `10`, translates to 2 in decimal ([base 10](https://en.wikipedia.org/wiki/Decimal) is how we think about numbers normally).  `10` represents 2 because the left most value is:
 1 * 2¹ and the 0 is equivalent to 0 * 2⁰. In other words: 10 (binary) = 1 * 2¹ + 0 * 2⁰ = 2 (base 10).

Now you should get the following joke:

> There are 10 types of people in the world, those who understand binary and those who don't.

Another example would be `101` = 1 * 2² + 0 * 2¹ + 1 * 2⁰ = 5 (base 10).

The chart below shows the binary value of 71, `01000111`:

<table>
<tr>
  <td>Position</td>
  <td>2⁷</td>
  <td>2⁶</td>
  <td>2⁵</td>
  <td>2⁴</td>
  <td>2³</td>
  <td>2²</td>
  <td>2¹</td>
  <td>2⁰</td>
</tr>
<tr>
  <td>Amount</td>
  <td>128</td>
  <td>64</td>
  <td>32</td>
  <td>16</td>
  <td>8</td>
  <td>4</td>
  <td>2</td>
  <td>1</td>
</tr>
<tr>
  <td>Binary</td>
  <td>0</td>
  <td>1</td>
  <td>0</td>
  <td>0</td>
  <td>0</td>
  <td>1</td>
  <td>1</td>
  <td>1</td>
</tr>
<tr>
  <td>Count</td>
  <td></td>
  <td>64</td>
  <td></td>
  <td></td>
  <td></td>
  <td>4</td>
  <td>2</td>
  <td>1</td>
</tr>
</table>

With this table in mind:

`01000111 = 64 + 4 + 2 + 1`

`01000111 = 71`

Here is another example

<table>
<tr>
  <td>Binary</td>
  <td>1</td>
  <td>1</td>
  <td>0</td>
  <td>1</td>
  <td>0</td>
  <td>1</td>
  <td>1</td>
  <td>1</td>
</tr>
<tr>
  <td>Count</td>
  <td>128</td>
  <td>64</td>
  <td></td>
  <td>16</td>
  <td></td>
  <td>4</td>
  <td>2</td>
  <td>1</td>
</tr>
</table>

`11010111 = 128 + 64 + 16 + 4 + 2 + 1`

`11010111 = 215`

### What about addition?

What is `10010101 + 11110010?`
<table>
<tr>
<td>Binary One</td>
<td>1</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>0</td>
<td>1</td>
<td>0</td>
<td>1</td>
</tr>

<tr>
<td>Binary Two</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>1</td>
<td>0</td>
<td>0</td>
<td>1</td>
<td>0</td>
</tr>

<tr>
<td>Sum</td>
<td>2</td>
<td>1</td>
<td>1</td>
<td>2</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>
</table>

We now take this sum and multiply the total binary amounts by their respective base 2 amount

<table>
<tr>
<td>Sum</td>
<td>2</td>
<td>1</td>
<td>1</td>
<td>2</td>
<td>0</td>
<td>1</td>
<td>1</td>
<td>1</td>
</tr>

<tr>
  <td>Amount</td>
  <td>128</td>
  <td>64</td>
  <td>32</td>
  <td>16</td>
  <td>8</td>
  <td>4</td>
  <td>2</td>
  <td>1</td>
</tr>

<tr>
<tr>
  <td>Total</td>
  <td>128 * 2</td>
  <td>64 * 1</td>
  <td>32 * 1</td>
  <td>16 * 2</td>
  <td>8 * 0</td>
  <td>4 * 1</td>
  <td>2 * 1</td>
  <td>1 * 1</td>
</tr>
</table>


`10010101 + 11110010` =  `128* 2	 + 64 *1 + 	+  32 *1	+  16* 2	+  8 * 0	+  4 *1	+  2 * 1	 + 1 *1`

`10010101 + 11110010` = `256 + 64 + 32 + 32 + 4 +2 +1`

`10010101 + 11110010` = `391`

Try subtraction! It works too!

# Character Encoding

## ASCII

So computers are really good at processing numbers quickly, but a computer only really understands zeros and ones. What about letters? How do we translate binary into characters? In english we have 26 letters in the alphabet, so we assign these from 0 to 25 and give them binary values! But..that's not enough. What about uppercase letters? To account for these we need an additional 26... and what about special characters? There are 32 of those (you can count them if you don't believe me), and the space bar too.

So where do we start? Do we start from 0? Or 20? or 40? In the early 1960s this was a big issue. Different computer manufactures would use different encoding schemes which made communication extremely difficult. So the American National Standards Institute (ANSI) set out to develop a common scheme, and in 1963 they came out with [ASCII](https://en.wikipedia.org/wiki/ASCII), which was designed as a __7-bit encoding__ - each character is represented by a set of 7 0s or 1s so that we have 2^7 (or 128) possible characters. We go from `0000000` (0) to `1111111` (127) in this scheme.

- 26 - lowercase characters
- 26 - uppercase characters
- 10  - digit characters
- 32 -  punctuation characters
- 1 - space character

So we're at 95... what's left?

So back in days of ASCII development, teletype machines (typewriters used to send messages across a network) were very common. These machines had additional characters to control them (new line key, carriage return key, backspace key, etc.). These characters are called control characters and they make up the rest of the numbers.

Here is what an [ASCII table](http://www.asciitable.com/) looks like

![http://www.asciitable.com/index/asciifull.gif](http://upload.wikimedia.org/wikipedia/commons/d/dd/ASCII-Table.svg)

If you look at the table you can see the that capital letters always have a 0 in the 2^5 spot where lowercase letters always have 1 there. This was intentional and a smart way to distinguish easily between uppercase and lowercase letters

Take 10 minutes (or watch it at double speed and take 5 minutes) to watch the [Tom Scott video on Unicode](https://www.youtube.com/watch?v=MijmeoH9LT4).

**Nice history lesson, but why do I care about this?**

Believe it or not, we use this quite a bit. For example, this is exactly what the `codePointAt()` and `charCodeAt()` methods do in JavaScript! Try typing `"A".codePointAt(0);` in the chrome console and see what you get? Then look up the value in an ASCII table and you will see it corresponds to `01000001`. You can use `codePointAt()` to do manipulation with letters and strings which is very useful!

NOTE: `charCodeAt` is the old version of `codePointAt`, and doesn't work correctly with UTF8 characters, like emojis.

## UTF

Unfortunately, ASCII does not cover a large amount of special characters, so we use a character encoding called [UTF-8](https://en.wikipedia.org/wiki/UTF-8).

UTF-8 has become the dominant character encoding for the World Wide Web, accounting for [87%](http://w3techs.com/technologies/overview/character_encoding/all) of all Web pages as of writing.

Here is what a UTF table looks like - [http://www.utf8-chartable.de/](http://www.utf8-chartable.de/)

> For more, watch the [Tom Scott Video on UTF8](https://www.youtube.com/watch?v=qBex3IDaUbU&index=2&list=PLzH6n4zXuckqmf_xUcvU5caZVoctP2ehL).

## Seeing Binary in Terminal

Want to see the actual binary that the computer sees?  There are a few ways to do it:

**Using `xxd`**

A program ships with Macs called `xxd`.  Here's how to see the binary for "Hello, world" using `xxd` in Terminal:

```
echo "Hello, world" | xxd -b
```

You'll see this:

```
0000000: 01001000 01100101 01101100 01101100 01101111 00101100  Hello,
0000006: 00100000 01110111 01101111 01110010 01101100 01100100   world
000000c: 00001010                                               .
```

What's going on there?

- The first column is a hexidecimal representation of the position of the string
- The middle columns are the binary representations of each character (`01001000` => "H", `01100101` => "e" etc...)
- The last column shows the characters themselves in a human-readable format

How does it go from `01001000` to "H"?  

- Take a minute to calculate the base-10 version of `01001000`
- Now look that value up in the ASCII table above
- You should see that it's a capital "H"

### Seeing binary in JavaScript

Want to see the binary representation of a String in JavaScript?

**binary ⟼ decimal**

If you have a binary string such as `01001000`, JavaScript can convert that to a decimal like so:

```js
parseInt('01001000', 2) // => 72
```

**decimal ⟼ binary**

If you have a decimal, and you want to see what it is in binary, use `toString` with a base:

```js
(45).toString(2) // => '101101'
```

**binary ⟼ string**

If you have a binary string and want to see what UTF8 characters it represents you need to:

- convert it to a decimal (the code point)
- get the string at that code point

```js
String.fromCodePoint(parseInt('11111010010111110', 2))
```

**string ⟼ binary**

If you have a string and want to see what it's representation is in binary you need to:

- get the string's codePoint
- convert the codePoint to binary

```js
"💾".codePointAt().toString(2) // => '11111010010111110'
```

For more information see:

http://xahlee.info/js/js_unicode_code_point.html

## Seeing UTF-8 in action

Want to see the binary behind an emoji in the Terminal??

```
echo 😀 | xxd -b
```

Want to see the binary behind an emoji in JavaScript??

```js
"😀".codePointAt().toString(2)
```

## Exercise

Practice some basic binary math:

### Convert to Decimal, and Hexadecimal
- 10101010
- 1100110
- 11110010

### Addition
- 11111110 + 110011
- 100011 + 11111
- 11 + 110

### Subtraction
- 11000111 - 10000111
- 1110 - 11
- 10001 - 100

### Write a converter

After you've done the above manually, test yourself by writing a [binary-to-decimal converter](../Exercises/src/binary-encoding/binary.js).

## Stretch

- What's the largest binary number you can write with 5 bits? (What about _n_ bits?)
- Try multiplication/divison (*hint:* It's similar to multiplying decimals)

And if you _really_ want to stretch...  Implement `xxd` in Node!!  Write an app that reads in a file and prints output that matches `xxd`'s output.

Here are some things you'd want to know:

- The new `for...of` loop iterates through code points

  ```js
  const input = "😋😌😜"
  for(const c of input) {
    console.log(c.codePointAt().toString(2));
  }
  // will print 3 times
  ```

- To get the hexadecimal representation of the character position, use:

  ```js
  someNumber.toString(16)
  ```

- Make sure to pad your binary strings and hexadecimal strings into octets (8 characters) and don't use [leftpad](http://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/) - write it yourself 🤔

## More resources

- http://monsur.hossa.in/2012/07/20/utf-8-in-javascript.html
- http://www.garlikov.com/Soc_Meth.html
