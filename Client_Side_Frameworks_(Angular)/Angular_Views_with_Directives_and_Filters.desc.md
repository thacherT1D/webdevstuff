## Objectives

* Explain what Angular expressions are.
* Explain what an Angular directive is.
* Use Angular's built-in directives, specifically:
  * `ng-repeat`
  * `ng-model`
  * `ng-if`
  * `ng-hide`
  * `ng-show`
* Explain what an Angular filter is.
* Use Angular's built-in filters, specifically:
  * currency
  * date
  * number
  * orderBy
  * filter
* Use Angular modules.

## What are Angular expressions?

Angular expressions are-

> Javascript-like snippets that are usually placed in bindings like "{{ expression }}".

We've already used expressions to render a property that we set using `ng-model`. However, expressions are not just limited to displaying single properties.

Try writing some simple expressions, like:

* `1 + 2 = {{ 1 + 2 }}`
* `My name is {{ "BoJack" + " Horseman" }}`
* `The array [99,43,22] is {{ [99,43,22].length }} items long.`

You've seen similar-like tags in a templating engine - like EJS, ERB, Swig, Jade/Pug. While they are definitely similar, there are a few key differences. The most important difference is that **you cannot write conditionals or loops inside an expression**. We'll see soon that Angular provides its own ways of achieving the same functionality.

> Keep in mind that you do not want to have complex logic in your views. If you want to run more complex code, we'll see how to move logic to a controller shortly.

### Exercise

Turn to your table and explain in your own words what Angular expressions are. Think of some of the key differences between Angular expressions and JavaScript.

## What are Angular directives?

Directives are Angular's way of extending HTML. Angular uses directives to add functionality to HTML elements and attributes. Coupled with Angular templating, directives create dynamic components that re-render whenever the underlying data changes. According to the docs-

> At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler to attach a specified behavior to that DOM element or even transform the DOM element and its children.

There are 4 ways of writing directives, but it's best practice to only write them using **tag names** like `<pop-up-dialog></pop-up-dialog>` or `<side-bar>`, and **attributes** like `<span fav-spell='expecto patronum'></span>` or `<div weather-widget='94114'></div>`.

Angular comes with a bunch of built-in directives, some of which we've already used. We will focus on built-in directives for now, but soon we will write our own custom directives.

### Exercise

Turn to a neighbor and discuss in your own words what you think an Angular directive is. Name some built-in directives that we have used so far.

## How to use built-in Angular directives

We're going to start by talking about a few of the most common built-in directives.

For a complete list see https://docs.angularjs.org/api/ng/directive

### ngRepeat

`ng-repeat` will iterate over a collection and create a template for every item in the collection. Think of it as the Angular equivalent of a `forEach`. It's extremely useful. Let's look at an example.

Let's start by initializing an array. In the body tag, add the following:

```html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title>Angular Views</title>
  </head>

  <body ng-init="names = ['Harry', 'Ron', 'Hermione', 'Sirius', 'Hedwig', 'Tonks']">

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
  </body>
</html>
```

Now let's iterate through the `names` array in the body. In the body of `index.html` add the following:

```html
<ul>
  <li ng-repeat='name in names'>
    {{ name }}
   </li>
</ul>
```

What would happen if you put the `ng-repeat` directive on the `ul` element, like so?

```html
<ul ng-repeat='name in names'>
  <li>{{name}}</li>
</ul>
```

### Iterating over Object Properties

It is possible to get `ngRepeat` to iterate over the properties of an object using the following syntax:

```html
<div ng-repeat="(key, value) in myObj"> ... </div>
```

**WARNING:**

- The order of keys returned for an object is dependent on the order returned by the browser using `(for key in myObj)`
- Keys starting with `$` will be ignored
- Built in filters such as `orderBy` and `filter` do not work with objects

### Tracking and Duplicates

Try using `ng-repeat` to iterate through an array with some duplicates, like `[1,1,2,5,6,9,9,9]`. What happens?

```html
<ul ng-repeat="num in [1,1,2,5,6,9,9,9]">
  <li>{{ num }}</li>
</ul>
```

If you do need to repeat duplicate items, you can substitute the default tracking behavior with your own using the `track by` expression. You can track items by the index of each item in an array, using the special scope property `$index`.

```html
<ul ng-repeat="num in [1,1,2,5,6,9,9,9] track by $index">
  <li>{{ num }}</li>
</ul>
```

