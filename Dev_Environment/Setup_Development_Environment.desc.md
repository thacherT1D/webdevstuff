## Welcome to Galvanize!!!

We're super excited to have you here - it's going to be an intense, but incredible 6 months! We'll be posting the majority of our notes in the daily planner, so be sure to check these each day for topics, objectives and assignments.  

Today we're going to focus on setting up our development environment so that we can hit the ground running. This will involve installing quite a few tools/technologies and learning a whole bunch of useful shortcuts!

## Essential Installations

### Homebrew

**What is it? What will I be using it for?**

Homebrew is a package manager (a tool that helps us install additional technologies/tools) for OSX.

**How do I install it?**

In terminal, run:

`ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

### Oh my zsh

**What is it? What will I be using it for?**

Right now our terminal is not very user friendly. We're going to change our shell from `bash` to `zsh` and install a plugin called `oh my zsh` to give us some very useful shortcuts and coloring.

**How do I install it?**

In the terminal run:

`sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

You may have to type in your password if it asks you, and when you are done with this, in the terminal, type `zsh`.

### Atom text editor

**What is it? What will I be using it for?**

Atom is going to be our editor of choice. If you are more comfortable with other text editors like Sublime Text or Textmate you may use them but we **STRONGLY** urge you to consider using Atom (its really nice).

**How do I install it?**

https://atom.io

**Using the atom alias**

It would be really nice if we could open up atom from the terminal.

1. Start Atom
1. In the top menu bar, click Atom -> Install Shell Commands
1. You should see a pop up window saying that the shell commands have been installed.

### Spectacle

**What is it? What will I be using it for?**

Unfortunately, macs do not come with a great way to split windows easily. This means if we want to see two windows side by side we have to use our mouse to drag each time - that's too much work!

**How do I install it?**

Spectacle - http://spectacleapp.com/

### Use Chrome

**What is it? What will I be using it for?**

Chrome is a browser that not only offers some useful features for browsing, but it is a **MUST HAVE** for developing and debugging HTML, CSS and JavaScript. PLEASE make chrome your default browser - we will be using it almost every day.

**How do I install it?**

https://www.google.com/chrome/browser/desktop/

### tree

**What is it? What will I be using it for?**

Tree is a very useful tool for looking at the contents of a folder from the command line. It gives you a nice tree-like structure and shows you what files are nested where.

**How do I install it?**

http://brewformulas.org/Tree

`brew install tree`

### Anki

We will be using Anki to create flashcards to help us memorize the fundamentals. You can install Anki at

http://ankisrs.net/

### Dash

Dash is a great documentation application available on the app store. It is a paid for app that has an unlimited trial license. It will bug you to pay for an account but will not stop you from using it for free.

https://itunes.apple.com/us/app/dash-3-api-docs-snippets./id449589707?mt=12

### Slack

We use slack for all formal communication. It is highly recommended that you use the desktop app instead of just using the web app. Note there is also a phone app available for you as well.

https://itunes.apple.com/us/app/slack/id803453959?mt=12

### NVM

We will be using Node Version Manager to install and manage Node.js on our Macs. Run the following command to install NVM.

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

### Node.js

We will be using NVM to install Node.js. The first thing that we need to do is find out what the latest version of Node.js is. You can do this with the command

```bash
nvm install node
```

We can set up nvm to install and use the latest version of node with the following commands. You can copy-paste them into the terminal.

```bash
echo >> ~/.zshrc
echo '# setting up nvm to use the latest version of node.js' >> ~/.zshrc
echo 'nvm use node' >> ~/.zshrc
```

### Xcode

Apple Xcode will install command line tools, along with the only IDE (Integrated Development Environment) that can be used for Mac and iOS development. This download is very long, so we suggest that you download and install Xcode while at home or after 5pm (if you on campus).

https://itunes.apple.com/us/app/xcode/id497799835?mt=12

## Essential Shortcuts

## OSX
`command + tab` : switch open applications

<code>command + &#96;</code> : (when already in command + tab) switch open applications in reverse

<code>command + &#96;</code> : goes between different windows of current program

`command + q` (while in open applications) : quit an application

## Chrome / Sublime /  Bash / most apps with tabs

`command + n` : create new window (`shift + command + n` for Sublime)

`command + t` : create new tab (`command + n` for Sublime)

`command + w` : close tab or window if only one tab

`shift + command + w` : close window with multiple open tabs

`command + q` : quit application

`command + shift + ]` : move right one tab

`command + shift + [` : move left one tab

`command + NUMBER` : move to tab number NUMBER (not in Terminal)

`fn + up` : page up

`fn + down` : page down

`alt + command + arrow keys` : move right or left tabs

## Chrome
`command + r` : reload page

`command + option + j` : open the javascript console

`command + ]` : move forward through history

`command + [` : move backward through history

`command + shift + t` : reopen last closed tab (up to 10)

## Sublime
`command + ctrl + f` : toggle fullscreen

`command + ctrl + shift + f` : toggle distraction free


`option + arrows` : move one word at a time

`command + arrows` : move to beginning and end of line

`shift + above commands` : select all the text

`delete + the above` : delete all the text

`fn + delete` : delete forward

`command + k`, command k : delete to end of line

`command +  delete` : delete to beginning of line

`fn + up / down` : page up / page down

`fn + right / left` : beginning and end of file


`command + z` : undo

`command + shift + z` : redo

`command + y` :redo

`command + /` : toggle comment for line

`command + ]` : shift indenting right

`command + [` : shift indenting left

`command + l` : select the whole line

`command + c` (with selection) : copy selection

`command + x` (with selection) : cut selection

`command + v` : paste most recent cut or copy

`command + shift + v` : paste with proper indentation

`command + x` : cut the whole line

`command + c` : copy the whole line

`command + enter` : create new line below

`command + shift` + enter : create new line above

`command + shift + d` : copy current line below

`command + control + arrows` : move entire line up and down

`command + k, command + u` : make selection upper case

`command + k, command + l` : make selection lower case

`command + '` : select all within quotes

`control + m` : move to beginning/end of parens and braces

`command + d` : select word(s)

`command + k` while selecting words : don't select word

`command + ctrl + g` : select all of words

`option + mouseDrag` : column select

`command + mouseClick` : custom multiple cursor

`command + p` : goto anything (use with :line_number, @symbol, #term)

`command + r` : search all function names in current file

`command + shift + p` : set syntax (and many many other things)

`command + f` : find

`command + shift + f` : massive find

`command + k, command + b` : toggle file bar

`command + option + NUMBER` : split screen

`control + shift + NUMBER` : move current file to pane

`command + shift + l` : multi line cursor based on selection

`command + control + up/down` : move a line up or down
