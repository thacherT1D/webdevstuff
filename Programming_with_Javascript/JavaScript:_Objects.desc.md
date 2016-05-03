# Javascript: Objects

## Objectives:

By the end of this lesson you will be able to:

- Create objects.
- Access, set and mutate properties using bracket and dot notation.
- Explain how objects are stored in memory.
- Explain the difference between reference types and primitive types.
- Write and read data from deeply nested objects.

### Objects are key-value pairs

We've gone over `primitive` types now let's go over `reference` types.

Objects are a `reference` type.  We'll talk more about what that means towards the end of the lesson.

Objects start with an open curly brace and end with a closing curly brace, this is known as an `object literal`.

We're going to declare a variable named `person` and set it to an empty object literal:

```javascript
var person = {};
```

Inside of these braces, we store data as key-value pairs.

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

## Object Methods

- [Object MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/)

Similar to arrays, objects have access to default properties and methods. Let's explore the two most frequently used:

- `hasOwnProperty([key])`
- `Object.keys([object])`

### `hasOwnProperty([key])`

- [hasOwnProperty MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasownproperty)

This method accepts a string as a value and returns a Boolean value if that string is a key of an object.

```javascript
var person = {name: "Watson"};

// true
person.hasOwnProperty("name");

// false
person.hasOwnProperty("height");
```

### `Object.keys([object])`

- [keys MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

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

## Reference Types: variable assignment and comparisons with reference types

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

## Reference Types:  Mutability

To reinforce what we're learning about reference types, let's look at one more example.

```javascript
var person = {name: "Matthew"};
var anotherPerson = person;

person.name = "Matt";
anotherPerson.name // ?
```

What's the `name` of `anotherPerson`? The answer is `"Matt"`. `anotherPerson` accessed our object literal and updated the `name` property on it.  When `person` wanted to read the value, it first found the object in memory, noticed that the object had a key named `name`, and retrieved its value.

**You Do:**

- Run the examples provided above comparing reference types to value in the [JS visualizer](http://www.pythontutor.com/javascript.html#mode=edit)
- What differences do you see between reference and value types?
- Play around and try some other snippets of code!


## Review

Javascript **Objects** are:

- A reference type.
- Used to **store items**. Where an item can be *anything*: a number, a string, an object, a function or even another object.
- Objects are **unordered**. Items are not guaranteed to be in any order.
- Objects are **key-value pairs**.
  - A key is used to access and set a value.



Reference types are:

-

## Resources

- [MDN Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [MDN Object Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Javascript Visualizer](http://www.pythontutor.com/javascript.html#mode=edit)


Drawing JS Objects in Memory:

<iframe src="https://player.vimeo.com/video/145447330?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
