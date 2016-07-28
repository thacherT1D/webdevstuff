const fs = require('fs')
const pug = require('pug');
const path = require('path')

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

function data() {
  return {
    q1: [
      {
        activities: [
          {article: {text: "Welcome to WDI", url: "https://docs.google.com/presentation/d/154ou9yQJNcVcVehD6vqaKjGbCKhFb2xK85toqniWaa8/edit#slide=id.g108a6e17ae_0_112"}},
          {article: {text: "Learning to Learn", path: "Misc/Learning to Learn.md"}},
          {article: {text: "Setup Development Environment", path: "Development Environment/README.md"}},
        ]
      },
      {
        warmup: { text: "Typing", path: "Misc/Typing.md" },
        activities: [
          {
            article: {text: "Setup Development Environment", path: "Development Environment/README.md"},
          },
          {
            article: {text: "Intro to the Command Line", path: "Misc/Command Line.md"},
            exercise: {text: "Command Line Murder Mystery", url: "https://github.com/ryansobol/clmystery"},
            stretch: {text: "Intermediate Command Line", url: "Misc/Intermediate Command Line.md"},
          },
        ],
      },
      {
        warmup: { text: "JavaScripting", url: "https://github.com/sethvincent/javascripting" },
        activities: [
          {
            article: {text: "Intro to Git and Github", path: "Misc/Intro to Git.md"},
          },
          {
            article: {text: "JavaScript Vocabulary", path: "JavaScript/Vocabulary.md"},
          },
        ],
      },
      {
        warmup: { text: "JavaScripting (con't)", url: "https://github.com/sethvincent/javascripting" },
        activities: [
          {
            article: {text: "JavaScript: Intro, Types, Values, Variables, Control Flow", path: "JavaScript/Intro.md"},
            exercise: {text: "JavaScript Statements", path: "https://github.com/gSchool/javascript-statements"},
          },
          {
            article: {text: "JavaScript Functions", path: "JavaScript/Functions.md"},
          },
        ],
      },
      {
        warmup: { text: "JavaScripting (con't)", url: "https://github.com/sethvincent/javascripting" },
        activities: [
          {
            article: {text: "JavaScript Functions (con't)", path: "JavaScript/Functions.md"},
          },
          {
            article: {text: "JavaScript: Arrays, Objects, Iteration", path: "JavaScript/Arrays-Objects-Iteration.md"},
            exercise: {text: "JavaScript Statements (con't)", url: "https://github.com/gSchool/javascript-statements"},
            stretch: {text: "Crushing Candy Code: Data Structures", url: "https://github.com/gSchool/ccf-data-structures"},
          },
        ],
      },
      {
        warmup: { text: "Memory Diagrams", path: "JavaScript Memory Diagrams" },
      },
    ]
  }
}

function normalize(path, base) {
  return '../'.repeat(base) + path
}

// takes the number of `../` to add to the path
// returns an array of arrays, where each array represents 1 week
function dataFor(base) {
  let result = []
  let week

  data().q1.forEach(function (day, i) {
    if (i % 5 === 0) { // start a new week every monday, every 5th day
      week = []
      result.push(week)
    }
    week.push(day)

    day.name = days[i % 5]

    if (day.warmup && day.warmup.path) {
      day.warmup.url = normalize(day.warmup.path, base)
    }
    day.activities = day.activities || []

    day.activities.forEach(function (activity) {
      if (activity.article && activity.article.path) {
        activity.article.url = normalize(activity.article.path, base)
      }
      if (activity.exercise && activity.exercise.path) {
        activity.exercise.url = normalize(activity.exercise.path, base)
      }
      if (activity.stretch && activity.stretch.path) {
        activity.stretch.url = normalize(activity.stretch.path, base)
      }
    })

    day.firstActivity = day.activities[0]
    day.otherActivities = day.activities.slice(1)
  })

  return result
}

function renderTo(path, template, base) {
  let weeks = dataFor(base)

  let tables = weeks.map(week => template({data: week}))

  const file = fs.readFileSync(path, 'utf8')
  const lines = file.split("\n")
  const startLine = lines.indexOf('<!-- BEGIN SCHEDULE -->')
  const endLine = lines.indexOf('<!-- END SCHEDULE -->')

  let segments = []
  tables.forEach(function (table, i) {
    segments.push(`Week ${i + 1}`)
    segments.push(table)
    segments.push('')
    segments.push('')
  })
  let html = segments.join('\n').trim()

  lines.splice(startLine + 1, endLine - startLine - 1)
  lines.splice(startLine + 1, 0, html)

  console.log(lines.join("\n"));
  fs.writeFileSync(path, lines.join('\n'))
}

function renderToWeek(path, template, base, weekNumber) {
  let weeks = dataFor(base)
  let html = template({data: weeks[weekNumber]})

  const file = fs.readFileSync(path, 'utf8')
  const lines = file.split("\n")
  const startLine = lines.indexOf('<!-- BEGIN SCHEDULE -->')
  const endLine = lines.indexOf('<!-- END SCHEDULE -->')

  lines.splice(startLine + 1, endLine - startLine - 1)
  lines.splice(startLine + 1, 0, html)

  console.log(lines.join("\n"));
  fs.writeFileSync(path, lines.join('\n'))
}

const templatePath = path.format({root: __dirname, base: '/table.pug'})
let template = pug.compileFile(templatePath, {pretty: true});

renderTo('./README.md', template, 0)
renderTo('./Schedule/Q1/README.md', template, 2)

renderToWeek('./Schedule/Q1/week-1.md', template, 2, 0)
renderToWeek('./Schedule/Q1/week-2.md', template, 2, 1)
