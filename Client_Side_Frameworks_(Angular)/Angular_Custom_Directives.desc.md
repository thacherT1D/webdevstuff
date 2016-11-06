## Objectives

* Explain what a custom directive.
* Explain why a custom directive is useful.
* Build a simple custom directive.
* Explain how angular matches directives.
* Explain isolate scope in directives and why they are useful.
* Build an isolated scope directive.

## What are custom directives?

Recall from our lesson lesson last week, a directive is marker on a DOM element that tell Angular to attach a specified behavior to that DOM element or even transform the DOM element and its children. We've seen many examples of built-in directives including the following:

* ngRepeat - The ability to repeat DOM elements (and their children) for each item in an array (example: `ng-repeat="todo in todoListCtrl.todos()"`).
* ngShow - The ability to show a DOM element if a condition is true. Otherwise, it will hide it. (example: `ng-show="authCtrl.isLoggedIn()"`).
* ngClass - The ability to apply a class onto a DOM element should a condition be true. (example: `ng-class="{ selected: choiceCtrl.isSelected(item) }"`)

We have also built controllers which are designed to help define a behavior that your view (ie. the HTML) has access to. Using the above examples we see the controller provide the following information:

* The list of todos for the ngRepeat directive to iterate over
* The state of a user being logged in or not so that we determine with ngShow whether to display the user information.
* The ability to check whether an element should appear selected or not based on whether the item is actually selected.

A custom directive combines these two ideas, that is, a custom directive allows the developer to provide a marker on a DOM node that is tied to the behavior of a specific controller. To put it another way, it's the ability to create a controller with access to the DOM element itself.

### Exercise

Turn and talk to your neighbor and explain what is a custom directive. After a few minutes, your instructor will cold call on the class ask what you discussed.

## Why are custom directives useful?

Put simply, directives are an easy way to create custom, _reusable_ components which alter and extend your HTML. They are very flexible and, as a result, very powerful. Because of this, custom directives can take a lot of time to become familiar with.

This flexibility can create many use cases. For example:

* Any time we want to create a component that contains custom functionality and is used in different controllers, we can use it everywhere as a standalone view.
* As an extension to templates, custom directives allow you to create common templates and reuse them.
* To manipulate the DOM. Directives allow us to manipulate the DOM on specified elements.

**Exercise**

Write down in your own words why a custom directive is useful. Think of a couple examples where a directive could be useful in your projects. After you are done, turn and talk to your neighbor to share your examples.

## How to build a directive

Let's begin in making a directive that allows us to reuse a specific template. To begin, let's create a new project.

```shell
brunch new directives-example --skeleton kmcgrady/with-angular
```

Let's then create a new folder in our `app` directory to store all of our directives. Although we usually group common functionality into folders, we'll create one folder to hold everything.

```shell
cd directives-example
mkdir app/directives
touch app/directives/angular-logo.directive.js
```

In our `app/directives/angular-logo.directive.js` file, write the following:

```javascript
const angularLogo = function() {
  return {
    restrict: 'EA',
    template: '<img src="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png" style="width: 200px; height: 212px;">'
  };
};

export default angularLogo;
```

To build a directive, your file needs to export the function that returns an object. This object above has the following keys:

* `restrict` - This defines how the directive can be used. There are one of four types it could be:
  * Element (E) - An HTML element.
  * Attribute (A) - An HTML attribute.
  * Class (C) - A CSS class (not recommended)
  * Comment (M) - HTML comment (not recommended)
* `template` - A string of HTML to use as the template.

In this case, we allow the directive to be used as an HTML element as well as an attribute. We'll see in a minute how we can use it below. Next, we need to include it in our `app.js`, so that Angular JS knows how to use it.

```javascript
import angular from 'angular'

import angularLogo from './directives/angular-logo.directive'

angular.module('my-app', [])
  .directive('gsAngularLogo', angularLogo);
```

We register a directive in our Angular module using the `directive` function. That function takes in a name as well as the function we exported in our directive file. Note that the name is in camelCase and we prefix it with "gs". It is a common convention to define a common prefix for all of your custom directives. This avoids the risk of our directive names of colliding with other directives. We used "gs" to mean Galvanize School.

