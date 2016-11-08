## Objectives
* Define Dependency Injection
* Identify Built-in Angular Services
* Define $http
* Describe what $http is and how it is used
* Explain and use $http shortcuts
* Identify the parts of the response body
* Use the $http service to get and post data

## What is Dependency Injection?
From Wikipedia:

"In software engineering, dependency injection is a software design pattern that implements inversion of control for resolving dependencies. Dependency injection means giving an object its instance variables. Really. That's it."

A bit more about DI
In order to understand more about dependency injection, we have to first understand where the need for this pattern came from. The need for this pattern came when applications started to become more "modular".

As a quick refresher - when writing modular code, we break apart our application into smaller pieces (that are not always related to each other) so that we can write more testable and maintainable code.

Now that we are building an understanding of what modular code is - we are also beginning to understand that in order for us to write modular code, we need our small containers (modules) to be dependent upon other modules! This means that when we are modular, we are also dependent!

From the angular docs:

There are only three ways a component (object or function) can get a hold of its dependencies:

1. The component can create the dependency, typically using the new operator.
1. The component can look up the dependency, by referring to a global variable.
1. The component can have the dependency passed to it where it is needed.

The first two options of creating or looking up dependencies are not optimal because they hard code the dependency to the component. This makes it difficult, if not impossible, to modify the dependencies. This is especially problematic in tests.

The third option is the most viable, since it removes the responsibility of locating the dependency from the component. The dependency is simply handed to the component.

In angular, we take our dependencies (which we call services - we will learn more about these in another unit) and inject them into a dependent object (controller/directive/filter). This separates the creation of the dependency from its behavior and enables the client to abide by the single responsibility principle.

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
* $animate
* $routeParams

## Define $http
According to the Angular documentation:
The `$http` service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.

In short, `$http` is Angular's wrapper to AJAX calls -- the easiest way of communicating with a server from an Angular app.

## Describe what $http is and how it is used
The $http service is a function which takes a single argument — a configuration object — that is used to generate an HTTP request and returns a promise.

A new sentence

```js
$http({
  method: 'GET',
  url: '/someUrl'
}).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  ```
  With `$http` you are getting a response back rather than the data itself. This means that you will need to parse out the actual data from the response.

## Exercise
Take a minute to turn and talk to a classmate about what $http is and how it is used. We'll discuss as a class some of the ways you defined `$http`.

## Explain and use $http shortcuts
  Additionally there are shortcut methods for $http including:
  Shortcut methods require passing in the URL, request data for POST/PUT requests, and can accept an optional config.
```js
  $http.get('/someUrl', config).then(successCallback, errorCallback);
  $http.post('/someUrl', data, config).then(successCallback, errorCallback);
```
  Complete list of shortcut methods:
  * $http.get
  * $http.head
  * $http.post
  * $http.put
  * $http.delete
  * $http.jsonp
  * $http.patch

## Identify the parts of the response body
  The response object has these properties:
  * data – {string|Object} – The response body transformed with the transform functions.
  * status – {number} – HTTP status code of the response.
  * headers – {function([headerName])} – Header getter function.
  * config – {Object} – The configuration object that was used to generate the request.
  * statusText – {string} – HTTP status text of the response.

## Doing together
build ajax hero version in angular

## Exercise: Use $http.get() and $http.post() to interact with this API that we've made for you. It's a simple collaborative chat app. The API has two endpoints:

GET /messages - responds with a list of all messages
POST /messages - creates a new message with the data you send to it
Create a simple app that displays a list of all the messages coming from the API. Also display a form that allows a user to submit a new message to the database.

The data you send should follow this format:

{message: {
  name: "Mary",
  content: "This is such a cool API!"
}}

## Exercise
You will use the `$http` service with your snapShop project when you connect your project to the heroku server.

## Resources

* [$http docs](https://docs.angularjs.org/api/ng/service/$http)
* [Wikipedia](link)
