## Objectives

- Explain what props are.
- Explain what state is.
- Explain why props and state are important.
- Use props and state to build a React component hierarchy.

| Duration by yourself | Duration as a class |
|----------------------|---------------------|
| TBD                  | TBD                 |

## What are props?

**Props** are data that's passed into a component when it's created. For example, you can use props to pass in HTML attributes when creating a native HTML component.

```jsx
var element = <p className="bold">Tokyo Dog</p>;
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

Turn to a neighbor and, in your own words, explain what props are and how they're used. After about a minute, your instructor will cold call on the class and ask what was discussed.

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

Turn to a neighbor and, in your own words, explain what state is and how it's used. After about a minute, your instructor will cold call on the class and ask what was discussed.

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
┌──────────────── <App /> ────────────────┐
│ ┌────── Props ──────┐  ┌──── State ───┐ │
│ │                   │  │              │ │
│ │ greeting: 'Hello' │  │ who: 'world' │ │
│ │                   │  │              │ │
│ └───────────────────┘  └──────────────┘ │
└─────────────────────────────────────────┘
                     │
                     ▼
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

Now, the user interface waits patiently for a user to interact with it. When the `<input />` element is changed, the `onChange` event is fired and the component's `this.handleChange()` method is triggered. The event handler updates the component's state using the `this.setState()` method. After updating the state, the component's `render()` method is invoked again.

Once again, the `render()` method combines the immutable `this.props` object and the mutable `this.state` object with its presentation logic. The result is a new component hierarchy which is returned by the `render()` method.

```text
┌──────────────── <App /> ────────────────┐
│ ┌────── Props ──────┐  ┌──── State ───┐ │
│ │                   │  │              │ │
│ │ greeting: 'Hello' │  │ who: 'Jane'  │ │
│ │                   │  │              │ │
│ └───────────────────┘  └──────────────┘ │
└─────────────────────────────────────────┘
                     │
                     ▼
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
│ Hello Jane  │    │ │                             │ │
│             │    │ │ onChange: this.handleChange │ │
└─────────────┘    │ │ type: 'text'                │ │
                   │ │ value: 'Jane'               │ │
                   │ │                             │ │
                   │ └─────────────────────────────┘ │
                   └─────────────────────────────────┘
```

React calculates the differences between the old and new component hierarchies and applies them to the DOM hierarchy.

```html
<div id="app">
  <div>
    <h1>Hello Jane</h1>
    <input type="text" value="Jane">
  </div>
</div>
```

The process of calculating and applying differences is called **reconciliation** and is one of the primary reasons why React is so performant. Once updating is complete, React holds onto the new component hierarchy for the next reconciliation round. A component's reconciliation process is easier to understand when its `render()` method is implemented as a **pure function**. In other words, it should:

1. Return the same component hierarchy given the same props and state objects.
1. Not modify the component's state.
1. Not read from or write directly to the DOM.
1. Not interact with the browser via functions like `setTimeout()`.

React provides other places where you can modify state or interact with the browser. Just not in the `render()` function.

### Exercise

Type out the above code example by hand and then run it. Resist the urge to copy-and-paste!

Then, turn to a neighbor and, in your own words, explain why props and state are important. After about a few minutes, your instructor will cold call on the class and ask what was discussed.

## How do you separate components by concern?

When building larger React applications, it becomes important to create modular components with well-defined interfaces. While you're free to separate the different concerns of your application however you want, React components tend fall in one of two groups—either stateful or stateless.

A **stateful component** may have props but it definitely has state. Typically, a stateful component is at or near the root of a component hierarchy and is responsible for managing the majority of the hierarchy's state. Clearly stateful components are a requirement for interactivity. However, the fewer stateful components a hierarchy has, the easier it is to understand how data flows through it.

A **stateless component** often has props but it definitely has *no* state. Typically, a stateless component is at or near the leaves of a component hierarchy and is responsible for handling the majority of the hierarchy's user interface and events. Typically, a component hierarchy will have more stateless components than stateful components, especially when building complex user interfaces with lots of events.

You might be wondering how its possible to split the responsibility of managing state and handling events between two different components. For that, we'll need the help of three new concepts—ownership, state mutators, and autobinding.

```jsx
var Book = React.createClass({
  handleChange(event) {
    this.props.updateBook(this.props.index, event.target.value);
  },

  render() {
    return <div>
      <h2>Book {this.props.index}: {this.props.book}</h2>
      <input
        onChange={this.handleChange}
        type="text"
        value={this.props.book}
      />
    </div>;
  }
});

var Books = React.createClass({
  getInitialState() {
    return {
      books: [
        'A Game of Thrones',
        'Snow Crash',
        'The Martian'
      ]
    };
  },

  updateBook(index, value) {
    var nextBooks = this.state.books;
    nextBooks[index] = value;
    this.setState({ books: nextBooks });
  },

  render() {
    var bookEls = this.state.books.map((book, index) => {
      return <Book
        book={book}
        index={index}
        key={index}
        updateBook={this.updateBook}
      />;
    });

    return <div>{bookEls}</div>;
  }
});

