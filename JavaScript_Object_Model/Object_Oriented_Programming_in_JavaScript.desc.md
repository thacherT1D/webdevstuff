# In Progress


## Objectives

By the end of this lesson, you will be able to:

* Describe what Object Oriented Programming is
* Work with properties and methods
* Explain concepts in OOP like Encapsulation, Inheritance and Polymorphism
* Be able to articulate the difference and benefits of adding methods to the prototype versus the constructor.
* Articulate the difference and benefits to adding methods to the prototype vs. the constructor
* Explain the difference between setting properties in a constructor function vs. the prototype
* Distinguish between class (all instances of a given constructor) methods and instance methods
* Use `call` or `apply` to mimic the functionality of `super` when creating other constructor functions
* Contrast `call` and `apply` and how the `arguments` array-like object can be used

## What is Object-Oriented Programming?

Object-Oriented Programming (or "OOP") is a set of techniques and philosophies that can be used for solving programming problems (a _programming paradigm_). OOP has four key concepts:

* Encapsulation
* Inheritance
* Abstraction
* Polymorphism

Collectively these are referred to as the _Four Pillars of OOP_.

### Encapsulation

Encapsulation means two things:

1. Grouping data and behavior together
1. Controlling how data and behavior are accessed

In practical terms, this means that objects contain both variables and functions, and have the ability to control how the rest of the program uses them. 

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

#### Exercise: Abstraction

EXERCISE HERE

### Putting it all together

SUMMARY HERE

### 4 Pillars Problem Sets

  1. [Encapsulation](https://github.com/gSchool/js-encapsulation)
  1. [Polymorphism with Node.js](https://github.com/gSchool/js-polymorphism-guitar-store)

## Additional Resources

* [Encapsulation in JavaScript](http://www.intertech.com/Blog/encapsulation-in-javascript/)
* [Inheritance and the Prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* [Four Pillars of OOP](http://ruelbelmonte.tumblr.com/post/6066837330/4-pillars-of-oop)

## Useful Pre-reading

* [Object Oriented Programming](https://en.wikipedia.org/wiki/Object-oriented_programming)
* [Some opinions](http://programmers.stackexchange.com/questions/253090/why-are-inheritance-encapsulation-and-polymorphism-not-the-pillars-of-oop)
* [Chapter 6 "The Secret Life of Objects" in Eloquent JavaScript](http://eloquentjavascript.net/06_object.html)