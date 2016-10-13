## Objectives

* Explain what client-side routing is.
* Use `ngRoute` for client-side routing in a single page application.

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

Open up your gmail (or similar email provider) account. Try clicking around and accessing the different features. Pay special attention to the url bar. What do you notice?

Typical issues with complex single page apps are:

* SPAs don't support browser history navigation. The back and forwards buttons don't work.
* You can't bookmark parts of a SPA
* If all of our code is in a single template, things can get incredibly messy

Angular provides solutions for all of the above issues through its router. We can break down a view into multiple smaller views that are rendered inside of a layout depending on the URL the user is currently accessing.

We'll see how to use the `$routeProvider` to make use of the browser’s history navigation and allow users to bookmark and share specific pages based off of the current URL. Let's get started.

### Exercise

We'll be continuing to work with the todo application we've worked on for a few articles. If your current version is still not working, partner with a classmate to get it up to speed!

**First we need to include the `ngRoute` module.** It's a separate module that we need to include on our own. You can download the module or link to this CDN: "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.js"

Next, we need to load the `ngRoute` module by adding it as a dependent module in `app.js`.

```js
(function() {
  'use strict';

  angular.module('todoApp', ['ngRoute']);
}());
```

Our `index.html` will act as our layout file. Just like in Express, we'll add all the common markup (navbar, footer, etc.) to our layout file, and then we'll render specific views in a particular place in our layout.  To tell Angular where it should render those views, we'll use the `ng-view` directive.

Start by creating a new file called `home.html` and put everything from your `main` element inside of there. You don't need to include a `head` element or anything!

Now, add the following to your `index.html` where the `main` element was.

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

Try and open your `index.html` now and check your console. You will likely have an Cross Origin Request Error. We'll need to solve this by running a server.

> Although we'll be starting a server, it's incredibly important to keep in mind that we are still only working on the front-end and that each new "view" is _not_ a page refresh.

You can start a server with `http-server`:

```shell
http-server -c-1 .
```

**Note:** The `-c-1` disables caching while we run the server.

After running the server, head to the port it's specified. Your page should be back to working as before!

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

  PeopleCtrl.$inject = ['$http', '$q'];
  TodoListCtrl.$inject = ['$http'];
  PersonCtrl.$inject = ['$http', '$routeParams'];
```

In the new `PersonCtrl`, refactor the `activate` function to make the correct call to your server for just the individual id that matches the `$routeParams.id`:

```js
function PersonCtrl($http, $routeParams) {
  this.person = {};

  const { id } = $routeParams;

  const activate = () => {
    return $http.get(`${server}/persons/${id}`)
      .then((person) => {
        this.person = person.data;

        return $http.get(`${server}/persons/${id}/todos`);
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
