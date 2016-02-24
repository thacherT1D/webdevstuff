### Objectives
- provide a non-code-related example of prototypes
- provide a code-related example of prototypes
- describe three benefits of prototypes
- access a prototype with an object literal
- access a prototype with Object.create(obj)
- access a prototype with a constructor

### 1 of 6
#### Exercise (constructor review):
Show me in code what this example would be structured as.

```js
function Librarian() {
  this.name = Math.random().toString(),
  this.library = function() {
    books = {
      dataBase: [ 'list', 'of', 1000000000000, 'books'],
      dataBaseSize: '80TB'
    }
    return books.dataBase.join(' ') + " that's " + books.dataBaseSize;
  }
}
```

### 2 of 6

#### Exercise
List of other props via proto: `foo. ` (chrome console drop down list)

### 3 of 6
Have not fully highlighted these points yet, but they will be hashed out with upcoming examples.

### 4 of 6
##### Prototypical Model
`minion...`s are instances of `Object` as seen though previous `.constructor()` example.

"implementation of `sayBanana`"
-> reference "Re-Use of Code" from before

"automatically points to `Object.prototype`"
-> Object literal syntax shorthand for `new Object` (constructors!)
-> `new` will "construct" a new Object instance
  -> set `constructor` of instance(object) to that fn
  -> set prototype of instance to the constructor fn's proto

## Do 6-6 before 5-6
### 6 of 6


### 5 of 6
##### Classical Model
- When you create a fn, JS also creates a prototype object that the fn points to.
- That prototype object is assigned the `constructor` fn that points back to the original fn you created.
- newly instantiated object will point to that prototype

Example
```js
var motorVehicle = {
  drive: function() {
    console.log(this.seats);
  },
  seats: 2
};

var modernCar = Object.create(motorVehicle);
modernCar.seats= 4;

var fiat = Object.create(modernCar);

motorVehicle.drive();
modernCar.drive();
fiat.drive();
```



Revisit objectives and notes from section 2 of 6









#### Cho's Notes:

A simple diagram - https://drive.google.com/file/d/0B0bI_haYH48oZE5tcUs5UTBrVW8/view

### 1) A Non-Code-Related Example with Customer-Support
For this exercise, I would have students write on a mini-whiteboard and expect something similar to the conde snippet below:

```javascript
var customerSpecialist = {
  id: 01,
  email: 'cho.kim@galvanize.com,
  library: function(question) {
    // ...
  }
};
```

### 2) A Code-Related Example with JavaScript Objects
For this exercise, have students create a list of properties and methods that are accessed through the prototype chain. After enough time, select five students and ask each to name a property or method on their list.

### 3) Three Benefits of Inheritance
For this exercise, have students pair and develop their own real-world example of prototypes. After enough time, select three pairs to share their example with the class.

### 4) Implementing with an Object Literal (`{}`)
For this exercise, select three to share their in-memory diagram on a white-board that's larage enough for the entire class to view. After each diagram, prompt the students if their diagram is correct and why. Add modificaitons to their diagram if necssary and explain the rationale.

### 5) Implementing with Object's Create Method
For this exercise, do the same as thing described for the exercise in 4 of 6.

### 6) Implementing with a Constructor
For this exercise, do the same as thing described for the exercise in 4 of 6.

### Lab
The repo is [prototype-zoo](https://github.com/gSchool/prototype-zoo)

- Have students clone this repo.
- The first test will be passing. Have a student explain/analyze what's happening with the passing test.
- Work through the first test or two as a class.
- Let students work on the rest of the repo
- Comeback and review each other’s solutions in groups (where students show their answers on the board)
