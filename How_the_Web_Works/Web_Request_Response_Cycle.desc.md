## Objectives

- Explain what HTTP is.
- Explain why HTTP is useful.
- Explain what an HTTP request contains.
- Explain what an HTTP response contains.
- Diagram Web Request-Response Lifecycle
- Send HTTP requests and receive HTTP responses via Terminal.
- Explain what JSON is.
- Explain why JSON is useful.

## What's HTTP?

**Hypertext** is text that uses hyperlinks to connect the reader to other files that contain hypertext. The most popular hypertext format is, of course, the Hypertext Markup Language, better known as HTML. The approximately 4.6 billion HTML pages, all connected together via hyperlinks, form the underlying structure known as the **World Wide Web**.

But how are those HTML pages, living on production environments scattered across the Internet, transferred to your computer? For that we need a **protocol**—a system of rules that allows two or more devices on a computer network to transmit information. Specifically, the Web uses the Hypertext Transfer Protocol (**HTTP**) to transfer hypertext, as well as other data formats, from one device to another across the Internet. As you'll see, knowing how HTTP works is essential to being a web developer.

A client sends the request for information and a server need to be able to read requests that are formatted in a predictable way. In the Querystring Parsing exercise, you learned to look at a string and turn it into data. Servers use a similar methodology to parse incoming text-based HTTP Requests.  A client can send a request to an HTTP server and get a response which in most cases is a web page, css file, javascript file, image, etc.

Client and Server Have Separate Concerns

In RESTful services the server does not care about user interface, it is only concerned with raw data. A truly RESTful service will never encode information about __how__ to display something, it will only tell you what something is.

Requests are Stateless

Any client (web browser, curl, Postman ...) can make the same request and recieve an identical response from the server. There can never be context outside of the request itself. This means RESTful servers don't deal with cookies, sessions, or anything that is not a part of the HTTP request being served.

## What does an HTTP request look like?

This is what an HTTP request looks like.

```
GET / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: fs-student-roster.herokuapp.com
User-Agent: HTTPie/0.9.3


```

A HTTP request in general has a start line, 0 or more headers, an empty line and optionally a body.  More specifically, in a HTTP request, there is a request line (the start line): `GET / HTTP/1.1`.

HTTP has several "verbs", which are standard words that help servers understand what kind of request they're getting. These verbs describe what you're trying to do.
Mainly, you'll be doing GET and POST requests, but you may do some PUT and DELETE requests as well.
**GET** is used when you want to get a resource, like a webpage. When you open up a url in your browser, you're issuing a GET request.  
**POST** is used when you want to send the server some information. When you submit a form to a webserver, often you're using a POST request to do it. A POST submission of a form in HTML is different in that you don't see the form values in the URL, they are instead inside the _request body_.  

## What does an HTTP response look like?

This is what an HTTP response looks like.

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 631
Content-Type: text/html; charset=utf-8
Date: Sun, 22 May 2016 22:54:23 GMT
Etag: W/"277-ENWB837FwX/qicQv2cu/qA"
Server: Cowboy
Vary: Accept
Via: 1.1 vegur

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/style.css">
    <title>Student Roster</title>
  </head>
  <body>
    <main>
      <h1>Student Roster</h1>

        <section>
          <h3>Daenerys Targaryen</h3>
          <h4>Hobby: Motherhood</h4>
          <img src="https://i.imgur.com/KlycRG5.jpg" alt="Daenerys Targaryen" />
        </section>

        <section>
          <h3>Tyrion Lannister</h3>
          <h4>Hobby: Traveling</h4>
          <img src="https://i.imgur.com/fFMusdC.png" alt="Tyrion Lannister" />
        </section>

    </main>
  </body>
