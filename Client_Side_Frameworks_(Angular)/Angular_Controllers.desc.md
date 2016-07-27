## Objectives

* Explain what a Controller is.
* Explain why a Controller is important.
* Build an Angular Controller.
* Explain `$scope` in Angular.
* Practice proper scoping recommendations in an Angular application.

## What is a controller?

In our client-server setup, the server provides us with all of the data in its raw state. It gets stored in our client side application (this data on the client is often referred to as the **model**) and eventually gets used in our **view**. A **controller** provides properties and functionality to get the data in the model, process it in some way, and send it to the view. In essence, controllers provide a bridge between the model and the view. This is often referred to as an **Model-View-Controller (MVC)** architectural pattern.

## Why are controllers important?

Continuing the trend of Separation of Concerns, models and views can focus solely on what they do best. Models focus on retrieving and core business logic of the data whereas views focus on the display of the data and handling user interaction. The controllers provide the need for communicating between the two. This separation provides the same benefits that we see elsewhere:

* Its focus is crystal clear to understand, reducing cognitive load.
* It's easily testable since there is only one focus to be testing.
* Pieces can easily be swapped out without affecting other areas.

Here are example interactions that describe the connection between the model view controller.

* The catalog model downloads catalog informing the controller that the data has been downloaded. The controller then passes the data to the view to display a catalog page onto the screen formatted as needed.
* The view accepts a click of a button to add an item to the cart. The view informs the controller of this click to add an item. The controller then adds the item to the cart its managing.
* The view accepts a click to submit the payment. The controller sends the items in the cart to a order model which creates a request to purchase the items and create an order receipt.

