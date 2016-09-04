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

## Another explanation

A fantastic defintion of closure comes from the Kyle Simpson Book `You Don't Know JavaScript` - it's free on Github and I can not recommend it enough!

Closure is when a function is able to remember and access its lexical scope even when that function is executing outside its lexical scope.

What does that mean? Well....it's actually not that crazy - in fact, you've done it many times before!

```javascript
function outerInfo(){
    var privateData = "Super Secret Information!";
    function innerInfo(){
        console.log(privateData)
    }
    return innerInfo
}

var seePrivateData = outerInfo();
seePrivateData() // returns "Super Secret Information!"
```

Notice how we can NOT access the variable `privateData` anywhere, but through using the innerInfo function we can examine it! We have just used closure to access lexical scope when we are outside of the lexical scope!

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

## Resources

- https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch5.md
