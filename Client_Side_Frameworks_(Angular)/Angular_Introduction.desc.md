## Objectives

* Explain what a client side framework is.
* Explain how Angular helps build complex applications.
* Use Angular in a single page application.
* Explain what is two-way data binding.
* Create the recommended structure of a project using Angular.

## What is a client side framework?

As of now, we have built a fully functional website complete with both a frontend and a backend. The tools we have used have been very minimal. For example, jQuery provides a lot of convenient features in traversing and manipulating the DOM. Since then, many websites grew more and more complicated (think Facebook, Twitter, Pinterest, Google's applications) and the organization of code using these tools became extremely unwieldy. As a result, many of these big companies developed or threw support on software to make things easier. For example,

* Angular (Google)
* React (Facebook)
* Bootstrap (Twitter)

A software framework provides common functionality that can be specially changed as needed. This supports an overall trend in software engineering called *code reuse*. As software engineers write code, they begin to recognize the pieces of code that get duplicated over and over. Engineers eventually abstract this functionality to their own functions or libraries. It is because of groups of common functionality, frameworks become strong backbones of an application. Frameworks differ from a standard libraries in the following ways:

* The application is primarily run by the framework instead of the user-written parts.
* Frameworks provide default behavior. This makes getting a rich application running from scratch relatively simple.
* Frameworks can be extended to override specific functionality, but the framework code itself is not meant to be changed.

Because there is a lot of common functionality in place, it's important to understand the nuances. A framework itself becomes its own language with its own features and recommendations. We are going to begin by talking about a frontend framework that has gotten very popular lately, AngularJS.

When evaluating frameworks to use, it's important to understand your needs to determine which framework you should use. Lots of frameworks provide everything but the kitchen sink, but if you only use a subset of those features, you end up wasting a lot of time and memory downloading the framework and using it. Keep this in mind when given a problem and you decide to user a framework. For example, there's a battle between AngularJS vs Backbone. AngularJS provides many features (which you will learn in this quarter) where as Backbone provides a very small abstraction of models, views, collections, and routers. AngularJS, when downloaded and minified, takes up 160Kb of space. Backbone on the other hand, takes up only 23Kb of space. That's over 85% less space!

## What is Angular?

According to the official Angular introduction, Angular is a-

> client-side technology, written entirely in JavaScript. It works with the long-established technologies of the web (HTML, CSS, and JavaScript) to make the development of web apps easier and faster than ever before.

Angular, along with other client-side libraries (Backbone, Ember, React), help us deal with larger, more complex code bases on the client-side. They also redefined the roles of the client and server, resulting in a new application structure called a Single-Page Application (or SPA). In this new structure, the client interacts with the server by making AJAX requests that are triggered by user interactions.

It boils down to this: **Angular helps us build complex, single-page applications very quickly.**

It may seem not that amazing, but when you think about it, but AngularJS provided some incredibly important functionality:

* It provided modules. Keep in mind browsers did not have a formal module system and Node.js was just getting released with its own module system. Modules helped avoided the need to pollute the global scope and provided separation of logic.
* It provided an organization of coding through a process similar to a Model-View-Controller architecture. This organization helps us separate the logic between our presentation logic and our core business logic.
* It abstracted the link between input values in values in a process called two-way data binding. There was no need to build listeners to input events, update fields accordingly. Angular did that for us.
* It built in a concept called *routing* where urls can be specified for specific parts of the application without the need for the server to define such routes and logic.
* It was designed to be testable, something that a majority of developers do not think about when constructing UIs.
* It added reusable code for many features such as form validation and localization (translating for different countries).
* It allowed the ability to add your own reusable code in the form of directives and components.

### A little history

AngularJS was developed by Miško Hevery in 2009. Originally, it was developed outside of Google, but it was later funded by Google. Hevery believed that HTML was not originally meant to handle the web applications that we build today. He chose to build an extension onto it.

For some more understanding on the motivation behind AngularJS, I recommend looking at the video of Hevery's [presentation](https://www.youtube.com/watch?v=khk_vEF95Jk) of AngularJS in 2011.

## Hello, Angular!

We're going to start by setting up a very simple Angular app to say Hello World - Angular-style!

Staying true to an iterative approach to coding, we'll start slow, defining everything (markup and Angular syntax) within a single `index.html` file - a true single page app! - and scale from there, learning about patterns for structuring complicated Angular apps.

Create a directory to hold your example work and create an `index.html` file in it.

```sh
$ mkdir hello-angular
$ cd hello-angular
$ touch index.html
$ atom index.html
```

In your `index.html` file, create the boilerplate of an html page. Add the Angular dependency. For now, we're going to utilize a CDN - `https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js`.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
  </body>
</html>
```

As of now, Angular is loaded but will not do anything to the page itself. We need to _inform_ the framework that there is an application intended to run in Angular. For that we need to add the `ng-app` attribute to an HTML element, typically the `<html>` element in your document. This indicates that *everything* inside of the `<html>` element - from the opening to closing tag - is part of an Angular app. In other words, all Angular code/tags that fall inside the `<html>` element will be rendered through Angular. *Get used to that `ng` prefix as you will be seeing it A LOT!* While `ng-app` is an attribute, Angular calls it a *directive* since its distinguishing itself from ordinary HTML attributes. In fact, directives can take on many forms, and we'll expand more about directives throughout this quarter.

Now that we have informed Angular of our application we can begin to leverage some of its capabilities. For example, add the following Angular tag anywhere inside of the `<body>` tag - `<p>{{1 + 6}}<p>`. Open the page in your browser. If all is well then you should see `7`.

```html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <p>{{1 + 6}}</p>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
  </body>
</html>
```

Angular is providing us with Angular *expressions*, being able to process your page and replacing it with values. Trying playing with other types of expressions. What kinds of things can you do and can't you do in here.

**Question** What would the above code produce if `ng-app` was not specified?
**Question** What will Angular produce with the following code?

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <p>{{1 + 6}}</p>
    <p ng-app>{{1 + 6}}</p>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
  </body>
</html>
```

### Variables in Angular

Angular expressions can also process variables. The variables however need to be defined somewhere. There are many places to define it, but for now, we will use another special directive from Angular called `ng-init`. Place an `ng-init` attribute in another paragraph.

```html
<p ng-init="someone = 'World'">Hello {{someone}}!</p>
```

In the above code, `ng-init` takes in an expression and evaluates it, assigning whatever values to variables. It can also do math as well.

```html
<p ng-init="sum = 1 + 4">The sum of 1 and 4 is {{sum}}</p>
```

While `ng-init` provides some easy ways if initializing variables. It's important to note that this style is meant for demonstration purposes only. `ng-init` is creating the variable for it to be used across the page.

Try updating the title to include the `someone` variable.

```html
<title>Hello {{someone}}!</title>
```

That being said, `someone` is inaccessible from `window`. It is stored within Angular's library for use, thereby avoiding the need to pollute the global scope.

```html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title>Hello {{someone}}!</title>
  </head>
  <body>
    <p>{{1 + 6}}</p>
    <p ng-init="someone = 'World'">Hello {{someone}}!</p>
    <p ng-init="sum = 1 + 4">The sum of 1 and 4 is {{sum}}</p>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
  </body>
</html>
```

## Introducing Interactivity with Data binding

We have played with some simple features of Angular, but we really want to work on using them in an interactive setting. For this we want to use the `ng-model` directive.

Create an input box at the top of the body.

```html
<input type="text" ng-model="greeting">
```

In this example, `ng-model` is providing a variable name to store the information in the text box. In this case, the name of the variable is `greeting`. Now that we have the variable stored, let's use it somewhere. Replace any cases where you see the word "Hello" with `{{greeting}}` (should be in the `<title>` element and one of the `<p>` elements).

```html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title>{{greeting}} {{someone}}!</title>
  </head>
  <body>
    <input type="text" ng-model="greeting">
    <p>{{1 + 6}}</p>
    <p ng-init="someone = 'World'">{{greeting}} {{someone}}!</p>
    <p ng-init="sum = 1 + 4">The sum of 1 and 4 is {{sum}}</p>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
  </body>
</html>
```

Test this out. Enter something in the input box and watch the DOM update! This is a result of Angular's ability to bind a view to a piece of data as it changes.

### Data Binding

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
