## Background

**Galvanize War Room** is a server status dashboard that displays a list of servers' status. You are building a web app for them. It should allow you to:

* See each server's real-time status
* See the average status for each server
* See details of each server
* Configure the threshold levels for warnings

There are some additional features, such as graphs, that are nice-to-haves, but a lower priority than the core features. The folks at Galvanize War Room have provided you with an API client for their existing registry that you will use for development.

## Import stories into Pivotal Tracker

Import this [CSV](https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_warroom/stories.csv) into a new project in Pivotal Tracker to get the requirements for this story. They are prioritized. You may find it useful to size the stories before you begin.

```
Id,Title,Labels,Iteration,Iteration Start,Iteration End,Type,Estimate,Current State,Created at,Accepted at,Deadline,Requested By,Description,URL,Owned By,Task,Task Status,Task,Task Status,Task,Task Status,Task,Task Status,Task,Task Status
113580273,Go over all stories in Pivotal,"",,,,chore,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113580273,,Read the stories (including sub-tasks),not completed,Assign points to the stories,not completed
113577805,User should know what page they are on.,"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113577805,,"Put a title on the page: ""Galvanize War Room""",not completed,Deploy,not completed
113579983,Read war-room-client documentation,"",,,,chore,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113579983,
113578125,User should be able to see all servers statuses (overview),"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113578125,,Display the server name for each server,not completed,Display the realtime server response time (ms) for each server,not completed,Deploy,not completed
113578139,User should be able to see the details of a server (detail),"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113578139,,"User should be able to see additional information about a server: OS, Memory, etc.",not completed,Deploy,not completed
113578399,User should be able to navigate to server details,"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113578399,,"When the user clicks on a server status, navigate to the detail page",not completed,"When the user hits back on the detail page, navigate back to the overview page",not completed,Deploy,not completed
113578609,User should be able to at-a-glance see the health of the response time of each server,"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113578609,,<= 50ms is green (Good),not completed,>50 & <= 500 is yellow (Warning),not completed,>500 is red (Critical),not completed,Make this show on both overview and detail page,not completed,Deploy,not completed
113579805,User should associate the aesthetics of the website with quality,"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113579805,,Style the title and navigation,not completed,Style the server overview,not completed,Style the details page,not completed,Style the settings page,not completed,Deploy,not completed
113579289,User should be able to see the average response time for each server,"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113579289,,Store the data retrieved from the war-room-client into a database,not completed,calculate the average response time for each server,not completed,display the realtime average response time on each server,not completed,Deploy,not completed
113579083,User should be able to set the response time health thresholds. (settings),"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113579083,,Create a settings page,not completed,Add a navigation to the top of the page so user can navigate between overview and settings,not completed,Allow the user to modify the thresholds,not completed,Deploy,not completed
113579539,User should be able to persist settings between browser sessions.,"",,,,feature,,unscheduled,"Feb 11, 2016",,,Danny Fritz,,https://www.pivotaltracker.com/story/show/113579539,,Settings should survive a refresh,not completed,Deploy,not completed
```

## Client Library

Your app should make use of the warRoomClient library found [here](https://github.com/gSchool/galvanize-warroom/tree/war-room-client).

## Notes

* You can use a styling library if you'd like
* You can use a raw database driver, a query builder, or an ORM for your database connection.
* Use feature-branch workflows. You should end up with one commit for each feature.
* Deploy your work

## Wireframes

You can use these wireframes as a reference.

![Overview](https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_warroom/overview.png)
![Server Detail](https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_warroom/details.png)
![Settings](https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_warroom/settings.png)

## How to Submit Your Assessment

Fork/clone [this repo](https://github.com/gSchool/galvanize-warroom).
Add a README to your project that has:

* A link to your deployed site
* Link to your tracker project
* Links to any repos you used with updated code

Submit a pull request to the orginal repo with this README.