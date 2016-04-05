## Warmup

Start with a really easy warmup that requires them to use callbacks, such as:

    Using `setTimeout`, Write some code that waits 2 seconds (2000 milliseconds)

    - logs something
    - _then_ starts another timer that waits 1 second and logs something else

## Initial checks for understanding

**Cold call questions**

- what is a callback?
- what does "asynchronous mean"?
- name one asynchronous operation you know of
- name another asynchronous operation you know of
- name another asynchronous operation you know of
  - answers:
    - AJAX calls from browsers
    - setTimeout / setInterval
    - API calls from the server-side
    - Database calls

**Whiteboard questions**

Show some code like:

```js
function a() {
  setTimeout(function () {
    console.log("crackle");
  }, 0);
}

console.log("snap");
a();
console.log("pop");
```

and ask them to write down what order things will happen in.  (answer: snap, pop, crackle).

IF some folks botch that, then don't teach promises.  They don't understand async code, and promises will be awful.

## Initial explanation (I do)

It seems like in every blog out there everyone starts by saying "Promises are deferred values" etc...  But to a beginner, that doesn't mean much.  Here are some alternatives:

- "Promises are just another way to do callbacks, but with some benefits later on"
- "Promises are a way to do callbacks but in a more human-friendly way - they make it easier to change the code later"

### Why are they important?

- Ask a student to come up with a scenario in which you'd want to do one asynchronous call, then another
- Draw a data model like `users -> posts -> comments` and describe how if you want related data, you need to make multiple async calls
- Show images of callback hell (aka the "pyramid of doom" and the "pyramid of death") like https://media.licdn.com/mpr/mpr/shrinknp_800_800/AAEAAQAAAAAAAAQFAAAAJGY2NjQ5YTUwLTNkMTctNDczNi1iYWRkLWNmMjgyY2I1MzBjNg.png
- Talk about how there are 3 forces at work:
  - JavaScript forces common operations to be async
  - Most apps require multiple successive async calls
  - Callbacks are difficult for humans to work with under these scenarios

### What are they?

They are just like callbacks, only a _little_ more organized.  Instead of just having a callback floating around, there's an _object_ that the callback is connected to.  And you can pass around the object.

### You already use them

Any time you see a `.then`, it's probably a promise.

### Demo it

Have a nice code demo prepared - could be any knex or ajax application.  Show code like:

```js
// definition
function getAuthorProfiles(user) {
  return getUser(req.params.userId)
    .then(function (user) {
      return getPostsForUser(user);
    })
    .then(function (posts) {
      return getCommentsForPosts(posts);
    })
    .then(function (comments) {
      return getAuthorsForComments(comments);
    })
    .then(function (authors) {
      return getProfilesForUsers(authors)
    });
}

// usage
getAuthorProfiles(user).then(function (profiles) {
  res.render('index', { profiles: profiles });
})
```

NOTE: syntax might seem strange.  Show things multiple ways:

```js
function getAuthorProfiles(user) {
  return getUser(req.params.userId)
    .then(function (user) { return getPostsForUser(user); })
    .then(function (posts) { return getCommentsForPosts(posts); })
    .then(function (comments) { return getAuthorsForComments(comments); })
    .then(function (authors) { return getProfilesForUsers(authors) });
}
```

OR

```js
function getAuthorProfiles(user) {
  return getUser(req.params.userId).then(function (user) {
      return getPostsForUser(user);
    }).then(function (posts) {
      return getCommentsForPosts(posts);
    }).then(function (comments) {
      return getAuthorsForComments(comments);
    }).then(function (authors) {
      return getProfilesForUsers(authors)
    });
}
```

## Key points

- Libraries like jQuery and knex and Angular return promises
- This lesson is about how to _use_ them
- Show the visual tree next to some actual code that's nested / chained
- Talk about "resolving"
- Talk about how the inner-most promise is what the "resolved" value is

### Draw it

Draw promises like a file structure / tree structure.

```
do something
    |
    --------- _then_ do something else
                      |
                      --------------------- _then_ do some third thing
```

Can be helpful to draw the promises at each level of the tree as a box, and it gets filled with the value, and how the inner-most promise is what's returned.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/80/promise-chain-example.png)

## Get into it

- Have them clone https://github.com/gSchool/promise-challenges
- Talk through the codebase (have them read things aloud, do some things together)
- Do the first couple together
- Have them go off on their own to do it with support
- Tell them there's a solution branch

## Notes

Promises are hard.  Push the students to really grok these - it's OK if it takes a week or two - it's worth it.  

These exercises are designed to be harder than most of the promise code they'll write on a daily basis in most app development shops.  But when it's time to pull out the complex promise code, they'll be prepared!

Plan on multiple small group workshops.

https://medium.com/@isntitvacant/observations-on-promises-2b08a0d0c27#.754mlbfog
