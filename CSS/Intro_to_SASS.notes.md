  * [sass website](http://sass-lang.com/)
  * [sass getting started guide](http://sass-lang.com/guide)
  * [sass docs](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
  * http://alistapart.com/article/mixing-color-for-the-web-with-sass
  * [GSchool: Sass-Practice](https://github.com/gSchool/sass-practice)

## Walk through installing atom SASS plugins.

























## >Read through 'Variables' (Up to Sass Math)
Whiteboards:
- How to set a color variable.
- How to use a color variable to set the background-color of a class.























## >Read through 'Sass Math' & Awesome tools (Up to Nesting Selectors)
Talk to each-other for a couple minutes about good uses for sass-math and the 'mix' function.

Whiteboards:
- How to set all divs to exactly 1/3 width.
- How to set a new color variable using a 'mix' of two other colors.


























## >Read through Nesting Selectors (Up to Extending Classes)

Collaborate with the person next to you, write this on your table:
ALL in a single nested item:
- If you had the below HTML, using SCSS/SASS, how would you apply an orange background to all the articles inside anything with a class of 'mainBlock'?
- Apply a black border to all of the articles with a class of 'first'?
- Apply white text to all of the 'p' elements under an article with a class of 'second'?
```html
<html>
<body>
  <div class="mainBlock">
    <article class="first">
      <p class="things">
        things
      </p>
    </article>
    <article class="second">
      <p class="stuff">
        stuff
      </p>
    </article>
  </div>
  <span class="mainBlock">
    <article class="first">
      <p class="otherThings">
        things2
      </p>
    </article>
    <article class="second">
      <p class="otherStuff">
        stuff2
      </p>
    </article>
  </span>


</body>
</html>
```



## If you're confident in the concept, read further into the article through Extends and Mixins
## If you need more practice, go through the Gschool Sass-practice exercise (Fork and clone). (Step one - only need to rename the file, then use atom to compile)
  * [GSchool: Sass-Practice](https://github.com/gSchool/sass-practice)

## If you finish either of the above items, circle back and do the other one, they're both very useful.
