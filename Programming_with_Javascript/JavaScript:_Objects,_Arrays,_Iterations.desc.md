# An Introduction to Programming and JavaScript: Objects, Arrays, Iterations
Objectives:
Students will able to...

1. What data types did we discuss?
1. What's the value of `50 % 4 === 2 && !(typeof("9") == "number");`
1. Write an `isOdd` function that determines whether a given integer is odd.

## Switch Statements

Switch statements are another way to express a very common structure:

```
if () {
} else if () {
} else if () {
} else {
}
```
Here is the syntax for a switch statement which would replace our if, else if, else construct:

```
switch (/* our expression */ ) {
   case /*value 1*/:
       // some code
       break;
   case /*another value*/:
       // some code
       break;
   default:
       // the default code, just like the else block
       break;
}
```
Here is a code example

```
var typeOfPet = prompt("Please name an animal");
switch (typeOfPet) {
	case "dog":
	   console.log(typeOfPet + " goes woof.");
	   break;
	case "cat":
	   console.log(typeOfPet + " goes meow.");
	   break;
	case "bird":
	   console.log(typeOfPet + " goes tweet");
	   break;
	case "mouse":
	   console.log(typeOfPet + " goes squeak");
	   break;
	case "fox":
	   console.log(typeOfPet + " goes Ring-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding");
	   break;
	default:
	   console.log("Sorry, I don't know what noise that animal makes.");
	   break;
}
```
## Loops
Loops are essential to programming. They allow us to repeat an operation many times. Typically, execution of a loop lasts as long as a certain value holds true. The first type of loop we'll talk about is a for loop.

### For Loops
For loops are a concise way to express how a loop should be initialized, how long a loop should run, and what action should be taken at the end of each iteration.  The general syntax is below:

```
for (initialization; conditional; post loop increment) {
    // Some code to run.
}
```

Here is an example where we print the numbers 1 to 10:

```
for (var i = 0; i < 10; i++) {
   console.log(i + 1);
}
```

### Excercise

1. Print the numbers 1 to 10 and also the number 10 to 1, side by side.  The output should look like this:

```
1  10
2  9
3  8
4  7
5  6
6  5
7  4
8  3
9  2
10  1
```

2. Write a function that draws a triangle on the console. For example:

```
/* triangle(3) should log:

#
##
###

*/
```

### While loops

A while loop is another way of constructing a loop.  Here is the syntax:

```
while ( /* Boolean expression */ ) {
    Execute code
}
```

Here is an example:

```
var timesForPhrase = 10;
var phrase = prompt("What do you want to say " + timesForPhrase + " times?");

var i = 0;
while (i < timesForPhrase)  {
   console.log(phrase);
   i++;
}

```
### Do-while loop

Related to the while loop is the do-while loop. How do you think these two code blocks are similar? How are they different?

```
// log some squares

var i = 1;
while (i < 10) {
  console.log(i*i);
  i++;
}

// log some squares, another way

var i = 1;
do {
  console.log(i*i);
  i++;
} while(i < 10);
```

### Beware of infinite loops!

Sometimes, you may accidentally write a loop that will never end. This is called an **infinite loop**, and is basically terrible. Here's an example: suppose you want to log the numbers 1 through 10 to the console using a `while` loop, but you forget to increment your index at each step:

```
// Don't paste this into the browser unless you want to force quit Chrome!
var i = 1;
while (i <= 10) {
  console.log(i);
}
```
Why is the above code block problematic?

### Exercises

1. Print the numbers 1 to 10 and also the number 10 to 1, side by side.  This time make sure to use a while loop instead of a for loop.
1. Write code to print all the odd numbers between 1 and 100.
1. Explain what the code below is doing. Why is a `while` loop more suitable than a `for` loop in this case?

```
var headsInARow = function() {
  var total = 0;
  var flip = Math.random();
  while (flip > 0.5) {
    total++;
    flip = Math.random();
   }
  return "Number of consecutive times heads came up: " + total;
}
```

### Arrays

Arrays hold an ordered list of objects in Javascript.  Arrays can hold numbers, strings, arrays, other objects, and even functions.

Here are a few examples:

```
var arr = []; // Empty array.  Does not have any data
var arr2 = Array();  // Another way of creating an empty array.
var numbers = [1,2,3,4];  // An array containing numbers
var strings = ["a", "r", "r", "a", "y"];  // An array with strings
var mixed = [1, "b", 88, -2.5, false]; // All types of types

```
### Accessing and modifying arrays
To do more useful things with arrays, we need to be able to put data into them and get data out.  Here is how arrays are accessed:

```
var arr = [5,4,3,2,1];
arr[0]; // Returns 5
arr[4]; // Returns 1
arr.length // The length of the array.  Returns 5 in this case

var arrOfArrs = [ [1,2,3], [4,5,6], [7,8,9] ];
arrOfArrs[0][0];  // Returns 1
arrOfArrs[0];     // Returns an array, [1,2,3];
arrOfArrs[2][0];  // Returns 7

```
Note that characters in strings can be accessed in a similar way!

```
var str = "string";
str[0]; // Returns "s"
str[5]; // Returns "g"
str.length // Returns 6

var arrOfStrs = ["this", "is", "a", "list", "of", "strings"];
arrOfStrs[0][0]; // Returns "t";
arrOfStrs[1]; // Returns "is";
arrOfStrs[3][0]; // Returns "l";
```
Next, here's a few functions available to arrays for adding and removing data:

