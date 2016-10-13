## Objectives

* Explain what dependency injection is.
* Explain how Angular handles dependency injection.
* Use built-in Angular services.
* Make AJAX requests using `$http`.

## What is Dependency Injection?

From [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection):

"In software engineering, dependency injection is a software design pattern that implements inversion of control for resolving dependencies. Dependency injection means giving an object its instance variables. Really. That's it."

### A bit more about DI

In order to understand more about dependency injection, we have to first understand where the need for this pattern came from. The need for this pattern came when applications started to become more "modular".

As a quick refresher - when writing modular code, we break apart our application into smaller pieces (that are not always related to each other) so that we can write more testable and maintainable code. You can read more about modular programming [here](https://en.wikipedia.org/wiki/Modular_programming).

### Now we're getting somewhere!

Now that we are building an understanding of what modular code is - we are also beginning to understand that in order for us to write modular code, we need our small containers (modules) to be dependent upon other modules! This means that when we are modular, we are also dependent!

So how can we share dependencies amongst our modules and still write clean code?

From the angular docs:

There are only three ways a component (object or function) can get a hold of its dependencies:

1. The component can create the dependency, typically using the `new` operator.
2. The component can look up the dependency, by referring to a global variable.
3. The component can have the dependency passed to it where it is needed.

The first two options of creating or looking up dependencies are not optimal because they hard code the dependency to the component. This makes it difficult, if not impossible, to modify the dependencies. This is especially problematic in tests.

The third option is the most viable, since it removes the responsibility of locating the dependency from the component. The dependency is simply handed to the component.

In angular, we take our dependencies (which we call services - we will learn more about these in another lesson) and inject them into a dependent object (controller/directive/filter). This separates the creation of the dependency from its behavior and enables the client to abide by the single responsibility principle.

We are not going to go into how angular implements dependency injection under the hood, but if you would like to learn more about how this works, check out these articles:

[https://docs.angularjs.org/guide/di](https://docs.angularjs.org/guide/di)

[https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection](https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection)


### Different ways to define dependencies

Angular supports 3 ways to annotate our code (define dependencies):

1. Implicit annotation

__The implicit annotation dependency injection will break when you minify your code.__ This happens because minification tools rename variables to a something smaller, but the minification tool doesn't know that the variable name in the function is meaningful to angular.

```js
app.controller('SampleController', function($scope, $rootScope){
  $scope.view.val = "some value from $scope";
  $rootScope.rootView.val = "some value from $rootScope";
});
```

2. Inline array annotation

You might be familiar with this style of Angular dependency injection.

```js
app.controller('SampleController', ['$scope', '$rootScope', SampleController]);

function SampleController($scope, $rootScope) {
  $scope.view.val = "some value from $scope";
  $rootScope.rootView.val = "some value from $rootScope";
});
```

3. $inject property annotation

In more recent style guides however, it is recommended that the `$inject` property be used.

```js
app.controller('SampleController', SampleController);

SampleController.$inject = ['$scope', '$rootScope'];

function SampleController($scope, $rootScope) {
  $scope.val = "some value from $scope";
  $rootScope.val = "some value from $rootScope";
});
```

### Exercise

In your own words, write down what is dependency injection? How does angular implement dependency injection? we'll discuss as a class what you wrote.

## HTTP Service

Angular services are simply objects that contain some code that can be shared across your app.  Like most things we've discussed, Angular comes with some useful built-in services, and we can also write our own custom services too.  

You can see a list of the built-in Angular services [here](https://docs.angularjs.org/api/ng/service). Some of the most important ones are:

* $http
* $location
* $q
* $animate
* $routeParams

According to the docs:

> The `$http` service facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.

It's **Angular's wrapper for AJAX calls.**  It's the easiest way of communicating with a server from an Angular app. Let's try it out!

**In order to use the `$http` service in a controller, we need to first add it as a dependency**. In your Todo App from the Angular controllers exercise, refactor `PeopleCtrl` to look like this:

`controllers.js`

```js
(function() {
  'use strict';

  angular
    .module('todoApp')
    .controller('PeopleCtrl', PeopleCtrl)
    .controller('TodoListCtrl', TodoListCtrl);

    PeopleCtrl.$inject = ['$http'];
    TodoListCtrl.$inject = ['$http'];

    function PeopleCtrl($http) {
      this.nameToAdd = '';
      this.people = [];

      this.addPerson = () => {

      };
    }

    function TodoListCtrl($http) {
      this.todoToAdd = '';

      this.addTodo = (person) => {

      };
    }
}());
```

Now we can access all of the methods defined on the `$http` service. They are:

* $http.get
* $http.head
* $http.post
* $http.put
* $http.delete
* $http.jsonp
* $http.patch

Since we're going to be working with asynchronous requests, we'll also want to pull in Angular's promise service, `$q`. On your own, update the above code to also inject in the `$q` service in `PeopleCtrl`.

We're going to start by adding the ability to add people on your very own Galvanize Todo App server!

### Exercise

To make an incredibly simple server, we're going to use the [json-server](https://github.com/typicode/json-server) package. It's pretty amazing!

Scan through the documentation and then install json-server globall:

```bash
npm install -g json-server
```

Then, run the following to create a `db.json` file.

```shell
touch db.json && \
echo "{\"persons\": [], \"todos\": []}" >> db.json && \
json-server --watch db.json
```

Test out the path to your server using `httpie` to make sure it's up and running correctly. You should get an empty array as a response.

```shell
http GET http://localhost:3000/persons
```

At the top of your `controllers.js` file, add the following:

```js
const server = 'http://localhost:3000';
```

We'll start by creating an `activate` function to initiate the requests that will help populate the list of people and their individual tasks when the `PeopleCtrl` is loaded.

Below the variable declarations, place the following code:

```js
const activate = () => {
  return $http.get(server)
    .then((people) => {
      this.people = people.data;

      // Make requests for individual todos
    })
    .catch((err) => {
      throw err;
    });
};

activate();
```

Now that we have access to the list of people on our server, let's add the code to make requests for each person's todos. Below the assignment you just made to `this.people`:

```js
let promises = this.people.map((person) => {
  $http.get(`${server}/persons/${person.id}/todos`)
    .then((todos) => person.todos = todos.data)
});

return $q.all(promises)
```

Now, inside the `addPerson` function in `PeopleCtrl`, use `$http.post()` to allow your UI to successfully add a person.

```js
this.addPerson = () => {
  return $http.post(`${server}/persons`, { name: this.nameToAdd })
    .then((res) => {
      res.data.todos = [];
      this.people.push(res.data);
      this.nameToAdd = '';
    })
    .catch((err) => {
      throw err;
    });
};
```

Congratulations! You successfully wired up your `PeopleCtrl` using the built-in `$http` service! Now, let's continue wiring up the rest of the functionality of `TodoListCtrl`.

Inside the `addTodo` function, use `http.post()` to allow the ability to post todos for an individual user:

```js
this.addTodo = (person) => {
  return $http.post(`${server}/persons/${person.id}/todos`, {
    completed: false,
    text: this.todoToAdd
  })
  .then((res) => {
    person.todos.push(res.data);
    this.todoToAdd = '';
  })
  .catch((err) => {
    throw err;
  });
};
```

After successfully wiring up the `TodoListCtrl`, you now have a working app that makes external AJAX calls. The last step is to slightly alter the view syntax to dynamically update accordingly.

In the `<main>` element on your `index.html` page, update to the following code:

```html
<main>
  <div ng-controller="PeopleCtrl as peopleCtrl">
    <div ng-repeat="person in peopleCtrl.people">
      <h2>{{person.name}}</h2>
      <ul ng-controller="TodoListCtrl as todoCtrl">
        <li ng-repeat="todo in person.todos">
          <input type="checkbox" ng-model="todo.completed"> <span ng-class="{ completed: todo.completed }">{{todo.text}}</span>
        </li>
        <li><input type="text" ng-model="todoCtrl.todoToAdd"><a href="" ng-click="todoCtrl.addTodo(person)">add</a></li>
      </ul>
    </div>
    <div>
      <input type="text" ng-model="peopleCtrl.nameToAdd"><a href="" ng-click="peopleCtrl.addPerson()">add person</a>
    </div>
  </div>
</main>
```

Read through the above code and make sure you can answer the following questions:

1. How does the above code know how to associate the todo item with the correct person?

1. The `activate()` function should be declared inside of a function. Why?

1. Instead of using `json-server`, imagine we set up an Express application to handle the routing. What method on the `res` object should you use to respond to your requests?

Finally, if you mark a todo as completed and refresh the page, you'll notice it hasn't saved! Solve this problem so that the todo item's status is saved.

### Additional Reading/Watching

[A great video on DI as a concept ](https://www.youtube.com/watch?v=IKD2-MAkXyQ)

[A great video on DI in Angular ](https://www.youtube.com/watch?v=7VFUQCKYRbg)

[http://stackoverflow.com/questions/130794/what-is-dependency-injection](http://stackoverflow.com/questions/130794/what-is-dependency-injection)

[Angular Docs on DI](https://docs.angularjs.org/guide/di)
