## Objectives

- Explain what a RESTful, database-driven, HTTP server is.
- Explain why a RESTful, database-driven, HTTP server is useful.
- Use Express and Knex to build a RESTful, database-driven, HTTP server.

## What's a RESTful, database-driven, HTTP server?

A **RESTful, database-driven, HTTP server** is exactly what it sounds. It's a server that communicates with a client using a RESTful HTTP and is responsible for managing information that's persisted in a database.

Here's a sequence diagram of the RESTful, database-driven, HTTP server.

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

To give you a concrete example, imagine a RESTful, database-driven, HTTP server that manages the information in `tracks` database table.

```text
 id |       title        |   artist    
----+--------------------+-------------
  1 | Here Comes the Sun | The Beatles
```

A RESTful HTTP server handles the following requests by mapping them to a specific REST action.

| REST Action       | Request Method | Request URL | Request Content-Type  | Request Body                                   |
|-------------------|----------------|-------------|-----------------------|------------------------------------------------|
| Read (all)        | `GET`          | `/tracks`   | N/A                   | N/A                                            |
| Read (individual) | `GET`          | `/tracks/1` | N/A                   | N/A                                            |
| Create            | `POST`         | `/tracks`   | `application/json`    | `{ "title": "Purple Rain", "name": "Prince" }` |
| Update            | `PATCH`        | `/tracks/1` | `application/json`    | `{ "title": "Yesterday" }`                     |
| Destroy           | `DELETE`       | `/tracks/1` | N/A                   | N/A                                            |

Once the operation is complete, the RESTful HTTP server sends a specific response back to the client indicating the result of a database operation.

| REST Action       | Response Status | Response Content-Type | Response Body                                                           |
|-------------------|-----------------|-----------------------|-------------------------------------------------------------------------|
| Read (all)        | `200`           | `application/json`    | `[{ id: "1", "title": "Here Comes the Sun", "artist": "The Beatles" }]` |
| Read (individual) | `200`           | `application/json`    | `{ id: "1", "title": "Here Comes the Sun", "artist": "The Beatles" }`   |
| Create            | `200`           | `application/json`    | `{ id: "2", "title": "Purple Rain", "name": "Prince" }`                 |
| Update            | `200`           | `application/json`    | `{ id: "1", "title": "Yesterday", "artist": "The Beatles" }`            |
| Destroy           | `200`           | `application/json`    | `{ "title": "Yesterday", "artist": "The Beatles" }`                     |

### Exercise

Take a few moments to diagram how a RESTful, database-driven, HTTP server works.

Once you've satisfied, turn to a neighbor and explain how information flows throw the system.

## Why is a RESTful, database-driven, HTTP server is useful?

- separation of concerns
- follows the principle of least surprise
- great way to organize data, relationships, processes
- process are independently scalable and replaceable

## How do you use Express and Knex to build a RESTful, database-driven, HTTP server?

In a moment, you'll create a RESTful, database-driven, HTTP server to manage information in a data model represented by the following entity relationship diagram.

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

To get started, navigate to the `trackify` project directory.

```shell
cd path/to/trackify
```

And checkout a new feature branch.

```shell
git checkout -b server
```

Then, install the following dependencies while saving them to the `package.json` file.

```shell
npm install --save express body-parser morgan
```

Create a `server.js` file and type the following code.

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

Create a `routes/tracks.js` file and type the following code.

```javascript
'use strict';

const express = require('express');

const router = express.Router();

module.exports = router;
```

Then, install `nodemon` as a development dependency while saving it to the `package.json` file.

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

Then, start the Express server with `nodemon`.

```shell
npm run nodemon
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add an Express server'
```

### Read (all)

Now that the Express server is scaffolded, let's add middleware to handle reading all the rows from the `tracks` table.

Create a `knex.js` file and type the following code.

```javascript
'use strict';

const environment = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
```

Then, install `humps` as a dependency while saving it to the `package.json` file.

```shell
npm install --save humps
```

Back in the `routes/artists.js` file, add the following code.

**NOTE:** Remember to require the `knex` and `humps` dependencies. Be sure to store the `camelizeKeys` function from `humps` in a local variable.

```javascript
'use strict';

const express = require('express');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

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

module.exports = router;
```

Run the following command.

```shell
http GET localhost:8000/tracks
```

And you should see the following.

```text
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add GET /tracks middleware'
```

### Read (individual)

Next, let's add middleware to handle reading an individual row from the `tracks` table.

Start by installing `boom` as a dependency while saving it to the `package.json` file.

```shell
npm install --save boom
```

Back in the `routes/artists.js` file, add the following code.

**NOTE:** Remember to require the `boom` dependency.

```javascript
'use strict';

const boom = require('boom');
const express = require('express');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

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

module.exports = router;
```

Run the following command.

```shell
http GET localhost:8000/tracks/1
```

And you should see the following.

```text
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add GET /tracks/:id middleware'
```

### Create

Next, let's add middleware to handle creating a row in the `tracks` table.

Back in the `routes/artists.js` file, add the following code.

**NOTE:** Remember to store the `decamelizeKeys` function from `humps` in a local variable.

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

module.exports = router;
```

Run the following command.

```shell
http POST localhost:8000/tracks title='Purple Rain' artist=Prince
```

And you should see the following.

```text
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add POST /tracks middleware'
```

### Update

Next, let's add middleware to handle updating a row in the `tracks` table.

Back in the `routes/artists.js` file, add the following code.

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

module.exports = router;
```

Run the following command.

```shell
http PATCH localhost:8000/tracks/1 title='Yesterday'
```

And you should see the following.

```text
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add PATCH /tracks/:id middleware'
```

### Destroy

Next, let's add middleware to handle destroying a row from the `tracks` table.

Back in the `routes/artists.js` file, add the following code.

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

Run the following command.

```shell
http DELETE localhost:8000/tracks/1
```

And you should see the following.

```text
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Add DELETE /tracks/:id middleware'
```

Merge the feature branch into the `master` branch.

```shell
git checkout master
git merge server
```

Now that it's merged, delete the feature branch.

```shell
git branch -d server
```

## Assignment

- [Galvanize Bookshelf](https://github.com/gSchool/galvanize-bookshelf#galvanize-bookshelf)
- [Galvanize Bookshelf - Express and Knex](https://github.com/gSchool/galvanize-bookshelf/blob/master/2_express_knex.md)

## Resources

- [NPM - boom](https://www.npmjs.com/package/boom)
- [NPM - humps](https://www.npmjs.com/package/humps)
