<div class="alert alert-info">
  We are currently transitioning this Learning Experience from Mongo to SQL.  Here are a few helpful links as we transition:
  
  <ul>
  <li>https://github.com/gSchool/express-knex-api-with-joins</li>
  </ul>
</div>



# Express CRUD

Please skim through this entire document first. Specific instructions for what to do (and in which order) appear further down.

## Setting the stage

- Clear the stage (close all other terminal tabs, chrome tabs, email etc...).
- Internalize the what and why section (Rationale).
- The goal here is learning to learn, so it is all about the process. There is no rush. Take risks and have fun! Do not be afraid to make mistakes and try new things.
- When you have a hypothesis, come up with a coding experiment that valides or invalidates your theory. If it is sufficiently interesting please keep a copy of it to share with classmates as an exercise.

### Rationale (What and Why):

CRUD, which stands for Create/Read/Update/Delete, defines a generic interface for persisting data. The notion of CRUD exists at many different levels for computers, thus far in the course CRUD has been seen in the context of the file system (`touch`, `cat`, `vi`, `rm`, etc.) and PostgreSQL (`insert`, `select`, `update`, `delete`).

Moving forwards into web development, CRUD will evolve as the fundamental pattern in web application development. Any web application that has something like users, preferences, favorites, etc. is using CRUD under the hood. Web applications will define a CRUD interface via HTTP, the routes handled by the web application (and their associated code), and then persisted to the database, once again using CRUD. *_The importance of this pattern cannot be overstated_*.

### Key terms:

- CRUD
- HTTP Verb
- noun

## Activities

In the following example taken from the Rails guides, the goal is to create an interface for users to be able to manage photos. Before examining the table below, first ask yourself, what kinds of tasks would a user need to be able to do to manage photos online?

On a high-level, users would need to be able to _add_ photos, _see_ the photos they have added, _update_ photos they have added, and _delete_ photos they have added. But how does something like this translate to code?

![Rails Guide Routes](http://modernweb.com/wp-content/uploads/2014/05/rails-routes.png)

The table above defines what CRUD looks like at the HTTP-level for the `photos` resource. But this is still rather abstract. Both exercises are meant to reinforce what CRUD looks like in code.

### First Exercise: CRUD with Express

* [CRUD with Express/PostgreSQL](https://github.com/gSchool/express-postgresql-crud)

### Second Exercise: Node CRUD without Express

* [Node CRUD by hand](https://github.com/gSchool/node-crud-by-hand)
