# Javascript: Iterations

## Objectives:

By the end of this lesson you will be able to:

  - List the four main loop types
  - Describe main reasons for different types of loops
  - Write for loops and while loops
  - Write a for loop to iterate over an array and read each part
  - Write a for-in loop to iterate over an object and read each part
  - Read data from a deeply nested object
  - Write nested loops to traverse nested objects/arrays.








## Review IF statements:

  If you spend $100 or more, then you get 15% off, otherwise the purchase is full price

  - WE DO: Walk through building the above IF statement
  - YOU DO: Add on to the IF statement we wrote to allow people to get 35% off if they spend more than $200.





## Loops
  Loops are essential to programming.
  They allow us to repeat an operation many times.
  Typically, execution of a loop lasts as long as a certain value holds true.

####  What kinds of loops are there?
    - For
    - While
    - Do While
    - For In
####  Why are each these useful? Why have 4(or more) kinds of loops?
    -
    -
    -
    -



  - I DO: Explain basic FOR loop structure.
```javascript
  for (initialization; conditional; post loop increment) {
      // Some code to run.
  }
```

  - We DO: Build a for loop to print the numbers 1-10
  - You DO: Build a for loop that prints the numbers 1 to 10 and also the number 10 to 1, side by side.
```javascript
  The output should look like this:
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



  Beware of infinite loops!
  Sometimes, you may accidentally write a loop that will never end. This is called an infinite loop, and is basically terrible. Example: suppose you want to log the numbers 1 through 10 to the console using a while loop, but you forget to increment your index at each step... what happens?

  - I DO: Explain basic WHILE loop structure.
```javascript
  while(condition)
  {
    //Do code
    //usually iterate an item that can change the condition.
  }
```

  - We DO: Build a while loop to print the numbers 1-10
  - You DO: Build a while loop that prints the numbers 1 to 10 and also the number 10 to 1, side by side.
```javascript
  The output should look like this:
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

  - Stretch: Change your loop to only print out the pairs where the first number is odd.
```javascript
  The output should look like this:
  1  10
  3  8
  5  6
  7  4
  9  2
```


  - I DO: Explain a DO-WHILE loop structure
  - YOU DO: Modify your WHILE loop to use a DO-WHILE structure





## Looping Through Arrays:
```javascript
  var nameArray = ['Jordan', 'Logan', 'Micah', 'Roger', 'Jeff'];
```
  - Pick a loop style (While or For) and attempt to loop through the above array outputting it's contents in order.
  - Hint: look up array properties that may help you tell when an array ends (Or look at this morning's lesson).
  - Once you're done, attempt to do the same with the other kind of looping structure (if you used a while, now try with a for etc..)






## Strings:
  - You can loop through each character of a string just like it was an array.
```javascript
  var myStr = "My cars are AWESOME!";
```
- WE DO: Loop through the above string and output each character separately.
- YOU DO: Loop through the above string in reverse, and concatenate each character into a new string, then output that string.




## Looping through Objects:
```javascript
  var myCars = {
    'Jordan' : 'Mustang',
    'Logan' : 'GTO',
    'Micah' : 'Lancer Evolution',
    'Roger' : 'Charger',
    'Jeff' : 'Lamborghini'
  };
```
  - Review how to access items within an object.
  - How is looping through an object different than looping through an array?

- I DO: Explain the Object.keys() option.
- WE DO: See if you can use the Object.keys() function to access all the cars in the myCars object using a single loop.
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

- I DO: Explain the FOR IN loop structure.
- YOU DO: Loop through the myCars object using a FOR IN loop, outputting all of it's contents.
```javascript
  Should look like:
    Mustang
    GTO
    Lancer Evolution
    Charger
    Lamborghini
```



## Nested Loops:
  - I DO: Explain the idea of a nested loop.
  - YOU DO: Using your FOR IN loop, add a nested loop which outputs each character in each of the car-type strings (EXCEPT the first character of each string).
```javascript
  Output should look like:
    Mustang
    u
    s
    t
    a
    n
    g
    GTO
    T
    O
    Lancer Evolution
    a
    n
    c
    e
    r

    E
    v
    o
  .... etc
```
  - I DO: Briefly explain .hasOwnPropery()
  - WE DO: Implement .hasOwnPropery() to validate each key actually exists in myCars before you try to output it.






## Nested Loops (Cont..)
  - WE DO: Review how to access things shown in this exercise:
  ```javascript
  Exercise: Take this deeply nested reference type and write the code to find the following values:

  The email of user 1.
  The title of user 5.
  The user id of the first user in the users array.
  ```

  - YOU DO: *Using nested loops*, traverse through this entire object, outputting all of the keys, and values for each user in this format: ( key : value ).
  - YOU DO: Separate the output of each user with a bunch of dashes (-) to make it more readable.
  - YOU DO: Change your code to output only the user_id, name, age, email, title, and photo_url of each user.
  - YOU DO: Find the average age of all of the users in the object.
```javascript
  var infoObj = {
    users:[
      {
        user_id: 1,
        name: "Chris Rivers",
        age: 22,
        mention_name: "chris",
        email: "chris@hipchat.com",
        title: "Developer",
        photo_url: "https:\/\/www.hipchat.com\/chris.png",
        last_active: 1360031425,
        created: 1315711352,
        status: "away",
        status_message: "gym, bbl",
        is_group_admin :1,
        is_deleted :0
      },
      {
        user_id: 3,
        name: "Peter Curley",
        age: 57,
        mention_name: "pete",
        email: "pete@hipchat.com",
        title: "Designer",
        photo_url: "https:\/\/www.hipchat.com\/pete.png",
        last_active: 1360031425,
        created: 1315711352,
        status: "offline",
        status_message: "",
        is_group_admin: 1,
        is_deleted: 0
      },
      {
        user_id: 5,
        name: "Garret Heaton",
        age: 32,
        mention_name: "garret",
        email: "garret@hipchat.com",
        title: "Co-founder",
        photo_url: "https:\/\/www.hipchat.com\/garret.png",
        last_active: 1360031425,
        created: 1315711352,
        status: "available",
        status_message: "Come see what I'm working on!",
        is_group_admin: 1,
        is_deleted: 0
      }
    ]
  }
```


## Resources:
  https://workbook.galvanize.com/cohorts/68/articles/3083
  > Start at: An Introduction to Iterators ~half-way down.

  http://www.pythontutor.com/javascript.html
  > Use this to go through your code step by step to examine variables and see where/when they change.
