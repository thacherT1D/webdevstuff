## Objectives
- Restrict custom directive usage
- Use `templateUrl` to remove template information from directives.
- Use directive scoping to enforce separation of concerns.

## Custom Directives

Way back in when we studied [Angular Directives](/redirects/articles/4880), we went over built in directives.  These are directives that Angular comes with.  In this lesson, we're going to build our own custom directives. But first...

- Name at least 5 built in directives you've used so far.

### Example 1 - Simple Custom Directive

We are going to make a simple directive that just puts some html on the page.  This is not a great use for directives, but we'll get to more complicated examples later.

`app.js`:

```js
var app = angular.module('Example1', [])  
```

`directives.js`

```js
app.directive('gsAngularLogo', function() {
  return {
    template: '<img src="https://tctechcrunch2011.files.wordpress.com/2015/12/angular_small.png">'
  };
});
```

`index.html`

```html
<body ng-app="Example1">

  <gs-angular-logo></gs-angular-logo>

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
  <script src="directives.js" type="text/javascript"></script>
</body>
```

A few things to notice with our new custom directive:

1. Our directive is called `gsAngularLogo` but in the html we use it by calling it `gs-angular-logo`.
2. We prefixed our directive name with gs (galvanize school).  According to angular docs, adding a prefix is a good practice so that the chance of a name collision is minimized.
3. The built in directives we've seen so far are called in the view by adding them as attributes of an html tag.  For example: `<body ng-app="Example1">`.  The `ng-app` directive is an attribute of the html tag.

These observations lead to a few topics:

**Normalization of Html**

When Angular looks over your html document, it goes through a process called normalization.  The process essentially goes over each tag, looks for Angular directives, and then normalizes the name from dash-delimited name to a camelCase name.  For example, Angular translates `gs-angular-logo` into `gsAngularLogo`.  This process is necessary because dash delimited names are not the only possibility for directives.  For example, `gs_angular_logo` would also be valid.

**EXERCISE 1**

