## Objectives

* Explain what a Angular directive is.
* Use Angular's built-in directives, specifically:
  * `ng-repeat`
  * `ng-model`
  * `ng-if`
  * `ng-hide`
  * `ng-show`
* Explain what a Angular filter is.
* Use Angular's built-in filters specifically:
  * currency
  * date
  * number
  * orderBy
  * filter
* Build a custom Angular filter.

## Built-In Directives

Directives are Angular's way of extending HTML. Angular uses directives to add functionality to HTML elements and attributes. Coupled with Angular templating, directives create dynamic components that re-render whenever the underlying data changes. According to the docs-

> At a high level, directives are markers on a DOM element (such as an attribute, element name, comment or CSS class) that tell AngularJS's HTML compiler to attach a specified behavior to that DOM element or even transform the DOM element and its children.

There are 4 ways of writing directives, but it's best practice to only write them using **tag names** like `<pop-up-dialog></pop-up-dialog>` or `<side-bar>`, and **attributes** like `<span fav-spell='expecto patronum'></span>` or `<div weather-widget='94114'></div>`.

Angular comes with a bunch of built-in directives, some of which we've already used. We will focus on built-in directives for now, but soon we will write our own custom directives.

**EXERCISE: Name at least 3 built-in directives that we have used so far.**

Here's a complete-ish list of Angular's built-in directives in no particular order:

* ng-repeat
* ng-hide
* ng-href
* ng-class
* ng-src
* ng-app
* ng-show
* ng-click
* ng-disabled
* ng-checked
* ng-selected
* ng-model
* ng-style
* ng-disabled
* ng-readonly
* ng-include
* ng-switch
* ng-controller
* ng-view
* ng-if
* ng-init
* ng-bind
* ng-cloak
* ng-bind-template
* ng-model-options
* ng-change
* ng-form
* ng-submit

We're going to start by talking about a few of the most common built-in directives

For a complete list see https://docs.angularjs.org/api/ng/directive

### ng-repeat

`ng-repeat` will iterate over a collection and create a template for every item in the collection. Think of it as the Angular equivalent of a `forEach`. It's extremely useful. Let's look at an example.

Let's start by defining a collection. In the body tag, add the following:

```html
<body ng-init="names=['Harry', 'Ron', 'Hermione', 'Sirius', 'Hedwig', 'Tonks']">
</body>;
```

Now let's iterate through the `names` array in the body. In the body of `index.html` add the following:

```html
<ul>
  <li ng-repeat='name in names'>
    {{name}}
   </li>
</ul>
```

Question: what would happen if you put the `ng-repeat` directive on the `ul` element, like so?

```html
<ul ng-repeat='name in names'>
  <li>{{name}}</li>
</ul>
```

**EXERCISE**

Add an ng-init with a  property called `symbols` with the value `['Spades', 'Clubs', 'Hearts', 'Diamonds']`. Use an `ng-repeat` to display each one in the body.

BONUS: Figure out how to make these entity codes actually display as symbols, like the following image:

