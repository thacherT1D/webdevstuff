# Intro to SQL: Structured Query Language

This is a follow along lesson. Please execute the commands listed as we execute them.

## Objectives

By the end of this article you will be able to:

- Use `psql` and node.js to query a PostgreSQL database.
- Use data definition language (DDL) to create a schema based on an ERD.
- Use data modeling language (DML) to perform CRUD operations on a database.


## Part One: RDBMS?

Postgres is an RDBMS.

**RDBMS**

- Relational
- Database
- Management
- System

An RDBMS is comprised of:

- A server, which can hold multiple
  - A database, which can hold multiple tables, indexes and foreign key relationships (among other things)
  - A table, which is comprised of columns and rows
- A client
  - `psql` is a client
  - your Node app will be a client as well

Clients make requests to servers using a special language, SQL (structured query language), and servers return responses - typically called result sets - that clients then parse.

A server is like a web server - it's a running process on your machine that's waiting to get requests.

Tables are made up of columns. Each column has:

- a name
- a data type
- (potentially) constraints (like being not nullable, unique or referencing columns in other tables)
- (potentially) special behaviors such as auto-incrementing integer fields.

## Part Two: SQL (Structured Query Language)

PostgreSQL is a flavor of SQL.

SQL is the language which the client sends to the server.

There are two types of SQL commands:

- DDL - data definition language
- DML - data manipulation language

> In addition, there are special commands you type _only_ when inside the `psql` REPL - these are NOT SQL commands, but rather just `psql` commands.  `psql` commands start with `\` - like `\q`, `\dt`, `\l` and `\c`.

### DDL (Data Definition Language)

Data Definition Language (DDL) affects _The schema of a database._  That is to say, tables, columns and relationships.  Common DDL commands are:

- Create a database
- Create a table
- Drop a table

Read more on Datatypes:
- serial [Numeric types](http://www.postgresql.org/docs/9.0/static/datatype-numeric.html)
- varchar [Character types](http://www.postgresql.org/docs/9.2/static/datatype-character.html)
- point [Geometric types](http://www.postgresql.org/docs/9.2/static/datatype-geometric.html)
- int [Numeric types](http://www.postgresql.org/docs/9.0/static/datatype-numeric.html)
- real [Numeric types](http://www.postgresql.org/docs/9.0/static/datatype-numeric.html)
- date [Data/time types](http://www.postgresql.org/docs/9.2/static/datatype-datetime.html)

What's the difference between `varchar` and `text`?  `varchar` is for strings (for example strings that would be entered via an html `input` field) where as `text` fields are for large blobs of text and they are slower to insert / query.  So choose `varchar` unless you are storing amounts of text larger than, say, 1000 characters.

### Data Manipulation Language (DML):

Whereas DDL affects the _schema_ of the database, DML _interacts with the data._  That is to say, DML affects tables / column definitions, and DML affects _rows_.

- Insert (Create)
- Select (Retrieve)
- Update (Update)
- Delete (Delete)


## Part Three: Installing PostgreSQL

Use Homebrew to install PostgreSQL:

```bash
$ brew update
$ brew install postgres
```

By default, the Postgres server has to be manually started and stopped.

It can be configured to automatically start and run in the background on login:

```bash
$ ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
$ launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

Create a default database by running the command

```bash
$ createdb
```

Finally, ensure everything has been setup properly by running

```bash
psql --version
```

## Part Four: Using PSQL & DDL to Create a Database and Schema

PSQL is command line client used to communicate with the PostgresSQL server. In this section we will be using PSQL to create a database and a schema.

Type `psql` to launch the `psql` client. It will connect to your Postgres server that is running in the background. By default, it connects to your default database, a database which is named after your user name.

```bash
$ psql
```

You can tell you are in the `psql` shell because you should no longer have a `$` but instead a `#` at the prompt.


#### Create Database

