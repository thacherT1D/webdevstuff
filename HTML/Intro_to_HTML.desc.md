# Intro to HTML

## Objectives

By the end of this lesson you should be able to:

* Describe what HTML is.
* Create valid HTML with the following:
  * paragraphs
  * headings
  * images
  * lists
  * tables
  * links
* Explain the importance of Semantic HTML.

In other words...create a document you can put on the web and share with others!

## What is HTML?

HyperText Markup Language (HTML) is the standard language to create webpages. It is a subset of a language called XML. Anytime you see a webpage in a browser, HTML is the language telling the browser what content to put on the screen.

* HTML *describes* and applies *structure* to a page; it's the skeleton.
* Browsers *parse* and then *render* the HTML so that it's human-readable.

It included presentation and appearance cues into the webpage, but these features are now deprecated in favor of Cascading Style Sheets (CSS). Both the HTML and CSS standard is maintained by The World Wide Web Consortium (W3C). 

## Syntax

### Tags Make Elements

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

### Self-closing tags

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

## Structure

HTML can be thought of as a tree structure, which is similar to a family tree. Each element has a  *parent*, it sometimes has *siblings* and it also may have *children*. Imagine a large box that you put smaller boxes in- the smaller boxes are contained within the larger box. They can't be in multiple boxes at once, so the larger box can be thought of as their *parent* or *container*. The smaller boxes can contain still smaller boxes, aka *children*. Another way to think of this is to imagine making a family tree for a group of jellyfish. They reproduce asexually, so they each have only one parent. 

Here's an example:

```html
<html>
	<head>
		<title>The title is nested in the head</title>
	</head>
	<body>
		<h1>This header is nested in the body</h1>
		<div>
			<p>This paragraph is nested in the div tag above it, which is itself nested in the body. It's a <em>child</em> of the div.</p>
		</div>
	</body>

</html>

```

