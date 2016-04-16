__MORE ADVANCED PRACTICE__: [amusement parks](git@github.com:gSchool/amusement-parks-objects-arrays-js.git)

This is a very basic intro to writing tests. We offered these two stretch exercises for more advanced students.

## STRETCH I

Use this simple [repo](https://github.com/gSchool/intro-to-jasmine-and-tdd/tree/master/tip-calculator-demo) to practice TDD.

__TODO LIST:__

__1.__ wire up a test for the `calculateTip` function.

__2.__ add funtionality to `calculateTip`

* user can select a tip percentage from a drop down menu (i.e. 15%, 18%, 20%)
* write your test first!

__HINT:__ Your function should now accept two arguments (check total, tip percentage)

__3.__ User can split the check with others:

* Test for a function called `splitCheck` that:
  * lets a user select how many people to split the check with
  * Split totals should include the tip

__NOTE:__ Once your tested functions are working correctly, add the DOM functionality for your user.


__MORE__
Go back to one of your own previous exercises, such as Tip Calculator or
Air Travel Calculator. Refactor your code to separate DOM functions from pure
functions and write tests for your pure functions.
(You'll probably be getting an error in your browser, but your tests should
still run fine. We'll address the error in the next step)


## STRETCH II

Ok, check your console. I'm betting you're getting this error
`Uncaught ReferenceError: module is not defined` The truth is, your browser
doesn't like the way you're testing right now. `module.exports` is actually a server
side, Node thing. But an app like Tip Calculator is running in the browser.
Luckily, Jasmine can also be wired up to run in your browser. See if you can
restructure you tests and app to work with Jasmine in the browswer. Here are some
links to help you get there.

[Jasmine Introduction](http://jasmine.github.io/2.3/introduction.html)

[Old but useful Jasmine Tutorial](http://evanhahn.com/how-do-i-jasmine/)