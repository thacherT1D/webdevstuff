# Intro to Ajax

## Objectives

By the end of this lesson you will be able to:

- describe what AJAX is, and what it does.
- read and write valid JSON
- Use `XMLHttpRequest` to make AJAX requests with vanilla JS.
  - Make a `GET` request and handle response.
  - Make a `POST` request and handle response.
- Write a reusable function to make AJAX requests.


## Topics

* [AJAX](#ajax)
* [API](#api)
* [JSON](#json)
* [XMLHttpRequest](#xhr)
  * [Cross Origin HTTP Request](#cors)

## <a name="ajax"></a>AJAX

[[Wikipedia]](https://en.wikipedia.org/wiki/Ajax_(programming))
[[MDN]](https://developer.mozilla.org/en-US/docs/AJAX)

AJAX is Asynchronous JavaScript and XML. It is a collection of technologies used by the web to communicate with servers. The really interesting part of this technology is the ability to asynchronously perform requests. That means you don't have to refresh the page to get new data! :)

The two main features of AJAX:

1. Make requests to a server without reloading the page
1. Get new data from the server

The uses of this are limitless, but the majority use it as a way to directly consume and modify data. The next section talks about a service that provides this.

## <a name="api"></a>API

[[Wikipedia]](https://en.wikipedia.org/wiki/Application_programming_interface)
[[MDN]](https://developer.mozilla.org/en-US/docs/Glossary/API)

API is an Application Programming Interface. An API is any program that has a way of interacting with another program. The API's we are interested in today are REST API's. These are API's that interact through URL's.

A lot of websites offer API's to interact with the data they host:

* [Twitter](https://dev.twitter.com/overview/api)
* [Facebook](https://developers.facebook.com/docs/graph-api)
* [Reddit](https://www.reddit.com/dev/api)
* [Twitch.tv](http://dev.twitch.tv/)
* [etc.](http://www.programmableweb.com/apis/directory)

I checked these out, and all/most of them aren't using XML. They are using something called JSON! This isn't AJAX at all! The next section covers JSON and why you aren't seeing XML.

##  <a name="json"></a>JSON

[[Official]](http://json.org/)
[[Wikipedia]](https://en.wikipedia.org/wiki/JSON)
[[MDN]](https://developer.mozilla.org/en-US/docs/Glossary/JSON)

JSON is JavaScript Object Notation. It was created by Douglas Crockford as an alternative to XML. It benefits by being easily readable by both humans and JavaScript. These are both qualities XML doesn't tend to have.

JSON:

```
{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 25,
  "address": {
    "city": "New York",
    "state": "NY"
  },
  "favoriteColors": ["Blue", "Orange"]
}
```

XML:

```
<person>
    <firstName>John</firstName>
    <lastName>Smith</lastName>
    <isAlive>true</isAlive>
    <age>25</age>
    <address>
        <city>New York</city>
        <state>NY</state>
    </address>
    <favoriteColors>
        <color>Blue</color>
        <color>Orange</color>
    </favoriteColors>
</person>
```

JSON looks a lot like JavaScript right? And notice how much lighter weight JSON is compared to XML. I think most of us will agree JSON is both easier to read and write. Not to mention JS can also read and write JSON natively with [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

The 'X' in AJAX stands for XML. So why are we talking about JSON? It turns out the term AJAX wasn't chosen very well. A more accurate acronym for how people use it today would be AJAJ or Asynchronous JavaScript and JSON, but AJAJ just sounds dumb. AJAX is the term we're stuck with and can be used regardless of if you are using XML, JSON, or whatever. It is used to describe the process of communicating with a server from a website.

For a really quick example of JSON, we can turn to the Reddit API:

1. Choose a subreddit such as [aww](https://www.reddit.com/r/aww)
1. Add `.json` to the end of the URL. [https://www.reddit.com/r/aww.json](https://www.reddit.com/r/aww.json)
1. View the amazingly dense JSON :)

This is all great, but how do I do it programatically? The answer is in the next section. :D

##  <a name="xhr"></a>XMLHttpRequest

[[Wikipedia]](https://en.wikipedia.org/wiki/XMLHttpRequest)
[[MDN]](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#XMLHttpRequest())

XMLHttpRequest is a feature introduced to JavaScript in 2002 to bring AJAX to the web. Through XMLHttpRequest we are able to make dynamic webpages that don't need to reload to operate on vast swaths of data.

The main parts of XMLHttpRequest we need to look at are:

* [new XMLHttpRequest()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Constructor)
* [XMLHttpRequest.onreadystatechange](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties)
* [XMLHttpRequest.open()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open(METHOD, URL))
* [XMLHttpRequest.send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send())

Let's grab all the top posts from the aww subreddit and print them to the console:

```
// Create a new XMLHttpRequest object to start
var awwRequest = new XMLHttpRequest();

// Create a function that is called when the request status has changed
awwRequest.onreadystatechange = function () {
  // When the readyState is 4 that means the request has completed
  if (this.readyState == 4 && this.status == 200) {
    // We know the data is JSON, so let's parse it to JS
    var awwListings = JSON.parse(this.responseText);
    // And now we can consume the data from Reddit. :)
    console.log(awwListings);
    for (var i=0; i<awwListings.data.children.length; i+=1) {
      var awwListing = awwListings.data.children[i];
      console.log(awwListing.data.title, awwListing.data.thumbnail)
    }
  }
}

// Tell the XMLHttpRequest where you want it to go and how
awwRequest.open('GET', 'https://www.reddit.com/r/aww.json');

// Send it off! Good luck little XMLHttpRequest! :D
awwRequest.send();
```

### <a name="cors"></a>Note: CORS

[[MDN]](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

If you run across this error: `XMLHttpRequest cannot load http://example.com/. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://example.net/' is therefore not allowed access.`. That means the server you are hitting has explicitly denied access to your website! That server is a meanie! But don't fret. This keeps prying developer eyes from your bank accounts and social life! It is for your protection! As a developer it can be quite frustrating though. The server administrator has to edit their CORS headers to allow certain domains or all domains access.


### Questions to Review

-  What does AJAX Stand for?
-  What is an API?
- What is an API you __wish__ you had access to?
-  What is JSON?
-  How is JSON used in JavaScript?
-  What is XML?
-  How do we send an AJAX request with raw JavaScript?

## Primary Exercise

- [OMDB XHR Exercise](https://github.com/gSchool/xhr-omdb-exercise)

## Other Exercises

- [Spotify API Usage](https://github.com/gSchool/spotify-albums-and-tracks)
- [XHR](https://github.com/gSchool/xhr)
- [OMDB](https://github.com/gSchool/omdb_ajax_exercise/tree/12822be5bdde61a2329f90c7033ee50923f5099e)
- [iTunes Guessing Game](https://github.com/gSchool/itunes_song_guessing_game)

## Resources

- [AJAX API Examples](https://github.com/gSchool/front-end-api-examples/)
- [OMDB Example](https://github.com/gSchool/single-page-omdb)
- [Old Galvanize Article on AJAX](https://github.com/gSchool/g11-course-curriculum/blob/c400a5988a276b47e7f5f296d550dbcddc8058de/week06/06_lectures/js-ajax-apis/README.md)
- [PokeAPI](https://pokeapi.co)
