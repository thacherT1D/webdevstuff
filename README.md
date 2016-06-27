# Galvanize Full Stack Immersive Curriculum


## Minimum Pace

TODO: add standards

### Q1

The Command Line

- Navigate and manage a file system with the command line
- Work with and discuss and Unix Roles / Permissions
  - TODO: does this _have_ to be in Q1??

HTML

- Embed Rich Media using Audio & Video APIs
  - TODO: delete (add as success criteria to other standard)
- Write Valid HTML5 Markup
  - TODO: add lots of tests for validity
- Write Semantic HTML5 Markup
- Build HTML Forms and Controls
  - TODO: build ajax backend or these exercises?
  - TODO: Merge forms exercise into one big repo

Programming with Javascript

- Write, mentally evaluate, and store the result of JS expressions
- Encapsulate reusable code in functions
- Store and Access values in Arrays and Objects
  - TODO: include "deeply nested access" here
- Control the flow of a program using conditionals and loops
- Identify and fix common JS Errors
  - TODO: is this a standard that we assess against?  Probably remove
- TODO: break things up below here ----------------
- Diagram and explain how reference and primitive types are stored in memory and how they are passed around
- TODO ADD: Describe how key parts of JavaScript work
  - TODO: add interview questions on closures, hoisting, event loop, scope, prototypal inheritance, reference + primitive

JavaScript Object Model

- Define and invoke functions as methods on objects
- Uses `this` to manipulate the current context

Consuming Web APIs

- Fetch and send JSON with AJAX
- Explain what CORS is and get around CORS restrictions
  - TODO: add interview style questions

Javascript and the Browser

- Respond to Events with Event Listeners
- Target, create and manipulate DOM Elements
- Store program state Client-side with localStorage
  - TODO: delete

CSS

- Style HTML elements with CSS properties
- Write well organized CSS
- Lay out a document with CSS properties
- Target HTML elements with CSS selectors
- Use CSS3 and advanced browser tooling to create responsive pages
  - TODO: there should be fewer of these??
- Quickly style pages with CSS frameworks

How the Web Works

- Diagram and explain a URI
  - TODO: in success criteria add more questions and exercises about URLs with missing pieces in browsers

Version Control (Git and Github)

- Discuss the function and purpose of Git
- Track changes over time using a basic Git workflow
- Share code by pushing and pulling to a remote repository on GitHub
  - TODO: Share code by pushing TO and pulling FROM a remote repository on GitHub
  - TODO: combine into one standard

Automated Testing

- Write unit tests in a TDD style using Mocha Chai


### Q2

Programming with Javascript

- Create and access complex nested data structures
  - TODO CHANGE: "create nested data structures" targeting nested knex calls

How the Web Works

- Discuss the semantics of common HTTP Verbs, Headers, and Status Codes
  - TODO: be specific about REST-ish conventions
- Identify the parts of an HTTP request and response and discuss their purpose
  - TODO: write test suite for part of this

Server Side JS with Node

- Define and require Node modules
- Handle errors using Node patterns
- Use the APIs built-in to Node.js for OS specific operations
  - TODO: add hyphen to OS-specific
- TODO ADD: Describe the function and purpose of Node
  - TODO: add the "interview questions" related to node
- Control the flow of your program using EventEmitters
  - TODO: delete, but add an exercise describing the event emitter accumulator pattern

Server Side Frameworks with Express

- Build CRUD apps in Express
  - TODO: specify "from wireframes"
  - TODO: specify using migrations and seed files
- Describe what server-side frameworks like Express do
  - TODO: add the "interview questions"

Version Control (Git and Github)

- Collaborate with other developers using clone and fork-based workflows with Github
  - TODO: Collaborate with other developers using BOTH clone and fork-based workflows with Github
- Manage feature development with Git branches using a merge strategy
  - TARGET: Collaborate with other developers using a rebase strategy

Functional Programming with Javascript

- Write higher order functions that accept functions as parameters
- Refactor loops to use functional style

Auth

- Protect content in Express using middleware substacks
  - TODO: remove the word "substacks"
- Build OAuth user login in Express using Passport
- Build form-based authentication in Express using cookie-session
  - TODO: remove cookie-session, add it to success criteria
- Describe auth concepts including form-based authentication, OAuth and authorization

Automated Testing

- Work with and describe testing database-driven server-side applications w/ Express and Postgres given a working skeleton

JavaScript Object Model

- TODO ADD: standard about knowing 6 object creation methods
- Creates “Classes” and Instances with JS
- Uses Properties to store State on an Instance

Consuming Web APIs

- Fetch and send JSON from a server side app


