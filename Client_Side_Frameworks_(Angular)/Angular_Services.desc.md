## Objectives

* Explain what an Angular service is.
* Explain why an Angular service is important.
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

## How do you implement an Angular service?

In Angular, there three different ways to implement a service, they are:

* A factory
* A service
* A provider

The important types we will cover are **factories** and **services**. It's a bit tricky since all these options fall under the umbrella, services, but for the most part these serve very similar purposes with different representations.

### *Factory* Service

Using the factory, you pass in the name of your service and a callback function that returns an object.

Behind the scenes, Angular calls the function and sets the returned object as the *singleton instance* that will be injected into our controllers.

```js
angular
  .module("learnServices", [])
  .factory('personFactory', function(){
    return {
      name: "Matt",
      job: "Instructor",
      sayHi: function(){
        return "Hello!"
      }
    }
  }).controller('personController', function(personFactory){
    // I now have access to all the methods/properties returned from the personFactory!
  })
```

### *Service* Service

Using the service API, you create a constructor function using the `this` syntax to attach properties/methods to the constructor.

Behind the scenes, Angular calls `new` on your function to create an instance. This instance is set as the *singleton instance* that will be injected into our controllers.

Here is the same service defined using the service API:

```js
angular
  .module("learnServices", [])
  .service('personService', function(){
    this.name = "Matt";
    this.job = "Instructor";
    this.sayHi = function(){
      return "Hello!"
    }
  }).controller('personController', function(personService){
    // I now have access to the personService!
  });
```

A provider is the most complex method and is used less frequently. It is a factory that can be configured before the application starts, which allows for more flexibility, but for the applications we are going to build, you will not need this level of complexity.

## So which one??

For right now we are going to focus on factories. They are a bit easier to reason about having not gotten into OOP and instantiation yet. Many articles will lean towards factories, but with the new ES2015 syntax, services are becoming more preferable. Be aware of both of these and the differences between them.

### Answer the following questions:

- What is a service? What problem do they solve for us?
- What is the difference between a factory and a service?
- Name at least 3 angular built in services that we have used so far.

## Creating our first Service

We are going to start off by creating a `service.js` file to define our service in. While we're at it, let's not forget to throw a script for it in our `index.html` file... `<script src="services.js"></script>`

Remember from above that one of the reasons we use services is seperation of concerns, so creating a new file for it makes sense.

```js
(function() {
  'use strict';

  const app = angular.module('todoApp');

  app.factory('personTodos', personTodos);

  function personTodos() {
    return {
      test: function() {
        console.log('winner winner vegan tofurkey dinner!');
      },
    }
  };

})();
```

Back in our controller, we inject this service like such:

```js
app.controller('TodoListCtrl', TodoListCtrl);

TodoListCtrl.$inject = ['$http', 'personTodos'];
// ----------------------------------^^^

// ------------------------------vvv
function TodoListCtrl($http, 'personTodos') {
  this.todoToAdd = '';
  this.todos = [];

  personTodos.test(); // 👈🏽

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
}
```

If you have everything wired up correctly, when you reload the page you should see your message in the console. 🌱🐔 <-- That's a vegetable turkey!

The `addTodo` method is making an http request to our API. That sounds prime for some.. re-factorying

