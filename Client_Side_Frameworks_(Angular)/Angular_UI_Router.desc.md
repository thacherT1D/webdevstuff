## Objectives

* Explain how routing is used in Angular applications
* Explain what uiRouter is
* Build a basic angular app using uiRouter
* Use ng-include to modularize your nav and footer

## Routing in Angular

Similar to the routing we have already learned in Q2, Angular provides a mechanism to associate a route (a URL in the browser) to a specific view. The key difference is that Angular routing does not require a request to the server to redisplay the page, which completes our ability to convert a multi-application to a single-page application.

## What is ngRoute

ngRoute is the routing module built by Angular that provides routing through its own set of services and directives for angular applications. Even though ngRoute was built by Angular,
It is not automatically included with an Angular build. When using ngRoute you need to import it in your app.js file just as you import any other dependency. We are in favor using a third-party library called uiRouter, but if you are interested in exploring ngRoute, we recommend starting at its [documentation page](https://docs.angularjs.org/api/ngRoute).

## What is uiRouter

uiRouter is a third party built routing solution for Angular. uiRouter was built to provide routing capabilities above and beyond ngRoute. The main advantage of uiRouter is its ability to associate nested views to different routes (that is views within views).

For more detail on this choice check out this article: [Why UI Router?](http://www.funnyant.com/angularjs-ui-router/)

### Exercise
In your own words write down what is uiRouter and why we are using it. After a minute, your instructor will cold call on the class to ask what you wrote.

## Building a basic angular app with uiRouter

Get started with this repo: https://github.com/gschool/hello-ui-router

This repo is based on the hello-angular repo with brunch, so our setup is the same -- Fork, clone, install the dependencies and get it running:

```sh
cd hello-ui-router
npm install
npm start
```

Now we have a basic site up -- in addition to the brunch setup we have included angular-materialize to make it easier to get right to seeing how uiRouter can help us make our app structure and views even better.

Let's get started with uiRouter -- install angular-ui-router:
```sh
npm install --save angular-ui-router
```
In `hello-uiRouter/app/app.js` under the line importing angular-materialize add:
```js

import uiRouter from 'angular-ui-router'

```
and then add `uiRouter` as a dependency to your angular module:
```js
angular.module('my-app', [angularMaterialize, uiRouter]);
```

Open the app folder and look at the file structure to see how we are going to set up additional views.

First we are going to add ui-view to our `index.html` file.

In `index.html`, replace the <main> section from your index.html file with the following:
```html
<div class="container">
  <div ui-view></div>
</div>
```

The additional view files have been setup for you, so let's focus on wiring them together -- Open your `app.js` file -- this a lot of code, so let's pause before adding it and talk through what it is going to do for us.
```js
.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: 'views/home.html'
    })
    .state('main', {
      url: '/',
      templateUrl: 'views/home.html'
    })
    .state('shops', {
      url: '/shops',
      templateUrl: 'views/shops.html'
    })
    .state('user', {
      url: '/user',
      templateUrl: 'views/user/user.html'
    })
    .state('user.profile', {
      url: '/profile',
      templateUrl: 'views/user/profile.html'
    })
    .state('user.account', {
      url: '/account',
      templateUrl: 'views/user/account.html'
    });

}]);
```

In your `index.html` file change your nav bar links to use the ui-router convention of 'ui-sref' which links based on the name you have given to each state:
```html
      <li><a ui-sref="home">Home</a></li>
      <li><a ui-sref="shops">Shops</a></li>
      <li><a ui-sref="user.profile">User</a></li>
```

We are now using uiRouter!

### Splitting out our nav and footer
Another way to modularize your code is to spilt out pieces of your view, for example, your nav and footer. Here we are going to use ngInclude which is an angular built-in directive that fetches, compiles and includes an external HTML fragment. Let's start by moving our nav and footer into their respective files.

Then in the index.html put these lines where the code for your nav and footer were:
```
<header ng-include="'views/nav.html'"></header>
```
```
<footer ng-include="'views/footer.html'"></footer>

```

## Assignment
Use uiRouter to turn your snapShop project into a true single page app.

## Resources

* [ui-router docs](https://github.com/angular-ui/ui-router)
* [ngRoute documentation](https://docs.angularjs.org/api/ngRoute)
* [ui-router v. ngRoute](http://stackoverflow.com/questions/21023763/angularjs-difference-between-angular-route-and-angular-ui-router)
* [Why UI Router?](http://www.funnyant.com/angularjs-ui-router/)
* [ngInclude documentation](https://docs.angularjs.org/api/ng/directive/ngInclude)
