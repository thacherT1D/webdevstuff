# Deploying Static Sites

---

## Objectives

*   Describe the differences between a static and dynamic web site.
*   Explain why static sites may be faster for your users.
*   Use Firebase Command Line Tools to deploy web sites
*   Explain why setting the deployment region correctly is so important

## Why is this important?

By now in the class you have created several small projects that are running on your computer. If you wanted to show them off to friends or family, or maybe even a recruiter you would have to send them to your github page and hope that they know how to use git.

The answer is to just send them a url, and have them see your website in their own browser.

The only question you would need to answer then is what service would you use to deploy your website. There are many to choose from; some will charge you money while others are free.

This article is going to introduce you to a high quality free service called Firebase. This service was recently purchased by Google, and we will be using it throughout the cohort to deploy your code.

## What is a static site?

Static sites are defined as web sites served using fixed, static assets. The HTML, CSS, JavaScript, images, and the rest of the browser resources used for the site do not change. To change these files you need to manually update them and then re-deploy.

## What is a dynamic site?

On the other hand, a dynamic site may have assets that have been generated on a server. An example of this would be a script that automatically updates the data that is being viewed on the website. You (the developer) would not need to edit the files as they would automatically be updated on a regular basis.

Static sites are often faster for browsers to load because all parts of the site can safely be cached and reused for future requests.

### Practice

Before moving on to the next section, answer the following questions.

*   What is the difference between a static site and a dynamic site?
*   Think back to your last assignment, is it a static or dynamic site?
*   Are dynamic or static sites faster for the user? Why?

## Introducing Firebase

Firebase is a web host and api service for the creation of real-time applications. They have a series of command line tools and apis to integrate with common, real-time application environments such as Javascript in the Browser (Angular), iOS, and Android.

We are using Firebase because it is simple (and free) to set up a deploy a new site.

### Resources

*   [Firebase website](https://firebase.google.com)
*   [Blog post on deploying a Firebase static site](https://www.brooks-patton.com/deploying-a-static-website-to-firebase/)
*   [NPM module for Firebase](https://www.npmjs.com/package/firebase-tools)
*   [Firebase CLI documentation](https://firebase.google.com/docs/cli/#setup)

### Walkthrough

#### Sign up for a free Firebase account

You will need to sign up for a free account at the [Firebase website](https://firebase.google.com). Note that you will need to use your Google account to sign up.

#### Install the NPM module

Then install the Firebase Command Line tools by running `npm install -g firebase-tools`

After the command line tools are installed, you'll need to authorize your computer to have access to your Firebase account. Do this by running `firebase login`, which will open an authorization link in your browser. Click the link and you're good to go.

#### Create the app

The first thing we need to do is create a project on your Firebase console. This is accessed through the firebase website that you created an account on.

You can access the console through the link on their website, or through this [link](https://console.firebase.google.com)

In the console, create a new project by clicking on the **CREATE NEW PROJECT** button. This will open a window that needs two pieces of information. The project name and the region that the website will be deployed to.

##### Deployment region

It is important to set the deployment region correctly in order to give your users the best experience possible. The deployment region refers to where the servers that your sites files will be served from.

This means that if you choose the *United Kingdom* as the deployment region, and your users are mostly located in the *United States*, then when they navigate to your site the files will be served from across the Atlantic Ocean. While the internet can be a very fast place, as your site grows in size it could mean that your users have to wait several more seconds before they get to see your content.

Research shows that many users will not wait for a site to load for more than three seconds.

#### Initialize the applications

In your terminal, change directory into a new directory (you can name this directory whatever you want to).

Run the command `firebase init`. You will be given a interactive wizard to help you set up a new firebase project. For each of the following questions, give the appropriate answer.

*   What Firebase CLI features do you want to setup for this folder? **Hosting: Configure and deploy Firebase Hosting sites**
*   What do you want to use as your public directory? **public**
*   Configure as a single-page app (rewrite all urls to /index.html)? **No** `note that if you are using angular this should be **Yes**`
*   What Firebase project do you want to associate as default? **Choose the project you created on the Firebase website**

#### Build the website

Now change directories into the public folder that was created for you and build your website. At the most basic you can create a simple index.html file.

All of your assets that you want the browser to access must be inside the public folder. Otherwise they will not be accessible.

#### deploy the website

When you are finished building your basic hello world website, you can deploy it to Firebase with the command `firebase deploy`.

There will be some output as the project is deployed. Look through it for the url of your project. This is the link that you will use in your browser to visit your page!

Copy and paste the link to your browsers url bar and see your basic html site.

Congratulations, you have deployed a website to the internet! Now you can share the link with your friends and family and they can see your work.

When you update your website, you can push your updates to Firebase by running the `firebase deploy` command again.

#### Before continuing

Answer the following questions

*   What is the deployment region? Why is it important?
*   What folder do you need to put your index.html file in? Do you need to put your JavaScript and CSS files in the same folder?
*   Can you have subfolders inside the public folder?
*   How do you update the deployed website with changes that you have made?

## Assignment

### Deploy a previous assignment

Now that you have made a simple website and deployed it, lets deploy a real project.

*   Choose an assignment that you have already completed.
*   Initialize a Firebase project in the root folder of the assignment (don't worry, this will not erase your files. But that shouldn't matter because you are using github, right?)
*   Deploy the assignment to Firebase

When you are finished, make note of the project url, you will need it for the next assignment.

### Create a portfolio website

Create a very basic portfolio website that links to the assignment that you uploaded in the instructions above.

Your site should have the following features

*   A short description of you
*   A link to your assignment deployed to Firebase
*   A short description of the assignment

The appearance is completely up to you. This assignment will become the base of the portfolio website that you will eventually be completing later in the course.

When you are finished with the portfolio page take the deployed url and use it to fill out the provided Google form (the form will be in the daily plan).
