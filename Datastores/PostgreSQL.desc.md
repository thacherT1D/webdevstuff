## Objectives

- Explain the difference between data and information.
- Explain what an entity is.
- Diagram how web applications store and retrieve data.
- Explain what is a relational database system is.
- Explain why is a relational database system so important.
- Explain what PostgreSQL is.
- Install PostgreSQL using Homebrew.
- Start a PostgreSQL server using Homebrew Services.
- Use command line tools to manage databases in a PostgreSQL cluster.
- Use the PostgreSQL REPL to manage databases in a PostgreSQL cluster.
- Use the PostgreSQL REPL to manage tables in a database.
- Use the PostgreSQL REPL to manage rows in a table.

## What's the difference between data and information?

Before you can become fluent with a database systems like PostgreSQL, you first need become fluent with the difference between data and information. Simply put, **data** are facts. Here are some examples of data, represented in JavaScript.

```javascript
1;
'Frozen';
102;
'PG';
'Animation';
true;
new Date('2013-11-27 00:00:00 UTC');
7.6;
```

On the other hand, **information** is facts about something or someone. In other words, information is data with context. Here's an example of information about a movie, represented in JavaScript.

```javascript
const movie = {
  id: 1,
  title: 'Frozen',
  duration: 102,
  rated: 'PG',
  genre: 'Animation',
  is3D: true,
  releasedAt: new Date('2013-11-27 00:00:00 UTC'),
  score: 7.6
};
```

