## Objectives

- Explain what Heroku is.
- Explainy why Heroku is important.
- Migrate and seed a PostgreSQL database on Heroku.
- Deploy a RESTful, database-driven HTTP server to Heroku.

## What's Heroku?

Heroku is a cloud platform that lets you deploy, monitor, and scale HTTP servers. Getting HTTP servers onto the Internet easily and being able to iterate on them quickly can make or break a product. Heroku focuses on providing an excellent developer experience around managing HTTP servers on a production environment. That way, developers can focus on writing server-side applications without having to build and maintain the production environment themselves.

## Why is Heroku important?

## How do you migrate and seed a PostgreSQL database on Heroku.

To get started, create a new heroku feature branch.

```shell
git checkout -b heroku
```

```shell
heroku apps:create USERNAME-trackify
```

```shell
heroku apps:info
```

```shell
node -v
```

```javascript
"engines": {
  "node": "DEV_VERSION"
}
```

```shell
heroku addons:create heroku-postgresql
```

```shell
heroku pg:info
```

```javascript
'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/trackify_dev'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
```

```javascript
"scripts": {
  "knex": "knex",
  "heroku-postbuild": "knex migrate:latest"
}
```

```shell
git add .
git commit -m 'Prepare for Heroku'
```

```shell
git push heroku master
```

```shell
heroku apps:info
```

```shell
heroku pg:info
```

```shell
heroku run npm run knex seed:run
```

```shell
heroku pg:info
```

```shell
heroku pg:psql
```

## How do you deploy a RESTful, database-driven HTTP server to Heroku?

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
