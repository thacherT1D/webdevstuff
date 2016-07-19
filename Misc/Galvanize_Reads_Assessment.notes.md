* This is intended to be a Q2 summative assessment, and a companion to the group project. It accurately represents authentic junior developer tasks. It uses:
    * HTML
    * CSS
    * node.js
    * npm
    * Express
    * PostgreSQL
    * knex.js/pg
    * Data modeling
    * Forms
    * Validation
    * Agile
    * Git
    * Deployment
* Original intention is to limit them to a day. Need to test out how long it actually takes
* To add more sample data, edit [this sheet](https://docs.google.com/a/galvanize.com/spreadsheets/d/1SxY6I9mDJ4yI8jSqZXEIZSXUIxbA37G6dLecLINf5Tc/edit?usp=sharing) and export to CSV
* Base Pivotal Tracker project is [here](https://www.pivotaltracker.com/n/projects/1506922)
* Wireframes are in Balsamiq and located [here](https://galvanize.mybalsamiq.com/projects/randomexercises/grid)
* [Completed guide](https://docs.google.com/document/d/1xqfe0KyJx_WavYXzn2Gdq807ur3PAAFkiwHSuseFgZA/edit#)
* Needs screenshots too
* Last few user stories are stretch bonuses


## Grading Rubric Questions

### Functionality
1. Does the site look like kind of like the wireframes?
1. Does it list the books and the authors?
1. Can you view a detail page for a book or author?
1. Are the books and authors joined together?
1. Can you add, edit, then delete a book?
1. Can you add, edit, then delete an author?
1. Can you submit a blank book or author? Or do they have appropriate validations?

### Code Review
1. Is there a good README with installation instructions?
1. Did they commit often?
1. Is their knexfile right?
1. Is there an .env.example file?
1. Did they commit their .env?
1. Did they mount their route files or slap everything in the index?
1. Did they name their routes well?
1. Are their views well-indented and semantic?
1. Are they using partials?
1. Did they include an ERD? Is it correct?
1. Do their migrations look right?
1. Do their seeds look right?
1. Did they break their queries out into another file? Do the queries look right?
1. Are their stylesheets organized well, indented, and easy to follow?
1. Did they submit a link for their Pivotal Tracker Project? Does it look like they worked the stories?

### Normalized Data:

- Authors
  - Id
  - First Name
  - Last Name
  - Biography
  - Portrait URL

- Books
  - Id
  - Title
  - Genre
  - Description
  - Cover Image URL

- Authors Books
  - Id
  - Author id
  - Book id


