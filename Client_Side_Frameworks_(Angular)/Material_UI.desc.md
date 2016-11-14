## Objectives

- Explain what Material UI is
- Explain why Material UI is important
- Use inline styling to modify the look of a React user interface
- Create new color schemes for Material UI themes
- Describe Material UI's main layout, navigation, and form components
- Use Material UI to build a React user interface

## What's Material UI?

Material-UI is a framework composed of React components that implement Google's Material Design. Similar to the Materialize CSS framework, it provides a useful skeleton of components that can be easily imported into any existing React application.

This is what Material UI looks like:

```jsx
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const App = React.createClass({
  render() {
    return <RaisedButton label="Hello World" />;
  }
});

export default App;
```

This is what it would look like when rendered in the browser:

![](URL)

P.S. You can check out examples of Material UI components on the [Material UI website](http://www.material-ui.com/#/components/app-bar)

### Exercise

Turn to a partner and explain in your own words what the `material-ui` framework is. After about a minute, the instructor will cold-call the class and we'll all discuss.

## Why is Material UI important?

Available through NPM, the `material-ui` package gives developers access to well designed and aesthetically pleasing components. Since it is made for React, the pains of combining two front-end libraries/frameworks such as React and Materialize are alleviated. The Materialize framework uses jQuery events. React makes a point of not using those events and has its own set of synthetic events that are acted through props. Thus, Materialize and React don't mix well together. The Materialize framework also has its own data-binding system that changes presentation that often conflicts with React's one-way binding. **Important reminder:** well designed projects are equally important as an application's functionality.

- No jQuery
- Uses the synthetic events vs native events
- All self-contained in a jsx component instead of split b/w HTML and JS

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


## How do we style Material UI components?

- Material UI has default styles baked into its components
- Right now, there are 2 ways to change most CSS styles for a Material UI component:
  1. Use inline styling
  2. Use CSS styling with `!important` overrides for each property (NOTE: this is not the case for React components in general - you do not need to use `!important` for CSS styles to work)
- Inline styles that target the root element of a component (the all encompassing element, usually a div) use the `style` prop; For nested elements of a component, there are props that end with `Style` (e.g. `iconStyle`, `labelStyle`, etc.).
- Besides those 2 primary ways to change CSS styles for a component, props for specific style properties (e.g. `backgroundColor` for RaisedButton) also can be used for styling.
- For inline styles that take a color value, Material UI has a [list of variables](http://www.material-ui.com/#/customization/colors) that act as more intuitive color names than hex color values. Feel free to use them wherever you otherwise would use a hex color value.

Let's style Material UI's `Paper` component in both ways.

Open up the app component.
```shell
atom app/components/App.jsx
```

Import Material UI's `Paper` and `RaisedButton` components and replace the current render node with them. Your App.jsx should look like this:

```jsx
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const App = React.createClass({
  render() {
    return (
      <Paper>
          <RaisedButton />
      </Paper>
    )
  }
});

export default App;
```

- Open your application at localhost:8000. Notice anything? The page looks like a blank page with an equally blank button. This is because it has no defined dimensions. Let's try adding color to the button. First, let's create a class for the button.

```jsx
import React from 'react';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const App = React.createClass({
  render() {
    return (
      <Paper>
          <RaisedButton className='paidInFull' />
      </Paper>
    )
  }
});

export default App;
```


```jsx
import Paper from 'material-ui/Paper';
import React from 'react';

const App = React.createClass({
  render() {
    const stylePaper = {
      padding: '0px',
      margin: '0px'
    };
    return <Paper style={stylePaper}></Paper>
  }
});
```

Reminder of general principles of inline styling in React:
- Create an object where the object properties correspond to an component's CSS properties
- When you assign a Javascript number primitive to a property (e.g. `{borderRadius: 2}`, NOT `{borderRadius: '2'}`, which uses a string), React automatically registers it as a pixel (`px`) value.
- Replace semi-colons with commas
- For properties, change kebab-case to camelCase
- You can use `props` to customize the object per component instance

NOTE: Inline styling is becoming less popular. Material UI has announced that it is moving away from it in favor of CSS styling. However, there are still React styling frameworks, like Formidable's Radium, that use inline styling or extend it.

## How do we use Material UI themes?



## What are important Material UI Components?

Before we create an app with Material UI, let's get to know its components. There are three types of components that Material UI uses:
1. Layout components
1. Navigation components
1. Data input components

### Layout Components

#### `Paper`

- The `Paper` component is generally used as the main container for the app's content

- Required props: none

```jsx
import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  margin: 20
};

const newPaper = React.createClass({
  render(){
    return <Paper style={style}>This is a Material UI Paper component</Paper>
  }
  });

export default newPaper;
```

#### `Card`, `CardHeader`, `CardMedia`,  `CardTitle`, `CardText`, & `CardActions`

- You've encountered cards before in MaterializeCSS. And they're in the Material Design specification itself. The `Card` component make this same look happen in React.

- Required props: none

Here are optional components for nesting within a `Card`:
  - `CardHeader` is the `Card` component's header
  - `CardMedia` is the image used in the main background of the `Card`
  - `CardTitle` contains the title of the `Card`
  - `CardText` contains the main, non-title text of the `Card`
  - `CardActions` contain action buttons for the `Card`


```jsx
import React from 'react';
import {
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardTitle,
    CardText
  } from 'material-ui/Card';



const newCard = React.createClass({
  render(){
    return <Card style={style}>This is a Material UI card component</Card>
  }
  });

export default newCard;
```

#### `MenuItem`

- The `MenuItem` component is a building block component that can be used in certain Material UI navigation components. In other words, a navigation component can have multiple `MenuItem` components nested within it. You'll see this in the next section, which is dedicated to navigation components.

- Required props: none

```jsx
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  customWidth: {
    width: 200,
  },
};

const newDropdown = React.createClass({

  getInitialState() {
    return {value: 1};
  }

  handleChange(event, index, value){
    this.setState({value});
  }

  render() {
    return (
      <div>
        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Never" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </DropDownMenu>
        <br />
        <DropDownMenu
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="Custom width" />
          <MenuItem value={2} primaryText="Every Night" />
          <MenuItem value={3} primaryText="Weeknights" />
          <MenuItem value={4} primaryText="Weekends" />
          <MenuItem value={5} primaryText="Weekly" />
        </DropDownMenu>
      </div>
    );
  }
});

export default newDropdown;

```

### Navigation Components

#### `Tab` & `Tabs`

- A `Tabs` component can hold multiple `Tab` components

- Required props: none

```jsx

```

#### `Menu`

- One of the many Material UI components that can contain `MenuItem` components. A similar component is `IconMenu`, which opens a menu from icons. `IconMenu` can also contain `MenuItem` components.

- Required props: none

```jsx

```

#### `Toolbar`, `ToolbarGroup`, `ToolbarSeparator`, `ToolbarTitle`

- `Toolbar` can hold multiple `ToolbarGroup` components

- `ToolbarSeparator` is a vertical divider bar for separating `ToolbarGroup` components; `ToolbarTitle` is a simple text title that can be displayed in a toolbar

- To create a navigation bar component, your best bet is to customize a `Toolbar` with nested components (e.g. `ToolbarGroup`, `ToolbarTitle`, `Tabs`, `Tab`, etc.) and inline styling until you get your desired look

- Required props: none

```jsx

```

### Data Input Components

#### `TextField`

- A component for entering text

- Required props: none

```jsx

```

#### `SelectField` or `DropdownMenu`

- In each case, the component is a controlled component that for making selections. They both also use `MenuItem` components to make up their selections. The main difference between the two is that `SelectField` has more customization features.

- Required props: none

```jsx

```

#### `DatePicker`

- A DatePicker component does exactly what it says: It allows the user to pick a date.

- Required props: none

```jsx
ca
```

#### `RaisedButton`

- 1 of 4 different options for pressable button components

- Required props: none

```jsx

```

Check out the sample app here:

`App.jsx`

```jsx
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Toolbar from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import React from 'react';

const App = React.createClass({
  getInitialState(){
    return {
      open: false
    }
  },
  handleToggle(){
    this.setState({open: !this.state.open})
  },
  handleClose(){
    this.setState({open: false})
  },
  render() {
    const stylePaper = {
      padding: '0px',
      margin: '0px'
    };
    return (
      <Paper style={stylePaper}>
        <Toolbar style={{padding: '0', height: '100%', width: '100%'}}>
          <Tabs style={{width: '100%'}}>
            <Tab label="Tab One" value={0} />
            <Tab label="Tab Two" value={1} />
            <Tab label="Tab Three" value={2} />
          </Tabs>
        </Toolbar>
        <FirstPage></FirstPage>
      </Paper>
    )
  }
});
```

`FirstPage.jsx`

```jsx
import Slider from 'material-ui/Slider'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import DatePicker from 'material-ui/DatePicker'
import React from 'react'

// const stylesFirstPage = {
//   radioButton: {
//     display: inline
//   }
// }

const FirstPage = React.createClass({
  getInitialState(){
    return {
      sliderValue: 3,
      radioValue: null,
      dateValue: {
        toLocaleDateString(){
          return 'zilch'
        }
      }
    }
  },
  sliderChangeFunc(evt, val){
    this.setState({sliderValue: val})
  },
  radioChangeFunc(evt, val){
    this.setState({radioValue: val})
  },
  dateChangeFunc(ne, date){
    this.setState({dateValue: date})
  },
  render(){
    return <div id="firstPage">
      Use the slider below to answer the following question: on a scale of 1-5, how do you like this page? Current Answer: {this.state.sliderValue}
      <Slider
        min={1}
        max={5}
        step={1}
        defaultValue={this.state.sliderValue}
        onChange={this.sliderChangeFunc}
      />

      Are you excited about answering this question? Current Answer: {this.state.radioValue || 'Nothing yet'}
      {/* How do I separate the RadioButtonGroup into a separate element without breaking it? Ugh, by passing it back up the DOM chain */}
      <RadioButtonGroup name="yesNo" onChange={this.radioChangeFunc}>
        <RadioButton
          value="yes"
          label="Yes"
        />
        <RadioButton
          value="no"
          label="No"
        />
      </RadioButtonGroup>

      This is the latest date selection... Current Answer: {this.state.dateValue.toLocaleDateString()}
      {/* for DatePicker, hintText (or floatingLabelText or id) is necessary to avoid a warning */}
      <DatePicker
        onChange={this.dateChangeFunc}
        hintText={'Pick a date'}
      />

    </div>
  }
})

export default FirstPage
```

## Assignment

## Resources

- [Brunch](http://brunch.io/)
- [Material-UI](http://www.material-ui.com/)
- [React](https://facebook.github.io/react/)
