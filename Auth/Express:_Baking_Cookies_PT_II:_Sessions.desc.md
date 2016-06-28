# Baking Cookies Part II: Sessions

## Objectives

By the end of this lesson you will be able to:

- Describe the purpose and function of a session.
- Store a session in a cookie.
- Clear a session from a cookie.
- Use environment variables to store session key.

***

## Sessions

A session is a unique identifier that maps to data.

It is used it ensure the data has not been tampered with or falsified.

A session can be stored:

- in databases like `mongo` or `postgres`.
- in memory data stores like `redis` or straight up node.
- in a `cookie` or a `JWT`.
- in many other forms.


***

## Sessions in Express

[Cookie-Session](https://github.com/expressjs/cookie-session) is a piece of middleware that provides:

- A way to set cookies and send them to the client.
- A way to sign cookies and verify their authenticity.

**You Do:**

Watch the following video, as you do consider the following questions:



<iframe src="https://player.vimeo.com/video/141306923?byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

### Using Cookie-Session

Set up the `cookie-session` middleware:

```javascript
var cookieSession = require('cookie-session')

app.use(cookieSession({
  name: 'session' //name of cookie to set
  // other cookie attributes like maxAge, expires,  domain can be set here
  keys: ['some_secure_key']
}));
```

Cookie session modifies the `req` object:

- `req.session` represents the session stored in the cookie.
- `req.sessionOptions` represents the settings of the session.


To read a session value:

```javascript
app.get('/', function(req,res){

  // get a value from the session and print it
  console.log('Some stored session value', req.session.someValue);

  res.end();
});
```

To set a session value:

```javascript
app.get('/', function(req,res){

  // set a session value
  req.session.otherValue = 'foo';

  res.end();
});
```

To delete a session:

```javascript
app.get('/', function(req, res){
  req.session = null;
});
```

***

## Exercise

[Github Repo]()

***

## Resources

- [Github: Cookie-Session](https://github.com/expressjs/cookie-session)
- [Wikipedia: HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
- [Github: dotenv](https://github.com/motdotla/dotenv)
