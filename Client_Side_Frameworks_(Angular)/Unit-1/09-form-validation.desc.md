# Form Validation with Angular.

## Objectives
- Explain why client side validations don’t replace server side validations.
- Implement validation using Angular validation properties
 - $valid
 - $invalid
 - $pristine
 - $dirty
 - $touched

### Why we validate on the client side

Form and controls provide validation services, so that the user can be notified of invalid input before submitting a form. This provides a better user experience than server-side validation alone because the user gets instant feedback on how to correct the error and better yet, we don't need to even bother going to the server if the user fails the client side validation.

### Why we can't ONLY validate on the client side

Keep in mind that while client-side validation plays an important role in providing good user experience, it can easily be circumvented and thus can not be trusted. Server-side validation is still necessary for a secure application. We can easily disable javascript and delete things from the DOM using the developer tools - so we need to ensure that we are validating in a place where users do NOT have access.

## Resource:

This is a very good resource that explains validation in angular.
[http://www.ng-newsletter.com/posts/validations.html](http://www.ng-newsletter.com/posts/form-validation-with-angularjs.html)

### A quick walkthrough of angular form properties, classes and descriptions

This table and the corresponding descriptions come from [this](https://scotch.io/tutorials/angularjs-form-validation-with-ngmessages) fantastic tutorial.

| Property  |  Class | Description  |
|---|---|---|
| $valid  |  ng-valid | Boolean that indicates whether an item is currently valid based on the rules you placed.  |   
| $invalid  |  ng-invalid |  Boolean that indicates whether an item is currently invalid based on the rules you placed. |   
|  $pristine |  ng-pristine |  Boolean that's true if the form/input has not been used yet. |   
|  $dirty |  ng-dirty |   Boolean that's true if the form/input has been used. |   
|  $touched |  ng-touched |  Boolean that's true if the input has been blurred |   


## Building your first form

Lets take a look at the [angular-intro-to-validation](https://github.com/gSchool/angular-intro-to-validation) repository. Validation is very detailed oriented work, we will work through both examples to show how all the pieces interact together. These examples are in the `_dirty_pristine_touched`, and in the `_valid_invalid` folders.

### Inline exercise
- In the `_valid_invalid` folder,
 - Add a validation message for when the email is not valid.
 - Add code so that validation errors only appear after the field has been touched.
 - Have the background color of the form change to green when the form is valid.


## Accessing and targeting our form and inputs

In order to use angular form validation we have to abide by the following rules

- We must give our form a name attribute (let's imagine a name attribute = "firstForm")
	- We can then do things like `controllerAlias.firstForm.$valid` (which returns true or false)
- We have to put an ng-model on each of our inputs (remember to use the dot!)

A couple extra things:
- If we do not want to use the standard HTML5 validations we add `novalidate` as an attribute to our form
- To access angular properties on our inputs we use the syntax `controllerAlias.formName.inputName.angularProperty`.
  + We can then do things like `controllerAlias.firstForm.username.$valid` or `controllerAlias.firstForm.username.$error` (to see an object with any errors)

## Styling our forms and displaying error messages:

It would be much nicer if we could display a message to our user and style it accordingly. We are going to be using bootstrap as it gives us some nice classes for validation (you can read more about them [here](http://getbootstrap.com/css/#forms-control-validation))

In order to add a class based off of a condition we are going to be using the built in `ng-class` directive (docs are [here](https://docs.angularjs.org/api/ng/directive/ngClass). There are a few ways to use `ng-class`, the way we will be using it is as follows (pay close attention to the quotes!)

`ng-class="{ 'class-name' : expression, 'another-class': another expression }".`

An example of this would be: `"{ 'has-error' : sampleForm.username.$invalid }"`

But how about showing an error message? To do this we are going to be using the `ng-show` directive which works like this:

`ng-show="condition"`

An example of this would be:
`<span ng-show="sampleForm.username.$invalid">Username is invalid</span>`

## Visualization

If you would like a great example of how these form classes and properties work (99% borrowed from scotch.io) - check out [these](http://sales-person-licks-61176.bitballoon.com) validation tables


## Questions
### Exercise 1

First, answer the following questions

- When does a form/input have a property of $valid? What class accompanies this property?
- When does a form/input have a property of $invalid? What class accompanies this property?
- When does a form/input have a property of $pristine? What class accompanies this property?
- When does a form/input have a property of $dirty? What class accompanies this property?
- When does a form/input have a property of $touched? What class accompanies this property?
- What does blurred mean? (research the `blur` event)

### Exercise 2

For the next set of questions, assume that you have a form with a name="quizForm"

- Create a text input with a name of "question" and give it a validation of "required". If it is $valid add a class of "valid"
- For your text input with a name of question, add a paragraph tag with the text "please enter a question" if the input is not valid
- Create a text input with a name of "answer" and give it a validation of "required" and a minimum length of 4 characters. If it is $valid and not $pristine add a class of "correct". This class changes the border color of the input box to green.
- How would you access all of the errors (in an object) for an input with a name of `controllerAlias.quizForm.username`?
- What validations would you add in an input to make sure that there is a minimum length of 4 and a maximum length of 20?
- What validation would you add in an input to make sure that only numbers between 1 and 5 are a valid input (use regular expressions for this!)?

## Exercise 3 - styling our form and adding some error messages!

Now that you have a solid understanding of these properties/classes, let's build another form with an action of "#" and four text inputs for a `username`, `password`, `email` and `zip code`. Your form should validate that the username and password are both between 3 and 12 characters long. It should also make sure that the email is a valid email and that the zip code is a five digit number (use [ng-pattern](https://docs.angularjs.org/api/ng/directive/ngPattern) and regular expressions for this!).

Now that we have an idea of how to style and display error messages, let's do the following

- include bootstrap for styling
- display error messages if inputs are invalid (write whatever you would like for the error message)
- add a class of `has-error` if the validation fails
- add a class of `has-success` if the validation passes
- only display the error message/styling if the user has typed something
- when the form is submitted, collect the inputs and add them to an array called `users` (this will be done in your controller)
  + remember that the default behavior for the form submission is a page refresh - you will need to prevent this.
  + make sure to clear all the form values and validations (you should use a method from [here](https://docs.angularjs.org/api/ng/type/form.FormController) to do that )
  + display the array of users (each one should be an object) at the top of your form (see the gif below for guidance).

Your form should work like this:

[![https://gyazo.com/a6a93b98ada81f54140052956cea2cb0](https://i.gyazo.com/a6a93b98ada81f54140052956cea2cb0.gif)](https://gyazo.com/a6a93b98ada81f54140052956cea2cb0)

## Bonus - refactor using ngMessages

Our HTML is getting a bit messy, it would be nice to have an easier way to deal with error messages, that's where ng-messages comes in. Walk through [this](https://scotch.io/tutorials/angularjs-form-validation-with-ngmessages) or [this](http://www.yearofmoo.com/2014/05/how-to-use-ngmessages-in-angularjs.html) tutorial and refactor your form to use ng-messages.

## Additional Resources

[https://docs.angularjs.org/guide/forms](https://docs.angularjs.org/guide/forms)

[https://docs.angularjs.org/api/ng/directive/input](https://docs.angularjs.org/api/ng/directive/input)
