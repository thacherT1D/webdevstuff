### Objectives

* Be able to alter database schema using migrations
* Be able to alter a production database schema using migrations
* Be able to explain why migrations are important
* Be able to explain why migrations have unique identifying numbers
* Be able to rollback a migration in both a development and production environement

### Why you should care

Migrations are a convenient way to alter your database schema over time in a consistent and easy way. Migrations reduce the opportunity for human error and allow you to automate schema creation in both development and production.

You can think of each migration as being a new 'version' of the database. A schema starts off with nothing in it, and each migration modifies it to add or remove tables, columns, or entries.

These migrations also provide further documentation about your database schema for you, your team, and _future you!_

### Questions to be answerd by the end of this lesson:

1. Why use the `--save` flag when installing npm packages? How does that affect your app when you deploy?
1. What does the `knexfile.js` file do? Why is it important?
1. Why is the `knex` CLI super handy for creating migration files?
1. What is a database schema?
1. Why do migration file names start wtih a UTC timestamp?
1. Why is it important to use the `knex` CLI `rollback` function to undo a migration?
1. Why does `knex` add an `exports.down` function to your migrations?

## EXERCISE OVERVIEW

Included in the exercise repo is a Library CRUD app. Your mission is to add `Books` and `Readers` schemas to this app using `knex` migrations.

Before you begin, be sure and delete any existing `library` database you might have from previous exercises.

#### Your Schemas Should Have:

__Books__

* id
* author
* title
* rating
* description

__Readers__

* id
* first_name
* last_name


After you get everything working locally, you will deploy this CRUD app to Heroku and use your migrations to add your `Readers` and `Books` schemas to your production database.

# Get Started!

### Installing and setting up knex and pg npm packages

```sh
$ npm install --save pg knex  #install knex locally
$ npm install knex -g         #install knex cli globally if you haven't before
```
---

### knexfile.js

`touch knexfile.js` and add the following.

```js
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/library'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
```

---

### Migrations

Migrations are stored as files in the migrations directory, one for each migration. The name of the file is of the form CURRENTDATETIME_create_books.js, that is to say a UTC timestamp identifying the migration, followed by an underscore, followed by the name of the migration. Knex uses this timestamp to ensure each migration is unique and helps knex keep track of what migrations have already been run.

Of course, calculating timestamps is no fun, so Knex provides a generator to handle making it for you:

__The migration cli is bundled with the knex global install.__

---

### Knex migration tool

Create a new migration with the name create_books

```sh
knex migrate:make create_books
```
__You probably got an error about not having a database? Your migration file was still created, but go ahead and use knex to create your `library` database__

```sh
$ createdb library
```

Update the new migration file `migrations/CURRENTDATETIME_create_books.js` accordingly:

```js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table){
    table.increments();
    table.string('author');
    table.string('title');
    table.integer('rating');
    table.text('description');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
```

---

### Run the latest migrations using the development connection string

```sh
$ knex migrate:latest --env development
```

#### Confirm successful migration and proper schema

```sh
psql library
select * from books;
```

#### Where does knex store its log of what migrations have run?

If you are in your `library` database and run the describe table (`\dt`) command, you should see `knex_migrations`.

Go ahead and `select * from knex_migrations`. What do you see? What does this tell you about how Knex works?

---

### Establishing a Connection

__Initializing knex only once__
* Initializing the library should normally only ever happen once in your application
* This creates a connection pool for the current database
* You should use the instance returned from the initialize call throughout your library.

---

* Create a folder called `db`

* Inside the db folder create a new file `knex.js` with the following contents:

```js
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
```

* This initializes knex with the connection information obtained from the configuration in `knexfile.js` for the current environment

__NOTE:__ What core module do you need to install to be able to use environment variables?

---

### Use the connection in your routes file

* In your `routes/books.js` file, require the `knex.js` file you created

* Create a function `Books` that returns a new knex query builder for the books table

```js
var knex = require('../db/knex');
function Books() {
  return knex('books');
}
```

__Using knex and migrations, get `Readers` wired up and confirm that your app is running as it should _locally_ __

---

### Get it working on Heroku

__STEP 1__

* In your `knexfile.js` you need to add two things. Can you spot them?

```js
require('dotenv').load();

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/library'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
```
`add`, `commit` and `push`.

__STEP 2__

From the command line, run the following command:

```sh
knex migrate:latest --env production
```

__Broken?__

You are running your file locally and your app doesn't know what the value of your `DATABASE_URL` environment variable.

__add your DATABASE_URL environment variable to `.env`__

```sh
heroku config  // to get your variable and value
```

### Helpful Notes

__Connecting to a Heroku Hosted Postgres Database__

```sh
heroku addons:create heroku-postgresql
```

__Using the `dotenv` core module to config environment variables__

You'll need some help getting your app to talk to your environment variables, both locally as well as deployed.

Google `npm dotenv` and read the docs to help you get up and running with a `.env` file in your Node.js app.

Also, remember the __Entry Ticket__ list above? Visit the Learning Experiences listed there to review previous topics used here.


### Knex is not the only ORM for Node and Postres. Take a minute to explore some of the other options available to developers:

- https://github.com/robconery/massive-js
- Links:

- Basic Driver - https://github.com/brianc/node-postgres
- Basic Migrator - http://umigrate.readthedocs.org/projects/db-migrate/en/v0.10.x/
- Bookshelf ORM - http://bookshelfjs.org/
- Sequelize ORM - http://docs.sequelizejs.com/en/latest/
