## Objectives

* Use Angular in a single page application.
* Explain what is two-way data binding.

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

## Assignment

[Blueit](https://github.com/gSchool/blueit)

## Resources

* [Angular vs Ember vs Backbone](https://www.airpair.com/js/javascript-framework-comparison)
* [Data Binding Reference](https://docs.angularjs.org/guide/databinding)
* [ng-model Docs](https://docs.angularjs.org/api/ng/directive/ngModel)
* [ng-cloak StackOverflow discussion](http://stackoverflow.com/questions/12866447/prevent-double-curly-brace-notation-from-displaying-momentarily-before-angular-j)