### Q3

How the Web Works

- Discuss the basic function and purpose of web sockets

Client Side Frameworks (Angular)

- Explain client-side routing as it relates to server-side routing
- Implement custom-directives
- Implement and diagram JWT-based authentication between single-page apps and servers
- Build a single-page CRUD application in Angular using routing, factories / services and $http

OOP w/ Statically Typed Language

- Solve interview-style questions using Java
- Contrast statically-typed and dynamically-typed languages
- Compare and contrast OOP and Functional Programming
- Define and explain the significance of the major principles of Object Oriented Programming

Data Structures / Algorithms

- TODO: Make these more specific
- Identify and diagram common data structures
- Implement, evaluate, and use some common data structures
- Analyze an algorithm and identify the Big O
- Determine the correct algorithm and data structure for interview-style problems following the “Cracking the Coding Interview” process
  - TODO: delete (_maybe_ move to OOP)
- Implement common algorithms and describe more complex algorithms
- Employ a “Cracking the Coding Interview” technique when solving brain teaser problems
  - TODO: delete

Technical Interview Prep

- Employ a 4-step process at a whiteboard interview
  - TODO: replace "4-step" with "methodical"
- Gracefully respond to a question you don’t know the answer to
- Discuss a project that you worked on knowledgeably and enthusiastically

Application Analysis in Unfamiliar Environment

- Analyze existing code in applications written in unfamiliar languages to fulfill requirements
  - TODO: reword
- Set up developer environments for applications written in an unfamiliar languages

Automated Testing

- Discuss the pros and cons of automated testing
  - TODO: delete?  change to "function and purpose"?

Deployment

- Deploy to static hosting sites and explain the function and purpose of static hosting
  - TODO: shorten this to just the "doing" part

Deployment

- Explain the function and purpose environment variables and use them in their projects
- Deploy to Heroku (a PaaS Provider)
- TODO ADD: Deploy a single-page application using 2 techniques

Promises

- Make parallel requests using Promise.all
- Make sequential asynchronous calls in separate methods and return the final result with basic error handling using Promises
- Discuss the basic function and purpose of promises

ES2015

- Use ES2015 features to write more concise Javascript

Datastores

- Design and implement schemas
- Access data using an ORM / Knex
- Write database queries using SQL
- Contrast the function and purpose of non-relational and relational datastores
  - TODO: add interview questions
- Access data in datastores through joins

Designing APIs

- Design and implement a RESTful API
- Discuss common API design concepts
  - TODO: add interview questions
- Document an API using an automated tool
  - TODO: delete
- Secure an API endpoint using token-based authentication and CORS
  - TODO: move to express

Agile Project Management

- Explain the scrum process and define key terms
  - TODO: add interview questions here
- Discuss agile values and principles
  - TODO: merge with "explain..."
- Complete projects using an agile methodology

## Delete These Standards or turn into Learning Targets
------------------------------------------------------------------------------------------------------

How the Web Works

- Identify common protocols and explain their purpose
- Discuss and diagram Client-Server Model

Deployment

- Deploy to Pivotal Web Services Cloud Foundry
- Explain the function and purpose of Continuous Deployment and Continuous Integration and apply them to a project
- Deploy an app to EC2 and compare and contrast the AWS core philosophy with Heroku and Cloud Foundry and pre-cloud era
- Connect to another computer using SSH
- Develop and deploy an app using Docker containers
- Discuss the role and purpose of devops

Dev Environment

- Use dotfiles to configure projects, environments, and tools
- Touch type code at least 40 WPM
- Navigate your computer swiftly using keyboard shortcuts
- Send HTTP requests and view HTTP responses with Postman

Thinking Like a Developer

- Participates productively in code reviews
- Collaborates productively with other developers
- Interacts with error messages
- Approaches problems in a methodical and disciplined manner

Architecture

- Diagram architecture of an n-tier web app
- Identifies and explains purpose of common software architectural concepts
- Discuss and diagram microservice architecture
- Build a web app that separates concerns using models, views, and controllers

Design

- Design applications from content inventories using wireframes
- Create and apply style guides to an application
- Gather and validate requirements from a user and test that user’s response to a minimum testable artifact
- Create and implement responsive/adaptive designs

UX User Testing

- Design and execute user tests, then implement changes based on feedback


## Schedule

### Quarter 1

**Week 1**

TODO: move all links from this curriculum to the master branch and re-point links there.

- Minimum Pace of Standards
  - TBD
- Structures Introduced This Week
  - Warmups
    - https://github.com/sethvincent/javascripting
    - https://learn.galvanize.com/cohorts/69/articles/3413
  - Lessons
