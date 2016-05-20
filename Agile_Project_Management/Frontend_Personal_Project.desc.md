The goal of this project is to put what you've learned to use to:

* [Write a project proposal and get it approved by an instructor](#proposal)
* [Follow an agile development workflow](#agile)
* [Create and deploy a web app](#create-deploy)
* [Make a video highlighting the functionality of your app](#video)
* [Complete a write-up of the project](#write-up)
* [Add all three of these to an online portfolio](#portfolio)
* [Present your work to the class](#present)

<a id="proposal"></a>

## Write a project proposal and get it approved by an instructor

Your proposal should have

* A project description
    * Who uses it?
    * What outputs do they need?
    * What inputs are needed to generate those outputs?
* A list of technologies that you plan to use
* A well-defined and written-out feature list

There are some constraints around what technologies MUST be present in your app. Check out [Create and deploy a web app](#create-deploy) below.

Submit your proposal with a pull-request of [this repo](https://github.com/gSchool/individual-project-proposals).

### Example Ideas

* A Tetris Game, a blackjack game, a battleship game, etc.
* A quiz to test your JavaScript knowledge.
* A food library, similar to the [Game Library](https://github.com/gSchool/g11-course-curriculum/tree/master/week05/05_exercises/js-game-library), to keep track of your daily caloric/nutrition intake.
* A documentation aggregator that allows developers to easily search through documentation.
* A flash card style interview prep tool.
* A ping-pong scheduling/scoring system.
* A [Sudoku Solver](http://mherman.org/sudoku-solver/).

<a id="agile"></a>

## Follow an agile development workflow

Every student will be assigned a Product Owner, and every student will also be the Product Owner for another student.

* Your instructors will create a [Pivotal Tracker](http://www.pivotaltracker.com) account for you
    * Once your account is created, do a password reset in Pivotal Tracker to gain access
    * Create a new project in Pivotal Tracker for this assignment, and name it "GXX - Full Name" (using your cohort number and your name)
    * Note that we will delete these projects when we're done
* Work with your product owner to define several strong agile user stories
* Work with your product owner to come up with a few hand-drawn wireframes
* Add your stories to your Pivotal Tracker project

Most of your day will be spent working on your user stories. At the end of each day, you will go through the acceptance process with your product owner:

* You will show them your **deployed** app
* They will review your code
* They will accept or reject your delivered story, with feedback

<a id="create-deploy"></a>

## Create and deploy a web app

Your web app should:

* HTML
    * Make good use of semantic HTML tags
    * Be well-indented, [validated](https://validator.w3.org/nu/), etc.
    * Include some embedded media (images, audio, video, canvas)
    * Optionally, use a templating engine
* CSS
    * Use either SASS or a styling framework like Bootstrap
        * If you are using Bootstrap, please consider theming with something like bootswatch, customizing the download with SASS, or a [customizer](http://getbootstrap.com/customize/)
    * Be well-indented and clean
    * Split code into separate files where appropriate
    * Responsive design optional but strongly encouraged
* JavaScript
    * DOM manipulation via JavaScript or jQuery
    * Integration with some external API via XHR or AJAX
    * Response to some user-initiated events
    * Well-indented, [linted](http://www.javascriptlint.com/online_lint.php), and use excellent variable names
    * Split code into separate files where appropriate
    * Optionally, use a test-driven development approach
* User Input
    * Use at least one web form
    * Validate user input
    * Optionally, persist user data using something like LocalStorage
* Workflow
    * Use wireframes to create your layouts before you build them
    * Optionally, use a feature-branch workflow for your user stories
    * Optionally, do some build-tooling with something like Gulp

<a id="video"></a>

## Make a video highlighting the functionality of your app

* Make a 2-5 minute video explaining your project and demonstrating its features

<a id="write-up"></a>

## Complete a write-up of the project

* Describe what the project is, the technologies you used, and some information about the workflow you followed.
* 1-2 tight paragraphs

<a id="portfolio"></a>

## Add all three of these to an online portfolio

* Create a portfolio on [Flyt](http://students.galvanize.com)
* Link to your final deployed site, your video, and your write-up
* This will be the start of your portfolio as a web developer

<a id="present"></a>

## Present your work to the class

* Be prepared to spend ~5 minutes presenting your work to the class.

---

This is essentially a mini-capstone, as is a really good preview of how your final projects will go. You will have approximately 20-25 hours of class time to work on this. **It will not be enough time to do a good job on this project**. Plan on spending extra time outside of class. This is a Big Deal Week, and you should put maximum effort into making it successful. You can and should use your classmates and your instructors as learning resources, but this should be your own work.
