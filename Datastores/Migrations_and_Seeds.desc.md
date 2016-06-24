## Objectives

- Explain what a Knex.js migration is.
- Explain why a Knex.js migration is useful.
- Use Knex.js to migrate a PostgreSQL database.
- Explain what a Knex.js seed is.
- Explain why a Knex.js seed is useful.
- Use Knex.js to seed a PostgreSQL database.

## Installing and setting up knex

```sh
$ npm init
$ npm install --save pg knex    #install knex locally
$ npm install knex -g           #install knex cli globally
$ knex init                     #create knexfile.js
```

---

## knexfile.js

`knex init`  creates a new knexfile with some default values. Update the knexfile with the following:

```js
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/album-demo'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
```

---

## Migrations

* Migrations allow for you to define sets of schema changes that modify a database schema

* The migration cli is bundled with the knex global install.

---

## knex migration tool

Create a new migration with the name create_albums

```sh
knex migrate:make create_albums
```

---

## migrations

* Migrations are how we define and update our database schema. Update the new migration file migrations/CURRENTDATETIME_create_albums.js accordingly:

```js
exports.up = function(knex, Promise) {
  return knex.schema.createTable('albums', function(table){
    table.increments();
    table.string('artist');
    table.string('name');
    table.string('genre');
    table.integer('stars');
    table.boolean('explicit');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('albums');
};
```

---

## Create the database

```sh
$ createdb "album-demo"
```
## Run the latest migrations using the development connection string

```sh
$ knex migrate:latest --env development
```

---

## Initialize knex only once

 * Initializing the library should normally only ever happen once in your application
 * This creates a connection pool for the current database
 * You should use the instance returned from the initialize call throughout your library.

---
