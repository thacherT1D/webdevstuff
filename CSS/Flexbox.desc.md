# Flexbox

## What is it?

Flexbox Layout is a way to position HTML elements. It was developed and designed to solve most if not all of the layout issues we commonly come across as web developers.

First, scan around [this cheatsheet](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and check out what sort of things you can control with `flexbox`.

## Turn on flexbox layout mode

In your CSS, select an element and add `display: flex;`. Done!

Of course, the real fun comes in all the extra properties you will configure to get it to do specific layouts. :)

## Layouts it Makes Easy

### Holy Grail

This layout is so popular it has its own [wikipedia page](https://en.wikipedia.org/wiki/Holy_Grail_(web_design))! It is known as a difficult layout to achieve on the web. That is, until flexbox comes around and solves it. ;)

![Example of Holy Grail Layout](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HolyGrail.svg/990px-HolyGrail.svg.png)

First, setup your HTML:

```html
<body class="HolyGrail">
  <header>All clouds up here</header>
  <div class="HolyGrail-body">
    <main class="HolyGrail-content">Read me!</main>
    <nav class="HolyGrail-nav">Where to go?</nav>
    <aside class="HolyGrail-ads">Buy me!</aside>
  </div>
  <footer>My feet smell bad</footer>
</body>
```

Then let's turn on flexbox:

```css
.HolyGrail {
  display: flex;
}
```

Then, let's make it a column direction so the items flow downwards and tell it to take up at least the size of the entire viewport:

```css
.HolyGrail {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
```

Tell the middle item to take up all the remaining space:

```css
.HolyGrail-body {
  flex: 1;
}
```

The middle item of this flexbox is actually going to be its own flexbox so we can flex the `nav`, `content`, and `aside` separately:

```css
.HolyGrail-body {
  display: flex;
  flex: 1;
}
```

Now let's tell our body flexbox items how to behave. We are going to reorganize them with `order` to keep HTML semantics. And get them to grow and shrink based on the viewport width differently with `flex`:

```css
.HolyGrail-content {
  flex: 1;
}

.HolyGrail-nav, .HolyGrail-ads {
  /* 12em is the width of the columns */
  flex: 0 0 12em;
}

.HolyGrail-nav {
  /* put the nav on the left */
  order: -1;
}
```

And now you have a Holy Grail layout using flexbox!

[codepen](http://codepen.io/dannyfritz/pen/ojQmbN?editors=110)

### Grid

This layout has been solved by every CSS framework out there. Bootstrap offers a grid system. These layouts are super common. Fortunately, flexbox solves grid layout and ditches many of the trade-offs.

![Example of Grid Layout](http://i.imgur.com/rI4flkv.png)

We're going to make a 3 based grid system using flexbox.

First let's layout our HTML:

```html
<div class="Grid">
  <div class="Grid-cell Grid-1-3">1/3 of the width</div>
  <div class="Grid-cell Grid-2-3">2/3 of the width</div>
  <div class="Grid-cell">All of the width</div>
  <div class="Grid-cell Grid-3-3">All of the width</div>
</div>
```

Let's make the `.Grid` class a flexbox layout and tell it to wrap when it gets to wide:

```css
.Grid {
  display: flex;
  flex-wrap: wrap;
}
```

And by default let's tell the grid cells to take up an equal remaining portion of the space:

```css
.Grid-cell {
  flex: 0 0 100%;
}
```

Now let's configure the different size cells we'll provide:

```css
.Grid-cell.Grid-1-3 {
  flex: 0 0 calc(100%/3);
}
.Grid-cell.Grid-2-3 {
  flex: 0 0 calc(200%/3);
}
.Grid-cell.Grid-3-3 {
  flex: 0 0 100%;
}
```

And with that we have a working 3-based grid system with flexbox! Woot! :)

[codepen](http://codepen.io/dannyfritz/pen/epQxBb?editors=110)

### Vertical and Horizontal Alignment

It doesn't take long before you run into a situation where you are trying to [vertically align something in CSS](https://css-tricks.com/centering-css-complete-guide/). And it doesn't take long before you pull your hair out. Fortunately, flexbox solves vertical alignment and also ditches the trade-offs.

![Example of Vertical And Horizontal Alignment](http://i.imgur.com/EyNDDhB.png)

First let's layout the HTML:

```html
<div class="centered-container">
  <div>A random quote<br>for you!</div>
</div>
```

Turn the `.centered-container` into a flexbox layout:

```css
.centered-container {
  display: flex;
}
```

Now let's tell `.centered-container` to center all items vertically and horizontally.

```css
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Wowee zowee that was fast!

[codepen](http://codepen.io/dannyfritz/pen/MazLEZ?editors=110)


### Flexbox Exercises 
* [Flexbox Froggy](http://flexboxfroggy.com/)
* [Exercises Repo](https://github.com/gSchool/flexbox-exercises)

### Other Layouts

The layouts you can achieve with flexbox are limitless. It makes a lot of previously difficult layouts [much simplier](https://philipwalton.github.io/solved-by-flexbox/) and less error prone.

## Resources

* [Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [Flexbox Adventures](http://chriswrightdesign.com/experiments/flexbox-adventures/#)
* [Flexbox Cheatsheet](http://www.smashingmagazine.com/2015/11/flexbox-interfaces-tracks-case-study/)
* [Visual Guide to Flexbox](https://scotch.io/tutorials/a-visual-guide-to-css3-flexbox-properties)
* [Solved by Flexbox](https://philipwalton.github.io/solved-by-flexbox/)
* [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex)