## Objectives

* Be able to deploy an Node/Express app to Heroku using the CLI

## Connecting to a Heroku Hosted Postgres Database

First, run the below command to see if you have any configured environment variables. It should be empty, but let's confirm

```
heroku config
```

Ok, now run the below command to tell Heroku you want to connect a database to this app.

```
heroku addons:create heroku-postgresql
```

Check your config variables again. What do you see?

```
heroku config
```

You should see an environment variable called `DATABASE_URL` with a value that is a very long url to a postgres database.

## Getting into your Heroku database

```
heroku pg:psql
```

This drops you into your Heroku database. You can execute raw `sql` here just as you do for your local database.