You can also use `track by` with other properties such as object keys.

```html
<select ng-options="object.name for object in list track by object.id">
</select>
```

### Exercise

In your notes, write down some of the nuances and important characteristics of `ngRepeat`. We'll discuss what you wrote as a class.

### ngShow & ngHide

`ngShow` and `ngHide` will show or hide a specific HTML element based off of a provided expression. Let's take a look at some examples.

```html
<div ng-show='3 + 4 === 5'>
  3 + 4 isn't 5, don't show
</div>

<div ng-show='3 + 4 === 7'>
  3 + 4 is 7, do show
</div>

<div ng-hide='3 + 4 === 5'>
    3 + 4 isn't 5, don't hide
</div>

<div ng-hide='3 + 4 === 7'>
  3 + 4 is 7, do hide
</div>
```

The element is hidden when the expression provided to `ng-show` attribute is `false`. `ng-hide` will hide an element when the expression given to `ng-hide` is `true`.

Inspect an element that is hidden by `ng-show`/`hide` in the browser. What does Angular do to hide an element?

### ngClass

`ng-class` will dynamically set an element's class depending on a provided expression.

Define the following CSS class:

```css
.highlight {
  background-color: yellow;
}
```

We can use `ng-class` to selectively apply our `highlight` class to elements when the provided expression is true.

```js
<div ng-class='{highlight: 4 + 4 === 8}'> 4 + 4 = 8</div>
<div ng-class='{highlight: 4 + 4 === 10}'>4 + 4 = 10</div>
```

