[Bootstrap](http://getbootstrap.com/) is a **front-end framework** that comes with a responsive, flexible grid system and allows you to quickly make your site look less ugly. It offloads much of the CSS you might otherwise need to write into some sensible default styles, so that you can focus more on building your application and less on technical details in your stylesheet.

* [Installing Bootstrap](#installing-bootstrap)
* [Containers and the Grid System](#containers-and-the-grid-system)
* [Tables Revisited](#tables-revisited)
* [Forms and Buttons](#forms-and-buttons)
* [Glyphicons](#glyphicons)
* [Navbars](#navbars)

<hr style="margin: 5rem 0;"/>

## Installing Bootstrap

Bootstrap's documentation offers up a number of installation options. To keep things simple, we're going to  but we're going to use the Bootstrap CDN.

### What's a CDN?

Great question! A CDN (short for Content Delivery Network) is used to cache static content (e.g. JS/CSS files) across a geographically dispersed network of servers. When a user makes a request for a file hosted on the CDN, the server which is geographically closest to the user will serve up the requested file. In this way, load times are reduced, and users are less annoyed by slow page loads.
(To learn more about CDNs, check out [Why Use a Content Delivery Network (CDN)?](https://gtmetrix.com/why-use-a-cdn.html).)

### How Can I link to the Bootstrap CDN?

Create a new repository called `intro-to-bootstrap`. Create a new `index.html` file and include the following code.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Intro to Bootstrap</title>
  </head>
  <body>
    <div>Hello, World!</div>
  </body>
</html>
```

Read the section on [getbootstrap.com](http://getbootstrap.com) about the [Bootstrap CDN](http://getbootstrap.com/getting-started/#download-cdn). Copy the code there into the appropriate place on your HTML page.

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem; margin-bottom: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>[Bootswatch](https://www.bootstrapcdn.com/bootswatch/) is a site that allows you to quickly theme your Bootstrap implementation. Find a theme you like and replace the appropriate link in your `head`.</p>

  </div>
</div>

## Containers and the Grid System

One of the most important features of Bootstrap is its grid system. The grid system allows you to easily organize your content into a responsive design based around a 12-column grid. In order to make use of this grid, we need to wrap the main area of our content in one of Bootstrap's container classes: either `.container` or `.container-fluid`:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bootstrap Sandbox</title>
  </head>
  <body class="container-fluid">
    <div>Hello, World!</div>
  </body>
</html>
```

To make use of the grid layout, we can add **column** classes to our divs. Every column needs to be inside of a div with the **row** class in order for Bootstrap's styling magic to work.

Replace your `body` tag with the following markup below:

```
<body>
  <div class="container-fluid">
    <div class="row">
  	<div class="col-md-12 bg-primary">Hello, World!</div>
    </div>
    <div class="row">
	<div class="col-md-6 bg-success">Hello,</div>
	<div class="col-md-6 bg-danger">World!</div>
    </div>
    <div class="row">
      <div class="col-md-2 bg-info">Hi!</div>
      <div class="col-md-2 bg-warning">Hi!</div>
      <div class="col-md-2 bg-info">Hi!</div>
      <div class="col-md-2 bg-warning">Hi!</div>
      <div class="col-md-2 bg-info">Hi!</div>
      <div class="col-md-2 bg-warning">Hi!</div>
    </div>
    <div class="row">
	<div class="col-md-6 col-md-offset-3 text-center">Hello, World!</div>
    </div>
  </div>
</body>
```

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem; margin-bottom: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Take a look at the classes attached to each `div` element and then answer the following questions:</p>

    <ol>
      <li>What is the difference between `.container` and `.container-fluid`?</li>
      <li>What are the possible values for the middle two characters when creating a column? What do they do?</li>
      <li>What are the possible values for the last number when creating a column? What do they do?</li>
      <li>What happens if you add too many columns?</li>
    </ol>

  </div>
</div>

<hr style="margin: 5rem 0;"/>

## Tables Revisited

Earlier we used CSS to style some tables to make them more readable. Bootstrap makes your lives much easier in this regard. Let's explore a simple example. Do the following:

1. Put a `<table>` into your HTML document. Make sure it has at least four rows and at least two columns, and that each table cell has some text in it. Looks like garbage, right?

2. Add the `.table` class to your table. A little redundant, but the end result is worth it.

3. Want some borders? Add the `.table-bordered` class to your table too.

4. Want the rows to be striped? Add `.table-striped`!

5. What about a hover effect?

6. Like with background colors, table rows and cells come with some default coloring options. Try adding one of the `.success`, `.warning`, `.danger`, or `.info` classes to one of your rows.

<hr style="margin: 5rem 0;"/>

## Forms and Buttons

When it comes to forms, the `.form-control` class will be your best friend. Here's a simple example:

```
<div class="container-fluid">
  <!-- Without Bootstrap -->
  <div class="row">
    <div class="col-md-12">
      <form>
        <div>
          <label for="exampleName">Name</label>
          <input type="text" name="exampleName" id="exampleName" placeholder="Name">
        </div>
      </form>
    </div>
  </div>
  <!-- With Bootstrap -->
  <div class="row">
    <div class="col-md-12">
      <form>
        <div class="form-group">
          <label for="exampleName">Name</label>
          <input type="text" name="exampleName" id="exampleName" class="form-control" placeholder="Name">    
        </div>
      </form>
   </div>
</div>
```

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem; margin-bottom: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Try out some other things with forms, comparing styling with Bootstrap and without it:</p>

    <ol>
      <li>Add another input! Suggestions: Password, Address, or Favorite Food.</li>
      <li>Give your form the `.form-inline` class. What happens? What happens if your window is small?</li>
      <li>What happens if you add `disabled` as an attribute to one of your inputs?</li>
      <li>Add a checkbox! Give your div wrapping the checkbox input the `.checkbox` class.</li>
    </ol>

  </div>
</div>

You can also wrap your form in the `.form-horizontal` class to make use of grid classes and align your labels and inputs in the same row:

```
<div class="container-fluid">
  <div class="row">
    <div class="col-md-12">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label" for="exampleName">Name</label>
          <div class="col-sm-10">
            <input type="text" name="exampleName" id="exampleName" class="form-control" placeholder="Name">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="exampleEmail">Email</label>
          <div class="col-sm-10">
            <input type="email" name="exampleEmail" id="exampleEmail" class="form-control" placeholder="Email">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label" for="birthMonth">Birth Month</label>
          <div class="col-sm-10">
            <select class="form-control" name="birthMonth">
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
```

Of course, forms aren't particularly useful if you don't have any way of submitting them. Bootstrap also comes with a robust set of style rules for buttons. You can add button styling to `<a>` elements, `<input>` elements, and, unsurprisingly, `<button>` elements.

Add these three elements to your html file, and then explore the questions below:

```
<a href="#">I'm a link!</a>
<input type="button" value="I'm an input!">
<button>I'm a button!</button>
```

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem; margin-bottom: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>After adding the above code, consider the following questions:</p>

    <ol>
      <li>What does adding the `.btn` class do?</li>
      <li>Once you've added the `.btn` class to an element, you can add other classes for addition styling. Play around with `.btn-default`, `.btn-primary`, `.btn-success`, `.btn-info`, `.btn-warning`,`.btn-danger`, and `.btn-link`.</li>
      <li>What does the `.btn-block` class do when used in conjunction with `.btn`?</li>
      <li>What do you think the `.btn-lg` class does? Can you guess what some other button classes might be?</li>
    </ol>

  </div>
</div>

<hr style="margin: 5rem 0;"/>

## Glyphicons

One other nice feature of Bootstrap is that it comes with a set of icons called [Glyphicons](http://getbootstrap.com/components/#glyphicons). To use a glyphicon, just create a `<span>` element and give it the class `.glyphicon`, along with whatever class is specific to the icon you want to use. For example, if you want to display the heart icon, you would need to write:

`<span class='glyphicon glyphicon-heart'></span>`.

**Protip #1:** The spans for your icons must always be empty!

**Protip #2:** It is super easy to misspell the word glyphicon. Watch out.

**Protip #3:** It's best practice to use `<button>` elements if you want to use buttons in Bootstrap.

<hr style="margin: 5rem 0;"/>

## Navbars

Finally, let's take a quick look at navigation bars in Bootstrap. Since nearly every website has a header and footer, nav bars are fairly universal design elements. It shouldn't be surprising, then, that Bootstrap provides us with some sensible styles.

Here's the basic pattern:

```
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Here's where you put all your navigation -->
  </div>
</nav>
```

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem; margin-bottom: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Try your hand at adding the following design elements to your navigation bar:</p>

    <ol>
      <li>Add a name for your site! Typically the name is wrapped in an `<a>` tag that's been given the `.navbar-header` class. To make the design more responsive, you can also wrap this entire tag inside of a `<div>` with the `.navbar-header` class.</li>
      <li>Add some links! Create an unordered list after your title and give it a couple of classes: `.nav` and `.navbar-nav`. For each `<li>` in your list, wrap the name of the link (e.g. About, Contact) in an `<a>` tag.</li>
      <li>Explore alignment! What happens if you give your list of links the `.navbar-right` class?</li>
      <li>(Bonus) Put a form in your navigation! If you run into alignment issues, try giving your `<form>` the `.navbar-form` class.</li>
    </ol>

  </div>
</div>

You can always take a look at the [default navbar](http://getbootstrap.com/components/#navbar-default) to get a sense of all the options possible. If you copy this code to your own page you may notice the dropdown doesn't work. That's because you need to include jQuery! Try doing so using a CDN.
