# An Introduction to Programming and JavaScript: Objects, Arrays, Iterations
Objectives:
Students will able to...

- 1 of 9: create values for each of the reference types
- 2 of 9: use `instanceof` operator with reference types
- 3 of 9: explain the behavior of `==` and `===` with reference types
- 4 of 9: explain how variable assignments works with reference types
- 5 of 9: use conditional statements with an array and object
- 6 of 9: use iterators with an array and object
- 7 of 9: use native methods of an array and object
- 8 of 9: know how to write a deeply nested array and object
- 9 of 9: know how to read a deeply nested array and object

- As you read through the blocks of code, write what you see in your own words, using your own values and use console.logs 	to view the output to confirm that you wrote the code correctly. Write the code in a .js file and then run the code with node. Example:
```
$ node app.js
```

# 1 of 9: Creating values for each reference type

During [JavaScript: Intro, Types, Values, Variables, Control Flow](/redirects/learning_experiences/68), we learned about one of two types of values in JavaScript: primitive types. Now, we're going to shift our focus to the other types of values: reference types.

Let's use Node and create two of the three reference types found in JavaScript:
- `Array`
- `Object`
- `Function` (on Tuesday)

## Array `[]`

In this section, we're going to learn how to perform CRUD (create, read, update, delete) operations with arrays.

### Create elements

To create an array, we type two characters: an open square bracket and a closing square bracket:

```javascript
[]
```

Similar to primitive types, we need to set our array to a variable if we want to access it at a later time. Let's rewrite the above code with a `var` statement:

```javascript
var myArray = [];
```

The syntax we're using to create our array is referred to as an array literal. To be more specific, our array literal is considered to be an empty array literal. We describe it as empty because arrays are designed to store sequences of data, which include reference types, primitives types, or both.

Let's create an array literal and store four strings inside of it:

```javascript
var myArray = ["Kyle", "Danny", "CJ", "Roberto"];
```

For the syntax to be valid, each value needs to be delimited with commas.

### Read Elements

To access and read each element in the array, we need to use square bracket notation with an index. Indexes are typically Numbers.

```javascript
var myArray = ["Kyle", "Danny", "CJ", "Roberto"];

myArray[0] // "Kyle"
myArray[1] // "Dannyr"
myArray[2] // "CJ"
myArray[3] // "Roberto"
```

Notice that the index starts with `0` and then increments by `1` This sequence gives us a great mental model of an element's index. Moreover, it gives us a glimpse into how an array's elements are stored in memory--as a block.

### Update elements

To update a value stored at a specific index, we need to take a two step process. First, we need to access the desired element. Second, we need to set that element to a new value:

```javascript
var myArray = ["Kyle", "Danny", "CJ", "Roberto"];

myArray[0] = "Ember Dude";
// ["Ember Dude", "Danny", "CJ", "Roberto"];
```

### Delete elements

To delete a value stored at a specific index, we need to use the keyword `delete` with the following syntax:

```javascript
var myArray = ["Kyle", "Danny", "CJ", "Roberto"];

delete myArray[3];
// ["Kyle", "Danny", "CJ", undefined];
```

Notice that `"Roberto"` was removed from our array, but the index for `"Roberto"` still exists. In other words, the keyword `delete` replaces a pre-existing value with `undefined`.  In a latter section, we'll learn how to implement the common task of removing the value and index.

## Object `{}`

Let's now transition to objects, which are created with a syntax that's very different from arrays.

### Create key-value pairs

We're going to declare a variable named `person` and set it to an empty object literal:

```javascript
var person = {};
```

Objects start with an open curly brace and end with a closing curly brace. Inside of these braces, we store data as key-value pairs. The key is similar to an index of an array. The value is similar to a value in an array.

Note three more important differences between objects and arrays:

- The key or value of an object cannot be created without a corresponding key or value.
- The keys of an object must have an explicit and valid identifier (name).
- The key-values of an object are not necessarily stored sequentially in memory.

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

