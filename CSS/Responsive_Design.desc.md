As more and more people browse the web on smaller devices, responsive sites are surging in popularity. Previously, entirely different sites were built for mobile views. Developers focus now on building a single site with responsive elements so that no matter how you're viewing the site it renders properly.

* [Responsive Design with Bootstrap](#responsive-design-with-bootstrap)
* [Media Queries](#media-queries)
* [Flexbox](#flexbox)

<hr style="margin: 5rem 0;"/>

## Responsive Design with Bootstrap

Bootstrap makes it easy to responsively build sites. By mixing the types of columns you use (for example, `.col-md-6` vs `.col-xs-12`) the site can render completely differently depending on the screen size.

Create an `index.html` that includes four sections on `md` to `lg` screen sizes. If the screen size is `sm`, it should switch to two sections each row and on `xs`, each section should take up the entire row.

[![https://gyazo.com/96df53622f0f2059d019049a6aed620c](https://i.gyazo.com/96df53622f0f2059d019049a6aed620c.gif)](https://gyazo.com/96df53622f0f2059d019049a6aed620c)

<hr style="margin: 5rem 0;"/>

## Media Queries

What's happening under the hood with Bootstrap? It's all [media queries](https://css-tricks.com/logic-in-media-queries/). Media queries are a way to add conditions to CSS. Create a new html file and add the following CSS.

```css
@media (min-width: 300px) {
  html { background: red; }
}

@media (min-width: 600px) {
  html { background: orange; }
}

@media (min-width: 900px) {
  html { background: yellow; }
}
```

Load the page and try resizing it. If the page width is above 900px, the background will be yellow. As it shrinks in size, the colors will change because new rules are being conditionally put into place. That is, when the screen is smaller than 900px the `html { background: yellow; }` rule no longer applies.

Test your knowledge with media queries by completing the [Media Query CSS Exercise](https://github.com/gSchool/media-query-css-exercise).

<hr style="margin: 5rem 0;"/>

## Flexbox

Ever wanted to align something vertically with CSS? You might have found it incredibly difficult before. Flexbox Layout is a way to position HTML elements that solves the problem of vertically centering _and much, much more_. It was developed and designed to solve most if not all of the layout issues we commonly come across as web developers.

Practice your Flexbox-fu with our [Flexbox Exercises](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) repository. It contains a link to a great resource about how Flexbox works.
