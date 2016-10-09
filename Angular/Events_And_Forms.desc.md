## Objectives

* Explain the difference between jQuery thinking and Angular thinking

* Construct Angular event handlers using:
  * `ng-click`
  * `ng-mouseenter`
  * `ng-submit`

* Explain why we validate on the client side

* Implement form validation using Angular's form validation features.

## What is jQuery thinking?

At this point, we have used jQuery to do many things diverse things in the browser but in lots of cases we use jQuery to handle events. We want textboxes to handle `keyup()` events, list boxes to handle `select()` events and so on.

  For example, say I wanna make a missile fire when ever the user clicks the `fire-ze-missiles` button. We would end up with code that looks something like:
  ```javascript
  $('.btn.fire-ze-missiles').click(function() {
    // perform missile launch sequence
  });
  ```
  When you think about attaching events to elements from a high level your process is something like:
  1. Figure out what we action we want to happen (when the user does something we want something to happen)
  2. Find the element in the DOM
  3. Add the event handler

Specifically, assigning an event handler directly to button, in this case a `click` handler to the `.btn.fire-ze-missiles`, is an example of imperative programming. **Imperative programming** is changing the programs state by issuing commands. Any time you issue a command in program you are practicing imperative programming.

## What is Angular Thinking?

Angular uses a different style of programming than jQuery. Back to our "make a missile fire when ever the user clicks the `fire-ze-missiles` button" example, with Angular we get an HTML file that looks includes:

```html
<div ng-controller="MissileCtrl as mc">
  <button ng-click="mc.fireZeMissiles()">Fire Ze Missiles</button>
</div>
```

and a controller that looks something like:

```javascript
angular.controller('MissileCtrl', function() {
  this.fireZeMissiles = function() {
    // perform missile launch sequence
  }
});
```
As you can see the Angular code IS a bit longer than the jQuery code. But more importantly the Angular thinking is sharply different than jQuery thinking. To add an event handler function in Angular we do something like:

- I wanna do something when a user clicks on a button
- put `ng-click` attribute on button element
- add handler function in the controller

Assigning an event hander direct to a button using the `ng-click` event is an example of declarative programming. **Declarative programming** is when you defined the logic of something without issuing commands. Think of it as "wiring things up".

## So what is Angular thinking and jQuery thinking again?

jQuery is imperative programming where you issue a bunch of commands to make things happen. You define a bunch of steps to get a result.

Angular is declarative programming where you do NOT define statements. You define the result you want.

Simply put, declarative style coding is generally easier to grok than imperative code.

### Resources

