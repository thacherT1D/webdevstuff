# How to stretch on (almost) every exercise

## Standard

This doesn't relate to a single standard.  It's more of a way to get the most out of _any_ piece of code you write.

## Objectives

By the end of this article you should be able to name several different ways you could solve the same problem.

## Rationale

You want to be a badass programmer?  You need to start getting into the higher levels of Bloom's Taxonomy.  In order to get to the "Evaluation" stage you need to have some options to evaluate.  This list provides a number of different "lenses" to look at your code with.  Each one can give you another option that you can later weigh when it comes time to create a new solution.

For example, you could solve something with nested `for` loops, or maybe chained `map` / `reduce`.  In order to be able to evaluate the pros and cons of each, you first have to _know_ how to do both.

## Exercises

As soon as you get all the tests passing for one exercise, cut a new branch.  If you are on `v1`, then run

```
git checkout -b v2
```

Now you have your original code untouched, and can start refactoring on a `v2` branch.

Next pick from the list below.  If you are new to refactoring, start with the top and work down.  Once you are more comfortable, skip some steps and add in your own.

### Start with loops

Loops are simple and perform well and you should have `for` and `while` loops down so well that you can write them using muscle memory.  It's a great place to start, especially when you are on a hard algorithm.

They scale well as you learn other languages because many languages have almost identical loops (Java, C, C#, Objective C, PHP).

### Extract well-named variables

Instead of always referring to elements in an array with brackets, the first step is to refactor them to use nice variable names.  For example:

```js
// with brackets
for (let i = 0; i < owners.length; i++) {
  for (var j = 0; j < owners[i].pets.length; j++) {
    result.push(owners[i].pets[j])
  }
}

// with variables
for (let i = 0; i < owners.length; i++) {
  let owner = owners[i]

  for (var j = 0; j < owner.pets.length; j++) {
    let pet = owner.pets[j]
    result.push(pet)
  }
}
```

Typically if you have an array it's plural, and so the item in that array is the singular version:

- `people` => `person`
- `pages` => `page`

Once you have well-named variables, refactoring to `forEach` becomes very easy.

### Refactor to guard clauses

If you want to return early based on some condition (for example with validation rules) consider using guard clauses:

```js
// normal if statement
function pad(string, maxLength, padString) {
  if (string.length === maxLength) {
    return string
  } else {
    return pad(string + padString, maxLength, padString)
  }
}

// guard clause - same exact logic as above
function pad(string, maxLength, padString) {
  if (string.length === maxLength) return string;
  return pad(string + padString, maxLength, padString)
}
```

### Refactor out unnecessary `if` statements

If you ever return true under some cases, and false under other cases, just return the expression itself:

```js
// normal if statement
if (string.length === maxLength) {
  return true
} else {
  return false
}

// simplified
return string.length === maxLength
```

Guard clauses often go right at the very top of a function in the first few lines.

### Refactor to 5-line methods

In production not every method has to be 5 lines of code.  But it's a great way to see if you can split your code up and encapsulate bits of code into functions.

```js
// one big function
module.exports = function(input) {

  var data = [];
  var lines = input.split('\n');
  for (var i = 0; i < lines.length; i++) {
    data[i] = lines[i].split(',');
  }

  var widths = [];
  for (var i = 0; i < data[0].length; i++) {
    var max = 0;
    for (var j = 0; j < data.length; j++) {
      if (data[j][i].length > max)
        max = data[j][i].length;
    }
    widths[i] = max;
  }

  var output = []

  for (var i = 0; i < data.length; i++) {
    var line = [];
    for (var j = 0; j < data[i].length; j++) {
      var cell = data[i][j];
      var columnWidth = widths[j];
      var rest = columnWidth - cell.length;
      for (var k = 0; k < rest ; k++) {
        cell += " ";
      }
      line[j] = cell;
    }
    output.push('| ' + line.join(" | ") + ' |');

    if (i === 0) {
      var line = [];
      for (var j = 0; j < widths.length; j++) {
        var cell = '';
        for (var k = 0; k < widths[j]; k++) {
          cell += '-';
        }
        line[j] = cell;
      }
      output.push('| ' + line.join(" | ") + ' |');
    }
  }

  return output.join("\n")
}

// with ~5-line functions
module.exports = function(input) {
  var data = splitInput(input)
  var widths = getWidths(data)
  return formatResult(data, widths)
}

function splitInput(data) {
  let result = [], lines = data.split('\n');
  for (var i = 0; i < lines.length; i++) {
    result[i] = lines[i].split(',');
  }
  return result;
}

function getWidths(data) {
  let widths = [];
  for (var i = 0; i < data[0].length; i++) {
    widths[i] = getMax(data, i);
  }
  return widths
}

function getMax(data, i) {
  var max = 0;
  for (var j = 0; j < data.length; j++) {
    if (data[j][i].length > max) max = data[j][i].length;
  }
  return max
}

function makeCell(data, widths, i, j) {
  var cell = data[i][j];
  var columnWidth = widths[j];
  var rest = columnWidth - cell.length;
  for (var k = 0; k < rest ; k++) cell += " ";
  return cell
}

function getSeparators(widths) {
  var line = [];
  for (var j = 0; j < widths.length; j++) {
    line[j] = formatSeparatorCell(widths, j);
  }
  return '| ' + line.join(" | ") + ' |';
}

function formatSeparatorCell(widths, j) {
  var cell = '';
  for (var k = 0; k < widths[j]; k++) cell += '-';
  return cell;
}

function formatLine(data, i, widths) {
  var line = [];
  for (var j = 0; j < data[i].length; j++) {
    line[j] = makeCell(data, widths, i, j);
  }
  return '| ' + line.join(" | ") + ' |'
}

// oh no!! this is 6 lines!!  not the end of the world...
function formatResult(data, widths) {
  var output = []
  for (var i = 0; i < data.length; i++) {
    output.push(formatLine(data, i, widths));
    if (i === 0) output.push(getSeparators(widths));
  }
  return output.join("\n")
}
```

### Refactor to `forEach`

Going from `for` loops to `forEach` is almost entirely mechanical, and it's a great first step:

```js
// before refactoring
for (let i = 0; i < owners.length; i++) {
  let owner = owners[i]

  for (var j = 0; j < owner.pets.length; j++) {
    let pet = owner.pets[j]
    result.push(pet)
  }
}

// with a loop
owners.forEach(function(owner){
  owner.pets.forEach(function(pet) {
    result.push(pet)
  })
})
```

Aaahhh.  Does't that look nice!

### Refactor to other built-in array functions

Once you have nice, compact `forEach` statements, try to really analyze what's happening.  Often times you can replace a `forEach` with another built-in function:

- `map` - returns an array of the same length, with the same order, but with each value transformed
- `filter` - returns an array with the elements that satisfy the conditionals, in the same order as the original
- `every` - returns true if all elements satisfy the conditional
- `some` - returns true if at least one element in the array satisfies the conditional
- `reduce` / `reduceRight` - useful for things like `sum`, array => object (like indexing)
  - HINT: you could implement all of the above functions with just reduce

**`forEach` => `map`**

```js
// with foreach
let result = []
owners.forEach(function(owner){
  result.push(owner)
})
return result

// with map
return owners.map(function(owner){
  return result.push(owner)
})
```

**`forEach` => `filter`**

```js
// with foreach
let result = []
owners.forEach(function(owner){
  if (owner.hasPets) {
    result.push(owner)
  }
})
return result

// with filter
return owners.filter(function(owner){
  return owner.hasPets
})
```

**`forEach` => `every`**

```js
// with foreach
let result = true
owners.forEach(function(owner){
  if (!owner.hasPets) {
    result = false
  }
})
return result

// with every
return owners.every(function(owner){
  return owner.hasPets
})
```

**`forEach` => `some`**

```js
// with foreach
let result = false
owners.forEach(function(owner){
  if (owner.hasPets) {
    result = true
  }
})
return result

// with some
return owners.some(function(owner){
  return owner.hasPets
})
```

**`forEach` => `reduce`**

```js
// with forEach
let result = 0
owners.forEach(function(owner){
  sum += owner.pets.length
})
return result

// with reduce
return owners.reduce(function(sum, owner){
  return sum + owner.pets.length
}, 0)
```

> Moving to reduce is at slight bit harder to see when you are refactoring.  Look to see if it fits another pattern first, then move to reduce.

Here's another, less obvious example:

```js
// with forEach
let result = []
owners.forEach(function(owner){
  owner.pets.forEach(function(pets) {
    result.push(pet)
  })
})
return result

// with reduce
return owners.reduce(function(result, owner){
  return result.concat(owner.pets.map(function(pet) {
    return pet.name
  }))
}, [])
```

**Summary**

Generally speaking you save two lines when you use one of these functions - you lose the bread of the "sandwich" - the initial `let` / `const` / `var` declaration, and also the return at the bottom.

**Warning**

Sometimes these functions are not appropriate.  For example, if you `return` inside a forLoop as soon as you find something, that's performant and nice, and `forEach` and its breathren can't do that, so just use a `for` loop there.

### Refactor multi-step logic into chains

Sometimes your loop does more than one thing at once.  In some cases it's nice to turn that into a chain of simpler commands:

```js
// all in one
let result = 0
for (var i = 0; i < people.length; i++) {
  if (people[i].age > 21) {
    result += people[i].age - 21
  }
}
return result

// chained expressions
return people.map(person => person.age)
             .filter(num => num > 21)
             .map(num => 21 - num)
             .reduce((a,b) => a + b)
```

This is especially nice when combined with the next refactoring - removing anonymous functions.

### Remove all inline anonymous functions

A great way to improve the readability of code is to remove inline anonymous functions with named functions.  You may also find that as you do this, you end up with a small library of functions you end up using in multiple places.

```js
// with inline anonymous functions
function a() {
  return owners.reduce(function(result, owner){
    return result.concat(owner.pets.map(function(pets) {
      result.push(pet)
    }))
  }, [])
}

// with named functions
function a() {
  return owners.reduce(getPetsForOwner, [])
}

function getPetsForOwner(result, owner) {
  return result.concat(owner.pets.map(getName))
}

function getName(item) {
  return item.name
}
```

### Refactor to ES2015

Once you have nice looking code that uses built-in functions on array, consider moving them to ES2015:

```js
// with es5
return owners.reduce(function(result, owner){
  return result.concat(owner.pets.map(function(pets) {
    result.push(pet)
  }))
}, [])

// with es2015
return owners.reduce((result, owner) => {
  return result.concat(owner.pets.map(pet => pet.name))
}, [])
```

### Remove all variables

One fun way to expand your mind is to remove all variables from your code.  You wouldn't really do this in production code necessarily, but it's a fun way to learn how to build code with lots of functions.  Basically, if you need to store a variable to refer to the same value multiple times, you'll need to pass that data into a function so the function can
refer to the parameters.

```js
// with variables
function run(people) {
  const ids = people.map(person => person.id)
  let hobbies = fetchHobbies(ids)
  var wordCloud = generateCloud(hobbies)
  return wordCloud
}

// without variables
function run(people) {
  return generateCloudFromIds(people.map(person => person.id))
}

function generateCloudFromIds(ids) {
  return generateCloud(fetchHobbies(ids))
}
```

### Remove _all_ loops

By this point you've removed all `for` loops, but you are still looping because `forEach`, `map`, `reduce` etc... all use loops under the hood.

Replace each loop (including `slice` etc...) with recursive calls.  This may mean that you have to write several of your own recursive functions to replace loops.

```js
// with loops
function rightPad(string, maxLength, padString) {
  if (string.length >= maxLength) return string
  for (let i = 0; i <= maxLength - string.length; i++) string += padString;
  return string;
}

// with no loops
function rightPad(string, maxLength, padString) {
  if (string.length === maxLength) return string
  return rightPad(string + padString, maxLength, padString)
};

```

### Write things in another language

If you are feeling strong, another way to stretch is to not write in JS at all, but to try these examples in Python, Java, PHP, C# etc...

