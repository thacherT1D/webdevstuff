# Install and configure PostgreSQL

Run the following commands:

```
sudo yum install -y postgresql-server
sudo service postgresql initdb
sudo service postgresql start
sudo chkconfig postgresql on
sudo -i PWD=/home/postgres -u postgres bash -c 'createuser -s ec2-user'
createdb ec2-example-db
```

You can check if it's working by going into `psql`:

```
psql ec2-example-db
```

You should see something like:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/154/create-user-and-database.png)
