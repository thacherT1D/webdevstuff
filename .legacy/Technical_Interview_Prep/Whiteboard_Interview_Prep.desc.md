## Warmup

Find the error in this code by whiteboarding out the values of each variable at each iteration.

The output of the `sumPairs` method should be `[3,5,7,9,11,13]`.  What's wrong?

```
static int[] sumPairs() {
int[] numbers = {1,2,3,4,5,6,7};
int[] result = new int[10];
for (int i = 0; i < numbers.length; i++) {
  result[i] = numbers[i] + numbers[i + 1];
}
return result;
}
```

The output of the `countOccurences` method should be a HashMap with the following keys / values:

- 1 => 3
- 2 => 2
- 3 => 2

```
static HashMap<Integer,Integer> countOccurences() {
int[] numbers = {1,2,3,3,2,1,1};
HashMap<Integer,Integer> result = new HashMap<Integer,Integer>();
for (int i = 0; i < numbers.length; i++) {
  result.put(numbers[i], result.get(numbers[i]) + 1);
}
return result;
}
```


## How to succeed at a whiteboard interview

When going to an interview you want to:

- Ask questions to start off
  - which language?
  - real or pseudo-code?
  - ask about the types of input you'll get (nulls?  edge cases?)
- Constantly narrate (don't "go dark")
- Discuss tradeoffs / approach ("I'm going to use a nested loop, which is slow, but will allow me to see the problem better...")
- Write code
- Test your code (check your work)
  - Put a variable in
  - Trace it through the code
  - Write down the values at each step if necessary
  - Freely admit your mistakes

## Exercise

Interview each other!

- In pairs or groups of three
- Find a problem your partner has not done from Cracking the Coding Interview
- Ask your pair the question, work through it with them
- Verbally evaluate them on how they did on each of the steps above.  Make your feedback Actionable / Specific / Kind.  For example:

> "Joe, you started off with questions in the beginning which was great.  You didn't ask if I wanted pseudo-code or real code.  You also moved straight to writing code, and never discussed the trade offs.  Next time, make sure to check which language to write it, and as you approach the problem discuss the tradeoffs.  When you tested your solution, you were thorough and caught an error in your code, which was great!"
