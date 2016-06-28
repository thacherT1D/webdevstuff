## Objectives

- Explain what a RESTful, database-driven HTTP server is.
- Explain why a RESTful, database-driven HTTP server is useful.
- Use Express and Knex to build a RESTful, database-driven HTTP server.
- Deploy a RESTful, database-driven HTTP server to Heroku.

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

For example, imagine a RESTful, database-driven HTTP server manages the persistence of the following rows in the `artists` table.

```text
 id |    name     |          created_at           |          updated_at
----+-------------+-------------------------------+-------------------------------
  1 | The Beatles | 2016-06-27 15:34:24.638326-07 | 2016-06-27 15:34:24.638326-07
(1 row)
```

A RESTful server would handle the following HTTP requests by mapping them to a specific REST action.

| REST Action       | Request Method | Request URL  | Request Body         |
|-------------------|----------------|--------------|----------------------|
| Read (all)        | `GET`          | `/artists`   | N/A                  |
| Read (individual) | `GET`          | `/artists/1` | N/A                  |
| Create            | `POST`         | `/artists`   | `{ name": "Prince", "created_at": "2016-06-28T22:34:24.638Z", "updated_at": "2016-06-28T22:34:24.638Z" }` |
| Update            | `PATCH`        | `/artists/2` | `{ name": "⚥" }`     |
| Destroy           | `DELETE`       | `/artists/2` | N/A                  |

Once the operation is complete, the RESTful server would send a specific HTTP response back to the client indicating the result of the operation.

| REST Action       | Response Status | Response Content-Type | Response Body |
|-------------------|-----------------|-----------------------|---------------|
| Read (all)        | `200`           | `application/json`    | `[{ id: "1", name": "The Beatles", "created_at": "2016-06-27T22:34:24.638Z", "updated_at": "2016-06-27T22:34:24.638Z" }]` |
| Read (individual) | `200`           | `application/json`    | `{ id: "1", name": "The Beatles", "created_at": "2016-06-27T22:34:24.638Z", "updated_at": "2016-06-27T22:34:24.638Z" }`   |
| Create            | `200`           | `application/json`    | `{ id: "2", name": "Prince", "created_at": "2016-06-28T22:34:24.638Z", "updated_at": "2016-06-28T22:34:24.638Z" }`        |
| Update            | `200`           | `application/json`    | `{ id: "2", name": "⚥", "created_at": "2016-06-28T22:34:24.638Z", "updated_at": "2016-06-28T22:34:24.638Z" }`             |
| Destroy           | `200`           | `application/json`    | `{ name": "⚥", "created_at": "2016-06-28T22:34:24.638Z", "updated_at": "2016-06-28T22:34:24.638Z" }`                      |

### Exercise

Take a few moments to diagram how a RESTful, database-driven HTTP server works.

Once you've satisfied, turn to a neighbor and explain how information flows throw the system.

## Why is a RESTful, database-driven HTTP server is useful?


## How do you use Express and Knex to build a RESTful, database-driven HTTP server?

Here's an entity relationship diagram representing the data model the HTTP server will need to manage.

```text
┌───────────────────────────────────────────────────────────────┐
│                            artists                            │
├─────────────┬─────────────────────────┬───────────────────────┤
│id           │serial                   │primary key            │
│name         │varchar(255)             │not null default ''    │
│created_at   │timestamp with time zone │not null default now() │
│updated_at   │timestamp with time zone │not null default now() │
└─────────────┴─────────────────────────┴───────────────────────┘
                                ┼
                                │
                                ○
                               ╱│╲
┌──────────────────────────────────────────────────────────────────────────────────────────┐
│                                          tracks                                          │
├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
│id           │serial                   │primary key                                       │
│artist_id    │integer                  │not null references authors(id) on delete cascade │
│title        │varchar(255)             │not null default ''                               │
│likes        │integer                  │not null default 0                                │
│created_at   │timestamp with time zone │not null default now()                            │
│updated_at   │timestamp with time zone │not null default now()                            │
└─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
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
const path = require('path');
const port = process.env.PORT || 8000;

const morgan = require('morgan');
const bodyParser = require('body-parser');

const artists = require('./routes/artists');
const tracks = require('./routes/tracks');

const app = express();

app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());

app.use(express.static(path.join('public')));

app.use(artists);
app.use(tracks);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
```

