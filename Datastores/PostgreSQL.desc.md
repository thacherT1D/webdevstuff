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

Before you can become fluent with a database system like PostgreSQL, you first need to become fluent with the difference between data and information. Simply put, **data** are facts. Here are some examples of data, represented in JavaScript.

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
  rating: 'PG',
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

In the above example, the `movie` object is called an entity. An **entity** is an object that represents a person, place, or thing. As you can see from the table below, this `movie` entity has a handful of attributes. An **attribute** is a piece of information that describes an entity.

| `id` | `title`    | `duration` | `rating` | `genre`       | `is_3d`     | `released_at`                         | `score` |
|------|------------|------------|----------|---------------|-------------|---------------------------------------|---------|
| `1`  | `'Frozen'` | `102`      | `'PG'`   | `'Animation'` | `true`      | `new Date('2013-11-27 00:00:00 UTC')` | `7.6`   |

**NOTE:** In table form, attribute names are often displayed in snakecase because unquoted identifiers like `releasted_at` are case insensitive in PostgreSQL.

### Exercise

Turn to a neighbor and consider how you'd describe a `pet` entity. Think of at least five pieces of information that are essential for being a pet.

Using this information, create a JavaScript object that represents one instance of a `pet` entity. Then, create a table, like the one above, to represent the same `pet` entity.

## How do server-side web applications manage information?

Imagine you're building a web application for movie fanatics called Movie Junkies. The product development team has determined that a true movie fanatic must be able to create a `movie` entity using the web app. After all, a user can't retrieve information that doesn't exist. Therefore, your first job will be to build a server-side web application that can handle the following RESTful HTTP request.

```shell
http POST moviejunkies.com/movies title=Frozen duration=102 rating=PG genre=Animation is3D=true releasedAt='2013-11-27 00:00:00 UTC' score=7.6
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

A **relational database system**, or relational database management system (RDBMS), is a database system that's based on the relational model. The **relational model** is an approach to managing information in a table structure (i.e. relation), where an entity is represented as a row and its attributes are represented as columns. For example, here's a `movies` table that contains some movie entities.

```text
 id |       title        | duration | rating |   genre   | is_3d |      released_at       | score
----+--------------------+----------+--------+-----------+-------+------------------------+-------
  1 | Frozen             |      102 | PG     | Animation | t     | 2013-11-26 16:00:00-08 |   7.6
  2 | X-Men: Apocalypse  |      144 | PG-13  | Action    | t     | 2016-05-26 16:00:00-08 |   7.4
  3 | The Princess Bride |       98 | PG     | Adventure | f     | 1987-10-08 16:00:00-08 |   8.1
  4 | Pulp Fiction       |      154 | R      | Crime     | f     | 1994-10-13 16:00:00-08 |   8.9
```

In a relational database system, all values in the same column must be the same data type. For example, here are the data types of the columns for the above `movies` table.

| Column        | Database type | JavaScript type |
|---------------|---------------|-----------------|
| `id`          | `integer`     | `Number`        |
| `title`       | `text`        | `String`        |
| `duration`    | `integer`     | `Number`        |
| `rating`      | `varchar`     | `String`        |
| `genre`       | `text`        | `String`        |
| `is_3d`       | `boolean`     | `Boolean`       |
| `released_at` | `timestamp`   | `Date`          |
| `score`       | `numeric`     | `Number`        |

### Exercise

In your own words, write down what a relational database system means to you. After about 30 seconds, your instructor will cold call on the class and ask what was written down.

## Why is a relational database system so useful?

Using the Movie Junkies example from earlier, imagine the product development team has determined that a true movie fanatic wants to know about every award a `movie` entity has received. Specifically, users want to know the award's kind, name, when the movie received it. One way to solve this is to add more columns to the `movies` table. Here's an example what that might look like.

```text
 id | title  | duration | rating |   genre   | is_3d |      released_at       | score | award_kind |                              award_name                              |   award_received_at
----+--------+----------+--------+-----------+-------+------------------------+-------+------------+----------------------------------------------------------------------+------------------------
  1 | Frozen |      102 | PG     | Animation | t     | 2013-11-26 16:00:00-08 |   7.6 | Oscar      | Best Animated Feature Film of the Year                               | 2014-03-01 16:00:00-08
  2 | Frozen |      102 | PG     | Animation | t     | 2013-11-26 16:00:00-08 |   7.6 | Oscar      | Best Achievement in Music Written for Motion Pictures, Original Song | 2014-03-01 16:00:00-08
