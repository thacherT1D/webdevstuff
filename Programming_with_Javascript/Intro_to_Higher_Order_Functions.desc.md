A **higher-order function** either accepts a function as an argument or returns a function. The concept of higher-order functions is rooted in mathematics, specifically [lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus).

* [Functions As Values](#functions-as-values)
* [Passing Functions](#passing-functions)
* [Returning Functions](#returning-functions)

We will later learn some pre-built Higher Order Functions that work on Arrays;
for now though, we're going to learn how to make our own!

<hr style="margin: 5rem 0;"/>

## Functions As Values

Higher-order functions are very common in JavaScript but are tricky to wrap your brain around at first. Just remember, in JavaScript, variables can contain a function in the same way they contain a number, string, or other datatype.

For example, when we're passing around numbers we can reassign that value to other variables and use it as if it's the number.

```javascript
var a = 3;
var b = a;
var c = b;
a + b + c; // >> 9
```

The number 3 is referenced by all those variables. We can do the exact same things with functions. Don't overthink it! It's no different.

```javascript
var speak = function (subject, phrase) {
  console.log(subject + ' says: ' + phrase);
}
speak('Sam', 'Frodo!'); // >> Sam says: Frodo!

var say = speak;
say('Frodo', 'Sam!'); // >> Frodo says: Sam!
```

An anonymous function is assigned to the variable `speak`. We then assign the value of `speak` (that is, the anonymous function) to a new variable, `say`. We can now invoke both `speak` and `say` as functions!

<hr style="margin: 5rem 0;"/>

## Passing Functions

Now that we understand functions _are_ values, we can pass them around just like we would other types of parameters. Let's take the following function which takes an array with a number and a string, and then combines them to create a list.

```javascript
function listIt (items) {
  return items[0] + ': ' + items[1];
}

listIt([1, 'Zarya']);
// '1: Zarya'
```

The **function body** of `listIt` is stored in it's own location in memory. The word `listIt` simply references it.

Imagine in our program we sometimes want to do just what the function is doing above while other times we want to apply it to multiple list items. In that case, our input might look like this:

```javascript
var listItems = [
  [ 1, 'Zarya' ],
  [ 2, 'Mei' ],
  [ 3, 'Mercy' ],
];
```

And we want our output to look like this:

```javascript
// [ '1: Zarya', '2: Mei', '3: Mercy' ]
```

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Take a moment to solve this problem with what you know so far. You should not be re-writing the `listIt` function and, instead, should only be writing new code.</p>

  </div>
</div>

We can solve this problem by referencing the `listIt` function within another function or for loop. However, another way to solve this would be to pass the existing `listIt` function into a new function that uses it. You should be able to copy and paste all the code below into your console and get a successful result.

```javascript
var listItems = [
  [ 1, 'Zarya' ],
  [ 2, 'Mei' ],
  [ 3, 'Mercy' ],
];

function listIt (items) {
  return items[0] + ': ' + items[1];
}

function allTheThings (items, listItFn) {
  var result = [];
  for (var i = 0; i < items.length; i++) {
    // `pair` is an array of two items (e.g. [ 2, 'Mei' ])
    var pair = items[i];

    // `formattedAsList` is the two items, formatted (e.g. '2: Mei')
    var formattedAsList = listItFn(pair);

    // Now we take that result and push it into a final array
    result.push(formattedAsList);
  }

  return result;
}

allTheThings(listItems, listIt);
// [ '1: Zarya', '2: Mei', '3: Mercy' ]
```

The function `listIt` is passed in as the second parameter to our new function, `allTheThings`. We then loop over `listItems` and, with each number/string pair, _invoke_ the `listIt` function (within our new function it is called `listItFn`) on the pair. The result of that invocation is then pushed into a new array and returned. We can now list all the things!

This might be cool but... why do we want to do this? Well, let's imagine we also have another function that works with the same number/string pair structure:

```javascript
function markdownImage (items) {
  return '![' +items[1]+ '](./' +items[1]+ '/' +items[0]+ '.png)';
}

markdownImage([4, 'Reinhardt']);
// '![Reinhardt](./Reinhardt/4.png)'
```

Our `allTheThings` function will now work with _either_ `listIt` or `markdownImage`. That means we can all the things... whatever we want!

```javascript
var listItems = [
  [ 4, 'Reinhardt' ],
  [ 2, 'Lucio' ],
  [ 3, 'McCree' ],
];

allTheThings(listItems, markdownImage);
// [ '![Reinhardt](./Reinhardt/4.png)',
//   '![Lucio](./Lucio/2.png)',
//   '![McCree](./McCree/3.png)' ]
```

We now have three very modular functions which can work independent of one another. In fact, that `allTheThings` function is highly generic in that it can really take any kind of function and apply it to all elements in any given array. This process is so useful, we actually have an [official array method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) built into JavaScript.

There are other reasons we want to use Higher Order Functions, but this is just a start! Next, let's return functions from other functions.

<hr style="margin: 5rem 0;"/>

## Returning Functions

Let's rework our `allTheThings` function to use more generic terms:

```javascript
function map (array, callbackFn) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var item = callbackFn(array[i]);
    result.push(item);
  }

  return result;
}
```

Let's imagine we have an array that looks like so and we want to use our `map` function to return a new array with all the values increased by one:

```javascript
var myArray = [10, 20, 30];
// map(myArray) should return [11, 21, 22]
```

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Take a few minutes to write the function described above and pass it into the `map` function. Try not to peak ahead! Remember that the function you're building is for each individual item, not the entire array.</p>

  </div>
</div>

How was building that function? Are you ready? The answer is coming up next!

You likely came up with a function that looks something like this:

```javascript
function addOne (num) {
  return num + 1;
}
```

That will work just fine, but our `addOne` function is not very flexible. What if we wanted a function that would add any number to the result?

Take a look at the following code:

```javascript
function add (num) {
  return function (input) {
    return input + num;
  }
}
```

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>With a partner, read over the code and try and understand what is happening. Consider how you would invoke the `add` function, what it returns, and how you would use it with the `map` function we built above.</p>

  </div>
</div>

When you've finished decoding the above function, move on to the **Higher Order Function Challenge** assigned to this article.
