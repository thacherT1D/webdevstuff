# Intro to Object Oriented Programming with Java

## Why

As evidenced in the Intro to Java, Java is a programming language built with OOP in it's core. Every program must be made up of classes and composed of objects to be valid, let alone run. The ideas around abstraction, encapsulation, inheritance, and polymorphism are ever present and inform programming in Java.

## Objectives
- List and explain the 4 pillars of Object Oriented Programming
- Implement getters and setters to work with private / protected fields
- Explain the difference between classical inheritance and prototypal inheritance
- Implement inheritance using constructors and abstract classes
- Implement ad hoc polymorphism in the form of method overloading
- Implement subtype polymorphism via method overriding

## 4 Pillars of OOP Review

### Abstraction

Abstraction is the act of hiding complexity and instead providing a simplified interface to interact with the program.

### Encapsulation

Encapsulation is

- Restricting access to the internals of an object, and only exposing certain state and behavior through an interface.
- The act of grouping similar state (data / values) and behavior (methods / functions) together.

### Inheritance

Inheritance is where an object can take on the state and behavior of another object.

### Polymorphism

Polymorphism is providing a single interface to objects of different types.

There are several types of Polymorphism:

- An interface which provides different behavior dependent on the types of the arguments passed into the method. (Ad Hoc Polymorphism / Method Overloading)
- An interface which provides different behavior dependent on the object the method is invoked upon. (Subtype Polymorphism / Inclusion Polymorphism / Method Overriding)
- An interface which can operate on any type provided. (Generic programming / Parametric Polymorphism)

## Encapsulation in Java

### Visibility

In order to understand Encapsulation, you must know about the concept of _visibility_.  Java allows you to define which classes, methods and variables are visible to which pieces of code.  There are 3 key words that express the visibility of a method or field.

- public
- private
- protected

When a method / field is marked as `private`, only code _inside_ the class definition can see that method / field.

Marking a method / field as `public` allows for code that is inside and outside the class definition to access that method / field.

If a method / field is marked as `protected`, it can only be accessed by classes that extend / inherit to its class definition. This will be discussed in greater detail in the inheritance lesson.

You can set the visibility of methods / fields like so:

```java
private int count = 0;

public void increment(int num) {
  count++;
}
```

Furthermore, any methods / fields that do not have an access modifier, as such-

```java
int count = 0;
```

-will be treated as if they where `private` methods / fields.

To get familiar with visibility, navigate to the following directory and then run:

```
cd Unit-2-Encapsulation/problems/Encapsulation01
javac -d bin Encapsulation01.java && java -cp bin galvanize.Encapsulation01
```

You should see the following error:

```
error: allInFavor has private access in Proposal
```

#### Exercise 1

Fix the `Proposal.java` file so that visibility is properly implemented.

#### Exercise 2

Add a new field to the `Proposal` class name `allAgainst`. In the `Encapsulation01` class, assign a value to the `allAgainst` field in the instantiated object, and print out that value.

Add your changes to `Encapsulation01`.

## Private fields / public methods

The main idea behind encapsulation is that you want to make _private fields_, and provide _public methods_ that will internally modify those fields.

A private field looks something like this:

```java
class Person {
  private String name = "";
}
```

A getter method looks something like this:

```java
public String getName() {
  return name;
}
```

A setter method looks something like this:

```java
public void setName(String name) {
  this.name = name;
}
```

#### Exercise 3

In the `Encapsulation02` example, the program accesses the `Proposal` object's fields directly.  Alter `Proposal` to have:

- a private name field
- a public getter method that returns the name
- a public setter method that sets the name to whatever is passed in

Then update the `Encapsulation02` class to:

- print out value of the name field using the getter
- update the value using the setter
- print out the value again

```
javac -d bin Encapsulation02.java && java -cp bin galvanize.Encapsulation02
```

### Exercise 4

You don't always need strict getter and setter methods (`getThing`, `setThing`).  Instead you could implement methods that more naturally fit into your domain.  In `Encapsulation03`, the program accesses the public `balance` property directly.  Make the following changes to `Account`:

- make `balance` private
- create a `balance()` method that returns the balance
- create a `deposit()` method that takes an int and adds money to the balance
- create a `withdraw()` method that takes an int removes that much from the balance
- refactor the `main` method and the `Transfer` class to work, now that you've made those changes

