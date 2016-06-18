1. Ask the students what is the difference between data and information is
  * 5-10 minutes to research on their own
  * Information has context, data does not
  * Write a bunch of numbers on the board- is this data or information? (Data)
  * Add units to them- information or data (still data)
  * Add a title to the numbers (student ages or something)- information or data (Information)
  * Conclusion- we store data so that we can transform it into information in our apps
1. Data Flow Diagrams
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
1. Client-Server Review
  * Revisit the client-server diagram
  * Add a database server with DBMS and a database to it
  * Important for them to understand that the database server is (usually) a different computer
    * Web server sends a request to a database server using a database driver
    * Database server interprets the request and executes a query on the database
    * Results come back to the database server
    * Database server sends them back to the web server
    * Database driver formats the results
    * Web server does something with them
1. Definitions
  * Students should be able to define these things:
    * Schema
    * Table
    * Relationship
    * Record
    * Field
    * Key
    * Type
    * Constraints
  * You can have them look these up for 15 minutes, or just tell them and then grill them on it until you have critical mass
  * Use lots of spreadsheet metaphors
  * Don't use a ton of ERD diagramming yet- save it for another lecture

![Part 1](https://s3-us-west-2.amazonaws.com/assessment-images/misc/intro-to-data-part-1.jpg)
![Part 1](https://s3-us-west-2.amazonaws.com/assessment-images/misc/intro-to-data-part-2.jpg)
