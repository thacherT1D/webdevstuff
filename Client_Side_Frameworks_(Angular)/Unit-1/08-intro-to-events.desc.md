# Angular - Intro to Events

## Objectives
- Compare and contrast angular events to browser events.
- Use angular event directives to handle user input.
- Discuss `ng-submit` anti-patterns.


## Resources
For this article, fork and clone the following repository [angular-intro-to-events](https://github.com/gSchool/angular-intro-to-events). This repository includes folders where you can code your solutions as well as some scaffolding to better target the content.

## Events

Angular provides event-handling directives to help us write interactive applications.

### ng-click

`ng-click` is used to run a specific method on the current `vm` when an element is clicked. Think of it as the Angular equivalent of the `onclick` property.  Let's use it to build a random number picker!

For this example, a basic angular scaffold can been found in the `ng-click-scaffold` folder in the  [exercises repository](https://github.com/gSchool/angular-intro-to-events).

In a controller, let's add a property to the `vm` called `view.number`:

```jsdi
vm.view = {};
vm.view.number = 5;
```

In the `index.html`, add a controller using the `controller as` pattern.

```
<div ng-controller="ngClickController as ngCC>"
```

Let's display `number` in the template:

```html
<h3>The number is: {{ngCC.view.number}}</h3>
```

Next, let's add a button which will call `pickRandomNumber()` (we haven't defined it yet) when clicked.

```html
<button ng-click="ngCC.pickRandomNumber()">Pick Random Number</button>
```

Now let's implement `pickRandomNumber()`. Remember that `ng-click` calls a method on the current `vm`, so we need to make sure `pickRandomNumber()` is defined on the `vm`. Back in your controller, add:

```js
vm.pickRandomNumber = function() {
  vm.view.number = Math.floor(Math.random() * 10) + 1;
}
```

And that's it!  Try clicking your button and watch as the number changes automatically on the screen.

**EXERCISE 1**

Explain in as much detail as you can what happens when you click the button.  Why does `number` update in the template without us telling it to?

Write your conclusion in the `Exercise_1/answer.md` in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).

**EXERCISE 2**

Add a button that will reverse some text when clicked.  Take a look at the example gif below.

![](http://zippy.gfycat.com/ClosedFreshGar.gif)

Place your solution in the `Exercise 2` folder in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).

**EXERCISE 3: Create a simple Ping Pong Score Keeper.**  

It should display the 2 players' scores, have buttons to increment each player's scores, and highlight the winner (assume games only go to 11).  It should also display the current server (switch serves every 2 points).  Lastly, make sure to include a reset button.  BONUS: Keep track of how many games each player wins.

![](https://i.gyazo.com/40d31881e3774f4f374503920e784931.gif)

Place your solution in the `Exercise 3` folder in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).

### ng-mouseenter

`ng-mouseenter` is another event that you have access to in angular.  Let's make a quick counter that counts every time a div gets a mouse enter event.

For this example, a basic angular scaffold can been found in the `ng-mouseenter-scaffold` folder in the  [exercises repository](https://github.com/gSchool/angular-intro-to-events).

In your controller add:

```js
vm.view = {};
vm.view.enterCount = 0;
```

In your html add your `ng-controller` directive:

```
<div ng-controller="mouseEnterController as mec">
```

In your view, display the number of times the div was entered, along with the div itself.  Notice that the div has the `ng-mouseenter` attribute which evaluates an expression every time a mouse enter occurs:

```html
<h3>The div was entered {{view.enterCount}} times</h3>
<div class="divbox" ng-mouseenter="mec.view.enterCount = mec.view.enterCount + 1">
</div>
```

You will also need to add some css to see the div:

```css
.divbox {
  width: 400px;
  height: 400px;
  border-style: solid;
  border-width: 6px;
}
```

Now you have a mouse enter event working on your div.

**EXERCISE 4: Create a box that randomly changes colors**

Use `ng-mouseenter` and `ng-style` to create a box that gets a new random color every time your mouse enters the box.  The gif below, in the next exercise, will give you and idea of how the random color box should work.

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

Place your solution in the `Exercise 4` folder in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).

**EXERCISE 5: Replay colors**

Now that you have a box that will change to a new random color on each mouse enter, use `ng-click` and the `$timeout` service to create a feature that will show all the random colors that have been clicked in reverse order.

