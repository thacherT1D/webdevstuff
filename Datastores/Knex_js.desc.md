## Objectives

* Define what a query builder is and what some of the benefits are to using one
* Setup a new project with Knex
* Perform CRUD on a resource using Knex methods

## What is Knex?

Knex is what's commonly referred to as a 'query builder'. It provides an
API that abstracts writing raw SQL into a set of functions that are
easier to work with. It helps to avoid bugs in SQL statements, and
prevents against certain kinds of security vulnerabilities. In theory,
it also allows you to switch databases without changing all of your code
to query data. Knex provides an interface to a handful of different
relational databases other than PostgreSQL, such as MySQL, Oracle,
sqlite, and others.

## Installing and setting up knex

Create a new folder `intro_to_knex`, and cd into it and run the
following commands into the terminal:

```sh
createdb intro_to_knex
curl https://gist.githubusercontent.com/ctide/4a2c8dcd525f3a9867dd/raw/c04e3c5029123ad77f4ad8e1cbcc0706efd8d42c/intro_to_knex.sql | psql intro_to_knex
npm init -y
npm install --save pg knex    #install knex locally
npm install knex -g           #install knex cli globally
knex init                     #create knexfile.js
```

### knexfile.js

`knex init`  creates a new `knexfile.js` file with some default values. Open that file in your editor and delete all of the content in it, and change it to the following:

```javascript
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/intro_to_knex'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
```

## Setup Knex in our application

Now that we have created a file that will configure Knex, let's actually
initialize it in our new application. We're going to create a `db`
folder inside of the `intro_to_knex` folder, and create a file just
called `knex.js` in there.

This is going to be a fairly simple file, just the following 3 lines:

```js
var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
module.exports = require('knex')(config);
```

This is going to bring in all of our configuration information, and pass
it to the knex library. The knex library will then initiate a connection
to our database, and allow us to start building queries.

## Let's build some queries!

Now that we have added the boilerplate for setting up Knex, let's
actually make some queries.

Let's create an `index.js` file, and start adding some functionality to
it.

```javascript
var knex = require('./db/knex');

knex('movies').select().then(function(data) {
  console.log(data);
  process.exit(1);
});
```

Here we're just telling knex we want to query the `movies` table, and we
want to [select](http://knexjs.org/#Builder-select) all the data. Knex will return a promise from `select`,
so we use `then` just like we did with jQuery to process the data.

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 1, title: 'Batman Begins', description: null, rating: 10 },
  { id: 2, title: 'Cars', description: 'Pixar movie', rating: 7 },
  { id: 3,
    title: 'Back to the Future',
    description: 'No one calls Marty chicken',
    rating: 9 },
  { id: 4,
    title: 'Dude Wheres My Car',
    description: 'probably a bad movie',
    rating: 3 },
  { id: 5,
    title: 'Godfather',
    description: 'good movie',
    rating: 10 },
  { id: 6,
    title: 'Mystic River',
    description: 'did not see it',
    rating: 7 },
  { id: 7,
    title: 'Argo',
    description: 'Ben Affleck is a hero',
    rating: 7 },
  { id: 8,
    title: 'Gigli',
    description: 'really bad movie',
    rating: 1 },
  { id: 9,
    title: 'Sharknado',
    description: 'Instant classic',
    rating: 10 },
  { id: 10,
    title: 'Jurassic World',
    description: 'Chris Pratt trains raptors',
    rating: 5 },
  { id: 11,
    title: 'Mad Max: Fury Road',
    description: 'Water is low, similar to california',
    rating: 7 } ]
```

This should look pretty familiar, as it's the same database we used
earlier this week when we started to explore PostgreSQL. We're going to
build each of the queries we ran in that lecture using Knex instead.

### What if I don't want to select everything?

Let's say we don't want to select every field, but we only care about
the titles and descriptions. To do that, we'll just pass an array of the
fields we care about to the select method.

Let's change index.js to look like:

```javascript
var knex = require('./db/knex');

