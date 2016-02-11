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

![](https://s3-us-west-2.amazonaws.com/learning-experience-assets/Programming_with_Javascript/function-syntax.png?X-Amz-Date=20160211T175332Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=146282046fb7a5143c74f0bcdd87a767cedd9df5071e4f2f8f881d2f74aca83a&X-Amz-Credential=ASIAJKLZWQDPQ7J4HJQA/20160211/us-west-2/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEBsagALI/eABw7bBP/veGKEPBKwHGJut5gb4dl6nEMjoH0yQ5ZTYGXLESeX%2BSJ8oZbv27i9wV4ArGNDetcUFtiLNZzX2tO41932t74YIATTuPf6ziz4t4iLSFgIQUZJ0L1TWF4FihVLYrjnKXASTEd6kPZwWIvjl6Zo2X0Nzwd00i%2BsKJ6fDxy4/yhAurpfD4t5U43UdweCPWYWJKlvbG20CmnQNb/uIlJdTB1TVudgPzoUlcjj2GXpf%2BkREkn6wJ/vU5x0LPGrabIKUHpHs2IyGrwXwatue%2BirSS1OMGk4Pj5GyPZUzXoFDv6rGbfMb7XoyRjcADNP7J3bRCTbwV0oWqPPJINSS87UF)


# Lesson Objectives / Plan
- 1 of 7: describe the concept of a function in one sentence
  - IWY Post a sentence in slack that describes the concept of a function.
  - CFU Class collaboration: student examples on TV, other students, read and debate.
- 2 of 7: explain the syntax of a function
  - IWY Dissect a function and explain its anatomy:
  - CFU Cold-Calling: Instructor will point to each part of the function, provide wait time for all students to think about the answer, then cold call a student to explain the part of a function.
  - CFU Individual assignment: Student can fill in each part of the function syntax.

![](https://s3-us-west-2.amazonaws.com/learning-experience-assets/Programming_with_Javascript/function-syntax-answered.png?X-Amz-Date=20160211T180210Z&X-Amz-Expires=300&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Signature=51e14bf03fa561694fc22712ab46676ccc9c3ff93f2a2b66975f5d0df6a827ef&X-Amz-Credential=ASIAJKLZWQDPQ7J4HJQA/20160211/us-west-2/s3/aws4_request&X-Amz-SignedHeaders=Host&x-amz-security-token=AQoDYXdzEBsagALI/eABw7bBP/veGKEPBKwHGJut5gb4dl6nEMjoH0yQ5ZTYGXLESeX%2BSJ8oZbv27i9wV4ArGNDetcUFtiLNZzX2tO41932t74YIATTuPf6ziz4t4iLSFgIQUZJ0L1TWF4FihVLYrjnKXASTEd6kPZwWIvjl6Zo2X0Nzwd00i%2BsKJ6fDxy4/yhAurpfD4t5U43UdweCPWYWJKlvbG20CmnQNb/uIlJdTB1TVudgPzoUlcjj2GXpf%2BkREkn6wJ/vU5x0LPGrabIKUHpHs2IyGrwXwatue%2BirSS1OMGk4Pj5GyPZUzXoFDv6rGbfMb7XoyRjcADNP7J3bRCTbwV0oWqPPJINSS87UF)

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
