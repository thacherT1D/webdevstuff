#Object Oriented Programming With Javascript


## Objectives

By the end of this lesson, you will be able to:

* Use the keywords `this` and `new` to create classes in javascript
* Articulate the difference and benefits to adding methods to the prototype vs. the constructor in Javascript
* Explain encapsulation, abstraction, inheritence as an object oriented concept

## What is Object-Oriented Programming?

Object-Oriented Programming (or "OOP") is a set of techniques and philosophies that can be used for solving programming problems (a _programming paradigm_).  The idea behind object oriented programing is essentially that the logic you are implementing is abstracted into a class that represents some real world thing.  For example, you might use object oriented programming to represent a view on the page, an object that saves your data, a student, an instructor, etc.  In other words, anything that you are trying to represent conceptually in your program, you can make into a class.


OOP has _four key concepts_:

* Encapsulation
* Abstraction
* Inheritance
* Polymorphism

Collectively these are referred to as the _Four Pillars of OOP_.  We will focus mainly on _Encapsulation_ and _Abstraction_.

### OOP Definitions

__Encapsulation__: controlling how data and behavior is accessed.  Encapsulation also refers to hiding internal data that is not relavant to the user of a class.

__Abstraction__: Grouping functions into a logical set that represents something in the real world.

__Inheritance__: Creating a new class that gets the data and behavior of a parent class.

__Polymorphism__: When a parent class implements a function that is implemented differently in a child class.

We will come back to these concepts later in the lesson, but first to understand how to implement classes in javascript, you have to understand the keyword `this`

## this in detail

The keyword `this` in javascript refers to the current object context.  Here is an example:

```javascript
var myObj = { 
   firstName: "Tim",
   lastName: "Garcia",
   position: "Instructor",
   getInfo: function() {
     return this.firstName + " " + this.lastName + " - " + this.position;
   }
};
```

In the above example, `this` is refering to myObj.  In general, `this` inside of a function refers to the object that is calling that function.  So when you execute:

```
myObj.getInfo();
```

The keyword `this` will be bound to myObj.  In other words, in the above context, `this === myObj` would be true.  If we create another object see what happens:

```javascript
var anotherObj = {
  firstName: "Matt",
  lastName: "Lane",
  position: "Math Guru/Instructor"
};

anotherObj.getInfo = myObj.getInfo;
anotherObj.getInfo();  // returns "Matt Lane - Math Guru/Instructor"
```

__EXERCISE__

Run the following code:

```javascript
var myObj = {
   instructors: ["Elie", "Matt", "Tim", "Janey", "Parker"],
   favoriteColor: { Elie: "Eggshell",
                    Matt: "Orange And Black",
                    Tim: "Red",
                    Janey: "Yellow",
                    Parker: "Blue"
                  },
   favoriteColorIsPrimary: function(instructor) {
     console.log(this);
     var primary = ["red", "yellow", "blue"];
     var color = this.favoriteColor[instructor].toLowerCase();
     
     return (primary.indexOf(color) >= 0);
   }
};

var primaryColorInstructors = myObj.instructors.filter(myObj.favoriteColorIsPrimary);
```

In the callback function for `filter`, the `favoriteColorIsPrimary` function, the keyword `this` is not referring to the instructor object. In fact, `this` will be referring to the window if you run the above code in the browser.

Research the `bind` method.  How can you apply it to this problem to make the keyword `this` refer to `myObj`.

_BONUS_: Why is the context for `this` defaulting to the window?  What is another way to solve the problem without using `bind`.

## Javascript Classes

To make a class in javascript, we __could__ try using a javascript object:

```javascript
var student = {
	name: "Tim",
	studentId: "1050",
	className: "Full Stack Immersive"
};
```

The above approach for making a class has some big disadvantages.  Most importantly, as the implementor of the class, I cannot easily make more than 1 student.  I would have to create another object with all of the same properties every time I want to make a new student.  

To get around this problem, javascript classes are commonly implemented with functions. The function that defines how a class should be initialized is called the _constructor_.  Below is an example:

```javascript
function Student(name, studentId) {
	this.name = name;
	this.studentId = studentId;
	if (studentId > 1000) {
	  this.className = "Full Stack Immersive";
	} else {
	  this.className = "Data Science Immersive";
	}
}
```

