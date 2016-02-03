## Objectives

By the end of this lesson you should be able to:

- Define dependency injection
- Identify the concrete dependencies of a function
- Identify the abstract dependencies of a function

## Example #1

```
function formatJSON(data) {
  return JSON.stringify(populations(data), null, '  ')
}

function formatHTML(data) {
  return populations(data).map(function (row) {
    return '<p>' + row + '</p>'
  }).join("\n")
}

function populations(input){
  return input.map(function (record, i) {
    return record.city + " (" + record.population + ")"
  })
}

var data = [
  {id: 1, city: 'NY', state: 'NY', population: 20},
  {id: 2, city: 'Denver', state: 'CO', population: 20},
  {id: 3, city: 'Durange', state: 'CO', population: 20}
]

console.log(formatJSON(data));
console.log(formatHTML(data));
```

## Words

**Dependency Injection**: The software pattern that describes passing a function its dependencies.

**Dependency**: A value.  Typically functions / classes / objects