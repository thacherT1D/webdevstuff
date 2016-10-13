# ✅ Objectives

- Explain what issue tracking is.
- Explain why issue tracking is useful.
- Explain how issue tracking works.
- Write user stories for tracked issues.
- Use GitHub to track issues.

<hr>

## Explain what issue tracking is.

Issue tracking is frequently referred to as “bug tracking,” but this doesn’t do it justice. The phrase “bug tracking” tends to imply that bugs can only exist in code, but this view is flawed. It’s just as easy to have bugs in requirements, design, or even specifications. Issue tracking is designed to help uncover or prevent these.

![issue tracking flow](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/408/issue-flow.png)

The Resolved stage is where finished work can be reviewed and approved.


## Explain why issue tracking is useful.

Issue tracking is a system which allows teams to break down the needs of project into smaller, more digestible chunks. It can be a single source of truth where multiple stakeholders come together and layout their plans for moving a project forward.

Just like adopting any process, at first it may seem a bit taxing, but in the long run it becomes second nature and can be an extremely useful point of contact and source of truth for organizing the nitty gritty.

Some of the tenants to issue tracking include:

### Capturing
Find a bug? Want to have something implemented? Something need to get done? The Issue Tracker is where you would, well, track these things.
Issues that live in multiple different places from Slack, to email, to conversations are harder keep track of, and ultimately resolve.
An issue tracker provides that central place to capture and handle bugs, questions, tasks, ideas, issues, and more so that they don't slip through the cracks.
When capturing the issue it is good practice to write it out in user story format. A user story is a tool used in Agile software development to capture a description of a software feature from an end-user perspective. The user story describes the type of user, what they want and why. A user story helps to create a simplified description of a requirement.

>As a _type of user_, I want _some goal_ so that _some reason_.

### Recording
What did we decide? When did we decide that? Who decided that?
Documenting the who, what, where, when and whys is important so that stakeholders on the team have a clear understanding of what needs to be done. Issues may sit for a while, or questions may arise down the line about the details of decisions made and why. Having the information documented as to why certain actions were taken is valuable for everyone.

### Accountability
Documenting who's responsible for what will ensure that the right things get done by the right people at the right time.

### Prioritization
Determining what the top issues to focus a team's attention on becomes exponentially more difficult if those issues are not all listed in one place.
Having a well documented collection of issues will allow your team to make critical decisions about the projected investment of resources needed to complete the task, as well as it's need to be completed relative to others on the docket.

### Resolving
A tracker can provide feedback to the team whether issues are being resolved in a timely manner or if they have just been lingering around for a while. Having documentation on how issues were resolved is a nice reference to have and a valuable resource when doing retrospectives of your team’s work.

### Reviewing
Having a system of checks and balances is positive for any work process. The reviewing stage of the issue tracking process allows the primary stakeholders an opportunity to ensure a "completed" issue adequately meets the expectations as laid out in the initial definition of the issue. If it does not this would be the point where the solutions would be cycled back for further resolution of the issue. This may also be the point in which tangential issues that arose during the completion process of the task at hand can be spun off into new issues, and tracked separately.


with a process for handling prioritization helps minimize developer confusion by freeing them from worrying about priority and letting them focus exclusively on what’s next for them


## Explain how issue tracking works.

Issue tracking works much in the same way as a shared todo list, albeit with the addition of peer review.
In place of just marking a task, or issue, as "done" the submitted work would also go through an additional round of review before being considered completed, or "closed".
The purpose of this is to get an extra set of eyes on the submitted work and prevent errors or misunderstanding in the expected implementation of the work from finding its way into production where issues become more difficult and expensive to fix.

As well as the layer of peer review, issues have the ability to be "reopened" should the team find there was some hidden bug that escaped the review process.
The practice of reopening an issue is ideal to creating a new issue as it will chain onto the content of the previous issue, potentially revealing any miscommunication or other missed information that led to the scenario in which the issue needed to be reopened.
From there rinse and repeat as needed, which is hopefully not often.

<hr>

## Use GitHub to track issues.

Github provides an issues tracker for each repository, unsurprisingly called Issues. Their Issues tracker provides a handful of useful features like Labels, Milestones, Assignees, Notifications, Mentions, References.
All of those are useful and you should give the *Github - Mastering Issues* article below a read to find out more about them.

![github issue](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/407/labels.png)

The most useful feature of the group above is probably the References feature. When you create an Issue, github will give it an issue number. This number can then be referenced in several ways. For example if you drop the issue number, say `#42` in the text form of another issue both will then point to one another. A more interesting use of referencing issue numbers is in commit messages. The issue that was referenced will be populated with it's own reference back to the commit on Github. By prefacing your commits with “Fixes”, “Fixed”, “Fix”, “Closes”, “Closed”, or “Close” when the commit is merged into master, it will also automatically close the issue. Keeping in mind the Review stage of issue tracking you will likely submit a pull request that would be reviewed by a Sr Dev who would then choose to accept or reject your pull request. Upon acceptance the issue would then be closed. It can also be helpful when creating feature branches to include the issue number as apart of the branch name for continuity sake.

<hr>

## Use Github Issues to write up some issues.

On a piece of paper or a whiteboard make up a short list of issues that you think should be tracked for your project. Take that list and compare it with the list your partner has created. Head over to your project's Github repo and write up the issues from your lists that feel like they should be tracked.

Your initial writeup for the issue should be in a User Story format:
>As a _type of user_, I want _some goal_ so that _some reason_.


<hr>

### 📚 Resources

- [Sifter - What is issue tracking?](https://sifterapp.com/academy/overview/why/)
- [Mountain Goat Software - User Stories](https://www.mountaingoatsoftware.com/agile/user-stories)
- [GitHub - Mastering Issues](https://guides.github.com/features/issues/)
- [Youtube - GitHub for Project Management](https://www.youtube.com/watch?v=6fByt0o4UYs&t=630)