**NOTE:** When working with a date, always include a time with a [timezone](https://en.wikipedia.org/wiki/Time_zone#/media/File:Standard_World_Time_Zones.png). For example, if it's March 31st for a person in the U.S.A., it's April 1st for a person in China.

### Exercise

Take a minute to write down how you'd explain the difference between data and information to a friend. Then, turn to a neighbor and share what you wrote.

## What's an entity?

In the above example, the `movie` object is called an entity. An **entity** is an object the represents a person, place, or thing. As you can see from the table below, this `movie` entity has a handful of attributes. An **attribute** is a piece of information that describes an entity.

| `id` | `title`    | `duration` | `rated` | `genre`       | `is_3d`     | `released_at`                         | `score` |
|------|------------|------------|---------|---------------|-------------|---------------------------------------|---------|
| `1`  | `'Frozen'` | `102`      | `'PG'`  | `'Animation'` | `true`      | `new Date('2013-11-27 00:00:00 UTC')` | `7.6`   |

**NOTE:** In table form, attribute names are often displayed in camelcase because unquoted identifiers like `releasted_at` are case insensitive in PostgreSQL.

### Exercise

Turn to a neighbor and consider how you'd describe a `pet` entity. Think of at least five pieces of information that are essential to being a pet.

Using this information, create a JavaScript object that represents one instance of a `pet` entity. Then, create a table, like the one above, to represent the same `pet` entity.

## How do web applications store and retrieve information?

For the next few days, you'll be learning how web applications store and retrieve information.


[INSERT CLIENT-SERVER DIAGRAM WITH A RDBMS]

In a development environment, a database server often lives on the same machine. In a production environment, a database server often lives on a different machine.

```shell
http POST moviejunkies.com/movies title=Frozen duration=102 rated=PG genre=Animation is3D=true releasedAt='2013-11-27 00:00:00 UTC' score=7.6
```

```shell
http GET moviejunkies.com/movies/1
```

You can't put data into a data store and never take it out. This is called a "black hole".

You can't take data out of a data store that you never put in. This is called "immaculate conception".

A datastore could just as easily be a database or a filing cabinet

The point is to illustrate data in motion (data flows) vs. data at rest (data stores)

If the system turns off, data in motion is lost, data at rest is not.

## What's a relational database system?

A **relational database system**, or relational database management system (RDBMS), is a database system that's based on the relational model. The **relational model** is an approach to managing information in a table (i.e. relation) where an entity is represented as a row and its attributes are represented as columns. For example, here's a `movies` table that contains some movie entities.

```text
 id |       title        | duration | rated |   genre   | is_3d |      released_at       | score
----+--------------------+----------+-------+-----------+-------+------------------------+-------
  1 | Frozen             |      102 | PG    | Animation | t     | 2013-11-26 16:00:00-08 |   7.6
  2 | X-Men: Apocalypse  |      144 | PG-13 | Action    | t     | 2016-05-26 16:00:00-08 |   7.4
  3 | The Princess Bride |       98 | PG    | Adventure | f     | 1987-10-08 16:00:00-08 |   8.1
  4 | Pulp Fiction       |      154 | R     | Crime     | f     | 1994-10-13 16:00:00-08 |   8.9
```

In a relational database system, all values in the same column must be the same data type.

| Attribute     | Database type | JavaScript type |
|---------------|---------------|-----------------|
| `id`          | `INTEGER`     | `Number`        |
| `title`       | `TEXT`        | `String`        |
| `duration`    | `INTEGER`     | `Number`        |
| `rated`       | `VARCHAR`     | `String`        |
| `genre`       | `TEXT`        | `String`        |
| `is_3d`       | `BOOLEAN`     | `Boolean`       |
| `released_at` | `TIMESTAMP`   | `Date`          |
| `score`       | `NUMERIC`     | `Number`        |

The way you manage the tables and rows in most modern relation database systems is with a special-purpose programming language called Structured Query Language (**SQL**). It consists of three distinctive languages.

1. A data definition language (DDL) for managing tables.
1. A data manipulation language (DML) for managing rows.
1. A data control language (DCL) for managing permissions to the tables and rows.

In this course, we'll only be focusing on the data definition and data manipulation languages of SQL. Here's an example of a data definition command in SQL.

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT,
  duration INTEGER,
  rated VARCHAR(10),
  genre TEXT,
  is_3d BOOLEAN NOT NULL,
  released_at TIMESTAMP WITH TIME ZONE,
  score NUMERIC(3, 1)
);
```

And here's an example of a few data manipulation commands in SQL.

```sql
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('Frozen', 102, 'PG', 'Animation', TRUE, '2013-11-27 00:00:00 UTC', 7.6);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('X-Men: Apocalypse', 144, 'PG-13', 'Action', TRUE, '2016-05-27 00:00:00 UTC', 7.4);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('The Princess Bride', 98, 'PG', 'Adventure', FALSE, '1987-10-09 00:00:00 UTC', 8.1);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('Pulp Fiction', 154, 'R', 'Crime', FALSE, '1994-10-14 00:00:00 UTC', 8.9);
```

SQL became an official standard in the mid-1980's. Since then, it has been revised a few times to include a growing set of features. Despite the existence of such standards, most SQL code is not completely portable between different database systems without adjustments. Popular open source relational database systems that implement the SQL standard include the following.

- MySQL
- PostgreSQL
- SQLite

Popular closed source relational database systems that implement the SQL standard include the following.

- Microsoft Access
- Microsoft SQL Server
- Oracle

Regardless of source type, all relational database systems have a few things in common.

1. A database client issues SQL commands to a database server.
1. A database server manages a cluster of databases.
1. A database manages multiple tables.
1. A table manages multiple rows of information.
1. Rows are persisted to a hard disk by the database server.

For example, if you were building a web application for movie fanatics called Movie Junkies, it might use one database server with two databases: a `movie_junkies_dev` database for the development environment and `movie_junkies_test` database for the test environment.

```text
        Name        |   Owner   | Encoding
--------------------+-----------+----------
 movie_junkies_dev  | ryansobol | UTF8     
 movie_junkies_test | ryansobol | UTF8     
```

## Why is a relational database system so important?

Since the 1970s, relational database systems have been used to store financial records, manufacturing and logistical information, personnel data, government information, communication data, etc. By structuring data in records and tables, computers can quickly and efficiently store and retrieve insanely large amounts data.

Imagine, for a moment, you have a database for an online store with a single `orders` table.

```text
 id | title  | duration | rated |   genre   | is_3d |      released_at       | score |                              award_name                              | award_kind |   award_received_at
