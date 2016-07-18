<<<<<<< HEAD
# Web Forms: Event Listeners, Action / Method, Getting Values
=======
# HTML Forms

Let's process some data!
>>>>>>> ac473589f752ad9f14026d7644f73e7a6173e702

## Objectives

* Explain what an HTML form is.
* Explain what control tags are.
<<<<<<< HEAD
* Build a web form with various controls tags.
* Access the values of inputs
* Hijack form submissions using `.preventDefault()`
=======
* Build an HTML form with various controls tags.
* Verify user data with the built-in HTML5 form validation.
* Verify user data with JavaScript-based form validation.
>>>>>>> ac473589f752ad9f14026d7644f73e7a6173e702

## What's an HTML form?

If you've ever given your credit card information to a website, performed a search on Google, or logged into Facebook then you've used an HTML form. **HTML forms** (or just forms) are the main way of obtaining information from your user into your application. Sometimes this information never leaves the browser and sometimes it's sent to a web server.

At it's core, Google's search page is a simple HTML form with one input and two buttons:

![](http://i.imgur.com/hcP92bJ.png)

With a little code, we can easily recreate this:

```html
<form>
  <input type="text">

  <div>
    <button>Google Search</button>
    <button>I'm Feeling Lucky</button>
  </div>
</form>
```

Like all forms, this one contains a few control tags.

## What's a control tag?

The following HTML tags are **control** tags that build elements which a user can control to give information:

- `<input>`
- `<select>`
- `<textarea>`
- `<button>`

Before the rise of JavaScript, control tags were always nested within a `<form>` tag. That's because control tags have a predefined behavior when nested inside of a `<form>` tag. Nowadays, the `<form>` element isn't needed anymore. Fortunately for you, we'll be teaching you both techniques.

### The `<input>` tag

There are many ways in which the [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) control tag can be used, but the most common (and default) way is as a single-line text field:

```html
<input type="text">
```

Remember when we talked about semantic HTML? Well, we also have semantic `<input>` types that help describe the nature of the input. Aside from `type="text"`, there's also the following textual controls:

```html
<input type="email">
<input type="search">
<input type="password">
<input type="tel">
<input type="url">
```

These control types provides some basic input validation, data formatting, and/or special keyboard types on mobile.

Additionally, there are the following non-textual controls:

```html
<input type="color">
<input type="date">
<input type="file">
<input type="number">
<input type="range">
```

### Radios and Checkboxes

The `<input>` control also has a `radio` and `checkbox` type for displaying both radio buttons and checkboxes respectively. Both of these types allow the user to select options from a set of choices. The key difference is that radio buttons only allow one choice.

```html
<input type="radio" name="rappers" value="Biggie"> Biggie
<input type="radio" name="rappers" value="Dre"> Dre
<input type="radio" name="rappers" value="Snoop" checked> Snoop
```

As you can see, each radio button must belong to a **group** which is defined by setting the `name` attribute to the same value. This forces one radio button to be selected per group.

On the other hand, checkboxes use `type="checkbox"` and it's `name` must be different per `<input>` control.

```html
<input type="checkbox" name="rapper1" value="Ice Cube"> Ice Cube
<input type="checkbox" name="rapper2" value="Kanye" checked> Kanye
<input type="checkbox" name="rapper3" value="Eminem"> Eminem
```

### Hidden fields

Hidden fields are, well, hidden. Surprise! These have been quite useful in passing data in through the form that the user does not need to enter specifically.

```html
<input type="hidden" name="secret" value="Tupac is alive">
```

### The `<label>` tag

Each control tag will usually have some sort of caption that instructs the user on what type of input to give. For example, next to a text box with a caption "Name", you are then expected to type your name in. We use the `<label>` element to specify the text that describes the expected input.

For example:

```html
<label>
  Album
  <input type="text" name="album">
</label>
```

You can also connect a `<label>` tag to an `<input>` tag with the `for` and `id` attributes respectively:

```html
<label for="album">Album</label>
<input id="album" type="text" name="album">
```

### The `<select>` tag

You can create select boxes that allow the user to choose from a set of options. You have the ability to allow users to select multiple options by using the `multiple` attribute.

```html
<!-- The second option will be initially selected. -->
<select name="vh1_show">
  <option value="basketball_wives_la">Basketball Wives LA</option>
  <option value="get_rich_or_die_tryin" selected>Get Rich or Die Tryin'</option>
  <option value="black_ink_crew">Black Ink Crew</option>
</select>
```

Multiple choice select boxes:

```html
<!-- The second and third option will be initially selected. -->
<select name="vh1_show" multiple>
  <option value="the_jame_foxx_show">The Jamie Foxx Show</option>
  <option value="fresh_prince_of_bel_air" selected>Fresh Prince of Bel-Air</option>
  <option value="love_and_hip_hop_atlanta">Love and Hip Hop Atlanta</option>
</select>
```

### Buttons

We've seen plenty of buttons before, but let's dig a little bit deeper...

```html
<button name="button">Belly</button>
```

Buttons contain a `type` attribute with three options.

* `button` (default)
* `submit` (default when in a form)
* `reset`

```html
<button type="button">This an anonymous button</button>
<button type="submit">This a submit button</button>
<button type="reset">This a reset button</button>
```

### And many more...

There are more challenges in [this repository](https://github.com/gSchool/html-forms) where you can experiment with the basic control tags. Knowing what types of inputs are available is essential to designing a form that is simple and easy to use. When you encounter a new type ask yourself "what would I use this for?"

### Common Attributes

With control tags, there are a variety of attributes available. Many attributes vary by tag and some are nonstandard but highly recommended.

- autocapitalize
- autocomplete
- autofocus
- checked
- disabled
- maxlength
- minlength
- multiple
- name
- placeholder
- pattern
- required
- readonly
- size
- spellcheck
- tabindex
- value

## Form Validation

### Why?

As a web developer, you will spend an obscene amount of time working on HTML forms. Form validation is a large part of what is project-specific, and dependent on what's called "business logic". Because it varies from project to project, what gets validated and how, according to what needs, is something that's always being tweaked, prodded and updated. 9 times out of 10 when you collect information from a user, it's going to be from a form, and you want the user to have a nice experience.

We're also validating our form input because our programs can't work without proper inputs. Writing simple programs up until this point means only one person has been using your program: you. In the future, this won't be the case. Your users will often make mistakes, and will often need to be corrected in an expedient way that encourages the user to continue interacting with the form.

So what do we do to ensure we get good input for our programs?

### HTML5 Validation

First, we need to make it easy for humans with *good* intentions to use our interface. We can use a number of HTML5 features to do this, such as `tabindex`, `input` types, and `patterns`.

Given the form below, change it to use HTML5 form validation:

* Email fields are `type="email"`
* numerical fields are `type="number"`
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

### What will HTML5 do?

When an element is invalid, two things occur:

* The element will now match a special CSS pseudo-class called `:invalid`. This allows you to stylize your invalid elements. Similarly, valid elements match the `:valid` pseudo-class.
* The browser will try to block the user from submitting the form.

### JS Validation

Now that we've done some validation with HTML5, it's time to use JS to finish up the job.

#### Accessing values

There are a number of validation libraries that we can use, allowing us to validate our forms using code someone else has written. Rather than doing that, however, we need to understand how these libraries work underneath the hood.

First, let's look at how to go about getting the values from the form:


```html
<input type="phone" name="phone" id="phone">
```

We can access the current value of any `input` element like so:

```javascript
var phoneValue = document.getElementById("phone").value;
```

This also works for `textarea` elements as well.


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

#### When to access values

Now that we know how to access values, we need to know when to access them. If we were to use the above code when the page loads, we would only see blank or placeholder values. Why? Because the user has not inputted anything yet. We need to either wait until all fields have been filled out and validate on the form submission or check each individual field after the user has inputted a value.

**submit event**

Want to validate the entire form at once? Then we need to "listen" for the "submit" event on the form.

```javascript
var myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function () {
  // do entire form validation here
});
```

**blur event**

If we want to check a field as soon as a user is done typing, we can listen for the "blur" event, which fires as soon as a field loses focus.

```javascript
var myForm = document.getElementById('myForm');
myForm.addEventListener('blur', function () {
  // do single input validation here
});
```

#### What do I do if there's an error?

A typical pattern is to display a new DOM element that lists the error in question either next to the incorrectly filled out element or at the top of the form. Try to be descriptive, telling the user what they did wrong.

<<<<<<< HEAD
When you bind an event handler to something that has a _default action_, the handler will fire and then the default action will happen. A default action is something like a form's submission to the location that's in the action property, or the navigation that happens when you click a link. In order to render errors, you have to stop the default action. One way is to use `event.preventDefault();`, but simply calling `return false` from within a jQuery event handler will stop the default event from occurring.
=======
When you bind an event handler to something that has a *default action*, the handler will fire and then the default action will happen. A default action is something like a form's submission to the location that's in the action property, or the navigation that happens when you click a link. In order to render errors, you have to stop the default action. One way is to use `event.preventDefault();`, but simply calling `return false` from within a jQuery event handler will stop the default event from occurring as well:
>>>>>>> ac473589f752ad9f14026d7644f73e7a6173e702


```javascript
var myForm = document.getElementById('myForm');
myForm.addEventListener('submit', function() {
  if (some_error_condition) {
    var errDiv = document.createElement('div');
    errDiv.className = 'error';
    errDiv.textContent = 'Please fix your phone number';
    myForm.appendChild(errDiv);
    return false;       // This tells the submission not to happen
  }
});
```

## Questions

* Why do we need to do form validation inside an event listener?
* What is a better experience for the user- using the `required` attribute, or using JS to ensure all required fields are checked?
* Why might browser validation not be enough?
* What would happen if someone used console Javascript to submit their form, bypassing your validation?

## Materialize Forms

Check out the Materialize [form documentation](http://materializecss.com/forms.html) to see some simple ways to make your forms look awesome. The [dialogs documentation](http://materializecss.com/dialogs.html) offers many helpful tools to help you properly display validation errors.

## Additional Resources on Forms

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form
- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
- http://diveintohtml5.info/forms.html
- http://www.wufoo.com/html5/