To create an instance of the class, use the `new` keyword:

```javascript
var fsiStudent = new Student("Tim", 1050);
var dsiStudent = new Student("Matt", 903);
```

Now we can create as many students as we like using the `new` keyword.  The constructor function also has the added benefit of allowing us to do some additional logic when a student is getting created.


#### this with the new keyword

In the example above, the `new` keyword creates a new object using the constructor function.  Each property defined on `this` in the constructor function will be created as a property for the new object.  Think of the constructor function as the _blueprint_ for how to create a new instance of the class (In the above example, a new instance of a `Student`).  

The `new` keyword also copies the __prototype__ of the constructor function.  We will discuss the __prototype__ later on in the lesson.


__EXERCISE__

Write a class in javascript for that models a Dog.  Give the Dog class a name, a breed, an address, and an age as properties on the class. Example usage is below: 

```javascript
var myDog = new Dog("Tiny", "Bull Mastiff", "111111111111 Market Street", 1);
console.log(myDog.name);
console.log(myDog.age);
// etc
```

## Classes With Functions

So far we have only created classes that can store properties on an object.  That is useful in that we can give an explicit blueprint to how our object should look, but it is also very useful to be able to write functions using that data.

For example, we can add to the Dog class from above by adding a function that returns the sound the dog makes when he speaks.  Let's make it random, just for fun:

```javascript
function Dog(name, breed, address, age) {
  this.name = name;
  this.breed = breed;
  this.address = address;
  this.age = age;
  
  this.speak = function() {
    var sounds = ["bark", "grrrrrr", "rough rough", "woof", "oink"];
    var rand = Math.floor(Math.random() * sounds.length);
    return this.name + " says " + sounds[rand];
  };
}
```

Now let's create a few dogs and call speak:

```javascript
var moxie = new Dog("moxie", "Manx", "1355 Market St #900", 5);
var deli = new Dog("Deli", "Labradoodle", "88 Colin P Kelly Jr St", 2);
moxie.speak();
deli.speak();
```

Now we can call functions on our classes as well!  That is great progress, but the way we created a function above is not the preferred way.  In your console, try out the following:

```javascript
console.log(moxie.speak === deli.speak);
```

The comparison returns false, meaning that every instance of `Dog` that we create gets its own version of the function.  That makes total sense for properties like `name`, `breed`, `address` and `age`, but the function is identical for both dogs, so there is no need to copy it.

To save on the programs memory consumption, you can add the functions you want to it's prototype:

```javascript
function Dog(name, breed, address, age) {
  this.name = name;
  this.breed = breed;
  this.address = address;
  this.age = age;
}

Dog.prototype.speak = function() {
  var sounds = ["bark", "grrrrrr", "rough rough", "woof", "oink"];
  var rand = Math.floor(Math.random() * sounds.length);
  return this.name + " says " + sounds[rand];
};
```

All properties on the prototype are shared among all instances of the class. In other words the following console.log now returns true:

```javascript
var moxie = new Dog("moxie", "Manx", "1355 Market St #900", 5);
var deli = new Dog("Deli", "Labradoodle", "88 Colin P Kelly Jr St", 2);
console.log(moxie.speak === deli.speak); // returns true
```


__EXERCISE__

* Implement a method on the dog class that returns the name and address framed in a box.  Call the method, `getDogTag`.  Sample usage and output is below:

```javascript
var myDog = new Dog("Butch", "Bulldog", "123 Fake Street", 5);

// The getDogTag method will return the following:
// ###################
// # Butch           #
// # 123 Fake Street #
// ###################
console.log(myDog.getDogTag());
```

