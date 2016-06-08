# Testing Whiteboard Code

## Standard

Employ a methodical process at a whiteboard interview

## Objectives

By the end of this article, you should be able to:

- Run through the code with actual values, checking at every iteration

## Rationale

Whiteboard interviewers _should_ ideally be checking your problem solving skills.  By testing your code you are demonstrating that:

- you can think like an interpreter (a technical skill)
- you employ a methodical approach to development that involves checking for quality (problem solving skill)

## Exercise

Before calling it "done" (or if an interviewer says "Ready to ship?") run through your code with _actual values_.

> PROTIP:  "Test the code you _wrote_, not the code you _thought_ you wrote" <-- Experienced Google Interviewer

Let's say you have this function:

```js
function join(array, delim) {
  let result = ''
  for (let i = 0; i < array.length; i++) {
    result += array[i] + delim
  }
  return result
}
```

You might write the following test code on the board:

In the inputs/outputs step from before, you should have already written:

```
Input:  array = ["hello", "world"], delim = "-"

Expected result: "hello-world"
```

So at the end, you could write:

```
result = ""
array length = 2
---------------
i = 0
result = "hello-"
---------------
i = 1
result = "hello-world-"
---------------   ^
i = 2             |
return -----------
```

Or you could write:

```
l | i | result
--------------
2 | 0 | "hello-"
2 | 1 | "hello-world-"
2 | 2
```

Write the values **at the end of the iteration**.

Example:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/200/IMG_2106.JPG)
