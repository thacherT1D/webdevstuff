  * [sass website](http://sass-lang.com/)
  * [sass getting started guide](http://sass-lang.com/guide)
  * [sass docs](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)
  * http://alistapart.com/article/mixing-color-for-the-web-with-sass
  * [GSchool: Sass-Practice](https://github.com/gSchool/sass-practice)



## Nesting Selectors

Whiteboards:
ALL in a single nested item:
- If you had the below HTML, using SCSS/SASS, how would you apply an orange background to all the articles inside anything with a class of 'mainBlock'?
- How would you apply a black border to all of the articles with a class of 'first'?
- How would you apply white text to all of 'p' elements under an article with a class of 'second'?
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
