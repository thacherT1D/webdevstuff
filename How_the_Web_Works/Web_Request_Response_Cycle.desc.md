## Objectives

* Issue GET requests with cURL
* Issue POST requests with cURL
* View and Issue HTTP Requests with cURL and Postman
* Read HTTP Response Bodies
* Diagram HTTP Request and Response Lifecycle

## How does the Web work?

Knowing how the internet works at a deeper level is essential when becoming a web developer.  The goal of the lesson is to be able to describe clearly what happens from typing a website domain, all the way to displaying a web page.

```
brew install httpie
```

## What's the history of the Internet?

[History of the Internet](https://www.youtube.com/watch?v=9hIQjrMHTv4)

## Intro To The Web

[How The Internet Works](https://www.youtube.com/watch?v=7_LPdttKXPc)

## DNS Lookup & IP Addresses
__DNS__, or __Domain Name System__ is a distributed set of servers that looks up an IP address for a human readable domain, like [https://www.google.com/](https://www.google.com/).

#### Exercise

Using chrome developer tools and the network tab, figure out the IP address for a popular site like google.

## Data Transmission

![Data Transmission](http://odetocode.com/aimages/http/netlayer.png)

### TCP/IP - One Protocol To Rule Them All

Thank TCP/IP for the modern web- it's the underlying transport protocol that gets everything where it needs to go. It's the standardized way that all internet devices talk to one another.

__TCP__ or Transmission Control Protocol is responsible for ensuring that data gets to and from a server reiably and in a timely manner.  The internet is an unreliable place so TCP can handle retransmitting things that fail to send.  It also has the job of taking a bigger chunk of data and breaking it down into smaller packets that get sent out.

__IP__ or Internet Protocol is responsible for getting the packets to the correct place.  The IP address is analogous to a physical street address that the IP layer uses to route packets to the right place.

### HyperText Transfer Protocol - aka http://

HTTP is the protocol browsers, servers, and other programs on the internet use to issue requests to one another. Servers need to be able to read requests that are formatted in a predictable way. In the Querystring Parsing exercise, you learned to look at a string and turn it into data. Servers use a similar methodology to parse incoming text-based HTTP Requests.  A client can send a request to an HTTP server and get a response which in most cases is a web page, css file, javascript file, image, etc.

#### __HTTP General Format__
A HTTP request in general has a start line, 0 or more headers, an empty line and optionally a body.  More specifically, in a HTTP request, there is a request line (the start line): ```GET /hello.html HTTP/1.1```. And in an HTTP response, there is a status line for the start line:  ```HTTP/1.1 200 OK ```

#### __HTTP Verbs__
HTTP has several "verbs", which are standard words that help servers understand what kind of request they're getting. These verbs describe what you're trying to do.
Mainly, you'll be doing GET and POST requests, but you may do some PUT and DELETE requests as well.
**GET** is used when you want to get a resource, like a webpage. When you open up a url in your browser, you're issuing a GET request.  
**POST** is used when you want to send the server some information. When you submit a form to a webserver, often you're using a POST request to do it. A POST submission of a form in HTML is different in that you don't see the form values in the URL, they are instead inside the _request body_.  
**PUT** is something mostly not used except by other servers and AJAX calls. It's for updating information on a server that already exists.  
**DELETE** is for when you want to tell a server that it needs to remove a resource. When we get into REST APIs, you'll be using both PUT and DELETE a lot.  

#### __HTTP Status Codes__
HTTP has a number of codes that you might receive as a response. They're meant for computers to easily parse what has happened. They're three-digit numbers that tend to fall into this pattern:  
**5XX** : Some kind of error has happened  
**4XX** : I couldn't give you what you asked for, but there wasn't an error on my end  
**3XX** : You have to go somewhere else to get what you want  
**2XX** : You got what you want in some form  
**1XX** : You're in the process of getting what you want, keep going  

For a rundown of what each one of the status codes means, [see the Wikipedia entry](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). For a way cooler resource, see [HTTP Status Cats](https://http.cat/)


### Let's make our first HTTP Request

Make sure you have [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) installed. Now, open Postman and make a GET request to google.com.

__Sample GET request using Postman__

```
GET  HTTP/1.1
Host: www.google.com
Cache-Control: no-cache
Postman-Token: 4ce8b655-abae-8aed-af11-058633be3129
```

__Sample Response__

```
HTTP/1.1 200 OK
alternate-protocol: 443:quic,p=1
cache-control: private, max-age=0
content-encoding: gzip
content-type: text/html; charset=UTF-8
date: Tue, 12 May 2015 14:12:05 GMT
expires: -1
server: gws
status: 200 OK
version: HTTP/1.1
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block

<!doctype html><html itemscope="" itemtype="http://schema.org/WebPage" lang="en"><head><meta content="Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for." name="description"><meta content="noodp" name="robots"><meta content="/images/google_favicon_128.png" itemprop="image"><meta content="origin" id="mref" name="referrer"><title>Google</title>   <script>(function(){window.google={kEI:'yglSVaXsAYKZsAWknIDwDg',kEXPI:'3700062,3700334,3700366,4014789,4017578,4023709,4024035,4026111,4029815,4030091,4030312,4032500,4032643,4032645,4032678,4033143,4033191,4033344,4033372,4035295,4035327,4035980,4036006,4036054,4036533,8500394,8501248,8501280,8501295,8501350,8501406,8501489,10200083,10200835,10201102,10201181',authuser:0,j:
...
```

Now, generate a code snippet by clicking the code snippet button. You should be able to generate it in multiple languages. For now, select cURL.

Copy the code snippet you have- you should get something like this:
```shell
curl -X GET -H "Cache-Control: no-cache" -H "Postman-Token: 20f68a93-c63b-7579-c687-5853dc486f3c" 'http://google.com'
```

Try running it in your console- what do you get?

#### Curl
The program we just introduced was called cURL. It's a terminal program that can do one of the most important functions of your browser- it can send requests to webservers, and show responses. It doesn't render them nicely like your browser does, but it does show you the response.

Next we are going to make some requests to a server to GET and POST data about the class.  To do that, we'll use curl.

__Curl__ is a command line utility that can do pretty much anything your browser does for you to interact with a web server.

Run these commands in your terminal, and paste each one into [Explain Shell](http://explainshell.com/) as well.

Gets the html page at the path / for google.com

```
curl -X GET https://www.google.com
```

Gets the html page at the path / for google.com.  Also adds the verbose flag to tell us what the request and response looks like.

```
curl -v -X GET https://www.google.com
```

Gets the html page at the path / for google.com.  Adds trace ascii to see the details of the request and response.

```
curl --trace-ascii /dev/stdout -X GET https://www.google.com
```

Curl has many parameters, for example to add a header to the request:

```
curl -v -H "Accept: text/html" -X GET https://www.google.com
```

We can even specify cookies to be sent with the request.  In the example, the name of
the cookie is cookie and the value is jar.

```
curl  -v -H "Accept: text/html" --cookie "cookie=jar" -X GET https://www.google.com
```

We could also do a post request with cURL:

```
curl -v -X POST https://www.google.com
```

What is a POST request? Why would we use one? How does it differ from a GET request?

A POST request is used in order to send data from the requestor to the server. The server can then parse the _request body_ in order to get information out of it, and often do something on the server with that information (like put it in a database).

Here's how we'd put data in the body of the request using cURL.

```
curl -v --data @myfilenamewithdata.json -X POST https://www.google.com
```
(For this to work, you have to specify a file with JSON inside.)

Can you work out how to do this in Postman?

When you specify data in a POST request, it is a good idea to tell the server the type of the
data in the request:

```
curl -v -H "Content-Type: application/json" --data @myfilenamewithdata.json -X POST https://www.google.com
```

What did you get back when you made that request?  What went wrong?


#### JSON
__JSON is JavaScript Object Notation__. It is the de facto data exchange format of the web.  The structure of JSON is a key value pair hash, very similar to object notation in Javascript.  It is important to keep in mind that JSON data is only a string that represents objects like arrays and objects.  The JSON data must be parsed in order for it to have meaning in a program.

#### JSON Examples

__Empty JSON__

```
{ }
```

__Map__

```
{ "company" : "Github", "age": 7, "categories" : "Services,Internet,Software"}
```

__Array__

```
["Github", "Airbnb", "Square", "Dropbox"]
```

__Complex JSON__

```
{ "Companies":[ { "company": "Github", "age": 7, "categories": "Services,Internet,Software"},
			  { "company": "Airbnb", "age": 6, "categories": "Hotels,Travel"},
			  { "company": "Square", "age": 7, "categories": "FinTech,Hardware + Software,Finance"},
			  { "company": "Dropbox", "age": 11, "categories": "Cloud Data Services,Storage,Web Hosting"}
			]
}
```

#### Parsing JSON

JSON's design was made with javascript in mind, so parsing JSON in javascript is easy.

__From JSON string to Javascript object__:

```
var companyArr = JSON.parse('["Github", "Airbnb", "Square", "Dropbox"]');
console.log(companyArr[0]);  // Prints Github to the console
```

__From javascript object to JSON string__:

```
var comanyArr = ["Github", "Airbnb", "Square", "Dropbox"];
var companyJson = JSON.stringify(companyArr);
console.log(companyJson);  // Prints the json string that represents the array
```

### Exercise

Go to this [student roster page](https://fs-student-roster.herokuapp.com/). Your job is to add a student profile of yourself to this page. Notice that there's no web form. To add your student profile, you'll have to use Postman to communicate to the application through its **web API**.

1. To get started, send a `GET` request to https://fs-student-roster.herokuapp.com/.

1. Send another request, but this time set the request's `Accept` header to `application/json`. What's different about this response?

1. Now send a `POST` request to the same URL. What's different about this response?

1. Add a JSON object with the following key/value pairs to the request body.
  * `name` - Your full name as a `String`
  * `hobby` - Your favorite hobby as a `String`
  * `avatar` - A URL of your profile picture as a `String`

1. Once the request body is formatted correctly, send this `POST` request. What's different about this response?

1. Switch back to `GET` and send another request. What's different about this response?

### Stretch Assignment

[HTTP Header Parser](https://github.com/gSchool/http-parser-js)

## A few other protocols

#### DHCP - Dynamic Host Configuration Protocol

DHCP is used for allocation of dynamic IP addresses to computers in a network.

#### LDAP - Lightweight Directory Access Protocol

LDAP is used for collecting information about users and e-mail addresses from the internet.

#### SSL - Secure Sockets Layer

The SSL protocol is used to encrypt data for secure data transmission.

#### TLS - Transport Layer Security

The TLS protocol is a newer and more secure version of SSL.

##### Still confused about TCP/IP vs HTTP? Check out these articles


http://stackoverflow.com/questions/23157817/http-vs-tcp-ip-send-data-to-a-web-server
http://www.differencebetween.net/technology/internet/difference-between-tcp-and-http/
http://www.quora.com/What-is-the-difference-between-HTTP-protocol-and-TCP-protocol



# APIs From the Front End

# Get Ready

## Entry Ticket

Before you start this Learning Experience, you should be familiar with:

* DOM Manipulation using JavaScript.
* AJAX with JavaScript and JQuery.
* The basics of HTTP.


## Materials / Setup
During this Learning Experience, you'll likely want to use the following materials:

* [Online Movie Database API documentation](http://omdbapi.com/)
* [Postman](https://www.getpostman.com/)


## Objectives

After this Learning Experience students should:

* Define the term API.
* Define the term "Service Oriented Architecture"
* Use the OMDB API to fetch information about movies.

## Key Terms

* [API - "Application Program Interface"](https://en.wikipedia.org/wiki/Application_programming_interface)
* [Service Oriented Architecture](https://en.wikipedia.org/wiki/Service-oriented_architecture)
* [REST - "REpresentational State Transfer"](https://en.wikipedia.org/wiki/Representational_state_transfer)

# Coursework

## Introduction

API, or Application Program Interface, is a broad term used to describe any set of protocols for interacting with a computer program. These protocols can be thought of as a contract between two programs the __client__ program and the __server__ program. An API allows the client program to send requests to the server program, and the contract defines how the server will respond to that request.

In web development, more often than not, the client program is a web browser running a JavaScript application and the server program is a web server. Furthermore, the term API is frequently used by web developers to refer to a specific type of API. One which provides raw data based on the request parameters of an HTTP request.

### APIs and the Dynamic Web

With the growing popularity of JavaScript and dynamic websites, there has been an increased need for __client__ applications to request and manipulate data directly. In the 1990's version of the internet, communication between browsers and web servers was largely limited to HTML & CSS. If the HTML needed to have any information from the webserver's database that information would be encoded to the HTML before the page rendered.

![](http://i.imgur.com/VbuGgIn.png)

If the user needed to get any new information, the browser would request a new page, and the server would encode that information into the HTML for that page. Imagine clicking "next page" on a search engine - the page reloads after the webserver fetches the paginated results.

With JavaScript, an API, and AJAX we can allow our user to stay on the page, and request the new data. This time imagine Facebook's infinite scroll feature. When we get to the bottom of the page, Facebook's JavaScript triggers an API request, and dynamically inserts HTML for that data into the page!

### Multiple Data Sources

Not only do API's allow us to fetch data from our own webserver (as in Facebook's infinite scroll) but it's also possible to use multiple APIs in a single page. Say we wanted to gather information from OMDB, Spotify, and Facebook all onto our web application. We could use the OMDB API, Facebook API, and Spotify API in conjunction to create an experience using data from all of these sources.

### An Example Request - OMDB API

One fantaistic API is the OMDB API. The __contract__ for this API is defined in the [OMBD API documentation](http://omdbapi.com/). After reading the documentation, we determine that we can use the query parameter `t` to search the database for movies with a specific title. Lets search IMDB for Game of Thrones:

[http://www.omdbapi.com/?t=Game of Thrones](http://www.omdbapi.com/?t=Game of Thrones)

We can make this request in Postman, or our browser, or through AJAX. Regardless, the same information will be returned to us. It's the following JSON:

```
{
  "Title": "Game of Thrones",
  "Year": "2011–",
  "Rated": "TV-MA",
  "Released": "17 Apr 2011",
  "Runtime": "56 min",
  "Genre": "Adventure, Drama, Fantasy",
  "Director": "N/A",
  "Writer": "David Benioff, D.B. Weiss",
  "Actors": "Peter Dinklage, Lena Headey, Emilia Clarke, Kit Harington",
  "Plot": "Several noble families fight for control of the mythical land of Westeros.",
  "Language": "English",
  "Country": "USA",
  "Awards": "Won 1 Golden Globe. Another 133 wins & 248 nominations.",
  "Poster": "http://ia.media-imdb.com/images/M/MV5BNTgxOTI4NzY2M15BMl5BanBnXkFtZTgwMjY3MTM2NDE@._V1_SX300.jpg",
  "Metascore": "N/A",
  "imdbRating": "9.5",
  "imdbVotes": "868,876",
  "imdbID": "tt0944947",
  "Type": "series",
  "Response": "True"
}
```

Try searching for a few of your favorite movies using the OMDB API and Postman!

### APIs and AJAX

JavaScript applications fetch data from APIs using AJAX. Lets fetch the same information about Game of Thrones using JQuery's `.ajax()` function:

```
$.ajax({
  url: 'https://www.omdbapi.com/?t=Game of Thrones',
  method: "GET",
  success: function(data) {
    console.log(data.imdbRating);
    console.log(data.imdbID);
    console.log(data.Actors);
  }
});
```

As you can see it's delightfully simple to use the OMDB API to get interesting data about a movie or show, and use it in our JavaScript application!

### REST - REpresentational State Transfer

The REST pattern, short for Representation State Transfer, is a series of rules for an API to follow. Not all APIs follow this pattern, and some only follow some of the rules, but REST is an extremely common pattern for APIs. APIs that follow all of the REST rules are reffered to as "RESTful services".

REST requires several HTTP methods to have specific meaning, as well as follow some additional constraints. Some of the most commonly adhered to constraints of REST are:

####Client and Server Have Separate Concerns

In RESTful services the server does not care about user interface, it is only concerned with raw data. A truly RESTful service will never encode information about __how__ to display something, it will only tell you what something is.

#### Requests are Stateless

Any client (web browser, curl, Postman ...) can make the same request and recieve an identical response from the server. There can never be context outside of the request itself. This means RESTful servers don't deal with cookies, sessions, or anything that is not a part of the HTTP request being served.

#### GET, POST, PUT, and DELETE Have Explicit Meaning

Wikipedia has a wondeful table about the special meaning of HTTP methods in a RESTful service.

<table>
<caption>RESTful API HTTP methods</caption>
<tbody><tr>
<th>Resource</th>
<th>GET</th>
<th>PUT</th>
<th>POST</th>
<th>DELETE</th>
</tr>
<tr>
<th>Collection URI, such as <code>http://api.example.com/resources/</code></th>
<td><b>List</b> the URIs and perhaps other details of the collection's members.</td>
<td><b>Replace</b> the entire collection with another collection.</td>
<td><b>Create</b> a new entry in the collection. The new entry's URI is assigned automatically and is usually returned by the operation.<sup id="cite_ref-thereisnorightway_10-0" class="reference"><a href="#cite_note-thereisnorightway-10"><span>[</span>10<span>]</span></a></sup></td>
<td><b>Delete</b> the entire collection.</td>
</tr>
<tr>
<th>Element URI, such as <code>http://api.example.com/resources/item17</code></th>
<td><b>Retrieve</b> a representation of the addressed member of the collection, expressed in an appropriate Internet media type.</td>
<td><b>Replace</b> the addressed member of the collection, or if it does not exist, <b>create</b> it.</td>
<td>Not generally used. Treat the addressed member as a collection in its own right and <b>create</b> a new entry in it.<sup id="cite_ref-thereisnorightway_10-1" class="reference"><a href="#cite_note-thereisnorightway-10"><span>[</span>10<span>]</span></a></sup></td>
<td><b>Delete</b> the addressed member of the collection.</td>
</tr>
</tbody>
</table>

Knowing about REST is useful, it can often help a developer predict what the response from any given API might be. Memorizing the meaning of these methods might not be incredibly useful, but knowing the exist will surely help you when you want to use APIs to do more than just fetch data.

### Service Oriented Architecture

As APIs (which are sometimes called __services__) become more ubiqutous on the web, a new form of web-server architecture is gaining popularity. Etsy, Facebook, and AirBnB all use the this "service oriented architecture" to power their web applications. At it's heart an "SOA" is a design where as much of the program logic as is possible takes place in the client, and the web server has only 2 tasks:

1. Serve the initial HTML/CSS/JavaScript to boostrap the application.
2. Respond to API requests for data.

SOA's have the benefit of being just as capable of sending JSON to a phone or tablet as JSON, and gives mobile and web applications a common language for fetching data. It also frees "server side" engineers to focus on doing a couple of things __very well__, while pushing the responsiblities of design, and UX, to the front end developers.


## More Examples

Go to this github repository and look at the code in app.js. There you will find more examples of using different APIs.

[https://github.com/gSchool/front-end-api-examples/](https://github.com/gSchool/front-end-api-examples/)

Clone the repo and run the code

```
$ git clone git@github.com:gSchool/front-end-api-examples.git
$ cd front-end-api-examples
$ python -m SimpleHTTPServer
```
In your browser navigate to [http://localhost:8000](http://localhost:8000) to see the code run.

[https://github.com/gSchool/front-end-api-examples/](https://github.com/gSchool/front-end-api-examples/)

Try changing the parameters of the API requests. How does the data change?

## Assessments / Exercises

[Spotify API Usage](https://github.com/gSchool/spotify-albums-and-tracks)


## Questions For Further Exploration

* What is the the main purpose of a RESTful API?
* Why might a company prefer a Service Oriented Architecture to the older "always serve HTML" pattern?
	* Can you think of an instance where the old pattern might be preferable?
* Whats an API you __wish__ you had access to?
