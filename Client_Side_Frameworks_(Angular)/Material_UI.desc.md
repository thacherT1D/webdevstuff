## Objectives

- Explain what Material UI is
- Explain why Material UI is important
- Describe Material UI's main layout, navigation, and form components
- Use Material UI to build a React user interface
- Use Inline Styling to modify the look of a React user interface

## What's Material UI?

Material-UI is a framework composed of React components that implement Google's Material Design. Similar to the Materialize CSS framework, it provides a useful skeleton of components that can be easily imported into any existing React application.

### Exercise

Turn to a partner and explain in your own words what the `material-ui` framework is. After about a minute, the instructor will cold-call the class and we'll all discuss.

## Why is Material UI important?

Available through NPM, the `material-ui` package gives developers access to well designed and aesthetically pleasing components. Since it is made for React, the pains of combining two frontend frameworks such as React and Materialize are alleviated. The Materialize framework also has its own data-binding system that changes presentation that often conflicts with React's one-way binding. **Important reminder:** well designed projects are equally important as an application's functionality.

### Exercise

In your notes, write down why `material-ui` is important. Focus on how it differs from the Materialize CSS framework and what issues it solves. We'll discuss as a class when everyone is done writing.

## How do you use Material UI to build a React user interface?

To start off with, in the desired project directory install `material-ui` from NPM.

```shell
npm install --save material-ui
```

Material-UI components use `react-tap-event-plugin` to listen for touch, tap, and click events. This dependency is temporary and will go away once the official React version is released.

```shell
npm install --save react-tap-event-plugin
```

Material-UI components require a theme to be provided. The quickest way to get up and running is by using the `MuiThemeProvider` to inject the theme into your application context.

`app.jsx`

```JavaScript
import App from 'components/app';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>,
  document.getElementById('app')
);
```

## How do you use Ryan Sobol's Brunch application skeleton with Material-UI?

To start off with, create a new project that includes React, Brunch, and Material-UI and installs all of its dependencies.

```shell
brunch new path/to/app --skeleton ryansobol/with-react-material
```

Watch the project for changes and launch an HTTP server.

```shell
npm start
```

Open the application in your default browser.

```shell
open http://localhost:8000/
```

## Material UI Components

### Layout Components

#### `Card`

#### `Paper`

#### `GridList`

#### `MenuItem`

### Navigation Components

#### `Tab` & `Tabs`

#### `Menu`

#### `Drawer`

#### `Toolbar`, `ToolbarGroup`, `ToolbarSeparator`, `ToolbarTitle`

#### `AppBar`

### Form Components

#### `TextField`

#### `SelectField`

#### `RadioButton`

#### `Checkbox`

#### `Slider`

#### `DatePicker`

#### `RaisedButton`

## Assignment

## Resources

- [Brunch](http://brunch.io/)
- [Material-UI](http://www.material-ui.com/)
- [React](https://facebook.github.io/react/)
