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

Write down in your own words what a controller is and why they are important. Turn and talk to your neighbor and discuss what you wrote. Think of other example interactions in the format of a Model, View, and Controller.

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
    <script src="app.js"></script>
  </body>
</html>
```

Include the css template called `style.css`. Test that your application is running properly.

```sh
touch style.css
```

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
  <script src="app.js"></script>
</body>
```

Let's now move the code to a controller. Create a `controllers.js` file and modify the html as follows.

```sh
$ touch controllers.js
```

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

## Adding more controllers

An application can have multiple models, views, and controllers. Each controller can manage information of a particular facet of an application. It can even manage multiple controllers. In our todo list application, we are going to amp up our list to include multiple todo lists for multiple people.

In our `controllers.js`, add the following:

```javascript
app.controller('PeopleController', function() {
  this.nameToAdd = '';
  this.people = [];

  this.addPerson = function() {
    this.people.push({ name: this.nameToAdd });
    this.nameToAdd = '';
  };
});
```

Modify our HTML to add people:

```html
<main>
  <div ng-controller="PeopleController as peopleCtrl">
    <div ng-repeat="person in peopleCtrl.people">
      <h2>{{person.name}}</h2>
      <ul ng-controller="TodoListController as todoListCtrl">
        <li ng-repeat="todo in todoListCtrl.todos">
          <input type="checkbox" ng-model="todo.completed"> <span ng-class="{ completed: todo.completed }">{{todo.text}}</span>
        </li>
        <li><input type="text" ng-model="todoListCtrl.todoToAdd"><a href="" ng-click="todoListCtrl.addTodo()">add</a></li>
      </ul>
    </div>
    <div>
      <input type="text" ng-model="peopleCtrl.nameToAdd"><a href="" ng-click="peopleCtrl.addPerson()">add person</a>
    </div>
  </div>
</main>
```

## The `$scope` variable

You may have seen Angular tutorials that use a controller with the `$scope` keyword. Here's an example:

```javascript
const app = angular.module('app', []);

app.controller('MainCtrl', function ($scope) {
  $scope.message = 'Hello';
});
```

Our HTML would similar as before with some key differences.

```html
<div ng-app="app">
  <h1>Controllers</h1>
  <div ng-controller="MainCtrl">
    <p>{{ message }}</p>
  </div>
</div>
```

There are two key differences in the HTML:

1. We do not instantiate a controller using `CONTROLLER as INSTANCE` syntax. We are referencing the controller directly.
1. Because there is no instance of the controller, we cannot reference that instance, so we just reference the variable defined in `$scope`.

`$scope` is an object used for data binding that we can define methods and properties on. It is automatically injected into our controllers so that we can use it. Although it sounds complex, `$scope` is just a JavaScript object. Both the controller and the view have access to `$scope` so it can be used for communication between the two. When a controller is attached to the DOM via the `ng-controller` directive, Angular will instantiate a new controller object.

Angular automatically gives a controller a brand new `$scope`. The `$scope` object is a JavaScript object that glues together controllers and views. Properties that are on the `$scope` object are available to both the view and the controller. **All properties added to the `$scope` are automatically available in our view.**

### `$rootScope`

Every application has a single root scope. All other scopes descend from `$rootScope` which we can inject into our controllers (by adding `$rootScope as a parameter to the callback function on the .controller method`)

```js
angular.module("firstApp",[]).controller("FirstController", function($scope, $rootScope){
  // now we can add things to $rootScope!
})
```

## Why should we not use `$scope`?

Angular creates a scope for each controller/directive. Each child HTML element of a controller or directive will inherit the `$scope`. This means we can use a parent's value if we have not defined it in the child `$scope`.

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
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
  <script>
    angular.module("myApp", []).controller("ScopeController", function($scope) { });
  </script>
  </body>
</html>
```

Since `data` was specified in before the controller and the `ScopeController` had not initialized that value anywhere, the second `{{ data }}` field is updated. It is not until the second text box gets added, `data` gets initialized and therefore overrides the parent HTML.


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
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
    <script>
    const app = angular.module("broken", []);

    app.controller('MainController', function($scope) {
      $scope.number = 42;
    });
    </script>
  </body>
</html>
```

So what we're essentially doing here is checking to see if `$scope.number` is `42` and if it is, display an input where the user can type a secret message that will appear outside the `ng-if`. Pretty simple, but it doesn't do what we expect!

It turns out `ng-if` actually creates it's own new scope and does not inherit any of the properties. Here are a few other built-in directives to be aware of, as they also create their own scope.

- ng-controller
- ng-repeat
- ng-if (actually destroys the scope every time it is false and creates a new one every time it is true - be careful with this one!)
- ng-view
- ng-switch
- ng-include

### How do we fix it?

Instantiate controllers using the `CONTROLLER as INSTANCE` to not rely on `$scope`'s quirky properties.

### A very useful tool - AngularJS Batarang

For a more in depth analysis of scopes, install the  
[AngularJS batarang](https://chrome.google.com/webstore/detail/angularjs-batarang-stable/niopocochgahfkiccpjmmpchncjoapek/related?hl=en-US) chrome extention. Make sure you are running a server when using this tool and have the `enable` checkbox checked. You can view all of the scopes and their methods and properties using this tool. It is exceptionally useful when dealing with parent/child scope relationships.

## Resources:

- [Controllers Docs](https://docs.angularjs.org/guide/controller)
- [MVC and MVVM with AngularJS](https://web.archive.org/web/20160229124959/http://codechutney.in/blog/javascript/mvc-and-mvvm-with-angularjs/)
