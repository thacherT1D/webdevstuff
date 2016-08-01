console.log("Checking Links...");

const fs = require('fs');
const assert = require('assert');
const request = require('request');
const path = require('path');
const marked = require('marked');
const cheerio = require('cheerio');
const url = require('url');

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
    let localHrefs = hrefs.filter(href => !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#') )
    let remoteHrefs = hrefs.filter(href => href.startsWith('http') || href.startsWith('//') )

    if (process.argv[process.argv.length - 1] === 'remote') {
      assert(process.env.GITHUB_OAUTH_TOKEN, 'You must set GITHUB_OAUTH_TOKEN in your .env file')

      crawl(remoteHrefs)

    } else {
      localHrefs.forEach(function (href) {
        let formattedPath = path.join(path.dirname(filePath), href)

        fs.stat(formattedPath, function (err, stats) {
          if (err) {
            console.log(`${filePath} contains a broken link to ${formattedPath}`);
          }
        })
      })
    }

  })
})

function crawl(hrefs) {
  let href = hrefs[0]
  if (!href) return;

  console.log(`crawling ${href}`);

  let parsedUrl = url.parse(href);
  let host = parsedUrl.host;
  let options;

  if (host === 'github.com') {
    let pathname = parsedUrl.pathname;
    let [_, org, repo, blob, branch, ...githubFilePath] = pathname.split("/")
    let githubURL = decodeURI(`https://api.github.com/repos/${org}/${repo}/contents/${githubFilePath.join("/")}`);

    if (['zipfian', 'gschool'].includes(org.toLowerCase())) {
      options = {
        url: githubURL,
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          'User-Agent': 'Galvanize-Curriculum-Link-Checker'
        }
      };
    } else {
      options = {
        url: href,
      };
    }
  } else {
    options = {
      url: href,
    }
  }

  if (host === 'github.com') {
    request(options, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        console.log(`${filePath} contains a broken link to ${href}`);
        if (error) {
          console.log('error', error);
        }
        if (response) {
          console.log('checked url', options.url);
          console.log('status', `${response.statusCode} ${response.statusMessage}`);
          console.log('body', body);
          console.log('\n\n\n\n');
        }
      }
      setTimeout(function () {
        crawl(hrefs.slice(1))
      }, 500)
    })
  }

}
