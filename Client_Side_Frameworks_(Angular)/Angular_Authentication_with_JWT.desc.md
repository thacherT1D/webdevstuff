## Objectives

* Explain what a JSON Web Token (JWT) is.
* Build an authentication route that produces a JWT.
* Use a JWT to authenticate to a web service.

## Setting up the server

Please navigate to [https://github.com/gSchool/todo-angular-server](https://github.com/gSchool/todo-angular-server). Fork and clone the repository into the directory of your choice and place it next to your original todo code.

Inside your directory, install all the dependencies needed and make a public folder.

```sh
$ cd todo-angular-server
$ npm install
$ mkdir public
```

We are going to copy all your original angular application into that public file.

```sh
$ cp ../<YOUR ORIGINAL TODO FOLDER>/* public
```

Ensure that PostgreSql is running and create the following databases.

```sh
$ brew services start postgresql
$ createdb todo_dev
$ createdb todo_test
```

Migrate to the latest and provide the correct seed files.

```sh
$ npm run knex migrate:latest
$ npm run knex seed:run
```

Verify you have a working server by running the server and ensuring no errors occur.

```sh
$ npm start
```

Once verified, navigate to your browser and check out `localhost:8000`. Check that your Angular todo application pops up and works as expected. There are no connections to the server as it is still navigating to another server.

## What is a JSON web token (jwt)?

From [jwt.io](jwt.io):

> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with HMAC algorithm) or a public/private key pair using RSA.

[http://jwt.io/introduction/](http://jwt.io/introduction/)

## Adding JWTs to our website

First we need to install a library that generates and verifies JWTs.

```sh
$ npm install --save jsonwebtoken
```

In our `routes/token.js`

```javascript
const jwt = require('jsonwebtoken');

// ...

const expiry = new Date(Date.now() + 1000 * 60 * 60 * 3); // 3 hours
const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', {
  expiresIn: '3h'
});

res.cookie('accessToken', token, {
  httpOnly: true,
  expires: expiry,
  secure: router.get('env') === 'production'
});
res.cookie('loggedIn', false, {
  expires: expiry,
  secure: router.get('env') === 'production'
});

// ...

res.clearCookie('accessToken');
res.clearCookie('loggedIn');
```

Let's create a file called `middlewares.js`.

```javascript
const jwt = require('jsonwebtoken');

const checkAuth = function(req, res, next) {
  jwt.verify(req.cookies.accessToken, 'SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.token = decoded;
    // You can now access the payload via req.token.userId
    next();
  });
}

module.exports = { checkAuth };
```

In `routes/persons.js`.

```javascript
const { checkAuth } = require('../middleware');

router.post('/api/persons', checkAuth, (req, res, next) => {
  // ...
});
```

and `routes/todos.js`.

```javascript
const { checkAuth } = require('../middleware');

router.post(`/api/persons/:personId/${initials}-todos`, checkAuth, (req, res, next) => {
  // ...
});
```

## Authenticating through our client

Let's add a service that handles our authentication. Add the following to our `services.js` file.

```javascript
const server = '/api/persons';
app.factory('auth', auth);
auth.$inject = ['$http'];

// ...

function auth($http) {
  return {
    login: (email, password) => {
      return $http.post('/api/token', { email, password })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    },
    logout: () => {
      return $http.delete('/api/token')
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw err;
        });
    }
  };
}
```

## Review Client Side Routing

```html
<div>
  <form>
    <label for="email">Email</label>
    <input id="email" type="text" placeholder="email" ng-model="authCtrl.email"><br>
    <label for="password">Password</label>
    <input id="password" type="password" placeholder="password" ng-model="authCtrl.password"><br>
    <button ng-click="authCtrl.login()">Login</button>
  </form>
</div>
```

```html
<div ng-controller="AuthCtrl as authCtrl">
  <a ng-href="#/login" ng-if="!authCtrl.isLoggedIn()">Login</a>
  <a href="" ng-if="authCtrl.isLoggedIn()" ng-click="authCtrl.logout()">Logout</a>
</div>
```

```javascript
(function() {
  'use strict';

  const app = angular.module('todoApp');

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'PeopleCtrl',
        controllerAs: 'peopleList'
      })
      .when('/person/:id', {
        templateUrl: 'person.html',
        controller: 'PersonCtrl',
        controllerAs: 'personCtrl'
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
      });
  });
}());
```

## Connecting the pieces together with a controller.

In our `index.html` file, add the following script tag. This will enable checking for cookies in our angular application.
```html
<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular-cookies.js"></script>
```

In our `app.js` file, let's include the `ngCookies` module.

```javascript
angular.module('todoApp', ['ngRoute', 'ngCookies']);
```

Now, it's time to add the auth controller. In our `controllers.js` file.

```javascript
app.controller('AuthCtrl', AuthCtrl);
AuthCtrl.$inject = ['auth', '$location', '$cookies'];

// ...

function AuthCtrl(auth, $location, $cookies) {
  this.email = '';
  this.password = '';

  this.isLoggedIn = () => {
    return $cookies.get('loggedIn');
  }

  this.login = () =>{
    auth.login(this.email, this.password)
      .then((user) => {
        $location.path('/');
      })
      .catch((err) => {
        alert('Login Failed');
      });
  };

  this.logout = () => {
    auth.logout();
  };
}
```

## Adding Auth between our server and the Galvanize TODOs web service.

In `routes/persons.js`.

```javascript
router.post('/api/persons', (req, res, next) => {
  request.post({
    url: `https://galvanize-todos.herokuapp.com/${initials}-persons`,
    json: {
      name: req.body.name
    },
    headers: {
      Authorization: `Bearer ${req.cookies.accessToken}`
    }
  })
  .then((json) => {
    res.send(json);
  })
  .catch((err) => {
    next(err);
  });
});
```

In `routes/todos.js`.

```javascript
router.post(`/api/persons/:personId/${initials}-todos`, (req, res, next) => {
    const { text, completed } = req.body;

    request.post({
      url: `https://galvanize-todos.herokuapp.com/${initials}-persons/${req.params.personId}/${initials}-todos`,
      json: {
        text,
        completed
      },
      headers: {
        Authorization: `Bearer ${req.cookies.accessToken}`
      }
    })
    .then((json) => {
      res.send(json);
    })
    .catch((err) => {
      next(err);
    });
  });
```

## Resources

[Where to Store your JWTs – Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)
Identity as a Service that uses JWTs [Stormpath](https://www.stormpath.com) and [Auth0](https://www.auth0.com)
