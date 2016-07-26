## Production Goal

Your goal is to package your Angular Unit 2 application for deployment to Divshot.  The idea is that you will deploy a single html file that has a single css and js file, which are built with Gulp.

## Learning Objectives

See the list of objectives below!

## Background

As single-page applications have become more prevalent, managing the client-side javascript, css and html files has become more challenging.

Here's an introduction to the concept of frontend asset management tools, and an example of Gulp specifically.

First, watch the following video so you can get an overview of the concepts:

<iframe src="https://player.vimeo.com/video/136415387" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Next, watch this video on how basic Gulp tasks work.

<iframe src="https://player.vimeo.com/video/136414223?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Concatenation

- https://www.npmjs.com/package/gulp-concat/
- https://github.com/wearefractal/gulp-concat

Minification

- https://github.com/mishoo/UglifyJS2
- https://www.npmjs.com/package/gulp-uglify
- Angular-specific source minification
  - https://github.com/olov/ng-annotate
  - https://www.npmjs.com/package/gulp-ng-annotate

Compression

- https://github.com/jstuckey/gulp-gzip
- https://www.npmjs.com/package/gulp-gzip/
- https://css-tricks.com/the-difference-between-minification-and-gzipping/

Source Injection

- https://www.npmjs.com/package/gulp-inject
- https://www.npmjs.com/package/gulp-html-replace
- https://www.npmjs.com/package/gulp-fingerprint

Source Maps

(source maps are often included in minification / transpilation packages)

- http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/
- http://blog.teamtreehouse.com/introduction-source-maps

JS Transpilation

(includes sourcemap options)

- https://babeljs.io/docs/setup/#gulp
- https://www.npmjs.com/package/gulp-babel

CSS Transpilation

(both have sourcemap options)

- https://www.npmjs.com/package/gulp-sass
- https://www.npmjs.com/package/gulp-less

Asset Tagging

- https://github.com/sindresorhus/gulp-rev
- http://guides.rubyonrails.org/asset_pipeline.html

Modules

- http://browserify.org/
- http://webpack.github.io/
- http://requirejs.org/
- http://addyosmani.com/writing-modular-js/
- https://github.com/gulpjs/gulp/blob/master/docs/recipes/browserify-uglify-sourcemap.md
- https://github.com/gulpjs/gulp/blob/master/docs/recipes/fast-browserify-builds-with-watchify.md

Task Managers / Build Systems

- http://gulpjs.com/
- http://gruntjs.com/
- http://broccolijs.com/
- https://github.com/rails/sprockets
- http://addyosmani.com/blog/environment-specific-builds-with-grunt-gulp-or-broccoli/

Gulp Resources

- https://github.com/gulpjs/gulp
- https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
- https://travismaynard.com/writing/getting-started-with-gulp

Testing Tools

- http://karma-runner.github.io/0.13/index.html

More Gulp Recipes

- http://blog.carbonfive.com/2014/05/05/roll-your-own-asset-pipeline-with-gulp/
- https://github.com/gulpjs/gulp/tree/master/docs/recipes
- https://viget.com/extend/gulp-browserify-starter-faq
- http://jpsierens.com/tutorial-livereload-nodemon-gulp/

Integrating with Express

- https://www.npmjs.com/package/gulp-nodemon