Let's update the HTML in `app/assets/index.html` to use our directive as both an element and as an attribute.

```html
<!DOCTYPE html>
<html ng-app="my-app">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello world</title>
    <link rel="stylesheet" href="/vendor.css">
    <link rel="stylesheet" href="/app.css">
  </head>
  <body>
    <gs-angular-logo></gs-angular-logo>

    <div gs-angular-logo></div>

    <script src="/vendor.js"></script>
    <script src="/app.js"></script>
    <script>require('app');</script>
  </body>
</html>
```

A few things to notice with our new custom directive:

* Our directive is called `gsAngularLogo` in our `app.js`, but in the `index.html` we use it by calling it `gs-angular-logo`. Angular runs a process called **normalization** that converts the directive name from camelCase to kebab-case.
* The first example uses the directive as an element, that is, the tag name is the name of our directive. The second example uses the directive as an attribute.

Now run your server, ensure there are no errors, and open up your browser to `localhost:8000`:

```shell
npm start
```

You should see the following:

![Angular JS Directive Example](http://i.imgur.com/H7lI8fq.png)

### Template URLs

We used the specific key, `template`, to define the HTML to be included. This may be nice for small amounts of HTML, but this can get very complex for larger amounts. In this case, we are allowed to create a file to store the HTML and access it in our directive. First, let's create the HTML file in a directory called `views`. It needs to live in our `assets` directory so that it can be copied over via brunch.

```shell
mkdir app/assets/views
touch app/assets/views/angular-logo.html
```

Inside `app/assets/views/angular-logo.html`, copy over the template in our directive. There is no need to include any of the traditional boilerplate.

```html
<img src="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png" style="width: 200px; height: 212px;">
```

Next update our directive in `app/directives/angular-logo.directive.js`

```javascript
const angularLogo = function() {
  return {
    restrict: 'EA',
    templateUrl: 'views/angular-logo.html'
  };
};

export default angularLogo;
```

Ensure there are no errors in compilation and check for the update in the browser. You should see no changes. The only difference is in how the template is retrieved. Originally, the template was provided in the directive itself. Instead, it is included in a separate file. You can see the file being downloaded from your developer tools in your network tab.

![Chrome Dev Tools Network Tab](http://i.imgur.com/iU7X2kV.png)

**Exercise**

Take 11 minutes to build the following:

1. Create a folder named `angularLogoDirective` and create 3 files inside it `app.js`, `index.html`, and `logo-view.html`.

1. In app.js create an angular app named `logoDirectiveApp`, and add a directive named `gsLogoDirective` that references the logo-view.html

1. In logo-view.html, add the following:
```html
<img src="http://www.galvanize.com/wp-content/themes/galvanize/img/galvanize-logo.svg" width="169px">
```

1. In index.html, create an html page that references your `ng-app="logoDirectiveApp"`, pulls in angular and then your app.js, and contains the following in the body:

```html
<p>Element directive:</p>
<gs-logo-directive></gs-logo-directive>
<p>Attribute directive:</p>
<div gs-logo-directive></div>
```

1. From the shell in the `angularLogoDirective` folder run `python -m SimpleHTTPServer 8080`

Congrats! You have just created and rendered a custom directive 2 times! Go to `localhost: 8080` and check out your 2 simple directives.

If you still have time, add this:
```html
<p>Class directive:</p>
<div class="gs-logo-directive"></div>
```

does it work? why or why might it not work? Explore the restrict option on the directive to learn how to make this load.

**Note** There is a 4th way of matching directives using comments, however this approach is only for legacy apps. The preferred approach is using elements or attributes only.

## Matching Directives

As noted in the Angular docs, understanding what is going on under the hood is a crucial part of learning to work with directives, so we advise you to explore further with how Angular's HTML compiler determines how to use a given directive. Here we have the time for only a quick overview of normalization and directive types.

#### Normalization

The docs describe normalization as how:

Angular **normalizes** an element's tag and attribute name to determine which elements match which directives. We typically refer to directives by their case-sensitive camelCase normalized name (e.g. ngModel). However, since HTML is case-insensitive, we refer to directives in the DOM by lower-case forms, typically using dash-delimited attributes on DOM elements (e.g. ng-model).

#### Directive Types

There are 4 basic directive types that `$compile` can match ($compile is a part of the angular nomalization process, if you are interested, it is a great subject for further exploration in the docs). We have already seen them, however again they are `Element`, `Attribute`, `Class name`, and `Comment`.

Angular best practice is to prefer Element and Attribute forms of directives for all your needs.

**Exercise**

Turn to a neighbor and explain how angular matches directives.

## Directives And Scope

Let's add some data to a controller and see how it interacts with the directive.  In the following example, we'll show a yoyo's details in our directive:

`app.js`:


```js
var app = angular.module('yoyoDirectiveApp', [])

app.controller('YoyoController', YoyoCtrl);

function YoyoCtrl(){
  this.yoyo = {
    name: 'Duncan Metal Drifter',
    img: "http://www.toysrus.com/graphics/tru_prod_images/Duncan-Metal-Drifter-Pro-Yo-Yo--pTRU1-8444206dt.jpg"
  }
}

app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: 'yoyo-details.html',
  };
});
```

`yoyo-details.html`

```html
<h3>{{yoyo.name}}</h3>
<img ng-src="{{yoyo.img}}">
```

`index.html`:

```html
<!DOCTYPE html>
<html ng-app="yoyoDirectiveApp">
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
</head>
<body ng-controller="YoyoController">
  <gs-yoyo-details></gs-yoyo-details>
</body>
</html>
```

We can see here that the directive has access to the yoyo from the controller's scope.  By default, when a directive is placed inside of a controller, it will have access to everything on its parent controller's scope.

**Exercise** add a `message` property to the `YoyoController`, then show the message both inside and outside of the directive.

There are a couple of problems with this default behavior of the directive having access to everything in the parent's scope. For one, it's often not a good idea to have your directives so tightly coupled to your controller.  If you change the variable name in the  controller or try to use the directive again somewhere else, you may run into errors. Also, from a practical standpoint you may not want your directive to have access to all of the information in your controller. For example, if you have a list of yoyos and a custom directive governing the display of a yoyo's information, that directive only needs to know about one yoyo, not all of them.

The solution to these problems involves creating an `isolate scope` for the directive. Before doing this, let's see what happens if we don't create an isolate scope.

**Exercise** Change `this.yoyo` to `this.yoyos`, an array of yoyo objects. In your view, render each yoyo's information using your custom directive.

Possible solution:

`app.js`

```js
var app = angular.module('yoyoDirectiveApp', [])

app.controller('YoyoController', YoyoCtrl);

function YoyoCtrl(){
  this.yoyos = [{
    name: "Duncan Metal Drifter",
    img: "http://www.toysrus.com/graphics/tru_prod_images/Duncan-Metal-Drifter-Pro-Yo-Yo--pTRU1-8444206dt.jpg"
  }, {
    name: "Duncan Hello Kitty Pro Yo yoyo",
    img: "http://cdn6.bigcommerce.com/s-8ndhalpa/products/277/images/613/duncan-hello-kitty-pro-yo-yoyo-15__90815.1404161701.1280.1280.jpg"
  }];
}

app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: 'yoyo-details.html',
  };
});
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en" ng-app="yoyoApp">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"></script>
  <script src="./js/app.js"></script>
</head>
<body ng-controller="YoyoController">
  <gs-yoyo-details ng-repeat="yoyo in yoyos"></gs-yoyo-details>
</body>
</html>
```

`yoyo-details.html`

```html
<h3>{{ yoyo.name }}</h3>
<img ng-src="{{ yoyo.img }}">
  ```
## Isolate Scope

When building a custom directive that you want to use in multiple controllers (which is basically all the time), you will want to uncouple the directive from the specific scope of the controller. We can create an isolate scope by using the `scope` option when we create our directive.

This allows us to use a directive in a specific controller more than once, and allows us to use a directive wherever we want independent of the controller that it is residing inside.

As you will see, this mirrors a component structure which is used in both Angular 2 and React to create standalone pieces of code that can be layered and connected to one another.

Here's the basic syntax:

```javascript
app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: '../yoyo-details.html',
    scope: {
      yoyoInDirective: '=yoyoAttribute'
    }
  }
})
```

If you refresh the page, you'll see that the yoyos have disappeared -- our app is broken! Let's take a moment to understand how isolate scope is working in this case, so that we can debug the issue.

The value of `scope` must be an object. The keys in this object (e.g. `yoyoInDirective` correspond to how Angular expects you to name your data in the directive. In this case, since we used a key of `yoyoInDirective`, we should refactor our `yoyo-details.html` as follows:

```html
<h3>{{ yoyoInDirective.name }}</h3>
<img ng-src="{{ yoyoInDirective.img }}">
```

As you can see, the value corresponding to `yoyoDirective` is `'=yoyoAttribute'`. Let's ignore the equals sign for a moment (we'll get to it later). The 'yoyoAttribute' corresponds to an _attribute name_ that we must use when passing data from our controller to our directive. Passing data via attributes is how we get the parts of the scope that we care about into our directive.

Let's just focus on that for a minute. Passing data via attributes is how we get parts of the scope that we care about into our directive.

In the current example, this means we need to include an attribute so that our custom directive looks like this:

```html
<gs-yoyo-details yoyo-attribute="yoyo" ng-repeat="yoyo in view.yoyos"></gs-yoyo-details>
```

Let's change the placeholder name we're repeating over from `yoyo` to `yoyoFromRepeat`. Then our HTML would look like this:

```html
<gs-yoyo-details yoyo-attribute="yoyoFromRepeat" ng-repeat="yoyoFromRepeat in view.yoyos"></gs-yoyo-details>
```

So, how does data about an individual yoyo get passed from our controller to our directive?

1. We iterate over each `yoyo` in the controller's `yoyos` array, storing the data in `yoyoFromRepeat`.

1. Each `yoyoFromRepeat` gets passed into our custom directive via the `yoyo-attribute` attribute.

1. In the html for our custom directive, we have access to `yoyoFromRepeat`'s data in `yoyoInDirective`. This condition is possible because we told our directive that `yoyoInDirective` should correspond to whatever we pass into the directive via the `yoyo-attribute` attribute.

Of course, we've now got two different names for our data depending on where we are (`yoyoFromRepeat` and `yoyoInDirective`), plus a third name for the attribute on our directive. It's common to name all of these the same; the downside with this approach is that if we name everything `yoyo`, it's much less clear how the directive's isolate scope is connected to the controller's scope.

**Exercise** Fun fact: if in your scope you have a key and value with the same name (e.g. `foo: '=foo'`), you can omit the name in the value (e.g. `foo: '='`) and Angular will still know what to do! Use this to refactor your directive to use yoyo and '='.

**Exercise** After completing the previous two exercises, try replacing one of the strings `yoyo` somewhere in your app with the string `foo`. Where else do you need to replace `yoyo` by `foo` to get your app working again?

## Extending Your Knowledge of Custom Directives

Directives can do even more than what we have so far seen. Custom directives can be used to manipulate the DOM, to wrap other directives, to add event listeners to the DOM, to communicate across directives, and even more.

Take some time and head back to the docs [here](https://docs.angularjs.org/guide/directive) to extend your understanding of custom directives.

**EXERCISE / HOMEWORK**

Create an app that uses the [pokemon api](http://pokeapi.co/docsv1/).  The app should first make a request to the [pokedex](http://pokeapi.co/docsv1/#pokedex) to get all possible pokemon.  Then randomly select 5 pokemon to display.  The app should display the pokemon's name, types, name of moves (limit it to 6), and a sprite for the pokemon. Use a custom directive to display the pokemon.

The app should use a custom directive for each pokemon (eg `pokemon-item`).

**Bonus**: For the pokemon fans out there, write an algorithm that randomly picks two pokemon and decide who would win.  I do not know anything about the pokemon game, so this would be up to you to figure out.

![](http://s8.postimg.org/eo2kbbnb9/pokemon.png)

**Exercise**

Using everything you've learned about custom directives, refactor your Reddit clone to use them and clean up your HTML! Your refactor should use at least two custom directives: one for the add post form, and one for an individual post. If you want to push yourself, you should also add a custom directive for the comment area of a post, which should be nested inside of your custom post directive. You will need to jump into the documentation and learn about how to nest directives to solve this aspect of the assignment.
