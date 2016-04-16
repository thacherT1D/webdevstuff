### Instructor Notes

For the final section, you can do the following:

```
passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDIN_API_KEY,
  clientSecret: process.env.LINKEDIN_SECRET_KEY,
  callbackURL: "http://localhost:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_basicprofile'],
  state: true
}, function(accessToken, refreshToken, profile, done) {
  knex('users')
    .where({ linkedin_id: profile.id })
    .orWhere({ email: profile.emails[0].value })
    .first()
    .then(function (user) {
      if ( !user ) {
        return knex('users').insert({
          linkedin_id: profile.id,
          email: profile.emails[0].value,
          preferred_name: profile.name.givenName,
          last_name: profile.name.familyName,
          avatar_url: profile.photos[0].value
        }, 'id').then(function (id) {
          return done(null, id[0]);
        });
      } else {
        return done(null, user.id);
      }
    });
}));
```

<br>

```
passport.deserializeUser(function(userId, done) {
  // here is where you will go to the database and get the 
  // user each time from it's id, after you set up your db
  
  if ( userId ) {
    knex('users')
      .where({ id: userId })
      .first()
      .then(function (user) {
        ( !user ) ? done() : done(null, user);
      })
      .catch(function (err) {
        done(err, null);
      })  
  } else {
    done();
  }
});
```

You should also point out how deserialize actually gets run multiple times right now. That's because each time your page makes a new request deserializeUser gets run. You can actually solve that with the solution [described here](https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459).