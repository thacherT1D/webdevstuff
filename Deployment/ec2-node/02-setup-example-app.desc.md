# Setup the example application

- Clone https://github.com/gSchool/ec2-node-deployment
- `cd` into the `ec2-node-deployment` directory
- Run the following commands:

```
cd simple-app
npm install
createdb ec2-example-db
knex migrate:latest
knex seed:run
nodemon
```

Open http://localhost:3000/ and you should see:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/153/running-locally.png)

In the middle, you'll see a space to enter your name and start sending chat messages (just to prove that sockets work).

At the bottom, you'll see some data that comes from the database.

Play around with it, then shut the server down - you won't need it locally anymore.
