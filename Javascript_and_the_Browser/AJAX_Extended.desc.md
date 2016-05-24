## Objectives

- Explain what Ajax is.
- Explain why Ajax primarily transfers JSON data now.
- Use Ajax to retrieve data from a server.
- Handle CORS issues caused by Ajax requests.
- Handle race conditions caused by Ajax requests.

## What's Ajax?

Asynchronous JavaScript and XML (**Ajax**) is a technique that allows web applications to send and receive data in the background without interfering with the display and behavior of the existing page. In other words, Ajax allows web applications to dynamically load content from a server without doing a full page refresh. The XML part is less applicable today because most web APIs use JSON for the data exchange format.

With Ajax, the possibilities are limitless. For example, think of when you reach the bottom of the page on Facebook or Twitter. How do new stories and tweets magically appear at the bottom without you clicking on anything or reloading the whole page? Ajax.

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

A more accurate acronym for how people use this technique today would be Ajaj or Asynchronous JavaScript and JSON. But Ajaj sounds dumb, so we're stuck with Ajax regardless if web applications use XML, JSON, or whatever. Whenever you think of Ajax, just think about dynamically loading content from a server without doing a full page refresh.

## How do you retrieve data from a server using Ajax?

Browsers have a built-in `XMLHttpRequest` global object that's used to create Ajax requests. Here's an example of how it's used.

```javascript
var xhr = new XMLHttpRequest();

xhr.addEventListener('load', function() {
	if (xhr.status !== 200) {
		return;
	}

	var data = JSON.parse(xhr.responseText);

	console.log(data);
});

xhr.open('GET', 'http://www.omdbapi.com/?t=Frozen');

xhr.send();
```

Since using the `XMLHttpRequest` object produces verbose and somewhat error prone code, jQuery has a handful of methods that make creating Ajax requests much easier. The same call as above can be rewritten in jQuery like this.

```javascript
var $xhr = $.getJSON('http://www.omdbapi.com/?t=Frozen');

$xhr.done(function(data) {
	if ($xhr.status !== 200) {
		return;
	}

	console.log(data);
});
```

Once again, jQuery has made our code much more compact. We highly recommend using jQuery to handle HTTP requests for you.

The `$xhr` object is a special object called a promise. A **promise** is a like an event listener except:

- A promise can only succeed or fail once. It cannot succeed or fail twice, neither can it switch from success to failure or vice versa.
- If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier.

Promises are extremely useful for async success/failure because you're less interested in the exact time something became available and more interested in reacting to the outcome. We'll be talking more about promises later in this course.

The `$xhr` object has the `done()` function handles the success scenario of sending an HTTP request to a working URL. Unsurprisingly, it also has a `fail()` function that handles the failure scenario of sending an HTTP request to a broken URL.

```javascript
var $xhr = $.getJSON('http://www.omdbapi.cooooooom/?t=Frozen');

$xhr.done(function(data) {
	if ($xhr.status !== 200) {
		return;
	}

	console.log(data);
});

$xhr.fail(function(err) {
	console.log(err);
});
```

### Exercise

Modify the above code to only log the movie's title and year it was released, each on a separate line. For example, with Frozen, the output would be the following.

```
Title: Frozen
Year: 2013
```

## How do you handle CORS issues caused by Ajax requests?

If you run across this error: `XMLHttpRequest cannot load http://example.com/. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://example.net/' is therefore not allowed access.`. That means the server you are hitting has explicitly denied access to your website - that server is a meanie! But don't fret. This keeps prying developer eyes from your bank accounts and social life! It is for your protection! As a developer it can be quite frustrating though. The server administrator has to edit their CORS headers to allow certain domains or all domains access.

## How do you handle race conditions caused by Ajax requests?

A **race condition** is a term used to refer to any code that relies on some other snippet of code having completed. For example, run the following in your browser. In what order to the console.log statements run?

```javascript
console.log('BEFORE THE AJAX')

var $xhr = $.getJSON('http://www.omdbapi.com/?t=Frozen');

$xhr.done(function(data) {
	if ($xhr.status !== 200) {
		return;
	}

	console.log(data.Title);
});

console.log('AFTER THE AJAX')
```

### Exercise

Fix the above the code so the race condition is correctly handled. The output should be the following.

```
BEFORE THE AJAX
Frozen
AFTER THE AJAX
```

## Resources

- [JSON.org](http://json.org/)
- [jQuery.getJSON()](https://api.jquery.com/jQuery.getJSON/)
- [MDN - Access Control CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
- [MDN - Ajax: Getting Started](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)
- [MDN - JSON](https://developer.mozilla.org/en-US/docs/Glossary/JSON)
- [MDN - XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [Wikipedia - Ajax](https://en.wikipedia.org/wiki/Ajax_(programming)
- [Wikipedia - JSON](https://en.wikipedia.org/wiki/JSON)
- [Wikipedia - Same Origin Policy](http://en.wikipedia.org/wiki/Same-origin_policy)
