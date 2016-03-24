## Objectives

* Describe what REST is.
* Explain why REST is important.
* Explain how REST works.
* Build a RESTful Express server.

## What is REST?

**Representational state transfer** (REST) is a way to structure client-server communication over HTTP. While the official definition of REST is quite formal, the basics of REST can be summarized with the following rules.

-  Clients are concerned with user interface.
-  Servers are concerned with data persistence.
-  Clients and servers communicate over a uniform HTTP interface.
-  Clients and servers think about data in terms of resources.
-  Clients send HTTP requests to create, read, update, and destroy resources.
-  Servers send HTTP responses to indicate the result of these operations.

## Why is REST so important?

REST is one way of structuring client-server HTTP communication. However, it's a very popular structure because it leads to a **separation of concerns** between clients and servers. Since the goals of clients and servers are well-defined, it's easy to develop and evolve clients and servers independently. In other words, you can easily:

1. Add and remove additional clients. (e.g. web and mobile)
1. Add and remove additional servers. (e.g. scale and replace)

## How does REST work?

Imagine you need to build a server that manages the persistence of guest resources.  
```js
var guests = [{ name: 'Teagan' }];
```

You're task is to build a RESTful server that handles the following routes.

| REST Action       | Request Method | Request URL | Request Body |
|-------------------|----------------|-------------|--------------|
| Read (all)        | `GET`          | `/guests`   | N/A          |
| Read (individual) | `GET`          | `/guests/0` | N/A          |
| Create            | `POST`         | `/guests`   | `Mary`       |
| Update            | `PUT`          | `/guests/0` | `Don`        |
| Delete            | `DELETE`       | `/guests/0` | N/A          |

| REST Action       | Guest Resources                      |
|-------------------|--------------------------------------|
| Read (all)        | `[{ name: 'Teagan' }]`               |
| Read (individual) | `[{ name: 'Teagan' }]`               |
| Create            | `[{ name: 'Teagan', name: 'Mary' }]` |
| Update            | `[{ name: 'Don', name: 'Mary' }]`    |
| Delete            | `[{ name: 'Mary' }]`                 |

| REST Action       | Response Status | Response Content-Type | Response Body          |
|-------------------|-----------------|-----------------------|------------------------|
| Read (all)        | `200`           | `application/json`    | `[{ name: 'Teagan' }]` |
| Read (individual) | `200`           | `application/json`    | `{ name: 'Teagan' }`   |
| Create            | `200`           | `application/json`    | `{ name: 'Mary' }`     |
| Update            | `200`           | `application/json`    | `{ name: 'Don' }`      |
| Delete            | `200`           | `application/json`    | `{ name: 'Don' }`      |

A **safe** REST action is one that doesn't modify a resource. Which REST actions from the above example are safe?

An **idempotent** REST action is one that will produce the same result no matter how many times it is repeated. Which REST actions from the above example are idempotent?

## How do you build a RESTful Express server?

```js
'use strict';

var express = require('express');
var app = express();

var guests = [{ name: 'Teagan' }];

app.disable('x-powered-by');
app.set('port', process.env.PORT || 5000);

var morgan = require('morgan');
app.use(morgan('short'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/guests', function(req, res) {
  res.send(guests);
});

app.get('/guests/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= guests.length) {
    return res.sendStatus(404);
  }

  res.send(guests[index]);
});

app.post('/guests', function(req, res) {
  var guest = req.body;

  if (!guest) {
    return res.sendStatus(400);
  }

  guests.push(guest);

  res.send(guest);
});

app.put('/guests/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= guests.length) {
    return res.sendStatus(404);
  }

  var guest = req.body;

  if (!guest) {
    return res.sendStatus(400);
  }

  guests[index] = guest;

  res.send(guest);
});

app.delete('/guests/:index', function(req, res) {
  var index = Number.parseInt(req.params.index);

  if (Number.isNaN(index) || index < 0 || index >= guests.length) {
    return res.sendStatus(404);
  }

  var guest = guests.splice(id, 1)[0];

  res.send(guest);
});

app.listen(app.get('port'), function() {
  console.log('Listening on', app.get('port'));
});
```

```shell
nodemon server.js
```

```shell
http GET localhost:5000/guests
```

```shell
http GET localhost:5000/guests/0
http GET localhost:5000/guests/1
http GET localhost:5000/guests/2
```

```shell
http POST localhost:5000/guests Mary
http GET localhost:5000/guests/2
```

```shell
http PUT localhost:5000/guests "Mary Anne"
http GET localhost:5000/guests/2
```

```shell
http DELETE localhost:5000/guests/2
http GET localhost:5000/guests/2
```

## Assignment

[Pet Shop - RESTful Express HTTP Server](https://github.com/gSchool/fs-pet-shop/blob/master/4_rest.md)

## Resources

- [Express 4.x - API Reference: Request](http://expressjs.com/en/4x/api.html#req)
- [Express 4.x - API Reference: Response](http://expressjs.com/en/4x/api.html#res)