ReactDOM.render(
  <Books />,
  document.getElementById('container')
);
```

In the above code example, two component classes are defined—`Book` and `Books`. `<Book />` components are stateless because its class doesn't use the `getInitialState()` method or the `this.setState()` method. On the other hand, `<Books />` components are stateful because its class *does* use the `getInitialState()` and `this.setState()` methods.

Being stateful, a `<Books />` component is only responsible for managing the hierarchy's state. While it could also handle the hierarchy's user interface and events, it follows the [single responsibility principal](https://en.wikipedia.org/wiki/Single_responsibility_principle) by delegating these additional tasks to the stateless components that it owns.

In React, an **owner** is a component that sets the props of another component. Inside the `render()` method of the `Books` component class, a new `<Book />` component is created for each book in the `this.state.books` array. As each component is created, its props are set. Therefore, the `<Books />` component is the owner of the `<Book />` components that are created inside its `render()` method.

Being stateless, each `<Book />` component is responsible for handling the hierarchy's user interface and events for a single book. To handle this responsibility, the owner sets each component's `book`, `index`, `key`, and `updateBook` props. With the exception of the `key` prop, the key-value pairs are accessible inside the `Book` component class using the `this.props` object.

**NOTE:** The `key` prop is used by React to uniquely identify sibling components of the same type. If a keyed component is changed in any way, React can more efficiently update the DOM. The `key` prop is *not* accessible via `this.props.key`.

The following table enumerates the values stored inside the `this.props` object for each `<Book />` component.

| `this.props.book`     | `this.props.index` | `this.props.updateBook()`  |
|-----------------------|--------------------|----------------------------|
| `'A Game of Thrones'` | `0`                | `updateBook()`             |
| `'Snow Crash'`        | `1`                | `updateBook()`             |
| `'The Martian'`       | `2`                | `updateBook()`             |

Inside the `render()` method of the `Book` component class, the `book` and `index` props are combined with native components to produce a user interface. The user interface allows a user to view and update a book's information. When the user changes the value of the `<input type="text" />` component, the `handleChange()` method is triggered.

As you've learned, event handlers process the event and eventually call the `this.setState()` method. However, `<Book />` components are stateless. In order to update the component hierarchy's state, they have to tell the stateful components that there is new state for them to process. They do this using a state mutator.

In React, a **state mutator** is a method inside a stateful component that calls the `this.setState()` method. The `<Books />` component defines an `updateBook()` method. It passes the method down to its owned `<Book />` components through their props. When the `handleChange()` method is triggered, the state mutator is invoked.

When nesting custom components, data flows from the owner to the owned through its props. Effectively, this is another form of one-way data binding. Owners bind their owned component's props to some value the owner has computed based on its props or state. Since this process happens recursively, data changes are automatically reflected everywhere they are used.

In React, **autobinding** is the process of binding a component to its methods. In other words, the `this` variable inside a component's method automatically refers to the component that specified the method no matter how the method was invoked. Specifically, this is why the `this` variable inside the `updateState()` method refers to a `<Books />` component even though it was invoked using `this.props.updateState()`.

**NOTE:** React only autobinds components to methods specified with the `React.createClass()` method and *not* with the ES2015 `class` keyword.

Since mutable state increases complexity and reduces predictability, components with only immutable props are easier to think about. Whenever it's time to update the DOM, they build the user interface using the data they're given. When a user interacts with their components, they handle the event using the methods they're given.

Inside the `render()` method of the `Books` component class, the `Array.prototype.map()` method collects the returned `<Book />` elements into an array. The resulting array is stored in the `bookEls` variable which is used as the child of a `<div>` element. When an array is used as a child, its elements become individual children of the parent `ReactElement`.

### Exercise

Type this out and write stuff in your own words.

If we look in the chrome console we see the following warning:

"Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of BookList. See https://fb.me/react-warning-keys for more information."

Check out [this](http://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js) stackoverflow for why this is encouraged by React. How can we refactor our previous example to remove this warning?

Hint: We are using the `map()` method to iterate over our array. The callback method to map takes in additional parameters including the index, can we use that as our unique key to remove the warning?

## Summary

Words, mouth, memories.

## Assignment: Part 1

Using [this template](assignments/05-props-and-state/books.html), create both a `Books` and `Book` React component that looks and behaves like this.

![Books Inventory Part 1](https://dl.dropboxusercontent.com/s/pb3pubwywwetml9/D388F163-2BE6-4910-8A43-FD1BBB772F4E-40520-0002557FF8F592CA.gif?dl=0)

```js
getInitialState() {
  return {
    books: [{
      author: 'George R. R. Martin',
      cover: 'https://upload.wikimedia.org/wikipedia/en/9/93/AGameOfThrones.jpg',
      isbn: '978-0553103547',
      stock: 7,
      title: 'A Game of Thrones',
      year: 1996
    }, {
      author: 'Neal Stephenson',
      cover: 'https://upload.wikimedia.org/wikipedia/en/d/d5/Snowcrash.jpg',
      isbn: '978-1491515051',
      stock: 3,
      title: 'Snow Crash',
      year: 1992
    }, {
      author: 'Andy Weir',
      cover: 'https://upload.wikimedia.org/wikipedia/en/c/c3/The_Martian_2014.jpg',
      isbn: '978-0804139021',
      stock: 11,
      title: 'The Martian',
      year: 2014
    }]
  };
}
```

## Assignment: Part 2

When you're finished with the assignment above, enhance your `Books` and `Book` components so users can change a book's stock with their keyboard like this.

![Books Inventory Part 2](https://dl.dropboxusercontent.com/s/ld2u2jit6hm9yni/804FA6BD-9377-4DE7-94DB-4381B30AA59B-40520-000255CD35A762E4.gif?dl=0)

## References

* [GitHub - props vs state by uberVU](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [React docs - Component Life Cycle](https://facebook.github.io/react/docs/component-specs.html)
* [React docs - Multiple Components](https://facebook.github.io/react/docs/multiple-components.html)