</html>
```

And in an HTTP response, there is a status line for the start line:  `HTTP/1.1 200 OK`.

HTTP has a number of codes that you might receive as a response. They're meant for computers to easily parse what has happened. They're three-digit numbers that tend to fall into this pattern:

| Status Code Class | Description                                             |
|-------------------|---------------------------------------------------------|
| `1XX`             | Request accepted, ready for the next one.               |
| `2XX`             | Request accepted, the server's work is complete.        |
| `3XX`             | Request accepted, but additional client work is needed. |
| `4XX`             | Request accepted, but there was an error on the client. |
| `5XX`             | Request accepted, but there was an error on the server. |

- [HTTP Status Cats](https://http.cat/)
- [HTTP Status Dogs](https://httpstatusdogs.com/)
- [Wikipedia - List of HTTP status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes)

### Let's make our first HTTP Request

```
brew install httpie
```

```
http -v GET https://fs-student-roster.herokuapp.com
```

```
GET / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: fs-student-roster.herokuapp.com
User-Agent: HTTPie/0.9.3



HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 631
Content-Type: text/html; charset=utf-8
Date: Sun, 22 May 2016 22:54:23 GMT
Etag: W/"277-ENWB837FwX/qicQv2cu/qA"
Server: Cowboy
Vary: Accept
Via: 1.1 vegur

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="/style.css">
    <title>Student Roster</title>
  </head>
  <body>
    <main>
      <h1>Student Roster</h1>

        <section>
          <h3>Daenerys Targaryen</h3>
          <h4>Hobby: Motherhood</h4>
          <img src="https://i.imgur.com/KlycRG5.jpg" alt="Daenerys Targaryen" />
        </section>

        <section>
          <h3>Tyrion Lannister</h3>
          <h4>Hobby: Traveling</h4>
          <img src="https://i.imgur.com/fFMusdC.png" alt="Tyrion Lannister" />
        </section>

    </main>
  </body>
</html>
```

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

```json
{ }
```

__Map__

```json
{ "company" : "Github", "age": 7, "categories" : "Services,Internet,Software"}
```

__Array__

```json
["Github", "Airbnb", "Square", "Dropbox"]
```

__Complex JSON__

```json
{ "Companies":
	[
		{
			"company": "Github",
			"age": 7,
			"categories": "Services,Internet,Software"
		}, {
			"company": "Airbnb",
			"age": 6,
			"categories": "Hotels,Travel"
		}, {
			"company": "Square",
			"age": 7,
			"categories": "FinTech,Hardware + Software,Finance"
		}, {
			"company": "Dropbox",
			"age": 11,
			"categories": "Cloud Data Services,Storage,Web Hosting"
		}
	]
}
```

#### Parsing JSON

JSON's design was made with javascript in mind, so parsing JSON in javascript is easy.

__From JSON string to Javascript object__:

```javascript
var companyArr = JSON.parse('["Github", "Airbnb", "Square", "Dropbox"]');
console.log(companyArr[0]);  // Prints Github to the console
```

__From javascript object to JSON string__:

```javascript
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

## What's a web API?

An application programming interface, or **API**, is a broad term used to describe any set of protocols for interacting with a computer program. These protocols can be thought of as a contract between two programs the __client__ program and the __server__ program. An API allows the client program to send requests to the server program, and the contract defines how the server will respond to that request.

In web development, more often than not, the client program is a web browser running a JavaScript application and the server program is a web server. Furthermore, the term API is frequently used by web developers to refer to a specific type of API. One which provides raw data based on the request parameters of an HTTP request.

### APIs and the Dynamic Web

With the growing popularity of JavaScript and dynamic websites, there has been an increased need for __client__ applications to request and manipulate data directly. In the 1990's version of the internet, communication between browsers and web servers was largely limited to HTML & CSS. If the HTML needed to have any information from the webserver's database that information would be encoded to the HTML before the page rendered.

