## Objectives

* Define Dependency Injection
* Identify Built-in Angular Services
* Describe what is $http
* Describe how to use $http
* Use the $http service to perform a GET request

## What is Dependency Injection?

In order to understand more about dependency injection, we have to first understand where the need for this pattern came from. The need for this pattern came when applications started to become more "modular". When writing modular code, we break apart our application into smaller pieces (that are not always related to each other) so that we can write more testable and maintainable code.

From the angular docs:

There are only three ways a component (object or function) can get a hold of its dependencies:

1. The component can create the dependency, typically using the new operator.
1. The component can look up the dependency, by referring to a global variable.
1. The component can have the dependency passed to it where it is needed.

The first two options of creating or looking up dependencies are not optimal because they hard code the dependency to the component. This makes it difficult, if not impossible, to modify the dependencies. This is especially problematic in tests.

The third option is the most viable, since it removes the responsibility of locating the dependency from the component. The dependency is simply handed to the component.

In angular, we take our dependencies (which we call services) and inject them into a dependent object (controller/directive/filter). This separates the creation of the dependency from its behavior and enables the client to abide by the single responsibility principle.

We are not going to go into how angular implements dependency injection under the hood, but if you would like to learn more about how this works, check out these articles:

https://docs.angularjs.org/guide/di

https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection

### Exercise
In your own words, write down what is dependency injection? How does angular implement dependency injection? we'll discuss as a class what you wrote.

## Identify Built-in Angular Services
Angular services are simply objects that contain some code that can be shared across your app. Like most things we've discussed, Angular comes with some useful built-in services, and we can also write our own custom services too.

You can see a list of the built-in Angular services [here](https://docs.angularjs.org/api/ng/service). Some of the most important ones are:

* $http
* $location
* $q

## What is $http?
According to the Angular documentation:
The `$http` service is a core Angular service that facilitates communication with remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.

In short, `$http` is Angular's wrapper to AJAX calls -- the easiest way of communicating with a server from an Angular app.

## How do you use $http?

The $http service is a function which takes a single argument — a configuration object — that is used to generate an HTTP request and returns a promise.

```js
$http({
  method: 'GET',
  url: '/someUrl'
}).then((response) => {

});
  ```
  With `$http` you are getting a response object back rather than the data itself. This means that you will need to parse out the actual data from the response.

The response object has these properties:

  * `data` – {string|Object} – The response body transformed with the transform functions.
  * `status` – {number} – HTTP status code of the response.
  * `headers` – {function([headerName])} – Header getter function.
  * `config` – {Object} – The configuration object that was used to generate the request.
  * `statusText` – {string} – HTTP status text of the response.

### Shortcuts

Additionally there are shortcut methods for $http including:
Shortcut methods require passing in the URL, request data for POST/PUT requests, and can accept an optional config.

```js
$http.get('/someUrl', config).then((response) => {});
$http.post('/someUrl', data, config).then((response) => {});
```

Complete list of shortcut methods:

* $http.get
* $http.head
* $http.post
* $http.put
* $http.delete
* $http.patch

### Exercise

Take a minute to turn and talk to a classmate about what $http is and how it is used. We'll discuss as a class some of the ways you defined `$http`.

## Building an example application with $http

build ajax hero version in angular
Create a new app with the brunch skeleton:
```sh
brunch new httpService --skeleton kmcgrady/with-angular
```

In your `index.html` file, replace your `<h1>Hello World</h1>` with:

```html

<h1>Hello Movies</h1>
<div ng-controller="homeCtrl as home">
  <div ng-repeat="movie in home.movies">
    {{ movie | json }}
  </div>
</div>

```

In your `app.js` file, add:

```js

import angular from 'angular'

class HomeCtrl {
  constructor($http) {
    $http.get(`http://www.omdbapi.com/?s=batman`)
      .then((response) => {
        console.log(response.data.Search);
        this.movies = (response.data.Search);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}

HomeCtrl.$inject = ['$http'];

angular.module('my-app', [])
  .controller('HomeCtrl', HomeCtrl)

```
From your console:
`npm start` the open `localhost:8000` in your browser and open the inspector



## Refactoring to use a service

```js
import angular from 'angular'

  class HomeService {
    constructor($http) {
      this.$http = $http;
    }

    getMovies() {
      return this.$http.get(`http://www.omdbapi.com/?s=batman`).then(
        (response) => {
          return response.data.Search;
        }
      )
    }
  }

  class HomeCtrl {
    constructor(HomeService) {
      HomeService.getMovies().then(
        (movies) => {
          this.movies = movies;
        }
      )
    }
  }

  angular.module('my-app', [])
    .service('HomeService', HomeService)
    .controller('HomeCtrl', HomeCtrl)

```

## Exercise
You will use the `$http` service with your snapShop project when you connect your project to the heroku server.

## Resources

* [$http docs](https://docs.angularjs.org/api/ng/service/$http)