```

While this certainly solves the problem, another one is created. There's duplicate information in the form of multiple rows. And wherever there's duplicate information, there's the possibility for inconsistencies to arise. For example, imagine the Frozen movie is recategorized as a `'Comedy'`. Given the current structure, that would require changing information inside of multiple rows.

With a relational database system, a better way to track a movie's awards is with a separate `awards` table with `kind`, `name`, and `received_at` columns. But in order to relate an `award` entity to a `movie` entity, an extra `movie_id` column is required. Here's an example of what that might look like.

```text
 id | movie_id | kind  |                                 name                                 |      received_at
----+----------+-------+----------------------------------------------------------------------+------------------------
  1 |        1 | Oscar | Best Animated Feature Film of the Year                               | 2014-03-01 16:00:00-08
  2 |        1 | Oscar | Best Achievement in Music Written for Motion Pictures, Original Song | 2014-03-01 16:00:00-08
```

Now, a change to a movie's genre only requires a change to one record.

```text
 id | title  | duration | rating |   genre   | is_3d |      released_at       | score
----+--------+----------+--------+-----------+-------+------------------------+-------
  1 | Frozen |      102 | PG     | Comedy    | t     | 2013-11-26 16:00:00-08 |   7.6
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
  id serial,
  title text,
  duration integer,
  rating varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);
```

**NOTE:** This is an example of a SQL command split up on multiple lines.

And here are a few examples of data manipulation commands in SQL.

```sql
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('Frozen', 102, 'PG', 'Animation', TRUE, '2013-11-27 00:00:00 UTC', 7.6);
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('X-Men: Apocalypse', 144, 'PG-13', 'Action', TRUE, '2016-05-27 00:00:00 UTC', 7.4);
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('The Princess Bride', 98, 'PG', 'Adventure', FALSE, '1987-10-09 00:00:00 UTC', 8.1);
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('Pulp Fiction', 154, 'R', 'Crime', FALSE, '1994-10-14 00:00:00 UTC', 8.9);
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

**NOTE:** When an error is generated by a PostgreSQL server managing this cluster, the error message is logged to a `server.log` file in this directory.

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

Before you get started with the PostgreSQL REPL, download and install some configuration that your instructors have created for you. To do so, run the following command.

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
  id serial,
  title text,
  duration integer,
  rating varchar(10),
  genre text,
  is_3d boolean NOT NULL,
  released_at timestamp with time zone,
  score numeric(3, 1)
);
```

**NOTE:** All SQL commands, like the one above, can be written on a single line. However, it can be useful to split up longer commands onto multiple lines.

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/223/Screen_Shot_2016-06-21_at_5.41.07_AM.png)

The above `CREATE TABLE` command is an example a multi-line SQL command. Notice how the yellow equals sign `=` of the prompt changed to a yellow open parenthesis sign `(`. This is a clue that the PostgreSQL REPL was waiting for the SQL command to provide a matching close parenthesis `)`.

To verify the table was created, display the tables in the current connected database by running the following REPL command.

```text
\dt
```

And you should see something like this.

![](https://i.imgur.com/0geGsbQ.png)

In PostgreSQL, all databases contain a `public` schema which in turn contains tables, among other things. The most important thing to note, however, is that there a `movies` table and it has an owner.

To verify the table was created with the correct columns, run the following command.

```text
\d movies
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/224/Screen_Shot_2016-06-21_at_5.41.22_AM.png)

As you can see, the `movies` table contains a handful of columns. In a relational database system, all values in the same column must be the same data type. For example, a `integer` value can't be stored in a `text` column. This strictness is one of the reasons why a relational database system like PostgreSQL can remain performant while managing a massive collection of information.

Here's an overview of the most common data types in PostgreSQL.

| Name                                 | Storage Size | Description                               | Range                          |
|--------------------------------------|--------------|-------------------------------------------|--------------------------------|
| `boolean`                            | 1 byte       | true or false                             | `t` or `f`                     |
| `integer`	                           | 4 bytes      | Typical choice for integer                | `-2147483648` to `+2147483647` |
| `numeric(precision, scale)`	         | variable     | Typical choice for decimal                | Precise	up to 131,072 digits before the decimal point and up to 16,383 digits after the decimal point |
| `timestamp with time zone`           | 8 bytes      | Date, time, and time zone                 | 4713 BC to 294276 AD           |
| `text`                               | variable     | Variable-length string, unlimited length  | N/A                            |
| `character varying(n)`, `varchar(n)` | variable     | Variable-length string, limited length    | N/A                            |
| `character(n)`, `char(n)`            | variable     | Fixed-length string, blank padded         | N/A                            |