```
javac -d bin Encapsulation03.java && java -cp bin galvanize.Encapsulation03
```

### Seeing it in action

Why would you want to encapsulate data in your object?  All Object Oriented practices exist to help keep the cost of change low.  Consider the following example:

In the previous example you saw an account.  The account had a `balance` field.  That field kept track of the balance.  Let's say that instead of keeping a balance field, you instead want to _calculate_ the balance based on the transaction history.

So now you want to store an internal array of transactions.  Then you want the concept of `balance` to be the sum of the transactions, not to be a field itself.

If your program exposed the `balance` field to the world, when you make this change you might have to refactor hundreds or thousands of lines of code throughout your program.  But if you have a `balance()` method, you can change the _internal_ implementation and the outside world won't even know that it happened.

#### Exercise 5

Refactor the `Encapsulation03` example such that:

- there's an internal private Array field called `transactions`
  - NOTE: for now just hardcode it to be 10 items long
- `deposit()` should insert a positive integer
  - NOTE: you can't push into an array, so keep track of the last index with a private `index` variable
- `withdraw()` should insert a negative integer
- `balance()` should return the sum of all of the elements in the array

Notice how even though you did some major surgery to that class, the code that _used_ that class didn't change at all.

```
javac -d bin Encapsulation03.java && java -cp bin galvanize.Encapsulation03
```

### Resources

- https://docs.oracle.com/javase/tutorial/java/concepts/index.html
- https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html


## Inheritance in Java

Inheritance is the way in which a sub class can access fields and methods defined in a parent class, and can optionally do things such as:

- add new fields and methods
- override methods to change their behavior

Classes can only inherit from _one_ other class.

### Method Signatures / Overloading

In order to fully understand inheritance and how constructors work, you must understand the concepts of method signatures.

A **method signature** is comprised of:

- the method name
- the number of parameters
- the types of parameters
- the order of parameters

Because Java has types, it can be very specific in how it chooses which method to call.  The concept of having different methods with the same name is called _method overloading_.

The following are all _different method signatures_:

```java
public class Doer {

  public void doStuff() {
    System.out.println("Version 1");
  }

  public void doStuff(String message) {
    System.out.println("Version 2");
  }

  public void doStuff(String message, boolean important) {
    System.out.println("Version 3");
  }

  public void doStuff(boolean important, String message) {
    System.out.println("Version 4");
  }

}
```

You would say that you have "overloaded" the `doStuff` method 3 times.

When you call `doStuff`, the JVM figures out which one to call:

```java
Doer doer = new Doer();

doer.doStuff();                       // calls version 1
doer.doStuff("with a string");        // calls version 2
doer.doStuff("with a string", true);  // calls version 3
doer.doStuff(false, "with a string"); // calls version 4
```

#### Exercise 1

Try it yourself.  Run the following file:

```
cd Unit-3-Inheritance/problems/Inheritance01
javac -d bin Inheritance01.java && java -cp bin galvanize.Inheritance01
```

Then:

- overload the `printName` method with a new method with signature that has another parameter `middle` and prints the first / middle / last
- overload the `printName` method with a new method with signature that has another parameter `lastFirst` that prints the name in the format "last, first"

### Inheriting

The basic syntax for inheriting from another class looks like this:

```java
class Vehicle {
}

class Car extends Vehicle {
}
```

In the example above, `Car` is a subclass of `Vehicle`.

#### Exercise 2

Run the following code:

```
javac -d bin Inheritance02.java && java -cp bin galvanize.Inheritance02
```

Then:

- alter `Manager` such that it is a subclass of `Employee`
- remove the `status` field from `Manager` as well as the `getStatus` method and re-run

### Method Overriding and `super.method`

If a subclass defines a method with the same _method signature_ of its parent class, it _overrides_ that method.

Take the following example:

```java
class Person {
  void speak(String message) {
    System.out.println(message);
  }
  void speak(String message, boolean shout) {
    System.out.println(message.toUpperCase());
  }
}

class Smoker extends Person {
  void speak(String message) {
    System.out.println("*cough*... " + message);
  }
}

class RunIt {
  public static void main(String[] args){
    Smoker smoker = new Smoker();

    smoker.speak("hello");        // prints *cough*... hello (from the subclass)
    smoker.speak("hello", true);  // prints HELLO (from the superclass)
  }
}
```

