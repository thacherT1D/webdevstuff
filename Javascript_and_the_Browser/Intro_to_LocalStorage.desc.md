## Materials / Setup

**Resources:**

* [Web Storage Specification](https://html.spec.whatwg.org/multipage/webstorage.html)  
* [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage)  
  * [Storage Get Item](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)  
  * [Storage Set Item](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)  
  * [Storage Remove Item](https://developer.mozilla.org/en-US/docs/Web/API/Storage/removeItem)

**Tools:**
* [Chrome Dev Tools](https://developer.chrome.com/devtools)

## Objectives

Leveraging the localStorage object means being able to persist, access, and manipulate data.

You should be able to:

- Discuss what types of values are useful to store in local storage
- Create items in localStorage that store data such as user settings.
- Retrieve items from localStorage and use that data to modify the behavior of something on the page.
- Remove items from localStorage.
- Stringify and parse objects to store larger datasets.
- Compare and contrast local storage with session storage


## Key Terms

* Persisting data
* localObject
* Stringifying
* Parsing

# Coursework

## Introduction to Local Storage

Local Storage (A.K.A. Web Storage, DOM Storage, HTML5 Storage) gives us web developers the ability to *persist* information or data from our web app on to our user's system. Local Storage data is data that is saved on to the user's device.

**Being Persistent**

Being able to persist information means that when an application is shutdown (like if the user closes the browser window), any data i.e. form information, user preferences, etc. will still exist, and when the application is opened again, the data from the previous time can also be accessed.

By contrast, information that is not persisted will be destroyed when the user closes the application.  Suppose a web application let's a user choose a background color other than the default white for the page they are visiting.  When the user shuts down their web browser and later goes back to the same page, the page's background color will be the default white if the selected color information was not persisted somewhere.  

**The `localStorage` Object**

To take advantage of Local Storage, we access what is called the `localStorage` object.  It allows you to store data locally into the browser via `Storage` objects. LocalStorage stores data that is essential from page to page, request to request, howevever, `localStorage` can only be accessed on the client side. Additionally, `localStorage` can store up to 5MB of data, and only gets cleared through JavaScript or manually clearing through the browser.

As a general rule, it is not a great idea to store sensitive data into `localStorage`. Even though `localStorage` is _not_ sent with every request, and is instead sent only when asked for, storing sensitive data is usually better left to encrypted cookies or other methods.

Read the following article to get an idea of _when_ and _where_ `localStorage` is used: https://css-tricks.com/localstorage-examples/


### Using localStorage

With localStorage you can add, remove, edit, and retrieve whatever information you like from your app all on to the user's system.  You use the localStorage object in your client-side javascript code much like a regular JavaScript object.  Data is stored as key-value pairs.  Unlike regular javascript objects however, each value is automatically converted to a string and is returned to us as a string as well.  That means any values that are numbers or anything other than strings will need to be converted back to its original data type.


**Accessing localStorage**

Local Storage can be accessed by calling `window.localStorage` or just `localStorage` on the client-side javascript.  If your localStorage is empty, it will return `Storage {}`.  Otherwise you'll see the entire localStorage object with all of the key-value pairs inside.  

![](https://i.gyazo.com/b0d46dfea15ba66cfe5cd635ef5b1cd2.png)

**Setting Data**

You can set values two ways, using `localStorage.key = value`, or `localStorage.setItem(key,value)`.  They are nearly identical, however using `setItem` fires off a storage event if something is changed.  This can be useful if you want to keep track of when the data is changed.


[![https://gyazo.com/b1c5de1e678947b89aadddc51179cf26](https://i.gyazo.com/b1c5de1e678947b89aadddc51179cf26.png)](https://gyazo.com/b1c5de1e678947b89aadddc51179cf26)

Both of the above methods will create the keys "backpack" and "pen" respectively.

**Accesing Key Values**

Specific values can be accessed with either `localStorage.someKey` or `localStorage.getItem(someKey)`.  As with using setItem(), the difference in using getItem is that a storage event will also be fired if there is a change in data.  Also notice that all values that are returned from local storage are strings.  

[![https://gyazo.com/9650165b836d9391f4a90abf90b85882](https://i.gyazo.com/9650165b836d9391f4a90abf90b85882.png)](https://gyazo.com/9650165b836d9391f4a90abf90b85882)

**Removing Key-Values**

In order to remove data from localStorage, use `localStorage.removeItem(key)`

[![https://gyazo.com/174fc9f167251bcb8a85ce3a964816e7](https://i.gyazo.com/174fc9f167251bcb8a85ce3a964816e7.png)](https://gyazo.com/174fc9f167251bcb8a85ce3a964816e7)

**Editing/Updating Values**

To edit or update localStorage information, you'll need to save a copy of the existing value somewhere.  This is because localStorage only lets you completely replace values.  It is just like updating values in a typical JavaScript object.  

Let's say we want to update the pen in our local storage to have "Super" at the end of it.

[![https://gyazo.com/c8c69a9073423c02c1cc21bac19bec9f](https://i.gyazo.com/c8c69a9073423c02c1cc21bac19bec9f.png)](https://gyazo.com/c8c69a9073423c02c1cc21bac19bec9f)


## Session Storage

https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

sessionStorage is very similar to localStorage, and is also a child of the Storage object.
- setItem()
- getItem()
- removeItem()

Differences:
- It is window/tab specific.
- If you close the window or tab, you will lose any sessionStorage data.



## First Exercise:
Fork, then clone this repo:
>https://github.com/gSchool/localstorage-exercises

Follow the instructions in each section by viewing the HTML in each section:
(Do not do #4 - we haven't covered a concept used here.)


## Second Exercise: Background Preferences

Let's make a simple page that stores the users preference for a web page background color for each day of the week.  A user should be able to visit the site, enter a hex color for each day of the week, and the page's background color should reflect that input.  Furthermore, when the user closes the browser and revists the page, the background color should still be the same as the colors that were previously entered, and NOT the default blank color.


** Get the exercise here:

 `git clone git@github.com:gSchool/localstorage-walkthrough.git -b exercise`


[![https://gyazo.com/fad0401a938c959594f362bdd114715f](https://i.gyazo.com/fad0401a938c959594f362bdd114715f.png)](https://gyazo.com/fad0401a938c959594f362bdd114715f)


### Reading (optional)

[Diving in To Local Storage](http://diveintohtml5.info/storage.html)
(*Using Local Storage, solid examples in javascript:*)
