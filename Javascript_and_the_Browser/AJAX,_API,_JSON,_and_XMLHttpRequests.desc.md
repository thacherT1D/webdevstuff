
# AJAX

__Objective__

* Describe what ajax is useful for when making web apps.  What does it do?
* Get comfortable with doing ajax GET and POST requests.

## AJAX basics

__AJAX__ stands for asynchronous javascript and XML.  The XML part is less applicable because most apis use JSON for the data exchange format.  AJAX is a key component in modern web apps.  It lets content be dynamically loaded onto the page without a full page refresh.

__Additional Reading__:

* [AJAX Getting Started](https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started)

### API

__API__ Stands for application program interface.  It is a defined set methods that allow a developer to interact with some functionality.

__API Examples__:

* [Twilio API](https://www.twilio.com/api)
* [GitHub API](https://developer.github.com/v3/)
* [iTunes API](https://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html)

#### Exercise

Look at the docs for the Github user search api.  Using your browser, make a request to the search api for a user.  Try to find the ```colt.github.io``` repository.

__Hints__:

1. You will need to know about url encoding to put the . in the url when doing the search for the repo. 
2. Limit the search even more by adding a specifier to the query string.  Try adding a language.  The language should be javascript

### Basics of Browser Security

* [Same Origin Policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)
* [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
* [JSONP](http://en.wikipedia.org/wiki/JSONP)

### AJAX in Pure JS

Below is an example of an AJAX call in pure JS.  It is verbose and somewhat error prone.

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

## .ajax - AJAX in jQuery

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

#### Exercise

Modify the request to only alert the title of the movie and the status code from the response. __HINT__ - Look at the jQuery docs for .ajax.  See what the success parameter has to offer.

There is a lot of functionality that .ajax provides.  For example, you can also handle failur cases:

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
Another way of doing the same thing is to use a promise:


```
$.ajax({
  url: 'http://www.omdbapi.com/?t=Frozen&y=&plot=short&r=json',
  method: "GET"
})
  .done(function(data) {
    alert(JSON.stringify(data));
  })
  .fail(function(jqHXR) {
    alert("ERROR: " + jqHXR.status);
  });

```

## .get

The ```.get``` jQuery method is a short hand way of making an ajax request to a server without having to write the more verbose ```.ajax``` request.

#### Exercise
Look at the docs for jQuery .get.  Also look at the docs for [omdb api](http://omdbapi.com/).  Make a __search__ request using get.  Alert the title and the year  of the first two results of the search.  I suggest searching for Sharknado.

## .post

The .post method is another convenience method for making a post request.  

#### Exercise

Open the javascript console on our [student site](https://pacific-stream-1533.herokuapp.com/).  Figure out a way to add a cookie to your browser.  Make another post request to /students using jQuery .post instead of curl. __MAKE SURE__ the data you send is a JSON string.  You will have to use __JSON.stringify__ on your data.  Why does the post request have to be on the same domain?

## .getJSON

Look at the jQuery [docs for getJSON](http://api.jquery.com/jquery.getjson/). What does getJSON do for you? 

# AJAX Review

```
console.log("BEFORE THE AJAX")

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

console.log("AFTER THE AJAX!")
```
-------------------------
# JSONP

Resources for JSONP:

* [Same Origin Policy] (http://en.wikipedia.org/wiki/Same-origin_policy)

* [JSONP] (http://en.wikipedia.org/wiki/JSONP)
