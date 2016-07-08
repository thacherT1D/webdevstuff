## Objectives


- Explain what the Feature Branch Workflow is.
- Explain why the Feature Branch Workflow is important.
- Use the Feature Branch Workflow.

## What's the Feature Branch Workflow?

Throughout this program, you've been using a Centralized Workflow for nearly all of your projects. A **Centralized Workflow** uses a central repository on GitHub with a single `master` branch to serve as the point-of-entry for all changes to the project.

You started each project by cloning the central repository to your development environment. In your own local copy of the project, you edited files and committed changes. These new commits were stored locally, completely isolated from the central repository. This let you defer synchronizing with the central repository until you were at a convenient break point. To publish your changes, you pushed your local `master` branch to the central repository. This added all of the local commits that weren’t already in the central `master` branch.

Now that you've got the hang of the Centralized Workflow, adding feature branches to your development process is an easy way to encourage collaboration and streamline communication between developers. The core idea behind the **Feature Branch Workflow** is that all feature development takes place in a dedicated branch instead of the `master` branch.

## Why is the Feature Branch Workflow is important?

This encapsulation makes it easy for you to work on a particular feature without disturbing the main codebase. It also means the `master` branch will never contain broken code, which is a huge advantage when working collaboratively.

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
