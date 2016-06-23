## Objectives

- Explain what Knex.js is.
- Explain why Knex.js is useful.
- Use Knex.js to select rows from a PostgreSQL table.
- Use Knex.js to insert rows into a PostgreSQL table.
- Use Knex.js to update rows in a PostgreSQL table.
- Use Knex.js to delete rows from a PostgreSQL table.

## What is Knex.js?

**Knex.js** is a SQL query builder for PostgreSQL and other relational database systems. In other words, Knex.js provides an JavaScript API sending SQL commands to a PostgreSQL server.

```shell
cd movies
npm init
npm install --save pg
npm install --save knex
touch index.js
dropdb movie_junkies_dev
createdb movie_junkies_dev
curl -fsSL https://git.io/voXVD | psql movie_junkies_dev
```

```javascript
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie_junkies_dev'
  }
};
```

Now that we have created a file that will configure Knex, let's actually
initialize it in our new application. We're going to create a `db`
folder inside of the `intro_to_knex` folder, and create a file just
called `knex.js` in there.

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

const sql = knex('movies').toString();

console.log(sql);

process.exit();
```

```shell
node index.js
```

Here we're just telling knex we want to query the `movies` table, and we
want to [select](http://knexjs.org/#Builder-select) all the data. Knex will return a promise from `select`,
so we use `then` just like we did with jQuery to process the data.

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies').then((result) => {
  console.log(result);

  process.exit();
});
```

```shell
node index.js
```

```shell
[ anonymous {
    id: 1,
    title: 'Frozen',
    duration: 102,
    rating: 'PG',
    genre: 'Animation',
    is_3d: true,
    released_at: 2013-11-27T00:00:00.000Z,
    score: '7.6' },
  anonymous {
    id: 2,
    title: 'X-Men: Apocalypse',
    duration: 144,
    rating: 'PG-13',
    genre: 'Action',
    is_3d: true,
    released_at: 2016-05-27T00:00:00.000Z,
    score: '7.4' },
  anonymous {
    id: 3,
    title: 'The Princess Bride',
    duration: 98,
    rating: 'PG',
    genre: 'Adventure',
    is_3d: false,
    released_at: 1987-10-09T00:00:00.000Z,
    score: '8.1' },
  anonymous {
    id: 4,
    title: 'Pulp Fiction',
    duration: 154,
    rating: 'R',
    genre: 'Crime',
    is_3d: false,
    released_at: 1994-10-14T00:00:00.000Z,
    score: '8.9' } ]
```

## Why is Knex.js useful?

It helps to avoid bugs in SQL statements, and prevents against certain kinds of security vulnerabilities. In theory, it also allows you to switch databases without changing all of your code to query data. Knex provides an interface to a handful of different relational databases other than PostgreSQL, such as MySQL, Oracle, sqlite, and others.

## Something

This should look pretty familiar, as it's the same database we used
earlier this week when we started to explore PostgreSQL. We're going to
build each of the queries we ran in that lecture using Knex instead.

Let's say we don't want to select every field, but we only care about
the titles and descriptions. To do that, we'll just pass an array of the
fields we care about to the select method.

Let's change index.js to look like:

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```shell
node index.js
```

```text
[ anonymous {
    id: 1,
    title: 'Frozen',
    rating: 'PG',
    is_3d: true,
    score: '7.6' },
  anonymous {
    id: 2,
    title: 'X-Men: Apocalypse',
    rating: 'PG-13',
    is_3d: true,
    score: '7.4' },
  anonymous {
    id: 3,
    title: 'The Princess Bride',
    rating: 'PG',
    is_3d: false,
    score: '8.1' },
  anonymous {
    id: 4,
    title: 'Pulp Fiction',
    rating: 'R',
    is_3d: false,
    score: '8.9' } ]
```

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .where('id', 4)
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```text
[ anonymous {
    id: 4,
    title: 'Pulp Fiction',
    rating: 'R',
    is_3d: false,
    score: '8.9' } ]
```