### Create key-value pairs with dot notation or square bracket notation

Let me pose a scenario: Imagine that we declared a variable named `cat` and assigned it an empty object literal. How do we add key-value pairs to `cat`? We have two options: dot notation and square bracket notation.

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

### Read key-value pairs

To read the value of a key-value pair, we need to use dot notation or square bracket notation. Unlike above, we can omit the equality operator and the right operand:

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
	firstName: 'Felix',
	lastName: 'The Cat'
};

var firstName = "Boooo";

cat.firstName  // "Felix"
cat["firstName"]  // "Felix"
cat[firstName] // undefined (analogous to cat["Boooo"])
```

### Update key-value pairs

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

### Delete key-value pairs

Following the previous example, we'll want to delete a key-value pair with the following syntax:

```
var person = {
  firstName: "Bruce",
  lastName: "Wayne"
}

delete person.firstName;

person
// {lastName: "Wayne"}
```

Deleting requires us to include the keyword `delete` in front of a key-value pair. This is similar to how we deleted values of an index with Arrays. Successfully deleting a pre-existing key-value pair will resolve to a Boolean value of `true`. If we delete a non-existing key-value pair, we are returned `undefined`.

#  2 of 9: `instanceof` operator

We now know how to use CRUD operations to create arrays and objects. We also know that both of them can store primitive and reference types. If we use the `typeof` operator, what will it return if we couple `typeof` with an array or object? Let's write some code and view the output:

```javascript
typeof [] // object
typeof {} // object
```

That didn't work! To find out if a value is an Array, we can now use the `instanceof` operator.

```javascript
var people = [];
people instanceof Array // true
people instanceof Object // true

var person = {}
person instanceof Array // false
person instanceof Object // true
```

An Array is just an object in JavaScript. It is an object that comes predefined with many methods and properties.

# 3 of 9: `==` and `===` with reference types

We learned that the double equality operator applies type conversion and the triple equality operator doesn't. When we work with reference types, these differences become irrelevant. There's just one rule to remember with reference types: The return value will be false unless the same reference, not two versions of the same reference, are being compared.

```javascript
// Due to the way object literals are parsed, we need to wrap them in parentheses
[] == [] // false
[] === [] // false
({}) == ({}) // false
({}) === ({}) // false
```

# Variable Assignment with Reference Types

So how do we get a comparison of reference types to return `true`? This really depends on our intention. Reference types are similar to human names and social security numbers. Whenever we create a reference type, it's similar to creating a new human. A human is a human; but each human is unique, and using U.S. standards, receives a unique social security number.

In the previous section, the double and triple equality operator were testing for equality of social security numbers--not humans. If we wanted to test for humans, then there are workarounds. We'll discuss them in the future; for now, let's focus on the social security problem, which is a crucial part of understanding reference types and pointers.

# 4 of 9: Variable assignment with reference types

Picture the following code:

```javascript
var person = {Name: "Danny"};
var anotherPerson = person;

anotherPerson.Name // "Danny"
```

We've used a `var` statement to declare a variable named `person` and set it to an object literal. Next, we used another `var` statement to declare a variable named `anotherPerson` and set it to `person`.

With primitive types, each variable receives their own copy of a value. With reference types, however, they share the same value in memory (pointer). In other words, `person` and `anotherPerson` are two different variables. Since these variables are set to a reference type, they point to the same object--the same person, Danny.

# Mutability of Reference Types

To reinforce what we're learning about reference types, let's work with a slightly more complex code snippet:

```javascript
var person = {Name: "Daniel"};
var anotherPerson = person;

