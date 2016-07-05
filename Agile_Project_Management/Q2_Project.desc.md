The goal of this project is to demonstrate your mastery of the concepts covered over the past quarter. Like your capstone, you're expected to come up with a project idea and implement it all on your own. Unlike a PhD dissertation, you are _not_ expected to discover and publish an idea that's never been done before. Asking your classmates and instructors for help throughout the process is strongly encouraged, but your work must be your own.

During project week, you'll have approximately 24 hours of class time to implement your idea. It'll most likely not be enough time, so plan on allocating extra time for it outside of class. On the last day of project week, you'll give short demonstration of your project to the class.

## Table of Contents

1. [Understand the technical requirements](#understand-the-technical-requirements)
1. [Submit two project proposals for approval](#submit-two-project-proposals-for-approval)
1. [Use a software development process](#use-a-software-development-process)
1. [Pay attention to your mindset](#pay-attention-to-your-mindset)
1. [Demonstrate your project to the class](#demonstrate-your-project-to-the-class)
1. [Complete a write-up of the project](#complete-a-write-up-of-the-project)
1. [Submit your project for assessment](#submit-your-project-for-assessment)
1. [Update your online portfolio](#update-your-online-portfolio)

## Understand the technical requirements

The technical requirements for your project are as follows.

- Have [valid](https://validator.w3.org/nu/), well-indented, and semantic HTML.
- Have [valid](https://jigsaw.w3.org/css-validator/), well-indented, and minimally-specific CSS.
- Have [linted](http://eslint.org/), readable, and concise JavaScript.
- Use embedded media like fonts, images, audio, or video.
- Use a front-end framework like Bootstrap, Foundation, or Materialize.
- Respond to form input and/or user events.
- Connect to at least one external web API via Ajax.
- Be deployed to a production environment.

### Bonuses

- Customize the color palette or theme of your front-end framework.
- Optimize for various viewport sizes using responsive design.
- Develop a game instead of an application.
- Or connect to external hardware like an Arduino or MIDI keyboard.

### Application ideas

- A nutrition tracker
- A documentation aggregator
- A ping-pong tournament tracker
- A message encryptor
- A journey mapper
- A brewery locator
- An audio sequencer
- A synonym finder
- A language translator
- A real-time chatroom
- A collection manager
- A blog article publisher
- A membership organizer
- A sports team tracker

### Game ideas

- Asteroids
- Battleship
- Blackjack
- Breakout
- Flash cards
- Sudoku
- Tetris

### Web APIs

- [Bacon Ipsum](http://baconipsum.com/json-api/)
- [Big Huge Thesaurus](http://words.bighugelabs.com/api.php)
- [COLOURlovers](http://www.colourlovers.com/api)
- [Crunchbase](https://data.crunchbase.com/v3/docs/using-the-api)
- [data.seattle.gov](https://data.seattle.gov/)
- [Deck of Cards](http://deckofcardsapi.com/)
- [Discogs](https://www.discogs.com/developers/)
- [Etsy](https://www.etsy.com/developers/documentation)
- [Firebase](https://firebase.google.com/docs/web/setup)
- [Flickr](https://www.flickr.com/services/api/)
- [Gilt](https://dev.gilt.com/documentation/overview.html)
- [GitHub](https://developer.github.com/)
- [Google Books](https://developers.google.com/books/docs/v1/using)
- [Google Knowledge Graph](https://developers.google.com/knowledge-graph/)
- [Google Geocoding](https://developers.google.com/maps/documentation/geocoding/start)
- [Google Maps](https://developers.google.com/maps/documentation/javascript/)
- [Google Places](https://developers.google.com/maps/documentation/javascript/places#overview)
- [Gravatar](http://en.gravatar.com/site/implement/)
- [Groupon](https://www.groupon.com/pages/api)
- [JSONPlaceholder](http://jsonplaceholder.typicode.com/)
- [Lob](https://lob.com/docs)
- [Mapbox](https://www.mapbox.com/api-documentation/)
- [Markit](http://dev.markitondemand.com/MODApis/)
- [MyJSON](http://myjson.com/)
- [OpenTok](https://tokbox.com/developer/rest/)
- [OpenWeatherMap](http://openweathermap.org/api)
- [PoetryDB](http://poetrydb.org/)
- [Reddit](https://www.reddit.com/dev/api)
- [Rotten Tomatoes](http://developer.rottentomatoes.com/docs/read/JSON)
- [Snooth Wine](http://api.snooth.com/)
- [SoundCloud](https://developers.soundcloud.com/docs/api/reference)
- [(Hacker)Space](http://spaceapi.net/)
- [Stripe](https://stripe.com/docs/api#intro)
- [SF OpenData](https://data.sfgov.org/)
- [TextBelt](http://textbelt.com/)
- [theguardian](http://open-platform.theguardian.com/)
- [Transitland](https://transit.land/documentation/)
- [Tumblr](https://www.tumblr.com/docs/en/api/v2)
- [Twitch.tv](https://github.com/justintv/Twitch-API)
- [Unsplash](https://unsplash.com/documentation)
- [Weather Underground](http://api.wunderground.com/weather/api/d/docs)
- [Wolfram Alpha](http://products.wolframalpha.com/api/)
- [Wordnik](http://developer.wordnik.com/docs.html)
- [xkcd](https://xkcd.com/json.html)
- [Yandex Translate](https://tech.yandex.com/translate/)
- [Youtube](https://developers.google.com/youtube/v3/getting-started)

Or browse the [ProgrammableWeb's API repository](http://www.programmableweb.com/apis/directory). You'll want to avoid calling web API endpoints that require [OAuth](https://en.wikipedia.org/wiki/OAuth) for authorization, a technique you'll study later in this course.

## Write a project proposal and get it approved by an instructor

For this project, you will be assigned into groups of three or four. Together, you will need to come up with a product idea, and write it as a proposal that includes:

* A project description
    * Who uses it?
    * What outputs do they need?
    * What inputs are needed to generate those outputs?
* A list of technologies that you plan to use
* A well-defined and written-out feature list

There are some constraints around what technologies MUST be present in your app. Check out [Create and deploy a web app](#create-deploy) below.

## Follow Agile Workflow

See Slideshow

### Example Ideas

* Library
* Movie Database
* Blog
* Retail Store
* Student Enrollment System
* Sports Performance Database
* Trip Itenerary

## Create and deploy a complete CRUD app

Your web app should:

* CRUD
    * Allow users to create, read, update, and delete data from a form
    * Interact with a server-side A
* HTML
    * Make good use of semantic HTML tags
    * Be well-indented, [validated](https://validator.w3.org/nu/), etc.

* CSS
    * Be well-designed
    * Use either SASS or a styling framework like Bootstrap
        * If you are using Bootstrap, please consider theming with something like bootswatch, customizing the download with SASS, or a [customizer](http://getbootstrap.com/customize/)
    * Be well-indented and clean
    * Use at least one web font
    * Split code into separate files where appropriate
    * Responsive design optional but strongly encouraged
* JavaScript
    * Well-indented, [linted](http://www.javascriptlint.com/online_lint.php), and use excellent variable names
    * Split code into separate files where appropriate
    * Optionally, use a test-driven development approach
* Workflow
    * Use wireframes to create your layouts before you build them
    * Use a feature-branch workflow for your user stories
    * Squash commits and issue pull requests rather merging directly to master

Your API should:

* API
    * Must have atleast 2 API integrations
    * Use express.js
    * Have routes for create, read, update, and delete operations on multiple routes
    * Be designed according to RESTful principles
    * CRUD data from/to a relational database using SQL or an ORM
* Auth
    * Support functionality for three role types:
        * A non-logged in user
        * A logged-in user with limited permissions
        * A logged-in superuser
    * Support login via a social network
    * Passwords should be hashed
    * Use signed Cookies
* Database
    * Use PostgreSQL
    * Be seeded with data
    * Have a separate user for the application
* Workflow
    * Use a feature-branch workflow for your user stories
    * Document dependencies in a `package.json` file
    * Squash commits and issue pull requests rather merging directly to master

## Make a video highlighting the functionality of your app

* Make a 3-6 minute video explaining your project and demonstrating its features

## Complete a write-up of the project

* Describe what the project is, the technologies you used, and some information about the workflow you followed.
* 1-2 tight paragraphs

## Add all three of these to an online portfolio

* Create a portfolio on the [student portal](http://students.galvanize.com)
* Link to your final deployed site, your video, your respositories, and your write-up
* This will be added to your web development portfolio

## Present your work to the class

* Be prepared to spend ~10 minutes presenting your work to the class.
