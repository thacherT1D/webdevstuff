How would you test a function that makes use of `Math.random()`

```
module.exports = function (input) {
  var max = input.length
  var result = []
  var index

  for (var i = 0; i < max; i++) {
    index = Math.floor(Math.random() * input.length)
    result[i] = input[index]
    input.splice(index, 1)
  }

  return result
}
```

You could do something like this:

```
var shuffle = require('../shuffle')

describe("#shuffle", function () {

  var originalRandom

  beforeEach(function () {
    var results = [0.7, 0.5, 0]
    var predicatableRandom = function(){
      return results.shift()
    }
    originalRandom = Math.random
    Math.random = predicatableRandom
  })

  afterEach(function () {
    Math.random = originalRandom
  })

  it("returns a shuffled array", function () {
    expect(shuffle(['a', 'b', 'c'])).toEqual(['c', 'b', 'a'])
  })

})
```

What's happening there?  How / why does that work?

How would you do it using dependency injection?