## Objectives

- Describe what REST is.
- Explain why REST is important.
- Explain how REST works.
- Create a RESTful Express server.

## What's REST?

**Representational state transfer** (REST) is a way to structure client-server communication over HTTP. While the official definition of REST is quite formal, the basics of REST can be summarized with the following rules.

-  Clients are concerned with user interface.
-  Servers are concerned with data persistence.
-  Clients and servers communicate over a well-defined HTTP contract.
-  Clients and servers think about data in terms of resources.
-  Clients send HTTP requests to create, read, update, and destroy resources.
-  Servers send HTTP responses to indicate the result of these operations.

For example, imagine a RESTful HTTP server manages the persistence of the following guest resources.

```javascript
var guests = ['Mary'];
```

A RESTful server would handle the following HTTP requests by mapping them to a specific REST action.

| REST Action       | Request Method | Request URL | Request Body |
|-------------------|----------------|-------------|--------------|
| Read (all)        | `GET`          | `/guests`   | N/A          |
| Read (individual) | `GET`          | `/guests/0` | N/A          |
| Create            | `POST`         | `/guests`   | `name=Don`   |
| Update            | `PUT`          | `/guests/0` | `name=Kate`  |
| Destroy           | `DELETE`       | `/guests/0` | N/A          |

Each REST action performs a unique operation. If the above RESTful actions were performed sequentially, the operations would leave the guest resources looking like this.

| REST Action       | Guest Resources   |
|-------------------|-------------------|
| Read (all)        | `['Mary']`        |
| Read (individual) | `['Mary']`        |
| Create            | `['Mary', 'Don']` |
| Update            | `['Kate', 'Don']` |
| Destroy           | `['Don']`         |

Once the operation is complete, the RESTful server would send a specific HTTP response back to the client indicating the result of the operation.

| REST Action       | Response Status | Response Content-Type | Response Body |
|-------------------|-----------------|-----------------------|---------------|
| Read (all)        | `200`           | `application/json`    | `['Mary']`    |
| Read (individual) | `200`           | `application/json`    | `'Mary'`      |
| Create            | `200`           | `application/json`    | `'Don'`       |
| Update            | `200`           | `application/json`    | `'Kate'`      |
| Destroy           | `200`           | `application/json`    | `'Kate'`      |

### Exercise

A **safe** REST action is one that doesn't modify any resources. Turn to a partner and see you can determine which REST actions from the above example are safe. Afterwards, explain what REST is to your partner in your own words.

## Why is REST so important?

REST is one way of structuring client-server HTTP communication. However, it's a very popular structure because it leads to a **separation of concerns** between clients and servers. Since the goals of clients and servers are well-defined, it's easy to develop and evolve clients and servers independently. In other words, you can easily add and remove RESTful clients or servers.

### Exercise

Think about what scenarios would cause you to add or remove a RESTful client or server. After ten seconds, I'll cold call on a few of you for an answer.

## How do you build a RESTful Express server?

Thinking back to the guest list Express server from yesterday, you've already incorporated the read (all), read (individual), and create REST actions for the guest resources. To complete the RESTful Express server, all you need to add is the remaining update and delete REST actions.

To get started, return to the `party` project from yesterday and create a new `rest` feature branch.

```shell
cd party
git checkout -b rest
```

Next, open the `party` project in your text editor.

```shell
atom .
```

