## Objectives

- Explain the difference between data and information.
- Explain what an entity is.
- Diagram how a server-side web applications manage information.
- Explain what a relational database system is.
- Explain why a relational database system so useful.
- Explain what SQL is.
- Explain what PostgreSQL is.
- Install PostgreSQL using Homebrew.
- Start a PostgreSQL server using Homebrew Services.
- Use the PostgreSQL command line tools to manage databases in a PostgreSQL cluster.
- Use the PostgreSQL REPL to manage databases in a PostgreSQL cluster.
- Use the PostgreSQL REPL to manage tables in a database.
- Use the PostgreSQL REPL to manage rows in a table.

## What's the difference between data and information?

Before you can become fluent with a database system like PostgreSQL, you first need become fluent with the difference between data and information. Simply put, **data** are facts. Here are some examples of data, represented in JavaScript.

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

Turn to a neighbor and consider how you'd describe a `pet` entity. Think of at least five pieces of information that are essential for being a pet.

Using this information, create a JavaScript object that represents one instance of a `pet` entity. Then, create a table, like the one above, to represent the same `pet` entity.

## How do server-side web applications manage information?

Imagine you're building a web application for movie fanatics called Movie Junkies. The product development team has determined that a true movie fanatic must be able to create a `movie` entity using the web app. After all, a user can't retrieve information that doesn't exist. Therefore, your first job will be to build a server-side web application that can handle the following RESTful HTTP request.

```shell
http POST moviejunkies.com/movies title=Frozen duration=102 rated=PG genre=Animation is3D=true releasedAt='2013-11-27 00:00:00 UTC' score=7.6
```

Additionally, the product development team has determined that a true movie fanatic must also be able to read a `movie` entity using the web app. After all, a user can't create information and never look at it again. Therefore, your second job will be to augment the same server-side web application with the ability to handle the following RESTful HTTP request as well.

```shell
http GET moviejunkies.com/movies/1
```

Finally, the product development team has determined that the movie information needs to be persisted somewhere resilient. The user doesn't care how the information is persisted, so long as he or she can create or read `movie` entities even if the web application is restarted due to maintenance or unforeseen outages. Therefore, your third job will be to augment the same server-side web application with the ability to persist the information resiliently.

In this course, you've learned how a server-side web application can manage information persisted to a JSON file. So based on our product's requirements and your experience working with JSON files, let's look at a diagram of a server-side web application handling the above HTTP requests and responses with a JSON file.

[INSERT HTTP CLIENT-SERVER DIAGRAM WITH A JSON FILE]

Let's look at another diagram, this time of a server-side web application handling the above HTTP requests and responses with a database system.

[INSERT HTTP CLIENT-SERVER DIAGRAM WITH A DBMS]

In a development environment, the server-side web application and its companion database system often live on the same machine. However, in a production environment, the two systems often live on different machines to maximum the performance of each.

### Exercise

Take a few moments to diagram how server-side web applications manage information using a database system.

Once you've finished, turn to a neighbor and explain how information flows throw the two systems. Then, explain how information stays at rest when either of the two systems are turned off.

## What's a relational database system?

A **relational database system**, or relational database management system (RDBMS), is a database system that's based on the relational model. The **relational model** is an approach to managing information in a table (i.e. relation) structure, where an entity is represented as a row and its attributes are represented as columns. For example, here's a `movies` table that contains some movie entities.

```text
 id |       title        | duration | rated |   genre   | is_3d |      released_at       | score
----+--------------------+----------+-------+-----------+-------+------------------------+-------
  1 | Frozen             |      102 | PG    | Animation | t     | 2013-11-26 16:00:00-08 |   7.6
  2 | X-Men: Apocalypse  |      144 | PG-13 | Action    | t     | 2016-05-26 16:00:00-08 |   7.4
  3 | The Princess Bride |       98 | PG    | Adventure | f     | 1987-10-08 16:00:00-08 |   8.1
  4 | Pulp Fiction       |      154 | R     | Crime     | f     | 1994-10-13 16:00:00-08 |   8.9
```

