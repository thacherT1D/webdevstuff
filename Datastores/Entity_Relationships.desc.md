## Objectives

1. Explain what an entity-relationship model is.
1. Explain why an entity-relationship model is useful.
1. Explain what the four PostgreSQL column constraints are.
1. Implement an entity-relationship model in PostgreSQL.
1. Explain what a join statement is.
1. Explain why a join statement is useful.
1. Alias columns and tables in SQL `SELECT` statements.
1. Write inner join statements.

## What's an entity-relationship model?

An **entity–relationship** model (ER model) describes people, places, or things that are inter-related. As the name suggests, an ER model is composed of entities and the relationships that can exist between them.

[INSERT EXAMPLE ER MODEL OF MOVIES AND AWARDS HERE]

An ER model is commonly formed to represent the persistence needs of a web application. Typically, forming an ER model is the first step toward establishing a relational database structure. In a relational database, the relationship between an entity is implemented by storing the primary key of one entity as a foreign key reference in the table of another entity.

Here's an example of a movie entity's unique identifier being stored as the `id` primary key in the `movies` table.

```text
 id | title  | duration | rating |   genre   | is_3d |      released_at       | score
----+--------+----------+--------+-----------+-------+------------------------+-------
  1 | Frozen |      102 | PG     | Animation | t     | 2013-11-26 16:00:00-08 |   7.6
```

And being stored as the `movie_id` foreign key of two award entities in the `awards` table.

```text
 id | movie_id | kind  |                                 name                                 
----+----------+-------+----------------------------------------------------------------------
  1 |        1 | Oscar | Best Animated Feature Film of the Year                               
  2 |        1 | Oscar | Best Achievement in Music Written for Motion Pictures, Original Song
```

## Why is an entity-relationship model useful?

An ER model is the result of systematic analysis of a problem domain to better understand how its entities and relationships exist and change over time. These processes can be often be hard to describe in words, so an ER model can be useful to present them graphically instead.

In an ER model, the **cardinality** of a relationship describes the number of elements between two entities. There are three distinct relationship cardinality types.

- One-to-one relationship
- One-to-many relationship
- Many-to-many relationship

A **one-to-one** relationship describes the relationship between two entities, A and B, in which one element of A may only be linked to one element of B and vice versa. For example, think of A as countries, and B as capital cities. A country has only one capital city, and a capital city is the capital of only one country.

[INSERT ER MODEL HERE]

A **one-to-many** relationship describes the relationship between two entities, A and B, in which an element of A may be linked to many elements of B, but a member of B is linked to only one element of A. For example, think of A as mothers, and B as children. A mother can have several children, but a child can have only one mother.

[INSERT ER MODEL HERE]

A **many-to-many** relationship describes the relationship between two entities, A and B, in which many elements of A may be liked to many elements of B and vice versa. For example, think of A as Authors, and B as Books. An Author can write several Books and a Book can be written by several Authors.

[INSERT ER MODEL HERE]

## What are the four PostgreSQL column constraints?

A **not-null constraint** simply specifies that a column must not assume the null value. A table can have more than one column with a not-null constraint.

```sql
CREATE TABLE products (
  id serial,
  name text NOT NULL,
  price numeric NOT NULL
);
```

A **unique constraint** ensures that the data contained in a column is unique among all the rows in the table. Adding a unique constraint automatically creates a unique index on the column, which is something you're learn about later. A table can have more than one column with a unique constraint.

```sql
CREATE TABLE products (
  id serial UNIQUE,
  name text NOT NULL,
  price numeric NOT NULL
);
```

A **primary key constraint** indicates that a column can be used as a unique identifier for rows in the table. This constraint requires the values in the primary key column to be both unique and not null. Adding a primary key constraint automatically creates a unique index on the column, which is something you'll learn about later. A table can only have one column with a primary key constraint.

```sql
CREATE TABLE products (
  id serial PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL
);
```

A **foreign key constraint** specifies that the values in a column must match the values appearing in some row of another table. This constraint is used to maintain the referential integrity between two related tables. A table can have more than one column with a foreign key constraint. A foreign key constraint can also cascade the deletion of its specified row. In other words, when the referenced row is deleted, the row(s) referencing it should be automatically deleted as well.

```sql
CREATE TABLE products (
  id serial PRIMARY KEY,
  name text NOT NULL,
  price numeric NOT NULL
);

CREATE TABLE orders (
  id serial PRIMARY KEY,
  product_id integer REFERENCES countries ON DELETE CASCADE,
  quantity integer
);
```

## How do you implement an entity-relationship model in PostgreSQL?

In a relational database system, a one-to-one relationship exists when one row in table A is linked with only one row in table B.

```sql
CREATE TABLE countries (
  id serial PRIMARY KEY,
  name text
);

CREATE TABLE capital_cities (
  id serial PRIMARY KEY,
  country_id integer UNIQUE NOT NULL REFERENCES countries ON DELETE CASCADE,
  name text
);
```

