## Objectives

After this lesson students should be capable of the following:

- Explain what Ajax is.
- Explain why Ajax primarily transfers JSON data now.
- Use Ajax to retrieve data from a server.
- Use JavaScript and `XMLHttpRequest` to create an HTTP/AJAX request.
- Use JavaScript and JQuery to create an HTTP/AJAX request.
- Use a callback to handle an HTTP/AJAX response.
- Parse a JSON string into a usable Object in JavaScript.
- Create a __race condition__ using an AJAX request.

## What's Ajax?

Asynchronous JavaScript and XML (**Ajax**) is a technique that allows web applications to send and receive data in the background without interfering with the display and behavior of the existing page. In other words, Ajax allows web applications to dynamically load content from a server without doing a full page refresh. The XML part is less applicable today because most web APIs use JSON for the data exchange format.

With Ajax, the possibilities are limitless. For example, think of when you reach the bottom of the page on Facebook or Twitter. How do new stories and tweets magically automatically appear at the bottom without you clicking on anything or reloading the whole page? Ajax.

## Why does Ajax primarily transfer JSON data now?

The "X" in Ajax stands for XML, but as it turns out, most web applications transmit JSON these days. JSON was created by Douglas Crockford in 2001 as an alternative to XML. The primary advantage of JSON is that it's easily readable by both humans and computers, two qualities XML often lacks.

Here's some data about a fictitious person represented in XML.

```xml
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

And here's the same person data represented in JSON.

```json
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


JSON looks like JavaScript, right? Remember, that JSON is just a data format and _not_ actual code.

Also notice how lightweight JSON is compared to XML. JSON tends to be both easier to read and to write for web developers as well as for JavaScript programs using the [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) and [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) functions.

A more accurate acronym for how people use Ajax today would be Ajaj or Asynchronous JavaScript and JSON. But Ajaj sounds dumb, we're stuck with Ajax regardless if you're use XML, JSON, or whatever. Whenever you think of Ajax, just think about dynamically loading content from a server without doing a full page refresh.

## How do you retrieve data from a server using Ajax?

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

## Resources

- [JSON.org](http://json.org/)
- [MDN - Ajax: Getting Started](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)
- [MDN - JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON)
- [Wikipedia - Ajax](https://en.wikipedia.org/wiki/Ajax_(programming))
- [Wikipedia - JSON](https://en.wikipedia.org/wiki/JSON)
