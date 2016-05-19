# Install and Configure Nginx

Make sure you are logged into your EC2 Instance.

We want to be able to access the app through port 80
We want to load balance between the 4 node apps we have running.  Nginx can handle that quite well.

To install it, run:

```
sudo yum install -y nginx
sudo service nginx start
sudo chkconfig nginx on
```

When you visit your public DNS url, you should see this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/164/nginx-default.png)

That means Nginx is up and running, it's just not connected to your Node app.  Here's how to fix that.

First, make a backup of the original Nginx configuration file:

```
sudo mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.orig
```

Then, create a new nginx config file like so:

```
sudo vi /etc/nginx/nginx.conf
```

Copy and paste the following contents BUT make sure to add your real hostname instead of `<YOUR-PUBLIC-DNS>`:

```
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /var/run/nginx.pid;

events {
  worker_connections 1024;
}

http {
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

  access_log  /var/log/nginx/access.log  main;

  sendfile            on;
  tcp_nopush          on;
  tcp_nodelay         on;
  keepalive_timeout   65;
  types_hash_max_size 2048;

  include             /etc/nginx/mime.types;
  default_type        application/octet-stream;

  include /etc/nginx/conf.d/*.conf;

  index   index.html index.htm;

  upstream nodes {
    ip_hash;
    server 127.0.0.1:8000;
    server 127.0.0.1:8001;
    server 127.0.0.1:8002;
    server 127.0.0.1:8003;
    keepalive 64;
  }

  server {
    listen       80 default_server;
    listen       [::]:80 default_server;

    # TODO: insert your real domain name here
    server_name  <YOUR-PUBLIC-DNS>;
    root         /usr/share/nginx/html;

    include /etc/nginx/default.d/*.conf;

    error_page 404 /404.html;
      location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
      location = /50x.html {
    }

    location / {
      proxy_pass http://nodes;
      proxy_redirect off;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header Host $host;
      proxy_set_header X-NginX-Proxy true;
      proxy_set_header Connection "";
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
  }
}
```

Once you've done that, run:

```
sudo service nginx restart
```

If all went well, you can visit your public DNS and you'll see your node app!!

Congratulations - you've just deployed a Node application to AWS EC2 that can make database calls and also support web sockets!
