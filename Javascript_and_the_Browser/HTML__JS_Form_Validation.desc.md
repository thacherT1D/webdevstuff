# HTML and JS Form Validation

### Objectives
Bt the end of this Learning Experience you should be able to:

* Use HTML5 input types as a first-line validation technique
* Use other HTML5 techniques to validate input
* Read the values from your form with JS
* Check the values you've read with JS to make sure they are what they need to be
* Listen to form events like submit, and show errors


### Key Terms

* Default Action
* Input Value
* Event Handler


### Why?

As a web developer, you will spend just an obscene amount of time working on HTML forms. Form validation is a large part of what is project-specific, and dependent on what's called "business logic". Because it varies from project to project, what gets validated and how, according to what needs, is something that's always being tweaked, prodded and updated. 9 times out of 10 when you collect information from a user, it's going to be from a form, and you want the user to have a nice experience.

We're also validating our form input because our programs can't work without proper inputs. Writing simple programs up until this point means only one person has been using your program: you. In the future, this won't be the case- sometimes forms are confusing if you don't know how they work in advance. Your users will often make mistakes, and will often need to be corrected in an expedient way that encourages the user to continue interacting with the form. 

So what do we do to ensure we get good input for our programs? 

## Form Validation

### HTML5 Validation
First, we need to make it easy for humans with good intentions to use our interface. We can use a number of HTML5 capabilities to do this, such as tabindex, input types, and patterns.

*(Required)* [You should have read this article last night](http://diveintohtml5.info/forms.html), so we should be ready to rock.

Given the form below, change it to use HTML5 form validation techniques.
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

### JS Validation

Now that we've done some validation with HTML5, it's time to use JS to finish up the job.

#### Accessing values
Not every form can be checked with a simple "type" field. Also, [not every browser](http://caniuse.com/#search=type%3D) can use every type. So, we need to do some validation using jQuery.

There are a number of validation libraries that we can use, that will allow us to validate our forms using code someone else has written. Rather than doing that, however, we need to understand how these libraries go about doing what they do, which we'll do by doing some implementation. 

First, let's look at how to go about getting the values of the form:

**Get the value of an `input` element**

Given: `<input type="phone" name="phone" id="phone">`

```javascript
//jQuery
var phoneValue = $("#phone").val();
//Vanilla
var phoneValue = document.getElementById("phone").
```

Using either of these techniques, we can access the current value of any `input` element. This also works for `textarea` elements as well. 

Take a look at the code below for how to access other kinds of form input through **vanilla javascript**.

```javascript
var form = document.querySelector('#some-form');
var input = document.querySelector('#some-input');

document.forms; // Get all forms on a page
form.elements; // Get all form elements
input.type.toLowerCase(); // Get input type (radio, checkbox, text, etc.)
input.value; // Get input value
input.name; // Get input name
input.checked; // Get the checked status of a checkbox or radio button
input.disabled; // Get input disabled status
```

[source: gomakestuff](http://gomakethings.com/ditching-jquery/#working-with-forms)


**jQuery Version**

```javascript
var form = $('#some-form');
var input = $('#some-input');

input.val(); // Get input value
input.getAttr("name"); // Get input name
input[0].checked; // Get the checked status of a checkbox or radio button
input[0].disabled; // Get input disabled status
```

[(why we're using .checked)](https://jsperf.com/prop-vs-ischecked/5)


#### When to access values
Now that we know how to access values, we need to know when to access them. If we were to use the above code when the page loads, we would only see blank or placeholder values. Why? Because we need to wait to check these until the user tries to submit the form, or until the user is done filling out the field.

**.on("submit")**  

In order to check the form when the user hits the "I'm finished filling out this form button", we need to listen for the "submit" action on the form. *Remember, we need to select the form, not the submit button.* This is for when you want to validate the entire form at once.

```javascript
$("#myForm").on("submit", function(){
  // do entire form validation here
})

```

**.on("blur")**  

If we want to check a field as soon as a user is done typing, we can listen to the "blur" event. The blur event fires as soon as a field loses focus.

```javascript
$("#myInput").on("blur", function(){
  // do single input validation here
})

```

#### What do I do if there's an error?
A typical pattern is to display either next to the incorrectly filled out element, or a the top of the form, a new DOM element that lists the error in question. Try to be descriptive, tell the user what they did wrong- did they miss filling out the field, or did they just forget to put dashes in their phone number? 

When you bind an event handler to something that has a _default action_, the handler will fire and then the default action will happen. A default action is something like a form's submission to the location that's in the action property, or the navigation that happens when you click a link. In order to render errors, you have to stop the default action. One way is to use `event.preventDefault();`, but simply calling `return false` from within a jQuery event handler will stop the default event from occuring. 


```javascript
$("#myForm").on("submit", function() {
  if (some_error_condition) {
    var errDiv = $('<div class="error">Please fix your phone number</div>')

    $("#myForm").append(errDiv);
    
    return false; // This tells the submission not to happen
  }
})


```


### Exercise 
This should take you about 1.5 hours to complete.  

https://github.com/gSchool/form_validation/blob/master/README.md


## Reflect
Let's reflect on what we've learned.

### Self-Assessment

How’d you do? Go back to the "Objectives" section. Go through each one and ask yourself:

- Have I completed this objective?
- What concrete evidence do I have that I've completed the objective?

Rate yourself 1 through 4 for each objective in terms of competence (4 being the highest). If you rate yourself a 2 or below, please notify an instructor for additional help.

If you haven't completed an objective, or you can't define a term, take a few minutes to try to fill in any gaps.

### Questions
* Why do we need to do form validation inside an event listener?
* What is a better experience for the user- using the `required` attribute, or using JS to ensure all required fields are checked?
* Why might browser validation not be enough?
* What would happen if someone used console Javascript to submit their form, bypassing your validation?


