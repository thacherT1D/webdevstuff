## Objectives

* Explain how Angular handles two-way data binding.
* Explain what is the Angular digest loop.
* Explain the difference between `$scope.digest` and `$scope.apply`.
* Use Angular features designed to cooperate with its digest cycle including:
  * Promises
  * `$timeout`
  * `$interval`

## An example to illustrate the `$digest` cycle

Throughout explaining the `$digest` cycle, we'll use a sample project to describe the actions. Here's the HTML.

```html
<!DOCTYPE html>
<html ng-app="stopwatch">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello world</title>
    <link rel="stylesheet" href="/vendor.css">
    <link rel="stylesheet" href="/app.css">
  </head>
  <body>
    <div ng-controller="StopWatchCtrl as stopwatch">
      {{stopwatch.time}}<br>
      <button ng-click="stopwatch.start()">Start</button>
    </div>

    <script src="/vendor.js"></script>
    <script src="/app.js"></script>
    <script>require('app');</script>
  </body>
</html>
```

In the HTML, we need to use a controller, so in a file in its own folder `app/stopwatch/stopwatch.controller.js`, we have the following:

```javascript
class StopWatchCtrl {
  constructor() {
    this.time = 0;
  }

  start() {
    setInterval(() => {
      this.time += 1;
    }, 1000);
  }
}

export default StopWatchCtrl;
```

Finally, we initialize our `app/app.js` file.

```javascript
import angular from 'angular'

import StopWatchCtrl from './stopwatch/stopwatch.controller';

angular.module('stopwatch', [])
  .controller('StopWatchCtrl', StopWatchCtrl);
```

## How does Angular handle two-way data binding?

So now that we have a stronger understanding of what Angular is, how to structure larger applications, let's learn a little bit about how Angular works under the hood. Once a web page is loaded, Angular is ready to begin processing the markup.

Angular will identify all places where it needs to track variables (think `ng-model`, creating instances of `ng-controller`, and `ng-init`) and placing them in their proper scope (based on the DOM tree). With this in mind, it now has all the variables that the web page uses. Angular track any changes to these variables by creating **watchers** on each of these variables.

Once it is done, it compiles the rest of the page (looking for curly braces `{{}}`) to include the values from these watchers into the page in proper formatting (using filters).

The watchers responsibility is to inform Angular when to re-render the page with new variables (adjusting the page accordingly). This is what allows two-way data binding to occur.

**NOTE** You can add watchers using a method on `$scope` called `$watch`.
```javascript
$scope.$watch('VAR NAME', (newValue, oldValue) => {
  // This callback occurs when Angular witnesses the variable has changed.
});
```

### How do the watchers inform Angular of changes?

Angular has a built-in function in `$scope` called `$digest`. When it is called, Angular checks each of the watchers (in its watch list) for any changes (this is called **dirty checking**). If there's a change, it will make changes to the view and check for any new changes to process.

It's important to note that these watchers have the ability to change other models, which trigger another call to `$digest`. This is called the **`$digest` cycle** or **`$digest` loop**. Beware of infinite loops here. `$digest` will run at most 10 times or until the models settle to a common value.

## Fixing our example

```javascript
class StopWatchCtrl {
  constructor($scope) {
    this.$scope = $scope;
    this.time = 0;
  }

  start() {
    setInterval(() => {
      this.time += 1;
      this.$scope.$digest();
    }, 1000);
  }
}

StopWatchCtrl.$inject = ['$scope'];

export default StopWatchCtrl;

```

`$scope.$digest()` immediately starts the dirty checking and parsing on the current scope and below. The more recommended form is to use `$scope.$apply()`.

```javascript
class StopWatchCtrl {
  constructor($scope) {
    this.$scope = $scope;
    this.time = 0;
  }

  start() {
    setInterval(() => {
      this.$scope.$apply(() => {
        this.time += 1;
      });
    }, 1000);
  }
}

StopWatchCtrl.$inject = ['$scope'];

export default StopWatchCtrl;
```

`$scope.$apply()` takes in a function or an angular expression as a string, executes it, and then ensures that `$scope.$digest()` is called afterwards. This allows the entire page to check for changes rather than the current scope. This is often the case when we use outside libraries.

### A Diagram of the process

![AngularJS Runtime](https://docs.angularjs.org/img/guide/concepts-runtime.png)

## Angular Features to Cooperate with the `$digest` Cycle.

In the example above, Angular has provided a feature called `$interval` to help out.

```javascript
class StopWatchCtrl {
  constructor($interval) {
    this.$interval = $interval;
    this.time = 0;
  }

  start() {
    this.$interval(() => {
      this.time += 1;
    }, 1000);
  }
}

StopWatchCtrl.$inject = ['$interval'];

export default StopWatchCtrl;
```

Ensure that `$interval` is included in the function.

### `$timeout`

```javascript
class StopWatchCtrl {
  constructor($timeout) {
    this.$timeout = $timeout;
    this.time = 0;
  }

  start() {
    this.$timeout(() => {
      this.time += 1;
    }, 1000);
  }
}

StopWatchCtrl.$inject = ['$timeout'];

export default StopWatchCtrl;
```

### Promises and `$q`

Since Angular does not update the variables it's watching using asynchronous APIs, AJAX requests do _not_ automatically update the UI. This is because they are external to the Angular digest cycle. i.e. Angular does not know when these asynchronous APIs are done executing, so you *must* manually call `$scope.$apply()` or `$scope.$digest()` to let Angular know that some things have changed and the UI should be updated.

As you may recall, promises represent an asynchronous value. $q is Angular's implementation of promises. $q allows us to use promises within the digest cycle of Angular without the need to call `$scope.$apply()` or `$scope.$digest()`

`$q` has a similar API to native promises.

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

The same function on an Angular service would return the invocation of $q instead of a new instance of a promise:

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

## Resources

[http://stackoverflow.com/questions/9682092/angularjs-how-does-databinding-work/9693933#9693933](http://stackoverflow.com/questions/9682092/angularjs-how-does-databinding-work/9693933#9693933)

[https://docs.angularjs.org/guide/scope#scope-life-cycle](https://docs.angularjs.org/guide/scope#scope-life-cycle)

[https://www.youtube.com/watch?v=3DuyyNgXqsE](https://www.youtube.com/watch?v=3DuyyNgXqsE)
