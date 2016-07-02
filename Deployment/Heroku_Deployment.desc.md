## Objectives

- Explain what Heroku is.
- Explain why Heroku is important.
- Deploy a RESTful, database-driven HTTP server to Heroku.

## What's Heroku?

**Heroku** is a cloud platform that lets you deploy, monitor, and scale HTTP servers.

[Login](https://dashboard.heroku.com/apps) to your Heroku account.

## Why is Heroku important?

Getting HTTP servers onto the Internet easily and being able to iterate on them quickly can make or break a product. Heroku focuses on providing an excellent developer experience around managing servers on a production environment. That way, developers can focus on writing server-side applications without having to build and maintain the production environment themselves.

## How do you deploy a RESTful, database-driven HTTP server to Heroku?

To get started, change into the `trackify` project directory

```shell
cd trackify
```

Once your staging area is clean, create a feature branch.

```shell
git checkout -b heroku
```

Create a production environment on Heroku.

**NOTE:** Replace `USERNAME` with the lowercase form of your GitHub username.

```shell
heroku apps:create USERNAME-trackify
```

Inspect the properties of the production environment.

```shell
heroku apps:info
```

Display the version of Node.js on your development environment.

```shell
node -v
```

Specify the exact version of Node.js on the production environment by adding the following property to the `package.json` file.

```javascript
"engines": {
  "node": "DEV_VERSION"
}
```

Create a PostgreSQL database for the production environment.

```shell
heroku addons:create heroku-postgresql
```

Inspect the properties of the production database.

```shell
heroku pg:info
```

Specify the connection URL to the production database server by adding the following property to the `knexfile.js` file.

```javascript
production: {
  client: 'pg',
  connection: process.env.DATABASE_URL
}
```

Automatically migrate the production database after on deployment by adding the following property to the `package.json` file.

```javascript
"scripts": {
  "knex": "knex",
  "heroku-postbuild": "knex migrate:latest",
  "nodemon": "nodemon server.js"
}
```

Install `foreman` as a local and saved development dependency.

```shell
npm install --save-dev foreman
```

Create a `Procfile` that'll start the server on the production environment.

```shell
echo 'web: node server.js' > Procfile
```

Make it easy to test `foreman` on the development environment by adding an `nf` script to the `package.json` file.

```javascript
"scripts": {
  "knex": "knex",
  "heroku-postbuild": "knex migrate:latest",
  "nf": "nf start",
  "nodemon": "nodemon server.js"
},
```

Test `foreman` on the development environment.

```shell
npm run nf
```

Generate a secret key that'll be used to sign session information on the production environment.

```shell
bash -c 'heroku config:set SESSION_SECRET=$(openssl rand -hex 64)'
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

Delete the feature branch now that it's merged.

```shell
git branch -d heroku
```

Deploy the project to Heroku.

```shell
git push heroku master
```

Inspect the production environment.

```shell
heroku apps:info
```

Inspect the production database.

```shell
heroku pg:info
```

Seed the production database.

```shell
heroku run npm run knex seed:run
```

Inspect the production database once again.

**NOTE:** Give Heroku about a minute to update it's records.

```shell
heroku pg:info
```

Log into the production database and verify

```shell
heroku pg:psql
```

## Resources

- [Heroku Dev Center - Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
- [Heroku Dev Center - Heroku Postgres](https://devcenter.heroku.com/categories/heroku-postgres)
