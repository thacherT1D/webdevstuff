## Objectives

- Explain what React JSX is.
- Explain why React JSX is important.
- Use React JSX to build a user interface.

## What's React JSX?

[JSX](https://facebook.github.io/jsx/), or JavaScript XML, is an JavaScript syntax extension that looks similar to HTML. [React JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) lets you create `ReactElement` objects using an HTML-like syntax and a transpiler.

For example, when the following React JSX code is run through a transpiler:

```html
<h1 id="greeting">Hello, Jane.</h1>
```

It's transformed into the following JavaScript code.

```js
React.createElement('h1', { id: 'greeting' }, 'Hello, Jane.');
```

A traditional **compiler** translates the source code of one programming language into another programming language of a *different* level of abstraction. For example, embedded JavaScript (i.e. EJS) templates compile into HTML because one is an embedded programming language and the other is only a markup language.

```text
┌────────────────  EJS  ────────────────┐               ┌─────── HTML ───────┐
│                                       │               │                    │
│                                       │               │                    │
│ <h1 id="greeting">                    │               │ <h1 id="greeting"> │
│   Hello, <%= 'Jane'.toUpperCase() %>. │─── compile ──▶│   Hello, JANE.     │
│ </h1>                                 │               │ </h1>              │
│                                       │               │                    │
│                                       │               │                    │
└───────────────────────────────────────┘               └────────────────────┘
```

A **transpiler** is a special type of compiler. Given the source code of one programming language, a transpiler produces equivalent source code in another programming language of approximately the *same* level of abstraction. For example, TypeScript transpiles into JavaScript because both languages are similar in capabilities.

```text
┌──────────────── TypeScript ────────────────┐                  ┌──────────────── JavaScript ────────────────┐
│                                            │                  │                                            │
│ function greeter(person: string) {         │                  │ function greeter(person) {                 │
│   return 'Hello, ' + person.toUpperCase(); │                  │   return 'Hello, ' + person.toUpperCase(); │
│ }                                          │─── transpile ───▶│ }                                          │
│                                            │                  │                                            │
│ greeter('Jane');                           │                  │ greeter('Jane');                           │
│                                            │                  │                                            │
└────────────────────────────────────────────┘                  └────────────────────────────────────────────┘
```

The take away is that JSX is *not* a template language even though it looks like one. Template languages are compiled into HTML while JSX is transpiled into JavaScript. They're both approximately at the same level of abstraction.

```text
┌──────────── React JSX ─────────────┐                  ┌─────── JavaScript ──────┐
│                                    │                  │                         │
│                                    │                  │ React.createElement(    │
│                                    │                  │   'h1',                 │
│ <h1 id="greeting">                 │                  │   { id: 'greeting' },   │
│   Hello, { 'Jane'.toUpperCase() }. │─── transpile ───▶│   'Hello, ',            │
│ </h1>                              │                  │   'Jane'.toUpperCase(), │
│                                    │                  │   '.'                   │
│                                    │                  │ );                      │
│                                    │                  │                         │
└────────────────────────────────────┘                  └─────────────────────────┘
```

[Babel](https://babeljs.io/) is by far the most popular JavaScript transpiler and ships with built-in support for React JSX. There are a number of ways to transpile React JSX with Babel ranging from CDNs to Node packages. Additionally, the [language-babel](https://atom.io/packages/language-babel) package brings JSX syntax highlighting to Atom.

### Exercise

Take a moment to install the above Atom package.

Then, turn to a neighbor and, in your own words, explain what React JSX is as well as the similarities and differences of a compiler versus a transpiler. After about a minute, your instructor will cold call on the class and ask what was discussed.

## Why use React JSX?

Simply put, JSX makes building React applications easier. But everyone has their own workflow, so JSX is not required to use React. However, we recommend using React JSX because of its concise and familiar syntax. Plus, it's a very small amount of syntax to learn. If you're not immediately sold on React JSX, that's fine, but [give it five minutes](https://signalvnoise.com/posts/3124-give-it-five-minutes).

You'll find that a React application written in JSX is a better way to separate concerns than the traditional division of presentation and behavior. That's because:

1. Presentation and behavior are intimately tied together, so why keep them in separate HTML and JavaScript files.
2. Dedicated template languages tend to be inadequate when implementing a complex user interface.

While it may feel jarring to write HTML-like syntax with your JavaScript at first, using the expressive power of a full programming language to build a complex user interface is an ideal solution to the above problems. In short, React JSX allows presentation and behavior to live side-by-side using the power of JavaScript, but with a concise and familiar syntax.

### Exercise

Take a moment to write down why React JSX is important. Include some of its advantages and disadvantages. After about a minute, your instructor will cold call on the class and ask what was written down.

## How do you use React JSX to build a user interface?

Under the hood, React JSX transforms HTML-like elements, attributes, and children into arguments that are passed to the `React.createElement()` function. As you'll see, both HTML tags and React component classes can be transformed from JSX to JavaScript.

For the following code examples, use the [Babel REPL](https://babeljs.io/repl/) to transpile the React JSX into JavaScript. Type each code example out *by hand* and then write down your answers to each question.

### HTML tag

As you might expect, an HTML tag uses a lowercase JSX tag name. Remember, `class` and `for` are reserved keywords in JavaScript, so instead `className` and `htmlFor` must be used for attributes.

```jsx
const element = <p className="bold">Tokyo Dog</p>;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?
- **True or False:** Babel adds `use strict;` at the top of the transpiled output.

### Nested HTML tags

Additionally, HTML tags can be nested in JSX.

```jsx
const element = <ul>
  <li className="completed">Molly Moon</li>
  <li>Pie Mobile</li>
</ul>;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?

### React component class

A React component class can also be transformed from JSX to JavaScript. First, create a component class and store it in an identifier that starts with an uppercase letter. Then, use that identifier name as the JSX tag name. The lowercase and uppercase convention helps to distinguish between HTML tags and React component classes.

```jsx
const Truck = React.createClass({
  render: function() {
    return <div>
      <a href="http://www.streetdonuts.com/">Street Donuts</a>
    </div>;
  }
});

const element = <Truck />;
```

As previously mentioned, component classes must specify a `render()` function that returns a single `ReactElement` object. But that single `ReactElement` object can contain other `ReactElement` objects as children. This is the first key to building complex user interfaces.

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?
- What is the `displayName` of the component class?
- What type of object does the `render()` function return?

### Nested React component classes

Additionally, component classes can be nested within other JSX tags. This is the second key to building complex user interfaces.

```jsx
const Truck = React.createClass({
  render: function() {
    return <li>
      <a href="http://www.streetdonuts.com/">Street Donuts</a>
    </li>;
  }
});

const Trucks = React.createClass({
  render: function() {
    return <ul>
      <Truck />
    </ul>;
  }
});

const element = <Trucks />;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?
- What is the `displayName` of each component class?
- **True or False:** Self-closing JSX tags must end with `/>`.

### Single-line attribute expressions

A JSX tag's attribute value can be the result of a JavaScript expression. This is useful when you want to inline the full power of JavaScript within a JSX tag. JavaScript expressions are wrapped in a pair of curly braces `{}` instead of double quotes `""`.

```jsx
const source = 'http://i.imgur.com/nVPXKtz.jpg';
const element = <img src={source} alt="Saffron Spice" />;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?

### Multi-line attribute expressions

It's common for attributes of a JSX tag to stretch beyond your preferred line length. In cases like this, you can switch to defining one attribute per line. We recommend ordering attributes alphabetically and closing the JSX tag on a separate line, just like curly braces `{}` and parenthesis `()` in JavaScript.

```jsx
const element = <input
  onChange={this.handleChange}
  type="text"
  value={this.state.searchTerm}
/>;
```

In the wild, you may see multi-line JSX tags wrapped in parenthesis. Syntactically, this provides no benefit and just increases the indentation level unnecessarily.

```jsx
// UNNECESSARY PARENTHESIS
const element = (
  <input
    onChange={this.handleChange}
    type="text"
    value={this.state.searchTerm}
  />
);
```
- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?

### Child expressions

In addition to an attribute value, the result of JavaScript expressions can also be the child of a JSX tag. These expressions use the exact same curly brace `{}` notation.

```jsx
const food = 'Cheese';
const element = <p>{food} Wizards</p>;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?

### Boolean attributes

Boolean attribute values are frequently needed when using HTML form elements with attributes like `disabled`, `required`, `checked` and `readOnly`.

```jsx
const element1 = <input type="button" disabled />;
const element2 = <input type="button" disabled={true} />;
const element3 = <input type="button" disabled={false} />;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?
- Which JSX tags are equivalent?

### Ternary attribute expressions

The only conditional statement that works inside of JSX is a ternary expression. An `if` statement doesn't work because JSX is just syntactic sugar for JavaScript function calls.

```jsx
const isHealthy = false;
const element = <div className={isHealthy ? 'hide' : 'show'} />;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?
- **True or False:** Any element can be a self-closing JSX tag if it has no children.

### Ternary child expressions

In addition to attributes, a ternary expression can be used as a child of a JSX tag.

```jsx
const isHealthy = false;
const element = <div>
  {isHealthy ? <p>Yuck!</p> : <p>Delicious!</p>}
</div>;
```

If a ternary expression isn't robust enough, you can use an `if` statement outside of your JSX.

```jsx
const isHealthy = false;
let message;

if (isHealthy) {
  message = <p>Yuck!</p>;
}
else {
  message = <p>Delicious!</p>;
}

const element = <div>
  {message}
</div>;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?

### Style attribute expressions

In JSX, the `style` attribute accepts a JavaScript object with camel cased CSS properties.

**NOTE:** Vendor prefixes, other than `ms`, begin with a capital letter. This is why `WebkitTransition` has an uppercase `W`.

```jsx
const styles = {
  backgroundColor: 'darkblue',
  color: 'lightgreen',
  msTransition: 'all', // 'ms' is the only lowercase vendor prefix
  WebkitTransition: 'all' // note the capital 'W' here
};

const element = <p style={styles}>Happy Grillmore</p>;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?

### Comments

In JSX, it's possible to comment out both attributes and children. But remember, commented code is the same as dead code. Just delete it!

```jsx
const element = <div>
  <p>It’s Bao Time</p>
  {/* <p>Chopstix</p> */}
  <input
    // type="text"
    value="ThaiUUp" // value="Skillet"
  />
</div>;
```

- How many `ReactElement` objects are created?
- What are their `type`, `props`, and `children`?
- **True or False:** A JSX child can only be commented with the `/* */` style of comment.

### Refactoring to React JSX

Let's practice refactoring the "Hello world" React application from the previous article into React JSX. However, you can't just serve React JSX to a browser and expect it to function. Instead, you'll need the help of a build tool. A **build tool** is a program that automates the creation of a functioning application from source code. In this case, you'll use a build tool to transpile React JSX code into functioning JavaScript code before it's sent to a browser.

To get started, install the Brunch build tool globally with NPM.

```shell
npm install -g brunch
```

```shell
brunch new hello -s ryansobol/with-react
```

```shell
cd hello
```

```shell
atom .
```

```shell
npm start
```

```text
> @0.1.0 start /Users/ryansobol/Projects/week15/hello
> brunch watch --server

04 Aug 13:13:38 - info: application started on http://localhost:8000/
04 Aug 13:13:41 - info: compiled 178 files into 3 files, copied 2 in 3.3 sec
```

```shell
open http://localhost:8000/
```

Now, inside of `app/components/app.jsx`, let's refactor the component class's `render()` function into React JSX. Simply convert all `React.createElement()` function calls into JSX using the rules from above.

**NOTE:** If you forget to end a self-closing tag with `/>`, you'll see an `Uncaught SyntaxError: embedded: Expected corresponding JSX closing tag` error in the console.

`app/components/app.jsx`
```jsx
import React from 'react';

const App = React.createClass({
  getInitialState() {
    return { who: 'world' };
  },

  handleChange(event) {
    const nextState = { who: event.target.value };
    this.setState(nextState);
  },

  render() {
    let message;

    if (this.state.who.trim() === '') {
      message = 'Hello?';
    } else {
      message = 'Hello ' + this.state.who;
    }

    return <div>
      <h1>{message}</h1>
      <input
        onChange={this.handleChange}
        type="text"
        value={this.state.who}
      />
    </div>;
  }
});

export default App;
```

Refresh the page in your browser and make sure everything still works. Congratulations! You've just written your first React JSX application.

### Exercise

Update your **Hello world** application with the above changes. Resist the urge to copy-and-paste! Make sure everything is working before moving on to the assignment.

## Summary

In this chapter, you were exposed to the fundamentals of React JSX—an HTML-like syntax for creating `ReactElement` objects. In addition, you practiced writing React JSX and transpiling it into JavaScript using Babel, a popular JavaScript transpiler. At this point, you're well on your way to writing larger, more sophisticated React applications.

## Assignment

Remember the **sportsball team** assignment from the previous chapter? Since you're such a wizard at React JSX now, you should be able to refactor that application no problem. Give it go and ask questions if you get stuck.

After you're done refactoring it, go ahead and add some additional functionality to the application. Start by using the techniques outlined in this chapter. Feel free to augment or completely change the application any way you want.

As a reminder, here's a list of the new topics covered in this chapter.

- Anchor tags
- Image tags
- List tags
- CSS classes
- Inline CSS styles
- Attribute expressions
- Child expressions

However, feel free to use any of the [supported tags and attributes](https://facebook.github.io/react/docs/tags-and-attributes.html) in React. And for an even more advanced challenge, see if you can split your application into multiple component classes and try your hand at nested components.

## References

- [Brunch](http://brunch.io/)
- [React Docs - DOM Differences](https://facebook.github.io/react/docs/dom-differences.html)
- [React Docs - If-Else in JSX](https://facebook.github.io/react/tips/if-else-in-JSX.html)
- [React Docs - Inline Styles](https://facebook.github.io/react/tips/inline-styles.html)
- [React Docs - JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)
- [React Docs - Self-closing Tag](https://facebook.github.io/react/tips/self-closing-tag.html)
- [Wikipedia - Source-to-source compiler](https://en.wikipedia.org/wiki/Source-to-source_compiler)
