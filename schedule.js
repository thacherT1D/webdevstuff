module.exports = function() {

  let days = require('./schedule.q1')
    .concat(require('./schedule.q2'))
    .concat(require('./schedule.q3'))
    .concat(require('./schedule.q4'))

  let config = [
    {
      baseDir: './Q1',
      title: 'Quarter 1',
      days: 25,
    },
    {
      baseDir: './Q2',
      title: 'Quarter 2',
      days: 25,
    },
    {
      baseDir: './Q3',
      title: 'Quarter 3',
      days: 25,
    },
    {
      baseDir: './Q4',
      title: 'Quarter 4',
      days: 25,
    },
  ]

  return {days, config}

}