> Want more [examples](https://github.com/mjhea0/thinkful-mentor/tree/master/angular/fundamentals/built-in-directives/ngClass/ngClass-more-examples)?

### ngSrc & ngHref

Using Angular markup like {{hash}} in `src` and `href` attributes doesn't work right: The browser will fetch from the URL with the literal text {{hash}} until Angular replaces the expression inside {{hash}}. The `ngSrc` and `ngHref` directives solve this problem.

```html
<img ng-src="http://www.imageurl.com/{{expression}}" alt="Description" />

<a href="http://www.imageurl.com/{{expression}}">link</a>
```

## How to use built-in Angular filters

Filters are simply bits of code that format data before displaying it. Angular comes with a few built-in filters that can be used inside of Angular expressions. We'll see how to define custom filters later on.

Read over the following built-in filters:

1. [currency](https://docs.angularjs.org/api/ng/filter/currency) - converts a number into a currency value
1. [date](https://docs.angularjs.org/api/ng/filter/date) - converts a string into a datetime or UNIX timestamp
1. [filter](https://docs.angularjs.org/api/ng/filter/filter) - returns a subset of items from an array
1. [json](https://docs.angularjs.org/api/ng/filter/json) - converts a JavaScript object to JSON
1. [limitTo](https://docs.angularjs.org/api/ng/filter/limitTo) - returns a new string or array that contains only a limited number of elements
1. [lowercase](https://docs.angularjs.org/api/ng/filter/lowercase) - converts a string to lowercase
1. [uppercase](https://docs.angularjs.org/api/ng/filter/uppercase) - converts a string to uppercase
1. [number](https://docs.angularjs.org/api/ng/filter/number) - formats a number as text
1. [orderBy](https://docs.angularjs.org/api/ng/filter/orderBy) - orders an array of objects by specific predicate

### currency

Add the following expression to your markup:

```html
{{3.14159265359}}
```

We can use built-in filters to format our long number. The syntax to use a filter is `{{ expression | filter }}`.

Let's try using the built-in `currency` filter to display the above numbers as a price:

```html
{{ 3.14159265359 | currency }}
```

Notice that this filter does two things for us:

1. it rounds the data to two decimal places
1. it prepends a dollar sign

### date

Formats date to a string based on the requested format.

```html
<h1>{{ 1288323623006 | date : 'medium' }}</h1>
<h1>{{ 1288323623006 | date : "MM/dd/yyyy 'at' h:mma" }}</h1>
<h1>{{ 1288323623006 | date : "EEEE" }}</h1>
```

### number

Angular has a `number` filter that allows us to round numbers to specific decimal places. Try the following:

```html
{{ 3.14159265359 | number : 3 }}
{{ 3.14159265359 | number : 6 }}
{{ 3.14159265359 | number : 1 }}
```

### orderBy

Returns an array containing the items from the specified collection, ordered based on the values computed using the expression predicate.

```html
<div ng-init="friends = [
  {name: 'John',   phone: '555-1212',  age: 10},
  {name: 'Mary',   phone: '555-9876',  age: 19},
  {name: 'Mike',   phone: '555-4321',  age: 21},
  {name: 'Adam',   phone: '555-5678',  age: 35},
  {name: 'Julie',  phone: '555-8765',  age: 29}
]">
</div>

<table>
  <tr>
    <th>Name</th>
    <th>Phone Number</th>
    <th>Age</th>
  </tr>
  <tr ng-repeat="friend in friends | orderBy : 'age'">
    <td>{{ friend.name }}</td>
    <td>{{ friend.phone }}</td>
    <td>{{ friend.age }}</td>
  </tr>
</table>
```

Now, order the list of friends by name. How could we reverse the order? Hint, maybe check the Angular docs on `orderBy`

### filter

Selects a subset of items from array and returns it as a new array.

```html
<label>Search:</label>
<input ng-model="searchText">

<table>
  <tr>
    <th>Name</th>
    <th>Phone</th>
    <th>Age</th>
  </tr>
  <tr ng-repeat="friend in friends | filter : searchText">
    <td>{{ friend.name }}</td>
    <td>{{ friend.phone }}</td>
    <td>{{ friend.age }}</td>
  </tr>
</table>
```

### Exercise

Write down in your own words the purpose of Angular filters? Describe what a filter does and then name four built-in filters, including one that we haven't used yet. We'll discuss as a class what you wrote down.

## How to use Angular modules

The `angular.module` is a global place for creating, registering and retrieving Angular modules. All modules (angular core or 3rd party) that should be available to an application must be registered using this mechanism.

`app.js`

```JavaScript
'use strict';

angular.module('myAngularApp', []);
```

## Angular Materialize

Materialize and Angular aren't the best of friends. Many have built a version of Materialize for Angular called [Angular Material](https://material.angularjs.org/). It takes a _much_ different route than Materialize, so we are going to be using a smaller version built on top of the pre-existing Materialize Library called [Angular Materialize](krescruz.github.io/angular-materialize/).

In your HTML file, include jQuery and Materialize CSS as usual.

```html
<html ng-app="myAngularApp">
  <head>
    <meta charset="utf-8">
    <title>Angular Views</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css">
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col s6">
          <select material-select>
              <option ng-repeat="value in ['a', 'b', 'c']">{{value}}</option>
          </select>
        </div>
        <div class="col s4">
          <a class="waves-effect waves-light btn">button</a>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/angular-materialize/0.2.1/angular-materialize.min.js"></script>
    <script>
      angular.module('myAngularApp', ['ui.materialize']);
    </script>
  </body>
</html>
```

Most of the components in Angular Materialize are very similar in style to those in [Materialize](http://materializecss.com/), so I recommend taking a look a the [documentation](krescruz.github.io/angular-materialize/).

### Additional Practice

- Change the code in a currency filter to use a Euro symbol instead of a Dollar sign. You'll need to do some research of your own.

- Create a drop down menu where the user can select how many digits to round pi to.

- **BONUS:** Find out how to pluralize "digit" correctly. Angular comes with a built-in way of pluralizing things!

- Create a simple tip calculator using the Angular concepts that we've covered so far (and nothing more advanced). A user can enter a meal price into an input, then select a percentage to tip from a dropdown menu. Display the resulting tip at the bottom of the page.

- Let's test out your data binding and templating skills by building a [Mad Libs](http://en.wikipedia.org/wiki/Mad_Libs) application. When a user adds text to any of the form inputs, the text at the bottom should update automatically. For example, when you set the value of "boy's name" to "Michael" in the form, all instances of the `{{ boy's name }}` placeholder text should be updated/replaced with "Michael". Be sure to define all of the Angular code within a single `index.html` file. The final project should look like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/109/ngmadlibs-p1.png)
![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/108/ngmadlibs-p2.png)

## Assignment

[SnapShop Part 2](https://github.com/gSchool/snapshop/blob/master/2_Angular.md)

## Resources

- https://docs.angularjs.org/guide/expression
- <b id="f1">https://docs.angularjs.org/guide/filter</b> [↩](#a1)