----+--------+----------+-------+-----------+-------+------------------------+-------+----------------------------------------------------------------------+------------+------------------------
  1 | Frozen |      102 | PG    | Animation | t     | 2013-11-26 16:00:00-08 |   7.6 | Best Animated Feature Film of the Year                               | Oscar      | 2014-03-01 16:00:00-08
  1 | Frozen |      102 | PG    | Animation | t     | 2013-11-26 16:00:00-08 |   7.6 | Best Achievement in Music Written for Motion Pictures, Original Song | Oscar      | 2014-03-01 16:00:00-08
```

As you can see, there's duplicate customer data. And wherever there's duplicate data, there's the possibility for inconsistencies to arise. For example, imagine Susan Frazier wants to change her last name. Given the current structure, that would require changing multiple records. With a relational database system, it's possible to use multiple tables—like a `customers` and `orders` table—to store the same information.

```text
 id | title  | duration | rated |   genre   | is_3d |      released_at       | score |
----+--------+----------+-------+-----------+-------+------------------------+-------+
  1 | Frozen |      102 | PG    | Animation | t     | 2013-11-26 16:00:00-08 |   7.6 |
```

```text
 id | movie_id | kind  |                                 name                                 |      received_at
----+----------+-------+----------------------------------------------------------------------+------------------------
  1 |        1 | Oscar | Best Animated Feature Film of the Year                               | 2014-03-01 16:00:00-08
  2 |        1 | Oscar | Best Achievement in Music Written for Motion Pictures, Original Song | 2014-03-01 16:00:00-08