One common data type that's missing from this table is the `serial` data type, which was used earlier for the `id` column of the `movies` table. The reason why it's missing is because the `serial` data type is not a true type. Rather, it's a notational convenience for creating a unique identifier column. When a `serial` column is declared, an `integer` column with a sequence generator and a `NOT NULL` constraint is created instead.

A **sequence generator** is a special, single-row table that's used for generating numbers in sequential order. A `serial` sequence generator starts with value of `1` and increments the value by `1` each time the generator is triggered.

To see the sequence generator for the `id` column of the `movies` table, run the following command.

```text
\d movies_id_seq
```

And you should see something like this.

![](https://i.imgur.com/MYG7YWb.png)

When an entity without an `id` value is inserted into the `movies` table, the column's sequence generator is triggered and the next value is given to the inserted entity's `id` attribute. If the entity is eventually deleted from the table, its `id` value is not reused. Therefore, each entity in the table is guaranteed to have a unique identifier forever. Almost every table you create will have an `id serial` column.

The `serial` type also applies a `NOT NULL` constraint to the column. Like JavaScript, the `NULL` value represents the absence of data. Unless a column is given a `NOT NULL` constraint, the `NULL` value is an acceptable value for any column no matter the data type. While a `serial` column is automatically given a `NOT NULL` constraint, it's wise to manually apply the constraint to `boolean` columns as well. For example, the `NOT NULL` constraint was applied to the `is_3d` column in the `movies` table.

While creating a table with the right columns is important, the structure of a table is not set in stone. For example, as a web application evolves over time, so too can its companion database tables.

To add a column to the `movies` table, run the following command.

```sql
ALTER TABLE movies ADD COLUMN plot text;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/225/Screen_Shot_2016-06-21_at_6.17.36_AM.png)

To verify the column was added correctly, run the following command.

```text
\d movies
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/226/Screen_Shot_2016-06-21_at_6.18.38_AM.png)

To rename a column in the `movies` table, run the following command.

```sql
ALTER TABLE movies RENAME COLUMN plot TO summary;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/227/Screen_Shot_2016-06-21_at_6.19.46_AM.png)

To verify the column was renamed correctly, run the following command.

```text
\d movies
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/228/Screen_Shot_2016-06-21_at_6.20.34_AM.png)

To alter the data type of a column in the `movies` table, run the following command.

```sql
ALTER TABLE movies ALTER COLUMN summary TYPE varchar(255);
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/229/Screen_Shot_2016-06-21_at_6.21.38_AM.png)

To verify the column was renamed correctly, run the following command.

```text
\d movies
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/230/Screen_Shot_2016-06-21_at_6.22.39_AM.png)

To set a `NOT NULL` constraint on a column in the `movies` table, run the following command.

```sql
ALTER TABLE movies ALTER COLUMN summary SET NOT NULL;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/235/Screen_Shot_2016-06-21_at_6.55.23_AM.png)

To verify the constraint was set correctly, run the following command.

```text
\d movies
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/236/Screen_Shot_2016-06-21_at_6.56.30_AM.png)

To drop a column in the `movies` table, run the following command.

```sql
ALTER TABLE movies DROP COLUMN summary;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/231/Screen_Shot_2016-06-21_at_6.23.27_AM.png)

To verify the column was dropped correctly, run the following command.

```text
\d movies
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/224/Screen_Shot_2016-06-21_at_5.41.22_AM.png)

To rename the `movies` table, run the following command.

```sql
ALTER TABLE movies RENAME TO films;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/232/Screen_Shot_2016-06-21_at_6.25.23_AM.png)

To verify the table was renamed correctly, run the following command.

```text
\dt
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/233/Screen_Shot_2016-06-21_at_6.26.56_AM.png)

To drop the `films` table, run the following command.

```sql
DROP TABLE films;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/234/Screen_Shot_2016-06-21_at_6.27.35_AM.png)

To verify the table was dropped, run the following command.

```text
\dt
```

And you should see something like this.

![](https://i.imgur.com/Ypfh2EV.png)

Believe it or not, but there's a ton more you can do to manage tables. See the following articles in the PostgreSQL documentation to learn more about the commands you practiced in this section.

- [PostgreSQL Documentation - Data Types](https://www.postgresql.org/docs/current/static/datatype.html)
- [PostgreSQL Documentation - `CREATE TABLE`](https://www.postgresql.org/docs/current/static/sql-createtable.html)
- [PostgreSQL Documentation - `ALTER TABLE`](https://www.postgresql.org/docs/current/static/sql-altertable.html)
- [PostgreSQL Documentation - `DROP TABLE`](https://www.postgresql.org/docs/current/static/sql-droptable.html)

### Exercise

A **migration** is a file that contains SQL commands that are used to recreate the tables in a database on demand. In a `migration.sql` file, type out the `CREATE TABLE movies` SQL command from above. Then, add a `DROP TABLE` command at the top of the file so you can repeatedly execute the commands. Using the PostgreSQL documentation, figure how to prevent the `DROP TABLE` command from generating an error if the table doesn't exist.

To migrate the `movie_junkies_dev` database, run the following command from your shell.

```shell
psql movie_junkies_dev -f migration.sql
```

Iterate on your migration file until you can repeatedly run it without generating an error. Then, add the necessary SQL commands to migrate an `awards` table as well. Create this table with the necessary columns to support the following entities.

```text
 id | movie_id | kind  |                                 name                                 |      received_at
