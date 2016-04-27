# Intro to HTML

## Entry Ticket
To start this, make sure you're familiar with creating files and directories in terminal. Also make sure you know how to open files on your hard drive from terminal, with the `open` command, as well as how to open files in Atom with the `atom` command.

# Materials

For this learning experience, you'll need to have the following installed:

* [Atom](https://atom.io/)
* [Chrome](https://www.google.com/chrome/browser/desktop/)

It's also important to have the Chrome set as your default browser.

# Objectives

By the end of this lesson you should be able to:

- Create HTML pages from scratch
- Link them to other documents, images, or other types of files
- Create HTML Tables

In other words... create a document you can put on the web and share with others!

# Coursework

### What is HTML?
HTML is a subset of a language called XML. Anytime you see a webpage in a browser, HTML is the language telling the browser what content to put on the screen.

- HTML *describes* and applies *structure* to a page; it's the skeleton.
- Browsers *parse* and then *render* the HTML so that it's human-readable.

### Syntax

#### Tags Make Elements

You've probably run into tags before if you've ever used the Internet. You've seen paragraph tags - `<p>`, or you've run into `<span>` or `<div>`. You may have used `<a href="http://example.com">Click here</a>`
before to link to something.

Tags are the basic unit of HTML. Think of tags (anything that starts with < and ends with >) as _boxes_. The words in between the angle braces (> & <) are like labels to tell you what the box contains.  

HTML _tags_ are used to wrap *content*, by which we usually mean text or other tags.

```html
<p>Some text.</p>
```
The tags above are `<p>` & `</p>`, and the content is "Some text."
The _opening tag_ is the `<p>`, and the _closing tag_ is the `</p>`. These are the bounds of the box, they define it's beginning and end.

When tags are read by the browser, they form an HTML `element`. The use of `p` tags surrounding text above creates an HTML element.

#### Self-closing tags

Not all tags need a beginning and an end, some tags are self-closing and do no need to wrap content. This is because they aren't thought of as enclosing anything. Think of them as boxes that are already closed and taped up, so there's no need to close them.

```html
<img src="foo.com/thing.png">
```

```html
<input value="Input Here!">
```

```html
<hr>
```

### Attributes

The above examples contain _attributes_, which are more information attached to an _element_. These attributes are usually to generate content or to act as a reference for other technologies like CSS & JS.

This image (`<img>`) has a _source_ and _alternate_ attribute. The source (`src`) attribute tells the element what image file to display, and the alternate (`alt`) attribute tells the element what text to display if the image can't be displayed for some reason.

```
<img src="foo.com/thing.png" alt="A cool image of a foo thing.">
```

This _anchor_ (`<a>`) link has a hypertext reference (`href`) attribute. The reference tells the link tag where to take you when clicked.

```html
<a href="/contact">Contact Page</a>
```

This title has a `class` attribute. It tells the browser what styles to apply to the element.

```html
<h1 class="content-title">You Will Never Guess What This Puppy Does With Her Brunch.</h1>
```

The value that an attribute is assigned is called a `value`. For example, in the preceding example, the `value` of the `class` attribute is "content-title"

### Structure
HTML can be thought of as a tree structure, which is similar to a family tree. Each element has a  *parent*, it sometimes has *siblings* and it also may have *children*. Imagine a large box that you put smaller boxes in - the smaller boxes are contained within the larger box. They can't be in multiple boxes at once, so the larger box can be thought of as their *parent* or *container*. The smaller boxes can contain still smaller boxes, aka *children*.

Here's an example:

```html
<html>
	<head>
		<title>The title is nested in the head</title>
	</head>
	<body>
		<h1>This header is nested in the body>
		<div>
			<p>This paragraph is nested in the div tag above it, which is itself nested in the body. It's a <em>child</em> of the div.</p>
		</div>
	</body>

</html>
```

You'll note that it's easier to visualize what is contained within what because we're using tabs to indent every time we open up a new tag. This isn't important for the computer to read and render the code you write, it's to make the code easier for a programmer to read and use.  
This image is how the above HTML can be visualized.
![credit: http://www.efishdesign.com/tutorials/javascript.php](http://www.efishdesign.com/tutorials/dom-tree.png)

### DOCTYPE

The <!DOCTYPE> declaration must be the very first thing in your HTML document, before the <html> tag.

The <!DOCTYPE> declaration is not an HTML tag; it is an instruction to the web browser about what version of HTML the page is written in.

In this course we are going to be using HTML5. It's DOCTYPE is `<!DOCTYPE html>`

#### Intro to HTML - Exercise 1

### Tables
Tables are how we display "tabular data" in HTML. What this really means is something like this:
![table examples](http://www.codeproject.com/KB/office/WebExcel/Excel.jpg)
Any time you have something that would be good in a spreadsheet, Tables are the way to go.

> Early in the history of the web, people tried to adapt tables for layout purposes. Today, we have CSS Grid Systems and tables are back to being used for their actual purpose. This is one of the first examples of how code can be "abused"- AKA used for a purpose other than what it was designed for. Tables worked well when you could be sure of what size everyone's screens were (remember when monitors were all the same size?) but nowadays they just break when viewed on a small screen (like a phone) or a big one (like a giant iMac monitor).

Table tags:
`<table>` - represents tabular data: information expressed via two dimensions or more.

`<thead>` - defines a set of rows defining the head of the columns of the table.

`<th>` - defines a cell of a table that contains data. It participates in the table model.

`<tbody>` - defines one or more <tr> element data-rows to be the body of its parent `<table>` element.

`<td>` - defines a cell of a table that contains data. It participates in the table model.

`<tr>` - defines a row of cells in a table. Those can be a mix of <td> and <th> elements.

`<tfoot>` - defines a set of rows summarizing the columns of the table.


Take a look at the documentation for Tables. There are very good examples on how to utilize `<table>`. Keep this documentation up, and use it to find out how to use the elements you need in order to complete the exercise below.
[Table Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)


### Tables
Tables are how we display "tabular data" in HTML. What this really means is something like this:
![table examples](http://www.codeproject.com/KB/office/WebExcel/Excel.jpg)
Any time you have something that would be good in a spreadsheet, Tables are the way to go.

> Early in the history of the web, people tried to adapt tables for layout purposes. Today, we have CSS Grid Systems and tables are back to being used for their actual purpose. This is one of the first examples of how code can be "abused"- AKA used for a purpose other than what it was designed for. Tables worked well when you could be sure of what size everyone's screens were (remember when monitors were all the same size?) but nowadays they just break when viewed on a small screen (like a phone) or a big one (like a giant iMac monitor).

Table tags:
`<table>,<thead>,<th>,<tbody>,<td>,<tr>,<tfoot>`

Take a look at the documentation for Tables. Keep this documentation up, and use it to find out how to use the elements you need in order to complete the exercise below.
[Table Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)
