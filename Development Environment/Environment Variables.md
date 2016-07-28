# Discover the `EDITOR` environment variable

Shells allows you to control the contents of its **environment variables**, which are a set of key-value pairs that can affect the way running programs behave. These environment variables are often set when a new shell starts so their contents are available throughout the entire duration of the shell's session.

## Set the `EDITOR` environment variable

When executed, many command line tools look up specific environment variables and use their contents as implicit input. For example, Git uses the `EDITOR` environment variable to open your preferred text editor when you forget to include a commit message.

Environment variables like `EDITOR` can be set in a shell's startup file.

- For zsh the file is `atom ~/.zshrc`
- For Fish the file is `atom ~/.config/fish/config.fish`
- For Bash the file is `atom ~/.bashrc`

```
# Atom
set -x EDITOR 'atom -w'
```

**TIP:** Environment variables, like `EDITOR`, must be written in all capital letters.

Save the file and you'll see something like this.

![](https://i.imgur.com/0k7KvdD.png)

Now, relaunch (quit and reopen) the Terminal and verify these settings with the following command.

```
echo $EDITOR
```

**TIP:** When reading the content of an environment variable, it must be prefixed with a dollar sign `$`.

And you'll see something like this.

![](https://i.imgur.com/TAXG4JV.png)

## Discover the `PATH` environment variable

Shells rely on the `PATH` environment variable to specify a set of directories where other commands can be found.

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

NOTE: if you do _not_ see `/usr/local/bin` in your path, or it is _after_ /usr/bin, see your instructor.

---

## Next Steps

Install [A Window Manager](Window Managers.md) for quickly moving windows around