Notice how calling the `smoker`'s `speak` method with just a string called the subclass' `speak` method.  That's because it matched the _method signature_ exactly.

#### Exercise 3

Do it yourself:

```
javac -d bin Inheritance03.java && java -cp bin galvanize.Inheritance03
```

In `Inheritance03` _override_ the `getStatus` method such that it prints "this manager is employed".

---

**Overridden methods can call the superclass method**

```java
class Person {
  String speak(String message) {
    return "I'd like to say " + message;
  }
}

class Smoker extends Person {
  String speak(String message) {
    return "*cough*... " + super.speak(message);
  }
}

class Scratch {
  public static void main(String[] args){
    Smoker smoker = new Smoker();

    System.out.println(smoker.speak("howdy"));
  }
}
```

Notice the call to `super.speak(message)` - you can call the superclass method by using the `super` keyword.

### Constructors, Inheritance and `super()`

Every class in Java has a constructor.  By default it's a no-op (that is, it does nothing) method that takes no parameters.

```java
class Order {
  // default constructor is added automatically
}
Order order = new Order();
```

The code above is the same as:

```java
class Order {
  Order() {
  }
}
Order order = new Order();
```

**Constructors are called from the top down**

When you instantiate an object, all matching constructors are called in order:

```java
class Order {
  Order() {
    System.out.println("From Order");
  }
}
class SpecialOrder extends Order {
  SpecialOrder() {
    System.out.println("From Special Order");
  }
}
class VerySpecialOrder extends SpecialOrder {
  VerySpecialOrder() {
    System.out.println("From Very Special Order");
  }
}
VerySpecialOrder order = new VerySpecialOrder();
```

If you run that code, you'll see:

```
From Order
From Special Order
From Very Special Order
```

This is different from JavaScript.  In JavaScript you have to _manually_ call other constructor functions.

**Constructors are not inherited, but can call parent constructors with `super()`**

If you define a constructor in a base class that takes parameters, subclasses won't be able to use it:

```java
class Order {
  Order(int amount) {
    System.out.println("From Order");
  }
}
class SpecialOrder extends Order {
}
SpecialOrder order = new SpecialOrder(2);
```

Instead, you need to define a Constructor like so:

```java
class Order {
  Order(int amount) {
    System.out.println("From Order");
  }
}
class SpecialOrder extends Order {
  SpecialOrder(int amount) {
    super(amount); // call the superclass constructor
    System.out.println("From Special Order");
  }
}
SpecialOrder order = new SpecialOrder(2);
```

#### Exercise 4

Do it yourself:

```
javac -d bin Inheritance04.java && java -cp bin galvanize.Inheritance04
```

Update `Inheritance04` such that `Adder`, `Subtractor` and `Multiplier` all inherit from a class named `Calculator` and all have a constructor that calls `super` appropriately.

### How does it know?

Lets say you have a `Customer` class that inherits from a `Person` class.

When you run the following code `Customer bob = new Customer('Bob', '123 Main St')`, the JVM will do the following:

- Find the `Customer` class
- Find a constructor on `Customer` that matches the _method signature_ `String, String`
- Call all of the appropriate superclass constructors based on what's in the `Customer` constructor

So the same concepts of method _overloading_ apply to constructors.

### Seeing it in action

Why would you want to use inheritance in an application?  Inheritance lowers the cost of change by keeping your code DRY.  Take the following scenario:

- You have an app where you track Customers and Orders
- Both Customers and Orders make connections to databases, so they have private `query` methods
- One day you realize you want to log out the database calls, so you have to add log statements in _both_ classes
- Imagine that but times hundreds of classes

With inheritance, Customers and Orders could inherit from a `DatabaseQuery` class, and could _inherit_ the `query` method, such that when you make a change to the query method, it affects all classes.

### Resources

- http://stackoverflow.com/questions/14643362/overriding-constructors
- http://docstore.mik.ua/orelly/java-ent/jnut/ch03_04.htm
- https://dzone.com/articles/design-patterns-template-method