- Repos Introduced This Week
  - https://github.com/ryansobol/clmystery
    - TODO: fork and move to gSchool organization
  - https://github.com/gSchool/javascript-statements
    - TODO: ask Ryan S and anyone else who's used it how it went / what needs to be added / changed
    - TODO: add more of each kind of test?  Right now there's just one example for most things
- Slide decks
  - https://docs.google.com/presentation/d/154ou9yQJNcVcVehD6vqaKjGbCKhFb2xK85toqniWaa8/edit#slide=id.p
- Articles
  - https://learn.galvanize.com/cohorts/69/articles/3414 - Learn to Learn
    - TODO: better branding
  - https://learn.galvanize.com/cohorts/69/articles/3410 - Mac OSX
    - TODO: remove Fish
  - https://learn.galvanize.com/cohorts/69/articles/3417 Command Line
    - TODO: convert to our asset service to a personal imgur account doesn't affect us in the future
  - https://learn.galvanize.com/cohorts/69/articles/3418 GIT
    - TODO: broken images
    - TODO: make rocketship a video
  - https://learn.galvanize.com/cohorts/69/articles/3436 Intro to programming / Code as a spoken language
    - TODO: represent arrays as continuous strips
  - https://learn.galvanize.com/cohorts/69/articles/3440 Variables / conditionals
    - TODO: move to more authentic sources / links / add more CFUs
  - https://learn.galvanize.com/cohorts/69/articles/3445 Functions
    - TODO: define scope using the language we want them to use in interviews
    - TODO: refer to it as having to do with the visibility of variables, start to visualize the scope as tables
  - https://learn.galvanize.com/cohorts/69/articles/3443 arrays, objects and iteration
    - TODO: add exercise where they draw out the values at each iteration, just like we do for whiteboard interviews

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 2**

- Structures Added This Week
  - Friday projects?  Not sure if last week that was a "project"
    - TODO: pair based on ability / stretch goals met?
- Structures Used This Week
  - Lesson
  - Warmup
- Warmups
  - https://learn.galvanize.com/cohorts/69/articles/3439 - memory diagrams
  - https://github.com/gSchool/g26-challenges-so-far/blob/master/w2/w2-f-replace-with-alphabet-position/w2-f-replace-with-alphabet-position.js
    - TODO: roll everything in this repo into a non-cohort-based repo
    - TODO: move solutions to branches like all others
    - TODO: add test suites
  - http://rosettacode.org/wiki/FizzBuzz
  - https://github.com/gSchool/master_warmup_repository_full_stack
    - TODO: add consistent non-week-based names to all folders / files
    - TODO: add tests
    - TODO: add solutions on branches
    - TODO: make sure these cycle through content
    - https://learn.galvanize.com/cohorts/69/articles/3413 Typing - re-check for improvement
- Articles
  - https://learn.galvanize.com/cohorts/69/articles/3422 Intro to HTML
  - https://learn.galvanize.com/cohorts/69/articles/3424 Semantic HTML
  - https://learn.galvanize.com/cohorts/69/articles/3429 Intro to CSS
  - https://learn.galvanize.com/cohorts/69/articles/3431 Intermediate CSS
  - https://learn.galvanize.com/cohorts/69/articles/3451 JavaScript and the DOM
  - https://learn.galvanize.com/cohorts/69/articles/3453 JavaScript Events
- Exercises
  - https://github.com/gSchool/html-intro
    - TODO: add tests (npm test should auto-check for validity, and check that required elements are there)
  - https://github.com/gSchool/css-exercises
    - TODO: any chance we can test this with https://github.com/gSchool/css-regression-testing ??
  - https://github.com/gSchool/js-dom-tests
    - SO COOL!!
  - https://github.com/gSchool/stoplight-event-exercise
    - TODO: add stretch where moving the mouse quickly or slowly causes the lights to change
    - TODO: Add tests
  - https://github.com/gSchool/pixel-art-maker
    - SO COOL!!
    - TODO: Is this a pair thing?  An assessment?

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 3**

- Structures Introduced This Week
  - none?
- Structures Used This Week
  - Lessons
  - Warmup
  - Project
- Warmups
  - https://github.com/gSchool/master_warmup_repository_full_stack/blob/master/w3/w3-t-doubleChar/solution.js
    - TODO: add solutions
    - TODO: add tests
  - https://github.com/gSchool/master_warmup_repository_full_stack/blob/master/w3/w3-r-sum-of-numbers/solution.js
    - TODO: add solutions
    - TODO: add tests
  - https://gist.github.com/IanSmith89/6ae569d695ffa1134d229c8f75117da0
    - TODO: move to gSchool
    - TODO: is learning random scrambling important enough at this point?
