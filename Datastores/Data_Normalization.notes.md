## Objectives

* Normalizes data to Third Normal Form
* Model relationships using ERD

## Guiding Questions

* What is normalization, and why would you want to do it?
    * Normalization is the process of removing redundancy in a database. You normalize data to remove duplicate references that need to be syncronized, allowing you the flexibility to change a piece of data in one place instead of many.
* What is first normal form (1NF)? Give an example.
    * No repeating rows. Something is in 1NF if every column has one and only one entry in each row.
    * A column that has a list of colors, or a list of cities, or any kind of multiple value for a single column.
* What is second normal form (2NF)? Give an example.
    * No partial dependencies. Something is in 2NF if every is non-key column is dependent on the primary key.
    * A `Registration` table that has a `student_id`, a `class_id`, and a `student_name`. The `student_name` is only dependent on the `student_id`, so it should go to that column.
* What is third normal form (3NF)? Give an example.
    * No transitive dependencies. Something is in 3NF if every column in a table is dependent on only the PK directly, not via its relationship to another column.
    * A `Order` table that has `payment_type` and `payment_amount` columns. These depend on each other, but not the `id`. They should be abstracted out into a `Payment` table.
* What is denormalization, and why would you want to do it?
    * Data that's spread across many tables is accessed with `JOIN` statements. Join statements are comparatively expensive in SQL, and lots of `JOIN` statements may unacceptably impact performance-sensistive tasks.

## Push Questions

* If denormalization is so fast, what would it be like to denormalize as much as possible and enforce relationships outside the database?
    * This is the general concept behind NoSQL
* What are some things that can go wrong if you don't normalize?
    * All the data might not show up on a query because they were entered in differently in different places
    * Data can get updated in one place but not another, ruining the referential integrity of the database
    * It may difficult to extend the functionality of a table because it's coupled to unrelated data

## Exercises

### I do

Normalize this [data model](https://s3-us-west-2.amazonaws.com/lesson-plan-images/normalization_images/Normalization+Exercises+-+Denormalized.jpeg)

#### Solution Notes

* An [over the top solution](https://s3-us-west-2.amazonaws.com/lesson-plan-images/normalization_images/Normalization+Exercises+-+Normalized.jpeg)
* This model used lookup tables for the types of dates and payments
* `sale_price` is on the `Order_Item` table to lock in the item's price at the point of sale. This is _critical_- if left out, the price of the historical transaction will fluctuate whenever the price of any of the items change.
* The dates don't technically have to be normalized for this to be in 3NF. However, normalizing them out allows you to store different kinds of dates in the future, and reduces blank columns for things that may not apply to a particular order (such as shipping).

### We do

Normalize this [data model](https://s3-us-west-2.amazonaws.com/lesson-plan-images/normalization_images/Normalization+Exercises+-+Denormalized+2+(1).jpeg)

#### Solution Notes

* An [over the top solution](https://s3-us-west-2.amazonaws.com/lesson-plan-images/normalization_images/Normalization+Exercises+-+Normalized+2.jpeg)
* Pregnancy is normalized out as a condition
* Patient can now have multiple weigh-ins
* Physicians can now be a heart specialist for one patient, or primary care physician for another patient

### You do

Normalize this [data model](https://s3-us-west-2.amazonaws.com/lesson-plan-images/normalization_images/Normalization+Exercises+-+Denormalized+3.jpeg)

#### Solution Notes

* An [over the top solution](https://s3-us-west-2.amazonaws.com/lesson-plan-images/normalization_images/Normalization+Exercises+-+Normalized+3.jpeg)
* The user agreement may not technically need to be normalized out, but it allows for multiple kinds of agreements (such as for each subscription
* Normalizing out images is optional, but allows you to store every image url in one central store. This aids in things like updating URLs.