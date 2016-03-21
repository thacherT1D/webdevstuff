# Feature Branch Workflow

For working in groups and teams, a feature branch workflow is a way of encapsulating your work on features into git branches, and coordinates the reintroduction of those features back into the master branch.
## Objectives

1. Use branches to encapsulate feature work.

1. Squash commits using the rebase -i command.

3. Use pull requests to fold branches back into master.

## Getting Started

1. Fork the main project on Github.

1. Clone it down:
```
  git clone <SOME_GIT_REPO>
```
1. Create a new branch:
```
  git checkout -b <BRANCH_NAME>
```
  This creates a new branch based on the *current* state of your master branch, and moves onto that new branch.

1. Code/Hack/Test:

  Here you will add and commit multiple times as you build and complete your feature.

1. Squash your commits:

  As you built your feature you very likely have a bunch of commits that aren't particularly informative, now you can squash those down into organized, meaningful commits.
```
  git log
```
  This will let you examine your commit history and determine how many commits you want to squash down before the feature is folded back into the master branch. Let's assume that we see 3 commits we want to squash down into one. To do that, we will begin an interactive rebase session:
```
  git rebase -i HEAD~3
```
  This will open your editor with some text that will look something like this:
```
  pick s9ad87f Allow install to source
  pick 9sd8dss README update
  pick 3gjlld7 edit items
```
To squash those commits into one, change to something like this:
```
  pick s9ad87f Allow install to source
  squash 9sd8dss README update
  squash 3gjlld7 edit items
```
Then, save/quit, and you'll be brought to into another editor session. Describe the changes as well as you can and save/quit again. Great! You've squashed your ugly and weird commits into one nice one. Now you're ready to submit a pull request.

1. Review Code / Make pull request (after issues are fixed)

  After completing your work and squashing your branch commits into one, you want to push them to your fork on github:
```
git push origin <BRANCH_NAME>
```
  Then go to your GitHub and change branches to the one for your new feature.

  You will click the button that says "pull request", which will bring you to a page asking you to describe your change. Describe it thoroughly.

  Then press 'Submit Pull Request'. Hooray! You did it. Now, you're not quite done yet. If the maintainer finds some problems with your code, they won't want to pull your changes until you fix them. Fortunately, whenever you commit and push more things to that branch of your code, they will be included in that pull request until it is closed.

## Getting sync'ed

1. Create an [upstream remote](https://help.github.com/articles/configuring-a-remote-for-a-fork/) (if necessary) and [sync your local fork with the Project master](https://help.github.com/articles/syncing-a-fork/).

    ```sh
    $ git checkout master
    $ git fetch upstream
    $ git merge upstream/master
    ```

1. Delete the feature branch once done.

## Rinse, Repeat

## Resource

- [Atlassian Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
