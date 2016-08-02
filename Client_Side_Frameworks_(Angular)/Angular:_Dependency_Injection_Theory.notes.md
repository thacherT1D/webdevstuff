<div class="alert alert-danger">

* Missing You-Do

</div>

## Lecture (I do)

- Lecture about what DI is (with small examples).
- Talk about the example in the student notes

**Dependencies:**

- Functions or objects that conform to a contract (and interface)

**Theory:**

- Talk about SRP (single responsibility principle)
- Talk about how your code should be highly cohesive, loosely coupled
- Talk about how you should depend on _abstractions_, not _concretions_

**Contracts (interfaces)**

When you inject a dependency, you establish a contract between the calling code and the dependency.  What is the _contract_ for `$http` in Angular?

- is an object
- has a `get` method that:
    - takes a string (url / path)
    - returns a promise that
        - yields a response object that
            - has a `data` property

That's a complex contract, but you could fulfill that contract with:

```
var fakeTTP = {
  get: function () {
    return new Promise(function (resolve, reject) {
      resolve({
        data: {foo: "bar"}
      })
    })
  }
}
```

That is to say: contracts (interfaces) may be complex and multi-level, but when you inject these dependencies you are still relying on _abstractions_ over concretions.

**Abstraction vs. Concretion:**

Concretion:

```
function doStuff(){
  HTTP.get('/foo')
}
```

Abstraction:

```
function doStuff($http){
  $http.get('/foo')
}
```

**Analysis:**

- Show how you can see when dependencies are injected because it's either
    - passed in as parameters
    - set as properties

---


### Whiteboard questions (we do / CFUs)

```js
function doStuff(moarStuff) {
  var x = otherStuff()
  var y = moarStuff(x)
  return x * y
}
```

- List the concrete dependencies
    - `otherStuff`
    - because it was not defined _in_ the function
- List the injected dependencies
    - `moarStuff`
    - because it was _passed in_

--------------------------------------------

```js
function etl(extractor, transformer, loader) {
  var data = extractor.extract()
  var newData = transformer(data)
  loader.load(JSON.stringify(newData))
}
```

- List the injected dependencies
    - extracter, transformer, loader
- List the concrete dependencies
    - JSON (not defined _in_ the function)

----------------------------------------------

When injecting dependencies we establish a contract between the injected dependency, and the function that uses it.  Take a look at the `formatter` dependency. Below:

```js
function run(data, formatter) {
  return formatter.format(data, true)
}
```

- What _type_ of thing is `formatter` likely to be?
    - an object, because we are accessing a property `.format`
- Do you think `format` returns something?  Why or why not?
    - yes, because _we_ return _its_ return value
- How many parameters does `format` take?
    - 2 - it has an arity of 2 from what we know

-----------------------------------------------------

- Look at the following code:

```js
function HTMLHelper(renderer) {
  renderer.render('p')
  renderer.render('div', {class: 'container'})
}
```

- What _type_ of thing is `renderer` likely to be?
    - an object
- Do you think `render` returns something?  Why or why not?
    - not likely, because we are not capturing the return value in any way
- How many parameters does `render` take?
    - 2 that we know of

------------------------------------------------------

Cold-calling

Low

* What does DI stand for?
  - Dependency injection
* What does IoC stand for?
  - Inversion of Control

Medium / High

* What _is_ DI?
  - a pattern for passing dependencies into functions / constructors
* What evidence might you have that dependencies have been injected?
  - parameters are passed into functions
  - property values are set
* You want your code depend on _what_ over _what_?
  - _abtractions_ over _concretions_
* You want your code to be highly _what_ and loosely _what_?
  - highly _cohesive_, loosely _coupled_