In a relational database system, all values in the same column must be the same data type. For example, here are the data types of the columns for the above `movies` table.

| Column        | Database type | JavaScript type |
|---------------|---------------|-----------------|
| `id`          | `integer`     | `Number`        |
| `title`       | `text`        | `String`        |
| `duration`    | `integer`     | `Number`        |
| `rated`       | `varchar`     | `String`        |
| `genre`       | `text`        | `String`        |
| `is_3d`       | `boolean`     | `Boolean`       |
| `released_at` | `timestamp`   | `Date`          |
| `score`       | `numeric`     | `Number`        |

### Exercise

In your own words, write down what a relational database system means to you. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## Why is a relational database system so useful?

Using the Movie Junkies example from earlier, imagine the product development team has determined that a true movie fanatic wants to know about every award a `movie` entity has received. Specifically, users want to know the award's name, kind, when the movie received it. One way to solve this is to add more columns to the `movies` table. Here's an example what that might look like.

```text
 id | title  | duration | rated |   genre   | is_3d |      released_at       | score |                              award_name                              | award_kind |   award_received_at
----+--------+----------+-------+-----------+-------+------------------------+-------+----------------------------------------------------------------------+------------+------------------------
  1 | Frozen |      102 | PG    | Animation | t     | 2013-11-26 16:00:00-08 |   7.6 | Best Animated Feature Film of the Year                               | Oscar      | 2014-03-01 16:00:00-08
  1 | Frozen |      102 | PG    | Animation | t     | 2013-11-26 16:00:00-08 |   7.6 | Best Achievement in Music Written for Motion Pictures, Original Song | Oscar      | 2014-03-01 16:00:00-08
```

While this certainly solves the problem, another one is created. There's duplicate information in the form of multiple rows. And wherever there's duplicate information, there's the possibility for inconsistencies to arise. For example, imagine the Frozen movie is recategorized as a `'Comedy'`. Given the current structure, that would require changing information inside of multiple rows.

With a relational database system, a better way to track a movie's awards is with a separate `awards` table with `name`, `kind`, and `received_at` columns. But in order to relate an `award` entity to a `movie` entity, an extra `movie_id` column is required. Here's an example of what that might look like.

```text
 id | movie_id | kind  |                                 name                                 |      received_at
----+----------+-------+----------------------------------------------------------------------+------------------------
  1 |        1 | Oscar | Best Animated Feature Film of the Year                               | 2014-03-01 16:00:00-08
  2 |        1 | Oscar | Best Achievement in Music Written for Motion Pictures, Original Song | 2014-03-01 16:00:00-08
```

Now, a change to a movie's genre only requires a change to one record.

```text
 id | title  | duration | rated |   genre   | is_3d |      released_at       | score
----+--------+----------+-------+-----------+-------+------------------------+-------
  1 | Frozen |      102 | PG    | Comedy    | t     | 2013-11-26 16:00:00-08 |   7.6
```

Since the 1970s, relational database systems have been used to manage all kinds of information—financial, manufacturing, logistical, personal, government, communication, public, private, and so on. By structuring information into tables with rows and columns, computers can quickly and efficiently store and retrieve insanely large amounts data.

### Exercise

In your own words, write down why relational databases are so useful. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## What's SQL?

In most modern relational database systems, tables and rows are managed with a special-purpose programming language called Structured Query Language (**SQL**). SQL consists of three distinctive languages.

1. A data definition language (DDL) for managing tables.
1. A data manipulation language (DML) for managing rows.
1. A data control language (DCL) for managing permissions to the tables and rows.

In this course, we'll only be focusing on the data definition and data manipulation languages of SQL. Here's an example of a data definition command in SQL.

```sql
CREATE TABLE movies (
  id serial PRIMARY KEY,
  title text,
  duration integer,
  rated varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);
```

