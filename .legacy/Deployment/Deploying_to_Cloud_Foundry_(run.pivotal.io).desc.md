Make sure your instructor has added you to run.pivotal.io.

```
cf push unique-app-name -m 128m
cf create-service elephantsql turtle unique-service-name
cf bind-service unique-app-name unique-service-name
cf restage unique-app-name
```

To wire up database: 


```
cf env unique-app-name # find your postgres url under vcap
cf set-env unique-app-name DATABASE_URL postgres://...
```

To run migrations you can connect to the database manually with `psql`, or you can do:

```
cf push unique-app-name -c 'npm run db-migrate -- up'
cf push unique-app-name -c 'null'
```

To deploy a static site:

```
touch Staticfile
cf push my-site -m 64M
```

To make Angular Routes work in HTML5Mode add the following nginx.conf file to your app:

```
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

Resources:

- http://spiegela.com/2015/08/10/angular-apps-in-cloud-foundry/
- https://solutionizeit.files.wordpress.com/2014/03/cf-arch.png
- https://www.cloudfoundry.org/learn/features/