- [Create Database Docs](https://www.postgresql.org/docs/current/static/sql-createdatabase.html)
- [CreateDB Docs](https://www.postgresql.org/docs/current/static/app-createdb.html)


Lets create our first database, and in the Galvanize tradition we will use it to build a TODO App.

Our database will be able to have multiple todo lists, each list can have multiple tasks, each task can be marked complete.

```sql
CREATE DATABASE todo_app;
```

In SQL it is standard to write all SQL commands in caps:

```sql
CREATE DATABASE
```

Instead of using camel case for things like we do in js, in SQL we use snake case:

```sql
todo_app #instead of todoAPP
```

Now that you have created a database use the `psql` client command `list` to list all available databases:

```sql
\list
```

You should now see the database. Now, use the `psql` client command `connect` to connect to your newly created database:

```sql
\connect todo_app
```


#### Create Tables

Creating a table in SQL is a little more complicated than creating a database. This is because the data type of every column needs to be provided.

Here is the postgreSQL docs on datatypes:

- serial [Numeric types](http://www.postgresql.org/docs/9.0/static/datatype-numeric.html)
- varchar [Character types](http://www.postgresql.org/docs/9.2/static/datatype-character.html)
- point [Geometric types](http://www.postgresql.org/docs/9.2/static/datatype-geometric.html)
- int [Numeric types](http://www.postgresql.org/docs/9.0/static/datatype-numeric.html)
- real [Numeric types](http://www.postgresql.org/docs/9.0/static/datatype-numeric.html)
- date [Data/time types](http://www.postgresql.org/docs/9.2/static/datatype-datetime.html)

For now we'll introduce a few important ones:

- `serial` is a special type of number that is used as an id for data in the table. (Kind of like an index in an array)
- `decimal` this can be used to store floating point numbers.
- `integer` is used to store integers
- `varchar` this refers to variable length characters. Essentially, it is used to store strings.

First, create a table to hold your todo lists:

```sql
CREATE TABLE todo_list (
  id serial,
  name varchar(255)
);
```

Now use the `psql` command `\d` to list all tables in the connected database:

```sql
\d
```

Next create a task table:

```sql
CREATE TABLE task (
  id serial,
  name varchar(255),
  description varchar(511),
  todo_list_id integer
);
```

Once again use the `\d` command to list all the tables.

Create a table called `cat` with an `id` column of type `serial`, a `name` column of type `varchar`, a `weight` column of type `decimal`, a column called `description` of type `varchar`

#### Drop Table

Shoot, you don't need a cat table in a todo app.

Thankfully, you can delete it:

```sql
DROP TABLE cat;
```

## Part Five: Using DML to manipulate and query data

#### Inserting into a table:

Create a todo list in our `todo_list`:

```sql
INSERT INTO todo_list VALUES(default, 'Things To Learn');
```

**YOU DO**

- insert 2 more rows into `todo_list`
- insert 5 tasks for the with a `todo_list_id` of 1

#### Querying a table:

Query for all todo lists:

```sql
SELECT * FROM todo_list;
```

Query for a todo lists name:

```sql
SELECT name FROM todo_list;
```

Query for the name of the todo list with id of 1:

```sql
SELECT name FROM todo_list WHERE id = 1;
```


**YOU DO:**

- select all `tasks`
- insert a task with a `name` of `query me`, then write a query statement to select the inserted task.
- query for all tasks which have a `todo_list_id` of 1
- query for all tasks `description` column which have a `todo_list_id` of 1

#### Updating values in a table:

Update the name of the todo list with id of 1

```sql
UPDATE todo_list SET name = 'Things to See' WHERE id = 1;
```

Now update the description of all tasks to say update me:

```sql
UPDATE task SET description = 'Update Me';
```

#### Deleting values from a table:

Now lets delete a todo list we don't use anymore:

```
DELETE FROM todo_list WHERE id = 2;
```


## Exercise:

Recreate the following ERD and populate each table with at least 10 pieces of data:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/202/erd.png)

## Resources

- [Postgres Docs](https://www.postgresql.org/docs/current/static/index.html)
