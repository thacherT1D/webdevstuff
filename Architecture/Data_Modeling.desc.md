# Objectives

* Explain what is data modeling.
* Explain why we model data.
* Explain what is a data definition.
* Practice defining complex data.
* Describe the guidelines of modeling data?

<hr>

## What is Data Modeling?

Data modeling is a process to define and analyze data based on the requirements needed for your software. When modeling data, we look at two "customers" that we model data for: the stakeholders (the people who own the software) and developers (the people who read and use your code).

<br>

## Why do we Model Data?

Each of your projects is working with data in some way whether your program is managing data from an API, changing a game state, or creating data on its own. As software engineers, we spend a lot of time thinking about the structure of our data before we implement our project. Defining the structure of our data allows us to set expectations on what is the input of our programs and what our programs are supposed to produce as output.

<br>

## What is a Data Definition?

Data Definition describes what the nature and scope of an applications data. It is a human readable description of our data in terms of data types, relations, and structure. If you look at the source code for some large open source projects, or even some of your homework assignments, you may see instructions and explanations on how some code works in the form of comments. This is one way we can share knowledge with other people who use an API. Once we read a, well documented, data definition, we should know how to start working with that data.

```javascript
// A temperature is a number. Its value is in degrees Celsius.
```

```javascript
// A forecast is a nonempty array of temperatures.
```

Specificity is key as we want to keep the expectations clear. For example, we could say that a traffic light is a `string`, but really it can be one of three values.

```javascript
// A traffic light is one of the following:
//   - "stop"
//   - "slow"
//   - "go"
```

Data can be respresented in many different ways. A data definition tells us specifically _how_ the data _needs_ to be described. Take for example a coordinate.

```javascript
// A coordinate is an object of the following format
// {
//   x: NUMBER,
//   y: NUMBER
// }
```
What would be some examples of coordinates using the above data definition? If you were given a variable named `coord` that we said is a coordinate, how would you get its x and y values?

```javascript
// A coordinate is an array of the following format: [x, y]
// where x and y are numbers.
```

What would be some examples of coordinates using the above data definition? If you were given a variable named `coord` that we said is a coordinate, how would you get its x and y values?

<br>
#### 💪 Exercise
Think about what a data definition for representing time on a clock might be. When you feel you have a good idea turn and dicuss it with your neighbor.

<hr>

## Guidelines in Modeling Data

Modeling data can be an incredibly difficult task. There is never one single answer on the proper way to manage data, and often times, the model breaks down over time as we change our software. Here are some guidelines with some examples of how we can model data.

### Start simple

The easiest way to start data modeling is to think about the basic pieces of information you need to save. We begin with the primitive types JavaScript offers.

* Boolean
* Number
* String
* `null` - explicitly saying it doesn't exist

⁉️ You are wanting to store the price of an apple for a sign.
* What would be a good data definition for this?

⁉️ You want to store the state of whether a light switch is turned on or off.
* What would be a good data definition for this?

⁉️ Your light switch is fancy and it dims.
* What would be a good data definition for this?

### Compound (or Composite) data

Oftentimes, we work with complex data composed of different parts otherwise known as compound or composite data. For example, define a person we would need multiple pieces of data like a first name, a last name, an age, etc. In JavaScript we have types perfectly suited for representing collections or groups of data like this.

* Object - Useful for a group of data with named properties (e.g. a person, a date, etc)
* Array - Useful for holding a collection of similar things usually to maintain order for orders sake (ordered by price) or for consistency (items should appear in the same order every time).

There are also functions, which can be useful, but are difficult to serialize.

<br>
#### 💪 Exercise
On scratch pad or white board, create a composite data definition for a
rocket ship.

<hr>

### Avoid Unnecessary Complex Operations

Because we use our data in many different ways, it's important to look at how you intend to use the data. Take a look at this coordinate data definition.

```javascript
// A coordinate is a string of the format "x,y" where x and y are numbers.
// Examples: "1,5", "-3,5", "0,0"
```

There is nothing inherantly wrong with the data definition. We are able to create coordinates using this definiton, and we can create a function to get the x and y value.

```javascript
var getX = function (coord) {
  return coord.split(',')[0];
};

var getY = function (coord) {
  return coord.split(',')[1];
};
```

That being said, what type of things would we want to do with coordinates? We may want to move coordinates, find the distance between two coordinates, etc. That requires parsing the x and y values to a number to manipulate it, which we will need to convert back to a string. Having the values as numbers in our data model makes a lot of the work easier.

⁉️ Should the price of an apple be a number or a string? Why?

### Consider the future (but only consider)

As software developers, we consider software as never finished. As the business evolves, often the software needs new features to adjust to new needs or leverage a new technology (think about how software changed after the iPhone). That being said, we are never good at predicting the future (who would've expected the iPhone?), and we should not add complexity to our model for the sake of future-proofing. That being said, it helps to look on some future features that might help define what the data definition should be.

⁉️ Your dimmable light switch can change colors!
* How might you want to represent the dimmable state and the color?

<br>
#### 💪 Exercise

Supposed we are creating an app that stores recipes.

* What are the pieces that make up a recipe?
* What kinds of things can we do with a recipe?

Create a data definition.
