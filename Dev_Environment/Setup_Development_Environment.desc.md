Development Environments
========================

##Objectives, You Should Learn How To:
* Describe the differences between Production, staging and development environments.
* Setup a basic development environment with:
	* Chrome - Modern web browser (IE and Safari don't count).
	* Atom - text editor
	* Homebrew - package manager
	* Git - version control
	* Node - JavaScript for the server
* Briefly describe the purpose of each of the above.

##Content

###Production, Staging, and Development

In most web software companies there are 3 major "environments" which host and run the companies software applications: production, staging, and development. 

Production is a server (or collection of servers) that is live, on the open web, and accessible to the public. When you type [www.google.com](www.google.com) into your browser, you are making a request to Google's "production environment". Production environments are carefully configured and designed process users requests as quickly as possible.

Staging is a typically a clone of the production environment. The purpose of staging is to allow developers to test their code somewhere that behaves identically to production, but isn't available to the public. These are often available within the companies local network, or gated behind a user/password authentication screen.

Your development environment is your laptop, desktop, or whatever device you use to write code. 

###The Purpose of a Development Environment

Unlike production and staging, this environment is optimized for humans, instead of machines. Where production and staging need to respond to requests as fast as possible, development environments should help you generate code as quickly as possible. 

Creating a good development environment is a crucial step for every software engineer. There are a number of tools that you'll use every day to help you read, write, maintain, run, and navigate source code. 

Picking good tools is just the start. We'll also be introducing a number of useful keyboard shortcuts and techniques. The goal of a good development environment is to maximize time spent thinking about the logic of your code, and minimize time spent worrying about how to write it.

### Essential Tools

We have chosen an essential toolset for the Galvanize FS program. Reasonable people often disagree about the perfect tool for any given task, but we can provide more support if you use the same tools we do.

There are 3 essential tasks that every engineer must always do. We've chosen a basic toolset to help us with these tasks:

 * Editing code. 
  	* Atom: for editing source code and text (HTML/CSS/JavaScript/Ruby/...)
 * Run code. Engineers are constantly testing and using their apps
 	* Chrome: a good webbrowser for running and debugging websites.
 	* The Command Line: for running servers, scripts, and so much more.
 * Commit code to the master codebase. when the code works, it has to be saved.
 	* Git: a "version control" system that helps devs collaborate and save code.

Finally, we're also going to have you install Homebrew, a "package manager". Frequently developers will need to install another tool or library. Package managers makes installing software much easier. Because it makes everything else so much easier, we're going to start with Homebrew.

##Excercises - Install the Following Tools 

### Homebrew

**What is it? What will I be using it for?**

Homebrew is a package manager (a tool that helps us install additional technologies/tools) for OSX. Throughout the course we'll be installing tools to help us with specific tasks, such as Node for run Javascript servers; or Mongo and Postgres as databases. Homebrew will significantly improve your speed and accuracy when installing these "packages" of software.

**How do I install it?**

In terminal, run:

`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

You'll be prompted to install developer tools. Agree to this. When it comes time to enter your admin password, you will not see the password itself in the terminal. Just type your password in carefully and hit enter.

Check your Hombrew install with:

`which brew`
You should see something like this `/usr/local/bin/brew`


### Atom Editor

**What is it? What will I be using it for?**

Atom is going to be our editor of choice. There are literally hundreds of text editors to choose from but we **strongly** recommend Atom. Atom is designed for software engineering, and is very popular in the web development community.   

**How do I install it?**

https://atom.io/

**Using the atom alias**

You can open Atom from the terminal by running `atom .`.

### Chrome	

**What is it? What will I be using it for?**

Chrome is a browser that not only offers some useful features for browsing, but it is a **MUST HAVE** for developing and debugging HTML, CSS, and JavaScript. PLEASE make chrome your default browser - we will be using it almost every day.

Some browsers (IE and Safari, especially old versions) do not play nice with many modern web standards. Having a modern web browser is crucial for an effective development environment. 

**How do I install it?**

https://www.google.com/chrome/browser/desktop/

### Git	

**What is it? What will I be using it for?**

Git is a version control system that we will be using to keep track of changes in our code. It is a **MUST** know for any developer and we will be spending lots of time on it over the course. 

Version control allows programmers to make changes to their code without breaking the "master" copy; roll back changes that didn't work; backup their work across many "branches"; collaborate with other programmers on the same codebase; and so much more. 

There are literally no successful software companies that do not use some kind of version control. 

**How do I install it?**

In the terminal, run:

`brew update`

`brew install git`

## Essential Shortcuts

Developers tend to become "power users" in order to efficiently move through and between the various tools they use regularly. This is a starting cheat sheet for commands that can help you navigate and use your new development environment more effectively.

## OSX
`command + tab` : switch open applications

<code>command + &#96;</code> : (when already in command + tab) switch open applications in reverse

<code>command + &#96;</code> : goes between different windows of current program

`command + q` (while in open applications) : quit an application

## Chrome / Atom / Terminal / most apps with tabs

`command + n` : create new window

`command + t` : create new tab

`command + w` : close tab or window if only one tab

`shift + command + w` : close window with multiple open tabs

`command + q` : quit application

`command + shift + ]` : move right one tab

`command + shift + [` : move left one tab

`command + NUMBER` : move to tab number NUMBER (not in Terminal)

`fn + up` : page up

`fn + down` : page down

`alt + command + arrow keys` : move right or left tabs

## Chrome

`command + r` : reload page

`command + option + j` : open the javascript console

`command + ]` : move forward through history

`command + [` : move backward through history

`command + shift + t` : reopen last closed tab (up to 10)

## Atom

[Shortcut Cheatsheet](https://bugsnag.com/blog/atom-editor-cheat-sheet)