```
Now, a change to a customer's last name only requires a change to one record.

## What's PostgreSQL?

**PostgreSQL** is a powerful, open source relational database system that's been around since 1996 and has a strong reputation for reliability, data integrity, and correctness. It runs on all major operating systems, including Linux, Mac OS X, and Windows.

PostgreSQL is fully ACID (atomicity, consistency, isolation, durability) compliant and supports most SQL:2008 data types, including:

- `INTEGER`
- `NUMERIC`
- `BOOLEAN`
- `CHAR`
- `VARCHAR`
- `DATE`,
- `INTERVAL`
- `TIMESTAMP`

PostgreSQL can even store large binary objects such as pictures, sounds, or video. PostgreSQL has native interfaces for a number of programming languages including JavaScript and is known for its [exceptional documentation](https://www.postgresql.org/docs/current/static/).

## How do you install PostgreSQL using Homebrew?

To install the latest version of PostgreSQL using Homebrew, run the following commands.

```shell
brew update
brew install postgresql
```

### Exercise

Verify the latest version of PostgreSQL was installed correctly by running the following commands.

```shell
postgres --version
psql --version
```

## How do you start a PostgreSQL server using Homebrew Services?

During installation, Homebrew will automatically initialize a PostgreSQL cluster on your machine. You can see how a PostgreSQL cluster is organized on the filesystem by running the following command.

```shell
ls -hal /usr/local/var/postgres/
```

And you should see something like this.

![](https://i.imgur.com/mMXxYfO.png)

**NOTE:** When an error is generated by a PostgreSQL server managing this cluster, the error message is logged to the `server.log` file in this directory.

To manage the databases and tables inside a PostgreSQL cluster, you need a PostgreSQL server. There are a bunch of ways to start a server for this cluster, but one of the easiest ways is to launch it as a service.

A **service** is any server application that's launched as a background process when an operating system boots up. Once launched, the operating system will restart the service if it crashes. In other words, you start the service once and the operating system will keep it running indefinitely. The only way a service stops running is if you command the operating system to do so. As you can imagine, this is a very popular strategy for running a server in a production environment.

To see all the services running on your own machine, open the `Activity Monitor` application with Spotlight.

![](https://i.imgur.com/3UaQn1Q.png)

**NOTE:** A service can be launched by any user, including the `root` user account and your own user account.

The Homebrew Services plugin makes it a easy to manage services that are installed with Homebrew. To get started, install the Homebrew Services plugin with the following command.

```shell
brew tap homebrew/services
```

Then, use the plugin to list all the running services.

```shell
brew services list
```

And you should see something like this.

![](https://i.imgur.com/Qaj9Or8.png)

To start a PostgreSQL server as a service, run the following command.

```shell
brew services start postgresql
```

And you should see something like this.

![](https://i.imgur.com/cIKWKg8.png)

To verify the server has started, check the list of running services.

```shell
brew services list
```

And you should see something like this.

![](https://i.imgur.com/WzqsZAz.png)

To stop the service, run the following command.

```shell
brew services stop postgresql
```

And you should see something like this.

![](https://i.imgur.com/QDlki0f.png)

To verify the server has stopped, check the list of running services one more time.

```shell
brew services list
```

And you should see something like this.

![](https://i.imgur.com/Qaj9Or8.png)

### Exercise

Using the Homebrew Service plugin, start a PostgreSQL server for the default PostgreSQL cluster. When your done, check out the plugin's usage message with the following command.

```shell
brew services --help
```

## How do you use command line tools to manage databases in a PostgreSQL cluster?

Now that a PostgreSQL server running, you can use a variety of command line tools to manage the default PostgreSQL cluster. To list out all the databases in the default cluster, run the following command.

```shell
psql -l
```

And you should see something like this.

![](https://i.imgur.com/57ZyROA.png)

As you can see, there are already three databases inside the default PostgreSQL cluster.

1. `postgres`
1. `template0`
1. `template1`

The `postgres` database was created when the PostgreSQL cluster was initialized. This database is meant to be the default database for users and applications. You can use it as a scratch pad when you're experimenting with new database concepts.

The `template0` and `template1` databases were also created during initialization. When a new database is created, it's actually a copy of these template databases. So it's a good idea to leave these alone. See the [Template Databases](https://www.postgresql.org/docs/current/static/manage-ag-templatedbs.html) article in the PostgreSQL documentation to learn more about them.

Additionally, the default encoding for a PostgreSQL database is `UTF8`. Using the same character encoding throughout your web application is essential for preventing data corruption. You can safely ignore the `Collate`, `Ctype`, and `Access Priviledges` columns for now.

Most database-driven web applications use multiple databases, one for each environment. To create a database for the fictitious Movie Junkies web app from earlier, run the following command.

```shell
createdb movie_junkies_dev
```

And you should see neither a success nor a failure message. To verify that the database was created, check the list of databases again.

```shell
psql -l
```

And you should see something like this.

![](https://i.imgur.com/H8CflcG.png)

To drop (i.e. destroy) the database, run the following command.

```shell
dropdb movie_junkies_dev
```

Again, you should see neither a success nor a failure message. To verify that the database was dropped, check the list of databases again.

```shell
psql -l
```

And you should see something like this.

![](https://i.imgur.com/57ZyROA.png)

### Exercise

Use the `createdb` and `dropdb` command line tools to create and drop a `movie_junkies_dev` database a few times. Each time you create and drop the database, verify the contents of the default PostgreSQL cluster with the `psql` command line tool.

After you've done this a few times, ensure the default PostgreSQL cluster contains a `movie_junkies_dev` database. Then, check out the usage messages for the following commands.

```shell
psql --help
createdb --help
dropdb --help
```

## How do you use PostgreSQL REPL to manage databases in a PostgreSQL cluster?

In addition to the above command line tools, you can manage the databases inside the default PostgreSQL cluster with the PostgreSQL REPL. Similar to the Node.js REPL, the **PostgreSQL REPL** is a read-evaluate-print loop where you can play around and experiment with new database concepts.

The PostgreSQL REPL accepts both REPL commands and SQL commands. You can tell the difference between the two because REPL commands start with a backslash `\` and SQL commands end with a semicolon `;`. In a moment, you'll see some examples of each.

Before you get started with the PostgreSQL REPL, download and install some configuration for it by running the following command.

```shell
curl -fsSL https://git.io/voVWg | sh
```

**NOTE:** This configuration will colorize the prompt of your PostgreSQL REPL and allow you to use the `Alt + ←` and `Alt + →` keyboard shortcuts to jump between SQL keywords.

To launch the PostgreSQL REPL, run the following command.

```shell
psql
```

And you should see something like this.

![](https://i.imgur.com/Jy458Ah.png)

Opps! What happened? Well, when the `psql` command line tool is executed without any arguments, it'll attempt to connect to a database with the same name as your user account. To fix this, you can either create a database with the same name as your user account or specify a different database.

To connect the PostgreSQL REPL to the `movie_junkies_dev` database, run the following command.

```shell
psql movie_junkies_dev
```

And you should see something like this.

![](https://i.imgur.com/sNcaEdD.png)

Welcome to the PostgreSQL REPL! To get help, run the following command.

```text
help
```

And you should see something like this.

![](https://i.imgur.com/bQz6Q1s.png)

To see the list of databases inside the default PostgreSQL cluster, run the following command.

```text
\l
```

And you should see something like this.

![](https://i.imgur.com/DDbKKYG.png)

**NOTE:** It should be the exact same output as running the `psql -l` command line tool.

To create a database for the test environment of the fictitious Movie Junkies web app, run the following SQL command.

**NOTE:** Remember to end SQL commands with a semicolon `;`.

```sql
CREATE DATABASE movie_junkies_test;
```

And you should see something like this.

![](https://i.imgur.com/ybLdKKZ.png)

**NOTE:** It's quite an expensive operation to create a database by copying the template databases.

If you forget to end an SQL command with a semicolon `;`, the PostgreSQL REPL will display another prompt. This is REPL's way of trying to be helpful by  letting you continue writing the command on the next line. It would look something like this.

![](https://i.imgur.com/RjCdoWD.png)

SQL commands can get very long and writing them over multiple lines is extremely useful. However, the PostgreSQL REPL won't execute a SQL command unless it ends with a semicolon `;`. The sure fire way you can tell the REPL is waiting for a semicolon `;` is when the yellow equals sign `=` in the prompt changes to a yellow minus sign `-`. See the above screenshot for an example.

Just remember, SQL commands must be end with a semicolon `;`. So if you're wondering why your SQL command didn't work, check for the yellow minus sign `-`. And if you see it, type in a semicolon `;` and hit the `Enter` key.

![](https://i.imgur.com/3TCOj1w.png)

To verify the database was created, check the list of databases again.

```text
\l
```

And you should see something like this.

![](https://i.imgur.com/XLJb0j7.png)

As you can see from the prompt, the current connected database is the `movie_junkies_dev` database. To connect the REPL to the database you just created, run the following command.

```text
\c movie_junkies_test
```

And you should see something like this.

![](https://i.imgur.com/iK5uWtL.png)

To drop the `movie_junkies_test` database, run the following SQL command.

```sql
DROP DATABASE movie_junkies_test;
```

And you should see something like this.

![](https://i.imgur.com/j1eZMMe.png)

Opps! What happened? It looks like you can't drop the current connected database. To switch the REPL back, run the following command.

```text
\c movie_junkies_dev
```

And you should see something like this.

![](https://i.imgur.com/NytCCbZ.png)

To drop the `movie_junkies_test` database, run the following SQL command again.

```sql
DROP DATABASE movie_junkies_test;
```

And you should see something like this.

![](https://i.imgur.com/EE5BkcP.png)

To verify the database was created, check the list of databases again.

```text
\l
```

And you should see something like this.

![](https://i.imgur.com/DDbKKYG.png)


Finally, to quit the PostgreSQL REPL, run the following command.

```text
\q
```

And you should see something like this.

![](https://i.imgur.com/Z2q2KG3.png)

### Exercises

Use the `CREATE DATABASE` and `DROP DATABASE` SQL commands to create and drop a `movie_junkies_test` database a few times. Each time you create and drop the database, verify the contents of the default PostgreSQL cluster with the `\l` REPL command. Also, practice connecting to the new database with the `\c` REPL command.

After you've done this a few times, ensure the default PostgreSQL cluster contains a `movie_junkies_test` database. Then, check out the usage messages for the following REPL commands.

```text
help
\?
\h
```

## How do you use the PostgreSQL REPL to manage tables in a database?

In addition to managing databases, the PostgreSQL REPL can also manage tables in the default PostgreSQL cluster. To display the tables in the current connected database, run the following REPL command.

```text
\dt
```

And you should see something like this.

![](https://i.imgur.com/Ypfh2EV.png)

**NOTE:** The word relation is a synonym for a table.

To create a `movies` table in the current connected database, run the following SQL command.

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title TEXT,
  duration INTEGER,
  rated VARCHAR(10),
  genre TEXT,
  is_3d BOOLEAN NOT NULL,
  released_at TIMESTAMP WITH TIME ZONE,
  score NUMERIC(3, 1)
);
```