And add the following update REST action to the `serverExpress.js` file.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, newGuestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(newGuestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

app.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.put('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests[id] = guest;

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Now, save the `serverExpress.js` file and add the following data to the `guests.json` file.

```shell
echo '["Mary"]' > guests.json
```

And start your Express server.

```shell
nodemon server.js
```

And you should see something like this.

![](https://i.imgur.com/sd4WnE5.png)

And in a separate Terminal tab, send an HTTP request to your server to read all the guest resources.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/vcxcJ7J.png)

Send another HTTP request to read an individual guest resource.

```shell
http GET localhost:8000/guests/0
```

And you should see something like this.

![](https://i.imgur.com/lbndUXb.png)

Send an HTTP request to create a guest resource.

```shell
http POST localhost:8000/guests name=Don
```

And you should see something like this.

![](https://i.imgur.com/JMiKx6b.png)

Send another HTTP request to read an individual guest resource.

```shell
http GET localhost:8000/guests/1
```

And you should see something like this.

![](https://i.imgur.com/AYat0rB.png)

Send an HTTP request to read all the guest resources.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/naVKros.png)

Send an HTTP request to update a guest resource.

```shell
http PUT localhost:8000/guests/0 name=Kate
```

And you should see something like this.

![](https://i.imgur.com/T7WeKdo.png)

Send an HTTP request to read an individual guest resource.

```shell
http GET localhost:8000/guests/0
```

And you should see something like this.

![](https://i.imgur.com/GFK6Zvv.png)

Next, add and commit the latest changes to the `party` project's `rest` branch.

```shell
git add .
git commit -m 'Add update REST action'
```

Now, add the following delete REST action to the `serverExpress.js` file.

```javascript
'use strict';

var fs = require('fs');
var path = require('path');
var guestsPath = path.join(__dirname, 'guests.json');

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

var morgan = require('morgan');
var bodyParser = require('body-parser');

app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, guestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);

    res.send(guests);
  });
});

app.get('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(err, newGuestsJSON) {
    if (err) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(newGuestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'text/plain');
    res.send(guests[id]);
  });
});

app.post('/guests', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var guests = JSON.parse(guestsJSON);
    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests.push(guest);

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(writeErr.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.put('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id)) {
      return res.sendStatus(404);
    }

    var guest = req.body.name;

    if (!guest) {
      return res.sendStatus(400);
    }

    guests[id] = guest;

    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.delete('/guests/:id', function(req, res) {
  fs.readFile(guestsPath, 'utf8', function(readErr, guestsJSON) {
    if (readErr) {
      console.error(err.stack);
      return res.sendStatus(500);
    }

    var id = Number.parseInt(req.params.id);
    var guests = JSON.parse(guestsJSON);

    if (id < 0 || id >= guests.length || Number.isNaN(id) ) {
      return res.sendStatus(404);
    }

    var guest = guests.splice(id, 1)[0];
    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, function(writeErr) {
      if (writeErr) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

      res.set('Content-Type', 'text/plain');
      res.send(guest);
    });
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
```

Send an HTTP request to destroy a guest resource.

```shell
http DELETE localhost:8000/guests/0
```

And you should see something like this.

![](https://i.imgur.com/7bxUHqT.png)

Send an HTTP request to read all the guest resources.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

![](https://i.imgur.com/TJCRysx.png)

Next, add and commit the latest changes to the `party` project's `rest` branch.

```shell
git add .
git commit -m 'Add delete REST action'
```

Finally, merge the commits from the `rest` branch to the `master` branch, run the following commands.

```shell
git checkout master
git merge rest
```

With the commits merged in, it's safe to delete the `rest` branch.

```shell
git br -d rest
```

To deploy the RESTful Express server to Heroku, update the `Procfile` so it runs the correct server.

```shell
web: node serverExpress.js
```

Next, add and commit the latest changes to the `party` project's `master` branch.

```shell
git add .
git commit -m 'Switch Procfile to serverExpress.js'
```

Now, deploy your project by pushing your local `master` branch to Heroku's `master` branch.

```shell
git push heroku master
```

Finally, you can send a RESTful HTTP requests to the server running on the production environment.

**NOTE:** Replace `USERNAME` with your GitHub username.

```shell
http GET USERNAME-party.herokuapp.com/guests
```

```shell
http GET USERNAME-party.herokuapp.com/guests/0
```

```shell
http POST USERNAME-party.herokuapp.com/guests name=Don
```

```shell
http PUT USERNAME-party.herokuapp.com/guests/0 name=Kate
```

```shell
http DELETE USERNAME-party.herokuapp.com/guests/0
```

## Assignment

[Pet Shop - RESTful Express HTTP Server](https://github.com/gSchool/fs-pet-shop/blob/master/4_rest.md)

## Resources

- [Express 4.x - API Reference: Request](http://expressjs.com/en/4x/api.html#req)
- [Express 4.x - API Reference: Response](http://expressjs.com/en/4x/api.html#res)
