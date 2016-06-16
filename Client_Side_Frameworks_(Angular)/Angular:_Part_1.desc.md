By the end of this unit, you should be able to build an app like this:

<iframe src="https://player.vimeo.com/video/135778837?byline=0&portrait=0" width="500" height="313" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

Watch the video above, so as you go through the exercises you can see how you can build each portion of the project.

## Activity

Work through Unit 1 of the Angular Curriculum:

https://github.com/gSchool/angular-curriculum

No need to fork/clone - just build these exercises from scratch using pure HTML / JavaScript

## Project

- Complete the reddit-clone project
- Push to a public repo
- Deploy to S3 / Heroku / Bluemix

## Chrome Extension

[Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang-stable/niopocochgahfkiccpjmmpchncjoapek?hl=en-US)


## Angular Scope and ng-repeat

Get this app up and running and use it to determine how scope works in ng-repeat.

```
<!DOCTYPE html>
<html ng-app="ScopeyScope">
  <head>
    <meta charset="utf-8">
    <title></title>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
    <script type="text/javascript">
      angular.module('ScopeyScope', [])
        .controller('OverAndOver', function ($scope) {
          $scope.message = "I'm from the parent"
          $scope.things = [1,2,3]
        })
    </script>
  </head>
  <body>
    <div ng-controller="OverAndOver">
      <h1>Instructions</h1>
      <ul>
        <li>Change any field in Section #1</li>
        <li>Change one field in Section #2</li>
        <li>Change any field in Section #1</li>
        <li>Wat? - look at the source code</li>
      </ul>
      <fieldset>
        <legend>Section #1 <small><em>NOT</em> using ng-repeat</small></legend>
        <div>
          <input ng-model="message">
        </div>
        <div>
          <input ng-model="message">
        </div>
        <div>
          <input ng-model="message">
        </div>
      </fieldset>
      <fieldset>
        <legend>Section #2 <small><em>using</em> ng-repeat</small></legend>
        <div ng-repeat="thing in things">
          <input ng-model="message">
        </div>
      </fieldset>
    </div>
  </body>
</html>
```

## Angular State Exercise

https://github.com/gSchool/angular-stateful-objects