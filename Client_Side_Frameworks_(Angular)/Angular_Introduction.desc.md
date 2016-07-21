## Objectives

* Explain what a client side framework is.
* Explain how Angular helps build complex applications.
* Use Angular in a single page application.
* Explain what is data binding.
* Create the recommended structure of a project using Angular.

## What is Angular?

According to the official Angular introduction, Angular is a-

> client-side technology, written entirely in JavaScript. It works with the long-established technologies of the web (HTML, CSS, and JavaScript) to make the development of web apps easier and faster than ever before.

Angular, along with other client-side libraries (Backbone, Ember, React), help us deal with larger, more complex code bases on the client-side. They also redefined the roles of the client and server, resulting in a new application structure called a Single-Page Application (or SPA). In this new structure, the client interacts with the server by making RESTful AJAX requests that are triggered by user interactions.

It boils down to this: **Angular helps us build complex, single-page applications very quickly.**

## Hello, Angular!

We're going to start by setting up a very simple Angular app to say Hello World - Angular-style!

Staying true to an iterative approach to coding, we'll start slow, defining everything (markup and Angular syntax) within a single `index.html` file - a true single page app! - and scale from there, learning about patterns for structuring complicated Angular apps.

1. Create an `index.html` file.
1. Add the Angular dependency. For now, we're going to utilize a CDN - `https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js`.
1. Add the `ng-app` attribute to the `<html>` element in your document. This indicates that *everything* inside of the `<html>` element - from the opening to closing tag - is part of an Angular app. In other words, all Angular code/tags that fall inside the `<html>` element will be rendered by the Angular interpreter. *Get used to that `ng` prefix as you will be seeing it A LOT!*
1. Test it out! Add the following Angular tag anywhere inside of the `<body>` tag - `<p>{{1 + 6}}<p>`. Open the page in your browser. If all is well then you should see `7`.
1. Finally, update the title element - `<title>{{ greeting }} World</title>` - and add the following two paragraphs:
  ```html
  <p>Say something to the world <input type="text" ng-model="greeting" ng-init="greeting='Hello, '"></p>
  <p>{{ greeting }} world!</p>
  ```

1. Test this out. Enter something in the input box and watch the DOM update! Note the new `ng-`attributes - you will learn more about them soon.

### Final Code

```html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title>{{ greeting }} World</title>
  </head>
  <body>
    <p>{{1 + 6}}<p>
    <br>
    <p>Say something to the world <input type="text" ng-model="greeting" ng-init="greeting='Hello, '"></p>
    <p>{{ greeting }} world!</p>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
  </body>
</html>
```

## Questions

* Why learn Angular JS over other frameworks like Ember, Backbone, Knockout, etc?
* People have some very strong opinions about Angular. What are 3 common complaints people have about Angular?
* Is Angular an MVC framework?
* Turn to the Angular docs. Find `ng-app`. What is it and what does it do? What does `ng` stand for?

## Data Binding

Let's start by building something simple that showcases the power of Angular.

In traditional frameworks, controllers package up data from the models with a template and then render a view to the user. That view is a snapshot in time; it only reflects the state of data at the time it was rendered. Newer JavaScript frameworks like Angular and Ember allow us to write dynamic, live templates. This means that we can write Angular templates that will **automatically update when our data changes.**

This is called two-way or bi-directional binding.

* when a model changes, the view knows about it.
* when a view changes, the model also knows about it.

Put another way, if the data changes in the controller, that change is *immediately* updated on the view. If the data changes in the view, then it is *immediately* updated in the controller.

Let's try it out!

In `index.html` create a text input:

```html
<input type="text" placeholder="What is your name?">
```

Add a new attribute `ng-model="name"` to the text input. This ties/binds the value of the text input to a property called "name". Technically, `ng-model` tries to bind "name" by evaluating the expression on the current `$scope`, and since the property "name" doesn't already exist on this `$scope`, it will be created implicitly and added to the `$scope`. *We'll talk a lot more about this when we learn about controllers in a few lessons, so don't worry about it for now.*

