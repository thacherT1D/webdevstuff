# Writing your own tests!

Ok, last week you got a taste of what it's like to run tests and then write the code to get your tests to pass. Now, let's dip our toe into writing our own tests and practicing TDD (Test Driven Development)

## Why testing is awesome.

* Helps you break down a problem
* Write cleaner code
* Write _less_ code (Be lazy! - WAT?)
* Sleep at night (cause you know your sh@# ain't broken!)
* People want to hire you if you practice TDD (Test Driven Development)

## Getting Wired Up!

In order to set up testing, we need to tell Jasmine what we want to test and give Jasmine access to those functions. This is a two step process. First, however, we need some files to work with. Let's create our project file structure.

```
mkdir intro-to-jasmine
cd intro-to-jasmine
```

# Initializing Jasmine

```
jasmine init
```

__What did we get when we did `jasmine init`?__

ROOT_FOLDER

    |--spec

    |    |--support

    |          |--jasmine.json
    
    |--README.md

When we initialize jasmine in our project, jasmine spins up a `spec` directory with nothing in it, and a `support` directory with a `jasmine.json` file. The `spec` directory is where you should put all of your test files. The `support` directory is where jasmine
tells the testing framework how to run the tests (you don't have to make any changes there).

When testing, you should always give your `spec` file the same name as your `js` file, but with an `_spec` appended to it. See below.

```
touch lib/miles.js
touch spec/miles_spec.js
```

Here, I added a `miles_spec.js` file to my `spec` directory, and a `miles.js` file to a `lib` directory.

__What is a lib directory for?__

`lib` is short for Library. It might not make much sense right now, but as our understanding of software development grows and our prjects get more complex, we will be moving toward an `MVC` architecture (Model, View, Controller). Basically, what goes in our `lib` directory is code that:

__a)__ doesn't belong in our `models`, `views`, or `controllers` directories

__b)__ custom code.

Ask yourself, is this code that could be reused in another app (EXAMPLE: A pure function)
If so, that's a sign that it should go in your `lib` directory.

Like many things in software development though, there is not a black and white rule for this and different devs will have different opinions on the subject. You will often see these types of files in an `src` directory as well. But this is a good start.  

## Ok, let's get these files talking to eachother

__STEP ONE: Export the code in your `miles.js` file__

We need to tell our file what to export to Jasmine. We can do that by using `module.exports`. Add the below code to your `miles.js` file.

```
module.exports = {

}
```
Currently, we're just exporting an empty object, but later, we'll be exporting an object with functions in it.

__STEP TWO: Our spec file needs to ask for our functions__

In our `spec` file we need to request the code from our `miles.js` file. We do that using `require`. Add the below code to your `miles_spec.js` file.

```
var myFunctions = require('../lib/miles');
```

Ok, what am I doing here? Call `console.log(myFunctions)` in your `miles_spec.js`
file and then run `jasmine` from the command line.
What do you see? What is the value of `myFunctions`?

If all is well, you should see something like this:

```
{}
Started

No specs found
Finished in 0.001 seconds
```
The first thing we see is an empty object. That's our `console.log` and the current value of `myFunctions`. The rest is just telling us that we don't have any tests to run.

Now, go back to `miles.js` and add a function to your object. It should look something like this:

```
module.exports = {
  testFunc: function() {

  }
}
```
Go back to the command line and run `jasmine` again. What's different? You should now see something like this:

```
{ testFunc: [Function] }
Started

No specs found
Finished in 0.001 seconds
```

Hopefully, this makes very clear what is happening when we use `require` and `module.exports` together. `module.exports` is simply exporting the object from `miles.js` and in our `spec` file we're "catching" that object and storing it in a variable called `myFunctions`. By "catching" the object in a variable, we can now invoke our `testFunc` function this way: `myFunctions.testFunc()`.

Great. Let's write our first test!

# Anatomy of a Jasmine Test

* describe
* it
* expect
* toEqual

Jasmine tests are comprised of four main parts, a `describe` block, `it` statements, and `expect`s chained with `toEqual`s.

When I say "block" I basically mean a chunk of code. Think of a `describe` block as the parent, and an `it` statement as a child. A `describe` block can have as many `it` statements as you want, but the `it` statements should all belong to the same "family". In other words, you should organize your `describe`s and `it`s into chunks that belong together, or have some sort of relationship. For example, a `desribe` block might have 3 `it` statements nested inside of it that all test the functionality of a specific function, or feature.

