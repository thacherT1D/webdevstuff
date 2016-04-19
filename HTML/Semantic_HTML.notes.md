(this LE actually takes ~2 hours)

[Slides](https://docs.google.com/presentation/d/1CPwESaDcaiN06Rgie4sctVpfQ-wPCOT2d5nV4kskrYs/edit#slide=id.g12bbca21b1_0_107)

## Lecture:

### Semantic Markup

#### What & Why (~20 mins)

* Define semantics. Maybe start with a group conversation about when they've heard the word or what it's used for. Official definition is "of, relating to, or arising from the meaning of words and symbols".
* Relate this to HTML - semantic tags can imbue more meaning in the markup itself. Using classes or ids doesn't help imbue meaning because those aren't standardized, regular. Classes and such should just be used for CSS - for styling content.
* Talk about specific reasons for using semantic markup:
    * Readability
    * Accessibility
    * Consumability
    * SEO
    * Separation of Concerns
* Reinforce that it's still alright to use `<div>` and `<span>` tags if there isn't a more semantic tag or if repeated use of a semantic tag would decrease its meaning in the overall document structure (such as using `<section>` like `<div>` tags were historically used).

There are a lot of defined, semantic tags. Instead of going through them all have students do the following exercise:

## Exercise: Semantic Scavenger Hunt (~45 mins)

Have the students spend the next 30 minutes finding examples of semantic tags being used "in the wild", aka on live websites. For each example, they should record the url for the tag and write a sentence about if the tag is being used appropriately and why. The students probably won't find examples for all the tags or even complete this; that's fine. After 30 minutes, ask some students to share examples of different tags and their defense of correct/incorrect use.

Segue the presentation of these examples into questions about when to use specific tags or the differences between them. After this quick review, have students use them in the following activity:

## Exercise: The Semantic News (15-30 mins)

Have students fork and clone the [semantic HTML](https://github.com/gSchool/semantic-html-exercise) repository and try to update the tags. When they PR, you can give them feedback in the pull request and close them out. My solution was on the Solution branch of the repo.

Some things to look for:

* Not closing tags correctly (opened as main, closed as div)
* Missing the text tags (date, small, address)
* Using divs for the nav links in the masthead instead of ul/li
* Using a definition list instead of a ul in the nav
* Missing details / summary tags
* Using summary tags outside of the details tags
* Wrapping the details/summary section in an article

After the allotted time, ask students about which tags were used and why. This is also a good time to answer more questions and then also check for understanding on the why's of using Semantic HTML.

For more practice, have them do the following:

## Exercise: Rectifying past wrongs

Have students go back to an exercise they completed last week without using semantic HTML and update it. Their personal website is a good candidate for this. Afterwards, they should share their solution with a partner and discuss choices made in the markup.


Here are some definitions/uses for specific tags that may not be clear:

* nav (collection of links)
* main (primary site content)
* article (independently redistributable content with a heading)
* header (header for its parent's content)
* section (group of content with an h1-h6 heading)
* aside (information tangentially related to the main content)
* footer (footer for its parent's content)
* div (for block elements)
* span (for inline elements)

* em (emphasis)
* strong (strong emphasis)
* b (different, no emphasis, eg. product names or keywords)
* i (different, no emphasis, eg. foreign or technical terms, thoughts)
* s (irrelevant or inaccurate)
* mark (highlighted)
* hr (thematic break between paragraphs)
* wbr (word break opportunity)
* pre (pre-processed)
* cite (citation)
* code (code snippet)
* kybd (inline simulated user-input)
* samp (sample computer output)
* var (variable in computer output)
* q (inline quotation)
* data (value with a machine-readable value, eg. a UPC)
* abbr (abbreviation, use “title” attribute for full word)
* small (side comments and fine print, eg. legal)
* sub (subscript, eg. for math)
* sup (superscript, eg. for math)
* del (deleted text from an edit)
* ins (inserted text from an edit)
* address (contact information for an article)
* details (hideable)
* summary (header for details tag)

---

### Taken from the old intermediate HTML LE: Description Tables

#### Objectives

  Students should be able to:

  - Understand the difference between `table` and `dl`

### Tables

There are two basics types of tables: multi-dimensional data tables (`<table>`), and description lists (`dl`).

#### Standard Tables

Tables often feature table captions, headers, bodies, rows, columns, and footers. The general structure is like this:

```html
<table>
    <caption>The Title of my table</caption>
    <thead>
        <tr>
            <th>Header One</th>
            <th>Header Two</th>
            <th>Header Three</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Column one data</td>
            <td>Column two data</td>
            <td>Column three data</td>
        </tr>
        <tr>
            <td>Column one data</td>
            <td colspan="2">Spans column one AND two</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Summary of column one</td>
            <td>Summary of column two</td>
            <td>Summary of column three</td>
        </tr>
    </tfoot>
</table>
```

Note for memorization: `<tr>` means "table row", `<th>` means "table header", and `<td>` means table data.

In olden times long gone, HTML tables were used to layout a site. This is a capital crime in modern web development! Don't do it! DO NOT DO IT! Seriously, please. Use tags semantically and manage layouts with CSS.

**You Try**:

  - Create a table with a header row, 3 rows and 4 columns
  - Label fill the row headers with rock, paper, scissors.
  - Fill the first column with rock, paper, scissors
  - Fill the grid with a W (win), L(lose), T(tie).

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
