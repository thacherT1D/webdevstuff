## Objectives

By the end of this lesson, you should be able to:

- Deploy an application to Heroku from the command line w/ Docs
- Describe the role of the Procfile
- Describe how Heroku relates to your git repository
- Describe continuous deployment
- Setup continuous deployment from Github

<hr>

# Deploying a Node App to Heroku from the Command Line

## Setup

1. Sign up for [Heroku](https://signup.heroku.com/)
1. Install [Node/NPM](https://nodejs.org/download/)
1. Download the Heroku [Toolbelt](https://toolbelt.heroku.com/)
1. Login - `heroku login`

## Dependencies

You must have a valid *package.json* file in your app's root directory in order for Heroku to know that you are a Node app.

### Starting your server

You have two options:

- Make sure you define `scripts.start` to declare how to run your app
- Create a Procfile to declare how to run your app

#### Start script

Here's an examples of `scripts.start`:

```json
{
  "name": "my-precious",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "~1.10.2",
    "chai": "^2.0.0",
    "connect-flash": "^0.1.1",
    "cookie-parser": "~1.3.3",
    "debug": "~2.1.1",
    "express": "~4.11.1",
    "jade": "~1.9.1",
    "mocha": "^2.1.0",
    "mongoose": "^3.8.23"
  },
  "devDependencies": {
    "bower": "^1.3.12",
    "gulp": "^3.8.11",
    "gulp-jshint": "^1.9.2",
    "gulp-mocha": "^2.0.0",
    "gulp-nodemon": "^1.0.5"
  }
}
```

### Procfile

Tradionally a *[Procfile](https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile)* had to be used in order to explicitly tell Heroku the command to use to run your app's web process:

Here's an example of a Procfile:

```
web: node ./bin/www
```

#### Testing your Procfile

If you decide to use a Procfile and want to test it locally, you can do so with Foreman (which you can install with `$ npm install -g foreman`), then run `foreman start web` which will mimic what Heroku does with your Procfile.

## Deploying from the Command Line

```sh
$ heroku create
```

This command sets up your app, with a random name, on Heroku as well as a Git remote called `heroku`. Alertantively, you can pass in a name as a command line argument to create your own name:

```sh
$ heroku create colorado
```

You can also rename your app by running the command:

```sh
$ heroku apps:rename NEWNAME
```

Make sure you have a .gitignore file:

```
/node_modules
npm-debug.log
.DS_Store
/*.env
```

Now you can deploy to Heroku using Git:

```sh
$ git add -A
$ git commit -m "escape to colorado"
$ git push heroku master
```

Make sure at least one web dyno is running:

```sh
$ heroku ps:scale web=1
```

## Profit

```sh
$ heroku open
```

## Continuous Integration/Continuous Deployment

Deploy from Github with: https://devcenter.heroku.com/articles/github-integration


## Extra Reading

Questions? Need help? Check the official [Heroku docs](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction). Cheers!

Want to learn how to deploy after your tests pass?  https://github.com/gSchool/g11-course-curriculum/tree/master/week15/15_lectures/continuous-integration-and-delivery
