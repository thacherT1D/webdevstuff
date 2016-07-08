# Intermediate CSS

## Objectives
Students should be able to:

* Know what a CSS reset does
* Know what a CSS normalizer does
* Use simple and complex CSS selectors
* Use different units of measurement with CSS properties
* Use the different types of colors

## Normalizers & Resets
The browsers that are available today all ship with their own built in stylesheet called the *user agent stylesheet*. The user agent stylesheet applies some simple default styling to HTML tags. This is why without even touching CSS, you can open an HTML document and text within `<h1>` tags will look different than what you put into a `<p>` tag.

Unfortunately, each browser's user agent stylesheet is unique, making cross-browser design uniformity more difficult. The good news is that we have normalizers and resets giving us two different ways of dealing with this issue.

### Normalizers
A normalizer does exactly what the name suggests. It applies default styling to HTML, but ensures that consistency is maintained across browsers. You will often hear this referred to as the "useful defaults" approach. The most popular CSS normalizer is [normalize.css](https://necolas.github.io/normalize.css/).

### Resets
By contrast, a CSS reset removes all of the default styling that comes from browser stylesheets. This leaves all tags completely unstyled, meaning that your `<h1>` text would now be indistinguishable from a `<p>`. This is the nuclear option, you build all the styling yourself. The most popular css reset is the Meyer reset.

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>
    <ol>
    	<li>Go and grab the example HTML from <a href="http://www.csszengarden.com/">CSS Zen Garden</a>.</li>
    	<li>
    		<p>Comment out the first <code>&lt;link&gt;</code> in the document header and load it up in Chrome. It should look something like this:<p>
    		<pre><code>&lt;link rel="stylesheet" media="screen" href="style.css"&gt;</code></pre>
    		<p>This is what the page looks like with default browser styling, and no other CSS applied.</p>
    	</li>
    	<li>
    		<p>Now, add a new <code>&lt;link&gt;</code> to apply the Meyer CSS reset:</p>
    		<pre><code>&lt;link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css"&gt;</code></pre>
    		<p>Reload your browser and look at the differences. Do the same with normalize.css:</p>
    		<pre><code>&lt;link rel="stylesheet" media="screen" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/4.2.0/normalize.css"&gt;</code></pre>
    	</li>
    </ol>
  </div>
</div>

## CSS Selectors
As you already know, a selector is the part of your CSS rules that defines which elements of the document you want to apply styling to. We've used a few of the core selectors, but you'll notice that as your HTML gets more complex, you'll want more ways of selecting parts of your page for styling.

### Standard Selectors
You've already seen these core selectors, but there is one important note to keep in mind. For styling, using `#id` is generally considered poor practice. The main reasons for this:

* `id`'s are unique, and you rarely want to style a single unique element.
* `id` is far more useful as a target for telling JavaScript where to deliver data to your page.
* You don't want to create any kind of dependencies between your JavaScript and CSS. You always want to be able to modify either without it interfering with the other.
* Using `#id` ratchets up the specificity weight of your CSS unnecessarily.

Selector|Example|Ex.'s selection|Description
:---:|:---:|:---:|---
`tag`| `p` | all `<p>`'s |Select all of the given tags
`.class`|`.headline`| elements with `class=headline` | select all elements with the given class name
`#id`|`#user-avatar`| element with `id=user-avatar` | select the element with the given `id`
`*` | `#box *` | all children of the element with `id=box` | selects all the things, by itself will select all elements in the document

### Combinators
Combinators are kind of like operators in math. When you see `2 + 3`, you know that the `+` tells you to combine the two values on either side into a new value, `5`. CSS combinators work on the same principle and allow you to combine multiple selectors into compound selectors.

Combinator | Example| Ex.'s Selection | Description
:---:|:---:|:---:|---
`,` | `p, a, ul` | all `<p>`, `<a>`, & `<ul>` tags | Selects the *union* of all comma separated selectors.
`+` | `div + p`| any `<p>` that comes immediately after a `<div>` | Selects any of the right side elements that come directly after the element on the left side of the `+`.
`~` | `div ~ a` | all `<a>`'s that have the same parent and follow a `<div>` | Works like `+` except that it doesn't restrict the selection to adjacent elements.
`>` | `div > .img-box` | any element with class `img-box` that is a direct child of a `<div>` | Selects direct children of the left by the selector on the right.
`' '` (space)| `div a` | any `<a>` that is a descendant of a `<div>` | This is a general descendant selector. It will let you select any level descendant, not just a direct child.

Notice and burn into your memory the difference between the **descendant selector (`' '`)** and the **direct child selector (`>`)**. The descendant selector will go all the way down the HTML tree looking for things to match. By contrast, the direct child selector will only look at immediate children.

### Attribute Selectors
These selectors work by allowing you to select based on attributes of HTML elements. The `.class` and `#id` selectors select by the `class` and `id` attributes of an element, and are so useful that we have the symbolic shorthand for them. The following attribute selectors allow you to target HTML by any attribute.

<dl>
	<dt><code>tag[attribute]</code> - <code>p[title]</code></dt>
	<dd>Selects the named element if it has the given attribute. The value of the attribute does not matter.</dd>
	<dt><code>tag[attr="value"]</code> - <code>a[href="http://www.firefox.ru"]</code></dt>
	<dd>Selects named elements where the given attribute equals the given value.</dd>
	<dt><code>tag[attr^="starts-w-value"]</code> - <code>img[alt^="balloon"]</code></dt>
	<dd>Selects named elements with an attribute value that starts with the given string.</dd>
	<dt><code>tag[attr$="ends-w-value"]</code> - <code>p[title$="kitten"]</code></dt>
	<dd>Selects named elements with an attribute value that ends with the given string.</dd>
	<dt><code>tag[attr*="contains-value"]</code> - <code>h1[title="Thor"]</code></dt>
	<dd>Selects named elements with an attribute value that contains the given string.</dd>
</dl>

### Pseudo-Classes & Elements
Pseudo-classes are similar to HTML classes, but they are not explicitly stated in markup. They apply based on user interaction or document structure. For example, the `:hover` pseudo-class applies to an element when the user hovers the mouse over it. Let's say that you have a content box that you want change color when the user mouses over it:

```css
.content-box:hover {
	background-color: blue;
}
```

Similarly, pseudo-elements are contextual elements that also aren't seen in your markup, but using them in a selector allow you to style certain unique page elements. Let's say that you want to have the first letter of a paragraph block to stand out. You can use the `::first-letter` pseudo-element to select and style it. One caveat is that you can only use one pseudo-element in any given selector at a time.

<dl>
	<dt><code>::before</code></dt>
	<dd>Inserts and styles an element before the one matched.</dd>
	<dt><code>::after</code></dt>
	<dd>Appends and styles an element after the one matched.
</dl>

#### Link-based
<dl>
	<dt><code>:link</code></dt>
	<dd>Applies to links that <em>have not</em> yet been visited by the user.</dd>
	<dt><code>:visited</code></dt>
	<dd>Applies to links that <em>have</em> been visited.
</dl>

#### Text-based
<dl>
	<dt><code>::first-letter</code></dt>
	<dt><code>::first-line</code></dt>
</dl>

#### Interaction-based
<dl>
	<dt><code>:hover</code></dt>
	<dd>Applies when the user hovers the cursor over the element.</dd>
	<dt><code>:active</code></dt>
	<dd>When the user actually clicks on the element</dd>
	<dt><code>:focus</code></dt>
	<dd>When the element has received focus, either by keyboard or mouse.</dd>
	<dt><code>::selection</code></dt>
	<dd>
		This refers to a portion of the document that has been highlighted by the user. Only a small subset of CSS properties can be used with <code>::selection</code>:
		<ul>
			<li><code>color</code></li>
			<li><code>background-color</code></li>
			<li><code>cursor</code></li>
			<li><code>outline</code></li>
			<li><code>text-decoration</code></li>
			<li><code>text-emphasis-color</code></li>
			<li><code>text-shadow</code></li>
		</ul>
	</dd>
</dl>

#### More Child Selectors

* `:first-child`
* `:last-child`
* `:nth-child()`
* `:first-of-type`
* `:last-of-type`
* `:nth-of-type()`

The `:nth-child()` and `:nth-of-type()` selectors work like functions that accept a formula as an argument. If you wanted to select every 3rd child starting from the 5th you could do: `element:nth-child(3n + 5)`. These will both also accept `odd` and `even` as arguments.

If you'd like a visual demonstration of some of these selectors check out Ben Howdle's [CSS Selectors demo](http://benhowdle.im/cssselectors/).

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Try the <a href="https://github.com/gSchool/css-nav-challenge">CSS nav challenge</a>. Put your solution on GitHub or Codepen and submit the link in the Exercises tab.</p>
  </div>
</div>

## Units of Measurement in CSS
Many of the most useful CSS properties take a length value. CSS supports a number of different units of measurement for length. No matter the unit, we express lengths with a number followed by the unit with **no whitespace** in between:

```css
	div {
		width: 10px;
	}
```

In general, there are two categories of units: absolute and relative.

## Relative Units
Relative units express lengths relative to some other length. For example, the `em` unit is used to express size relative to the element's current font size. For example, `2em` means twice the element's font size. Relative units are primarily useful for creating responsive layouts that will scale predictably to various screen sizes.

<dl>
	<dt><code>em</code></dt>
	<dd>Relative to the font size of the element.</dd>
	<dt><code>ex</code></dt>
	<dd>Relative to the x-height of the current font. The x-height is the height of a lowercase 'x'. You rarely see this one used, but there are some specific cases in which it shines.</dd>
	<dt><code>ch</code></dt>
	<dd>Relative to the width of a zero character in the current font.</dd>
	<dt><code>rem</code></dt>
	<dd>Relative to the font-size of the root element of the document.</dd>
	<dt><code>% (percentage)</code></dt>
	<dd>Relative to the size of the parent element.</dd>
	<dt><code>vw</code></dt>
	<dd>Relative to 1% of the width of the viewport.</dd>
	<dt><code>vh</code></dt>
	<dd>Relative to 1% of the height of the viewport.</dd>
</dl>

## Absolute Units
Absolute lengths are just what they sound like: absolute. At your computer, a size of 10 pixels will always look the same because it's based on a fixed physical standard, rather than a changeable value.

<dl>
	<dt><code>px</code> - pixel</dt>
	<dd>One dot of the display.</dd>
	<dt><code>mm</code> - millimeter</dt>
	<dd></dd>
	<dt><code>cm</code> - centimeter</dt>
	<dd></dd>
	<dt><code>in</code> - inch</dt>
	<dd></dd>
	<dt><code>pt</code> - point</dt>
	<dd><sup>1</sup>/<sub>72</sub> of an inch</dd>
	<dt><code>pc</code> - pica</dt>
	<dd><code>1pc</code> = <code>12pts</code></dd>
</dl>

## Colors
There are 4 ways of setting color values with CSS:

1. **Color name**
	* There are a number of colors that can be referenced by name for simplicity.
	* [Standard CSS Colors](http://www.colors.commutercreative.com/grid/)
2. **Hexadecimal**
	* ex: `#001122`
	* A hexadecimal color code is 3 bytes with 2 characters representing each byte:
		* The first byte (`00` above) is the red value.
		* 2nd byte is the green value.
		* 3rd byte is the blue value.
	* Hexadecimal values are preceded with a `#`.
	* All `0`'s = black.
	* All `F`'s = white.
3. **RGB**
	* ex: `rgb(255, 255, 255)` or `rgba(255, 255, 255, 0.2)`
	* Color is defined by the red, green, and blue values needed to create the color.
	* Color values can be any integer between 0 and 255 inclusive, or a float percentage between 0% and 100% inclusive.
	* The `rgba` function lets you also set the color's opacity (alpha channel) with the last argument.
	* The alpha channel argument is a float between 0 and 1, eg. `0.43`.
4. **HSL**
	* ex: `hsl(0, 100%, 80%)` or `hsla(0, 100%, 80%, 0.2)`
	* **HSL** stands for **H**ue, **S**aturation, and **L**ightness
	* The first argument is a degree on the color wheel - this means that 0 and 360 both mean the same thing (red).
	* 2nd argument is saturation as a percentage, 0-100%, where 0% gives you grayscale.
	* 3rd argument is brightness - 0% is black and 100% is white.
	* `hsla` adds the ability to manipulate the alpha channel just like `rgba`.


Homework:

* Get as far as you can with [CSS Diner](http://flukeout.github.io/)
* Stretch: [CSS Card Flip](https://github.com/gSchool/css-card-flip)
* Finish the CSS Nav Challenge
