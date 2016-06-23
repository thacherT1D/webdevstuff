## Objectives

- Explain what Knex.js is.
- Explain why Knex.js is useful.
- Use Knex.js to select rows from a PostgreSQL table.
- Use Knex.js to insert rows into a PostgreSQL table.
- Use Knex.js to update rows in a PostgreSQL table.
- Use Knex.js to delete rows from a PostgreSQL table.

## What is Knex.js?

**Knex.js** is a third-party JavaScript library that builds an SQL command, or query, and sends it to a relational database system like PostgreSQL. In other words, Knex.js allows you to build a Node.js-based PostgreSQL client to communicate with a PostgreSQL server.

To get started, migrate and seed a database by running the following shell commands.

```shell
dropdb movie_junkies_dev
createdb movie_junkies_dev
curl -fsSL https://git.io/voXVD | psql movie_junkies_dev
```

Then, setup a new Node.js project by running the following shell commands.

```shell
mkdir movies
cd movies
npm init
npm install --save pg
npm install --save knex
touch knexfile.js
touch index.js
```

In the `knexfile.js` file, write and save the following code.

```javascript
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/movie_junkies_dev'
  }
};
```

In the `index.js` file, write and save the following code.

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

const sql = knex('movies').toString();

console.log(sql);
knex.destroy();
```

When the `require('knex')(config)` function is called, Knex opens a connection to the PostgreSQL server. When the `knex.destroy()` function is called, Knex closes it. If the connection isn't closed, the program would run indefinitely.

Then, execute the program by running the following shell command.

```shell
node index.js
```

And you should see something like this.

```text
select * from "movies"
```

Nearly all functions in Knex.js return a promise. A **promise** is an object that's used for asynchronous operations. A promise is more than a callback as it's an object that represents an operation that hasn't completed yet, but will in the future.

Promises are the preferred way of handling Knex query responses. The main benefit of a promise is the ability to catch thrown errors without crashing a Node.js app. By using a promise's `then()` and `catch()` asynchronous functions, your code will behave like `try` and `catch` synchronous blocks.

In the `index.js` file, write and save the following code.

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

knex('movies').then((result) => {
  console.log(result);
  knex.destroy();
})
.catch((err) => {
  console.error(err);
  knex.destroy();
  process.exit(1);
});
```

Then, execute the program by running the following shell command.

```shell
node index.js
```

And you should see something like this.

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

### Exercise

Turn to a partner and explain what Knex.js is in your own words.

## Why is Knex.js useful?

Knex.js allows developers to build Node.js web applications that can create, read, update, and destroy the rows, tables, and even databases of a relational database system like PostgreSQL.

[INSERT DIAGRAM OF A DATABASE-DRIVEN, FULL-STACK WEB APPLICATION]

Knex.js also prevents against SQL injection attacks. An **SQL injection** attack occurs when user input is not filtered for escape characters and is then passed into an SQL command. This results in the potential for a malicious user to manipulate the database commands that a web application performs. The following line of code illustrates this vulnerability.

```javascript
const stmt = "SELECT * FROM users WHERE name = '" + userName + "';"
```

The intent of the SQL code to select the rows of a specified `name` column from the `users` table. However, if the `userName` variable is crafted in a specific way by a malicious user, the SQL command can do more than the author intended. For example, setting the `userName` variable to the following.

```javascript
const userName = "'; DROP TABLE users; -- ";
```

Would result in the following malicious SQL command.

```sql
SELECT * FROM users WHERE name = ''; DROP TABLE users; -- ';
```

To prevent a SQL injection attack, all you need to do is just escape the special characters that a user, malicious or otherwise, may input into a web application. In SQL, a single-quote `'` character is escaped with another single-quote `'`.

```sql
SELECT * FROM users WHERE name = '''; DROP TABLE users; -- ';
```

Thankfully, the Knex.js API will automatically escape characters for you. In the `index.js` file, write and save the following code.

```javascript
'use strict';

const env = 'development';
const config = require('./knexfile.js')[env];
const knex = require('knex')(config);

const sql = knex('users').where('name', userName).toString();

console.log(sql);
knex.destroy();
```

Then, execute the program by running the following shell command.

```shell
node index.js
```

And you should see something like this.

```text
select * from "users" where "name" = '''; DROP TABLE users; -- '
```

And because the same Knex.js API works across many relational databases, such as  Postgres, MSSQL, MySQL, MariaDB, SQLite3, and Oracle, in theory, you could switch to a different database system without changing any of your Node.js code. However, most production web applications have a fair bit of highly optimized code that's specific to database system. But it's certainly possible that it can be converted as well.

### Exercise

Draw a diagram of a database-driven, full-stack web application. Identify which part uses Knex.js and how it works.

## Something

This should look pretty familiar, as it's the same database we used
earlier this week when we started to explore PostgreSQL. We're going to
build each of the queries we ran in that lecture using Knex instead.

Let's say we don't want to select every field, but we only care about
the titles and descriptions. To do that, we'll just pass an array of the
fields we care about to the select method.

### `SELECT` command

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
    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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

[select](http://knexjs.org/#Builder-select)

### `WHERE` clause

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
    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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

    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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
    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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
    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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
    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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
    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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
    knex.destroy();
  })
  .catch((err) => {
    console.error(err);
    knex.destroy();
    process.exit(1);
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

```shell
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

```shell
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

```shell
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

```shell
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

- [http://knexjs.org/#Builder](http://knexjs.org/#Builder)
- [knex.js website and documentation](http://knexjs.org/)
- [knex query lab](http://michaelavila.com/knex-querylab/)
- [SQL to knex exercise](https://github.com/gSchool/sql-to-knex-assignment)
- [Wikipedia - SQL injection](https://en.wikipedia.org/wiki/SQL_injection)
