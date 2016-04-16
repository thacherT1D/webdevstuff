# Java Curriculum Instructor Notes

## Lesson 1 - Differences between Java and JavaScript.

**I do**:

- Talk a bit about Java, the history of Java
- Verbally run through the Unit-1-Syntax stuff
- Demo some Java

Be sure to hit on the following:

- it's statically typed
- it's compiled
- talk about types in general

**We do**:

Take a snippet of javascript code and convert it / run it by soliciting feedback from the class:

```js
var names = ["Alice", "Bob", "Cory"]
var result = ""
for (var i = 0; i < names.length; i++) {
  result += names[i]
}
console.log(result);
```

**You do**

Have students run through `Unit-1-Syntax/Exercise01` and `Unit-1-Syntax/Exercise02` on their own.

**Checks for understanding**

- what does `void` indicate?
  - the method will not return anything
- what steps do you need to take in order to write the simplest Java program?
  - class w/ main method inside a `.java` file
  - compile
  - run
- what is a type?
  - a collection of methods, where each method has a certain signature (name + parameters + parameter types + return value types)

## Lesson 2 - Encapsulation

**I do**

Lecture about Encapsulation.

- Cover theoretical examples
- Draw it on the board
- Give real-world example (below)
- Live code getters / setters
- cast in the narrative of lowering the cost of change


  Version 1: You have a simple object that represents a Document.  The Document has a `status` field.  You implement the `status` field as a public property.  Dozens or hundreds of other pieces of code reference this status field (think about it being shown on hundreds of different views).

  Then, you realize that you want to _calculate_ the status based on the various approval processes that have happened.  You have to go to the dozens or hundreds of places where other code is referencing the `status` field, and refactor it.

  Version 2: Instead of having a `status` public field, you have a `status()` method and a `setStatus()` method.  The _internal_ details (state) of the object are no longer leaked to the outside world.  So you can make a change, and not have to refactor any outside code.

  _How does it support change?_ Encapsulation helps make it easier to change code because it allows each class to hide the implementation details.  So you can change the _inner_ workings of a class, without changing the _outer_ contract the class provides.

**We Do**

Run through `Unit-2-Encapsulation/Encapsulation01` together.

**You Do**

Run through `Unit-2-Encapsulation` exercises on their own.

**Checks for understanding**

- What is encapsulation?
  - the concept that classes should not expose data directly to the outside world
  - private fields (instance variables) and public methods
  - as course-grained as possible (`deposit` over `getBalance / setBalance`)
- What is another word for encapsulation?
  - data hiding

## Lesson 3 - Inheritance

**I do**

Lecture on inheritance.

- talk about it
- draw it
- live code some examples
- talk about a real-world example (below)
- cast in the narrative of lowering the cost of change


    Version 1: You have a class that connects to a database and runs a query.  You need lots of classes to connect to databases and run queries, so you create lots of classes (User, Order, Product etc...)

    Then you realize that you want all of those classes to run their queries inside of a transaction, and handle errors better.  You have to go to each class and make the change.

    Version 2: You have one superclass that has the code to connect to the database, make queries and handle errors.  Then all the classes, such as User, Order, Product are subclasses.  Now you need to add logging to that connection method - you make the change in one place.

    _How does it support change?_ - Inheritance supports change because it allows you to:

    - add new features to your program without duplicating code
    - change behaviors of multiple classes at once by just changing the superclass


**We do**

Run through `Inheritance01` as a class.

**You do**

Do the rest of them individually.

**Checks for understanding**

Show lots of whiteboard examples.

- Show a class and a subclass, then a line of code that instantiates each and ask what it will log
- Try to instantiate an abstract class and ask what will happen
- Show constructors and ask what will be called


## Lesson 4 - Polymorphism

**I do**

- Talk about Polymorphism
- Give examples
- Draw the objects out
- be sure to tie back to dependency injection
- cast in the narrative of lowering the cost of change
- Discuss the challenges of polymorphism in a typed language
- Live code some stuff


    Example 1: You have a huge number of objects in your system - such as User, Order, Product etc... You want to serialize them all to JSON, so you come up with a bunch of serializers that all either a) inherit from the same abstract base class or b) implement the same interface.

    Example 2: Activity Feeds.  Each feed item is different, but each could have a `render` method.

**We do**

Go through the first example together in `Unit-4`

**I do**

They go through the other exercise

**Checks for understanding**

## Written Assessments

https://students.galvanize.com/assessments/76

----------

Notes:

https://github.com/gSchool/java-curriculum/tree/solution

Stretch goals to cover include:

- Abstract classes
- Template methods

One key point to bring up is that these concepts work _together_ to form powerful patterns.

### Inheritance

- http://beginnersbook.com/2013/03/oops-in-java-encapsulation-inheritance-polymorphism-abstraction/

## Class Diagrams

Like ERD, but with some subtle differences.


Examples:

Inheritance:

- Employees
  - all have names (state)
  - Managers
  - Individual Contributors

- Logger
  - Log to a file
  - Log to STDOUT
  - Log to a database
  - All have common things such as log levels (WARN, DEBUG, etc...) and formats

Polymorphism (one thing, many forms | one idea, many implementations)

- Compile time
  - HTMLTag Builder
    - you can instantiate with a self-closing tag, or not (overloading)
- Runtime
  - ETL (extract, transform, load)
    - you can override methods in each
    - Multiple extractors
    - Multiple transformers
      - CSV transformer
      - TSV transformer
    - Multiple loaders
    - one class that can take them, run them, report errors and log


1.What are 3 primitive data types supported by the Java programming language?
Possible Answers: byte, short, int, long, float, double, boolean, char

2.What is the difference between an Array and an ArrayList
Possible Answer:Arrays have a fixed length and an ArrayList can be added on to

3.When creating a method , what does the keyword void do?
Possible Answer:It tells the compiler that the function does not return a value.
