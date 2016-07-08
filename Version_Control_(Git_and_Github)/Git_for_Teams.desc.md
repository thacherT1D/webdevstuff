## Objectives

- Explain what the Feature Branch Workflow is.
- Explain why the Feature Branch Workflow is important.
- Use the Feature Branch Workflow in a team-based project.

## What's the Feature Branch Workflow?

In the first quarter this course, you employed a Centralized Workflow to manage the Git commits of your projects. In Git, a **Centralized Workflow** uses a central `origin` repository with a single `master` branch to serve as the hub for all commits. In Git speak, this is simply referred to as the `origin/master` branch.

Most of your projects started off with at least one commit in the `origin/master` branch as your instructors gave you a solid foundation from which to build.

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

From here, you forked and cloned a central repository. Forking is the process of coping an existing GitHub repository to your GitHub account, while cloning is the process of copying a central repository to your local development environment. When you clone, all the commits from the central repository's `origin/master` branch are copied to your local repository's `master` branch.

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

In your local repository, you created and modified files, added the changes to the local repository's staging area, and committed the staging area to the local `master` branch. These new commits, stored in the local `master` branch, were completely isolated from the central `origin/master` branch. This allowed you defer synchronizing with the central repository until you reached a convenient stopping point.

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

When you were ready to publish your changes, you pushed your local `master` branch to the central `origin/master` branch. Pushing is the process of copying all the additional commits from the local repository to the central repository.

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

As previously mentioned, this was more or less your Git workflow for the first quarter of the course. However, throughout the second quarter, you began to adopt a Feature Branch Workflow. The core idea behind the **Feature Branch Workflow** is that all commits related a specific feature, or bug fix, are developed and stored in a dedicated branch instead of the `master` branch.

The Feature Branch Workflow still uses a central repository and the `origin/master` branch still represents the official project history. But, instead of committing directly on your local `master` branch, you create a new branch each time you start work on a new feature or bug fix. Descriptive branch names, like `animate_menu_42`, help to give a clear, highly-focused purpose to each branch. It's common to suffix a branch name with the number of a corresponding issue in an issue tracker.

Each feature branch is created from the local `master` branch when it's synchronized with the central `origin/master` branch.

```text
               origin/master
                  master
              animate_menu_42
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

Git makes no technical distinction between the `master` branch and a feature branch. So you can add and commit changes to a feature branch just as you did in the Centralized Workflow. The only difference is that new commits are stored in the local `animate_menu_42` branch, completely isolated from any other branch.

Feature branches keep both the `master` and `origin/master` branches pristine and unchanged while you iterate on a idea. If a breaking change is accidentally committed while working, it won't immediately contaminate the `master` and `origin/master` branches. Thus you can continue developing and testing the project without polluting the centralized source of truth.

```text
               origin/master
                  master      animate_menu_42
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

Once you're confident that your feature or bug fix doesn't break any existing code, ideally using automated tests, you're ready to publish. The first step is to merge the commits from the local `animate_menu_42` branch into the local `master` branch.

```text
                                  master
               origin/master  animate_menu_42
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

Then, you can publish your code by pushing your local `master` branch to the central `origin/master` branch, adding the feature's commits into the official project history.

```text
                               origin/master
                                  master
                              animate_menu_42
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

Now that all three branches contain the same commits, you can safely delete the `animate_menu_42` feature branch.

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

And thus you've successfully completing one cycle of the Feature Branch Workflow.

### Exercise

Turn to your partner and explain what the Feature Branch Workflow is in your own words. It may be helpful to draw a diagram together to visualize how branches change over time.

## Why is the Feature Branch Workflow is important?

As you've seen, the Feature Branch Workflow makes it easy for you to work on a particular feature or bug fix without disturbing the main codebase. It protects the `master` and `origin/master` branches by minimizing the amount of broken code that's committed to them. Everyone commits broken code to the main codebase from time to time, even when using a Feature Branch Workflow. And that's okay because nobody is perfect. However, minimizing the amount of broken code in the main codebase is a huge advantage when working collaboratively. Here are a few reasons why.