![](http://content.screencast.com/users/ColtSteele1/folders/Jing/media/d75c95af-4729-4b8f-bf84-3b98a87f3213/00000003.png)

**EXERCISE**

Try using `ng-repeat` to iterate through an array with some duplicates, like `[1,1,2,5,6,9,9,9]`. What happens?  Research how `ng-repeat` handles duplicate data and how to 'fix' this issue.

**EXERCISE**

Use `ng-repeat` to iterate through the attributes (keys) of an object and list them on in the body

> View some more examples [here](./examples/ng-repeat).

### ng-show/hide

`ng-show` and `ng-hide` will show or hide a specific HTML element based off of a provided expression. Let's take a look at some examples.

```html
<div ng-show='3 + 4 == 5'>
  3 + 4 isn't 5, don't show
</div>

<div ng-show='3 + 4 == 7'>
  3 + 4 is 7, do show
</div>

<div ng-hide='3 + 4 == 5'>
    3 + 4 isn't 5, don't hide
</div>

<div ng-hide='3 + 4 == 7'>
  3 + 4 is 7, do hide
</div>
```

The element is hidden when the expression provided to `ng-show` attribute is `false`. `ng-hide` will hide an element when the expression given to `ng-hide` is `true`.

**EXERCISE**

Inspect an element that is hidden by `ng-show`/`hide` in the browser. What does Angular do to hide an element?

**EXERCISE**

Create a simple password validator like the one shown below. If the password is less than 6 characters, hide the submit button and show the error message. Otherwise, show the button and hide the error

![](http://zippy.gfycat.com/FelineEqualElectriceel.gif)

> View another example [here](./examples/ng-show-hide).

### ng-class

`ng-class` will dynamically set an element's class depending on a provided expression.

Define the following CSS class:

```css
.highlight {
  background-color: yellow;
}
```

We can use `ng-class` to selectively apply our 'highlight' class to elements.

```js
<div ng-class='{highlight: 4 + 4 == 8}'> 4 + 4 = 8</div>
<div ng-class='{highlight: 4 + 4 == 10}'>4 + 4 = 10</div>
```

> Want more [examples](https://github.com/mjhea0/thinkful-mentor/tree/master/angular/fundamentals/built-in-directives/ngClass/ngClass-more-examples)?

**EXERCISE**

Build on top of the previous password validator exercise. Use `ng-class` to make the form and character count green when valid and red when invalid. Take a look at the following gif:

![](http://zippy.gfycat.com/ActualBeautifulIzuthrush.gif)


**FINAL EXERCISE**

Build a simple camera shop interface using the data provided below. Display each camera's title, image (look into `ng-src`), price, and rating. If an item's `onSale` property is true, display the words 'ON SALE!!' and give the price a yellow color. A user should be able to sort by price or rating. You'll need to research how to accomplish this.

![](http://zippy.gfycat.com/UnsteadyDampCanine.gif)

Use the following data:

```js
[
  {
    title: 'Nikon D3100 DSLR',
    image: 'http://ecx.images-amazon.com/images/I/713u2gDQqML._SX522_.jpg',
    rating: 3.4,
    price: 369.99,
    onSale: true
  },
  {
    title: 'Canon EOS 70D',
    image: 'http://ecx.images-amazon.com/images/I/81U00AkAUWL._SX522_.jpg',
    rating: 2.0,
    price: 1099.0,
    onSale: false
  },
  {
    title: 'Nikon D810A',
    image:'http://ecx.images-amazon.com/images/I/91wtXIfLl2L._SX522_.jpg',
    rating: 4.2,
    price: 3796.95,
    onSale: true
  }
]
```

### Questions

* What is the purpose of `ng-init`?
* Why use `ng-src` and `ng-href`?
* What are directives?
* Does `ng-class` require an object to be passed in?
* What order does an ng-repeat display items in?
* How does `ng-repeat` handle duplicate data?

### Bonus

What's happening in each of these examples? What's the purpose of the directive?

- [ng-cloak](./examples/ng-cloak)
- [ng-include](./examples/ng-include)
- [ng-pluralize](./examples/ng-pluralize)

## Expressions and Built-In Filters

Angular expressions are-

> Javascript-like snippets that are usually placed in bindings like "{{ expression }}".

We've already used expressions to render a property that we set using `ng-model`. However, expressions are not just limited to displaying single properties.

Try writing some simple expressions, like:

* `1 + 2 = {{1 + 2}}`
* `My name is {{"BoJack" +  " Horseman"}}`
* `The array [99,43,22] is {{ [99,43,22].length }} items long.`

You've seen similar-like tags in a templating engine - like EJS, ERB, Swig, Jade. While they are definitely similar, there are a few key differences. The most important difference is that **you cannot write conditionals or loops inside an expression**. We'll see soon that Angular provides its own ways of achieving the same functionality.

> Keep in mind that you do not want to have complex logic in your views. If you want to run more complex code, we'll see how to move logic to a controller shortly.

Another key difference is that we can use Angular filters inside of expressions. Filters are simply bits of code that format data before displaying it. Angular comes with a few built-in filters, and we'll also see how to define custom filters later on.

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

Let's try using one...

Add the following expression to your markup:

```html
{{3.14159265359}}
```

We can use built-in filters to format our long number. The syntax to use a filter is `{{ expression | filter }}`.

Let's try using the built-in `currency` filter to display the above numbers as a price:

```html
{{3.14159265359 | currency}}
```

Notice that this filter does two things for us - (1) it rounds the data to two decimal places and (2) it prepends a dollar sign.

**EXERCISE**

Change the above code so that our currency filter uses a Euro symbol instead of a Dollar sign. You'll need to do some research of your own.

**EXERCISE**

Add a text input to a page that displays user input in all caps and all lowercase. You will need to use two of the other built-in filters<sup id="a1">[1](#f1)</sup>. Use the following gif as a reference:

![](http://zippy.gfycat.com/CookedWelcomeDesertpupfish.gif)

Let's try using another built-in filter to format our data. Angular has a `number` filter that allows us to round numbers to specific decimal places. Try the following:

```html
{{3.14159265359 | number:3}}
{{3.14159265359 | number:6}}
{{3.14159265359 | number:1}}
```

**EXERCISE**

Create a drop down menu where the user can select how many digits to round pi to. BONUS: Find out how to pluralize "digit" correctly. Angular comes with a built-in way of pluralizing things! It should work like the following gif:

![](http://zippy.gfycat.com/LegalThickIndochinesetiger.gif)

**EXERCISE**

Create a simple tip calculator using the Angular concepts that we've covered so far (and nothing more advanced). A user can enter a meal price into an input, then select a percentage to tip from a dropdown menu. Display the resulting tip at the bottom of the page. Check out the following gif to see how it should work.

![](http://zippy.gfycat.com/FlamboyantQuickGordonsetter.gif)

**EXERCISE**

Add the following code to your HTML file, within the scope of `ng-app`:

```html
<div>{{this}}</div>
```

What does this tell you about the context of Angular [expressions](https://docs.angularjs.org/guide/expression)?

**EXERCISE**

Let's test out your data binding and templating skills by building a [Mad Libs](http://en.wikipedia.org/wiki/Mad_Libs) application.

When a user adds text to any of the form inputs, the text at the bottom should update automatically. For example, when you set the value of "boy's name" to "Michael" in the form, all instances of the `{{boy's name}}` placeholder text should be updated/replaced with "Michael".

Be sure to define all of the Angular code within a single `index.html` file. The final project should look like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/109/ngmadlibs-p1.png)
![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/108/ngmadlibs-p2.png)

> Grab the text [here](./examples/madlibs-text.md)

<hr>

### Questions

* What are Angular expressions? How do they compare to tags from templating engines you've used before?
* What happens when you write invalid code in an expression? What type of error do you get?
* What are Angular filters? Describe what a filter does and then name four built-in filters, including one that we haven't used yet.
* What's the syntax for filters?
* Can you use more than one filter?
* We'll soon see how to create custom filters. What is a use case for a custom filter?

## Custom Filters

We've seen how to use Angular's built-in filters like `currency`, `number`, and `uppercase`.  These are definitely useful, but we often will need to create custom filters to format data to meet our specific needs.

**EXERCISE: Come up with a situation where you would want to create a custom filter.**

We're going to start by creating a "snake_case" to "kebab-case" filter.  We want to be able to write: `{{"hello_class" | kebab}}` and see "hello-class" in the view.

We need to start by defining a filter named "kebab".  In `filters.js`:

```js
app.filter('kebab', function () {

});
```

Remember that filters are just functions to which we pass input and get some returned output to display.  Every filter needs to return a function that takes a single argument:

```js
app.filter('kebab', function () {
  return function (input) {
  };
});
```

The last step is to write our logic inside of the returned function.

**STOP! Think about how you would write the code to convert to kebab-case.** Try it on your own first before you move on.

Here's a possible solution that will replace all `_`'s with `-`'s:

```js
app.filter('kebab', function () {
  return function (input) {
    return input.replace(/_/g , "-");
  };
});
```

**EXERCISE:** Fix our `kebab` filter so that it doesn't break when you pass it a number input.  It should just return the unaltered input.

**EXERCISE:** Write a `camel` filter which will take EITHER a snake_cased or kebab-cased string and convert it to camelCase. So `{{"hello-world" | camel}}` should display "helloWorld", and `{{"hello_world" | camel}}` should also display "helloWorld"

**EXERCISE:** Write a `pigLatin` filter which converts a given string to Pig Latin.  Learn the basics of Pig Latin [here](http://www.wikihow.com/Speak-Pig-Latin).

**EXERCISE:** Create a filter called `redact` which will remove all instances of a provided word from a string and replace it with "REDACTED". `{{"My dog Rusty is adorable" | redact: "Rusty"}} should return "My dog REDACTED is adorable". You will need to research creating custom filters that take parameters.

## Resources

- https://docs.angularjs.org/guide/expression
- <b id="f1">https://docs.angularjs.org/guide/filter</b> [↩](#a1)
