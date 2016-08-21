# Immediately Invoked Function Expressions (IIFEs)

## How do you use IIFEs to enclose scope?

One of the ways to enclose scope is by creating an immediately invoked functional expression (**IIFE**). With IIFEs, code is wrapped in a function, creating a new scope, and then invoked immediately.

```javascript
(function() {
  // ALL CODE HERE
})();
```

Ever wondered why you've seen entire JavaScript files wrapped in an IIFE? By using an IIFE, variables are no longer declared in the global scope.

IIFEs can be invoked with arguments as well. Consider the following code. What do you think the final output will be?

```javascript
var arr = [];

for(var i = 0; i < 3; i++) {
  arr.push(function() {
    console.log(i);
  });
}

for(var func of arr) {
  func();
}
```

Because these callback functions are not executed immediately, they'll output the final value of `i` multiple times. To maintain each value of `i`, the `for` loop's body can be wrapped in an IIFE.

```javascript
var arr = [];

for(var i = 0; i < 3; i++) {
  (function(j) {
    arr.push(function() {
      console.log(j);
    });
  })(i);
}

for(var func of arr) {
  func();
}
```

By creating an IIFE with one parameter and invoking it with the value of `i`, the value of `i` is stored in the parameter `j`.
