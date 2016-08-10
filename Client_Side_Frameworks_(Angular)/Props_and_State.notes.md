## Objectives

- Explain what props are.
- Explain what state is.
- Explain why props and state are important.
- Use props and state to separate the concerns of a React user interface.
- Explain how data flows between stateful and stateless components.

| Duration by yourself | Duration as a class |
|----------------------|---------------------|
| TBD                  | TBD                 |

## What are props?

**Props** are data that's passed into a component when it's created. For example, you can use props to pass in HTML attributes when creating a native HTML component.

```jsx
const element = <p className="bold">Tokyo Dog</p>;
```

Additionally, props are **immutable**, or unchangeable, data that configures a new component before it's mounted (i.e. inserted into the DOM hierarchy). Props are accessible anywhere inside a component class via the `this.props` object. After a component's props are set, they never change.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  render() {
    return <h1>{this.props.greeting} world</h1>;
  }
});

ReactDOM.render(
  <App greeting='Hello' />,
  document.getElementById('app')
);
```

Every component has their own `this.props` object. But remember, the key-value pairs inside `this.props` are immutable. That means `this.props` is not a good location for storing data that's received after a component has been mounted. For that, you need state.

### Exercise

Turn to a neighbor and, in your own words, explain what props are and how they're used. After about thirty seconds, your instructor will cold call on the class and ask what was discussed.

## What's state?

**State** is data that's initialized and updated from within a component. State is initialized by a component's `getInitialState()` method which is automatically invoked once before a component is mounted. Once initialized, state is accessible anywhere inside a component class via the `this.state` object.

Additionally, state is **mutable**, or changeable, data that represents the internal state of a component. To mutate state, you use the `this.setState()` method which is typically done after an event handler is triggered from a user interaction or a server response.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { who: 'world' };
  },

  handleChange(event) {
    const nextState = { who: event.target.value };

    this.setState(nextState);
  },

  render() {
    return <div>
      <h1>Hello {this.state.who}</h1>

      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.who}
      />
    </div>;
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```

Every component has their own `this.state` object. And because the key-value pairs inside `this.state` are mutable, they're the perfect location for storing data that changes over time. Just remember to always use the `this.setState()` method to merge changes into the current `this.state` object. After the merge, the component is automatically re-rendered.

### Exercise

Turn to a neighbor and, in your own words, explain what state is and how it's used. After about thirty seconds, your instructor will cold call on the class and ask what was discussed.

## Why are props and state important?

Props and state are important because they're implicit inputs to the `render()` method. React invokes a component's `render()` method whenever it's mounted or its state is updated. Using one-way data binding, a component's props, state, and presentation logic are combined into a user interface.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = React.createClass({
  getInitialState() {
    return { who: 'world' };
  },

  handleChange(event) {
    const nextState = { who: event.target.value };

    this.setState(nextState);
  },

  render() {
    return <div>
      <h1>{this.props.greeting} {this.state.who}</h1>

      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.who}
      />
    </div>;
  }
});

ReactDOM.render(
  <App greeting="Hello" />,
  document.getElementById('app')
);
```

In the example above, the `ReactDOM.render()` method is instructed to mount an `<App />` component. The mounting process starts by instantiating a new `<App />` component and passing it a `{ greeting: 'Hello' }` props object. Then, the component's `getInitialState()` method is invoked which initializes its `{ who: 'world' }` state object.

```text
┌──────────────── <App /> ────────────────┐
│ ┌────── Props ──────┐  ┌──── State ───┐ │
│ │                   │  │              │ │
│ │ greeting: 'Hello' │  │ who: 'world' │ │
│ │                   │  │              │ │
│ └───────────────────┘  └──────────────┘ │
└─────────────────────────────────────────┘
```

Next, React invokes the component's `render()` method. The method combines the `this.props` and `this.state` objects with the component's presentation logic and returns a component hierarchy.

```text
              ┌── <div /> ──┐
              │             │
              │             │
              └─────────────┘
                     │
       ┌─────────────┴──────────────┐
       │                            │
       ▼                            ▼
