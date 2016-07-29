# An Introduction to Programming and JavaScript: Arrays, Objects, Iterations

Objectives:

* Create and manipulate arrays and objects
* Explain the difference between object dot notation and bracket notation
* Explain how objects are stored and compared in memory 
* Write for loops and while loops
* Write a for loop to iterate over an array
* Write a for-in loop to iterate over an object
* Describe common native methods for arrays and objects
* Write a deeply nested object
* Read data from a deeply nested object

Now that we've talked about primitive data types, let's discuss the last data type in Javascript: objects. Arrays, functions, and (shocker!) objects are all examples of objects. Objects are sometimes referred to as reference types (to distinguish them from the primitive types that we've seen already). Here we'll discuss arrays and objects as well as delve deeper into functions.

## Arrays 

Arrays describe a set of elements in a particular order. Arrays in Javascript are declared using square brackets. The simplest array is one with nothing in it:

```javascript
var arr = [];
```

The syntax we're using to create our array is referred to as an array literal. To be more specific, our array literal is considered to be an empty array literal. We describe it as empty because arrays are designed to store sequences of data.

Let's create an array literal and store four strings inside of it:

```javascript
var myArray = ["Elie", "Janey", "Matt", "Parker", "Tim"];
```

For the syntax to be valid, each value needs to be delimited with commas.

Note that the above array happened to have all strings in it, but in Javascript it's not necessary that each element in an array have the same type. This array is also perfectly valid:

```javascript
var randomArray = ["hi", 3, null, [1, 2, 3], true, "bye"];
```

**Question**: What are the types of elements in `randomArray` above?

**Question**: Write the array of the names of the people in your group.

### Accessing Elements

To access and read each element in the array, we need to use square bracket notation with an index. Indexes are typically numbers.

```javascript
var myArray = ["Elie", "Janey", "Matt", "Parker", "Tim"];

myArray[0] // "Elie"
myArray[1] // "Janey"
myArray[2] // "Matt"
myArray[3] // "Parker"
myArray[4] // "Tim"
```

Notice that the index starts with `0` and then increments by `1`. We say that arrays are zero-indexed because the first element is at index 0, not at index 1.

**Question**: What will the following code produce?

```javascript
var myArray = ["Elie", "Janey", "Matt", "Parker", "Tim"];
var index = 3;

myArray[3]
```

**Question**: What would happen if I specify `myArray[100]`?

**Question**: What would happen if I specify `myArray[-1]`?

### `length` property

Every array has a `length` property. The `length` property stores the length of an array.

```javascript
var myArray = [];
myArray.length;  // 0

myArray[0] = "Sherlock";
myArray.length; // 1
```

### Updating Elements

To update a value stored at a specific index, we can simply reassign the value at that index.

```javascript
var myArray = ["Elie", "Janey", "Matt", "Parker", "Tim"];

myArray[2] = "Mathematical Matt"

// ["Elie", "Janey", "Mathematical Matt", "Parker", "Tim"]
```

### Iterating over an array

One of the most common things we want to do with an array is iterate over it so that we can look at and use each element in an array. We commonly use a for loop to iterate over an array.

#### `for` loop

Let's first view the code to iterate with arrays:

```javascript
var books = ["JavaScript: The Good Parts", "Eloquent JS", "You Don't Know JS"];

for (var i = 0; i < books.length; i++) {
	var book = books[i];
	console.log(book);
}
// JavaScript: The Good Parts
// Eloquent JS
// You Don't Know JS
```

Imagine that we want to iterate through every element from our array from the first index to the last index. To achieve this goal, we essentially define a four-step process:

1. Declare a variable that represents the first index (`i`) and set its value to the first index (`0`).
2. Write a conditional statement that terminates when we iterated once for each element in the array.
3. We want to increment `i` after every iteration of the `for` loop.
4. During each iteration, we use `i` to access a element in the array.

**Exercise** Write a loop that iterates over the array [1, 2, 3, 4], doubles each element, and stores in back. `[2, 4, 6, 8]` (who do we appreciate?)

**Exercise** Adele is having trouble remembering her own song lyrics. For some reason, all she knows is the word "Hello". Let's help her out.

```
var lines = [
	'It's me.',
	'Can you hear me?',
	'from the other side',
	'from the outside'
];
```

Write a loop that logs to the screen each of her lines with the word "Hello" in front of it.

#### Not just for arrays

You don't need an array in order to write a for loop. Here's an example of a for loop that makes no mention of arrays:

```javascript
for (var i = 1; i < 5; i++) {
  console.log(i);
}

// What will this log to the console??
```

**Question** When might we want to iterate between two numbers?

## Objects 

Let's now transition to objects, which are created with a different syntax.

### Key-value pairs

We're going to declare a variable named `person` and set it to an empty object literal:

```javascript
var person = {};
```

Objects start with an open curly brace and end with a closing curly brace. Inside of these braces, we store data as key-value pairs. The key is similar to an index of an array. The value is similar to a value in an array.

Here's an example of an object literal with one key-value pair:

```javascript
var person = {
  firstName: "Bruce"
}
```

The key-value pair is separated with a colon. The key is written as a variable and the value is written as a desired data type, such as the string `"Bruce"`.

If we store more than one key-value pair, each pair must be separated with a comma. The value of the key-value pairs, as you'll notice, can have a value type of either primitive or reference.

```javascript
var person = {
  firstName: "Bruce",
  lastName: "Wayne",
  favoriteColors: ["black", "yellow"]
 }
```

**Exercise** Create your person object.

### Dot notation vs. square bracket notation (Creation)

Imagine that we declared a variable named `cat` and assigned it an empty object literal. How do we add key-value pairs to `cat`? We have two options: dot notation and square bracket notation.

Dot notation works the following way:

```javascript
var cat = {};
cat.firstName = "Felix";
cat.lastName = "The Cat";

cat
// {firstName: "Felix", lastName: "The Cat"}
```

When using dot notation, the keys are placed after the dot. The corresponding values of the keys become the right operand of the equality operator. One note of caution about the keys: they must be a valid identifier. In other words, they must conform to these rules:

- the name must begin with a `$`, `_`, or alphabet character
- after the first character, any of the above plus numeric characters

In the case that the key isn't a valid identifier (or it is a valid identifier), we may use square bracket notation:

```javascript
var cat = {};
cat["first name"] = "Felix";
cat["last name"] = "The Cat";

cat
// {'first name': 'Felix', 'last name': 'The Cat'}
```

Above, the keys are considered invalid due to the white space in their names. To circumvent this problem, we enclose the invalid identifier in quotation marks. Then, we enclose that string inside of square brackets.

### Dot notation vs. square bracket notation (Access)

To read the value of a key-value pair, we need to use dot notation or square bracket notation:

```javascript
var cat = {};
cat.firstName = "Felix";
cat.lastName = "The Cat";

cat
// {firstName: "Felix", lastName: "The Cat"}

cat.firstName  // "Felix"
cat["firstName"] // "Felix"

cat.lastName // "The Cat"
cat["lastName"] // "The Cat"
```

Notice that we had to use quotation marks with the square bracket notation. If we didn't include the quotation marks, the JavaScript interpreter would mistake `firstName` and `lastName` to be variables that are not associated with the `cat` object. An example will help elaborate this point:

```javascript
var cat = {
	firstName: "Felix",
	lastName: "The Cat"
};

var firstName = "Boooo";

cat.firstName  // "Felix"
cat["firstName"]  // "Felix"
cat[firstName] // undefined (analogous to cat["Boooo"])

var foo = "firstName";
cat.foo // undefined (cat has no value corresponding to the key of foo!)
cat[foo] // "Felix"
```

**Question** How can we get Bruce Wayne's second favorite color?

### Updating key-value pairs

```javascript
var cat = {};
cat.firstName = "Felix";
cat.lastName = "The Cat";
cat
// {firstName: 'Felix', lastName: 'The Cat'}
cat['firstName'] = "Cat";
cat['lastName'] = "Fritz";
cat
// {firstName: 'Cat', lastName: 'Fritz'}
```
**Question** How can we update Bruce Wayne's second favorite color to pink?

### Delete key-value pairs

We can delete a key-value pair with the following syntax:

```
var person = {
  firstName: "Bruce",
  lastName: "Wayne"
}

delete person.firstName;

person
// {lastName: "Wayne"}
```

Deleting requires us to include the keyword `delete` in front of a key-value pair.

### Array checking

Unlike with most primitive data types, the `typeof` operator isn't helpful when trying to distinguish between different objects and arrays, since both are objects in Javascript.

```javascript
typeof [] // object
typeof {} // object
```

As of ES5, there's a simple method you can use to check whether something is an array: `Array.isArray`.

```javascript
Array.isArray([]) // true
Array.isArray({}) // false
```

### `for-in` loop

A `for-in` loop allows your to iterate over each key in an object. Here's the syntax for a `for-in` loop:

```javascript
var person = {
  firstName: "Homer",
  middleName: "Jay",
  lastName: "Simpson",
};

// "Homer"
// "Jay"
// "Simpson"
for (var key in person) {
  console.log(person[key]);
}

// firstName
// middleName
// lastName
for (var key in person) {
  console.log(key);
}
```

Imagine that we want to iterate through every key-value pair in an object named `person`. To achieve this goal, we essentially define a two-step process:

1. Declare a variable that represents the key of an object and associate with an object using the keyword `in`.
2. Access all values of a key using the standard syntax for accessing the values of a key: `person[key]`. If we want to access just the keys, they we can just use the variable we created to represent a key.

## Other Loops

### While loops

A while loop is another way of constructing a loop.  Here is the syntax:

```
while ( /* Boolean expression */ ) {
    Execute code
}
```

Here is an example:

```
var timesForPhrase = 10;
var phrase = prompt("What do you want to say " + timesForPhrase + " times?");

var i = 0;
while (i < timesForPhrase)  {
   console.log(phrase);
   i++;
}

```
### Do-while loop

Related to the while loop is the do-while loop. How do you think these two code blocks are similar? How are they different?

```
// log some squares

var i = 1;
while (i < 10) {
  console.log(i*i);
  i++;
}

// log some squares, another way

var i = 1;
do {
  console.log(i*i);
  i++;
} while(i < 10);
```

### Beware of infinite loops!

Sometimes, you may accidentally write a loop that will never end. This is called an **infinite loop**, and is basically terrible. Here's an example: suppose you want to log the numbers 1 through 10 to the console using a `while` loop, but you forget to increment your index at each step:

```
// Don't paste this into the browser unless you want to force quit Chrome!
var i = 1;
while (i <= 10) {
  console.log(i);
}
```
Why is the above code block problematic?

**Practice:**s

1. Iterate through the array [1, 2, 3, 4] to change the array to [2, 3, 4, 5].
1. Print the numbers 1 to 10 and also the number 10 to 1, side by side.  Do this using a for loop and a while loop. Expected output:

```javascript
1 10
2 9
3 8
4 7
5 6
6 5
7 4
8 3
9 2
10 1
```
1. Write code to print all the odd numbers between 1 and 100. Do this using a for loop and a while loop.
1. Explain what the code below is doing. Why is a `while` loop more suitable than a `for` loop in this case?

```javascript
var total = 0;
var flip = Math.random();
while (flip > 0.5) {
  total++;
  flip = Math.random();
 }
console.log("Number of consecutive times heads came up: " + total);
```

## Variable assignment and comparisons with reference types

Consider the following code:

```javascript
var person = {name: "Matt"};
var anotherPerson = person;

anotherPerson.name // "Matt"
```

We've used a `var` statement to declare a variable named `person` and set it to an object literal. Next, we used another `var` statement to declare a variable named `anotherPerson` and set it to `person`.

With primitive types, each variable receives their own copy of a value. With reference types, however, they share the _same_ value in memory (pointer). In other words, `person` and `anotherPerson` are two different variables. However, since these variables are set to a reference type, they point to the same object.

Note that if we make another person object, even if it has the same keys and values, it will _not_ be equal to the original `person` object:

```javascript
var person = {name: "Matt"};
var anotherPerson = person;
var doppelganger = {name: "Matt"};

person === anotherPerson // true;
person === doppelganger // false;
```

This is because `person` and `doppelganger` have pointers to different objects, even though those objects have identical key-value pairs.

### Mutability of Reference Types

To reinforce what we're learning about reference types, let's look at one more example.

```javascript
var person = {name: "Matthew"};
var anotherPerson = person;

person.name = "Matt";
anotherPerson.name // ?
```

What's the `name` of `anotherPerson`? The answer is `"Matt"`. `anotherPerson` accessed our object literal and updated the `name` property on it.  When `person` wanted to read the value, it first found the object in memory, noticed that the object had a key named `name`, and retrieved its value.

**Question** Do you think changing an object or array passed into a function remain changed once the function completes?

```javascript
function foo(arr) {
  arr[0] = 1;
}

var arr = []
foo(arr);
console.log(foo);
```

## Native Array and Object methods

### Array

Every array has access to a set of default properties and methods. Instead of exploring all of them now, we're going to explore the three most frequently used:

 - `length`
 - `push([value])`
 - `pop()`

### `push([value])`

The`push([value])` method enables us to add a value to the end of an array. `push` returns the length of the modified array.

```javascript
var myArray = [];

myArray.push("Matt");
myArray
// ["Matt"]

myArray.push("Elie");
myArray
// ["Matt", "Elie"]
```

### `pop()`

The`pop()` method removes the last element of the array. The return value is the item being removed.

```javascript
var myArray = ["Elie", "Janey", "Matt", "Parker", "Tim"]

myArray.pop();
//  "Tim"
myArray
// ["Elie", "Janey", "Matt", "Parker"]

myArray.pop();
//  "Parker"
myArray
// ["Elie", "Janey", "Matt"]
```

Here are some other methods that we won't discuss in detail today, but that you'll become more familiar with during your time here:

- [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)
- [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

## Object

Similar to arrays, objects have access to default properties and methods. Let's explore the two most frequently used:

- `hasOwnProperty([key])`
- `Object.keys([object])`

### `hasOwnProperty([key])`

This method accepts a string as a value and returns a Boolean value if that string is a key of an object.

```javascript
var person = {name: "Watson"};

// true
person.hasOwnProperty("name");

// false
person.hasOwnProperty("height");
```

### `Object.keys([object])`

Notice the capital `O` in `Object`. The value in keys is an actual object. This method returns all the keys of an object. Until now, we lacked a convenient way to achieve this task. When used, this method will return each key of an object as an item in an array.

```javascript
var person = {
	firstName: "Bruce",
	lastName: "Wayne"
};

Object.keys(person);
// ["firstName", "lastName"]
```

## Creating Nested Values

In the near future, you'll find yourself working with nested reference types. This describes deeply nested values, such as an array storing objects, which store objects and arrays, which can store more arrays, etc.

```js
var superheroes = [
	{
    name: "Spider-Man",
		alterEgo: {
			first: "Peter",
			last: "Parker"
		},
		age: 15,
		address: {
			country: "USA",
			city: "New York"
		},
		favoriteColors: ["blue", "red"]
	},
	{
    name: "Batman",
		alterEgo: {
			first: "Bruce",
			last: "Wayne"
		},
		age: 32,
		address: {
			country: "USA",
			city: "Gotham"
		},
		favoriteColors: ["black", "yellow"]
	}
]

people[1].alterEgo.first // "Bruce"
people[0].favoriteColors[1] // "red"
people[1].age // 32
```

## Reading Nested Values

Reading deeply nested values is a very important technique. If you want to include tweets in one of your future web apps, daily forecasts, or most other data from a third-party source of data, you'll need to know how to read deeply nested data.

For this reason, you need to gain comfort navigating and finding data anywhere in a deeply nested value.

***
Exercise: Take this deeply nested reference type and write the code to find the following values:

1. The email of user 1.
2. The title of user 5.
3. The user id of the first user in the users array.

```javascript
{
  users:[
    {
      user_id: 1,
      name: "Chris Rivers",
      mention_name: "chris",
      email: "chris@hipchat.com",
      title: "Developer",
      photo_url: "https:\/\/www.hipchat.com\/chris.png",
      last_active: 1360031425,
      created: 1315711352,
      status: "away",
      status_message: "gym, bbl",
      is_group_admin :1,
      is_deleted :0
    },
    {
      user_id: 3,
      name: "Peter Curley",
      mention_name: "pete",
      email: "pete@hipchat.com",
      title: "Designer",
      photo_url: "https:\/\/www.hipchat.com\/pete.png",
      last_active: 1360031425,
      created: 1315711352,
      status: "offline",
      status_message: "",
      is_group_admin: 1,
      is_deleted: 0
    },
    {
      user_id: 5,
      name: "Garret Heaton",
      mention_name: "garret",
      email: "garret@hipchat.com",
      title: "Co-founder",
      photo_url: "https:\/\/www.hipchat.com\/garret.png",
      last_active: 1360031425,
      created: 1315711352,
      status: "available",
      status_message: "Come see what I'm working on!",
      is_group_admin: 1,
      is_deleted: 0
    }
  ]
}
```
***

***
Exercise: How would you access the text "Access me!" from the following object? (Example courtesy of [Desmos.com](http://www.desmos.com)):

```javascript
var graphObject = {
  version:1,
  graph:{
    viewport:{
      xmin:-10,
      ymin:-3.367158671586716,
      xmax:10,
      ymax:3.367158671586716
    }
  },
  expressions:{
    list:[
      {
        id:"1",
        type:"expression",
        latex:"y=x",
        domain:{
          min:0,
          max:1
        },
        hidden:false,
        color:"#C0504D",
        style:"normal"
      }, {
        id:"2",
        type:"expression",
        latex:"y=2x",
        domain:{
          min:0,
          max:1
        },
        hidden:false,
        color:"#4F81BD",
        style:"normal"
      }, {
        id:"4",
        type:"text",
        text:"Access me!"
      }, {
        id:"5",
        type:"expression",
        latex:"",
        domain:{
          min:0,
          max:1
        },
        hidden:false,
        color:"#8064A2",
        style:"normal"
      }
    ]
  }
}
```
***

## Conclusion

We learned about reference types. Combined with our knowledge of primitive types, we now know all the data types used in JavaScript. Awesome!

<iframe src="https://player.vimeo.com/video/145447330?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
