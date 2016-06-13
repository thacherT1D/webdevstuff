## THE MASTER COPY LIVES HERE: https://github.com/gSchool/node-curriculum/blob/master/unit-1/02-npm-modules.md

- [Slides](https://docs.google.com/presentation/d/1HEoACJT2P_o_saykrj1MOG4qRpwiBm8c3CiUWsQtKOU/edit?usp=sharing)

	- [node.js Modules LE - Only watch/read Part 1](https://students.galvanize.com/curriculums/6/learning_experiences/51)

	- [node.js Modules Documentation](https://nodejs.org/api/modules.html)

	- [Eloquent JavaScript Chapter 20: Node - Modules](http://eloquentjavascript.net/20_node.html#h_BOlGLA/wK7)

	- [Art of Node - Modular Development Workflow](https://github.com/maxogden/art-of-node#modular-development-workflow)

	- [Learning Node - Chapter 4 - The Node Module System](https://www.safaribooksonline.com/library/view/learning-node/9781449326128/ch04.html)

	- [Node.js core modules source code](https://github.com/nodejs/node/tree/master/lib)

	- [Export This: Interface Design Patterns for Node.js Modules](http://bites.goodeggs.com/posts/export-this/)


What is the problem that the node Module system solves?

 - Avoiding Large files, easily share common functionality

What built-in function is used to import a module?

 - require('filename')


What built-in object is used to export a module?

 - module.exports

What values can a module export?

 - functions, objects, arrays, strings/numbers/booleans


What are 3 ways to export an object?

```js
	module.exports = {
		add: function(a, b) {
			return a + b;
		}
	}

	module.exports.add = function(a, b) {
		return a + b;
	}

	exports.add = function(a, b) {
		return a + b;
	}
```

What are 3 kinds of modules?

 - Core modules (fs, http etc...)

 - File modules (your own files)

 - node_modules

How do you require npm and core modules?

 - require('packagename')

How do you require file modules?

 - absolute/relative paths

 - / ./ ../

 - require('./filename')

Name and describe any 3 core modules:

 - https://github.com/nodejs/node/tree/master/lib

PUSH

How does require determine what module to load?

 - https://nodejs.org/api/modules.html#modules_all_together

What specification does the node module system impliment?

 - CommonJS

How do you create a module that is an entire folder?

 - Entry point in package.json (index.js)

 - https://nodejs.org/api/modules.html#modules_folders_as_modules

What command is used to generate a package.json file for your module?

 - npm init

How do you save module dependencies to the package.json file?

 - npm install --save modulename
