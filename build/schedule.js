const fs = require('fs')
const pug = require('pug');
const path = require('path')

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

function q1() {
  return [
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
        },
      ],
    },
  ]
}

function normalize(path, base) {
  return '../'.repeat(base) + path
}

function dataFor(base) {
  let result = q1()
  result.forEach(function (day, i) {
    day.name = days[i % 5]

    if (day.warmup && day.warmup.path) {
      normalize(day.warmup.path, base)
    }

    day.activities.forEach(function (activity) {
      if (activity.article && activity.article.path) {
        activity.article.url = normalize(activity.article.path, base)
      }
      if (activity.exercise && activity.exercise.path) {
        activity.exercise.url = normalize(activity.exercise.path, base)
      }
    })

    day.firstActivity = day.activities[0]
    day.otherActivities = day.activities.slice(1)
  })

  return result
}

function renderTo(path, template, base) {
  let html = template({data: dataFor(base)});

  const file = fs.readFileSync(path, 'utf8')
  const lines = file.split("\n")
  const startLine = lines.indexOf('<!-- BEGIN SCHEDULE -->')
  const endLine = lines.indexOf('<!-- END SCHEDULE -->')

  lines.splice(startLine + 1, endLine - startLine - 1)
  lines.splice(startLine + 1, 0, html.trim())

  console.log(lines.join("\n"));
  fs.writeFileSync(path, lines.join('\n'))
}

const templatePath = path.format({root: __dirname, base: '/table.pug'})
let template = pug.compileFile(templatePath, {pretty: true});

renderTo('./README.md', template, 0)
renderTo('./Schedule/Q1/readme.md', template, 2)