person.Name = "Danny";
anotherPerson.Name // ?
```

What's the `Name` of `anotherPerson`? The answer is `"Danny"`. `anotherPErson` accessed our object literal and added a key-value pair on it.  When `person` wanted to read the value, it first found the object in memory, noticed that the object had a key named `Name`, and retrieved its value.

# 5 of 9: Control structures with conditional statements

Reference types are often used with control structures that involve conditional statements:

- `if`
- `if/else`
- `if/else if/else`
- `switch`

Similar to the way control structures were used with primitive types, a conditional statement (e.g. `if`) gets executed if the value or expression contained in a conditional's parentheses resolves to a `truth-y` value.

Let's create a scenario for using an array with an `if/else` statement: We are developers for a meetup application, and we want to prevent any emails to be sent to meetup attendees unless they allow it:

```javascript
var attendee = {
	allowEmail: false, //I hate emails
	name: "Danny"
}

if (attendees.allowEmail) {
  // send email
} else {
  // do not send email
}
```

Another example would be a program that restricts content based on the user's age.

```javascript
var user = {
	age: 10,
	name: 'Tator Tot'
}
if (user.age < 21) {
	console.log("You are too young to consume alcohol!");
} else {
	console.log("What drink would you like?");
}
```

# 6 of 9: Control structures with iterators

Iterators extend to us the ability to iterate through the keys of an object or elements of an array. To illustrate this point, let's learn how to iterate with arrays and objects with the following iterators:

- `for` loop (arrays)
- `for-in`loop (objects)

### `for` loop (arrays)

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

### `for-in` loop (arrays)

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

# 7 of 9: Native Methods for `Array` and `Object`

## Array

Every array has access to a set of default properties and methods. Instead of exploring all of them now, we're going to explore the three most frequently used:

 - `length`
 - `push([value])`
 - `pop()`

### `length`

The `length` property stores the length of an array.

```javascript
var myArray = [];
myArray.length;  // 0

myArray[0] = "Sherlock";
myArray.length; // 1
```

### `push([value])`

The`push([value])` method enables us to add a value to the end of an array.

```javascript
var myArray = [];

myArray.push("Kyle");
myArray
// ["Kyle"]

myArray.push("Danny");
myArray
// ["Kyle", "Danny"]
```

### `pop()`

The`pop()` method removes the last element of the array. The return value is the item being removed.

```javascript
var myArray = ["Kyle", "Danny", "CJ", "Roberto"]

myArray.pop();
//  "Roberto"
myArray
// ["Kyle", "Danny", "CJ"]

myArray.pop();
//  "CJ"
myArray
// ["Kyle", "Danny"]

myArray.pop();
//  "Danny"
myArray
// ["Kyle"]

myArray.pop();
//  "Kyle"
myArray
// []
```

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
// ["firstName", "lastName]
```

# 8 of 9: Creating Nested Values

In the near future, you'll find yourself working with nested reference types. This describes deeply nested values, such as an array storing objects, which store objects and arrays, which can store more arrays, etc.

```js
var people = [
	{
		name: {
			first: "Danny",
			last: "Fritz"
		},
		age: 26,
		address: {
			country: "USA",
			state: "Colorado"
		},
		favoriteColors: ["blue", "orange"]
	},
	{
		name: {
			first: "Barack",
			last: "Obama"
		},
		age: 54,
		address: {
			country: "USA",
			state: "DC"
		},
		favoriteColors: ["Red", "White", "Blue"]
	}
]

people[1].name.first // "Barack"
people[0].favoriteColors[1] // "orange"
people[1].age // 54
```

# 9 of 9: Reading Nested Values

Reading deeply nested values is a very important technique. If you want to include tweets in one of your future web apps, daily forecasts, or most other data from a third-party source of data, you'll need to know how to read deeply nested data.

For this reason, you need to gain comfort navigating and finding data anywhere in a deeply nested value.

***
Exercise: Take this deeply nested reference type and write the code to find the following values:

1. The email of user 1.
2. The title of user 5.
3. The user id of the first user in the user's array.

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

# Conclusion

We learned about reference types. Combined with our knowledge of primitive types, we now know all the data types used in JavaScript. Awesome!

<iframe src="https://player.vimeo.com/video/145447330?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
