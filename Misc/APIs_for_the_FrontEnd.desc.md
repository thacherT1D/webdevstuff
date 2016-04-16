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
