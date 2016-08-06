# Objectives

* Explain what is data modeling.
* Explain why we model data.
* Explain what is a data definition.
* Practice defining complex data.
* Create items in localStorage that store data such as user selections or form data.
* Retrieve items from localStorage and use that data to modify the behavior of something on the page.
* Remove items from localStorage.
* Edit items from localStorage, store mutable items.

# What is Data Modeling?

Data modeling is a process to define and analyze data based on the requirements needed for your software. When modeling data, we look at two "customers" that we model data for: the stakeholders (the people who own the software) and developers (the people who read and use your code).

# Why do we Model Data?

Each of your projects is working with data in some way whether your program is managing data from an API, changing a game state, or creating data on its own. As software engineers, we spend a lot of time thinking about the structure of our data before we implement our project. Defining the structure of our data allows us to set expectations on what is the input of our programs and what our programs are supposed to produce as output.

## What is a Data Definition?

A **data definition** is a human readable description of our data in terms of supported programming language types and other data definitions. Since this knowledge is so important for everyone who reads the program, we often write it down in comments. Once we read a data definition, we should know how to create values of that type as well as check if a piece of data is of that type.

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

**Exercise** What is a data definition for representing time on a clock?

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

## Guidelines in Modeling Data

Modeling data can be an incredibly difficult task. There is never one single answer on the proper way to manage data, and often times, the model breaks down over time as we change our software. Here are some guidelines with some examples of how we can model data.

### Start with simple

The easiest way to start data modeling is to think about the basic pieces of information you need to save. We begin with the primitive types JavaScript offers.

* Boolean
* Number
* String
* `null` - explicitly saying it doesn't exist

**Exercise** You are wanting to store the price of an apple for a sign. What would be a good data definition for this?

**Exercise** You want to store the state of whether a light switch is turned on or off. What would be a good data definition for this?

**Exercise** Your light switch is fancy and it dims. What would be a good data definition for this?

### Compound (or Composite) data

Oftentimes, we work with complex data composed of different parts otherwise known as compound or composite data. For example, a person has multiple pieces of data like a first name, a last name, an age, etc. We also have several JavaScript types for representing collections or groups of data.

* Object - Useful for a group of data with named properties (e.g. a person, a date, etc)
* Array - Useful for holding a collection of similar things usually to maintain order for orders sake (ordered by price) or for consistency (items should appear in the same order every time).

We also have functions, which can be useful, but they are difficult to serialize.

**Exercise** You want to represent a set of twinkling lights where a light can be on or off. How might you want to represent that?

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

**Exercise** Should the price of an apple be a number or a string? Why?

### Consider the future (but only consider)