Look through the `Normalization` section of the documentation for [Angular Directives](https://docs.angularjs.org/guide/directive).  Investigate all types of acceptable directive names.  Try all possible formats in the example above.  What is the preferred format for directive naming?

**EXAMPLE 2 - Using Restrict**

In our example, the directive we used creates an `img` tag that displays the angular logo.  We could change our html to look like this as well:

```html
<body>
  <gs-angular-logo></gs-angular-logo>
  <h5 gs-angular-logo></h5>
</body>
```

Take a look at this example in your browser, there should be 2 Angular pictures.

This doesn't really make a lot of sense though.  Angular will add the img tag as a child of the h5 tag.  But our custom directive doesn't really have anything to do with the h5 tag we are claiming to modify.

In this case, it's possible to _restrict_ the custom directive so that it can only be used as an element, rather than an attribute. To do this, we can use the `restrict` option as follows:

`directives.js`

```js
app.directive('gsAngularLogo', function() {
  return {
    restrict: 'E', // 'E' for element
    template: '<img src="https://tctechcrunch2011.files.wordpress.com/2015/12/angular_small.png">'
  };
});
```

With this restriction in place, you should see that `<h5 gs-angular-logo></h5>` no longer renders the image, but `<gs-angular-logo></gs-angular-logo>` does.

**Best Practice**

Use an angular directive as an attribute only when it decorates a tag or somehow relates to it.  Otherwise, create a separate element for the directive. To put it another way, as stated in the Angular docs:

> Use an element when you are creating a component that is in control of the template. The common case for this is when you are creating a Domain-Specific Language for parts of your template. Use an attribute when you are decorating an existing element with new functionality.

**EXERCISE 2**

Update the html inside of your body as follows:

```html
<p>Element directive:</p>
<gs-angular-logo></gs-angular-logo>
<p>Attribute directive:</p>
<h4 gs-angular-logo></h4>
<p>Class directive:</p>
<span class="gs-angular-logo"></span>
```

Note that we're using a custom directive in three ways: as an element, as an attribute, and as a class. When you load the page, what do you see? How could you modify `restrict` to show just the class? Just the attribute? All three?

(As an aside, if you check out the [Angular Custom Directive Documentation](https://docs.angularjs.org/guide/directive) you'll see it's also possible to trigger a directive by comment. However, this feature is included mainly for compatibility with older versions of angular, and shouldn't be used. Stick to elements and attributes.)

**EXAMPLE 3 - Template Url**

Typically, a directive's template will become larger.  To make the directive cleaner, you can use `templateUrl` instead of `template` in the directive.  The `templateUrl` defines an html file that will be requested via ajax and used as the template.

We will be storing our `html` templates in a folder named `templates`.

Create a folder named `templates`. In that folder, create a file named `gsAngularLogo.html`. In that file add:

```js
<img src="https://tctechcrunch2011.files.wordpress.com/2015/12/angular_small.png">
```

Which is what was stored in the `template` key in the previous examples.

The files would look as follows:

`app.js`

```js
var app = angular.module('Example3',[]);
```

`directives.js`

```js
app.directive('gsAngularLogo', function() {
  return {
    restrict: 'E',
    templateUrl: 'templates/gsAngularLogo.html'
  };
});
```

`index.html`

```html
<body ng-app="Example3">

  <gs-angular-logo></gs-angular-logo>

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
  <script src="directives.js" type="text/javascript"></script>
</body>
```

**EXERCISE 3**

In an angular application, create 2 separate custom directives that us `templateUrl`.
Use these 2 separate custom directives in the `index.html`.


### Directives And Scope

Let's add some data to a controller and see how it interacts with the directive.  In the following example, we'll show a yoyo's details in our directive:

**EXAMPLE 4**

`app.js`:

```js
var app = angular.module('Example4', [])
```

`controllers.js`

```js
app.controller('YoyoController', [function() {
  var vm = this;
  vm.yoyo = {name: 'Duncan Metal Drifter',
    img: "http://www.toysrus.com/graphics/tru_prod_images/Duncan-Metal-Drifter-Pro-Yo-Yo--pTRU1-8444206dt.jpg"
  };
}]);
```

`directives.js`

```js
app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: 'templates/yoyo-details.html',
  };
});
```

`templates/yoyo-details.html`

```html
<h3>{{YC.yoyo.name}}</h3>
<img ng-src="{{YC.yoyo.img}}">
```

`index.html`:

```html
<body ng-app="Example4" ng-cloak>
  <div ng-controller="YoyoController as YC">
    <gs-yoyo-details></gs-yoyo-details>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
  <script src="controllers.js" type="text/javascript"></script>
  <script src="directives.js" type="text/javascript"></script>
</body>
```

We can see here that the directive has access to the yoyo from the controller's scope.  By default, when a directive is placed inside of a controller, it will have access to everything on its parent controller's scope.

**EXERCISE 4**

Add a `message` property to the `YoyoController`, then show the message both inside and outside of the directive.

There are a couple of problems with this default behavior of the directive having access to everything in the parent's scope. For one, it's often not a good idea to have your directives so tightly coupled to your controller.  If you change the variable name in the  controller or try to use the directive again somewhere else, you may run into errors. Also, from a practical standpoint you may not want your directive to have access to all of the information in your controller. For example, if you have a list of yoyos and a custom directive governing the display of a yoyo's information, that directive only needs to know about one yoyo, not all of them.

The solution to these problems involves creating an `isolate scope` for the directive. Before doing this, let's see what happens if we don't create an isolate scope.

**EXERCISE 5**

Change `vm.yoyo` to `vm.yoyos`, an array of yoyo objects. In your view, render each yoyo's information using your custom directive.

Possible solution:

`app.js`

```js
var app = angular.module('Exercise5',[]);
```

`controllers.js`

```js
app.controller('YoyoController', [function() {
  var vm = this;
  vm.yoyos = [{
    name: "Duncan Metal Drifter",
    img: "http://www.toysrus.com/graphics/tru_prod_images/Duncan-Metal-Drifter-Pro-Yo-Yo--pTRU1-8444206dt.jpg"
  }, {
    name: "Duncan Hello Kitty Pro Yo yoyo",
    img: "http://cdn6.bigcommerce.com/s-8ndhalpa/products/277/images/613/duncan-hello-kitty-pro-yo-yoyo-15__90815.1404161701.1280.1280.jpg"
  }];
}]);
```

`directives.js`

```js
app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: 'templates/yoyo-details.html',
  };
});
```

`index.html`

```html
  <div ng-controller="YoyoController as YC">
    <gs-yoyo-details ng-repeat="yoyo in YC.yoyos"></gs-yoyo-details>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
  <script src="controllers.js" type="text/javascript"></script>
  <script src="directives.js" type="text/javascript"></script>
```

`templates/yoyo-details.html`

```html
<h3>{{yoyo.name}}</h3>
<img ng-src="{{yoyo.img}}">

```

#### Isolate Scope

**EXERCISE 6**

Once you have more than one yoyo, and you have a copy of your custom directive on the page for each yoyo, we can create an isolate scope by using the `scope` option when we create our directive. Here's the basic syntax:

```javascript
app.directive('gsYoyoDetails', function() {
  return {
    templateUrl: 'templates/yoyo-details.html',
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

In the current example, this means we need to include an attribute so that our custom directive looks like this:

```html
<gs-yoyo-details yoyo-attribute="yoyo" ng-repeat="yoyo in YC.yoyos"></gs-yoyo-details>
```

At the risk of making things overly verbose, let's change the placeholder name we're repeating over from `yoyo` to `yoyoFromRepeat`. Then our HTML would look like this:

```html
<gs-yoyo-details yoyo-attribute="yoyoFromRepeat" ng-repeat="yoyoFromRepeat in YC.yoyos"></gs-yoyo-details>
```

So, how does data about an individual yoyo get passed from our controller to our directive?

1. We iterate over each `yoyo` in the controller's `yoyos` array, storing the data in `yoyoFromRepeat`.
2. Each `yoyoFromRepeat` gets passed into our custom directive via the `yoyo-attribute` attribute.
3. In the html for our custom directive, we have access to `yoyoFromRepeat`'s data in `yoyoInDirective`. This condition is possible because we told our directive that `yoyoInDirective` should correspond to whatever we pass into the directive via the `yoyo-attribute` attribute.

Of course, we've now got two different names for our data depending on where we are (`yoyoFromRepeat` and `yoyoInDirective`), plus a third name for the attribute on our directive. It's common to name all of these the same; the downside with this approach is that if we name everything `yoyo`, it's much less clear how the directive's isolate scope is connected to the controller's scope.

**EXERCISE 6.1** Refactor your code to eliminate `yoyoInDirective`, `yoyoAttribute`, and `yoyoFromRepeat` in favor of just `yoyo`.

**EXERCISE 6.2** Fun fact: if in your scope you have a key and value with the same name (e.g. `foo: '=foo'`), you can omit the name in the value (e.g. `foo`: '=') and Angular will still know what to do! Use this to refactor your directive even more.

**EXERCISE 7**
Create an app that uses the JSON data located in the `user.json` file in the `Exercise_7` folder. Create a 'card' for each user, have each piece of information be on a separate line. The data is loaded using the `$http` service, and is available to use in the `vm.users` variable.

The app should use a custom directive for each user (eg `user-card`).

**Bonus**: Use css floats to position the cards next to each other, extra bonus points if it is responsive


## Resources
- [AngularJS Directives Tutorial - Part 1 - Demystifying Angular Directives](https://www.youtube.com/watch?v=0r5QvzjjKDc)
- [angular-custom-directives-part-1](https://github.com/gSchool/angular-custom-directives-part-1)