Knex has a fairly intuitive API, so if we want to add a `where` clause,
we'll just use the [where](http://knexjs.org/#Builder-where) function like so:

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .where('score', '>=', 7.5)
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```shell
node index.js
```

```shell
[ anonymous {
    id: 1,
    title: 'Frozen',
    rating: 'PG',
    is_3d: true,
    score: '7.6' },
  anonymous {
    id: 3,
    title: 'The Princess Bride',
    rating: 'PG',
    is_3d: false,
    score: '8.1' },
  anonymous {
    id: 4,
    title: 'Pulp Fiction',
    rating: 'R',
    is_3d: false,
    score: '8.9' } ]
```

### What if we want to have multiple where clauses?

We can just chain more where clauses into our query, and Knex will
handle building the proper query for those. Let's fetch decent movies
named Cars:

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .where('score', '>=', 7.5)
  .where('rating', 'PG')
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```shell
node index.js
```

```text
[ anonymous {
    id: 1,
    title: 'Frozen',
    rating: 'PG',
    is_3d: true,
    score: '7.6' },
  anonymous {
    id: 3,
    title: 'The Princess Bride',
    rating: 'PG',
    is_3d: false,
    score: '8.1' } ]
```

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .where('score', '>=', 7.5)
  .where({ rating: 'PG', is_3d: true })
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```shell
node index.js
```

```text
[ anonymous {
    id: 1,
    title: 'Frozen',
    rating: 'PG',
    is_3d: true,
    score: '7.6' } ]
```

There's a handful of ways to tell Knex you want it to match a key and a
value, but passing an object is going to be the clearest usually.

Did you run this code and get back an empty arry? PostgreSQL is case
sensitive, so if you don't capitalize `Cars`, it won't actually match
anything.


### How about adding OR clauses?

Let's say we wanted to fetch both Gigli and Cars. Knex also
provides an `orWhere` function that we can use:

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .where('score', '>=', 7.5)
  .where({ rating: 'PG', is_3d: true })
  .orWhere('title', 'Pulp Fiction')
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```shell
node index.js
```

```text
[ anonymous {
    id: 1,
    title: 'Frozen',
    rating: 'PG',
    is_3d: true,
    score: '7.6' },
  anonymous {
    id: 4,
    title: 'Pulp Fiction',
    rating: 'R',
    is_3d: false,
    score: '8.9' } ]
```

Anytime you want your data in a specific order, it's better to let the
database return your rows in the proper order instead of resorting it in
your code. Let's use the [orderBy](http://knexjs.org/#Builder-orderBy)
function to return all the movies sorted by rating, descending:

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .where('score', '>=', 7.5)
  .where({ rating: 'PG', is_3d: true })
  .orWhere('title', 'Pulp Fiction')
  .orderBy('score', 'DESC')
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```shell
node index.js
```

```text
[ anonymous {
    id: 4,
    title: 'Pulp Fiction',
    rating: 'R',
    is_3d: false,
    score: '8.9' },
  anonymous {
    id: 1,
    title: 'Frozen',
    rating: 'PG',
    is_3d: true,
    score: '7.6' } ]
```

The first parameter to orderBy is going to be the field, and the second
will be 'asc' by default, or you can specify 'desc' instead to reverse
the order.

### `Limit`

Yep, Knex provides [limit](http://knexjs.org/#Builder-limit) also. Let's
only fetch the top 5 movies:

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies')
  .select('id', 'title', 'rating', 'is_3d', 'score')
  .where('score', '>=', 7.5)
  .where({ rating: 'PG', is_3d: true })
  .orWhere('title', 'Pulp Fiction')
  .orderBy('score', 'DESC')
  .limit(1)
  .then((result) => {
    console.log(result);

    process.exit();
  });
```

```shell
node index.js
```

```text
[ anonymous {
    id: 4,
    title: 'Pulp Fiction',
    rating: 'R',
    is_3d: false,
    score: '8.9' } ]
```

### Exercise

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
