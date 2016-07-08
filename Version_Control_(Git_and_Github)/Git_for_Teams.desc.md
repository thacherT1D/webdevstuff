## Objectives


- Explain what the Feature Branch Workflow is.
- Explain why the Feature Branch Workflow is important.
- Use the Feature Branch Workflow.

## What's the Feature Branch Workflow?

So far in this program, you've been using the Centralized Workflow for Git. The **Centralized Workflow** uses a central repository to serve as the single point-of-entry for all changes to the project. In Git, the default development branch is called `master` and all changes are committed into this branch. This workflow doesn’t require any other branches besides `master`.

Developers start by cloning the central repository to their development environment. In their own local copies of the project, they edit files and commit changes. These new commits are stored locally—they’re completely isolated from the central repository. This lets developers defer synchronizing upstream until they’re at a convenient break point.

To publish changes to the official project, developers push their local `master` branch to the central repository. This adds all of the local commits that aren’t already in the central `master` branch.

Now that you've got the hang of the Master Branch Workflow, adding feature branches to your development process is an easy way to encourage collaboration and streamline communication between developers.

The core idea behind the Feature Branch Workflow is that all feature development takes place in a dedicated branch instead of the `master` branch. This encapsulation makes it easy for multiple developers to work on a particular feature without disturbing the main codebase. It also means the `master` branch will never contain broken code, which is a huge advantage for continuous integration environments.

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

Inspect the `pie.html` file in your browser.

```shell
open pie.html
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
