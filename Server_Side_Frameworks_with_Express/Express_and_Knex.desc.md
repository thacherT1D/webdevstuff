## Objectives

- Explain what a RESTful, database-driven HTTP server is.
- Explain why a RESTful, database-driven HTTP server is useful.
- Use Express and Knex to build a RESTful, database-driven HTTP server.

## What's a RESTful, database-driven HTTP server?

A **RESTful, database-driven HTTP server** is exactly what the name implies. It's a server that communicates with a client using a RESTful HTTP API. The sole purpose of the HTTP server is to manage information that's persisted to a database.

Here's a sequence diagram of the RESTful, database-driven HTTP server.

```text
┌─── Chrome ──┐               ┌── Node.js ──┐               ┌── postgres ─┐               ╔════════════ cluster ═══════════╗
│             │─── request ──▶│             │─── request ──▶│             │──── write ───▶║                                ║
│             │    JSON       │             │    SQL        │             │               ║  ┏━━━━━━━━ database ━━━━━━━━┓  ║
│   jQuery    │               │   Express   │               │             │               ║  ┃                          ┃  ║
│             │               │   Knex      │               │             │               ║  ┃  ┌──────┬ table ┬─────┐  ┃  ║
│             │               │             │               │             │               ║  ┃  ├──────┼───────┼─────┤  ┃  ║
│             │◀── response ──│             │◀── response ──│             │◀─── read ─────║  ┃  ├──────┼───────┼─────┤  ┃  ║
└─────────────┘    JSON       └─────────────┘    Row(s)     └─────────────┘               ║  ┃  ├──────┼───────┼─────┤  ┃  ║
                                                                                          ║  ┃  └──────┴───────┴─────┘  ┃  ║
                                                                                          ║  ┃                          ┃  ║
                                                                                          ║  ┃  ┌──────┬ table ┬─────┐  ┃  ║
                                                                                          ║  ┃  ├──────┼───────┼─────┤  ┃  ║
                                                                                          ║  ┃  ├──────┼───────┼─────┤  ┃  ║
                                                                                          ║  ┃  ├──────┼───────┼─────┤  ┃  ║
                                                                                          ║  ┃  └──────┴───────┴─────┘  ┃  ║
                                                                                          ║  ┃                          ┃  ║
                                                                                          ║  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛  ║
                                                                                          ║                                ║
                                                                                          ╚════════════════════════════════╝
```

For example, imagine a RESTful, database-driven HTTP server manages the persistence of the following rows in the `tracks` table.

```text
 id |       title        |   artist    
----+--------------------+-------------
  1 | Here Comes the Sun | The Beatles
```

A RESTful server would handle the following HTTP requests by mapping them to a specific REST action.

| REST Action       | Request Method | Request URL | Request Content-Type  | Request Body                                   |
|-------------------|----------------|-------------|-----------------------|------------------------------------------------|
| Read (all)        | `GET`          | `/tracks`   | N/A                   | N/A                                            |
| Read (individual) | `GET`          | `/tracks/1` | N/A                   | N/A                                            |
| Create            | `POST`         | `/tracks`   | `application/json`    | `{ "title": "Purple Rain", "name": "Prince" }` |
| Update            | `PATCH`        | `/tracks/1` | `application/json`    | `{ "title": "Yesterday" }`                     |
| Destroy           | `DELETE`       | `/tracks/1` | N/A                   | N/A                                            |

Once the operation is complete, the RESTful server would send a specific HTTP response back to the client indicating the result of the operation.

