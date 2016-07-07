## Mac OS X for Web Development

This article will help you setup a web development environment on [Mac OS X 10.11 El Capitan](https://www.apple.com/osx/) and above. By the end, your computer will be configured with the same state-of-the-art tools used by professional web developers. While this article is mostly compatible with older versions of Mac OS X, follow along as best you can while Googling any problems that arise.

By the end of this article, your development machine should have the following software installed and configured.

1. [iTerm](#install-and-configure-iterm)
  * [Upgrade with iTerm](#upgrade-with-iterm)
  * [Discover the Terminal](#discover-the-terminal)
  * [Upgrade Your Workflow](#upgrade-your-workflow)
1. [Homebrew](#install-homebrew)
  * [Update Homebrew](#update-homebrew)
  * [Verify Homebrew](#verify-homebrew)
1. [Chrome](#install-and-configure-chrome)
1. [zsh](#install-and-configure-zsh)
1. [Atom](#install-and-configure-atom)
  * [Install the Shell Commands](#install-the-shell-commands)
  * [Edit Your zsh Theme](#edit-your-zsh-theme)
  * [Discover the PATH Environment Variable](#discover-the-path-environment-variable)
1. [Git](#install-and-configure-git)
1. [Node](#install-node)
  * [Discover the Node Shell](#discover-the-node-shell)
  * [Discover the Node Interpreter](#discover-the-node-interpreter)
1. [Setup Your Class File Structure](#setup-your-class-file-structure)
1. [Spectacle](#install-and-configure-spectacle)
1. [Anki](#install-and-configure-anki)

Additionally, this article assumes your computer is up to the task of coding.

- Is virus and malware free
- Uses the latest, stable version of its operating system
- Has a functioning screen, keyboard, and trackpad
- Has plenty of free hard drive space and memory
- Can reliably connect to wireless networks

### What's an environment and why is it important?

In software, an **environment** is the place where an application is executed. An application's environment includes things like an operating system and a runtime system. Although web applications are often executed on many different environments, each with their own purpose, two environments are essential—production and development.

A **production environment** is a server, or collection of servers, that live somewhere on the Internet and is responsible for serving the web application to the public. When you visit https://duckduckgo.com/ in the browser, for example, you're making a request to a web application's production environment. Production environments are carefully configured and designed to process user requests as quickly as possible.

A **development environment** is a machine, like your laptop, that's used to create, test, commit, and deploy code to the production environment. For consistency, it's important that a development environment use the same technologies as its production counterpart. However, unlike production, a development environment is all about increasing developer productivity. As you can imagine, being able to create a development environment is a crucial skill for every developer.

### How do you create a development environment?

There are four essential tasks that web developers do on a daily basis.

1. Create code as efficiently as possible
1. Test code to ensure it works as expected
1. Commit code to a repository once it's correct
1. Deploy code to a production environment

In an ideal world, developers would learn and use a single, monolithic tool to accomplish all these tasks. In practice, this ideal turns out to be problematic for developers. Picture a scenario where a significantly better way of creating code is discovered that would dramatically improve your productivity. With a monolithic tool, you're at the mercy of the tool's creators to release a new version that incorporates the new and improved technique. In some cases, that can take a very long time if it ever happens at all.

That's why many developers prefer a development environment composed of multiple specialized tools rather than one monolithic tool. This approach is called the **Unix philosophy** and it emphasizes using simple, short, clear, modular, and extensible tools that can be easily maintained and repurposed by developers other than its creators. Though each tool has it's own learning curve, any one of them is easily replaceable when the need arises.

The following instructions will help you install and configure a development environment so you can complete the essential tasks of a web developer using tools that adhere to the Unix philosophy. Let's get started.

## Install and Configure iTerm

Included in Mac OS X is the **Terminal**—an app that runs a Unix shell.

A **Unix shell** is a command line user interface between you and your computer's operating system. You're probably most familiar with the graphical user interface of an operating system. While that's technically a shell too, most developers think of the textual, command line interface when they hear to word _shell_. Mac OS X blends both the graphical and the command line interfaces beautifully which is why it's so popular with developers.

The first Unix shell was released in 1971 and yet developers continue to incorporate them into their workflows. That's because Unix shells are both interactive and scriptable. In other words, the same commands that control an operating system from the command line can be included in a script file. A **script file** is commonly used to automate repetitive tasks and increase developer productivity. In this article, you'll download and run script files to speed up the installation and configuration of your development environment.

### Upgrade with iTerm

While the Terminal that comes with Mac OS X is useful as is, you'll find many developers have upgraded to use [iTerm2](https://www.iterm2.com/). There are
[many features](https://www.iterm2.com/features.html) iTerm provides which goes above and beyond the typical Terminal program.

[Download](https://www.iterm2.com/downloads.html) the latest stable version of iTerm and then drag the downloaded icon into your Applications folder.

### Discover the Terminal

Let's get our hands dirty and have some fun!

First, use Spotlight to launch the iTerm app by pressing the `Command` + `Spacebar` keys at the same time, typing the word "iterm" into the search field, and then pressing the `Enter` key.

Once launched, you'll see something like this.

![](https://i.imgur.com/lHX0JWD.png)

Here's a quick break down of what you're seeing in the Terminal app.

| Component             | Description                            |
| --------------------- | -------------------------------------- |
| `Mon Jun 20 10:14:00` | Date of your last login                |
| `ttys000`             | Name of your last terminal session     |
| `Avenger`             | Name of your computer                  |
| `~` (home directory)  | Name of your working directory         |
| `steverogers`         | Name of your user account              |
| `$`                   | Prompt symbol                          |

Go ahead and type `uname` which is a command that will display your operating system's Unix name. Any characters you type will appear after the `$` prompt symbol. After pressing the `Enter` key, you'll see something like this.

![](https://i.imgur.com/lcRJe6D.png)

**TIP:** The two most common Unix operating systems are Darwin and Linux.

Here's what happened:

![](https://i.imgur.com/YZmrVbh.png)

1. The User launched the Terminal.
1. The Terminal launched a new Shell session.
1. The Shell told the Terminal to display a prompt.
1. The Shell told the Terminal to wait for the User to type a command.
1. The User typed in `uname`, which appeared after the prompt, and then pressed the `Enter` key.
1. The Terminal told the Shell that the User wants to run a command called `uname`.
1. The Shell searched for and launched a program called `uname`.
1. The Shell handed control over the Terminal to the `uname` program.
1. The `uname` program told the Terminal to display the word `Darwin`.
1. The `uname` program exited and handed control of the Terminal back to the Shell.
1. The Shell told the Terminal to display another prompt.
1. The Shell told the Terminal to wait for the User to type a command.

This sequence of events is known as a read-evaluate-print loop or **REPL** for short. This is just one example of a larger concept called the **Request-Response Cycle**. You'll study the cycle of sending a request and processing a response throughout this course as it's at the core of web development.

### Upgrade Your Workflow

Right now using the terminal may not be very intuitive. Not only is it something completely new but it also doesn't share the
keybindings from other programs that we may know better. Let's set up our terminal to work more like the rest of our
computer and therefore speed up our workflow.

As we move forward, you may find that your terminal window is getting cluttered with text! If that ever happens, press `Command` + `K`
and your window will be cleared out. This is a great way to make sure you are always **Clearing the Stage** and don't get overwhelmed
by the amount of information your screen.

Just like in Atom and Chrome, you can open a new tab on your terminal with `Command` + `T`. However, unlike in these programs you can't navigate back and forth between tabs using `Command` + `Option` + `Left / Right`. Currently, if you try, you'll see this:

[![https://gyazo.com/53c479c4175b81b4fe61fb6197f18d74](https://i.gyazo.com/53c479c4175b81b4fe61fb6197f18d74.gif)](https://gyazo.com/53c479c4175b81b4fe61fb6197f18d74)

Let's fix our key bindings so that we can navigate between tabs just like in Chrome. Press `Command` + `,` to open the preferences pane
and then navigate to the **Keys** section. Find the "Previous Tab" and "Next Tab" key mappings. By default, iTerm has these set to be
just `Command` + `Left / Right`. Consolidating our key mappings will make it easier for us to open any program and be able to **just work™**,
as opposed to trying to remember what the key mappings for this program are.

Double click on "Previous Tab" and then enter in our new key binding of `Command` + `Option` + `Left`. Then do the same with "Next Tab"
except using `Command` + `Option` + `Right`.

[![https://gyazo.com/d4f8196a7782289b7110cd01a0f2e2ef](https://i.gyazo.com/d4f8196a7782289b7110cd01a0f2e2ef.gif)](https://gyazo.com/d4f8196a7782289b7110cd01a0f2e2ef)

In other programs you can use `Command` + `Delete` to delete an entire line but we can't do this an iTerm. These means if you need to delete
a long line you were just typing you'd need to hold the Delete key. That's ridiculous, so let's fix it.

Back in the **Keys** section of your preferences pane, press the `+` button to create a new key mapping. This time we need to select the option
titled "Send Hex Code" which will allow us to type in some characters that will send a command to our computer. It's not important to understand
how this is happening just yet. Add the following and then press OK.

![](http://i.imgur.com/3E7rdVw.png)

If you return back to your terminal, you'll find that you can now delete everything before the cursor with `Command` + `Delete`. Much, much faster!

[![https://gyazo.com/3cd1cb44c01d8be442fe7bfca578c796](https://i.gyazo.com/3cd1cb44c01d8be442fe7bfca578c796.gif)](https://gyazo.com/3cd1cb44c01d8be442fe7bfca578c796)

But, did you notice that the cursor had to manually moved back a word? In Atom, you can navigate to the front and back of a line with `Command` + `Left / Right`, move back or forward a single word with `Option` + `Left / Right`, and delete only a single word with `Option` + `Delete`. Let's set up all of those
key mappings so we can be efficient programmers!

For the movement-based key mappings. Take a look at this [Stack Overflow response](http://stackoverflow.com/questions/6205157/iterm2-how-to-get-jump-to-beginning-end-of-line-in-bash-shell). Stack Overflow is a forum where you
can ask and answer questions. It's typically used by developers but there are a ton of different Stack Overflow forums on all different types of topics.

When you attempt to do the last two, you'll get a warning message that a different key mapping is overriding the changes you're attempting to make.
Don't worry! Go to the **Profiles** tab and then just delete the key bindings associated with `Option` + `Left / Right`.

[![https://gyazo.com/61892d48108b14995ca20282dadf56ed](https://i.gyazo.com/61892d48108b14995ca20282dadf56ed.gif)](https://gyazo.com/61892d48108b14995ca20282dadf56ed)

One last key mapping! Add this final key mapping to delete only the prior word.

![](http://i.imgur.com/qftxOBD.png)

You can now navigate around the text in your terminal incredibly quickly! At the moment, this may seem like a lot of work for such little gain; but, I think you'll find these key bindings to be invaluable in the weeks to come.

We can enable one last time saving trick in iTerm to make development more predictable and quick. Currently, if you navigate to a folder inside of your file system and then open up a new terminal window, you'll find yourself back at your home directory. This ends up getting pretty annoying as we attempt to work on different parts of a project.

Instead, let's have our terminal open the previous session's directory as its new starting point. To do so, in Preferences under "Profiles" select the following:

![](http://i.imgur.com/IlJ3VyU.png)

Now whenever you open a new window, you'll be in the same directory and won't need to navigate to it again. Hurray!

We've completed a number of customizations to make our terminal more intuitive which will, in turn, make us faster developers. Moving forward in the course, you should feel free to experiment with different key bindings that you like.

## Install Homebrew

Now that your Terminal is setup, it's time to install [Homebrew](http://brew.sh/), the de facto package manager for OS X. If you've never heard of a package manager, think of it as an app store for **free** command line programs.

To get started, run the following command in your shell. It'll download and run a script file that downloads and installs Homebrew onto your development environment. So meta!

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Be sure to agree when asked to install the **Xcode CommandLine Tools**. It may take about 10 minutes to download and install.

**TIP:** If needed, you can agree to the Xcode license by running the `sudo xcodebuild -license` command. This will require your account password which **will not** appear on the screen as you type.

### Update Homebrew

If you've previously installed Homebrew, now's a good time to update it by running the following command.

```
brew update
```

If it's been a while since the last update, you'll see something like this.

![](https://i.imgur.com/OCAX71o.png)

Otherwise, you'll see something like this.

![](https://i.imgur.com/JPB9Gnn.png)

**TIP:** Run this command periodically as Homebrew doesn't automatically update itself.

### Verify Homebrew

To verify Homebrew is installed correctly, run the following command.

```
brew doctor
```

And you'll see something like this.

![](https://i.imgur.com/DWfdE3D.png)

## Install and Configure Chrome

Now it's time to install [Google Chrome](https://www.google.com/chrome/), a fast and free web browser that automatically updates itself with the latest web technologies.

To get started, [download Chrome](https://www.google.com/chrome/browser/desktop/), open the disk image file, and drag the app icon into your `/Applications` folder.

Once installed, use Spotlight to launch Chrome by pressing the `Command` + `Spacebar` keys at the same time, typing the word "chrome" into the search field, and then pressing the `Enter` key.

![](https://i.imgur.com/qnONHeW.jpg)

**TIP:** I recommend allowing Chrome to become your default browser.

Navigate to the `Chrome > Preferences` by pressing the `Command` + `,` keys at the same time. Scroll to the bottom of the page and click the **Show advanced settings...** link.

![](https://i.imgur.com/O7jFfxQ.png)

Scroll down a bit more until you find the **Send a "Do Not Track" request with your browser traffic** and check the box.

![](https://i.imgur.com/NAWbEim.png)

**TIP:** You may want to consider installing an [ad blocking extension](https://chrome.google.com/webstore/detail/adblock/gighmmpiobklfepjocnamgkkbiglidom) to Chrome.

## Install and Configure Zsh

Because we'll be working with the shell often, it's important to make the experience as efficient and fun as possible. Remember, a shell is simply the user interface between you and your computer's operating system.

There are many command line shells available to choose from, each with their own strengths. We're all going to start together using Zsh and Oh My Zsh, but you can work with another in the future.

You should actually already have zsh installed! To check, run the following command.

```
zsh --version
```

You should receive some output that looks like this.

```
zsh 5.0.8 (x86_64-apple-darwin15.0)
```

That means all we need to do is install [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh), which is simply a framework for managing your zsh configuration. It's like icing on a delicious, shell cake. Read the instructions on how to install via the Github repository.

**TIP:** This will require your account password which **will not** appear on the screen as you type.

You should end up with something like the following:

![](http://i.imgur.com/AHD1JS5.png)

With zsh, we can set up some really great themes that will give us more information as we interact with the shell, making it much easier to use. We'll do that in the next session after we've installed Atom!

## Install and Configure Atom

Now it's time to install [Atom](https://atom.io/), a hackable text editor for the 21st century.

To get started, [download Atom](https://atom.io/download/mac), unzip the archive file, and drag the app icon into your `/Applications` folder.

Once installed, use Spotlight to launch Atom by pressing the `Command` + `Spacebar` keys at the same time, typing the word "atom" into the search field, and then pressing the `Enter` key.

![](https://i.imgur.com/fuVq4T5.jpg)

Close all the open tabs by pressing the `Command` + `W` keys at the same time.

Next, navigate to the `Atom > Preferences` menu item by pressing the `Command` + `,` keys at the same time.

Under the **Settings** tab, change the following:

| Name                               | Value              |
|------------------------------------|--------------------|
| Font Family                        | Menlo              |
| Font Size                          | 18                 |
| Show Indent Guide                  | :white_check_mark: |
| Soft Wrap                          | :white_check_mark: |
| Soft Wrap At Preferred Line Length | :white_check_mark: |

Atom has a number of themes you can install to change how code appears on your screen. Under the **Themes** tab, choose the following:

| Name                           | Type         |
|--------------------------------|--------------|
| One Dark                       | UI Theme     |
| Base16 Tomorrow Dark           | Syntax Theme |

When you're done, close the preferences tab by pressing the `Command` + `W` keys  at the same time.

### Install the Shell Commands

You'll find it insanely useful to open files and directories into Atom from the Terminal.

To get started, select the `Atom > Install Shell Commands` menu item.

To verify Atom is wired up correctly, run the following command.

```
atom -v
```

### Edit Your zsh Theme

Now we have our editor installed and Oh My Zsh setup. Let's make our terminal fabulous.

Running the following command should open a file with atom:

```
atom ~/.zshrc
```

This is your zsh config file, which allows you to manage your shell's settings in all kinds of ways. You should see on or around Line 8 the following:

```
ZSH_THEME="robbyrussell"
```

What's between the `"`s is the name of the theme that's currently in play. There's a great website that allows you to preview the hundreds of themes available to zsh called [zshthem.es](http://zshthem.es/). A good theme should:

1. Give you some indication as to where you are in the file system.
1. Not be so cluttered that you can't distinguish between the theme and what you're typing.
1. When working with git, should give you some indication as to what branch you're on and if you have any uncommitted files.

To change your theme, you simply need to change the name from `robbyrussell` to whatever the name of the theme is. You could spend a lot of time doing this, so for now start with either `clean` or `ys`.

Once you have changed the file, save it (with `Command` + `S`) and then open up a new terminal window. You should see your new theme in place!

### Discover the `PATH` Environment Variable

Like most shells, zsh relies on the `PATH` environment variable to specify a set of directories where other commands can be found.

To see the contents of the `PATH` environment variable, run the following command.

```
echo $PATH
```

**TIP:** When reading the content of an environment variable, it must be prefixed with a dollar sign `$`.

And you'll see something like this.

![](https://i.imgur.com/9oOQq4F.png)

When you type a command that **doesn't** include a slash `/` character, these `PATH` directories are searched one after another. Once a file that matches the command is found, the searching stops and the corresponding file is run.

Notice the `/usr/local/bin` directory is listed before the following directories.

- `/usr/bin`
- `/bin`
- `/usr/sbin`
- `/sbin`

This means the `/usr/local/bin` directory has priority over all later searched directories.

Since Homebrew installs new commands to the `/usr/local/bin` directory, Homebrew-installed commands will be preferred over the pre-installed ones. In upcoming sections, you'll use Homebrew to install additional commands that override the pre-installed commands that come with Mac OS X.

## Install and Configure Git

Using Homebrew, you can also install [Git](https://git-scm.com/), the version control system of choice among choosy developers. :neckbeard:

To get started, run the following command.

```
brew install git
```

Once it finishes, run the following command.

```
git --version
```

And you'll see something like this.

![](https://i.imgur.com/Gwx0LOn.png)

Like artists, programmers sign their work. Let's configure Git to sign your commits with your name and email address.

**WARNING:** Before running the following commands, replace `YOUR FULL NAME` and `YOUR EMAIL ADDRESS` with the name and email from [your GitHub account](https://github.com/settings/profile).

```
git config --global user.name 'YOUR FULL NAME'
git config --global user.email 'YOUR EMAIL ADDRESS'
```

You've gotten git!

## Install Node

Using Homebrew, you can also install [Node](https://nodejs.org/), an open-source, cross-platform runtime system for developing applications in JavaScript. In other words, it runs JavaScript outside the browser.

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

Play around with JavaScript on your own. When you're done, type `.exit` and press the `Enter` key to quit the Node shell. Alternatively, you can hit `Command` + `D` once or `Command` + `C` twice.

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

Weird, nothing happened. Remember, the Node interpreter won't print anything unless told. Jerk!

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

## Setup Your Class File Structure

Throughout the class, we've noticed many students try a variety of file structures that don't work for them. Either it becomes too granular, or their files are all over the place. So, to start, let's all begin with the same file structure.

First of all, make sure you're in your `$HOME` directory. To find out what your home directory is, we can echo the environment variable, `$HOME`:

```
echo $HOME
```

To find out where you are, you can use the print working directory command, abbreviated to `pwd`:

```
pwd
```

Those two commands should output the same result! If they don't, you can run the change directory command which, when not given an additional parameter, will just return you to your home directory.

```
cd
```

Once you've confirmed you're in that directory, you can run the following command. Typically, you should not just run commands people give you that you don't understand. In this case though, it's probably okay. :wink:

```
mkdir galvanize && \
cd galvanize && \
mkdir unit-1 && mkdir unit-2 && mkdir unit-3 && mkdir unit-4 && mkdir projects && \
ls -la
```

The output you receive should look something like this:

```
total 0
drwxr-xr-x   7 steverogers  staff  238 Jun 23 09:42 .
drwxr-xr-x  18 steverogers  staff  612 Jun 23 09:42 ..
drwxr-xr-x   2 steverogers  staff   68 Jun 23 09:42 projects
drwxr-xr-x   2 steverogers  staff   68 Jun 23 09:42 unit-1
drwxr-xr-x   2 steverogers  staff   68 Jun 23 09:42 unit-2
drwxr-xr-x   2 steverogers  staff   68 Jun 23 09:42 unit-3
drwxr-xr-x   2 steverogers  staff   68 Jun 23 09:42 unit-4
```

You now have five folders setup: one for each unit and another for your end of unit projects. As we work on warmups, exercises, and mini-projects, do all of your work inside of the appropriate unit folder.

## Install and Configure Spectacle

You'll often find yourself working with multiple programs at the same time while you're developing. Smartly utilizing your screen space will allow you to work more efficiently.

To do so, we recommend using [Spectacle](https://www.spectacleapp.com/), a free application that allows you to manage your screen space with keyboard shortcuts. Download the application from the homepage and then drag the icon to your `Applications` directory. To open, press `Command` + `Spacebar` to open up Spotlight and then type in Spectacle.

Try out Spectacle by opening up a window in Chrome and pressing `Command` + `Option` + `Left / Right / Up / Down`. Your Chrome window should move around the screen and take up half the space! You can do this with any program so you could have Atom on one side of the screen and your terminal on the other.

Unfortunately, some of Spectacle's native commands now override the ability to switch between tabs on both our terminal and in Chrome! Let's fix those by setting up custom bindings. Instead of `Command` + `Option` + [Some Direction], we're going to do `Command` + `Option` + `Control` + [Some Direction].

Open up Preferences in Spectacle, and first delete the keybindings for Next Display and Previous Display.

[![https://gyazo.com/83b9e59da89794e5480eba12dc69c1c9](https://i.gyazo.com/83b9e59da89794e5480eba12dc69c1c9.gif)](https://gyazo.com/83b9e59da89794e5480eba12dc69c1c9)

Next, click the relevant bindings and then simply press the new keyboard commands you'd like to use.

[![https://gyazo.com/e0a4ef72d9385b55f4fb03b0e41f71be](https://i.gyazo.com/e0a4ef72d9385b55f4fb03b0e41f71be.gif)](https://gyazo.com/e0a4ef72d9385b55f4fb03b0e41f71be)

That's it! You can now do all the things with your keyboard!

## Install and Configure Anki

Anki is an intelligent flashcard program that smartly decides when you need to study certain material. While it is not important in this class to memorize many things, it is helpful to study definitions for certain terms in order to begin the process of speaking like a developer. This is invaluable for interviewing and we'd recommend starting that process now as opposed to at the end of the class.

You can download Anki at it's [official website](http://ankisrs.net/). By now, I'm sure you can figure out how to install an application on a Mac!

Anki works by creating decks of cards which you can study. Begin by renaming the default deck to "Web Development".

[![https://gyazo.com/d3fedeaf44e1a3f0c3adb55f5d5fc3d3](https://i.gyazo.com/d3fedeaf44e1a3f0c3adb55f5d5fc3d3.gif)](https://gyazo.com/d3fedeaf44e1a3f0c3adb55f5d5fc3d3)

Click on that deck and then click the "Add" button. This will bring you to a screen where you can create a new card. The "Front" is where you'd place the term or question and the "Back" is where you'd put the answer.

We'll let you determine how you want to create and study the cards. However, I'd suggest only doing definitions and thinking of the Front of the card as an interview question. For example:

![](http://i.imgur.com/JAfnfux.png)

It's more important that you find a **correct definition that makes sense to you in your own words** than a definition from Wikipedia. Once you're done with the card, you can add it and then create more cards.

When you're ready to study, hit **Study Now** and test your knowledge! For more information on how Anki works, you should check out the documentation.

## Congratulations!

You've successfully setup a web development environment on Mac OS X and have completed these development tasks.

1. Customized your terminal to be more intuitive and more colorful.
1. Installed programs and tools to make it easier to develop and learn.
1. Built character.

Now that you've finished this article, it's time to celebrate with a frosty beverage. :beers: