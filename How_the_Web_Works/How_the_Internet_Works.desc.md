Knowing how the internet works at a deeper level is essential when becoming a web developer. The goal of this lesson is to be able to describe clearly what happens when you enter a website's URL into the address bar and understand more about what types of requests are being made.

* [Objectives](#objectives)
* [Getting Started](#getting-started)
* [History](#history)
* [How Does the Web Work?](#how-does-the-web-work)
* [Parts of a URL](#parts-of-a-url)
* [IP, TCP, and UDP](#ip-tcp-and-udp)
* [HyperText Transfer Protocol](#hypertext-transfer-protocol)
* [HTTP Status Codes](#http-status-codes)
* [Curl](#curl)
* [JSON](#json)
* [Exercise](#exercise)

<hr style="margin: 5rem 0;"/>

## Objectives

* Diagram and explain a URI
* Identify common protocols and explain their purpose
* Identify the parts of an HTTP request and response and discuss their purpose
* Discuss the semantics of common HTTP Verbs, Headers, and Status Codes
* Discuss and diagram Client-Server Model
* Send HTTP requests and view HTTP responses with Postman

<hr style="margin: 5rem 0;"/>

## Getting Started

Before we get started, run `brew install httpie`. We'll talk more about how to use this soon!

<hr style="margin: 5rem 0;"/>

## History

* __1960s__ ARPANET - The beginnings of the internet
  *  Professor Leonard Kleinrock at UCLA sent the first message over a wide area network to a computer at Stanford Research Institute
  * The internet is born!

* __1980s__ TCP/IP standardized
   * TCP/IP is the specification that is still used on the internet today.
   * It's the building blocks of HTTP and allows lower level computer to computer communication.

* __1989__ Tim Burners-Lee invents what becomes the world wide web while at CERN
   * The idea of the internet as we know it today was derived here.
   * [The first website](http://info.cern.ch/hypertext/WWW/TheProject.html).
   * Burners-Lee also found the W3C which is a standards group that still creates web standards today.

* __1993__ Mosaic Browser (Later Netscape)
   * The first popular browser was created at UIUC by [Marc Andreessen](http://en.wikipedia.org/wiki/Marc_Andreessen).
   * After Andreessen graduated, he formed a company and created Netscape Navigator.
* __1993 - 1999__ Rapid rise in popularity of the world wide web
* __1995__ Javascript created in 10 days by Netscape
* __1999__ Microsoft creates the XMLHTTP ActiveX control in Internet Explorer 5, which was later adopted by Mozilla, Safari, Opera and other browsers as the XMLHttpRequest JavaScript object.
* __2005__ The term AJAX is coined and gains tremendous popularity
* __2009__ EMCAScript 5 is agreed upon, javascript becomes more unified

<hr style="margin: 5rem 0;"/>

## How Does the Web Work?

[How the Web Works (Slides)](https://slides.com/wesleyreid/how-the-web-works/live);

<hr style="margin: 5rem 0;"/>

## Parts of a URL

The Uniform Resource Locator, or URL for short, is the full reference for a resource located on a specific computer. Another way to think of it is as the full address for a specific page or file.

A URL can be broken up into multiple parts. For example, take the following fake URL:

`http://sub.domain.com/blog/how-the-web-works.html?referrer=galvanize`

* `http`: This is the **protocol** (or scheme) by which the following address will be accessed. Other examples include `https`, `ftp`, and `data`.

* `sub.`: This is the **subdomain** of the main domain. Subdomains are often used to separate large swaths of contain away from the main site; they are also treated as their own address, which can help with Search Engine Optimization.

* `domain`: This is the main **domain** under which content lives.

* `.com`: This is called a **top-level domain** or TLD. [ICANN](https://en.wikipedia.org/wiki/ICANN) manages these and there are a variety of types.

* `/blog/`: This is a **directory** under which content lives. Depending on the type of site, this could relate to the actually underlying file structure however it can also simply be part of a generated path intended to give meaning.

* `how-the-web-works.html`: This is the file that is being accessed. As with directories, this may say something about the file structure of the site but, if there is not extension, it likely does not.

* `referrer=galvanize`: These are called **query parameters** and can be passed to any URL to provide additional meaning to the back-end service. When forms are submitted with a `GET` request, the form information is added up here.

You may hear about URIs instead of URLs. [This website](https://danielmiessler.com/study/url-uri/) will give you a quick description of the difference.

<hr style="margin: 5rem 0;"/>

## IP, TCP, and UDP

Thank TCP/IP for the modern web! It's the underlying transport protocol that gets everything where it needs to go. It's the standardized way that all internet devices talk to one another.

__IP__ or Internet Protocol is responsible for getting the packets to the correct place. The IP address is analogous to a physical street address that the IP layer uses to route packets to the right place.

__TCP__ or Transmission Control Protocol is responsible for ensuring that data gets to and from a server reliably and in a timely manner. The internet is an unreliable place so TCP can handle retransmitting things that fail to send. It also has the job of taking a bigger chunk of data and breaking it down into smaller packets that get sent out.

__UDP__ or User Datagram Protocol is used when it is more important to send more data quickly rather than making sure every piece of data is reliably received. For example, when speaking with someone over Google Hangouts it may be acceptable if a second of sound is missed.

<hr style="margin: 5rem 0;"/>

## HyperText Transfer Protocol

HTTP is the protocol browsers, servers, and other programs on the internet use to issue requests to one another. Servers need to be able to read requests that are formatted in a predictable way. A client can send a request to an HTTP server and get a response which in most cases is a web page, css file, javascript file, image, etc.

<br>
### HTTP General Format

A HTTP request in general has a start line, 0 or more headers, an empty line and optionally a body.  More specifically, in a HTTP request, there is a request line (the start line): ```GET /hello.html HTTP/1.1```. And in an HTTP response, there is a status line for the start line:  ```HTTP/1.1 200 OK ```

<br>
### HTTP Verbs

HTTP has several "verbs", which are standard words that help servers understand what kind of request they're getting. These verbs describe what you're trying to do.

Mainly, you'll be doing GET and POST requests, but you may do some PUT and DELETE requests as well.

* **GET** is used when you want to get a resource, like a webpage. When you open up a url in your browser, you're issuing a GET request.  

* **POST** is used when you want to send the server some information. When you submit a form to a web server, often you're using a POST request to do it. A POST submission of a form in HTML is different in that you don't see the form values in the URL, they are instead inside the **request body**.

* **PUT** is something mostly not used except by other servers and AJAX calls. It's for updating information on a server that already exists.  

* **DELETE** is for when you want to tell a server that it needs to remove a resource. When we get into REST APIs, you'll be using both PUT and DELETE a lot.

<hr style="margin: 5rem 0;"/>

## HTTP Status Codes

HTTP has a number of codes that you might receive as a response. They're meant for computers to easily parse what has happened. They're three-digit numbers that tend to fall into this pattern:  

**5XX** : Some kind of error has happened  
**4XX** : I couldn't give you what you asked for, but there wasn't an error on my end  
**3XX** : You have to go somewhere else to get what you want  
**2XX** : You got what you want in some form  
**1XX** : You're in the process of getting what you want, keep going  

For a rundown of what each one of the status codes means, [see the Wikipedia entry](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes). For a way cooler resource, see [HTTP Status Cats](https://http.cat/)

<hr style="margin: 5rem 0;"/>

## Curl

Curl is a terminal program that can do one of the most important functions of your browser - it can send requests to web servers and show responses. It doesn't render them nicely like your browser does, but it does show you the response.

Next we are going to make some requests to a server to GET and POST data about the class. To do that, we'll use curl.

Run these commands in your terminal, and paste each one into [Explain Shell](http://explainshell.com/) as well.

Gets the html page at the path / for google.com

```
curl -X GET https://www.google.com
```

Gets the html page at the path / for google.com.  Also adds the verbose flag to tell us what the request and response looks like.

```
curl -v -X GET https://www.google.com
```

Curl has many parameters, for example to add a header to the request:

```
curl -v -H "Accept: text/html" -X GET https://www.google.com
```

<hr style="margin: 5rem 0;"/>

## JSON

__JSON is JavaScript Object Notation__. It is the de facto data exchange format of the web.  The structure of JSON is a key value pair hash, very similar to object notation in Javascript.  It is important to keep in mind that JSON data is only a string that represents objects like arrays and objects.  The JSON data must be parsed in order for it to have meaning in a program.

<br>
### JSON Examples

__Empty JSON__

```
{ }
```

__Object / Map__

```
{ "company" : "Github", "age": 7, "categories" : "Services,Internet,Software"}
```

__Array__

```
["Github", "Airbnb", "Square", "Dropbox"]
```

__Complex JSON__

```
{ "Companies":
  [
    { "company": "Github", "age": 7, "categories": "Services,Internet,Software"},
		{ "company": "Airbnb", "age": 6, "categories": "Hotels,Travel"},
    { "company": "Square", "age": 7, "categories": "FinTech,Hardware + Software,Finance"},
    { "company": "Dropbox", "age": 11, "categories": "Cloud Data Services,Storage,Web Hosting"}
	]
}
```

<br>
### Parsing JSON

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

<hr style="margin: 5rem 0;"/>

## Exercise

Complete the exercise associated with this article.
