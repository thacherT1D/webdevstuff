What will this code log?  Write one line per call.

```js
angular.module('app')
  .factory('people', function () {
    var variable = 1;
    return {
      foo: variable,
      inc: function () {
        variable += 1;
      }
    }
  })
  .controller('PeopleController', function (people) {
    people.foo
  })
  .controller('AddressesController', function (people) {
    people.foo
  })
```