----+----------+-------+----------------------------------------------------------------------+------------------------
  1 |        1 | Oscar | Best Animated Feature Film of the Year                               | 2014-03-01 16:00:00-08
  2 |        1 | Oscar | Best Achievement in Music Written for Motion Pictures, Original Song | 2014-03-01 16:00:00-08
```

For each column, choose what you think is the most appropriate data type. When you're finished, migrate the database and use `\dt` REPL command to verify that the table was created correctly.

Finally, add an `ALTER TABLE` command to bottom of the migration file that'll add a `did_win` column to the `awards` table. This column will be used to track whether or not the movie won the award. Again, choose what you think is the most appropriate data type for this column. When you're finished, migrate the database and use `\dt` REPL command to verify that the table was created correctly.

## How do you use the PostgreSQL REPL to manage rows in a table?

To insert a row into the `movies` table, run the following command.

```sql
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('Frozen', 102, 'PG', 'Animation', TRUE, '2013-11-27 00:00:00 UTC', 7.6);
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/205/Screen_Shot_2016-06-21_at_3.48.34_AM.png)

**NOTE:** The entity was automatically given a unique value for its `id` attribute.

Insert a few more rows into the `movies` table by running the following commands.

```sql
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('X-Men: Apocalypse', 144, 'PG-13', 'Action', TRUE, '2016-05-27 00:00:00 UTC', 7.4);
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('The Princess Bride', 98, 'PG', 'Adventure', FALSE, '1987-10-09 00:00:00 UTC', 8.1);
INSERT INTO movies (title, duration, rating, genre, is_3d, released_at, score) VALUES ('Pulp Fiction', 154, 'R', 'Crime', FALSE, '1994-10-14 00:00:00 UTC', 8.9);
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/206/Screen_Shot_2016-06-21_at_3.49.35_AM.png)

To select all the rows and columns from the `movies` table, run the following command.

```sql
SELECT * FROM movies;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/207/Screen_Shot_2016-06-21_at_3.51.26_AM.png)

To select all the rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title FROM movies;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/220/Screen_Shot_2016-06-21_at_4.22.50_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, rating FROM movies WHERE rating = 'PG';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/219/Screen_Shot_2016-06-21_at_4.21.55_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, rating FROM movies WHERE rating <> 'PG';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/246/Screen_Shot_2016-06-21_at_8.59.12_AM.png)

**NOTE:** The `!=` operator is converted to the `<>` operator.

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, is_3d FROM movies WHERE is_3d IS TRUE;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/247/Screen_Shot_2016-06-21_at_9.20.06_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, is_3d FROM movies WHERE is_3d IS FALSE;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/248/Screen_Shot_2016-06-21_at_9.20.46_AM.png)

**NOTE:** The `IS NULL` and `IS NOT NULL` operators work similarly.

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score FROM movies WHERE score > 8;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/221/Screen_Shot_2016-06-21_at_4.23.30_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score FROM movies WHERE score <= 7.5;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/249/Screen_Shot_2016-06-21_at_9.26.03_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score FROM movies WHERE score BETWEEN 7.5 AND 8;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/250/Screen_Shot_2016-06-21_at_9.26.57_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score, rating FROM movies WHERE score > 8 AND rating = 'PG';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/222/Screen_Shot_2016-06-21_at_4.24.46_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score, rating FROM movies WHERE score > 8 OR rating = 'PG';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/237/Screen_Shot_2016-06-21_at_8.43.26_AM.png)


```SQL
SELECT id, title, genre FROM movies WHERE genre IN ('Animation', 'Crime');
```

To select a subset of rows with just a few columns from the `movies` table, run the following command.

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/251/Screen_Shot_2016-06-21_at_9.31.44_AM.png)

