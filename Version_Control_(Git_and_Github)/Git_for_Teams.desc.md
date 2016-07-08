## Objectives


- Explain what the feature branch workflow is.
- Explain why the feature branch workflow is important.
- Use the feature branch workflow.

## How do you use the feature branch workflow?

Visit the [Merge Conflict Chart](https://github.com/gSchool/merge_conflict_chart.git) repository on GitHub.

1. Have one person on your team fork this repository. That person is now the project owner.

1. Have the owner turn on GitHub Issues as forked repositories will disabled them by default

1. Have the owner add the other team members as collaborators.

1. Have each team member inspect the commits on the `master` branch.

1. Have each team member inspect the open issues for the project.

1. Have each team member create a new issue to transfer more students into the "understand merge conflicts" segment of the chart.

1. Have each team member clone the repository to their development environment.

Create a new feature branch with the issue number as the suffix.

```shell
git checkout -b transfer_1
```

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