┌─── <h1 /> ──┐    ┌─────────── <input /> ───────────┐
│             │    │ ┌─────────── Props ───────────┐ │
│ Hello world │    │ │                             │ │
│             │    │ │ onChange: this.handleChange │ │
└─────────────┘    │ │ type: 'text'                │ │
                   │ │ value: 'world'              │ │
                   │ │                             │ │
                   │ └─────────────────────────────┘ │
                   └─────────────────────────────────┘
```


React uses the component hierarchy to generate and insert HTML elements into the DOM hierarchy.

```html
<div id="app">
  <div>
    <h1>Hello world</h1>
    <input type="text" value="world">
  </div>
</div>
```

Once mounting is complete, React holds onto the component hierarchy for later. You'll see why in a moment.

Now, the user interface waits patiently for a user to interact with it. When the `<input />` element is changed, the `onChange` event is fired and the component's `this.handleChange()` method is triggered. The event handler updates the component's state using the `this.setState()` method.

```text
┌──────────────── <App /> ────────────────┐
│ ┌────── Props ──────┐  ┏━━━━ State ━━━┓ │
│ │                   │  ┃              ┃ │
│ │ greeting: 'Hello' │  ┃ who: 'Jane'  ┃ │
│ │                   │  ┃              ┃ │
│ └───────────────────┘  ┗━━━━━━━━━━━━━━┛ │
└─────────────────────────────────────────┘
```

After updating the state, the component's `render()` method is invoked again, combining the immutable `this.props` object and the mutable `this.state` object with the component's presentation logic. As a result, a new component hierarchy is returned by the `render()` method.

```text
              ┏━━ <div /> ━━┓
              ┃             ┃
              ┃             ┃
              ┗━━━━━━━━━━━━━┛
                     │
       ┌─────────────┴──────────────┐
       │                            │
       ▼                            ▼
┏━━━ <h1 /> ━━┓    ┏━━━━━━━━━━━ <input /> ━━━━━━━━━━━┓
┃             ┃    ┃ ┌─────────── Props ───────────┐ ┃
┃ Hello Jane  ┃    ┃ │                             │ ┃
┃             ┃    ┃ │ onChange: this.handleChange │ ┃
┗━━━━━━━━━━━━━┛    ┃ │ type: 'text'                │ ┃
                   ┃ │ value: 'Jane'               │ ┃
                   ┃ │                             │ ┃
                   ┃ └─────────────────────────────┘ ┃
                   ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

The new component hierarchy contains new `<div />`, `<h1 />`, and `<input />` components. React compares the old component hierarchy with the new component hierarchy and calculates the differences between the two. In this example, only the content of the `<h1 />` component and the `value` of the `<input />` component has changed. Then, React applies those differences to the DOM hierarchy updating only what's changed.

```html
<div id="app">
  <div>
    <h1>Hello Jane</h1>
    <input type="text" value="Jane">
  </div>
</div>
```

The process of calculating and applying differences is called **reconciliation** and is one of the primary reasons why React is so performant. Once updating the DOM hierarchy is complete, React holds onto the new component hierarchy for the next reconciliation round. A component's reconciliation process is easier to understand when its `render()` method is implemented as a **pure function**. In other words, it should:

1. Return the same component hierarchy given the same props and state objects.
1. Not modify the component's state directly or with the `this.setState()` method.
1. Not read from or write directly to the DOM.
1. Not interact with the browser via functions like `setTimeout()`.

React provides other places where you can modify state or interact with the browser, which you'll learn about later. Just not in the `render()` method.

### Exercise

Type out the above code example by hand and then run it. Resist the urge to copy-and-paste!

Then, turn to a neighbor and, in your own words, explain why props and state are important. After about a few minutes, your instructor will cold call on the class and ask what was discussed.

## How do you use props and state to separate the concerns of a React user interface?

When building a large React user interface, it becomes important to create modular components with well-defined concerns. While you're free to separate the different concerns of your user interface however you want, React components tend fall in one of two groups—either stateful or stateless.

A **stateful component** may have props but it definitely has state. Typically, a stateful component is at or near the root of a component hierarchy and is responsible for managing the majority of the hierarchy's state. Clearly stateful components are a requirement for interactivity. However, the fewer stateful components a hierarchy has, the easier it is to understand how data flows through it.

