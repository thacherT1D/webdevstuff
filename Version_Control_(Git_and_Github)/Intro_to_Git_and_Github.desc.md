# Objectives

* Discuss what a Version Control System is and why you would use it
* Describe what Git and Github are and how they differ
* List the three primary parts of the Git flow
* Initialize a git repository with `git init`
* Stage new and changed files with `git add`
* Check the status of changed files with `git status`
* Commit staged files to the git repository with `git commit`

<hr>

## What is a Version Control System?

Version control is a class of tools that programmers use to manage software projects.
It allows you to track changes you make to files on your machine.
This is helpful for when you screw things up! And you will. 😉
And that's ok. Version control allows developers to revert back to a specific time and place in your code. Sort of like a time machine.

Why developers use Version control:

  * Keep track of changes to files over time
  * View previous states of your project
  * Return to a previous state of your project
  * Manage changes to files from multiple people
  * Make changes without worrying about stability
  * Keep files together as a group

There are many flavors of VCS:

  * Git
  * Mercurial
  * SVN
  * Perforce
  * TFS
  * etc.

<hr>

## What is Git?

[Git](https://git-scm.com/) is a free and open source software for version control.
While there are many different version control systems, git is incredibly popular and powerful. Many companies use git, and if you understand git it will be easy to learn another version control paradigm.

#### 💪 Exercise

Take a moment and think how you would rephrase the above description of
git in your own words. Once you feel comfortable with your description
of git, turn and share it with your neighbor.

<hr>

## What is GitHub?

*Git* and *GitHub* are **NOT** the same thing.
[Github](http://github.com/) is a web based service that hosts repositories on a server and allows developers to easily collaborate.
Github acts as a remote backup service for git repositories.
Once we've __pushed__ to a __remote__ such as GitHub, we know our code is safe.
Even if our hard drives die.
And if GitHub goes down, we can still work on our distributed repos offline.

#### 💪 Exercise

Turn to your neighbor and explain why developers use Github.

<hr>

## A Metaphor: Git is a Rocketship, Github is Mars 🚀

| Rocketship Version | Git Version |
|--------------------|-------------|
| Package | Unstaged change |
| Launchpad | Staging area |
| Package on Launchpad | Staged change |
| Package in Rocketship | Commited change |
| Launch | Push |
| Rocketship | Local Git repo |
| Mars | GitHub |
| Mars Landing Pad | Remote repo |

Let's say you want to deliver some packages to Mars with a rocketship. *You want to push changes to GitHub from your git repo*

1. Create some packages.
 * *Make some changes to your files*

1. Choose which packages to place on the launchpad.
  * *`git add` the changed files you want to stage to be committed*

1. Put the packages on the launchpad into the rocketship.
  * *`git commit`*

1. Repeat the create packages, move to launchpad, and pack rocketship steps for any additional packages you want to send.
  * *Change files, `git add`, `git commit`*

1. Set the rocketship coordinates for a specific landing pad on Mars.
  * *`git remote add origin git@github.com:spacex/marooned-astronaut.git`*
  * We'll reuse our rocketship, so you only need to do this step on the very first launch!

1. When the rocketship is sufficiently loaded, we want to launch the rocketship to Mars.
  * *`git push -u origin master`*

1. Astronaut on Mars will recieve your rocketship and be happy with their new packages.
  * *Check your GitHub repo to make sure the changes were pushed*

<hr>

## What does the Git Flow look like?
Any files tracked by git typically go through 3 stages:

1. Working Directory
  * When you open up a project in your text editor you are seeing the
    state of the *working directory*
  * Any changes made here are considered *unstaged* and will **not** be committed on the next commit
1. Staging Area
  * Changes that have been *staged* are ones that have been added to something called the *index*, or *staging area* as it's more commonly referred to
  * Changes added here will be committed to the *local repository* on the next commit
  * It's important to note that your working directory may reflect
    changes that have been added to the staging area, but they are in
fact tracked separately
1. Local Repository
  * This is where changes that have been *committed* in the last commit
    are tracked
  * Again, your working directory may reflect changes that have been
    commited, but they are tracked separately. You will see where
shortly.

![Git Flow](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/291/git_flow.png)

#### 💪 Exercise

Partner up with the person sitting next to you for a Sage & Scribe exercise.

The Sage can only speak, but can't write.
The Scribe can only write but can't speak.

Each person will take a turn being both the Sage and the Scribe.

Without looking at the above notes:
The Sage is responsible for describing in as much detail as they can recall the git flow.
The Scribe is responsible for drawing out a diagram depicting the git flow **as described by the Sage**

Don't worry, the point isn't to check to see that you memorized 100% of
the git flow 10 seconds after we walked though it. Now close your laptops!

## Basic Git Commands

There are 5 main commands for `git`

 * init
 * status
 * add
 * commit
 * push

With these 5 commands you can create a repo and start versioning your project.

Let's spin up a new project and play with these commands. You should have a
"workspace", "playground" or some other place where you are organizing all your projects for this class.

In your work space:
* Create a new directory `mkdir git-test`
* Move into that directory `cd git-test`
* Create a few files `touch space-is-rad.txt what-about-bob.txt stuff.txt`

### init
Initialize a new git repo in your current directory with:

```
$ git init
```

Boom! Your working directory now has a git repository! 💥

You can verify this by checking that a `.git` subdirectory was created when you run `ls -a`.

The .git subdirectory contains a number of subdirectories and files that keep track of all the changes happening in your working directory, or repo as it also called. You will also find configuration details, a list of branches, Github remotes and also things called SHAs. SHAs are a long series of numbers used as a unique ID for your commits. Don't worry too much about that right now, just know that the *.git* subdirectory is where all that stuff related to your git repo is tracked.

> Docs: [git manual](https://git-scm.com/docs/git-init) or `man git-init`


### status
If you type `git status` when in a git repository it will show you if you
have any staged or unstaged files. Remember from the metaphor above
*unstaged* changes are those packages on the launch pad waiting to be
loaded up into the rocket and *staged* changes are the packages already
loaded on the rocket ready to be committed to mars.

in your git repository (working directory) run:

```
$ git status
```

Your output should look something like:

```
On branch master

Initial commit

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  space-is-rad.txt
  what-about-bob.txt
  stuff.txt

nothing added to commit but untracked files present (use "git add" to track)
```

You will see our files show up under the "Untracked files" section. "Untracked" simply means it's a new file that git hasn't seen before.

Aside from that you may also notice git's output is also giving us a hint on how to stage our file to the staging area. It should look familar, you also saw it in the git flow diagram not too long ago.

> docs: [git manual](https://git-scm.com/docs/git-status) or `man git-status`


### add
So let's use that hint git gave us above and it start tracking files:

```
$ git add space-is-rad.txt
```

This then adds that file to the *staging area*, or *index* as it's sometimes referred to. Let's check the status of our repo again:

```
$ git status
```

You should now see a few new things from before:
  * Our *space-is-rad* file is listed under the "Changes to be committed" section
  * It's green instead of red
  * It is prefaced by "new file:"

Add some text to that file and check the status yet again:

```
$ echo 'space cats!' >> space-is-rad.txt
$ git status
```

Well now we have three sections. Looks like our space file is staged to be commited, but also below shows that it is "not staged for commit" wha?

In that second section there you can see it is listed as being "modified:" What is happening is that we have staged, or are tracking, the original state of the file when it was empty. We now also have our newly "modified" version in our working directory. To sync thing up all we have to do is `git add` this newly modified version of our space file:

```
$ git add space-is-rad.txt
$ git status
```

A status check shows us that the changes we made to our space file are now staged and ready to be commited.

If you've made changes to several files, and even created a few new ones
as well, you can tell git to track all things that have been changed or
newly created inside the working directory in one go with:

```
$ git add .
$ git status
```

After running those command you can see that it added all the things!

Remember the `.` just means *everything inside the directory I'm
currently standing in*

It is good practice to make a few changes that all relate to a single
task and *add* them to the staging area individually using that first
command. You would then *commit* that group of files at one time. More
on that part in a bit.

On occation you will do things that create a crazy number of files all
at once, in which case using `git add .` makes more sense.

> Docs: [git manual](https://git-scm.com/docs/git-add) or `man git-add`


### commit
After staging files with `git add` you will then be able to commit those changes. This will save the current state of the project as a snapshot in time.

```
$ git commit -m "I fixed all of the bugs. 😃"
```

This will create a commit in git that will be a snapshot of the current
state of your working directory. And yes, you can even use emojis in your commit
messages! 🎉

If you make a few changes and apply the `git add` command you previously
learned on just some of those files, and then use the `git status`
command you will see some of the files are green and some are red. The
green ones are all the files that you have *add*ed to the *index*, or
have "staged". The red ones are the *unstaged* files. When you run `git commit`
only the green, or "staged" files will be committed, AKA, saved to git. The red ones will
just remain in the "staging area" waiting to be added for the next
commit trip to Mars.

> Docs: [git manual](https://git-scm.com/docs/git-commit) or `man git-commit`


### push
If you are using GitHub or collaborating with another git repo, you can push any new commits to your default remote with:

```
$ git push
```

Using the `push` command will update your default *remote* repository.
For you this will typically be some Github repo you have created and will be the backed-up-on-the-web source of truth for your project.

If you have your remote pointing to GitHub, you should be able to see the changes you *push* on your GitHub page.

#### remotes
You can have mulitple *remotes* and give them different nicknames but there
is only one default remote. By convention the default remote is named "origin". You can
check your *remotes* by running `git remote -v`. Don't worry too much
more about remotes for now, just know generally what they represent and
how to look at them.

> Docs: [git manual](https://git-scm.com/docs/git-push) or `man git-push`
> Docs: [git manual](https://git-scm.com/docs/git-remote) or `man git-remote`

<br>

#### 💪 Exercises

Try to do these without looking at the answer first!


#### Basic Git Workflow

1. Create a new folder
1. Initialize a git repository
1. Create a new file
1. Check that the file is unstaged
1. Add the file to the staging area
1. Check that the file is staged
1. Commit the file

![Answer Padding](https://media.giphy.com/media/3oD3YveOJWdwIAfZ5e/giphy.gif)

<br>
<br>
<br>

#### Answer

```
$ mkdir myProjectName
$ cd myProjectName
$ git init
$ touch readme.md
$ git status
$ git add readme.md
$ git status
$ git commit -m "Initial commit"
```

### Pushing to GitHub

1. Create a *GitHub* repository
1. Create a local git repository
1. Create a file
1. Stage the file
1. Commit the file
1. Set the GitHub repo as the git remote
1. Push to GitHub

![Answer Padding](https://media.giphy.com/media/l46CsTPetihC1rX9K/giphy.gif)

<br>
<br>
<br>

#### Answer

Create a GitHub repo:
 * Click on the + icon in the top right.
 * choose "New Repository"
 * fill out the forms and click "Create Repository"

```
$ mkdir myProjectName
$ cd myProjectName
$ git init
$ touch readme.md
$ git status
$ git add readme.md
$ git status
$ git commit -m "Initial commit"
$ git remote add origin git@github.com:{userName}/{repoName}.git
$ git push -u origin master
```

<hr>

#### 📚 Resources

* `man git` // the full git manual from your terminal
* [VCS on Wikipedia](https://en.wikipedia.org/wiki/Version_control)
* [Git SCM Manual](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
* [Pro Git book](http://git-scm.com/book/en/v2)
* [Tower Learn Version Control with Git book](https://www.git-tower.com/learn/git/ebook/command-line/introduction#start)
* [Try Git](https://try.github.io/)
* [Git Glossary](https://help.github.com/articles/github-glossary/)
* [Getting Started](https://www.atlassian.com/git/tutorials/what-is-version-control)
* [Tower Git Cheatsheet](http://www.git-tower.com/blog/git-cheat-sheet/)
