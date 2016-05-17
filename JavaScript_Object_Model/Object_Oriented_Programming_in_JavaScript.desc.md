#Object Oriented Programming With Javascript


## Objectives

By the end of this lesson, you will be able to:

* Use the keywords `this` and `new` to create classes in javascript
* Articulate the difference and benefits to adding methods to the prototype vs. the constructor in Javascript
* Explain encapsulation, abstraction, inheritence as an object oriented concept

## What is Object-Oriented Programming?

Object-Oriented Programming (or "OOP") is a set of techniques and philosophies that can be used for solving programming problems (a _programming paradigm_).  The idea behind object oriented programing is essentially that the logic you are implementing is abstracted into a constructor function that represents some real world thing. These constructor functions can be thought of as blueprints for the objects that will be created from them. For example, you might use constructor functions to represent students, instructors, cats etc.  In other words, anything that you are trying to represent conceptually in your program, you can make into a constructor function.

## Javascript Constructor Functions

Constructor functions in Javascript look like normal functions, except they will be called differently. To denote that the function is a constructor and not just a normal function, we are using Pascal Case (where each word is upper cased unlike Camel Case, where only subsequent words are upper cased).

Note the use of the **this** keyword in the following example.

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

To create an instance of the constructor, use the `new` keyword:

```javascript
var fsiStudent = new Student("Tim", 1050);
var dsiStudent = new Student("Matt", 903);
```

Now we can create as many students as we like using the `new` keyword.  The constructor function also has the added benefit of allowing us to do some additional logic when a student is getting created.

**EXERCISE**

Create a constructor function for a Car, with the following properties.

* fuelLevel (a number between 0 and 100)
* status (a string, can be **on** or **off**)
* currentSpeed (default is 0)
* maxSpeed (how fast can the car go?)

Now create four instances of cars. Set each car to have a different fuel level traveling at different speeds.

Bonus: Make the max speed a random number.

#### this with the new keyword

In the example above, the `new` keyword creates a new object using the constructor function.  Each property defined on `this` in the constructor function will be created as a property for the new object.  Think of the constructor function as the _blueprint_ for how to create a new instance of the class (In the above example, a new instance of a `Student`).  

The `new` keyword also copies the __prototype__ of the constructor function.  We will discuss the __prototype__ later on in the lesson.

## Constructor Functions With Methods

So far we have only created constructor functions that can store properties on an object.  That is useful in that we can give an explicit blueprint to how our object should look, but it is also very useful to be able to write functions using that data.

For example, we can create a Dog constructor and add a function that returns the sound it makes when the dog barks.  Let's make it random, just for fun:

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

Now we can call functions on our constructors as well!  That is great progress, but the way we created a function above is not the preferred way.  In your console, try out the following:

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

All properties on the prototype are shared among all instances of the constructor. In other words the following console.log now returns true:

```javascript
var moxie = new Dog("moxie", "Manx", "1355 Market St #900", 5);
var deli = new Dog("Deli", "Labradoodle", "88 Colin P Kelly Jr St", 2);
console.log(moxie.speak === deli.speak); // returns true
```


__EXERCISE__

* Implement a method on the dog constructor that returns the name and address framed in a box.  Call the method, `getDogTag`.  Sample usage and output is below:

```javascript
var myDog = new Dog("Butch", "Bulldog", "123 Fake Street", 5);

// The getDogTag method will return the following:
// ###################
// # Butch           #
// # 123 Fake Street #
// ###################
console.log(myDog.getDogTag());
```

## Prototypes And Inheritance

In javascript, all functions have a prototype.  The prototype is a set of properties that are available to the function.  When you use the `new` keyword to make an instance of a constructor in javascript, the constructor you are creating has all of the properties that you have defined on the class's prototype, plus all of the properties on the `Object` prototype.

In other words, when you create a new instance of your constructor, your constructor _inherits_ all of the properties from the `Object` function.  Let's take a look at that in practice.  Remember our implementation of Dog:

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

_Inheritance_: `toString()` is a method that was _inherited_ from `Object`. Inheritance is the concept of a child object receiving functionality from a parent object.  In this case, the Dog constructor is the child function that inherits the `toString` method from the parent object, the `Object`.


__EXERCISE__

* In the console, type `Object.prototype`.  Take a look at all of the properties that are inherited in any constructor that you make in javascript.
* Answer the following question, if you create a prototype method with the same name as the parent object, lets say toString, which method is called?
* On the Dog constructor, implement a more useful `toString`.

## Encapsulation

_Encapsulation_ is an important concept to understand in object oriented programming.  It entails understanding what should be visible in the use of your class and what should not be.

_Public vs Private_

In classic object oriented programming, there is a concept of _private_ functions and data vs _public_ functions and data.  Javascript doesn't quite have the same built in functionality, many constructors written in javascript denote something is private by defining the property with two underscores.  Below is an example:

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

You'll see in this example the implementer of the constructor gives the caller explicit ways to get and set a property.  This can be useful if a property has certain error checking that needs to take place before it is saved, or other properties that need to be updated.  In general though, if you just have a single property, most of the time a getter and setter isn't needed.

## Abstraction

Abstraction is the process of modeling concepts within your program as constructors.  Abstraction is a tough concept when you're first learning object oriented programming.  Here are some questions to ask yourself when you are creating a constructor:

* Should my constructor know about a certain property or function (e.g. should a Dog constructor know how to walk itself to the store.  That is probably the job of another constructor).
* Is my constructor getting too large?
* Is there too much functionality in a single function?
* What is the primary purpose of my constructor, and does the functionality I'm about to add fit into that primary purpose.

If you continually ask yourself these types of questions when you're building your code, and you're not afraid to refactor (make some changes), then you'll likely come away with a good design.  The best way to make this concrete is to model something that is a little more complicated.

__EXERCISE__

In groups, conceptually design constructors for a game of checkers.  What needs to be abstracted into separate constructors?  How will the constructors be used together?


## Additional Resources

* [Encapsulation in JavaScript](http://www.intertech.com/Blog/encapsulation-in-javascript/)
* [Inheritance and the Prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [Chapter 6 "The Secret Life of Objects" in Eloquent JavaScript](http://eloquentjavascript.net/06_object.html)
