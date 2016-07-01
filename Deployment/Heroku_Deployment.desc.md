## Objectives

- Explain what Heroku is.
- Explain why Heroku is important.
- Deploy a RESTful, database-driven HTTP server to Heroku.

## What's Heroku?

**Heroku** is a cloud platform that lets you deploy, monitor, and scale HTTP servers.

## Why is Heroku important?

Getting HTTP servers onto the Internet easily and being able to iterate on them quickly can make or break a product. Heroku focuses on providing an excellent developer experience around managing HTTP servers on a production environment. That way, developers can focus on writing server-side applications without having to build and maintain the production environment themselves.

## How do you deploy a RESTful, database-driven HTTP server to Heroku?

Change into the `trackify` project directory

``shell
cd trackify
```

Once your staging area is clean, create a feature branch.

```shell
git checkout -b heroku
```

Create a Heroku application.

```shell
heroku apps:create USERNAME-trackify
```

Take a look at some of the properties for your new Heroku application.

```shell
heroku apps:info
```

To see the version of Node.js on your development environment, run the following shell command.

```shell
node -v
```

To specify the version of Node.js on your production environment, add the following property to the `package.json` file.

```javascript
"engines": {
  "node": "DEV_VERSION"
}
```

To add the Heroku PostgreSQL add-on to your Heroku application, run the following shell command.

```shell
heroku addons:create heroku-postgresql
```

To inspect the properties of the Heroku PostgreSQL add-on, run the following shell command.

```shell
heroku pg:info
```

To specify the connection URL for production database server, add the following property to the `package.json` file.

```javascript
production: {
  client: 'pg',
  connection: process.env.DATABASE_URL
}
```

To tell Heroku to automatically migrate the production database, add the following property to the `package.json` file.

```javascript
"scripts": {
  "knex": "knex",
  "heroku-postbuild": "knex migrate:latest",
  "nodemon": "nodemon server.js"
}
```

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