As software developers, we consider software as never finished. As the business evolves, often the software needs new features to adjust to new needs or leverage a new technology (think about how software changed after the iPhone). That being said, we are never good at predicting the future (who would've expected the iPhone?), and we should not add complexity to our model for the sake of future-proofing. That being said, it helps to look on some future features that might help define what the data definition should be.

**Exercise** Your apple business is expanding internationally to other countries. How might you want to represent the price of your apples?

**Exercise** Your dimmable light switch can change colors! How might you want to represent the dimmable state and the color?

## A more complex example

Supposed we are creating an app that stores recipes.

* What are the pieces that make up a recipe?
* What kinds of things can we do with a recipe?

Let's create a data definition.

# Introduction to Local Storage

Local Storage (A.K.A. Web Storage, DOM Storage, HTML5 Storage) gives us web developers the ability to *persist* information or data from our web app on to our user's system. Local Storage data is data that is saved on to the user's device.

**Being Persistent**

Being able to persist information means that when an application is shutdown (like if the user closes the browser window), any data i.e. form information, user preferences, etc. will still exist, and when the application is opened again, the data from the previous time can also be accessed.

By contrast, information that is not persisted will be destroyed when the user closes the application.  Suppose a web application let's a user choose a background color other than the default white for the page they are visiting.  When the user shuts down their web browser and later goes back to the same page, the page's background color will be the default white if the selected color information was not persisted somewhere.

**The `localStorage` Object**

To take advantage of Local Storage, we access what is called the `localStorage` object.  It allows you to store data locally into the browser via `Storage` objects. LocalStorage stores data that is essential from page to page, request to request, howevever, `localStorage` can only be accessed on the client side. Additionally, `localStorage` can store up to 5MB of data, and only gets cleared through JavaScript or manually clearing through the browser.

As a general rule, it is not a great idea to store sensitive data into `localStorage`. Even though `localStorage` is _not_ sent with every request, and is instead sent only when asked for, storing sensitive data is usually better left to encrypted Cookies.

### Using localStorage

With localStorage you can add, remove, edit, and retrieve whatever information you like from your app all on to the user's system.  You use the localStorage object in your client-side javascript code much like a regular JavaScript object.  Data is stored as key-value pairs.  Unlike regular javascript objects however, each value is automatically converted to a string and is returned to us as a string as well.  That means any values that are numbers or anything other than strings will need to be converted back to its original data type.

**Accessing localStorage**

Local Storage can be accessed by calling `window.localStorage` or just `localStorage` on the client-side javascript.  If your localStorage is empty, it will return `Storage {}`.  Otherwise you'll see the entire localStorage object with all of the key-value pairs inside.  

![](https://i.gyazo.com/b0d46dfea15ba66cfe5cd635ef5b1cd2.png)

**Setting Data**

You can set values two ways, using `localStorage.key = value`, or `localStorage.setItem(key, value)`.  They are nearly identical, however using `setItem` fires off a storage event if something is changed.  This can be useful if you want to keep track of when the data is changed.


[![https://gyazo.com/b1c5de1e678947b89aadddc51179cf26](https://i.gyazo.com/b1c5de1e678947b89aadddc51179cf26.png)](https://gyazo.com/b1c5de1e678947b89aadddc51179cf26)

Both of the above methods will create the keys "backpack" and "pen" respectively.

**Accesing Key Values**

Specific values can be accessed with either `localStorage.someKey` or `localStorage.getItem(someKey)`.  As with using setItem(), the difference in using getItem is that a storage event will also be fired if there is a change in data.  Also notice that all values that are returned from local storage are strings.  

[![https://gyazo.com/9650165b836d9391f4a90abf90b85882](https://i.gyazo.com/9650165b836d9391f4a90abf90b85882.png)](https://gyazo.com/9650165b836d9391f4a90abf90b85882)

**Removing Key-Values**

In order to remove data from localStorage, use `localStorage.removeItem(key)`

[![https://gyazo.com/174fc9f167251bcb8a85ce3a964816e7](https://i.gyazo.com/174fc9f167251bcb8a85ce3a964816e7.png)](https://gyazo.com/174fc9f167251bcb8a85ce3a964816e7)

**Editing/Updating Values**

To edit or update localStorage information, you'll need to save a copy of the existing value somewhere.  This is because localStorage only lets you completely replace values.  It is just like updating values in a typical JavaScript object.  

Let's say we want to update the pen in our local storage to have "Super" at the end of it.

[![https://gyazo.com/c8c69a9073423c02c1cc21bac19bec9f](https://i.gyazo.com/c8c69a9073423c02c1cc21bac19bec9f.png)](https://gyazo.com/c8c69a9073423c02c1cc21bac19bec9f)


## Optional Exercise: Background Preferences

Let's make a simple page that stores the users preference for a web page background color for each day of the week.  A user should be able to visit the site, enter a hex color for each day of the week, and the page's background color should reflect that input.  Furthermore, when the user closes the browser and revists the page, the background color should still be the same as the colors that were previously entered, and NOT the default blank color.

**[(CLONE ME) Walkthrough Exercise Repo](https://github.com/gSchool/localstorage-walkthrough/tree/exercise)
** using this git command: `git clone git@github.com:gSchool/localstorage-walkthrough.git -b exercise`


[![https://gyazo.com/fad0401a938c959594f362bdd114715f](https://i.gyazo.com/fad0401a938c959594f362bdd114715f.png)](https://gyazo.com/fad0401a938c959594f362bdd114715f)

### Reading

[Diving in To Local Storage](http://diveintohtml5.info/storage.html)
(*Using Local Storage, solid examples in javascript:*)

[localStorage Examples](https://css-tricks.com/localstorage-examples/) - offers more insight on _when_ and _where_ `localStorage` is used.
