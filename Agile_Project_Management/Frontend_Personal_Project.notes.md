# Week 5 Project

* Do stories the friday before week 5 and get everything set up
* Have a reason for students to be present at the beginning and end of each day:
    * Group warmups or a brief lecture in the morning
    * Acceptance tests at the end of the day
* This project is CRUCIAL for capstone project success
* They'll do this same process with group projects later
* Their projects/writeups/videos will go in the LMS
* Emphasize that classtime is not enough to do a good job on this project
* A class of 30 doing 5-minute presentations will take 2.5 hours. If you add in time for breaks and feedback, presentations will probably take all of Friday afternoon.

## Project Components

* [Write a project proposal and get it approved by an instructor](#proposal)
* [Follow an agile development workflow](#agile)
* [Create and deploy a web app](#create-deploy)
* [Make a video highlighting the functionality of your app](#video)
* [Complete a write-up of the project](#write-up)
* [Add all three of these to an online portfolio](#portfolio)
* [Present your work to the class](#present)

<a id="proposal"></a>

## Write a project proposal and get it approved by an instructor

Proposal Guidelines:

* A project description
    * Who uses it?
    * What outputs do they need?
    * What inputs are needed to generate those outputs?
* A list of technologies that you plan to use
* A well-defined and written-out feature list

<a id="agile"></a>

## Follow an agile development workflow

Every student will be assigned a Product Owner, and every student will also be the Product Owner for another student. Don't use the randomizer, make smart pairings.

### Creating Tracker accounts for all students

To create tracker accounts:

1. Go to Setup > Tracker Accounts and press “Create Tracker Accounts"
1. Have each student do a password reset in Pivotal Tracker
1. Have them name their repos GXX - Full Name
1. Let them know we’ll delete these later

### Use CSVs to add boilerplate stories into student project trackers

```
Type,Story,Description
chore,Create a git repository on GitHub,And wire it up locally
chore,Deploy a simple HTML file,To divshot or S3 or Heroku
chore,Add the production URL to your README,
```

* Make note to delete their projects when the assignment is over.
* Their stories and wireframes will be terrible at first- make sure you've covered those ahead of time
* Local code doesn't count as a deployed app. Product owners should go into them blind
* A story shouldn't accepted if the code isn't refactored

<a id="create-deploy"></a>

## Create and deploy a web app

App Constraints:

* HTML
    * Make good use of semantic HTML tags
    * Be well-indented, [validated](https://validator.w3.org/nu/), etc.
    * Include some embedded media (images, audio, video, canvas)
    * Optionally, use a templating engine
* CSS
    * Use either SASS or a styling framework like Bootstrap
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
    * Persist user data using something like LocalStorage
* Workflow
    * Use wireframes to create your layouts before you build them
    * Use a feature-branch workflow for your user stories
    * Do some build-tooling with something like Gulp

<a id="video"></a>

## Make a video highlighting the functionality of your app

* 2-5 minute video explaining the project and demonstrating its features

<a id="write-up"></a>

## Complete a write-up of the project

* Describe what the project is, the technologies you used, and some information about the workflow you followed.
* 1-2 tight paragraphs

<a id="portfolio"></a>

## Add all three of these to an online portfolio

* Create a portfolio on the [student portal](http://students.galvanize.com)
* Link to your final deployed site, your video, and your write-up
* This will be the start of your portfolio as a web developer

<a id="present"></a>

## Present your work to the class

* Be prepared to spend ~5 minutes presenting your work to the class.
* Project should address the following:

```
-- ~ 20 seconds about who you are and what problem your project solves
-- A walkthrough of your app ( ~ 1 minute )
-- A brief discussion of how your app works under the hood (~ 1 minute )
-- Challenges you faced and how you solved them ( ~ 1 minute )

```