* Go to [http://www.codewars.com/join](http://www.codewars.com/join) and figure out the javascript prompts in order to sign up.  Once you have passed the test, sign up!  Make sure to fill in the clan as _Galvanize - g22_.  We are going to track your progress!

## Prototypes And Inheritance

In javascript, all functions have a prototype.  The prototype is a set of properties that are available to the function.  When you use the `new` keyword to make an instance of a class in javascript, the class you are creating has all of the properties that you have defined on the class's prototype, plus all of the properties on the `Object` prototype.

In other words, when you create a new instance of your class, your class _inherits_ all of the properties from the `Object` function.  Let's take a look at that in practice.  Remember our implementation of Dog:

```javascript
function Dog(name, breed, address, age) {
  this.name = name;
  this.breed = breed;
  this.address = address;
  this.age = age;
}

Dog.prototype.speak = function() {
  var sounds = ["bark", "grrrrrr", "rough rough", "woof", "oink"];
  var rand = Math.floor(Math.random() * sounds.length);
  return this.name + " says " + sounds[rand];
};
```

Now if I create a new instance of Dog, I can use `speak` as expected, but I can also call `toString()`

```javascript
var moxie = new Dog("moxie", "Manx", "1355 Market St #900", 5);
moxie.speak();
moxie.toString();
```

_Inheritance_: `toString()` is a method that was _inherited_ from `Object`. Inheritance is the concept of a child class receiving functionality from a parent class.  In this case, the Dog class is the child class that inherits the `toString` method from the parent class, the `Object`.


__EXERCISE__

* In the console, type `Object.prototype`.  Take a look at all of the properties that are inherited in any class that you make in javascript.
* On the Dog class, impelement a more useful `toString`

## Encapsulation

_Encapsulation_ is an important concept to understand in object oriented programming.  It entails understanding what should be visible ot the use of your class and what should not be.

_Public vs Private_

In classic object oriented programming, there is a concept of _private_ functions and data vs _public_ functions and data.  Javascript doesn't quite have the same built in functionality, many classes written in javascript denote something is private by defining the property with two underscores.  Below is an example:

```javascript
function Calculator() {
}

Calculator.prototype.evaluate = function(num1, num2, op) {
  if (op === '+') {
    return this.__add(num1, num2);
  } else if (op === '-') {
    return this.__subtract(num1, num2);
  }
};

Calculator.prototype.__add = function(num1, num2) { return num1 + num2; };

Calculator.prototype.__subtract = function(num1, num2) { return num1 - num2; };
```

The caller shouldn't have to ever call add directly.  The double underscore tells the caller to avoid using the function.

_Getters and Setters_

Another common object oriented pattern is getter and setter methods.  This isn't as common in javascript.  Using the dog example:

```javascript
function Dog(name, breed, address, age) {
  this.name = name;
  this.breed = breed;
  this.address = address;
  this.age = age;
}

Dog.prototype.getName = function() {
  return this.name;
};

Dog.prototype.setName = function(name) {
  this.name = name;
};
```

You'll see in this example the implementer of the class gives the caller explicit ways to get and set a property.  This can be useful if a property has certain error checking that needs to take place before it is saved, or other properties that need to be updated.  In general though, if you just have a single property, most of the time a getter and setter isn't needed.

## Abstraction

Abstraction is the process of modeling concepts within your program as classes.  Abstraction is a tough concept when you're first learning object oriented programming.  Here are some questions to ask yourself when you are creating a class:

* Should my class know about a certain property or function (e.g. should a Dog class know how to walk itself to the store.  That is probably the job of another class).
* Is my class getting too large?
* Is there too much functionality in a single function?
* What is the primary purpose of my class, and does the functionality I'm about to add fit into that primary purpose.

If you continally ask yourself these types of questions when you're building your code, and you're not afraid to refactor (make some changes), then you'll likely come away with a good design.  The best way to make this concrete is to model something that is a little more complicated.

__EXERCISE__

In groups, conceptually design classes for a game of checkers.  What needs to be abstacted into separate classes?  How will the classes be used together?


## Additional Resources

* [Encapsulation in JavaScript](http://www.intertech.com/Blog/encapsulation-in-javascript/)
* [Inheritance and the Prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [Four Pillars of OOP](http://ruelbelmonte.tumblr.com/post/6066837330/4-pillars-of-oop)
* [Some opinions](http://programmers.stackexchange.com/questions/253090/why-are-inheritance-encapsulation-and-polymorphism-not-the-pillars-of-oop)
* [Chapter 6 "The Secret Life of Objects" in Eloquent JavaScript](http://eloquentjavascript.net/06_object.html)
