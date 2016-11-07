## Objectives

* Explain what a custom directive.
* Explain why a custom directive is useful.
* Build a simple custom directive with a template.
* Build a custom directive with a controller attached to it.
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

Let's then create a new folder for our directive to display the angular logo in our `app` directory.

```shell
cd directives-example
mkdir app/logo
touch app/logo/angular-logo.directive.js
```

In our `app/logo/angular-logo.directive.js` file, write the following:

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

## Directives And Controllers

As of now, we have created a directive that produces a view no matter what. We can also add the ability to bind it to a controller. We are going to work on an example that manages a single choice to a question. In this case, we have the ability to define it as selected or not.

Let's start with the view HTML. Create a file in `app/views/choice.html`.

```shell
touch app/views/choice.html
```

Inside the file, insert the following HTML.

```html
<div class="choice" ng-class="{ selected: choiceCtrl.isSelected() }" ng-click="choiceCtrl.toggleSelected()">
  I am a choice!
</div>
```

We added some styling to this choice, specifically the class `choice` as well as `selected`. Let's add those styles into the `app/styles/index.css`.

```css
.choice {
  width: 75%;
  height: 200px;
  border: 1px solid;
  text-align: center;
  line-height: 200px;
  user-select: none;
}

.choice:hover {
  width: 75%;
  height: 200px;
  border: 1px solid;
  background-color: #ccc;
  cursor: pointer;
}

.selected {
  background-color: green;
}

.selected:hover {
  background-color: green;
}
```

Based on we defined the view, we expect there to be a controller named `choiceCtrl`. That controller will have the following methods:

* `isSelected()` - checking if the choice is selected or not.
* `toggleSelected()` - changes the state of whether the choice is selected or not.

With this in mind, let's create the controller. We'll create a directory to group all related files to a choice.

```shell
mkdir app/choice
touch app/choice/choice.controller.js
```

Inside of the controller, we have the following:

```javascript
class ChoiceCtrl {
  constructor() {
    this.selected = false;
  }

  toggleSelected() {
    this.selected = !this.selected;
  }

  isSelected() {
    return this.selected;
  }
}

export default ChoiceCtrl;
```

We then need to create the directive. It relies on the controller to manage its behavior, so we need to specify this.

```shell
touch app/choice/choice.directive.js
```

The directive will only be an element in this case.

```javascript
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl'
  };
};

export default choice;
```

Register the controller and the directive in `app/app.js`.

```javascript
import angular from 'angular'

import angularLogo from './logo/angular-logo.directive'

import choice from './choice/choice.directive.js'
import ChoiceCtrl from './choice/choice.controller.js'

angular.module('my-app', [])
  .controller('ChoiceCtrl', ChoiceCtrl)
  .directive('gsAngularLogo', angularLogo)
  .directive('choice', choice);
```

There are two new keys in this object that the directive function returns:

* `controller` - the name of the controller as (to be) defined
* `controllerAs` - the name of the instance of the controller to be created. This will be similar to `ng-controller="controller as controllerAs"`

Add a choice directive to our `app/assets/index.html`

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
    <choice></choice>

    <script src="/vendor.js"></script>
    <script src="/app.js"></script>
    <script>require('app');</script>
  </body>
</html>
```

![Choice Directive Example](http://i.imgur.com/dVMa32S.png)

## Isolated Scope

Let's start with an example of adding multiple choices. Inside your `app/assets/index.html`, add the following:

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
    <choice></choice>
    <choice></choice>
    <choice></choice>

    <script src="/vendor.js"></script>
    <script src="/app.js"></script>
    <script>require('app');</script>
  </body>
</html>
```

Once you save, check your browser and select only one choice. The rest of your choices appear highlighted as well. That doesn't quite make sense!

![Multiple Choices Fail](http://i.imgur.com/KMObfqX.png)

The reason this is because the controller is shared across _all_ choices. To do that, we need to isolate the scope for each directive. Modify your directive in `app/choice/choice.directive.js`

```javascript
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl',
    scope: {}
  };
};

export default choice;
```

By adding the key `scope` to the directive, we isolate the scope to each individual instance. This means that anything defined outside of its scope cannot be used inside. This is a recommended practice, and it is able to pass functionality from the outside scope inside (to be discussed soon).

![Multiple Choices Success](http://i.imgur.com/fyDOCJ3.png)

## Transclusion

Currently, anything we put inside the choice element is erased and is replaced with the template specified. Let's see this by modifying our `app/assets/index.html`.

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
    <choice>I am choice 1.</choice>
    <choice>I am choice 2.</choice>
    <choice>I am choice 3.</choice>

    <script src="/vendor.js"></script>
    <script src="/app.js"></script>
    <script>require('app');</script>
  </body>
</html>
```

We can fix this by using **transclusion**, that is the ability to include elements within the directive into the view itself. We first need to allow transclusion in the directive. To do this, modify `app/choice/choice.directive.js`.

```javascript
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl',
    scope: {},
    transclude: true
  };
};

