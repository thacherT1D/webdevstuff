
# Getting Started

To get started make sure you have **npm**, then in **terminal** run:

```
npm install -g stream-adventure
```

# Materials

For this exercise you will need to keep open your terminal, text editor, and web-browser.

# Objectives

By the end of this lesson you should feel very comfortable with the FS module, and using file streaming to read/write to files.  You should understand the advantages of streaming and why it is used all over the web.  You should be able to create your own read streams, transform streams, and write from that stream to some output or file.  You should be able to use pipe and explain what a chunk is.

# Stream Adventure (exercises 1 - 10)

In your terminal, type in:

```
stream-adventure
```

and you should see something like this with 15 exercises:

[![https://gyazo.com/45e888ef19d81bfaed9ff8ca4d3dbbff](https://i.gyazo.com/45e888ef19d81bfaed9ff8ca4d3dbbff.png)](https://gyazo.com/45e888ef19d81bfaed9ff8ca4d3dbbff)

Go ahead and get started by selecting 'beep boop'. Read the instructions and create the `program.js`.  Once you're finished with that, see how much further you can go.  

Come back here to review everything up until exercise 3, INPUT - OUTPUT.

### Review 1-3

[![https://gyazo.com/9715427e8af007ad06e386a1dd035f9d](https://i.gyazo.com/9715427e8af007ad06e386a1dd035f9d.png)](https://gyazo.com/9715427e8af007ad06e386a1dd035f9d)

What is a stream?
Streams let you read data from a source, or write data to a destination one `chunk` at a time.  This is in contrast to other methods that read and write files at once.  You use streams all the time when you visit a webpage because HTTP requests and responses are both streams.  

If you read the instructions on the 'MEET PIPE' challenge, they tell you to use something very interesting here: `process.stdout`.  This is very similar to console.log.  


> **Deep Dive**
>
> *What is process.stdout?*
>
> - [Node process.stdout documentation](https://nodejs.org/api/process.html#process_process_stdout)
>
> *What is process?*
>
> - [Node process documentation](https://nodejs.org/api/process.html#process_process)
>
> *What is an Event Emitter?*
>
> - [Node EventEmitter documentation](https://nodejs.org/api/events.html#events_class_events_eventemitter)
>
> - [Node Events and EventEmitter](http://www.sitepoint.com/nodejs-events-and-eventemitter/)
>
> *What is process.stdin?*
> - [Node process.stdin](https://nodejs.org/api/process.html#process_process_stdin)

### Review 4-6

[![https://gyazo.com/e2183da69e9b5d831b6b78a5416113c4](https://i.gyazo.com/e2183da69e9b5d831b6b78a5416113c4.png)](https://gyazo.com/e2183da69e9b5d831b6b78a5416113c4)

These sections are focused on transforming and manipulating streams as they are being read.  Note that reverse works with concat-stream's because it streams in the entire read source, and only after that reverse is run.

> **Deep Dive**
>
> *How to use through2*
>
> - [through2 readme.md and repository](https://github.com/rvagg/through2)
>
> *How to use concat-stream*
>
> - [concact-stream readme.md and repository](https://github.com/maxogden/concat-stream)
>

### Review 7-10

[![https://gyazo.com/a0dae0102f9e16b9654cd50429e70e0e](https://i.gyazo.com/a0dae0102f9e16b9654cd50429e70e0e.png)](https://gyazo.com/a0dae0102f9e16b9654cd50429e70e0e)

> **Deep Dive**
>
> *How to use createServer*
>
> - [Node docs on http module createServer method](https://nodejs.org/api/http.html#http_http_createserver_requestlistener)
>
> *How to use Websocket*
>
> - [Websocket stream readme and repository](https://github.com/maxogden/websocket-stream)
>
> *How to use node-trumpet*
>
> - [Node-trumpet readme and repository](https://github.com/substack/node-trumpet)