![](http://i.imgur.com/VbuGgIn.png)

If the user needed to get any new information, the browser would request a new page, and the server would encode that information into the HTML for that page. Imagine clicking "next page" on a search engine - the page reloads after the webserver fetches the paginated results.

With JavaScript, an API, and AJAX we can allow our user to stay on the page, and request the new data. This time imagine Facebook's infinite scroll feature. When we get to the bottom of the page, Facebook's JavaScript triggers an API request, and dynamically inserts HTML for that data into the page!

### Multiple Data Sources

Not only do API's allow us to fetch data from our own webserver (as in Facebook's infinite scroll) but it's also possible to use multiple APIs in a single page. Say we wanted to gather information from OMDB, Spotify, and Facebook all onto our web application. We could use the OMDB API, Facebook API, and Spotify API in conjunction to create an experience using data from all of these sources.

### An Example Request - OMDB API

One fantastic API is the OMDB API. The __contract__ for this API is defined in the [OMBD API documentation](http://omdbapi.com/). After reading the documentation, we determine that we can use the query parameter `t` to search the database for movies with a specific title. Lets search IMDB for Game of Thrones:

[http://www.omdbapi.com/?t=Game of Thrones](http://www.omdbapi.com/?t=Game of Thrones)

```shell
http -v GET 'http://www.omdbapi.com/?t=Game of Thrones'
```

You should see something like this.

```
GET /?t=Game%20of%20Thrones HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: www.omdbapi.com
User-Agent: HTTPie/0.9.3



HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
CF-Cache-Status: HIT
CF-RAY: 2a73b9e4c0490c4d-SEA
Cache-Control: public, max-age=86400
Connection: close
Content-Encoding: gzip
Content-Type: application/json; charset=utf-8
Date: Sun, 22 May 2016 22:32:48 GMT
Expires: Mon, 23 May 2016 22:32:48 GMT
Last-Modified: Sun, 22 May 2016 22:22:02 GMT
Server: cloudflare-nginx
Set-Cookie: __cfduid=d2175d3d50fb3d257156bd344bd64c6341463956368; expires=Mon, 22-May-17 22:32:48 GMT; path=/; domain=.omdbapi.com; HttpOnly
Transfer-Encoding: chunked
Vary: Accept-Encoding
X-AspNet-Version: 4.0.30319
X-Powered-By: ASP.NET

{
    "Actors": "Peter Dinklage, Lena Headey, Emilia Clarke, Kit Harington",
    "Awards": "Won 1 Golden Globe. Another 180 wins & 297 nominations.",
    "Country": "USA",
    "Director": "N/A",
    "Genre": "Adventure, Drama, Fantasy",
    "Language": "English",
    "Metascore": "N/A",
    "Plot": "While a civil war brews between several noble families in Westeros, the children of the former rulers of the land attempt to rise up to power. Meanwhile a forgotten race, bent on destruction, return after thousands of years in the North.",
    "Poster": "http://ia.media-imdb.com/images/M/MV5BMjM5OTQ1MTY5Nl5BMl5BanBnXkFtZTgwMjM3NzMxODE@._V1_SX300.jpg",
    "Rated": "TV-MA",
    "Released": "17 Apr 2011",
    "Response": "True",
    "Runtime": "56 min",
    "Title": "Game of Thrones",
    "Type": "series",
    "Writer": "David Benioff, D.B. Weiss",
    "Year": "2011–",
    "imdbID": "tt0944947",
    "imdbRating": "9.5",
    "imdbVotes": "951,668"
}
```

Try searching for a few of your favorite movies using the OMDB API and Postman!

## Assessments / Exercises

[Spotify API Usage](https://github.com/gSchool/spotify-albums-and-tracks)

## Resources

- [The Open Movie Database](http://omdbapi.com/)
- [Wikipedia - Application Programming Interface](https://en.wikipedia.org/wiki/Application_programming_interface)
- [Wikipedia - Hypertext](https://en.wikipedia.org/wiki/Hypertext)
- [Wikipedia - Hypertext Transfer Protocol](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [World Wide Web Size](http://www.worldwidewebsize.com/)
- [Youtube - History of the Internet](https://www.youtube.com/watch?v=9hIQjrMHTv4)
- [Youtube - How The Internet Works](https://www.youtube.com/watch?v=7_LPdttKXPc)
