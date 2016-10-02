## Objectives

- Explain what the Knex migration system is.
- Explain why the Knex migration system is useful.
- Use Knex to migrate a PostgreSQL database.
- Explain what the Knex seed system is.
- Explain why the Knex seed system is useful.
- Use Knex to seed a PostgreSQL database.

## What's the Knex migration system?

The **Knex migration system** allows developers to automate the management of database tables in JavaScript. At the heart of the system are migration files. When defined, a migration file moves the database up and down, or forwards and backwards, through a set of changes applied to a single table.

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

Here's an example of what the contents of the `20160621141318_tracks.js` migration file might look like.

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

### Exercise

Turn to a neighbor and explain what the Knex migration system is in your own words.

## Why is the Knex migration system useful?

Knex migrations are a consistent and convenient way to automate the management of database tables.

First, when the same sequence of Knex migration files are run on an empty database, they result in the creation of the same tables every time. This consistency is useful for reproducing the same tables in multiple databases. For example, when a development, test, and production environments, each with their own isolated database, are given the same table structure, the application code that successfully interfaces with one of them will work across all them.

Second, when a mistake in a Knex migration is caught early in the development process, the affected tables can be dropped, effectively rolling the database back to a known good state. This convenience is useful for correcting bugs that appear in a table's structure before they make it to production. For example, imagine a `price numeric(4, 2)` column is given a precision that's too low. This could lead to significant losses in revenue if the bug isn't corrected during development. With a Knex migration, you can roll the database back, fix the bug  before it's able to do damage, and migrate the database forward.

### Exercise

Turn to a neighbor and talk about when it might be useful to consistently create the same tables in multiple databases. Once you're satisfied, talk about when it might be useful to conveniently roll a database back.

## How do you use Knex to migrate a PostgreSQL database?

To practice using the Knex migration system, we're going to write a migration file that will create the following table in our database.  

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

We'll start by creating a directory named `trackify` and initializing it with a `package.json` file.

```shell
mkdir trackify
cd trackify
npm init -y
```

Add `.DS_Store`, `node_modules`, and `npm-debug.log` to a `.gitignore` file.

```shell
echo '.DS_Store' >> .gitignore
echo 'node_modules' >> .gitignore
echo 'npm-debug.log' >> .gitignore
```

Make sure PostgreSQL is running.

```shell
brew services list
```

Create a database called `trackify_dev` and confirm that it was created.

```shell
createdb trackify_dev
psql -l
```
The migration cli is bundled with the Knex install. Also, be sure to install the PostgreSQL client.

```shell
npm install --save pg knex
```

Create a `knexfile.js` file and configure the development environment.

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

When you install a Node.js module that includes an executable, the executable file is stored in `./node_modules/.bin`. Check the current migration status by running the following command.

```shell
./node_modules/.bin/knex migrate:currentVersion
```

It would be annoying to have to type out the full path to the Knex executable file each time we used it. Luckily NPM allows us to add command shortcuts in our `package.json` file inside a `scripts` object.

```javascript
"scripts": {
  "knex": "./node_modules/.bin/knex"
},
```

By default, NPM looks in the `./node_modules/.bin` folder so we can make this even shorter.

```javascript
"scripts": {
  "knex": "knex"
},
```

We run script commands listed in our `package.json` by typing `npm run` followed by the name we gave the command.

```shell
npm run knex migrate:currentVersion
```

Create a new migration by using the `migrate:make` command.

```shell
npm run knex migrate:make tracks
```

This creates a `migration` folder in the root directory of your project (unless it already existed) and adds a tracks migration file into the folder.

```shell
ls -hal
ls -hal migrations
```

Check the migration status again.

```shell
npm run knex migrate:currentVersion
```

Migrations are how we define and update our database schema. Open the tracks migration file, delete the boilerplate code, and type in the following code.

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

Notice that `.createTable('tracks', (table) => {...})` creates a new table on the database, with the first argument being the name of the table and the second a callback function to define the table's structure.

The `migrate:latest` command is used to run the migration file on the database.

```shell
npm run knex migrate:latest
```

Once again, check the current migration status.

```shell
npm run knex migrate:currentVersion
```

Confirm that the `tracks` table was created succesfully by listing the tables in the `trackify_dev` database.

```shell
psql trackify_dev -c '\dt'
```

Notice that there are two other tables alongside `tracks`. Look at the columns of the `knex_migrations` table.

```shell
psql trackify_dev -c '\d knex_migrations'
```

Next, look at the rows in the `knex_migrations` table.

```shell
psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

To better understand the purpose of the `knex_migrations` table, migrate the database backward, look at the migration status, and look at the rows in the `knex_migrations` table.

**NOTE:** The `migrate:rollback` command migrates the database backward by running the down function exported by your migration file.

```shell
npm run knex migrate:rollback

npm run knex migrate:currentVersion

psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

Now run the migration again, check the migration status, and look at the rows in the `knex_migrations` table.

```shell
npm run knex migrate:latest

npm run knex migrate:currentVersion

psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

Look at the columns and then the rows in the `knex_migrations_lock` table.

```shell
psql trackify_dev -c '\d knex_migrations_lock'

