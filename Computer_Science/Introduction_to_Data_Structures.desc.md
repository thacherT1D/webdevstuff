## Objectives

- Learn the concepts behind data structures and algorithms
- Understand how to implement particular data structures in the language of your choice

## Why does it matter what data structures we use?

A [data structure](https://en.wikipedia.org/wiki/Data_structure) is a way to store and organize data in a computer, so that it can be used efficiently. The key word here is "efficiently". At the end of the day, we are only interested in data structures that are efficient.

So far we've primarily relied upon Arrays and Objects to store values in our programs. These data structures are highly useful and flexible. They also each come with their own benefits even though we _could_ use either data structure to store data.

For example, take the following ordered list of items:

```js
var todos = ['Make breakfast', 'Walk the dog', 'Go to class']
```

We could store this same information as so:

```js
var todos = {
  '0': 'Make breakfast',
  '1': 'Walk the dog',
  '2': 'Go to class'
}
```

For completeness, let's take a look at data we may typically store as an object and transform it into an array:

```js
var animal = {
  kind: 'tiger',
  name: 'tony'
}
var animal = [['kind', 'tiger'], ['name', 'tony']]
```

As developers, we can use any type of data structure to store data. In doing so though we will make it easier or harder to perform certain types of operations. By learning other types of data structures, we can find better and more efficient ways to program.

### Exercise

Take a moment to think about the above cases and what benefits we get from storing information in an array as opposed to an object, and vice versa. Are there any benefits you can see from storing the information in its atypical format?

## How do we use new data structures in JavaScript?

JavaScript has a number of data structures built in natively with the language; however, many coding challenges will you have writing data structures from scratch in order to test your understanding and challenge you. To create new data structures, we can simply define new classes that take in and manage data utilizing the other kinds of data structures we already know!

Take the following:

```js
class MyFirstDataStructure {
  constructor (data) {
    this.data = data
  }

  set (data) {
    this.data = data
  }

  get () {
    return this.data
  }
}

var myStruct = new MyFirstDataStructure('ohai')
myStruct.get()
myStruct.set('bai')
myStruct.get()
```

What an exciting data structure! If we were describe this data structure, we might say it has the following features:

* Can hold one piece of data, of any kind
* That's it

Alright, so maybe it wasn't so exciting; but, once we've created this data structure we can reuse it throughout our project in lieu of other types of data structures.

> **PRO TIP:**
> If you didn't know, you can create arrays and objects in much the same way. Although we're used to declaring them with `[]` and `{}`, try the following:
>
```js
var arr = new Array(10)
console.log(arr)
```

Let's create a data structure that's a bit more interesting. In other languages, arrays are often created with a certain length in mind. If you try and insert data into the array past a certain length, an error is thrown. Before running the following code, read through it and think about what you'd expect to happen.

```js
class RestrictedArray {
  constructor (maxLength) {
    this.maxLength = maxLength
    this.data = []
  }

  get () {
    return this.data
  }

  push (value) {
    if (this.data.length + 1 > this.maxLength) {
      throw new Error('The array is maxed out.')
    } else {
      this.data.push(value)
    }
  }
}

var arr = new RestrictedArray(3)
arr.push(1)
arr.get() // ??
arr.push(2)
arr.get() // ??
arr.push(3)
arr.get() // ??
arr.push(4)
arr.get() // ??
```

What might the use case be for a data structure like this?

### Exercise

Create a new data structure called `LoopyArray`. When it's created, it should take a `maxLength`. A `.push()` method should insert data into an internal array; however, if the length exceeds `maxLength` overwrite the oldest stored value. For example:

```js
var loopy = new LoopyArray(2)
loopy.push(1)
loopy.get() // [1]
loopy.push(2)
loopy.get() // [1,2]
loopy.push(3)
loopy.get() // [3,2]
loopy.push(4)
loopy.get() // [3,4]
```

### Stretch Goal

Writing our `.push()`s on separate lines is so tiring for us lazy programmers. Modify your functions so that you can chain the results together. For example:

```js
var loopy = new LoopyArray(2)
loopy.push(1).push(2).push(3).push(4).get() // [3,4]
```
