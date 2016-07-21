## Objectives

* Diagram the Angular digest cycle.
* Explain the difference between `$scope.digest` and `$scope.apply`.
* Explain what is the Angular digest loop.
* Explain how the Angular parser and compiler work.
* Use Angular features designed to cooperate with its digest cycle including:
  * Promises
  * `$setTimeout`

## Angular JS internals

So now that we have a stronger understanding of what angular is, how to structure larger applications and most importantly, what `$scope` is (and how to avoid some pitfalls with it), let's learn a little bit about how angular works under the hood. But before we can really get started, we need to be aware of a few essential methods that can be called on `$scope`.

`$scope.$watch` - Whenever we need to watch a particular variable we place a watch on it. This is very similar to an event listener where we are watching for a change. This is also used quite heavily internally by angular for two way data binding. Whenever a variable gets changed, the watch is initiated.

`$scope.$digest` - In the background, there is a digest cycle running which monitors what variables are getting changed that are being watched. We'll cover a bit more on the digest cycle, but the method that is constantly called to update data in the digest cycle is `$digest`.

`$scope.$apply` - Sometimes we see that scope data is not getting updated on our HTML content. This can happen when we are using APIs that are external to angular (`setTimeout`, `XHR`). When we are not able to get updated data, we have to forcefully fire a digest cycle, this is where $scope.$apply helps us out. While this sounds quite helpful, you should be using this **VERY INFREQUENTLY**.

You can check to see if the digest cycle is running by examining `$scope.$$phase`. If you see that this returns `"$apply"` or `"$digest"`, the cycle is running and an exception will be thrown if you try to call `$scope.$apply()`, otherwise you can call `$scope.$apply` and your data will be updated.

### What is the difference between $scope.digest and $scope.apply

Use this code example, and see if you can figure this out:

```html
<!DOCTYPE html>
<html lang="en" ng-app="applydigest">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body >
  <div>
    From $rootScope: {{rootView.name}}
  </div>
  <div ng-controller="MainController">
    From $scope: {{view.age}}
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
  <script src="script.js"></script>
</body>
</html>
```

```js
angular.module("applydigest", []).controller("MainController", function($rootScope, $scope) {
  $rootScope.rootView = {};
  $rootScope.rootView.name = "Fido";
  $scope.view = {};
  $scope.view.age = 3;

  // this is for example purposes
  // NOTE - there is a $timeout which handles $apply for you
  setTimeout(function() {
    $rootScope.rootView.name = "Lassie";
    $scope.view.age = 10;
    // $scope.$digest();
    $scope.$apply();
  }, 1000);
});
```

When you call $scope.digest it only runs the digest loop from that particular scope, but when you call $apply, that uses the $rootScope and goes through all scopes in the application.

If you have many watches and scopes, and you know that you only need to modify a single scope it is best to use $digest, otherwise use $apply.

## How angular extends the browser + the digest cycle

Let's examine this chart:

