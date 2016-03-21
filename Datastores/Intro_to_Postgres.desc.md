# Relational Databases And SQL

## Objectives

* Install postgres

## Installation
------------------

Postgres Installation & Startup
-------------------------------

Make sure that [Homebrew](http://brew.sh/) has the latest formulas and then install PostgreSql.
When you are done, make sure PostgreSql was installed and set it to auto start whenever you computer starts.

With `homebrew` installed, you can run `brew install postgresql`. If not, you can download it here: [PostgreSQL](http://www.postgresql.org/download/)

```
$ brew doctor
```

Make sure it says that you are "ready to brew".  If not, fix all errors first.  Do NOT type `sudo brew...`.

```
$ brew update
$ brew install postgres
```

Before you can connect to `postgres` you must startup the server. Follow the instructions in the brew install to have postgres start at login.  The commands look something like this:

```
$ ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

> NOTE: those may not be the _EXACT_ commands.  Copy the ones provided that look similar.

> NOTE: if you clear your terminal, you can get them back with `brew info postgres`.

Now your database should be running.  To create your default database, run:

```
createdb
```

Check that `psql` has been installed correctly by typing:

```
$ psql --version
```

You should see something like: `psql (PostgreSQL) 9.3.2` (the version number may be higher, that's OK).

Now you should be able to run:

```
psql
```

And you'll be in an interactive postgres terminal session.

To get out of `psql` use `CTL+d` or type `\q`.

## What is a Relational Database?

* Sometimes called a Relational DBMS (Database Management System)
* It is a program that enforces structure on your data and allows a computer to quickly retrieve data.
* A relational database should support standard CRUD operations, just like mongo.
  * CRUD => Create, Read, Update, Destroy
* It uses SQL, __Structured Query Language__.
  * SQL is a very powerful language for retrieving data.  We will learn about it throughout the lesson.
  
## Common Relational Databases

* Postgres
* MySQL (Used to be very popular)
* Oracle (Commercial Product with lots of features)
* Microsoft SQL Server
* SQLite (Good for mobile development/Small applications)


# SQL: Structured Query Language

__A Brief History of Databases__

Before the notion of an RDBMS and a standard language for querying that data was created, there were many database venders. Each vendor had different ways of storing data and very different ways of retrieving the data afterwards. Moving data from one system to another was very costly. Luckily in the 1970s SQL was created and later turned into a standard. Modern relational databases are now based on the SQL standard, so moving from Postgres to Oracle is not nearly as much of a challenge as it used to be. Each database has their own querying quirks, but the general structure is consistent across all of the SQL-based databases.
