# Semantic Markup

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

#### Description Lists

Description lists are for key-value pairs of information, like glossaries.

```html
<dl>
    <dt>HTML</dt>
    <dd>Hypertext Markup Language</dd>
    <dt>CSS</dt>
    <dd>Cascading Style Sheets</dd>
    <dt>JS</dt>
    <dd>JavaScript</dd>
</dl>
```

Note for memorization: `<dl>` means "description list", `<dt>` means "description term", and `<dd>` means "description definition".

**You Try**:

  - Create a description list
  - Create the terms rock, paper, scissors
  - Create the definitions for each term, an example would be "Rock beats scissors"

## Exercise: The Semantic News

Fork and clone the [semantic HTML](https://github.com/gSchool/semantic-html-exercise) repository. `index.html` is a news site that's been marked up with `<div>` and `<span>` tags. Using the list of tags above, update the code with semantic tags. When you're done, add/commit/push, and then submit a pull request.

> Fun fact: Facebook has implemented something called [Instant Articles](https://instantarticles.fb.com) to help news sources have their articles be more friendly with Facebook. Their docs stress the use of [semantic tags and specific formats](https://developers.facebook.com/docs/instant-articles).

## Exercise: Rectifying past wrongs

Go back to an exercise you completed last week without using semantic HTML (maybe something in the Intro to HTML LE). Change out the unsemantic markup with semantic tags. Share your solution with a classmate and ask for constructive criticism about the markup used.

## Resources

- http://html5doctor.com/downloads/h5d-sectioning-flowchart.png
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element
- http://html5doctor.com/element-index/

## Slides

[Slides](https://docs.google.com/presentation/d/1CPwESaDcaiN06Rgie4sctVpfQ-wPCOT2d5nV4kskrYs/edit#slide=id.g12bbca21b1_0_107)
