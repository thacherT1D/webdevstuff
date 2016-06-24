<img src="http://knexjs.org/docs/images/knex.png" style="background:white;border:none;width:100%;padding:30px;"/>

The "batteries included" SQL query builder.

---

# Objectives

* Define what a query builder is and what some of the benefits are to using one

* Understand how to set up a project with knex and the knex CLI

* Write migrations to create and alter tables

* Perform CRUD on a resource using Knex methods

---

## What is a query builder?

* A software library that allows the use of objects and methods to write SQL queries in an database agnostic way.

* Individual parts of a SQL statement are specified using objects and methods. Parts are then assembled into a valid SQL query.

* Query builders are best used when you need to assemble a SQL statement based on conditional logic in your application.

---

## Why use a query builder?

* Avoid long concatenated strings in code.

* Build complex SQL statements programmatically

* Automatically quotes table names and columns to prevent conflict with SQL reserved words and special characters.

* Automatically escapes parameters to reduce risk of SQL injection attacks

* Provides DB abstraction, simplifying migration to different DB platforms

---

# Examples

---

### SELECT

```SQL
select * from "cities"
```

```js
knex('cities')
```

### INSERT

```SQL
insert into "cities" ("name") values ('Denver')
```

```js
knex('cities').insert({name: 'Denver'})
```

---

### UPDATE

```SQL
update "cities" set "name" = 'Chicago' where "id" = 1
```

```js
knex('cities').where('id', 1).update({ name: 'Chicago'})
```

### DELETE

```SQL
delete from "cities" where "id" = 1
```

```js
knex('cities').where('id', 1).del()
```

---

# Getting Started

---

# NOTE

* Commands beginning with a <span style="color:red">$</span> should be executed from the command line.

---

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


## Use the connection in your routes file

* Create a new file in the routes folder called albums.js

* Require the knex.js file you created

* Create a function Albums that returns a new knex query builder for the albums table

```js
var knex = require('../db/knex');
function Albums() {
  return knex('albums');
}
```

---

## Knex Query Builder

* The heart of the library, the knex query builder is the interface used for building and executing standard SQL queries.

```js
knex('tableName')
knex.[methodName]
```

 * The query builder starts off either by specifying a tableName you wish to query against, or by calling any method directly on the knex object.

 * This kicks off a chain, with which you can call additional query builder methods as needed to construct the query, eventually calling any of the interface methods

 * Interface methods include:  convert toString, or execute the query with a promise, callback, or stream.

---

## knex query builder docs

[http://knexjs.org/#Builder](http://knexjs.org/#Builder)

---

# CRUD with knex

Add the following routes to albums.js

---

## Create

```js
router.post('/', function(req, res){

  Albums().insert({
    artist: req.body.artist,
    name: req.body.name,
    genre: req.body.genre,
    stars: req.body.stars,
    explicit: req.body.explicit
  }, 'id').then(function(result){
    res.json(result);
  });

});
```

---

## Read

```js
router.get('/', function(req, res){

  Albums().select().then(function(result){
    res.json(result);
  });

});
```

```js
router.get('/:id', function(req, res){

  Albums().where('id', req.params.id).first().then(function(result){
    res.json(result);
  });

});
```

---

## Update

```js
router.put('/:id', function(req, res){

  Albums().where('id', req.params.id).update({
    stars: req.body.stars
  }).then(function(result){
    res.json(result);
  });

});
```

---

## Delete

```js
router.delete('/:id', function(req, res){

  Albums().where('id', req.params.id).del().then(function(result){
    res.json(result);
  });

});
```

---

## Resources

* [knex.js website and documentation](http://knexjs.org/)

* [knex query lab](http://michaelavila.com/knex-querylab/)

* [SQL to knex exercise](https://github.com/gSchool/sql-to-knex-assignment)
