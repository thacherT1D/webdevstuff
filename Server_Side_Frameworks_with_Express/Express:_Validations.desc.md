## Objectives

* Re-render templates with errors
* Use includes in templates

## Validation overview

* Common validations
    * Blank fields / whitespace
    * Wrong format
    * Out of valid ranges
    * Duplicate data
* "Validation Rules"
* Validations are made up of:
    * Server side data checks
    * Error messages
    * Re-render on fail, redirect on success
* These can be extended with
    * Client side data checks
    * Input error classes

## UI

* When a form errors:
    * The user should see the form again
    * The user should see error messages
    * The form fields should be pre-populated
* Can happen collectively, or on each field (images)
* Keep the field filled in

## Render vs Redirect

* Re-render (200 OK) when the data is invalid
    * Because you're keeping the data about the page
* Redirect when it's valid

## Implementing

* check the data passed into `req.body` using simple `if` statements
* If the data is valid, `res.redirect`
* If the data is not valid, `res.render`

```js
router.post('/users', function (req, res) {
  if (req.body.firstName.trim()) {
    User.insert({first: req.body.firstName}).then(function () {
      res.redirect('/users')
    })
  } else {
    res.render('users/new', {errors: ["First name can't be blank"]})
  }
})
```

```js
router.post('/users', function (req, res) {
  var errors = []
  if (!req.body.firstName.trim()) {
    errors.push("First name can't be blank")
  }
  if (!req.body.lastName.trim()) {
    errors.push("Last name can't be blank")
  }
  if (errors.length) {
    res.render('users/new', {errors: errors})
  } else {
    User.insert({first: req.body.firstName}).then(function () {
      res.redirect()
    })
  }
})
```

## Uniqueness validations

### Technique #1: Check First

* Query the database
* Finding a record means the form is invalid (image)
* Not finding a record means the form is OK to insert (image)
* Possible race condition

### Technique #2: Insert and handle errors

* Enforce uniqueness on the database (image)

## Includes

* Include error code in partials

## Exercise

[Exercise Repo](https://github.com/gSchool/express-validations-intro)

* Intro students to wires / and/or demo
* Give them the requirements
* In pairs, have them write a proposed solution (10 minutes)
* Share out, gather solutions, ask questions to lead to to:
    * If statements in the create route
    * Errors array that gets pushed to
    * Sending back errors locals on error