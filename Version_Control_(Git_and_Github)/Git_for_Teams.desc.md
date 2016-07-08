## Objectives


- Explain what the feature branch workflow is.
- Explain why the feature branch workflow is important.
- Use the feature branch workflow.

## Getting Started

1. Fork the main project on Github
1. Clone it down
1. Create a new branch > `$ git checkout -b <BRANCH_NAME>` (this creates a new branch based on the *current* state of your Master branch)
1. Code/Hack/Test
1. Commit your code/create PR on Github
1. Review Code / Provide Feedback / Merge pull request (after issues are fixed)

## Getting sync'ed

1. Create an [upstream remote](https://help.github.com/articles/configuring-a-remote-for-a-fork/) (if necessary) and [sync your local fork with the Project master](https://help.github.com/articles/syncing-a-fork/).

```shell
git checkout master
git fetch upstream
git merge upstream/master
```

1. Delete the feature branch once done.

## Rinse, Repeat

## Resources

- [Atlassian Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
