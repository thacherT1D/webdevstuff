## Objectives

* Explain what an Angular service is.
* Explain why an Angular service is important.
* Explain the different ways to implement a service, specifically:
  * a factory service
  * a service service
* Implement an Angular service.
* Inject a custom Angular service into an Angular controller.

## What is an Angular service?

In addition to filters, and controllers, Angular provides a feature called **services**. As we start building larger applications with multiple controllers, not only is our code per controller becoming larger, but we are starting to face with a new problem. How do we share data, properties and methods between controllers?

Angular services are features that serve the purpose of abstracting data logic away from your controllers and even other services. Services provide a place to store information that can be accessed by different controllers and directives. You may find services helpful in doing the following:

* Making a request to your server for data or hitting a public API.
* A collection of methods or logic that is used in multiple controllers. This allows you to follow the philosophy of Don't Repeat Yourself (DRY).

Any data stored in a controller is lost when you change to another controller.
Services on the other hand will persist data between controllers. This is because while many instances of the same controller type may exist, there will always be at most one instance of a service that is shared. This programming design is called a _singleton_ where we ensure that only one instance is created.

## Why is an Angular service important?

When building controllers, it's important to restrict the scope of the controller to a specific area of a webpage. For example, you may tie the catalog page for a shopping site to a specific controller while you may create a controller to manage the cart. In terms of separating concerns, this makes sense splitting the two responsibilities. However, these controllers are interlinked some how. A user may click a button to add an item to the cart in the catalog which, in this case, requires knowledge of the cart.

A service provides information to share between the two (or more) controllers. In this case, the catalog controller is interacting with a service designed to manager the items in the cart. The cart controller is then grabbing information from that service to help display information.

In other words, the service allows the ability for two controllers to _communicate_ with each other.

## What are the different ways to implement a service?

In Angular, there three different ways to implement a service, they are:

* A factory
* A service
* A provider

The important types we will cover are **factories** and **services**. It's a bit tricky since all these options fall under the umbrella, services, but for the most part these serve very similar purposes with different representations.

### *Service* Service

Using the service API, you create a class that represents the service. Behind the scenes, Angular calls `new` on your class to create an instance. This instance is set as the *singleton instance* that will be injected into our controllers.

Here is an example service using the class syntax.

```js
// person.service.js
class PersonService {
  constructor() {
    this.name = "Matt";
    this.job = "Instructor";
    this.sayHi = function() {
      return "Hello!"
    };
  }
}

export default PersonService;
```

The service will then need to be imported into our app module.

```js
// In app.js
import angular from 'angular';
import PersonService from './path/to/person.service';

angular.module("learnServices", [])
  .service('personService', PersonService);  // Note the capitalization
```

### *Factory* Service

An alternate way of writing a service is writing a **factory**. Using the factory, you pass in the name of your service and a callback function that returns an object.

```js
// person.factory.js
const personFactory = function() {
  return {
    name: "Matt",
    job: "Instructor",
    sayHi: function(){
      return "Hello!"
    }
  }
};

export default personFactory;
```

Each factory needs to be registered in the Angular module.

```js
// In app.js
import angular from 'angular';
import personFactory from './path/to/person.factory';

angular.module("learnServices", [])
  .factory('personFactory', personFactory);
```

## So which one??

In the past, factories were very popular, but nowadays, many ES6 style guides recommend creating services with the class system. Be aware of both of these and the differences between them and choose what feels better for you. Our examples will emphasize services.

### Exercise

Write down in your own words what is the difference between a factory service and a service service. After a minute, your instructor will cold call on a few students for the answer.

**NOTE:** A provider is the most complex method and is used less frequently. It is a factory that can be configured before the application starts, which allows for more flexibility, but for the applications we are going to build, you will not need this level of complexity.

## How do you implement an Angular service?