Lastly, inside the anonymous function passed to each `it` statement, should be an "expectation", an `expect` statement. The `expect` statement tells Jasmine what success looks like by calling the function you want to test and comparing its _actual_ results with what the results _should_ be equal to.

Let's look at an example:

```
var myFunctions = require('../lib/miles');

describe('Checks if this stuff works', function() {
  it('returns "YUP!"', function() {
    expect(myFunctions.testFunc()).toEqual("YUP!")
    })
  })
```

Now, take a closer look. What are `describe`, `it`, and `expect` _actually_? They're functions! They're _higher order_ functions, to be precise. So what we're _really_ doing, is invoking the `describe` function and passing in a title and an anonymous function as arguments. That anonymous function then calls the `it` function, which also takes a title and an anonymous functions as arguments. We then invoke yet _another_ function called `expect`. In the above example, we're passing our invoked function`myFunctions.testFunc()` to `expect` and then calling yet another function on the results. This function `toEqual` takes one arugment - whatever success looks like. In this case, the string `"YUP!""`.

__Phew! That's alot!__

# How to Run Tests

When practicing TDD, there are a few rules you should abide by. Three, actually. And you can remember them like this:

### Red, Green, Refactor


__1. RED__
* _Always_ watch a test fail first - otherwise, how do you know you wrote a working test?

__2. GREEN__
* Write the code to make the test pass

__3. REFACTOR__
* Ask yourself if you can do it better? Cleaner? If so, refactor the code and run your tests again to ensure you didn't break anything.

__To run your tests, while in your root directory, simply type `jasmine` from the command line.__

```
jasmine
```

### Ok, let's do this!


Go ahead and add the above `describe` block to your `spec` file, and then run your tests from the command line by typing `jasmine`.

REMEMBER: We _always_ want to see our test fail first. So don't write the code you need just yet.

You should see something like the following:

```
Started
F

Failures:
1) Check to see if this stuff works returns "YUP!"
  Message:
    Expected undefined to equal 'YUP!'.
  Stack:
    Error: Expected undefined to equal 'YUP!'.
        at Object.<anonymous> (/Users/marthaberner/workspace/g18/jasmine-basics/spec/miles_spec.js:5:36)

1 spec, 1 failure
Finished in 0.007 seconds
```

Excellent, we're failing our first test! I bet that's first time anyone ever cheered you on for failing a test :D

__Let's dissect the output:__

* __Failures__ - returns the `describe` title and errors relating to why the test is failing
* __Stack__ - also returns an error describing why are test is failing
* __1 spec, 1 failure__ - this line tells us the total number of tests being run
and how many have failed, passed, or are pending. In this case, we have only one
test and we are failing it.

Let's write the code to make the test pass. I think you got this ;-)

You should now see something like the following when you run your tests:

```
Started
.


1 spec, 0 failures
Finished in 0.005 seconds
```

## Good Developer Habits - Initial Commit

Hey, go delete the `console.log()` from `miles_spec.js` if it is still there. That is cruft and we don't want to save it.

We've just done a bit of work to get this project set up correctly, let's go ahead and do our `initial commit`:

```
git add -A
git commit -m "initial commit"
git push origin master
```

If you're asking yourself "When should I commit and push?", the answer is "Early and often".

# Let's up our game!

Ok, you've had an introduction to writing tests. Let's keep going and write some real functions with some real tests.

Go ahead and delete `testFunc` from `miles.js`

## EXERCISE ONE - MILES

Let's modify our existing test to do something more interesting.

This is going to get a bit more complex than our first test, so we'll do
this one together as well.

__Basically, we want to end up with the following:__

*  `miles.js` exports a function called `hasEnougGas`
*  `hasEnoughGas` takes two arguments:
  * a `car` object
  * a `route` object
* The function determines if the car has enough gas to travel the entire route and returns `true` or `false`.

If we're doing this right, that means we write a test _first_. That's what __TDD__ means. _Test Driven Development_. It means, that the code you write in your app is all in service of passing a written test. This helps us to only write the code we need, and helps us to stay out of the "rat hole" that can sometimes derail our focus.

__Here's a list of what we'll need to do:__

* Give our `describe` function a new title
* Give our `it` function a new title
* Create some "dummy" objects to pass to our function
* Pass the function we want to test to `expect`
* Call our function and pass in the dummy arguments
* Tell Jasmine what success looks like

### Let's take this one step at a time

Take a stab at each of these steps. You can check your code at any time by going to `answers.md`. But I want to give you a chance to do it yourself before I show you the answers.

__1. Give our `describe` function a new title:__

