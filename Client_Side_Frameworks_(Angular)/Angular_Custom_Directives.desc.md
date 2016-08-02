## Objectives

1. Explain what a custom directive is and why we would use it.

1. Build a custom directive that uses isolate scope to function as a standalone component.

## The What and Why of Custom Directives

To begin this lesson, we shall start with some guiding questions:

1. What is a custom directive, and
1. Why would we use one?

The angular docs describe directives as:

Markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler ($compile) to attach a specified behavior to that DOM element (e.g. via event listeners), or even to transform the DOM element and its children.

So what does that mean?

In a line, that means that directives are an easy way to create custom, reusable components which alter and extend your HTML. They are very flexible and they are very powerful. Because of this, custom directives have many use cases.

Some examples:

1. Any time we want to create a component that contains custom functionality and is used in different controllers, we can isolate the scope of the directive and use it everywhere as a standalone chunk.

1. As an extension to templates, custom directives allow you to create template chunks of custom HTML.

1. To manipulate the DOM. Directives allow us to manipulate the DOM on specified elements.

**Exercise**

Spend 6 minutes reading through the angular docs on directives and determine 2 more use cases. Afterward you will discuss these use cases with your neighbor.

The angular guide to directives is [here.](https://docs.angularjs.org/guide/directive)

## A Simple Example of a Directive

Let's take a look at a simple example of a directive before we go any further, there are 3 pieces, the directive view, the app.js, and the index.html:

`app.js`:

```javascript
var app = angular.module('simpleDirectiveApp', [])
app.directive('gsAngularLogo', function() {
  return {
    templateUrl: 'simple-directive.html'
  };
});
```

`simple-directive.html` is our directive templateUrl referenced above, it is html and looks like this:

```html
<img src="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png" />
```
And our `index.html` would look like this:

```html
<!DOCTYPE html>
<html ng-app="simpleDirectiveApp">
<head>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
</head>
<body>
  <gs-angular-logo></gs-angular-logo>
</body>
</html>
```

A few things to notice with our new custom directive:

1. Our directive is called `gsAngularLogo` in our `app.js`but in the `index.html` we use it by calling it `gs-angular-logo` (This is called normalization).

1. We prefixed our directive name with gs (galvanize school).  According to the angular docs, adding a prefix is a best practice so that the chance of a name collision is minimized.

1. The built-in directives we've seen so far (`ngModel`, `ngClass`, `ngRepeat`, etc.) are called in the view by adding them as attributes of an html tag. <br /> For example: `<html ng-app="simpleDirectiveApp">`.  The `ng-app` directive is an attribute of the html tag. However here we name the element itself `<gs-angular-logo>`. We will learn that there are 4 ways to add a directive, though attributes and tag names are generally preferred.

1. The directive calls a function that returns an object with configuration key value pairs. This is a factory that is called when the directive is instantiated.

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

## Directives And Scope

Let's add some data to a controller and see how it interacts with the directive.  In the following example, we'll show a yoyo's details in our directive:

`app.js`:


```js
var app = angular.module('yoyoDirectiveApp', [])

app.controller('YoyoController', ['$scope', function($scope) {
  $scope.view = {};
  $scope.view.yoyo = {name: 'Duncan Metal Drifter',
    img: "http://www.toysrus.com/graphics/tru_prod_images/Duncan-Metal-Drifter-Pro-Yo-Yo--pTRU1-8444206dt.jpg"
  };
}]);

app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: 'yoyo-details.html',
  };
});
```

`yoyo-details.html`

```html
<h3>{{view.yoyo.name}}</h3>
<img ng-src="{{view.yoyo.img}}">
```

`index.html`:

```html
<!DOCTYPE html>
<html ng-app="yoyoDirectiveApp">
<head>
<script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.3/angular.js" type="text/javascript"></script>
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

**Exercise** Change `scope.view.yoyo` to `scope.view.yoyos`, an array of yoyo objects. In your view, render each yoyo's information using your custom directive.

Possible solution:

`app.js`

```js
var app = angular.module('yoyoApp', []);

app.controller('YoyoController', function($scope) {
  $scope.view = {};
  $scope.view.yoyos = [{
    name: "Duncan Metal Drifter",
    img: "http://www.toysrus.com/graphics/tru_prod_images/Duncan-Metal-Drifter-Pro-Yo-Yo--pTRU1-8444206dt.jpg"
  }, {
    name: "Duncan Hello Kitty Pro Yo yoyo",
    img: "http://cdn6.bigcommerce.com/s-8ndhalpa/products/277/images/613/duncan-hello-kitty-pro-yo-yoyo-15__90815.1404161701.1280.1280.jpg"
  }];
});

app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: '../yoyo-details.html'
  }
});
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en" ng-app="yoyoApp">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body ng-controller="YoyoController">
  <gs-yoyo-details ng-repeat="yoyo in view.yoyos"></gs-yoyo-details>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js"></script>
  <script src="./js/app.js"></script>
</body>
</html>
```

`yoyo-details.html`

```html
<h3>{{ yoyo.name }}</h3>
<img ng-src="{{ yoyo.img }}">
  ```
## Isolate Scope

Once you have more than one yoyo, and you have a copy of your custom directive on the page for each yoyo, we can create an isolate scope by using the `scope` option when we create our directive. Here's the basic syntax:

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

**Exercise** Refactor your code to eliminate `yoyoInDirective`, `yoyoAttribute`, and `yoyoFromRepeat` in favor of just `yoyo`.

**Exercise** Fun fact: if in your scope you have a key and value with the same name (e.g. `foo: '=foo'`), you can omit the name in the value (e.g. `foo: '='`) and Angular will still know what to do! Use this to refactor your directive even more.

**Exercise** After completing the previous two exercises, try replacing one of the strings `yoyo` somewhere in your app with the string `foo`. Where else do you need to replace `yoyo` by `foo` to get your app working again?

**EXERCISE**

Create an app that uses the [pokemon api](http://pokeapi.co/docsv1/).  The app should first make a request to the [pokedex](http://pokeapi.co/docsv1/#pokedex) to get all possible pokemon.  Then randomly select 5 pokemon to display.  The app should display the pokemon's name, types, name of moves (limit it to 6), and a sprite for the pokemon. Use a custom directive to display the pokemon.

The app should use a custom directive for each pokemon (eg `pokemon-item`).

**Bonus**: For the pokemon fans out there, write an algorithm that randomly picks two pokemon and decide who would win.  I do not know anything about the pokemon game, so this would be up to you to figure out.

![](http://s8.postimg.org/eo2kbbnb9/pokemon.png)

## Extending Your Knowledge of Custom Directives

Directives can do even more than what we have so far seen. Custom directives can be used to manipulate the DOM, to wrap other directives, to add event listeners to the DOM, to communicate across directives, and even more.

Take some time and head back to the docs [here](https://docs.angularjs.org/guide/directive) to extend your understanding of custom directives.

**EXERCISE / HOMEWORK**

Using everything you've learned about custom directives, refactor your Reddit clone to use them and clean up your HTML! Your refactor should use at least two custom directives: one for the add post form, and one for an individual post. If you want to push yourself, you should also add a custom directive for the comment area of a post, which should be nested inside of your custom post directive. You will need to jump into the documentation and learn about how to nest directives to solve this aspect of the assignment.