![https://docs.angularjs.org/img/guide/concepts-runtime.png](https://docs.angularjs.org/img/guide/concepts-runtime.png)

In this diagram, the section (left) is the browser. Events are put on the Event Queue and when they fire, they trigger callbacks. We have seen this before in our examination of the event loop (think back to the stack/heap/queue). Ordinarily, a callback will go modify the DOM and the browser will render the modified DOM, but with angular things are a bit different.

When we are dealing with an angular application, all of the callbacks on the event queue that are relevant to angular (anything that we would not manually have to call `$apply` on) have the $apply function in them. When the event fires, it goes into the JavaScript context and JS starts processing it, JS then runs $apply and goes into the AngularJS Context (the yellow box), which is the digest loop. This modifies the DOM and it is rendered by the native browser.

When the digest loop runs, it always runs against a `scope`. As we saw before, some angular directives create their own scope and when the digest loop runs, it runs against the scope for that specific directive.

### What is this $digest loop?

The digest loop is what runs after the $apply function brings a callback into the angular context.

The digest loop has two sub-loops in it. One is the `$watch list` and the other is the `$evalAsync`

`$watch list` - This is the where angular implements dirty checking. $digest runs iteratively until DOM is stable (it is not dirty).

#### Dirty Checking

Dirty Checking is a process to check if the value of an expression/variable has changed. Dirty Checking simply compares an old value with a new one to see if it has changed. Angular uses Dirty Checking to determine whether the value of a variable or expression in its scope has changed or not. If it has, it does the required operation. You can read more about it [here](http://stackoverflow.com/questions/24698620/dirty-checking-on-angular)

### Back to the chart:

![https://docs.angularjs.org/img/guide/concepts-runtime.png](https://docs.angularjs.org/img/guide/concepts-runtime.png)

The `$watch list` is observing elements in the scope and when they change and angular checks them (through `dirty checking`) it runs the callbacks that are associated with those watches that are put on scope elements. You can issue your own $watch function (that's what we saw above!) inside of a $scope, but right now we won't be doing that. It's important to note that angular does this for us in almost all of the examples we have seen.

`$evalAsync loop` - whatever we have called with `$evalAsync()` is guaranteed to run on the next digest cycle. This is a good substitute for setTimeout(which is not an Angular construct). You can read more about `$evalAsync()` [here](https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$evalAsync)

### The Angular Parser and Compiler

In short, angular extends the browser in two ways. The event loop (which we just saw) and the other is the parser (using {{ }}). If you are inside of an angular program, angular parses these directives. The parser also sets watches on page elements and on any kind of interpolation using {{ }}.

Let's look at this chart:

![https://docs.angularjs.org/img/guide/concepts-startup.png](https://docs.angularjs.org/img/guide/concepts-startup.png)

This shows how the angular parser gets control when a page is loaded in the browser. The browser loads the HTML and builds the DOM out of it, when the browser finishes, it issues a DOMContentLoaded event. Angular, if there is an `ng-app` directive, runs a callback on the DOMContentLoaded event and the compiler runs and looks for angular directives on the page and it builds HTML based on the directives and merges it into the DOM.

The compiler can also run whenever the `$compile` function is executed (when we discuss routing and the router sees a new page for the first time it will call `$compile`).

You can read more about this process (Bootstrapping) [here](https://docs.angularjs.org/guide/bootstrap)

## Exercises

### Answer the following questions

- What is the difference between `$scope.apply` and `$scope.digest`?
- What is the digest cycle?
- What is the scope life cycle? (this will require some additional reading)
- What does "bootstrapping an angular app" mean?

# Promises Refresher

>A promise represents a value that may not be available yet. i.e. an action that is being executed asynchronously.

For example, you might have seen some `knex` code like this:

```js
knex('puppies')
  .where('breed', 'labrador')
  .then(function(puppies){
    console.log(puppies);
  }).catch(function(error){
    console.log(error);
  });
```

A `knex` query builder returns a promise.  If the query succeeds, the function specified by then will be called, otherwise, the catch function will be called.

A promise can either be:

`resolved` - the asynchronous action completed successfully

`rejected` - the asynchronous action failed

Promises can also be chained:

```js
getUserData()
  .then(function (userData) {
    return getUserMessages(userData.id).then(function(userMessages){
      return { userData: userData, userMessages: userMessages }
    });
  }).then(function (result) {
    return getUserLocation(result.userData.id).then(function(userLocation){
      result.userLocation = userLocation;
      return result;
    });
  }).then(function(result){
    renderData(result.userData, result.userMessages, result.userLocation)
  }).catch(function(error){
    console.log(error);
  });
```

In this example, getUserData, getUserMessages and getUserLocation all return a promise.

For example, getUserData might be implemented like so:

```js

function getUserData() {
  return new Promise(function(resolve, reject){
    someAsyncThing(function(error, userData){
      if(error) {
        reject(error);
      } else {
        resolve(userData);
      }
    });
  });
}
```

We chain promises by returning the resulting promise of each successive function call. Using promises in this way prevents what is known as `callback hell`, the `pyramid of doom` or `rightward drift`

For example, to do the same thing with callbacks:

```js
getUserData(function(userData){
  getUserMessages(userData.id, function(userMessages){
    getUserLocation(userData.id, function(userLocation){
      renderData(userData, userMessages, userLocation);
    });
  });
});
```

This is a simple example, but the more asynchronous functions we have that depend on previous asynchronous values, the farther right the code drifts.

Promises allow the implementer to chain methods together in a flat, more readable way.

Promises are native to the browser.  All popular browsers except for [IE11 and below](http://caniuse.com/#search=promise) have full support for promises. Take a look at the [MDN docs for promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

**EXERCISE:** Why would you prefer to use a promise over a callback?  What advantage does it have?

For more practice with promises, checkout the [promise-challenges repo](https://github.com/gSchool/promise-challenges).

# Promises in Angular

Recall from [Unit 2: Section 6](06-http-service.md) that the `$http` service method `get` returns a promise.

Let's create a service that uses `$http` to catch a specific pokemon using the [pokemon api](http://pokeapi.co/docs/).

The example below is a possible way to implement a service that
gets the first move for a pokemon and the first ability.  **THERE IS A MUCH BETTER WAY TO IMPLEMENT THE FOLLOWING CODE**.

```js
app.service("Pokemon", function($http) {

  var baseUrl = 'http://pokeapi.co/';

  // A number for the pokemon id needs to be added to the
  // this path.
  var pokemonInfoPath = 'api/v1/pokemon/';
  return {
    catchEm: function(pokemonId) {
      var pokeData;
      var fullUrl = baseUrl + pokemonInfoPath + pokemonId + '/';
      $http.get(fullUrl).then(function(baseData) {
        pokeData = baseData.data;
        var uri = pokeData.abilities[0].resource_uri;
        $http.get(baseUrl + uri).then(function(abilityData) {
          pokeData.abilities[0] = abilityData.data;
          // Notice that this get request doesn't depend on the
          // get request it is nested inside of.

          var uri = pokeData.moves[0].resource_uri;
          $http.get(baseUrl + uri).then(function(moveData) {
            pokeData.moves[0] = moveData.data;

            // Now we have a problem.  How do we signal that this
            // data is done?
          })
        });
      });
    }
  };
});
```

This deeply nested code is very hard to maintain and it doesn't really provide much benefit over normal callbacks.  The code above also has the problem that client of the service doesn't have a good way of knowing when all of the data has been loaded.  How can we make this better?

**EXERCISE**: Take a look at [this link about flattening promise chains](http://solutionoptimist.com/2013/12/27/javascript-promise-chains-2/).  Apply your newly found promise knowledge to improving the pokemon service.  Make the promise chain in the service not deeply nested. Remember that $http returns a promise.  Also, return a promise to the client so that the client can use `.then` to figure out when all of the data is done loading.  Also keep in mind that the get request for moves and the get request for abilities are not dependent on each other.

**EXERCISE** Now that we have a better idea of how to use promises, improve the code so that all move data, all ability data, and all sprite data gets returned by the service.  Create a page to display the results.

# $q

When learning about the [digest cycle](02-digest-cycle.md), you learned that changes to `$scope` using asynchronous APIs such as setTimeout, setInterval or XMLHttpRequest do _not_ automatically update the UI. This is because they are external to the angular digest cycle. i.e. Angular does not know when these asynchronous APIs are done executing, so you *must* manually call `$scope.$apply()` or `$scope.$digest()` to let angular know that some things have changed and the UI should be updated.

As you may recall, promises represent an asynchronous value. $q is angular's implementation of promises/deferred objects inspired by the [q](https://github.com/kriskowal/q) library. $q allows us to use promises within the digest cycle of angular without the need to call `$scope.$apply()` or `$scope.$digest()`

### Using $q

`$q` has a similar API to native promises.

Recall our example from earlier that returns a native promise:

```js
function getUserData() {
  return new Promise(function(resolve, reject){
    someAsyncThing(function(error, userData){
      if(error) {
        reject(error);
      } else {
        resolve(userData);
      }
    });
  });
}
```

The same function on an angular service would return the invocation of $q instead of a new instance of a promise:

```js
app.factory('UserService', function($q){
  return {
    getUserData: function() {
      return $q(function(resolve, reject){
        someAsyncThing(function(error, userData){
          if(error) {
            reject(error);
          } else {
            resolve(userData);
          }
        });
      });
    }
  }
});
```

**EXERCISE** What would happen if the `UserService` in the above example used a new `Promise` instead of $q?

In the example below, a $q promise is resolved by providing the result of getting the movie data from our movie cache or from an ajax request. The code demonstrates a good way to allow controllers to fetch data from services that may (or may not) need to fetch that data from an external source. In the following example, we'll cache the OMDB response for a search term, and avoid making calls to the API for the same data more than once. Our controller can treat the response the same way in both cases, it doesn't care where the data comes from, only that the search function will return a promise.

```js
app.controller('OmdbController', function($scope, omdbapi) {
  $scope.view = {};
  $scope.view.term = '';

  $scope.view.queryOmdb = function() {
    omdbapi.search($scope.view.term).then(function(data) {
      $scope.view.results = data;
    })
  }
});

app.factory('omdbapi', function($http, $q) {
  var omdbservice = {};
  var baseUrl = "http://www.omdbapi.com/?r=json&plot=long&s=";

  var cachedMovies = {};

  omdbservice.search = function(term) {
    var url = baseUrl + encodeURIComponent(term);

    return $q(function(resolve, reject){
      if (cachedMovies[term]) {
        resolve(cachedMovies[term]);
      } else {
        $http.get(url).success(function(data) {
          cachedMovies[term] = data.Search;
          resolve(cachedMovies[term]);
        }).error(function(error) {
          reject(error)
        });
      }
    })
  }

  return omdbservice;
});
```

**EXERCISE** What are some advantages of caching the data? What role does `$q` play in caching the data?


### Additional reading on the scope life cycle and digest cycle

[http://stackoverflow.com/questions/9682092/angularjs-how-does-databinding-work/9693933#9693933](http://stackoverflow.com/questions/9682092/angularjs-how-does-databinding-work/9693933#9693933)

[https://docs.angularjs.org/guide/scope#scope-life-cycle](https://docs.angularjs.org/guide/scope#scope-life-cycle)

[https://www.youtube.com/watch?v=3DuyyNgXqsE](https://www.youtube.com/watch?v=3DuyyNgXqsE)
