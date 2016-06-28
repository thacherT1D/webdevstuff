# Baking Cookies Part II: Sessions

## Objectives

By the end of this lesson you will be able to:

- Describe the purpose and function of a session.
- Store a session in a cookie.
- Clear a session from a cookie.
- Use environment variables to store session key.

***

## Sessions

### I do

### We Do

### You Do

***

## Sessions in Express

***

## Exercise

- `GET /login` Create the cookie and send it to the client
  - redirects to `/`
- `GET /logout` Clear the cookie
  - redirects to `/`
- Secure the cookie with a session using a hard coded key
- Replace the key with environment variables
- Update `POST/logout` to only clear the session from the cookie.

***

## Resources

- [Github: Cookie-Session](https://github.com/expressjs/cookie-session)
- [Wikipedia: HTTP Cookie](https://en.wikipedia.org/wiki/HTTP_cookie)
- [Github: dotenv](https://github.com/motdotla/dotenv)

<iframe src="https://player.vimeo.com/video/141306923?byline=0&portrait=0" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
