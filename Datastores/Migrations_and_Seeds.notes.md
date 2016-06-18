## Objectives

* Write migrations to manage your database schema
* Explain why migrations have timestamps
* Run and rollback migrations on Heroku

### Why you should care

Migrations are a convenient way to alter your database schema over time in a consistent and easy way. Migrations reduce the opportunity for human error and allow you to automate database schema creation in both development and production.

Each migration modifies the current database schema, and by running all of the migrations in order you can go from nothing to a fully defined database schema.

### Questions to be answerd by the end of this lesson:

1. What does the `knexfile.js` file do? Why is it important?
1. Why is the `knex` CLI super handy for creating migration files?
1. What is a database schema?
1. Why do migration file names start wtih a UTC timestamp?
1. Why is it important to use the `knex` CLI `rollback` function to undo a migration?
1. Why does `knex` add an `exports.down` function to your migrations?

## EXERCISE OVERVIEW

Included in the [exercise repo](https://github.com/ctide/intro-to-deploying-express-pg-apps-to-heroku) is a Library CRUD app. Your mission is to add `books` and `readers` tables to this app using `knex` migrations.

Before you begin, be sure and delete any existing `library` database you might have from previous exercises.

#### We are going to build migrations for two tables:

__books__

* id
* author
* title
* rating
* description

__readers__

* id
* first_name
* last_name


After you get everything working locally, you will deploy this CRUD app to Heroku and use your migrations to add your `readers` and `books` tables to your production database.

# Get Started!

Clone this [exercise repo](https://github.com/ctide/intro-to-deploying-express-pg-apps-to-heroku) and `cd` into the directory.

### Installing and setting up knex and pg npm packages

```sh
$ npm install
$ npm install --save pg knex  #install knex locally
$ npm install knex -g         #install knex cli globally if you haven't before
```
---

### knexfile.js

`touch knexfile.js` and add the following:

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

### Migrations

Migrations are stored as files in the migrations directory, one for each migration. The name of the file is of the form CURRENTDATETIME_MIGRATIONNAME.js, that is to say a UTC timestamp identifying the migration, followed by an underscore, followed by the name of the migration. Knex uses this timestamp to ensure each migration is unique, to track which migrations have been run, and to ensure that migrations are all run in the proper order.

### Knex migration tool

Create a new migration with the name create_books

```sh
knex migrate:make create_books
```

You probably got an error about not having a database. Your migration file was still created, but we will need to create a local database:

```sh
$ createdb library
```

Update the new migration file `migrations/CURRENTDATETIME_create_books.js` accordingly:

```js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('books', function(table) {
    table.increments();
    table.string('author');
    table.string('title');
    table.integer('rating');
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('books');
};
```

### Run the latest migrations using the development connection string

```sh
$ knex migrate:latest --env development
```

#### Confirm successful migration:

```sh
psql library
\d+ books;
                                                       Table "public.books"
   Column    |          Type          |                     Modifiers                      | Storage  | Stats target | Description
-------------+------------------------+----------------------------------------------------+----------+--------------+-------------
 id          | integer                | not null default nextval('books_id_seq'::regclass) | plain    |              |
 author      | character varying(255) |                                                    | extended |              |
 title       | character varying(255) |                                                    | extended |              |
 rating      | integer                |                                                    | plain    |              |
 description | text                   |                                                    | extended |              |
Indexes:
    "books_pkey" PRIMARY KEY, btree (id)
```

#### Where does knex store the log of what migrations have run?

If you are in your `library` database and run the describe table (`\dt`) command, you should see `knex_migrations`.

Go ahead and `select * from knex_migrations`. What do you see? What does this tell you about how Knex works?

### Establishing a Connection

__Initializing knex only once__
* Initializing the library should normally only ever happen once in your application
* This creates a connection pool for the current database
* You should use the instance returned from the initialize call throughout your code.

### Adding Knex to your Express application

* Create a folder called `db`
* Inside the db folder create a new file `knex.js` with the following contents:

```js
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
```

* This initializes knex with the connection information obtained from the configuration in `knexfile.js` for the current environment

#### Let's start using our new database:

* In the `routes/books.js` file, require the `knex.js` file you created
* Create a function `books` that returns a new knex query builder for the books table:

```js
const knex = require('../db/knex');

function books() {
  return knex('books');
}
```

## Exercise

Using the steps outlined above, setup the `readers` table using a migration, and add the relevant code to the `routes/readers.js` file. Assuming you built the migration correctly, and added the right code, all the `readers` routes will now be functional in your local version of this application.

### Get it working on Heroku

First, we'll need to create a new heroku instance and add a postgres server to it:

```sh
heroku create
heroku addons:create heroku-postgresql
```

Now that you've created a new heroku instance, push your code with your migrations to Heroku. You should be able to load your index page of your app on heroku, but any other route will probably time out.

### Running your migrations on production

```sh
heroku run knex migrate:latest
```

Here we're going to tell Heroku that we need to run our migrations. You should see output that looks similar to:

```sh
Running knex migrate:latest on obscure-sierra-57141.... up, run.1276
Using environment: production
Batch 1 run: 2 migrations
/app/migrations/20160329103350_create_books.js
/app/migrations/20160329105509_create_readers.js
```

And now your app should be fully functional on Heroku!

### Other ways to work with PostgreSQL in Node

Knex is not the only way to access PostgreSQL from Node. Take a minute to explore some of the other options available to developers:

- Massive JS: https://github.com/robconery/massive-js
- Basic Driver - https://github.com/brianc/node-postgres
- Basic Migrator - http://umigrate.readthedocs.org/projects/db-migrate/en/v0.10.x/
- Bookshelf ORM - http://bookshelfjs.org/ (uses Knex under the hood)
- Sequelize ORM - http://docs.sequelizejs.com/en/latest/
