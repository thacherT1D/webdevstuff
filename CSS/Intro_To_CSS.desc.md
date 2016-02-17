## Intro To CSS

### Cascading Style Sheets (CSS)

CSS is a style sheet language used for describing the look and formatting of a document written in a markup language.  

It is used to manipulate the way elements appear on a web page, and CSS can interact with both HTML and JavaScript.

## Adding our First Styling

An easy (and heavily frowned-upon) way to add styling to an HTML element is by using the `style` attribute on the HTML element directly. As a first example, let's create a new `index.html` file and throw a `<div>` into it:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Kicking it with some Divs</title>
  </head>
  <body>
    <div>Here's my first div!</div>
  </body>
</html>
```

Let's use the `style` attribute to make give that div a width of 200px, a height of 200px, and a red background. Inside the `body` tag, change the div so that it looks like this:

```html
<div style="width: 200px; height: 200px; background-color: red;">Here's my first div!</div>
```

`width`, `value`, `background-color`, are all called _properties_. Their corresponding values (200px, 200px, and red) are, conveniently enough, called _values_.

Using inline styles is a bad practice, for a couple of reasons. For one, you're cluttering up your HTML, and mixing content from styling. Second, it's hard to keep your code DRY if you use inline style. If you wanted to add a second div with the same styling, you'd need to duplicate all that styling code. For example, let's add a second div to our html file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Kicking it with some Divs</title>
  </head>
  <body>
    <div style="width: 200px; height: 200px; background-color: red;">Here's my first div!</div>
    <div style="width: 200px; height: 200px; background-color: red;">Here's my second div!</div>
  </body>
</html>
```

Now all that styling code has been duplicated.

We can clean up this code (a.k.a. refactor it) by moving these style rules to a stylesheet. One place we can put our CSS is inside of the `head` of our HTML, as follows:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Kicking it with some Divs</title>
    <style>
      div {
        width: 200px;
        height: 200px;
        background-color: red;
      }
    </style>
  </head>
  <body>
    <div>Here's my first div!</div>
    <div>Here's my second div!</div>
  </body>
</html>
```

But, it's a better practice to move styling to an external stylesheet. Let's create a file called `style.css` and put the CSS inside of your `style` tag into that file. We can then remove the style tags from our HTML, and replacing it with a link to our external stylesheet:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Kicking it with some Divs</title>
    <link rel="stylesheet" type="text/css" href="style.css">
  </head>
  <body>
    <div>Here's my first div!</div>
    <div>Here's my second div!</div>
  </body>
</html>
```

## CSS - CSS Specificity, Classes, and IDs

Suppose you change your stylesheet to look like the following:

```css
div {
  width: 200px;
  height: 200px;
  background-color: red;
}

div {
  width: 300px;
  height: 100px;
  background-color: blue;
}
```

Which style rules will win out?

The answer is that whichever rule comes _latest_ in the stylesheet will take precedence (this is what the _Cascading_ means). However, you can overwrite this default behavior by using a more _specific_ selector.

HTML Elements (`div`, `p`, `ul`, etc) are the least specific CSS selectors. The next level of specificity is provided by classes. To add a class to an element, we use a class attribute. For example, give your first HTML div a class of "red", and then change your stylesheet to look like this:

```css
.red {
  width: 200px;
  height: 200px;
  background-color: red;
}

div {
  width: 300px;
  height: 100px;
  background-color: blue;
}
```

