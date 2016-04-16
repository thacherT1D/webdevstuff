[Slides](https://docs.google.com/presentation/d/1JwgJOjsMuScIJMawBYdbZvwrfTwQp81ChkW1-p2387k/edit?usp=sharing)

[Installing Express](http://expressjs.com/en/starter/installing.html)

[Getting started: Hello world](http://expressjs.com/en/starter/hello-world.html)

[Getting started: Basic routing](http://expressjs.com/en/starter/basic-routing.html)

[Guide: Routing](http://expressjs.com/en/guide/routing.html)

[Express API Docs](http://expressjs.com/en/4x/api.html)

# How do you install Express?

npm install --save express


# What is the conventional variable used for an Express application?

app

# How do you create an express application?

Invoke the top-level express() function exported by the Express module.

# What is the app.listen() method a convenience method for?

app.listen = function() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};

https://github.com/strongloop/express/blob/master/lib/application.js#L616

# What is an express route?



# How do you create an express route?

app.METHOD

# What is a route a combination of?

Request Type (GET, POST etc.) and Path

# What are the 2 parameters to a route callback?


Request and Response

# How do you send a response to the client?

res.send(value)

# What other methods does the response provide for sending data to the client?

res.json, res.jsonp res.send, res.sendFile, res.render, res.sendStatus

# What are 2 ways of passing data into express?

URL Parameters
Query Parameters


PUSH

# Name 2 templating engines commonly used with Express

# How do you create a nested express route defined in it's own file?