# HTML Forms

Forms are ubiqutous in web development. They are used in a wide variety of situations, but always to collect input from a user. If you've ever entered your credit card information to a website, performed a search on Google, or logged into Facebook then you've used forms.

Forms are far and away the most common method of getting information from your user into your programs. Sometimes this information never leaves the browser, and sometimes it is sent to a webserver. 

##Objectives -- You Should Learn How To

* Create a form in HTML using the `<form>` tag.
* Use and overwrite default form behaviors.
	* `action`, `method`, and event JS binding.
* Use `<label>` tags to add labels to form elements.
* Use form input tags:
	* `<input>, <textarea>, <button>` 
* Use multiple `types` of the `<input>` tag.


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

Forms contain a collection of __form elemenets__ which have defined behavior when wrapped inside of a `<form>` tag. While it's perfectly vaild to use form elements like `<button>` and `<input>` outside of a form they behave in convienent and useful ways when combined with `<form>`. 

## Building a Form

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

### What About that Table?

How did we extract the information sent in query params and put it in a table? Try looking at the file js/app.js in the cloned repo. Here is the most important snippet from that code:

```
var queryString = document.location.search.replace('?', '');
var pairs = queryString.split('&').map(function (pair) {
      return pair.split('=');
    });
```

We've used JavaScript and the `document.location` object to extract the query parameters. Challenge yourself to understand how this code works!


### More Form Types

The rest of the challenges in our repo ([https://github.com/gSchool/html-forms](https://github.com/gSchool/html-forms)) will have you experiment with other input types including `checkbox`, `hidden`, `radio button`, and more. Knowing what types of inputs are available is essential too designing a form that is simple and easy to use. When you encounter a new type ask yourself "what would I use this for?" 

Also, keep in mind that there are [a huge number](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) of input types, especially for browsers with HTML5 support. For additional design flexibility, try using the `<fieldset>` and `<legend>`. For example, how does this render?

```
 <form action="index.html" method="get">
      <fieldset>
        <legend>Size</legend>
        <label>For text</label>
        <input id="1"/>

        <label>For Second Text</label>
        <input id="2" name="secondText" type="text"/>

        <label>For textarea</label>
        <textarea id="textArea1" name="textArea1"></textarea>

        <label>For Second Text Area</label>
        <textarea id="textArea2" name="preFilledTA"></textarea>
      </fieldset>
      <label>For Email</label>
      <input id="3" name="email" type="email"/>
```


## Controlling Forms

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

##Additional Resources on Forms

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/My_first_HTML_form
- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
- http://diveintohtml5.info/forms.html
