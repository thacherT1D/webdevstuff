# Objectives

* Compare and contrast RDBs and NoSQL
* Articulate the pros/cons of using NoSQL
* Articulate the types of NoSQL
* Key-value and document stores
* Define Collections and documents 
* Create a simple CRUD api with MongoDB

## RDBs vs NoSQL

When choosing between using a Relational Database or a NoSQL database, think of the right tool for the right job. Relational Databases have many benefits, including ensuring data consistency and removing data duplication. NoSQL databases have their own benefits. There are different types that solve different problems. For the most part, some NoSQL highlights are:

* flexible data models
    * There is no need to set up the data structure before inserting data. 
* quick set-up
    * There is no need for creating schemas or Normalizing data.
* fast queries
    * The flexibility of storing all information in one place allows for queries to be simple and quick. This is mostly in comparison to doing joins in SQL
* scalable (controversial)

So, when should you use NoSQL? you decide. Take into consideration your data. Are the multiple interdependant relationships or is it important to maintain ACID? then RDBs are probably the right way to go. Want to set up the database quickly or have different variety of data types? Think about a NoSQL database.

## Types of NoSQL

* Graph
* Column
* Multi-model
* Key-value
* Document-Store
* and more...

For the purpose of this lesson, we will focus on Key-value and Document Store databases.

#### Key-value database

Simple data storing through collections of associative arrays (objects, dictionaries, hashes). Think of a collection as a table like users, students, etc. Inside a collections are documents. Think of documents as rows in a table.

#### Document Stores

A subclass of key-value stores. They contain more complex documents with more usability, such as unique keys, tags, and metadata. These are typically encoded in XML, YAML, JSON, and BSON.

## MongoDB

Mongo is the M in MEAN stack. It is a document database encoded in BSON.

mongodb install:
* ```brew update```
* ```brew install mongodb```
* ```cp /usr/local/opt/mongodb/homebrew.mxcl.mongodb.plist ~/Library/LaunchAgents/```
* ```ezservices start mongodb```

### CLI Commands

* mongo - connect to database
* show dbs - display all databases
* use [db name] - connect to or create database
* show collections - display all collections inside db
* db.[collection].find() - display all documents inside collection

The main MongoDB commands to understand for CRUD are:
* CREATE db.collection.insert()
* READ db.collection.find()
* UPDATE db.collection.update()
* DELETE db.collection.remove()

remember to replace 'collection' with the actual name of the collection (e.g. db.users.find() or db.students.insert())

In express:

```
var mongodb = require('mongodb')
var url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/database'
mongodb.MongoClient.connect(url, function(err, db) {
  var collection = db.collection('collection');
  collection.findOne({user: “bob”})
}```