```sql
SELECT id, title, genre FROM movies WHERE genre LIKE 'A%';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/242/Screen_Shot_2016-06-21_at_8.54.19_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, genre FROM movies WHERE genre LIKE '%e';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/243/Screen_Shot_2016-06-21_at_8.55.13_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, genre FROM movies WHERE genre LIKE '%i%';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/244/Screen_Shot_2016-06-21_at_8.56.54_AM.png)

To select a subset of rows with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, genre FROM movies WHERE genre NOT LIKE '%i%';
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/245/Screen_Shot_2016-06-21_at_8.58.12_AM.png)

**NOTE:** `ILIKE` and `NOT ILIKE` for case-insensitive searches.

To select all the rows in a specific order with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score FROM movies ORDER BY score DESC;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/238/Screen_Shot_2016-06-21_at_8.44.17_AM.png)

To select all the rows in a specific order with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score FROM movies ORDER BY score ASC;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/239/Screen_Shot_2016-06-21_at_8.45.06_AM.png)

**NOTE:** If an `ORDER BY` clause is _not_ specified, there are no guarantees on the order of the resulting rows.

To select one row in a specific order with just a few columns from the `movies` table, run the following command.

```sql
SELECT id, title, score FROM movies ORDER BY score DESC LIMIT 1;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/241/Screen_Shot_2016-06-21_at_8.47.09_AM.png)

To select the number of rows in the `movies` table, run the following command.

```sql
SELECT COUNT(*) FROM movies;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/252/Screen_Shot_2016-06-21_at_9.36.29_AM.png)

To select the maximum column in the `movies` table, run the following command.

```sql
SELECT MAX(duration) FROM movies;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/253/Screen_Shot_2016-06-21_at_9.37.11_AM.png)

To select the minimum column in the `movies` table, run the following command.

```sql
SELECT MIN(duration) FROM movies;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/254/Screen_Shot_2016-06-21_at_9.37.44_AM.png)

To select the sum of a column in the `movies` table, run the following command.

```sql
SELECT SUM(duration) FROM movies;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/256/Screen_Shot_2016-06-21_at_9.39.39_AM.png)

To select the average of a column in the `movies` table, run the following command.

```sql
SELECT AVG(duration) FROM movies;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/255/Screen_Shot_2016-06-21_at_9.38.16_AM.png)

To update a column for a single row in the `movies` table, run the following command.

```sql
UPDATE movies SET score = 9.1 WHERE id = 2;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/214/Screen_Shot_2016-06-21_at_4.07.38_AM.png)

```sql
SELECT id, title, score FROM movies ORDER BY score DESC;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/215/Screen_Shot_2016-06-21_at_4.08.18_AM.png)

```sql
UPDATE movies SET score = 7.4 WHERE id = 2;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/216/Screen_Shot_2016-06-21_at_4.09.58_AM.png)

```sql
SELECT id, title, score FROM movies ORDER BY score DESC;
```

And you should see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/210/Screen_Shot_2016-06-21_at_3.58.15_AM.png)

To delete a row in the `movies table`, run the following command.

```sql
DELETE FROM movies WHERE id = 1;
```

And you should see something like this.

![]()

```sql
SELECT id, title, score FROM movies ORDER BY score DESC;
```

And you should see something like this.

![]()

```sql
DELETE FROM movies WHERE score < 8;
```

And you should see something like this.

![]()

```sql
SELECT id, title, score FROM movies ORDER BY score DESC;
```

And you should see something like this.

![]()

See the following articles in the PostgreSQL documentation to learn more.

- [PostgreSQL documentation - `INSERT`](https://www.postgresql.org/docs/current/static/sql-insert.html)
- [`PostgreSQL documentation - SELECT`](https://www.postgresql.org/docs/current/static/sql-select.html).
- [PostgreSQL documentation - `UPDATE`](https://www.postgresql.org/docs/current/static/sql-update.html)
- [PostgreSQL documentation - `DELETE`](https://www.postgresql.org/docs/current/static/sql-delete.html)
- [PostgreSQL documentation - Comparison Operators](https://www.postgresql.org/docs/9.1/static/functions-comparison.html)

### Exercises

Write an SQL command to do the following.

- Return the `id`, `title`, and `score` of the single worst movie in the table.
- Return the `id`, `title`, and `duration` of the "X-Men: Apocalypse" and "The Princess Bride" movies.
- Return the `id`, `title`, and `released_at` all the movies ordered by from oldest to newest.
- Return the `id`, `title`, `genre`, and `score` of all of the PG movies that scored about an 8.
- Add a half a point to the `score` of all Crime movies.
- Subtract 2 points from the `score` of all the 3-D movies.
- Delete all movies that have the word 'en' in their `title`.

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
