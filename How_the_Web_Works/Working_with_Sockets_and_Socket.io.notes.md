## Lecture on Sockets

Talk about how sockets create persistent connections.

If HTTP is like sending mail, sockets is like a phone call, where both sides can talk.

## Assignment
[Assignment Repo](https://github.com/gSchool/web-sockets-curriculum)

## Lecture on Socket.io

- It has a few different strategies, such as polling and sockets
- It's an abstraction on top of web sockets
- "Broadcast" means "everyone else but me"
- Demo the client and server sides

Cover

- `socket.emit`
- `io.sockets.emit`
- `socket.broadcast.emit`
- `socket.join`, `socket.leave`
- `io.sockets.in`
- `socket.broadcast.to`

Talk about Angular / Single-Page-App considerations like:

- `$apply` in the callbacks
- moving it to a service
- cleaning up events

## Exercise

Have half the class connect to one room directly to your computer (using your-hostname.local:3000) and the other half connect to a different room.  Watch as events stream in.

Then have students do the challenge for sending custom messages.