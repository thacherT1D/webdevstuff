# Objectives

By the end of this article you will have:

- Installed and configured all required software.
- Established an organized workspace for notes and projects.

# Computer Setup

As developers, our computers are both a tool and a workspace. Ensuring we have the right tools and a well organized workspace will set us up for success. We're going to walk through creating a directory to keep all of our code, notes and projects. Further, we are going to install and configure all the software we need.

## Homebrew

The first tool we are going to install is [Homebrew](http://brew.sh/), a program that allows us to install and update programs using the command line. This kind of tool is known as a [package manager](https://en.wikipedia.org/wiki/Package_manager).

**Step One:** Open up a terminal by pressing `cmd` + `space` and typing `terminal` then pressing `return`.

**Step Two:** Copy and paste the following command into your terminal:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

This will download and install Homebrew to your computer.

**Step Three:** Brew keeps a list of programs and where to download them from, we should always update that list before installing anything:

```bash
brew update
```

**Step Four:** We can now install programs by typing `brew install <name of program>`, for example if we wanted to install [wget](https://www.gnu.org/software/wget/) (a tool for downloading files) we would type:

```bash
brew install wget
```

Finally, if we want to update a program we installed using Homebrew, there is the `upgrade` command:

```bash
brew upgrade wget
```

Alternatively, we can upgrade all the programs installed:

```bash
brew upgrade
```

**Resources:**
- [Homebrew](http://brew.sh/)

## Cask

Installing programs on macs can be obnoxious. Thankfully, there is a tool that extends Homebrew that allows us to install programs without dragging and dropping. Instead, we can just use the command line to install about anything. This tool is known as [Cask](https://caskroom.github.io/). Their website has a searchable list of all programs that you can install using cask.

**Step One:** Open up a terminal and type the following to install Cask:

```bash
brew tap caskroom/cask
```

Cask works just like Homebrew, to install we would type `brew cask install <name of program>`.

**Resources:**
- [Cask](https://caskroom.github.io/)

## iTerm2

[iTerm2](https://www.iterm2.com/) is a highly configurable terminal program that has many improvements on the terminal that comes with your mac.

**Step One:** Use Cask to install iterm2:

```bash
brew cask install iTerm2
```

**Step Two:** Open iTerm by typing `cmd` + `space` and typing `iterm` and pressing `return`.

**Resources:**
- [iTerm2](https://www.iterm2.com/)

## Command Line Tools

X-Code is an IDE for OSX, it is needed to install Command Line Tools. These tools can be used to compile code. Some of the software we use will need Command Line Tools.

**Step One:**  Open up iTerm2 and run the following command to install the Command Line Tools:

```bash
xcode-select --install
```

**Step Two:** Follow the prompts, and accept the terms of service.

## Atom

[Atom](https://atom.io/) is an extensible and configurable text editor built using HTML, CSS and Javascript. By default, it doesn't have too many features. However, there are plenty of packages that provide additional features. If there isn't a package for what you need, it is very easy to make one.

For the next 6 months, we will be using Atom as our `IDE`, or `integrated development environment` - just a fancy way of saying we'll be using it to write all of our code.

**Step One:** Use Cask to install Atom:

```bash
brew cask install atom
```

**Step Two:** Open Atom using Spotlight:

`cmd` + `space` then type `Atom` and press `return`.

**Resources:**
- [Atom](https://atom.io/)

## Atom Packages

There are two ways to install a package, using Atom or using the terminal.

**To install** a package via Atom:

1. Open up the settings panel with the shortcut `cmd` + `,`.
2. On the left navbar click `Install`.
3. Search for the package you would like and click install.

**To install** a package via terminal, use the `Atom Package Manager` command:

```bash
apm install <package-name>
```

You can quickly search for packages [here](https://atom.io/packages).

**Step One:** Install the following plugins:

- [atom-beautify](https://atom.io/packages/atom-beautify) - this package allows us to rapidly format our code using the shortcut `cmd` + `option` + `b`.
- [linter](https://atom.io/packages/linter) - a linter is a tool that checks for potential errors. This package is required for all the other `linter-` packages we will install.
- [linter-jshint](https://atom.io/packages/linter-jshint) - **NOT**`linter-jslint`. Lints all `.js` files.
- [linter-htmlhint](https://atom.io/packages/linter-htmlhint) - Lints all `.html` files.
- [linter-csslint](https://atom.io/packages/linter-csslint) - Lints all `.css` files and css in `.html` files.
- [linter-jsonlint](https://atom.io/packages/linter-jsonlint) - Lints all `.json` files.

**Step Two:** Some of our linters need configuration as well.

`linter-jshint` and `linter-htmlhint` rely on having configuration files to define rules for what the linter considers good or bad. Let's save some configs in our home directory:

```bash
cd
curl https://gist.github.com/JordanMajd/9452f438cb48def55a647f7e48e1bdf9 > .jshintrc
curl https://gist.github.com/JordanMajd/122409a4e130f7e45c34a59cfc668dd7 > .jshintrc
```

**Step Three:** In order for the linter to read the config files, Atom must be restarted : `ctrl` + `option` + `cmd` + `l`.

**Resources:**
- [Atom Packages](https://atom.io/packages)

# Git

Git is a [version control](https://en.wikipedia.org/wiki/Version_control) program and an essential tool for any software developer. It keeps a timeline of all the changes made to a project, allows developers to switch between different versions of a project and allows multiple developers collaborate on the same code.

**Step One:**

```bash
brew install git
```

**Step Two:** To configure run the following commands, replace 'YOUR FULL NAME' & 'YOUR EMAIL ADDRESS' with the information used on your Github account:

```
git config --global user.name 'YOUR FULL NAME'
git config --global user.email 'YOUR EMAIL ADDRESS'
```

**Resources:**
- [git](https://git-scm.com/)

## SSH Keys

SSH Keys are a pair of public and private keys. These keys can be used to cryptographically sign and encrypt data. We can use it as a way to identify and authorize ourself with other people and computers. We will be using SSH to authorize ourselves with Github.

**Step One:** Follow [these instructions](https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent/) to:
- Generate a new SSH Keys
- Add it to the `ssh-agent`
- Add the keys to your github account
- Test the SSH connection.

Now when we clone repositories we can use SSH instead of HTTPS by using `git@` instead of `https://`

Example (Do not run):

```bash
git clone git@github.com:USERNAME/OTHERREPOSITORY.git
```

instead of

```bash
git clone https://github.com:USERNAME/OTHERREPOSITORY.git
```

## Browsers

We will be writing a lot of code that will run in web browsers, so it is important to have several browsers to test, debug and run our code in.

**Step One:** Use Cask to install Firefox and Chrome:

```bash
brew cask install firefox
brew cask install chrome
```

- [Firefox](https://www.mozilla.org/en-US/firefox/products/)
- [Chrome](https://www.google.com/chrome/)

## Postman

[Postman](https://www.getpostman.com/) is a graphical tool for sending data over a network. This is really useful for testing HTTP, server and API code.

**Step One:** Use Cask to install:

```bash
brew cask install postman
```

- [Postman](https://www.getpostman.com/)

## Node

[Node](https://nodejs.org/en/) is a program that allows us to run applications written in JavaScript outside of the browser. This means we can run Javascript on any computer we can install Node.

**Step One:** Use Homebrew to install:

```bash
brew install node
```

**Step Two:** Test it installed properly:

```bash
node -v
```

**Resources:**
- [Nodejs.org](https://nodejs.org/en/)

## Node Packages

Node comes with a tool called [NPM](http://npmjs.com/) or `Node Package Manager`. It is a [package manager](https://en.wikipedia.org/wiki/Package_manager) for Javascript applications, tools and modules. [NPM's website](http://npmjs.com/) can be used to search for packages.

**Step One:** Install a basic HTTP Server to host and test web pages:

```bash
npm install -g http-server
```

**Step Two:** Start the server up:

```bash
http-server
```

**Step Three:** Open up your browser and navigate to `localhost:3000`.

**Step Four:** In the terminal, press `ctrl` + `c` to terminate the server.

**Resources:**
- [npmjs.com](http://npmjs.com/)
- [http-server](https://www.npmjs.com/package/http-server)

## Workspace

It is very important to have a consistent and well organized workspace. Let's create a folder to keep all of our notes, warmups and class projects. Ultimately, how you arrange and organize your projects is up to you.

**Step One:** Create a `workspace` directory in your user home, here we will keep all of our files:

```bash
mkdir ~/workspace
```

Here is a directory structure that might work for you:

- workspace
  - q1
    - notes
    - warmups
    - projects
  - q2
    - ...
  - q3
    - ...
  - q4
    - ...

Alternatively, instead of by quarter you could organize by week:

- workspace
  - week1
    - notes
    - warmups
    - projects
  - week2
    - ...
  - week3
    - ...
  - ...
