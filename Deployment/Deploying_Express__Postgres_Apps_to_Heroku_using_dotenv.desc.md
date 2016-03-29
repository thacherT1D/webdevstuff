## Objectives

* Understand what Heroku is and how it works
* Be able to use Heroku logs to debug 
* Be able to deploy an Node/Express app to Heroku using the CLI

## What is Heroku?

Google `how does heroku work` and click on the `https://devcenter.heroku.com` link. Read the documentation through __RELEASES__ and stop. Then, use the documentation to answer the following questions:

1. What dependency file does Heroku use to deploy your Node.js app?
1. How does Git relate to Heroku?
1. How does Heroku associate your repo to its platform?
1. What is a slug?
1. What is a dyno?
1. What is a config variable?
1. What is a release?

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
