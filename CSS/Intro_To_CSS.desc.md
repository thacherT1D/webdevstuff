CSS is a style sheet language used for describing the look and formatting of a document written in a markup language. It is used to manipulate the way elements appear on a web page, and CSS can interact with both HTML and JavaScript.

* [Linking CSS to HTML](#linking-css-to-html)
* [Specificity](#specificity)
* [Width and Height](#width-and-height)
* [Display Styles](#display-styles)
* [The Box Model](#the-box-model)
* [Floating](#floating)
* [Positioning](#positioning)

Make sure to check the **Mastery** tab to understand what you're expected to know by the end of this lesson.

---

## Linking CSS to HTML

There are three main ways to include CSS inside of HTML files. You may see all of these out in the wild but there is one preferred method.

<br>
### Styling with Inline Attributes

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

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Using inline styles is a bad practice. Think of at least two reasons why this is considered a bad practice.</p>

  </div>
</div>

<br>
### The Style & Link Elements

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

This is better in that we can now style all our `div` elements by only writing the CSS rules once.

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

This last way is the preferred way of linking your CSS with your HTML.

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>You can import multiple CSS files into a single HTML file. This allows you to split up your code to make it more **modular** and better organized.</p>

    <p>Take a look at [galvanize.com](http://www.galvanize.com/). How might you organize the styles on this page to be in multiple files?</p>

  </div>
</div>

---

## Specificity

When people first start working with CSS, it often feels like rules are applied arbitrarily; however, this is not the case! There are steadfast rules that apply to CSS (for the most part) and much of the confusion all boils down to understanding specificity.

<br/>
### What Cascading Means

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

HTML Elements (`div`, `p`, `ul`, etc) are the least specific CSS selectors. That is, they hold the least amount of weight.

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Imagine we added the following to the CSS file mentioned above:</p>

    ```css
    div {
      height: 150px;
      background-color: yellow;
    }
    ```

    <p>What would be the resulting rules applied to the div element?</p>

  </div>
</div>

<br/>
### Classes & IDs

The next level of specificity is provided by classes. To add a class to an element, we use a class attribute. For example, give your first HTML div a class of "red", and then change your stylesheet to look like this:

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

(The dot in front of "red" indicates that we're targeting a class.) Now the first div should be red. Even though the styling for `.red` comes before the styling for `div`, targeting a class is more specific than targeting an element.

The next level of specificity is an id. Let's add a third div with a class of red and an id of green; then change the stylesheet as follows:

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

<br/>
### Inline Styling & `!important`

After ids, the next level of specificity is inline styling. We already saw how this worked above when we were linking our HTML to our CSS.

After that is the `!important` tag. It's not a good practice to use either of these, though, so try to avoid them wherever possible.

You can see an example of all of these in action [in this codepen](https://codepen.io/bwreid/pen/QypZGO).

---

## Width and Height

We've already played around with explicitly setting the width and height of elements like so:

```css
img.avatar {
  height: 50px;
  width: 50px;
}
```

We can put numbers with different units as the values to width and height or can put some specific keywords. Open up [this codepen](http://codepen.io/bwreid/pen/EyWBdx) for the next few examples.

<br/>
### Percentages

Try changing just the width now to 50%. Your image should skew to half the size of the browser. Change the height to 50% as well.

Height and width are actually determined by the parent element's height and width. Try adding the following CSS to the codepen and see what happens.

```css
div {
  background-color: black;
  height: 150px;
}
```

You'll find that the image now takes up half of the div height. This can end up being a bit tricky the more elements you begin to have on a page.

<br/>
### Auto & Inherit

Two of the most common keywords to place in height and width are auto and inherit.

**Auto** means that the browser is going to calculate and select the dimension for you. **Inherit** means that the value will be inherited from its parent element.

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Try substituting the values for `img.avatar` with auto. How is the browser determining how to size your image?</p>

    <p>Then, try replacing them with inherit. In each case, what value is being inherited?</p>

  </div>
</div>

_Further reading:_

* [MDN - width](https://developer.mozilla.org/en-US/docs/Web/CSS/width)
* [MDN - height](https://developer.mozilla.org/en-US/docs/Web/CSS/height)
* [Auto width vs. 100% width](http://www.456bereastreet.com/lab/width-auto/)

---

## Display Styles

You've probably noticed by now that by default, `<div>`s stack on top of one another vertically. This behavior is determined by the `display` property of the div, which has a value of `block` by default. There are a few different display values (in particular, CSS3 has introduced a few new ones), but the four we're concerned with now are `block`, `inline`, `inline-block`, and `none`.

Of these, `none` is probably the most obvious. Change one of your divs from the previous codepen to have `display: none` and see what happens.

<br/>
### Block

Block is the default value for a number of elements. When elements have `display: block` applied to them, they stack on top of each other. Block elements essentially push everything that comes after it to wherever they end.

Let's play around with display styles by using [this codepen](http://codepen.io/bwreid/pen/rLyXwx).

<br/>
### Inline & Inline-Block

Often we don't want our elements to stack but instead appear nested or next to one another. The way to fix that is with the inline or inline-block values.

Try changing the display to inline and notice the change. Inline only takes the content of the element into consideration -- for example, the text. So, when you change the display property to inline you'll notice the width for the RED block will decrease significantly.

If you change the display to inline-block, the height and width rules that are applied to the divs will be maintained while still stacking them next to each other.

_Further reading:_

* [What is the difference between display: inline and display: inline-block?](http://stackoverflow.com/questions/8969381/what-is-the-difference-between-display-inline-and-display-inline-block)
* [List of HTML5 block elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements)
* [List of HTML5 inline elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elemente)
* [What's the Deal with Display: Inline-Block?](http://designshack.net/articles/css/whats-the-deal-with-display-inline-block/)

---

## The Box Model

As you may have noticed, elements on an HTML page are rectangles. These boxes have some common CSS properties, collectively referred to as the box model. Since these are properties you'll be using all the time, let's take a moment to explore how the box model works.

<br/>
### Border, Content, Margin, and Padding

To keep things simple, create a new page or codepen with a single 200x200 div (color choice is up to you). Let's also put some content inside of our div:

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

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Take some time to answer the following:</p>

    <p>You can set margins/border/padding by defining four values instead of one; e.g. margin: 15px 15px 15px 15px. Which number corresponds to which direction?</p>

    <p>You can set margins/border/padding by defining two values; e.g. margin: 20px 30px. Which number corresponds to which direction(s)?</p>

    <p>You can set margins/border/padding by defining three values; e.g. padding: 15px 10px 5px. Which number corresponds to which direction(s)?</p>

    <p>You can create dashed and dotted borders and set different sides of a div to have different border properties. How?</p>

    <p>What does the border-radius property do?</p>

    <p>What happens if you set the margins on a block-level div equal to `0 auto`?</p>
  </div>
</div>

A final note on the box model. Note that when you add padding or border to your div, the dimensions of the div change. If you want that to **not** happen -- e.g. if you want your div to maintain a size of 200x200 regardless of box model styling -- then the easiest thing to do is add the following line to your stylesheet for that div:

```
 box-sizing: border-box;
```

The default styling is `content-box`, in which the size of the content is what is fixed by `width` and `height`, rather than the size of content+padding+border.

---

## Floating

There are other ways to align the divs side-by-side if you don't want to mess with the `display` property. One approach is to use the `float` property. Floating can be a bit difficult but it is incredibly important to understanding how modern web sites are built.

Floating an element takes that element out of the **normal flow** of the document and places it where specified. The [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/float) describes it pretty well.

When we float an element to the left, that element will be aligned as left as possible and everything that falls after it in the HTML document will visually come _to the right or after it_. This is the opposite case for floating something left.

Open up [this codepen](http://codepen.io/bwreid/pen/LZWwge) to begin playing around with floating elements! Read through the HTML and CSS to make sure you understand how everything is working before starting on this next exercise.

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>Floating changes the normal flow and changes how elements are rendered. Begin by adding `float: left` to the first div. What changes do you notice? Try removing it from the first div and adding it to the second. Is anything different in how it's acting?</p>

    <p>Next, try adding the float rule to both divs on the page. Change them so the both have a value of left or right and make sure to try them as different. What do you notice is happening?</p>

    <p>Finally, add a paragraph element with some text after the two divs, making sure both of them are floating. What's happening now?</p>
  </div>
</div>

People tend to hate the float property because it's hard to visualize what is going to happen. One way to think of it is that as soon as we add a float property that element is now playing by its own rules -- if we apply `float: left` to multiple elements, they're all playing by one set of rules while anyone with `float: right` plays by another.

Remember, it takes the element out of the **normal flow** of the document!

<br/>
### Clearing Floated Elements

Float your first two divs to the left, and now add a new div: `<div id="myNewDiv">I want to be on a new row.</div>` You should find that this new div is on the same row as the first two.

But what if we want this new div to be on its own row, as you might expect from an unfloated block element? To do this, we need to _clear_ the float. Add this line to your stylesheet:

```
#myNewDiv {
  clear: both;
}
```

An element styled with `clear: both;` can't have any floats to the left or right of it, and so in the presence of floated elements will break into a new row.

---

## Positioning

Sometimes we need to be more specific with how we set up certain elements on our page. In times of visual specificity, we turn to Positioning.

If you thought floats were bad, just you wait! Positioning without understanding the rules to it can cause lots of weird problems; so, it's important to do your best to [grok](https://en.wikipedia.org/wiki/Grok) how the values of `position` manipulate elements.

There are five possible values of position:

```
static, relative, absolute, fixed, sticky
```

<br/>
### Static

Static is the default position for all elements. It simply means it is positioned where it's told to be on the page! Take a look at [this codepen](http://codepen.io/bwreid/pen/QEvLyy?editors=1100) for this section of the lesson. All the images there are currently set to static.

<br/>
### Relative

Relative positioning allows for an element to be moved relative to it's current location. For example, try adding the following rules for the first image in the div.

```
position: relative;
left: 25px;
```

First, we set the image to relative which, by itself, will not move it at all. However, we can now move it using the top, right, bottom, or left properties a certain number of pixels. In this case, we're moving the image 25px _away_ from the left.

We can also use negative numbers as values to move it towards the direction we've set as the property. For example, add the following to the first image:

```
bottom: -200px;
```

You'll notice the image now moves down 200px from where it normally would be. Try setting a very high value for the `bottom` property. Your image will go off the page but you won't be able to scroll to see it. That's because your image is, as far as the browser is concerned, positioned right where it initially is. It has only been relatively _rendered_ elsewhere.

<br/>
### Absolute

Absolute positioning positions an element relative to its nearest parent which is _not_ statically positioned. As you can tell from the definition, this one can get a bit tricky!

Remove the CSS you just added for the first image and add the following:

```css
div {
  position: relative;
}

img {
  position: absolute;
}
```

What happened? Well, first of all we gave the wrapping div a position of relative. We then set all images to be positioned absolutely. This means their new layout is based upon the surrounding div.

To play around with this, select one of the images and select it specifically. Then, add `right: 0;` to its selector. That image is now aligned on the right side of the surrounding div.

Change the value now to `30px`. How is it changed? Is it what you expected?

<div class="media" style="padding: 2.5rem 2rem 1rem; border: 1px solid #c7254e; border-radius: 1rem;">
  <div class="media-left" style="font-size: 3rem; color: #c7254e;">
    <i class="fa fa-exclamation-circle"></i>
  </div>
  <div class="media-body">
    <h3 class="media-heading">Exercise</h3>

    <p>You can actually get all the images to be aligned just how they were (i.e. stacked side by side) with absolute positioning now by selecting them individually and moving them around. Spend a few minutes trying to do so and then _never do so again_ because that's just ridiculous. Whenever possibnle, you want to rely on more standard ways of position elements.</p>

  </div>
</div>

<br/>
### Fixed

When we set the position value to fixed, it won't move initially. However, when we add a top, right, bottom, or left property it'll move to be relative to the browser window and stay there. This means that the element will stay where it's positioned even if you scroll on the page.

Try this on your codepen by adding the following to a single image:

```
position: fixed;
top: 0;
left: 0;
```

Now make your screen really small and try scrolling around. Do you see how the image doesn't move from its anchored location?

<br/>
### Sticky

This value is a new, experimental one that doesn't work in all browsers. It is described as a hybrid of relative and fixed positioning in that it will stay in the same place until another element comes along to replace it.

The best way to understand it is to simply take a look at the [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/position) for position and scroll down to the example they have there. While scrolling on their example, you'll see that the heading stays at the top of the page until it's replaced by a new one!

<div class="alert alert-warning" role="alert">This feature is so new it doesn't work in the current version of Chrome as of this article being written. Open up Safari and try loading the MDN page there.</div>

## Conclusion

There is so much more to CSS -- and we'll cover it soon! For now, it's important to get comfortable with the idea of **Play** and **Reflection** -- have fun moving elements around and trying out new properties; but, remember that none of this is magic! There are rules as to why certain properties work the way they do so be on the lookout for the logic behind it.