Now that we've bound the input to the "name" property, let's display the value of "name" on the page.  We can write expressions in our HTML using `{{ }}`.

```html
<h1>My name is: {{name}}</h1>
```

Open up `index.html` in your browser. What does the `h1` display when the page loads? Try typing something into the input and notice that the `h1` reflects whatever value we type into the input. This is our first example of two-way data binding.

### Exercises

**Raw JS**

Replicate the exact same functionality without using Angular. In a new file, write vanilla JS code that will automatically update the h1 when the value in the text input changes. Once done, compare your solution to [examples/update-without-angular.html](examples/update-without-angular.html).

**Dropdowns**

Use `ng-model` with a dropdown menu (select tag). Give the user the following four items to pick from - "Dogs", "Cats", "Dogs and Cats", "Neither". Display the user's choice in an `h3`. For example, if the user selects "Dogs", the `h3` should say "I love dogs <3".

## Questions

* What does `ng-model` do?
* [What is "dirty checking"?](http://stackoverflow.com/questions/24698620/dirty-checking-on-angular)
* Find a way to set the initial value of "name" as "BoJack" (without writing a controller).
* What are those `{{ }}` expressions? Are they Handlebars?
* Explain what two-way data binding is.
* BONUS: Research the `$digest` loop

## A New Structure

As our Angular apps grow we'll need a new file structure. It won't work to put everything in a single `app.js` file when we have multiple controllers, modules, directives, filters, services, and much  more.

We're going to start by using the following structure:

```sh
app
├── css
├── index.html
└── js
    ├── app.js
    ├── controllers.js
    ├── directives.js
    ├── filters.js
    └── services.js
```

This structure is pretty simple. We have an `app.js` file where we will declare our Angular app and all dependencies. For now it will just look like:

```javascript
var app = angular.module("whateverYourModuleNameIs", []);
```

We also have files like `controllers.js` and `directives.js`, which contain all of our controllers or custom directives (we'll get there soon). Basically, instead of writing everything inside of `app.js`, we've broken it out into separate files grouped by functionality.

In order for this structure to work, make sure you correctly include all the scripts in your `index.html` file.

Check out the boilerplate [here](examples/boilerplate/app). Cheers!

**EXERCISE**

Convert the reddit clone app to this new file structure. Then serve up your reddit clone app using [http-server](https://www.npmjs.com/package/http-server) inside of the "app" directory:

```sh
$ http-server -c-1 -o
```

Visit `localhost:8080` to see the application. *Make sure everything works correctly.*

### Questions

* What are possible issues with this new file structure?
* When thinking about extending the single responsibility principle to the app structure, what are some other ways that the app could be structured?
* What are the differences between serving files from an http server and from the file system? It seemed to work fine with just `open index.html` in the browser...
* Reflecting on the new structure and thinking back to lesson 1 - is Angular an MVC framework? How does the app structure support/disprove that?


## Resources

* [Angular Docs](https://docs.angularjs.org/api)
* [Thinking in Angular](http://stackoverflow.com/questions/14994391/thinking-in-angularjs-if-i-have-a-jquery-background/15012542#15012542)
* [AngularJS by Example - Building a Bitcoin Investment Calculator](https://github.com/mjhea0/thinkful-angular)
* [Angular vs Ember vs Backbone] (https://www.airpair.com/js/javascript-framework-comparison)
* [Data Binding Reference](https://docs.angularjs.org/guide/databinding)
* [ng-model Docs](https://docs.angularjs.org/api/ng/directive/ngModel)
* [`$watch`](https://www.ng-book.com/p/The-Digest-Loop-and-apply/)
* [ng-cloak StackOverflow discussion](http://stackoverflow.com/questions/12866447/prevent-double-curly-brace-notation-from-displaying-momentarily-before-angular-j)