We are going to continue with our example from yesterday with our todo list. Let's suppose we want to keep a counter at the top of the page that manages the number of people in out todo list system. This part of our webpage is separate from our people list and todo list, so we will need to create a new controller for this piece of our webpage. We now have _two_ controllers that rely on the same information, people. In this case it's time to create the people service.

Create a file for the service in the `people` directory.

```shell
touch app/people/people.service.js
```

Inside the service, type the following code:

```js
class PeopleService {
  constructor() {
    this.people = [];
  }

  addPerson(personName) {
    this.people.push({ name: personName });
  }
}

export default PeopleService;
```

At first glance, it seems very similar to the People Controller we built yesterday. Now that the people information is stored in the people service, the People Controller needs to be changed. Let's import this service into our `app.js`.

```js
import angular from 'angular'

import PeopleCtrl from './people/people.controller';
import PeopleService from './people/people.service';

import TodoListCtrl from './todos/todolist.controller';

angular.module('todoApp', [])
  .service('PeopleService', PeopleService)
  .controller('PeopleCtrl', PeopleCtrl)
  .controller('TodoListCtrl', TodoListCtrl);
```

We have now given the service a name in the Angular module. Let's modify the People Controller to use this service. In `app/people/people.controller.js`

```js
class PeopleCtrl {
  constructor(peopleSvc) {
    this.peopleSvc = peopleSvc;
    this.nameToAdd = '';
  }

  addPerson(personName) {
    this.peopleSvc.addPerson(personName);
    this.nameToAdd = '';
  }

  people() {
    return this.peopleSvc.people;
  }
}

PeopleCtrl.$inject = ['PeopleService'];

export default PeopleCtrl;
```

Notice a few things:

* The constructor takes in an argument. This is the singleton that the service provides. We save that service in the instance with `this.peopleSvc = peopleSvc;`
* We used the service's `addPerson` method in the controller's `addPerson` method.
* We get access to the people with a `people()` method, which returns the people stored in the service.
* Lastly, we **inject** the PeopleService into the controller with `PeopleCtrl.$inject = ['PeopleService'];` This is how we can include the service into the constructor at the top. Note that the array contains a string with the name of the service. This is the same name as defined in the `app.js` file. This process is called **dependency injection**.

The one last thing is we want to update our HTML to reflect our need to grab the people via a method versus a variable.

In `index.html`, update the following:

```html
<div ng-repeat="person in peopleCtrl.people">
```

to

```html
<div ng-repeat="person in peopleCtrl.people()">
```

Let's build our counter for the header. Create a new folder to represent the header of the page for these counters and initialize the controllers for the people counter.

```shell
mkdir app/header
touch app/header/people_count.controller.js
```

Inside the file, type in the following:

```js
class PeopleCountCtrl {
  constructor(peopleSvc) {
    this.peopleSvc = peopleSvc;
  }

  peopleCount() {
    return this.peopleSvc.people.length;
  }
}

PeopleCountCtrl.$inject = ['PeopleService'];

export default PeopleCountCtrl;
```

Notice how we inject the PeopleService in here as well and use it to construct a method `peopleCount()`.

Let's add this controller into our `app.js`.

```js
import angular from 'angular'

import PeopleCountCtrl from './header/people_count.controller';

import PeopleCtrl from './people/people.controller';
import PeopleService from './people/people.service';

import TodoListCtrl from './todos/todolist.controller';

angular.module('todoApp', [])
  .service('PeopleService', PeopleService)
  .controller('PeopleCtrl', PeopleCtrl)
  .controller('TodoListCtrl', TodoListCtrl)
  .controller('PeopleCountCtrl', PeopleCountCtrl);
```

We can now incorporate our Counter into our webpage.

```html
<header>
  <h1>My ToDo List</h1>
  <h3 ng-controller="PeopleCountCtrl as peopleCountCtrl">Number of people in system: {{ peopleCountCtrl.peopleCount() }}</h3>
</header>
```

### Tracking the Total Amount of Todos

Let's implement another service to keep track of all todos. This service is implemented differently from our people service because each Todos Controller manages the todos for a specific person whereas the service keeps track of _all_ todos.

