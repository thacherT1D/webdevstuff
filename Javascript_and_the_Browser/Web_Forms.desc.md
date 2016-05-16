# Objectives

* Use form input tags:
	* `<input>, <textarea>, <button>`
* Use multiple `types` of the `<input>` tag.
* Use `<label>` tags to add labels to form elements.
* Create a form in HTML using the `<form>` tag.
* Use and overwrite default form behaviors.
	* `action`, `method`, and event JS binding.
* Use HTML5 input types as a first-line validation technique
* Use other HTML5 techniques to validate input
* Read the values from your form with JS
* Check the values you've read with JS to make sure they are what they need to be
* Listen to form events like submit, and show errors
* Program defensively against faulty form input

If you've ever entered your credit card information to a website, performed a search on Google, or logged into Facebook then you've used forms. Forms are far and away the most common method of getting information from your user into your programs. Sometimes this information never leaves the browser, and sometimes it is sent to a web server.

# HTML forms and form elements

At it's core www.google.com is a simple form with 1 input and 2 buttons. With a little CSS we could recreate what we see on Google with some dead simple HTML:

![](http://i.imgur.com/hcP92bJ.png)

```
<form>
	<input type="text"/>
	<div>
		<button>Google Search</button>
		<button>I'm Feeling Lucky</button>
	</div>
</form>
```

Without CSS our version looks a little sad, but it can collect information  all the same.

![](http://i.imgur.com/vqOjeBe.png)

Forms contain a collection of __form elements__ which have defined behavior when wrapped inside of a `<form>` tag. While it's perfectly vaild to use form elements like `<button>` and `<input>` outside of a form they behave in convienent and useful ways when combined with `<form>`.

# Form Types

Keep in mind that there are [a huge number](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) of input types, especially for browsers with HTML5 support.

## Text

The most common and versatile input type is a standard field for the user to enter text. **_Whenever browser does not recognize a type, it will default to a text type._**

### Semantic HTML Revisited

Remember when we talked about Semantic HTML? We also have semantic input types to help _describe_ what the input is looking for with some additional benefits.

* Provides some basic validation (ie. verifying the input is in the correct format).
* Some special JavaScript properties to access the input in a reliable format.
* Some special Operating System considerations when adding input. (eg. iOS keyboards for email, url, etc.)

There are multiple text inputs that boil down to a very similar visual. They include:

* email (special keyboards, basic email validation, etc)
* password (hides characters entered, etc)
* url (special keyboards, basic url validation, etc)
* tel (cleans content, etc)

#### Label Element

Each form element will usually have some sort of caption that instructs the user on what the input is looking for. For example, next to a text box with a caption "Name", you are then expected to type your name in. We use the `<label>` element to specify the text that describes the expected input. For example:

```html
<label>Name
  <input type="text">
</label>
```

You can also use the `for` attribute with an id of the input element like so.

```html
<label for="name-field">Name</label>
<input type="text" id="name-field">
```

## Select Boxes

## Radio and Checkboxes

## Hidden

## Buttons

### Submit vs Reset

## And many more...

There are more challenges in our repo ([https://github.com/gSchool/html-forms](https://github.com/gSchool/html-forms)) that will have you experiment with other input types including `checkbox`, `hidden`, `radio button`, and more. Knowing what types of inputs are available is essential to designing a form that is simple and easy to use. When you encounter a new type ask yourself "what would I use this for?"

## Common Attributes

With inputs, there are a variety of attributes available to use. Many vary by input and a lot of them are nonstandard but _recommended_.

* autocomplete
* autofocus
* maxlength
* name
* placeholder
* pattern
* required
* readonly
* size
* spellcheck
* tabindex
* value

# Materialize Forms

Let's start with the Materialize [http://materializecss.com/forms.html](documentation) on forms specifically. Materialize includes some simple ways to make your forms look awesome.

# Form Action and Method

Lets experiment with building forms. Clone the repo found here and complete challenge 1: [https://github.com/gSchool/html-forms](https://github.com/gSchool/html-forms)

![](https://media1.giphy.com/media/YhyAJUCpno53y/200.gif)

Once you've completed the first challenge, try to answer the question "What is happening when we click the submit button?". If you get stuck try looking at the URL before and after you click submit, does anything stand out?

Here is what my URL was before submitting:
`file:///Users/Tyler/GalvanizeProjects/g16/temp/html-forms/index.html`

And after, it has become massive:

```
file:///Users/Tyler/GalvanizeProjects/g16/temp/html-forms/index.html?firstText=Tyler&secondText=someArbitraryValue&textArea1=This+is+what+I+wrote+personally!&preFilledTA=This+text+should+be+inside+a+text+area!&email=fake%40faking.it&date=12%2F12%2F2012&number=4&file=Screen+Shot+2015-11-04+at+9.39.13+AM.png
```

The default behavior for an `<input type="submit">` is to send an HTTP GET request to the current URL with __query parameters__ for each item in the form. In a URL, a query parameter is anything that occurs after the ? character. These query parameters can be chained using the & symbol. Lets break down the URL above:

```
file:///Users/Tyler/GalvanizeProjects/g16/temp/html-forms/index.html?
firstText=Tyler
&secondText=someArbitraryValue
&textArea1=This+is+what+I+wrote+personally!
&preFilledTA=This+text+should+be+inside+a+text+area!
&email=fake%40faking.it
&date=12%2F12%2F2012&number=4
&file=Screen+Shot+2015-11-04+at+9.39.13+AM.png
```

Notice that after `index.html` there is a `?`. This starts the query parameters. The first one for me is `firstText` which corresponds to this input element:

```
<input id="1" name="firstText" type="text"/>
```

For each input element, I have a query parameter corresponding to the name property. Try removing the name property from your first input. Does it still show up in our query parameters? What about the table?

The `name` property is essential in the use of forms. Remember that `id` and `name` serve different purposes in forms. `id` is still used to uniquely identify an element anywhere on the page, but `name` is used to track data within the forms.

## What About that Table?

How did we extract the information sent in query params and put it in a table? Try looking at the file js/app.js in the cloned repo. Here is the most important snippet from that code:

```
var queryString = document.location.search.replace('?', '');
var pairs = queryString.split('&').map(function (pair) {
      return pair.split('=');
    });
```

We've used JavaScript and the `document.location` object to extract the query parameters. Challenge yourself to understand how this code works!

# Controlling Forms

The final piece of forms is controlling their behavior. As we've seen, it's simple enough to cobble together a form that accepts a wide range of inputs. It's also easy to use those inputs as query parameters for a simple HTTP GET request to the current URL. What if we want to do something different with that information?

Lets take the form we created in Challenge 1, and paste it into a new HTML page called `example_1.html`. You can use this template for example_1.html

```
<!doctype>
<html>
  <head>
    <title>HTML Forms</title>
    <link rel="stylesheet" href="css/app.css" />
  </head>
  <body>
    <h1>Form Fields: Example 1</h1>
	<--! Paste your form here -->
  </body>
</html>
```

![](http://www.animatedgif.net/computers/a_10mailput_e0.gif)

In `example_1.html` we can tell our form to send our query parameters to a different page, instead of the current URL. On the `<form>` element, lets add an `action` and `method` properties.

```
<form action="index.html" method="get">
```

Now when we click submit we will be sending a GET request to the page `index.html`. Click submit and notice that the table is filled out with the information we sent from our form in `example_1.html`. If we changed the `name` properties in `example_1.html` how would the table change?

Using action and method, we can send all kinds of HTTP requests to any URL we want.

Now that you've got the basics, go through the rest of the challenges at [https://github.com/gSchool/html-forms](https://github.com/gSchool/html-forms).

# HTML and JS Form Validation

## Why?

As a web developer, you will spend just an obscene amount of time working on HTML forms. Form validation is a large part of what is project-specific, and dependent on what's called "business logic". Because it varies from project to project, what gets validated and how, according to what needs, is something that's always being tweaked, prodded and updated. 9 times out of 10 when you collect information from a user, it's going to be from a form, and you want the user to have a nice experience.

We're also validating our form input because our programs can't work without proper inputs. Writing simple programs up until this point means only one person has been using your program: you. In the future, this won't be the case- sometimes forms are confusing if you don't know how they work in advance. Your users will often make mistakes, and will often need to be corrected in an expedient way that encourages the user to continue interacting with the form.

So what do we do to ensure we get good input for our programs?

# Form Validation

## HTML5 Validation

First, we need to make it easy for humans with good intentions to use our interface. We can use a number of HTML5 capabilities to do this, such as tabindex, input types, and patterns.

[Read this article about HTML5 Forms](http://diveintohtml5.info/forms.html), focus specifically on input types and [validation](http://diveintohtml5.info/forms.html#validation).

After that, given the form below, change it to use HTML5 form validation techniques.
Make sure:

 * Email fields are type="email"
 * numerical fields are type="number", one that makes sense
 * Required fields have the `required` attribute (with no ="true"- check the documentation)
 * Set the `tabindex` property on each form element

```html
<form>
	<label>Name (required)</label>
	<input type="text" name="name">
	<label>Email (required)</label>
	<input type="text" name="email">
	<label>Age (required, must be older than 13)</label>
	<input type="text" name="age">

	<label>Number of siblings</label>
	<input type="text" name="siblings">

	<label>Number of rooms in your house</label>
	<input type="text" name="rooms">

	<label>Blog url</label>
	<input type="text" name="blog">

	<label>Twitter Username</label>
	<input type="text" name="twitter">
	<input type="submit">
</form>

```

***Bonus*** If you know regex, use the `pattern` property to ensure users include an @ sign in front of their twitter username.

## JS Validation

Now that we've done some validation with HTML5, it's time to use JS to finish up the job.

### Accessing values

There are a number of validation libraries that we can use, that will allow us to validate our forms using code someone else has written. Rather than doing that, however, we need to understand how these libraries go about doing what they do, which we'll do by doing some implementation.

First, let's look at how to go about getting the values of the form:

**Get the value of an `input` element**

Given: `<input type="phone" name="phone" id="phone">`

```javascript
var phoneValue = document.getElementById("phone").value;
```

Using either of these techniques, we can access the current value of any `input` element. This also works for `textarea` elements as well.

Take a look at the code below for how to access other kinds of form input through the DOM.

```javascript
var form = document.querySelector('#some-form');
var input = document.querySelector('#some-input');

document.forms;           // Get all forms on a page
form.elements;            // Get all form elements
input.type.toLowerCase(); // Get input type (radio, checkbox, text, etc.)
input.value;              // Get input value
input.name;               // Get input name
input.checked;            // Get the checked status of a checkbox or radio button
input.disabled;           // Get input disabled status
```

[source: gomakestuff](http://gomakethings.com/ditching-jquery/#working-with-forms)

[(why we're using .checked)](https://jsperf.com/prop-vs-ischecked/5)


### When to access values

Now that we know how to access values, we need to know when to access them. If we were to use the above code when the page loads, we would only see blank or placeholder values. Why? Because we need to wait to check these until the user tries to submit the form, or until the user is done filling out the field.

**submit event**  

In order to check the form when the user hits the "I'm finished filling out this form button", we need to listen for the "submit" action on the form. *Remember, we need to select the form, not the submit button.* This is for when you want to validate the entire form at once.

```javascript
var myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function () {
	// do entire form validation here
});
```

**blur event**  

If we want to check a field as soon as a user is done typing, we can listen to the "blur" event. The blur event fires as soon as a field loses focus.

```javascript
var myForm = document.getElementById('myForm');
myForm.addEventListener('blur', function () {
	// do single input validation here
});
```

#### What do I do if there's an error?

A typical pattern is to display either next to the incorrectly filled out element, or a the top of the form, a new DOM element that lists the error in question. Try to be descriptive, tell the user what they did wrong- did they miss filling out the field, or did they just forget to put dashes in their phone number?

When you bind an event handler to something that has a _default action_, the handler will fire and then the default action will happen. A default action is something like a form's submission to the location that's in the action property, or the navigation that happens when you click a link. In order to render errors, you have to stop the default action. One way is to use `event.preventDefault();`, but simply calling `return false` from within a jQuery event handler will stop the default event from occuring.


```javascript
var myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function() {
  if (some_error_condition) {
    var errDiv = document.createElement('div');
    errDiv.className = 'error';
    errDiv.textContent = 'Please fix your phone number';
    myForm.appendChild(errDiv);
    return false; 			// This tells the submission not to happen
  }
});
```

## Displaying Validation with Materialize

The [dialogs](http://materializecss.com/dialogs.html) documentation page offers many helpful tools to help you properly display validation errors.

## Questions

* Why do we need to do form validation inside an event listener?
* What is a better experience for the user- using the `required` attribute, or using JS to ensure all required fields are checked?
* Why might browser validation not be enough?
* What would happen if someone used console Javascript to submit their form, bypassing your validation?

## Additional Resources on Forms

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form
- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
- http://diveintohtml5.info/forms.html
- http://www.wufoo.com/html5/
