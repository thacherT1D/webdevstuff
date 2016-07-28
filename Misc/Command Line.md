# Intro the Command Line

This lesson will introduce you to the fundamental commands of Mac OS X. By the end, you'll be able to describe and use commands to manipulate the following concepts:

* [User accounts](#user-accounts) (`sudo, chmod, chown`)
* Working directories (`pwd`)
* Home directories (`~/`)
* Unix paths
* Command flags
* Manual pages ("*the only command you'll ever need*.")
* Graphical user interfaces
* Environment variables
* File system management (`touch, mkdir, rm, rmdir, cp, mv`)
* File system navigation (`ls, cd`)
* File system redirection (`|, >, >>`)
* Search your bash history with `history | grep` and `ctrl+r`.
* Use [www.explainshell.com](http://www.explainshell.com).

## Why are there so many commands!?

The Unix philosophy for command line programs is: “Do one thing and do it well”. Output of one program can be the input for another so commands can be easily chained together.

Typing is faster than clicking in many cases, and the command line is easily scriptable.

## Getting Started

Before getting stared, use Spotlight to launch the `Terminal` app by pressing the `Command` + `Spacebar` keys at the same time, typing the word "terminal" into the search field, and then pressing the `Enter` key.

## User accounts

Mac OS X is a multi-user operating system which means it manages one or more user accounts. Each user account on Mac OS X has a **full name** and an **account name**.

### The full name

If automatic login is turned off, you'll see your account's full name when logging into the operating system after the computer boots up.

![](https://i.imgur.com/t8AVjbq.png)

As a professional web developer, you'll be responsible for keeping sensitive information private. Turning off automatic login is a good first step with that.

If you want to turn off automatic login:

1. Use Spotlight to launch the `Users & Groups` System Preferences.
1. If the lock in the bottom left corner is closed, click on it and enter your account password in the window that pops up.
1. Click the `Login Options` tab in the sidebar on the bottom left.
1. Select `Off` in the dropdown menu next the `Automatic login`.

When finished, your System Preferences should look something like this.

![](https://i.imgur.com/CwrbvzQ.png)

### The account name

Additionally, you'll see your account's name when viewing your home directory, among other places.

To view the home directory:

1. Use Spotlight to launch the `Finder` app.
1. Press the `Shift` + `Command` + `H` keys at the same time.

![](https://i.imgur.com/ilNTZIO.png)

If you don't see the home directory in your favorites sidebar:

1. Open the Finder's preferences by pressing the `Command` + `,` keys.
1. Click the `Sidebar` tab at the top of the window.
1. Enable the checkbox next to your home directory's icon and name.

When finished, the Finder Preferences should look something like this.

![](https://i.imgur.com/UZHZ2Aw.png)

### The current user

Whenever you log into Mac OS X, that user account becomes the **current user**. Additionally, when you start a new shell session in the Terminal, the current user is automatically logged in to the shell.

There are a two fundamental commands that display the state of the current user from within the shell—the `whoami` and `groups` commands.

The `whoami` command displays the account name of the current user.

```
whoami
```

![](https://i.imgur.com/XTah2M0.png)

While the `groups` command displays the groups of the current user.

```
groups
```

![](https://imgur.com/TsyyfL9.png)

It's common for a user account to belong to a many groups. The only important groups to mention are `staff` and `admin`. In Mac OS X, every user account belongs to the `staff` group, while only administrator accounts belong to the `admin` group.

**TIP:** If your user account doesn't belong to the `admin` group, it'll be difficult to manage your development machine.

### Exercise

Find out the account name and groups of the current user of your computer.

## Working directories

At any given time, the Unix shell has a **current working directory**. By convention, the current working directory is displayed in your shell's prompt. That way, you know where you are in the your computer's file system hierarchy at all times.

From the command line, you can reference the current working directory with the period `.` character. You'll get to play around with this in a minute. Typically, a new shell session will set the current working directory to your user account's home directory when it starts.

### The home directory

The **home directory** is a special folder in your computer's file system that belongs to only your user account. This is where you'll store your documents, downloads, music, projects, etc. as well as store the configuration settings of many command line programs. In the Unix shell, the tilde `~` character represents the home directory.

Each user has their own home directory. Prior to the personal computer revolution in the 1980's, many people frequently shared the same computer because they were so relatively expensive. Thus operating systems' with multiple accounts, and therefore home directories, was commonplace. Since computers are relatively cheaper nowadays, most operating systems only have one human user account.

### The `pwd` command

Let's use the `pwd` command to print the current working directory of your shell session.

```
pwd
```

![](https://i.imgur.com/s6Xqtmn.png)

### Exercise

What's the current working directory of your shell?

## File system paths

In any computer system, a **path** represents a location in the file system. Paths are similar to addresses in the physical world except they list a location from the general to the specific. It's a bit like addressing an envelope backwards.

```
USA
Washington
Seattle
111 Jackson Street
Galvanize, Inc.
```

Is similar to

```
/Users/wcrusher/Projects/nanites
```

A path is **absolute** when it starts with `/`.

A path is **relative** when it does not.

### Exercise

Is the path returned by the `pwd` command absolute or relative?

### The `ls` command

One of the most frequently used commands is the `ls` command which lists the contents of the current working directory.

```
ls
```

![](https://i.imgur.com/tivSrqi.png)

### Exercise

In what order are the files and directories displayed?

## Command flags

**Command flags** are a common way to specify options for command line programs. If a command allows a command flag to be specified, it typically is a single dash `-` or double dash `--` immediately followed by a letter, number, symbol, or word. Some commands even accept multiple command flags to be specified at the same time. You'll see some examples of this shortly.

### Long format

Like many shell commands, the behavior of `ls` can be modified. By default, it displays the files and directories in your current working directory in alphabetical order spread over multiple columns. However, you can modify that behavior by providing one or more command flags.

The `l` flag changes the behavior of `ls` to display the items in a long format. So in addition to the file and directories names, it'll display permission, ownership, size, and the last modification time of each item in the directory.

```
ls -l
```

![](https://i.imgur.com/TzK8I2m.png)

### Exercise

How can you tell if an item is a file or directory? **Hint:** look at its permissions.

### Human-friendly sizes

When using the `-l` flag with the `ls` command, the size of each item is displayed in bytes. To display sizes in a more human-friendly manner, you can use the `-h` flag and it'll add one of the following suffixes.

| Suffix | Meaning  |
|--------|----------|
| `B`    | byte     |
| `K`    | kilobyte |
| `M`    | megabyte |
| `G`    | gigabyte |
| `T`    | terabyte |
| `P`    | petabyte |

```
ls -hl
```

![](https://i.imgur.com/oUiKGx6.png)

**TIP:** In fish, the `ll` command is the same as `ls -hl` only faster to type.

### Hidden files and directories

You may not realize it, but there are **hidden files and directories** scattered throughout your computer's operating system. All it takes to hide a file or directory is to start its name with period `.` prefix. Hidden items can be revealed by using the `-a` flag with the `ls` command.

`ls -hal`

![](https://i.imgur.com/AIKsLux.png)

Many programs have configuration settings that they want stored out of plain sight from users. Traditionally, these settings are stored in hidden files and directories in your home directory. As a professional web developer, you'll want to access and modify these settings and, throughout this course, you'll be doing just that.

**TIP:** In fish, the `la` command is the same as `ls -hal` only faster to type.

## Manual pages

A **manual page** (or man page) is a form of documentation that explains how a command works. It includes what the command does, the specifics of how you run it, and what arguments and flags it accepts. Some man pages are a little hard to get your head around. But they're fairly consistent in their structure, so once you get the hang of it it's not too bad. You can access a man page by using the `man` command.

### The `man` command

Let's use the `man` command to display the man page for the `ls` command.

```
man ls
```

![](https://i.imgur.com/CdYtnkQ.png)

Use the down arrow `↓` key to scroll down and the up arrow `↑` key to scroll up. To quit a `man` page and return to the shell, press the `q` key.

### Exercise

With the `man` command, spend three minutes discovering new flags for the `ls` command. Try out different combinations of flags to see what they do. For each flag you try, make a prediction about the effect it will have. After trying it, review your prediction.

Were you right? If not, in what way were you wrong? What happened that surprised you? These sorts of surprises are the seeds of learning so treasure them.

**TIP:** http://explainshell.com/ is a great resource for understanding [complex shell commands](http://explainshell.com/explain?cmd=ls+-hal).

## Graphical user interfaces

The file structure you see in the textual command line interface is the same as the one you see in the graphical interface via the Finder application. The only difference is the Finder tends to hide some of the files and directories to keep things simple for most users.

**TIP:** The Finder on Mac OS X is equivalent to the Explorer on Windows.

### The `open` command

The `open` command opens a directory in the Finder which can be really handy. Let's give that a try right now.

```
open .
```

![](https://i.imgur.com/ckQDqNp.png)

**TIP:** Remember, the period `.` character represents the current working directory.

### Exercise

Why can't you see any hidden files and directories in the Finder?

## Review

- What's the command for displaying the username of the current user?
- What's the command for printing the current working directory?
- What's the character that represents the current working directory?
- What's a home directory?
- What's the character that represents the home directory?
- What's a path?
- As a path get's longer, does it get more general or more specific?
- What's an absolute path?
- What's a relative path?
- What's the command for listing the contents of a directory?
- What's the flag for listing directories in long format?
- What's a hidden file or directory?
- What's the flag for listing the hidden content of a directory?
- What's the command for displaying a command's manual page?
- How do you quit a manual page and return to the shell?
- What's the command for opening a directory in the Finder?

### The `echo` command

The tilde `~` character represents the home directory. Try displaying the tilde `~` character with the `echo` command.

```
echo ~
```

### Exercise

Is the output from this command the as the output you got from the `pwd` command?

## File system navigation

### The File System is a Tree

Install the `tree` command with Homebrew.

```
brew install tree
```

**Try This**:

```
$ tree -L 1
.
├── Applications
├── Desktop
├── Documents
├── Downloads
├── Dropbox
├── Library
├── Movies
├── Music
├── Pictures
├── Projects
└── Public

11 directories, 0 files
```

Your file system is a "tree". This is a very common data structure in computer programming. In a *tree* you have a series of **"nodes"** that are connected to their **"parent node"**.

In our file system *nodes* can be directories or files. The parent of any file or directory is the directory that contains that file or directory. There is exactly one directory in the file system that doesn't have a parent. This is called the **"root directory"**.

### Root Directory

Another important directory is the root directory `/`

**Try This**:

```
$ cd /  
$ pwd
```

The files on your computer are structured in a tree. The 'top' of the file system is know as the `root` directory. That may sound upside down, but in our case the root is at the top.

We can move to the **root directory** with the command `cd /`.  
We can move back to your **home directory** with the command `cd ~`.  

```
$ cd ~  
$ pwd
/Users/ryansobol
```

Remember, the `~` always refers to the current user's home directory, this is handy for scripts and for you, but you can use the full path just as well if you know it, `pwd` will give you the full path.

### Parent directories

**Try this:**

```
cd ../
pwd
```

What happened? Which directory are you in?

In the terminal, the `.` character refers to the current working directory and two dots `..` refers to the current directories **parent directory**. What happens if you try this:

```
$ cd /
$ cd ..
```

The terminal ignores `cd ..` in this case. the root directory is the only directory in your entire file system that does not have a parent.  

(`../`) is a relative path you can use it anywhere you would use a path. What happens if we type:

```
$ ls -l ~/Documents/../

total 0
drwxr-xr-x+ 11 Guest  _guest  374 Nov  4 10:47 .
drwxr-xr-x   6 root   admin   204 Nov  4 10:47 ..
drwx------+  3 Guest  _guest  102 Nov  4 10:47 Desktop
drwx------+  3 Guest  _guest  102 Nov  4 10:47 Documents
drwx------+  4 Guest  _guest  136 Nov  4 10:47 Downloads
drwx------+ 26 Guest  _guest  884 Nov  4 10:47 Library
drwx------+  3 Guest  _guest  102 Nov  4 10:47 Movies
drwx------+  3 Guest  _guest  102 Nov  4 10:47 Music
drwx------+  3 Guest  _guest  102 Nov  4 10:47 Pictures
drwxr-xr-x+  4 Guest  _guest  136 Nov  4 10:47 Public  
```

The command means, list the contents of the parent of `~/Documents/` So it listed the contents of `~`, or the home directory.

Any path starting with a `/` is said to be an absolute path and it is the complete path starting from the root directory. Relative paths (ones that do not begin with a `/`) are relative to your current location.

## Tab Completion

Hitting `<TAB>` autocompletes.  Hit `<TAB>` constantly. Try it right now! Type:

`$ cd ~/L` THEN HIT TAB!

This trick will save you so much time. Here's another trick, type:

`$ cd ~/` now DOUBLE TAP TAB. What happened?

This way you can easily see the competing outcomes of autocomplete. What happens if you type:

`$ cd ~/D` then double tap tab?

The competing options for me are `Desktop/`, `Documents/`, and `Downloads/`

### Exercise

Spend three minutes navigating around your computer's file system from the command line. Use a mixture of relative and absolute paths to navigate around. See what dark corners you can discover in your operating system.

## Review

* `tree`
* Root directory
* `cd /`
* `cd ~`
* `cd ..`
* `cd relative/path`
* Tab Completion

## File system manipulation

### The `mkdir` command

Now that we know how to move around, it's time to make some changes. We can make directories with the `mkdir` command.  

>Pro-tip: WordsLikeThis are called CamelCase. Programmers frequently [argue about snake_case and CamelCase](http://programmers.stackexchange.com/questions/27264/naming-conventions-camelcase-versus-underscore-case-what-are-your-thoughts-ab)

**Try This**

```
$ cd ~/Projects

$ mkdir notebook
```

What command can you use to see the results of your handywork?

### Adding Files

Let's `cd` into our new `notebook`  Look around with `ls`, and `ls -la`.  What do you see?

### Exercise

I want my note book to have some notes.  

`$ touch notes.txt`

Now try listing the contents of your current directory.

`$ ls notes.txt`

What did the command `touch` do? You can use `touch` to do more than just create files. Try reading the man page for touch!

`$ cat notes.txt`

### Removing files

We've created a file, so let's try removing it.

`$ rm notes.txt`

### Creating some notes

`$ history`

`$ history > notes.txt`

Using the closing angle bracket `>` in this way is called **redirection**.  Every command that we run in the shell has an input, an output, an error output, and arguments/operands.  We are saying:  "Take the output from `history` and put it in a new file called `notes.txt`"  

Try running `ls` again. What do you see that's different?

Look at the contents with:

`$ cat notes.txt`

What does `cat` do?

There are other ways to view text files as well. Try

`$ less notes.txt`

What does `less` do? Inside of your `less` window, try typing `/cd` then hitting enter, what happened?

>Pro-tip: use `cat` when you have a short text file, and especially when you want the output of the text file to remain in your command prompt. Use `less` when you have lots of text to search through.

</br>
>Pro-tip: when you type `man command` you're using `less`. Try searching through man pages using the same /searchWord trick we used in `less`

**Try This**

`$ history > notes.txt`

And then look at the file with the `less` command.

`$ less notes.txt`.

Our old text has been replaced with the new text. Sometimes we'll want to **append** to the existing text instead of overwriting it. We use two angle brackets `>>` to append the string to the end of the file:

`$ history >> notes.txt`

### Piping

The Unix Philosophy is "do one thing, and do it well." Complex problems are solved by using small and simple modules, and chaining them together. This is a great way to think about software, and in terminal programming we chain commands using the `|` or pipe character.

Let's look back at our books.  Read out the file.  Notice that the list of books is unsorted!  Lets organize this list using the `sort` command.

Pipes allow us to use the output from one command as the input for another command.

**Try This**

`$ cat notes.txt | sort`

We took the output from `cat books.txt` and sent it through a pipe to `sort`.  The output of `cat books.txt` becomes the input of `sort`. The output of `sort` printed to our screen. Now lets redirect the output of `sort` to a file:

**Try This**

`$ cat notes.txt | sort > sorted_notes.txt`

There are dozens of powerful tools we can leverage using pipes.  One of the ones you'll be using the most is `grep`.

**Try This**

`$ cat books.txt | grep Mil`

See how we filtered out just the lines that contain Mil?  Try grepping for something else.

Adapted from [http://en.flossmanuals.net/command-line/piping/](http://en.flossmanuals.net/command-line/piping/)

### Exercise: Using grep

`grep` is a powerful command that can search through text output for matching text, or patterns of text. Use pipes, grep, and the commands we've learned about so far to do the following:

1. Using `ls` list all files in the current directory that contain the word 'book'
2. Using `cat` list all the books in `books.txt` where the author or book title contains "John".
3. Using `tree` find the fullpath of all the files on your file system which contain the string 'book'
4. **CHALLENGE**, using `cat` again, list the books written by an author whose first or last name is John. Remember, Jack London's John Barleycorn doesn't count. Pipe the output of this to `sort`. Your output should match this:

```
Bartlett, John:Familiar Quotations
Bunyan, John:Pilgrim's Progress, The
Bunyan, John:Saved by Grace
Johnson, Samuel:Lives of the Poets
Mill, John :On Nature
Mill, John Stuart:On Liberty
Mill, John Stuart:System of Logic, A
Milton, John:Paradise Lost
```

> hint: you will need to use the `.*` wildcard to complete this challenge. In grep `.` means 'match any single character" and `.*` means match any number of any character. `.*:` means match any number of any character until we find a colon. `.*F` means match any number of any characters until we find a capital F.

## Moving

Now that we have our books sorted, we really don't need our unsorted list of books.  `mv` stands for move, and that's how we move files and folders from place to place.

**Try This**

`$ mv sorted_books.txt books.txt`

Examine the contents of our current directory. What has changed?

## Copying
To copy files, we use the `cp` command.  Extrapolate from the way we used `mv` to copy the file `bookshelf.txt` to add a file `second_bookshelf.txt`.

**Try This**

`$ cp bookshelf.txt second_bookshelf.txt`

What happend? What are the contents of second_bookshelf.txt?

## Removing
`rm` is short for remove.  Use `rm` to remove the `second_bookshelf.txt` file we just created with `cp`.

**Try This**

`$ rm second_bookshelf.txt`

>Pro-tip: `rm` does not send things to your trash can, it deletes them permanently. Be careful when using `rm`.

## The "Recursive" Option

By default, commands like `cp` and `rm` only apply to the file specified. We can copy and remove entire directories with the `-r` option. `-r` stands for recursive, which is a very important term in computer programming. In this context it means "follow the directory structure through sub-directories until we are at a 'leaf node' in our directory tree."

**Try This**

```
cd ..
cp living_room study
```

We get an error: `cp: study/ is a directory (not copied).` To copy directories, we need to use `-r`:

`cp -r living_room study`

Now examine the contents of the directory 'study'. We copied all of our files to the new directory! Just like `cp`, `rm` will not work by default on a directory. Try `rm study` and you'll get the same error. Try this instead:

`$ rm -r study`

The study is gone. You can also use `rmdir` for this purpose.

## Filename Wildcards

Sometimes we want to refer to a bunch of similar files, to do this we can use wildcards. The most common wildcard to use is `*` usually along with a file extension:
**Try This**

`$ ls -la *.txt`

>Pro-tip: This is basically the same as `ls -la | grep .txt`. Can you think of a time when piping to `grep` would be preferable to a simple wildcard?

For more ideas go here: [How to Use Wildcards](http://www.linfo.org/wildcard.html)

## Review

* `mkdir`
* editing files
* echo
* redirection `>` and `>>`
* piping
* moving, copying and removing
* recursive option

## File Permissions

Lets examine our current working directory to discuss permissions.

`$ ls -l`

I'll cherry pick one line to describe permissions:

```
-rwxrw-r--  1 Tyler  staff  413 Oct 15 11:22 books.txt
```

The column on the left e.g.: `-rwxrw-r--` displays the files' permissions. That is whether or not you can read, write or execute the file. The first character is one of three:

* `-` for a regular file
* `d` for a directory
* `l` for a "link" which we'll talk about more another time.

The next 9 characters are one of 4 characters, and refer to what can be done to the file. These should be thought of in groups of 3, and they describe the permissions for different people/groups of people. So for our line: `-rwxrw-r--` we have the leading `-` telling us it's a file, then 3 groups:

* `rwx` The owner's permissions are first, the owner can read write and execute
* `rw-` The group's permissions are next, they can read and write
* `r--` Everyone else's permissions are last, everyone can read this file

After that we see `1 Tyler  staff  413 Oct 15 11:22 books.txt`. This line tells that Tyler owns this file; the file belongs to the staff group; its size is 413 bytes; it was last modified Oct 15th at 11:22 and the name of the file is books.txt. The 1 at the start refers to how many files a directory contains, it is always 1 for regular files but might be larger for directories.  

## History

Wow, we've done a lot of work. Remembering all these commands can be hard. Luckily our shell remembers a lot of what we've done for us! Try tapping the up arrow in your shell. What happens? We can scroll up and down through the most recent commands we've executed.

**Try This**

`$ history`

and

`$ history | grep cd`

Searching through history can be very useful if you know you've done something, but can't remember exactly how you did it. You can also combine the power of `history` with auto-complete. Try hitting `ctrl+r` then typing `ls`.  What happens?

You can scroll up and down through all recently used commands that contain the string 'ls' using `ctrl+r` and `ctrl+shift+r` to go backwards.

If you don't want to execute any of these commands, type `ctrl+c`. Control+c is a powerful command that you can use at any time to kill the currently running terminal process, or exit many terminal applications.### Terminal Cheat Sheet
Bookmark this:

* [http://bit.ly/terminalcheats](http://bit.ly/terminalcheats)

### Exercise

Solve the [Command Line Murder Mystery](https://github.com/veltman/clmystery). To get started, fork and clone the repo to your local machine. Further instructions can be found in the README for the mystery. Good luck!

### Additional Resources

>Pro-tip:
>[www.explainshell.com](http://explainshell.com/) is a great resource for understanding shell commands. Commands can get complex, take a look at this command which copies any file under `/path/to/search/` whose name contains the word "smile" to the directory `/target/path/`:

>`find /path/to/search/ -type f -name ".*smile.*" | xargs cp -t /target/path/;`

> Read about [this command on Stack Overflow](http://stackoverflow.com/questions/17368872/how-to-move-or-copy-files-listed-by-find-command-in-unix) then try examining [that command on explain shell](http://explainshell.com/explain?cmd=find+%2Fpath%2Fto%2Fsearch%2F+-type+f+-name+%22.*smile.*%22+|+xargs+cp+-t+%2Ftarget%2Fpath%2F). The command line is very powerful. Don't worry if this command doesn't make sense yet.

Learn the Command Line the Hard Way is a great book for learning the command line. Check it out!
http://cli.learncodethehardway.org/book/

[http://bit.ly/terminalcheats](http://bit.ly/terminalcheats)

* Explore interesting, but non-essential commands on your own:
	* networks: `ping, curl, wget, traceroute`
	* systems: `ps, top, df`

[CMD Line Warmup](https://github.com/gSchool/cmdLineWarmup)

## Slides

[Slide Deck Option 1](https://docs.google.com/presentation/d/10THpOD-J8vSPFAGiB3dU4w8wEstZ8PkxNIOrup3cTCU/edit#slide=id.gbf37db18e_0_32)

[Slide Deck Option 2](https://docs.google.com/presentation/d/1IVdWBXeh9cIDqGZzslQoMfPPxwD-xZYpl36wBS-oSuQ/edit#slide=id.p)

[CLI Assessment Review](https://docs.google.com/presentation/d/1Jhr3uhGQcUFizWu4nTJyz37Xy9mgffrN1kyMHiVUPYE/edit?usp=sharing)
