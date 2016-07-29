## Objectives

* Use Angular's $http service to perform AJAX requests.
* Explain how Angular's handles Dependency Injection.
* Require new Angular dependencies through Dependency Injection.
* Explain what is client-side routing.
* Use `ngRoute` to define client-side routes.

## HTTP Service

Angular services are simply objects that contain some code that can be shared across your app.  Like most things we've discussed, Angular comes with some services already, but we can also write our own custom services too.  

You can see a list of the built-in Angular services [here](https://docs.angularjs.org/api/ng/service).  Some of the most important ones are:

* $http
* $location
* $rootScope
* $q
* $animate
* $routeParams

According to the docs, the `$http` service:

>facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.

It's **Angular's wrapper for AJAX calls.**  It's the easiest way of communicating with a server from an Angular app. Let's try it out!

**In order to use the `$http` service in a controller, we need to first add it as a dependency**.  Like this:

```js
app.controller('someControllerName', function($scope, $http) {
});
```

Now we can access all of the methods defined on the `$http` service. They are:

* $http.get
* $http.head
* $http.post
* $http.put
* $http.delete
* $http.jsonp
* $http.patch


We're going to start by using `$http.get()` to retrieve some very simple data from Github's Zen API located here: `https://api.github.com/zen` and then display the resulting data on the page. It's an extremely simple API; all that it does is respond with a single piece of zen programming wisdom.  Try visiting the api in your browser.

Don't forget that `$http.get()` returns a promise!

```js
$http.get('https://api.github.com/zen').then(function(data){
  $scope.view.zenData = data;
});
```

In your template, display the value of `zenData`.  You'll see that it's JSON with a few different properties:

```json
{
  "data":"Keep it logically awesome.",
  "status":200,
  "config": {
    "method":"GET",
    "transformRequest":[null],
    "transformResponse":[null],
    "url":"https://api.github.com/zen",
    "headers":{
      "Accept":"application/json, text/plain, */*"
    }
  },
  "statusText":"OK"
}
```

Most of time, we just want the actual response data, so let's change our code slightly:

```js
$http.get('https://api.github.com/zen').then(function(data){
  $scope.view.zenData = data.data;
});
```

NOTE: If you have trouble sending GET requests to 'https://api.github.com/zen' ,
create a new zen.json file in your application and send get requests to retrieve data from
that newly created file.

PS: sometimes the api reaches it's daily limit of calls and shuts down for the day

**EXERCISE:** Read about [the same origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) ([wikipedia has some good info too](https://en.wikipedia.org/wiki/Same-origin_policy)) and [Cross-Origin Resource Sharing or CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).  Describe what both the same origin policy and CORS are.

**EXERCISE:** Try using `$http.get()` to make a request to `https://itunes.apple.com/search?term=jack+johnson` and display the title of every post on your template. You should get an error. What was the error?  Why did the api.github.com domain work and not the itunes.com domain?

**EXERCISE:** Since making a request to `https://itunes.apple.com/search?term=jack+johnson` didn't work, go to the url in your browser and copy all the json that gets returned.  Save the json data into a file in your app called `itunes.json`.  Use the `$http.get()` service to make a request to get the `itunes.json` file.  Display the title of every post on your template.  Why does this method for getting the json data work?

**EXERCISE:** Try making a request to an invalid URL.  Write code to properly handle a request that fails.  **Does Angular have any built-in functionality that could help you?**


**EXERCISE:** Use `$http.get()` and `$http.post()` to interact with this [API that we've made for you](https://messagehttpservice.herokuapp.com/).  It's a simple collaborative chat app.  The API has two endpoints:

The app is one Rails model, Message, which has two attributes: name and content.

* GET `/messages` - responds with a list of all messages
* POST `/messages` - creates a new message with the data you send to it

Create a simple app that displays a list of all the messages coming from the API.  Also display a form that allows a user to submit a new message to the database.

Remember that most Rails apps expect your data for a given model to be nested inside of a single object with the name of the model.  So the data you send should follow this format:

```js
{message: {
  name: "Mary",
  content: "This is such a cool API!"
}}
```

## Questions

* What is a service?  Is there a Ruby or JavaScript equivalent to Angular services?
* Explain in as much detail as possible what happens under the hood of `$http.get()`
* What is `$q` and how does it relate to `$http`?

## What is Dependency Injection?

From [Wikipedia](https://en.wikipedia.org/wiki/Dependency_injection):

"In software engineering, dependency injection is a software design pattern that implements inversion of control for resolving dependencies. Dependency injection means giving an object its instance variables. Really. That's it."

Hmm...that might not be terribly helpful (but if it is - feel free to skip ahead to the bottom section!). If not - let's try this again.

### A bit more about DI

In order to understand more about dependency injection, we have to first understand where the need for this pattern came from. The need for this pattern came when applications started to become more "modular".

As a quick refresher - when writing modular code, we break apart our application into smaller pieces (that are not always related to each other) so that we can write more testable and maintainable code. You can read more about modular programming [here](https://en.wikipedia.org/wiki/Modular_programming).

Now this all sounds wonderful, but in order to write more modular code, we need a set of rules to govern how best to do this. One of those rules is the **Separation of Concerns**. You might have heard about this before, if not let's see what Wikipedia has to say about it:

"In computer science, separation of concerns (SoC) is a design principle for separating a computer program into distinct sections, such that each section addresses a separate concern. A concern is a set of information that affects the code of a computer program. A concern can be as general as the details of the hardware the code is being optimized for, or as specific as the name of a class to instantiate. A program that embodies SoC well is called a modular program. Modularity, and hence separation of concerns, is achieved by encapsulating information inside a section of code that has a well-defined interface. Encapsulation is a means of information hiding.

**Exercise** - What design patterns and programming techniques have you seen/used so far that help separate concerns?

**Exercise** - Define the following terms

- Single Responsibility Principle
- Interface (you can start [here](http://stackoverflow.com/questions/3710275/does-javascript-have-the-interface-type-such-as-javas-interface))
- Duck Typing
- Law of Demeter
- Tight Coupling (in contrast with Loose Coupling)
- Separation of Concerns (in your own words :P )

After reading about Separation of Concerns, the Single Responsibility Principle and Law of Dememter - you now have a much better understanding of what writing modular entails (and how it can be done in languages that support or do not support interfaces!). These terms will appear all over programming documentation and in interviews as well - make sure you at least understand them at a high level!

### Now we're getting somewhere!

Now that we are building an understanding of what modular code is - we are also beginning to understand that in order for us to write modular code, we need our small containers (modules) to be dependent upon other modules! This means that when we are modular, we are also dependent!

So how can we share dependencies amongst our modules and still write clean code?

From the angular docs:

There are only three ways a component (object or function) can get a hold of its dependencies:

1. The component can create the dependency, typically using the `new` operator.
2. The component can look up the dependency, by referring to a global variable.
3. The component can have the dependency passed to it where it is needed.

**EXERCISE** - What are some potential issues with the first two options?

The first two options of creating or looking up dependencies are not optimal because they hard code the dependency to the component. This makes it difficult, if not impossible, to modify the dependencies. This is especially problematic in tests.

The third option is the most viable, since it removes the responsibility of locating the dependency from the component. The dependency is simply handed to the component.

In angular, we take our dependencies (which we call services - we will learn more about these in another unit) and inject them into a dependent object (controller/directive/filter). This separates the creation of the dependency from its behavior and enables the client to abide by the single responsibility principle.

We are not going to go into how angular implements dependency injection under the hood, but if you would like to learn more about how this works, check out these articles:

[https://docs.angularjs.org/guide/di](https://docs.angularjs.org/guide/di)

[https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection](https://github.com/angular/angular.js/wiki/Understanding-Dependency-Injection)


### So where do we see this in action?

We might have taken this for granted a bit, but think about a simple example where we create a controller - maybe something like this.

```js
angular.module('myApp', []).controller('FirstController', function($scope){
  // now we can do all sorts of cool things with scope
})
```

We see in this example, we are injecting the `$scope` service to our controller, but something seems a bit odd....where did `$scope` come from? And how is it possible that if I just pass in `$scope` as a parameter (or even `$rootScope`), angular will just know what it is? Even more - If we don't pass in `$scope` as the first parameter, it will still work! Let's see this example:

```js
angular.module('myApp', []).controller('FirstController', function($rootScope, $http, $q, $scope){
  // I have now added a whole bunch of dependencies (don't worry if you don't know what $http and $q are, we'll get there) - and the order in which I put them in does not matter!
})
```

So how does angular possibly know how to find each parameter correctly and create the right object?!

### How does this happen?

We just put $scope in our controller and it didn't even matter if it was the first or fifth parameter - Angular was just able to find it and give us the right data! How did that possibly happen? In order to understand this we need to first review JavaScript functions and strings.

Let's assume we have a function called sayHi that takes in a few parameters:

```js
var sayHi = function(firstName, lastName, favoriteColor) {
  return `Hi ${firstName} ${lastName}. It looks like your favorite color is ${favoriteColor}`;
}
```

We can call this function, but when we just type in `sayHi` in our console, we will see the actual function definition, and if we call `.toString()` on this function, we can see a representation of this function as a string! That's incredible! Here's why:

This means that if we can take any function and get its string representation - we could parse that string and figure out the expected names of the parameters to the function. If we do this correctly, it does not matter what order the parameters come in as, as long as we know what their value is!

So how does angular do it? Let's open up an angular application and add the code above to the console and then type the following line (this code is for demonstration purposes - you will most likely **never** write code like this in a production application):

`angular.injector().annotate(sayHi)`

It should return:

`["firstName", "lastName", "favoriteColor"]`

Now imagine that instead of `["firstName", "lastName", "favoriteColor"]` we had `["$scope", "$rootScope"]`. Angular would now be able to assign the correct values to each of these and their order would not make any difference! Using this technique (of calling `.toString()` on a `function`), angular can create an object and pass it in that spot. So all we have to do is name our parameter correctly and angular can find wherever it is and add the correct value for us!

### Different ways to define dependencies

We have been using __implicit annotation__ so far. You can read more about it in the following exercise:

**EXERCISE:** Research and figure out the other two ways by reading the documentation on Dependency Annotation [here](https://docs.angularjs.org/guide/di)

Angular supports 3 ways to annotate our code (define dependencies):

1.  Implicit annotation
2.  Inline array annotation
3.  $inject property annotation

__The implicit annotation dependency injection will break when you minify your code.__   This happens because minification tools rename variables to a something smaller, but the minification tool doesn't know that the variable name in the function is meaningful to angular.

For now, use inline array annotation (it is the most commonly seen and is stated as "preferred" by the angular docs). In more recent style guides however, it is recommended that the `$inject` property be used.

### Answer the following questions

- What is dependency injection?
- How does angular implement dependency injection?
- What are the three ways to annotate our code with service names (dependencies)? Write three code examples with each one of these options.

**Practice:**s

```js
app.controller('SampleController', function($scope, $rootScope){
  $scope.view.val = "some value from $scope";
  $rootScope.rootView.val = "some value from $rootScope";
});
```

- In the above example (`SampleController`) does the order of the dependencies matter?  Does `$scope` have to come before `$rootScope`?  Do the names matter?  Could we have named them something else?

- Look at an angular app you have made previous (reddit clone or your portfolio site).  What dependencies are there?  Where do you see dependencies other than the controller?

- In production code, you typically want your javascript file to be as small as possible so that it can be downloaded faster.  To make the files smaller, developers minify their js files.  Find a minification tool and minify your js code.  Update your html file so that it now points to your newly minified js files.  Does your angular app still work?  If it stopped working, what is the problem?

- Fix the app you minified earlier to use inline array annotation.  Minify the javascript files again.  Verify that the code still works when using the minified js.

- When using inline array annotation does the order of anything matter?  What order should match?

**BONUS** - write a function that takes in another function as an argument and returns an array of the function's parameters as strings.

## Routing

One of Angular's most important features is its handling of routing and browser history navigation.

Most single page apps (SPAs) actually consist of multiple "pages" or "screens". For example, we might have views for a landing page, login page, and signup page. Let's take our reddit clone example.  What if we wanted to add a "show page" for an individual post?  When a user clicks on a particular post, they see a view with details about the post.

A good example of this is gmail. gmail has different views for your inbox, viewing a specific email, composing a message, viewing starred emails, viewing spam etc.  The app is still a single page app, you just don't see everything at once.

**EXERCISE**  Open up your gmail (or similar email provider) account. Try clicking around and accessing the different features.  Pay special attention to the url bar.  What do you notice?

Typical issues with complex single page apps are:

* SPAs don't support browser history navigation.  The back and forwards buttons don't work.
* You can't bookmark parts of a SPA
* If all of our code is in a single template, things can get incredibly messy

Angular provides solutions for all of the above issues through its router.  We can break down a view into multiple smaller views that are rendered inside of a layout depending on the URL the user is currently accessing.

We'll see how to use the `$routeProvider` to make use of the browser’s history navigation and allow users to bookmark and share specific pages based off of the current URL.  Let's get started.

**First we need to include the `ngRoute` module.** It's a separate module that we need to include on our own. You can download the module or link to this CDN: "http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.js"

Next, we need to load the `ngRoute` module by adding it as a dependent module.

```js
var app = angular.module("yourAppName", ['ngRoute']);
```

Our `index.html` will act as our layout file.  Just like in Express, we'll add all the common markup (navbar, footer, etc.) to our layout file, and then we'll render specific views in a particular place in our layout.  To tell Angular where it should render those views, we'll use the `ng-view` directive.  Add the following to `index.html`:


```html
<h1>NAVBAR</h1>

<div ng-view></div>

<h1>FOOTER</h1>
 ```

 According to the docs:

 > The ng-view directive is a special directive that’s included with the ngRoute module. Its specific responsibility is to stand as a placeholder for $route view content. It creates its own scope and nests the template inside of it.

Next, let's declare some routes. To add a route to a module, we use the `config` function.  In our `app.js` file, add:

```js
app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/dogs', {
      	templateUrl: 'partials/dogs.html',
      	controller: 'DogsController'
      })
});
```

**EXERCISE:** Before reading on, take time to understand the above code on your own, and make it work. The end goal is to have 2 routes that display 2 different templates.  It's up to you to decide what to put in the templates. The above route declarations tell you exactly what files you need to create. Go write them!

**EXERCISE: Seriously, do the above exercise!**  Don't just move on to see the answer.  Process over product :)

The above route declarations define two routes: '/' and '/dogs'.  When a user visits '/', Angular will render the `partials/home.html` file inside of our layout file and set the `HomeController` as the controller on the `ng-view`. When a user visits '/dogs', Angular will render the `partials/dogs.html` file inside of our layout file and set the `DogsController` as the controller on the `ng-view`.

To make this work, we need to create 2 templates and 2 controllers.  Let's start with the `/` route.  Create a controller in `controllers.js` named `HomeController`:

```js
app.controller('HomeController', function($scope){
});
```

Let's add a property to the scope called `view.message`.  Set it to whatever you want:

```js
$scope.view = {};
$scope.view.message = "Welcome!"
```

Now let's create the template.  Inside of `app/partials` create a `home.html` file.

```html
<p>This is the home template</p>

<p>Message: {{view.message}}</p>
```

Make sure when you visit `localhost:8080`, you see the above template rendered between the header and footer we created earlier.  Let's repeat the same process for the '/dogs' route.  

Controller:

```js
app.controller('DogsController', function($scope){
  $scope.view = {};
  $scope.view.message = "Woof Woof!"
});
```

Template:

```html
<p>This is the dogs template</p>

<p>Message: {{view.message}}</p>
```

Make sure the second route works correctly by visiting `http://localhost:8080/#/dogs`. Play around with the browser navigation buttons.  Try bookmarking a page.  It should all work!

**QUESTION:** Why does Angular put a `#` in the route path?

**EXERCISE:** Figure out how to set a "catchall" route that will render the `home.html` template if the user visits any other route

**EXERCISE:** Make a simple portfolio site using Angular.  It should have 3 routes: "projects", "bio", and "resume".  Add a Bootstrap navbar to the layout file with links to all 3 routes. Figure out how to have the navbar reflect the current route that a user is on.

**EXERCISE:** Make a simple route-based calculator.  When a user visits "/add/4/10", display "14".  Do the same thing for division.  To accomplish this, your routes will need to have path variables.  Research how to define variable segments in your route.  Next, you'll need to research how you access the value of path variables inside of a controller.  You'll need to find the angular equivalent of the `params` hash in rails or the `req.params` object in Express.

**EXERCISE:** Refactor the above exercise so that your calculator works using the query string.  When a user visits "/add/?x=4&y=10", display "14".  You will need to research how to access query string data inside of a controller.

**EXERCISE:** Configure Angular so that routes do not contain `#`'s. Research!  You may want to start using https://www.npmjs.com/package/superstatic instead of `http-server`

## Questions:

* Why isn't `ngRoute` part of Angular core?  Name at least 2 other Angular modules we could use
* Compare and contrast client-side routing with server-side routing
* Aside from route definitions, what else can go in a `.config()`?
* What is the `$routeChangeSuccess` event?





##Cheat Sheet:

 Download superstatic from npm : https://www.npmjs.com/package/superstatic

Create an html file and use Bower or CDNs to link to angular and another for angular routes
```html
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.js"></script>
```
Add ng-app="myApp" to the html tag of your file
```
<html ng-app="myApp">
```
Add ng-view to your HTML page that will be used later to inject your partials into.
EX:
```html
<body>
  <div ng-view></div>
</body>
```
Create an angular module and inject the 'ngRoute' dependency
EX:
```
angular.module('myApp', ['ngRoute'])
```
Create .config section under your module to set up your routes
EX:
```js
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
})
```

Remove Hashtags from urls :

Add $locationProvider.html5Mode(true) to your .config
EX:
```js
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'home.html',
      controller: 'HomeController'
    })
  $locationProvider.html5Mode(true);
})
```

Then add a base tag to the bottom of the head of your main HTML file:
EX:
```
<base href="/">
```
Then create a superstatic.json file and add this code:
```js
{
  "rewrites": [
    {"source":"**/**","destination":"/index.html"}
  ]
}
```

Create your partial HTML file and the controller you added to the route and you should be good to go

Run a local static server with superstatic
```
$ superstatic
```


### Additional Reading/Watching

[A great video on DI as a concept ](https://www.youtube.com/watch?v=IKD2-MAkXyQ)

[A great video on DI in Angular ](https://www.youtube.com/watch?v=7VFUQCKYRbg)

[http://stackoverflow.com/questions/130794/what-is-dependency-injection](http://stackoverflow.com/questions/130794/what-is-dependency-injection)

[Angular Docs on DI](https://docs.angularjs.org/guide/di)
