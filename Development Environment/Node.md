# Install Node

[Node](https://nodejs.org/) is an open-source, cross-platform runtime system for developing applications in JavaScript. In other words, it runs JavaScript outside the browser.

There are 2 common ways to install node:

- Via Homebrew
- Via NVM - the Node Version Manager

Consult your instructor to see which option they'd prefer.

## Prereqs

This article assumes you have a working installation of [Homebrew](Homebrew.md)

## Option A: Install Node Directly with Homebrew

To get started, run the following command.

```
brew install node
```

Once it finishes, run the following command.

```
node -v
```

And you'll see something like this.

![](https://i.imgur.com/s6yEpP9.png)

[Continue to Discover the Node Shell](#discover-the-node-shell)

## Option B: Install NVM (Node Version Manager) + Node

Run this command in Terminal:

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

### Install Node from NVM

The first thing that you need to do is get latest version of Node.js. You can do this with the command

```bash
nvm install node
```

You can set up nvm to use the latest version of node with the following commands. You can copy-paste them into the terminal.

If you are using zsh:

```bash
echo >> ~/.zshrc
echo '# setting up nvm to use the latest version of node.js' >> ~/.zshrc
echo 'nvm use node' >> ~/.zshrc
```

If you are using Fish:

```bash
echo >> ~/.config/fish/config.fish
echo '# setting up nvm to use the latest version of node.js' >> ~/.config/fish/config.fish
echo 'nvm use node' >> ~/.config/fish/config.fish
```

If you are using Bash:

```bash
echo >> ~/.bashrc
echo '# setting up nvm to use the latest version of node.js' >> ~/.bashrc
echo 'nvm use node' >> ~/.bashrc
```

[Continue to Discover the Node Shell](#discover-the-node-shell)

---

### Discover the Node Shell

The interactive **Node shell** provides a read-evaluate-print loop (REPL) for JavaScript programs.

To get started, launch the Node shell by running the following command.

```
node
```

And you'll see something like this.

![](https://i.imgur.com/tSVXigd.png)

After the prompt `>`, you can type a line of JavaScript code and then press the `Enter` key to run it. For example, type and run the following JavaScript program.

```
1 + 2
```

And you'll see something like this.

![](https://i.imgur.com/ZO8fIEw.png)

The Node shell is a great tool for learning and experimenting with JavaScript.

Play around with JavaScript on your own.

When you're done you can exit the Node Shell by:

- typing `.exit` and pressing the `Enter` key
- typing `COMMAND + d`

### Discover the Node Interpreter

Given a JavaScript program stored in a file, the **Node interpreter** reads it, evaluates it, and then quits.

Unlike the Node shell, the Node interpreter is _not_ interactive. In other words, the Node interpreter won't automatically print the result of each line or loop waiting for you to give it more input. It just reads and evaluates a JavaScript program file.

Despite these deficiencies, you'll use the Node interpreter more frequently. Let's try it out.

First, open a new JavaScript program file in Atom.

```
atom ~/Desktop/test.js
```

**TIP:** JavaScript program files end with a `.js` extension.

Then type the following program into the file.

```
1 + 2;
```

Save the file and run the program using the Node interpreter.

```
node ~/Desktop/test.js
```

Weird, nothing happened. Remember, the Node interpreter won't print anything unless told. Jerk! :triumph:

Change the program so it reads like this.

```
console.log(1 + 2);
```

Save the file and re-run the program.

```
node ~/Desktop/test.js
```

And you'll something like this.

![](https://i.imgur.com/13wlgTe.png)

Play around with JavaScript on your own. When you're done, remove the `test.js` file by running the following command.

```
rm ~/Desktop/test.js
```

## Node Packages

Node comes with a tool called [NPM](http://npmjs.com/) or `Node Package Manager`. It is a [package manager](https://en.wikipedia.org/wiki/Package_manager) for Javascript applications, tools and modules (just like Homebrew is a package manager for your computer). [NPM's website](http://npmjs.com/) can be used to search for packages.

**Step One:** Install a basic HTTP Server to host and test web pages:

```bash
npm install -g http-server
```

**Step Two:** Start the server up:

```bash
http-server
```

**Step Three:** Open up your browser and navigate to `localhost:8080`.

**Step Four:** In the terminal, press `ctrl` + `c` to terminate the server.

**Resources:**
- [npmjs.com](http://npmjs.com/)
- [http-server](https://www.npmjs.com/package/http-server)

---

## Next Steps

Setup [Environment Variables](Environment Variables.md) for productivity
