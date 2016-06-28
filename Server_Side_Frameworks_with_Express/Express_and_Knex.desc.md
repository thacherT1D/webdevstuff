## Objectives

- Use Express and Knex to build a database-driven, HTTP server

## How do you use Express and Knex to build a database-driven, HTTP server?

Here's a sequence diagram of the database-driven, HTTP server you're going to build today.

```text
┌─── HTTPie ──┐    JSON       ┌── Node.js ──┐    SQL        ┌── postgres ─┐               ╔════════════ cluster ═══════════╗
│             │─── request ──▶│             │─── request ──▶│             │──── write ───▶║                                ║
│             │               │             │               │             │               ║  ┏━━━━━━━━ database ━━━━━━━━┓  ║
│             │               │   Express   │               │             │               ║  ┃                          ┃  ║
│             │               │   Knex      │               │             │               ║  ┃  ┌──────┬ table ┬─────┐  ┃  ║
│             │    JSON       │             │    Row(s)     │             │               ║  ┃  ├──────┼───────┼─────┤  ┃  ║
│             │◀── response ──│             │◀── response ──│             │◀─── read ─────║  ┃  ├──────┼───────┼─────┤  ┃  ║
└─────────────┘               └─────────────┘               └─────────────┘               ║  ┃  ├──────┼───────┼─────┤  ┃  ║
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
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('artists')
    .where('id', id)
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
  const newAuthor = req.body;

  if (!newAuthor.name || newAuthor.name.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('first_name must not be blank');
  }

  knex('artists')
    .insert(artist, '*')
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/artists/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('artists')
    .where('id', id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }

      const newAuthor = req.body;

      if (!newAuthor.name || newAuthor.name.trim() === '') {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('first_name must not be blank');
      }

      return knex('artists')
        .update(artist, '*')
        .where('id', id)
        .then((results) => {
          res.send(results[0]);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/artists/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('artists')
    .where('id', id)
    .first()
    .then((artist) => {
      if (!artist) {
        return next();
      }

      return knex('artist')
        .del()
        .where('id', id)
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
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('tracks')
    .where('artist_id', id)
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
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('tracks')
    .where('id', id)
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
  const newTrack = Object.assign({}, req.body);

  if (!newTrack.title || newTrack.title.trim() === '') {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('title must not be blank');
  }

  newTrack.likes = Number.parseInt(newTrack.likes);

  if (Number.isNaN(newTrack.likes)) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('likes must be an integer');
  }

  newTrack.artist_id = Number.parseInt(newTrack.artist_id);

  if (Number.isNaN(newTrack.artist_id)) {
    return res
      .status(400)
      .set('Content-Type', 'text/plain')
      .send('artist_id must be an integer');
  }

  knex('artists')
    .where('id', newTrack.artist_id)
    .first()
    .then((artist) => {
      if (!artist) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('artist_id does not exist');
      }

      return knex('tracks')
        .insert(newTrack, '*')
        .then((results) => {
          res.send(results[0]);
        });
    })
    .catch((err) => {
      next(err);
    });
});

router.put('/tracks/:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('tracks')
    .where('id', id)
    .first()
    .then((track) => {
      if (!track) {
        return next();
      }

      const newTrack = Object.assign({}, req.body);

      if (!newTrack.title || newTrack.title.trim() === '') {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('title must not be blank');
      }

      newTrack.likes = Number.parseInt(newTrack.likes);

      if (Number.isNaN(newTrack.likes)) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('likes must be an integer');
      }

      newTrack.artist_id = Number.parseInt(newTrack.artist_id);

      if (Number.isNaN(artist_id)) {
        return res
          .status(400)
          .set('Content-Type', 'text/plain')
          .send('artist_id must be an integer');
      }

      return knex('artists')
        .where('id', newTrack.artist_id)
        .first()
        .then((artist) => {
          if (!artist) {
            return res
              .status(400)
              .set('Content-Type', 'text/plain')
              .send('artist_id does not exist');
          }

          return knex('tracks')
            .update(newTrack, '*')
            .where('id', id)
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
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('tracks')
    .where('id', id)
    .first()
    .then((track) => {
      if (!track) {
        return next();
      }

      return knex('tracks')
        .del()
        .where('id', id)
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

Push the local `master` branch to Heroku's `master` branch.

```shell
git push heroku master
```