1. A feature branch that's created from known stable point in the codebase provides a solid foundation from which to build. If the `master` and `origin/master` branches contain broken code, how can you build a feature or fix a bug with any confidence?

1. A feature branch that's tied to a single feature or bug fix allows you to focus exclusively on it. It's easy to get lost or overwhelmed when you're trying to solve more than one problem at time.

1. A feature branch that's isolated from the main codebase allows you to start over if your work goes down the wrong path. It's much easier, and safer, to delete a feature branch rather than rollback commits in the `master` and `origin/master` branches.

1. A feature branch that's based on the `master` and `origin/master` branches gives you the confidence to publish well-tested code. If the code in a feature branch works correctly and that branch is based on a branch that's continuously deployed other environments, there's a good chance the code will work correctly on those environments too.

### Exercise

Take a moment to write down why the Feature Branch Workflow is important. After about a minute, your instructor will cold call on the class and ask what was written down.

## How do you use the Feature Branch Workflow in a team-based project?

It's time to use the Feature Branch Workflow in a team-based project. To get started, organize your team by completing the following steps.

1. Sit next to the people in your Q2 Project team.

1. Elect one project owner to fork the [Merge Conflict Chart](https://github.com/gSchool/wd-merge-conflict-chart) repository on GitHub. The only responsibility the project owner has over the other members of the team is to setup the project on GitHub.

1. Have the project owner enable GitHub Issues in the "Settings" section of the forked repository. By default, GitHub disables issues for forked repositories.

1. Have the project owner add the other team members as Collaborators which is also found in the "Settings" section.

Now, as a team, inspect the following areas of the repository.

- The commits on the `master` branch.
- The open issues.
- The contributors graph.

Then, have each team member clone the repository to their own development environment. Once cloned, change into the project directory.

```shell
cd wd-merge-conflict-chart
```

And open the `index.html` file in your browser.

```shell
open index.html
```

And it should look something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/273/Screen_Shot_2016-07-08_at_11.05.48_AM.png)

1. Have each team member create a new issue to transfer more students into the "understand merge conflicts" segment of the chart.

1. Have each team member clone the repository to their development environment.

Create a new feature branch with the issue number as the suffix.

```shell
git checkout -b transfer_1
```

In the `index.html` file, update the data values as you see fit. Make sure each team member chooses different values.

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

Imagine the next issue for you to work on is creating a migration for a `users` table. The first step is to ensure the `master` and `origin/master` are synchronized.

```text
                               origin/master
                               HEAD ─> master
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

Then, you'll create

```shell
git checkout
```

Assuming the currrent branch of your your local repository has , the first thing you'll want to do is create a feature branch.

```text
                               origin/master
                                  master
                             migrate_users_43
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
                                  master     migrate_users_43
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
                               fix_menu_44
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
                                  master       fix_menu_44
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
                               origin/master   fix_menu_44
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
                                               fix_menu_44
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
                                             migrate_users_43
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
                                             migrate_users_43
```

```text
                                               origin/master
                                                  master     migrate_users_43
                                                     │               │
                                                     │               │
                                                     │               │
                                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 5e049cf │
│         │     │         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                                                  master
                                               origin/master migrate_users_43
                                                     │               │
                                                     │               │
                                                     │               │
                                                     ▼               ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 5e049cf │
│         │     │         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```

```text
                                                               origin/master
                                                                  master
                                                             migrate_users_43
                                                                     │
                                                                     │
                                                                     │
                                                                     ▼
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│         │     │         │     │         │     │         │     │         │
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 5e049cf │
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
│ be282f7 │─────│ 4f7e591 │─────│ dad1e7f │─────│ fda3560 │─────│ 5e049cf │
│         │     │         │     │         │     │         │     │         │
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
```


```shell
git config --global branch.master.rebase true
```

## Resources

- [Atlassian Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
