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


#### this with new keyword

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

In javascript, all functions have a prototype.  The prototype is a set of properties that are available to the function.  When you use the `new` keyword to make an instance of a class in javascript, the class you are creating an instance that has all of the properties on your class's prototype, plus all of the properties on the `Object` prototype.

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

_Inheritance_: `toString()` is a method that was _inherited_ from `Object`. In other words, inheritance is the concept of a child class receiving functionality from a parent class.  In this case, the Dog class is the child class that inherits the `toString` method from the parent class, the `Object`.


__EXERCISE__

* In the console, type `Object.prototype`.  Take a look at all of the properties that are inherited in any class that you make in javascript.`
* On the dog class, impelement a more useful `toString`

#### Properties & Methods

A variable that's stored in an object is called a *property*, and a function that's stored in an object is called a *method*.

```
var Dog = {
    legs: 4,
    name: "Fido",
    bark: function(){
        console.log("Woof!");
    }
}
```

* `legs` and `name` are properties of `Dog`
* `bark()` is a method of `Dog`.
* `Dog` encapsulates `legs`, `name`, and `bark()`

#### Setters & Getters

Sometimes you'll want to control access to the properties and methods of the object. Right now, to give your `Dog` 6 legs, you could do this:

```
Dog.legs; // 4
Dog.legs = 6;
Dog.legs; // 6
```

What you usually want to do is control access to those properties with _getters_ and _setters_. If you update `Dog` to this:

```
var Dog = {
    legs: 4,
    name: "Fido",
    bark: function(){
        console.log("Woof!");
    },
    getLegs: function(){
        return this.legs;
    },
    addLegs: function(numberOfLegsToAdd){
        this.legs += numberOfLegsToAdd;
    },
    setName: function(updatedName){
        this.name = updatedName;
    },
    getName: function(){
        return this.name;
    }
}
```

You can then use the getters and setters (collectively referred to as _accessors_) to work with the properties of the object:

```
Dog.getLegs(); // 4
Dog.addLegs(2);
Dog.setName("Super Fido");
Dog.getLegs(); // 6
Dog.getName(); // Super Fido
```

##### Why use accessors?

Getters and setters give you much more flexibility in your code. There are a lot of reasons to use them, but here are some key ones:

* **Validation**. In the case of `Dog.addLegs()`, you could validate that the value being passed in is a number within a certain range.
* **Change-Proofing**. If you change the property `Dog.name` to  `Dog.firstName` in the future, you could update `Dog.getName()` without having to change any code that *uses* `Dog.getName()`.
* **Simplifying the complex**. Let's say that `Dog.legs` changes from a number to an array, where each array member has information about the length, location, and power of each leg. `Dog.getLegs()` can count the length the `Dog.legs` array, subtract out any that don't work, etc. and still return a number.

#### Exercise: Writing Accessors

* Create a `Person` object with `firstName` and `lastName` properties
* Create setter methods for `firstName` and `lastName` that verify that the input is:
    * A string
    * Shorter than 50 characters
* Create a getter method called `getFullName` that returns the first name and last name together (look out for spacing)

#### Enforcing privacy

Even when we write accessors for objects, another programmer using your code could still write or read a property directly. To make it more clear what should be available outside the object, you can wrap it in a `function`:

```
function createDog(){
    var legs = 4;
    var name = "Fido";
    return {
        bark: function(){
            console.log("Woof!");
        },
        getLegs: function(){
            return legs;
        },
        addLegs: function(numberOfLegsToAdd){
            legs += numberOfLegsToAdd;
        },
        setName: function(updatedName){
            name = updatedName;
        },
        getName: function(){
            return name;
        }
    }
};

