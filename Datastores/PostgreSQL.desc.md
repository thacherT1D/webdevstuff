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
- Use SQL to manage databases in a PostgreSQL cluster.
- Use SQL to manage tables in a database.
- Use SQL to manage rows in a table.

## What's the difference between data and information?

Before you can become fluent with a database systems like PostgreSQL, you first need become fluent with the difference between data and information. Simply put, **data** are facts. Here are some examples of data, represented in JavaScript.

```javascript
'Frozen';
102;
'PG';
'Animation';
true;
new Date('2013-11-27 00:00:00 UTC');
7.6;
```

**NOTE:** A good habit to form is to always include a time with a timezone when creating a specific date.

On the other hand, **information** is facts about something or someone. In other words, information is data with context. Here's an example of information about a movie, represented in JavaScript.

```javascript
const movie = {
  title: 'Frozen',
  duration: 102,
  rated: 'PG',
  genre: 'Animation',
  is3D: true,
  releasedAt: new Date('2013-11-27 00:00:00 UTC'),
  score: 7.6
};
```

### Exercise

Take a minute to write down how you'd explain the difference between data and information to a friend. Then, turn to a neighbor and share what you wrote.

## What's an entity?

In the above example, the `movie` object is called an entity. An **entity** is an object the represents a person, place, or thing. As you can see from the table below, this `movie` entity has handful of attributes.

| `title`    | `duration` | `rated` | `genre`       | `is_3d`     | `released_at`                         | `score` |
|------------|------------|---------|---------------|-------------|---------------------------------------|---------|
| `'Frozen'` | `102`      | `'PG'`  | `'Animation'` | `true`      | `new Date('2013-11-27 00:00:00 UTC')` | `7.6`   |

An **attribute** is a piece of information that describes an entity. For example, this `movie` entity has a `title` attribute with the value of `'Frozen'`.

**NOTE:** In table form, attribute names are often in camel case because unquoted identifiers in database systems, like PostgreSQL, are case insensitive.

### Exercise

Turn to a neighbor and consider how you'd describe a `pet` entity. Think of at least five pieces of information that are essential to being a pet.

Using this information, create a JavaScript object that represents one instance of a `pet` entity. Then, create a table, like the one above, to represent the same `pet` entity.

## How do web applications store and retrieve information?

For the next few days, you'll be learning how web applications store and retrieve information.

* Revisit the client-server diagram
* Add a database server with DBMS and a database to it
* Important for them to understand that the database server is (usually) a different computer
  * Web server sends a request to a database server using a database driver
  * Database server interprets the request and executes a query on the database
  * Results come back to the database server
  * Database server sends them back to the web server
  * Database driver formats the results
  * Web server does something with them
* Data Flow Diagrams
  * Introduce the movies to DFDs, but tell them they don't need to know how to how to write them- they're really useful for demonstrating the role of databases, but otherwise they're a kinda-rare UML artifact
  * DFDs have these elements:
    * Actors
    * Processes
    * Data Stores
    * Data Flows
  * DFDs have these rules:
    * An actor cannot communicate directly with a data store or another actor- there has to be a process in between
    * A data store cannot communicate directly with another data store- there has to be a process in between
    * A process can communicate to another process
    * You can't put data into a data store and never take it out- this is called a "black hole"
    * You can't take data out of a data store that you never put in- this is called "immaculate conception"
    * What goes into a process can't be the same thing that comes out of it- the process has to transform it somehow
    * DFDs are implementation-agnostic- a datastore could just as easily be a database or a filing cabinet
  * Illustrate with a user sign up form- the user puts in their information, the sign up process transforms the information ("My name is Kyle Coberly, and I want my username to be kylecoberly") into data (`{firstName: "Kyle", lastName: "Coberly", username: "kylecoberly"`), and stores it in a data store named "Users".
    * Ask them what's wrong (It's a black hole)
    * Create another actor called admin that looks the user list, or another process that requires what's in the data store
  * The point is to illustrate data in motion (data flows) vs. data at rest (data stores)
  * If the system turns off, data in motion is lost, data at rest is not

## What's a relational database system?

A **relational database system**, or relational database management system (RDBMS), is a database system that's based on the relational model. The **relational model** is an approach to managing information using a structure where an entity is represented as row (i.e. tuple) that's grouped in a table (i.e. relation).

```text
 id | first_name | last_name | gpa
----+------------+-----------+------
  1 | Bruce      | Wayne     | 2.94
  2 | Selina     | Kyle      | 3.02
  3 | Clark      | Kent      | 2.45
```

Each column represents attributes that contains a piece of information that matches a particular data type.

| Attribute    | Database type | JavaScript type |
|--------------|---------------|-----------------|
| `id`         | `SERIAL`      | `Integer`       |
| `first_name` | `VARCHAR`     | `String`        |
| `last_name`  | `VARCHAR`     | `String`        |
| `gpa`        | `NUMERIC`     | `Number`        |

