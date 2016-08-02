# Whiteboard Interviews - Verbalizing Solutions

## Standard

Employ a methodical process at a whiteboard interview

## Objectives

By the end of this training, you should be able to

- Verbalize your solution before starting to write
- Maybe mention 2 ways to solve the problem _if_ you can think of them _and_ you can deliver on both

## Rationale

![](https://cft.vanderbilt.edu/wp-content/uploads/sites/59/Bloomtaxonomy.jpg)

A lot of people can memorize solutions to things like `sum` or memorize a solution to solving `isPalindrome` - that falls on the lower end of Bloom's Taxonomy.  Fewer people can analyze problems and propose multiple options, evaluate those options and then create novel solutions, and employers want to find and hire _those_ people.  

By being here at Galvanize you are honing those skills every day, choosing which technologies to use in projects, choosing which NPM packages to install, figuring out ways to get disparate elements like sockets and charts to work in the frameworks you are using, like Angular and React.  Employers unfortunately can't just pair with you or work with you on projects though, so they need to have some kind of a proxy, and that proxy is typically a whiteboard interview.

We train on this step so that they can see, in 20 minutes, what we see in you every day.

## How it works

In real life, when you sit down to solve a problem you have a myriad of choices to make.  PostgreSQL or MySQL or Mongo?  Express or Koa?  Angular or React?  Each one has its merits and tradeoffs, and you have to both make a call, and also know why you are making that call in case situations change and you need to adapt to new requirements.  You'll often want to talk about these solutions before writing code, get feedback from the team, or at least have some sense of

In whiteboard interviews, there's a microcosm of this where you have to choose which approach you are going to take, and what data structures you are going to use.  Is an accumulator?  `for` loops or `while` loops?  `if` statements or `switch` statements?  Should you store data in Objects or Arrays?

### The technique

Before you put the marker to the board, take a minute to describe what you are doing in one or two sentences.  That might look something like this:

**Interviewer**

> Write a function that takes a base number and an exponent and returns the base to that power.

**You** (_after checking inputs, asking what if questions etc..._)

> OK, so I could JavaScript's built-in Math.pow, or I could use a `for` loop or it could be solved using `reduce`.

**Interviewer**

Ah - Here at troll inc we don't use any methods on the Math object, so Math.pow is off limits.

**You**

OK - in that case I think I'll use a `for` loop with a basic accumulator pattern since I'm not confident I could get reduce correctly without being able to run it.  So I'll start with....

### Options

Often times there are some options available to you, such as:

- Storing data in arrays or objects
- Using builtin methods or not
- Using forEach, map, filter, reduce etc... or using for loops
- Using recursion or using loops
- Writing brute-force solutions with poor performance or writing more optimized solutions
- Writing one big function / object or splitting it into multiple

If you mention something you can't do make sure not to say "I could..." but instead say "it would be possible to...."

### Complete example so far

Here's an example script that covers everything you've learned up to this point:

**Interviewer**

> Write a function that takes in a paragraph of text and returns the number of words that are palindromes.

**You** (_show some inputs / outputs_)

>  Cool - OK.  So if I get "hello bob" I'd return 1, because there's just one palindrome.  But if I got "bob racecar" I'd return 2.

**You** (_ask some what if questions_)

> What should happen if I get "Hi Madam I'M Adam Smith", where "Madam I'M Adam" is a palindrome if you remove the spaces, punctuation etc...?

**Interviewer**

> What do you think?

**You** (_proposing some solutions, then staking a claim_)

> Well I could try to write an algorithm that removes all spaces and punctuation, then gets all substrings and sees if they are palindromes.  Or I could just split on spaces and see if a given word is a palindrome.  Hmmm... I think given the time constraints I'd go with just splitting on words - is that OK?

**Interviewer**

> That sounds great.  Go for it.

**You** (_stepping back, verbalizing your solution_)

> So I see two different parts to this problem.  One is figuring out if a word is a palindrome.  The other is splitting / looping / counting.  I could solve in this in one big function, or I could split it up into two functions.  I think I'll do that so I can focus separately on each problem.  So I'll start by just assuming that isPalindrome exists, and I'll write the outer function first, then I'll go and implement isPalindrome.

**You** (_writing some boilerplate sandwich code_)

> Alright, so I think I'll name this outer function palindromeCount and it takes a string, which I'll call `words`.  And it returns a count so I'll just initialize a count variable at the top here, and return it at the bottom.

------

After writing both functions you check both answers, and they hire you on the spot!  Just kidding, lots of places have multiple levels of whiteboard interviews :)
