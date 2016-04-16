## Objectives

* Talk about the advantages of `vim`
* Set up `vim`
* Do basic navigation in `vim`
* Work with files in `vim`
* Do basic edits to a file in `vim`
* Understand more advanced `vim` commands and where to find them
* Control multiple panes in `vim`
* Control multiple windows with `tmux`

## Why `vim`?

![Editor Learning Curves](http://www.terminally-incoherent.com/blog/wp-content/uploads/2006/08/curves.jpg)

### Modality

`vim` is a modal text editor, meaning that you can switch between different modes which give your keystrokes different meaning, from entering text, to running programs, to highlighting text, to writing out commands- all without your hands leaving the keyboard.

### Command Composibility

Command composability means that when you can combine small commands into bigger one. Rather memorizing the key command for "delete word", you memorizing the commands for "delete" and "word" and combine them. When you want to instead "change word" or "delete line", you already know half of the command.

### Ubiquity

One of the advantages of learning `vim` is that something like it is installed on just about every Unix machine (operating systems without `vim` installed by default will usually have an older version called `vi`). So, when you're logging into servers that may not have your favorite text editor installed and don't have a windowing system, you can still work on the text files directly.


## Setting up `vim`

`vim` is configured with the `~/.vimrc` file, which may or may not already exist on your system. Let's edit it with `vim`:

```
vim ~/.vimrc
```

If you've already done some configuring, you'll see all of your options here. Otherwise, you'll see a blank file. `vim` is a _modal text editor_, which means that it has different operating modes:

* In *insert mode*, you can enter text just like you do in any other text editor
* In *normal mode*, every key on your keyboard is capable of executing a program
* In *visual mode*, you can highlight characters, lines, and shapes of text to execute commands on

`vim` starts in *normal mode*. There are a lot of ways to switch into *insert mode*, but for right now, press `i`, and then enter this:

```
inoremap jj <Esc>
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
```

The full syntax for configuring a `.vimrc` file is beyond the scope of this lesson. What this does let you go into *normal mode* by pressing `jj` in *insert mode*, and use j/k/l/h to navigate split panes. Press `ZZ` to save and quit this file.

Additionally, you would be well-advised to map `Caps Lock` (which is prime keyboard real estate and rarely used) to something that sees a lot of action, like `Control`. To do this on OSX:

> Apple Menu -> System Preferences... -> Keyboard -> Keyboard Tab -> Modifier Keys and select Control for Caps Lock

## Basic Navigation

These are the basic navigation commands:

* `h` = Left
* `j` = Down
* `k` = Up
* `l` = Right

---

* `w`ord = Beginning of next word
* `e`nd = End of current word
* `b`ack = Back a word
* `B`eginning = Beginning of the current word

Let's practice those by playing `vim` Adventures.

## Exercise: Navigation

Play through the first three levels of [`vim` Adventures](http://vim-adventures.com/).

## Working With Files

You can enter a mode called *ex mode* by typing `:` while in *normal mode*. Rather than immediately executing commands, *ex mode* will wait for you to hit `enter` before executing the command. When the command executes, you will be returned to *normal mode*. File commands all happen in *ex mode*.

`:e`= edit a file
`:E`= open a file tree
`:w`= write a file
`:q`= quit a file
`:q!`= quit a file without saving
`:wq` or `ZZ`= write and quit a file

The tree that comes up when you type `:E` is particularly useful. This is a program called `netrw`, and can be navigated using all of your standard `vim` commands.

## Files Exercise

1. Open one of your existing projects on the command line
2. Type `vim` to open an empty editor at that location
3. Type `:E` to enter the tree
4. Navigate to your README or another file you want to edit
5. Navigate to a place in the file you want to make a change using the commands you've learned
6. Press `i` to enter into *command mode*
7. Make an edit
8. Press `jj` to go back to *normal mode*
9. Try quitting with `:q`- what happens?
10. Save the file
11. Edit another file directly with `:e file_name`
12. Make a change to the file
13. Save and quit with `ZZ`

## Basic Editing

These are the basic editing commands:

* `x` = delete the character under the cursor
* `r` = replace the character under the cursor with the next character you type

---

* `d`[target] = delete target
* `dd` = delete line
* `D` = delete line from current position
* `c`[target] = Change target (delete and go into insert mode)
* `cc` = Change line (delete and go into insert mode)
* `D` = Delete line from current position

### Command Structure

One of the most powerful features in `vim` is the ability to specificy *repetition* and a *target* when you're entering a command. The structure of a `vim` command is:

> [number of times to repeat] command [target]

For example, `3dw` `d`eletes the next `3` `w`ords.

## Exercise: Editing

On a command line, type `vimtutor`, which will open up the `vim` tutorial. Note that you will have to use `ESC` to go to *normal mode* in `vimtutor`. Complete lessons 1, 2, and 3.

## Intemediate Commands

### Navigation Commands

* `$` = End of current line
* `0` = Beginning of current line
* `^` = First non-whitespace character (for indented lines)
* `gg` = Beginning of file
* `G` = End of file

### Commands to go from _normal mode_ to _insert mode_

* `i`nsert = Start inserting from the left of the cursor
* `I`nsert = Start inserting from the right of the cursor
* `a`ppend = Start inserting from the right of the cursor
* `A`ppend = Start inserting from the end of the line
* `o`pen = Open a new line after the current one
* `O`pen = Open a new line before the current one

### Commands to copy/paste

* `y`[target] = "yank" (copy) target
* `yy` / `Y` = "yank" (copy) line
* `p`aste = Paste the last yanked or deleted text after the cursor
* `P`aste = Paste the last yanked or deleted text before the cursor

### Other commands

* `J`oin = Merge the current and next lines
* `u`ndo = Undo the last command
* `R`edo = Redo an undone command
* `.` = Repeat the last command

---

There are hundreds and hundreds of `vim` commands, tips, and tricks. The best place to look for them is the [`vim` Wiki](http://vim.wikia.com/wiki/Vim_Tips_Wiki). Of particular interest may be the [getting started section](http://vim.wikia.com/wiki/Category:Getting_started).

## Panes

Panes are an incredibly powerful feature in `vim` that allow you to work with multiple files. To create a horizontal split, type `:split` in *normal mode*. To create a vertical split, type `:vsplit`.

Navigate to each pane using `control` + `h`/`j`/`k`/`l`. Close a pane just like you would a `vim` window- `:q`, `wq`, or `ZZ`. You can also change the file being displayed with `:E`.

## Exercise: Panes

Go into an existing client-side project that has at least one HTML, CSS, and JavaScript file. Set up this split:

1. Javascript file all the way on the left side
2. HTML file in the top right
3. CSS file in the lower right

Make a change in each, save, and close each pane.

## `tmux`

`tmux` is a _terminal multiplexer_. That means it's a way to run multiple virtual terminals inside of one actual terminal. In practice, this means being able to run a server, text editor, and a shell in one terminal. This is especially useful if you're logging in remotely to a server. You can also run multiple `tmux` sessions, and _attach_ and _detach_ from them.

### Installation and Configuration

To install `tmux` on OSX:

`brew install tmux`

The initial config we'll run on `tmux` is to map its main key command from `control`+`b` to `control`+`space`. Edit the `tmux` configuration file with `vim ~/.tmux.conf`, and add the following line:

```
set -g prefix C-Space
```

### Overview

* A pane is a running terminal.
* A window is a collection of panes that fit on one screen
* A session is a collection of windows that you can attach or detach from.

To start a new `tmux` session, use the `tmux` command.

* `control` + `space`, `c` = create a new window
* `control` + `space`, `x` = close the current pane
* `control` + `space`, [number] = navigate to that numbered window
* `control` + `space`, `,` = rename the current pane
* `control` + `space`, `"` = split the current window horizontally
* `control` + `space`, `%` = split the current window vertically
* `control` + `h`/`j`/`k`/`l` = navigate panes within a window
* `control` + `space`, `d` = disconnect from the current session
* `tmux list-sessions` = list all currently running sessions
* `tmux a -t [number]` = attach to that session number

## Exercise: `tmux`

1. Navigate to a client-side project folder
2. Start a new `tmux` session
3. Split the current window vertically
4. In the left pane, run a server to host your app
5. Open a browser window and navigate to your app
5. Use the left pane as a shell for file manipulation
6. Rename this window "Server"
7. Create a new window and name it "Editor"
8. Open a `vim` editor
9. Navigate to a file, make an edit, save it
10. Navigate back to the first window to restart your server or watch it reload automatically
11. Detach from your session
12. Note that you can still use your app in the browser, as all the programs from your panes are still running
13. Reattach to your terminal
14. Close all your processes and panes

## Additional Resources

* `vimtutor` lessons 4-7
* [openvim Tutorial](http://www.openvim.com/)
* [VIM Adventures Lessons 4+ (paid)](http://vim-adventures.com/)
* [`vim` Tips Wiki](http://vim.wikia.com/wiki/Vim_Tips_Wiki)
* [`tmux` Crash Course](https://robots.thoughtbot.com/a-tmux-crash-course)