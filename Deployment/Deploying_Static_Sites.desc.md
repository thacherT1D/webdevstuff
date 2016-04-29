# Deploying Static Sites
========================

[Deployment Slides](https://docs.google.com/presentation/d/1RSTWGJ0UB9ediyX4x5gPvK_t-7kSxcpQklMpE6AZRXE/edit?usp=sharing)

## Objectives

By the end of this lesson you will be able to:

- Describe the differences between a static and dynamic web site.
- Use Firebase Command Line Tools to deploy web sites.

## Static vs Dynamic

Static sites are defined as web sites served using fixed, static assets. The HTML, CSS, JavaScript, images, and the rest of the browser resources used to store the site can safely be cached, saved, etc. There is no dynamic function needed to create those assets.

On the other hand, a dynamic site may have assets that have been generated on a server. This could involve a server side language or database.

Static sites are often faster for browsers to load because all parts of the site can safely be cached and reused for future requests.

**You Do:** For the prework, you created a website. What type of website is it and why? Static or Dynamic?

## What is Firebase?

Firebase is a web host and api service for the creation of real-time applications. They have a series of command line tools and apis to integrate with common, real-time application environments such as Javascript in the Browser (Angular), iOS, and Android.

We are using Firebase because it is simple to set up a deploy a new site.

## Setting up Firebase.

Before we can use Firebase to host an app or site we need to sign up for an account and install the command line tools.

**You Do:**

1. Sign up for a free Firebase account on [their website](https://www.firebase.com/login/).

  > Note: if you don't have a google account, you can still sign up by clicking the link below the sign-in box.

1. Install the Firebase Command Line tools:

  ```bash
  npm install -g firebase-tools
  ```

  > Note: if Node.js is not installed, you'll need to do that first by running `brew install node`

1. Authorize your computer to have access to your Firebase account.

  ```bash
  firebase login
  ```
1. The command should provide an authorization link, open the link in your browser.


### Setting up an App / Site.

In order to upload an app or static website to Firebase:

1. Ensure your sites homepage is named `index.html`

1. Create an app on Firebase's website via the account manager.
>Note: you should be able to create a new app instance using the command line tools but this was not working at time of writing.

1. In your terminal use `cd` to navigate to the directory of the static site you would like to deploy.

1. Run `firebase init`, this will walk you through several questions.

1. When it asks where your `public` directory is located, provide the directory where your `index.html` file is located. If your `index.html` is in your current working directory, use `.` for your `public` directory.

1. Following the prompts will create a `firebase.json` file. It is used by the Firebase CLI tools to connect the current project directory with the application instance on Firebase.

**You Do:** Setup your personal website for Firebase.

### Deploying an App / Site

Now we need to deploy the website:

1. Navigate to your app / sites directory using `cd`.
1. Run `firebase deploy` and it will read the `./firebase.json` and upload your site.
1. Open up the website in your web browser by typing `firebase open`.

**You Do:** Deploy your personal website to Firebase.

It's that simple. Now you can share your newest creation with the world.

### Additional Resources

- [Firebase Hosting Docs](https://www.firebase.com/docs/hosting/)

--------------------------------------------------------------------------------

### Alternate Static Hosts

- [Github Pages](https://pages.github.com/)
- [Amazon S3](https://aws.amazon.com/s3/)
- [Neocities](http://neocities.org/)
