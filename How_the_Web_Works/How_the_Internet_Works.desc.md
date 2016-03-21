# How The Web Works
Knowing how the internet works at a deeper level is essential when becoming a web developer.  The goal of the lesson is to be able to describe clearly what happens from typing a website domain, all the way to displaying a web page.

### Objectives

* Issue GET requests with cURL
* Issue POST requests with cURL
* View and Issue HTTP Requests with cURL and Postman
* Read HTTP Response Bodies
* Diagram HTTP Request and Response Lifecycle

### Key Terms

* HTTP
* GET and POST
* HTTP Verbs
* HTTP Status Code


### Materials
* Install [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en) into Chrome

## History

* __1960s__ ARPANET - The beginnings of the internet
  *  Professor Leonard Kleinrock at UCLA sent the first message over a wide area network to a computer at Stanford Research Institute
  * The internet is born!

* __1980s__ TCP/IP standardized
   * TCP/IP is the specification that is still used on the internet today
   * It's the building blocks of HTTP and allows lower level computer to computer communication

* __1989__ Tim Burners-Lee invents what becomes the world wide web while at CERN
   * The idea of the internet as we know it today was derived here
   * [The first website](http://info.cern.ch/hypertext/WWW/TheProject.html)
   * Burners-Lee also found the W3C which is a standards group that still creates web standards today

* __1993__ Mosaic Browser (Later Netscape)
   * The first popular browser was created at UIUC by [Marc Andreessen](http://en.wikipedia.org/wiki/Marc_Andreessen)
   * After Andreessen graduated, he formed a company and created Netscape Navigator
* __1993 - 1999__ Rapid rise in popularity of the world wide web
* __1995__ Javascript created in 10 days by Netscape
* __1999__ Microsoft creates the XMLHTTP ActiveX control in Internet Explorer 5, which was later adopted by Mozilla, Safari, Opera and other browsers as the XMLHttpRequest JavaScript object.
* __2005__ The term AJAX is coined and gains tremendous popularity
* __2009__ EMCAScript 5 is agreed upon, javascript becomes more unified


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