A **stateless component** often has props but it definitely has *no* state. Typically, a stateless component is at or near the leaves of a component hierarchy and is responsible for handling the majority of the hierarchy's events. A typical component hierarchy has more stateless components than stateful components, especially if it creates a user interface with lots of events.

Let's build a React user interface with both a both stateful and stateless component. To get started, create a new Brunch application.

```shell
brunch new props_and_state --skeleton ryansobol/with-react
```

And change into the project directory.

```shell
cd props_and_state
```

Watch the project for changes and launch an HTTP server.

```shell
npm start
```

In a new Terminal tab, navigate back to the project directory.

```shell
cd path/to/props_and_state
```

And open the project in Atom.

```shell
atom .
```

In the `app/components/track.jsx` file, type the following code.

```jsx
import React from 'react';

const Track = React.createClass({
  handleClick() {
    this.props.updateTrack(this.props.index);
  },

  render() {
    return <div>
      <p>{this.props.track.title} - {this.props.track.artist}</p>

      <p>Likes: {this.props.track.likes}</p>

      <button onClick={this.handleClick}>Like</button>
    </div>;
  }
});

export default Track;
```

And in the `app/components/app.jsx` file, type the following code.

```jsx
import React from 'react';
import Track from 'components/track';

const App = React.createClass({
  getInitialState() {
    return {
      tracks: [{
        title: 'Hey Jude',
        artist: 'The Beatles',
        likes: 0
      }, {
        title: 'Hello',
        artist: 'Adele',
        likes: 0
      }]
    };
  },

  updateTrack(index) {
    const nextTracks = this.state.tracks;

    nextTracks[index].likes += 1;

    this.setState({ tracks: nextTracks });
  },

  render() {
    return <div>
      {this.state.tracks.map((track, index) => {
        return <Track
          index={index}
          key={index}
          track={track}
          updateTrack={this.updateTrack}
        />;
      })}
    </div>;
  }
});

export default App;
```

Then, play around with the user interface.

```shell
open http://localhost:8000/
```

### Exercise

Once the user interface is working, analyze the code and make an educated guess on how data flows between the stateful and stateless components. Write down your guess in your words. No peaking in the next section either. The point is to make a guess now and see how close you are later. At this stage, being right or wrong doesn't matter.

## How does data flow between stateful and stateless components?

In the above code example, the responsibility of managing state and handling events is split between two different component classes—`App` and `Track` respectively.

An `<App />` component is stateful because it uses the `getInitialState()` method to initialize its state and the `this.setState()` method to change its state.

```text
┌──────────── <App /> ───────────┐
│ ┌─────────── State ──────────┐ │
│ │ {                          │ │
│ │   tracks: [{               │ │
│ │     artist: 'The Beatles', │ │
│ │     likes: 0,              │ │
│ │     title: 'Hey Jude'      │ │
│ │   }, {                     │ │
│ │     artist: 'Adele',       │ │
│ │     likes: 0,              │ │
│ │     title: 'Hello'         │ │
│ │   }]                       │ │
│ │ }                          │ │
│ └────────────────────────────┘ │
└────────────────────────────────┘
```

On the other hand, a `<Track />` component is stateless because it doesn't use the `getInitialState()` method or the `this.setState()` method. Instead it receives props when it's created by the `<App />` component.

```text
┌──────────── <Track /> ───────────┐    ┌──────────── <Track /> ───────────┐
│ ┌──────────── Props ───────────┐ │    │ ┌────────── Props ─────────────┐ │
│ │ {                            │ │    │ │ {                            │ │
│ │   index: 0,                  │ │    │ │   index: 1,                  │ │
│ │   key: 0,                    │ │    │ │   key: 1,                    │ │
│ │   track: {                   │ │    │ │   track: {                   │ │
│ │     artist: 'The Beatles',   │ │    │ │     artist: 'Adele',         │ │
│ │     likes: 0,                │ │    │ │     likes: 0,                │ │
│ │     title: 'Hey Jude'        │ │    │ │     title: 'Hello'           │ │
│ │   },                         │ │    │ │   },                         │ │
│ │   updateTrack: updateTrack() │ │    │ │   updateTrack: updateTrack() │ │
│ │ }                            │ │    │ │ }                            │ │
│ └──────────────────────────────┘ │    │ └──────────────────────────────┘ │
└──────────────────────────────────┘    └──────────────────────────────────┘
```