psql trackify_dev -c 'SELECT * FROM knex_migrations_lock;'
```

Knex automatically adds a lock table so multiple services cannot try to run migrations at the same time. If migrations are locked and migrations are run by another service it results in an error.

Next we'll write a second migration file to create a `users` table in our databse.

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

Use the `migrate:make` command to create the new file.

```shell
npm run knex migrate:make users
```

Confirm that the file was created successfully.

```shell
ls -hal migrations
```

Add the following code to the new users migration file.

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
Run the migration using the `migrate:latest` command, check the migration status, and inspect the rows in the `knex_migrations` table.

```shell
npm run knex migrate:latest

npm run knex migrate:currentVersion

psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

Rollback the database using the `migrate:rollback` command, check the migration status, and inspect the rows in the `knex_migrations` table.

```shell
npm run knex migrate:rollback

npm run knex migrate:currentVersion

psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

Rollback the database a second time, check the migration status, and inspect the rows in the `knex_migrations` table.

```shell
npm run knex migrate:rollback

npm run knex migrate:currentVersion

psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

Finally, run both migrations using the `migrate:latest` command, check the migration status, and inspect the rows in the `knex_migrations` table.

```shell
npm run knex migrate:latest

npm run knex migrate:currentVersion

psql trackify_dev -c 'SELECT * FROM knex_migrations;'
```

**NOTE:** A Knex migration will take all new migration files, group them in a batch, and then apply them. A rollback will only rollback the files in the most recently run batch.

To help illustrate this, here is an example flow:

```text
┌─────────────────────────┐
│ Create Migration File 1 │
│ Create Migration File 2 │
└─────────────────────────┘
            │              
           \|/
┌────────────────────────────────────────┐
│ knex migrate:latest                    │
│ Two migrations run, one batch created  │
└────────────────────────────────────────┘
            │
           \|/
┌────────────────────────────────────────────────────┐
│ knex migrate:rollback                              │
│ Two migrations rolled back, one batch rolled back  │
└────────────────────────────────────────────────────┘
```

Compare that to a second example flow:

```text
┌─────────────────────────┐
│ Create Migration File 1 │
└─────────────────────────┘
            │              
           \|/
┌───────────────────────────────────────┐
│ knex migrate:latest                   │
│ One migration run, one batch created  │
└───────────────────────────────────────┘
            │
           \|/
┌─────────────────────────┐
│ Create Migration File 2 │
│ Create Migration File 3 │
└─────────────────────────┘
            │              
           \|/
┌────────────────────────────────────────┐
│ knex migrate:latest                    │
│ Two migrations run, one batch created  │
└────────────────────────────────────────┘
            │              
           \|/
┌─────────────────────────────────────────────┐
│ knex migrate:rollback                       │
│ Two migrations rolled back (File 2, File 3) │
│ One batch rolled back.                      │
└─────────────────────────────────────────────┘
            │              
           \|/
┌────────────────────────────────────┐
│ knex migrate:rollback              │
│ One migration rolled back (File 1) │
│ One batch rolled back.             │
└────────────────────────────────────┘
```

## What's the Knex seed system?

The **Knex seed system** allows developers to automate the initialization of table rows in JavaScript. The heart of the seed system are seed files. Unlike the Knex migration system, the seed files do not run in batches. All seed files run every time you run the Knex seed command.

Here's an example of what the contents of the `1_tracks.js` seed file might look like.

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
      }]);
    });
};
```

Notice that seed files only export a single function that removes all rows from the table and then inserts the specified rows.

When the seed file runs, the exported function is translated into the following SQL commands.

```sql
DELETE FROM tracks;

INSERT INTO tracks (id, title, artist, likes, created_at, updated_at)
VALUES (
  1,
  'Here Comes the Sun',
  'The Beatles',
  28808736,
  '2016-06-26 07:26:16.000',
  '2016-06-26 07:26:16.000'
), (
  2,
  'Hey Jude',
  'The Beatles',
  20355655,
  '2016-06-26 07:26:16.000',
  '2016-06-26 07:26:16.000'
);
```

### Exercise

Turn to a neighbor and explain what the Knex seed system is in your own words. Then compare and contrast it with what you know about the Knex migration system.

## Why is the Knex seed system useful?

Most web application start with an initial set of table rows. It's useful to be able to seed a database with that set.

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

## Assignment

- [Galvanize Bookshelf](https://github.com/gSchool/galvanize-bookshelf#galvanize-bookshelf)
- [Galvanize Bookshelf - Knex Migrations and Seeds](https://github.com/gSchool/galvanize-bookshelf/blob/master/1_migrations_seeds.md)

## Resources

- [Knex.js - Migrations](http://knexjs.org/#Migrations)
- [Knex.js - Schema Builder](http://knexjs.org/#Schema)
- [Knex.js - Schema Builder - Schema Building](http://knexjs.org/#Schema-Building)
- [Knex.js - Schema Builder - Chainable Methods](http://knexjs.org/#Chainable)
- [Knex.js - Seeds](http://knexjs.org/#Seeds)
