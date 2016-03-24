# Server Side Requests

__Objectives__

* Understand why you would want to make requests on the server side, give examples
* Use the request module to make GET and POST requests
* Make server side requests with express

## Reasons For Server Side Requests

__Questions for the class__

* What are some reasons for sever side requests?  
* What browser security policy might prevent us from using an api on the client side?
* Why would you want requests for a service like S3 to happen mainly on the server side?
* What are some other examples of APIs that you'd prefer on the server side?
* Define __Service Oriented Architecture__

### Request Module
[NPM request](https://www.npmjs.com/package/request)

The request module allows us to make server side HTTP requests.  Installing the request module into your node app is the same as always:

```
npm install --save request
```

#### GET Requests

Making a get request is also straight forward:

```
var request = require('request');
request('http://stark-mesa-8417.herokuapp.com/', function (error, response, body) {
  if (error) {
	console.log("Error!  Request failed - " + error);
  } else if (!error && response.statusCode === 200) {
	console.log(body);
  }
});
```
This will default to making a get request to the student roster app we used before.  We can also specify that the request is a get to be a little more clear.  This is preferred for readability:


```
var request = require('request');
request.get('http://stark-mesa-8417.herokuapp.com/', function (error, response, body) {
  if (error) {
	console.log("Error!  Request failed - " + error);
  } else if (!error && response.statusCode === 200) {
	console.log(body);
  }
});
```

---

#### Exercise

Make 2 simple apps with node:

1. A app that simply makes a get request to the [student roster page](https://fs-student-roster.herokuapp.com/) by default and console logs the body of the response. However, if the user specifies a `command line argument` for a url, the app should make a request to the specified url instead.

2. Write a node app that takes a imdb id as a command line argument and then makes a get request to the [OMDB api](http://www.omdbapi.com/) for details about that movie.  

The app should console log: 

* title
* year
* actors
* genre
* runtime (movie length)  

Keep in mind what type of data the body of the response is.  What does the following request return:

```
node app.js tt3899796
```

---

#### POST Requests

The request module provides a ```.post``` convenience method as well, but the easiest way to use post and specify json data is to use an options hash as a parameter to post.  Here is an example:

```
var request = require('request');
var data = {name: 'Baxster',
            hobby: 'Surviving being thrown off bridges',
            avatar: 'http://cdn.bleedingcool.net/wp-content/uploads/2013/11/baxter-600x354.jpg'};

var jar = request.jar();
var cookie = request.cookie('login=g13seattle');
var url = 'https://fs-student-roster.herokuapp.com/';

jar.setCookie(cookie, url);
var options = {
  uri: url, 
  method: 'POST',
  json: data,
  jar: jar
};


request(options, function (error, response, body) {
  if (error) {
    console.log(error);
  } else if (!error && response.statusCode >= 400) {
    console.log(response.statusCode);
    console.log(body);
  } else if (!error && response.statusCode === 200) {
    console.log('Success!');
  }
});

```

#### Exercise

Follow the steps at the [google url shortener api docs](https://developers.google.com/url-shortener/v1/getting_started#APIKey) to get your own api key.  Look at the docs and figure out the requirements for making a url shortening request.  Write a node app that takes a url on the command line and shortens it. The app should console log the shortened url.  Take note of what type of object the body is when you get it back.

## Request Module With Express

What does the following express app do?

```
var express = require('express');
var app = express();

app.get("/", function (req, res) {
  var responseStr = "Hello World";
});

app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
});

```

![](http://2.bp.blogspot.com/-ahQdpvjvBFU/UTKWQHYSYXI/AAAAAAAAILw/D2GkbOfWVWI/s1600/a+a+a+garage+sale+gal+banner+385.jpg =700x0)

The take away is that the node app does not return a response until ```res.send``` or ```res.render``` is called.  So how can we integrate a server side request into our express app?


```
var express = require('express');
var request = require('request');
var app = express();

app.get("/", function (req, res) {
  request.get('http://www.omdbapi.com/?i=tt4331680&plot=short&r=json', function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      var result = "Title: " + movieData.Title + "<br>" + "Year: " + movieData.Year + "<br>";
      res.send(result);
    }
  });
});

app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
});

```

This code is a little problematic though.  If we get a non 200 response, we never return a response to the user.  Make sure to take care of the error cases as well:

```
var express = require('express');
var request = require('request');
var app = express();

app.get("/", function (req, res) {
  request.get('http://www.omdbapiii.com/?i=tt4331680&plot=short&r=json', function(error, response, body) {
    if (error) {
      res.status(500).send("You got an error - " + error);
    } else if (!error && response.statCode >= 300) {
      res.status(500).send("Something went wrong! Status: " + response.statusCode);
    } 
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);
      var result = "Title: " + movieData.Title + "<br>" + "Year: " + movieData.Year + "<br>";
      res.send(result); 
    }
  });
});

app.listen(3000, function () {
  console.log("Starting a server on localhost:3000");
});

```

## Resources
* [Request Module](https://github.com/request/request)
* [res.format](http://expressjs.com/api.html#res.format)