The way you manage the tables and rows in most modern relation database systems is with a special-purpose programming language called Structured Query Language (**SQL**) which consists of three distinctive languages.

1. A data definition language (DDL) for managing tables.
1. A data manipulation language (DML) for managing rows.
1. A data control language (DCL) for managing permissions to the tables and rows.

**NOTE:** In this course, we'll just be focusing on the data definition and data manipulation languages of SQL.

Here's an example of a data definition command in SQL.

```sql
CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  duration INTEGER,
  rated VARCHAR(10),
  genre TEXT,
  is_3d BOOLEAN,
  released_at TIMESTAMP WITH TIME ZONE,
  score NUMERIC(3, 1)
);
```

And here's an example of a data manipulation command in SQL.

```sql
INSERT INTO movies (title, duration, rated, genre, is_3d, released_at, score) VALUES ('Frozen', 102, 'PG', 'Animation', TRUE, '2013-11-27 00:00:00 UTC', 7.6);
```

SQL became an official standard in the mid-1980's. Since then, it has been revised a few times to include a growing set of features. Despite the existence of such standards, most SQL code is not completely portable between different database systems without adjustments. Popular closed and open source relational database systems that implement the SQL standard include the following.

| Name                 | Source |
|----------------------|--------|
| Microsoft Access     | Closed |
| Microsoft SQL Server | Closed |
| Oracle               | Closed |
| MySQL                | Open   |
| PostgreSQL           | Open   |
| SQLite               | Open   |

Relational database systems all share a few things in common. First, is the concept of a database server which contain multiple databases. And each database contains multiple tables. All the information inside of these tables are persisted to a hard disk by the database system so you don't have to worry about how the information is stored. For example, if you were building a web application for movie fanatics called Movie Junkies, it might use one database server with two databases: a `movie_junkies_dev` database for the development environment and `movie_junkies_test` database for the test environment.

```text
        Name        |   Owner   | Encoding
--------------------+-----------+----------
 movie_junkies_dev  | ryansobol | UTF8     
 movie_junkies_test | ryansobol | UTF8     
```

## Why is a relational database system so important?

Since the 1970s, relational database systems have been used to store financial records, manufacturing and logistical information, personnel data, government information, communication data, etc. By structuring data in records and tables, computers can quickly and efficiently store and retrieve insanely large amounts data.

Imagine, for a moment, you have a database for an online store with a single `orders` table.

##### `orders`

| `id` | `first_name` | `last_name` | `ordered_on` | `total` |
|------|--------------|-------------|--------------|---------|
| `1`  | `'Susan'`    | `'Frazier'` | `2015-11-16` | `25.99` |
| `2`  | `'Joel'`     | `'Capra'`   | `2016-02-10` | `32.99` |
| `3`  | `'Susan'`    | `'Frazier'` | `2016-03-01` | `46.99` |

As you can see, there's duplicate customer data. And wherever there's duplicate data, there's the possibility for inconsistencies to arise. For example, imagine Susan Frazier wants to change her last name. Given the current structure, that would require changing multiple records. With a relational database system, it's possible to use multiple tables—like a `customers` and `orders` table—to store the same information.

##### `customers`

| `id` | `first_name` | `last_name` |
|------|--------------|-------------|
| `1`  | `'Susan'`    | `'Frazier'` |
| `2`  | `'Joel'`     | `'Capra'`   |
| `3`  | `'Susan'`    | `'Frazier'` |

##### `orders`

| `id` | `customer_id` | `ordered_on` | `total` |
|------|---------------|--------------|---------|
| `1`  | `1`           | `2015-11-16` | `25.99` |
| `2`  | `2`           | `2016-02-10` | `32.99` |
| `3`  | `1`           | `2016-03-01` | `46.99` |

Now, a change to a customer's last name only requires a change to one record.

## What's PostgreSQL?

**PostgreSQL** is a powerful, open source relational database system that's been around since 1996 and has a strong reputation for reliability, data integrity, and correctness. It runs on all major operating systems, including Linux, Mac OS X, and Windows.

