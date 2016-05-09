## How to use the Node Package Manager (NPM)

### Objectives
- Install modules using the Node Package Manager

### Why is this important?
Being able to access a library of code that has already been used will allow you to implement your idea much faster. Also, having the dependencies managed by NPM makes it much easier to share your code.

### Content

[NPM](https://www.npmjs.com/) is used to install, share, and distribute code, and it manages dependencies in your projects. Popular libraries can be found there; these include knex(database) and express(web application framework) which we will be learning in the future.

NPM is installed when node.js was installed. To check which version you have installed, run the following command.

`npm -v`

To output the help page, use the following command `npm -h`


### Initialing NPM

When starting a new project, in which you will be using NPM to manage your modules, you'll need to execute `npm init`. This command will walk you through initializing a project. The interactive prompt will ask a few questions about what you are working on. The final product of this process is a file named `packages.json`, which looks as follows

```
{
  "name": "npm-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Now, when you install a package, it will be listed in this file.

### Installing packages

To install a module that you will be using in your application, you'll have to use `npm install --save module_name`. The `--save` argument adds and entry to the `packages.json` file.

If we run the command `npm install --save pad`, you'll see NPM downloading the module. [Pad](https://www.npmjs.com/package/pad) is a very simple tool that pads strings in the left and right directions.

After installing `pad`, the package.json file looks like this:

```
{
  "name": "npm-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pad": "^1.0.0"
  }
}
```

Notice the addition the `dependencies`. All the packages that are installed using the `--save` flag, will be added there. Also, if you look in at the folder, you'll notice a new folder named `node_modules`. This is where the code for `pad` was added.

### Installing Development Dependencies

Sometimes there are packages that are very useful while developing an application, but are not necessary to have when an application is deployed. NPM has a flag that allows you to make that distinction. The flag is `--save-dev`.

Lets install a testing tool that is very useful for development, but should not be deployed. [Mocha](https://mochajs.org/) is a testing framework.

To install Mocha as a development dependency, run the following command `npm install --save-dev mocha`. After the installation, the package.json looks as follows:

```
{
  "name": "npm-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "pad": "^1.0.0"
  },
  "devDependencies": {
    "mocha": "^2.4.5"
  }
}
```

Notice the new section, `devDependencies`. All packages installed with the `--save-dev` flag will be added there.

### Installing Global Packages

NPM has the ability to install modules globally. There are some modules that expose command line options. Add the `--global` flag when installing a module. A good example of a module that is installed globally is [nodemon](https://www.npmjs.com/package/nodemon). This module can be installed using the command:

```
npm install --global nodemon
```

Nodemon will look at the file you pass and it will run the `node` command every time that file changes.

### The downside of using NPM

The problem with using npm is that you are playing in someone else's merry go round. If one of the modules changes in an unexpected way, it may give your code unintended behavior.

The following link shares a story of such a case.

http://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/
