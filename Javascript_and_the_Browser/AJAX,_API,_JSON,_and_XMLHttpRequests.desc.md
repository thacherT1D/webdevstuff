# Introduction to AJAX

## Entry Ticket

Before you read this Learning Experience, you should be able to:

* Install JQuery, and use it to manipulate the DOM. 

## Objectives

After this lesson students should be capable of the following:

* Recite the meaning of the acronym AJAX.
* Use JavaScript and `XMLHttpRequest` to create an HTTP/AJAX request.
* Use JavaScript and JQuery to create an HTTP/AJAX request. 
* Use a callback to handle an HTTP/AJAX response.
* Parse a JSON string into a usable Object in JavaScript.
* Create a __race condition__ using an AJAX request.

## Key Terms

AJAX: Asychronous JavaScript and XML

Asychronous:

1. of or requiring a form of computer control timing protocol in which a specific operation begins upon receipt of a signal that the preceding operation has been completed.
2. (In English) Code that does not execute until a signal is explicitly given to execute.
3. (In our case) Code that waits until after an HTTP request recieves a response, then executes a callback. 

JSON: JavaScript Object Notation. This is what we use anytime we create an Object Literal in JS:

```
{ 
  age: 9000,
  name: { 
    first: Tyler,
    last: Bettilyon
  }
}
```

XML: Extensible Markup Language. Like HTML, XML contains hierarchical data using tags and inner text data. Here is the same data as our JSON object in XML. 

```
<?xml version="1.0" encoding="UTF-8"?>
<age>9000</age>
<name>
  <first>Tyler</first>
  <last>Bettilyon</last>
</name>
```


# Coursework