![Model-View-Controller Diagram](http://i.stack.imgur.com/ocEWx.png)

### Exercise

Write down in your own words what a controller is and why they are important. Turn and talk to your neighbor and discuss what you wrote. Think of other example interactions in the format of a Model

## Building an Angular Controller

Angular takes care of the hard part - connecting our controllers and views together through two-way data binding. Because of this, Angular controllers are often called **View Models** and the architectural pattern becomes an **Model-View-ViewModel (MVVM)**.

As an examples on controllers, we are going to make a ToDo list app, often a great way to illustrate the overall structure of an application. Create a directory for your project.

```sh
$ mkdir todo-app-angular
$ cd todo-app-angular
$ touch index.html
$ atom .
```

Use the initial template for your html application.

```html
<!DOCTYPE html>
<html ng-app="todoApp">
  <head>
    <meta charset="utf-8">
    <title>My ToDo List</title>
    <link rel="stylesheet" href="style.css" charset="utf-8">
  </head>
  <body>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
  </body>
</html>
```

Include the css template. Test that your application is running properly.

```css
ul {
  list-style-type: none;
}

.completed {
  text-decoration: line-through;
  color: gray;
  font-style: italic;
}
```

Next, we are going to build our `app.js` file which initializes our application.

```sh
touch app.js
```

```javascript
(function() {
  'use strict';

  angular.module('todoApp', []);
}());
```

### Building a controller for our todo list

Our todo list needs to manage two aspects of a todo list.

* The list of todos and their status.
* The todo text that needs to be added.

Let's model the structure of our todo list in our html.

```html
<body>
  <header>
    <h1>My ToDo List</h1>
  </header>
  <main>
    <ul ng-init="todos = [{text: 'Make a todo list', completed: true}, {text: 'Make it fancy', completed: false}]">
      <li ng-repeat="todo in todos">
        <input type="checkbox" ng-model="todo.completed"> <span ng-class="{ completed: todo.completed }">{{todo.text}}</span>
      </li>
      <li><input type="text" ng-model="todoToAdd"><a href="">add</a></li>
    </ul>
  </main>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
</body>
```

Let's now move the code to a controller. Create a `controllers.js` file and modify the html as follows.

```javascript
(function() {
  'use strict';

  const app = angular.module('todoApp');

  app.controller('TodoListController', function() {
    this.todoToAdd = '';
    this.todos = [];

    this.addTodo = function() {
      this.todos.push({
        completed: false,
        text: this.todoToAdd
      });
      this.todoToAdd = '';
    };

    this.completeTodo = function(todo) {
      todo.completed = true;
    };
  });
}());
```

Update your HTML to the following:

```html
<ul ng-controller="TodoListCtrl as todoList">
  <li ng-repeat="todo in todoList.todos">
    <input type="checkbox" ng-model="todo.completed"> <span ng-class="{ completed: todo.completed }">{{todo.text}}</span>
  </li>
  <li><input type="text" ng-model="todoList.todoToAdd"><a href="" ng-click="todoList.addTodo()">add</a></li>
</ul>
```

Let's talk about what we see. In the `controllers.js` file, we first reference the `todoApp` module in angular. We then use a special method called `controller` that takes in a two arguments: the name of the controller, and a function. The function uses the `this` variable to include all the variables and functions that the controller will offer.

In the HTML, we initialize the controller using an angular built-in directive called `ng-controller`. It starts as the name of the controller, `TodoListController`, followed by the keyword `as`, then a name for use. The name creates a copy of the controller as defined in the JavaScript file. When a new controller is created, everything inside and including the element can reference that controller. Every reference of `todoList` after that refers to the specific instance of the controller. This allows us to use a controller multiple times in an application.

The next new directive to us is `ng-click`. The `ng-click` takes an expression. This is where the controller is called to add a todo.

## The `$scope` variable

Angular automatically gives a controller a brand new `$scope`. The `$scope` object is a JavaScript object that glues together controllers and views. Properties that are on the `$scope` object are available to both the view and the controller. *Don't worry. This will make more sense after a few examples!*

**All properties added to the `$scope` are automatically available in our view.**

Let's write our first controller! Inside a new JS file called `app.js` add

```javascript
var app = angular.module("firstApp", []);
app.controller("MyFirstController", function($scope){
  $scope.name = "Severus Snape";
})
```

The first line tells Angular to create a **module** named `firstApp`. `angular.module('firstApp', [])` returns a new module which we use on the next line when we call `.controller()` on `app`.

Back in our view, we need to specify which module our `ng-app` should use. Update the `<html>` element to `<html ng-app="firstApp">`.

**Question: What are Angular modules? Why should we use them?**

We're declaring a new controller named "MyFirstController". The first argument to `.controller()` is just the name of the new controller, and the second argument is a function that defines the functionality of the controller. Inside of "MyFirstController", we're adding a `name` property to the `$scope` with the value "Severus Snape".

> Note: This is just one way of writing a controller and adding properties to the `$scope`. We will discuss some others in the "Controllers Revisited" lesson.

Now let's use the `name` property inside of our view.

Before we can access the `name` property, we need to specify which part of our template is "inside" of of our controller. To do that, we use the directive `ng-controller`.

In `index.html`, add the following code:

```html
<div ng-controller="MyFirstController">
</div>
```

Just like how `ng-app` declares that the elements inside of a particular element are part of an Angular app, `ng-controller` declares that the elements in side of a particular element belong to a controller.

Now we have access to any properties that we set inside of "MyFirstController", as long as we access them within the `<div>`.

Let's reuse our code from the very first example. Try this

```html
<div ng-controller="MyFirstController">
  <h1>My name is: {{name}}</h1>
  <input ng-model="name" type="text" placeholder="What is your name">
</div>
```

When you run this in your browser, you'll see that the initial value that we set for `name` in our controller is displayed both inside of the text `input` and `h1` tags. When we refer to `name`, Angular automatically looks for a property called `name` on the `$scope`.

Try moving the `h1` and `input` tags somewhere outside of the `div`. Notice that we no longer have access to the initial value of "Severus Snape".

**Why doesn't this cause an error message?**

To wrap up, according to the Angular Docs you should use controllers to:

* Set up the initial state of the `$scope` object.
* Add behavior to the `$scope` object.

In essence, they manage the view.

**EXERCISE**

Requirements:

1. Write another controller called "ExercisesController" which you will use for the next 3 exercises.
1. Add a property called `FavColor` and give it an initial value of your favorite color. Display it in the view.
1. Add another property called `secondsInACentury`. It should be equal to the number of seconds in a century (don't worry about leap years and leap seconds). Make sure you actually calculate the answer with code, instead of just looking it up. Finally, display the answer in your template inside of an `h3` tag. Use a built-in filter to format the huge number with commas in the right place.
1. Create a property called `rightNow` in the controller that is equal to the current time (use a built-in JS function to find the time). Display it in the view and format it nicely (using a built-in filter) so that it looks something like this:

```
Sunday, October 20, 2015
```

**EXERCISE**

Let's refactor your Mad Libs app to use a controller. The end product should look *exactly* the same as the original, except should include a button to generate the mad lib, and a button to start over (clear the fields and hide the generated mad lib).

Start by adding an external JavaScript file, *main.js*, to create a module with a controller. Utilize `ng-app` and `ng-controller` to link both back to the HTML document. Then abstract out the all the logic from the HTML to the newly created controller.

![](./examples/ngmadlibs-p1.png)

![](./examples/ngmadlibs-p2.png)

## Questions

* What is `$scope`?
* What are Angular modules? What's the syntax for defining a module?
* Why do we pass in `$scope` as an argument to controller functions?
* In Express, what are Angular controllers most analogous to?

## Scope

### What is it?

`$scope` is an object used for data binding that we can define methods and properties on. It is automatically injected into our controllers so that we can use it. Many times you will also see/hear `$scope` being defined as "the glue between the controller and the view".

Although it sounds complex, `$scope` is just a JavaScript object. Both the controller and the view have access to `$scope` so it can be used for communication between the two. When a controller is attached to the DOM via the `ng-controller` directive, Angular will instantiate a new controller object. A new child scope will be created and made available as an injectable parameter. This is what happens when we write code like this:

```js
angular.module("firstApp",[]).controller("FirstController", function($scope){
  // we can define all sorts of methods and properties on $scope here
})
```

## Where does it come from? $rootScope

Every application has a single root scope. All other scopes descend from `$rootScope` which we can inject into our controllers (by adding `$rootScope as a parameter to the callback function on the .controller method`)

```js
angular.module("firstApp",[]).controller("FirstController", function($scope, $rootScope){
  // now we can add things to $rootScope!
})
```

##### If you wanted to create a sample rootscope (this is what $rootScope essentially is) you could write something like this:
`var rootScope = angular.element(document).scope()`

Now you might be thinking, if everything comes from $rootScope then angular must be using some kind of inheritance? That is correct! Well, with one exception, custom directives that create their own (isolate) scope, but that's quite beyond the scope of this lesson (pun embarassingly intended).

All scopes are created with prototypal inheritance, meaning that they have access to their parent scopes. Any time that Angular can not find a method or property on the local scope, it will move up to its parent scope and try to look for the property or method there. If it can’t find what it's looking for, it will go to the parent scope’s parent and so on and so forth until it reaches the `$rootScope`.

## A very useful tool - AngularJS Batarang

For a more in depth analysis of scopes, install the  
[AngularJS batarang](https://chrome.google.com/webstore/detail/angularjs-batarang-stable/niopocochgahfkiccpjmmpchncjoapek/related?hl=en-US) chrome extention. Make sure you are running a server when using this tool and have the `enable` checkbox checked. You can view all of the scopes and their methods and properties using this tool. It is exceptionally useful when dealing with parent/child scope relationships.

## Passing along scope to child controllers

Let's take a look at this example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div ng-app="myApp">
    <div>
      <input type="text" ng-model="data">
      {{data}}
    </div>
    <div ng-controller="ScopeController">
      <input type="text" ng-model="data">
      {{data}}
    </div>
  </div>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
<script>
  angular.module("myApp", []).controller("ScopeController", function($scope) { });
</script>
</body>
</html>
```

If you run this code, you will see something potentially unexpected when we type in the first input. The controller inherits from its parent scope (ng-app), and since it does not exist yet, once we start typing in the first input, a value for data will be assigned! The controller doesn't have a value for data defined so it inherits the value from its parent scope. Once we type in the second text box, it creates its own local data within its own scope and we are all fine, but this is not great. What are some ways you could fix this?

A pretty simple solution would be to just not name each ng-model `data`, but what if we want it to be so that when we type in the second input box, it updates the first one and vice versa? Instead of passing scope from a parent to a child, we need some way to pass it back up from the child to the parent. How could you do that?

## Some tricky parts about scope

One way to solve our previous challenge would be to assign each ng-model to a property of the same object, but we have to make sure that our parent has access to that object so we put it in the `$rootScope`. Remember that we want to bind a child to a parent, so our parent needs to be aware of as much as the child - this one was pretty tricky!

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div ng-app="myApp">
    <div>
      <input type="text" ng-model="view.info">
      {{view.info}}
    </div>
    <div ng-controller="ScopeController">
      <input type="text" ng-model="view.info">
      {{view.info}}
    </div>
  </div>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
<script>
  angular.module("myApp", []).controller("ScopeController", function($rootScope) {
    $rootScope.view = {};
  });
</script>
</body>

</html>
```

How is it possible that this works, but when we didn't use an object - it failed? Perhaps it has something to do with the data type that we are using for our ng-model....and this brings us to one of the more tricky parts about scope. To quote the angular.js wiki on GitHub, "Scope becomes even more tricky when you try to 2 way data bind to a primitive defined on the parent scope from inside the child scope" - what does this mean? An example is worth 1000 words...

Let's take a look at the following code:

```html
<!DOCTYPE html>
<html lang="en" ng-app="broken">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div ng-controller="MainController">
    {{ message }}
    <div ng-if="number === 42">
      Secret Message: <input type="text" ng-model="message">
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

And in our `script.js` file

```js
var app = angular.module("broken", []);

app.controller('MainController', function($scope) {
  $scope.number = 42;
});
```

So what we're essentially doing here is checking to see if `$scope.number` is `42` and if it is, display an input where the user can type a secret message that will appear outside the `ng-if`. Pretty simple, but it doesn't do what we expect! Why do you think that is?

There's 2 reasons, one is that `ng-if` actually creates it's own new scope. The second part of the answer has to do with the way JavaScript works! Let's review prototypal inheritance for a quick minute and see if that helps solve our problem.

## Prototypal inheritance review

Even before we get to the good stuff, let's make sure we have a thorough understanding what a `primitive` is.

From MDN:

"All types except objects define immutable values (values, which are incapable of being changed). For example and unlike to C, Strings are immutable. We refer to values of these types as "primitive values"."

A primitive in JavaScript includes `undefined`, `null`, `boolean`, `number` or `string` and `Symbol` (new in ES2015).

MDN continued....

"When it comes to inheritance, JavaScript only has one construct: objects. Each object has an internal link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. null, by definition, has no prototype, and acts as the final link in this prototype chain."

## An Example

This example is heavily borrowed from [here](https://github.com/angular/angular.js/wiki/Understanding-Scopes) if you would like to see a more detailed view with some awesome diagrams.

I **highly** recommend running this as a separate javascript file and loading it in the browser, or making this a snippet in the sources tab.

```js
var parentScope = function(){
 this.aString = "parent string"
 this.aNumber = 100
 this.anArray = [10,20,30]
 this.anObject = {property1: "parent prop1"}
 this.aFunction = function(){return 'parent output'}
}

// let's create a new instance of the parentScope
var parent = new parentScope

var childScope = function(){}

// let's set the prototype of the childScope to be the parent instance
// we have normally not seen this, because we have inherited from another constructors prototype and the properties/methods of an instance
childScope.prototype = parent

// let's create a new instance of the childScope
var child = new childScope

child.aString === 'parent string'
child.anArray[1] === 20
child.anObject.property1 === 'parent prop1'
child.aFunction() === 'parent output'

// do not consult the prototype chain!
child.aString = 'child string'

// consult the prototype chain!
child.anArray[1] = 22
child.anObject.property1 = 'child prop1'

// do not consult the prototype chain!
child.anArray = [100, 555]
child.anObject = { name: 'Mark', country: 'USA' }

delete child.anArray
child.anArray[1] === 22  // true

```

In short, when we bind to a primitive, we do not consult the prototype chain and we break the way that JavaScript tries to find whatever data we are looking for. This unlinking of the prototype chain makes it very difficult to do our data binding correctly.

Still confused? Take a look at [this](http://stackoverflow.com/questions/14049480/what-are-the-nuances-of-scope-prototypal-prototypical-inheritance-in-angularjs) post on Stack Overflow.

### Additional Resources

[http://stackoverflow.com/questions/27881291/angularjs-scope-prototypal-inheritance-primitive-vs-objects](http://stackoverflow.com/questions/27881291/angularjs-scope-prototypal-inheritance-primitive-vs-objects)

[http://jsbin.com/xexurukiso/1/edit/?html,css,js,console,output](http://jsbin.com/xexurukiso/1/edit/?html,css,js,console,output)

[http://www.smashingmagazine.com/2015/01/angularjs-internals-in-depth/](http://www.smashingmagazine.com/2015/01/angularjs-internals-in-depth/)

## So how do we fix this?

From the creator of Angular, Misko Hevery:

<blockquote>
"If you use ng-model there has to be a dot somewhere. If you don't have a dot, you're doing it wrong"
</blockquote>

Simply put - ALWAYS HAVE A DOT. This means that no more primitives will be assigned to $scope! That's true for ng-model, but also for ALL inherited scopes!

Here is a solution to our previous issue with the secret message and the number 42:

```html
<!DOCTYPE html>
<html lang="en" ng-app="broken">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <div ng-controller="MainController">
    {{view.message}}
    <div ng-if="view.number === 42">
      Secret Message: <input type="text" ng-model="view.message">
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

```js
var app = angular.module("broken",[])

app.controller('MainController', function($scope) {
  $scope.view = {} // this is commonly also called vm for ViewModel, we will see more about this later in the curriculum
  $scope.view.number = 42
});
```

Now that we have an understanding of how to fix this issue - here are a few other built-in directives to be aware of, as they also create their own scope.

- ng-controller
- ng-repeat
- ng-if (actually destroys the scope every time it is false and creates a new one every time it is true - be careful with this one!)
- ng-view
- ng-switch
- ng-include

Still not understanding this concept? No worries, check out  [this](http://blog.carbonfive.com/2014/02/11/angularjs-scopes-an-introduction/) excellent tutorial on scopes and [this](https://egghead.io/lessons/angularjs-the-dot) video from egghead

If you want to read a bit more in depth, [this](https://github.com/angular/angular.js/wiki/Understanding-Scopes) article is an incredibly in depth walkthrough of how scope works

## Exercises

### Answer the following questions

- What is $rootScope?
- Explain how $scope is passed from a parent to child controller
- List five built in directives that create their own scope
- "Scope becomes tricky when you try to 2 way data bind to a primitive defined on the parent scope from inside the child scope" - what does this mean?

### Complete the following

- Create an example of some buggy angular code where you try to two way data bind a primitive defined on the parent scope from inside the child scope
- Fix your example above, how did you fix it? What did you have to do to make it work?


## Resources:

- [Controllers Docs](https://docs.angularjs.org/guide/controller)
- [MVC and MVVM with AngularJS](https://web.archive.org/web/20160229124959/http://codechutney.in/blog/javascript/mvc-and-mvvm-with-angularjs/)
