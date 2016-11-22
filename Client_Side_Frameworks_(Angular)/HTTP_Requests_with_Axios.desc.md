## Objectives

- Explain *what* Axios is and *why* it is useful.
- Use Axios to fetch data from an API.
- Explain what Axios' config object is for.
- Explain what Axios' `.all` helper method is for.
- Explain what Axios' `.spread` helper method is for.

<hr />

# Axios

Axios is a "Promise based HTTP client for the browser and node.js".
This is great because it lets us use the API the same way,
regardless of whether we are making requests in the browser or from Node.
When making a request from the browser Axios knows to use an [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).
If you are in Node it uses node's [`http`](https://nodejs.org/docs/latest-v5.x/api/http.html#http_http) interface.

Axios is also in compliance with the Promise/A+ specification.
That means the requests you make will return a `Promise` and are *then-able*.

#### 💪 Exercise

Take a moment to think about *what* Axios is used for as well as *why* it is considered useful.

<hr />

## How to use Axios

First you will need to install `axios`

```sh
$ npm install -S axios
```

With Axios installed, just `import` it in to a component file just like you would import in another component, or React itself.

Most of the time you will be running asynchronous requests from the `componentDidMount` lifecycle method.
Like most of the HTTP request APIs you've used, Axios has convenience methods like `.get`, `.post`, `.put`, `.delete` and more.

```js
import axios from 'axios';
import React from 'react';

const Foo = React.createClass {
  getInitialState() {
    return { movies: [] }
  },

  componentDidMount() {
    axios.get(`http://www.omdbapi.com/?s=bob`)
      .then(res => {
        this.setState({ movies: res.Search });
      });
  }

  render() {
    return (
      <section>
        <ul>
          {this.state.movies.map((movie, index) =>
            <li key={index}>{movie.Title} | {movie.Year}</li>
          )}
        </ul>
      </section>
    )
  }
}

export default Foo;
```

In the example above we are using the `.get` method and passing in a URL.
As mentioned earlier, Axios is a Promise based library, so when you use a method like `.get` you will want to handle that promise with a `.then`.
From there, structure the response as you wish and pass it into `setState`.
This will trigger a re-render of the component with the new data you just provided.

<hr />

### Level Up

#### [Config](https://github.com/mzabriskie/axios#request-config)

Axios follows the pattern of previous AJAX modules we have used in that it can work with just a single `config` object.
You will find you have the standard properties like `url`, `method` and `headers`, but you can really tailor your request to your needs should you need to.
The `config` object has some 20 plus properties available for you to configure on those more finicky requests.

#### 💪 Exercise

Take a minute to think about *what* use the `config` object provides. We will dicuss as a class shortly.

#### [Concurrency](https://github.com/mzabriskie/axios#concurrency)

If you find yourself wanting to make multiple requests at the same time look into Axios' concurrency helper methods.
Just like with just about every Promise based library, you will find there is a `.all` method.
Axios too offeres a `.all` method in partner with a `.spread` method.

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  })
  .catch((error) => {
    // handle error
  });
```

In the modified example above, pulled from the Axios docs, you see that they are passing in an array of functions to the `.all` method.
*all* will return a promise with an array of all the resolved promises.
If one should fail, it will reject and handled by `.catch`.
Axios' `spread` helper method, under the hood, does the same thing as the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
The callback provided to `spread` makes available the results of each of the requests you made in the scope of a single function.

#### 💪 Exercise

Take a minute to think about *what* use the `all` and `spread` helper methods provide for someone using Axios.
We will come back and talk as a class when you are done.

<hr />

#### 📚 Resources:

* [Axios Docs](https://github.com/mzabriskie/axios)
* [Fetch](https://github.com/github/fetch) - Promise driven library based off the, experimental, JavaScript HTTP request standard.