PostgreSQL is fully ACID (atomicity, consistency, isolation, durability) compliant and supports most SQL:2008 data types, including `INTEGER`, `NUMERIC`, `BOOLEAN`, `CHAR`, `VARCHAR`, `DATE`, `INTERVAL`, and `TIMESTAMP`. And it can even store large binary objects such as pictures, sounds, or video. PostgreSQL has native interfaces for a number of programming languages including JavaScript and is known for its [exceptional documentation](https://www.postgresql.org/docs/current/static/).

## How do you install PostgreSQL using Homebrew?

Using Homebrew, install the latest version of PostgreSQL by running the following commands.

```shell
brew update
brew install postgresql
```

### Exercise

Verify PostgreSQL was installed correctly by running the following commands.

```shell
postgres --version
psql --version
```

## How do you start a PostgreSQL server using Homebrew Services?

```shell
brew tap homebrew/services
```

```shell
brew services list
```

```shell
brew services start postgresql
```

```shell
brew services list
```

```shell
brew services stop postgresql
```

```shell
brew services list
```

### Exercise

Start the PostgreSQL server as a Homebrew service. When your done, check out the usage message with the following command.

```shell
brew services --help
```

## How do you use command line tools to manage databases in a PostgreSQL cluster?

With the PostgreSQL server running, create a default database with the same name as your current user's account name.

```shell
psql -l
```

```shell
createdb movie_junkies_dev
```

```shell
psql -l
```

```shell
dropdb movie_junkies_dev
```

```shell
psql -l
```

### Exercise

Use the command line tools to create a `movie_junkies_dev` database in the PostgreSQL cluster. When your done, check out the usage messages for the following commands.

```shell
psql --help
createdb --help
dropdb --help
```

## How do you use SQL to manage databases in a PostgreSQL cluster?

Now, you can connect to the default database in your PostgreSQL server through PostgreSQL client.

```shell
psql movie_junkies_dev
```

And you'll be in an interactive PostgreSQL REPL. To get help, type `\?` and press `Enter`. To quit, type `\q` and press `Enter`.

Most database systems have the notion of separate databases. Let's create one for the lesson. In your terminal, type `psql`. Next create a database:

```text
\l
```

**NOTE:** Remember to end SQL commands with a semicolon `;`.

```sql
CREATE DATABASE movie_junkies_test;
```

Next, list all of the available databases:

```text
\l
```

Now connect to the database we just created.

```text
\c movie_junkies_test
```

```text
\c movie_junkies_dev
```

```sql
DROP DATABASE movie_junkies_test;
```

```text
\l
```

Once we connect, our command prompt should look similar to this: `testdb=#`

### Exercises

Check out the help messages for the following PostgreSQL REPL commands.

```text
help
\?
\h
```

## How do you use SQL to manage tables in a database?

Check what tables we have in our newly created database (dt stands for display tables):

```
\dt
```

At this point we should have a database with no tables in it.  So now we need to create tables.


Let's look at the Postgres docs for __[creating a table](https://www.postgresql.org/docs/current/static/sql-createtable.html).__

The basic structure for table creation:  

```sql
CREATE TABLE table_name
(
   column_name1 data_type(size),
   column_name2 data_type(size),
   column_name3 data_type(size),
   ....
);
```

Example:

This is an example of a movies table.  We will talk about the primary key soon.

```sql
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone_no VARCHAR(10),
    email TEXT,
    address TEXT
);
```

The schema of the database is the set of create table commands that specify what the tables are and how they relate to each other.  For our very simple database example, here is the schema:

```sql
CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone_no VARCHAR(10),
    email TEXT,
    address TEXT
);
```

### What is a Primary Key?

It denotes an attribute on a table that can uniquely identify the row.  What is a similar property on a mongo db?

### What does SERIAL Do?

SERIAL tells the database to automatically assign the next unused integer value to id whenever we insert into the database and do not specify id. You will nearly always want a column to exist on your table that is defined as a serial column. There will be times when you will want to manage the `id` field yourself, but they are rare. Let the database do the work for you.

### Data Types

Similar to how Ruby or Javascript has types of data, SQL defines types that can be stored in the DB. Here are some common ones:

* Serial
* Integer
* Numeric // Numbers are exact, no rounding error
* Float // Rounding error is possible, but operations are faster than Numeric
* Text, Varchar
* Timestamp
* Boolean (True or False)

## How do you destroy a table in a database?

Let's say we no longer need the movies table from above, to get rid of all of the data and the definition of the table, we can use the DROP statement.  Here are the [docs on DROP](https://www.postgresql.org/docs/current/static/sql-droptable.html).

```sql
DROP TABLE movies;
```

### Exercise

Design a table for a movie database. Discuss a few things that a movie table may have. Choose the appropriate data type for the data. Make the CREATE TABLE command and execute it in psql. Use `\dt` to verify that the table was created. Once you're satisfied that the table is there, get rid of it using the DROP TABLE command. Use `\dt` again to make sure that the table has been dropped.

## What are the CRUD operations on a row?

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

- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/static/)
- [SQL Tutorial - Home](http://www.sqltutorial.org/)
- [SQL Tutorial - SQL Cheatsheet](http://www.sqltutorial.org/wp-content/uploads/2016/04/sqlcheatsheet.pdf)
- [W3Schools - SQL Tutorial](http://www.w3schools.com/sql/default.asp)

## Videos

### Relational Databases

<iframe src="https://player.vimeo.com/video/142036155" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[relational-arch]: https://upload.wikimedia.org/wikipedia/commons/5/57/RDBMS_structure.png
