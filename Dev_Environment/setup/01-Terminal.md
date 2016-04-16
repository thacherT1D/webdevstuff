## Configure the Terminal

Included in Mac OS X is the **Terminal**—an app that runs a Unix shell.

A **Unix shell** is a command line user interface between you and your computer's operating system. You're probably most familiar with the graphical user interface of an operating system. While that's technically a shell too, most developers think of the textual, command line interface when they hear to word _shell_. Mac OS X blends both the graphical and the command line interfaces beautifully which is why it's so popular with developers.

The first Unix shell was released in 1971 and yet developers continue to incorporate them into their workflows. That's because Unix shells are both interactive and scriptable. In other words, the same commands that control an operating system from the command line can be included in a script file. A **script file** is commonly used to automate repetitive tasks and increase developer productivity. In this guide, you'll download and run script files to speed up the installation and configuration of your development environment.

### Discover the Terminal

Let's get our hands dirty and have some fun. :paw_prints:

First, use Spotlight to launch the Terminal app by pressing the `Command` + `Spacebar` keys at the same time, typing the word "terminal" into the search field, and then pressing the `Enter` key.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/5/terminal-spotlight.jpg)

Once launched, you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/6/terminal-plain.png)

Here's a quick break down of what you're seeing in the Terminal app.

| Component             | Description                            |
| --------------------- | -------------------------------------- |
| `Wed Jan 28 12:06:29` | Date of your last login                |
| `ttys008`             | Name of your last terminal session     |
| `photon`              | Name of your computer                  |
| `~` (home directory)  | Name of your working directory         |
| `ryansobol`           | Name of your user account              |
| `$`                   | Prompt symbol                          |

Go ahead and type `uname` which is a command that will display your operating system's Unix name. Any characters you type will appear after the `$` prompt symbol. After pressing the `Enter` key, you'll see something like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/7/terminal-uname.png)

**TIP:** The two most common Unix operating systems are Darwin and Linux.

Here's what happened:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/8/terminal-sequence.png)

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

### Change the Terminal Profile

The default profile for the Terminal uses small, black text on a white background. Boring! Let's change that.  You have two great options:

#### Tomorrow Night

1. Download [Tomorrow Night Eighties](https://raw.githubusercontent.com/ryansobol/sea-c17-ruby/master/class1/osx/Tomorrow%20Night%20Eighties.terminal) terminal profile by holding the `Option` key and left-clicking the link.
1. Navigate to the `Downloads` folder.
1. Install the profile by double-clicking the file.
1. You'll see an alert explaining the file "cannot be opened because it is from an unidentified developer". **Don't panic.**
1. Using Spotlight, open the `Security & Privacy` system preferences by pressing the `Command` + `Spacebar` keys at the same time, typing the word "security" into the search field, and then pressing the `Enter` key.
1. Navigate to the `General` tab and then click on the `Open Anyway` button. ![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/9/tomorrow-night-security.png)
1. Press the `Command` + `Tab` keys at the same time to switch back to the Terminal app.
1. Navigate to the `Terminal > Preferences` menu item by pressing the `Command` + `,` keys at the same time.
1. In the preferences window, click the `Settings` Pane.
1. On the left side, scroll to the bottom, select the `Tommorrow Night Eighties` profile, and click the `Default` button. ![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/10/tomorrow-night-default.png)
1. Quit the Terminal app by pressing the `Command` + `Q` keys at the same time.
1. Relaunch the Terminal using Spotlight like before.

Now, every new Terminal window will look like this.

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/11/tomorrow-night-terminal.png)

#### Solarized

1. Download [Solarized](http://ethanschoonover.com/solarized/files/solarized.zip)
1. Navigate to the `Downloads` folder.
1. Install the profile by double-clicking one of the files in the `osx-terminal.app-colors-solarized` directory.
1. You'll see an alert explaining the file "cannot be opened because it is from an unidentified developer". **Don't panic.**  ![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/2/solarized-cannot-be-opened.png)
1. Using Spotlight, open the `Security & Privacy` system preferences by pressing the `Command` + `Spacebar` keys at the same time, typing the word "security" into the search field, and then pressing the `Enter` key.
1. Navigate to the `General` tab and then click on the `Open Anyway` button. ![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/4/solarized-preferences.png)
1. Press the `Command` + `Tab` keys at the same time to switch back to the Terminal app.
1. Navigate to the `Terminal > Preferences` menu item by pressing the `Command` + `,` keys at the same time.
1. In the preferences window, click the `Settings` Pane.
1. On the left side, scroll to the bottom, select the `Solarized` profile, and click the `Default` button.  ![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/3/solarized-default-profile.png)
1. Quit the Terminal app by pressing the `Command` + `Q` keys at the same time.
1. Relaunch the Terminal using Spotlight like before.

Every new Terminal window will look like this:

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/12/solarized-dark.png)

OR

![](https://students-gschool-production.s3.amazonaws.com/uploads/asset/file/13/solarized-light.png)
![Uploading file...]()