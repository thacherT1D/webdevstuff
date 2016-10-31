## Objectives

* Explain what a front end framework is.
* Explain why a Angular is effective.
* Create our first Angular application.
* Explain what is two-way data binding

## What is a front end framework?

At this point, you have learned everything necessary to build a website both on the front end and backend. Congratulations! You have the tools necessary to build a fully functioning website. With this in mind, developers have focused on increasing productivity as the complexity of websites have increased. While jQuery can do the job on the Front end, developers can expect a ton of complexity in code stemming from no formal organization of code and tedious application of traversing and manipulating the DOM.

With this in mind, many websites grew more and more complicated (think Facebook, Twitter, Pinterest, Google's applications) and the organization of code using these tools became extremely unwieldy. As a result, many of these big companies developed or threw support on software to make things easier. For example,

* Angular (Google)
* Bootstrap (Twitter)
* Materialize

As software engineers write code, they begin to recognize the pieces of code that get duplicated over and over. Engineers eventually abstract this functionality to their own functions or modules. This supports an overall pillar in software engineering called *code reuse*. Eventually these abstractions get grouped into modules that share a common theme. For example, the npm package `knex` provides a module that connects to a database and performs queries. The npm package `morgan` provides a common way for servers to log request information coming in. These modules are often called `libraries` as they provide common code that can be used in many places. jQuery is considered a library.

A *software framework* provides common functionality as well just like a library. Frameworks differ from a standard libraries in the following ways:

* The application is primarily run by the framework instead of the user-written parts.
* Frameworks provide default behavior. This makes getting a rich application running from scratch relatively simple.
* Frameworks can be extended to override specific functionality, but the framework code itself is not meant to be changed.

Because there is a lot of common functionality in place, it's important to understand the nuances. A framework itself becomes its own language with its own features and recommendations. We are going to begin by talking about a front end framework that has gotten very popular, AngularJS.

**NOTE** Some may think that React is a framework, but it is actually a library. We'll discuss more on that when we talk about React.

When evaluating frameworks to use, it's important to understand your needs to determine which framework you should use. Lots of frameworks provide everything but the kitchen sink, but if you only use a subset of those features, you end up wasting a lot of time and memory downloading the framework and using it. Keep this in mind when given a problem and you decide to user a framework.

### Exercise

Turn and talk to your neighbor and describe what is a library and a framework. Think of another example of a library and framework for the front end not mentioned (Feel free to use Google).

## What is Angular?

According to the official Angular introduction, Angular is a-

> client-side technology, written entirely in JavaScript. It works with the long-established technologies of the web (HTML, CSS, and JavaScript) to make the development of web apps easier and faster than ever before.

Angular, along with other client-side frameworks (Ember, React), help us deal with larger, more complex code bases on the client-side. They also redefined the roles of the client and server, resulting in a new application structure called a Single-Page Application (or SPA). In this new structure, the client interacts with the server by making AJAX requests that are triggered by user interactions.

It boils down to this: **Angular helps us build complex, single-page applications very quickly.**

### A little history

AngularJS was developed by Miško Hevery in 2009. Originally, it was developed outside of Google, but it was later funded by Google. Hevery believed that HTML was not originally meant to handle the web applications that we build today. He chose to build an extension onto it.

For some more understanding on the motivation behind AngularJS, I recommend looking at the video of Hevery's [presentation](https://www.youtube.com/watch?v=khk_vEF95Jk) of AngularJS in 2011.

### Angular's Features

It may not seem that amazing when you think about it, but AngularJS provided some incredibly important functionality:

* It provided modules. Keep in mind browsers did not have a formal module system and Node.js was just getting released with its own module system. Modules removed the need to pollute the global scope and provided separation of logic.
* It provided an organization of our code. This organization helps us separate the logic between our presentation logic and our core business logic.
* It abstracted the link between variables in code with presentation in HTML through a process called two-way data binding.
* It built in a concept called *routing* where urls can be specified for specific parts of the application without the need for the server to define such routes and logic.
* It was designed to be testable, something that a majority of developers do not think as much about when constructing UIs.
* It added reusable code for many features such as form validation and localization (translating for different countries).
* It allowed the ability to add your own reusable code in the form of directives and components.

### Exercise

Write down some of the reasons Angular is a useful framework. After a minute, your instructor will cold call on the class ask what you wrote.

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

Now that we have informed Angular of our application we can begin to leverage some of its capabilities. For example, add the following Angular tag anywhere inside of the `<body>` tag - `<p>{{ 1 + 6 }}<p>`. Open the page in your browser. If all is well then you should see `7`.

```html
<!DOCTYPE html>
<html ng-app="my-app">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <p>{{ 1 + 6 }}</p>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.js"></script>
  </body>
</html>
```

Angular has a built-in parser for the text content on the HTML page. Using double curly braces (`{{ }}`), any expression can be included to be evaluated. Angular is providing us with Angular *expressions*, being able to process your page and replacing it with values. Trying playing with other types of expressions. What kinds of things can you do and can't you do in here.

**Question** What would the above code produce if `ng-app` was not specified?

### Variables in Angular

Angular expressions can also process variables. The variables however need to be defined somewhere. There are many places to define it, but for now, we will use another special directive from Angular called `ng-init`. Place an `ng-init` attribute in another paragraph.

```html
<p ng-init="someone = 'World'">Hello {{someone}}!</p>
```

In the above code, `ng-init` takes in an expression and evaluates it, assigning whatever values to variables. It can also do math as well.

```html
<p ng-init="sum = 1 + 4">The sum of 1 and 4 is {{sum}}</p>
```

While `ng-init` provides some easy ways if initializing variables. It's important to note that this style is meant for demonstration purposes only. `ng-init` is creating the variable for it to be used across the page. That being said, `someone` is inaccessible from `window`. It is stored within Angular's library for use, thereby avoiding the need to pollute the global scope.

```html
<!DOCTYPE html>
<html ng-app>
  <head>
    <meta charset="utf-8">
    <title>Hello {{someone}}!</title>
  </head>
  <body>
    <p>{{ 1 + 6 }}</p>
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

In this example, `ng-model` is providing a variable name to store the information in the text box. In this case, the name of the variable is `greeting`. Now that we have the variable stored, let's use it somewhere. Replace any cases where you see the word "Hello" with `{{ greeting }}` (should be in the `<title>` element and one of the `<p>` elements).

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

In traditional frameworks, views are a snapshot in time, only reflecting the state of data at the time it was rendered. Newer JavaScript frameworks like Angular and Ember allow us to write dynamic, live templates. This means that we can write Angular templates that will **automatically update when our data changes.**

This is called two-way or bi-directional binding.

* when a model changes, the view knows about it.
* when a view changes, the model also knows about it.

Put another way, if the data changes, that change is *immediately* updated on the view. If the data changes in the view, then it is *immediately* updated in the code.

![Two Way Data Binding Diagram](https://docs.angularjs.org/img/Two_Way_Data_Binding.png)

Let's try it out!

In `index.html` create a text input:

```html
<input type="text" placeholder="What is your name?" ng-model="name" ng-init="name = 'Ken'">
```

With the attribute `ng-model="name"` added to the text input, this ties/binds the value of the text input to a property called "name". Technically, `ng-model` tries to bind "name" by evaluating the expression, and since the property "name" doesn't already exist in angular's scope, it will be created implicitly.

Now that we've bound the input to the "name" property, let's display the value of "name" on the page.  We can write expressions in our HTML using `{{ }}`.

```html
<h1>My name is: {{name}}</h1>
```

Open up `index.html` in your browser. What does the `h1` display when the page loads? Try typing something into the input and notice that the `h1` reflects whatever value we type into the input. This is our first example of two-way data binding.

### Exercises

**Dropdowns**

Use `ng-model` with a dropdown menu (select tag). Give the user the following four items to pick from - "Dogs", "Cats", "Dogs and Cats", "Neither". Display the user's choice in an `h3`. For example, if the user selects "Dogs", the `h3` should say "I love dogs <3".

## Preparing for ES6

Node.js now includes a majority of ES6 syntax. Returning to the Front end, we need to be mindful of overall support for ES6. In this case, we will want to use a **transpiler** to translate our ES6 syntax to ES5 for cross-browser support.

A traditional **compiler** translates the source code of one programming language into another programming language of a *different* level of abstraction. For example, embedded JavaScript (i.e. EJS) templates compile into HTML because one is an embedded programming language and the other is only a markup language.

```text
┌────────────────  EJS  ────────────────┐               ┌─────── HTML ───────┐
│                                       │               │                    │
│                                       │               │                    │
│ <h1 id="greeting">                    │               │ <h1 id="greeting"> │
│   Hello, <%= 'Jane'.toUpperCase() %>. │─── compile ──▶│   Hello, JANE.     │
│ </h1>                                 │               │ </h1>              │
│                                       │               │                    │
│                                       │               │                    │
└───────────────────────────────────────┘               └────────────────────┘
```

A **transpiler** is a special type of compiler. Given the source code of one programming language, a transpiler produces equivalent source code in another programming language of approximately the *same* level of abstraction. For example, TypeScript transpiles into JavaScript because both languages are similar in capabilities.

```text
┌────────────── TypeScript ───────────────┐                  ┌────────────── JavaScript ───────────────┐
│                                         │                  │                                         │
│ function greeter(who: string) {         │                  │ function greeter(who) {                 │
│   return `Hello, ${who.toUpperCase()}`; │                  │   return `Hello, ${who.toUpperCase()}`; │
│ }                                       │─── transpile ───▶│ }                                       │
│                                         │                  │                                         │
│ greeter('Jane');                        │                  │ greeter('Jane');                        │
│                                         │                  │                                         │
└─────────────────────────────────────────┘                  └─────────────────────────────────────────┘
```

[Babel](https://babeljs.io/) is by far the most popular JavaScript transpiler. There are a number of ways to transpile with Babel. However, the most popular way is with the help of a Node package, which you'll install later in this article.

Additionally, the [language-babel](https://atom.io/packages/language-babel) package brings JSX syntax highlighting to Atom. Go ahead and install that now by following these steps.

1. Open the Atom preferences with `Ctrl + ,`.
1. Click on the "Install" tab in the side navigation.
1. Search for the `language-babel` package in the main screen.
1. And click on its "Install" button.

### Exercise

For the following code examples, use the [Babel REPL](https://babeljs.io/repl/) to transpile into JavaScript. Type each code example out *by hand* and then write down your answers to each question.

**Blocked scope variables**

```javascript
let foo = 4;
const bar = 5;
```

**Arrow Functions**

```javascript
$('.foo').click((event) => {
  $(event.target).text('Hello');
});
```

**Classes**

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log('Woof');
  }
}
```

## Assignment

[SnapShop](https://github.com/gSchool/snapshop/blob/master/2_Angular.md)

## Resources

* [Angular Docs](https://docs.angularjs.org/api)
* [Thinking in Angular](http://stackoverflow.com/questions/14994391/thinking-in-angularjs-if-i-have-a-jquery-background/15012542#15012542)
* [Angular vs Ember vs Backbone](https://www.airpair.com/js/javascript-framework-comparison)
* [ng-cloak StackOverflow discussion](http://stackoverflow.com/questions/12866447/prevent-double-curly-brace-notation-from-displaying-momentarily-before-angular-j)