## Polymorphism in Java

### Abstract Classes

In order to understand Polymorphism, it's helpful to understand Abstract classes.  Abstract classes are classes that can define fields and methods, but cannot be instantiated.  You can define Abstract classes like so:

```java
abstract class Importer {
  int importCount = 0;
  abstract void getCount();
}

class JSONImporter extends Importer {
  public void getCount(){
    System.out.println(importCount);
  }
}
```

### Polymorphism and Inheritance

Polymorphism is a powerful software design principle.  Polymorphism is a _way of programming_, not an explicit language feature.  You can program polymorphic code in either a Functional style or an Object-Oriented style.  You can write polymorphic code in statically typed or dynamically typed languages.

Polymorphism consists of two parts:

- A method or statement that can work with objects of _different types_
- A number of different _types_ of methods with the same _method signature_

Polymorphism describes a way for a single statement to call the same method on multiple different instances.  Here's an example:

```java
abstract class SomeBaseClass {
  abstract void doStuff();
}

class SomeClass extends SomeBaseClass {
  void doStuff(){
    System.out.println("Doing stuff");
  }
}

class SomeOtherClass extends SomeBaseClass {
  void doStuff(){
    System.out.println("Doing other stuff");
  }
}

class Runner {
  void run(SomeBaseClass o) {
    o.doStuff();
  }
}

class Junk {
  public static void main(String[] args){
    Runner runner = new Runner();
    runner.run(new SomeClass());
    runner.run(new SomeOtherClass());
  }
}
```

**How is Polymorphism different from Inheritance?**

Inheritance is one way to _achieve_ polymorphism, if and only if

- methods are defined in the base class
- only behaviors are overridden in the sub classes (not method signatures)

There are other ways to achieve polymorphism, such as Interfaces.

#### Exercise 1

**Do it yourself**

Run the following command:

```
cd unit-4-Polymorphism/problems/Polymorphism01
javac -d bin Polymorphism01.java && java -cp bin galvanize.Polymorphism01
```

Now make all classes inherit from a common abstract base class, and remove the `instanceof` / `if` statements.

NOTE: `import` is a keyword, so if you try to use `import` as a method name, it will raise a cryptic syntax error.

### Polymorphism and Interfaces

Inheritance is one way to achieve polymorphism.  Java provides another way to achieve polymorphism: Interfaces.

Interfaces are similar to Abstract Classes, with a few key differences:

- they cannot define fields (only methods)
- they cannot define any implementation, just method signatures
- classes can _implement_ several interfaces, whereas they can only _extend_ one parent class

```java
interface Importer {
  void doImport();
}

class JSONImporter implements Importer {
  public void doImport(){
    System.out.println("Importing JSON");
  }
}

class XMLImporter implements Importer {
  public void doImport(){
    System.out.println("Importing XML");
  }
}

class CSVImporter implements Importer {
  public void doImport(){
    System.out.println("Importing CSV");
  }
}
```

#### Exercise 2

Run the following command:

```
javac -d bin Polymorphism02.java && java -cp bin galvanize.Polymorphism02
```

Now create a similar fix as you did to `Polymorphism01` but use an interface instead.

### When to use polymorphism

Any time you see `instanceof` in your code, you should consider whether you can replace it with polymorphism.

Polymorphism forms the basis of non-declarative Dependency Injection.  For example using an interface:

```java
interface Importer {
  abstract void importData();
}

class CSVImporter implements Importer {
  public void importData() {
    System.out.println("Importing!!");
  }
}

class ETL {
  Importer importer;

  ETL(Importer importer) {
    this.importer = importer;
  }

  void run() {
    this.importer.importData();
  }
}

class Junk {
  public static void main(String[] args){
    ETL etl = new ETL(new CSVImporter());
    etl.run();
  }
}
```

### Resources

- http://docs.oracle.com/javase/tutorial/java/TOC.html
- https://en.wikipedia.org/wiki/Polymorphism_(computer_science)
- http://www.codejava.net/java-core/the-java-language/12-rules-of-overriding-in-java-you-should-know
- http://www.artima.com/objectsandjava/webuscript/PolymorphismInterfaces1.html