```
var arr = ['a', 'b', 'c'];
arr.push('d');  // array is now ['a', 'b', 'c', 'd']
arr.pop();      // Array is now back to ['a', 'b', 'c']

arr.shift();    // Array is now ['b', 'c']
arr.unshift('z');   // Array is now ['z', 'b', 'c'];
arr.unshift('q');   // Array is now ['q', 'z', 'b', 'c'];
```
Here are some other common Array methods:

[More on Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

`concat`: concatenates two arrays. Sample usage: `[1,2,"hi"].concat([3,"bye"]);`

`join`: joins elements of an array into a string. Sample usage: `[4,5,6].join(" ");

`indexOf`: returns the smallest index of a given element in an array, or -1 if the element is not in the array. Sample usage: `[7,8,9].indexOf(9);`

### Exercise

1. Look up splice and figure out how to remove the 3rd element from an array.
1. Write a function that takes in an array of numbers and returns an array with the squares of those numbers. For example, the function should map the array [1, 2, 3] to the array [1, 4, 9].
1. Suppose you're in a hallway lined with 100 closed lockers. You begin by opening every locker. Then you close every second locker. Then you go to every third locker and open it (if it's closed) or close it (if it's open). Let's call this action toggling a locker. Continue toggling every nth locker on pass number n. After 100 passes, where you toggle only locker #100, which lockers are open?

### Objects

Objects are the building blocks of Javascript.  You can make very complex structures out of objects.  They are very similar to arrays, except that the accessor doesn't have to be a number.  Here is a simple example:

```
var myObj = {}; // Creates an empty object literal
var myObj2 = { name : "Matt", position: "Associate Instructor", dog: "Whiskey"};
myObj2['dog'];  // returns the string "Whiskey"
myObj2.dog;   // Also returns the string "Whiskey"

var persion = { name : "Matt", interests: ["baseball", "coding", "hiking"] };
person.interests[1];   // What does this return?
```

`name`, `position`, `dog` are all _properties_ of `myObj2`.

### Exercise
Use the following object:

```
var players = [
    {name: 'Bumgarner', number: '40', position: 'starting pitcher', salary: 6950000},
    {name: 'Posey', number: '28', position: 'catcher', salary: 17277777},
    {name: 'Belt', number: '9', position: 'first base', salary: 3600000},
    {name: 'Panik', number: '12', position: 'second base', salary: 522500},
    {name: 'Crawford', number: '35', position: 'shortstop', salary: 3175000},
    {name: 'Duffy', number: '5', position: 'third base', salary: 509000},
    {name: 'Aoki', number: '23', position: 'left field', salary: 4000000},
    {name: 'Pagan', number: '16', position: 'center field', salary: 10250000},
    {name: 'Pence', number: '8', position: 'right field', salary: 18500000},
];
```
Write the javascript code to print the following:

1. Posey's number
2. Duffy's position
3. The entire object that represents Bumgarner.
4. The cost of all 9 players to the Giants organization.

### Objects and Functions

Objects can save primitive types like numbers, bools, strings, etc, but objects can also save functions.

Just like a function can be saved to a variable:

```
var helloWorld = function() { console.log("Hello World"); };
```
A function can also be saved inside an object:

```
var calculator = {
  add: function (left, right) {
    return left + right;
  }
};
calculator.add(3, 4);    // Returns 7
```
In this context, `add` is referred to as a method of the calculator object. Now that calculator has been created, it's easy to add new functionality:

```
calculator.subtract = function(left, right) { return left - right };
calculator.subtract(6, 4);  // Returns 2
```

### Exercise

Create an `average` method for the calculator object that takes a sequence of numbers as an array and can find the average.

### Some remarks on Scope

What's the result of running the following code:

```
var scoped = function(name) {
  var greeting = "Hello " + name + "!";
  return greeting;
};

var hello = scoped("Matt");
console.log(greeting);
```

###Why is variable scope important?

Let's add to the example above to add to our discussion of variable scope.

```
var greeting = "Hello Galvanize";

var scoped = function(name) {
  var greeting = "Hello " + name + "!";
  return greeting;
};

var result = scoped("John Muir");

console.log(result);
console.log(greeting); // What will the output of this line be?
```

###Local vs. Global Scope and the 'var' keyword

```
var greeting = "Hello Galvanize";

var scoped = function(name) {
  greeting = "Hello " + name + "!";
  return greeting;
};

var result = scoped("Henry Hudson");

console.log(result);
console.log(greeting); // What will the output of this line be?
```
Check out another case:

```
var greeting = "Hello Galvanize";

var scoped = function(name) {
  var greeting = "Hello " + name + "!";
  return greeting;
};

var result = scoped("Henry Hudson");

console.log(result);
console.log(greeting); // What will the output of this line be?
```

Here's even more nesting!

```
var greeting = "Hello Galvanize";

var scoped = function(name) {
  var greeting = "Hello " + name + "!";
  console.log(greeting);
  var yetAnotherGreeting = function() {
    var greeting = "I'm another greeting!";
    console.log(greeting);
  }();
};
```
###Optional Arguments

```
function power(base, exponent) {
  var exponent = exponent || 2;
  var result = 1;
  for (var count = 0; count < exponent; count++)
    result *= base;
  return result;
}

console.log(power(4));
// → 16
console.log(power(4, 3));
// → 64

```

What if you want your exponent to be 0? How can you fix this?

### Homework

1. Read chapters 3 & 4 in Eloquent Javascript.
1. [More Javascript!](https://github.com/gSchool/basic-js-part-2)
