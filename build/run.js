const data = require('./data');
const renderTo = require('./schedule').renderTo;
const renderToWeek = require('./schedule').renderToWeek;

[
  {file: './README.md', indentationLevel: 0},
  {file: './Schedule/Q1/README.md', indentationLevel: 2},
  {file: './Schedule/Q1/week-1.md', indentationLevel: 2, weekIndex: 0},
  {file: './Schedule/Q1/week-2.md', indentationLevel: 2, weekIndex: 1},
].forEach(function (config) {
  if (config.weekIndex) {
    renderToWeek(data().q1, config.file, config.indentationLevel, config.weekIndex)
  } else {
    renderTo(data().q1, config.file, config.indentationLevel)
  }
})
