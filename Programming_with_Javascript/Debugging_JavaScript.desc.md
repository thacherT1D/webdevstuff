## Debugging JavaScript

There are many ways to find and resolve bugs in a computer program, but the two most common techniques are logging and debugging.

**Logging** is the act of keeping records of the events or computed values that occur within a program. In the simplest case, these records are displayed in the console or persisted to a log file. When your program uses the `console.log()` function, it's logging.

**Debugging** is the act of using a dedicated tool, called a debugger, to stop a running program and inspect its behavior. A debugger is a powerful tool that helps developers visualize how a running program executes within a runtime system.

In this lesson, we'll be using Chrome and its [built-in debugger](https://developer.chrome.com/devtools/docs/javascript-debugging) to create and debug solutions to the following popular JavaScript technical interview questions.

### The `reverse()` function

**Problem:** Write a function called `reverse` that accepts a string as an argument and returns a new string with all characters reversed. For example:

```js
reverse('abcdef'); // 'fedcba'
```

Start off by creating an `reverse.html` file with the following code template.

```html
<script>
  var reverse = function(input) {
    // Solution here
  };

  reverse('a');
</script>
```

Once the file is saved, open it inside a new tab in Chrome and toggle the Chrome Dev Tools by pressing the `Command` + `Shift` + `I` keys. Next, click the `Sources` panel and select the HTML file from the file tree on the left. You should see something like this.

![](https://i.imgur.com/xSIMANs.png)

### The `isPalindrome()` function

**Problem:** Write a function called `isPalindrome` that accepts a string as an argument and returns true if the string is a palindrome otherwise false. For example:

```js
isPalindrome('tacocat');  // true
isPalindrome('abcdef');   // false
```

Start off by creating an `is_palindrome.html` file with the following code template.

```html
<script>
  var isPalindrome = function(input) {
    // Solution here
  };

  isPalindrome('a');
</script>
```

### The `uniq()` function

**Problem:** Write a function called `uniq` that accepts an array as an argument and returns a new array with all duplicate elements removed. For example:

```js
uniq(['a', 'b', 'c', 'a']);  // ['a', 'b', 'c']
```

Start off by creating an `uniq.html` file with the following code template.

```html
<script>
  var uniq = function(input) {
    // Solution here
  };

  uniq(['a']);
</script>
```

### The `flatten()` function

**Problem:** Write a function called `flatten` that accepts an array as an argument and returns a new array with all elements flattened. For example:

```js
flatten(['a', ['b'], [['c', 'd']]]);  // ['a', 'b', 'c', 'd']
```

Start off by creating an `flatten.html` file with the following code template.

```html
<script>
  var flatten = function(input) {
    // Solution here
  };

  flatten(['a']);
</script>
```