var Dog = createDog();
```

Notice that:

* The "private" properties `legs` and `name` are declared as variables inside the function with `=` and `;` (instead of `:` and `,`)
* The "public" methods are returned in an object from the function
* The getters and setters refer to `legs` and `name`, not `this.legs` and `this.name` because `legs` and `name` are not actually on the object

Now, you can't access `legs` or `name` directly:

```
Dog.getLegs(); // 4
Dog.getName(); // Fido
Dog.legs; // Undefined
Dog.name; // Undefined
```

The `Dog` object has _encapsulated_ its properties (`legs` and `name`) and its methods (`bark()`) together, and controlled access to them via its accessor methods (`getName()`, `setName()`, `getLegs()`, `addLegs()`). `legs` and `name` are _private_ since they can't be accessed directly, while the `bark()` method and all the accessors are _public_ because they can.

#### Exercise: Real-Life Encapsulation

* Create an object for something in the room.
* It should have at least three properties, and at least two methods.
* The properties should all be _private_
* At least one of the methods should be _public_
* The properties should all have both public accessor methods
* Privacy should be enforced.

When you're done, you should be able to create an object, examine it in your REPL, and see the public parts.

### Inheritance

Inheritance is a powerful programming technique. It allows for developers to easily develop systems in which shared behavior is kept one place (the _superclass_), and specific behavior is kept in another (the _subclass_). Inheritance is especially useful because it models many hierarchies we see in the world:

* A dog has all of the traits of "Canis Lupus", every member of which has every trait of "Canis", every member of which has every trait of... all the way up to Mammalia, Chordata, and Animal. Dogs _inherit_ all the "properties and methods" of everything above it in the hierarchy.
* A Ford 150 is a kind of truck, which is a kind of car, which is a kind of automobile, which is a kind of vehicle. Vehicle might have a method named `goForward()`, and automobile may have a property named `wheels`, both of which the Ford F150 can access
* Any _hierarchical taxonomy_ can be modeled with inheritance.

#### Exercise: Inheritance

Pick something (other than one of the examples above) that has a hierarchical taxonomy, with at least 3 levels. Write out the hierarchy. Each level should introduce new "methods" (behaviors) and "properties" (characteristics) that are inherited by their children.

#### Inheritance in JavaScript

##### Classical Inheritance

Different programming languages handle inheritance differently. Many languages, such as Java, PHP, C#, and Ruby use a concept called "Classical Inheritance." In classical inheritance, each level of the taxonomy has a _class_, which is like a cookie cutter for that level of the taxonomy. All of the inheritance concepts from above apply- your cookie cutter for "Dog" has all of the characteristics of "Mammal."

The actual cookies being made are objects. The class determines what shape the objects take- what the methods and properties of that object are. In programming terms, _an object is one instance of a class_.

##### Prototypal Inheritance

JavaScript handles inheritance differently. There are no true classes in JavaScript. Instead, JavaScript uses a concept called _Prototypes_. A prototype is an actual object instance that can be copied and made more specific. Instead of a cookie cutter, you have an actual cookie that you can make copies of and modify.

When you use the `.push()` method on an array, your array looks for the `.push()` method on the array itself, and when it doesn't find it, it looks to its prototype, the `Array` object. Your array inherits the `.push()` method from there.

##### Making Your Own Prototypes

To make a prototype, use the `new` keyword.

```
var Dog = function(){
    this.legs = 4;
    this.bark = function(){
        console.log("Woof!");
    };
};

Fido = new Dog();

Fido.bark(); // "Woof!"
Fido.name; // "Fido"
```

One of the advantages of doing this with a function is that we can pass values in like any other function:

```
var Dog = function(dogName){
    this.name = dogName;
    this.legs = 4;
    this.bark = function(){
        console.log("Woof!");
    };
};

Fido = new Dog("Fido");

Fido.name // "Fido";
```

The `Dog()` function is called the object's _constructor_, because it builds the Dog object for us and can set up any variables we need inside of it.

#### Exercise: Building Objects

Using the `function` strategy, build out actual instances of all the members from the hierarchy you built above.

#### A note on composition

Sometimes it can be useful to think about things in terms of what it is _not_. The opposite of inheritance is called _composition_. Composition builds objects from the ground up- `Dog` is an object that can `bark()` and has `leg`s. It does not inherit anything from `Mammal`, which keeps the object small and focused. This is a core tenet of Functional Programming, a different programming paradigm.

---

### Polymorphism

Polymorphism means "many forms", and refers to the different objects having same method name with a different implementation- the ability to override things that have been inherited.

Consider this example:

```
var Dog = function(){
    this.bark = function(){
        console.log("Woof!");
    };
};

Fido = new Dog();
Fefe = new Dog();

Fefe.bark = function(){
    console.log("Le bow.");
};

