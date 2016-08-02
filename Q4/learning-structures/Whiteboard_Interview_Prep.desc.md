# Whiteboard Interview Prep (groups)

## Standard

Employ a methodical process at a whiteboard interview

## Objectives

By the end of this training, you should be able to do the following consistently in a whiteboard interview:

- Confirm 2-3 inputs/outputs with the interviewer
- Ask questions that could reveal hidden requirements
- Write sandwich code for a an accumulator pattern
- Describe more than one approach and choose one with a reason
- Run through the code with actual values, checking at every iteration

## Exercise

### Format

You will be assigned a group, and that group will remain constant through Q4.  The group is meant to be somewhat random, and it's OK if you are all at highly varying technical abilities.

Your group will meet at regular intervals according to the schedule.  There will be 4-6 people in each group.

Every time you meet, you will repeat the same process for running whiteboard interviews.  One person will practice taking an interview, then rotate and another person will take the interview.  Your group will have the following roles:

- One person is the interviewee - they are the ones who write on the whiteboard / solve the problem
- One person is the interviewer - they state the problem and answer questions
- One person is the observer and fills out [this form](https://docs.google.com/document/d/1i7sMJ5FmuE6pNreOOc_vVFUQx0UhIPfDxaj6b7UwaUQ/edit)
- One person is the fact checker and types the code character-for-character to see if it works
- The others take notes / provide feedback that is ASK (actionable, specific and kind)

Each interview must take no longer than 20 minutes.

### After the Interview

- The observer should hand the paper feedback form to the interviewee
- The interviewee should enter it into their Journal so they can track their progress

### The Interviewee

When you are interviewing, be sure to:

- Confirm two-to-three inputs/outputs before starting
- Ask questions that might reveal hidden requirements / important edge cases
- Discuss more than one approach, choose one and explain your choice
- Write code
  - Use sandwich code
    - close brackets and parens as soon as you open them
    - return variables in accumulator patterns right away, before writing code
  - Think out loud - constantly narrate, don't "go dark"
- Test your code (check your work)
  - Put a variable in
  - Trace it through the code
  - Write down the values at each step if necessary
  - Freely admit your mistakes
- Thank the interviewer

### The Observer

The observer needs to carefully pay attention to and record the following things:

- Interviewee name / date
- Start / end and total time
- Did the code compile? (ask the fact checker)
- Did the code solve the problem? (get group feedback, check with the fact checker)
- How many questions did they ask?
- How many long pauses did they have? (where long pauses are subjective, but 10 seconds of inactivity / talking is long)
- Overall Communication (on a scale of 1-4):
  - Did they ask basic questions (language, compile or pseudo code)?
  - Did they clarify inputs / outputs with examples?
  - Did they explain their thought process as they worked? (i.e. not "going dark")
  - Did they check their work by actually interpreting the code / running inputs through?
  - Did they thank the interviewer and shake hands?

### The fact-checker

Transcribe the code exactly as-is - down to the space and semi-colon.  At the end, run sample input through, and see if you get the expected output.  Show the group if you have any questions.  You'll be asked by the Observer for your findings.

### The interviewer

Your role is to:

- Choose a problem that's appropriate (we'll have a bank of them for you, and also Cracking the Coding interview)
- Explain the problem (ideally leaving out a detail or two that'll come out in questions)
- Answer questions they have
- Try to help them get unstuck without giving away the answer with things like:
  - "what's the value of this variable here...?"
  - "what would you like your array to look like after this first loop?"
  - etc...
- Keep track of time and call time when it's 20 minutes

_If_ the interviewee goes through the answer very quickly, here are some fun ways to keep the interview going:

- Ask them what the runtime of the function is, and also the memory complexity (Big O)
- If they have a loop, ask them to do it without a loop, or with recursion
- If they have lots of variables, ask them to do it with no variables (often requires lots of tiny functions, so may not be appropriate)

### The videographer

Phones / space / noise permitting, one additional observer can take the interviewee's phone and video tape the interview, so the interviewee can watch it later an reflect on the feedback.

Look only for the objectives mentioned that day.

You might even watch this video during reflection / journaling at 4:30

### Other observers

Watch carefully.  Take notes.  Make guesses as to whether the code would run and see if you are correct when the fact-checker finishes.  Try to solve the problem ahead of the interviewee, but in your head or on a piece of paper (silently, that is :)

Please refrain from jumping in, helping, ooohing or aaaahhhing etc...

### Rotation

Setup a rotation in your group so that everyone places each role on a rotating basis.  The idea is to give each person as much interaction / exposure as possible to this process.

### FAQ

**Should I call my method on the board?** - No.  But definitely run values through to test at the end.

**Is forEach / map etc... better than `for` loops?** - Mostly no.  Not unless you are _super_ dialed on them.

**What should I ask about inputs?** - If the interviewer gives you the shape of the input (aka "an array of strings") then just assume that'll always be there.  If they _don't_ give the shape of the input, make an assumption and make that known.

**What questions are OK to ask?** - Generally speaking ask clarifying questions.

Definitely ask:

- "Can I use this built-in method in [whatever language you are in]?  Is that in-bounds?"

Avoid:

- asking them if what you should call a method (instead pick a name and maybe ask if that makes sense to them)
- what a method should return (instead make a guess and confirm that you are right)
- how would you like me to do _xyz_?  Instead, discuss tradeoffs of approaches, pick one and explain why (they'll stop you if you are way off)

**Should I write the question on the board?** - Not a bad idea.  Make sure it's 100% accurate though - if you transcribe it wrong that's kinda bad.  Confirm that what you wrote is correct.  Ideally use shorthand (not word-for-word).

**What if I need to "correct" my code, should I erase/rewrite?** - If you forgot to add a line, it's totally OK to add that line off to the side and draw an arrow.  You have a short time, re-writing whole sections of code is a waste.

**What if I'm totally stuck and can't move on?** - Be honest about it.  Propose alternatives.  If you can't do something recursively, but _could_ do it in a `for` loop, say that, and ask if that's OK.  As a last-ditch effort, ask "could you help me get started here?  I'm really nervous and totally blanking..."

**Does handwriting matter?** - Only insofar as it's legible.  Generally speaking beginners tend to write bigger than necessary, and tend to run out of room.  Spacially organize it so you have room for test code, sample inputs, and the problem description.

**Does spacial layout matter?** - Only insofar as you can fit everything.  If you need to, refer to this diagram for a suggested layout for a single whiteboard:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/195/Sample_Whiteboard_Layout.png)
