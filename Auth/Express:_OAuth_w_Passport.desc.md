## Objectives

There are two main goals for this lesson: to get familiar with Passport, and to hone your documentation interaction abilities.  Note "documentation interaction" - not "reading documentation".  Documentation is rarely a step-by-step tutorial.  Instead, it's an active process of knowing what to look for, seeking it out, pattern matching and only pulling in the few lines necessary to satisfy the errors you are getting.

By the end of this lesson, you should be able to:

- Describe and explain OAuth and it's role in web authentication (content)
- Carefully read error messages generated from framework code and reason through possible causes based on current knowledge of Express
- Use targeted searches in documentation to answer specific questions or inform hypothesis
  - use CMD+F on web pages
- Keep track of where you were on notecards, so you can maintain your place even when you have to solve smaller problems

You do _not_ need to memorize every step in this document.  Using framework code is all about combining what you know with your critical thinking skills and targeted documentation searches.  Most of this lesson is about non-cognitive behaviors.

## OAuth (content)

The basic OAuth2 web flow is:

![](http://41.media.tumblr.com/dc0ed4febc896d5d0589fc2940e52a42/tumblr_mp08klMuDm1qax653o1_1280.jpg)

Some guiding questions are:

- How does Google / Facebook / LinkedIn etc... communicate with your _local_ web app during development?  Isn't that private (aka not published on the internet)??
- What part of your existing authentication / authorization flows does this replace?
- Why would you want to authenticate with Google / Facebook instead of storing the emails / passwords yourself?

__Resources:__

- https://developer.linkedin.com/docs/oauth2
- https://github.com/auth0/passport-linkedin-oauth2
- http://passportjs.org/docs
- http://passportjs.org/docs/configure#configure
- https://apigee.com/console/linkedin
- http://docs.mongodb.org/manual/reference/method/db.collection.update/#db.collection.update

## Exercise

<div class="alert alert-warning">
  Our class (g19) will be deviating slightly from the repo associated with this Learning Experience. You should feel free to either follow along during class or simply start with <a href='https://github.com/gSchool/linkedin-oauth-with-passport'>this repo</a> and go!
</div>


<hr>
#### Clear the stage

**Clear the stage**: Close any terminal tabs, atom windows, chrome tabs etc... that you have open.  Just have this doc open to start.

**Know what and why**: Have you really read the objectives and discussion above?  There's a lot of copy-pasting happening today - it'll be easy to forget _why_ you are here.  Keep the big picture in mind as you develop.

**Value process over product**: While finishing the exercise is important, it's not a race.  Take your time - research things you have questions about, _really_ read all of the questions here and discuss them with classmates.  There's no prize for finishing first :)


<hr>
#### Create a new Express Application

Create a new express app. You may use any generator you like however you must have the following installed to work through this Learning Experience:

