# Week 1 Overview

Objectives:

- Day 1
  - learn the drill
- Day 2
  - Confirm 2-3 sample inputs / outputs with the interviewer
  - Write sandwich code for an accumulator pattern
- Day 3
  - Run through the code with actual values, checking at every iteration
- Day 4
  - Ask questions that might reveal hidden requirements
- Day 5
  - Discussing tradeoffs and choosing a position

---

## Day 1

Objectives: learn the drill

Day 1 is all about learning the drill.  Each student should have a chance to play each role, and rotate.

First lesson should be 1.5 hours.

### Day 1 Prep

Prepare a packet for each group.  Each packet should contain:

- Each of the questions from https://docs.google.com/document/d/1-m90tKcSdy0B3VizhEBA5T96vDZRNgADr7__jvdBzLM/edit (on separate strips of paper)
- One of these per group member: https://docs.google.com/document/d/1i7sMJ5FmuE6pNreOOc_vVFUQx0UhIPfDxaj6b7UwaUQ/edit
- Create a spreadsheet and divide the class into groups of 4-6 and make it publicly available.  Group size will vary based on how many whiteboards you have and how many concurrent groups you can run.  Smallest size would be 3-4.  If you are limited on whiteboard space, consider running 2 different rotations per day.
- Rehearse the "Model and Describe" portion

### Intro to Whiteboarding (< 30min)

Talk about how important whiteboard interviews are, and how they relate to the mission (learn how to code well enough to _get_ and _keep_ a job).

Talk about how it's a different skill than programming because there's no interpreter.

Talk about how communication and process are important in addition to knowing how to code.  In some cases, they keep asking questions until you get to the point they don't know.

Talk about how today they are learning the structure, and how they'll do this every day.  The goal today is to quickly rotate and learn the drill.  Tomorrow we start learning the content.

Describe the overall drill practice.  Emphasize that today is about learning the drill.

### Model and Describe (~10 minutes)

- Have a packet ready (feedback form and strip of paper with the problem)
- Identify the players (who's doing what)
- Run the interview, rotating as necessary, call "freeze" when something important happens and describe it
- Take any questions
- Cold call briefly to make sure people understand the roles

### Run the drill

Have students split up and go to whiteboards.

Walk around and check for rotation, check for the fact checkers, check for the observers, check for the small things like the handshakes at the end.

The idea for day one is to get through everyone.  This means that each interview must take 45min/<group size>, or roughly 5 minutes each for the whole thing.

Again, the objective is to _learn the drill_, not to solve a complex problem.

## Day 2

Objectives:

- Confirm 2-3 sample inputs / outputs with the interviewer
- Write sandwich code for an accumulator pattern

### Day 2 Prep

- Print out a packet for students with the feedback form and https://docs.google.com/document/d/12GVRhp0v52Oh4I8Lfm2J1xRnDjF489FwxEe92PkAsEg/edit (cut into strips)
- Rehearse the "Model and Describe"

### Day 2 Intro

- Talk about the concept of checking inputs / sandwich code
- Model and Describe the flow, including the interviewee checking for 0,1 and many things
- Take questions
- Let'em have at it

## Day 3

Objectives:

- Run through the code with actual values, checking at every iteration

### Day 3 Prep

- Print out a packet for students with the feedback form and https://docs.google.com/document/d/1Tns-on5HXeEM5_KPSeWqsXt0Gqtn0Ttxqdl1S2lX_Ak/edit (cut into strips)
- Rehearse the "Model and Describe"

### Day 3 Intro

- Talk about the concept of walking through code briefly with real values (one block per iteration)
- Model and Describe the flow, including the interviewee transcribing and talking
- Take questions
- Let'em have at it

## Day 4

Objectives:

- Ask questions that might reveal hidden requirements


### Day 4 Prep

- Print out a packet for students with the feedback form and https://docs.google.com/document/d/1lzWEGldeSCzk55vDiERfCYNeT5FgobMH76yKmeeMuiQ/edit (cut into strips)
- Rehearse the "Model and Describe"

### Day 4 Intro

- Talk about the concept of asking questions that refine the requirements
- Model and Describe the flow, including the interviewee asking some hidden questions and _not_ coding
- Observer should have some signal that they completed the exercise correctly
- Take questions
- Let'em have at it


## Day 5

Objectives

- Discussing tradeoffs and choosing a position

### Day 5 Prep

- Print out a packet for students with the feedback form and TODO MAKE THIS (cut into strips)
- Rehearse the "Model and Describe"

### Day 5 Intro

- Talk about the concept of giving alternatives, discussing tradeoffs, picking a solution and explaining why
- Model and Describe the flow, including talking about 3 possibilities then solving
- Take questions
- Let'em have at it

-------------------

This code lives in google docs, but in case the links break, here it is as well:


```
/*
write a function that takes an array and a delimiter and returns a string with the elements of the array joined by the delimiter
*/

function join(array, delim) {
  let result = ''
  for (let i = 0; i < array.length; i++) {
    result += array[i] + delim
  }
  return result
}

console.log(join(["hello", "world"], "-"));
// hello-world-

//----------------------------------

/*
write a function that takes an array of numbers and returns an array of the sum of each pair.  So [1,4,7] becomes [5, 11]
*/

function sumPairs(array) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result[i] = array[i - 1] + array[i]
  }
  return result
}

console.log(sumPairs([1,2,3]));
// [ NaN, 3, 5 ]

// ------------------------------

/*
write a function that takes an array and returns the smallest number in that array
*/

function min(array) {
  let result;
  for (var i = 0; i < array.length; i++) {
    if (array[i] < result) result = array[i]
  }
  return result
}
console.log(min([1,2,3]));
// undefined

// ------------------------------

/*
write a function that takes an array and returns a new array with elements squared
*/

function squares(array) {
  let result = []
  for (let i = 0; i < array.length; i++) {
    result = array[i] * array[i]
  }
  return result
}

console.log(squares([2,3,4]));
// 16

// -------------------------------

/*
write a function that takes and array and returns a reversed array, but don't use `.reverse`
*/

function reverse(array) {
  let result = []
  for (var i = array.length; i > 0; i--) {
    result.push(array[i])
  }
  return result
}

console.log(reverse([1,2,3,4,5]));
// [ undefined, 5, 4, 3, 2 ]

// -------------------------------

/*
write a function that takes an array and returns th reversed array with each element + 5
*/

function reverseMap(array) {
  let result = []
  for (var i = array.length - 1; i >= 0; i++) {
    result.push(array[i])
  }
  return result
}

// console.log(reverseMap([1,2,3,4,5]));
// runs forever

// -------------------------------

/*
write a function that finds the index of a given element in an array (don't use .indexOf)
*/

function indexOf(array, item) {
  let result = -1
  for (var i = 0; i < array.length; i++) {
    if (item = array[i]) {
      return i
    }
  }
  return result
}

console.log(indexOf([1,3,5,6], 5));
// 0
```
