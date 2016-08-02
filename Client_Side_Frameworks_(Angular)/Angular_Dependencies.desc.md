## Objectives

* Explain what dependency injection is.
* Explain how Angular handles dependency injection.
* Use built-in Angular services.
* Make AJAX requests using `$http`.
* Explain what client-side routing is.
* Use `ngRoute` for client-side routing in a single page application.

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

In angular, we take our dependencies (which we call services - we will learn more about these in another unit) and inject them into a dependent object (controller/directive/filter). This separates the creation of the dependency from its behavior and enables the client to abide by the single responsibility principle.

We are not going to go into how angular implements dependency injection under the hood, but if you would like to learn more about how this works, check out these articles:

[https://docs.angularjs.org/guide/di](https://docs.angularjs.org/guide/di)

[https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection](https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection)


### Different ways to define dependencies

Angular supports 3 ways to annotate our code (define dependencies):

1.  Implicit annotation

__The implicit annotation dependency injection will break when you minify your code.__  This happens because minification tools rename variables to a something smaller, but the minification tool doesn't know that the variable name in the function is meaningful to angular.

```js
app.controller('SampleController', function($scope, $rootScope){
  $scope.view.val = "some value from $scope";
  $rootScope.rootView.val = "some value from $rootScope";
});
```

2.  Inline array annotation

You might be familiar with this style of Angular dependency injection.

```js
app.controller('SampleController', ['$scope', '$rootScope', SampleController]);

function SampleController($scope, $rootScope) {
  $scope.view.val = "some value from $scope";
  $rootScope.rootView.val = "some value from $rootScope";
});
```

3.  $inject property annotation

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

We're going to start by adding the ability to add people on your very own Galvanize Todo App server!

At the top of your `controllers.js` file, add the following:

```js
const server = 'https://galvanize-todos.herokuapp.com/[YOUR_INITIALS]-persons';
```

Test out the path to your server using `httpie` to make sure it's up and running correctly. You should get an empty array as a response. Try adding your name with a `POST` to create the first user on the server.

```shell
http GET https://galvanize-todos.herokuapp.com/[YOUR_INITIALS]-persons

http POST https://galvanize-todos.herokuapp.com/[YOUR_INITIALS]-persons name=[YOUR_NAME]
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

Now that we have access to the list of people on our server, let's add the code to make requests for each person's todos. Below the assignment you just made to `vm.people`:

```js
this.people.forEach((person) => {
  $http.get(`${server}/${person.id}/is-todos`)
    .then((todos) => {
      person.todos = todos.data;
    })
    .catch((err) => {
      throw err;
    });
});
```

Now, inside the `addPerson` function in `PeopleCtrl`, use `$http.post()` to allow your UI to successfully add a person.

```js
this.addPerson = () => {
  return $http.post(server, { name: this.nameToAdd })
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
  return $http.post(`${server}/${person.id}/is-todos`, {
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

After successfully wiring up the `TodoListCtrl`, you now have a working app that makes external AJAX calls. The last step is to slighty alter the view syntax to dynamically update accordingly.

In the `<main>` element on your `index.html` page, update to the following code:

```html
<main>
  <div ng-controller="PeopleCtrl as peopleList">
    <div ng-repeat="person in peopleList.people">
      <h2>{{person.name}}</h2>
      <ul ng-controller="TodoListCtrl as todoList">
        <li ng-repeat="todo in person.todos">
          <input type="checkbox" ng-model="todo.completed"> <span ng-class="{ completed: todo.completed }">{{todo.text}}</span>
        </li>
        <li><input type="text" ng-model="todoList.todoToAdd"><a href="" ng-click="todoList.addTodo(person)">add</a></li>
      </ul>
    </div>
    <div>
      <input type="text" ng-model="peopleList.nameToAdd"><a href="" ng-click="peopleList.addPerson()">add person</a>
    </div>
  </div>
</main>
```

## What is client-side routing?

Client side routing is the same as server side routing, but in the browser. In a typical web application you have several pages which map to different URLs, and each of the pages has some logic and a template which is then rendered.

Client-side routing simply runs this process in the browser, using JavaScript for the logic and some JS based template engine or other such approaches to render the pages.

Typically it's used in single page applications, where the server-side code is primarily used to provide a RESTful API the client can connect to via AJAX.

### Exercise

Compare and contrast client-side routing with server-side routing with a neighbor at your table. We'll discuss as a class some of the similarities and differences you talked about.

## How to use `ng-Route` for client-side routing

One of Angular's most important features is its handling of routing and browser history navigation.

Most single page apps (SPAs) actually consist of multiple "pages" or "screens". For example, we might have views for a landing page, login page, and signup page. Let's take our reddit clone example.  What if we wanted to add a "show page" for an individual post?  When a user clicks on a particular post, they see a view with details about the post.

A good example of this is gmail. gmail has different views for your inbox, viewing a specific email, composing a message, viewing starred emails, viewing spam etc. The app is still a single page app, you just don't see everything at once.

### EXERCISE

Open up your gmail (or similar email provider) account. Try clicking around and accessing the different features. Pay special attention to the url bar. What do you notice?

Typical issues with complex single page apps are:

* SPAs don't support browser history navigation. The back and forwards buttons don't work.
* You can't bookmark parts of a SPA
* If all of our code is in a single template, things can get incredibly messy

Angular provides solutions for all of the above issues through its router.  We can break down a view into multiple smaller views that are rendered inside of a layout depending on the URL the user is currently accessing.

We'll see how to use the `$routeProvider` to make use of the browser’s history navigation and allow users to bookmark and share specific pages based off of the current URL.  Let's get started.

**First we need to include the `ngRoute` module.** It's a separate module that we need to include on our own. You can download the module or link to this CDN: "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.js"

Next, we need to load the `ngRoute` module by adding it as a dependent module in `app.js`.

```js
(function() {
  'use strict';

  angular.module('todoApp', ['ngRoute']);
}());
```

Our `index.html` will act as our layout file.  Just like in Express, we'll add all the common markup (navbar, footer, etc.) to our layout file, and then we'll render specific views in a particular place in our layout.  To tell Angular where it should render those views, we'll use the `ng-view` directive. Alter the code in `index.html` to the following:

```html
<main ng-view></main>
 ```

 According to the docs:

 > The ng-view directive is a special directive that’s included with the ngRoute module. Its specific responsibility is to stand as a placeholder for $route view content. It creates its own scope and nests the template inside of it.

Next, let's declare some routes. To add a routes, we'll add the following code to a new file called `app.config.js`:

```shell
touch app.config.js
```

```js
(function() {
  'use strict';

  angular
    .module('todoApp')
    .config(config);

    function config($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'home.html',
          controller: 'PeopleCtrl',
          controllerAs: 'peopleList'
        });
    }
}());
```

The config file allows you to define different client-side routes that will place the content from whatever is in the `templateUrl` file into the `ng-view` directive. You can also specify the controller for the content with `controllerAs` notation.

Let's add another route that displays an individual person's list of todos rather than everyone on your server.

Add the following in `app.config.js`:

```js
function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'PeopleCtrl',
      controllerAs: 'peopleList'
    })
    .when('/person/:id', {
      templateUrl: 'person.html',
      controller: 'PersonCtrl',
      controllerAs: 'personList'
    });
}
```

Now, create a new template view called `person.html`:

```shell
touch person.html
```

You'll also need to create a new `PersonCtrl` in your `controllers.js` file. Inject another built-in Angular service that gives you access to route parameters, similar to `req.params` from Express:

```js
angular
  .module('todoApp')
  .controller('PeopleCtrl', PeopleCtrl)
  .controller('TodoListCtrl', TodoListCtrl)
  .controller('PersonCtrl', PersonCtrl);

  PeopleCtrl.$inject = ['$http'];
  TodoListCtrl.$inject = ['$http'];
  PersonCtrl.$inject = ['$http', '$routeParams'];
```

In the new `PersonCtrl`, refactor the `activate` function to make the correct call to your server for just the individual id that matches the `$routeParams.id`:

```js
function PersonCtrl($http, $routeParams) {
  this.person = {};

  const { id } = $routeParams;

  const activate = () => {
    return $http.get(`${server}/${id}`)
      .then((person) => {
        this.person = person.data;

        return $http.get(`${server}/${id}/is-todos`);
      })
      .then((todos) => {
        this.person.todos = todos.data;
      })
      .catch((err) => {
        throw err;
      });
  };

  activate();
}
```

In the newly created template file, copy the content from `home.html` but change  to the following:

```html
<div>
  <h2>{{personList.person.name}}</h2>
  <ul ng-controller="TodoListCtrl as todoList">
    <li ng-repeat="todo in personList.person.todos">
      <input type="checkbox" ng-model="todo.completed"> <span ng-class="{ completed: todo.completed }">{{todo.text}}</span>
    </li>
    <li><input type="text" ng-model="todoList.todoToAdd"><a href="" ng-click="todoList.addTodo(personList.person)">add</a></li>
  </ul>
</div>
```

Now that the template to render content for an individual person is wired up, the final step is to change the `ng-href` directives in the `home.html` template so they properly link to the individual person views.

Alter the `<h2>` element so that it properly links:

```html
<h2><a ng-href="#/person/{{person.id}}">{{person.name}}</a></h2>
```

### Additional Topics to Explore

- Why does Angular put a `#` in the route path?

- Figure out how to set a "catchall" route that will render the `home.html` template if the user visits any other route

- Configure Angular so that routes do not contain `#`'s. Research!

### Additional Reading/Watching

[A great video on DI as a concept ](https://www.youtube.com/watch?v=IKD2-MAkXyQ)

[A great video on DI in Angular ](https://www.youtube.com/watch?v=7VFUQCKYRbg)

[http://stackoverflow.com/questions/130794/what-is-dependency-injection](http://stackoverflow.com/questions/130794/what-is-dependency-injection)

[Angular Docs on DI](https://docs.angularjs.org/guide/di)
