# OOPs I Did It Again: Prototypal Inheritance and JS

## Objectives

By the end of this article you will be able to:

- Implement Prototypal OOP in Javascript.
- Create an object prototype.
- Construct an object from a prototype.
- Inherit from a prototype.

## Intro


Javascript supports both `Loose Inheritance` and `Prototypal Inheritance`, and even allows for custom implementations of inheritance as well. For this lesson, we will focus on `Prototypal Inheritance`.

## Creating an Object Prototype


The first step is to create a constructor function.

```javascript
function Animal(){

}
```

A constructor will construct an instance of the object based on the prototype (instantiate). When we invoke the constructer we use the `new` keyword:

```javascript
var dog = new Animal();
console.log(dog);
console.log(dog instanceof Animal);
console.log(typeof dog);
```

Our dog variable is now an instance of the Animal Prototype.

Right now the Animal prototype doesn't have any state so lets add some:

```javascript
function Animal(_species, _weight, _sound){
  this.species = _species;
  this.weight = _weight;
  this.sound = _sound;
}
```

What does `this` refer to in the constructor?

`this` refers to the object the constructor is instantiating.

Now that we updated our constructor, let's instantiate an animal:

```javascript
var dog = new Animal('dog', 24, 'woof');
console.log(dog);
console.log(dog instanceof Animal);
console.log(typeof dog);
```

Great! Our dog now holds state and values.

Let's add some methods to the Animal Object.

In order to do that, we simply need to add functions to the Animal's prototype.

```javascript
function Animal(_species, _weight, _sound){
  this.species = _species;
  this.weight = _weight;
  this.sound = _sound;
}

Animal.prototype.speak = function(){
  console.log(this.sound);
};
```

Notice how `this` in the prototype method refers to the same `this` as in the constructor.

They both refer to the object instance.

Now let's test out our method:

```javascript
var dog = new Animal('dog', 24, 'woof');
dog.speak();
```

`this.sound` in the `speak` method refers to `dog.sound`;

We can now use our prototype to construct / instantiate  unlimited Animal objects:

```javascript
var dog = new Animal('dog', 24, 'woof');
dog.speak();

var goat = new Animal('goat', 52, 'bleat');
goat.speak();

var cat = new Animal('cat', 52, 'meow');
cat.speak();
```

**You Do:**

- Create a prototype called `Rectangle`.
- Constructor takes in `_width` and `_height` and sets them as a value on the rectangle.
- Prototype has a method called calculate area, which returns width * height.
- Instantiate the rectangle and invoke the method.

## Inheriting from an Object


Let's inherit from Animal to create a dog species. The first step would be to create a  constructor for the new Object Prototype.

```javascript
function Dog(){

}
```

Now we need to invoke the parent/super prototypes constructor:

```javascript
function Dog(_weight){
  Animal.call(this, 'dog', _weight, 'woof');
}
```

This will invoke the parent constructor, and `this` will refer to the dog being constructed.

```javascript
var spot = new Dog(25);
spot.speak();
```

Damn, that didn't work. That's because we haven't taken on the super prototypes prototype.

```javascript
function Dog(_weight){
  Animal.call(this, 'dog', _weight, 'woof');
}
Dog.prototype = Object.create(Animal.prototype);
```

Now that we have the parents prototype lets try that again:

```javascript
var spot = new Dog(25);
spot.speak();
```

Now it works! We now have taken all the state and behavior of the parent animal object.

What properties does spot have?

```javascript
var spot = new Dog(25);
console.log(spot);
console.log(spot.hasOwnProperty(speak));
spot.speak();
```

Lets say we want to change the behavior of speak. Instead of console logging the sound, lets have it return the sound. This is known as method overriding, a type of polymorphism.

```javascript
function Dog(_weight){
  Animal.call(this, 'dog', _weight, 'woof');
}
Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.speak = function(){
  return this.sound;
};

var spot = new Dog(25);
spot.speak(); //returns woof, previously console logged.
```

What properties does spot have now?

```javascript
var spot = new Dog(25);
console.log(spot);
console.log(spot.hasOwnProperty(speak));
spot.speak();
```

Interesting.


We can now even add custom methods to Dog:

```javascript
function Dog(_weight){
  Animal.call(this, 'dog', _weight, 'woof');
}
Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.speak = function(){
  return this.sound;
};

Dog.prototype.eat = function(){
  return this.weight += 1
};

var spot = new Dog(25);
spot.speak(); //returns woof
spot.eat(); //26
```

Here's the full example:

```javascript
//declare animal constructor
function Animal(_species, _weight, _sound){
  //when the constructor is invoked with the new keyword
  //this refers to the object being constructed
  //so we are giving the constructed animal
  this.species = _species;
  this.weight = _weight;
  this.sound = _sound;
}

//add a method to the animal prototype
Animal.prototype.speak = function(){
  console.log(this.sound);
};

//create dog constructor
function Dog(_weight){
  //dog constructor calls super / parent constructor
  //it passes in the this
  Animal.call(this, 'dog', _weight, 'woof');
}
//have dog take on a copy of the parents prototype
Dog.prototype = Object.create(Animal.prototype);

//override super classes speak method
Dog.prototype.speak = function(){
  return this.sound;
};

//define method eat
Dog.prototype.eat = function(){
  return this.weight += 1
};

//construct an instance of a dog
var spot = new Dog(25);
//invoke methods
spot.speak(); //returns woof
spot.eat(); //26
```

**You Do:**

- Create a prototype called `Square`.
- Constructor takes in `_width` and invokes super constructor of `Rectangle` passing in `_width` for both `_width` and `_height`.
- Have `Square` takes on parents prototype.
- Instantiate a square and invoke the method.


## Useful Methods / Keywords

- `hasOwnProperty`
- `instanceof`
- `typeof`
- `call/apply`
- 'instance.constructor'

## Consider

- What happens when you override a method then delete delete the overridden method?
- Is there a way to automate this, so you don't have to type as much?
- Where can you apply this knowledge in previous projects?

## Glossary

- State
- Behavior
- Method
- Encapsulation
- Abstraction
- Polymorphism
- Inheritance
- Instantiate
- Interface
- Object Oriented Programming
- Functional Programming (maybe)
- Static (maybe)
- Classical OOP
- Prototypal OOP
- Type
- Super
