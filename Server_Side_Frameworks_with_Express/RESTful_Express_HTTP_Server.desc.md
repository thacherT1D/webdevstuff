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

## Why is REST so important?

REST is one way of structuring client-server HTTP communication. However, it's a very popular structure because it leads to a **separation of concerns** between clients and servers. Since the goals of clients and servers are well-defined, it's easy to develop and evolve clients and servers independently. In other words, you can easily:

1. Add and remove additional clients. (e.g. web and mobile)
1. Add and remove additional servers. (e.g. scale and replace)

## How does REST work?

Imagine a RESTful HTTP server manages the persistence of the following guest resources.

```javascript
var guests = ['Mary'];
```

The server handles the following RESTful actions by mapping them to specific HTTP requests. In other words, each RESTful action performs a unique operation on the guest resources.

| REST Action       | Request Method | Request URL | Request Body |
|-------------------|----------------|-------------|--------------|
| Read (all)        | `GET`          | `/guests`   | N/A          |
| Read (individual) | `GET`          | `/guests/0` | N/A          |
| Create            | `POST`         | `/guests`   | `name=Don`   |
| Update            | `PUT`          | `/guests/0` | `name=Kate`  |
| Destroy           | `DELETE`       | `/guests/0` | N/A          |

If the above RESTful actions are performed sequentially, the guest resources will look like this after each operation.

| REST Action       | Guest Resources   |
|-------------------|-------------------|
| Read (all)        | `['Mary']`        |
| Read (individual) | `['Mary']`        |
| Create            | `['Mary', 'Don']` |
| Update            | `['Kate', 'Don']` |
| Destroy           | `['Don']`         |

Once the RESTful action is complete, the server sends a specific HTTP response back to the client indicating the result of the operation.

| REST Action       | Response Status | Response Content-Type | Response Body |
|-------------------|-----------------|-----------------------|---------------|
| Read (all)        | `200`           | `application/json`    | `['Mary']`    |
| Read (individual) | `200`           | `application/json`    | `'Mary'`      |
| Create            | `200`           | `application/json`    | `'Don'`       |
| Update            | `200`           | `application/json`    | `'Kate'`      |
| Destroy           | `200`           | `application/json`    | `'Kate'`      |

A **safe** REST action is one that doesn't modify any resources. Which REST actions from the above example are safe?

## How do you build a RESTful Express server?

Building on the guest list Express server, refactor your `serverExpress.js` file to include the following RESTful middleware.

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

    const newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, (writeErr) => {
      if (writeErr) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

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

    var guest = guests.splice(index, 1)[0];
    var newGuestsJSON = JSON.stringify(guests);

    fs.writeFile(guestsPath, newGuestsJSON, (writeErr) => {
      if (writeErr) {
        console.error(err.stack);
        return res.sendStatus(500);
      }

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

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 17
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:44:19 GMT
ETag: W/"11-0KyDlj1psIN3xnEMJsjMJg"

"Mary"
```

Send an HTTP request to create an individual guest resource.

```shell
http POST localhost:8000/guests name=Don
```

And you should see something like this.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:45:05 GMT
ETag: W/"f-pPOBaT8aXBbirJ2irXvIdg"

"Don"
```

Send another HTTP request to read an individual guest resource.

```shell
http GET localhost:8000/guests/1
```

And you should see something like this.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 15
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:45:44 GMT
ETag: W/"f-pPOBaT8aXBbirJ2irXvIdg"

"Don"
```

Send an HTTP request to read all the guest resources.

```shell
http GET localhost:8000/guests
```

And you should see something like this.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 35
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:46:18 GMT
ETag: W/"23-bh9WCahnDHTY1E+InF4FTA"

[
    "Mary",
    "Don"
]
```

Send an HTTP request to update an individual guest resource.

```shell
http PUT localhost:8000/guests/0 name=Kate
```

And you should see something like this.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 14
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:47:36 GMT
ETag: W/"e-GMWKG7r0SW1dvTJlsqKZRA"

"Kate"
```

Send an HTTP request to update an individual guest resource.

```shell
http GET localhost:8000/guests/0
```

And you should see something like this.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 14
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:48:25 GMT
ETag: W/"e-GMWKG7r0SW1dvTJlsqKZRA"

"Kate"
```

Send an HTTP request to destroy an individual guest resource.

```shell
http DELETE localhost:8000/guests/0
```

And you should see something like this.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 14
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:50:27 GMT
ETag: W/"e-GMWKG7r0SW1dvTJlsqKZRA"

"Kate"
```

Send an HTTP request to read all the guest resources.

```
http GET localhost:8000/guests
```

And you should see something like this.

```
HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 17
Content-Type: application/json; charset=utf-8
Date: Thu, 24 Mar 2016 15:51:08 GMT
ETag: W/"11-EtwezO7FYAMu6cFoRdMVCA"

[
    "Don"
]
```

## Assignment

[Pet Shop - RESTful Express HTTP Server](https://github.com/gSchool/fs-pet-shop/blob/master/4_rest.md)

## Resources

- [Express 4.x - API Reference: Request](http://expressjs.com/en/4x/api.html#req)
- [Express 4.x - API Reference: Response](http://expressjs.com/en/4x/api.html#res)
