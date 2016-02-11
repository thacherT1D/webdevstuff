## Resources

### Slides

* [Slides](http://slides.com/lizh/domevents#/)

### Reading
* http://eloquentjavascript.net/14_event.html
* https://github.com/gSchool/fullstack-curriculum/blob/master/lessons/js-dom-jquery/dom-events-intro.instructor.md
* https://github.com/gSchool/g11-course-curriculum/tree/master/week03/03_exercises/js-dom-basics#events

### Exercises

* Stoplight: https://github.com/gSchool/stoplight-event-exercise
* Various Beginner Exercises: https://github.com/gSchool/event-exercises
* (WIP) https://github.com/gSchool/javascript-event-propagation
* Pixel Art Maker: https://github.com/gSchool/pixel-art-maker


### Assessment Exercises
Use these exercises to assess where your students are. Don't expect them to get past the second example. Give them 60 to 90 minutes as a warmup. Most people will not solve them but it's interesting to see the techniques they use while attempting. I encourage you to do an in class review where you have students share their solutions and have the class pick it apart. It's a valuable learning experience because students get to debate logic and coding styles.

```javascript
// #1
var examples = [
  typeof Array,
  typeof [],
  typeof 'Buffs',
  18 + 18,
  'friend are alive',
  '88' + 99,
  {a: 1, b: 2} instanceof Array,
  typeof 37
]

// Use forEach to iterate over the examples array and console each typeof value. Array's should return array.
examples.forEach(function( ___ ) {
  // console.log each value in examples
});
// Expected output: ['array', 'array', 'string', 'number', 'string', 'string', 'boolean', 'number']

// #2
// You have an array of strings but the strings are all backwards you need to console log them in order. Write a function that can process backwards strings.
var backwardsStrings = ['looc', 'os', 'si', 'siht'];
// Expected output: // "this is so cool"

// #3
var stuff = ['stars'];
var objectOfPrimitives = {
  'strings': [ ['this', 'is', 'a', 'string', 45], ['this', 'is', 'a', 'string'] ],
  'numbers': [ [4, 23, 78, 90], [4, 23, 78, 90, 'omaha'] ],
  'arrays': [ [[], new Array, ['apple'], stuff ], [ [], new Array, ['apple'], stuff, {}, 18 ] ]
};

// Write a function that will iterate through each Array in objectOfPrimitives and return the proper typeof on that Array only if ALL of the values in that key are of that typeof, else it will return a string which says 'mixed primitives'.

// expected output ["Mixed primitives", "string", "number", "Mixed primitives", "array", "Mixed primitives"]
```

# Function Syntax

![](https://app.box.com/embed/preview/8ewzi43t337pd36smklpx5tr21y9f4sc)


# Lesson Objectives / Plan
- 1 of 7: describe the concept of a function in one sentence
  - IWY Post a sentence in slack that describes the concept of a function.
  - CFU Class collaboration: student examples on TV, other students, read and debate.
- 2 of 7: explain the syntax of a function
  - IWY Dissect a function and explain its anatomy:
  - CFU Cold-Calling: Instructor will point to each part of the function, provide wait time for all students to think about the answer, then cold call a student to explain the part of a function.
  - CFU Individual assignment: Student can fill in each part of the function syntax.
  - ![](https://app.box.com/embed/preview/tpr9eyi71n459kreyckmd7tkp5dgq000)
- 3 of 7: create a function
  - IWY  create a function that logs their name.
  - IWY  create a function that logs a name accepted as argument.
  - CFU Cold calling: what will x function output?
- 4 of 7: invoke a function
  - IWY invoke all functions from the previous create section
  - CFU Cold calling: what will x function output?
- 5 of 7: use the keyword return
  - IWY write functions with explicit return
  - CFU Mini-whiteboard: what will x function output? and debate.
- 6 of 7: add behavior with parameters and arguments
  - IWY write function which accepts multiple parameters.
  - CFU Mini-whiteboard: (show side by side examples) which is the valid function and debate.
- 7 of 7: use the keyword arguments
  - IWY create a function without parameters and invoke it with arguments, access its arguments, and log them.
  - CFU Student share screen: Classmate will explain that students code, other classmates will be asked to give feedback.