- Articles
  - https://learn.galvanize.com/cohorts/69/articles/3765 Material Design
    - TODO: check for 5 elements of a full-baked article
  - https://learn.galvanize.com/cohorts/69/articles/3766 Web Forms
    - TODO: check for 5 elements of a full-baked article
  - https://learn.galvanize.com/cohorts/69/articles/3467 jQuery
    - TODO: check for 5 elements of a full-baked article
  - https://learn.galvanize.com/cohorts/69/articles/3453 JavaScript events
    - TODO: check for 5 elements of a full-baked article
  - https://learn.galvanize.com/cohorts/69/articles/3768 Linting
    - TODO: check for 5 elements of a full-baked article
- Exercises
  - https://github.com/gSchool/jquery-calculator
    - TODO: add tests
  - https://github.com/gSchool/galvanize-delivers/
    - TODO: add some basic tests (linting, validity, basic content is there)
  - https://github.com/gSchool/js-dom-tests
    - TODO: is this a dupe for a reason?

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 4**

- Structures Used This Week
  - Lesson
  - Warmup
- Structures Introduced This Week
  - none?
- Warmups
  - https://gist.github.com/IanSmith89/6ae569d695ffa1134d229c8f75117da0
    - TODO: move to gSchool org
    - TODO: add tests and solutions
    - TODO: why is this a dupe?
  - https://github.com/gSchool/g26-challenges-so-far/blob/master/w4/w4-r-rotate-array/problem.js
    - TODO: tests
  - https://github.com/gSchool/g26-challenges-so-far/blob/master/w4/w4-t-equivalent-number/problem.js
    - TODO: tests
  - https://gist.github.com/ryansobol/52642194e31327fe5d94a160c1eb2764
    - TODO: this is a dupe of lots of javascript challenges we have, unify, add tests
- Articles
  - https://learn.galvanize.com/cohorts/69/articles/3771 HTTP
  - https://learn.galvanize.com/cohorts/69/articles/3471 AJAX
    - TODO: fix capitalization
    - TODO: move images in-house
  - https://learn.galvanize.com/cohorts/69/articles/3474 Wireframes
    - Great use of authentic resources!!
    - TODO: add better CFUs / rubrics so students know if they are successful
  - https://learn.galvanize.com/cohorts/69/articles/3448 Scope / Hoisting
    - TODO: add language like "two pass" the same way we would ask of them in a phone interivew
  - https://learn.galvanize.com/cohorts/69/articles/3811 Issue Tracking
    - TODO: rename from "issues" to "Managing a Backlog" or something similar (features are not "issues" in most agile teams)
    - TODO: add more CFUs / exercises
  - https://learn.galvanize.com/cohorts/69/articles/3477 - Q1 Project Intro
- Exercises
  - https://github.com/gschool/wd-ajax-hero
    - TODO: tests
  - https://github.com/gSchool/function-tests
    - So cool

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 5**

- Structures Introduced This Week
  - Projects
  - Project check-ins / IPMs <-- how do we make this a student-led group exercise?
- Structures Used This Week
  - Warmups
  - Personal Work Time
- Exercises
  - https://gist.github.com/ryansobol/08689667a80b3accd519ededf49238d0
    - TODO: dup of lots of other tested reduce implementations.  De-dupe / make sure it's in gSchool
  - https://gist.github.com/ryansobol/afda64953e572ca0873905c525d06eb2
    - TODO: dup of lots of other tested reduce implementations.  De-dupe / make sure it's in gSchool
- Articles
  - https://learn.galvanize.com/cohorts/69/articles/3446 Debugging
  - https://learn.galvanize.com/cohorts/69/articles/3814 Interface Design
    - TODO: ensure credit/attribution for all external images, consider moving to our image service
  - https://learn.galvanize.com/cohorts/69/articles/3455 Local storage
    - TODO: move all images into our image service


<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

--- Break Week ---

### Quarter 2

**Week 1**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 2**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 3**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 4**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 5**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

--- Break Week ---

### Quarter 3

**Week 1**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 2**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 3**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 4**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 5**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

--- Break Week ---

### Quarter 4

**Week 1**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 2**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 3**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 4**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

**Week 5**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Monday</th>
      <th>Tuesday</th>
      <th>Wednesday</th>
      <th>Thursday</th>
      <th>Friday</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>9am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>10am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>11am</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>Noon</th>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
      <td>Lunch</td>
    </tr>
    <tr>
      <th>1pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>2pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>3pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <th>4pm</th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

--- Break Week ---
