# Jeff Dean's Angular Opinions Cheat Sheet

## Use the Angular Style Guide

https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md

There's _so_ much there...  but it's all great, and well worth learning it all over time.

## `link` vs `controller` in a directive

You have several options: `compile`, `link`, `controller`.

**If you could only choose one** choose `link` because it's OK to manipulate DOM, and it can alter `scope`

**The _slightly_ more nuanced version**

- Don't use `compile` at all because it's not [compatible with Angular 2](https://angular.io/docs/ts/latest/guide/upgrade.html)
- Use `controller` in directives where you need to bind basic events / deal with scope / call services
- Use `link` if you have to manipulate DOM elements

http://filimanjaro.com/blog/2014/angular-directive-lifecycle-vs-link-compile-controller/

## `factory` vs `service`

**If you could only choose one** choose `factory` because it can do everything a service can and more.

**The _slightly_ more nuanced version**

- If you need to ever return a constructor, you _must_ use a `factory`
  ```js
    angular
      .factory('cell', function () {
        function Cell(data){ this.data = data };
        Cell.prototype.isValid = function () {
          return this.data > 0;
        };
        return Cell;
      })
      .controller('FooController', function ('cell') {
        this.cell = new Cell(12);
      })
  ```
- If you don't know/care what the code above does, you _can_ use a `service` :)

According to the Angular Style guide, use the [revealing module pattern](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y052) to make factories even nicer.

## Routing to controllers/templates vs. routing to directives

**If you could only choose one** route to directives:

```js
.config(function($routeProvider) {
  $routeProvider
   .when('/Book/:bookId', {
    templateUrl: '<my-directive></my-directive>',
  })
});
```

Why? Because they'll upgrade nicely to https://angular.io/docs/ts/latest/guide/upgrade.html#!#using-component-directives

**The _slightly_ more nuanced version**

There's a _ton_ of Angular 1 code out there that routes to controllers / templates.  It's definitely worth knowing that it exists, and being comfortable with it.

https://docs.angularjs.org/api/ngRoute/service/$route#example

The concepts are very much the same, so it shouldn't be too hard to map concepts.

## What goes in a service?

**If you could only choose one rule:**

- "glue" code goes in controllers (methods that respond to event handlers, redirects, changes to scope etc...)

Everything else goes in services.

**The _slightly_ more nuanced version**

- All `$http`, `$resource`, `localStorage`, business logic goes in services
- All shared state goes in a service (even if it's just UI state, like tabs)

## What router do I use?

- New Angular 1.5 Component Router: https://docs.angularjs.org/guide/component-router
- `ngRoute`
- `ui-router`

**If you could only choose one** do the Angular 1.5 Component Router because it's a smooth transition

**The _slightly_ more nuanced version**

- Almost nobody is using the component router yet.  You are extremely unlikely to see it in production today.
- `ui-router` is the current de-facto standard, and may have its own upgrade path
- `ngRoute` is old and janky and while you'll see it in production in a few places, it's not worth learning

## Handling errors in promises in services

**If you could only choose one** just don't `catch` in a service*

\* because you are a beginner and error handling is less important than understanding the "happy path"

**The _slightly_ more nuanced version**

If you `catch` in a service, be sure to return a rejected promise:

https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#style-y082
