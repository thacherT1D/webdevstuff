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

* Modality
* Command Composibility
* Ubiquity

## Setting up `vim`

* Edit ~/.vimrc
* Talk about modes
* `vim` starts in normal mode
* `i` gets you to insert mode

Add this to `~/.vimrc`

```
:imap jj <Esc>
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
```

* Remap caps lock to control

## Basic Navigation

* `h` = Left
* `j` = Down
* `k` = Up
* `l` = Right
* `w`ord = Beginning of next word
* `e`nd = End of current word
* `b`ack = Back a word
* `B`eginning = Beginning of the current word

## Exercise: Navigation

Play through the first three levels of [`vim` Adventures](http://vim-adventures.com/).

## Working With Files

* `ex` mode

`:e`= edit a file
`:E`= open a file tree
`:w`= write a file
`:q`= quit a file
`:q!`= quit a file without saving
`:wq` or `ZZ`= write and quit a file

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

> [number of times to repeat] command [target]

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

* Mention the `vim` Wiki

## Panes

* Horizontal split
* Vertical split
* Navigating panes
* Changing the file being edited

## Exercise: Panes

Go into an existing client-side project that has at least one HTML, CSS, and JavaScript file. Set up this split:

1. Javascript file all the way on the left side
2. HTML file in the top right
3. CSS file in the lower right

Make a change in each, save, and close each pane.

## `tmux`

* Terminal multiplexer
* Run multiple terminals
* Good for servers
* Attach/Detach

### Installation and Configuration

* `brew install tmux`
* `vim ~/.tmux.conf`
* `set -g prefix C-Space

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