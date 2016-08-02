# Whiteboard Interview Prep (groups)

## Standard

Employ a methodical process at a whiteboard interview

## Objectives

By the end of this training, you should be able to

- Ask one or more "What if" questions about edge cases
- Propose 2 or more solutions
- "Stake your claim" - choose one solution to recommend, along with why

## Rationale

A _good_ whiteboard interviewer is looking for your problem solving skills.  In the real world, problems often have ill-defined or complex inputs (data from a web form, data from files in the file system etc...), and knowing what to do with those inputs is key to being able to write high quality, robust software.

This exercise is a microcosm of real world processes of turning words into software.

## How it works

In real life product managers / project managers may not give you all of the edge cases.  They'll rely on you to figure them out.  They'll give you a story like "users can sign in" and a wireframe and it's your job to say:

- "What happens when the email has a space in the beginning or end?  Do we trim that or just let it fail?"
- "What happens when the email has uppercase / lowercase letters?  Do we look for an exact match?"
- "Do we need to handle the case where someone is trying to gain access to the system and keeps trying different passwords for a user?  So.... should we lock people out after 3 attempts?"
- etc...

In an interview, often times interviewers will test this skill by not giving you the full story.  For example they might say: "build a chess board with such-and-such characteristics..." and you might ask "Will the chess board always be 8x8 or is that a parameter my function should take?"

### Ask a few "what if" questions

Here are a few things to look out for:

- Things being out of bounds of an array / input
- Missing parameters
- Things being out of order
- Things having mis-matched lengths
- Divide by zero errors

Generally speaking there won't be a minefield of edge cases, so don't take the whole interview worrying about this.  But _assume_ there is a hidden requirement until you've confirmed you are good.

### Propose a few solutions

Every time you ask "what happens when..." be prepared to follow up immediately with a few options, and then be able to choose one option and explain why.

For example:

**Interviewer**

> Write a function that takes a CSV string, parses it and returns an array of arrays.

**You**

_after confirming some sample inputs..._

>  What happens when I get a CSV row that's a different length?

**Interviewer**

> What do you think would be good?

**You**

> I suppose I could throw an error saying it's malformed.  I could also adjust the all rows to be the length of the longest, and fill the cells with null/empty values.  I could also just return an array of arrays of empty lengths.  I'd probably throw an error for the sake of time today, but do you have a strong preference?

**Interviewer**

> For now don't even worry about it.  Just assume you get well-formed input.

### Stake a claim

The example above demonstrates:

- showing multiple possibilities
- staking a claim with a reason
- doing nothing is always an option

### (sometimes) ask if there's anything you've missed

It's not a bad idea to quickly confirm if there's anything you've missed before writing code.

## Exercise

1. Break up into your whiteboarding groups.
1. The interviewer will give you a scenario
1. Perform the first step of creating a few sample inputs / outputs
1. Perform today's objective - think more deeply about edge cases that might not be obvious

<div class="alert alert-success">
  <p>
    **Do always propose solutions/options** when talking about what you could do.  For example: "what would happen if you passed in an empty array?  Would it just..."  Or "It seems like we should cover the case where x is greater than y, is it OK if I just throw an error there?"
  </p>
</div>

<div class="alert alert-danger">
  <p>
    **Avoid Menial Type Checking**: Try to avoid lots of _menial_ data validation code.  For example, if I say "write a function that takes an array and returns the sum of elements one and two", try to avoid questions like "what if you don't pass anything to the function?" and "what if you pass a number to the function instead of an array".
  </p>
  <p>
    **Avoid asking an interviewer what to do** - Interviewers want to know how _you_ think, so asking them to provide answers (as opposed to proposing your own solutions) acts counter to the point of the interview.
  </p>
</div>
