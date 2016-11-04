## Objectives

* Explain how routing is used in Angular applications
* Explain what is uiRouter.
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

Get started with this repo: https://github.com/thacherT1D/hello-ui-router

This repo is based on the hello-angular repo with brunch, so our setup is the same -- Fork, clone, install the dependencies and get it running:

```sh
cd hello-uiRouter
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

Open the app folder and look at the file structure to determine where you would want to put additional views.

In your assets folder create a `views` directory:
```sh
mkdir app/assets/views
```
Then create an html file for your home view:
```sh
touch app/assets/views/home.html
```
In `index.html`, replace the <main> section from your index.html file with the following:
```html
<div class="container">
  <div ui-view></div>
</div>
```
Add the following to your `home.html` file

```html

<div>
  <h1>Hello World</h1>
  <p>and welcome to the Wizarding World</p>
</div>

```


Then create an html file for your Diagon Alley view:
```sh
touch app/assets/views/diagonalley.html
```

Let's add to our `diagonalley.html`:
```html
<div>
  <h1>Shops</h1>
  <ul>
    <li>Eeylops Owl Emporium</li>
    <li>Florean Fortescue's Ice Cream Parlour</li>
    <li>Flourish and Blotts</li>
    <li>Gringotts Wizarding Bank</li>
    <li>Madam Malkin's Robes for All Occasions</li>
    <li>Magical Menagerie</li>
    <li>Ollivanders</li>
    <li>Quality Quidditch Supplies</li>
    <li>Rosa Lee Teabag</li>
  </ul>
</div>
```
Next we're going to create our user views:
```sh
mkdir app/assets/views/user
touch app/assets/views/user/account.html
touch app/assets/views/user/profile.html
touch app/assets/views/user/user.html
```
And then add the following text to them, respectively:
`account.html`
```html
<div>
  <h4>User Account</h4>
  <p>
    Boggarts lavender robes, Hermione Granger Fantastic Beasts and Where to Find Them. Bee in your bonnet Hand of Glory elder wand, spectacles House Cup Bertie Bott’s Every Flavor Beans Impedimenta. Stunning spells tap-dancing spider Slytherin’s Heir mewing kittens Remus Lupin. Palominos scarlet train black robes, Metamorphimagus Niffler dead easy second bedroom. Padma and Parvati Sorting Hat Minister of Magic blue turban remember my last.
  </p>
</div>
```
`profile.html`
```html
<div>
  <h4>User Profile</h4>
  <p>
    Half-giant jinxes peg-leg gillywater broken glasses large black dog Great Hall. Nearly-Headless Nick now string them together, and answer me this, which creature would you be unwilling to kiss? Poltergeist sticking charm, troll umbrella stand flying cars golden locket Lily Potter. Pumpkin juice Trevor wave your wand out glass orbs, a Grim knitted hats. Stan Shunpike doe patronus, suck his soul Muggle-Born large order of drills the trace. Bred in captivity fell through the veil, quaffle blue flame ickle diddykins Aragog. Yer a wizard, Harry Doxycide the woes of Mrs. Weasley Goblet of Fire.
  </p>
</div>
```

`user.html`
```html
<div>
  <h3>User Information</h3>
  <p>An example of nested views</p>
  <a class="waves-effect waves-light btn" ui-sref="user.profile">Show Profile</a>
  <a class="waves-effect waves-light btn" ui-sref="user.account">Show Account</a>

  <div ui-view></div>

</div>
```

Now for the fun part... let's wire all of this together!
Open your `app.js` file -- this a lot of code, so let's pause before adding it and talk through what it is going to do for us.
```js
.config(['$stateProvider', ($stateProvider) => {
  $stateProvider
    .state('home', {
      url: '',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
    })
    .state('main', {
      url: '/',
      templateUrl: 'views/home.html'
    })
    .state('diagonalley', {
      url: '/diagonalley',
      templateUrl: 'views/diagonalley.html'
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

In your `index.html` file change your nav bar links to use ui-router:
```html
      <li><a ui-sref="home">Home</a></li>
      <li><a ui-sref="diagonalley">Diagon Alley</a></li>
      <li><a ui-sref="user.profile">User</a></li>
```

We are now using uiRouter!

### Splitting out our nav and footer
Another way to modularize your code is to spilt out pieces of your view, for example, your nav and footer. Here we are going to use ngInclude which is an angular built-in directive that fetches, compiles and includes an external HTML fragment. Let's start by creating nav.html and footer.html file within the views folder:
```sh
touch assets/templates/nav.html
touch assets/templates/footer.html
```
Let's move our nav and footer into their respective files.

Then in the index.html put this line where the code for your nav bar was:
```
<header ng-include="'templates/nav.html'"></header>
```
```
<footer ng-include="'templates/footer.html'"></footer>

```

## Resources

* [ui-router docs](https://github.com/angular-ui/ui-router)
* [ngRoute documentation](https://docs.angularjs.org/api/ngRoute)
* [ui-router v. ngRoute](http://stackoverflow.com/questions/21023763/angularjs-difference-between-angular-route-and-angular-ui-router)
* [Why UI Router?](http://www.funnyant.com/angularjs-ui-router/)
* [ngInclude documentation](https://docs.angularjs.org/api/ng/directive/ngInclude)