Fido.bark(); // "Woof!"
Fefe.bark(); // "Le bow."
```

`Fido` and `Fefe` are both `Dog`s, both of them have a method called `bark()` that they inherited from `Dog`, but each has a different implementation of `bark()` because `Fefe` overrode the inherited behavior.

#### Interfaces

An _interface_ in programming is a contract about inputs and outputs. Consider the car hierarchy example from above:

Let's say all `Automobiles` have a interface called `Drivable`. The `Drivable` interface says any object that signs the contract (or _implements the interface_) should:

* Have a function called goForward()
* Which takes a numeric distance as an input
* And returns a set of (x,y) coordinates

`Automobile` and anything that inherits from it has to have these things to correctly implement the interface. `goForward()` might be implemented differently differently by `Car`, `Go-Kart`, and `Semi-Truck`, but if they all implement the same interface, we can predictably treat them similarly in our programs.

Interfaces allow us to use polymorphism to:

* Override methods from parent objects
* Implement them differently
* Without having to change the rest of the program to account for it.

`Fido` and `Fefe` can both `bark()`, and any program that expects a `Dog` `bark`ing to output something to the console will work as expected with either `Dog`, even though `Fido` and `Fefe` have different implementations for `bark()`. 

#### Interfaces in JavaScript

JavaScript **does not have formal interfaces**. JavaScript interfaces are less like contracts, and more like handshakes. The closest thing it has is [Duck Typing](https://en.wikipedia.org/wiki/Duck_typing#In_JavaScript), which is beyond the scope of this lesson. What's important to understand about interfaces right now is that when you're using polymorphism to override a method, it's inputs and outputs should stay the _same type_.

#### Interface Example

Let's make a prototype called `Beast` that has a method called `attack()` which takes in a number of times to attack, and outputs a string with its "battle cry" repeated that many times.

```
var Beast = function(){
    this.attack = function(numberOfTimes){
        var battleCry = "Grr!";
        var completeBattleCry = "";
        for (var i = 0; i < numberOfTimes; i++){
            completeBattleCry += (" " + battleCry);
        }
        return completeBattleCry;
    }
};
```

Now, let's make (or _instantiate_ three kinds of `Beast`s):

```
var Bear = new Beast();
var Goose = new Beast();
var Snake = new Beast();
```

Let's override the `attack()` methods for `Goose` and `Snake` using polymorphism to give them distinct battle cries. We'll also let them output at different rates, since geese are fast, and snakes are super fast.

```
Goose.attack = function(numberOfTimes){
    var battleCry = "Quack!";
    var completeBattleCry = "";
    for (var i = 0; i < numberOfTimes * 2; i++){
        completeBattleCry += (" " + battleCry);
    }
    return completeBattleCry;
};

Snake.attack = function(numberOfTimes){
    var battleCry = "Hiss!";
    var completeBattleCry = "";
    for (var i = 0; i < numberOfTimes * 4; i++){
        completeBattleCry += (" " + battleCry);
    }
    return completeBattleCry;
};
```

In all three cases, `attack()` accepts a number and outputs a string (an _interface_). This lets us write functions like this:

```
var fight = function(beast, numberOfTimes){
    console.log(beast.attack(numberOfTimes));
};
```

As long as the object being passed into the `fight()` function implements that interface, the function will work.

```
fight(Bear, 2) // "Grr! Grr!"
fight(Goose, 2); // "Quack! Quack! Quack! Quack!"
fight(Snake, 2); // "Hiss! Hiss! Hiss! Hiss! Hiss! Hiss! Hiss! Hiss!"
```

#### Exercise: Polymorphism

Using your hierarchy from the previous exercises, implement a method at the top of the hierarchy that will be overridden by each lower step in the hierarchy. The interface for this method should accept one data type, and return a different data type.

Then, write a function that will accept your objects and call the overridden methods, passing in a value. The output of each of the methods should be the same type.

### Abstraction

Abstraction in OOP is the concept of thinking about things _generally_, rather than _concretely_. It means looking for shared behavior and attributes, and treating them in a shared way. A `Goose` is different from a `Snake`, but for purposes of the scripts in this lesson, they are both `Beast`s. Abstraction means writing programs that are capable of handling abstractions like `Dog`, rather than writing programs that can only deal with `Fido` and break when you give them `Fefe`.

In practice, this means writing programs to _interfaces_ instead of specific implementations, and thinking of classes/prototypes as _data types_ like Strings and Booleans.

"Writing to an interface" means thinking about your program and everything in it in these terms:

* What output is the program supposed to have?
* What input is necessary to generate that output?
* What transfomation needs to happen to turn the input into the output?

A great practice to design your programs in terms of interfaces.

For example: EXAMPLE HERE

Treating classes and prototypes like data types means you should be able to write programs that can expect objects to have certain properties and methods. Just like you expect to be able to multiply two numbers, or `push` members into an array, or concatenate two `string`s, you should also be able to accept a `Dog` and call its `bark()` method without needing to know what kind of `Dog` it is.


## Additional Resources

* [Encapsulation in JavaScript](http://www.intertech.com/Blog/encapsulation-in-javascript/)
* [Inheritance and the Prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [Four Pillars of OOP](http://ruelbelmonte.tumblr.com/post/6066837330/4-pillars-of-oop)
* [Some opinions](http://programmers.stackexchange.com/questions/253090/why-are-inheritance-encapsulation-and-polymorphism-not-the-pillars-of-oop)
* [Chapter 6 "The Secret Life of Objects" in Eloquent JavaScript](http://eloquentjavascript.net/06_object.html)