* pg
* knex
* cookie-session
* dotenv
* passport
* [passport-linkedin-oauth2](https://www.npmjs.com/package/passport-linkedin-oauth2)
* [unirest](https://www.npmjs.com/package/unirest)

Now initialize your app with knex:  

* `knex init`
  * Change the `knexfile.js` as needed.
* `mkdir db`
* `touch db/knex.js`
  * Fill in the `db/knex.js` file appropriately

Then add your `.env` file:

* `touch .env`
* `echo .env >> .gitignore`

Before committing, make sure your application runs. Then:

* `git init`  
* `git add .`  
* `git commit -am "Initial commit"`  


<hr>
#### Create a new LinkedIn Application

Go to LinkedIn, then setup a new [oAuth Application](https://www.linkedin.com/developer/apps). 

Most items in that form don't matter- the logo, application name, and description will be shown to the user who is trying to login to your app when you request access to their account. You'll also need to provide a logo for your app that is the same pixel length and width. You can use [this one](https://www.dropbox.com/s/dhsgalow2bvz5gv/galvanize-square-logo.png?dl=true) or find your own. Fill out the rest of the information as needed.

Once you have the client ID and client secret, you can store it in your .env file like so:

```
LINKEDIN_API_KEY='your client ID goes here'
LINKEDIN_SECRET_KEY='your client secret goes here'
```

Also, on the linkedin app config page, you'll see a field marked **Authorized Redirect URLs:**. Set it to "http://localhost:3000/auth/linkedin/callback".


<hr>
#### Create Routes & Navigation

All of our authentication-related routes are going to come from the prefix `/auth`.

1. Create a routes file called `auth.js`
1. Import the auth routes file inside of `app.js` with the prefix, `/auth`
1. In the `auth.js` file, create three new routes; for now, have them all redirect to your root path:
  * `/linkedin`
  * `/linkedin/callback`
  * `/logout`
1. Create a new navigation bar and place it on your layout file. You should include links to your home (root), to the LinkedIn login (`/auth/linkedin`), and to logout (`/auth/logout`). Add a tiny bit of style so it's easy to use!


<hr>
#### Setting up Passport w/LinkedIn

For the most part, this will feel like a copy and paste job -- and for the most part, it is! For each step, try and identify the _purpose_ of adding the code. Understanding the intention behind the code is enough for now.

Inside of your `app.js`, you're going to want to include the following:

You'll want to require necessary packages you've just installed:

```
// At the top, where you are requiring your packages
var cookieSession = require('cookie-session');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
if ( !process.env.NODE_ENV ) { require('dotenv').config(); }
```

And you'll need to include the appropriate middleware and setup your cookie-session package. Create at least two new environment variables for your cookie's keys.

```
// Under cookieParser in your middleware section
app.use(cookieSession({
  name: 'linkedin-oauth-session-example',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());
```

Then we need to implement the Passport Strategy. The code on top is pulled almost directly from the [passport-linkedin-oauth2](https://www.npmjs.com/package/passport-linkedin-oauth2) documentation. What are the differences you notice?

```
// above your routes
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_API_KEY,
  clientSecret: process.env.LINKEDIN_SECRET_KEY,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  state: true
}, function(accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}));

passport.serializeUser(function(user, done) {
  //later this will be where you selectively send to the browser 
  // an identifier for your user, like their primary key from the 
  // database, or their ID from linkedin

  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // here is where you will go to the database and get the 
  // user each time from it's id, after you set up your db
  done(null, user)
});
```

Pfew! We just added a ton. Make sure your application is still running and make a commit.


<hr>
#### Logging In with LinkedIn

Go to your `auth.js` and comment out all your routes except for your `/linkedin` route. Include the passport module at the top of the page and then replace the route with the following code:

```
router.get('/linkedin', passport.authenticate('linkedin'));
```

Reload your page and click on the link that goes to this route. At this point, a few things might happen. Let's troubleshoot!

You get to a page that is branded by LinkedIn but it says there's an invalid redirect_uri:

  * Go to your application on linkedin and make sure that the callback URL there matches what you have in your app.js. The URLs have to be exactly the same.

You get to a page that asks you to login with LinkedIn:

  * Great! Go ahead and login at which point you should be redirected. You then will likely have a new problem which is...

You arrive at your site but with a 404:

  * Also great! This is because we've commented out the callback route.

Once you get to the final error, move on to the next step.


<hr>
#### Completing the Login Process

Your user is now logging in with LinkedIn however we have to complete the full trip and tell our application where to send our user on a success or error. You can use the following for your callback route.

```
router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/'
}), function (req, res, next) {
  console.log('user:', req.user);
  res.redirect('/');
});
```

Try clicking once again on the link on your page. You should be put back on the homepage. But, check your terminal: woah, what's all that!?

Consider the following:

1. What are each of the parameters inside the `router.get()` doing?
1. What is being printed to your terminal?


<hr>
#### Refine your User Info

While all that information is pretty cool, we don't actually need all of it. First, remove the `console.log()` from your `auth.js`. In your `app.js`, locate the callback function that follows the LinkedInStrategy. Instead of passing the full profile, we can do something like this:

```
return done(null, { id: profile.id, displayName: profile.displayName });
```

Update your `index.js` root route so that you print out the name of the person when they arrive on the page, if that information is available:

```
var name = req.user.displayName || '';
res.render('index', { title: 'Hello ' + name })
```

If all is working you should see the displayed name on the homepage!


<hr>
#### Allow the User to Logout

Before we go any further, lets make sure we can logout. No copy and paste here! You know how to do this.  :)

You'll need to:

* Clear out the user's session
* Redirect to the homepage
* Update the root route so that the page can render if `req.user` is undefined.


<hr>
#### Get More Information about the User

Back inside of your app.js, add a console.log somewhere so that you can print out the full user profile. Find the following:

```
name: { familyName: 'Smith', givenName: 'Morty' },
emails: [ { value: undefined } ],
```

Update where you're setting your user so that you get the users givenName and familyName. But, why is email undefined? That's no fun.

In order to get that information, you'll need to request it from the user themselves. You can add the following inside of the object being used to initialize the LinkedInStrategy to request additional information from the user when they agree to authorize your application:

```
scope: ['r_emailaddress', 'r_basicprofile'],
```

Log out and log back in inside of your application. You should be asked to authorize your application again. This time, on the LinkedIn page, you should notice an extra little email icon. In your terminal, you should see that the email is now filled in!

```
name: { familyName: 'Smith', givenName: 'Morty' },
emails: [ { value: 'morty.smith@example.com' } ],
```

Add the email to the user object being passed around and get the user's email to be displayed on the page.

Let's add one last bit of information the user -- an image! You should find a `photos` key on the profile object. Get that image and associate it with the user object. Finally, get the image to be displayed on the homepage when the user is logged in!


<hr>
#### Save User to the Database

We now have lots of information about the user, however we're not actually storing any of it. Depending on our application, this could be fine. Let's assume though that we actually want to make an account on our database for our user.

If you haven't created a database at this point, do so! Then create a new users table using a migration from knex. It should include:

  * ID (serial)
  * `linkedin_id` column (it should be unique)
  * `email` column (it should be unique)
  * preferred_name
  * last_name
  * avatar_url

Once you have that migration created, run it and make sure your table is created.

At this point, we can rely on the work we've done in implementing local authentication to store information in the database and/or retrieve it:

1. Inside of the callback in our `passport.use()` method, we want to find an existing user based on the `linkedin_token` __OR__ create a new user with the information we've gotten from LinkedIn. The end result of that function should be calling done with the user's ID from the user table.
1. Inside of `passport.deserializeUser()`, you should expect a userID and it should either find an existing user or call done with nothing. That is, you'd just call `done()` if no user is found.

Try this on your own, using the resources you have from prior Learning Experiences/repos. To check that it's working, you can do the following:

1. Go into your database and make sure a new row has been created with user information.
1. Update the first_name with a new value.
1. Refresh the page when you're logged in -- the name should be updated with the new value. It should __NOT__ be overwritten on each subsequent login.

We'll convene as a group to go over this code!


<hr>
#### Deploy to Heroku

We should only need to make a few changes to deploy to Heroku.

1. Run `heroku create` and take note of the URL.
1. Right now, our callback function from LinkedIn is expecting to hit localhost in both our application and in the LinkedIn application console. We will need to have this be dynamically set via an environment variable.
1. Update the URL on your LinkedIn Application to reflect the Heroku url. You'll need to include the path to the callback on it as well!
1. All of the config variables inside of the .env file need to go on Heroku. You can use [heroku config:set](https://devcenter.heroku.com/articles/config-vars) to do that.
1. Make sure your code still works; if it does, push up to Heroku.
1. Create a new database for your application.  
  `heroku addons:create heroku-postgresql:hobby-dev`
1. Use `heroku run bash` to connect to the command line of your Heroku application. Then, run the migrations for your database via knex.
1. In another tab in your terminal (same directory), run `heroku logs --tail`. This is just helpful for making sure if there is an error, we can catch it.
1. Head to your website. If you've done all these steps everything should work!


## Resources

[Passport](http://passportjs.org/docs)  
Other package: [passport-linkedin](https://github.com/jaredhanson/passport-linkedin)  
[Linkedin Passport Example](https://github.com/jaredhanson/passport-linkedin/blob/master/examples/login/app.js)  