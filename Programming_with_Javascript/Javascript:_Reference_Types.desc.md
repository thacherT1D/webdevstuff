# Reference Types

***

## Objectives:

- Explain the difference between a reference type and a primitive type.
- Explain how objects are stored in memory.

***

## What is a Reference Type?

Consider the following code:

```javascript
var person = { name: 'Matt' };
var anotherPerson = person;

anotherPerson.name; // 'Matt'
```

We've used a `var` statement to declare a variable named `person` and set it to an object literal.

Next, we used another `var` statement to declare a variable named `anotherPerson` and set it to `person`.

With primitive types, each variable receives their own copy of a value.

With reference types, however, they share the _same_ value in memory (pointer).

In other words, `person` and `anotherPerson` are two different variables. However, since these variables are set to a reference type, they point to the same object.

Note that if we make another person object, even if it has the same keys and values, it will _not_ be equal to the original `person` object:

```javascript
var person = {name: 'Matt'};
var anotherPerson = person;
var doppelganger = {name: 'Matt'};

person === anotherPerson; // true;
person === doppelganger; // false;
```

This is because `person` and `doppelganger` have pointers to different objects, even though those objects have identical key-value pairs.

***

## Mutating Reference Types

To reinforce what we're learning about reference types, let's look at one more example.

```javascript
var person = {name: 'Matthew'};
var anotherPerson = person;

person.name = 'Matt';
anotherPerson.name; // ?
```

What's the `name` of `anotherPerson`? The answer is `'Matt'`. `anotherPerson` accessed our object literal and updated the `name` property on it.  When `person` wanted to read the value, it first found the object in memory, noticed that the object had a key named `name`, and retrieved its value.

**You Do:**

- Run the examples provided above comparing reference types to value in the [JS visualizer](http://www.pythontutor.com/javascript.html#mode=edit)
- What differences do you see between reference and value types?
- Play around and try some other snippets of code!

***

## Review

- Primitive Types: a variable stores the actual value.
  - If multiple variables store the same value, updating one has no effect on the others.

- Reference Types: a variable stores a `reference` to the actual item.
  - If multiple variables store the same reference, updating one effects all the others.

***

## Resources

- [JS visualizer](http://www.pythontutor.com/javascript.html#mode=edit)
- [Drawing JS Objects in Memory](https://workbook.galvanize.com/cohorts/68/articles/3080)