And you should see something like this.

![](https://i.imgur.com/R4l9WOj.png)

The above `CREATE TABLE` command is an example a multi-line SQL command. Notice how the yellow equals sign `=` of the prompt changed to a yellow open parenthesis sign `(`. This is a clue that the PostgreSQL REPL was waiting for the SQL command to have a matching close parenthesis `)`.

To verify the table was created, display the tables in the current connected database by running the following REPL command.

```text
\dt
```

And you should see something like this.

![](https://i.imgur.com/0geGsbQ.png)

To verify the table was created with the correct attributes, run the following command.

```text
\d movies
```

And you should see something like this.

![](https://i.imgur.com/bIqxevs.png)

As you can see, the `movies` table has the above columns. Each column must contain data that matches a particular data type.

### What is a Primary Key?

It denotes an attribute on a table that can uniquely identify the row.  What is a similar property on a mongo db?

### What does SERIAL Do?

The `SERIAL` attribute creates a hidden integer value that starts with `1` by default. When an entity without an `id` attribute is inserted into the table, the entity is given the current integer value for its `id` attribute. Then, the next integer value is calculated by incrementing it by `1`. When an entity is deleted from the table, it integer value of the `id` attribute is not reused. Therefore, each entity in the table is guaranteed to have a unique `id` attribute for all time. Almost every table you create will have a `SERIAL` `id` attribute.

### Data Types

Similar to how Ruby or Javascript has types of data, SQL defines types that can be stored in the DB. Here are some common ones:

* Serial
* Integer
* Numeric // Numbers are exact, no rounding error
* Float // Rounding error is possible, but operations are faster than Numeric
* Text, Varchar
* Timestamp
* Boolean (True or False)

Let's look at the Postgres docs for __[creating a table](https://www.postgresql.org/docs/current/static/sql-createtable.html).__

Let's say we no longer need the movies table from above, to get rid of all of the data and the definition of the table, we can use the DROP statement.  Here are the [docs on DROP](https://www.postgresql.org/docs/current/static/sql-droptable.html).

```sql
ALTER TABLE movies ADD COLUMN plot TEXT;
```

```sql
ALTER TABLE movies RENAME COLUMN plot TO summary;
```

```sql
ALTER TABLE movies ALTER COLUMN summary TYPE VARCHAR(100);
```

```sql
ALTER TABLE movies DROP COLUMN summary;
```

```sql
DROP TABLE movies;
```

### Exercise

Design a table for a movie database. Discuss a few things that a movie table may have. Choose the appropriate data type for the data. Make the CREATE TABLE command and execute it in psql. Use `\dt` to verify that the table was created. Once you're satisfied that the table is there, get rid of it using the DROP TABLE command. Use `\dt` again to make sure that the table has been dropped.

## How do you use the PostgreSQL REPL to manage rows in a table?

The CRUD operations correspond to the following SQL commands.

| CRUD operations | SQL commands |
|-----------------|--------------|
| Create          | `INSERT`     |
| Read            | `SELECT`     |
| Update          | `UPDATE`     |
| Destroy         | `DELETE`     |

Stands for Create, Read, Update and Destroy.  This is the lifecycle of data in an applicatoin.  In SQL, CRUD can be mapped to the following __INSERT, SELECT, UPDATE, DELETE__.

## How do you create a row in a table?

The INSERT SQL command adds new rows to a table. Here are the [postgres docs on INSERT](https://www.postgresql.org/docs/current/static/sql-insert.html).

First, let's create a new table to store movie data:

```sql
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    rating INTEGER
);
```

Below is an example INSERT command. It inserts a new row of data that has values for title and rating into our movies table.

```sql
INSERT INTO movies (title, rating) VALUES ('Batman Begins', 10);
```

Our new row of data will look something like this:

| id | title         | description | rating |
|----|---------------|-------------|--------|
| 1  | Batman Begins |             | 10     |

Even though we did not specify an id, one was created anyways. Since we have set the data type of the `id` column to `serial`, postgres automatically set the value for us.

## How do you read a row in a table?

A select statement allows you to get data from the database. Here are the [docs on select](https://www.postgresql.org/docs/current/static/sql-select.html). Also, postgres a good [tutorial on select](https://www.postgresql.org/docs/current/static/tutorial-select.html). I'd recommend looking at the tutorial sometime after the lesson.

First, let's populate our movies table with a few more movies:

```sql
INSERT INTO movies (title, description, rating) VALUES('Cars', 'Pixar movie', 7);
INSERT INTO movies (title, description, rating) VALUES('Back to the Future', 'No one calls Marty chicken', 9);
INSERT INTO movies (title, description, rating) VALUES('Dude Wheres My Car', 'probably a bad movie', 3);
INSERT INTO movies (title, description, rating) VALUES('Godfather', 'good movie', 10);
INSERT INTO movies (title, description, rating) VALUES('Mystic River', 'did not see it', 7);
INSERT INTO movies (title, description, rating) VALUES('Argo', 'Ben Affleck is a hero', 7);
INSERT INTO movies (title, description, rating) VALUES('Gigli', 'really bad movie', 1);
INSERT INTO movies (title, description, rating) VALUES('Sharknado', 'Instant classic', 10);
INSERT INTO movies (title, description, rating) VALUES('Jurassic World', 'Chris Pratt trains raptors', 5);
INSERT INTO movies (title, description, rating) VALUES('Mad Max: Fury Road', 'Water is low, similar to california', 7);
```

This will select all the attributes from the movies table unconditionally. Make sure not to forget the ; at the end of the state. In SQL, semicolons are required to terminate statements.

```sql
SELECT * FROM movies;
```

You should see an output that looks similar to this:

| id |       title        |             description             | rating |
|----|--------------------|-------------------------------------|--------|
|  1 | Batman Begins      |                                     |     10 |
|  2 | Cars               | Pixar movie                         |      7 |
|  3 | Back to the Future | No one calls Marty chicken          |      9 |
|  4 | Dude Wheres My Car | probably a bad movie                |      3 |
|  5 | Godfather          | good movie                          |     10 |
|  6 | Mystic River       | did not see it                      |      7 |
|  7 | Argo               | Ben Affleck is a hero               |      7 |
|  8 | Gigli              | really bad movie                    |      1 |
|  9 | Sharknado          | Instant classic                     |     10 |
| 10 | Jurassic World     | Chris Pratt trains raptors          |      5 |
| 11 | Mad Max: Fury Road | Water is low, similar to california |      7 |


We may not want all of the attributes though. Let's say instead we only care about the titles of the movie and the description. (In production applications, we typically want to specify the columns that are required rather than doing a `select *`). Here is how we'd build that query:

```sql
SELECT title, description FROM movies;
```

This should return:

| title        |             description             |
|-------------------|-------------------------------------|
| Batman Begins      | |
| Cars               | Pixar movie |
| Back to the Future | No one calls Marty chicken |
| Dude Wheres My Car | probably a bad movie |
| Godfather          | good movie |
| Mystic River       | did not see it |
| Argo               | Ben Affleck is a hero |
| Gigli              | really bad movie |
| Sharknado          | Instant classic |
| Jurassic World     | Chris Pratt trains raptors |
| Mad Max: Fury Road | Water is low, similar to california |

What if we wanted to only select movies that are good? We could add a condition to our query, like:

```sql
SELECT title FROM movies WHERE rating > 4;
```

|       title        |
|--------------------|
| Batman Begins |
| Cars |
| Back to the Future |
| Godfather |
| Mystic River |
| Argo |
| Sharknado |
| Jurassic World |
| Mad Max: Fury Road |

You can also have more complex queries to get data. The following query finds all the movies with a rating greater than 4 and with a title of Cars.

```sql
SELECT title FROM movies WHERE rating > 4 AND title = 'Cars';
```

| title |
|-------|
| Cars |


SQL also supports an OR statement. The following query will return any movie with a rating greater than 4, or any movies with the title Gigli. In other words, every record that matches _one_ of the criteria will be returned.

```sql
SELECT title FROM movies WHERE rating > 4 OR title = 'Gigli';
```
| title |
|-------|
| Batman Begins |
| Cars |
| Back to the Future |
| Godfather |
| Mystic River |
| Argo |
| Gigli |
| Sharknado |
| Jurassic World |
| Mad Max: Fury Road |

In addition to filtering rows, we can also let postgres sort out data for us. What if we wanted our movies returned in order from the best to the worst?

```sql
SELECT title, rating FROM movies ORDER BY rating DESC;
```

|       title        | rating  |
|--------------------|--------|
| Godfather          |     10 |
| Batman Begins      |     10 |
| Sharknado          |     10 |
| Back to the Future |      9 |
| Mad Max: Fury Road |      7 |
| Cars               |      7 |
| Mystic River       |      7 |
| Argo               |      7 |
| Jurassic World     |      5 |
| Dude Wheres My Car |      3 |
| Gigli              |      1 |

The `DESC` keyword here tells postgres to sort these in descending order. If we wanted to instead have them sorted from worst to best, we could use ASC like this:

```sql
SELECT title, rating FROM movies ORDER BY rating ASC;
```

|       title        | rating  |
|--------------------|--------|
| Gigli              |      1 |
| Dude Wheres My Car |      3 |
| Jurassic World     |      5 |
| Argo               |      7 |
| Mad Max: Fury Road |      7 |
| Cars               |      7 |
| Mystic River       |      7 |
| Back to the Future |      9 |
| Godfather          |     10 |
| Sharknado          |     10 |
| Batman Begins      |     10 |

__IMPORTANT NOTE:__ If no order by clause is specified, the database does not give any guarantees on what order your data will be returned in. At times it may seem like data you are getting back is in sorted order, but make sure not to rely on that in your code.

What if we only want a few of the records? We can append a `LIMIT` condition onto the end of our query like so:

```sql
SELECT title, rating FROM movies ORDER BY rating DESC LIMIT 5;
```

|       title        | rating |
|--------------------|--------|
| Godfather          |     10 |
| Sharknado          |     10 |
| Batman Begins      |     10 |
| Back to the Future |      9 |
| Mystic River       |      7 |

### Exercises

* Write a query on the movie table to return the worst movie of all time.  There should be only 1 result returned.  The result should include the title, description and rating of the movie.
* Write a query that returns Gigli and Mad Max: Fury Road
* Write a query that returns the id and title of the first 5 movies inserted into the database.
* Write a query to get all of the average movies from the table.  Average is defined as a rating between 4 and 7 inclusive.

## How do you update a row in a table?

The update statement is defined [here](https://www.postgresql.org/docs/current/static/sql-update.html) in the postgres docs.  It is used to change existing data in our database.

For example, if we do not think Gigli was actually that bad, and we want to change the rating to a 2, we can use an update statement:

```sql
UPDATE movies SET rating=2 WHERE title='Gigli';
```

### Exercise

You are a harsh critic and don't feel like any of these movies are worthy of a 10. Write an update query that downgrades all of the 10s in our database to 9s.

## How do you destroy a row in a table?

Deleting works similarly to a select statement.  Here are the [docs on delete](https://www.postgresql.org/docs/current/static/sql-delete.html)

The statement below deletes the Dude Wheres My Car row from the database:

```sql
DELETE FROM movies WHERE title='Dude Wheres My Car';
```

We could also chain together multiple conditions like so:

```sql
DELETE FROM movies WHERE id < 9 AND rating = 2;
```

## Homework

[Intro SQL Exercise](https://github.com/gSchool/intro_sql_exercise)

## Resources

- [Homebrew Services](https://github.com/Homebrew/homebrew-services)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/static/)
- [SQL Tutorial - Home](http://www.sqltutorial.org/)
- [SQL Tutorial - SQL Cheatsheet](http://www.sqltutorial.org/wp-content/uploads/2016/04/sqlcheatsheet.pdf)
- [W3Schools - SQL Tutorial](http://www.w3schools.com/sql/default.asp)

## Videos

### Relational Databases

<iframe src="https://player.vimeo.com/video/142036155" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[relational-arch]: https://upload.wikimedia.org/wikipedia/commons/5/57/RDBMS_structure.png
