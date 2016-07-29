console.log("Checking Links...");

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const cheerio = require('cheerio');

// http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
function walk (dir, ext, ignoredDirs, done) {
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory() && !ignoredDirs.includes(path.basename(file))) {
          walk(file, ext, ignoredDirs, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (path.extname(file) === ext) {
            results.push(file);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

walk('.', '.md', ['node_modules', 'tmp'], function (err, paths) {
  paths.forEach(function (filePath) {
    let html = marked(fs.readFileSync(filePath, 'utf8'));
    let $ = cheerio.load(html)
    let hrefs = $('a').map( (_,el) => el.attribs.href).get();
    hrefs = hrefs.filter(href => !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') )

    hrefs.forEach(function (href) {
      let formattedPath = path.join(path.dirname(filePath), href)

      fs.stat(formattedPath, function (err, stats) {
        if (err) {
          console.log(`${filePath} contains a broken link to ${formattedPath}`);
        }
      })
    })
  })
})
