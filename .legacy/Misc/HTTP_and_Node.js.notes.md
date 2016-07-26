## THIS CONTENT HAS BEEN DEPRECATED, HERE IS THE NEW ONE : https://students.galvanize.com/curriculums/6/learning_experiences/129
## THE MASTER COPY LIVES HERE: https://github.com/gSchool/node-curriculum/blob/master/unit-1/03-http-and-node.md


## LE TODO

* Mention CORS in relation to a server rather than a browser.

## Slides

* [Danny](https://docs.google.com/presentation/d/1Tk79niqAcDWXNff5AUlafycYZHEtfQAHfaZ9jvy2UIw/edit?usp=sharing)
* [Roberto](https://docs.google.com/a/galvanize.com/presentation/d/1tjUGGp8QqTKQIlnPvmZNb1UnAxrW7vqK-Rrhoy9ijJk/edit?usp=sharing)

## Research


* [URL Parts](https://www.mattcutts.com/blog/seo-glossary-url-definitions/)
* [Web Sequence Diagrams](https://www.websequencediagrams.com/)
* [HTTP Status Codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)
* [Eloquent JS](http://eloquentjavascript.net/17_http.html)
* [How the web works](https://github.com/gSchool/g15/blob/master/curriculum/03-week/lessons/the-internet.md)
* [HTTP and Node.js](/redirects/learning_experiences/13)
* [`http` Node module](https://nodejs.org/api/http.html)
* [`url` Node module](https://nodejs.org/api/url.html)
* [Nodejitsu HTTP server](https://docs.nodejitsu.com/articles/HTTP/servers)
* [Common HTTP Status Codes](http://www.smartlabsoftware.com/ref/http-status-codes.htm)
* [HTTP Header Fields (don't install firebug, use chrome dev tolls)](http://www.tutorialspoint.com/http/http_header_fields.htm)
* [CORS Response Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#The_HTTP_response_headers)

## Questions

* What are some pieces that make up a URL?
* What are some more common HTTP status codes?
* What type of data is sent over the line with HTTP?
* Which Node module is used to use HTTP?
* What is a HTTP header?
* What is the Node module for parsing a URL string?

## Push Questions

* What are some common HTTP headers?
* How do you create a server with Node's http module?
* What is a static server?
* How would you serve a file in an HTTP response?
* What is the method on url to parse a URL string to an object?


## Exercises

### I Do

* [Web sequence diagram going to google](http://www.websequencediagrams.com/?lz=dGl0bGUgQXV0aGVudGljYXRpb24gU2VxdWVuY2UKClVzZXIgLT4gQnJvd3NlcjogZ29vZ2xlLmNvbQoADQcgLT4gRE5TIFNlcnYAEw8ADQoANw1JUCBhZGRyZXNzADgMRwBVBQA-CUdFVCBIVFRQIFJlcXVlc3QgCgAUDQCBCA0yMDAgT0sAgQkILT5VAIEmBVJlbmRlciBIVE1MAIE2ElNlYXJjaCAicHVwcGllcyIAax8vP3MALAU9ACkHAGwhAIE0CHNwb25zZQCCIAwAgQ4PVFAgQm9keQ&s=napkin)
* Create an HTTP server and listen for requests.
* Return "Hello World!".

### We Do

* Add to web diagram searching for puppies
* Create an HTTP server and listen for reqeusts.
* Serve a file when a request is made.

### You Do

* Web diagram one of their apps
* Create an HTTP server and listen for requests.
* Serve the file requested. (a static server)
* If there is a `from` and `to` parameter specified, replace all instances of `from` with `to` before sending it out.