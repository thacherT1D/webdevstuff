## What's a closure?

A **closure** is a function that references a variable defined in a parent function's scope (the scope that exists when its created). To understand closures, lets revisit the original example of a higher-order function, but make one modification.

```javascript
function createClosure() {
  var message = 'This information is enclosed with the returned function.';

  return function() {
    console.log(message);
  }
}

var closure = createClosure();
closure();

// Similarly, you can do
createClosure()();
```

In the `createClosure` function scope, a `message` variable is declared and assigned a value. Then a new function is created and given a reference to the `createClosure` function scope. This newly created function is then returned and stored in the `closure` variable. This function is a closure because, when invoked, it can reference variables inside its parent scope.

### Exercise

What does this code output?

```javascript
function createClosure() {
  var count = 0;

  return function() {
     return count++;
  }
}

var closure1 = createClosure();
var closure2 = createClosure();

console.log('Closure 1');
console.log(closure1());  // ???
console.log(closure1());  // ???
console.log(closure1());  // ???

console.log('Closure 2');
console.log(closure2());  // ???
console.log(closure2());  // ???
console.log(closure2());  // ???
```
