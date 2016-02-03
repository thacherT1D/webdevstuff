## What is REST?

REpresentational State Transfer
Set of constraints for distributed hypermedia systems.
Roy Fielding 2000

#### Constraints

Client-Server - A uniform interface separates clients from servers.
Stateless - no client context being stored on the server between requests.
Cacheable - clients and intermediaries can cache responses.
Layered System - A client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way.
Uniform Interface - Identification of resources, Manipulation of resources, Self-descriptive messages, and Hypermedia as the engine of application state.

To the extent that systems conform to the constraints of REST they can be called RESTful. RESTful services typically communicate over HTTP requests to server web pages.

## What are the HTTP verbs commonly used in RESTful services?

GET     200     Read - page to render
POST    201     Create - link to created resource
PUT     201     Update - link to updated resource
DELETE  204     Delete - removes resource

What HTTP methods are supported by the browser?

HTML forms are limited by POST and GET. Currently no other method is supported. All other methods can be made client-side with JavaScript XMLHttpRequests.

What are the RESTful routes of CRUD?

7 standard RESTful Api routes:

* Create
    * GET - new page
    * POST - create new resource
* Read
    * GET - show individual page
    * GET - show all page
* Update
    * GET - edit page
    * PUT - edit request
* Delete
    * DELETE - removes resource

Paths:

GET ‘/’ - shows all resources
GET ‘/new’ - shows new create new resource page
POST ‘/new’ - creates individual
GET ‘/:id’ - shows individual resource
GET ‘/:id/edit’ - shows edit page of individual resource
PUT  ‘/:id’ - updates individual resource
DELETE ‘/:id’ - removes resource

How do you create a PUT route in Express?

app.get('/', function(req, res){
  res.render('index', { title: 'Hey', message: 'Bye World'})
});

app.put('/:id', function (req, res) {
  db('posts').update({ title: req.params.id })
});


What are idempotent methods?

Idempotent - 
A HTTP method that can be called many times without different outcomes.
Safe - 
A HTTP methods that do not modify resources

##Common Practices

An API is a developer's UI - just like any UI, it's important to ensure the user's experience is thought out carefully. Make HTTP requests to be meaningful.

## Exercise

[git Repo](https://github.com/gSchool/RESTful-exercise)



