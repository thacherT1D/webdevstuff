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

      knex('artists')
        .update(artist, '*')
        .where('id', id)
        .then((results) => {
          res.send(results[0]);
        })
        .catch((err) => {
          next(err);
        });
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

router.get('/artists/:id/books', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next();
  }

  knex('books')
    .where('artist_id', id)
    .then((books) => {
      res.send(books));
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
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