* [Stackoverflow Q](http://stackoverflow.com/questions/1784664/what-is-the-difference-between-declarative-and-imperative-programming)
* [Imperative vs Declarative Programming](https://medium.freecodecamp.com/imperative-vs-declarative-programming-283e96bf8aea)

## What is the Angular `ng-click` event handler?

`ng-click` is used to run a specific method in the current `Ctrl` when an element is clicked. Think of it as the Angular equivalent of the `onclick` property.  Let's use it to build a random number picker!

### An Angular App Scaffolding review

First, let's define the `app.js`

```javascript
(function() {
  'use strict';

  angular.module('myLovelyApp', []);
}());
```
Second, let's define a basic `index.html`

```html
<!DOCTYPE html>
<html ng-app="myLovelyApp">
  <head>
    <meta charset="utf-8">
    <title>My Lovely App</title>
  </head>
  <body>
    <header>
      <h1>My Lovely App</h1>
    </header>
    <main>
      <div ng-controller="myLovelyCtrl as ctrl">
        {{ 1 + 3}}
      </div>
    </main>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
    <script src="app.js"></script>
    <script src="controllers.js"></script>
  </body>
</html>
```

and a `controllers.js` file:

```javascript
(function() {
  'use strict';

  const app = angular.module('myLovelyApp');
  app.controller('myLovelyCtrl', function() {

  });
}());
```

In the controllers, let's add a property to the `myLovelyCtrl` called `view.number`:

```javascript
this.view = {};
this.view.number = 5;
```

Let's display `number` in the template:

```html
<h3>The number is: {{ctrl.view.number}}</h3>
```

Next, let's add a button which will call ```ctrl.pickRandomNumber()``` (we haven't defined it yet) when clicked.

```html
<button ng-click="ctrl.pickRandomNumber()">Pick Random Number</button>
```

Now let's implement ```pickRandomNumber()```. Remember that ```ng-click``` calls a method on the controller ```myRandomCtrl```, so it must be defined on the `myLovelyCtrl`. Back in your controller, add:

```javascript
this.pickRandomNumber = function() {
  this.view.number = Math.floor(Math.random() * 10) + 1;
};
```

And that's it!  Try clicking your button and watch as the number changes automajically on the screen.

**EXERCISE**

Explain in as much detail as you can what happens when you click the button.  Why does ```number``` update in the template without us telling it to?

**ng-click EXERCISE # 1**

Add a button that will reverse some text when clicked.  Take a look at the example gif below.

![](http://zippy.gfycat.com/ClosedFreshGar.gif)

**ng-click EXERCISE # 2: Create a simple Ping Pong Score Keeper.**

It should display the 2 players' scores, have buttons to increment each player's scores, and highlight the winner (assume games only go to 11).  It should also display the current server (switch serves every 2 points).  Lastly, make sure to include a reset button.  BONUS: Keep track of how many games each player wins.

![](https://i.gyazo.com/40d31881e3774f4f374503920e784931.gif)

### ng-mouseenter

`ng-mouseenter` is another event that you have access to in Angular.  Let's make a quick counter that counts every time a div gets a mouse enter event.

In your view, display the number of times the div was entered, along with the div itself.  Notice that the div has the ```ng-mouseenter``` attribute which evaluates an expression every time a mouse enter occurs:

```html
<h3>The div was entered {{ view.enterCount || 0 }} times</h3>
<div style="width: 200px; height: 200px; border: 1px solid #CCC;" class="divbox" ng-mouseenter="ctrl.view.enterCount = ctrl.view.enterCount + 1"></div>
```

Now you have a mouse enter event working on your div.

**ng-mouseenter EXERCISE # 1: Create a box that randomly changes colors**

Use ```ng-mouseenter``` and ```ng-style``` to create a box that gets a new random color every time your mouse enters the box.  The gif below, in the next exercise, will give you and idea of how the random color box should work.

**Hint**:

Here is code to generate a random hex color:

```js
  function randomColor() {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6-x.length);
    var z = "000000";
    var z1 = z.substring(0,y);
    var color = "#" + z1 + x;
    return color;
  }
```

**ng-mouseenter EXERCISE # 2: Replay colors**

Now that you have a box that will change to a new random color on each mouse enter, use ```ng-click``` and the ```$timeout``` service to create a feature that will show all the random colors that have been clicked in reverse order.

In the gif below, you can see the user refreshes the page, mouses over the box 4 times, then clicks the replay colors button.  The colors are then replayed in reverse order.

![](http://i.imgur.com/iWqXHnv.gif)

**Hint**:

1. You will need to save an array of each color that was randomly generated for the box.
2. To replay the colors, you will need to use the ```$timeout``` service.  Here is a pattern for calling the ```$timeout``` service to solve this problem:

```javascript
var replaying = false;

this.replay = function() {
  var displayPrevColor = function() {
    // do some logic to change color
    // if done replay colors
    replaying = false;
    // else
    $timeout(displayPrevColor, 1000);
    // end if/else
  };
  if (!replaying) {
    replaying = true;
    // This timeout starts the timeout loop
    $timeout(function() { displayPrevColor(); }, 500);
  }
};
```

### ng-submit

`ng-submit` can be used whenever you want an action to take place on a form submit.  The `ng-submit` directive prevents the default browser behavior (sending a request to some action and refreshing the page).  It also evaluates the expression in the `ng-submit`.  For example:

**index.html**

```html
<form ng-submit="ctrl.submitFav()" name="favPieForm">
  <input name="name" type="text" placeholder="Your Name" ng-model="ctrl.favoriteForm.name">
  <input name="favorite_pie" type="text" placeholder="Your Favorite Pie" ng-model="ctrl.favoriteForm.favoritePie">
  <input type="submit">
</form>
<p>Name: {{ctrl.favoriteForm.name}}</p>
<p>Favorite Pie: {{ctrl.favoriteForm.favoritePie}}</p>
```
**app.js**

```js
this.submitFav = function() {
  var favPi = parseFloat(this.favoriteForm.favoritePie);
  // Special output if the favorite pie is a certain number
  if (!isNaN(favPi) && favPi >= 3.14 && favPi <= 3.142) {
    this.favoriteForm.favoritePie = '\u03A0';
  }
  console.log('Your favorite pie is: ', this.favoriteForm.favoritePie);
};
```
**ng-submit - Exercise #1**

Create a form for entering address data.  The form should accept a street (line 1), street (line 2), city, state, and zip code.  When the data is submitted, it again should be shown to the user (displayed on the page) and the form data should be cleared so that more data can be entered.

**ng-submit - Exercise #2 - Contact List**

Create a simple contacts app.  Each contact has a name, email, and phone number.  A user can create new contacts using a form.  A user can search contacts as well (you'll need to research this part). HINT: try binding name, email, and phone as properties on one `newContact` object rather than creating 3 different properties directly on the `Ctrl`

![](https://i.gyazo.com/e1dba3d8e24812690d1af363630af5a6.gif)

### Other Events

There are a bunch of other built-in event directives like

* ng-change
* ng-mousedown
* ng-mouseenter
* ng-mouseleave
* ng-mousemove
* ng-mouseover
* ng-mouseup

They all work just like `ng-click`.  When a specific event is triggered, they will run a given method on the current $scope.

**ng-submit - Exercise #3**

Add a feature to a previous exercise using one of the event directives listed above

## Form Validation with Angular

### Why we validate on the client side

Form and controls provide validation services, so that the user can be notified of invalid input before submitting a form. This provides a better user experience than server-side validation alone because the user gets instant feedback on how to correct the error and better yet, we don't need to even bother going to the server if the user fails the client side validation.

### Why we can't ONLY validate on the client side

Keep in mind that while client-side validation plays an important role in providing good user experience, it can easily be circumvented and thus can not be trusted. Server-side validation is still necessary for a secure application. We can easily disable javascript and delete things from the DOM using the developer tools - so we need to ensure that we are validating in a place where users do NOT have access.

## Building our first form

```html
<div ng-controller="myFormCtrl as myFormCtrl">
  <form action="#">
      <label for="firstname">First Name: </label>
      <input type="text" id="firstname">
      <label for="lastname">Last Name: </label>
      <input type="text" id="lastname">
      <input type="submit" value="Click me!">
  </form>
</div>

```

Now this form is pretty decent, but it looks like we are not validating anything! A user can leave the inputs blank and still submit the form successfully! Let's add some validations with HTML5 using `required`.

Your form should now look like this:

```html
<form action="#">
  <label for="firstname">First Name: </label>
  <input type="text" id="firstname" required>
  <label for="lastname">Last Name: </label>
  <input type="text" id="lastname" required>
  <input type="submit" value="Click me!">
</form>
```
Now this is great, but it would be nice if we could be a bit more specific on what we want to validate inside this form. What if we want the First Name to be present, but it has to be at least three characters.

Our first thought might be to start writing a bunch of javascript and figure out if there is any text inside the input and if so, to figure out the length. While this would work, Angular has a nicer way to help us out. But before we do this, let's learn about some of the key properties and classes we will be using to validate forms in angular.

## Before you continue, take 5 minutes and scan through the following documentation down to the Custom Validations section:
[http://www.ng-newsletter.com/posts/validations.html](http://www.ng-newsletter.com/posts/form-validation-with-angularjs.html)

### Validation Angular Style

As you might expect from our earlier discussion of declarative style of programming, we can add some additional attributes, called directives in Angular, to our form elements and get some sweet, easy validation. Something like:

```html
<form action="#">
  <label for="firstname">First Name: </label>
  <input type="text" id="firstname" ng-minlength=3 required>
  <label for="lastname">Last Name: </label>
  <input type="text" id="lastname" required>
  <input type="submit" value="Click me!">
</form>
```

### A quick walkthrough of angular form properties, classes and descriptions

This table and the corresponding descriptions come from [this](https://scotch.io/tutorials/angularjs-form-validation-with-ngmessages) fantastic tutorial.

| Property  |  Class | Description  |
|---|---|---|
| $valid  |  ng-valid | Boolean that indicates whether an item is currently valid based on the rules you placed.  |
| $invalid  |  ng-invalid |  Boolean that indicates whether an item is currently invalid based on the rules you placed. |
|  $pristine |  ng-pristine |  Boolean that's true if the form/input has not been used yet. |
|  $dirty |  ng-dirty |   Boolean that's true if the form/input has been used. |
|  $touched |  ng-touched |  Boolean that's true if the input has been blurred |

## Accessing and targeting our form and inputs

In order to use angular form validation we have to abide by the following rules

- We must give our form a name attribute (let's imagine a name attribute = "firstForm")
- We can then do things like `firstForm.$valid` (which returns true or false)
- We have to put an ng-model on each of our inputs (remember to use the dot!)

A couple extra things:
- Angular does not play well with standard HTML5 validations so we add `novalidate` as an attribute to our form - this is super important for Materialize.
- To access angular properties on our inputs we use the syntax `formName.inputName.angularProperty`.
  + We can then do things like `firstForm.username.$valid` or `firstForm.username.$error` (to see an object with any errors)

## Styling our forms and displaying error messages:

It would be much nicer if we could display a message to our user and style it accordingly.

In order to add a class based off of a condition we are going to be using the built in `ng-class` directive (docs are [here](https://docs.angularjs.org/api/ng/directive/ngClass). There are a few ways to use `ng-class`, the way we will be using it is as follows (pay close attention to the quotes!)

`ng-class="{ 'class-name' : expression, 'another-class': another expression }".`

An example of this would be: `"{ 'has-error' : sampleForm.username.$invalid }"`

But how about showing an error message? To do this we are going to be using the `ng-show` directive which works like this:

`ng-show="condition"`

An example of this would be:
`<span ng-show="sampleForm.username.$invalid">Username is invalid</span>`

## Visualization

If you would like a great example of how these form classes and properties work (99% borrowed from scotch.io) - check out [these](http://sales-person-licks-61176.bitballoon.com) validation tables


## Questions
#### Exercise - questions + building your own form and validations

First, answer the following questions

- When does a form/input have a property of $valid? What class accompanies this property?
- When does a form/input have a property of $invalid? What class accompanies this property?
- When does a form/input have a property of $pristine? What class accompanies this property?
- When does a form/input have a property of $dirty? What class accompanies this property?
- When does a form/input have a property of $touched? What class accompanies this property?
- What does blurred mean? (research the `blur` event)

#### For the next set of questions, assume that you have a form with a name="quizForm"

- Create a text input with a name of "question" and give it a validation of "required". If it is $valid add a class of "valid"
- For your text input with a name of question, add a paragraph tag with the text "please enter a valid question" if the input is not valid
- Create a text input with a name of "answer" and give it a validation of "required" and a minimum length of 4 characters. If it is $valid and not $pristine add a class of "correct".
- How would you access all of the errors (in an object) for an input with a name of `quizForm.username`
- What validations would you add in an input to make sure that there is a minimum length of 4 and a maximum length of 20
- What validation would you add in an input to make sure that only numbers between 1 and 5 are a valid input (use regular expressions for this!)

## Exercise - styling our form and adding some error messages!

Now that you have a solid understanding of these properties/classes, let's build another form with an action of "#" and four text inputs for a username, password, email and zip code. Your form should validate that the username and password are both between 3 and 12 characters long. It should also make sure that the email is a valid email and that the zip code is a five digit number (use ng-pattern and regular expressions for this!).

Now that we have an idea of how to style and display error messages, let's do the following

- display error messages if inputs are invalid (write whatever you would like for the error message)
- add a class of `invalid` if the validation fails
- add a class of `valid` if the validation passes
- only display the error message/styling if the user has typed something
- when the form is submitted, collect the inputs and add them to an array called `users` (this will be done in your controller)
  + remember that the default behavior for the form submission is a page refresh - you will need to prevent this.
  + make sure to clear all the form values and validations (you should use a method from [here](https://docs.angularjs.org/api/ng/type/form.FormController) to do that )
  + display the array of users (each one should be an object) at the top of your form (see the gif below for guidance).

Your form should work like this:

[![https://gyazo.com/a6a93b98ada81f54140052956cea2cb0](https://i.gyazo.com/a6a93b98ada81f54140052956cea2cb0.gif)](https://gyazo.com/a6a93b98ada81f54140052956cea2cb0)

## Bonus - refactor using ngMessages
Our HTML is getting a bit messy, it would be nice to have an easier way to deal with error messages, that's where ng-messages comes in. Walk through [this](https://scotch.io/tutorials/angularjs-form-validation-with-ngmessages) or [this](http://www.yearofmoo.com/2014/05/how-to-use-ngmessages-in-angularjs.html) tutorial and refactor your form to use ng-messages.

## Additional Resources
[All about Angular form validation](http://www.ng-newsletter.com/posts/form-validation-with-angularjs.html)
[https://docs.angularjs.org/guide/forms](https://docs.angularjs.org/guide/forms)

[https://docs.angularjs.org/api/ng/directive/input](https://docs.angularjs.org/api/ng/directive/input)
