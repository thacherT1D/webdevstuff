[Assessment](https://students.galvanize.com/assessments/54)

[Some More Lessons](https://github.com/gSchool/fullstack-curriculum/tree/master/lessons/git)

[Repo with some notes and the rocketship](https://github.com/gSchool/g15/tree/master/curriculum/01-week/lessons)

[Exercises](https://github.com/gSchool/g15/tree/master/curriculum/01-week/exercises)

[Git Workflow](https://github.com/mjhea0/thinkful-mentor/blob/master/git-workflow.md)

## Intro

* What is version control:
    * Easy to share with others
    * "Save points" in the code
* Mention other VCS systems
* Advantages
    * Pushing to remotes
    * Rollbacks
* Four stages of files:
    1. unstagged
    2. staged
    3. committed
    4. pushed
* Rocketship Metaphor:
    * Rocketship delivers packages of work to Mars
    * Unstaged = assembling raw materials
    * Staged = deciding what goes on the rocketship
    * Committed = loading onto the rocketship
    * Pushed = Sent to Mars

## Excecise 1: Initalize a Repo / Build a Ship

0. Decide on (or create) a location for your repositories related to Galvanize.
1. Make a directory in that location `$ mkdir gitCheatSheet`
2. Move into the repository `$ cd gitCheatSheet`
3. Initalize a git repository `$ git init`

* Talk about the .git directory

```
$ cd .git
$ tree
├── HEAD
├── branches
├── config
├── description
├── hooks
│   ├── applypatch-msg.sample
│   ├── commit-msg.sample
│   ├── post-update.sample
│   ├── pre-applypatch.sample
│   ├── pre-commit.sample
│   ├── pre-push.sample
│   ├── pre-rebase.sample
│   ├── prepare-commit-msg.sample
│   └── update.sample
├── info
│   └── exclude
├── objects
│   ├── info
│   └── pack
└── refs
    ├── heads
    └── tags
```

* Users may need to `$ brew install tree`
* .git directory [cheat sheet](http://www.gitguys.com/topics/the-git-directory/)
* This folder is the rocketship
* Deleting the directory deletes the rocketship

## Exercise 2: Do Some Work

* Make a readme for your repo
* Explain how Github treats readmes
* Paste in a git cheat sheet
* Run `git status`
* Add the file
* Run `git status` again
* Commit it
* Run git log

## Excercise 3: Make a Bad Commit, Then Rollback

* Make a bad file
* Add it to the repo
* Commit it
* Look at the log
* Reset it
* Look at the log

## Excercise 4: Using a Github Remote

* Explain what a remote is
* Explain SSH keys
* [SSH Keys on Github]( https://help.github.com/articles/generating-ssh-keys/)
* Create a remote
* [Creating a remote on Github](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)
* What is a remote?
* Push & Pull
* `git remote add`

## Git Workflow

* Workflow is a protocol for loading the rocketship
* Considerations
    * Overhead
    * Rollback-ability
    * Deployability
    * Historical granularity
    * Control over master

Example:

1. Add a file
1. Commit the file

Another example:

1. Checkout master
1. Fetch latest changes
1. Rebase master
1. Checkout a new branch
1. Add files
1. Commit files
1. Rebase master again
1. Merge the new branch into master

## Exercise 5 - Collaborating with Github!

* Partner with 2 of your classmates to make a team of 3.
* Fill out the reset of the cheatsheet from Github
* Suggestion: The next steps will be easier if commands are divied out in blocks. e.g. person 1 takes the first 3 commands, person 2 takes the next 3 commands, person 3 takes the last 3 commands...
* Don't do all of them yourself
* `git [command] --help` can help with looking up commands
* Add/Commit/Push

---

* Fork/clone the repos of your partners
* Add your commands to their file
* Add/Commit/Push
* Pull request

---

* Accept your PRs

## Feature-branch Workflow Warmup

Follow the instructions in the [feature-branch workflow repo](https://github.com/gSchool/team-feature-branching-warmup)

## Advanced Git - Homework

* Make some [aliases](http://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) for git
* `branch`, `commit`, `status`, `checkout`