By the end of this learning experience you should be able to:

- Describe what web sockets are in general (not specific to socket.io or Express)
- Describe what Socket.io does and why it exists
- Describe what Broadcast means in Socket.io
- Add socket.io to your app

Checkout the sample application here:

https://github.com/gSchool/express-angular-sockets

## Adding to a generated Express App

**Step 1**: Install socket.io

```
npm install --save socket.io
```

**Step 2**: Create a module for your code:

In `lib/io.js` require `socket.io`:

```
var io = require('socket.io')();
// your code here
module.exports = io;
```

**Step 3**: Attach the socket in `bin/www`

In order for your app to listen for socket requests on the same port as your web app, you need to attach the `io`:

```
var io = require('../lib/io');
var listener = server.listen(port);
io.attach(listener);
```

**Step 4**: Make a connection from the client

Somewhere in client code (for example in your layout, or from Angular) add:

```
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```
## Assignment
[Assignment Repo](https://github.com/gSchool/web-sockets-curriculum)



## Resources

- http://socket.io/
- http://briantford.com/blog/angular-socket-io
- https://github.com/btford/angular-socket-io-seed
- https://github.com/btford/angular-socket-io
- http://psitsmike.com/2011/10/node-js-and-socket-io-multiroom-chat-tutorial/
http://www.tamas.io/advanced-chat-using-node-js-and-socket-io-episode-1/
http://stackoverflow.com/questions/19156636/node-js-and-socket-io-creating-room

## Authentication

Web Sockets, like regular HTTP requests, are very easy to work with even outside of your app.  In the same way that developers can easily bypass client-side security by issuing cURL requests directly, malicious developers can easily make direct web socket connections to your application.

Two small examples of implementing auth with socket.io:

[Here](https://github.com/gSchool/socket-mongo-auth-examples) are two small examples of how you can implement authentication with socket.io. Be sure to research the underlying technologies (JSON Web Tokens and socket-io-express-session) that these apps use!

So you'll need to add some sort of authentication to prevent that.  Here are some links to get you started thinking about how to do that.

- https://auth0.com/blog/2014/01/15/auth-with-socket-io/ (old but good)
- https://facundoolano.wordpress.com/2014/10/11/better-authentication-for-socket-io-no-query-strings/ - complex
- https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications - mdn
