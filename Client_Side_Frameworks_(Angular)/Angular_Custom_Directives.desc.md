## Objectives

* Explain the different ways of using a custom Angular directive.
* Create a custom Angular directive.

## Simple Custom Directive

We are going to make a simple directive that just puts some html on the page.  This is not a great use for directives, but we'll get to more complicated examples later.

`app.js`:

```js
var app = angular.module('simpleDirectiveApp', [])
app.directive('gsAngularLogo', function() {
  return {
    template: '<img src="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png">'
  };
});
```

Our `index.html` would look like this:

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

1. Our directive is called `gsAngularLogo` but in the html we use it by calling it `gs-angular-logo`.
2. We prefixed our directive name with gs (galvanize school).  Acording to angular docs, adding a prefix is a good practice so that the chance of a name collision is minimized.
3. The built in directives we've seen so far are called in the view by adding them as attributes of an html tag.  For example: `<html ng-app="simpleDirectiveApp">`.  The `ng-app` directive is an attribute of the html tag.

These observations lead to a few topics:

**Normalization of Html**

When angular looks over your html document, it goes through a process called normalization.  The process essentially goes over each tag, looks for angular directives, and then normalizes the name from dash-delimited name to a camel case name.  For example, angular translates `gs-angular-logo` into `gsAngularLogo`.  This process is necessary because dash delimited names are not the only possiblity for directives.  For example, `gs_angular_logo` would also be valid.

**EXERCISE**

