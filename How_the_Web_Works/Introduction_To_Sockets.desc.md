What are Web Sockets? Real time bi-directional connection between a Client and a Server! Up until now how does our client/server interaction go?

* The client sends a request to the server
* The server sends a response back to the client

...right?

Well now with web sockets we are establishing a persistent connection between the client and the server. Kind of like talking on the phone with someone. Both sides are now able to emit and listen (request and respond) with out waiting on the other. The server can continuously emit while the client merely listens, both can emit whenever, or neither have to!

<hr style="margin: 5rem 0;"/>

## Curriculum

For this article we will primarily be working our way through gSchool's [Web Socket Curriculum](https://github.com/gSchool/web-sockets-curriculum).

<br>
### Additional Resources

* [Socket Chat Example](https://github.com/gSchool/socket_chat_example)
* [Express/Socket.io Starter](https://github.com/gSchool/express-socket.io-starter)
