# Deploy and run your app

Make sure you are in the `ec2-node-deployment` directory on your _local_ machine and run the following command:

<div class="alert alert-info">
  **NOTE** you can either `exit` out of the server, or open your local directory in another Terminal tab.
</div>

```
rsync -rave "ssh -i aws-key.pem" --exclude '*.git' --exclude 'node_modules' simple-app/* <YOUR-URL>:app
```

<div class="alert alert-warning">
  **NOTE** replace `<YOUR-URL>` with the full URL you used to connect via SSH.  It's something like `ec2-user@...`
</div>

That command took all the files in your `simple-app` directory (minus the `.git` directory and `node_modules` directory) and securely copied them up to your server.

**Check your work**

Connect to your server again, and run the following:

```
ls -la app
```

You should see:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/155/app-deployed.png)

## Set the NODE_ENV

In order for you app to run in the proper environment (production) you need to set the `NODE_ENV` environment variable.  You want to make sure that even if you restart your server, the environment variable persists, so write it to the `~/.bash_profile` like so:

```
echo "export NODE_ENV=production" >> ~/.bash_profile
. !$
```

To check your work, run:

```
echo $NODE_ENV
```

You should see `production` print to the screen.

<div class="alert alert-info">
  <p>
    `. !$` looks crazy!
  </p>
  <p>
    That command reloaded your `~/.bash_profile` so you don't have to logout / login in order to have the changes take effect.
  </p>
</div>


## Setup the app

```
cd app
npm install
./node_modules/.bin/knex migrate:latest
./node_modules/.bin/knex seed:run
```

You should see something like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/158/setup-knex.png)

This means your app is ready to run!  Run `npm start` and you should see something like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/160/npm-start.png)

NOTE: you can't really test your app our right now.  If you visit your public DNS URL on port 3000 (such as http://ec2-52-34-214-90.us-west-2.compute.amazonaws.com:3000) it's not available?

Why?  Because the security policy only allows traffic on port 80.  You could try `PORT=80 npm start`, but that won't work because only the `root` user can start processes on port 80.

Don't fret!  In the next step you'll be able to verify that your app is running correctly.

## Install `forever`

On your server run the following:

```
cd ~/
sudo npm install forever -g
forever start app/bin/www
curl http://localhost:3000
```

You should see something like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/159/forever-node-check.png)

Great!  That means your app is up and running as a daemon.  We'll end up running the app slightly differently, so run the following command to turn off the node app:

```
forever stopall
```

You should see something like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/161/forever-stopall.png)

## Start 4 app processes

Remember, the goal is to setup the server like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/163/nginx-forever-postgres.png)

So we want 4 node processes running.  Execute the following commands to get 4 processes running on 4 different ports:

```
PORT=8000 forever start app/bin/www
PORT=8001 forever start app/bin/www
PORT=8002 forever start app/bin/www
PORT=8003 forever start app/bin/www
```

If you run `forever list`, you should see that 4 processes are running:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/162/forever-list.png)

Great!  But how do you make this available on port 80?  Read on!