Look through [the normalization section of the angular docs on directives](https://docs.angularjs.org/guide/directive).  Investigate all types of acceptable directive names.  Try all possible formats in the example above.  What is the preferred format for directive naming?

**Using Restrict**

In our example, the directive we used creates an img tag that displays the angular logo.  We could change our html to look like this as well:

```html
<body>
  <h5 gs-angular-logo></h5>
</body>
```

This doesn't really make a lot of sense though.  Angular will add the img tag as a child of the h5 tag.  But our custom directive doesn't really have anything to do with the h5 tag we are claiming to modify.

In this case, it's possible to _restrict_ the custom directive so that it can only be used as an element, rather than an attribute. To do this, we can use the `restrict` option as follows:

`app.js`:

```js
var app = angular.module('simpleDirectiveApp', [])
app.directive('gsAngularLogo', function() {
  return {
    restrict: 'E', // 'E' for element
    template: '<img src="https://lh6.googleusercontent.com/-TlY7amsfzPs/T9ZgLXXK1cI/AAAAAAABK-c/Ki-inmeYNKk/w749-h794/AngularJS-Shield-large.png">'
  };
});
```

With this restriction in place, you should see that `<h5 gs-angular-logo></h5>` no longer renders the image, but `<gs-angular-logo></gs-angular-logo>` does.

**Best Practice**

Use an angular directive as an attribute only when it decorates a tag or somehow relates to it.  Otherwise, create a separate element for the directive. To put it another way, as stated in the Angular docs:

> Use an element when you are creating a component that is in control of the template. The common case for this is when you are creating a Domain-Specific Language for parts of your template. Use an attribute when you are decorating an existing element with new functionality.

**EXERCISE**

Update the html inside of your body as follows:

```html
  <p>Element directive:</p>
  <gs-angular-logo></gs-angular-logo>
  <p>Attribute directive:</p>
  <h4 gs-angular-logo></h4>
  <p>Class directive:</p>
  <p class="gs-angular-logo"></p>
```

Note that we're using a custom directive in three ways: as an element, as an attribute, and as a class. When you load the page, what do you see? How could you modify `restrict` to show just the class? Just the attribute? All three?

(As an aside, if you check out the [docs](https://docs.angularjs.org/guide/directive) you'll see it's also possible to trigger a directive by comment. However, this feature is included mainly for compatibility with older versions of angular, and shouldn't be used. Stick to elements and attributes.)

**Template Url**

Typically a directive's template will become larger.  To make the directive cleaner, you can use `templateUrl` instead of `template` in the directive.  The `templateUrl` defines an html file that will be requested via ajax and used as the template.

**EXERCISE**

Fix our example to use `templateUrl` instead of template.  **HINT**: Keep in mind that the request for the `templateUrl` is via **ajax**.

## Directives And Scope

Let's add some data to a controller and see how it interacts with the directive.  In the following example, we'll show a yoyo's details in our directive:

`app.js`:


```js
var app = angular.module('yoyoDirectiveApp', [])

app.controller('YoyoController', ['$scope', function($scope) {
  $scope.yoyo = {name: 'Duncan Metal Drifter',
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
<h3>{{yoyo.name}}</h3>
<img ng-src="{{yoyo.img}}">
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

### Isolate Scope

Once you have more than one yoyo, and you have a copy of your custom directive on the page for each yoyo, we can create an isolate scope by using the `scope` option when we create our directive. Here's the basic syntax:

```javascript
app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: '../yoyo-details.html',
    scope: {
      yoyoInDirective: '=yoyoAttribue'
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

As you can see, the value corresponding to `yoyoDirective` is `'=yoyoAttribute'`. Let's ignore the equals sign for a moment (we'll get to it later). The 'yoyoAttribue' corresponds to an _attribute name_ that we must use when passing data from our controller to our directive. Passing data via attributes is how we get the parts of the scope that we care about into our directive.

In the current example, this means we need to include an attribute so that our custom directive looks like this:

```html
<gs-yoyo-details yoyo-attribute="yoyo" ng-repeat="yoyo in view.yoyos"></gs-yoyo-details>
```

At the risk of making things overly verbose, let's change the placeholder name we're repeating over from `yoyo` to `yoyoFromRepeat`. Then our HTML would look like this:

```html
<gs-yoyo-details yoyo-attribute="yoyoFromRepeat" ng-repeat="yoyoFromRepeat in view.yoyos"></gs-yoyo-details>
```

So, how does data about an individual yoyo get passed from our controller to our directive?

1. We iterate over each `yoyo` in the controller's `yoyos` array, storing the data in `yoyoFromRepeat`.
2. Each `yoyoFromRepeat` gets passed into our custom directive via the `yoyo-attribute` attribute.
3. In the html for our custom directive, we have access to `yoyoFromRepeat`'s data in `yoyoInDirective`. This conndtion is possible because we told our directive that `yoyoInDirective` should correspond to whatever we pass into the directive via the `yoyo-attribute` attribute.

Of course, we've now got two different names for our data depending on where we are (`yoyoFromRepeat` and `yoyoInDirective`), plus a third name for the attribute on our directive. It's common to name all of these the same; the downside with this approach is that if we name everything `yoyo`, it's much less clear how the directive's isolate scope is connected to the controller's scope.

**Exercise** Refactor your code to eliminate `yoyoInDirective`, `yoyoAttribute`, and `yoyoFromRepeat` in favor of just `yoyo`.

**Exercise** Fun fact: if in your scope you have a key and value with the same name (e.g. `foo: '=foo'`), you can omit the name in the value (e.g. `foo: '='`) and Angular will still know what to do! Use this to refactor your directive even more.

**Exercise** After completing the previous two exercises, try replacing one of the strings `yoyo` somewhere in your app with the string `foo`. Where else do you need to replace `yoyo` by `foo` to get your app working again?

**EXERCISE**

Create an app that uses the [pokemon api](http://pokeapi.co/docs/).  The app should first make a request to the pokedex to get all possible pokemon.  Then randomly select 5 pokemon to display.  The app should display the pokemon's name, types, name of moves (limit it to 6), and a sprite for the pokemon. Use a custom directive to display the pokemon.

The app should use a custom directive for each pokemon (eg `pokemon-item`).

**Bonus**: For the pokemon fans out there, write an algorithm that randomly picks two pokemon and decide who would win.  I do not know anything about the pokemon game, so this would be up to you to figure out.

![](http://s8.postimg.org/eo2kbbnb9/pokemon.png)

## DOM Manipulation

Directives become much more powerful when they start manipulating the DOM.  Typically, you will be controlling the DOM with Angular's `link` method. (There's a related method, called `compile`, which we won't cover. Research it on your own if you're curious!)

The `link` method is used to manipulate the DOM in your directive.  Below is a directive that uses `link` to change the background color of an element whenever it is moused over.

`app.js`

```js
var app = angular.module('mouseOverDirectiveApp', [])

app.directive('gsChangeBackground', function() {
  return {
    link: function(scope, element, attrs) {

      var oldColor = element.css('background-color');

      element.on('mouseenter', function(event) {
        element.css('background-color', 'yellow');
      });

      element.on('mouseleave', function(event) {
        element.css('background-color', oldColor);
      })
    }
  };
});
```

`index.html`

```html
<!DOCTYPE html>
<html ng-app="mouseOverDirectiveApp">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js" type="text/javascript"></script>
<script src="app.js" type="text/javascript"></script>
</head>
<body>
  <div gs-change-background style="background-color: red">Hello World!</div>
</body>
</html>
```

**EXERCISE**

How is the code able to call `element.on` and `element.css`?  What type of object is it?  Look in the angular docs for all available methods.

**EXERCISE**

The `gsChangeBackground` directive could be more customizable.  Change the code so that the user of the directive can set an attribute on the tag that specifies what the new background color should be on mouse enter.  Also, add the ability for the user to change the text color on mouse enter as well.  If no new text color is specified, the text color should not change.  Lastly, our directive only makes sense in one context.  Add a restriction to the directive so that it can only be used in the correct way.  You'll have to figure out which way that is!

## Directive Controllers

You can attach controllers to your custom directives by using the `controller` property. Adding a controller to a directive can be a helpful way to refactor out business logic that might otherwise live inside of your `link` method, making it more difficult to read and maintain.

Here's the syntax for defining a controller from within your directive:

`index.html`

```html
<!DOCTYPE html>
<html ng-app="circleApp">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js" type="text/javascript"></script>
<script src="app.js" type="text/javascript"></script>
<style>
  .circle {
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    line-height: 100px;
    text-align: center;
  }
</style>
</head>
<body>
  <gs-big-red-circle></gs-big-red-circle>
</body>
</html>
```

`app.js`

```js
var app = angular.module('circleApp', []);

app.directive('gsBigRedCircle', function() {
  return {
    controller: function($scope) {
      $scope.view = {};
      $scope.view.sayHi = function() {
        alert("Hi! Thanks for clicking on me!");
      };
    },
    template: '<div class="circle">Click me!</div>',
    link: function(scope, element, attrs) {

      element.on('click', function() {
        scope.view.sayHi();
      });

    }
  };
});
```

Notice that our `link` method has access to the `sayHi` method from the directive's controller.

**EXERCISE**

Create a simple dice rolling app in angular:

[![https://gyazo.com/09b4a777a7049846b6ba0976e6972fe6](https://i.gyazo.com/09b4a777a7049846b6ba0976e6972fe6.gif)](https://gyazo.com/09b4a777a7049846b6ba0976e6972fe6)

When the user hovers over the square, the cursor should change to a pointer, and when the user clicks, a random number between 1 and 6 should display.

Use a custom directive for the die, and include a controller for your directive which encapsulates the logic of generating the random number. Include a `link` method to handle all DOM manipulation. Note: you should not have a `controllers.js` file for this exercise!

**Bonus** Use images rather than numbers, so that it looks like an actual die!
**Bonus** Keep track of how many times each value occurs in a table that's displayed to the user.
**Bonus** Include a dropdown that lets the user select how many dice they would like to roll (e.g. rolling two dice at once, rather than one).

## Nested Directives

Sometimes you may want to include one directive inside of another; in such a case, you might also want the child directive to have access to the parent directive's controller. In order to do this, you need to use the `require` property on the child directive.

For example, suppose you have a custom directive called `gs-parent`, and another custom directive called `gs-child`, and that your template for `gs-parent` includes a `gs-child` directive inside of it. If the parent directive's controller has a method you want to access from the child directive, you can do something like this in your `directives.js`:

```js
app.directive('gsParent', function() {
  return {
    templateUrl: 'partials/parent.html',
    controller: function($scope) {
      $scope.view = {};
      $scope.view.parentMessage = function() {
        alert("I live on the parent!");
      };
    },
  };
});

app.directive('gsChild', function() {
  return {
  	templateUrl: 'partials/child.html',
    link: function(scope, element, attrs) {
      element.on('click', function() {
        scope.view.parentMessage();
      });
    }
  };
});
```

**EXERCISE** Flesh out the rest of this example app to make these directives work.

Note that while the above code works, it's not a great practice because we haven't concerned ourselves with isolating scope. It's possible to require a parent directive's controller in a child directive using the `require` property. There are plenty of resources online if you'd like to learn more about this; one relatively short tutorial can be found [here](https://thinkster.io/egghead/directive-communication).

**EXERCISE** Create a simple todo app. Users should be able to add and remove todos to a list. Your app should have two directives: one for the list of todos, and one for each individual todo. Inside of the first directive, you should create controller methods to add and delete posts, and then use those methods in the child directive.

**Bonus** Refactor your todo app to `require` the parent directive's controller in the child directive.


## Transclusion

Transclusion isn't something you need to worry too much about right now, but it's a term you'll run into pretty frequently when reading up on custom directives in angular, so it's good to understand what the term means. To understand the concept, let's look at a quick example.

Suppose you're building a photo sharing app, and that each displayed photo can have a caption. If the HTML structure of the caption might vary from image to image, you may not want to use a partial to render the caption, and may want to pass it in directly inside of your custom directive. Here's what that might look like:

`index.html`

```html
<!DOCTYPE html>
<html lang="en" ng-app="photoApp">
<head>
  <meta charset="UTF-8">
  <title>PHOTOS!</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
  <style>
    img { width: 100%; }
  </style>
</head>
<body>
  <gs-photo src="'http://lorempixel.com/output/nightlife-q-c-640-480-2.jpg'">
    <p>Here's a beautiful picture!</p>
  </gs-photo>
  <gs-photo src="'http://lorempixel.com/output/abstract-q-c-640-480-1.jpg'">
    <p><em>This</em> picture is <strong>terrible.</strong></p>
  </gs-photo>
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
  <script src="js/app.js"></script>
  <script src="js/directives.js"></script>
</body>
</html>
```

`partials/photo.html`

```html
<div class="row">
  <div class="col-xs-4 col-xs-offset-4">
    <div class="well">
      <img ng-src="{{src}}">
    </div>
  </div>
</div>
```

We also need to define our directive. Here's how that might look:

`app.js`

```js
var app = angular.module("photoApp", []);
```

`directives.js`

```js
app.directive('gsPhoto', function() {
  return {
    scope: {
      src: "="
    },
    templateUrl: "partials/photo.html"
  };
});
```

When you look at your app, what happens to the photo captions? If you've set things up correctly, you should see that the captions disappear once angular takes over! This is because by default, our custom directives will overwrite any content nested inside of them in our HTML.

If we want our directives to _wrap around_ HTML content, we need to use transclusion. In the simplest case, this is a two step process:

1. Update your directive by setting the value of `transclude` to `true`:

    `directives.js`

    ```js
    app.directive('gsPhoto', function() {
      return {
        scope: {
          src: "="
        },
        templateUrl: "partials/photo.html",
        transclude: true
      };
    });
    ```

2. Add an <ng-transclude> element in your partial, wherever you want the HTML content to appear. For example, a modified partial might look like this:

`partials/photo.html`

```html
<div class="row">
  <div class="col-xs-4 col-xs-offset-4">
    <div class="well">
      <img ng-src="{{src}}">
      <ng-transclude></ng-transclude>
    </div>
  </div>
</div>
```


**EXERCISE** What happens if you move the `ng-transclude` tag in the file above to some other line? How does this change the view?

Tranclusion is a huge topic, and it's easy to get lost down confusing rabbit holes. But if you'd like to push yourself, [here's](http://teropa.info/blog/2015/06/09/transclusion.html) a good place to start.

**EXERCISE**

Using everything you've learned about custom directives, refactor your Reddit clone to use them and clean up your HTML! Your refactor should use at least two custom directives: one for the add post form, and one for an individual post. If you want to push yourself, you should also add a custom directive for the comment area of a post, which should be nested inside of your custom post directive.
