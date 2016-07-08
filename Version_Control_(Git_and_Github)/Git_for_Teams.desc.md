## Objectives


- Explain what the feature branch workflow is.
- Explain why the feature branch workflow is important.
- Use the feature branch workflow.

## How do you use the feature branch workflow?

Visit the [Merge Conflict Chart](https://github.com/gSchool/merge_conflict_chart.git) repository on GitHub.

1. Have one person on your team fork this repository. That person is now the project owner.

1. Have the owner turn on GitHub Issues as forked repositories will disabled them by default.

1. Have the owner add the other team members as Collaborators.

1. Have each team member inspect the commits on the `master` branch.

1. Have each team member inspect the open issues for the project.

1. Have each team member create a new issue to transfer more students into the "understand merge conflicts" segment of the chart.

1. Have each team member clone the repository to their development environment.

Create a new feature branch with the issue number as the suffix.

```shell
git checkout -b transfer_1
```

In the `pie.html` file, update the data values as you see fit. Make sure each team member chooses different values.

```javascript
data: [
  125,
  475
]
```

Add and commit your changes to the feature branch.

```shell
git add .
git commit -m '25 more students get it!'
```

## Resources

- [Atlassian Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
