## Objectives

* Explain how routing is used in Angular applications
* Define ngRoute and uiRouter
* Explain the differences between ngRoute and uiRouter
* Build a basic angular app using uiRouter
* Use ng-include to modularize your nav and footer

## Routing in Angular
Similar to the routing we have already learned in Q2, routing in Angular serves to connect views together both with other views and with your controllers and services.

## What is ngRoute
ngRoute is the routing module built by Angular that provides routing and deeplinking services and directives for angular applications. Even though ngRoute was built by Angular,
It is not automatically included with an Angular build. When using ngRoute you need to import it in your app.js file just as you import any other dependency.

## What is uiRouter
uiRouter is a third party built routing solution for angular. uiRouter was built to provide routing capabilities above and beyond ngRoute. The two main advantages of uiRouter are that it enables multiple views and nested views.

## Why are we learning uiRouter?
The advantages of being able to use multiple views on a single-page and being able to nest views make developing more complex designs easier and without the need to build as many work-arounds to meet desired design specs.

For more detail on this choice check out this article: [Why UI Router?](http://www.funnyant.com/angularjs-ui-router/)

### Exercise
In your own words write down the differences between ngRoute and uiRouter. After two minutes, your instructor will cold call on the class to ask what you wrote.

## Building a basic angular app with uiRouter
Get started with this repo:

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
Replace the <main> section from your index.html file with the following:
```js

<div ui-view><div>

```
Add the following to your home.html file

```js

<div class="container">
  <h1>Hello World</h1>
  <h2>and welcome to the Wizarding World</h2>
</div>

```


Then create an html file for your Diagon Alley view:
```sh
touch app/assets/views/diagonalley.html
```

Let's add to our diagonalley.html:
```html
<div class="container">
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


### Splitting out our nav and footer
Create nav.html and footer.html file within the views folder:
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


## Assignment


## Resources

* [ui-router docs](https://github.com/angular-ui/ui-router)
* [ngRoute documentation](https://docs.angularjs.org/api/ngRoute)
* [ui-router v. ngRoute](http://stackoverflow.com/questions/21023763/angularjs-difference-between-angular-route-and-angular-ui-router)
* [Why UI Router?](http://www.funnyant.com/angularjs-ui-router/)
