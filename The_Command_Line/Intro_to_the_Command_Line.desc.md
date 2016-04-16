[Ty's slide deck](https://docs.google.com/presentation/d/10THpOD-J8vSPFAGiB3dU4w8wEstZ8PkxNIOrup3cTCU/edit#slide=id.gbf37db18e_0_32)

[CJ's slide deck](https://docs.google.com/presentation/d/1IVdWBXeh9cIDqGZzslQoMfPPxwD-xZYpl36wBS-oSuQ/edit#slide=id.p)

Objectives:

* The connection between the command-line and GUI
* The man command
* Explainshell
* File manipulation commands
* Search a file with grep
* Stream redirection
* History
* Permissions

The Hook:
“Do one thing and do it well”
Typing is faster than clicking
Command line is easily scriptable
Output of one program can be the input for another


## What is the terminal?

* Vocabulary:
    * Shell
    * bash
    * Command Line
    * Text Terminal
    * DOS Prompt (on windows machines)
    * SSH (on remote machines)
    * Bourne Shell
    * csh
    * ksh
    * sh
    * UNIX Shell
* Opening the terminal

## Basic commands

* `pwd`
* `open .`
* `ls`

## Review

## Navigation

* `tree`
* `cd`
* `/`
* Relative and absolute paths

## Autocompletion

* Tab

## Pair practice exercise

Exercise: 5 minutes in Pairs

Using Finder: Pick a directory somewhere under the /Users directory on your partner's computer
Your Task: Navigate to that directory in a single command from your home directory using a relative or absolute path
Help your partner if they are having trouble and use Tab Completion

## File manipulation

* `mkdir`
* Operands
* `touch`
* `echo`
* Redirection
* Piping

## Exercise: `grep`

Use pipes, grep, and the commands we've learned about so far to do the following:

1. Using ls list all files in the current directory that contain the word 'book'
1. Using cat list all the books in books.txt where the author or book title contains "John".
1. Using tree find the fullpath of all the files on your filesystem which contain the string 'book'
1. CHALLENGE, using cat again, list the books written by an author whose first or last name is John. Remember, Jack London's John Barleycorn doesn't count. Pipe the output of this to sort. Your output should match this:

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

Hint: you will need to use the .* wildcard to complete this challenge. In grep . means 'match any single character" and .* means match any number of any character. .*: means match any number of any character until we find a colon. .*F means match any number of any characters until we find a capital F.

## File commands

* `mv`
* `cp`
* `rm`
* Recursion
* Wildcard globbing

## Review

## Permissions

* Octals
* rwx
* `chown`
* `chmod`

## History

* `history`
* `history` with grep

## Exercise: Command-line murder mystery

[Command line murder mystery](https://github.com/veltman/clmystery)

[CMD Line Warmup](https://github.com/gSchool/cmdLineWarmup)

[CLI Assessment Review](https://docs.google.com/presentation/d/1Jhr3uhGQcUFizWu4nTJyz37Xy9mgffrN1kyMHiVUPYE/edit?usp=sharing)