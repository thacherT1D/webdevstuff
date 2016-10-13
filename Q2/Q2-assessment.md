# CRUD Blog

Today, you're going to build a blog. You will be able to create posts. Each post will allow comments to be made on them. The app is due Monday morning.  If you crack-a-lack on it Friday you might be able to get it done on Friday.

## Options
If you want to do another app with a one to many relationship you may.  Don't overcomplicate it though.  Other apps might include projects/tasks, movies/actors or albums/tracks.  You may not do a bookshelf app for obvious reasons.  Have fun with it.  This is a celebration of everything you know

## Setup and planning

1. Come up with a name for your blog
1. Wireframe each view
1. Create a data model
1. Generate an Express app with handlebars
1. Don't forget `npm i`
1. Set up a git repo and a .gitignore file
1. Install and configure Knex and your local database
1. Install and configure the `dotenv` module
1. Create routes and handlebars files for each view
1. Generate migration files (think about the order that you create these in)
1. Generate seed files (think about the order of, not only running the files, but deleting tables within the seed files)
1. Run your migrations and seed files
1. Commit
1. Deploy your app and database to Heroku
1. Run your migrations and seeds on Heroku

## Write CRUD for each of your routes

1. Write the CRUD knex statements for each route
  * Create, Read, Update, Delete Posts
  * Create, Read, Update, and Delete Comments
1. Server and Client side error handling so a blog can't be submitted without a title and body

## Add Authentication

1. Authenticate users with Passport using linkedin, facebook, twitter or google

## Style your blog

1. Personalize your blog with some style. Use materialize or bootstrap.

## Stretch
* Write tests for your routes
* Allow users to login with a username & password (Passport Local Strategy)
* Add authorization so users can only edit their own blog
* Make your blog responsive
* Be creative!
