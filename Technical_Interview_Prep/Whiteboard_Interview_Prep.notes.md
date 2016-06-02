# Warmup Answers

See below...

## Lecture (I do)

- Talk about techniques listed in their notes
- Demo some good questions / answers

## Activity (We do)

Give students a _printed_ version of this handout: https://docs.google.com/document/d/1evrXd9KqV-Q94J9-Ssw-MJtKzkxh-miSneI0d9Z7B4A/edit

Then have them interview / rate each other.

## Notes

You can run this workshop multiple times.  If students need extra algorithms

- come up with some off the top of your head
- have them go to careercup.com
- pick a problem from CodeWars or a similar kata site

## Assessment / Feedback / Wrap up

- Collect all papers
- See who needs more practice

## Good sized problems to give for this workshop

Given an object like the one below, write a function that takes an array of objects and a property name, and returns an object indexed by that property.

Input: [ {id: 1, name: ‘Arapahoe’}, {id: 2, name: ‘Canyon’}, {id: 3, name: ‘Walnut’} ]

Output: {1: {id: 1, name: ‘Arapahoe’}, 2: {id: 2, name: ‘Canyon’}, 3: {id: 3, name: ‘Walnut’}

-------

Given an object like the one below, write a function that takes an array of objects and a property name, and returns an object grouped by that property.

-------

## Warmup Answers

Write a function that reverses an array in-place.

```
import java.util.HashMap;
import java.util.Map;
import java.util.Iterator;
import java.util.Set;

class ErrorExample {

  static int[] sumPairs() {
    int[] numbers = {1,2,3,4,5,6,7};
    int[] result = new int[10];
    for (int i = 0; i < numbers.length - 1; i++) {
      result[i] = numbers[i] + numbers[i + 1];
    }
    return result;
  }

  static HashMap<Integer,Integer> countOccurences() {
    int[] numbers = {1,2,3,3,2,1,1};
    HashMap<Integer,Integer> result = new HashMap<Integer,Integer>();
    for (int i = 0; i < numbers.length; i++) {
      result.put(numbers[i], result.getOrDefault(numbers[i], 0) + 1);
    }
    return result;
  }

  public static void main(String[] args) {
    HashMap<Integer,Integer> hmap = countOccurences();
    Set set = hmap.entrySet();
    Iterator iterator = set.iterator();
    while(iterator.hasNext()) {
       Map.Entry mentry = (Map.Entry)iterator.next();
       System.out.print("key is: "+ mentry.getKey() + " & Value is: ");
       System.out.println(mentry.getValue());
    }
  }

}
```

------------

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
