# Galvanize Full Stack Immersive Curriculum

## How this works

We employ a backwards-planning process when writing curriculum.  That means:

- Define industry-aligned **Standards**
- Refine those Standards by adding **Success Criteria**
- Describe how we'll collect data on student performance by writing descriptions of **Assessments**
- Create supporting materials such as slide decks, written content, videos and make that content available in chronological sequence using **Learning Experiences**

Then we:

- Teach
- Assess
- Track performance using a Mastery Tracking system

## A tale of two systems

To operate smoothly, scale nicely, and reach the right balance of autonomy for instructors and consistency for students (and the Galvanize Brand), we have the following constraints:

1. Our curriculum needs to be described in a relational database to enable mastery tracking and reporting
1. Our curriculum needs to be in some system that allows instructors to make changes independently so that they can respond to on-the-ground realities of classes
1. Our students want content to be in an intuitive, chronological format (a content delivery system)
1. Our curriculum will change over time, and we need an organized system for incorporating changes over time
1. Sometimes good ideas will happen mid-stream, and we'll want to merge those changes in

## Want to make changes just for my cohort - where should I make changes?

Right now (Feb 8th, 2016) the best place to make changes is in coursework.galvanize.com, in your fork of the curriculum.

## How do I propose changes to master?

Propose changes to our Gold Standard curriculum (master) in one of two ways:

1. Direct Edit
  1. Cut a feature branch from master
  1. Make edits in text files
  1. Create a pull requests
  1. @mention the shit out of the leads
1. Let `rake` do it
  1. Make changes in coursework
  1. Pull a copy of the production database to your local machine
  1. Run `rake curriculums:dump` and copy the YAML files / LEs into this repo
  1. Cut a branch, clean up the commits and suggest changes

## How will changes to master get rolled back into the LMS?

"Magic".  Where magic is defined as you copying and pasting changes one-by-one until we build a better diffing / import tool.

That's the biggest weakness right now.

## How can I help make this better?

It's hella messy right now.  But like any problem, we'll solve it incrementally, iteratively and with a _ton_ of face-to-face communication and problem solving.

The best way to contribute right now is to try all kinds of experiments, and let lots of people know what works and what doesn't in constructive and helpful ways.
