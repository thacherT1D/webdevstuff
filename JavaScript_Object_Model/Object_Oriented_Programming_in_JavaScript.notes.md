# [Slides](https://docs.google.com/presentation/d/1C_myARO10qyRN5rwWV1YNyWMP5KaV2bF7SsjOhwAVXQ/edit?usp=sharing)

## What is Object-Oriented Programming?

* Define OOP
* Talk about paradigms
* 4 Pillars
    * Encapsulation
    * Inheritance
    * Abstraction
    * Polymorphism

### Encapsulation

1. Grouping data and behavior together
1. Controlling how data and behavior are accessed

* Objects have both variables and functions
* Can control how the program uses them

#### Properties & Methods

* Difference between a property and a method
* Dog is encapsulating all of them

```
var Dog = {
    legs: 4,
    name: "Fido",
    bark: function(){
        console.log("Woof!");
    }
}
```

#### Setters & Getters

* Controlling access

```
Dog.legs; // 4
Dog.legs = 6;
Dog.legs; // 6
```

* Adding accesors:

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

```
Dog.getLegs(); // 4
Dog.addLegs(2);
Dog.setName("Super Fido");
Dog.getLegs(); // 6
Dog.getName(); // Super Fido
```

##### Why use accessors?

Primary reasons to use accessors:

* Validation
* Change-Proofing
* Simplifying the complex

#**Practice:**: Writing Accessors

* Create a `Person` object with `firstName` and `lastName` properties
* Create setter methods for `firstName` and `lastName` that verify that the input is:
    * A string
    * Shorter than 50 characters
* Create a getter method called `getFullName` that returns the first name and last name together (look out for spacing)

#### Enforcing privacy

* Javascript doesn't have true privacy natively
* To enforce it, return the object from a function
* You can mention that you're accessing the values via closure, but don't dwell much on it

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

* Properties are variables
* Public parts are returned
* The properties are being referenced from the function, not the object
* You can't access `legs` or `name` directly anymore:

```
Dog.getLegs(); // 4
Dog.getName(); // Fido
Dog.legs; // Undefined
Dog.name; // Undefined
```

**Summary**

* The `Dog` object has encapsulated its properties and its methods together
* Controlled access to them via its accessor methods
* `legs` and `name` are private
* The bark()` method and all the accessors are _public_

#**Practice:**: Real-Life Encapsulation

* Create an object for something in the room.
* It should have at least three properties, and at least two methods.
* The properties should all be _private_
* At least one of the methods should be _public_
* The properties should all have both public accessor methods
* Privacy should be enforced.

When you're done, you should be able to create an object, examine it in your REPL, and see the public parts.

### Inheritance

* Shared behavior in one place, specific in another
* Models things you see in the real world
    * Dogs are a kind of canine, which is a kind of mammal, which is a kind of animal
    * Ford F150 is a truck, car, automobile, vehicle
    * Any hierarchical taxonomy

#**Practice:**: Inheritance

Pick something (other than one of the examples above) that has a hierarchical taxonomy, with at least 3 levels. Write out the hierarchy. Each level should introduce new "methods" (behaviors) and "properties" (characteristics) that are inherited by their children.

#### Inheritance in JavaScript

##### Classical Inheritance

* Other languages use classical inheritance
* Each level of the taxonomy has a class
* A class is a cookie cutter
* An object is a cookie
* An object is one instance of a class

##### Prototypal Inheritance

* No true classes in JavaScript
* Prototypes
* A cookie, not just the cookie
* Looking up .push() on the Array

##### Making Your Own Prototypes

* `new` makes prototypes:

```
var Dog = function(){
    this.legs = 4;
    this.bark = function(){
        console.log("Woof!");
    };
};

Fido = new Dog();
```

* The function is a constructor
* Now build the `Dog`, passing in the name

#**Practice:**: Building Objects

Using the `function` strategy, build out actual instances of all the members from the hierarchy you built above.

#### A note on composition

* Distinguish inheritance from composition

### Polymorphism

* Polymorphism means "many forms"
* Means same method name, different implementation
* Overriding methods

Example

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

* Both dogs bark, but they're implemented differently

#### Interfaces

* Interfaces are contracts for inputs and outputs
* Let's say car has an interface called `Drivable`
    * Have a function called goForward()
    * Which takes a numeric distance as an input
    * And returns a set of (x,y) coordinates
* `Car`, `Go-Kart`, and `Semi-Truck` might do this differently
* Same interface, allows us to use them predictably
    * Override methods from parent objects
    * Implement them differently
    * Without having to change the rest of the program to account for it.

#### Interfaces in JavaScript

* No real interfaces in JS
* Handshakes rather than contracts
* Mention Duck Typing, out of scope for this lesson
* When using Polymorphism to override a method, inputs and outputs should stay the same type

#### Interface Example

* Prototype called `Beast` with a method named `attack()`
* Make three different kinds of `Beast`s with different `attack()` implementations- different battle cries and times they say it
* Write a function that accepts different `Beasts` and uses their `attack()` methods

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

var Bear = new Beast();
var Goose = new Beast();
var Snake = new Beast();

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

var fight = function(beast, numberOfTimes){
    console.log(beast.attack(numberOfTimes));
};

fight(Bear, 2) // "Grr! Grr!"
fight(Goose, 2); // "Quack! Quack! Quack! Quack!"
fight(Snake, 2); // "Hiss! Hiss! Hiss! Hiss! Hiss! Hiss! Hiss! Hiss!"
```

#**Practice:**: Polymorphism

* Use the same hierarchy from previous exercises
* Do the same kind of thing from above
* Input and output data types should be different
* Write a function that can use anything from the hierarchy