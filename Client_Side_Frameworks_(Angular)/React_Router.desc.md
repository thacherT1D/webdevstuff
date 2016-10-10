## Objectives

- Explain what React Router is.
- Explain why React Router is important.
- Use React Router to build a React user interface.

## What's React Router?

React Router is a complete routing library for React.

React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in.

The Router component is the parent and Route is the child. React Router provides the ability to map different paths that will in turn render a given component.

## Why is React Router important?

React Router provides access to cached versions of components without having to make a separate request to load a different user interface or view. It also provides a fast method of creating client-side routing as well as the associated presentation views.

It simplifies client-side routing. There's no need to send a request to a server to load an entire page or component, unlike Angular which needs to send requests for any and all template files.

The nesting of the URL will match the nesting of React Route components. You can also load multiple named components from a single route (e.g. an admin navbar and aside vs a regular user navbar and aside). All the routing logic is in one place which makes it easier to maintain and update.

## How do you use React Router to build a React user interface?

To start off with, navigate to the desired React project directory and install and save the `react-router` package.

```shell
cd path/to/project
npm install --save react-router
```

Inside of `index.jsx`, first import the necessary components and properties from React Router and alter the `ReactDOM.render` function as follows.

```JavaScript
import App from 'components/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>,
  document.getElementById('app')
);
```

Visit `http://localhost:8080` and you should see the same "Hello World!" text from your App component.

In order to load different client-side routes, simply add more React Route components that map to respective paths.

Let's create an About component to demonstrate the ease of creating new routes.

```shell
touch app/components/About.jsx
```

```JavaScript
// About.jsx

import React from 'react';

const About = React.createClass({
  render() {
    return <div>About</div>;
  }
});

export default About;
```

Now, let's connect a new route to render the component we just created when visiting the `/about` path.

```JavaScript
// index.jsx
// ...

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/about" component={About}/>
  </Router>,
  document.getElementById('app')
);
```

In the browser, visit `http://localhost:8080/#/about` and you should see the component we just created!

### Navigating with Link

Perhaps the most used component in your app is Link. Its almost identical to the `<a/>` tag you're used to except that its aware of the Router it was rendered in.

Let's create some navigation in our App component.

```JavaScript
// App.jsx
import React from 'react';
import { Link } from 'react-router';

const App = React.createClass({
  render() {
    return <div>
      <h1>Hello World!</h1>

      <Link to="/about">About</Link>
    </div>;
  }
});

export default App;
```

## Assignment

## Resources

[React Router](https://github.com/reactjs/react-router)
[React Router Tutorial](https://github.com/reactjs/react-router-tutorial)