**NOTE:** This is an example of a SQL command split up on multiple lines.

And here are a few examples of data manipulation commands in SQL.

```sql
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('Frozen', 102, 'PG', 'Animation', TRUE, '2013-11-27 00:00:00 UTC', 7.6);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('X-Men: Apocalypse', 144, 'PG-13', 'Action', TRUE, '2016-05-27 00:00:00 UTC', 7.4);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('The Princess Bride', 98, 'PG', 'Adventure', FALSE, '1987-10-09 00:00:00 UTC', 8.1);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('Pulp Fiction', 154, 'R', 'Crime', FALSE, '1994-10-14 00:00:00 UTC', 8.9);
```

**NOTE:** These are examples of SQL commands on a single line. Each one could have been split up on multiple lines.

SQL became an official standard in the mid-1980's. Since then, it has been revised a few times to include a growing set of features. Despite the existence of such standards, most SQL code is not completely portable between different relational database systems without adjustments. The following are popular open source relational database systems that implement the SQL standard.

- MySQL
- PostgreSQL
- SQLite

Whereas the following are popular closed source relational database systems that implement the SQL standard.

- Microsoft Access
- Microsoft SQL Server
- Oracle

### Exercise

In your own words, write down what SQL means to you. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## What's PostgreSQL?

**PostgreSQL** is a powerful, open source relational database system that's been around since 1996. It has a strong reputation for reliability, data integrity, and correctness. PostgreSQL runs on all major operating systems, including Linux, Mac OS X, and Windows. In addition, PostgreSQL has native interfaces for a number of programming languages, including JavaScript, and is known for its [exceptional documentation](https://www.postgresql.org/docs/current/static/).

