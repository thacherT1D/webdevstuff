# Deploying to Cloud Foundry

Many of Galvanize's hiring partners use Cloud Foundry, Pivotal's cloud platform. As such, many graduates have found themselves working directly with Cloud Foundry. It is likely you will interview with a company that uses Cloud Foundry, and having used it - even just once can score you bonus points with the company.

## Objectives

By the end of this lesson you will be able to:

- Deploy Node applications to Cloud Foundry.
- Set up a Postgres service on Cloud Foundry.

## Introduction & Setup

Ensure your instructor has added you to [run.pivotal.io](http://run.pivotal.io/).

First, install the Cloud Foundry CLI using homebrew:

```bash
$ brew tap cloudfoundry/tap
$ brew install cf-cli
```

Next, use the Cloud Foundry CLI login to your Cloud Foundry account:

```bash
$ cf login -a api.run.pivotal.io
```


## Deploying a Node app

Fork and clone the [Demo Deploy App](https://github.com/gSchool/ec2-node-deployment/tree/master/simple-app) and navigate to the cloned directory.

TODO or use your own.
TODO describe engine in package.json
TODO describe launching from directory of package.json
TODO view logs
TODO start command with knex
TODO view location of app.
TODO add to instructions something that has already been deployed
TODO add DATABASE_URL to demo app.

To deploy the Node app simply run:

```bash
$ cf push unique-app-name -m 128m
```

The app is now online! Unfortunately, it doesn't work as we haven't set up our database.

To set up the database we need to set up a postgresql service and bind it to our application:

```bash
$ cf create-service elephantsql turtle unique-service-name
$ cf bind-service unique-app-name unique-service-name
```

We need to restage our application for the service changes to take place:

```bash
$ cf restage unique-app-name
```

Let's get the URL of our Postgres service by running:

```bash
# find your postgres url under vcap
$ cf env unique-app-name
```

Our application still does not know where the Postgres database is located. We need to update our `DATABASE_URL` environment variable to the postgres URL.

```bash
$ cf set-env unique-app-name DATABASE_URL postgres://<postgres url here>
```

## Resources:

- [Cloud Foundry: Deploying an application](http://docs.run.pivotal.io/devguide/deploy-apps/deploy-app.html)
- [Cloud Foundry CLI Docs](https://docs.run.pivotal.io/cf-cli/)
- [Cloud Foundry: Node buildpack](https://docs.pivotal.io/pivotalcf/1-7/buildpacks/node/index.html)
- [Cloudfoundry: Learn](https://www.cloudfoundry.org/learn/features/)
- [Spiegela: Angular Apps in Cloud Foundry](http://spiegela.com/2015/08/10/angular-apps-in-cloud-foundry/)
- [Solutionizeit](https://solutionizeit.files.wordpress.com/2014/03/cf-arch.png)
