## Objectives

* Describe what a relational database is.
* Explain why relational databases are so important.
* Describe what PostgreSQL is.
* Install and configure PostgreSQL.

## What's a relational database?

A **relational database**, or relational database management system (RDBMS), is a database that's based on the relational model. The **relational model** is an approach to managing data using a structure and language consistent with first-order predicate logic.

Regarding structure, all data in a relational database is represented in terms of tuples (i.e. records) that are grouped into relations (i.e. tables).

![][relational-db]

Most modern relation databases use a special-purpose programming language to manage its data called **Structured Query Language** (SQL). Originally based upon relational algebra and tuple relational calculus, SQL consists of distinctive three languages.

1. A data definition language (DDL) for structuring relations.
1. A data manipulation language (DML) for performing CRUD operations.
1. A data control language (DCL) for managing permissions.

For example, the CRUD operations correspond to the following SQL commands.

| CRUD Action | SQL operation |
|-------------|---------------|
| Create      | `INSERT`      |
| Read        | `SELECT`      |
| Update      | `UPDATE`      |
| Destroy     | `DELETE`     |

SQL became an official standard in the mid-1980's and, since then, has been revised to include a growing set of features. Despite the existence of such standards, most SQL code is not completely portable among different database systems without adjustments. Popular relational database systems that implement the SQL standard include:

- PostgreSQL
- MySQL
- Oracle
- Microsoft SQL Server (MSSQL)
- SQLite

Most of these relation databases follow a similar software architecture.

![][relational-arch]

## Why are relational databases so important?

Since the 1980s, relation databases have been used to store financial records, manufacturing and logistical information, personnel data, government information, communication data, etc. By structuring data in records and tables, computers can quickly and efficiently store and retrieve insanely large amounts data.

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

**PostgreSQL** is a powerful, open source object-relational database system (ORDBMS). It has been around since 1996 and has a strong reputation for reliability, data integrity, and correctness.

It runs on all major operating systems, including Linux, Mac OS X, and Windows. It is fully ACID (atomicity, consistency, isolation, durability) compliant and has full support for foreign keys, joins, views, triggers, and stored procedures. It supports most SQL:2008 data types, including `INTEGER`, `NUMERIC`, `BOOLEAN`, `CHAR`, `VARCHAR`, `DATE`, `INTERVAL`, and `TIMESTAMP`. And it can even store large binary objects such as pictures, sounds, or video.

PostgreSQL has native programming interfaces for C/C++, Java, .Net, Perl, Python, Ruby, and, of course, JavaScript. And it has [exceptional documentation][postgresql-docs].

## How do you install and configure PostgreSQL?

You can install the latest version of PostgreSQL using Homebrew.

```bash
brew update
brew install postgres
```

When it's finished, verify PostgreSQL is installed correctly.

```bash
postgres --version
```

Then configure your computer to auto-start a PostgreSQL server on boot.

```bash
ln -sfv /usr/local/opt/postgresql/*.plist ~/Library/LaunchAgents
launchctl load ~/Library/LaunchAgents/homebrew.mxcl.postgresql.plist
```

With the PostgreSQL server running, create a default database with the same name as your current user's account name.

```bash
createdb
```

Now, you can connect to the default database in your PostgreSQL server through PostgreSQL client.

```bash
psql
```

And you'll be in an interactive PostgreSQL REPL. You can type `\q` and press `Enter` to quit.


[postgresql-docs]: http://www.postgresql.org/docs/manuals/
[relational-arch]: https://upload.wikimedia.org/wikipedia/commons/5/57/RDBMS_structure.png
[relational-db]: http://www.vertabelo.com/_file/blog/orms-under-the-hood/data-representation-in-relational-database.png