[PLAY WITH INSERTING ROWS INTO THE COLUMN]

In a relational database, a one-to-many relationship exists when one row in table A is linked with many rows in table B, but one row in table B is linked to only one row in table A.

```sql
CREATE TABLE mothers (
  id serial PRIMARY KEY,
  name text
);

CREATE TABLE children (
  id serial PRIMARY KEY,
  mother_id integer NOT NULL REFERENCES mothers ON DELETE CASCADE,
  name text
);
```

[PLAY WITH INSERTING ROWS INTO THE COLUMN]

In a relational database management system, a many-to-many relationship is implemented by means of an join table, AB, with two one-to-many relationships. A -> AB and B -> AB. In this case the logical primary key for AB is formed from the two foreign keys.

```sql
CREATE TABLE authors (
  id serial PRIMARY KEY,
  name text
);

CREATE TABLE books (
  id serial PRIMARY KEY,
  name text
);

CREATE TABLE authorships (
  id serial PRIMARY KEY,
  author_id integer NOT NULL REFERENCES authors ON DELETE CASCADE,
  book_id integer NOT NULL REFERENCES books ON DELETE CASCADE,
  name text
);
```

[PLAY WITH INSERTING ROWS INTO THE COLUMN]

## Learn the data model

Suppose we were building an application that allows users to build resumes. In this data model we have tables for

- `users`
- `resumes`
- `employments`
- `employments_resumes`

Logically in our application, each user may have as many employments and resumes as they want. A resume consists of multiple of employments, for which the relationship is stored in `employments_resumes`.

In the next few exercises you'll learn how to join these together.

At the Terminal, clone the following repository and then build a database using the SQL file included:

```shell
git clone git@github.com:gSchool/sql-curriculum.git
cd sql-curriculum/Unit-02-Relational
createdb resume_builder
psql resume_builder -f 01-statements.sql
psql resume_builder
```

So to get more details about these tables, spend some time getting familiar with their structure and where they connect (e.g. spots where we can join data).

To start, run the following commands:

```
psql resume_builder
\dt
\d users
\d resumes
\d employments
\d employment_resumes
```

Just to get into the data model a little, and review your SQL, open the `resume_builder` database with `psql`, and perform the following queries:

1. Select the `first_name` and `last_name` for all `users`.
1. Select all `resumes` (all columns).
1. Select all `employments` for `user_id = 3` and `user_id = 4` (<- would you use an `and` or and `or` here?)

## Selecting with table names / Aliasing

When joining two columns, you'll sometimes need to include two columns that have the same name.  In these cases, you'll need to specify which table it comes from, which looks like this:

```sql
SELECT users.id, users.first_name FROM users;
```

Notice how the output does _not_ include the table name:

```
 id | first_name
----+------------
  1 | Ty
  2 | Joe
  3 | Hank
  4 | Ted
```

Sometimes you'll also want to rename the column, which you can do with an alias, like so:

```sql
SELECT users.id AS user_id, users.first_name FROM users;
```

When you run that, notice that the column name in the output is `user_id`:

```text
 user_id | first_name
---------+------------
       1 | Ty
       2 | Joe
       3 | Hank
       4 | Ted
```

## What's a join statement and why is it useful?

In SQL, a **join statement** combines records from two or more tables in a relational database. The combined records can be viewed or even saved to a new table.

Additionally, you can combine fields from two or more tables by joining on values that are common to each. There are five types of joins, though in this lesson, we'll only cover the first one:

- `INNER JOIN`
- `LEFT OUTER JOIN`
- `RIGHT OUTER JOIN`
- `FULL OUTER JOIN`
- `CROSS JOIN`

As a full stack developer, you'll save data in separate tables and then use joins to get it back together.

## Joins - Syntax

Unlike Mongo and most document databases and key-value stores, in SQL you can easily make a single query that returns data from multiple tables.  The syntax looks like this:

```sql
SELECT * FROM users INNER JOIN employments ON employments.user_id = users.id;
```

In SQL newlines and spacing don't matter, so the same query might look like this:

```sql
SELECT * FROM users
INNER JOIN employments ON employments.user_id = users.id;
```

or this...

```sql
SELECT *
FROM users
INNER JOIN employments
  ON employments.user_id = users.id;
```

Some things in SQL are case-sensitive, like the values in your `where` clauses, but for keywords the case doesn't matter.  So you also might see that same query look like this:

```sql
select *
from users
inner join employments
  on employments.user_id = users.id;
```

Notice that `ON` clause?  It doesn't matter which table is listed on which side, so these two are equivalent:

```sql
SELECT * FROM users INNER JOIN employments ON employments.user_id = users.id;
```

and...

