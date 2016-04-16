Point users to a deployed instance of https://github.com/gSchool/galvanize-service-registry

Have them write 2 things:

- An express app that has a certain API (all apps must pass the same test suite - have identical API endpoints)
- An Angular / React front end app that interacts with this API

Then, have them register their service with the service registry using postman/curl.  Once that's done, have them change their Angular apps to first contact the service registry, which will return the url or urls they should use as the backend.

This simulates part of a real microservice architecture.

## Project Idea

Distributed memories.  Have each student build an app that asks three simple questions:

- "When I was a kid we used to..."
- "But now we..."

So their express apps would have 2 endpoints:

- POST /api/v1/memories
- GET /api/v1/memories

Optionally, the get could be paginated, and send back pagination information in the headers!!

The front ends could do things like:

- fan out a given POST request to all servers
- pick a random server

## Lesson flow

- Lecture on the project
- Lecture on REST concepts and auth
- Lecture on testing (supertest)
- Lecture on deployment w/ postgres
- Intro http://swagger.io/
- Intro http://jsonapi.org/