In this case, "Miles" will do just fine. It's a bit vague, but it's the title of our exercise, so I'm happy with that.

__2. Give our `it` function a new title:__

While our `describe` title is a bit broad, this title should be more descriptive, precise. Let's use `"determines if a car has enough gas to travel a route"`

__3. Create "dummy" objects to pass to our function:__

Copy and past the following two objects into your test. Put them before the `expect` statement but after the it `statement`:

```
var car = {
  milesPerGallon: 20,
  gallonsInTank: 3
};

var route = {
  miles: 200,
  destination: "Boulder",
  location: "Fancy Land"
};
```
__4. Pass the function we want to test to our `expect` statement:__

We want to test a function called `hasEnoughGas`. How we do we call that function in our `spec` file? Take a moment. I'll wait.
(Try to write it yourself. Don't stress, the answers are all in `answers.md`)

__5. Call our function and pass in the dummy arguments:__

Our function is supposed to take two arguments:

1. a car object
1. a route object

We've already created two test objects, `car` and `route`. Let's go ahead and pass them to our `hasEnoughGas` function,respectively. Remember, this is still in `miles_spec.js`. Your `miles.js` file should still be exporting just an empty object.

__6. Tell Jasmine what success looks like:__

We're almost there! Now, we need to chain a `toEqual` function to our `expect` function and tell Jasmine what our `hasEnoughGas` function _should_ return if all goes as planned.

In order to do this, we'll have to take a closer look at our two objects and determine if the result should be `true` or `false`.

Well, which one is it? `true` or `false`?

__7. Run the test!__

Drumroll please ...

```
jasmine
```

You should see something like this:

```
Started
F

Failures:
1) Miles determines if a car has enough gas to travel a route
  Message:
    TypeError: myFunctions.hasEnoughGas is not a function
  Stack:
    TypeError: myFunctions.hasEnoughGas is not a function
        at Object.<anonymous> (/Users/marthaberner/workspace/g18/jasmine-basics/spec/miles_spec.js:15:24)

1 spec, 1 failure
Finished in 0.006 seconds
```

If things aren't working and you want to check your test, look inside `answers.md` and compare your test to that test.

### RED

Ok, you should now have a failing test. That's the first rule in our __RED, GREEN, REFACTOR__ workflow. Nice work.

Let's work toward green.

### GREEN

Your workflow should look like this:

1. Run the test.
2. Write the least amount of code necessary to get past the error message
3. Run the test and look for a new error message
4. Write the least amount of code necessary to get past the new error message
5. Rinse and repeat until your test goes green

### REFACTOR

Congratulations on your green test! Now, let's take a moment to ask ourselves if we can do it better, cleaner, make it more readible.

### Add, Commit, Push

You've worked hard. It would be a shame to screw this up by losing your work, or not sharing your work with your team so they have the most up to date version of the project you are all working on.

```
git add -p
```

This command will walk you through all of your changes. This is your opportunity to clean up any cruft you used to debug, or comments you wrote to help you along. Those things thould be deleted before you commit this code to git. `git add -p` will ask you if you want to stage hunks (chunks of code), simply type `y` or `n` to stage your code. If you see something that shouldn't be there, select `n`. After `git add -p` is done showing you all of your changes, you can go back to files and delete any unnecessary cruft. Then, `git add -p` again just to be sure you caught it all.

```
git commit -m "short but descriptive commit message goes here"
git push origin master
```

## EXERCISE TWO - RIDES

Ok, you have everything you need to do this next one on your own. I'll get you started:

```
touch lib/rides.js
touch spec/rides_spec.js
```

Take it one step at a time and remember the following:

* Write your test first
* Red, green, refactor
* Add, commit, and push early and often

If you need to, simply go back to the beginning of this lesson and just follow the steps again, but substitute the necessary info so that it applies to this new challenge.

__About RIDES:__

*  `rides.js` exports a function called `isTallEnough`
*  `isTallEnough` takes two arguments:
  * a `child` object
  * a `ride` object
* The function determines if the child is tall enough to go on the ride. It should return `true` or `false`.

__Sample Objects:__

```
var child1 = {
  height: 3,
  name: "Julian",
  age: 3
};

var child2 = {
  height: 4,
  name: "Cero",
  age: 4
};
```
```
var ride1 = {
  minHeight: 3,
  maxHeight: 7
};

var ride2 = {
  minHeight: 4,
  maxHeight: 7
};
```

__NOTE:__ This time, practice writing two `it` statements in your `describe` block.

```
it('determines when a child is too short', function() {

});

it('determines when a child is tall enough', function() {

});
```