In both the `routes/artists.js` and `routes/tracks.js` files, type out the following code.

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
  "heroku-postbuild": "knex migrate:latest",
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

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/artists', (_req, res, next) => {
  knex('artists')
    .then((artists) => {
      res.send(artists);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/artists/:id', (req, res, next) => {
    knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }

      res.send(artist);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/artists', (req, res, next) => {
  knex('artists')
    .insert(req.body, '*')
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/artists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }

      return knex('artists')
        .update(req.body, '*')
        .where('id', req.params.id)
        .then((results) => {
          res.send(results[0]);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/artists/:id', (req, res, next) => {
  knex('artists')
    .where('id', req.params.id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }

      return knex('artist')
        .del()
        .where('id', req.params.id)
        .then(() => {
          delete artist.id;
          res.send(artist);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/artists/:id/tracks', (req, res, next) => {
  knex('tracks')
    .where('artist_id', req.params.id)
    .then((track) => {
      res.send(track);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Route /artists'
```

In a `routes/tracks.js` file, type the following code.

```javascript
'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/tracks', (_req, res, next) => {
  knex('tracks')
    .then((tracks) => {
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
    .then((track) => {
      if (!track) {
        return next();
      }

      res.send(track);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/tracks', (req, res, next) => {
  knex('artists')
    .where('id', req.body.artist_id)
    .first()
    .then((artist) => {
      if (!artist) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('artist_id does not exist');
      }

      return knex('tracks')
        .insert(req.body, '*')
        .then((results) => {
          res.send(results[0]);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/tracks/:id', (req, res, next) => {
  knex('tracks')
    .where('id', req.params.id)
    .first()
    .then((track) => {
      if (!track) {
        return next();
      }

      return knex('artists')
        .where('id', req.body.artist_id)
        .first()
        .then((artist) => {
          if (!artist) {
            return res
              .status(400)
              .set('Content-Type', 'text/plain')
              .send('artist_id does not exist');
          }

          return knex('tracks')
            .update(req.body, '*')
            .where('id', req.params.id)
            .then((results) => {
              res.send(results[0]);
            });
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/tracks/:id', (req, res, next) => {
  knex('tracks')
    .where('id', req.params.id)
    .first()
    .then((track) => {
      if (!track) {
        return next();
      }

      return knex('tracks')
        .del()
        .where('id', req.params.id)
        .then(() => {
          delete track.id;
          res.send(track);
        });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Route /tracks'
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

## How do you deploy a RESTful, database-driven HTTP server to Heroku?

To get started, checkout a new feature branch.

```shell
git checkout -b heroku
```

Then, install `foreman` as a local development dependency, saving it to the `package.json` file.

```shell
npm install --save-dev foreman
```

Create a `Procfile` for `foreman`.

```shell
echo 'web: node server.js' > Procfile
```

Add an `nf` script to the `package.json` file.

```javascript
"scripts": {
  "knex": "knex",
  "heroku-postbuild": "knex migrate:latest",
  "nf": "nf start",
  "nodemon": "nodemon server.js"
},
```

Then, start the server with `foreman`.

```shell
npm run nf
```

Add and commit the changes to your repository.

```shell
git add .
git commit -m 'Prepare the Heroku'
```

Merge the feature branch into the `master` branch.

```shell
git checkout master
git merge heroku
```

Now that it's merged, delete the feature branch.

```shell
git branch -d heroku
```

Push the local `master` branch to Heroku's `master` branch.

```shell
git push heroku master
```