Being stateful, an `<App />` component is only responsible for managing a component hierarchy's state. While it could also handle a hierarchy's events, it follows the [single responsibility principal](https://en.wikipedia.org/wiki/Single_responsibility_principle) and delegates the additional responsibility to the stateless components that it owns.

In React, an **owner** is a component that sets the props of another component. Inside the `render()` method of the `App` component class, a new `<Track />` component is created for each track in the `this.state.tracks` array. As each component is created, its props are set. Therefore, the `<App />` component is the owner of the `<Track />` components that are created inside its `render()` method.

Being stateless, each `<Track />` component is responsible for handling the hierarchy's events for a single track. To handle this responsibility, the owner sets each component's `index`, `key`, `track`, and `updateTrack` props. With the exception of the `key` prop, the key-value pairs are accessible inside the `Track` component class using the `this.props` object.

**NOTE:** The `key` prop is used by React to uniquely identify sibling components of the same type. If a keyed component is changed in any way, React can more efficiently update the DOM hierarchy. The `key` prop is *not* accessible via `this.props.key`.

The following table enumerates the values stored inside the `this.props` object for each `<Track />` component.

| `this.props.track`                                       | `this.props.index` | `this.props.updateTrack()` |
|----------------------------------------------------------|--------------------|----------------------------|
| `{ title: 'Hey Jude', artist: 'The Beatles', likes: 0 }` | `0`                | `updateTrack()`            |
| `{ title: 'Hello', artist: 'Adele', likes: 0 }`          | `1`                | `updateTrack()`            |

Inside the `render()` method of the `Track` component class, the `track` and `index` props are combined with HTML components to produce a user interface. The user interface allows a user to view and update a track's information.  When the value of the `<input type="text" />` component changes, the `handleChange()` method is invoked.

As you've seen, event handlers process an event and update a component's state. However, not all components have state to update, as is the case with the stateless `<Track />` components. Rather than calling the `this.setState()` method, each `<Track />` component is given a `this.props.updateTrack()` state mutator method to call instead.

In React, a **state mutator** is a method inside a stateful component that calls the `this.setState()` method. In the above code example, the `updateTrack()` state mutator method is specified in the `App` component class but passed to each `<Track />` component through its props. When the `handleChange()` method is triggered, the state mutator is invoked.

When nesting custom components, data flows from the owner to the owned through its props. Effectively, this is another form of one-way data binding. Owners bind their owned component's props to some value the owner has computed based on its props or state. Since this process happens recursively, data changes are automatically reflected everywhere they are used.

In React, **autobinding** is the process of binding a component to its methods. In other words, the `this` variable inside a component's method automatically refers to the component that specified the method no matter how the method was invoked. Specifically, this is why the `this` variable inside the `updateState()` method refers to a `<App />` component even though it was invoked using `this.props.updateState()`.

**NOTE:** React only autobinds components to methods specified with the `React.createClass()` method and not with the ES2015 `class` keyword.

Since mutable state increases complexity and reduces predictability, components with only immutable props are easier to think about. Whenever it's time to update the DOM hierarchy, they build the user interface using the data they're given. When a user interacts with their components, they handle the event using the methods they're given.

Inside the `render()` method of the `App` component class, the `Array.prototype.map()` method collects the returned `<Track />` elements into an array. When an array is used as a child, its elements become individual children of the parent `ReactElement`.

### Exercise

Update your previous description of how data flows between stateful and stateless components.

## Summary

Words, mouth, memories.

## Assignment

- [React Inventory]()

## Resources

- [GitHub - props vs state by uberVU](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
- [React docs - Component Life Cycle](https://facebook.github.io/react/docs/component-specs.html)
- [React docs - Multiple Components](https://facebook.github.io/react/docs/multiple-components.html)
