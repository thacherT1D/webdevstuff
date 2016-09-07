# Deploying to Cloud Foundry

## Objectives

By the end of this lesson you will be able to

- Deploy Node applications to Cloud Foundry.
- Deploy Angular and other static sites to Cloud Foundry.

## Introduction & Setup

Ensure your instructor has added you to [run.pivotal.io](http://run.pivotal.io/).

First, install the Cloud Foundry CLI using homebrew:

```bash
$ brew tap cloudfoundry/tap
$ brew install cf-cli
```

Next, login to your Cloud Foundry account:

```bash
$ cf login -a api.run.pivotal.io
```

## Deploying Node App

```bash
cf push unique-app-name -m 128m
cf create-service elephantsql turtle unique-service-name
cf bind-service unique-app-name unique-service-name
cf restage unique-app-name
```

### Database Configuration

To wire up database:

```bash
cf env unique-app-name # find your postgres url under vcap
cf set-env unique-app-name DATABASE_URL postgres://...
```

To run migrations you can connect to the database manually with `psql`, or you can do:

```bash
cf push unique-app-name -c 'npm run db-migrate -- up'
cf push unique-app-name -c 'null'
```


## Deploying a Static Site

To deploy a static site:

```bash
touch Staticfile
cf push my-site -m 64M
```

To make Angular Routes work in HTML5Mode add the following nginx.conf file to your app:

```bash
worker_processes 1;
daemon off;

error_log <%= ENV["APP_ROOT"] %>/nginx/logs/error.log;
events { worker_connections 1024; }

http {
  log_format cloudfoundry '$http_x_forwarded_for - $http_referer - [$time_local] "$request" $status $body_bytes_sent';
  access_log <%= ENV["APP_ROOT"] %>/nginx/logs/access.log cloudfoundry;
  default_type application/octet-stream;
  include mime.types;
  sendfile on;

  gzip on;
  gzip_disable "msie6";
  gzip_comp_level 6;
  gzip_min_length 1100;
  gzip_buffers 16 8k;
  gzip_proxied any;
  gzip_types text/plain text/css text/js text/xml text/javascript application/javascript application/x-javascript application/json application/xml application/xml+rss;

  tcp_nopush on;
  keepalive_timeout 30;
  port_in_redirect off; # Ensure that redirects don't include the internal container PORT - <%= ENV["PORT"] %>
  server_tokens off;

  server {
    listen <%= ENV["PORT"] %>;
    server_name localhost;

    location / {
      root <%= ENV["APP_ROOT"] %>/public;
      index index.html index.htm Default.htm;
      try_files $uri $uri/ /index.html?$args;
    }
  }
}
```

## Resources:

- [Cloud Foundry CLI Docs](https://docs.run.pivotal.io/cf-cli/)
- [Cloudfoundry: Learn](https://www.cloudfoundry.org/learn/features/)
- [Spiegela: Angular Apps in Cloud Foundry](http://spiegela.com/2015/08/10/angular-apps-in-cloud-foundry/)
- [Solutionizeit](https://solutionizeit.files.wordpress.com/2014/03/cf-arch.png)
