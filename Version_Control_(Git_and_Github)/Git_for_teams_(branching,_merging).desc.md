## Objectives

- Describe a branching workflow
- Create new git branches for new features/bug fixes
- Merge features/bug fixes into appropriate branch when ready
- Use a master and possibly dev branch for currently deployed code
- Explain what causes a merge conflict
- Resolve merge conflicts


## Discuss
 - What are the benefits of a fork / pr workflow model?
 - What are some drawbacks?
 - What are some problems you've had when doing local development?

Read [Branches in a Nutshell](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

Guiding questions:

- What is a branch?
- What is special about the `master` branch?
- How do you create a branch?
- How do you change branches?

## Git Branch
Used to create new working branches of a git repository.

 - `git branch <branchname>` to create a new working branch
 - `git checkout <branchname>` to change between branches
 - `git checkout -b <branchname>` creates and changes your current branch to the newly created one
 - `git branch -av` list all branches (local and remote)

## Git Merge
Used to merge the commits in two branches together. Depending on previous commits in each branch, this may result in a new "merge commit".

 - `git merge <branchname>` merges the specified branch into the current branch
 - `git merge <branchname1> <branchname2>` merges branch 1 into branch 2
 - `git merge <branchname> --squash` merges the specified branch into the current branch by combining (squashing) all the commits into one
 - `git branch -d` to delete a merged branch

 - [Github article on resolving conflicts](https://help.github.com/articles/resolving-a-merge-conflict-from-the-command-line/)

Read [Branching Workflows](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)

Guiding questions:

- Why are topic branches useful?
- How do they come into play in both an individual environment as well as a team environment?

Let's practice doing some branching / merging with [this interactive site](http://learngitbranching.js.org/?NODEMO)

## Git Workflow
 - Master will be the branch used to deploy to production environments.
 - Development will be the branch used on any development environments. Also used to merge features and bugfixes into for testing before further merging. It will periodically be merged into master for product releases.
 - For any development done on a new feature or bug-fix, that would should take place on a new topic branch. When the feature or bug-fix is "complete" and ready to be joined into the project, merge the branch, and delete the feature branch.

For a more thorough branching strategy, read about [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/)


### Resources
- [Distributed Git Branching Workflows](https://git-scm.com/book/en/v2/Distributed-Git-Distributed-Workflows)
- [Visual Git Branching practice](http://learngitbranching.js.org/)
