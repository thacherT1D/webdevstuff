# Angular Auth

## Interceptors

- Middleware for $http
- 2 Steps to create
  - create a factory with two methods:
    - request
    - responseError
  - register it
- Role it plays
  - add the token on the way out
  - check the status code on the way back

Why?

- Because you may stay on one page for a long time
- And your token may expire in the meantime
- And if every response may send you to the login, it's better

## Resolve

- Differs between routers
- Prevents content from flashing before showing up
  - ui-router new / resolve names are added to component bindings
  - ngrouter - injects and also does $scope.$resolve

## $routeChangeStart

- Quickly prevents certain scenarios
  - If you don't have a token but you're moving to a route that needs authentication
  - If you do have a token and you're going to a page that can't have it

How do you know if you need authentication?  Add extra properties to the route

## Scenarios

- Login w/ errors
  - case insensitive / trim
  - blanks / mismatches
- Signin w/ errors
  - case insensitive / trim
  - blanks / dupes / formats
- Token expires
- Token is tampered with
- Current user / login / logout links on every page
- Some pages have a mix of edit links / non-edit links (based on permissions)
- Some pages are admin-only
- Some pages are login-only
- Some pages are all three, with differences for each

## Deployments

- If you generate, lose the error renderers

### Embedded

- Wildcard route
  - TODO: figure out how to allow errors to flow through
- nodemon.json ignore public

### Separate directories

- CORs
  - install, require, use
- Package.json at root for Heroku
- .env changes
- running knex etc... when deploying with `--knexfile`
- have these deploy scripts handy