In the gif below, you can see the user refreshes the page, mouses over the box 4 times, then clicks the replay colors button.  The colors are then replayed in reverse order.

![](http://i.imgur.com/iWqXHnv.gif)

**Hint**:

1. You will need to save an array of each color that was randomly generated for the box.
2. To replay the colors, you will need to use the `$timeout` service.  Here is a pattern for calling the `$timeout` service to solve this problem:

```js
var replaying = false;

vm.replay = function() {
  var displayPrevColor = function() {
    // do some logic to change color
    // if done replay colors
    replaying = false;
    // else
    $timeout(dispalyPrevColor, 1000);
    // end if/else
  };
  if (!replaying) {
    replaying = true;
    // This timeout starts the timeout loop
    $timeout(function() { displayPrevColor(); }, 500);
  }
};
```

Place your solution in the `Exercise 5` folder in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).

### ng-submit

`ng-submit` can be used whenever you want an action to take place on a form submit.  The `ng-submit` directive prevents the default browser behavior (sending a request to some action and refreshing the page).  It also evaluates the expression in the `ng-submit`.  For example:


**index.html**

```html
<div ng-controller="submitController as sc">
  <form ng-submit="sc.submitFav()" name="favPieForm">
    <input name="name" type="text" ng-model="sc.favoriteForm.name">
    <input name="favorite_pie" type="text" ng-model="sc.favoriteForm.favoritePie">
    <input type="submit">
  </form>
  Name: {{sc.favoriteForm.name}}<br>
  Favorite Pi: {{sc.favoriteForm.favoritePie}}
</div>
```
**controller.js**

```js
  vm.favoriteForm = {};
  vm.submitFav = function() {
    var favPi = parseFloat(vm.favoriteForm.favoritePie);
    // Special output if the favorite pie is a certain number
    if (!isNaN(favPi) && favPi >= 3.14 && favPi <= 3.142) {
      vm.favoriteForm.favoritePie = "\u03A0";
    }
    console.log("Your favorite pie is: ", vm.favoriteForm.favoritePie);
  };
```

For this example, a basic angular scaffold can been found in the `ng-submit-scaffold` folder in the  [exercises repository](https://github.com/gSchool/angular-intro-to-events).

#### ng-submit Anti Patterns

An anti pattern is a way of writing code that is a bad practice in your framework.  There are a few things you should **not** do with `ng-submit`.

1. Do not use `ng-submit` on the form and `ng-click` on the submit button at the same time. Use either ng-submit on the form and no directive on the submit button, or use `ng-click` on the submit button and no directive on the form. `ng-submit` is preferred in a form.
2. Do not create separate properties directly on the `vm` object for each form field. Instead, create an object that contains all the form properties inside of it. In the above example, `vm.favoriteForm = {};` is the object that will contain each form property.
3. Never do any DOM manipulation in your controller. When submitting form data, it is often tempting to revert back to the jQuery way of doing things. For example, do not attempt to append the new form data to the DOM inside of your controller. Again, **do not do any DOM manipulation in the controller**. Instead, add the data that you want to display to an object in the scope that will then be displayed in the view.

**EXERCISE 6**

Create a form for entering address data.  The form should accept a street (line 1), street (line 2), city, state, and zip code.  When the data is submitted, it again should be shown to the user (displayed on the page) and the form data should be cleared so that more data can be entered.

Place your solution in the `Exercise 6` folder in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).

**EXERCISE 7: Contact List**

Create a simple contacts app.  Each contact has a name, email, and phone number.  A user can create new contacts using a form.  A user can search contacts as well (you'll need to research this part). HINT: try binding name, email, and phone as properties on one `newContact` object rather than creating 3 different properties on the `vm`

![](https://i.gyazo.com/e1dba3d8e24812690d1af363630af5a6.gif)

Place your solution in the `Exercise 7` folder in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).

### Other Events

There are a bunch of other built-in event directives like

* ng-change
* ng-mousedown
* ng-mouseenter
* ng-mouseleave
* ng-mousemove
* ng-mouseover
* ng-mouseup

They all work just like `ng-click`.  When a specific event is triggered, they will run a given method on the current `vm`.  

**EXERCISE 8**

Add a feature to a previous exercise using one of the event directives listed above

Place your solution in the `Exercise 8` folder in the [exercises repository](https://github.com/gSchool/angular-intro-to-events).
