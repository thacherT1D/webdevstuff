## Objectives

- Explain the difference between data and information.
- Explain what an entity is.
- Diagram how web applications store and retrieve data.
- Describe what a relational database is.
- Explain why relational databases are so important.
- Describe what PostgreSQL is.
- Install and configure PostgreSQL.

## What's the difference between data and information?

Before you can before fluent with databases, like PostgreSQL, you first need become fluent with the difference between data and information. Simply put, **data** are facts. Here are some examples of data, represented in JavaScript.

```javascript
'Mary';
'mary@microsoft.com';
24;
3.14;
true;
false;
null;
new Date('2016-01-22T04:30:00Z');
```

On the other hand, **information** is facts about something or someone. In other words, information is data with context. Here's an example of information about a person, represented in JavaScript.

```javascript
const person = {
  name: 'Mary',
  email: 'mary@microsoft.com',
  age: 24,
  favoriteNumber: 3.14,
  likesDogs: true,
  likesCats: false,
  phoneNumber: null,
  graduatedAt: new Date('2016-01-22T04:30:00Z')
};
```

### Exercise

Take a minute to write down how you'd explain the difference between data and information to a friend. Then, turn to a neighbor and share what you wrote.

## What's an entity?

In the above example, the `person` object is called an entity. An **entity** is an object the represents a person, place, or thing. As you can see from this table, this `person` entity has handful of attributes.

| `name`   | `email`                | `age` | `favoriteNumber` | `likesDogs` | `likesCats` | `phoneNumber` | `graduatedAt`                      |
|----------|------------------------|-------|------------------|-------------|-------------|---------------|------------------------------------|
| `'Mary'` | `'mary@microsoft.com'` | `24`  | `3.14`           | `true`      | `false`     | `null`        | `new Date('2016-01-22T04:30:00Z')` |

An **attribute** is a piece of information that describes an entity. For example, this `person` entity has a `name` attribute with the value of `'Mary'`.

### Exercise

Turn to a neighbor and consider how you'd describe a `pet` entity. Think of the information that's important to being a pet.

Then, create a JavaScript object that represents one instance of a `pet` entity. Afterwards, create a table to represent the same `pet` entity. Make sure to include the information you thought of earlier as attributes for the entity.

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
  * Introduce the students to DFDs, but tell them they don't need to know how to how to write them- they're really useful for demonstrating the role of databases, but otherwise they're a kinda-rare UML artifact
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

## What's a relational database?

A **relational database**, or relational database management system (RDBMS), is a database that's based on the relational model. The **relational model** is an approach to managing data using a structure and language consistent with first-order predicate logic.

Regarding structure, all data in a relational database is represented in terms of tuples (i.e. records) that are grouped into relations (i.e. tables).

![][relational-db]

Most modern relation databases use a special-purpose programming language to manage its data called **Structured Query Language** (SQL). Originally based upon relational algebra and tuple relational calculus, SQL consists of distinctive three languages.

1. A data definition language (DDL) for structuring relations.
1. A data manipulation language (DML) for performing CRUD operations.
1. A data control language (DCL) for managing permissions.

For example, the CRUD operations correspond to the following SQL commands.

| CRUD operations | SQL commands |
|-----------------|--------------|
| Create          | `INSERT`     |
| Read            | `SELECT`     |
| Update          | `UPDATE`     |
| Destroy         | `DELETE`     |

SQL became an official standard in the mid-1980's and, since then, has been revised to include a growing set of features. Despite the existence of such standards, most SQL code is not completely portable among different database systems without adjustments. Popular relational database systems that implement the SQL standard include:

- PostgreSQL
- MySQL
- Oracle
- Microsoft SQL Server (MSSQL)
- SQLite

Most of these relation database systems follow a similar software architecture.

![][relational-arch]

## Why are relational databases so important?

Since the 1970s, relational databases have been used to store financial records, manufacturing and logistical information, personnel data, government information, communication data, etc. By structuring data in records and tables, computers can quickly and efficiently store and retrieve insanely large amounts data.

Imagine, for a moment, you have a database for an online store with a single `orders` table.

##### `orders`

| `id` | `first_name` | `last_name` | `ordered_on` | `total` |
|------|--------------|-------------|--------------|---------|
| `1`  | `'Susan'`    | `'Frazier'` | `2015-11-16` | `25.99` |
| `2`  | `'Joel'`     | `'Capra'`   | `2016-02-10` | `32.99` |
| `3`  | `'Susan'`    | `'Frazier'` | `2016-03-01` | `46.99` |

As you can see, there's duplicate customer data. And wherever there's duplicate data, there's the possibility for inconsistencies to arise. For example, imagine Susan Frazier wants to change her last name. Given the current structure, that would require changing multiple records. With a relational database, it's possible to use multiple tables—like a `customers` and `orders` table—to store the same information.

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

PostgreSQL is fully ACID (atomicity, consistency, isolation, durability) compliant and supports most SQL:2008 data types, including `INTEGER`, `NUMERIC`, `BOOLEAN`, `CHAR`, `VARCHAR`, `DATE`, `INTERVAL`, and `TIMESTAMP`. And it can even store large binary objects such as pictures, sounds, or video. PostgreSQL has native interfaces for a number of programming languages including JavaScript and is known for its [exceptional documentation][postgresql-docs].

## How do you install and configure PostgreSQL?

You can install the latest version of PostgreSQL using Homebrew.

```sh
brew update
brew install postgres
```

