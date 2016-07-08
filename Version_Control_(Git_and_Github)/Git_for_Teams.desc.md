## Objectives


- Explain what the Feature Branch Workflow is.
- Explain why the Feature Branch Workflow is important.
- Use the Feature Branch Workflow.

## What's the Feature Branch Workflow?

In the first quarter this course, you employed a Centralized Workflow to manage the Git commits for your projects. In Git, a **Centralized Workflow** uses a central `origin` repository with a single `master` branch to serve as the hub for all the commits of a project. In Git speak, this is simply referred to as the `origin/master` branch.

Most of your projects started off with at least one commit in the `origin/master` branch as your instructors wanted to give you a solid foundation from which to build.

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

From here, you got started by forking and cloning a central repository. Forking is the process of coping a repository to your GitHub account, while cloning is the process of copying a central repository to your local development environment. When you clone, all the commits from the central repository's `origin/master` branch are copied to your local repository's `master` branch.

```text
origin/master
   master
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

In your local repository, you created and modified files, added the changes to the local repository's staging area, and committed the staging to the local `master` branch. These new commits, stored in the local `master` branch, were completely isolated from the central `origin/master` branch. This allowed you defer synchronizing with the central repository until you reached a convenient stopping point.

```text
origin/master      master
      │               │
      │               │
      │               │
      ▼               ▼
 ┌─────────┐     ┌─────────┐
 │         │     │         │
 │ be282f7 │─────│ 4f7e591 │
 │         │     │         │
 └─────────┘     └─────────┘
```

When you were ready to publish your changes, you pushed your local `master` branch to the central `origin/master` branch. Pushing is the process of copying all of the additional commits from the local repository to the central repository.

```text
               origin/master
                  master
                     │
                     │
                     │
                     ▼
┌─────────┐     ┌─────────┐
│         │     │         │
│ be282f7 │─────│ 4f7e591 │
│         │     │         │
└─────────┘     └─────────┘
```

As previously mentioned, this was, more or less, your Git workflow for the first quarter of the course. However, throughout the second quarter, you began to adopt a Feature Branch Workflow to manage the Git commits of your projects. The core idea behind the **Feature Branch Workflow** is that all commits related a specific feature, or bug fix, are stored in a dedicated branch instead of the `master` branch.

The Feature Branch Workflow still uses a central repository and the `origin/master` branch still represents the official project history. But, instead of committing directly on your local `master` branch, you create a new branch each time you start work on a new feature. Descriptive feature branch names, like `animate_menu_61`, help to give a clear, highly-focused purpose to each branch.

Each feature branch is created from the local `master` branch when it's synchronized with the central `origin/master` branch.

```text
               origin/master
                  master
              animate_menu_61
                     │
                     │
                     │
                     ▼
┌─────────┐     ┌─────────┐
│         │     │         │
│ be282f7 │─────│ 4f7e591 │
│         │     │         │
└─────────┘     └─────────┘
```

Git makes no technical distinction between the `master` branch and a feature branch. So you can add and commit changes to a feature branch just as you did in the Centralized Workflow. The only difference being the new commits are stored in the local `animate_menu_61` branch, completely isolated from both the `master` and `origin/master` branches. This let you defer synchronizing your work with official project history until the feature is working as intended.

```text
               origin/master
                  master      animate_menu_61
                     │               │
                     │               │
                     │               │
                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘
```

When you're ready to publish your changes, you first merge your local `animate_menu_61` branch into the local `master` branch. This adds the feature's commits into the `master` branch.

```text
                                  master
               origin/master  animate_menu_61
                     │               │
                     │               │
                     │               │
                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘
```

Then, you push your local `master` branch to the central `origin/master` branch, adding the feature's commits into the official project history.

```text
                               origin/master
                                  master
                              animate_menu_61
                                     │
                                     │
                                     │
                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘
```

Now that both the `master` and `origin/master` branch have the feature commits, you can delete the `animate_menu_61` feature branch.

```text
                               origin/master
                                  master
                                     │
                                     │
                                     │
                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘
```

And that's the basics of the Feature Branch Workflow.

### Exercise

Turn to your partner and explain what the Feature Branch Workflow is in your own words. Be sure to draw a diagram together that describes how the workflow progresses over time.

## Why is the Feature Branch Workflow is important?

so you can streamline communication with your team

This encapsulation makes it easy for you to work on a particular feature without disturbing the main codebase. It also means the `master` branch will never contain broken code, which is a huge advantage when working collaboratively.

```text
                               origin/master
                                  master
                             migrate_users_62
                                     │
                                     │
                                     │
                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘

```

```text
                               origin/master
                                  master     migrate_users_62
                                     │               │
                                     │               │
                                     │               │
                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ 89ee2b0 │
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                               origin/master
                                  master
                               fix_menu_63
                                     │
                                     │
                                     │
                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │
│         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘
```

```text
                               origin/master
                                  master       fix_menu_63
                                     │               │
                                     │               │
                                     │               │
                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                                  master
                               origin/master   fix_menu_63
                                     │               │
                                     │               │
                                     │               │
                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                               origin/master
                                                  master
                                               fix_menu_63
                                                     │
                                                     │
                                                     │
                                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                               origin/master
                                                  master
                                                     │
                                                     │
                                                     │
                                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │
│         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                  master       origin/master
                                     │               │
                                     │               │
                                     │               │
                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │
│         │     │         │     │         │─┐   │         │
└─────────┘     └─────────┘     └─────────┘ │   └─────────┘
                                            │
                                            │   ┌─────────┐
                                            │   │         │
                                            └───│ 89ee2b0 │
                                                │         │
                                                └─────────┘
                                                     ▲
                                                     │
                                                     │
                                                     │
                                             migrate_users_62
```

```text
                                               origin/master
                                                  master
                                                     │
                                                     │
                                                     │
                                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │
│         │     │         │     │         │─┐   │         │
└─────────┘     └─────────┘     └─────────┘ │   └─────────┘
                                            │
                                            │
                                            │   ┌─────────┐
                                            │   │         │
                                            └───│ 89ee2b0 │
                                                │         │
                                                └─────────┘
                                                     ▲
                                                     │
                                                     │
                                                     │
                                             migrate_users_62
```

```text
                                               origin/master
                                                  master     migrate_users_62
                                                     │               │
                                                     │               │
                                                     │               │
                                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 89ee2b0 │
│         │     │         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                                                  master
                                               origin/master migrate_users_62
                                                     │               │
                                                     │               │
                                                     │               │
                                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 89ee2b0 │
│         │     │         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                                               origin/master
                                                                  master
                                                             migrate_users_62
                                                                     │
                                                                     │
                                                                     │
                                                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 89ee2b0 │
│         │     │         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                                               origin/master
                                                                  master
                                                                     │
                                                                     │
                                                                     │
                                                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 89ee2b0 │
│         │     │         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

## How do you use the feature branch workflow?

```shell
git config --global branch.master.rebase true
```

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
