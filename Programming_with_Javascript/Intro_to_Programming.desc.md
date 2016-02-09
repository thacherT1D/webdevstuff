## Objectives

1.  Students will be able to define the following JavaScript vocabulary:
  * statement
  * keyword
  * identifier
  * value
  * literal
  * expression
  * assignment
  * operator
  * declaration
  * keyword

1. Identify and label the different parts of a line of JavaScript code
  * statement
  * keyword
  * identifier
  * value
  * literal
  * expression
  * assignment
  * operator
  * declaration
  * keyword

1. Identify expressions

1. Visually represent scope as a table

1. Mentally evaluate assignment statements

## Code as a spoken language

<iframe src="https://player.vimeo.com/video/141864271?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## A mental model of variables

<iframe src="https://player.vimeo.com/video/142087926?byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


## Exercise

Find examples of the following in this below code sample:

  * Statement
  * Identifier
  * Value
  * Literal
  * Expression
  * Assignment
  * Operator
  * Declaration
  * Keyword

```
var a = [1,1,2,1,1,3,4,2,5,9,8];

function occurrences(arr){
  var obj = {};
  var highest = 0;
  var highestKey;

  for(var i = 0;i<arr.length;i++){
    if(obj[arr[i]]){
      obj[arr[i]]++;
    }else{
      obj[arr[i]] = 1;
    }
  }

  for(var key in obj){
    if(obj[key] > highest){
      highest = obj[key];
      highestKey = key;
    }
  }
  return highestKey;

}
console.log(occurrences(a));
```
