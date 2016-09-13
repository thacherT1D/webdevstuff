The **Knex migration system** allows developers to automate the management of database tables in JavaScript. At the heart of the system are migration files. When defined, a migration file moves the database up and down, or forwards and backwards, through a set of changes applied to a single table.

* [Objectives](#objectives)
* [Why is the Knex migration system useful?](#why-is-the-knex-migration-system-useful)
* [How do you use Knex to migrate a PostgreSQL database?](#how-do-you-use-knex-to-migrate-a-postgresql-database)
* [What's the Knex seed system?](#whats-the-knex-seed-system)
* [Assignment](#assignment)
* [Resources](#resources)


<hr style="margin: 5rem 0;"/>

## Objectives

- Explain what the Knex migration system is.
- Explain why the Knex migration system is useful.
- Use Knex to migrate a PostgreSQL database.
- Explain what the Knex seed system is.
- Explain why the Knex seed system is useful.
- Use Knex to seed a PostgreSQL database.

<br>
## The Knex Migration System

Here's a diagram representing two Knex migration files that manage the `tracks` and `users` tables respectively.

```text
┌───────────────────────────┐                      ┌───────────────────────────┐
│                           │                      │                           │
│                           │──── up / forward ───▶│                           │
│                           │                      │                           │
│ 20160621141318_tracks.js  │                      │  20160621141319_users.js  │
│                           │                      │                           │
│                           │◀── down / backward ──│                           │
│                           │                      │                           │
└───────────────────────────┘                      └───────────────────────────┘
```

The name of a migration file starts with a UTC timestamp and ends with a table name. That way, the Knex migration system can identify and order the migrations based on when the files were created and what tables they affect.

Here's an example what the contents of the `20160621141318_tracks.js` migration file might look like.

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tracks', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('artist').notNullable().defaultTo('');
    table.integer('likes').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tracks');
};
```

As you can see, a migration file exports two functions—`up()` and `down()`. The `up()` function returns instructions to the Knex migration system on how to migrate the database forward. And the `down()` function returns instructions on how to migrate the database backward.

When the database is migrated forward, the `up()` function is translated into the following SQL command.

```sql
CREATE TABLE tracks (
  id serial PRIMARY KEY,
  title varchar(255) NOT NULL DEFAULT '',
  artist varchar(255) NOT NULL DEFAULT '',
  likes integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);
```

And when the database is migrated backward, the `down()` function is translated into the following SQL command.

```sql
DROP TABLE artists;
```

<br>
### Exercise

Turn to a neighbor and explain what the Knex migration system is in your own words.


<hr style="margin: 5rem 0;"/>

## Why is the Knex migration system useful?

Knex migrations are a consistent and convenient way to automate the management of database tables.

First, when the same sequence of Knex migration files are run on an empty database, they result in the creation of the same tables every time. This consistency is useful for reproducing the same tables in multiple databases. For example, when a development, test, and production environments, each with their own isolated database, are given the same table structure, the application code that successfully interfaces with one of them will work across all them.

Second, when a mistake in a Knex migration is caught early in the development process, the affected tables can be dropped, effectively rolling the database back to a known good state. This convenience is useful for correcting bugs that appear in a table's structure before they make it to production. For example, imagine a `price numeric(4, 2)` column is given a precision that's too low. This could lead to significant losses in revenue if the bug isn't corrected during development. With a Knex migration, you can roll the database back, fix the bug  before it's able to do damage, and migrate the database forward.

<br>
### Exercise

Turn to a neighbor and talk about when it might be useful to consistently create the same tables in multiple databases. Once you're satisfied, talk about when it might be useful to conveniently roll a database back.


<hr style="margin: 5rem 0;"/>

## How do you use Knex to migrate a PostgreSQL database?

```text
┌─────────────────────────────────────────────────────────────┐
│                           tracks                            │
├───────────┬─────────────────────────┬───────────────────────┤
│id         │serial                   │primary key            │
│title      │varchar(255)             │not null default ''    │
│artist     │varchar(255)             │not null default ''    │
│likes      │integer                  │not null default 0     │
│created_at │timestamp with time zone │not null default now() │
│updated_at │timestamp with time zone │not null default now() │
└───────────┴─────────────────────────┴───────────────────────┘
```

```shell
mkdir trackify
cd trackify
npm init
```

```shell
echo '.DS_Store' >> .gitignore
echo 'node_modules' >> .gitignore
echo 'npm-debug.log' >> .gitignore
```

```shell
createdb trackify_dev
psql -l
```
The migration cli is bundled with the knex global install.

```shell
npm install --save pg knex
```

```shell
touch knexfile.js
```

```javascript
'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/trackify_dev'
  }
};
```

```shell
./node_modules/.bin/knex migrate:currentVersion
```

```javascript
"scripts": {
  "knex": "knex"
},
```

```shell
npm run knex migrate:currentVersion
```

Create a new migration.

```shell
npm run knex migrate:make tracks
```

```shell
ls -hal
ls -hal migrations
```

```shell
npm run knex migrate:currentVersion
```

Migrations are how we define and update our database schema.

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tracks', (table) => {
    table.increments();
    table.string('title').notNullable().defaultTo('');
    table.string('artist').notNullable().defaultTo('');
    table.integer('likes').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('tracks');
};
```

```shell
npm run knex migrate:latest
```

```shell
npm run knex migrate:currentVersion
```

```shell
psql trackify_dev -c '\dt'
```

```shell
psql trackify_dev -c '\d knex_migrations'
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

```shell
npm run knex migrate:rollback
```

```shell
npm run knex migrate:currentVersion
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

```shell
npm run knex migrate:latest
```

```shell
npm run knex migrate:currentVersion
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

Add migration locking so multiple services cannot try to run migrations at same time. This added a new lock table. If migrations are locked and migrations are run by another service it results in an error.

```shell
psql trackify_dev -c '\d knex_migrations_lock'
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations_lock;'
```

```text
┌─────────────────────────────────────────────────────────────┐
│                            users                            │
├───────────┬─────────────────────────┬───────────────────────┤
│id         │serial                   │primary key            │
│email      │varchar(255)             │not null unique index  │
│created_at │timestamp with time zone │not null default now() │
│updated_at │timestamp with time zone │not null default now() │
└───────────┴─────────────────────────┴───────────────────────┘
```

```shell
npm run knex migrate:make users
```

```shell
ls -hal migrations
```

```javascript
'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email').notNullable().unique();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
```

```shell
npm run knex migrate:latest
```

```shell
npm run knex migrate:currentVersion
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

```shell
npm run knex migrate:rollback
```

```shell
npm run knex migrate:currentVersion
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

```shell
npm run knex migrate:rollback
```

```shell
npm run knex migrate:currentVersion
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

```shell
npm run knex migrate:latest
```

```shell
npm run knex migrate:currentVersion
```

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```


<hr style="margin: 5rem 0;"/>

## What's the Knex seed system?

The **Knex seed system** allows developers to automate the initialization of table rows in JavaScript. Most web application start with an initial set of table rows. It's useful to be able to seed a database with that set.

<br>
## How do you use Knex to seed a PostgreSQL database?

```shell
npm run knex seed:make 1_tracks
```

```shell
ls -hal
ls -hal seeds
```

```javascript
'use strict';

exports.seed = function(knex) {
  return knex('tracks').del()
    .then(() => {
      return knex('tracks').insert([{
        id: 1,
        title: 'Here Comes the Sun',
        artist: 'The Beatles',
        likes: 28808736,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        title: 'Hey Jude',
        artist: 'The Beatles',
        likes: 20355655,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        title: 'Send My Love',
        artist: 'Adele',
        likes: 39658471,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        title: 'Hello',
        artist: 'Adele',
        likes: 538300301,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('tracks_id_seq', (SELECT MAX(id) FROM tracks));"
      );
    });
};
```

```shell
npm run knex seed:run
```

```shell
psql trackify_dev -c 'SELECT * FROM tracks;'
```

```shell
npm run knex seed:run
```

```shell
psql trackify_dev -c 'SELECT * FROM tracks;'
```

```shell
npm run knex seed:make 2_users
```

```shell
ls -hal seeds
```

```javascript
'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        email: '2pac@shakur.com',
        created_at: new Date('2016-06-29 14:26:16 UTC'),
        updated_at: new Date('2016-06-29 14:26:16 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
```

```shell
npm run knex seed:run
```

```shell
psql trackify_dev -c 'SELECT * FROM users;'
```

```shell
npm run knex seed:run
```

```shell
psql trackify_dev -c 'SELECT * FROM users;'
```

```shell
git init
```

```shell
git status
```

```shell
git add .
git commit -m 'Initial commit'
```


<hr style="margin: 5rem 0;"/>

## Assignment

- [Galvanize Bookshelf](https://github.com/gSchool/galvanize-bookshelf#galvanize-bookshelf)
- [Galvanize Bookshelf - Knex Migrations and Seeds](https://github.com/gSchool/galvanize-bookshelf/blob/master/1_migrations_seeds.md)


<hr style="margin: 5rem 0;"/>

## Resources

- [Knex.js - Migrations](http://knexjs.org/#Migrations)
- [Knex.js - Schema Builder](http://knexjs.org/#Schema)
- [Knex.js - Schema Builder - Schema Building](http://knexjs.org/#Schema-Building)
- [Knex.js - Schema Builder - Chainable Methods](http://knexjs.org/#Chainable)
- [Knex.js - Seeds](http://knexjs.org/#Seeds)
