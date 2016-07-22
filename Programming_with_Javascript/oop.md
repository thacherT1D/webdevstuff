# OOPs I Did It Again

## Objectives

By the end of this lesson you should be able to:

- Explain why Object Oriented Programming is useful.
- Describe what Object Oriented Programming is.
- List the 4 Pillars of Object Oriented Programming.
- Implement Prototypal Inheritance in Javascript.

## Why OOP?

- OOP provides a strong design pattern and a structured way to build programs.
- OOP promotes code reusability.
- OOP allows programmers to extend the language with custom types.
- OOP allows modular design.
  - Objects can be developed by different teams of developers simultaneously then put together like legos. Instead of having to wait for one team to finish before designing the next piece.
  - Objects can easily be removed from a program and replaced without having to change the rest of the program.
- OOP allows for real world objects to easily be represented in code.
- It is very likely most of you will be asked OOP questions in an interview.

## What is OOP?

Object Oriented Programming (OOP) is a programming paradigm.

That is to say, OOP is a structured philosophy which describes how to think about code and design programs.

Object Oriented Programming uses `Classes / Prototypes` to describe the intended `state` and `behavior` of an object. A `Class / Prototype` can be `Instantiated` to create an `object`.

An object is an instance of a class or prototype, which is where we get the word instantiate.

`State`: State refers to the values and data an object holds.

```javascript
// This objects state is val = t
var foo = {
  val: 't'
};
// Now its state is val = q
foo.val = q;
```

`Behavior`: Behavior refers to the actions the object can perform.

```javascript
// This the objects behavior is to add two items together.
var util = {
  add: function(a, b){
    return a + b;
  }
};
```

`Method`: A method is a function attached to an object. Methods define behavior and mutate an objects state. In the example above, `add` would be considered a method of `util`.

Object Oriented Programming is a pattern that applies to many common programming languages. It goes especially well with strongly typed languages, since you can create custom types.

Code written C++, C#, Java, Ruby and Python is often written using Object Oriented design.

Javascript can be written using Object Oriented patterns. Although, Javascript gets a little weird and isn't the best language to introduce beginners to OOP. Don't worry though, we'll revisit OOP when we learn about Statically Typed languages in Q4.

## 4 Pillars

A program is considered be object oriented if it makes use of 4 design patterns known as pillars.

The 4 Pillars of OOP are:

- Encapsulation
- Abstraction
- Polymorphism
- Inheritance

Different languages have various ways to making use of these patterns. Some languages make working with these patterns very natural; other languages you have to go out of your way to make use of these patterns..

Javascript naturally fits well with some of these pillars, and others not so much. That being said, OOP in Javascript is still very power.

### Encapsulation

**Definition:**

Encapsulation is:
  - Restricting access to the internals of an object, and only exposing certain state and behavior through an interface.
  - The act of grouping similar state (data / values) and behavior (methods / functions) together.

Restricting access to the internals of an object protects the objects integrity.  It prevents the object from being modified in a manner that would put it in an illegal state (break it).

Grouping state and behavior together is very convenient, as all the operations you would need to perform on the data are bundled with it.

For example, a shape object might store state like width, height and color, it would also have behavior for calculating the area of the shape.

**Real World Example:**

Volkswagon encapsulates their engines by bolting on a cover. This prevents users from tampering with the engine, thus guaranteeing the engines integrity.

A Volkswagon's state could be, how fast it is traveling and how much fuel it has. The behavior could be accelerate, decelerate - which are methods that operate on the objects state. They change how much fuel the vehicle has, and how fast it is traveling.


**Code Example:**

```javascript
// we'll use a closure to encapsulate speed and fuel
// the user cannot access or modify these values
// instead they have to use the interface returned by the closure
// The interface provides methods which operate on the state (behavior)
function VW(speed, fuel){

  return {
    accelerate: function {
      if(fuel > 0){
        speed += 1;
        fuel -=1;
      }
      return speed;
    },
    decelerate: function {
      speed -= 1;
      return speed;
    }
  };

}

var jetta = VW(10, 10);

// We can only interact with the object through the provided interface.
jetta.speed; //undefined
jetta.fuel; //undefined
jetta; // { fn accelerate, fn decelerate }

jetta.accelerate();
jetta.decelerate();
```

In the example above, we can only interact with Jetta through the provided interface (what was returned). We can only decelerate or accelerate. We cannot change the fuel or speed.

### Abstraction

**Definition:**

Abstraction is the act of hiding complexity and instead providing a simplified interface to interact with the program.


**Real World Example:**

**Code Example:**


### Inheritance

**Definition:**

Inheritance is where an object can take on the state and behavior of another object.

This is very useful when dealing with like objects. Instead of having to reimplement the same functionality repeatedly, you only have to do it once.

It also makes things easier on the developer, because all objects that inherit from the same class / prototype are likely to have methods and state

**Real World Example:**



**Code Example:**


### Polymorphism

The world literally is Greek for many forms.

**Definition:**

Providing a single interface to objects of different types.

There are several types of Polymorphism:

- An interface which provides different behavior dependent on the types of the arguments passed into the method. (Ad Hoc Polymorphism / Method Overloading)
- An interface which provides different behavior dependent on the object the method is invoked upon. (Subtype Polymorphism / Inclusion Polymorphism / Method Overriding)
- An interface which can operate on any type provided. (Generic programming / Parametric Polymorphism)

For the rest of this article, we will primarily use Method Overriding to implement polymorphic design.

**Real World Example:**

Volkswagon Jettas, Golfs, GTIs and Audis are similar vehicles. Instead of redesigning and manufacturing the each one, they developed a single set of components and used them in every vehicle.

**Code Example:**

```javascript
function Car(_model, _speed, _fuel){
  this.model = _model;
  this.speed = _speed;
  this.fuel = _fuel;
}
Car.prototype.accelerate = function(){
  if(this.fuel >= 0){
    this.speed++;
  }
  return speed;
}
Car.prototype.decelerate = function(){
  if(this.speed >= 0){
    this.speed--;
  }
  return speed;
}

function GTI(_speed, _fuel){
  Car.call(this, 'GTI', _speed, _fuel);
}
GTI.prototype = Object.create(car.prototype);

function Jetta(_speed, _fuel){
  Car.call(this, 'Jetta', _speed, _fuel);
}
Jetta.prototype = Object.create(car.prototype);

var myCar = new GTI(0, 100);
myCar.accelerate();

var yourCar = new Jetta(100, 0);
yourCar.decelerate();
```