knex('movies').select(['title', 'description']).then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { title: 'Batman Begins', description: null },
  { title: 'Cars', description: 'Pixar movie' },
  { title: 'Back to the Future',
    description: 'No one calls Marty chicken' },
  { title: 'Dude Wheres My Car',
    description: 'probably a bad movie' },
  { title: 'Godfather', description: 'good movie' },
  { title: 'Mystic River', description: 'did not see it' },
  { title: 'Argo', description: 'Ben Affleck is a hero' },
  { title: 'Gigli', description: 'really bad movie' },
  { title: 'Sharknado', description: 'Instant classic' },
  { title: 'Jurassic World',
    description: 'Chris Pratt trains raptors' },
  { title: 'Mad Max: Fury Road',
    description: 'Water is low, similar to california' } ]
```

### What if we only want movies that are decent?

Knex has a fairly intuitive API, so if we want to add a `where` clause,
we'll just use the [where](http://knexjs.org/#Builder-where) function like so:

```javascript
var knex = require('./db/knex');

knex('movies').select().where('rating', '>', 4).then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 1, title: 'Batman Begins', description: null, rating: 10 },
  { id: 2, title: 'Cars', description: 'Pixar movie', rating: 7 },
  { id: 3,
    title: 'Back to the Future',
    description: 'No one calls Marty chicken',
    rating: 9 },
  { id: 5,
    title: 'Godfather',
    description: 'good movie',
    rating: 10 },
  { id: 6,
    title: 'Mystic River',
    description: 'did not see it',
    rating: 7 },
  { id: 7,
    title: 'Argo',
    description: 'Ben Affleck is a hero',
    rating: 7 },
  { id: 9,
    title: 'Sharknado',
    description: 'Instant classic',
    rating: 10 },
  { id: 10,
    title: 'Jurassic World',
    description: 'Chris Pratt trains raptors',
    rating: 5 },
  { id: 11,
    title: 'Mad Max: Fury Road',
    description: 'Water is low, similar to california',
    rating: 7 } ]
```

### What if we want to have multiple where clauses?

We can just chain more where clauses into our query, and Knex will
handle building the proper query for those. Let's fetch decent movies
named Cars:

```javascript
knex('movies').select().where('rating', '>', 4).where({title: 'Cars'}).then(function(data) {
  console.log(data);
  process.exit(1);
});
```

There's a handful of ways to tell Knex you want it to match a key and a
value, but passing an object is going to be the clearest usually.

Did you run this code and get back an empty arry? PostgreSQL is case
sensitive, so if you don't capitalize `Cars`, it won't actually match
anything.

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 2, title: 'Cars', description: 'Pixar movie', rating: 7 } ]
```

### How about adding OR clauses?

Let's say we wanted to fetch both Gigli and Cars. Knex also
provides an `orWhere` function that we can use:

```javascript
var knex = require('./db/knex');

knex('movies').select().where({title: 'Cars'}).orWhere({title: 'Gigli'}).then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 2, title: 'Cars', description: 'Pixar movie', rating: 7 },
  { id: 8,
    title: 'Gigli',
    description: 'really bad movie',
    rating: 1 } ]
```

### Ordering? Can we get our data back ordered nicely?

Anytime you want your data in a specific order, it's better to let the
database return your rows in the proper order instead of resorting it in
your code. Let's use the [orderBy](http://knexjs.org/#Builder-orderBy)
function to return all the movies sorted by rating, descending:

```javascript
var knex = require('./db/knex');

knex('movies').select().orderBy('rating', 'desc').then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 5,
    title: 'Godfather',
    description: 'good movie',
    rating: 10 },
  { id: 1, title: 'Batman Begins', description: null, rating: 10 },
  { id: 9,
    title: 'Sharknado',
    description: 'Instant classic',
    rating: 10 },
  { id: 3,
    title: 'Back to the Future',
    description: 'No one calls Marty chicken',
    rating: 9 },
  { id: 11,
    title: 'Mad Max: Fury Road',
    description: 'Water is low, similar to california',
    rating: 7 },
  { id: 2, title: 'Cars', description: 'Pixar movie', rating: 7 },
  { id: 6,
    title: 'Mystic River',
    description: 'did not see it',
    rating: 7 },
  { id: 7,
    title: 'Argo',
    description: 'Ben Affleck is a hero',
    rating: 7 },
  { id: 10,
    title: 'Jurassic World',
    description: 'Chris Pratt trains raptors',
    rating: 5 },
  { id: 4,
    title: 'Dude Wheres My Car',
    description: 'probably a bad movie',
    rating: 3 },
  { id: 8,
    title: 'Gigli',
    description: 'really bad movie',
    rating: 1 } ]
```

