## Objectives

* Understand what Heroku is and how it works
* Be able to use Heroku logs to debug 
* Understand what an environment variable is
* Be able to use the `dotenv` npm module
* Be able to deploy an Node/Express app to Heroku using the CLI
* Be able to connect your app to a postgres database on heroku

## What is Heroku?

Google `how does heroku work` and click on the `https://devcenter.heroku.com` link. Read the documentation through __RELEASES__ and stop. Then, use the documentation to answer the following questions:

1. What dependency file does Heroku use to deploy your Node.js app?
1. How does Git relate to Heroku?
1. How does Heroku associate your repo to its platform?
1. What is a slug?
1. What is a dyno?
1. What is a config variable?
1. What is a release?

## Debugging Heroku

For starters, _always_ confirm that your app is working locally as it should. Then, if all is well locally, continue to debug heroku.

Come up with a theory about why your app might be broken. As quickly as you can, gather evidence to prove or disprove this theory. Repeat this process until your app is fixed.

Since your local server logs and the console won't be any help for debugging Heroku, where can you go to get more information?

The below command will print out a log of your application's launch process. Sift through it and look for clues about what's going wrong. When you spot a line that looks helpful, grab it a throw it into Google to help you decipher the error.

```
heroku logs
```

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

`add`, `commit`, `git push heroku master` and check your app again.

## Getting into your Heroku database

```
heroku pg:psql
```

This drops you into your Heroku database. You can execute raw `sql` here just as you do for your local database.

## Next Steps

Once you've got this app up and running on Heroku, deploy another CRUD app of your choosing and add the url to your README.  

Happy coding!
