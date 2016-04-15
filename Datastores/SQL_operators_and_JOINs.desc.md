# SQL operators

The operators are very similar to those in JavaScript. Note that SQL
is a different language and may use them differently or have complete different ones.
The best way to learn them is to use them. 

#### Arithmetic Operators \- 

\+  \-  \*  /	%

#### Comparison Operators  \-

 =	 !=	 <>	  >	 <	 >=	 <=
 
#### Logical Operators \- 

ALL  AND  ANY  BETWEEN  EXISTS  IN  LIKE  NOT  OR  LIMIT ORDER BY GROUP BY

#### Functions

SUM() AVG() MIN() LAST()

#### Example

Given the following table (completely innacurate):

| name | continent | area | population | gdp |
|:-----|:---------:|:----:|:----------:|:---:|
|Afgh  |  Asia |6593| 3848097913 | 3084000000 |
|Alba  | Euro   | 3421 |  1749583412 |2211000000|
|Alge | Asia    | 6321 | 3123417765| 7894000000|

The query shows the name, alphabetically, and population density
for each country where the area is over 5,000,000 km2.

```SELECT name, population/area FROM world
WHERE area > 5000000 ORDER BY name```

Arithmetic: the division sign finding the population desity
    by deviding population by the gdp
    
Comparison: the greater than symbol filtering the area

Logical: ordering the results alphabetically by name


# JOINs

Use JOIN to combine records from two or more tables. The method returns rows when there is a match in both tables.

```SELECT id, name, amount, date FROM customers INNER JOIN orders ON customers.id = orders.customer_id;```

### Cartesian or Cross JOIN

The cartesian product is the result of combining the records from two or more tables.

```SELECT id, name, amount, date FROM customers, orders;```

### NOTE: when joining a table, it takes the cartesian product and then eliminates every row in which the ON criteria isn’t true. This is why JOINs are considered an “expensive” operation.

### Selecting NULL

#### IS NULL - 
NULL is unknown, not applicable or missing info. Therefore you can’t compare (with < = or >), we use IS NULL or IS NOT NULL.

#### LEFT / RIGHT / FULL JOINS
These methods return all rows from a table, even if there are no matches in the other table
	
![SQL JOINS](http://www.codeproject.com/KB/database/Visual_SQL_Joins/Visual_SQL_JOINS_orig.jpg)
