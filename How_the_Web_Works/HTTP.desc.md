## Objectives

- Explain what HTTP is.
- Explain why HTTP is useful?
- Explain what an HTTP request is.
- Explain what an HTTP response is.
- Diagram HTTP request-response cycle.
- Send HTTP requests and receive HTTP responses.
- Explain what JSON is.
- Explain why JSON is useful.

## What's HTTP?

**Hypertext** is text that uses hyperlinks to connect the reader to other files that contain hypertext. The most popular hypertext format is, of course, the Hypertext Markup Language, better known as HTML. The approximately 4.6 billion HTML pages, interconnected via hyperlinks, form the structure known as the **World Wide Web**, or Web for short.

HTML files are transferred across the Internet using a communication protocol. A **protocol** is a system of rules that allow two or more devices on a computer network to transmit information. The protocol of the Web is called the Hypertext Transfer Protocol (**HTTP**) and its job, as you might expect, is to transmit hypertext over a computer network. As it turns out, HTTP is quite flexible and is also used to transmit non-hypertext data as well. Tim Berners-Lee and his team at CERN are credited with inventing HTTP in 1989 and then HTML in 1990.

HTTP is request–response protocol. In other words, it sends messages between two programs called a client and a server. Typically, a **web browser** acts as the client and an application hosting a web site, known as a **web server**, acts as the server.

**NOTE:** The term "server" here is referring to software and _not_ a physical machine which is often called a server as well.

![](http://i.imgur.com/VbuGgIn.png)

## Why is HTTP useful?

HTTP provides a consistent, uniform interface that separates clients from servers. This separation of concerns means that, for example, clients can focus on presenting the user interface instead of managing resources. On the other hand, servers can focus on managing resources instead of presenting the user interface. This allows both clients and servers to be much simpler and more scalable. Additionally, clients and servers can be replaced and developed independently so long as the HTTP interface between them is not altered.

## What's an HTTP Request?

The client (or user agent) sends a plain-text message called an **HTTP request** to a server on behalf of the user. Aside from web browsers, other common user agents include web crawlers, native apps, and mobile apps.

An HTTP request is composed of the following parts.

1. A method (or verb)
1. A path
1. An HTTP version
1. Key-value pairs called **headers**
1. And an optional body

Here's an example of what an HTTP request looks like.

```
GET / HTTP/1.1
Accept: */*
Accept-Encoding: gzip, deflate
Connection: keep-alive
Host: fs-student-roster.herokuapp.com
User-Agent: HTTPie/0.9.3
```

**EXERCISE:** Looking at the above message, can you identify the parts of an HTTP request?

While an HTTP request can only contain a one method, there are several different methods that a client can choose from. Each method instructs a server on how to process the request. Without the use of Ajax, web browsers are only capable of sending HTTP requests with the following methods.

| Method | Description                                                 |
|--------|-------------------------------------------------------------|
| `GET`  | Used retrieve a resource, like an HTML file, from a server. |
| `POST` | Used send information, like user input, to a server.        |

**EXERCISE:** When does a web browser make `GET` requests? When does it make `POST` requests?

## What's an HTTP response?

The server receives an HTTP request, attempts to process it, and sends a plain-text message called an **HTTP response** back to the client. Popular web servers include Apache, Nginx, Node.js, and Python's built-in `SimpleHTTPServer`.

An HTTP response is composed of the following parts.

1. An HTTP version
1. A status code
1. Key-value headers
1. And an optional body

Here's an example of what an HTTP response looks like.

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

**EXERCISE:** Looking at the above message, can you identify the parts of an HTTP response?

While an HTTP response can only contain a one status code, there are many different codes that a server can choose from. Each status code explains to the client how the server interpreted the request. Status codes are three-digit numbers that are grouped into the following categories.

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

**EXERCISE:** The most common status codes are `200`, `302`, `404`, and `500`. Can you figure out why?

## How do you diagram the HTTP request-response cycle?

[SEE WHITEBOARD]

## How do you send HTTP requests and receive HTTP responses?

cURL is a command that sends HTTP requests to servers and outputs their raw HTTP response to the Terminal screen. In other words, it can do pretty much anything your web browser can do except render the HTTP response body as a pretty picture. cURL is often used for testing and debugging HTTP server responses.

Try running the following command.

```
curl -v -X GET https://fs-student-roster.herokuapp.com/
```

You should see something like this.

```
*   Trying 54.225.74.127...
* Connected to fs-student-roster.herokuapp.com (54.225.74.127) port 443 (#0)
* TLS 1.2 connection using TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256
* Server certificate: *.herokuapp.com
* Server certificate: DigiCert SHA2 High Assurance Server CA
* Server certificate: DigiCert High Assurance EV Root CA
> GET / HTTP/1.1
> Host: fs-student-roster.herokuapp.com
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: Cowboy
< Connection: keep-alive
< Access-Control-Allow-Origin: *
< Vary: Accept
< Content-Type: text/html; charset=utf-8
< Content-Length: 631
< Etag: W/"277-ENWB837FwX/qicQv2cu/qA"
< Date: Mon, 23 May 2016 14:42:19 GMT
< Via: 1.1 vegur
<
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
* Connection #0 to host fs-student-roster.herokuapp.com left intact
```

cURL is a very useful command and pre-installed on most Unix operating systems. However, I prefer another program called [HTTPie](https://github.com/jkbrzt/httpie). Like cURL, HTTPie is a command line HTTP client. But its goal is to make command line interaction with a web server as human-friendly as possible. Also like cURL, HTTPie is used for testing and debugging HTTP server responses.

To install HTTPie, run the following command.

```
brew install httpie
```

The try out the exact some cURL command as above in HTTPie.

```
http -v GET https://fs-student-roster.herokuapp.com
```

You should see something like this.

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

A POST request is used in order to send data from the requestor to the server. The server can then parse the _request body_ in order to get information out of it, and often do something on the server with that information (like put it in a database).

Here's how we'd put data in the body of the request using cURL.

```
curl -v --data @myfilenamewithdata.json -X POST https://www.google.com
```

When you specify data in a POST request, it is a good idea to tell the server the type of the data in the request:

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