export default choice;
```

In addition, we need to modify our code to find the place to insert the text. We use another built-in directive called ngTransclude. Modify `app/assets/views/choice.html` to do the following:

```html
<div class="choice" ng-class="{ selected: choiceCtrl.isSelected() }" ng-click="choiceCtrl.toggleSelected()">
  <ng-transclude></ng-transclude>
</div>
```

The ngTransclude directive defines the location to insert any children defined inside the directive.

![Transclusion Example](http://i.imgur.com/mNSFfTy.png)

## Passing outer scope values into isolated scope

Outside of ngTransclude, there is another way to pass outer scope values into an isolated scope. We will accomplish this with an example. First we will create a controller that manages a set of choices.

```shell
mkdir app/multichoice
touch app/multichoice/multichoice.controller.js
```

Inside the `app/multichoice/multichoice.controller.js`, include the following:

```javascript
class MultiChoiceCtrl {
  constructor() {
    this.options = [{
      value: 'a',
      message: 'I understand custom directives.'
    }, {
      value: 'b',
      message: 'I do not understand custom directives.'
    }, {
      value: 'c',
      message: 'I do not understand custom directives.'
    }];
  }
}

export default MultiChoiceCtrl;
```

Include it in your `app/app.js` file.

```javascript
import angular from 'angular'

import angularLogo from './logo/angular-logo.directive'

import choice from './choice/choice.directive.js'
import ChoiceCtrl from './choice/choice.controller.js'

import MultiChoiceCtrl from './multichoice/multichoice.controller.js'

angular.module('my-app', [])
  .controller('ChoiceCtrl', ChoiceCtrl)
  .controller('MultiChoiceCtrl', MultiChoiceCtrl)
  .directive('gsAngularLogo', angularLogo)
  .directive('choice', choice);
```

Next update your `index.html` file to include the new controller.

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
    <div ng-controller="MultiChoiceCtrl as multiChoiceCtrl">
      <choice ng-repeat="option in multiChoiceCtrl.options" value="option.value">{{ option.message }}</choice>
    </div>

    <script src="/vendor.js"></script>
    <script src="/app.js"></script>
    <script>require('app');</script>
  </body>
</html>
```

In this case, we are using ngRepeat to repeat through the set of choices. The choice element (referencing the directive) has a `value` attribute that will get reference the value in each `option` variable. The `message` value in an option will get transcluded in.

Our directive needs to make sense of the `value` attribute, so we will identify it in `app/choice/choice.directive.js`.

```javascript
const choice = function() {
  return {
    restrict: 'E',
    templateUrl: 'views/choice.html',
    controller: 'ChoiceCtrl',
    controllerAs: 'choiceCtrl',
    scope: {
      value: '='
    },
    transclude: true,
    bindToController: true
  };
};

export default choice;
```

To specify an allowable scope variable to pass down, you specify the name of the variable as the key in the object under `scope` with a value of `=`, which means evaluate the attribute value and use that result. We also specified `bindToController` to true, which means add all variables defined in `scope` and place it in the controller `choiceCtrl`.

Lastly, let's update the view in `app/assets/views/choice.html`.

```html
<div class="choice" ng-class="{ selected: choiceCtrl.isSelected() }" ng-click="choiceCtrl.toggleSelected()">
  {{ choiceCtrl.value }}. <ng-transclude></ng-transclude>
</div>
```

In this case, we evaluate `choiceCtrl.value`, which should be coming from the `value` attribute from `index.html`. That value is retrieved from `choiceCtrl` since we specified the `bindToController` property in the directive.

It's possible to set the variables to three different attributes:

* `@` - Evaluates the attribute value as a pure string.
* `=` - Evaluates the attribute value as an Angular expression to evaluate.
* `&` - Evaluates the attribute value as an Angular expression that can later be invoked.

![Isolated Scope](http://i.imgur.com/seKi60Z.png)

## Extending Your Knowledge of Custom Directives

Directives can do even more than what we have so far seen. Custom directives can be used to manipulate the DOM, to wrap other directives, to add event listeners to the DOM, to communicate across directives, and even more.

Take some time and head back to the docs [here](https://docs.angularjs.org/guide/directive) to extend your understanding of custom directives.
