## Warmup

Here's an example of some hypothetical HTML:

```
<room name="dining room">
</room>
```

Using this style, model the following things:  a concert, with concert goers, performers etc...

## I Do

[link slides here]

- Demo the fact that you can put functions in the value of a property.
- Talk about _why_ you'd want to do this
  - Group properties and functions in a easy-to-understand package
  - Helps you not have to come up with different names for every function in your whole program
  - Helps organize code in a way that humans can understand
  - Example: "you wouldn't have a legs function that could take a table or a human, you'd have a human object with a legs function"
- Talk about difference between calling a function with a . or a named function
  ```js

  function name(){
    return "Barbara Streisand";
  }

  var person = {
    name: function(){
      return "John Cena";
    }
  };

  name(); // Barbara
  person.name(); // John Cena
  ```
- Questions:
  - In pairs, come up with 4 examples you've already used where this happens
  - `console.log`
  - `string.toUpperCase`
  - `array.join`
- Always need to invoke with parentheses
  ```js
  var person = {
    name: function(){
      return "Alf";
    }
  }

  console.log(person.name) // what would happen?
  console.log(person.name()) // what would happen?
  ```
- Demo that `this` inside the function points to the object
  ```js

  var person = {
    first: "John",
    last: "Cena",
    fullName: function () {
      return this.first + " " + this.last;
    }
  };
  person.fullName();
  person.first = "JoJo";
  person.fullName(); // JoJo Cena

  var clock = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    tick: function () {
      this.seconds++;
      if (this.seconds === 60) {
        this.seconds = 0;
        this.minutes++;

        if (this.minutes === 60) {
            this.hours++;
            if (this.hours === 24) {
              this.hours = 0;
            }
        }
      }
    }
  };
  clock.tick();

  var tv = {
    state: "off",
    channel: 3,
    turnOn: function () {
      this.state = "on";
    },
    turnOff: function () {
      this.state = "off";
      this.channel = null;
    }
  };
  ```

## Random Questions

Why would you use `this` as opposed to the variable name?

As you get into more complex OO code (including constructor functions) there's no way around using `this`.

It gives you more flexibility.  It sets you up for success when moving to more complex OOP code.

```js
function createPerson(first, last){
  return {
    first: first,
    last: last,
    fullName: function () {
      return [this.first, this.last].join(' ');
    }
  }
}

var john = createPerson("John", "Cena");
console.log(john.fullName());
```


## We Do

- Someone come up with a real life object that we can model
- ex: person(calories, eat method that increments calories, shit method)
- two player objects(damage, fight(), life)
- Split up into groups and do the same thing

```js
var div {
  width: 0,
  height: 0,
  toHTML: function () {
    // complex stuff
  },
  appendChild: function (div) {

  }
}
```

```js
var conversation = {
  messages: [],
  send: function (string) {
    this.messages.push(string);
  }
}
```

## You Do

Give text descriptions of things/domains and ask them to model them with objects

Ideas:

- have a method that calls other methods
- have methods that use conditionals (like clock)
  ```js
  // anything that has a range
  var store = {
    opens: date,
    closes: date,
    isOpen: function () {
      // checks the date
    }
  }
  ```

  End with "think about your day since you woke up - model at least 4 things including properties and methods"
  Shoot for ~20 examples they have to write

```js

var applicationProcess = {
  start: function (person) {
    this.applicant = person;
  },
  reject: function () {
    // sends an email
  }
}

```

```js

var myAccount = {
  balance: 0
};

var yourAccount = {
  balance: 500,
};

var transaction = {
  accountA: myAccount,
  accountB: yourAccount,
  transfer: function (amount) {
    this.accountA.balance -= amount;
    this.accountB.balance += amount;
  }
}

```


## Checks for Understanding

Write down value of property after manipulating object properties and methods

## Assessments
Create a Car object that has a miles property and also a drive function that takes one parameter and increases the miles property by that much

```js
var car = {
  miles: 0,
  drive: function(drivenMiles){
    this.miles+=drivenMiles;
  }
}
```

Then call the drive method on the car two or three times.
Create a converter object (miles to kilometers)
+ 18 :)