![please clap](https://media.giphy.com/media/l0NwPo3VHujpJDI4w/giphy.gif)

Now that we know it's working let's replace that `test` method with an `addTodo` method. You can go ahead and just pull all the code from the `addTodo` method in your controller for this. We'll be changing just a couple things.
  * it will now also take the `todoText` as a second parameter.
  * at the top of our `services.js` file create a const pointing at the server url.
  * in the *then* we will get rid of the `push` to `res.data` and just return the response data instead.
  * inject `$http` into our service.


```js
(function() {
  'use strict';

  const app = angular.module('todoApp');
  const server = 'https://galvanize-todos.herokuapp.com/is-persons';

  app.factory('personTodos', personTodos);
  personTodos.$inject = ['$http'];

  function personTodos($http) {
    return {
      addTodo: (person, todoText) => {
        return $http.post(`${server}/${person.id}/is-todos`, {
          completed: false,
          text: todoText
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
      },
    }
  };

})();
```

In our controller we will want to make a few changes as well.
  * our controller will no longer need `$http` injected into it.
  * we can swap out that `$http.post` request with a call to our factory
    method instead.
  * update our *then* push the `todo` and clear text in `todoToAdd`.

```js
function TodoListCtrl('personTodos') {
  this.todoToAdd = '';
  this.todos = [];

  this.addTodo = (person) => {
    personTodos.addTodo(person, this.todoToAdd)
      .then((todo) => {
        person.todos.push(todo);
        this.todoToAdd = '';
      })
      .catch((err) => {
        throw err;
      });
  };
}
```

Should be good to go. Let's test out adding a todo.

Moving on to the next controller, `PeopleCtrl`. The first thing we have
in there that can be refactored into our factory is the `addPerson`
funciton. We can start off by creating a new factory called `people` in
our `services.js` file.

```js
app.factory('people', people);

function people() {
  return {
    addPerson: () => {
      console.log('things and stuff');
    }
  }
}
```

We won't be needing `$http` in our controller anymore so let's swap that
out for our `people` factory.

```js
PeopleCtrl.$inject = ['people'] // people in $http out

function PeopleCtrl(peopleSvc) {
  this.nameToAdd = '';
  this.people = [];

  peopleSvc.addPerson() // should log out our stuffs!

  // more codez...
}
```

With that all wired up, we can move on to pulling the code from our
controllers `addPerson` and paste it into our factory.
  * inject `$http` into our factory.
  * provide a `name` parameter for our method.
  * we will want to return our `$http` request.
  * we can swap out `this.nameToAdd` with the one that gets passed in.
  * we will fully update our promise handler.
    * create a person constant set to `res.data`.
    * create a `todos` property on person set to an emptry array.
    * then return `person`.

```js
const server = 'https://galvanize-todos.herokuapp.com/is-persons';

app.factory('people', people);
people.$inject = ['$http'];

function people($http) {
  return {
    addPerson: (name) => {
      return $http.post(server, { name })
        .then((res) => {
          const person = res.data;
          person.todos = [];
          return person;
        })
        .catch((err) => {
          throw err;
        });
    }
  }
}
```

Annnnnd, back to the controller...
  * replace the `$http` request with our factory method.
  * pass the `nameToAdd` to our method.
  * update our `people` array with our new `person`.
  * clear the `nameToAdd` field.

```js
function PeopleCtrl(peopleSvc) {
  this.nameToAdd = '';
  this.people = [];

  this.addPerson = () => {
    peopleSvc.addPerson(this.nameToAdd)
      .then((person) => {
        this.people.push(person);
        this.nameToAdd = '';
      })
      .catch((err) => {
        throw err;
      });
  }
}
```

These next two `activate` functions are a bit heafty so we're just going to drop all the code
at once and walk through it together.

> `getPerson` method for `PersonCtrl`'s `activate` call.

```js
// services.js

function people($http)  {
  return {
    addPerson: (name) => {
      // codez...
    },
    getPerson: (id) => {
      let person;

      return $http.get(`${server}/${id}`)
        .then((res) => {
          person = res.data;

          return $http.get(`${server}/${id}/is-todos`);
        })
        .then((res) => {
          person.todos = res.data;
          return person;
        })
        .catch((err) => {
          throw err;
        });
    },
  }
}
```

```js
// controllers.js

PersonCtrl.$inject = ['$routeParams', 'people']; // no more $http, and added people

function PersonCtrl($routeParams, peopleSvc) {
    this.person = {};

    const { id } = $routeParams;

    const activate = () => {
      peopleSvc.getPerson(id).then((person) => {
        this.person = person;
      })
      .catch((err) => {
        throw err;
      });
    };

    activate();
  }
```

> `getAll` method for `PeopleCtrl`'s `activate` call.

```js
// services.js

people.$inject = ['$http', '$q']; // added the $q promise service

function people($http, $q) {
  return {
    getAll: function() {
      return $http.get(server).then((res) => {
        return $q.all(res.data.map((person) => {
          return $http.get(`${server}/${person.id}/is-todos`)
            .then((todos) => {
              person.todos = todos.data;
              return person;
            })
            .catch((err) => {
              throw err;
            });
        }));
      })
      .catch((err) => {
        throw err;
      });
    },
    addPerson: (name) => {
      // codez...
    },
    getPerson: (id) => {
      // codez...
    },
  }
}
```

```js
// controllers.js

function PeopleCtrl(peopleSvc) {
  this.nameToAdd = '';
  this.people = [];

  this.addPerson = () => {
    // codez...
  };

  const activate = () => {
    peopleSvc.getAll().then((peopleList) => {
      this.people = peopleList;
    })
    .catch((err) => {
      throw err;
    })
  };

  activate();
}
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