| REST Action       | Response Status | Response Content-Type | Response Body                                                           |
|-------------------|-----------------|-----------------------|-------------------------------------------------------------------------|
| Read (all)        | `200`           | `application/json`    | `[{ id: "1", "title": "Here Comes the Sun", "artist": "The Beatles" }]` |
| Read (individual) | `200`           | `application/json`    | `{ id: "1", "title": "Here Comes the Sun", "artist": "The Beatles" }`   |
| Create            | `200`           | `application/json`    | `{ id: "2", "title": "Purple Rain", "name": "Prince" }`                 |
| Update            | `200`           | `application/json`    | `{ id: "1", "title": "Yesterday", "artist": "The Beatles" }`            |
| Destroy           | `200`           | `application/json`    | `{ "title": "Yesterday", "artist": "The Beatles" }`                     |

### Exercise

Take a few moments to diagram how a RESTful, database-driven HTTP server works.

Once you've satisfied, turn to a neighbor and explain how information flows throw the system.

## Why is a RESTful, database-driven HTTP server is useful?

- separation of concerns
- follows the principle of least surprise
- great way to organize data, relationships, processes
- process are independently scalable and replaceable

## How do you use Express and Knex to build a RESTful, database-driven HTTP server?

Here's an entity relationship diagram representing the data model the HTTP server will need to manage.

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

To get started, checkout a new feature branch.

```shell
git checkout -b http_server
```

Then, install the following dependencies locally and save them to the `package.json` file.

```shell
npm install --save express body-parser morgan
```

In a `server.js` file, type the following code.

```javascript
'use strict';

const express = require('express');
const app = express();

app.disable('x-powered-by');

const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());

const tracks = require('./routes/tracks');

app.use(tracks);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.output && err.output.statusCode) {
    return res
      .status(err.output.statusCode)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port', port);
});
```

In the `routes/tracks.js` file, write the following code.

```javascript
'use strict';

const express = require('express');

const router = express.Router();

module.exports = router;
```

Then, install `nodemon` as a local development dependency, saving it to the `package.json` file.

```shell
npm install --save-dev nodemon
```

Add a `nodemon` script to the `package.json` file.

```javascript
"scripts": {
  "knex": "knex",
  "nodemon": "nodemon server.js"
},
```

Then, start the server with `nodemon`.

```shell
npm run nodemon
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add an Express server'
```

In a `knex.js` file, type out the following code.

```javascript
'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
```

In a `routes/artists.js` file, type the following code.

```javascript
'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/tracks', (_req, res, next) => {
  knex('tracks')
    .orderBy('title')
    .then((rows) => {
      const tracks = camelizeKeys(rows);

      res.send(tracks);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/tracks/:id', (req, res, next) => {
    knex('tracks')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      const track = camelizeKeys(row);

      res.send(track);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/tracks', (req, res, next) => {
  const { title, artist } = req.body;

  if (!title || !title.trim()) {
    return next(boom.create(400, 'Title must not be blank'));
  }

  if (!artist || !artist.trim()) {
    return next(boom.create(400, 'Artist must not be blank'));
  }

  const insertTrack = { title, artist };

  knex('artists')
    .insert(decamelizeKeys(insertTrack), '*')
    .then((rows) => {
      const track = camelizeKeys(rows[0]);

      res.send(track);    
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/tracks/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        throw boom.create(404, 'Not Found');
      }

      const { title, artist } = req.body;
      const updateTrack = {};

      if (title) {
        updateTrack.title = title;
      }

      if (artist) {
        updateTrack.artist = artist;
      }

      return knex('tracks')
        .update(decamelizeKeys(updateTrack), '*')
        .where('id', req.params.id);
    })
    .then((rows) => {
      const track = camelizeKeys(rows[0]);

      res.send(track);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/tracks/:id', (req, res, next) => {
  let track;

  knex('tracks')
    .where('id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Not Found');
      }

      track = camelizeKeys(row);

      return knex('tracks')
        .del()
        .where('id', req.params.id);
    })
    .then(() => {
      delete track.id;

      res.send(track);
    });
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add tracks routes'
```

Merge the feature branch into the `master` branch.

```shell
git checkout master
git merge http_server
```

Now that it's merged, delete the feature branch.

```shell
git branch -d http_server
```
