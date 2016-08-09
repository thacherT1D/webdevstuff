# Authentication with Angular and JSON Web Tokens.

## Objectives:

- Describe the advantages of using JWT's
- Implement an authentication schema using JWT's
- Use interceptors to respond to HTTP requests/responses globally

## Resources:

Clone and fork the following repository [angular-jwt](https://github.com/gSchool/angular-jwt).

## Introduction to Token Authentication

Now that we are getting more comfortable building applications with the MEAN stack, it's time to add authentication to our application. This is one of the more difficult topics when learning about how to build Single Page Applications. Before continuing - answer the following questions

1. What is authentication? What is authorization?
2. How have you previously implemented authentication?

For the second answer, you might have thought of something like cookies and sessions, where you would authenticate the user on every request with some cookie data that is sent to the server, but there is another way that we can authenticate users as well - we can use tokens.

First off, what is a token? Simply put, it is a piece of information that is used as a lookup mechanism. All it really is, is a signed (secured) string that is sent to the server on every request. So why would we want to use tokens?

## Why use tokens instead of cookies?

Now that we have a basic understanding of what a token is - let's think about why we might want to use it over cookies?

Before the emergence of single page applications, we usually had a single client and server and used cookies/sessions to maintain state and handle authentication. However, the way we structure our applications has changed   greatly over the past couple years.

We now have many different technologies and tools and our Single Page Applications consume multiple APIs. We can easily have an application that uses a Node API, a Rails API as well as other Web/Mobile APIs. This makes it a nightmare and almost impossible to try to share cookie/session data between these APIs. It would be really nice if we could have one single "secret" (a key we store on a server) on all of our servers and share the token between each one!

Some other advantages include performance, Cross-Site Request Forgery (CSRF) protection, ease of testing and mobile development. You can read more about these advantages [in this article](https://auth0.com/blog/2014/01/07/angularjs-authentication-with-cookies-vs-token/). Do not go into the implementation section of the blog post. This article includes a working example.

## Introducing JSON Web Tokens

So now that we know that tokens are a better option, what kind of token should we use? The most popular tool right now are JSON Web Tokens (JWT for short - pronounced "Jot"). So what is a JWT?

From [jwt.io](https://jwt.io):

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with HMAC algorithm) or a public/private key pair using RSA.

That's quite a lot. Let's try to understand this a bit more by reading the documentation...

## Exercise 1

Read [http://jwt.io/introduction/](http://jwt.io/introduction/) introduction and answer the following questions

1. In your own words - what is a JSON Web Token?
1. Authentication is a great use case for JWTs, what other technologies/tools have you used for authentication previously?
2. What three parts comprise the structure of a JWT?
3. What data goes in the header?
4. What is a claim? Compare and contrast reserved, and private claims.
5. What is the signature? What stops someone from just making up their own JWT and gaining access to your site?
1. What is a HTTP header?
2. In the reading it states "it should send the JWT, typically in the Authorization header using the Bearer schema." What is the Bearer schema? What is another type of schema you can use with the Authorization header?
3. What is Cross-Origin Resource Sharing? Why is this not a problem when using JWTs?
4. What other types of tokens exist? Why is JWT easier to work with than some other options?

## Additional Resources

1. [The Anatomy of a JSON Web Token](https://scotch.io/tutorials/the-anatomy-of-a-json-web-token)
1. [Understanding JSON Web Tokens (JWT)](https://medium.com/vandium-software/5-easy-steps-to-understanding-json-web-tokens-jwt-1164c0adfcec#.h0649q1oi)

## JWT walkthrough

The following walkthrough will use as a framework the files and code
located in the `jwt-walktrough` folder. A completed solution is in the `jwt-completed` folder, the code there can be used as reference.

### Getting started

There are two folder, client and server, in order to use this application, you'll need to start two servers. Start `nodemon` in the server folder, and start `http-server` in the client server.


### Authentication

**In the Client App, Lets create a function to hit an endpoint**

Lets create a function that hits a server endpoint with a username and password:

In the `controller.js` file, add the following code to the controller named `controller`. Be sure to inject the `$http` service into the controller.

```js
vm.auth = function(user, password){
    $http.post('http://localhost:3000/authenticate',{username:user, password:password})
    .then(function(response){
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    });
  }
```

In the `index.html` file, lets add the input fields and the button to trigger the `auth` function.

```html
<input type="text" ng-model="c.user">
<input type="text" ng-model="c.password">
<button ng-click="c.auth(c.user, c.password)">Authenticate</button>
```

**In the Server App, lets install the required packages**

NPM install the following modules:

- cors
- express-jwt
- jsonwebtoken

In the `app.js` add require `cors` and add it as Middleware. We will require and use the other two as they are needed.

**In the Server App, lets create an express endpoint to hit**

In the `routes/index.js` route file, add the following require at the top of the file.

```js
var jwt = require('jsonwebtoken');
```

Next, lets add a route, `/authenticate`

```js
router.post('/authenticate', function(req, res, next) {
  if (!(req.body.username === 'john.doe' && req.body.password === '1234')) {
    res.status(401).send({message:'Wrong user or password'});
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, 'secret');
  res.status(200).json({ token: token });
});
```

In this block of code, we check for a specific username and password combination. If the username and password not match expectation, a 401 (Unauthorized) is sent back with a message.

Else, if the username and password match the expectation, a profile object is created, signed, and sent back as json to the client.

`jwt.sign()` return a token that contains the profile object as JSON, and is signed with the string `secret`. This secret is usually put in a `.env` file, but that step was skipped in this case for clarity.

**Current Behavior**

Before we continue, lets check the current behavior. When you click on `Authenticate` button in the front end, you should see the return on the API call in the browser console window. Try it both with correct and incorrect credentials.

**In the Client App, Store the token in Session Storage**

Update the auth function as seen below. Be sure to inject the `$window` service, it is used to access the Session Storage in the browser.

```js
vm.auth = function(user, password){
    $http.post('http://localhost:3000/authenticate',{username:user, password:password})
    .then(function(response){
      console.log(response);
      $window.sessionStorage.token = response.data.token;
      vm.message = "Logged in successful";

    })
    .catch(function(err){
      console.log(err);
      delete $window.sessionStorage.token;
      vm.message = "Log in unsuccessful";
    });
  }
```

The preceding code calls a server endpoint (which we setup previously), and if the call is successful, it stores the token that is returned in Session Storage. If the class is unsuccessful, it deletes any current tokens in Session Storage.

**In the Client App, Add logout button**

Logging out a user is as simple as deleting the token property from the sessionStorage object.

Add the following code to the controller, and add a button to trigger it(code not provided).

```js
vm.logout = function(){
  delete $window.sessionStorage.token;
  vm.message = "Log out successful"
}
```

### Bearer Tokens

**Client App, Create request to restricted endpoint**

The following function creates a request the the `api/restricted` endpoint (we have not made it yet). If the request is successful, it uses data in the response to update a variable in the view. If the request is unsuccessful, the updates the variable in the view with the error.

```js
vm.restricted = function(){
    $http.get('http://localhost:3000/api/restricted')
    .then(function (response) {
      console.log(response);
      vm.restrictedMessage = response.data.first_name + " " + response.data.last_name;
    })
    .catch(function(err){
      vm.restrictedMessage = err.statusText + ": " + err.data.message;
    })
  }
```

In the `index.html`, add a button to trigger the `restricted` function and a angular expression to display the `restrictedMessage`.

**Client App, Creating an Interceptor**

An interceptor is a functionality that Angular provides that allows us to specify code to run before a request to a server gets sent out, and before the response from a server is made available to our client (Angular) code.

Add the following two pieces of code to `app.js`

```js
app.factory('authInterceptor', ['$q', '$window', function ($q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
}]);
```

An interceptor is an object that has two methods, `request` and `response`. In order for `jwt` to be used, we need to attach it to the Authorization header. The token needs to be prefixed by the word `Bearer`, and a space. As long as the token exists, it needs to be attached to every request that the client makes to the server.

```js
app.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);
```

The preceding code, tells angular that the factory `authInterceptor` is an interceptor.


**Server App, Adding Middleware**

In `app.js`, require express-jwt at the top of the file.

```js
var expressJwt = require('express-jwt');
```

In `app.js`, require the `api.js` near the top of the file.

```js
var api = require('./routes/api');
```

In `app.js`, add the `/api` route as follows.

```js
app.use('/api', expressJwt({secret:'secret'}), api);
```

In the preceding code, `expressJwt({secret:'secret'})` is a piece of middleware that will return a 401 if the token is not precent, and if the content has been tampered with. The secret needs to match the secret that was used in `jwt.sign`. Otherwise, you'll always get a 401.

Since `expressJwt({secret:'secret'})` is just a piece of middleware, it can be used as to protect the routes that are defined after it.


**Server App, Creating a Restricted Endpoint**

In the `routes/api.js`, add the following route.

```js
router.get('/restricted', function (req, res) {
  res.json(req.user);
});
```

The expressJwt middleware, when authentication is successful, attaches a user property the the req object (`req.user`). The preceding code, just returns the contents of the object that was contained in the jwt back the the client.

**Final Application**
Now that all the pieces are in place, you should be able to login, logout, and make a request on a restricted endpoint. Try to send a request to the restricted endpoint when you are not logged in, what happens? Try to modify the token you got from logging on successfully, what happens when you try to hit the restricted endpoint?


## Additional Things to consider and read

Expiring Tokens - right now our tokens never expire, for security they should! Research how to add this to your JWT and see an example [here](https://github.com/sahat/satellizer/blob/master/examples/server/node/server.js)

[https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/#token-cross-domains](https://auth0.com/blog/2014/01/27/ten-things-you-should-know-about-tokens-and-cookies/#token-cross-domains)

[https://stormpath.com/blog/token-auth-spa/](https://stormpath.com/blog/token-auth-spa/)

If you would like to use passport for authentication - this is a great example.
[http://mherman.org/blog/2015/07/02/handling-user-authentication-with-the-mean-stack/#angular-app](http://mherman.org/blog/2015/07/02/handling-user-authentication-with-the-mean-stack/#angular-app)

## Exercise 2 - Full Stack Crud App with Authentication and Authorization! Yay!

Create a todo application that can have multiple users. Follow these guidelines:

- Create a seed file with usernames and passwords (3-4 users).
- Passwords should not be encrypted. The purpose of this exercise is to use JWT, password encryption is a stretch goal.
- Account owners should be able to add, delete, update, and display to do items.
- Users should be able to see other users todos, but not be able to update and delete them.


Stretch Goals:

- Create a user registration page.
- Store encrypted passwords.
- Style the application.
