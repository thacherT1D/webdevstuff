
<div class="alert alert-info">
  We are currently transitioning this Learning Experience from Mongo to SQL.  Even though these reference Mongo, we recommend using SQL.
</div>

## Objectives

- Describe environment variables
- Set environment variables at the terminal
    - user-level (with ~/.zshrc && reloading the environment)
    - session-level (with export)
    - command-level (PORT=3002 nodemon)
- Set environment variables on Heroku
- Access environment variables from node
- Setup the `dotenv` npm module to mimic environment variables on the dev machine

When deploying to Heroku, you'll need to connect to a different database than the one you use to develop locally.

<iframe src="https://player.vimeo.com/video/131368578?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## MongoLab

MongoLab is a [DBaaS](https://mongolab.com/).

```
$ heroku addons:create mongolab
$ heroku config | grep MONGOLAB_URI
```

Grab the URI from the command line and then update your Mongo connection on your server:

```sh
mongoose.connect(process.env.MONGOLAB_URI || "mongodb://localhost/db-name")
```

or

```sh
require('monk')(process.env.MONGOLAB_URI || 'localhost/mydb');

> You can also set up your various Mongo URI's via a configuration file. [Example](https://github.com/mjhea0/node-stripe-charge).

## Sensitive Info?

Are you using API keys that can not be exposed to the world?

1. Add the keys to a *config.js* file
1. Make sure to add the the file to your *.gitignore* file.
1. Add the keys via [environment variables](https://devcenter.heroku.com/articles/config-vars) on Heroku - `heroku config:set SECRET_KEY=my_precious`
