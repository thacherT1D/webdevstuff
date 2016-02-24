### Objectives
- provide a non-code-related example of prototypes
- provide a code-related example of prototypes
- describe three benefits of prototypes
- access a prototype with an object literal
- access a prototype with Object.create(obj)
- access a prototype with a constructor

- Re-use of Code
- Consistency of Code
- Real-time updating of Code


#### Exercise (constructor review):
Show me in code what this example would be structured as.

```js
function Librarian() {
  this.name = Math.random().toString(),
  this.library = function() {
    var books = {
      dataBase: [ 'list', 'of', 1000000000000, 'books'],
      dataBaseSize: '80TB'
    }
    return books.dataBase.join(' ') + ' that\'s ' + books.dataBaseSize;
  }
}
```

### Minions
### Implementing with an Object Literal (`{}`)
Sample: Clues into fact that a prototype for objects is "predefined"

With dev tools show where this `constructor` prop is coming from. `minionOne.__proto__`

Object literal syntax is like `var minionOne = new Object`
-> show with memory digram

#### Exercise
List of other props via proto: `minionOne. ` (chrome console drop down list)

***

`minion...`s are instances of `Object` as seen though previous `.constructor()` example.

"implementation of `sayBanana`"
-> reference "Re-Use of Code" from before

"automatically points to `Object.prototype`"
-> Object literal syntax shorthand for `new Object` (constructors!)
-> `new` will "construct" a new Object instance
  -> set `constructor` of instance(object) to that fn
  -> set prototype of instance to the constructor fn's proto


### Implementing with a Constructor (`[[Constructor]].prototype`)
- When you create a fn, JS also creates a prototype Object that the fn points to.

- That prototype object is assigned the `constructor` fn that points back to the original fn you created.
-> Show whiteboard memory diagram

- newly instantiated object will point to that prototype

-> After generating some instances show "Real-time updating of Code"
-> Add to previous memory diagram

### Implementing with Object's Create Method (`Object.create()`)

Whiteboard memory diagram of the following:

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



Revisit objectives
