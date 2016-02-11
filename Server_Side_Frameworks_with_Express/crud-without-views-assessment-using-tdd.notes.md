## Prerequisites

https://github.com/gSchool/knex-migrations-and-deployment
https://github.com/gSchool/express-postgres-crud-routes-exercise

## WHY

The point of this exercise is to remove the `views` segment of CRUD and help students reason through routes and CRUD queries without the comfort zone of views and their potentially "memorized" process to get through CRUD.

The exercise uses TDD to steer students in the right direction (redirects, returning expected object or array).

It also demostrates the use of `put` and `delete` to help students understand that the limitations of those requests is because of the client side (html forms cannot make delete or put requests)

The exercise expects students to use `knex` migrations.