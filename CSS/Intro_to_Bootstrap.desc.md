## Bootstrap Introduction

[Bootstrap](http://getbootstrap.com/) is a front-end framework that helps make your web applications look less ugly. It offloads much of the CSS you might otherwise need to write into some sensible default styles, so that you can focus more on building your application and less on technical details in your stylesheet.

## Installing Bootstrap

Bootstrap's documentation offers up a number of installation options. To keep things simple though, we're going to use the Bootstrap CDN.

**What's a CDN?**

Great question! A CDN (short for **C**ontent **D**elivery **N**etwork) is used to cache static content (e.g. JS/CSS files) across a geographically dispersed network of servers. When a user makes a request for a file hosted on the CDN, the server which is geographically closest to the user will serve up the requested file. In this way, load times are reduced, and users are less annoyed by slow page loads. (To learn more about CDNs, check out [Why Use a Content Delivery Network (CDN)?](https://gtmetrix.com/why-use-a-cdn.html).)

**How Can I link to the Bootstrap CDN?**

Open up a new HTML file in your editor; let's call it `bootstrap-sandbox.html`. Fill it up with some HTML boilerplate:

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bootstrap Sandbox</title>
  </head>
  <body>
    <div>Hello, World!</div>
  </body>
</html>
```

As explained on the Bootstrap website, to hook in to the CDN you'll need to add the following code to your file:

```
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
```

Copy and paste that code above the `</head>` tag, and that's it! You're ready to start using Bootstrap.

Note: there are also a lot of Bootstrap themes that reskin the default Bootstrap styles. If you're interested, check out http://www.bootstrapcdn.com/bootswatch/.

## Aside: Atom Snippets

Recommended bootstrap plugin for atom: 'atom-bootstrap3'

http://code-maven.com/add-code-snippets-to-atom

## Containers and the Grid System

Bootstrap has a lot to offer, and we don't have time to go over all of it (check out the [docs](http://getbootstrap.com/)  if you want to dig deeper). Our goal here is just to hit on some of the most important features that Bootstrap brings to the table.

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

To make use of the grid layout, we can add column classes to our divs. Every column needs to be inside of a div with the row class in order for Bootstrap's styling magic to work.

Let's throw some more divs into our html document to see a couple examples of Bootstrap's grid layout in action. (We'll throw in some of Bootstrap's default background classes as well, just to help make the columns easier to see.)

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bootstrap Sandbox</title>
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
  </head>
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
</html>
```

Take a few minutes to play around with the grid system. Try to answer some of the questions in this learning experience around Bootstrap and the grid system.

## Tables Revisited

Earlier we used CSS to style some tables to make them more readable. Bootstrap makes your lives much easier in this regard. Let's explore a simple example. Do the following:

1. Put a `<table>` into your HTML document. Make sure it has at least four rows and at least two columns, and that each table cell has some text in it. Looks like garbage, right?

2. Add the `.table` class to your table. A little redundant, but the end result is worth it.

3. Want some borders? Add the `.table-bordered` class to your table too.

4. Want the rows to be striped? Add `.table-striped`!

5. What about a hover effect?

6. Like with background colors, table rows and cells come with some default coloring options. Try adding one of the `.success`, `.warning`, `.danger`, or `.info` classes to one of your rows.

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

Try out some other things with forms, comparing styling with Bootstrap and without it:

1. Add another input! Suggestions: Password, Address, or Favorite Food.

2. Give your form the `.form-inline` class. What happens? What happens if your window is small?

3. What happens if you add `disabled` as an attribute to one of your inputs?

4. Add a checkbox! Give your div wrapping the checkbox input the `checkbox` class.

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

1. What does adding the `.btn` class do?

2. Once you've added the `.btn` class to an element, you can add other classes for addition styling. Play around with `.btn-default`, `.btn-primary`, `.btn-success`, `.btn-info`, `.btn-warning`,`.btn-danger`, and `.btn-link`.

3. What does the `.btn-block` class do when used in conjunction with `.btn`?

4. What do you think the `.btn-lg` class does? Can you guess what some other button classes might be?

Further reading:

[Forms in Bootstrap](http://getbootstrap.com/css/#forms)

## Glyphicons

One other nice feature of Bootstrap is that it comes with a set of icons called [Glyphicons](http://getbootstrap.com/components/#glyphicons). To use a glyphicon, just create a `<span>` element and give it the class `.glyphicon`, along with whatever class is specific to the icon you want to use. For example, if you want to display the heart icon, you would need to write:

`<span class='glyphicon glyphicon-heart'></span>`.

Protip #1: The spans for your icons must always be empty!

Protip #2: It is super easy to misspell the word glyphicon. Watch out.

Protip #3: It's best practice to use `<button>` elements if you want to use buttons in Bootstrap. Check the [documentation](http://getbootstrap.com/css/#buttons) for more details.

## Nav bars

Finally, let's take a quick look at navigation bars in Bootstrap. Since nearly every website has a header and footer, nav bars are fairly universal design elements. It shouldn't be surprising, then, that Bootstrap provides us with some sensible styles.

Here's the basic pattern:

```
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Here's where you put all your navigation -->
  </div>
</nav>
```

Try your hand at adding the following design elements to your navigation bar:

1. Add a name for your site! Typically the name is wrapped in an `<a>` tag that's been given the `.navbar-header` class. To make the design more responsive, you can also wrap this entire tag inside of a `<div>` with the `.navbar-header` class.
2. Add some links! Create an unordered list after your title and give it a couple of classes: `.nav` and `.navbar-nav`. For each `<li>` in your list, wrap the name of the link (e.g. About, Contact) in an `<a>` tag.
3. Explore alignment! What happens if you give your list of links the `.navbar-right` class?
4. (Bonus) Put a form in your navigation! If you run into alignment issues, try giving your `<form>` the `.navbar-form` class.
5. (Bonus) Change one of your `<li>` links into a dropdown! Here's a template for dropdowns:

```
<li class="dropdown">
  <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
  <ul class="dropdown-menu">
    <li><a href="#">Option 1</a></li>
    <li><a href="#">Option 2</a></li>
    <li class="divider"></li>
    <li><a href="#">Separated Option</a></li>
  </ul>
</li>
```

If you copy this code as-is, you may notice a problem: the dropdown isn't showing up! This is because Bootstrap dropdowns require the use of Bootstrap's javascript file, which in turn requires [jQuery](https://jquery.com/). But we haven't included jQuery in our file! To remedy this, you'll need to snag the relevant jQuery JS file. See if you can do this using the same CDN approach that we used to grab Bootstrap!

### Exercises!

[CSS Assignment - try some of these, but use bootstrap!](https://github.com/gSchool/css-week-1)

[Bootstrap Assignment](https://github.com/gSchool/bootstrap_mocks_assignment)
