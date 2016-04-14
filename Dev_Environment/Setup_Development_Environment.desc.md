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

### Git	

**What is it? What will I be using it for?**

Git is a version control system that we will be using to keep track of changes in our code. It is a **MUST** know for any developer and we will be spending lots of time on it over the course.

**How do I install it?**

In the terminal, run:

`brew update`

`brew install git`

### Oh my zsh	

**What is it? What will I be using it for?**

Right now our terminal is not very user friendly. We're going to change our shell from `bash` to `zsh` and install a plugin called `oh my zsh` to give us some very useful shortcuts and coloring.

**How do I install it?**

In the terminal run:

`sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"`

You may have to type in your password if it asks you, and when you are done with this, in the terminal, type `zsh`.

### Install ATOM

[Download Atom](https://atom.io/)

### Alfred or Spotlight	

**What is it? What will I be using it for?**

Alfred is a wonderful tool for quickly finding files, doing quick math, searching on wikipedia and defining words.

**How do I install it?**

http://www.alfredapp.com/

### Shiftit / Divvy	/ Spectacle

**What is it? What will I be using it for?**

Unfortunately, macs do not come with a great way to split windows easily. This means if we want to see two windows side by side we have to use our mouse to drag each time - that's too much work! 

**How do I install it?**

Shiftit - https://github.com/fikovnik/ShiftIt/releases/download/version-1.6.3/ShiftIt-1.6.3.zip

Divvy - https://itunes.apple.com/us/app/divvy-window-manager/id413857545?mt=12

Spectacle - http://spectacleapp.com/

### Use Chrome	

**What is it? What will I be using it for?**

Chrome is a browser that not only offers some useful features for browsing, but it is a **MUST HAVE** for developing and debugging HTML, CSS and JavaScript. PLEASE make chrome your default browser - we will be using it almost every day.

**How do I install it?**

https://www.google.com/chrome/browser/desktop/

### fasd	

**What is it? What will I be using it for?**

When you're in the command line, sometimes you can't remember where folders/files are, so you spend time searching through directories and driving yourself crazy. fasd will help preserve your sanity.

https://github.com/clvv/fasd

**How do I install it?**

Download the zipfile here and open up the folder in terminal (you can drag the folder icon to the terminal)

https://github.com/clvv/fasd/zipball/1.0.1

Once you are in terminal, run the command `make install`

When this is done head over to the home directory (in terminal type `~`) and then run `subl .zshrc` to open up your `.zshrc` file. Inside of here, add the following `eval "$(fasd --init auto)"` - then save and restart the terminal. Finally, type in the terminal `which z`. If you see `z: aliased to fasd_cd -d` you have done this correctly!

### tree	

**What is it? What will I be using it for?**

Tree is a very useful tool for looking at the contents of a folder from the command line. It gives you a nice tree-like structure and shows you what files are nested where.

**How do I install it?**

http://brewformulas.org/Tree

`brew install tree`

### Mou	

**What is it? What will I be using it for?**

When we write readme files for our repositories, the language we use is Markdown, which is a text to HTML converter (you can read more about it here http://daringfireball.net/projects/markdown/). It's essential to understand how Markdown works as well as have a tool where we can write Markdown. Sublime Text 3 can help us with that, but there are better tools - Mou is one of them!

**How do I install it?**

http://25.io/mou/

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
