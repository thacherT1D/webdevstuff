# Intermediate CSS

[slides here](https://docs.google.com/presentation/d/1omsUSz7UPV9mf-yPNMrhA99K1shQjvcxTvHN94xvu3k/edit?usp=sharing)

Today we will be expanding on our understanding of CSS.

## Objectives

  Students should be able to:

  - Explain why you would use CSS reset.
  - Explain what a CSS normalizer does.
  - Describe the 4 CSS positions.
  - Use an attribute selector.
  - Describe what a psuedo-class does.
  - Be able to manipulate fonts
  - List three format types for colors.


## Resets & Normalizers

The browser has its own stylesheet (called the *user agent stylesheet*) that it tries to apply before any of your stylesheets. This is why, for example, h1 tags are bigger than paragraph text by default.

Each browser's user agent stylesheet is different. There are two popular approaches to addressing these inconsistencies:

### Normalizers

A normalizer maintains some default styling, but keeps it consistent between browsers. The most popular implementation of this is [normalize.css](https://necolas.github.io/normalize.css/).

#### Exercise

  - Copy the website you have been working on
  - Add a normalizer to the copy of your website
  - Compare the copy with the normalizer and your normal website to see if you can spot any changes

### Resets

A CSS reset removes all default styling from a browser, maintaining only the distinctions between inline and block elements. This means `<h1>` will look exactly like `<code>` or `<p>` and nothing will have any padding or margins unless you explicitly write something otherwise. The most popular CSS reset is the [Meyer reset](http://meyerweb.com/eric/tools/css/reset/).

Most projects should use one of these, but not both. It is up to you to decide whether "useful defaults" or "completely unstyled" is more useful to your project. Either way, they should be `<link>`ed to before any of your other stylesheets, so that any overrides you make will take precedence.

#### Exercise

  - Make a copy of the website you have been working on
  - Add a CSS reset to the new copy.
  - Open up both in separate browser windows and compare the differences.


## Positioning

CSS positions change the *flow* of a document.
> Try it out! Test the different position properties as we talk about them: https://jsfiddle.net/dn1kujxa/

* **`position: static;`**: This is the default for all elements. Normal document flow, will not accept top/right/bottom/left values.
* **`position: relative;`**: Creates a new positioning context for any `absolute`ly positioned children, and itself.
* **`position: absolute;`**: Positions relative to the nearest `relative`ly positioned parent, or the `<body>` if it doesn't have any. Absolutely positioned elements are removed from the document flow.
* **`position: fixed`**: Positions relative to the *viewport* (display area of the browser window), and is not in the document flow.

Some notes on positioned (relative, absolute, or fixed) elements:

* Margins for positioned elements are inside of their positioning contexts
* Absolutely positioned elements can be stretched with the top/right/bottom/left properties


## Selectors

### Standard Selector Review
Click on selector type for a live code sample.

* [`tagname`](http://codepen.io/MrJadaml/pen/WxayPV)
* [`.class`](http://codepen.io/MrJadaml/pen/zBmaXN)
* [`#id`](http://codepen.io/MrJadaml/pen/YWJvov)
* [`several, selectors`](http://codepen.io/MrJadaml/pen/RRZBRE)
* [`nested children`](http://codepen.io/MrJadaml/pen/wWYxvL)
* [`*` (universal)](http://codepen.io/MrJadaml/pen/vKVaNV)
* [`+` (next sibling)](http://codepen.io/MrJadaml/pen/xOyJgY)
* [`~` (all siblings)](http://codepen.io/MrJadaml/pen/LkgBxA)
* [`>` (all direct children)](http://codepen.io/MrJadaml/pen/grBjmJ)

### Attribute Selectors

`tag[attribute]`

Say you want to put a cool purple border around videos that are looping. You can target them with the boolean attr `loop`:
```css
video[loop] {
  border: 3px solid purple;
}
```

`tag[attribute="value"]`

If I wanted to give a cool background image to div's with ONLY the class of "bob" and not ones that may have multiple classes like `class="bob cat", I would do the following:

```css
div[class="bob"] {
  background-image: url('http://cats.antarcticastartshere.net/issue_04/spacecat_02.jpg');
}
```

`tag[attribute^="starts-with-value"]`

If we wanted to change the color of only links on the page that point at anything within the Galvanize Learn subdomain we could do something like the following:

```css
a[href^="https://www.learn.galvanize"] {
  color: orange;
}
```

`tag[attribute$="ends-with-value"]`

Say we have an assortment of buttons using a naming convention like `red-small-button`, `red-big-button`, `blue-small-button` etc. etc. If we want to make a style change to big buttons of any color but don't want to update hundreds of class names we could do something like this:

```css
button[class$="big-button"] {
  border-radius: 15px;
}
```

`tag[attribute*="contains-value"]`

Using the example above again, we could also just match for any part of the attribute's value using the `*`

```css
button[class*="big"] {
  background-color: rgba(200, 14, 183, 0.4);
}
```

#### Exercise
 * Go to codepen.io and create a new pen.
 * Create a selector for the following html that hides checked input.

```html
<input type="checkbox"> I am unchecked
<input type="checkbox" checked> I am checked
<input type="checkbox"> I am unchecked
```

### Pseudo Classes

#### Link-based

`:link` & `:visited`

Above we colored our learn.galvanize.com links orange using the `color` property. Only issue there is that the link doesn't change color when it has been clicked, or *visited*. Using `:link`you can set a *before cliked* color, and with `:visited` an *after clicked* color:

```css
a:link {
  color: orange;
}

a:visited {
  color: red;
}
```

`:hover`

Hover lets you apply styles for whenever your mouse is over an element:

```css
button:hover {
  opacity: 0.75;
}
```

`:active`

Active lets you apply styles for whenever your element is being clicked on. If we wanted it to shift down a couple pixels when clicked we would do somethign like this:

```css
button {
  position: relative;
}

button:active {
  top: 2px;
}
```

#### Exercise
  - Go on codepen.io and use the link-based psuedo-classes we just went over.

#### Text-based

`::first-line` & `::first-letter`

These two are pretty self explainitory. Make style changes to the first line or first letter:

```css
p::first-line {
  color: red;
}

p::first-letter {
  color: purple;
}
```

`::before` & `::after`

Respectivly these psuedo elements will insert content before and after the specified element:

```css
p::before {
  content: '🎉';
}

p::after {
  content: '🐓';
  font-size: 50;
}
```

#### Exercise

* On codepen.io
* Create a paragraph element and fill it with dummy text.
* Add a style using :first-letter to make the first letter capital, bold and massive

#### Interaction-based

`:focus`

Most commonly used for form elements, it will apply styles to the item that is currently active:

```css
input:focus {
  outline: outline: 3px solid rgba(169, 288, 121, 0.7);
}
```

`::selection`

This psuedo class allows you to set style for selection, or highlighting text. We are going to use the `*` wildcard selector which means it applies to all elements on the page:

```css
*::selection {
  background-color: purple;
  color: white;
}
```

#### Other

`:not(.other-selector)`

This psuedo class will target a group of elements, `div`s in the sample below, that *DO NOT* have a particular selector, the class `special` in the sample below:

```css
div:not(.special) {
  background-color: pink;
}
```

In other words, all the divs *WITH* the class special will *NOT* get the pink background.

#### Exercise

* On codepen.io create a div with the class `foo`
* create another div with the classes `foo` and `bar`.
* Using `not` change the background of the div with only the `foo` class.

#### Child Selectors

* `:first-child`
* `:last-child`
* `:nth-child(odd | even | 3 | 3n + 4 ← start counting at fourth)`
* `:first-of-type`
* `:last-of-type`
* `:nth-of-type(odd | even | 3 | 3n + 4)`

#### Exercise

* On codepen.io create a list with 5 items
* Use `:first-child` to bold the first list item.

## More Box Model

* The box model, from inside out, consists of content > padding > border > margin
* All box-model percentages calculate based on the width of the containing element
* If margins collide, it only uses the larger of the two (“collapsing” them)
  - This does not apply to: inline-block, floated, absolute elements, elements who's overflow is not visible, cleared elements, the root element.
* Negative margins remove space
* Box model applies to block and inline-block elements (only horizontal for inline-block)
* border: width style color
* solid | dotted | dashed | double | groove | ridge | inset | outset | none | hidden
* border-radius: top-left top-right bottom-right bottom-left
* Can do height / width for elliptical shape
* box-shadow: h-offset v-offset radius spread color
* box-sizing: content-box | padding-box | border-box (what do h/w refer to)
* overflow: visible | scroll | auto | hidden
* min-height max-height
* Don’t set height for text areas. Set rows and use height: auto.

## Fonts

```css
@font-face {
	font-family: “...”;
	src: url(...);
	src: url(...) format(“woff”),
		url(...) format(“svg”);
	font-weight: normal;
	font-style: normal;
}
```

* strong and em use bold and italic weight/style

### Font properties

* `font-family`
* `font-style: normal | italic`
* `font-weight: normal | bold | 100-900`
* `font-variant: small-caps`
* `font-size: px | em | rem | %`
* `font: style variant weight size/line-height font-family`

* `text-transform: uppercase | lowercase | none`
* `text-shadow: right down blue color`
* `text-align: left | right | justify | center`
* `text-indent: 5rem (first line)`

* `line-height`
* `letter-spacing`
* `word-spacing`

#### Exercise

  - On codepen.io add a paragraph filled with [dummy content](http://lipsum.com/)
  - Add a style that sets the font to helvetica, weight 500, lowercase justified.

## Lists

* `list-style-type: disc | circle | square | none | decimal | decimal-leading-zero | upper-alpha | upper-roman | lower-alpha | lower-roman`
* `list-style-position: inside | outside`
* `list-style-image: url(...)`

#### Exercise

  - On codepen.io create a list of 5 items
  - try both of the list-style-positions
  - change the style type to none.

## Colors

* Hexadecimal / Hex `#FFBBCC`
  - Short for hexadecimal, a base 16 number system. A hexadecimal character is represented with 0-9 and A-F (A=10,F = 16).
  - A hexadecimal color is composed of three bytes.
  - Each byte is represented by two hexadecimal characters.
  - The first byte `FF` is the red value
  - The second byte `BB` is the green value
  - The third byte `CC` is the blue value
  - 0 For all values is black
  - F for all values is white

* RGB & RGBA `rgb(255, 0, 0)`,`rgba(255, 0, 0, 0.5)`
  - The first three arguments are for the red value, the green and the blue value
    - Color values can be between an integer between 0 and 255
    - Color values can also be a float percentage between 0 and 100, ex: `50.15%`
  - The last argument in `rgba` is for alpha, think transparency
    - This value is between 0 and 1, ex: `0.25`

* HSL & HSLA:  `hsl(360, 100%, 50%)`, `hsla(360,100%,50%,0.5)`
  - first number is color hues: 0/360 = red, 120 = green, 240 = blue
  - second number is a percentage of saturation
  - third number is a percentage of brightness
  - If using HSLA the last number is Alpha (transparency) values 0-1
  - https://www.w3.org/Talks/2013/0516-CSS-WWW2013/color-wheel.png - HSL color wheel

## Inheritance Notes

Most properties, such as fonts, will be inherited by children. The following properties *are not* inherited:

* Padding
* Margins
* Any kind of positioning
* Backgrounds
* Borders

## Resources

* [CSS Tricks Almanac](https://css-tricks.com/almanac/)
* [CSS cheatsheet](http://overapi.com/css)
* [CSS diner](http://flukeout.github.io/)
* [CSS zen garden](http://www.mezzoblue.com/zengarden/alldesigns/)
* [Standard CSS colors](http://www.colors.commutercreative.com/grid/)
* [Webfont generator](https://www.fontsquirrel.com/tools/webfont-generator)
* [FLexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Fun flexbox game](http://flexboxfroggy.com/)

**More CSS Positioning Practice**:
NOTE: You only need to run through the linked exercise on each

* [Relative Practice](https://www.codecademy.com/courses/advanced-css-positioning/0/4)
* [Absolute Practice](https://www.codecademy.com/courses/advanced-css-positioning/1/3)
* [Fixed Practice](https://www.codecademy.com/courses/advanced-css-positioning/3/2?)