Let's start by building the service.

```shell
touch todos/todos.service.js
```

In the file, type in the following:

```js
class TodosService {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  notCompletedTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }
}

export default TodosService;
```

We need to let Angular know of our service now.

```js
import angular from 'angular'

import PeopleCountCtrl from './header/people_count.controller';

import PeopleCtrl from './people/people.controller';
import PeopleService from './people/people.service';

import TodoListCtrl from './todos/todolist.controller';
import TodosService from './todos/todos.service';

angular.module('todoApp', [])
  .service('TodosService', TodosService)
  .service('PeopleService', PeopleService)
  .controller('PeopleCtrl', PeopleCtrl)
  .controller('TodoListCtrl', TodoListCtrl)
  .controller('PeopleCountCtrl', PeopleCountCtrl);
```

With this service, we will inject it into our TodosController:

```js
class TodoListCtrl {
  constructor(todosSvc) {
    this.todosSvc = todosSvc;
    this.todoToAdd = '';
    this.todos = [];
  }

  addTodo(todoText) {
    const todo = {
      completed: false,
      text: todoText
    };

    this.todos.push(todo);
    this.todosSvc.addTodo(todo);
    this.todoToAdd = '';
  }
}

TodoListCtrl.$inject = ['TodosService'];

export default TodoListCtrl;
```

In this case, we still track the todos in the `TodoListCtrl`, but we also add the todo in the service as well. This helps the service track all of the todos for use in a counter.

Let's now create our counter.

```shell
touch app/header/todos_count.controller.js
```

In the JS file:

```js
class TodosCountCtrl {
  constructor(todosSvc) {
    this.todosSvc = todosSvc;
  }

  notCompletedCount() {
    return this.todosSvc.notCompletedTodos().length
  }
}

TodosCountCtrl.$inject = ['TodosService'];

export default TodosCountCtrl;
```

Add it into our `app.js`.

```js
import angular from 'angular'

import TodosCountCtrl from './header/todos_count.controller';
import PeopleCountCtrl from './header/people_count.controller';

import PeopleCtrl from './people/people.controller';
import PeopleService from './people/people.service';

import TodoListCtrl from './todos/todolist.controller';
import TodosService from './todos/todos.service';

angular.module('todoApp', [])
  .service('TodosService', TodosService)
  .service('PeopleService', PeopleService)
  .controller('PeopleCtrl', PeopleCtrl)
  .controller('TodoListCtrl', TodoListCtrl)
  .controller('TodosCountCtrl', TodosCountCtrl)
  .controller('PeopleCountCtrl', PeopleCountCtrl);
```

Lastly, let's incorporate it into our header.

```html
<header>
  <h1>My ToDo List</h1>
  <h2 ng-controller="TodosCountCtrl as todosCountCtrl">Todos Left: {{ todosCountCtrl.notCompletedCount() }}</h2>
  <h3 ng-controller="PeopleCountCtrl as peopleCountCtrl">Number of people in system: {{ peopleCountCtrl.peopleCount() }}</h3>
</header>
```

### Resources

[Singleton Design Pattern](http://robdodson.me/javascript-design-patterns-singleton/)

[Singleton Wiki](https://en.wikipedia.org/wiki/Singleton_pattern)

[Putting Angular Code in the Right Place](http://datamelon.io/blog/2016/putting-angular-code-in-the-right-place.html)

More about the differences between factories and services:

[ng-newsletter: The short guide to service definitions](http://www.ng-newsletter.com/25-days-of-angular/day-1)

[Service VS Factory - ONCE AND FOR ALL](http://blog.thoughtram.io/angular/2015/07/07/service-vs-factory-once-and-for-all.html)

[AngularJS: Factory vs Service vs Provider](http://tylermcginnis.com/angularjs-factory-vs-service-vs-provider/)

[AngularJS Providers Explained](https://gist.github.com/demisx/9605099)
