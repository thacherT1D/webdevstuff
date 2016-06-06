Each whiteboard interview prep session is an hour-long, and you should do 4-5 per week through Q4.

## Day 1

Day 1 is all about learning the drill.  Each student should have a chance to play each role, and rotate.

### Before the lesson:

- Print out 7 problems (accounting for a big group)
- Print out 1 sheet of instructions per role per group.  If you have 7 groups, print out 7 sheets
- Make sure you have one whiteboard per group.  If not, schedule groups in a staggered way.  Groups of 6 are probably as big as you want to go.

### Intro

Talk about how important whiteboard interviews are, and how they relate to the mission (learn how to code well enough to _get_ and _keep_ a job).

Talk about how it's a different skill than programming because there's no interpreter.

Talk about how communication and process are important in addition to knowing how to code.  In some cases, they keep asking questions until you get to the point they don't know.

Talk about how today they are learning the structure, and how they'll do this every day.  The goal today is to quickly rotate and learn the drill.  Tomorrow we start learning the content.

## First Lesson

- Give yourself 1.5 hours
- Fishbowl it
- Split into groups

### Here are the problems for day 1

Print these out on strips of paper beforehand so you can hand them out.

- Write a function that takes three arguments, sums all three and returns the result
- Write a function that takes a string and returns the uppercase version of that string along with an "!"
- Write a function that takes 2 arguments and returns the bigger of the two
- Print the numbers from 1 to 10 using a `for` loop
- Print the numbers from 10 to 1 using a `while` loop
- Write a function that prints the numbers 1 to 10 using a `while` loop
- Write a function that calculates how many seconds there are in a day

Walk around and check for rotation, check for the fact checkers, check for the observers, check for the small things like the handshakes at the end.

The idea for day one is to get through everyone.  This means that each interview must take 45min/<group size>, or roughly 5 minutes each for the whole thing.

Again, the objective is to _learn the drill_, not to solve a complex problem.

## Session 2: Trollboarding 👹

Question - should they practice the whiteboard algorithm as well?

Each group may not get through each person during session two, and that's OK.  Prep them for that.  There's a lot of value in getting through the whole interview.  Shoot for at least 50% in the second session.

Round two is about how to communicate well as the interviewee.  The problems are a little harder, and require more questions regarding input.

### Introduction

Talk about how one important aspect of interviews is asking questions about inputs and how to handle edge cases.  This demonstrates that you would be able to think critically about larger programming problems that you would solve on the job.

Demo this question:

```
- Write a function that takes an array of objects, return the sum of their `age` properties
```

Ask the class to write down what questions they might have about these inputs. Look for the questions:

- "what if the age property is null or undefined on an object?"
- "what should we return if the array is empty?"
- "should we handle the case where the array is undefined or null?"

### Prep

Print these out on separate strips of paper and distribute a stack to each group.  They should go through as many of these as they can together.

QUESTION: should each _pair_ of people get these?  Is this a smaller exercise??

- Write a function that takes an array, and sums the array from the outside in.
  - Look for the question: "what happens with an array of an odd length"
  - Answer: just include that number in the output, no alteration necessary
- Write a function that takes an array and returns true if every element equals 42
  - Look for the question: "what happens with an empty array - true or false?"
  - Answer: for this exercise, make it return false
- Write a function that takes two numbers and returns a percentage (so fn(5,20) would return `25`)
  - Look for the question: "what happens when the denominator is 0?"
  - Answer: for this exercise, make it return -1
- Write a function that takes a string representing a name with spaces, and return an object with first_name, last_name
  - Look for the question: "what happens when there are more than two words?"
  - Answer: for this exercise, append those to the first_name
- Write a function that takes an array and a number, find the element of the array at that index, and return that value multiplied by itself
  - Look for the question: "what if the number is out of bounds of the array?"
  - Answer: return Infinity
- Write a function that takes a start time and an end time and calculates the milliseconds between them
  - Look for the question: "what if the end time is before the start time"
  - Answer: return 0
- Write a function that takes an array returns an array with the sums of each item.  So [1,2,5,6] becomes [3,11] (because 1+2 = 3, and 5 + 6 = 11)
  - Look for the question: "what if there are an odd number of elements in the array?"
  - Answer: don't include the last number if it's odd.  So [1,2,8] becomes [3] (the 8 is ignored)
- Write a function that takes a number and returns the string "You are `<number>` years old!!"
  - Look for the question: "what happens if the number is 1 - should it still say `years`?"
  - Answer: Yes - if it's 1, it should say "1 year old" (singular)
  - Look for the question: "what if it's a negative number?"
  - Answer: return null


Given an object like the one below, write a function that takes an array of objects and a property name, and returns an object indexed by that property.

Input: [ {id: 1, name: ‘Arapahoe’}, {id: 2, name: ‘Canyon’}, {id: 3, name: ‘Walnut’} ]

Output: {1: {id: 1, name: ‘Arapahoe’}, 2: {id: 2, name: ‘Canyon’}, 3: {id: 3, name: ‘Walnut’}