PostgreSQL is fully ACID (atomicity, consistency, isolation, durability) compliant and has a vast amount of [built-in data types](https://www.postgresql.org/docs/current/static/datatype.html#DATATYPE-TABLE). The most common of these data types include the following.

- `boolean`
- `character` (`char`)
- `character varying` (`varchar`)
- `integer`
- `json`
- `numeric`
- `serial`
- `text`
- `timestamp`

PostgreSQL is a sophisticated relational database system. To become fluent in PostgreSQL means to become fluent in all its moving parts. Here's a brief rundown the major moving parts of PostgreSQL.

1. A database server manages a database cluster.
1. A database client connects to a database server.
1. A database client sends SQL commands to a database server.
1. A database server sends rows of information back to a database client.
1. A single database cluster often contains multiple databases.
1. A single database often contains multiple tables.
1. A single table often contains multiple rows of information.
1. Rows are automatically persisted to the hard disk by the database server.

[INSERT DATABASE CLIENT-SERVER DIAGRAM]

For example, the Movie Junkies web application from earlier might use a database cluster that contains two databases: a `movie_junkies_dev` database for the development environment and `movie_junkies_test` database for the test environment. A database server is started to manage this database cluster. Then a database client connects to the database server and begins sending SQL commands to the server in order to store or retrieve information from the database cluster.

### Exercise

In your own words, write down what PostgreSQL means to you. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

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

## How do you use the PostgreSQL command line tools to manage databases in a PostgreSQL cluster?

Now that a PostgreSQL server running, you can use a variety of command line tools to manage the default PostgreSQL cluster. To list out all the databases in the default cluster, run the following command.

```shell
psql -l
```

And you should see something like this.

![](https://i.imgur.com/57ZyROA.png)

As you can see, there are already a few databases inside the default PostgreSQL cluster. These were created when the cluster was initialized

The `postgres` database is meant to be the default database for users and applications. You can use it as a scratch pad when you're experimenting with new database concepts.

When a new database is created, it's actually a copy of the `template0` and `template1` databases. So it's a good idea to leave these alone. See the [Template Databases](https://www.postgresql.org/docs/current/static/manage-ag-templatedbs.html) article in the PostgreSQL documentation to learn more about them.

Additionally, the default encoding of a PostgreSQL database is `UTF8`. Using the same character encoding throughout your web application is essential for preventing data corruption. You can safely ignore the `Collate`, `Ctype`, and `Access Priviledges` columns for now.

Most database-driven web applications use multiple databases, one for each environment. To create a database for the fictitious Movie Junkies web application from earlier, run the following command.

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

The PostgreSQL REPL accepts both REPL commands and SQL commands. You can tell the difference between the two because REPL commands start with a backslash `\` and SQL commands end with a semicolon `;`. In a moment, you'll see some examples of both.

Before you get started with the PostgreSQL REPL, download and install some configuration for your instructors created for it by running the following command.

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

It should be the exact same output as running the `psql -l` command line tool. To create a database for the test environment of the fictitious Movie Junkies web application, run the following SQL command.

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

To verify the database was dropped, check the list of databases again.

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
  id serial PRIMARY KEY,
  title text,
  duration integer,
  rated varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);
```

And you should see something like this.

![](https://i.imgur.com/sxhR7RL.png)

The above `CREATE TABLE` command is an example a multi-line SQL command. Notice how the yellow equals sign `=` of the prompt changed to a yellow open parenthesis sign `(`. This is a clue that the PostgreSQL REPL was waiting for the SQL command to provide a matching close parenthesis `)`.

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

| Name                                 | Storage Size | Description                               | Range                          |
|--------------------------------------|--------------|-------------------------------------------|--------------------------------|
| `boolean`                            | 1 byte       | true or false                             | N/A                            |
| `integer`	                           | 4 bytes      | typical choice for integer                | `-2147483648` to `+2147483647` |
| `numeric`	                           | variable     | typical choice for decimal                | exact	up to 131,072 digits before the decimal point; up to 16,383 digits after the decimal point |
| `timestamp, with time zone`           | 8 bytes      | both date and time, with time zone        | 4713 BC to 294276 AD           |
| `character varying(n)`, `varchar(n)` | variable     | variable-length string with limit         | N/A                            |
| `character(n)`, `char(n)`            | variable     | fixed-length string, blank padded         | N/A                            |
| `text`                               | variable     | variable-length string, unlimited length  | N/A                            |

### `serial`

The `serial` data type creates a hidden integer value that starts with `1` by default. When an entity without an `id` value is inserted into the table, the entity is given the current integer value for its `id` attribute. Then, the next integer value is calculated by incrementing it by `1`. When an entity is deleted from the table, it integer value of the `id` attribute is not reused. Therefore, each entity in the table is guaranteed to have a unique `id` attribute for all time. Almost every table you create will have an `id serial` column.

### `text`

### `varchar`

### `integer`

### `numeric`

### `boolean`

`NOT NULL`

### `timestamp with time zone`


### `PRIMARY KEY`

It denotes an attribute on a table that can uniquely identify the row.

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

See the following articles in the PostgreSQL documentation to learn more.

- [`CREATE TABLE` article](https://www.postgresql.org/docs/current/static/sql-createtable.html)
- [`ALTER TABLE` article](https://www.postgresql.org/docs/current/static/sql-altertable.html)
- [`DROP TABLE` article](https://www.postgresql.org/docs/current/static/sql-droptable.html)

### Exercise

Design a table for a movie database. Discuss a few things that a movie table may have. Choose the appropriate data type for the data. Make the CREATE TABLE command and execute it in psql. Use `\dt` to verify that the table was created. Once you're satisfied that the table is there, get rid of it using the DROP TABLE command. Use `\dt` again to make sure that the table has been dropped.

## How do you use the PostgreSQL REPL to manage rows in a table?

The `INSERT` SQL command creates new rows in a table. In insert a row into the `movies` table, run the following command.

```sql
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('Frozen', 102, 'PG', 'Animation', TRUE, '2013-11-27 00:00:00 UTC', 7.6);
```

And you should see something like this.

![](https://i.imgur.com/lnOaIfg.png)

Although it wasn't specified, an integer value was given to the newly inserted row's `id` attribute because it's a `serial` column. Insert a few more rows into the `movies` table by running the following commands.

```sql
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('X-Men: Apocalypse', 144, 'PG-13', 'Action', TRUE, '2016-05-27 00:00:00 UTC', 7.4);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('The Princess Bride', 98, 'PG', 'Adventure', FALSE, '1987-10-09 00:00:00 UTC', 8.1);
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('Pulp Fiction', 154, 'R', 'Crime', FALSE, '1994-10-14 00:00:00 UTC', 8.9);
```

And you should see something like this.

![](https://i.imgur.com/jbIGAR3.png)

Notice how long it took to insert these rows.

A `SELECT` SQL command retrieves rows from a table. To select all the rows and columns from the `movies` table, run the following command.

```sql
SELECT * FROM movies;
```

And you should see something like this.

![](https://i.imgur.com/uN4sHgE.png)

Notice how long it took to select these rows.

Often a user only cares about a few columns. To select all the rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT title, genre FROM movies;
```

And you should see something like this.

![](https://i.imgur.com/egpWxyz.png)

Often a user only cares about a few rows. To select a few rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT title, genre FROM movies WHERE score > 8;
```

And you should see something like this.

![](https://i.imgur.com/WvJ23mc.png)

Often a user only cares about even fewer rows. To select even fewer rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT title, genre FROM movies WHERE score > 8 AND rated = 'PG';
```

And you should see someting like this.

![](https://i.imgur.com/P8EsB9W.png)

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

The `UPDATE` SQL command used to change existing data in our database.

For example, if we do not think Gigli was actually that bad, and we want to change the rating to a 2, we can use an update statement:

```sql
UPDATE movies SET rating=2 WHERE title='Gigli';
```

Deleting works similarly to a select statement.

The statement below deletes the Dude Wheres My Car row from the database:

```sql
DELETE FROM movies WHERE title='Dude Wheres My Car';
```

We could also chain together multiple conditions like so:

```sql
DELETE FROM movies WHERE id < 9 AND rating = 2;
```

See the following articles in the PostgreSQL documentation to learn more.

- [`INSERT` article](https://www.postgresql.org/docs/current/static/sql-insert.html)
- [`SELECT` article](https://www.postgresql.org/docs/current/static/sql-select.html).
- [`UPDATE` article](https://www.postgresql.org/docs/current/static/sql-update.html)
- [`DELETE` article](https://www.postgresql.org/docs/current/static/sql-delete.html)

### Exercises

* Write a query on the movie table to return the worst movie of all time.  There should be only 1 result returned.  The result should include the title, description and rating of the movie.
* Write a query that returns Gigli and Mad Max: Fury Road
* Write a query that returns the id and title of the first 5 movies inserted into the database.
* Write a query to get all of the average movies from the table.  Average is defined as a rating between 4 and 7 inclusive.

You are a harsh critic and don't feel like any of these movies are worthy of a 10. Write an update query that downgrades all of the 10s in our database to 9s.

## Assignment

- [Intro SQL Exercise](https://github.com/gSchool/intro_sql_exercise)

## Resources

- [Homebrew Services](https://github.com/Homebrew/homebrew-services)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/static/)
- [PostgreSQL Documentation - Querying a Table](https://www.postgresql.org/docs/current/static/tutorial-select.html)
- [SQL Tutorial - Home](http://www.sqltutorial.org/)
- [SQL Tutorial - SQL Cheatsheet](http://www.sqltutorial.org/wp-content/uploads/2016/04/sqlcheatsheet.pdf)
- [W3Schools - SQL Tutorial](http://www.w3schools.com/sql/default.asp)

## Videos

### Relational Databases

<iframe src="https://player.vimeo.com/video/142036155" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[relational-arch]: https://upload.wikimedia.org/wikipedia/commons/5/57/RDBMS_structure.png