When it's finished, verify PostgreSQL is installed correctly.

```sh
postgres --version
```

Then configure your computer to auto-start a PostgreSQL server on boot.

```sh
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

With the PostgreSQL server running, create a default database with the same name as your current user's account name.

```sh
createdb
```

Now, you can connect to the default database in your PostgreSQL server through PostgreSQL client.

```sh
psql
```

And you'll be in an interactive PostgreSQL REPL. To get help, type `\?` and press `Enter`. To quit, type `\q` and press `Enter`.

__CRUD__

Stands for Create, Read, Update and Destroy.  This is the lifecycle of data in an applicatoin.  In SQL, CRUD can be mapped to the following __INSERT, SELECT, UPDATE, DELETE__.

## Creating a Database

Most database products have the notion of separate databases. Let's create one for the lesson. In your terminal, type `psql`. Next create a database:

```sql
CREATE DATABASE testdb;
```

Next, list all of the available databases:

```
\list
```

Now connect to the database we just created.

```
\connect testdb
```

Once we connect, our command prompt should look similar to this: `testdb=#`

Check what tables we have in our newly created database (dt stands for display tables):

```
\dt
```

At this point we should have a database with no tables in it.  So now we need to create tables.

## Creating a Table

Let's look at the Postgres docs for __[creating a table](http://www.postgresql.org/docs/9.1/static/sql-createtable.html).__

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

This is an example of a students table.  We will talk about the primary key soon.

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone_no VARCHAR(10),
    email TEXT,
    address TEXT
);
```

### Dropping a Table

Let's say we no longer need the students table from above, to get rid of all of the data and the definition of the table, we can use the DROP statement.  Here are the [docs on DROP](http://www.postgresql.org/docs/8.2/static/sql-droptable.html).

```sql
DROP TABLE students;
```

####Schema

The schema of the database is the set of create table commands that specify what the tables are and how they relate to each other.  For our very simple database example, here is the schema:

```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone_no VARCHAR(10),
    email TEXT,
    address TEXT
);
```

#### What is a Primary Key?

It denotes an attribute on a table that can uniquely identify the row.  What is a similar property on a mongo db?

#### What does SERIAL Do?

SERIAL tells the database to automatically assign the next unused integer value to id whenever we insert into the database and do not specify id. You will nearly always want a column to exist on your table that is defined as a serial column. There will be times when you will want to manage the `id` field yourself, but they are rare. Let the database do the work for you.

#### Data Types

Similar to how Ruby or Javascript has types of data, SQL defines types that can be stored in the DB. Here are some common ones:

* Serial
* Integer
* Numeric // Numbers are exact, no rounding error
* Float // Rounding error is possible, but operations are faster than Numeric
* Text, Varchar
* Timestamp
* Boolean (True or False)

#### Exercise

Design a table for a movie database. Discuss a few things that a movie table may have. Choose the appropriate data type for the data. Make the CREATE TABLE command and execute it in psql. Use `\dt` to verify that the table was created. Once you're satisfied that the table is there, get rid of it using the DROP TABLE command. Use `\dt` again to make sure that the table has been dropped.

## Inserting

The INSERT SQL command adds new rows to a table. Here are the [postgres docs on INSERT](http://www.postgresql.org/docs/9.1/static/sql-insert.html).

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

## Selecting

A select statement allows you to get data from the database. Here are the [docs on select](http://www.postgresql.org/docs/9.1/static/sql-select.html). Also, postgres a good [tutorial on select](http://www.postgresql.org/docs/9.3/static/tutorial-select.html). I'd recommend looking at the tutorial sometime after the lesson.

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

#### Exercises

* Write a query on the movie table to return the worst movie of all time.  There should be only 1 result returned.  The result should include the title, description and rating of the movie.
* Write a query that returns Gigli and Mad Max: Fury Road
* Write a query that returns the id and title of the first 5 movies inserted into the database.
* Write a query to get all of the average movies from the table.  Average is defined as a rating between 4 and 7 inclusive.

## Updating

The update statement is defined [here](http://www.postgresql.org/docs/9.1/static/sql-update.html) in the postgres docs.  It is used to change existing data in our database.

For example, if we do not think Gigli was actually that bad, and we want to change the rating to a 2, we can use an update statement:

```sql
UPDATE movies SET rating=2 WHERE title='Gigli';
```

#### Exercise

You are a harsh critic and don't feel like any of these movies are worthy of a 10. Write an update query that downgrades all of the 10s in our database to 9s.

## Deleting

Deleting works similarly to a select statement.  Here are the [docs on delete](http://www.postgresql.org/docs/8.1/static/sql-delete.html)

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

- [SQL Tutorial - Home](http://www.sqltutorial.org/wp-content/uploads/2016/04/sqlcheatsheet.pdf)
- [SQL Tutorial - SQL Cheatsheet](http://www.sqltutorial.org/wp-content/uploads/2016/04/sqlcheatsheet.pdf)
- [W3Schools - SQL Tutorial](http://www.w3schools.com/sql/default.asp)

## Videos

### Relational Databases

<iframe src="https://player.vimeo.com/video/142036155" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

[postgresql-docs]: http://www.postgresql.org/docs/manuals/
[relational-arch]: https://upload.wikimedia.org/wikipedia/commons/5/57/RDBMS_structure.png
[relational-db]: http://www.vertabelo.com/_file/blog/orms-under-the-hood/data-representation-in-relational-database.png