The first parameter to orderBy is going to be the field, and the second
will be 'asc' by default, or you can specify 'desc' instead to reverse
the order.

### Limits?

Yep, Knex provides [limit](http://knexjs.org/#Builder-limit) also. Let's
only fetch the top 5 movies:

```javascript
var knex = require('./db/knex');

knex('movies').select().orderBy('rating', 'desc').limit(5).then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 5,
    title: 'Godfather',
    description: 'good movie',
    rating: 10 },
  { id: 9,
    title: 'Sharknado',
    description: 'Instant classic',
    rating: 10 },
  { id: 1, title: 'Batman Begins', description: null, rating: 10 },
  { id: 3,
    title: 'Back to the Future',
    description: 'No one calls Marty chicken',
    rating: 9 },
  { id: 6,
    title: 'Mystic River',
    description: 'did not see it',
    rating: 7 } ]
```

# Query Exercises

Build the following 4 queries:

* Write a query on the movie table to return the worst movie of all time. There should be only 1 result returned. The result should include the title, description and rating of the movie.
* Write a query that returns Gigli and Mad Max: Fury Road
* Write a query that returns the id and title of the first 5 movies inserted into the database.
* Write a query to get all of the average movies from the table. Average is defined as a rating between 4 and 7 inclusive.

# Updating

Updating is simply replacing the `select` function with a call to [update](http://knexjs.org/#Builder-update), passing in what fields should be changed.

Let's fix Gigli:

```javascript
var knex = require('./db/knex');

knex('movies').where({title: 'Gigli'}).update({rating: 10}).then(function() {
  knex('movies').select().where({title: 'Gigli'}).then(function(data) {
    console.log(data);
    process.exit(1);
  });
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 8,
    title: 'Gigli',
    description: 'really bad movie',
    rating: 10 } ]
```

We had to nest a second select in there, why?

Another way to write the update (at least with PostgreSQL, this won't
work for some other relational databases) is to also pass a `returning`
argument in addition to the data being updated.

Something like this:

```javascript
var knex = require('./db/knex');

knex('movies').where({title: 'Gigli'}).update({rating: 10}, '*').then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 8,
    title: 'Gigli',
    description: 'really bad movie',
    rating: 10 } ]
```

It's usually better to write your updates this way if you need the data
returned afterwards. This minimizes the number of individual queries
you're executing.

# Deleting

This is going to work very similarly to update above, we just replace
the call to update with a call to [del](http://knexjs.org/#Builder-del).

* Sidenote: Why is this called `del` instead of `delete`?

```javascript
var knex = require('./db/knex');

knex('movies').where({title: 'Gigli'}).del().then(function() {
  knex('movies').select().where({title: 'Gigli'}).then(function(data) {
    console.log(data);
    process.exit(1);
  });
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[]
```

# Inserting

Let's say we changed our mind, and really do want to have Gigli in our
database. We can use [insert](http://knexjs.org/#Builder-insert) to add
new rows to our database:

```javascript
var knex = require('./db/knex');

knex('movies').insert({title: 'Gigli', description: 'Best movie evar', rating: 10}, '*').then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js
[ { id: 12,
    title: 'Gigli',
    description: 'Best movie evar',
    rating: 10 } ]
```

Just like with `update`, we can pass a second argument to `insert` that
tells PostgreSQL what we want returned from the database as a result of
our insert. If we don't include that second parameter, then postgres
will only return the ID, and the promise will be resolved with a fairly
useless object:

```javascript
var knex = require('./db/knex');

knex('movies').insert({title: 'Gigli', description: 'Best movie evar', rating: 10}).then(function(data) {
  console.log(data);
  process.exit(1);
});
```

```bash
/development/galvanize/intro_to_knex  ᐅ node index.js

{ command: 'INSERT',
  rowCount: 1,
  oid: 0,
  rows: [],
  fields: [],
  _parsers: [],
  RowCtor: null,
  rowAsArray: false,
  _getTypeParser: [Function: bound ] }
```

## Resources

* [http://knexjs.org/#Builder](http://knexjs.org/#Builder)

* [knex.js website and documentation](http://knexjs.org/)

* [knex query lab](http://michaelavila.com/knex-querylab/)

* [SQL to knex exercise](https://github.com/gSchool/sql-to-knex-assignment)