## Introduction
[AJAX Getting Started](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)
[[Wikipedia]](https://en.wikipedia.org/wiki/Ajax_(programming))
[[MDN]](https://developer.mozilla.org/en-US/docs/AJAX)

__AJAX__ stands for asynchronous javascript and XML.  The XML part is less applicable because most apis use JSON for the data exchange format.  AJAX is a key component in modern web apps.  Using AJAX allows developers to dynamically load content onto the page without a full page refresh.

The two main features of AJAX:

1. Make requests to a server without reloading the page.
1. Get new data from a server.

The uses of this are limitless, but the majority use it as a way to directly consume and modify data. Consider this simple example, when you reach the bottom of the page on Facebook new stories automatically appear without you clicking on anything, or reloading the whole page! Facebook uses AJAX to ask it's server for more data when you scroll down to the bottom. 

## <a name="api"></a>APIs

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

JSON looks a lot like JavaScript right? And notice how much lighter weight JSON is compared to XML. I think most of us will agree JSON is both easier to read and write. Not to mention JS can also read and write JSON natively with [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify). Get familiar with these functions, as a web developer you will use them very frequently. 

The 'X' in AJAX stands for XML. So why are we talking about JSON? It turns out the term AJAX wasn't chosen very well. A more accurate acronym for how people use it today would be AJAJ or Asynchronous JavaScript and JSON, but AJAJ just sounds dumb. AJAX is the term we're stuck with and can be used regardless of if you are using XML, JSON, or whatever. It is used to describe the process of communicating with a server from a website asychronously. 

## AJAX in Action

Consider these two examples of AJAX. To give them a try, open your browser to a new tab. Leave it empty, we don't want to have any other scripts running or any HTML on the page when we start. 

Open your developer tools, and try pasting each snippet into your console to run them.


### AJAX in Pure JS

To create AJAX requests in pure JS we need to use the XMLHttpRequest object. The main parts of XMLHttpRequest we need to look at are:

* [Main documentation](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). 
* [new XMLHttpRequest()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Constructor)
* [XMLHttpRequest.onreadystatechange](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#Properties)
* [XMLHttpRequest.open()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#open(METHOD, URL))
* [XMLHttpRequest.send()](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#send())

Below is an example of an AJAX call in pure JS.  It is verbose and somewhat error prone. Try pasting this into your console, and examining the content of the alert box.

```
httpRequest = new XMLHttpRequest();

httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState === 4) {
       if(httpRequest.status < 400) {
         alert(httpRequest.responseText);
       }
    }
    
};
httpRequest.open('GET', 'http://www.omdbapi.com/?t=Frozen&y=&plot=short&r=json');
httpRequest.send();
```

Lets break down the above code. First we create a new object with a type of XMLHttpRequest.

```
httpRequest = new XMLHttpRequest();
```

Then, we give our object a callback to handle the response. We have to use the property `onreadystatechange` for this:

```
httpRequest.onreadystatechange = function(){ ... });
```

When an HTTP Request is made, the function we just defined is called anytime the "ready state" of that request changes. See all the values for `readyState`[here](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState).

Our particular callback function asks two questions about the response every time we've triggered the callback. First we ask, is this HTTP request done? the readyState value for "done" is 4. 

```
if (httpRequest.readyState === 4) { ... }
```

If so, we ask the additional question was this request a "success". We ask this question using what we know about [HTTP status codes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html). Specifically, that all status codes less than 400 is a 'success' to some degree:

```
if(httpRequest.status < 400) { ... }
```

Finally if the request is finished AND it was a success, we alert the `responseText`:

```
alert(httpRequest.responseText);
```

With our callback defined, and assigned to the `onreadystatechange` property we can finish creating and sending the response. First we use `httpRequest.open()` to setup the request values, especailly the HTTP Method and the URL we want to request. Then we use `send()` to actually push the request out to the internet:

```
httpRequest.open('GET', 'http://www.omdbapi.com/?t=Frozen&y=&plot=short&r=json');
httpRequest.send();
```


### .ajax - AJAX in jQuery

JQuery helps make ajax calls much nicer. The same call above can be rewritten in AJAX like this:

```

$.ajax({
  url: 'https://www.omdbapi.com/?t=Frozen&y=&plot=short&r=json',
  method: "GET",
  success: function(data) {
    alert(JSON.stringify(data));
  }
});
```

Paste this into your browser, and see if the result looks familiar!

Once again, JQuery has made our code much more compact. We highly reccommend using JQuery or another library/framework to handle HTTP requests for you. There are innumerable pitfalls when writing vanilla JS to do AJAX. Stand on the shoulders of giants and use a library!

This time around, it's pretty clear just from the syntax that we're going to perform an ajax requst and it's going to fetch the specified URL using the GET method. If the request is successful then the `success` callback function will execute with whatever data we recieved from the server at our URL. We can also define a callback function for errors. Try changing the URL to an invalid one, and inspecting the error information. 

```

$.ajax({
  url: 'https://www.omdbapixxxhfksu.com/?t=Frozen&y=&plot=short&r=json',
  method: "GET",
  success: function(data) {
    alert(JSON.stringify(data));
  },
  error: function(errorObject, textStatus) {
    console.log(errorObject);
    console.log(textStatus);
  }
});
```

> ProTip : You can insert JQuery as a script tag into our DOM. When the script tag gets rendered, our browser will request JQuery from the URL we specified and we can use it in the console just like normal. 

>```
var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);
```

### CORS - Web Security

* [[MDN]](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
* [Same Origin Policy] (http://en.wikipedia.org/wiki/Same-origin_policy)
* [JSONP] (http://en.wikipedia.org/wiki/JSONP)

If you run across this error: `XMLHttpRequest cannot load http://example.com/. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://example.net/' is therefore not allowed access.`. That means the server you are hitting has explicitly denied access to your website - that server is a meanie! But don't fret. This keeps prying developer eyes from your bank accounts and social life! It is for your protection! As a developer it can be quite frustrating though. The server administrator has to edit their CORS headers to allow certain domains or all domains access.

#### Exercise

Modify the request to only alert the title of the movie and the status code from the response. 

> Pro-tip: Look at the jQuery docs for .ajax.  See what the success parameter has to offer.


```
$.ajax({
  url: 'https://www.omdbapi.com/fakepath/',
  method: "GET",
  success: function(data) {
    console.log(JSON.stringify(data));
  },
  error: function(jqHXR) {
    console.log("ERROR: ", jqHXR.status)
  }
});
```

### Race Conditions

A "Race Condition" is a term used to refer to any code that relies on some other snippet of code having completed. For example, run the following in your browser. In what order to the console.log statements run?

```
console.log("BEFORE THE AJAX")

$.ajax({
  method: "GET",
  url: "http://omdbapi.com/?i=tt1392190",
  success: function(info) {
    console.log("DONE")
    console.log(info)
    //write all my code that relies on the response data
  },
  error: function(err){
    console.log("FAIL")
    console.log(err)
  }
});

console.log("AFTER THE AJAX!")
```

### Promises

[[MDN]](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise),
[JQuery Promises with done](http://api.jquery.com/deferred.done/),
[JQuery Promises with when](https://api.jquery.com/jquery.when/)

Promises are an alternate way to use callbacks to handle asychronous requests. Promises can often be used to write cleaner code, especially when one http request relies on the results from another. Promises are a complex topic that deserves it's own complete Learning Experience, but it's easy enough to get started. The following code does the same thing we've been doing with AJAX: make a request to the OMDB API and handle success and failure separately. 

In JQuery, the `.done()` function is called with a callback function to be triggered on success, and `.fail` is called with a function to be called upon failure. 

In fact, the so called "promise" pattern has become so popular that JQuery deprecated the original success and error callbacks in favor of `.done()` and `.fail()` in version 1.8. 

```
$.ajax({
  method: "GET",
  url: "http://omdbapi.com/?i=tt1392190"
})
.done(function(info) {
    console.log("DONE")
    console.log(info)
  //write all my code that relies on the response data
 })
.fail(function(err){
  console.log("FAIL")
  console.log(err)
});
```



## Assessments

Complete the excercises here:

[https://github.com/gSchool/XMLHttpRequest-exercises](https://github.com/gSchool/XMLHttpRequest-exercises)



## Questions

You should be able to answer the folowing questions now:

-  What does AJAX Stand for?
-  What is an API?
-  What is JSON?
-  How is JSON used in JavaScript?
-  What is XML?
-  How do we send an AJAX request with raw JavaScript?
-  What is a "race condition"? 
-  How do you parse a JSON string into an object that you can use in JavaScript? 
##Topics
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

### Exercises

* https://github.com/gSchool/xhr

### Questions to Review

-  What does AJAX Stand for?
-  What is an API?
-  What is JSON?
-  How is JSON used in JavaScript?
-  What is XML?
-  How do we send an AJAX request with raw JavaScript?