You'll note that it's easier to visualize what is contained within what because we're using tabs to indent every time we open up a new tag. This isn't important for the computer to read and render the code you write, it's to make the code easier for a programmer to read and use.  
This image is how the above HTML can be visualized.
![credit: http://www.efishdesign.com/tutorials/javascript.php](http://www.efishdesign.com/tutorials/dom-tree.png)


## Our First Page

Let's create a simple HTML page called `index.html` in a directory called `html-exercise`, then open it. **Do the following in your terminal, rather than using Finder.app.**

```
$ mkdir html-exercise
$ cd html-exercise
$ git init
$ touch index.html
$ open index.html
```

Chrome opens the `index.html` file, and because of the `.html` extension, it knows to present it to us as a normal webpage. Looking in chrome though, we have a blank screen! Pretty useless.

HTML pages always have the following structure:

* Doctype `<!DOCTYPE html>`
* HTML `<html>`
 * head `<head>`
	 * links to CSS stylesheets, some javascript links, meta-data, the `<title>` tag
 * body `<body>`
	  * page content (`<h1>`, `<p>`, `<div>`, `<ul>`, `<li>` etc.)


### Doctype

The Doctype is the first tag on the web page. It is self-closing and serves to inform the browser of which type of HTML that the file is written in. It is required for legacy reasons to allow the browser to render it properly. We primarily use the following:

`<!DOCTYPE html>`

### HTML Tag

Begin by creating the root level element, `<html>`. Make sure to close it with the corresponding `</html>` tag. All other elements must be descendants of this element.

### Head Tag

The `<head>` tag provides general information (metadata) about the document, including its title and links to its scripts and style sheets.

### Title Tag

The `title` tag provides the title of the document. It will appear in the browser's title bar.

### Body Tag

All of the web page's content is placed into the `<body>` tag.

> Now is a great time to `git add` your files, and `git commit` them. Remember to add the `-m` command and add a commit message.

Next we're going to dive into some documentation. Take a look at the [documentation for the paragraph tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p)- there is a description as to what all the parts do, and several examples. If you copy-paste these examples, you'll notice they show up on the screen.

Using [Mozilla Developer Network Element Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) we're going to create your first page. *Keep this page open as you code*- real developers don't try to memorize things, that's why we have google and documentation!

* Make an [unordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) all of the cities you've lived in (then, commit your changes!)

* Make an [ordered list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol) of the top three cities you would like to visit (then, commit your changes!)

* Add [a heading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) before each list that says what the list is (then, commit your changes!)

* Add a description under the headings of each list explaining how you came to live in each of those cities, and why you would like to visit those cities respectively. (then, commit your changes!)

* In the list of cities you've visited, add [a span](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/span) at the end of each city with any HTML character entity and a short summary of why the city is on the list. (...then, commit your changes!)

* In the second list, make every odd number [strong](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/strong), and every even number [emphasized](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/em). (then, commit your changes!)

* Finally add the following [image](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) somewhere in the page, and give it a height and width attribute with number values: https://students.galvanize.com/assets/galvanize-logo-ac9865cc4217b77aebbce9e63670dd96.svg
(then, commit your changes!)

* **BONUS** add audio and video to the page, find them on MDN.  Give it controls and make the video autoplay. (then, commit your changes!)

audio: https://upload.wikimedia.org/wikipedia/en/0/04/Rayman_2_music_sample.ogg

video:   https://upload.wikimedia.org/wikipedia/en/2/28/Illusion_movie.ogg

## Block-level vs. Inline

Elements are usually either "block-level" elements or "inline" elements. 

Block-Level elements:

* occupy the entire space of its parent element (container), thereby creating a "block."
* may appear only within a <body> element.
* Begin on new lines (by default)

Here's a [list of the Block-level Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements#Elements).

Inline elements:

* occupy only the space bounded by the tags that define the inline element.
* can start anywhere on a page.

Here's a [list of the Inline Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements).

**Question** Which tags are block-level and which are inline?

```html
<h1>My Heading Here</h1>
<p>Here is an example paragraph with some <strong>really</strong> important content. <img src="image.png" alt="It's an image">
</p>
```


### Tables

Tables are how we display "tabular data" in HTML. What this really means is something like this:
![table examples](http://www.codeproject.com/KB/office/WebExcel/Excel.jpg)
Any time you have something that would be good in a spreadsheet, Tables are the way to go. 

> Early in the history of the web, people tried to adapt tables for layout purposes. Today, we have CSS Grid Systems and tables are back to being used for their actual purpose. This is one of the first examples of how code can be "abused"- AKA used for a purpose other than what it was designed for. Tables worked well when you could be sure of what size everyone's screens were (remember when monitors were all the same size?) but nowadays they just break when viewed on a small screen (like a phone) or a big one (like a giant iMac monitor).

Table tags: 
`<table>,<thead>,<th>,<tbody>,<td>,<tr>,<tfoot>`

Take a look at the documentation for Tables. Keep this documentation up, and use it to find out how to use the elements you need in order to complete the exercise below.
[Table Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table)

## **Exercise** 

Create a new file, call it `favorites.html`.
`git add` the file to your repository, and commit it.

* Set up the page with the proper structure, like the last exercise
* Create a table and add a table head element (then, commit your changes!)
* Create a row of table headers for `First Name`, `Last Name`, `Favorite Animal` 
* Create a table body with one row and three columns 
* Enter your first name, last name, and favorite animal in the corresponding columns (then, commit your changes!)


## Links

We are going to now create a link from your `index.html` page to your `favorites.html` page.

For this we use the _anchor_ (`<a>`) link has a hypertext reference (`href`) attribute. The reference tells the link tag where to take you when clicked.

```html
<a href="anotherpage.html">Another Page</a>
```

Above is a link with a _relative_ path. You can tell it is relative path because it does not include a full website address. (A full website address includes http://www.). The server will look in the same directory as the webpage with the link for that file. An absolute link will include the full website address.

```html
<a href="http://www.google.com">Google</a>
```

Links have a lot of similar features that you see when navigating the file system in your shell. For example: Where will be looking for the following link?

```html
<a href="../anotherpage.html">Another Page</a>
```

It will look into the parent directory. How about this?

```html
<a href="/folder/subfolder/anotherpage.html">Another Page</a>
```

Notice we are starting with a slash. This is the root directory of your website.

## Semantic Markup

You may have been using various tags to help you style your content. `<h1>` text is larger than `<p>` text, and `<strong>` makes something bold. While on its own this is usually fine, HTML was not designed to style content, but to "mark up" its distinct components *semantically*.

Semantic HTML means to identify your content by its meaning, rather than its presentation. `<h1>` indicates that something is the most important header on the page, and `<p>` means that something is a paragraph of text. It's easy to get in the habit of using the generic tags, `<div>` and `<span>`, to set any other kind of content, such as a footer, apart. HTML actually has a wealth of tags, such as `<footer>`, that are intended to help identify content.

You may be realizing at this point that within the HTML `<body>`, you could just use `<div>` and `<span>` (or almost any other tag) to markup an entire document, and just use CSS classes to distinguish between them. It's an unfortunately common practice. The advantages of writing semantically are:

* **Readability**. Semantically written documents are much easier for other developers to follow.
* **Accessibility**. Assistive devices, such as screen-readers for the visually impaired, rely on tags to help users navigate through content.
* **Consumability**. Tools like screen-scrapers and crawlers look for markup to separate content from structure.
* **SEO**. Search engines use semantic markup to map your site and identify content. Poor markup can result in down-ranking.
* **Separation of Concerns**.  HTML is primarily concerned with *content*, while CSS is primarily concerned with *presentation* (JavaScript is concerned with *behavior*). While it is possible to dictate appearance with HTML, manipulate content with CSS, and do just about anything with JavaScript, each of them specializes in one thing. By "separating concerns", you allow each technology to stick with what it's good at.

## Exercise: Semantic Scavenger Hunt

Spend the next 30 minutes finding examples of semantic tags being used "in the wild", aka on live websites. For each tag, use MDN to help you write a definition of the semantic use of the tag, then find a live example, record the url for the website where the tag is used and write a sentence about (Is the tag is being used appropriately? Why or why not? You don't need to find an example for every tag, just do as many as you can. We'll share examples of uses found after completing.

Here are the various semantic tags to define and look for on the internet:

### Structural

Use these tags to create the overall hierarchy of the content in your page:

* nav
* main
* article
* header
* section
* aside
* footer
* h1-h6
* ul
* ol
* li


### Text Markup

These tags are for marking up text content within a structural element:

* p
* em
* strong
* b
* i
* s
* mark
* hr
* wbr
* pre
* br
* cite
* code
* kybd
* samp
* var
* q
* blockquote
* data
* a
* abbr
* small
* sub
* sup
* del
* ins
* time
* address
* ul
* ol
* li
* details
* summary

## Exercise: The Semantic News

Fork and clone the [semantic HTML](https://github.com/gSchool/semantic-html-exercise) repository. `index.html` is a news site that's been marked up with `<div>` and `<span>` tags. Using the list of tags above, update the code with semantic tags. When you're done, add/commit/push, and then submit a pull request.

## Exercise: Rectifying past wrongs

Go back to an exercise you completed last week without using semantic HTML (maybe something in the Intro to HTML LE). Change out the unsemantic markup with semantic tags. Share your solution with a classmate and ask for constructive criticism about the markup used.