## macOS for Web Development

This article will help you setup a web development environment on [macOS Sierra 10.12](http://www.apple.com/macos/) and above. By the end, your computer will be configured with the same state-of-the-art tools used by professional web developers. While this article is mostly compatible with older versions of macOS, follow along as best you can while Googling any problems that arise.

By the end of this article, your development machine should have the following software installed and configured.

1. [Terminal](#configure-the-terminal)
1. [Homebrew](#install-homebrew)
1. [Chrome](#install-and-configure-chrome)
1. [Fish](#install-and-configure-fish)
1. [Atom](#install-and-configure-atom)
1. [Git](#install-and-configure-git)
1. [Node](#install-node)
1. [Surge](#install-surge)

After you've finished setting up your development environment, you'll be able to complete the following tasks.

1. Create a tiny web page with a text editor
1. Test the web page in a browser
1. Commit the web page to a repository
1. Deploy the web page to a production environment

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

## Configure the Terminal

Included in macOS is the **Terminal**—an app that runs a Unix shell.

A **Unix shell** is a command line user interface between you and your computer's operating system. You're probably most familiar with the graphical user interface of an operating system. While that's technically a shell too, most developers think of the textual, command line interface when they hear to word _shell_. macOS blends both the graphical and the command line interfaces beautifully which is why it's so popular with developers.

The first Unix shell was released in 1971 and yet developers continue to incorporate them into their workflows. That's because Unix shells are both interactive and scriptable. In other words, the same commands that control an operating system from the command line can be included in a script file. A **script file** is commonly used to automate repetitive tasks and increase developer productivity. In this article, you'll download and run script files to speed up the installation and configuration of your development environment.

### Discover the Terminal

Let's get our hands dirty and have some fun. 🐾

First, use Spotlight to launch the Terminal app by pressing the `Command` + `Spacebar` keys at the same time, typing the word "terminal" into the search field, and then pressing the `Enter` key.

![](https://i.imgur.com/XQE36wU.jpg)

Once launched, you'll see something like this.

![](https://i.imgur.com/7d6GeeO.png)

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

![](https://i.imgur.com/eGnT4NZ.png)

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

### Change the Terminal Profile

The default profile for the Terminal uses small, black text on a white background. Boring! Let's change that.

1. Download the [Tomorrow Night Eighties](https://raw.githubusercontent.com/ryansobol/sea-c17-ruby/master/class1/osx/Tomorrow%20Night%20Eighties.terminal) terminal profile by holding the `Option` key and left-clicking the link.
1. Navigate to the `Downloads` folder.
1. Install the profile by double-clicking the file.
1. You'll see an alert explaining the file "cannot be opened because it is from an unidentified developer". **Don't panic.**
1. Using Spotlight, open the `Security & Privacy` system preferences by pressing the `Command` + `Spacebar` keys at the same time, typing the word "security" into the search field, and then pressing the `Enter` key.
1. Navigate to the `General` tab and then click on the `Open Anyway` button. ![](https://i.imgur.com/lOh3GAH.png)
1. Press the `Command` + `Tab` keys at the same time to switch back to the Terminal app.
1. Navigate to the `Terminal > Preferences` menu item by pressing the `Command` + `,` keys at the same time.
1. In the preferences window, click the `Settings` Pane.
1. On the left side, scroll to the bottom, select the `Tommorrow Night Eighties` profile, and click the `Default` button. ![](https://i.imgur.com/g9l91K0.png)
1. Quit the Terminal app by pressing the `Command` + `Q` keys at the same time.
1. Relaunch the Terminal using Spotlight like before.

Now, every new Terminal window will look like this.

![](https://i.imgur.com/87bHvEF.png)

### Add Universal Keyboard Shortcuts

Keyboard shortcuts on macOS typically consist of one or more of the following keys.

| Key         | Symbol |
|-------------|--------|
| `Command`   | ⌘      |
| `Option`    | ⌥      |
| `Control`   | ⌃      |
| `Function`  | fn     |
| `Shift`     | ⇧      |
| `Caps Lock` | ⇪      |

Unsurprisingly, macOS has a bunch of built-in keyboard shortcuts that are universal to all applications. For example, `Command` + `T` is the universal keyboard shortcut for creating a new application tab. Though there are keyboard shortcuts for switching between an application's tabs, you might be surprised to learn that these not universal for all applications.

Since you'll be switching between tabs in applications like the Terminal, Google Chrome, and Atom all the time, let's add a few universal keyboard shortcuts for this.

1. Using Spotlight, open the `Keyboard` system preferences by pressing the `Command` + `Spacebar` keys at the same time, typing the word "keyboard" into the search field, and then pressing the `Enter` key.
1. Navigate to the `Shortcuts` tab, select `App Shortcuts` from the left pane, and then click on the `+` button. ![](https://i.imgur.com/tFgUgSk.png)
1. In the panel that slides down, add the following keyboard shortcuts to **All Applications**.

| Menu Title          | Keyboard Shortcut          | Symbols |
|---------------------|----------------------------|---------|
| Select Next Tab     | `Option` + `Command` + `→` | ⌥⌘→     |
| Select Previous Tab | `Option` + `Command` + `←` | ⌥⌘←     |
| Show Next Tab       | `Option` + `Command` + `→` | ⌥⌘→     |
| Show Previous Tab   | `Option` + `Command` + `←` | ⌥⌘←     |

By adding a keyboard shortcut, you're associating it with a possible menu title for all applications. The reason for the duplicate shortcuts is because different applications have differently named menu titles to switch between the next and previous tab.

When you're done, it should look like this.

![](https://i.imgur.com/wzhNmHr.png)

You may also be surprised to learn that there are no universal keyboard shortcuts to quickly and neatly arrange application windows on the screen. For this, you'll need a tool called a window manager. There are many window managers on the market, but the one I use and whole-heartedly recommend is called [Magnet](https://itunes.apple.com/us/app/magnet/id441258766?mt=12). I like Magnet because its adds several universal keyboard shortcuts that are compatible with the ones you just created. If you're comfortable spending a couple of dollars on the Mac App Store, give it a try. Otherwise, feel free to use any window manager you want.

## Install Homebrew

Now that your Terminal is setup, it's time to install [Homebrew](http://brew.sh/), the de facto package manager for OS X. If you've never heard of a package manager, think of it as an app store for **free** command line programs.

To get started, run the following command in your shell. It'll download and run a script file that downloads and installs Homebrew onto your development environment. So meta! 🤘

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

**TIP:** Run this command periodically as Homebrew doesn't automatically update itself. 😓

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

## Install and Configure Fish

Using Homebrew, you can now install [Fish](https://fishshell.com/), a smart and user-friendly command line shell. Remember, a shell is simply the user interface between you and your computer's operating system.

There are many command line shells availabe to choose from, each with their own strengths. Since it's easy to switch back and forth at any time, I recommend you give Fish a try.

To get started, run the following command.

```
brew install fish
```

Run the following command to let your computer know it's safe to use Fish as your default shell.

```
echo '/usr/local/bin/fish' | sudo tee -a /etc/shells
```

**TIP:** This will require your account password which **will not** appear on the screen as you type.

Finally, run this command to make Fish your default shell.

```
chsh -s /usr/local/bin/fish
```

**TIP:** This will also require your account password which **will not** appear on the screen as you type.

Now, quit the Terminal app by pressing the `Command` + `Q` keys at the same time. Then relaunch your Terminal using Spotlight and you'll see something like this.

![](https://i.imgur.com/h2qvEez.png)

Welcome to Fish! 🐠

### Improve the prompt

The prompt is the visual cornerstone of any shell, so let's change it to be both functional and glamorous. 💅

To download and install a better prompt, run the following command.

```
curl -fsSL https://git.io/vgqFU | ruby
```

To verify the new prompt is installed correctly, relaunch the Terminal. You'll see something like this.

![](https://imgur.com/kBsLiZK.png)

**TIP:** Run the `rm -r ~/.git` command if your Fish prompt looks like the this instead.

![](https://i.imgur.com/fAO3vje.png)

Here's a quick break down of what you're seeing.

| Component             | Description                            |
| --------------------- | -------------------------------------- |
| `Wed Jan 28 08:53:47` | Date of your last login                |
| `ttys006`             | Name of your last terminal session     |
| `~` (home directory)  | Name of your working directory         |
| `$`                   | Prompt symbol                          |

### Update the auto-completions

Fish's auto-completions enhance the user experience of most command line tools.

To update fish's completions, run the following command.

```
fish_update_completions
```

And you'll see something like this.

![](https://i.imgur.com/NOS48CL.png)

To try out auto-completions, start typing the following command.

```
brew in
```

And press the `Tab` key and you'll see something like this.

![](https://i.imgur.com/NNP06MA.png)

Finish typing the following command and press the `Enter` key.

```
brew info fish
```

And you'll see something like this.

![](https://i.imgur.com/ShGjo1s.png)

### Leverage your history

Fish keeps a record of every command you've ever run. You can use that history to your advantage.

Start by typing the following command one more time.

```
brew in
```

This time you'll see an auto-suggestion based on the most recent matching command.

![](https://i.imgur.com/yrOuJX9.png)

To use the auto-suggestion, press the right arrow ➡ key and hit the `Enter` key.

![](https://i.imgur.com/DbaBTi7.png)

**TIP:** Use the up arrow ⬆ and the down arrow ⬇ keys to cycle through your entire history of commands.

## Install and Configure Atom

Now it's time to install [Atom](https://atom.io/), a hackable text editor for the 21st century.

To get started, [download Atom](https://atom.io/download/mac), unzip the archive file, and drag the app icon into your `/Applications` folder.

Once installed, use Spotlight to launch Atom by pressing the `Command` + `Spacebar` keys at the same time, typing the word "atom" into the search field, and then pressing the `Enter` key.

![](https://i.imgur.com/fuVq4T5.jpg)

Close all the open tabs by pressing the `Command` + `W` keys at the same time.

Next, navigate to the `Atom > Preferences` menu item by pressing the `Command` + `,` keys at the same time.

Under the **Settings** tab, in the **Editor Settings** section, change the following:

| Name                               | Value   |
|------------------------------------|---------|
| Font Family                        | Menlo   |
| Font Size                          | 18      |
| Show Indent Guide                  | ✅      |
| Soft Wrap                          | ✅      |
| Soft Wrap At Preferred Line Length | ✅      |

Under the **Packages** tab, search for the core package called **autosave**. Then, click the **Settings** button and change the following:

| Name    | Value   |
|---------|---------|
| Enabled | ✅      |

Under the **Install** tab, with the **Package** button highlighted, install the following:

| Name                           | Type    |
|--------------------------------|---------|
| file-icons                     | Package |
| language-fish-shell            | Package |

Under the **Install** tab, with the **Themes** button highlighted, install the following:

| Name                           | Type         |
|--------------------------------|--------------|
| tomorrow-night-eighties-syntax | Syntax Theme |

Under the **Themes** tab, choose the following:

| Name                    | Type         |
|-------------------------|--------------|
| Tomorrow Night Eighties | Syntax Theme |

When you're done, close the preferences tab by pressing the `Command` + `W` keys at the same time.

### Install the Shell Commands

You'll find it insanely useful to open files and directories into Atom from the Terminal.

To get started, select the `Atom > Install Shell Commands` menu item.

To verify Atom is wired up correctly, run the following command.

```
atom ~/.config/fish/config.fish
```

And Fish's startup file will open in Atom like this.

![](https://i.imgur.com/efTSZJR.png)

### Discover the `EDITOR` environment variable

Like most shells, Fish allows you to control the contents of its **environment variables**, which are a set of key-value pairs that can affect the way running programs behave. These environment variables are often set when a new shell starts so their contents are available throughout the entire duration of the shell's session.

When executed, many command line tools look up specific environment variables and use their contents as implicit input. For example, Git uses the `EDITOR` environment variable to open your preferred text editor when you forget to include a commit message.

Environment variables like `EDITOR` can be set in a shell's startup file. While Fish's startup file is handy, add the following settings.

```
# Atom
set -x EDITOR 'atom -w'
```

**TIP:** Environment variables, like `EDITOR`, must be written in all capital letters.

Save the file and you'll see something like this.

![](https://i.imgur.com/0k7KvdD.png)

Now, relaunch the Terminal and verify these settings with the following command.

```
echo $EDITOR
```

**TIP:** When reading the content of an environment variable, it must be prefixed with a dollar sign `$`.

And you'll see something like this.

![](https://i.imgur.com/TAXG4JV.png)

### Discover the `PATH` environment variable

Like most shells, Fish relies on the `PATH` environment variable to specify a set of directories where other commands can be found.

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

Since Homebrew installs new commands to the `/usr/local/bin` directory, Homebrew-installed commands will be preferred over the pre-installed ones. In upcoming sections, you'll use Homebrew to install additional commands that override the pre-installed commands that come with macOS.

## Install and Configure Git

Using Homebrew, you can also install [Git](https://git-scm.com/), the version control system of choice among choosy developers. 🤓

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

Next, run this command to download and install some awesome Git colors, handy aliases for common Git subcommands, and extra Git configuration that'll make your life easier when connecting to GitHub from the command line.

```
curl -fsSL https://git.io/vKZJ8 | sh
```

We'll go over these later. For now, relish in your victory of making it this far. 🎉

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

Play around with JavaScript on your own. When you're done, type `.exit` and press the `Enter` key to quit the Node shell.

**TIP:** You can also press the `Command` + `D` keys to exit the Node shell.

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

Weird, nothing happened. Remember, the Node interpreter won't print anything unless told. Jerk! 😤

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

## Install Surge

Now, you'll deploy a tiny web page with [Surge](https://nodejs.org/), a static web publishing platform for front-end developers. To deploy to Surge, you'll use a command line program that's installed via [npm](https://www.npmjs.com/), a package manager for JavaScript software that comes with Node.

To get started, run the following command.

`npm install -g surge`

Once it finishes, run the following command.

`surge -V`

**TIP:** Notice the flag uses a capital `V`.

And you'll see something like this.

![](https://i.imgur.com/vRRoJau.png)

### Start a new project

If you don't have one, make a `Projects` directory to hold all of your upcoming projects.

```
mkdir ~/Projects
```

Then change into the directory.

```
cd ~/Projects
```

Now make a `GITHUB-USERNAME.surge.sh` project directory replacing `GITHUB-USERNAME` with your actual GitHub username.

```
mkdir wcrusher.surge.sh
```

And change into the directory.

```
cd wcrusher.surge.sh
```

You should see something like this.

![](https://i.imgur.com/PDDFaMu.png)

**TIP:** The full name of your working directory is `~/Projects/wcrusher.surge.sh`. To save prompt space, Fish abbreviates it. This is especially handy for **deeply nested** directories.

Next, initialize a new Git repository in this directory.

```
git init
```

And you should see something like this.

![](https://i.imgur.com/p6Xw9eq.png)

As the message suggests, an empty Git repository was initialized in your working directory. Notice the prompt changed too. You'll see this fancy prompt whenever your current working directory contains a Git repository.

Here's a quick break down of what you're seeing.

| Component                | Description                                   |
|--------------------------|-----------------------------------------------|
| `~/P/wcrusher.surge.sh`  | Abbreviated name of your working directory    |
| `master`                 | Name of your repository's current branch      |
| `✔`                      | Prompt symbol indicating a clean staging area |

Anything typed will appear after the green `✔` prompt symbol.

### Create a tiny web page

Now that the project's directory contains a Git repository, let's create a tiny web page.

To get started, run the following command.

```
touch index.html
```

Noticed a red `✖` has replaced your prompt symbol. It indicates your staging area is dirty. 😟

![](https://i.imgur.com/jdcHS8p.png)

To find out why, open the project directory in Atom.

```
atom .
```

**TIP:** The period `.` represents the current working directory.

It looks like there's a new, empty `index.html` file inside our project directory. As you can see, a Git repository's staging area becomes dirty whenever a new file is created.

![](https://i.imgur.com/5wqLRFE.png)

Go ahead and type the following HTML code into the `index.html` file and save it.

```html
<h1>Hello world</h1>
```

It should look like this when you're finished.

![](https://i.imgur.com/F26QSWr.png)

### Test your tiny web page

To test your tiny web page, you'll need to open it with your browser. An easy way to open a web page from the Terminal is to run the following command.

`open index.html`

And your default browser should open the file.

![](https://i.imgur.com/8XUgHOh.png)

### Commit your tiny web page

With your tiny web page working as expected, it's ready to be committed into your Git repository.

First, add the `index.html` file to your repository's staging area.

```
git add index.html
```

And then commit the changes, with a message, to your repository.

```
git commit -m 'Add a tiny web page'
```

The green `✔` prompt symbol is back, indicating your staging area is clean. Phew! 😌

![](https://i.imgur.com/QE3ks9b.png)

### Prepare your tiny web page for deployment

You're almost ready to deploy your tiny web page to Surge. However, Surge will ask you for a desired domain name each time you deploy. To prevent this, you can save your a domain name to a `CNAME` file so you don’t have to type it every time you deploy.

To add a `CNAME` file to the project directory, run the following command.

```
touch CNAME
```

Noticed a red `✖` is back, indicating your staging area is dirty.

Back in Atom, open the `CNAME` file and type in `GITHUB-USERNAME.surge.sh` replacing `GITHUB-USERNAME` with your actual GitHub username in **lower case** form. Save the file and it should look something like this.

**TIP:** The domain name in the CNAME file must be in lower case form.

![](https://i.imgur.com/BRuK4kA.png)

Now, add the `CNAME` file to your repository's staging area.

```
git add CNAME
```

And then commit the changes, with a message, to your repository.

```
git commit -m 'Add a CNAME'
```

The green `✔` prompt symbol is back, indicating your staging area is clean.

![](https://i.imgur.com/AMzOTd3.png)

### Deploy your tiny web page

You're finally ready to deploy your tiny web page to Surge!

To get started, run the following command.

```
surge
```

You'll be asked for three pieces of information.

1. An email address
1. A password
1. A project path

Since you're probably creating a new Surge account, type in your email address and a unique, secure password. Be careful when you type in a password as the characters will **not** show up on the screen for security purposes.

When asked about the project path, just press the `Enter` key to use the current working directory. When you're finished, it should look something like this.

![](https://i.imgur.com/rh2I4gE.png)

Before moving on, **please write down your account credentials**. If you don't currently use a password manager, now is a great time to invest in one. As a professional web developer, you're going to be responsible for hundreds, if not thousands, of passwords throughout your career.

There are many password managers on the market. I use and whole-heartedly recommend [1Password](https://agilebits.com/onepassword) because its user-friendly interface makes it easy to generate and access all my account credentials on all my devices. More importantly, I trust the company behind 1Password to employ the best security practices available. While it's not a free application, there is a 30-day free trial. And if you become a satisfied customer, you can use the `MacPowerUsers` coupon code to take 20% off the price.

After having written down your Surge account credentials somewhere, open your deployed tiny web page in a browser by running the following command.

```
open http://wcrusher.surge.sh
```

**TIP:** Don't forget to use your tiny web page's domain name.

You should see something like this.

![](https://i.imgur.com/3koEnB4.png)

Bravo! 🎉


### Congratulations!

You've successfully setup a web development environment on macOS and have completed these development tasks.

1. Created a tiny web page with a text editor
1. Tested the web page in a browser
1. Committed the web page to a repository
1. Deployed the web page to a production environment

Now that you've finished this article, it's time to celebrate with a frosty beverage. 🍻

### Bonus - Visual Design Tools

Here are a few helpful tools for the different aspects of visual design. Feel free to check them out on your own time.

- Color picker: [Sip](http://sipapp.io/)
- Photo editor: [Pixelmator](http://www.pixelmator.com/mac/)
- Vector editor: [Sketch](https://www.sketchapp.com/)
