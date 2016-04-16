# Slides

* [Danny - SQL](https://docs.google.com/presentation/d/1DfB36GeO9nJEs-7D1QIXkgQgjc7hyo2PZ6lQA-qkZwE/edit#slide=id.gd7ac0ef0a_0_8)
* [Danny - Postgres/psql](https://docs.google.com/presentation/d/1jlaTZqUeNDk_GvHMS5cqaoQgS03Ocj4t__jQsFHkqrs/edit?usp=sharing)
* [Tyler - Join & Join Types](http://slides.com/tylerbettilyon/jointypes/)

# Check for Understanding

After students have watched the videos, have them answer the following questions:

What does SQL stand for?

* structured query language

What does varchar stand for?

* character varying

What does schema refer to?

* the structure of the database

What is DDL? What does it mean?

* data definition language

What is DML? What does it mean?

* data manipulation language; creating, updating, deleting, and getting rows

What does the "serial" type refer to?

* auto incrementing number

When you delete data from a row of type serial, 
does that id get reused?

* no

What is the convention for naming a table?

* lowercase, plural (e.g. students)

What is the convention for naming a foreign key column?

* singular with id, snake case (e.g. student_id)

What does ERD stand for?

* entity relationship diagram

What does the word cardinality stand for?

* Describes the relationship of how many of one relate to how many of the other

Customers have many orders. Where does the foreign key go?

* orders has a customer_id column

What is the name for the table that goes between two entities in a many to many relationship.

* join table

# Links

* https://modern-sql.com/use-case/literate-sql

# Exercise on Creating ERDs

Have students work in pairs with whiteboards to make diagrams of the following. Each ERD should reperesent the following concepts in some fashion:

Politics

* Politicians
* Parties
* Roles

Families

* Children
* Parents
* Grandparents
* Grandchildren
* Siblings
* Cousins

Airplanes

* Planes
* Flights
* Seats
* Reservations
* Customers

# Exercise on Executing SQL Queries
Here's one exercise for students.  Give them these instructions.

**Structure**

- Create a table named Actors with a name and date of birth
- Create a table named movies with a title and release year
- Create a table named appearances with an actor_id and movie_id and their name in the movie
- Insert 4 or 5 actors
- Insert 4 or 5 movies

**Seeds**

Insert some appearances such that:

- some actors are in no movies
- some movies have no actors
- some actors are in more than one movie

**Queries**

- with a single query show all movies and all the actors who appeared in those movies
- with a single query show all the actors in a specific movie
- with a single query show all the movies a specific actor has been in
- show all actors who have not starred in movies
- show all movies who have no actors associated with them


# Resources
- [Stack Exchange Data Explorer (sql interface for SO data)](http://data.stackexchange.com/stackoverflow/query/new)