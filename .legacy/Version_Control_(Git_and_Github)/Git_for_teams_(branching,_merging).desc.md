## Discuss
 - What are the benefits of a fork / pr workflow model?
 - What are some drawbacks?
 - What are some problems you've had when doing local development?


## Git Branch
Used to create new working branches of a git repository.

 - `git branch ` to create a new working branch
 - `git co <branchname>` to change between branches
 - `git co -b <branchname>` creates and changes your current branch to the newly created one
 - `git branch -av` list all branches (local and remote)
 - `git branch -d` to delete a merged branch

## Git Merge
Used to merge the commits in two branches together. Depending on previous commits in each branch, this may result in a new "merge commit".

 - `git merge <branchname>` merges the specified branch into the current branch
 - `git merge <branchname1> <branchname2>` merges branch 1 into branch 2
 - `git merge <branchname> --squash` merges the specified branch into the current branch by squashing all the commits.

## Git Workflow
 - Master will be the branch used to deploy to production environments.
 - Development will be the branch used on any development environments. Also used to merge features and bugfixes into for testing before further merging. It will periodically be merged into master for product releases.
 - For any development done on a new feature or bug-fix, that would should take place on a new branch. When the feature or bug-fix is "complete" and ready to be joined into the project, merge the branch, and delete the feature branch.


### Resources
 - [Git Branching Workflows](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
- [Branching Diagran](http://nvie.com/posts/a-successful-git-branching-model/)