(the dot in front of "red" indicates that we're targeting a class). Now the first div should be red. Even though the styling for `.red` comes before the styling for `div`, targeting a class is more specific than targeting an element.

The next level of specificty is an id. Let's add a third div with a class of red and an id of green; then change the stylesheet as follows:

```css
#green {
  background-color: green;
}

.red {
  width: 200px;
  height: 200px;
  background-color: red;
}

div {
  width: 300px;
  height: 100px;
  background-color: blue;
}
```

Even though the new div has a class of red, the id is more specific, so its background color is green. But where does its sizing come from?

Aside from specificity, what's the difference between a class and an id? For today, all we need to know is that ids for an HTML element should be _unique_: no two elements should share the same id, and no element should have more than one id. Classes, however, don't have these restrictions: an element can have multiple classes, and multiple elements can share the same class.

After ids, the next level of specificity is inline styling. After that is the `!important` tag. It's not a good practice to use either of these, though, so try to avoid them wherever possible.

More info: [The Difference Between ID and Class](https://css-tricks.com/the-difference-between-id-and-class/)

## CSS - Width and Height

We've seen what happens as you change the width and height of a div in pixels.  
Instead of pixel values, you can also assign with and height using percentages. What happens if you set the width to 50%? Is this what you expected? What happens if you set the height to 50%? Is this what you expected?

Here we come to an important difference between width and height. If you want to use a percentage height to work as expected, you need to make sure the parent container has an explicit height set. To learn more, check out [this Stack Overflow article](http://stackoverflow.com/questions/5657964/css-why-doesn-t-percentage-height-work).

One last value to know about for width and height is `inherit`. If the width or height of a div is set to `inherit`, then, as the name implies, the div will inherit the width or height property from its parent.

Further reading:

[MDN - width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)

[MDN - height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)

[Auto width vs. 100% width](http://www.456bereastreet.com/lab/width-auto/)

## CSS - Display Style

You've probably noticed by now that by default, `<div>`s stack on top of one another vertically. This behavior is determined by the `display` property of the div, which has a value of `block` by default. There are a few different display values (in particular, CSS3 has introduced a few new ones), but the four we're concerned with now are `block`, `inline`, `inline-block`, and `none`.

Of these, `none` is probably the most obvious. Change one of your divs to have `display: none` and see what happens.

What if you want the divs to be side-by-side, and not stacked? `inline` sounds like a natural solution. Try setting the displays on both divs to `inline`. What happens?

While inline elements don't mind sharing space horizontally, they also don't like taking up more space than they need.

Now let's look at `inline-block`. Elements displayed like this don't require their own new row, so they can share horizontal space (like `inline` elements). But they also respect properties of `block` elements (like width and height). Try it out.

Further reading:

[List of HTML5 block elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
[List of HTML5 inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elemente)
[What's the Deal with Display: Inline-Block?](http://designshack.net/articles/css/whats-the-deal-with-display-inline-block/)

## CSS - The Box Model

As you may have noticed, elements on an HTML page are rectangles. These boxes have some common CSS properties, collectively referred to as the box model. Since these are properties you'll be using all the time, let's take a moment to explore how the box model works.

To keep things simple, let's return to a single 200x200 div (color choice is up to you). Let's also put some content inside of our div:

```
<div id="div1">This is a div of my favorite color.</div>
```

The box model of this (or any other) div consists of four components: margin, border, padding, and content. Content refers to the area where the (spoiler alert) content lives. Padding corresponds to space between the border and the content. The border wraps around the padding and content, and the margin clears space around the border.

To see these things in action, try giving your div the following style:

```
#div1 {
  margin: 15px;
  border: 5px solid red;
  padding: 10px;
}
```

You can also style the top, right, bottom, or left side of any of these attributes separately. For instance, if you want to push your div farther down the page, you can give it a `margin-top` of 100px.

Take some time to explore the following questions:

1. You can set margins/border/padding by defining four values instead of one; e.g. margin: 15px 15px 15px 15px. Which number corresponds to which direction?

2. You can set margins/border/padding by defining two values; e.g. margin: 20px 30px. Which number corresponds to which direction(s)?

3. You can set margins/border/padding by defining three values; e.g. padding: 15px 10px 5px. Which number corresponds to which direction(s)?

4. Can you create a dashed border? What about a dotted border?

5. What does the border-radius property do?

6. What happens if you set the margins on a block-level div equal to `0 auto`?

A final note on the box model. Note that when you add padding or border to your div, the dimensions of the div change. If you want that to **not** happen -- e.g. if you want your div to maintain a size of 200x200 regardless of box model styling -- then the easiest thing to do is add the following line to your stylesheet for that div:

```
 box-sizing: border-box;
```

The default styling is `content-box`, in which the size of the content is what is fixed by `width` and `height`, rather than the size of content+padding+border.

## CSS - Floats

There are other ways to align the divs side-by-side if you don't want to mess with the `display` property. One approach is to use the `float` property. Try to do the following:

1. Remove any reference to the `display` property in your stylesheet (your divs will revert to their default styling of `display: block`.
2. Assign `left` to the `float` property for each div.
3. What happens if you change `float: left;` to `float: right;`?
4. What happens if you float one of the divs, but not the other?

**Clearing a Float**

Float your first two divs to the left, and now add a third div: `<div id="myThirdDiv">I want to be on a new row.</div>` You should find that this third div is on the same row as the first two.

But what if we want this third div to be on its own row, as you might expect from an unfloated block element? To do this, we need to _clear_ the float. Add this line to your stylesheet:

```
#myThirdDiv {
  clear: both;
}
```

An element styled with `clear: both;` can't have any floats to the left or right of it, and so in the presence of floated elements will break into a new row.

## CSS - Positioning

A third common way to position divs is to use the `position` property. Like `display`, we're going to focus on four different values for positioning: `static`, `relative`, `absolute`, and `fixed`.

Static is the default value for all elements. An element with static position will sit where it normally does, and won't have any special positioning.

If you go with one of the other three values for `position`, you can then adjust the position of your div by using the `top`, `right`, `bottom` and `left` attributes.

Briefly, here are the differences between the other types of positioning:

- `position: relative` positions an element relative to **where it would normally sit**.
- `position: absolute` positions an element relative to **its nearest ancestor that isn't statically positioned**,
- `position: fixed` positions an element relative to **the viewport, even when scrolling**.

Let's explore positioning using the following HTML snippet. Here are three nested divs:

```
<div id="div1">
  <div id="div2">
    <div id="div3"></div>
  </div>
</div>
```

Style them so that the first div is 400x2000 and blue, the second is 200x200 and red, and the third is 100x100 and green.

Next, using only the `position`, `top`, `bottom`, `left`, and `right` properties, do the following:

1. Nudge the green square 10px down and 10px to the right.
2. Push the red square to the upper-right corner of the blue rectangle.
3. Push the red square to the lower-left corner of the blue rectangle.
4. Push the red-square to the lower-left corner of the viewport.


## CSS - Media Queries

Sometimes styling isn't one-size-fits-all. How you want your page to look may depend on different factors. Let's work on a simple example:

1. In a clean HTML file, create three divs. arrange them horizontally so that they each take up 1/3 of the screen. (Hint: you can define widths in terms of percentages, not just pixels!). Style them so that they're visually distinguishable from one another.

Having your divs aligned in a row is probably fine on a large screen (e.g. a laptop). But what if a user comes to your site on a mobile device, with a much narrower screen? In this case, having your divs in a row may look cramped, and you might prefer to have your divs stacked vertically.

In order to set different styling rules based on the viewport, we can use a **Media Query**. In this case, if you wanted to set a different rule for narrower viewports, you could add something like this to your stylesheet:

```
@media (max-width: 600px) {
  /*insert your div ids here*/ {
    clear: both;
    width: 100%;
  }
}
```

See how the styling changes based on your viewport width? Congratulations, you've completed your first foray into **responsive** design!

Media queries have a fair amount of built-in logic. To learn more about them, read [this](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries).

## CSS - Tables

Let's talk briefly about styling tables in CSS, since the default styling is pretty terrible. 

To kick things off, let's create a table in our html file with no special styling:

```
<table>
  <tbody>
    <tr>
      <td>Cell 1</td>
      <td>Cell 2</td>
    </tr>
    <tr>
      <td>Cell 3</td>
      <td>Cell 4</td>
    </tr>
    <tr>
      <td>Cell 5</td>
      <td>Cell 6</td>
    </tr>
    <tr>
      <td>Cell 7</td>
      <td>Cell 8</td>
    </tr>
    <tr>
      <td>Cell 9</td>
      <td>Cell 10</td>
    </tr>
    <tr>
      <td>Cell 11</td>
      <td>Cell 12</td>
    </tr>
  </tbody>
</table>
```

Start by adding some borders and padding to the `td` cells.

That doesn't look too good, does it? Let's remove the spaces between the td cells:

```
table {
  border-spacing: 0;
}
```

Better, but not quite right. Let's at one more property to our `<table>` styling: `border-collapse: collapse;`.

Sweet. For small tables like this, it may even be sufficient. But for large tables (e.g. tables of users), readability can become an issue. What would be nice is if we could make the table _striped_, so that rows alternated their colors. How can we do this using CSS?

To do this right, we'll need **pseudo-classes**. A pseudo-class lets us express more information about a given element. In this case, the pseudo-class we want is `:nth-child()`. With this psuedo-class, you can select the kth row of your table using the selector `tr:nth-child(k)`. In particular, notice that `:nth-child()` is 1-indexed, not 0-indexed: for instance, `tr:nth-child(2)` will select the second row of your table, not the third.

Use `:nth-child` to highlight every other row of the table in some other color.

One of the nice things about `nth-child` is that it accepts arguments other than whole-numbers. Try out the selector `tr:nth-child(odd)`. What about `tr:nth-child(even)`?

Bonus 1. You can also select every mth element, starting with the kth, using the selector `tr:nth-child(mn+k)`. Try to select every third row, starting with the first row.

Bonus 2. Color every even row one color, and every third row another color. What's the color of the 6th row, and why?

Another thing we can do to improve the readability of a table is to highlight a row when the user mouses over it. To do this, we'll use the `:hover` psuedo-class.

```
tr:hover {
  background-color: /* insert a color here */
}
```

Neat, right? Related to the `:hover` psuedo-class are the `:active`, `:focus`, and `:visited` pseudo-classes. You can read all about these (and other!) pseudo-classes [here](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes).

## CSS - Rock star demos

We've only scratched the surface of what you can do with CSS. For inspiration, check out a sampling of some awesome things that people have built:

[A Single Div](http://a.singlediv.com/)

[The Simpsons](http://pattle.github.io/simpsons-in-css/)

[CSS Creatures](http://bennettfeely.com/csscreatures/)

[CSS Coke Can](http://www.romancortes.com/ficheros/css-coke.html)

