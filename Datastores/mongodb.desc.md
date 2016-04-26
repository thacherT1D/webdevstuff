# Intro to Databases + MongoDB

### What is MongoDB?

[http://docs.mongodb.org/manual/faq/fundamentals/#what-kind-of-database-is-mongodb](http://docs.mongodb.org/manual/faq/fundamentals/#what-kind-of-database-is-mongodb)

### SQL vs noSQL

[http://www.thegeekstuff.com/2014/01/sql-vs-nosql-db/](http://www.thegeekstuff.com/2014/01/sql-vs-nosql-db/)

Have more questions about thist stuff? Head over here! [http://docs.mongodb.org/manual/faq/](http://docs.mongodb.org/manual/faq/)

### When to use MongoDB

- Flexible Schemas / Less Restriction
- Multiple writes + clusters 
- Full Text Search

### Installing MongoDB

* First we'll need to run brew update to update our brew packages.

  ```
  brew update
  ```
* Next we'll need to run `brew install` for **MongoDB**

  ```
  brew install mongodb
  ```

* Then we'll need a directory for **MongoDB** to save data.

  ```
  sudo mkdir -p /data/db
  ```

  * Finally we'll want to make sure we have permission to read and write to this directory.

  ```
  sudo chown -R $USER /data/db
  ```

### CRUD in Mongo

CRUD? Huh? 

- **C** - Create
- **R** - Read (any kind of finding)
- **U** - Update
- **D** - Delete

### Creating in Mongo
[Mongo Docs: Write Operations](http://docs.mongodb.org/manual/core/write-operations-introduction/)

- anywhere in the terminal start a mongo server using `mongod`
- With the mongo server running, create a new tab in terminal and run `mongo` to start up a mongo shell

To create records 

```
db.users.insert({name: 'Elie',
  dob: new Date(1997, 2, 1, 5, 3),
  hobbies: ['tennis', 'hiking', 'cello', 'coding'],
  age: '27'
});

db.users.insert({test: 'foo',
  what: ['weird', 'strange'],
  randomNumber: '27'
});
```

### Reading
[Mongo Docs: Read Operations](http://docs.mongodb.org/manual/core/read-operations-introduction/)

In the mongo shell, the primary method for the read operation is the db.collection.find() method. This method queries a collection and returns a cursor to the returning documents.

What is a cursor? **A pointer to the result set of a query.** 


### Specific Finds

Take a look at these queries and try to see what they do:

```
db.users.find({vampires: {$exists: false}});
```

```
db.users.find({hobbies: {$in:['comedy','tennis']}});
```

```
db.users.find({gender: 'm', weight: {$gt: 700}});
```

```
db.users.find({gender: 'f',
  $or: [{loves: 'apple'},
  {hates: 'windows'}]
});
```

```
db.users.find({_id: ObjectId("5574b367a44db3d5a567fde2")});
```

#### Updating
[Mongo Docs: Update](http://docs.mongodb.org/manual/reference/method/db.collection.update/#db.collection.update)

```
db.users.update({name: 'Fido'},
  {gender: 'm'})
```

```
db.users.update({name: "Elie" }, {$set: {
  name: 'Fido',
  dob: new Date(1979, 7, 18, 18, 44),
  hobbies: ['swimming'],
  gender: 'm'
}})
```

```
db.users.update({name: 'Jane'}, {$push: {hobbies: 'reading'}})
```

How about a bulk update?

```
db.users.update({},
  {$set: {hilarious: true }},
  {multi:true}
);
```

#### Deleting
[Mongo Docs: Removing](http://docs.mongodb.org/manual/reference/method/db.collection.remove/#db.collection.remove)

```
db.users.remove({})
```

```
db.users.remove({name:"Elie"})
```

### Things to think about

Unlike relational databases, mongo does not provide a built in way to validate our data. We also have yet to examine what relationships look like between our collections! 

Also, some of these mongo methods are a bit tedious to work with - how do we just find a single record by ID, and are there easier ways to delete and update? Thankfully there are and we will examine a <s>wonderful</s> tool that we use on top of mongo called `mongoose` which we will examine after the weekend.

## Mongo Concepts 

Define these terms and answer these questions in 1-3 sentences (some will require a bit of googling)

### Terms

* Database
* Collection
* Document
* Cursor 
* Field 
* CRUD
* Relational Database
* Non-Relational Database
* CAP Theorem
* Schema

### Questions

* Do MongoDB databases have schemas?
* What are typical uses for MongoDB?
* What is Mongoose?
* What is a Mongoose Model?

## Further learning

* [MongoDB Manual](http://docs.mongodb.org/manual/)
* [Mongoose guide](http://mongoosejs.com/docs/guide.html)