```sql
SELECT * FROM users INNER JOIN employments ON users.id = employments.user_id;
```

## Inner / Left / Right Joins

There are several different ways you can join data.  Three common ways are `INNER JOIN`, `LEFT JOIN` and `RIGHT JOIN`.

Take a few minutes to search the internet for the differences between the three - joins have been around for years, so there's a plethora of great information and articles on what they are / when to use them.

...

Have you searched yet?  No really - go do that :)

You're back?  Awesome - let's talk about how to use them. Here is an image that could be useful:

![SQL JOINS](http://www.codeproject.com/KB/database/Visual_SQL_Joins/Visual_SQL_JOINS_orig.jpg)

In `psql` you can run the previous command by using the up arrow, or using `CTRL+P` (just like the command line).  When you arrow up to a multi-line command, you see the whole command (in multiple lines) and you can use arrow keys to go back through the text.  Use `CTRL+A` to go to the beginning (just like the command line) and `CTRL+E` to go to the end.

## Join'em up!

1. Select all columns from the users table, joined to all columns of the `employments` table.
1. Select `first_name`, `last_name`, `title`, `organization`, `start_year`, and `end_year` from the `users` table joined to the `employments` table.
1. Take the query from above and sort it by the `start_year` ascending. (hint: read this http://www.postgresql.org/docs/9.1/static/queries-order.html)
1. Select `title`, `organization`, `start_year`, and `end_year` from `employments` for `resume_id = 1` (hint: `\d employments_resumes`)

### Three things to note

- The order of the equality doesn't matter: `resumes.id = employment_resumes.resume_id` is equivalent to `employment_resumes.resume_id = resumes.id`.
- When there's a duplicate field name, you need to specify the table name.
- When you are displaying 2 fields with the same name and want to differentiate them in the JOIN, use aliases.

An example of the last two noes:

```sql
SELECT users.id AS user_id, employments.id AS employments_id
FROM users
INNER JOIN employments
  ON employments.user_id = users.id;
```

## Chaining Joins

Every SQL query needs to have a `from` clause.  Once you have table in the `from` clause, you can join onto it.  And you can _also_ join onto tables that have been mentioned in joins, like so:

```sql
SELECT *
FROM comments
INNER JOIN articles ON articles.id = comments.article_id
INNER JOIN authors ON authors.id = articles.author_id
```

Knowing that, now add write a query that

- starts with the `employments_resumes` table
- includes the `id` column from the `employments_resumes` table
- includes the `first_name` and `last_name` columns from the `users` table
- includes the `name` from the `resumes` table
- includes the `start_year` and `end_year` columns from the `employments` table

You know you have it correct when your result set looks like this:

```
id | first_name | last_name |         name         | start_year | end_year
----+------------+-----------+----------------------+------------+----------
 1 | Ty         | Cobb      | First Attempt Resume |       1905 |     1926
 2 | Ty         | Cobb      | First Attempt Resume |       1927 |     1928
 3 | Ty         | Cobb      | First Attempt Resume |       1921 |     1926
 4 | Joe        | DiMaggio  | My only              |       1936 |     1942
 5 | Joe        | DiMaggio  | My only              |       1946 |     1951
 6 | Hank       | Aaron     | My Favorite Rezzy    |       1954 |     1974
 7 | Hank       | Aaron     | My Favorite Rezzy    |       1975 |     1976
 8 | Ted        | Williams  | Player Resume        |       1939 |     1942
 9 | Ted        | Williams  | Player Resume        |       1946 |     1960
10 | Ted        | Williams  | Manager Resume       |       1969 |     1972
```

## Resources

- [Lucidchart - ER Diagram Symbols and Meaning](https://www.lucidchart.com/pages/ER-diagram-symbols-and-meaning)
- [PostgreSQL Documentation - Constraints](https://www.postgresql.org/docs/9.5/static/ddl-constraints.html)
- [Wikipedia - Associative entity](https://en.wikipedia.org/wiki/Associative_entity)
- [Wikipedia - Entity-relationship model](https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model)
- [Wikipedia - Many-to-many (data model)](https://en.wikipedia.org/wiki/Many-to-many_(data_model)
- [Wikipedia - One-to-many (data model)](https://en.wikipedia.org/wiki/One-to-many_(data_model)
- [Wikipedia - One-to-one (data model)](https://en.wikipedia.org/wiki/One-to-one_(data_model)
- [Youtube - Entity Relationship Diagram Training](https://www.youtube.com/watch?v=-fQ-bRllhXc)
- [Youtube - Introduction to Set Theory](https://www.youtube.com/watch?v=yCwnifwVjIg)

## Services

- [Draw.io](https://www.draw.io/)
- [Lucidchart](https://www.lucidchart.com/)

## Videos

### Entity Relationship Diagrams (ERD)

<iframe src="https://player.vimeo.com/video/142034756?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
