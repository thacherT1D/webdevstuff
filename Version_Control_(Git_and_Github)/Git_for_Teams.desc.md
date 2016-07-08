## Objectives


- Explain what the Feature Branch Workflow is.
- Explain why the Feature Branch Workflow is important.
- Use the Feature Branch Workflow.

## What's the Feature Branch Workflow?

Throughout this program, you've been using a Centralized Workflow for nearly all of your projects. A **Centralized Workflow** uses a central `origin` repository with a single `master` branch to serve as the hub for all changes to the project. For most of your projects, the `origin/master` branch started off with at least one commit made by your instructors.

```text
origin/master
      │
      │
      │
      ▼
 ┌─────────┐
 │         │
 │ be282f7 │
 │         │
 └─────────┘
```

You began each project by cloning the central repository to your development environment. Cloning is the process of copying all the commits from the `origin/master` branch to a local repository's `master` branch.

```text
origin/master
      │
      │
      │
      ▼
 ┌─────────┐
 │         │
 │ be282f7 │
 │         │
 └─────────┘
      ▲
      │
      │
      │
   master
```

In your own local repository, you edited files and committed changes. These new commits were stored on the local `master` branch, completely isolated from the central repository. This let you defer synchronizing with the central repository until you were at a convenient break point.

```text
origin/master
      │
      │
      │
      ▼
 ┌─────────┐    ┌─────────┐
 │         │    │         │
 │ be282f7 │────│ 4f7e591 │
 │         │    │         │
 └─────────┘    └─────────┘
                     ▲
                     │
                     │
                     │
                  master
```

When you were ready to publish your changes, you pushed your local `master` branch to the central repository. This added all of the additional local commits to the `origin/master` branch.

```text
              origin/master
                    │
                    │
                    │
                    ▼
┌─────────┐    ┌─────────┐
│         │    │         │
│ be282f7 │────│ 4f7e591 │
│         │    │         │
└─────────┘    └─────────┘
                    ▲
                    │
                    │
                    │
                 master
```

Now that you've got the hang of the Centralized Workflow, it's time to add feature branches to your development process so you can streamline communication with your team. The core idea behind the **Feature Branch Workflow** is that all feature development takes place in a dedicated branch instead of the `master` branch.

The Feature Branch Workflow still uses a central repository, and the `origin/master` branch still represents the official project history. But, instead of committing directly on your local `master` branch, you create a new branch every time you start work on a new feature. Descriptive feature branch names, like `animate_menu_61`, help to give a clear, highly-focused purpose to each branch.

Each feature branch is created from the local `master` branch when it's synchronized with the central `origin/master` branch.

```text
              origin/master
                    │
                    │
                    │
                    ▼
┌─────────┐    ┌─────────┐
│         │    │         │
│ be282f7 │────│ 4f7e591 │
│         │    │         │
└─────────┘    └─────────┘
                    ▲
                    │
                    │
                    │
                 master
             animate_menu_61
```

In your local feature branch, you edit files and committed changes just like before. These new commits were stored on the local `animate_menu_61` branch, completely isolated from both the `master` and `origin/master` branches. This let you defer synchronizing until the feature is working as expected.

Git makes no technical distinction between the `master` branch and feature branches, so developers can edit, stage, and commit changes to a feature branch just as they did in the Centralized Workflow.


```text
              origin/master
                    │
                    │
                    │
                    ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│         │    │         │    │         │
│ be282f7 │────│ 4f7e591 │────│ dad1e7f │
│         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘
                    ▲              ▲
                    │              │
                    │              │
                    │              │
                 master     animate_menu_61
```

When you were ready to publish your changes, you merge your local `animate_menu_61` branch into the local `master` branch. This adds all of the additional feature commits to the `master` branch.

```text
              origin/master
                    │
                    │
                    │
                    ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│         │    │         │    │         │
│ be282f7 │────│ 4f7e591 │────│ dad1e7f │
│         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘
                                   ▲
                                   │
                                   │
                                   │
                                master
                            animate_menu_61
```

Then, you push your local `master` branch to the central repository. This added all of the additional local commits to the `origin/master` branch.

```text
                             origin/master
                                   │
                                   │
                                   │
                                   ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│         │    │         │    │         │
│ be282f7 │────│ 4f7e591 │────│ dad1e7f │
│         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘
                                   ▲
                                   │
                                   │
                                   │
                                master
                            animate_menu_61
```

Now that both the `master` and `origin/master` branch are synchronized, you can delete the `animate_menu_61` feature branch.

```text
                             origin/master
                                   │
                                   │
                                   │
                                   ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│         │    │         │    │         │
│ be282f7 │────│ 4f7e591 │────│ dad1e7f │
│         │    │         │    │         │
└─────────┘    └─────────┘    └─────────┘
                                   ▲
                                   │
                                   │
                                   │
                                master
```

In addition, feature branches can be pushed to the central repository. This makes it possible to share a feature with other developers without touching any official code. Since `master` is the only special branch, storing several feature branches on the central repository doesn’t pose any problems. Of course, this is also a convenient way to back up everybody’s local commits.

### Exercise

Turn to your partner and explain what the Feature Branch Workflow is in your own words. Be sure to draw a diagram together that describes how the workflow progresses over time.

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
