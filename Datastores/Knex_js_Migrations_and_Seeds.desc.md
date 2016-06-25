## Objectives

- Explain what a Knex.js migration is.
- Explain why a Knex.js migration is useful.
- Use Knex.js to migrate a PostgreSQL database.
- Explain what a Knex.js seed is.
- Explain why a Knex.js seed is useful.
- Use Knex.js to seed a PostgreSQL database.

## What's a Knex.js migration?

A Knex.js migration allows you to define sets of database changes.

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
brew services list
```

```shell
brew services stop postgresql
```

```shell
brew services list
```

```shell
initdb pg
```

```shell
ls -hal pg
```

```shell
echo 'pg' >> .gitignore
```

```shell
postgres -D pg
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
  "knex": "knex",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

```shell
npm run knex migrate:currentVersion
```

Create a new migration with the name create_albums

```shell
npm run knex migrate:make artists
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

exports.up = function(knex, Promise) {
  return knex.schema.createTable('artists', function(table) {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('artists');
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

```shell
npm run knex migrate:make tracks
```

```shell
ls -hal migrations
```

```javascript
'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('tracks', function(table) {
    table.increments();
    table.integer('artist_id')
      .notNullable()
      .references('id')
      .inTable('artists')
      .onDelete('CASCADE')
      .index();
    table.string('title').notNullable().defaultTo('');
    table.integer('likes').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
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

## What's a Knex.js Seed?

```shell
npm run knex seed:make 1_artists
```

```shell
ls -hal
ls -hal seeds
```

```javascript
'use strict';

exports.seed = function(knex, Promise) {
  return knex('artists').del()
    .then(() => {
      return knex('artists').insert([{
        id: 1,
        name: 'The Beatles'
      }, {
        id: 2,
        name: 'Adele'
      }]);
    });
};
```

```shell
npm run knex seed:run
```

```shell
psql trackify_dev -c 'SELECT * FROM artists;'
```

```shell
npm run knex seed:run
```

```shell
psql trackify_dev -c 'SELECT * FROM artists;'
```


```shell
npm run knex seed:make 2_tracks
```

```shell
ls -hal seeds
```

```javascript
'use strict';

exports.seed = function(knex, Promise) {
  return knex('tracks').del()
    .then(() => {
      return knex('tracks').insert([{
        id: 1,
        artist_id: 1,
        title: 'Here Comes the Sun',
        likes: 28808736
      }, {
        id: 2,
        artist_id: 1,
        title: 'Hey Jude',
        likes: 20355655
      }, {
        id: 4,
        artist_id: 1,
        title: 'Yesterday',
        likes: 21626039
      }, {
        id: 5,
        artist_id: 2,
        title: 'Send My Love',
        likes: 39658471
      }, {
        id: 6,
        artist_id: 2,
        title: 'Hello',
        likes: 538300301
      }, {
        id: 7,
        artist_id: 2,
        title: 'When We Were Young',
        likes: 112487182
      }, {
        id: 8,
        artist_id: 2,
        title: 'Someone Like You',
        likes: 112487182
      }]);
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

## How do you deploy to Heroku?
