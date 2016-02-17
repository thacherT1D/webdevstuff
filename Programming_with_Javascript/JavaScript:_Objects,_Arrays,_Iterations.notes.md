I Do:

We Do:

They Do:

- Lots of practice with reading from, looping through, and creating objects and arrays can be had in this CCF (Crush Code Friday) Exercise originally created for g17 - https://github.com/gSchool/ccf-data-structures


### Objects

Sample questions:
- What does myObj2[dog] return? dog w/out quotes treated like variable

Baseball Exercise:
```js
players[1]['number'];

players[5]['position'];

players[0]

var redonkulus = 0;
for (var i = 0; i < players.length; i++) {
  redonkulus += players[i]['salary'];
}
console.log(redonkulus)
```

Object and Functions:
- build it step by step.

Average Method Exercise:
```js
calculator.average = function( numberArray ) {
  var arraySum = 0;
  for (var i = 0; i < numberArray.length; i++) {
    arraySum += numberArray[i];
  }
  return arraySum / numberArray.length;
}
```

Scope:
-whiteboard code -> draw boxes around scopes.
- identifyer (in a block) without var keyword references scope where orig identifyer was defined/global.
